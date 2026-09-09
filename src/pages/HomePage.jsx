import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ArrowRight,
  Globe,
  Shield,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import HeroRouteCanvas from '../components/HeroRouteCanvas';
import ConnectiveRouteSpine from '../components/ConnectiveRouteSpine';
import TrustMetricsStrip from '../components/TrustMetricsStrip';
import ServicesGrid from '../components/ServicesGrid';
import NarrativeTimeline from '../components/NarrativeTimeline';
import MagneticButton from '../components/MagneticButton';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function HomePage() {
  const { scrollY } = useScroll();
  const canvasY = useTransform(scrollY, [0, 800], [0, 180]);
  const glow1Y = useTransform(scrollY, [0, 800], [0, 220]);
  const glow2Y = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <div className="bg-noise relative overflow-hidden">
      {/* Dynamic connecting vertical route spine */}
      <ConnectiveRouteSpine />

      {/* ── Hero Section with Abstract Route Canvas ── */}
      <section
        className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden px-6"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${BRAND_BLUE}20, #030303 85%)`,
        }}
      >
        {/* Cinematic Aerial Logistics Hub Background (Subtle Texture) */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-20 will-change-transform"
          style={{ y: canvasY }}
        >
          <img
            src="/images/hero-aerial-hub.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/90 via-[#030303]/75 to-[#030303]" />
        </motion.div>

        {/* Animated Abstract Great-Circle Route Canvas with GPU Parallax Depth */}
        <motion.div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ y: canvasY }}
        >
          <HeroRouteCanvas />
        </motion.div>

        {/* Ambient glow orbs with GPU parallax */}
        <motion.div
          className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[100px] will-change-transform"
          style={{
            background: BRAND_BLUE,
            y: glow1Y,
          }}
        />
        <motion.div
          className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-15 blur-[100px] will-change-transform"
          style={{
            background: BRAND_ORANGE,
            y: glow2Y,
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl py-16 text-center">
          {/* Brand Logo & Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex flex-col items-center gap-4"
          >
            <div
              className="flex items-center justify-center rounded-2xl px-5 py-3 transition-all duration-500"
              style={{
                background:
                  'linear-gradient(135deg, rgba(26, 53, 128, 0.35), rgba(245, 148, 30, 0.08))',
                border: '1px solid rgba(245, 148, 30, 0.25)',
                boxShadow:
                  '0 0 30px rgba(26, 53, 128, 0.3), 0 0 15px rgba(245, 148, 30, 0.15)',
              }}
            >
              <img
                src="/ccl-mark.png"
                alt="Connect Continents Logistics"
                className="h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,148,30,0.4)] md:h-12"
              />
            </div>

            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{
                background: `${BRAND_ORANGE}0C`,
                border: `1px solid ${BRAND_ORANGE}25`,
              }}
            >
              <div
                className="h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ background: BRAND_ORANGE }}
              />
              <span
                className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
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
            className="mb-6 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Connecting <span className="text-gradient-brand">Continents</span>
            <br />
            Delivering Trust
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl font-body text-base leading-relaxed text-neutral-400 md:text-lg"
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
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-display text-sm font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(245,148,30,0.4)]"
                style={{
                  background: BRAND_ORANGE,
                  color: '#030303',
                  boxShadow: `0 0 30px ${BRAND_ORANGE}35`,
                }}
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 font-display text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-amber-500/40 hover:bg-white/[0.08] hover:text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
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
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-500">
              <Sparkles size={13} />
              <span>Core Logistics Solutions</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Engineered for Precision & Speed
            </h2>
          </div>

          <Link
            to="/services"
            className="group inline-flex items-center gap-2 font-mono text-sm font-semibold text-amber-400 transition-colors hover:text-amber-300"
          >
            <span>View All 6 Services</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
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
        className="relative overflow-hidden px-6 py-24 md:px-12"
        style={{
          background: `linear-gradient(180deg, #030303 0%, ${BRAND_BLUE}20 50%, #030303 100%)`,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Ambient Panoramic Freight Horizon Background */}
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <img
            src="/images/cta-panoramic-freight.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-amber-500">
            Ready to Move Your Cargo?
          </span>
          <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-5xl">
            Get an Upfront, Transparent Rate
          </h2>
          <p className="mx-auto mb-8 max-w-xl font-body text-base text-neutral-400 md:text-lg">
            No hidden port fees. No quiet shipments. Speak directly with our
            dispatch team.
          </p>
          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl px-9 py-4 font-display text-sm font-semibold text-black transition-all duration-300 hover:scale-105"
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
