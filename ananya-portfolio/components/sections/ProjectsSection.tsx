'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div
          className="relative rounded-2xl overflow-hidden transition-all duration-700"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'var(--surface)',
          }}
        >
          {/* Top visual area */}
          <div
            className={`relative h-72 overflow-hidden bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
          >
            {/* Abstract visual */}
            <div className="relative w-full h-full">
              {/* Grid pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(${project.color}40 1px, transparent 1px), linear-gradient(90deg, ${project.color}40 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Center orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="rounded-full"
                  style={{
                    width: 120,
                    height: 120,
                    background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
                    border: `1px solid ${project.color}40`,
                  }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div
                  className="absolute font-mono text-xs tracking-[0.3em] uppercase"
                  style={{ color: project.color }}
                >
                  {project.category}
                </div>
              </div>

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 font-mono text-xs"
                style={{ color: `${project.color}60` }}
              >
                {project.year}
              </div>
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `${project.color}15`, backdropFilter: 'blur(4px)' }}
            >
              <div
                className="px-6 py-3 rounded-full font-ui text-sm tracking-[0.15em] uppercase"
                style={{ border: `1px solid ${project.color}`, color: project.color }}
              >
                View Case Study →
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3
                  className="font-display text-3xl font-light"
                  style={{ color: 'var(--text)' }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-ui text-sm mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.tagline}
                </p>
              </div>
              <motion.div
                className="text-2xl mt-1"
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                style={{ color: project.color }}
              >
                →
              </motion.div>
            </div>

            <p className="font-ui text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full font-mono text-xs"
                  style={{
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                    background: `${project.color}08`,
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span
                  className="px-3 py-1 rounded-full font-mono text-xs"
                  style={{ color: 'var(--text-dim)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'var(--bg-2)' }}
    >
      {/* Background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '100% 80px',
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <motion.div
              className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: 'var(--text-dim)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              02 · Projects
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
                Selected
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
                Work
              </motion.h2>
            </div>
          </div>

          <motion.p
            className="font-ui text-sm leading-relaxed max-w-sm"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Projects that exist at the intersection of hardware, software, and real human need.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
