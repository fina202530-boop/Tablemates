import http.cookiejar
import json
import sqlite3
import tempfile
import threading
import unittest
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
        self.data_patch.start()
        self.database_patch.start()
        server.initialize_database()

        self.httpd = ThreadingHTTPServer(("127.0.0.1", 0), server.TableMatesHandler)
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
            with client.open(request, timeout=5) as response:
                return response.status, response.headers, json.load(response)
        except HTTPError as error:
            return error.code, error.headers, json.load(error)

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

if __name__ == "__main__":
    unittest.main()
