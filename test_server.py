import http.cookiejar
import hashlib
import hmac
import json
import re
import sqlite3
import tempfile
import threading
import unittest
from datetime import date
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import HTTPCookieProcessor, Request, build_opener
from unittest.mock import patch

from http.server import ThreadingHTTPServer

import server


class AccountServerTests(unittest.TestCase):
    def setUp(self):
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.data_directory = Path(self.temporary_directory.name)
        self.database = self.data_directory / "test.sqlite3"
        self.data_patch = patch.object(server, "DATA_DIR", self.data_directory)
        self.database_patch = patch.object(server, "DATABASE", self.database)
        self.media_patch = patch.object(server, "MEDIA_DIR", self.data_directory / "media")
        self.data_patch.start()
        self.database_patch.start()
        self.media_patch.start()
        server.initialize_database()

        self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.TableMatesHandler)
        self.httpd.daemon_threads = False
        self.thread = threading.Thread(target=self.httpd.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.httpd.server_port}"
        self.cookie_jar = http.cookiejar.CookieJar()
        self.client = build_opener(HTTPCookieProcessor(self.cookie_jar))

    def tearDown(self):
        self.httpd.shutdown()
        self.httpd.server_close()
        self.thread.join(timeout=5)
        self.database_patch.stop()
        self.data_patch.stop()
        self.media_patch.stop()
        self.temporary_directory.cleanup()

    def request_json(self, path, payload=None, method=None, opener=None):
        body = None if payload is None else json.dumps(payload).encode("utf-8")
        request = Request(
            self.base_url + path,
            data=body,
            method=method,
            headers={"Content-Type": "application/json"} if body is not None else {},
        )
        client = opener or self.client
        try:
            with client.open(request, timeout=15) as response:
                return response.status, response.headers, json.load(response)
        except HTTPError as error:
            return error.code, error.headers, json.load(error)

    def request_raw(self, path, body, content_type, headers=None, opener=None):
        request_headers = {"Content-Type": content_type}
        request_headers.update(headers or {})
        request = Request(
            self.base_url + path,
            data=body,
            method="POST",
            headers=request_headers,
        )
        client = opener or self.client
        try:
            with client.open(request, timeout=15) as response:
                return response.status, response.headers, response.read()
        except HTTPError as error:
            return error.code, error.headers, error.read()

    def test_register_login_logout_and_password_storage(self):
        status, headers, registration = self.request_json(
            "/api/register",
            {"name": "Jamie Example", "email": "Jamie@example.com", "password": "A-private-demo-password"},
        )
        self.assertEqual(status, 201)
        self.assertIn("HttpOnly", headers["Set-Cookie"])
        self.assertTrue(registration["user"]["id"])
        self.assertEqual(registration["user"]["email"], "jamie@example.com")

        connection = sqlite3.connect(self.database)
        try:
            member = connection.execute(
                "SELECT id, name, email, password_salt, password_hash, created_at, last_login_at FROM users"
            ).fetchone()
        finally:
            connection.close()
        self.assertEqual(member[0], registration["user"]["id"])
        self.assertNotIn(b"A-private-demo-password", member[3])
        self.assertNotIn(b"A-private-demo-password", member[4])
        self.assertTrue(member[6])

        status, _, current_user = self.request_json("/api/me")
        self.assertEqual(status, 200)
        self.assertEqual(current_user["user"]["id"], member[0])

        duplicate_status, _, duplicate = self.request_json(
            "/api/register",
            {"name": "Another Name", "email": "JAMIE@example.com", "password": "A-private-demo-password"},
        )
        self.assertEqual(duplicate_status, 409)
        self.assertIn("already exists", duplicate["error"])

        self.request_json("/api/logout", {}, method="POST")
        _, _, current_user = self.request_json("/api/me")
        self.assertIsNone(current_user["user"])

        bad_status, _, bad_login = self.request_json(
            "/api/login",
            {"email": "jamie@example.com", "password": "wrong-password"},
            method="POST",
        )
        self.assertEqual(bad_status, 401)
        self.assertEqual(bad_login["error"], "Email or password is incorrect.")

        status, _, logged_in = self.request_json(
            "/api/login",
            {"email": "JAMIE@example.com", "password": "A-private-demo-password"},
            method="POST",
        )
        self.assertEqual(status, 200)
        self.assertEqual(logged_in["user"]["id"], member[0])
        connection = sqlite3.connect(self.database)
        try:
            last_login = connection.execute("SELECT last_login_at FROM users WHERE id = ?", (member[0],)).fetchone()[0]
        finally:
            connection.close()
        self.assertTrue(last_login)

    def test_secure_cookie_flag_when_enabled(self):
        with patch.dict("os.environ", {"TABLEMATES_SECURE_COOKIES": "1"}):
            status, headers, _ = self.request_json(
                "/api/register",
                {"name": "Secure Cookie", "email": "secure@example.com", "password": "A-private-demo-password"},
            )
        self.assertEqual(status, 201)
        self.assertIn("Secure", headers["Set-Cookie"])

    def test_event_date_catalog_matches_the_website_cards(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        website_events = {
            name: date.fromisoformat(event_date)
            for event_date, name in re.findall(
                r'<article class="event-card" data-category="[^"]+" data-date="([^"]+)" data-event="([^"]+)"',
                page,
            )
        }
        self.assertEqual(website_events, server.EVENT_DATES)

    def test_event_price_catalog_matches_bookable_website_cards(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        website_prices = {
            name: int(price.replace(",", ""))
            for name, price in re.findall(
                r'<article class="event-card"[^>]*data-event="([^"]+)"[\s\S]*?<span class="event-price"><b>¥([\d,]+)',
                page,
            )
        }
        self.assertEqual(website_prices, server.EVENT_PRICES)

    def test_every_event_has_menu_or_activity_details(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        event_count = len(re.findall(r'<article class="event-card"', page))
        details_button_count = len(re.findall(r'data-event-menu|data-tea-menu', page))
        self.assertEqual(details_button_count, event_count)

    def test_new_year_pop_up_is_listed_for_calendar_date(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        event = re.search(
            r'<article class="event-card" data-category="([^"]+)" data-date="([^"]+)" data-event="International New Year food gathering"',
            page,
        )
        self.assertIsNotNone(event)
        self.assertEqual(event.groups(), ("Pop-up event", "2027-01-01"))

    def test_new_year_event_menu_has_country_stall_photos(self):
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        for country in ("Nepal", "Sri Lanka", "Bangladesh", "India", "Japan"):
            with self.subTest(country=country):
                self.assertIn(f"name: \"{country} ·", app)

    def test_checkout_form_uses_stripe_and_new_year_event_is_bookable(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn("Continue to secure payment", page)
        self.assertIn("securely with Stripe", page)
        new_year_event = re.search(
            r'<article class="event-card"[^>]*data-event="International New Year food gathering".*?</article>',
            page,
            flags=re.DOTALL,
        )
        self.assertIsNotNone(new_year_event)
        self.assertIn('class="book-button"', new_year_event.group(0))
        self.assertIn("<b>¥2,000</b> / person", new_year_event.group(0))
        self.assertIn("purchased separately from each stall", new_year_event.group(0))
        self.assertIn('"/api/checkout"', app)

    def test_booking_buttons_are_clickable_and_require_login_before_booking(self):
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn('button.textContent = translate("Book now")', app)
        self.assertIn("if (!signedInUser)", app)
        self.assertIn('document.getElementById("loginDialog").showModal()', app)
        self.assertIn("pendingBookingCard = card", app)
        self.assertIn("if (!checkoutEnabled)", app)
        self.assertIn("showBookingDialog(card)", app)
        self.assertNotIn("Bookings opening soon", app)

    def test_checkout_form_validates_before_starting_payment(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn('id="bookingForm" novalidate', page)
        self.assertIn("form.reportValidity()", app)
        self.assertIn("Opening secure Stripe checkout", app)
        self.assertIn("checkout.stripe.com", app)

    def test_login_password_fields_have_accessible_visibility_toggles(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        for password_id in ("loginPassword", "confirmPassword"):
            with self.subTest(password_id=password_id):
                self.assertRegex(
                    page,
                    rf'<button class="password-toggle"[^>]*aria-controls="{password_id}"[^>]*data-password-toggle>',
                )
        self.assertIn('password.type = isVisible ? "text" : "password"', app)
        self.assertIn('button.setAttribute("aria-pressed", String(isVisible))', app)
        self.assertIn('translate(isVisible ? "Hide password" : "Show password")', app)

    def test_checkout_is_disabled_until_stripe_and_schedule_are_configured(self):
        with patch.dict(
            "os.environ",
            {
                "TABLEMATES_BOOKINGS_ENABLED": "0",
                "STRIPE_SECRET_KEY": "",
                "STRIPE_WEBHOOK_SECRET": "",
                "TABLEMATES_BASE_URL": "",
            },
        ):
            status, _, response = self.request_json("/api/checkout/status")
            self.assertEqual(status, 200)
            self.assertFalse(response["enabled"])

            status, _, response = self.request_json(
                "/api/checkout",
                {
                    "event": "Around the world, one dinner table",
                    "name": "Jamie",
                    "email": "jamie@example.com",
                    "guests": 2,
                    "language": "English",
                },
                method="POST",
            )
        self.assertEqual(status, 503)
        self.assertIn("not ready", response["error"])

    def test_stripe_checkout_uses_server_price_and_webhook_confirms_booking(self):
        environment = {
            "TABLEMATES_BOOKINGS_ENABLED": "1",
            "STRIPE_SECRET_KEY": "sk_test_example",
            "STRIPE_WEBHOOK_SECRET": "whsec_example",
            "TABLEMATES_BASE_URL": "https://tablemates.example",
        }
        with (
            patch.dict("os.environ", environment),
            patch.object(server, "japan_today", return_value=date(2026, 1, 1)),
            patch.object(
                server,
                "stripe_api_request",
                return_value={
                    "id": "cs_test_example",
                    "url": "https://checkout.stripe.com/c/pay/cs_test_example",
                },
            ) as stripe_request,
        ):
            status, _, response = self.request_json(
                "/api/checkout",
                {
                    "event": "Around the world, one dinner table",
                    "name": "Jamie Example",
                    "email": "Jamie@example.com",
                    "guests": 2,
                    "language": "English",
                },
                method="POST",
            )
            self.assertEqual(status, 201)
            self.assertEqual(response["checkout_url"], "https://checkout.stripe.com/c/pay/cs_test_example")
            checkout_data = stripe_request.call_args.args[2]
            self.assertEqual(checkout_data["line_items[0][price_data][unit_amount]"], "2800")
            self.assertEqual(checkout_data["line_items[0][quantity]"], "2")
            self.assertEqual(checkout_data["customer_email"], "jamie@example.com")

            connection = sqlite3.connect(self.database)
            try:
                booking = connection.execute(
                    "SELECT id, total_jpy, status FROM bookings WHERE stripe_session_id = ?",
                    ("cs_test_example",),
                ).fetchone()
            finally:
                connection.close()
            self.assertEqual(booking[1:], (5600, "pending_payment"))

            webhook_event = {
                "id": "evt_test_example",
                "type": "checkout.session.completed",
                "data": {
                    "object": {
                        "id": "cs_test_example",
                        "mode": "payment",
                        "payment_status": "paid",
                        "currency": "jpy",
                        "amount_total": 5600,
                        "metadata": {"booking_id": booking[0]},
                    }
                },
            }
            body = json.dumps(webhook_event, separators=(",", ":")).encode("utf-8")
            timestamp = str(int(server.time.time()))
            signature = hmac.new(
                b"whsec_example",
                f"{timestamp}.{body.decode('utf-8')}".encode("utf-8"),
                hashlib.sha256,
            ).hexdigest()
            status, _, response = self.request_raw(
                "/api/stripe/webhook",
                body,
                "application/json",
                {"Stripe-Signature": f"t={timestamp},v1={signature}"},
            )
            self.assertEqual(status, 200)
            self.assertTrue(json.loads(response)["received"])
            status, _, response = self.request_raw(
                "/api/stripe/webhook",
                body,
                "application/json",
                {"Stripe-Signature": f"t={timestamp},v1={signature}"},
            )
            self.assertEqual(status, 200)

            connection = sqlite3.connect(self.database)
            try:
                payment_status = connection.execute(
                    "SELECT status FROM bookings WHERE id = ?",
                    (booking[0],),
                ).fetchone()[0]
            finally:
                connection.close()
            self.assertEqual(payment_status, "paid")

    def test_stripe_checkout_does_not_sell_more_than_eight_seats(self):
        environment = {
            "TABLEMATES_BOOKINGS_ENABLED": "1",
            "STRIPE_SECRET_KEY": "sk_test_example",
            "STRIPE_WEBHOOK_SECRET": "whsec_example",
            "TABLEMATES_BASE_URL": "https://tablemates.example",
        }
        checkout_responses = [
            {"id": "cs_test_first", "url": "https://checkout.stripe.com/c/pay/cs_test_first"},
            {"id": "cs_test_second", "url": "https://checkout.stripe.com/c/pay/cs_test_second"},
        ]
        with (
            patch.dict("os.environ", environment),
            patch.object(server, "japan_today", return_value=date(2026, 1, 1)),
            patch.object(server, "stripe_api_request", side_effect=checkout_responses) as stripe_request,
        ):
            for guests in (4, 4):
                status, _, _ = self.request_json(
                    "/api/checkout",
                    {
                        "event": "Around the world, one dinner table",
                        "name": "Jamie",
                        "email": "jamie@example.com",
                        "guests": guests,
                        "language": "English",
                    },
                    method="POST",
                )
                self.assertEqual(status, 201)
            status, _, response = self.request_json(
                "/api/checkout",
                {
                    "event": "Around the world, one dinner table",
                    "name": "Jamie",
                    "email": "jamie@example.com",
                    "guests": 1,
                    "language": "English",
                },
                method="POST",
            )
        self.assertEqual(status, 400)
        self.assertIn("enough seats", response["error"])
        self.assertEqual(stripe_request.call_count, 2)

    def test_community_media_is_public_after_signed_in_upload(self):
        boundary = "tablemates-test-boundary"
        image_bytes = b"\xff\xd8\xff" + b"test-image-bytes"
        body = (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="caption"\r\n\r\n'
            "A shared table in Osaka.\r\n"
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="media"; filename="meal.jpg"\r\n'
            "Content-Type: image/jpeg\r\n\r\n"
        ).encode("utf-8") + image_bytes + f"\r\n--{boundary}--\r\n".encode("utf-8")

        status, _, response = self.request_raw(
            "/api/community",
            body,
            f"multipart/form-data; boundary={boundary}",
        )
        self.assertEqual(status, 401)
        self.assertIn("Log in", json.loads(response)["error"])

        self.request_json(
            "/api/register",
            {"name": "Jamie", "email": "community@example.com", "password": "A-private-demo-password"},
        )
        status, _, response = self.request_raw(
            "/api/community",
            body,
            f"multipart/form-data; boundary={boundary}",
        )
        self.assertEqual(status, 201)
        post = json.loads(response)["post"]
        self.assertEqual(post["name"], "Jamie")

        status, _, feed = self.request_json("/api/community")
        self.assertEqual(status, 200)
        self.assertEqual(feed["posts"][0]["caption"], "A shared table in Osaka.")
        self.assertTrue(feed["posts"][0]["media_url"].startswith("/media/"))
        with self.client.open(self.base_url + feed["posts"][0]["media_url"], timeout=5) as media:
            self.assertEqual(media.headers.get_content_type(), "image/jpeg")
            self.assertEqual(media.read(), image_bytes)

    def test_community_media_rejects_mismatched_file_signatures(self):
        boundary = "tablemates-test-boundary"
        body = (
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="caption"\r\n\r\n'
            "Not really a photo.\r\n"
            f"--{boundary}\r\n"
            'Content-Disposition: form-data; name="media"; filename="meal.jpg"\r\n'
            "Content-Type: image/jpeg\r\n\r\n"
            "not-a-jpeg\r\n"
            f"--{boundary}--\r\n"
        ).encode("utf-8")
        self.request_json(
            "/api/register",
            {"name": "Jamie", "email": "signature@example.com", "password": "A-private-demo-password"},
        )
        status, _, response = self.request_raw(
            "/api/community",
            body,
            f"multipart/form-data; boundary={boundary}",
        )
        self.assertEqual(status, 400)
        self.assertIn("JPEG", json.loads(response)["error"])

    def test_website_assets_are_served(self):
        for path, content_type in (
            ("/styles.css", "text/css; charset=utf-8"),
            ("/app.js", "text/javascript; charset=utf-8"),
        ):
            with self.subTest(path=path):
                with self.client.open(self.base_url + path, timeout=5) as response:
                    self.assertEqual(response.status, 200)
                    self.assertEqual(response.headers.get_content_type(), content_type.split(";")[0])
                    self.assertEqual(response.headers.get_content_charset(), "utf-8")
                    self.assertTrue(response.read())

    def test_japanese_is_default_and_all_added_copy_has_complete_translations(self):
        page = (server.ROOT / "index.html").read_text(encoding="utf-8")
        app = (server.ROOT / "app.js").read_text(encoding="utf-8")
        self.assertIn('<html lang="ja">', page)
        self.assertIn('<option value="ja" selected>', page)
        for language in ("en", "ja", "bn", "ne", "si", "fr"):
            self.assertIn(f'<option value="{language}"', page)
        self.assertIn("document.documentElement.lang = languageLocales[language] || language", app)

        base_match = re.search(
            r"const translationRows = \[(.*?)\n    \];\n    const additionalTranslationRows",
            app,
            re.DOTALL,
        )
        match = re.search(
            r"const additionalTranslationRows = \[(.*?)\n    \];\n    const eventTranslationRows",
            app,
            re.DOTALL,
        )
        event_match = re.search(
            r"const eventTranslationRows = \[(.*?)\n    \];\n    const supportedLanguages",
            app,
            re.DOTALL,
        )
        self.assertIsNotNone(base_match)
        self.assertIsNotNone(match)
        self.assertIsNotNone(event_match)
        base_rows = json.loads(re.sub(r",\s*]", "]", f"[{base_match.group(1)}]"))
        rows = json.loads(re.sub(r",\s*]", "]", f"[{match.group(1)}]"))
        event_rows = json.loads(re.sub(r",\s*]", "]", f"[{event_match.group(1)}]"))
        self.assertTrue(rows)
        self.assertTrue(all(len(row) == 5 and all(row) for row in rows))
        missing_keys = {row[0] for row in base_rows if len(row) < 6}
        self.assertEqual(missing_keys, {row[0] for row in rows})
        self.assertTrue(event_rows)
        self.assertTrue(all(len(row) == 6 and all(row) for row in event_rows))
        self.assertIn("additionalTranslationRows.map((row) => [row[0], row[index - 1]])", app)
        event_translations = {row[0] for row in event_rows}
        menu_section = re.search(
            r"const eventMenus = \{(.*?)\n    \};\n    const eventGuides",
            app,
            re.DOTALL,
        )
        guide_section = re.search(
            r"const eventGuides = \{(.*?)\n    \};\n    let activeEventMenuCard",
            app,
            re.DOTALL,
        )
        self.assertIsNotNone(menu_section)
        self.assertIsNotNone(guide_section)
        menu_copy = re.findall(r'^\s*(?:intro|name|alt):\s*"([^"]+)"', menu_section.group(1), re.MULTILINE)
        guide_copy = re.findall(r'^\s*(?:purpose|format):\s*"([^"]+)"', guide_section.group(1), re.MULTILINE)
        self.assertTrue(menu_copy)
        self.assertTrue(guide_copy)
        self.assertEqual(event_translations.intersection(menu_copy), set(menu_copy))
        self.assertEqual(event_translations.intersection(guide_copy), set(guide_copy))
        self.assertIn("translate(menu.intro)", app)
        self.assertIn("itemName.textContent = translate(name)", app)
        self.assertIn("image.alt = translate(", app)
        self.assertIn("if (document.getElementById(\"eventMenuDialog\").open) renderActiveEventMenu()", app)

    def test_rejects_cross_origin_account_requests(self):
        request = Request(
            self.base_url + "/api/register",
            data=json.dumps({"name": "Jamie", "email": "jamie@example.com", "password": "Password123"}).encode(),
            headers={
                "Content-Type": "application/json",
                "Origin": "http://example.invalid",
            },
        )
        with self.assertRaises(HTTPError) as raised:
            self.client.open(request, timeout=5)
        self.assertEqual(raised.exception.code, 403)

    def test_event_comments_persist_and_are_listed_for_the_event(self):
        with patch.object(server, "japan_today", return_value=date(2027, 10, 25)):
            status, _, response = self.request_json(
                "/api/comments",
                {
                    "event": "Osaka after dark: a local food walk",
                    "name": "Jamie",
                    "rating": 5,
                    "comment": "A lovely evening with great food.",
                },
                method="POST",
            )
        self.assertEqual(status, 201)
        self.assertEqual(response["comment"]["name"], "Jamie")
        self.assertEqual(response["comment"]["rating"], 5)

        status, _, comments = self.request_json(
            "/api/comments?event=Osaka%20after%20dark%3A%20a%20local%20food%20walk"
        )
        self.assertEqual(status, 200)
        self.assertEqual(comments["count"], 1)
        self.assertEqual(comments["comments"][0]["comment"], "A lovely evening with great food.")

        _, _, unrelated = self.request_json(
            "/api/comments?event=Around%20the%20world%2C%20one%20dinner%20table"
        )
        self.assertEqual(unrelated["count"], 0)

    def test_rejects_comments_before_event_date_and_invalid_events(self):
        payload = {
            "event": "Kyoto tea ceremony and seasonal sweets",
            "name": "Jamie",
            "rating": 5,
            "comment": "Looking forward to it.",
        }
        with patch.object(server, "japan_today", return_value=date(2027, 11, 5)):
            status, _, response = self.request_json("/api/comments", payload, method="POST")
        self.assertEqual(status, 400)
        self.assertIn("after the event date", response["error"])

        payload["event"] = "An event that does not exist"
        with patch.object(server, "japan_today", return_value=date(2027, 11, 5)):
            status, _, response = self.request_json("/api/comments", payload, method="POST")
        self.assertEqual(status, 400)
        self.assertIn("valid event", response["error"])

    def test_rejects_invalid_comment_ratings_and_lengths(self):
        payload = {
            "event": "Osaka after dark: a local food walk",
            "name": "Jamie",
            "rating": 6,
            "comment": "Not a valid rating.",
        }
        with patch.object(server, "japan_today", return_value=date(2027, 10, 25)):
            status, _, response = self.request_json("/api/comments", payload, method="POST")
        self.assertEqual(status, 400)
        self.assertIn("rating", response["error"])

        payload["rating"] = 5
        payload["comment"] = " " * 501
        with patch.object(server, "japan_today", return_value=date(2027, 10, 25)):
            status, _, response = self.request_json("/api/comments", payload, method="POST")
        self.assertEqual(status, 400)
        self.assertIn("500 characters", response["error"])

if __name__ == "__main__":
    unittest.main()
