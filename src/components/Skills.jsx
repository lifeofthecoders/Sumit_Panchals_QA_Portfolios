import React from 'react';
import { skillsData } from '../data/experience';
import { Code2, Brain, Cpu, Database } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Manual & Functional Testing",
      icon: <Code2 size={20} className="skill-card-icon" />,
      skills: skillsData.programming
    },
    {
      title: "Testing Types & Methodologies",
      icon: <Brain size={20} className="skill-card-icon" />,
      skills: skillsData.machineLearning
    },
    {
      title: "Test Design & Documentation",
      icon: <Cpu size={20} className="skill-card-icon" />,
      skills: skillsData.visionAndNLP
    },
    {
      title: "Tools & Platform Testing",
      icon: <Database size={20} className="skill-card-icon" />,
      skills: skillsData.toolsAndData
    }
  ];

  return (
    <section className="section-spacer container" id="skills">
      <div className="section-label">Technical Competencies</div>
      <h2 className="section-title">QA Skills & Testing Toolkit</h2>
      <p className="section-desc">
        Testing methodologies, documentation practices, tools, and platform validation experience.
      </p>

      <div className="skills-grid">
        {skillCategories.map((cat) => (
          <div key={cat.title} className="skill-card">
            <div className="skill-card-header">
              {cat.icon}
              <h3 className="skill-card-title">{cat.title}</h3>
            </div>
            <div className="skill-pill-list">
              {cat.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}