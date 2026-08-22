import { useEffect, useRef } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
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
    /* ── Initialize Lenis smooth scroll ── */
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    /* ── Sync Lenis → GSAP ScrollTrigger ── */
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    /* ── Cleanup ── */
    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  // Recalculate GSAP ScrollTrigger and scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-400">
      {/* Branded initial load state */}
      <SplashScreen />

      {/* Scroll restoration */}
      <ScrollToTop />

      <Navbar />

      <main className="flex-grow pt-20 relative">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
