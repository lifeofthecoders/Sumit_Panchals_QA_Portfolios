import React, { useState, useMemo } from 'react';
import { projectsData, projectCategories } from '../data/projects';
import { Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectGrid({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Spotlight follow effect inside each card
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="section-spacer container" id="projects">
      <div className="section-header-block">
        <div className="section-number-tag">01 / QA PROJECTS</div>
        <h2 className="section-title">QUALITY IN EVERY WORKFLOW.</h2>
        <p className="section-desc">
          Selected applications tested across transportation, networking, e-commerce, gaming, digital health, and community platforms.
        </p>
      </div>

      <div className="project-controls">
        <div className="category-pills" role="tablist">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search projects or testing areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              key={project.id}
              className="project-card spotlight-card"
              onMouseMove={handleMouseMove}
              onClick={() => onSelectProject(project)}
              tabIndex={0}
              role="button"
            >
              {/* Dynamic spotlight layer */}
              <div className="card-spotlight" />

              <div className="project-card-header">
                <span className="project-editorial-num">
                  SYSTEM {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="project-badge">{project.displayCategory}</span>
              </div>

              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-summary">{project.summary}</p>

              <div className="project-tags">
                {project.tools.slice(0, 4).map((tool) => (
                  <span key={tool} className="project-tag">{tool}</span>
                ))}
                {project.tools.length > 4 && (
                  <span className="project-tag">+{project.tools.length - 4}</span>
                )}
              </div>

              <div className="project-footer-link">
                <span>View Testing Overview</span>
                <ArrowRight size={14} className="link-arrow" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}