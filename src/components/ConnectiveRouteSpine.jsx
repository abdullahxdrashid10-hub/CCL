import { useEffect, useState } from 'react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ConnectiveRouteSpine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(Math.max(window.scrollY / totalScroll, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', handleScroll);
    };
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

          {/* Dynamic scroll-following glowing active path */}
          {!prefersReducedMotion && (
            <div
              className="absolute top-0 left-0 w-[2px] origin-top rounded-full transition-all duration-150"
              style={{
                height: `${scrollProgress * 100}%`,
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
