import 'dotenv/config';
import nodemailer from 'nodemailer';
import { resolveMailProvider, hasAppsScriptConfiguration, hasSmtpConfiguration } from './provider-config.js';

const recipient = (process.env.CONTACT_TO_EMAIL || 'sumitpanchal5225@gmail.com').trim();
const appsScriptUrl = (process.env.GOOGLE_APPS_SCRIPT_URL || '').trim();
const appsScriptToken = (process.env.GOOGLE_APPS_SCRIPT_TOKEN || '').trim();
const provider = resolveMailProvider();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function makeError(code, message, cause) {
  const error = new Error(message, cause ? { cause } : undefined);
  error.code = code;
  return error;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

export function getDeliveryProvider() {
  return provider;
}

export function getContactRecipient() {
  return recipient;
}

export function validateContactPayload(input) {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const email = typeof input?.email === 'string' ? input.email.trim() : '';
  const message = typeof input?.message === 'string' ? input.message.trim() : '';

  if (name.length < 2 || name.length > 100) {
    throw makeError('INVALID_NAME', 'Please enter a name between 2 and 100 characters.');
  }
  if (email.length > 254 || !emailPattern.test(email)) {
    throw makeError('INVALID_EMAIL', 'Please enter a valid email address.');
  }
  if (message.length < 10 || message.length > 5000) {
    throw makeError('INVALID_MESSAGE', 'Please enter a message between 10 and 5000 characters.');
  }

  return { name, email, message };
}

async function callAppsScript(payload) {
  if (!hasAppsScriptConfiguration()) {
    throw makeError(
      'APPS_SCRIPT_NOT_CONFIGURED',
      'The contact email service is not configured. Add GOOGLE_APPS_SCRIPT_URL and GOOGLE_APPS_SCRIPT_TOKEN to the Vercel environment variables.'
    );
  }

  let url;
  try {
    url = new URL(appsScriptUrl);
    if (url.protocol !== 'https:' || url.hostname !== 'script.google.com' || !url.pathname.endsWith('/exec')) {
      throw new Error('Invalid Apps Script Web App URL.');
    }
  } catch (error) {
    throw makeError(
      'APPS_SCRIPT_INVALID_URL',
      'GOOGLE_APPS_SCRIPT_URL must be the HTTPS Google Apps Script Web App URL ending in /exec.',
      error
    );
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
        'Google Apps Script did not return JSON. Check its Web App deployment permissions and /exec URL.'
      );
    }
    if (!response.ok || result?.ok !== true) {
      throw makeError(
        'APPS_SCRIPT_REJECTED',
        typeof result?.error === 'string' && result.error
          ? result.error
          : `Google Apps Script returned HTTP ${response.status}.`
      );
    }
    return result;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw makeError('APPS_SCRIPT_TIMEOUT', 'Google Apps Script timed out. Please try again.', error);
    }
    if (String(error?.code || '').startsWith('APPS_SCRIPT_')) throw error;
    throw makeError('APPS_SCRIPT_NETWORK_ERROR', 'The portfolio API could not reach Google Apps Script. Check the deployed URL and Google service.', error);
  } finally {
    clearTimeout(timeout);
  }
}

const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
const smtpUser = (process.env.SMTP_USER || '').trim();
const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecureRaw = (process.env.SMTP_SECURE || '').trim().toLowerCase();
const smtpSecure = smtpSecureRaw ? ['true', '1', 'yes'].includes(smtpSecureRaw) : smtpPort === 465;
let smtpTransporter = null;

if (provider === 'smtp' && hasSmtpConfiguration()) {
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

export async function verifyDeliveryProvider() {
  if (provider === 'mailto') {
    return { provider: 'email-client-fallback', recipient, note: 'Automatic email delivery is not configured. The visitor can send a pre-filled email from their email application.' };
  }
  if (provider === 'apps-script') {
    const result = await callAppsScript({ action: 'health' });
    return { provider: 'google-apps-script', recipient: result.recipient || recipient };
  }
  if (provider === 'smtp') {
    if (!smtpTransporter) {
      throw makeError('SMTP_NOT_CONFIGURED', 'SMTP is selected but SMTP_HOST, SMTP_USER, or SMTP_PASS is missing.');
    }
    await smtpTransporter.verify();
    return { provider: 'smtp', recipient };
  }
  throw makeError('INVALID_MAIL_PROVIDER', 'MAIL_PROVIDER must be either apps-script or smtp.');
}

export async function deliverContact(input) {
  const { name, email, message } = validateContactPayload(input);

  if (provider === 'mailto') {
    return { ok: true, manual: true, delivery: 'manual', code: 'EMAIL_CLIENT_REQUIRED' };
  }
  if (provider === 'apps-script') {
    return callAppsScript({ action: 'send', name, email, message });
  }
  if (provider === 'smtp') {
    if (!smtpTransporter) {
      throw makeError('SMTP_NOT_CONFIGURED', 'SMTP is selected but credentials are missing.');
    }
    await smtpTransporter.sendMail({
      from: `"Sumit Panchal Portfolio" <${smtpUser}>`,
      to: recipient,
      replyTo: { name, address: email },
      subject: `New portfolio inquiry from ${name}`,
      text: `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h2>New portfolio inquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`
    });
    return { ok: true };
  }
  throw makeError('INVALID_MAIL_PROVIDER', 'MAIL_PROVIDER must be either apps-script or smtp.');
}

export function logDeliveryError(label, error) {
  // Never log the Apps Script URL/token or SMTP username/password.
  console.error(label, {
    code: error?.code || 'UNKNOWN',
    message: error?.message || 'Unknown delivery error',
    responseCode: error?.responseCode,
    command: error?.command
  });
}
