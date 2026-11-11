import argparse
from contextlib import contextmanager
from email.message import Message
from email.parser import BytesParser
from email.policy import default as email_policy
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
import uuid
from datetime import date, datetime, timedelta, timezone
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, unquote, urlsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("TABLEMATES_DATA_DIR", ROOT / "data"))
DATABASE = DATA_DIR / "tablemates.sqlite3"
SESSION_COOKIE = "tablemates_session"
SESSION_DAYS = 30
PASSWORD_ITERATIONS = 310_000
MAX_REQUEST_BYTES = 16_384
MAX_IMAGE_BYTES = 5 * 1024 * 1024
MAX_VIDEO_BYTES = 20 * 1024 * 1024
MAX_UPLOAD_REQUEST_BYTES = MAX_VIDEO_BYTES + 64 * 1024
MAX_WEBHOOK_BYTES = 256 * 1024
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
DUMMY_SALT = bytes.fromhex("2f2b136e968912e056abb34156fa89fc")
EVENT_DATES = {
    "Osaka after dark: a local food walk": date(2027, 10, 24),
    "Around the world, one dinner table": date(2027, 10, 30),
    "Make your own little piece of Japan": date(2027, 10, 31),
    "Sweet Japan, from mochi to matcha": date(2027, 11, 1),
    "Kyoto market morning with Yuki": date(2027, 11, 4),
    "Tokyo old-town bites with Kenji": date(2027, 10, 28),
    "Nara street food and mochi walk": date(2027, 11, 8),
    "Tea passport: five countries, one table": date(2027, 10, 27),
    "Kyoto tea ceremony and seasonal sweets": date(2027, 11, 6),
    "Home flavors: a South Asian dinner": date(2027, 11, 2),
    "Sunday brunch: new in Tokyo": date(2027, 11, 8),
    "International New Year food gathering": date(2027, 1, 1),
}
EVENT_PRICES = {
    "Osaka after dark: a local food walk": 5800,
    "Around the world, one dinner table": 2800,
    "Make your own little piece of Japan": 3900,
    "Sweet Japan, from mochi to matcha": 3200,
    "Kyoto market morning with Yuki": 4900,
    "Tokyo old-town bites with Kenji": 4600,
    "Nara street food and mochi walk": 4200,
    "Tea passport: five countries, one table": 3800,
    "Kyoto tea ceremony and seasonal sweets": 5200,
    "Home flavors: a South Asian dinner": 3000,
    "Sunday brunch: new in Tokyo": 2500,
    "International New Year food gathering": 2000,
}
EVENT_CAPACITIES = {event_name: 8 for event_name in EVENT_PRICES}
GUEST_LANGUAGES = {"English", "日本語", "বাংলা", "नेपाली", "සිංහල", "Français"}
MEDIA_DIR = Path(os.environ.get("TABLEMATES_MEDIA_DIR", DATA_DIR / "media"))
ALLOWED_MEDIA_TYPES = {
    "image/jpeg": (".jpg", MAX_IMAGE_BYTES),
    "image/png": (".png", MAX_IMAGE_BYTES),
    "image/webp": (".webp", MAX_IMAGE_BYTES),
    "video/mp4": (".mp4", MAX_VIDEO_BYTES),
    "video/webm": (".webm", MAX_VIDEO_BYTES),
}


def utc_now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


