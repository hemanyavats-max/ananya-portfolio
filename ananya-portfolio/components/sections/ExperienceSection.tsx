'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { experience } from '@/lib/data';

const typeColors: Record<string, string> = {
  industry: '#c8a96e',
  leadership: '#7c6aff',
  creative: '#4ecdc4',
};

const typeLabels: Record<string, string> = {
  industry: 'Industry',
  leadership: 'Leadership',
  creative: 'Creative',
};

function ExperienceCard({ item, index }: { item: typeof experience[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  const color = typeColors[item.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-[1fr_auto_1fr] gap-0 items-start"
    >
      {/* Left content (even) or empty (odd) */}
      <div className={`pb-12 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'hidden md:block'}`}>
        {index % 2 === 0 && (
          <CardContent item={item} color={color} align="right" />
        )}
      </div>

      {/* Timeline spine */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="w-3 h-3 rounded-full z-10 relative"
          style={{ background: color, boxShadow: `0 0 20px ${color}60` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4, type: 'spring', stiffness: 400 }}
        />
        <div className="w-px flex-1 mt-2" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Right content (odd) or empty (even) */}
      <div className={`pb-12 ${index % 2 === 1 ? 'md:text-left md:pl-12' : 'hidden md:block'}`}>
        {index % 2 === 1 && (
          <CardContent item={item} color={color} align="left" />
        )}
      </div>

      {/* Mobile: full width */}
      <div className="md:hidden col-span-full pl-6 pb-12 border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="w-2 h-2 rounded-full absolute -left-[5px]" style={{ background: color }} />
        <CardContent item={item} color={color} align="left" />
      </div>
    </motion.div>
  );
}

function CardContent({ item, color, align }: { item: typeof experience[0]; color: string; align: 'left' | 'right' }) {
  return (
    <motion.div
      className="group rounded-xl p-6 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.06)',
        textAlign: align,
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.04)',
        borderColor: `${color}30`,
        y: -2,
      }}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap" style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full"
          style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
        >
          {typeLabels[item.type]}
        </span>
        <span className="font-mono text-[10px]" style={{ color: 'var(--text-dim)' }}>{item.period}</span>
      </div>

      <h3 className="font-display text-2xl font-light mb-1" style={{ color: 'var(--text)' }}>
        {item.role}
      </h3>
      <p className="font-ui text-sm mb-3" style={{ color }}>
        {item.org}
      </p>
      <p className="font-ui text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4" style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] tracking-wide px-2 py-1 rounded"
            style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-dim)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--text-dim)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            03 · Experience
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display font-light"
              style={{ fontSize: 'clamp(42px, 7vw, 100px)', lineHeight: 1.05, color: 'var(--text)' }}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              The{' '}
              <span className="font-display italic" style={{ color: 'var(--accent)' }}>
                Journey
              </span>
            </motion.h2>
          </div>
          <motion.p
            className="font-ui text-sm mt-4 max-w-lg mx-auto"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Every role shaped how I think about building — in code, in organizations, in design.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, var(--accent), var(--accent-2))',
              }}
            />
          </div>

          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
