'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '@/lib/data';

function InputField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  multiline = false,
  delay = 0,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const baseStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? 'var(--accent)' : 'rgba(255,255,255,0.1)'}`,
    color: 'var(--text)',
    fontFamily: 'var(--font-ui)',
    fontSize: '1rem',
    padding: '12px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s',
    resize: 'none' as const,
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <label
        className="font-mono text-xs tracking-[0.2em] uppercase block mb-2 transition-colors duration-300"
        style={{ color: focused ? 'var(--accent)' : 'var(--text-dim)' }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="placeholder-[color:var(--text-dim)]"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={baseStyle}
          className="placeholder-[color:var(--text-dim)]"
        />
      )}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: 'var(--accent)' }}
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', message: '' });
  };

  const links = [
    { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, icon: '✉' },
    { label: 'GitHub', value: '@ananyagupta', href: personalInfo.github, icon: '◎' },
    { label: 'LinkedIn', value: 'Ananya Gupta', href: personalInfo.linkedin, icon: '◈' },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-32 px-6 flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-light whitespace-nowrap"
          style={{
            fontSize: 'clamp(100px, 20vw, 280px)',
            color: 'rgba(255,255,255,0.015)',
            lineHeight: 1,
          }}
        >
          Connect
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--text-dim)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            05 · Contact
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
              Let&apos;s build something
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
              meaningful together.
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-20 items-start">
          {/* Links */}
          <div className="space-y-8">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                whileHover={{ x: 8 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.02)',
                    color: 'var(--accent)',
                  }}
                >
                  {link.icon}
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: 'var(--text-dim)' }}>
                    {link.label}
                  </div>
                  <div
                    className="font-ui text-sm mt-0.5 transition-colors duration-300 group-hover:text-[color:var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.value}
                  </div>
                </div>
                <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>→</span>
              </motion.a>
            ))}

            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-display italic text-xl" style={{ color: 'var(--text-muted)' }}>
                &ldquo;The best technology disappears into the experience it creates.&rdquo;
              </p>
              <p className="font-mono text-xs mt-3" style={{ color: 'var(--text-dim)' }}>— Ananya Gupta</p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <InputField
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              delay={0.2}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              delay={0.3}
            />
            <InputField
              label="Message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              multiline
              delay={0.4}
            />

            <motion.button
              type="submit"
              className="relative group overflow-hidden px-10 py-5 font-ui text-sm tracking-[0.2em] uppercase transition-all duration-300 w-full"
              style={{
                border: '1px solid var(--accent)',
                color: sent ? 'var(--bg)' : 'var(--accent)',
                background: sent ? 'var(--accent)' : 'transparent',
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">
                {sent ? '✓ Message Sent' : 'Send Message'}
              </span>
              {!sent && (
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
                  style={{ background: 'var(--accent)', opacity: 0.1 }}
                />
              )}
            </motion.button>
          </motion.form>
        </div>

        {/* Footer line */}
        <motion.div
          className="mt-32 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            © 2025 Ananya Gupta · CS (IoT) · VIT Vellore
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-dim)' }}>
            Designed & built with intention
          </span>
        </motion.div>
      </div>
    </section>
  );
}
