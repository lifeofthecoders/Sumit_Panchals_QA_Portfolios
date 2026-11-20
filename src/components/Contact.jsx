import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import { Mail, Copy, Check, Linkedin, Github, Send, CheckCircle2, AlertCircle, LoaderCircle, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitState, setSubmitState] = useState('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const mailtoHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    `Portfolio inquiry from ${formState.name || 'Website visitor'}`
  )}&body=${encodeURIComponent(
    `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
  )}`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitState === 'sending') return;

    setSubmitState('sending');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error = new Error(result.error || 'The website email service could not send your message.');
        error.code = result.code || `HTTP_${response.status}`;
        throw error;
      }

      if (result.delivery === 'manual' || result.manual === true) {
        // Preserve the form and show the pre-filled mailto link. Opening a draft
        // is not the same as the website successfully delivering an email.
        setSubmitState('error');
        setSubmitMessage(result.message || 'Automatic email delivery is not configured. Use the email-app option below and press Send.');
        return;
      }

      setSubmitState('success');
      setSubmitMessage('Your message has been sent successfully. Thank you for contacting me!');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error.message === 'Failed to fetch'
          ? 'The website email service is not reachable. Your message is still here—use the email-app option below to send it.'
          : `${error.message} Your message has not been sent by the website. Use the email-app option below as a fallback.`
      );
    }
  }

  return (
    <section className="section-spacer container" id="contact">
      <div className="section-label">Collaboration</div>
      <h2 className="section-title">Get in Touch</h2>
      <p className="section-desc">
        {siteConfig.identity.availability}. Reach out directly via email, GitHub, or LinkedIn.
      </p>

      <div className="contact-grid">
        <div>
          <div className="contact-info-list">
            <a href={`mailto:${siteConfig.contact.email}`} className="contact-item">
              <div className="contact-item-icon">
                <Mail size={20} />
              </div>
              <div className="contact-item-content">
                <span>Official Email</span>
                <strong>{siteConfig.contact.email}</strong>
              </div>
            </a>

            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div className="contact-item-icon">
                <Github size={20} />
              </div>
              <div className="contact-item-content">
                <span>GitHub Profile</span>
                <strong>github.com/lifeofthecoders</strong>
              </div>
            </a>

            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div className="contact-item-icon">
                <Linkedin size={20} />
              </div>
              <div className="contact-item-content">
                <span>LinkedIn Profile</span>
                <strong>linkedin.com/in/sumit-panchal-b790a8236</strong>
              </div>
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn btn-outline"
            style={{ fontSize: "0.78rem", padding: "0.35rem 0.75rem", marginTop: "0.5rem" }}
          >
            {copied ? <><Check size={14} color="var(--accent)" /> Copied to Clipboard!</> : <><Copy size={14} /> Copy Email</>}
          </button>

          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.5" }}>
            Connect with me on GitHub to explore my projects and code.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">Your Name</label>
            <input
              id="contact-name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              className="form-input"
              value={formState.name}
              onChange={(e) => {
                setFormState({ ...formState, name: e.target.value });
                if (submitState !== 'sending') { setSubmitState('idle'); setSubmitMessage(''); }
              }}
              placeholder="e.g. Your Name"
              disabled={submitState === 'sending'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">Email Address</label>
            <input
              id="contact-email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              className="form-input"
              value={formState.email}
              onChange={(e) => {
                setFormState({ ...formState, email: e.target.value });
                if (submitState !== 'sending') { setSubmitState('idle'); setSubmitMessage(''); }
              }}
              placeholder="e.g. name@company.com"
              disabled={submitState === 'sending'}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-msg" className="form-label">Message</label>
            <textarea
              id="contact-msg"
              required
              minLength={10}
              maxLength={5000}
              className="form-textarea"
              value={formState.message}
              onChange={(e) => {
                setFormState({ ...formState, message: e.target.value });
                if (submitState !== 'sending') { setSubmitState('idle'); setSubmitMessage(''); }
              }}
              placeholder="Share a QA opportunity, project details, or a professional inquiry..."
              disabled={submitState === 'sending'}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={submitState === 'sending'}
          >
            {submitState === 'sending' ? (
              <><LoaderCircle size={16} className="contact-submit-spinner" /> Sending Message...</>
            ) : submitState === 'success' ? (
              <><CheckCircle2 size={16} /> Message Sent Successfully</>
            ) : (
              <><Send size={16} /> Send Direct Message</>
            )}
          </button>

          {submitMessage && (
            <p
              className={`contact-submit-feedback contact-submit-${submitState}`}
              role="status"
              aria-live="polite"
            >
              {submitState === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{submitMessage}</span>
            </p>
          )}

          {submitState === 'error' && (
            <a
              className="btn btn-outline contact-email-fallback"
              href={mailtoHref}
              aria-label="Open your email application with this message addressed to Sumit Panchal"
            >
              <Mail size={16} /> Open Email App to Send Message <ExternalLink size={14} />
            </a>
          )}
        </form>
      </div>
    </section>
  );
}
