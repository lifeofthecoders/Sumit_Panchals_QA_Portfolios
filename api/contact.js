import {
  deliverContact,
  logDeliveryError
} from '../server/contact-service.js';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestBuckets = new Map();

function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  return ip || 'unknown';
}

function isRateLimited(req, res) {
  const now = Date.now();
  const key = getClientKey(req);
  const current = requestBuckets.get(key);
  if (!current || now - current.startedAt >= WINDOW_MS) {
    requestBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }
  if (current.count >= MAX_REQUESTS) {
    const retryAfter = Math.max(1, Math.ceil((WINDOW_MS - (now - current.startedAt)) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    res.status(429).json({ code: 'RATE_LIMITED', error: 'Too many messages have been submitted. Please try again in 15 minutes.' });
    return true;
  }
  current.count += 1;
  return false;
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);
  return {};
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ code: 'METHOD_NOT_ALLOWED', error: 'Use POST for the contact form.' });
  }
  if (isRateLimited(req, res)) return;

  try {
    const body = readBody(req);
    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > 20 * 1024) {
      return res.status(413).json({ code: 'PAYLOAD_TOO_LARGE', error: 'The contact message is too large.' });
    }
    const deliveryResult = await deliverContact(body);
    if (deliveryResult?.manual) {
      console.log('[CONTACT] No automatic provider is configured; email-app fallback is required.');
      return res.status(200).json({
        ok: true,
        delivery: 'manual',
        code: 'EMAIL_CLIENT_REQUIRED',
        message: 'Automatic email delivery is not configured. Open the email app below and press Send to deliver your message.'
      });
    }
    console.log('[CONTACT] Message accepted by the configured delivery provider.');
    return res.status(200).json({ ok: true, delivery: 'automatic', message: 'Message sent successfully.' });
  } catch (error) {
    logDeliveryError('[CONTACT] Vercel contact delivery failed:', error);
    const statusCode = ['INVALID_NAME', 'INVALID_EMAIL', 'INVALID_MESSAGE'].includes(error?.code)
      ? 400
      : error?.code === 'APPS_SCRIPT_NOT_CONFIGURED' || error?.code === 'SMTP_NOT_CONFIGURED'
        ? 503
        : 502;
    return res.status(statusCode).json({
      ok: false,
      code: error?.code || 'EMAIL_DELIVERY_FAILED',
      error: error?.message || 'The email service could not deliver your message. Please try again or use the email-app option.'
    });
  }
}
