'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { skills } from '@/lib/data';

const skillCategories = [
  { key: 'languages', label: 'Languages', color: '#c8a96e' },
  { key: 'iot', label: 'IoT & Hardware', color: '#7c6aff' },
  { key: 'frontend', label: 'Frontend', color: '#4ecdc4' },
  { key: 'backend', label: 'Backend', color: '#ff6a6a' },
  { key: 'systems', label: 'Systems', color: '#a8e6cf' },
  { key: 'soft', label: 'Leadership', color: '#ffd93d' },
];

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-ui text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>{name}</span>
        <motion.span className="font-mono text-xs" style={{ color }} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 + index * 0.08 }}>{level}%</motion.span>
      </div>
      <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div className="h-full" style={{ background: color, originX: 0 }} initial={{ scaleX: 0 }} animate={isInView ? { scaleX: level / 100 } : {}} transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: [0.16, 1, 0.3, 1] as any }} />
      </div>
    </div>
  );
}

function StatCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} className="glass rounded-lg p-6 text-center" initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }} whileHover={{ y: -4 }}>
      <div className="font-display text-4xl font-light" style={{ color: 'var(--accent)' }}>{number}</div>
      <div className="font-ui text-xs tracking-[0.15em] uppercase mt-2" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const e = [0.16, 1, 0.3, 1] as any;

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen py-32 px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <motion.div className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--text-dim)' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>01 · About</motion.div>
          <div className="overflow-hidden">
            <motion.h2 className="font-display font-light" style={{ fontSize: 'clamp(42px, 7vw, 100px)', lineHeight: 1.05, color: 'var(--text)' }} initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: e }}>A mind that builds</motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 className="font-display italic" style={{ fontSize: 'clamp(42px, 7vw, 100px)', lineHeight: 1.05, color: 'var(--accent)' }} initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease: e }}>at every layer</motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-8">
            {[
              "I study Computer Science with an IoT specialization at VIT Vellore — not because it was a safe path, but because I wanted to understand how the digital and physical world speak to each other.",
              "I believe the best engineers are translators — people who can hold the complexity of a system in their mind while explaining it in a way a person feels, not just understands. That's what I'm always working toward: technology that disappears into the experience it creates.",
              "Beyond code, I've led organizations, chaired international committees, and designed visual systems that move people. These aren't separate pursuits — they're the same skill: understanding how humans respond to systems, and designing those systems accordingly."
            ].map((text, i) => (
              <motion.p key={i} className="font-ui text-base leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: i === 0 ? '1.2rem' : '1rem' }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: e }}>
                {i === 0 ? <em className="font-display text-xl not-italic">{text}</em> : text}
              </motion.p>
            ))}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <StatCard number="9.04" label="CGPA" delay={0.3} />
              <StatCard number="4+" label="Projects" delay={0.4} />
              <StatCard number="200+" label="Led Members" delay={0.5} />
            </div>
          </div>

          <motion.div style={{ y }} className="space-y-12">
            {skillCategories.map((cat) => {
              const catSkills = skills.filter(s => s.category === cat.key);
              if (!catSkills.length) return null;
              return (
                <div key={cat.key}>
                  <div className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: cat.color }}>{cat.label}</div>
                  <div className="space-y-4">
                    {catSkills.map((skill, i) => <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} index={i} />)}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="mt-24 flex flex-wrap gap-3">
          {['Problem Solver', 'IoT Enthusiast', 'Debate Champion', 'Creative Thinker', 'Team Leader', 'Systems Designer'].map((tag, i) => (
            <motion.span key={tag} className="px-4 py-2 rounded-full font-ui text-xs tracking-wide"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)' }}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ borderColor: 'rgba(200,169,110,0.4)', color: 'var(--accent)', scale: 1.05 }}>
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
