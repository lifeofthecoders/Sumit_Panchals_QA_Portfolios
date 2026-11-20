import React from 'react';
import { educationData } from '../data/experience';
import { GraduationCap } from 'lucide-react';

export default function Education() {
  return (
    <section className="section-spacer container" id="education">
      <div className="section-label">Academic Foundations</div>
      <h2 className="section-title">Education</h2>

      <div className="education-grid">
        {educationData.map((item, idx) => (
          <div
            key={idx}
            className={`education-card ${item.primary ? 'featured' : ''}`}
          >
            <h3 className="education-degree">{item.degree}</h3>
            <div className="education-institution">{item.institution}</div>
            <div className="education-grade">{item.grade}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
              {item.period} • {item.location}
            </div>
            <p className="education-details">{item.details}</p>
          </div>
        ))}
      </div>
    </section>
  );
}