# Nahid Portfolio Admin Setup

## Admin URL

- Local: `http://localhost:5173/admin`
- Production: `https://nahid-rahman.github.io/admin`

## Supabase configuration already completed

- Database migration executed
- Admin user allowlisted
- Email/password authentication enabled
- New signups disabled
- Anonymous sign-ins disabled
- TOTP MFA enabled
- Site URL and redirect allowlist configured

## First local test

```bash
npm install
npm run dev
```

Open `http://localhost:5173/admin`.

1. Sign in with the manually created Supabase admin account.
2. Scan the QR code using Google Authenticator.
3. Enter the six-digit code.
4. The dashboard loads after the session reaches AAL2.
5. Press **Publish** once to seed Portfolio V1 into `portfolio_public`.

## Content workflow

- Editing changes the browser draft state.
- **Save draft** writes to `portfolio_drafts` and creates a revision.
- **Publish** writes both the draft and the public snapshot.
- Public pages load `portfolio_public` and fall back to bundled V1 content when no published row exists.

## Media workflow

1. Open **Media Library**.
2. Pick a category and upload an image or PDF.
3. Copy its public URL.
4. Paste the URL into the relevant content field.
5. Save or publish.

Allowed upload formats: JPEG, PNG, WebP, GIF, SVG, and PDF. Maximum file size is 8 MB.

## Security model

- No public signup UI exists.
- Database and storage write policies require the allowlisted user and an AAL2 MFA session.
- The Supabase publishable key is a browser key; authorization is enforced by Row Level Security.
- No service-role key or database password is stored in the frontend.

## Deployment

The included GitHub Actions workflow builds from `main` and publishes `dist` to `gh-pages`.

```bash
git add .
git commit -m "Add secure portfolio admin panel"
git push origin main
```

The live `/admin` route works through the included GitHub Pages SPA `404.html` redirect.
