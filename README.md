# TableMates Japan

## Run locally

From this folder, run:

```powershell
python server.py
```

Then open <http://127.0.0.1:8000>. Do not open `index.html` directly or use a static preview such as VS Code Live Server; registration and login require the Python server to serve both the site and its account API from the same address.

The first run creates `data/tablemates.sqlite3`. It stores member accounts and password hashes; raw passwords are never stored. Keep this folder's `data` directory backed up to preserve local accounts.

## Deploy on Render

`render.yaml` configures the Python web service, HTTPS-only session cookies, and a persistent disk for the SQLite database and community uploads. Render's persistent disk requires a paid service plan; review current prices and the disk terms in your Render account before creating the service.

1. Put **only the contents of this project folder** in a dedicated GitHub repository. Do not connect or publish a home directory or parent repository that contains unrelated personal files.
2. In Render, choose **New + → Blueprint**, connect that dedicated repository, and review the `tablemates-japan` web service and persistent disk from `render.yaml`.
3. Confirm the plan and disk cost, then create the service. Render builds and deploys the app and provides its public `onrender.com` URL.
4. Open the URL and test the home page, account registration, login, logout, event comments, and community feed. The SQLite database and uploaded media live on `/var/data` and persist across deploys while the disk remains attached.

## Stripe event checkout

The site creates Stripe Checkout sessions in JPY. It uses server-side event prices, reserves up to eight seats per small-group event while checkout is open, and marks a booking paid only after Stripe confirms it. Adjust `EVENT_CAPACITIES` in `server.py` to each confirmed event's actual capacity before launch. The International New Year food gathering has a ¥2,000-per-person reservation ticket; food and drinks are purchased separately from each stall.

The displayed 2027 event dates and prices are sample placeholders. **Replace them with confirmed event details, prices, and capacities before enabling payment.** Checkout stays disabled unless all of the following are configured:

- `TABLEMATES_BOOKINGS_ENABLED=1`
- `STRIPE_SECRET_KEY` — use an `sk_test_...` key while testing; only use a live key after launch checks.
- `STRIPE_WEBHOOK_SECRET` — configure the webhook signing secret for `/api/stripe/webhook`.
- `TABLEMATES_BASE_URL` — the public HTTPS URL of this site, with no trailing slash.

In Stripe, send the `checkout.session.completed` and `checkout.session.expired` events to `https://<your-site>/api/stripe/webhook`. Keep keys in your local shell or deployment environment settings; never put them in the repository or share them in chat. Test a successful checkout and an abandoned checkout before enabling live payments. Stripe handles card entry; this site never stores card details. Use `python server.py --list-bookings` to review bookings and payment status.

## Community photos and videos

Signed-in members can publish one JPEG, PNG, or WebP photo (up to 5 MB) or MP4/WebM video (up to 20 MB) with a caption. Posts become public immediately; anyone can browse them. The files are stored on the persistent data disk, not in the source repository. Use the removal contact link on a post to request that it be taken down.

This is a small demo using Python's built-in HTTP server and SQLite. Before using it for a high-traffic or business-critical service, add production-grade request throttling, media moderation/reporting, monitoring, backups, and a supported production application server/database. The configured disk is limited to 1 GB, so plan media retention or object storage before broad public use.

## Event comments

Visitors can read comments for each event, and the comment form becomes available after that event's listed date in Japan time. Comments are stored in SQLite and persist with the local database or Render persistent disk. Reviews are public and are not verified against bookings. When editing the event cards in `index.html`, keep the event names and dates in sync with `EVENT_DATES` in `server.py`.

To see who has registered and when each member last logged in, open a second terminal in this folder and run:

```powershell
python server.py --list-users
```

This prints member IDs, names, email addresses, registration times, and last login times. It never prints passwords or password hashes.

Press `Ctrl+C` in the server terminal to stop the local website.
