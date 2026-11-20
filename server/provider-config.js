/**
 * Resolve contact-email provider names consistently for local Express and Vercel.
 * Older portfolio builds used MAIL_PROVIDER=auto. Keep that setting compatible:
 * prefer configured Apps Script, then configured SMTP, otherwise show an email-app
 * fallback instead of rejecting the form with INVALID_MAIL_PROVIDER.
 */
export function normalizeProviderName(value) {
  const normalized = String(value ?? 'auto')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');

  const aliases = new Map([
    ['auto', 'auto'],
    ['automatic', 'auto'],
    ['default', 'auto'],
    ['apps-script', 'apps-script'],
    ['app-script', 'apps-script'],
    ['appscript', 'apps-script'],
    ['google-apps-script', 'apps-script'],
    ['google-script', 'apps-script'],
    ['smtp', 'smtp'],
    ['gmail-smtp', 'smtp'],
    ['mailto', 'mailto'],
    ['email-client', 'mailto']
  ]);

  return aliases.get(normalized) || normalized;
}

function isConfiguredValue(value) {
  const text = String(value || '').trim();
  if (!text) return false;
  const lower = text.toLowerCase();
  return !(
    lower.includes('your_deployment_id') ||
    lower.includes('replace_with_') ||
    lower.includes('paste_your_') ||
    lower === 'changeme' ||
    lower === 'change_me'
  );
}

export function resolveMailProvider({
  requestedProvider = process.env.MAIL_PROVIDER,
  appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL,
  appsScriptToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN,
  smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpUser = process.env.SMTP_USER,
  smtpPass = process.env.SMTP_PASS
} = {}) {
  const requested = normalizeProviderName(requestedProvider);
  const appsScriptConfigured = isConfiguredValue(appsScriptUrl) && isConfiguredValue(appsScriptToken);
  const smtpConfigured = isConfiguredValue(smtpHost) && isConfiguredValue(smtpUser) && isConfiguredValue(smtpPass);

  if (requested === 'auto') {
    if (appsScriptConfigured) return 'apps-script';
    if (smtpConfigured) return 'smtp';
    return 'mailto';
  }

  return requested;
}

export function hasAppsScriptConfiguration({
  appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL,
  appsScriptToken = process.env.GOOGLE_APPS_SCRIPT_TOKEN
} = {}) {
  return isConfiguredValue(appsScriptUrl) && isConfiguredValue(appsScriptToken);
}

export function hasSmtpConfiguration({
  smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com',
  smtpUser = process.env.SMTP_USER,
  smtpPass = process.env.SMTP_PASS
} = {}) {
  return isConfiguredValue(smtpHost) && isConfiguredValue(smtpUser) && isConfiguredValue(smtpPass);
}
