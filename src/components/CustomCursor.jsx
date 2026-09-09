import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const BRAND_ORANGE = '#F5941E';

export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    let prevHovered = false;
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== 'function') return;

      const isInteractive = Boolean(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-card')
      );

      if (isInteractive !== prevHovered) {
        prevHovered = isInteractive;
        setIsHovered(isInteractive);
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Outer trailing aura ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color,box-shadow] duration-200"
        style={{
          x: springX,
          y: springY,
          width: isHovered ? 44 : 22,
          height: isHovered ? 44 : 22,
          border: `1.5px solid ${isHovered ? BRAND_ORANGE : 'rgba(245, 148, 30, 0.4)'}`,
          background: isHovered ? 'rgba(245, 148, 30, 0.08)' : 'transparent',
          boxShadow: isHovered ? `0 0 20px ${BRAND_ORANGE}30` : 'none',
        }}
      />

      {/* Inner precise glowing dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          width: isClicking ? 4 : isHovered ? 6 : 4,
          height: isClicking ? 4 : isHovered ? 6 : 4,
          background: isHovered ? '#FFFFFF' : BRAND_ORANGE,
          boxShadow: `0 0 10px ${BRAND_ORANGE}`,
        }}
      />
    </>
  );
}
