import React, { useState } from 'react';
import { siteConfig } from '../config/site';
import MagneticButton from './MagneticButton';
import { ArrowRight, Download, Mail, Terminal, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const { identity, metrics } = siteConfig;
  const [imageError, setImageError] = useState(false);

  return (
    <section className="hero-section container" id="home">
      <div className="hero-grid">
        {/* ================= LEFT COLUMN: Headlines & CTAs ================= */}
        <div className="hero-text-content">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-eyebrow"
          >
            <span>HELLO, I'M</span>
            <span className="eyebrow-divider">•</span>
            <span style={{ color: 'var(--accent)' }}>QUALITY ASSURANCE ENGINEER</span>
          </motion.div>

          {/* Main Title & Statement */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title"
          >
            {identity.fullName.toUpperCase()}
            <span className="hero-statement">
              Testing with purpose. Delivering with confidence.
            </span>
          </motion.h1>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-intro"
          >
            {identity.intro}
          </motion.p>

          {/* Magnetic Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-ctas"
          >
            {/* 1. Explore Work (Primary Emerald Magnetic Button) */}
            <MagneticButton href="#projects" className="btn-primary">
              Explore Work <ArrowRight size={16} />
            </MagneticButton>

            {/* 2. Get in Touch (Secondary Card Magnetic Button) */}
            <MagneticButton href="#contact" className="btn-secondary">
              Get in Touch <Mail size={16} />
            </MagneticButton>

            {/* 3. Download CV (Outline Magnetic Button) */}
            <MagneticButton
              href={identity.resumeUrl}
              download="Sumit-Panchal-Resume.pdf"
              className="btn-outline"
            >
              CV <Download size={15} />
            </MagneticButton>
          </motion.div>

          {/* Verified Fact Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-metrics"
          >
            {metrics.map((m, idx) => (
              <div key={idx} className="metric-card">
                <span className="metric-value">{m.value}</span>
                <span className="metric-label">{m.label}</span>
                <span className="metric-note">{m.note}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ================= RIGHT COLUMN: Editorial Portrait Card ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hero-visual-card"
        >
          {/* Portrait Image with graceful fallback */}
          {!imageError ? (
            <img
              src={identity.heroImage}
              alt={identity.fullName}
              className="hero-portrait-img"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="hero-art-network" />
          )}

          {/* Vignette contrast overlay for text readability */}
          <div className="hero-portrait-overlay" />

          {/* Hero Top Badges - Organized Vertical Layout */}
          <div className="hero-top-badges">

            {/* Rotating Asterisk Emblem */}
            <div className="rotating-emblem-wrap">
              <div className="rotating-star">✳</div>
              <span className="emblem-text">
                Every detail. A purpose.
              </span>
            </div>

            {/* QA Tools & Skills Badge */}
            <div className="hero-tensor-badge">
              <Terminal size={12} />
              <span>JIRA • TESTING • REGRESSION • UAT</span>
            </div>

          </div>

          {/* Bottom Card Title & Location Pill */}
          <div className="hero-visual-content">
            <h2 className="hero-visual-name">{identity.fullName}</h2>
            <div className="hero-visual-loc">
              <span className="pulsing-live-dot" />
              <span>AHMEDABAD, INDIA</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================= BOTTOM: Bouncing Scroll Indicator ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="hero-scroll-discover"
      >
        <a href="#projects" className="scroll-link">
          <div className="scroll-arrow-box">
            <ChevronDown size={14} className="bounce-arrow" />
          </div>
          <span>SCROLL TO DISCOVER QUALITY-DRIVEN PROJECTS</span>
        </a>
      </motion.div>
    </section>
  );
}