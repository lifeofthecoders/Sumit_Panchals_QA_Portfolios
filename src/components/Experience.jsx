import React from 'react';
import { experienceData } from '../data/experience';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  return (
    <section className="section-spacer container" id="experience">
      <div className="section-label">Trajectory</div>
      <h2 className="section-title">Professional Experience</h2>
      <p className="section-desc">
        Professional QA experience across web and mobile applications, from test planning through regression and release support.
      </p>

      <div className="timeline">
        {experienceData.map((item, idx) => (
          <div key={idx} className="timeline-card">
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">{item.position}</h3>
                <div className="timeline-org">
                  {item.organization} • {item.location}
                </div>
              </div>
              <span className="timeline-badge">{item.badge}</span>
            </div>

            <div className="timeline-period">{item.period}</div>
            <p className="timeline-desc">{item.description}</p>

            <ul className="timeline-highlights">
              {item.highlights.map((h, hIdx) => (
                <li key={hIdx} className="timeline-highlight-item">
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}