import React from 'react';
import { siteConfig } from '../config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <strong>{siteConfig.identity.fullName}</strong> — {siteConfig.identity.profession}
          <div style={{ marginTop: "0.2rem" }}>
            Ahmedabad, Gujarat, India
          </div>
        </div>

        <div className="footer-links">
          <a
            href={siteConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--accent)" }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            style={{ color: "var(--accent)" }}
          >
            Email
          </a>
          <span>© {currentYear} Sumit Panchal</span>
        </div>
      </div>
    </footer>
  );
}