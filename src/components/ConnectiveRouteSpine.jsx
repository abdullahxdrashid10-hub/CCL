import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ConnectiveRouteSpine() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {/* Centered / Left connective SVG thread */}
      <div className="max-w-7xl mx-auto h-full relative px-6 md:px-12">
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[2px]">
          {/* Subtle static guideline */}
          <div
            className="absolute inset-0 w-[1px] opacity-15"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${BRAND_BLUE} 10%, ${BRAND_ORANGE} 50%, ${BRAND_BLUE} 90%, transparent 100%)`,
            }}
          />

          {/* Dynamic scroll-following glowing active path (GPU accelerated scaleY) */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute top-0 left-0 w-[2px] h-full origin-top rounded-full will-change-transform"
              style={{
                scaleY,
                background: `linear-gradient(180deg, ${BRAND_BLUE} 0%, ${BRAND_ORANGE} 50%, #FFAA40 100%)`,
                boxShadow: `0 0 12px ${BRAND_ORANGE}60, 0 0 20px ${BRAND_BLUE}80`,
              }}
            />
          )}

          {/* Waypoint nodes at strategic intervals */}
          {[12, 28, 48, 72, 92].map((topPercent, index) => (
            <div
              key={index}
              className="absolute -left-[5px] -translate-y-1/2 flex items-center gap-3"
              style={{ top: `${topPercent}%` }}
            >
              <div
                className="w-3 h-3 rounded-full flex items-center justify-center"
                style={{
                  background: '#030303',
                  border: `1.5px solid ${BRAND_ORANGE}`,
                  boxShadow: `0 0 10px ${BRAND_ORANGE}40`,
                }}
              >
                <div
                  className="w-1 h-1 rounded-full animate-pulse"
                  style={{ background: BRAND_ORANGE }}
                />
              </div>

              <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest opacity-0 hover:opacity-100 transition-opacity">
                WP-0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
