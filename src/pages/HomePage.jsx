import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import HeroRouteCanvas from '../components/HeroRouteCanvas';
import ConnectiveRouteSpine from '../components/ConnectiveRouteSpine';
import TrustMetricsStrip from '../components/TrustMetricsStrip';
import ServicesGrid from '../components/ServicesGrid';
import NarrativeTimeline from '../components/NarrativeTimeline';
import MagneticButton from '../components/MagneticButton';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden bg-noise">
      {/* Dynamic connecting vertical route spine */}
      <ConnectiveRouteSpine />

      {/* ── Hero Section with Abstract Route Canvas ── */}
      <section
        className="relative flex items-center justify-center min-h-[calc(100vh-5rem)] px-6 overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${BRAND_BLUE}20, #030303 85%)`,
        }}
      >
        {/* Animated Abstract Great-Circle Route Canvas with Parallax Depth */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-75"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <HeroRouteCanvas />
        </div>

        {/* Ambient glow orbs with multi-depth parallax */}
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-20 transition-transform duration-100"
          style={{
            background: BRAND_BLUE,
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-15 transition-transform duration-100"
          style={{
            background: BRAND_ORANGE,
            transform: `translateY(${scrollY * 0.18}px)`,
          }}
        />

        <div className="text-center max-w-4xl mx-auto relative z-10 py-16">
          {/* Brand Logo & Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <div
              className="px-5 py-3 rounded-2xl flex items-center justify-center transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.35), rgba(245, 148, 30, 0.08))',
                border: '1px solid rgba(245, 148, 30, 0.25)',
                boxShadow: '0 0 30px rgba(26, 53, 128, 0.3), 0 0 15px rgba(245, 148, 30, 0.15)',
              }}
            >
              <img
                src="/ccl-mark.png"
                alt="Connect Continents Logistics"
                className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,148,30,0.4)]"
              />
            </div>

            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: `${BRAND_ORANGE}0C`,
                border: `1px solid ${BRAND_ORANGE}25`,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: BRAND_ORANGE }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.2em] font-mono font-medium"
                style={{ color: BRAND_ORANGE }}
              >
                Global Freight Forwarding
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.05] tracking-tight"
          >
            Connecting{' '}
            <span className="text-gradient-brand">Continents</span>
            <br />
            Delivering Trust
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg mb-10 leading-relaxed font-body"
          >
            Ocean. Air. Customs. End-to-end logistics engineered for speed,
            transparency, and reliability across every trade lane.
          </motion.p>

          {/* Action CTAs with Magnetic Physics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton strength={0.2}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-sm transition-all duration-300 shadow-lg"
                style={{
                  background: BRAND_ORANGE,
                  color: '#030303',
                  boxShadow: `0 0 30px ${BRAND_ORANGE}35`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 0 40px ${BRAND_ORANGE}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 0 30px ${BRAND_ORANGE}35`;
                }}
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-display font-semibold text-sm text-neutral-300 hover:text-white transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${BRAND_ORANGE}60`;
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
              >
                <span>Explore Solutions</span>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Manifest Trust & Metrics Strip ── */}
      <TrustMetricsStrip />

      {/* ── Services Preview Section ── */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 mb-3">
              <Sparkles size={13} />
              <span>Core Logistics Solutions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">
              Engineered for Precision & Speed
            </h2>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 font-mono transition-colors group"
          >
            <span>View All 6 Services</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Render top 3 services in preview mode */}
        <ServicesGrid showFilter={false} limit={3} isPreview={true} />
      </section>

      {/* ── Narrative Timeline / About Preview ── */}
      <section className="border-t border-white/5">
        <NarrativeTimeline />
      </section>

      {/* ── Pre-Footer Conversion Band ── */}
      <section
        className="py-24 px-6 md:px-12 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, #030303 0%, ${BRAND_BLUE}20 50%, #030303 100%)`,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 mb-4 block">
            Ready to Move Your Cargo?
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Get an Upfront, Transparent Rate
          </h2>
          <p className="text-neutral-400 text-base md:text-lg mb-8 max-w-xl mx-auto font-body">
            No hidden port fees. No quiet shipments. Speak directly with our dispatch team.
          </p>
          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl font-display font-semibold text-sm text-black transition-all duration-300"
              style={{
                background: BRAND_ORANGE,
                boxShadow: `0 0 35px ${BRAND_ORANGE}40`,
              }}
            >
              <span>Initiate Quotation</span>
              <ArrowRight size={16} />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
