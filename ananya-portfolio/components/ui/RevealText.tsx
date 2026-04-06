'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  stagger?: boolean;
}

export default function RevealText({ children, className = '', style, delay = 0, tag: Tag = 'p', stagger = false }: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  if (stagger) {
    const words = children.split(' ');
    return (
      <Tag ref={ref} className={`overflow-hidden ${className}`} style={style}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: '110%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
              transition={{ duration: 0.65, delay: delay + i * 0.06, ease: [0.16, 1, 0.3, 1] as any }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as any }}
      >
        <Tag className={className} style={style}>{children}</Tag>
      </motion.div>
    </div>
  );
}
