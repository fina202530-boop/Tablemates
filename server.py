import argparse
from contextlib import contextmanager
import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import uuid
from datetime import date, datetime, timedelta, timezone
from http.cookies import SimpleCookie
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parent
DATA_DIR = Path(os.environ.get("TABLEMATES_DATA_DIR", ROOT / "data"))
DATABASE = DATA_DIR / "tablemates.sqlite3"
SESSION_COOKIE = "tablemates_session"
SESSION_DAYS = 30
PASSWORD_ITERATIONS = 310_000
MAX_REQUEST_BYTES = 16_384
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
DUMMY_SALT = bytes.fromhex("2f2b136e968912e056abb34156fa89fc")
EVENT_DATES = {
    "Osaka after dark: a local food walk": date(2026, 10, 24),
    "Around the world, one dinner table": date(2026, 10, 30),
    "Make your own little piece of Japan": date(2026, 10, 31),
    "Sweet Japan, from mochi to matcha": date(2026, 11, 1),
    "Kyoto market morning with Yuki": date(2026, 11, 4),
    "Tokyo old-town bites with Kenji": date(2026, 10, 28),
    "Nara street food and mochi walk": date(2026, 11, 8),
    "Tea passport: five countries, one table": date(2026, 10, 27),
    "Kyoto tea ceremony and seasonal sweets": date(2026, 11, 6),
    "Home flavors: a South Asian dinner": date(2026, 11, 2),
    "Sunday brunch: new in Tokyo": date(2026, 11, 8),
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
    return datetime.now(ZoneInfo("Asia/Tokyo")).date()


def user_response(row):
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "created_at": row["created_at"],
    }


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

    def discard_request_body(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            return False
        if length < 0 or length > MAX_REQUEST_BYTES:
            return False
        self.rfile.read(length)
        return True

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
        if path == "/api/me":
            user = self.get_current_user()
            self.send_json(200, {"user": user_response(user) if user else None})
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
            else:
                self.discard_request_body()
                self.send_json(404, {"error": "This account endpoint does not exist."})
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
        except sqlite3.Error:
            self.log_error("Account database request failed.")
            self.send_json(500, {"error": "The local account database is unavailable. Check the server console."})

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


def main():
    parser = argparse.ArgumentParser(description="Run the local TableMates website and account database.")
    parser.add_argument("--host", default="127.0.0.1", help="Interface to bind (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8000")), help="Web server port")
    parser.add_argument("--list-users", action="store_true", help="List member IDs and last login times; never shows passwords.")
    args = parser.parse_args()
    initialize_database()
    if args.list_users:
        print_users()
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
