import React from 'react';

const tools = [
  "Manual Testing", "Functional Testing", "Regression Testing", "Smoke Testing",
  "Sanity Testing", "Exploratory Testing", "Jira", "Excel", "UAT",
  "Cross-Browser Testing", "Mobile Testing", "API Testing Concepts",
  "Test Planning", "Defect Lifecycle", "Agile / Scrum"
];

export default function MarqueeTicker() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {[...tools, ...tools].map((tool, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-dot">✦</span>
            <span>{tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
