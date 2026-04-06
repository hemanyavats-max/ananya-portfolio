'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100000] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
            animate={{ top: ['-2px', '100vh'] }}
            transition={{ duration: 1.8, ease: 'linear' }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              className="font-mono text-xs tracking-[0.4em] mb-8"
              style={{ color: 'var(--text-dim)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              PORTFOLIO.INIT
            </motion.div>

            <motion.h1
              className="font-display text-6xl font-light"
              style={{ color: 'var(--text)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Ananya
            </motion.h1>
            <motion.h1
              className="font-display text-6xl italic"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Gupta
            </motion.h1>

            <motion.div
              className="mt-10 flex gap-2 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-px w-8"
                  style={{ background: 'var(--accent-2)' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.3 }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner decorations */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} w-6 h-6`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                borderTop: i < 2 ? '1px solid rgba(200,169,110,0.3)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(200,169,110,0.3)' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid rgba(200,169,110,0.3)' : 'none',
                borderRight: i % 2 === 1 ? '1px solid rgba(200,169,110,0.3)' : 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
