import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import NarrativeTimeline from '../components/NarrativeTimeline';

const BRAND_ORANGE = '#F5941E';

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      {/* ── Header ── */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
          style={{
            background: `${BRAND_ORANGE}0C`,
            border: `1px solid ${BRAND_ORANGE}25`,
          }}
        >
          <Sparkles size={13} className="text-amber-500" />
          <span
            className="text-[11px] uppercase tracking-[0.2em] font-mono font-medium"
            style={{ color: BRAND_ORANGE }}
          >
            Leadership & Origins
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
        >
          Built to Deliver <span className="text-gradient-brand">Trust</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 text-base md:text-lg leading-relaxed font-body"
        >
          We founded Connect Continents Logistics after experiencing the industry’s broken communication
          and opaque markups firsthand. Here is what we built instead.
        </motion.p>
      </div>

      {/* ── Verified Narrative Timeline & Founder Cards ── */}
      <NarrativeTimeline />

      {/* ── Bottom CTA ── */}
      <div className="max-w-4xl mx-auto px-6 mt-16 text-center">
        <div
          className="p-8 md:p-12 rounded-3xl border border-white/5"
          style={{
            background: 'linear-gradient(180deg, rgba(26,53,128,0.12) 0%, rgba(3,3,3,0.8) 100%)',
          }}
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Experience Transparent Freight Forwarding
          </h3>
          <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-body">
            Get in touch with our leadership and dispatch team to review your trade routes.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-xs uppercase tracking-wider font-mono text-black"
            style={{ background: BRAND_ORANGE }}
          >
            <span>Speak with the Team</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
