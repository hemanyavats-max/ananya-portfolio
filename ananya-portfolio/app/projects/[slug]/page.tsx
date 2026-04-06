'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const other = projects.find((p) => p.slug !== params.slug);

  const sections = [
    { label: 'Problem', content: project.problem, icon: '◎' },
    { label: 'Approach', content: project.approach, icon: '◈' },
    { label: 'Outcome', content: project.outcome, icon: '◆' },
  ];

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Back button */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          href="/#projects"
          className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 group"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="group-hover:-translate-x-1 transition-transform" style={{ color: 'var(--accent)' }}>←</span>
          Back
        </Link>
      </motion.div>

      {/* Hero */}
      <div
        className={`relative min-h-[70vh] flex flex-col justify-end px-6 pb-20 overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(${project.color}30 1px, transparent 1px), linear-gradient(90deg, ${project.color}30 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* 3D floating orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="rounded-full"
            style={{
              width: 300,
              height: 300,
              background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
              border: `1px solid ${project.color}20`,
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 180,
              height: 180,
              background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`,
              border: `1px solid ${project.color}30`,
            }}
            animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute font-mono text-lg tracking-[0.3em] uppercase"
            style={{ color: `${project.color}80` }}
          >
            {project.category}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            className="font-mono text-xs tracking-[0.25em] uppercase mb-6"
            style={{ color: project.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.year} · {project.category}
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              className="font-display font-light"
              style={{ fontSize: 'clamp(40px, 8vw, 110px)', lineHeight: 1.05, color: 'var(--text)' }}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.title}
            </motion.h1>
          </div>

          <motion.p
            className="font-display italic mt-4"
            style={{ fontSize: 'clamp(18px, 2.5vw, 30px)', color: project.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {project.tagline}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Overview */}
        <motion.div
          className="mb-20 pb-20"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p
            className="font-display text-2xl font-light leading-relaxed"
            style={{ color: 'var(--text-muted)', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.6 }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Case study sections */}
        <div className="space-y-24">
          {sections.map((section, i) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-2xl" style={{ color: project.color }}>{section.icon}</span>
                <h2
                  className="font-display text-4xl font-light"
                  style={{ color: 'var(--text)' }}
                >
                  {section.label}
                </h2>
              </div>
              <p
                className="font-ui text-base leading-relaxed pl-12"
                style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 680 }}
              >
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <motion.div
          className="mt-24 pt-16"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl" style={{ color: project.color }}>◇</span>
            <h2 className="font-display text-4xl font-light" style={{ color: 'var(--text)' }}>
              Tech Stack
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 pl-12">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                className="px-5 py-3 rounded-xl font-mono text-sm"
                style={{
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                  background: `${project.color}08`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.05, background: `${project.color}18` }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Next project */}
        {other && (
          <motion.div
            className="mt-32 pt-12"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--text-dim)' }}>
              Next Project
            </p>
            <Link
              href={`/projects/${other.slug}`}
              className="group flex items-center justify-between gap-8"
            >
              <div>
                <h3
                  className="font-display text-5xl font-light transition-colors duration-300 group-hover:text-[color:var(--accent)]"
                  style={{ color: 'var(--text)' }}
                >
                  {other.title}
                </h3>
                <p className="font-ui text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                  {other.tagline}
                </p>
              </div>
              <motion.div
                className="text-4xl flex-shrink-0"
                style={{ color: 'var(--accent)' }}
                animate={{ x: 0 }}
                whileHover={{ x: 12 }}
              >
                →
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
