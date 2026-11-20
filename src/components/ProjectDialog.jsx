import React, { useEffect, useRef } from 'react';
import { X, Layers, Tag, Calendar, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDialog({ project, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          tabIndex={-1}
        >
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>

          <span className="modal-category">{project.displayCategory}</span>
          <h2 id="modal-title" className="modal-title">{project.title}</h2>

          <div className="modal-meta-grid">
            <div className="modal-meta-item">
              <span>Status</span>
              <strong>{project.status}</strong>
            </div>
            <div className="modal-meta-item">
              <span>Role</span>
              <strong>{project.role}</strong>
            </div>
            <div className="modal-meta-item">
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
          </div>

          <h3 className="modal-section-title">Architecture & System Overview</h3>
          <p className="modal-desc">{project.description}</p>

          <h3 className="modal-section-title" style={{ marginTop: "1.5rem" }}>
            Tools & Technical Stack
          </h3>
          <div className="project-tags">
            {project.tools.map((tool) => (
              <span key={tool} className="project-tag" style={{ fontSize: "0.85rem", padding: "0.3rem 0.65rem" }}>
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}