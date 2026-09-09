import { useEffect, useRef } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import SplashScreen from './SplashScreen';

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    /* ── Initialize Lenis smooth scroll with optimal performance configuration ── */
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    /* ── Sync Lenis → GSAP ScrollTrigger ── */
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    // Use healthy lag smoothing to prevent stutter jumps during frame drops
    gsap.ticker.lagSmoothing(500, 33);

    /* ── Cleanup ── */
    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Kill all ScrollTrigger instances, scroll to top, and re-initialize on route change
  useEffect(() => {
    // Kill stale ScrollTrigger instances from the previous page
    ScrollTrigger.getAll().forEach((st) => st.kill());

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Give the new page DOM time to mount, then refresh all triggers
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-400">
      {/* Branded initial load state */}
      <SplashScreen />

      {/* Scroll restoration */}
      <ScrollToTop />

      <Navbar />

      <main className="flex-grow pt-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
