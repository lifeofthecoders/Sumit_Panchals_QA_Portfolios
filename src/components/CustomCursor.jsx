import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth spring physics for fluid cursor lag
  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });
  const glowX = useSpring(0, { stiffness: 120, damping: 25 });
  const glowY = useSpring(0, { stiffness: 120, damping: 25 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, .project-card');
      setIsHovered(!!target);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, glowX, glowY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Large Ambient Ambient Glow Beam */}
      <motion.div
        className="cursor-glow-beam"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
      {/* Precision Core Dot */}
      <motion.div
        className={`cursor-dot ${isHovered ? 'cursor-hover' : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      />
    </>
  );
}