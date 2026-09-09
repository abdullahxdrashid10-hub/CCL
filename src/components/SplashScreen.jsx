import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    try {
      const hasSeenSplash = sessionStorage.getItem('ccl_splash_seen');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (hasSeenSplash || prefersReduced) {
        return;
      }

      setShowSplash(true);

      const timer = setTimeout(() => {
        setShowSplash(false);
        try {
          sessionStorage.setItem('ccl_splash_seen', 'true');
        } catch (_) {}
      }, 1200);

      return () => clearTimeout(timer);
    } catch (_) {
      // In case storage is disabled
      setShowSplash(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Background Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background: `radial-gradient(circle at center, ${BRAND_BLUE} 0%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated SVG Route Arc behind Logo */}
            <div className="relative w-28 h-28 flex items-center justify-center mb-5">
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={`${BRAND_BLUE}50`}
                  strokeWidth="1.5"
                  strokeDasharray="4,8"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={BRAND_ORANGE}
                  strokeWidth="2"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: 270 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              </svg>

              {/* Centered Logo Badge */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center p-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.4), rgba(245, 148, 30, 0.1))',
                  border: '1px solid rgba(245, 148, 30, 0.3)',
                }}
              >
                <img
                  src="/ccl-mark.png"
                  alt="Connect Continents Logistics"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

            <div className="text-center">
              <h2 className="font-display font-bold text-white text-base tracking-wider mb-1">
                CONNECT CONTINENTS
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-500">
                Logistics Dispatch Hub
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
