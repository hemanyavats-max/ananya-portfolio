'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '@/lib/data';

function AnimatedCounter({ target, delay }: { target: number; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const step = 16;
      const increment = target / (duration / step);
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, step);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, target, delay]);

  return <span ref={ref}>{count}</span>;
}

function AchievementCard({ item, index }: { item: typeof achievements[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5%' });
  const isHero = item.weight === 'hero';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl p-8 overflow-hidden group transition-all duration-500 ${
        isHero ? 'md:col-span-2' : ''
      }`}
      style={{
        background: isHero ? `linear-gradient(135deg, ${item.color}12 0%, rgba(255,255,255,0.02) 100%)` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${item.color}20`,
      }}
      whileHover={{
        borderColor: `${item.color}50`,
        background: isHero
          ? `linear-gradient(135deg, ${item.color}18 0%, rgba(255,255,255,0.04) 100%)`
          : `rgba(255,255,255,0.04)`,
        y: -4,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30% 50%, ${item.color}08 0%, transparent 60%)`,
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <motion.div
          className="text-4xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
          style={{ filter: `drop-shadow(0 0 12px ${item.color}80)` }}
        >
          {item.icon}
        </motion.div>

        <div className="flex flex-col items-end gap-1">
          <span
            className="font-mono text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
          >
            {item.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3
        className={`font-display font-light mb-1 ${isHero ? 'text-4xl' : 'text-2xl'}`}
        style={{ color: 'var(--text)' }}
      >
        {item.title}
      </h3>
      <p className="font-ui text-sm mb-4" style={{ color: item.color }}>
        {item.subtitle}
      </p>
      <p className="font-ui text-sm leading-relaxed" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
        {item.description}
      </p>

      {/* Hero badge */}
      {isHero && (
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${item.color}40, transparent)` }} />
          <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: item.color }}>
            Highest Honour
          </span>
        </div>
      )}

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-10"
        style={{
          background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(200,169,110,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--text-dim)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            04 · Achievements
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
              Recognition &{' '}
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display italic"
              style={{ fontSize: 'clamp(42px, 7vw, 100px)', lineHeight: 1.05, color: 'var(--accent)' }}
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Honours
            </motion.h2>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          className="grid grid-cols-3 gap-6 mb-16 p-8 rounded-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: 4, suffix: '+', label: 'Awards Won' },
            { value: 9, suffix: '.04', label: 'CGPA' },
            { value: 3, suffix: '+', label: 'MUN Honours' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-5xl font-light" style={{ color: 'var(--accent)' }}>
                <AnimatedCounter target={stat.value} delay={0.3 + i * 0.1} />
                <span>{stat.suffix}</span>
              </div>
              <div className="font-ui text-xs tracking-[0.15em] uppercase mt-2" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
