# Sumit Panchal — Senior Quality Analyst Portfolio

React + Vite portfolio with a local Express API and Vercel serverless contact API. The existing design, animations, navigation, project content, resume, portrait, and contact form are retained.

## Local development

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` in the project root.
3. Keep `MAIL_PROVIDER=auto` (compatible with earlier project versions). Add the Google Apps Script `/exec` URL and matching private token.
4. Start the Vite frontend and local Express API together: `npm run dev`
5. Open `http://localhost:5173`.

Vite proxies `/api` to the local Express server at `127.0.0.1:3001`. The Vercel deployment uses `api/contact.js` and `api/health.js` as serverless functions. The frontend calls `/api/contact` on both environments, so no frontend API URL or CORS setting is required.

## Google Apps Script mail delivery

Use the one-time instructions in [`google-apps-script/SETUP.md`](google-apps-script/SETUP.md). The deployed script should be configured with Script Properties `CONTACT_TO_EMAIL` and `CONTACT_FORM_TOKEN`. The `CONTACT_FORM_TOKEN` must match the server-side `GOOGLE_APPS_SCRIPT_TOKEN` environment variable. The Apps Script Web App should execute as the script owner and allow access to Anyone so public contact-form submissions can reach it.

## Deploy to Vercel

This repository is configured as one Vercel project:

- Frontend: Vite static build in `dist/`.
- Backend: Vercel Node.js Functions in `api/` (`/api/contact` and `/api/health`).
- Email delivery: Vercel Function calls Google Apps Script server-to-server. The token is never exposed to the React bundle.

Import this repository into Vercel with the repository root as the Root Directory. Select Vite as the Framework Preset, `npm run build` as the Build Command, and `dist` as the Output Directory. Vercel installs dependencies from the root `package.json` and deploys the files in `api/` as functions. The `vercel.json` file sets a 30-second maximum duration for the two email API functions.

In Vercel Project Settings → Environment Variables, add the following variables for **Production** and **Preview** (and Development if you plan to use `vercel dev`). `MAIL_PROVIDER=auto` is backwards-compatible with the earlier local `.env` version and selects Apps Script when its URL/token are present:

```env
MAIL_PROVIDER=auto
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_TOKEN=YOUR_PRIVATE_RANDOM_TOKEN
CONTACT_TO_EMAIL=sumitpanchal5225@gmail.com
```

Do not add `VITE_` to these names. Do not put the token in React code or commit `.env`. After adding or changing variables, redeploy because environment-variable changes apply to new deployments.

After deployment, verify `https://YOUR-VERCEL-DOMAIN/api/health` returns `status: ready`, `delivery: connected`, and `provider: google-apps-script`. Then submit a real test from the live contact form and confirm that the email arrives in the destination inbox (also check Spam).

## Local SMTP mode (optional)

The shared delivery service supports `MAIL_PROVIDER=auto`, `apps-script`, `smtp`, and `mailto`. `auto` selects configured Google Apps Script first, then configured SMTP, and uses the email-app fallback if neither provider is configured. Older values such as `google-apps-script`, `app-script`, `appscript`, `automatic`, `default`, `gmail-smtp`, and `email-client` are normalized for compatibility. To force SMTP, set `MAIL_PROVIDER=smtp` and provide `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS`. Apps Script is the recommended mode because it is already working locally for this project.
