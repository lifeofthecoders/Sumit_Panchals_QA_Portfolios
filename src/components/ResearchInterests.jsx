import React from 'react';
import { siteConfig } from '../config/site';
import { Network, Award } from 'lucide-react';

export default function ResearchInterests() {
  const { researchInterests, certifications } = siteConfig;

  return (
    <section className="section-spacer container" id="research">
      <div className="section-label">QA Focus Areas</div>
      <h2 className="section-title">Testing Focus Areas</h2>
      <p className="section-desc">
        Core quality practices applied to reliable web and mobile application releases.
      </p>

      <div className="research-grid">
        {researchInterests.map((r) => (
          <div key={r.title} className="research-card">
            <h3 className="research-title">{r.title}</h3>
            <p className="research-desc">{r.description}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "4rem" }}>
        <div className="section-label">Professional Certifications</div>
        <h3 className="section-title" style={{ fontSize: "1.75rem" }}>Certifications</h3>
        <div className="cert-grid">
          {certifications.map((c) => (
            <div key={c.title} className="cert-card">
              <h4 className="cert-title">{c.title}</h4>
              <div className="cert-issuer">{c.issuer} ({c.year})</div>
              <p className="cert-focus">{c.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}