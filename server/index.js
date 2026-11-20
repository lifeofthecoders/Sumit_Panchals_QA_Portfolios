import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveMailProvider, hasAppsScriptConfiguration, hasSmtpConfiguration } from './provider-config.js';

const app = express();
const PORT = Number(process.env.PORT || 3001);
const HOST = '127.0.0.1';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const provider = resolveMailProvider();
const recipient = (process.env.CONTACT_TO_EMAIL || 'sumitpanchal5225@gmail.com').trim();
const appsScriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();
const appsScriptToken = (process.env.GOOGLE_APPS_SCRIPT_TOKEN || '').trim();

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages have been submitted. Please try again in 15 minutes.' }
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function makeError(code, message, cause) {
  const error = new Error(message, cause ? { cause } : undefined);
  error.code = code;
  return error;
}

async function callAppsScript(payload) {
  if (!hasAppsScriptConfiguration()) {
    throw makeError(
      'APPS_SCRIPT_NOT_CONFIGURED',
      'Google Apps Script is not configured yet. Follow google-apps-script/SETUP.md, then add the deployed URL and token to .env.'
    );
  }

  let url;
  try {
    url = new URL(appsScriptUrl);
    if (url.protocol !== 'https:' || !/script\.google\.com$/.test(url.hostname)) {
      throw new Error('Invalid Apps Script URL.');
    }
  } catch (error) {
    throw makeError('APPS_SCRIPT_INVALID_URL', 'GOOGLE_APPS_SCRIPT_URL must be the HTTPS Web App URL ending in /exec.', error);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, token: appsScriptToken }),
      redirect: 'follow',
      signal: controller.signal
    });
    const raw = await response.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      throw makeError(
        'APPS_SCRIPT_BAD_RESPONSE',
        'Google Apps Script did not return JSON. Check that the Web App is deployed with access set to Anyone and that the URL ends in /exec.'
      );
    }
    if (!response.ok || result?.ok !== true) {
      const message = typeof result?.error === 'string' && result.error
        ? result.error
        : `Google Apps Script returned HTTP ${response.status}.`;
      throw makeError('APPS_SCRIPT_REJECTED', message);
    }
    return result;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw makeError('APPS_SCRIPT_TIMEOUT', 'Google Apps Script timed out. Check your internet connection and try again.', error);
    }
    if (['APPS_SCRIPT_BAD_RESPONSE', 'APPS_SCRIPT_REJECTED'].includes(error?.code)) throw error;
    throw makeError('APPS_SCRIPT_NETWORK_ERROR', 'The portfolio server could not reach Google Apps Script. Check the deployed URL and internet connection.', error);
  } finally {
    clearTimeout(timeout);
  }
}

// Optional SMTP mode is retained for users who already have working Gmail SMTP credentials.
const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
const smtpUser = (process.env.SMTP_USER || '').trim();
const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecureRaw = (process.env.SMTP_SECURE || '').trim().toLowerCase();
const smtpSecure = smtpSecureRaw ? ['true', '1', 'yes'].includes(smtpSecureRaw) : smtpPort === 465;
const smtpConfigured = hasSmtpConfiguration();
let smtpTransporter = null;
if (provider === 'smtp' && smtpConfigured) {
  smtpTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 20000,
    tls: { minVersion: 'TLSv1.2' }
  });
}

function logProviderError(label, error) {
  // Never log tokens, API URLs, SMTP usernames, or passwords.
  console.error(label, {
    code: error?.code || 'UNKNOWN',
    message: error?.message || 'Unknown delivery error',
    responseCode: error?.responseCode,
    command: error?.command
  });
}

