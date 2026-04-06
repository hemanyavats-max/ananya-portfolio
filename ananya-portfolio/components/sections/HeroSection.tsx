'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), { ssr: false });

export default function HeroSection() {
  const firstName = 'Ananya';
  const lastName = 'Gupta';

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const easing = [0.16, 1, 0.3, 1] as any;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: 'var(--bg)' }}>
      <ParticleField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(124,106,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Corner markers */}
      {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
        <motion.div key={i} className={`absolute ${pos} w-6 h-6`}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 + i * 0.1 }}
          style={{
            borderTop: i < 2 ? '1px solid rgba(200,169,110,0.2)' : 'none',
            borderBottom: i >= 2 ? '1px solid rgba(200,169,110,0.2)' : 'none',
            borderLeft: i % 2 === 0 ? '1px solid rgba(200,169,110,0.2)' : 'none',
            borderRight: i % 2 === 1 ? '1px solid rgba(200,169,110,0.2)' : 'none',
          }}
        />
      ))}

      {/* Status badge */}
      <motion.div className="relative z-10 mb-12 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.6 }}>
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#4ade80' }} />
        <span className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--text-muted)' }}>
          Available for opportunities
        </span>
      </motion.div>

      {/* Name letters */}
      <div className="relative z-10 text-center px-4" style={{ perspective: '600px' }}>
        <div className="flex justify-center overflow-hidden">
          {firstName.split('').map((char, i) => (
            <motion.span key={`fn-${i}`}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 + i * 0.06, ease: easing }}
              className="font-display font-light leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)', color: 'var(--text)', display: 'inline-block', letterSpacing: '-0.02em' }}>
              {char}
            </motion.span>
          ))}
        </div>
        <div className="flex justify-center overflow-hidden mt-[-0.1em]">
          {lastName.split('').map((char, i) => (
            <motion.span key={`ln-${i}`}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 + (firstName.length + i) * 0.06, ease: easing }}
              className="font-display italic leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 140px)', color: 'var(--accent)', display: 'inline-block', letterSpacing: '-0.02em' }}>
              {char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Tagline */}
      <motion.p className="relative z-10 font-display italic text-center mt-8 max-w-2xl px-6"
        style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', color: 'var(--text-muted)', lineHeight: 1.4 }}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8, ease: easing }}>
        Building technology that translates into meaningful experiences
      </motion.p>

      {/* Subtitle */}
      <motion.p className="relative z-10 font-mono text-xs tracking-[0.2em] uppercase mt-6"
        style={{ color: 'var(--text-dim)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.6 }}>
        CS (IoT) · VIT Vellore · CGPA 9.04
      </motion.p>

      {/* CTA */}
      <motion.div className="relative z-10 mt-14 flex flex-col sm:flex-row gap-4 items-center"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.7, duration: 0.6 }}>
        <MagneticButton
          onClick={scrollToAbout}
          className="group px-8 py-4 font-ui text-sm tracking-[0.15em] uppercase transition-all duration-300 relative overflow-hidden"
          style={{ border: '1px solid var(--accent)', color: 'var(--bg)', background: 'var(--accent)' }}>
          <span className="relative z-10">Explore Work</span>
        </MagneticButton>
        <MagneticButton
          href="mailto:ananya.gupta@example.com"
          className="px-8 py-4 font-ui text-sm tracking-[0.15em] uppercase transition-all duration-300"
          style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
          Get in Touch
        </MagneticButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4, duration: 0.6 }}>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--text-dim)' }}>Scroll</span>
        <div className="w-px h-16 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div className="w-full h-1/2"
            style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
        </div>
      </motion.div>
    </section>
  );
}
