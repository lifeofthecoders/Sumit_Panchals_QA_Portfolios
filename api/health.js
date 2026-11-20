import {
  getDeliveryProvider,
  verifyDeliveryProvider,
  logDeliveryError
} from '../server/contact-service.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ code: 'METHOD_NOT_ALLOWED', error: 'Use GET for the health check.' });
  }

  try {
    const details = await verifyDeliveryProvider();
    const isManual = getDeliveryProvider() === 'mailto';
    return res.status(200).json({
      status: isManual ? 'manual-fallback' : 'ready',
      delivery: isManual ? 'email-client' : 'connected',
      ...details
    });
  } catch (error) {
    logDeliveryError('[CONTACT] Vercel delivery health check failed:', error);
    const statusCode = error?.code === 'APPS_SCRIPT_NOT_CONFIGURED' || error?.code === 'SMTP_NOT_CONFIGURED'
      ? 503
      : 502;
    return res.status(statusCode).json({
      status: 'delivery_service_error',
      code: error?.code || 'DELIVERY_CHECK_FAILED',
      error: error?.message || 'The email delivery service could not be verified.',
      provider: getDeliveryProvider()
    });
  }
}
