import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeTicker from './components/MarqueeTicker';
import ProjectGrid from './components/ProjectGrid';
import ProjectDialog from './components/ProjectDialog';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import ResearchInterests from './components/ResearchInterests';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Top viewport scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="site-wrapper">
      {/* Top Scroll Indicator */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Touquir-style Custom Mouse Glow Cursor */}
      <CustomCursor />

      <div className="ambient-bg" aria-hidden="true" />
      {/* Film Grain Texture Overlay */}
    <div className="film-grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <MarqueeTicker />
        <ProjectGrid onSelectProject={setSelectedProject} />
        <About />
        <Skills />
        <Experience />
        <Education />
        <ResearchInterests />
        <Contact />
      </main>
      <Footer />

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}