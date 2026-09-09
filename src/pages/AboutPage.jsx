import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import NarrativeTimeline from '../components/NarrativeTimeline';

const BRAND_ORANGE = '#F5941E';

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden py-12 md:py-16">
      {/* Cinematic Operations Hub Dimmed & Blurred Full-Page Background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <img
          src="/images/bg-about-leadership.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-25 brightness-90 contrast-[1.05] blur-[3px] scale-105"
        />
        {/* Ambient Dimming & Radial Vignette Overlays */}
        <div className="absolute inset-0 bg-[#030303]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/70 via-transparent to-[#030303]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,#030303_90%)]" />
      </div>

      {/* Ambient background glow orbs */}
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full opacity-15 blur-[100px]"
        style={{ background: '#1A3580' }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full opacity-10 blur-[100px]"
        style={{ background: BRAND_ORANGE }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 mx-auto mb-12 max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: `${BRAND_ORANGE}0C`,
            border: `1px solid ${BRAND_ORANGE}25`,
          }}
        >
          <Sparkles size={13} className="text-amber-500" />
          <span
            className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
            style={{ color: BRAND_ORANGE }}
          >
            Leadership &amp; Origins
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Built to Deliver <span className="text-gradient-brand">Trust</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          We founded Connect Continents Logistics after experiencing the
          industry&apos;s broken communication and opaque markups firsthand.
          Here is what we built instead.
        </motion.p>
      </div>

      {/* ── Verified Narrative Timeline & Founder Cards ── */}
      <NarrativeTimeline />

      {/* ── Bottom CTA ── */}
      <div className="mx-auto mt-16 max-w-4xl px-6 text-center">
        <div
          className="relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl md:p-12"
          style={{
            background:
              'linear-gradient(180deg, rgba(26,53,128,0.2) 0%, rgba(3,3,3,0.95) 100%)',
          }}
        >
          {/* Ambient Panoramic Freight Horizon Background */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <img
              src="/images/cta-panoramic-freight.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
          </div>

          <div className="relative z-10">
            <h3 className="mb-4 font-display text-2xl font-bold text-white md:text-3xl">
              Experience Transparent Freight Forwarding
            </h3>
            <p className="mx-auto mb-8 max-w-lg font-body text-sm text-neutral-400 md:text-base">
              Get in touch with our leadership and dispatch team to review your
              trade routes.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-display font-mono text-xs font-semibold uppercase tracking-wider text-black transition-transform hover:scale-105"
              style={{ background: BRAND_ORANGE }}
            >
              <span>Speak with the Team</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
