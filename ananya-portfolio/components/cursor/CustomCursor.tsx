'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 50, stiffness: 800 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      setIsHovering(true);
      const text = target.getAttribute('data-cursor-text') || '';
      setCursorText(text);
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactables = document.querySelectorAll('a, button, [data-hover]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="rounded-full border flex items-center justify-center overflow-hidden"
          style={{ marginLeft: '-20px', marginTop: '-20px' }}
          animate={{
            width: isHovering ? 60 : isClicking ? 20 : 40,
            height: isHovering ? 60 : isClicking ? 20 : 40,
            borderColor: isHovering ? 'rgba(200,169,110,0.8)' : 'rgba(200,169,110,0.4)',
            backgroundColor: isHovering ? 'rgba(200,169,110,0.1)' : 'transparent',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {cursorText && (
            <span
              className="text-[9px] tracking-widest uppercase font-ui"
              style={{ color: 'var(--accent)', opacity: 1 }}
            >
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full"
          style={{
            width: 5,
            height: 5,
            marginLeft: '-2.5px',
            marginTop: '-2.5px',
            backgroundColor: 'var(--accent)',
          }}
          animate={{
            scale: isClicking ? 0.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 500 }}
        />
      </motion.div>

      {/* Glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: cursorX, y: cursorY }}
      >
        <div
          className="rounded-full"
          style={{
            width: 80,
            height: 80,
            marginLeft: '-40px',
            marginTop: '-40px',
            background: 'radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />
      </motion.div>
    </>
  );
}
