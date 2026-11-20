# One-time Google Apps Script setup (recommended)

The latest contact form uses Google Apps Script by default. This avoids Gmail SMTP login and Google App Password problems. The script sends mail from the Google account that owns/deploys the script.

## 1. Create the script

1. Sign in to the Google account that should send portfolio messages (`sumitpanchal5225@gmail.com`).
2. Open <https://script.google.com/> and create a **New project**.
3. Open the `Code.gs` file in this ZIP and copy its entire contents into the Apps Script editor, replacing the starter code.
4. Save the project.

## 2. Add the two Script Properties

1. In Apps Script, open **Project Settings** (gear icon).
2. Under **Script Properties**, click **Add script property**.
3. Add these exact properties:

   | Property | Value |
   |---|---|
   | `CONTACT_TO_EMAIL` | `sumitpanchal5225@gmail.com` |
   | `CONTACT_FORM_TOKEN` | A long random secret that you create |

4. Use the same secret for `GOOGLE_APPS_SCRIPT_TOKEN` in your local `.env`. For example, generate one in Git Bash with:

   ```bash
   openssl rand -hex 32
   ```

   Do not post or share this token. It is a private key between your local portfolio backend and the Apps Script deployment.

## 3. Deploy as a Web App

1. Click **Deploy > New deployment**.
2. Select the gear next to **Select type**, then choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone** (the public contact form must reach this endpoint).
5. Click **Deploy** and complete Google's authorization prompts.
6. Copy the Web App URL. It must be the deployed URL ending in `/exec` (not the editor URL and not the `/dev` test URL).

If the deployment is changed later, use **Deploy > Manage deployments > Edit** and deploy a new version. Keep the same `/exec` URL when editing an existing deployment.

## 4. Configure the project

In the portfolio project root (the same folder as `package.json`), copy `.env.example` to `.env` and set:

```env
MAIL_PROVIDER=apps-script
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_TOKEN=PASTE_THE_SAME_RANDOM_SECRET_HERE
CONTACT_TO_EMAIL=sumitpanchal5225@gmail.com
PORT=3001
```

Replace the URL and token placeholders. Do not add quotes. Keep `.env` private; it is ignored by `.gitignore`.

## 5. Start and verify

From the project root:

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:3001/api/health>. A successful result looks like:

```json
{
  "status": "ready",
  "delivery": "connected",
  "provider": "google-apps-script",
  "recipient": "sumitpanchal5225@gmail.com"
}
```

Then submit a test message in the portfolio and check the destination inbox and Spam folder. The health check verifies that the deployed script recognizes the token and recipient; a successful form submission confirms Apps Script accepted the message for sending.

## Troubleshooting

- **`APPS_SCRIPT_NOT_CONFIGURED`**: `.env` is missing the deployed `/exec` URL or token.
- **Invalid token**: `CONTACT_FORM_TOKEN` in Apps Script Script Properties must exactly match `GOOGLE_APPS_SCRIPT_TOKEN` in `.env`.
- **HTML instead of JSON / sign-in page**: redeploy as a Web App, Execute as **Me**, access **Anyone**, and use the `/exec` URL.
- **Authorization or mail quota issue**: open the Apps Script project and review **Executions**. Google may require the owner to authorize mail access or may enforce daily sending limits.

The project also retains the previous SMTP mode. To use it instead, set `MAIL_PROVIDER=smtp` and provide valid Gmail SMTP credentials in `.env`. SMTP authentication failures cannot be repaired by changing application code; Google must accept the account credentials.

## Vercel production environment

For the Vercel deployment, do not upload your local `.env` file. In the Vercel project open **Settings → Environment Variables** and add these exact server-side variables for Production and Preview:

- `MAIL_PROVIDER` = `apps-script`
- `GOOGLE_APPS_SCRIPT_URL` = your deployed Google Apps Script Web App URL ending in `/exec`
- `GOOGLE_APPS_SCRIPT_TOKEN` = the same random secret stored as the Apps Script `CONTACT_FORM_TOKEN` Script Property
- `CONTACT_TO_EMAIL` = `sumitpanchal5225@gmail.com`

Do not prefix these names with `VITE_`; the token must remain on the server. Redeploy after adding or changing the values. The Vercel health endpoint is `https://YOUR-VERCEL-DOMAIN/api/health`.
