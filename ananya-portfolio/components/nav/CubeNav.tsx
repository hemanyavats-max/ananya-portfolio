'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '@/lib/data';

const faceRotations: Record<string, string> = {
  Home: 'rotateY(0deg)',
  About: 'rotateY(-90deg)',
  Projects: 'rotateY(-180deg)',
  Experience: 'rotateY(90deg)',
  Achievements: 'rotateX(-90deg)',
  Contact: 'rotateX(90deg)',
};

const sectionIds: Record<string, string> = {
  Home: 'hero',
  About: 'about',
  Projects: 'projects',
  Experience: 'experience',
  Achievements: 'achievements',
  Contact: 'contact',
};

export default function CubeNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFace, setActiveFace] = useState('Home');
  const [cubeRotation, setCubeRotation] = useState('rotateY(0deg)');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (item: string) => {
    setActiveFace(item);
    setCubeRotation(faceRotations[item]);
    const el = document.getElementById(sectionIds[item]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => setIsOpen(false), 400);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 py-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        style={{
          background: scrolled ? 'rgba(6,6,8,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigateTo('Home')}
          className="font-display text-xl font-light tracking-wide"
          style={{ color: 'var(--text)' }}
        >
          AG<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => navigateTo(item)}
              className="font-ui text-xs tracking-[0.15em] uppercase transition-all duration-300 relative group"
              style={{
                color: activeFace === item ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              {item}
              <span
                className="absolute bottom-[-3px] left-0 h-px transition-all duration-300"
                style={{
                  background: 'var(--accent)',
                  width: activeFace === item ? '100%' : '0%',
                }}
              />
            </button>
          ))}
        </div>

        {/* Cube menu button */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className="w-6 h-px transition-all duration-300"
            style={{
              background: 'var(--accent)',
              transform: isOpen ? 'rotate(45deg) translateY(0)' : 'translateY(-4px)',
            }}
          />
          <div
            className="absolute w-6 h-px"
            style={{
              background: 'var(--accent)',
              opacity: isOpen ? 0 : 1,
            }}
          />
          <div
            className="w-6 h-px transition-all duration-300"
            style={{
              background: 'var(--accent)',
              transform: isOpen ? 'rotate(-45deg) translateY(0)' : 'translateY(4px)',
            }}
          />
        </button>
      </motion.nav>

      {/* Cube Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center md:hidden"
            style={{ background: 'rgba(6,6,8,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => navigateTo(item)}
                    className="font-display text-5xl font-light tracking-wide block w-full"
                    style={{ color: activeFace === item ? 'var(--accent)' : 'var(--text)' }}
                  >
                    {item}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Cube Widget (desktop, bottom-right) */}
      <motion.div
        className="fixed bottom-8 right-8 z-[1001] hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <div style={{ perspective: '400px' }}>
          <motion.div
            className="relative"
            style={{
              width: 48,
              height: 48,
              transformStyle: 'preserve-3d',
              transform: cubeRotation,
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* 6 faces */}
            {[
              { label: 'H', face: 'Home', transform: 'translateZ(24px)' },
              { label: 'A', face: 'About', transform: 'rotateY(90deg) translateZ(24px)' },
              { label: 'P', face: 'Projects', transform: 'rotateY(180deg) translateZ(24px)' },
              { label: 'E', face: 'Experience', transform: 'rotateY(-90deg) translateZ(24px)' },
              { label: '★', face: 'Achievements', transform: 'rotateX(90deg) translateZ(24px)' },
              { label: '✉', face: 'Contact', transform: 'rotateX(-90deg) translateZ(24px)' },
            ].map(({ label, face, transform }) => (
              <button
                key={face}
                onClick={() => navigateTo(face)}
                className="absolute inset-0 flex items-center justify-center text-xs font-ui font-bold rounded"
                style={{
                  transform,
                  background: activeFace === face
                    ? 'rgba(200,169,110,0.3)'
                    : 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(200,169,110,0.3)',
                  color: 'var(--accent)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
