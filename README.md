# TableMates Japan

## Run locally

From this folder, run:

```powershell
python server.py
```

Then open <http://127.0.0.1:8000>. Do not open `index.html` directly; account registration and login use the local server.

The first run creates `data/tablemates.sqlite3`. It stores member accounts and password hashes; raw passwords are never stored. Keep this folder's `data` directory backed up to preserve local accounts.

## Deploy on Render

`render.yaml` configures the Python web service, HTTPS-only session cookies, and a persistent disk for the SQLite database. Render's persistent disk requires a paid service plan; review current prices and the disk terms in your Render account before creating the service.

1. Put **only the contents of this project folder** in a dedicated GitHub repository. Do not connect or publish your Windows home directory (`C:\Users\fn0130`) or the parent repository; it contains unrelated personal files.
2. In Render, choose **New + → Blueprint**, connect that dedicated repository, and review the `tablemates-japan` web service and persistent disk from `render.yaml`.
3. Confirm the plan and disk cost, then create the service. Render builds and deploys the app and provides its public `onrender.com` URL.
4. Open the URL and test the home page, account registration, login, and logout. The SQLite database lives on `/var/data` and persists across deploys while the disk remains attached.

This is a small demo using Python's built-in HTTP server and SQLite. Before using it for a high-traffic or business-critical service, add production-grade request throttling, monitoring, backups, and a supported production application server/database.

## Applying to become a host

The host section lists the details applicants should include and the team contact address, `hello@tablemates.jp`. Applications are sent directly by email; there is no on-page application submission.

## Event comments

Visitors can read comments for each event, and the comment form becomes available after that event's listed date in Japan time. Comments are stored in SQLite and persist with the local database or Render persistent disk. Reviews are public and are not verified against bookings. When editing the event cards in `index.html`, keep the event names and dates in sync with `EVENT_DATES` in `server.py`.

To see who has registered and when each member last logged in, open a second terminal in this folder and run:

```powershell
python server.py --list-users
```

This prints member IDs, names, email addresses, registration times, and last login times. It never prints passwords or password hashes.

Press `Ctrl+C` in the server terminal to stop the local website.
