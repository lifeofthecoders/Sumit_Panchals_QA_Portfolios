/**
 * Sumit Panchal Portfolio Contact Form
 * Sends contact-form messages using the Google account that deploys this script.
 * No Gmail SMTP password or App Password is required.
 *
 * Required Script Properties (Project Settings > Script properties):
 *   CONTACT_FORM_TOKEN  - same long random token as GOOGLE_APPS_SCRIPT_TOKEN in .env
 *   CONTACT_TO_EMAIL    - sumitpanchal5225@gmail.com
 */
function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    var properties = PropertiesService.getScriptProperties();
    var expectedToken = properties.getProperty('CONTACT_FORM_TOKEN') || '';
    var recipient = properties.getProperty('CONTACT_TO_EMAIL') || '';

    if (!expectedToken || !constantTimeEquals_(String(data.token || ''), expectedToken)) {
      return jsonOutput_({ ok: false, error: 'The contact service token is invalid. Check the Apps Script token and project .env file.' });
    }

    if (data.action === 'health') {
      if (!recipient) {
        return jsonOutput_({ ok: false, error: 'CONTACT_TO_EMAIL is missing from Apps Script Script Properties.' });
      }
      return jsonOutput_({ ok: true, status: 'ready', recipient: recipient });
    }

    if (data.action !== 'send') {
      return jsonOutput_({ ok: false, error: 'Unsupported contact action.' });
    }

    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    var message = String(data.message || '').trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2 || name.length > 100) {
      return jsonOutput_({ ok: false, error: 'Please enter a valid name.' });
    }
    if (email.length > 254 || !emailPattern.test(email)) {
      return jsonOutput_({ ok: false, error: 'Please enter a valid email address.' });
    }
    if (message.length < 10 || message.length > 5000) {
      return jsonOutput_({ ok: false, error: 'Please enter a message between 10 and 5000 characters.' });
    }
    if (!recipient) {
      return jsonOutput_({ ok: false, error: 'The destination email address is not configured in Apps Script.' });
    }

    var subject = 'New portfolio inquiry from ' + name;
    var body = 'New message from your portfolio contact form\n\n' +
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n\n' +
      'Message:\n' + message;
    var htmlBody = '<h2>New portfolio inquiry</h2>' +
      '<p><strong>Name:</strong> ' + escapeHtml_(name) + '</p>' +
      '<p><strong>Email:</strong> ' + escapeHtml_(email) + '</p>' +
      '<p><strong>Message:</strong></p>' +
      '<p style="white-space:pre-wrap">' + escapeHtml_(message) + '</p>';

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      body: body,
      htmlBody: htmlBody,
      replyTo: email,
      name: 'Sumit Panchal Portfolio'
    });

    return jsonOutput_({ ok: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Portfolio contact delivery failed: ' + (error && error.message ? error.message : error));
    return jsonOutput_({ ok: false, error: 'Google could not send this message. Check the Apps Script execution log and account mail quota.' });
  }
}

function jsonOutput_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function constantTimeEquals_(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  var mismatch = 0;
  for (var i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function escapeHtml_(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
  });
}