async function verifyDeliveryProvider() {
  if (provider === 'mailto') {
    return { provider: 'email-client-fallback', recipient, note: 'Automatic email delivery is not configured. The visitor can send a pre-filled email from their email application.' };
  }
  if (provider === 'apps-script') {
    const result = await callAppsScript({ action: 'health' });
    return { provider: 'google-apps-script', recipient: result.recipient || recipient };
  }
  if (provider === 'smtp') {
    if (!smtpTransporter) {
      throw makeError('SMTP_NOT_CONFIGURED', 'SMTP is selected but SMTP_HOST, SMTP_USER, or SMTP_PASS is missing from .env.');
    }
    await smtpTransporter.verify();
    return { provider: 'smtp', recipient };
  }
  throw makeError('INVALID_MAIL_PROVIDER', 'MAIL_PROVIDER must be either apps-script or smtp.');
}

async function deliverContact({ name, email, message }) {
  if (provider === 'mailto') {
    return { ok: true, manual: true, delivery: 'manual', code: 'EMAIL_CLIENT_REQUIRED' };
  }
  if (provider === 'apps-script') {
    return callAppsScript({ action: 'send', name, email, message });
  }
  if (provider === 'smtp') {
    if (!smtpTransporter) {
      throw makeError('SMTP_NOT_CONFIGURED', 'SMTP is selected but credentials are missing from .env.');
    }
    await smtpTransporter.sendMail({
      from: `"Sumit Panchal Portfolio" <${smtpUser}>`,
      to: recipient,
      replyTo: { name, address: email },
      subject: `New portfolio inquiry from ${name}`,
      text: `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New portfolio inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `
    });
    return { ok: true };
  }
  throw makeError('INVALID_MAIL_PROVIDER', 'MAIL_PROVIDER must be either apps-script or smtp.');
}

app.get('/api/health', async (_req, res) => {
  try {
    const status = await verifyDeliveryProvider();
    const isManual = provider === 'mailto';
    return res.status(200).json({ status: isManual ? 'manual-fallback' : 'ready', delivery: isManual ? 'email-client' : 'connected', ...status });
  } catch (error) {
    logProviderError('[CONTACT] Delivery health check failed:', error);
    const statusCode = error?.code === 'APPS_SCRIPT_NOT_CONFIGURED' || error?.code === 'SMTP_NOT_CONFIGURED'
      ? 503
      : 502;
    return res.status(statusCode).json({
      status: 'delivery_service_error',
      code: error?.code || 'DELIVERY_CHECK_FAILED',
      error: error?.message || 'The email delivery service could not be verified.',
      provider
    });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Please enter a name between 2 and 100 characters.' });
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (message.length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a message between 10 and 5000 characters.' });
  }

  try {
    const deliveryResult = await deliverContact({ name, email, message });
    if (deliveryResult?.manual) {
      console.log('[CONTACT] Automatic delivery is not configured; email-app fallback is required.');
      return res.status(200).json({ ok: true, delivery: 'manual', code: 'EMAIL_CLIENT_REQUIRED', message: 'Automatic email delivery is not configured. Open the email app below and press Send to deliver your message.' });
    }
    console.log(`[CONTACT] Message accepted by ${provider}.`);
    return res.status(200).json({ ok: true, delivery: 'automatic', message: 'Message sent successfully.' });
  } catch (error) {
    logProviderError('[CONTACT] Email delivery failed:', error);
    const messageForVisitor = error?.code === 'APPS_SCRIPT_NOT_CONFIGURED'
      ? 'The contact email service has not been connected yet. Please complete the Google Apps Script setup in the project instructions.'
      : error?.message || 'The email service could not deliver your message. Please try again or use the email-app option below.';
    return res.status(502).json({
      code: error?.code || 'EMAIL_DELIVERY_FAILED',
      error: messageForVisitor
    });
  }
});

const distPath = path.join(projectRoot, 'dist');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));
  app.get(/.*/, (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

app.listen(PORT, HOST, () => {
  console.log(`Portfolio email server listening on http://${HOST}:${PORT}`);
  console.log(`[CONTACT] Delivery provider: ${provider}`);
  if (provider === 'apps-script' && !hasAppsScriptConfiguration()) {
    console.warn('[CONTACT] Complete google-apps-script/SETUP.md and fill GOOGLE_APPS_SCRIPT_URL and GOOGLE_APPS_SCRIPT_TOKEN in the root .env file.');
  }
});