@contextmanager
def connect_database():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE, timeout=10)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def initialize_database():
    with connect_database() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL COLLATE NOCASE UNIQUE,
                password_salt BLOB NOT NULL,
                password_hash BLOB NOT NULL,
                created_at TEXT NOT NULL,
                last_login_at TEXT
            );
            CREATE TABLE IF NOT EXISTS sessions (
                token_hash BLOB PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                expires_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS sessions_expiry_idx
                ON sessions(expires_at);
            CREATE TABLE IF NOT EXISTS event_comments (
                id TEXT PRIMARY KEY,
                event_name TEXT NOT NULL,
                name TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
                comment TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS event_comments_event_idx
                ON event_comments(event_name, created_at DESC);
            CREATE TABLE IF NOT EXISTS media_posts (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                name TEXT NOT NULL,
                caption TEXT NOT NULL,
                filename TEXT NOT NULL UNIQUE,
                media_type TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS media_posts_created_idx
                ON media_posts(created_at DESC);
            CREATE TABLE IF NOT EXISTS bookings (
                id TEXT PRIMARY KEY,
                event_name TEXT NOT NULL,
                event_date TEXT NOT NULL,
                guest_name TEXT NOT NULL,
                guest_email TEXT NOT NULL,
                guest_language TEXT NOT NULL,
                guest_count INTEGER NOT NULL,
                total_jpy INTEGER NOT NULL,
                status TEXT NOT NULL,
                stripe_session_id TEXT UNIQUE,
                expires_at TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            """
        )


def hash_password(password, salt):
    return hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        PASSWORD_ITERATIONS,
        dklen=32,
    )


def hash_session_token(token):
    return hashlib.sha256(token.encode("ascii")).digest()


def japan_today():
    return datetime.now(timezone(timedelta(hours=9))).date()


def user_response(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "created_at": row["created_at"],
    }


def stripe_checkout_is_configured():
    secret_key = os.environ.get("STRIPE_SECRET_KEY", "")
    webhook_secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    bookings_enabled = os.environ.get("TABLEMATES_BOOKINGS_ENABLED") == "1"
    return (
        bookings_enabled
        and secret_key.startswith(("sk_test_", "sk_live_"))
        and webhook_secret.startswith("whsec_")
        and bool(public_base_url())
    )


def public_base_url():
    configured_url = os.environ.get("TABLEMATES_BASE_URL", "").strip().rstrip("/")
    if not configured_url:
        host = os.environ.get("HOST", "127.0.0.1")
        port = os.environ.get("PORT", "8000")
        if host in ("127.0.0.1", "localhost"):
            configured_url = f"http://{host}:{port}"
        else:
            return ""
    try:
        parsed_url = urlsplit(configured_url)
        hostname = parsed_url.hostname
        parsed_url.port
    except ValueError:
        return ""
    if (
        not hostname
        or parsed_url.username
        or parsed_url.password
        or parsed_url.path not in ("", "/")
        or parsed_url.query
        or parsed_url.fragment
    ):
        return ""
    if parsed_url.scheme == "https":
        return configured_url
    if parsed_url.scheme == "http" and hostname in ("127.0.0.1", "localhost", "::1"):
        return configured_url
    return ""


def stripe_api_request(method, path, data=None, idempotency_key=None):
    secret_key = os.environ.get("STRIPE_SECRET_KEY", "")
    headers = {"Authorization": f"Bearer {secret_key}"}
    encoded_data = None
    if data is not None:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
        encoded_data = urlencode(data).encode("utf-8")
    if idempotency_key:
        headers["Idempotency-Key"] = idempotency_key
    request = Request(
        f"https://api.stripe.com/v1/{path.lstrip('/')}",
        data=encoded_data,
        headers=headers,
        method=method,
    )
    try:
        with urlopen(request, timeout=20) as response:
            payload = json.loads(response.read())
    except HTTPError as error:
        error_body = error.read(4096).decode("utf-8", errors="replace")
        try:
            message = json.loads(error_body).get("error", {}).get("message")
        except (json.JSONDecodeError, AttributeError):
            message = None
        raise RuntimeError(message or "Stripe could not complete the checkout request.") from error
    except URLError as error:
        raise RuntimeError("Stripe could not be reached. Please try again.") from error
    except (json.JSONDecodeError, UnicodeDecodeError) as error:
        raise RuntimeError("Stripe returned an invalid response. Please try again.") from error
    if not isinstance(payload, dict):
        raise RuntimeError("Stripe returned an invalid response. Please try again.")
    return payload


def media_type_for_content(content_type, content):
    if content_type == "image/jpeg" and content.startswith(b"\xff\xd8\xff"):
        return content_type
    if content_type == "image/png" and content.startswith(b"\x89PNG\r\n\x1a\n"):
        return content_type
    if content_type == "image/webp" and content.startswith(b"RIFF") and content[8:12] == b"WEBP":
        return content_type
    if content_type == "video/mp4" and len(content) >= 12 and content[4:8] == b"ftyp":
        return content_type
    if content_type == "video/webm" and content.startswith(b"\x1a\x45\xdf\xa3"):
        return content_type
    return None


def stripe_signature_is_valid(payload, signature_header, secret, now=None):
    timestamp = None
    signatures = []
    for entry in signature_header.split(","):
        key, separator, value = entry.partition("=")
        if not separator:
            continue
        if key == "t":
            timestamp = value
        elif key == "v1":
            signatures.append(value)
    if not timestamp or not signatures:
        return False
    try:
        timestamp_value = int(timestamp)
    except ValueError:
        return False
    current_time = time.time() if now is None else now
    if abs(current_time - timestamp_value) > 300:
        return False
    signed_payload = f"{timestamp}.{payload.decode('utf-8', errors='strict')}".encode("utf-8")
    expected_signature = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return any(hmac.compare_digest(expected_signature, value) for value in signatures)


class TableMatesHandler(BaseHTTPRequestHandler):
    server_version = "TableMatesLocal/1.0"

    def log_message(self, format_string, *args):
        if self.path.startswith("/api/"):
            return
        super().log_message(format_string, *args)

    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "same-origin")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, status, payload, extra_headers=None):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        if extra_headers:
            for name, value in extra_headers:
                self.send_header(name, value)
        self.end_headers()
        self.wfile.write(body)

    def read_json(self):
        content_type = self.headers.get("Content-Type", "")
        if not content_type.lower().startswith("application/json"):
            raise ValueError("Send this request as JSON.")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise ValueError("The request size is invalid.") from error
        if length < 1 or length > MAX_REQUEST_BYTES:
            raise ValueError("The request is empty or too large.")
        try:
            payload = json.loads(self.rfile.read(length))
        except (json.JSONDecodeError, UnicodeDecodeError) as error:
            raise ValueError("The request contains invalid JSON.") from error
        if not isinstance(payload, dict):
            raise ValueError("The request must contain a JSON object.")
        return payload

    def read_multipart(self):
        content_type = self.headers.get("Content-Type", "")
        content_type_header = Message()
        content_type_header["Content-Type"] = content_type
        boundary = content_type_header.get_param("boundary", header="Content-Type")
        if not content_type.lower().startswith("multipart/form-data") or not boundary or len(boundary) > 70:
            raise ValueError("Send the photo or video as a multipart form.")
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise ValueError("The upload size is invalid.") from error
        if length < 1 or length > MAX_UPLOAD_REQUEST_BYTES:
            raise ValueError("Choose a photo up to 5 MB or a video up to 20 MB.")
        body = self.rfile.read(length)
        headers = f"MIME-Version: 1.0\r\nContent-Type: {content_type}\r\n\r\n".encode("ascii")
        message = BytesParser(policy=email_policy).parsebytes(headers + body)
        if not message.is_multipart():
            raise ValueError("The upload form is invalid.")
        fields = {}
        upload = None
        for part in message.iter_parts():
            field_name = part.get_param("name", header="content-disposition")
            if field_name == "media":
                upload = {
                    "filename": part.get_filename(),
                    "content_type": part.get_content_type().lower(),
                    "content": part.get_payload(decode=True) or b"",
                }
            elif field_name in ("caption",):
                charset = part.get_content_charset() or "utf-8"
                try:
                    fields[field_name] = (part.get_payload(decode=True) or b"").decode(charset)
                except (LookupError, UnicodeDecodeError) as error:
                    raise ValueError("The caption contains invalid text.") from error
        if upload is None:
            raise ValueError("Choose a photo or video to share.")
        return fields, upload

    def discard_request_body(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return False
        if length < 0 or length > MAX_UPLOAD_REQUEST_BYTES:
            return False
        self.rfile.read(length)
        return True

    def mark_booking_expired(self, session):
        metadata = session.get("metadata") or {}
        booking_id = metadata.get("booking_id")
        session_id = session.get("id")
        if not isinstance(booking_id, str) or not isinstance(session_id, str):
            return False
        with connect_database() as connection:
            cursor = connection.execute(
                """
                UPDATE bookings SET status = 'expired'
                WHERE id = ? AND stripe_session_id = ? AND status = 'pending_payment'
                """,
                (booking_id, session_id),
            )
        return cursor.rowcount == 1

    def request_body(self, max_bytes):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as error:
            raise ValueError("The request size is invalid.") from error
        if length < 1 or length > max_bytes:
            raise ValueError("The request is empty or too large.")
        return self.rfile.read(length)

    def request_origin_is_local(self):
        origin = self.headers.get("Origin")
        return origin is None or urlsplit(origin).netloc == self.headers.get("Host")

    def get_session_token(self):
        cookie_header = self.headers.get("Cookie")
        if not cookie_header:
            return None
        cookies = SimpleCookie()
        try:
            cookies.load(cookie_header)
        except Exception:
            return None
        morsel = cookies.get(SESSION_COOKIE)
        return morsel.value if morsel else None

    def get_current_user(self):
        token = self.get_session_token()
        if not token:
            return None
        token_hash = hash_session_token(token)
        with connect_database() as connection:
            connection.execute(
                "DELETE FROM sessions WHERE expires_at <= ?",
                (utc_now(),),
            )
            return connection.execute(
                """
                SELECT users.id, users.name, users.email, users.created_at
                FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token_hash = ? AND sessions.expires_at > ?
                """,
                (token_hash, utc_now()),
            ).fetchone()

    def mark_booking_paid(self, session):
        metadata = session.get("metadata") or {}
        booking_id = metadata.get("booking_id")
        session_id = session.get("id")
        if (
            not isinstance(booking_id, str)
            or not isinstance(session_id, str)
            or session.get("payment_status") != "paid"
            or session.get("mode") != "payment"
            or session.get("currency") != "jpy"
        ):
            return False
        with connect_database() as connection:
            booking = connection.execute(
                """
                SELECT id, total_jpy, status FROM bookings
                WHERE id = ? AND stripe_session_id = ?
                """,
                (booking_id, session_id),
            ).fetchone()
            if (
                not booking
                or session.get("amount_total") != booking["total_jpy"]
                or booking["status"] not in ("pending_payment", "paid")
            ):
                return False
            if booking["status"] == "paid":
                return True
            connection.execute(
                """
                UPDATE bookings SET status = 'paid'
                WHERE id = ? AND stripe_session_id = ? AND status = 'pending_payment'
                """,
                (booking_id, session_id),
            )
        return True

    def serve_media(self, media_id):
        try:
            media_id = str(uuid.UUID(media_id))
        except ValueError:
            self.send_error(404)
            return
        with connect_database() as connection:
            post = connection.execute(
                "SELECT filename, media_type FROM media_posts WHERE id = ?",
                (media_id,),
            ).fetchone()
        if not post:
            self.send_error(404)
            return
        target = (MEDIA_DIR / post["filename"]).resolve()
        if target.parent != MEDIA_DIR.resolve() or not target.is_file():
            self.send_error(404)
            return
        body = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", post["media_type"])
        self.send_header("Content-Length", str(len(body)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Content-Disposition", "inline")
        self.end_headers()
        self.wfile.write(body)

    def create_session(self, user_id):
        token = secrets.token_urlsafe(32)
        expires_at = datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS)
        with connect_database() as connection:
            connection.execute(
                "DELETE FROM sessions WHERE expires_at <= ?",
                (utc_now(),),
            )
            connection.execute(
                "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
                (hash_session_token(token), user_id, expires_at.isoformat(timespec="seconds")),
            )
        cookie = (
            f"{SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax; "
            f"Max-Age={SESSION_DAYS * 24 * 60 * 60}"
            f"{'; Secure' if os.environ.get('TABLEMATES_SECURE_COOKIES') == '1' else ''}"
        )
        return [("Set-Cookie", cookie)]

    def do_GET(self):
        parsed_url = urlsplit(self.path)
        path = unquote(parsed_url.path)
        if path.startswith("/media/"):
            self.serve_media(path.removeprefix("/media/"))
            return
        if path == "/api/me":
            user = self.get_current_user()
            self.send_json(200, {"user": user_response(user) if user else None})
            return
        if path == "/api/checkout/status":
            self.send_json(200, {"enabled": stripe_checkout_is_configured()})
            return
        if path == "/api/checkout/confirm":
            session_ids = parse_qs(parsed_url.query, keep_blank_values=True).get("session_id", [])
            if len(session_ids) != 1 or not session_ids[0]:
                self.send_json(400, {"error": "The checkout session is missing."})
                return
            try:
                with connect_database() as connection:
                    booking = connection.execute(
                        """
                        SELECT id, status, event_name, event_date, guest_count
                        FROM bookings WHERE stripe_session_id = ?
                        """,
                        (session_ids[0],),
                    ).fetchone()
                if not booking:
                    self.send_json(404, {"error": "This checkout session was not found."})
                    return
                if booking["status"] != "paid":
                    session = stripe_api_request("GET", f"checkout/sessions/{session_ids[0]}")
                    if not self.mark_booking_paid(session):
                        self.send_json(202, {"status": "pending_payment"})
                        return
                    with connect_database() as connection:
                        booking = connection.execute(
                            """
                            SELECT event_name, event_date, guest_count
                            FROM bookings WHERE stripe_session_id = ?
                            """,
                            (session_ids[0],),
                        ).fetchone()
                self.send_json(200, {
                    "status": "paid",
                    "booking": {
                        "event_name": booking["event_name"],
                        "event_date": booking["event_date"],
                        "guest_count": booking["guest_count"],
                    },
                })
            except (RuntimeError, sqlite3.Error):
                self.log_error("Stripe checkout confirmation failed.")
                self.send_json(502, {"error": "Your payment is still being confirmed. Check your email before trying again."})
            return
        if path == "/api/community":
            try:
                with connect_database() as connection:
                    posts = connection.execute(
                        """
                        SELECT id, name, caption, media_type, created_at
                        FROM media_posts
                        ORDER BY created_at DESC, id DESC
                        LIMIT 60
                        """
                    ).fetchall()
                self.send_json(200, {
                    "posts": [
                        {
                            **dict(post),
                            "media_url": f"/media/{post['id']}",
                        }
                        for post in posts
                    ]
                })
            except sqlite3.Error:
                self.log_error("Community media database request failed.")
                self.send_json(500, {"error": "Community posts are temporarily unavailable."})
            return
        if path == "/api/comments":
            events = parse_qs(parsed_url.query, keep_blank_values=True).get("event", [])
            if len(events) != 1 or events[0] not in EVENT_DATES:
                self.send_json(400, {"error": "Choose a valid event."})
                return
            try:
                with connect_database() as connection:
                    count = connection.execute(
                        "SELECT COUNT(*) FROM event_comments WHERE event_name = ?",
                        (events[0],),
                    ).fetchone()[0]
                    comments = connection.execute(
                        """
                        SELECT name, rating, comment, created_at
                        FROM event_comments
                        WHERE event_name = ?
                        ORDER BY created_at DESC, id DESC
                        LIMIT 100
                        """,
                        (events[0],),
                    ).fetchall()
                self.send_json(200, {"count": count, "comments": [dict(comment) for comment in comments]})
            except sqlite3.Error:
                self.log_error("Event comment database request failed.")
                self.send_json(500, {"error": "Event comments are temporarily unavailable."})
            return
        static_files = {
            "/": ("index.html", "text/html; charset=utf-8"),
            "/index.html": ("index.html", "text/html; charset=utf-8"),
            "/image.jpg": ("image.jpg", "image/jpeg"),
            "/styles.css": ("styles.css", "text/css; charset=utf-8"),
            "/app.js": ("app.js", "text/javascript; charset=utf-8"),
        }
        if path not in static_files:
            self.send_error(404)
            return
        filename, content_type = static_files[path]
        target = (ROOT / filename).resolve()
        if target.parent != ROOT or not target.is_file():
            self.send_error(404)
            return
        body = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        path = urlsplit(self.path).path
        if not path.startswith("/api/"):
            self.send_error(404)
            return
        if path == "/api/stripe/webhook":
            self.process_stripe_webhook()
            return
        if not self.request_origin_is_local():
            self.discard_request_body()
            self.send_json(403, {"error": "This local account server only accepts requests from this site."})
            return
        try:
            if path == "/api/register":
                self.register()
            elif path == "/api/login":
                self.login()
            elif path == "/api/logout":
                self.logout()
            elif path == "/api/comments":
                self.submit_comment()
            elif path == "/api/community":
                self.submit_media_post()
            elif path == "/api/checkout":
                self.start_checkout()
            else:
                self.discard_request_body()
                self.send_json(404, {"error": "This account endpoint does not exist."})
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
        except RuntimeError as error:
            self.log_error("Stripe checkout request failed: %s", error)
            self.send_json(502, {"error": str(error)})
        except sqlite3.Error:
            self.log_error("Account database request failed.")
            self.send_json(500, {"error": "The local account database is unavailable. Check the server console."})
        except OSError:
            self.log_error("Community media storage request failed.")
            self.send_json(500, {"error": "The photo or video could not be saved. Check the server storage."})

    def submit_media_post(self):
        user = self.get_current_user()
        if not user:
            self.discard_request_body()
            self.send_json(401, {"error": "Log in or create an account before sharing a photo or video."})
            return
        fields, upload = self.read_multipart()
        caption = fields.get("caption", "").strip()
        if not caption or len(caption) > 280:
            raise ValueError("Write a caption between 1 and 280 characters.")
        if not upload["filename"]:
            raise ValueError("Choose a photo or video to share.")
        media_type = media_type_for_content(upload["content_type"], upload["content"])
        if media_type not in ALLOWED_MEDIA_TYPES:
            raise ValueError("Use a JPEG, PNG, or WebP photo, or an MP4 or WebM video.")
        extension, max_bytes = ALLOWED_MEDIA_TYPES[media_type]
        if not upload["content"] or len(upload["content"]) > max_bytes:
            limit_mb = max_bytes // (1024 * 1024)
            raise ValueError(f"This {('photo' if media_type.startswith('image/') else 'video')} must be no larger than {limit_mb} MB.")

        post_id = str(uuid.uuid4())
        filename = f"{post_id}{extension}"
        MEDIA_DIR.mkdir(parents=True, exist_ok=True)
        target = MEDIA_DIR / filename
        target.write_bytes(upload["content"])
        created_at = utc_now()
        try:
            with connect_database() as connection:
                connection.execute(
                    """
                    INSERT INTO media_posts (id, user_id, name, caption, filename, media_type, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (post_id, user["id"], user["name"], caption, filename, media_type, created_at),
                )
        except sqlite3.Error:
            target.unlink(missing_ok=True)
            raise
        self.send_json(201, {
            "post": {
                "id": post_id,
                "name": user["name"],
                "caption": caption,
                "media_type": media_type,
                "created_at": created_at,
                "media_url": f"/media/{post_id}",
            }
        })

    def start_checkout(self):
        if not stripe_checkout_is_configured():
            self.discard_request_body()
            self.send_json(503, {"error": "Secure checkout is not ready yet. Please contact the TableMates team."})
            return
        payload = self.read_json()
        event_name = payload.get("event")
        name = payload.get("name")
        email = payload.get("email")
        guest_count = payload.get("guests")
        guest_language = payload.get("language")
        if not isinstance(event_name, str) or event_name not in EVENT_PRICES:
            raise ValueError("Choose a bookable event.")
        if not isinstance(name, str) or not isinstance(email, str):
            raise ValueError("Enter your name and email address.")
        if not isinstance(guest_language, str) or guest_language not in GUEST_LANGUAGES:
            raise ValueError("Choose a supported language.")
        name = name.strip()
        email = email.strip().casefold()
        if not name or len(name) > 100:
            raise ValueError("Enter a name between 1 and 100 characters.")
        if len(email) > 254 or not EMAIL_PATTERN.fullmatch(email):
            raise ValueError("Enter a valid email address.")
        if isinstance(guest_count, bool) or not isinstance(guest_count, int) or not 1 <= guest_count <= 4:
            raise ValueError("Choose between 1 and 4 guests.")
        if EVENT_DATES[event_name] <= japan_today():
            raise ValueError("This event is no longer available to book.")

        booking_id = str(uuid.uuid4())
        price = EVENT_PRICES[event_name]
        total = price * guest_count
        created_at = utc_now()
        expires_at = datetime.now(timezone.utc) + timedelta(minutes=40)
        with connect_database() as connection:
            connection.execute("BEGIN IMMEDIATE")
            reserved_seats = connection.execute(
                """
                SELECT COALESCE(SUM(guest_count), 0)
                FROM bookings
                WHERE event_name = ? AND status IN ('creating_checkout', 'pending_payment')
                """,
                (event_name,),
            ).fetchone()[0]
            if reserved_seats + guest_count > EVENT_CAPACITIES[event_name]:
                raise ValueError("This event does not have enough seats for your group.")
            connection.execute(
                """
                INSERT INTO bookings
                    (id, event_name, event_date, guest_name, guest_email, guest_count,
                     guest_language, total_jpy, status, expires_at, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'creating_checkout', ?, ?)
                """,
                (
                    booking_id,
                    event_name,
                    EVENT_DATES[event_name].isoformat(),
                    name,
                    email,
                    guest_count,
                    guest_language,
                    total,
                    expires_at.isoformat(timespec="seconds"),
                    created_at,
                ),
            )

        base_url = public_base_url()
        checkout_data = {
            "mode": "payment",
            "success_url": f"{base_url}/?checkout=success&session_id={{CHECKOUT_SESSION_ID}}#home",
            "cancel_url": f"{base_url}/?checkout=cancelled#experiences",
            "client_reference_id": booking_id,
            "customer_email": email,
            "payment_method_types[0]": "card",
            "expires_at": str(int(expires_at.timestamp())),
            "line_items[0][price_data][currency]": "jpy",
            "line_items[0][price_data][product_data][name]": event_name,
            "line_items[0][price_data][unit_amount]": str(price),
            "line_items[0][quantity]": str(guest_count),
            "metadata[booking_id]": booking_id,
        }
        try:
            checkout = stripe_api_request(
                "POST",
                "checkout/sessions",
                checkout_data,
                idempotency_key=booking_id,
            )
        except RuntimeError:
            with connect_database() as connection:
                connection.execute(
                    "UPDATE bookings SET status = 'checkout_failed' WHERE id = ?",
                    (booking_id,),
                )
            raise
        checkout_url = checkout.get("url")
        checkout_id = checkout.get("id")
        checkout_destination = urlsplit(checkout_url) if isinstance(checkout_url, str) else None
        if (
            not isinstance(checkout_id, str)
            or not checkout_id.startswith("cs_")
            or checkout_destination is None
            or checkout_destination.scheme != "https"
            or checkout_destination.netloc != "checkout.stripe.com"
        ):
            with connect_database() as connection:
                connection.execute(
                    "UPDATE bookings SET status = 'checkout_failed' WHERE id = ?",
                    (booking_id,),
                )
            raise RuntimeError("Stripe returned an invalid checkout destination.")
        with connect_database() as connection:
            connection.execute(
                """
                UPDATE bookings SET status = 'pending_payment', stripe_session_id = ?
                WHERE id = ? AND status = 'creating_checkout'
                """,
                (checkout_id, booking_id),
            )
        self.send_json(201, {"checkout_url": checkout_url})

    def process_stripe_webhook(self):
        try:
            payload = self.request_body(MAX_WEBHOOK_BYTES)
            signature = self.headers.get("Stripe-Signature", "")
            secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
            if not secret or not stripe_signature_is_valid(payload, signature, secret):
                self.send_json(400, {"error": "The Stripe signature is invalid or expired."})
                return
            event = json.loads(payload)
            if not isinstance(event, dict):
                raise ValueError("The Stripe webhook must be a JSON object.")
        except (ValueError, UnicodeDecodeError, json.JSONDecodeError):
            self.send_json(400, {"error": "The Stripe webhook request is invalid."})
            return
        if event.get("type") == "checkout.session.completed":
            session = (event.get("data") or {}).get("object") or {}
            try:
                if not self.mark_booking_paid(session):
                    self.send_json(400, {"error": "The completed checkout does not match a pending booking."})
                    return
            except sqlite3.Error:
                self.log_error("Stripe webhook could not update a booking.")
                self.send_json(500, {"error": "The booking could not be updated."})
                return
        elif event.get("type") == "checkout.session.expired":
            session = (event.get("data") or {}).get("object") or {}
            try:
                self.mark_booking_expired(session)
            except sqlite3.Error:
                self.log_error("Stripe webhook could not expire a booking.")
                self.send_json(500, {"error": "The booking could not be updated."})
                return
        self.send_json(200, {"received": True})

    def submit_comment(self):
        payload = self.read_json()
        event_name = payload.get("event")
        name = payload.get("name")
        rating = payload.get("rating")
        comment = payload.get("comment")
        if not all(isinstance(value, str) for value in (event_name, name, comment)):
            raise ValueError("Complete the name, event, and comment fields.")
        name = name.strip()
        comment = comment.strip()
        event_date = EVENT_DATES.get(event_name)
        if event_date is None:
            raise ValueError("Choose a valid event.")
        if event_date >= japan_today():
            raise ValueError("You can share a story after the event date.")
        if not name or len(name) > 80 or any(ord(character) < 32 or ord(character) == 127 for character in name):
            raise ValueError("Enter a name between 1 and 80 characters.")
        if isinstance(rating, bool) or not isinstance(rating, int) or not 1 <= rating <= 5:
            raise ValueError("Choose a rating from 1 to 5 stars.")
        if not comment or len(comment) > 500:
            raise ValueError("Write a comment between 1 and 500 characters.")

        created_at = utc_now()
        with connect_database() as connection:
            connection.execute(
                """
                INSERT INTO event_comments (id, event_name, name, rating, comment, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (str(uuid.uuid4()), event_name, name, rating, comment, created_at),
            )
        self.send_json(201, {
            "comment": {
                "name": name,
                "rating": rating,
                "comment": comment,
                "created_at": created_at,
            }
        })

    def register(self):
        payload = self.read_json()
        name = payload.get("name")
        email = payload.get("email")
        password = payload.get("password")
        if not all(isinstance(value, str) for value in (name, email, password)):
            raise ValueError("Enter your name, email address, and password.")
        name = name.strip()
        email = email.strip().casefold()
        if not name or len(name) > 100:
            raise ValueError("Enter a name between 1 and 100 characters.")
        if len(email) > 254 or not EMAIL_PATTERN.fullmatch(email):
            raise ValueError("Enter a valid email address.")
        if len(password) < 8 or len(password) > 1024:
            raise ValueError("Choose a password between 8 and 1024 characters.")

        salt = secrets.token_bytes(16)
        password_hash = hash_password(password, salt)
        user_id = str(uuid.uuid4())
        created_at = utc_now()
        with connect_database() as connection:
            try:
                connection.execute(
                    """
                    INSERT INTO users
                        (id, name, email, password_salt, password_hash, created_at, last_login_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    (user_id, name, email, salt, password_hash, created_at, created_at),
                )
            except sqlite3.IntegrityError:
                self.send_json(409, {"error": "An account with this email already exists. Choose Log in instead."})
                return
        user = {"id": user_id, "name": name, "email": email, "created_at": created_at}
        self.send_json(201, {"user": user}, self.create_session(user_id))

    def login(self):
        payload = self.read_json()
        email = payload.get("email")
        password = payload.get("password")
        if not isinstance(email, str) or not isinstance(password, str):
            raise ValueError("Enter your email address and password.")
        email = email.strip().casefold()
        if len(email) > 254 or len(password) > 1024:
            raise ValueError("Enter a valid email address and password.")
        with connect_database() as connection:
            user = connection.execute(
                """
                SELECT id, name, email, password_salt, password_hash, created_at
                FROM users WHERE email = ?
                """,
                (email,),
            ).fetchone()
            salt = user["password_salt"] if user else DUMMY_SALT
            password_hash = hash_password(password, salt)
            if not user or not hmac.compare_digest(password_hash, user["password_hash"]):
                self.send_json(401, {"error": "Email or password is incorrect."})
                return
            connection.execute(
                "UPDATE users SET last_login_at = ? WHERE id = ?",
                (utc_now(), user["id"]),
            )
        self.send_json(200, {"user": user_response(user)}, self.create_session(user["id"]))

    def logout(self):
        self.read_json()
        token = self.get_session_token()
        if token:
            with connect_database() as connection:
                connection.execute(
                    "DELETE FROM sessions WHERE token_hash = ?",
                    (hash_session_token(token),),
                )
        clear_cookie = (
            f"{SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
            f"{'; Secure' if os.environ.get('TABLEMATES_SECURE_COOKIES') == '1' else ''}"
        )
        self.send_json(200, {"ok": True}, [("Set-Cookie", clear_cookie)])

    def do_HEAD(self):
        if urlsplit(self.path).path != "/":
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()


def print_users():
    with connect_database() as connection:
        users = connection.execute(
            "SELECT id, name, email, created_at, last_login_at FROM users ORDER BY created_at"
        ).fetchall()
    if not users:
        print("No members have registered yet.")
        return
    print(f"{'ID':36}  {'NAME':24}  {'EMAIL':32}  {'CREATED':25}  LAST LOGIN")
    for user in users:
        print(
            f"{user['id']:36}  {user['name'][:24]:24}  {user['email'][:32]:32}  "
            f"{user['created_at']:25}  {user['last_login_at'] or 'Never'}"
        )


def print_bookings():
    with connect_database() as connection:
        bookings = connection.execute(
            """
            SELECT event_name, event_date, guest_name, guest_email, guest_count,
                   guest_language, total_jpy, status, created_at
            FROM bookings
            ORDER BY created_at DESC
            LIMIT 200
            """
        ).fetchall()
    if not bookings:
        print("No bookings have been created yet.")
        return
    print(f"{'DATE':12}  {'STATUS':20}  {'GUESTS':6}  {'TOTAL':10}  {'LANGUAGE':12}  {'NAME':24}  EMAIL  EVENT")
    for booking in bookings:
        print(
            f"{booking['event_date']:12}  {booking['status'][:20]:20}  "
            f"{booking['guest_count']:6}  ¥{booking['total_jpy']:<9}  {booking['guest_language'][:12]:12}  "
            f"{booking['guest_name'][:24]:24}  {booking['guest_email']}  {booking['event_name']}"
        )


def main():
    parser = argparse.ArgumentParser(description="Run the local TableMates website and account database.")
    parser.add_argument("--host", default="127.0.0.1", help="Interface to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8000")), help="Web server port")
    parser.add_argument("--list-users", action="store_true", help="List member IDs and last login times; never shows passwords.")
    parser.add_argument("--list-bookings", action="store_true", help="List event bookings and their payment status.")
    args = parser.parse_args()
    initialize_database()
    if args.list_users:
        print_users()
        return
    if args.list_bookings:
        print_bookings()
        return
    server = ThreadingHTTPServer((args.host, args.port), TableMatesHandler)
    print(f"TableMates is running on {args.host}:{args.port}")
    print(f"Member database: {DATABASE}")
    if args.host in ("127.0.0.1", "localhost"):
        print("Local development only. Do not expose this server to the internet.")
    else:
        print("Use only behind a trusted HTTPS reverse proxy.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping the local server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
