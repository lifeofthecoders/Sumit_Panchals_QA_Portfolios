import React from 'react';
import { siteConfig } from '../config/site';
import { ShieldCheck } from 'lucide-react';

export default function About() {
  const { identity } = siteConfig;

  return (
    <section className="section-spacer container" id="about">
      <div className="section-label">Background & Focus</div>
      <h2 className="section-title">About Sumit Panchal</h2>

      <div className="about-grid">
        <div className="about-text">
          <p>{identity.about}</p>
          <p>
            I focus on understanding requirements, identifying product risks, preparing meaningful test coverage,
            and communicating clear, actionable findings. I value detail-oriented execution and practical collaboration
            throughout the software development and release lifecycle.
          </p>
        </div>

        <div className="about-portrait-card">
            <img 
                src={identity.portrait} 
                alt="Sumit Panchal" 
                style={{ width: "100%", borderRadius: "12px", border: "1px solid var(--border-subtle)" }} 
            />
        </div>

        <div className="languages-box">
          <h3 className="languages-title">
            <ShieldCheck size={18} color="var(--accent)" />
            <span>Quality Assurance Approach</span>
          </h3>
          <div className="language-list">
            {["Requirement-focused testing", "Risk-based prioritization", "Clear defect documentation", "Retesting & regression validation", "Cross-functional collaboration"].map((item) => (
              <div key={item} className="language-item">
                <span className="language-name">{item}</span>
                <span className="language-level">QA</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", display: "block" }}>
              PROFESSIONAL EXPERIENCE
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Quality Assurance Analyst · Echo Innovate IT · June 2021 – Present
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}