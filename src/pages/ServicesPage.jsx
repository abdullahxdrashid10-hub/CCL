import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2, Clock, Globe } from 'lucide-react';
import ServicesGrid from '../components/ServicesGrid';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
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
            Verified Service Scope
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
        >
          End-to-End <span className="text-gradient-brand">Freight Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 text-base md:text-lg leading-relaxed font-body"
        >
          Explore our six core logistics offerings. Every shipment is managed with stage-level
          visibility, upfront pricing, and pre-cleared documentation.
        </motion.p>
      </div>

      {/* ── Full Interactive Services Grid ── */}
      <ServicesGrid showFilter={true} isPreview={false} />

      {/* ── CCL Service Guarantee Strip ── */}
      <div
        className="mt-24 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-white/10 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.25) 0%, rgba(3, 3, 3, 0.95) 100%)',
        }}
      >
        {/* Ambient Panoramic Freight Horizon Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="/images/cta-panoramic-freight.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <Clock size={22} />
            </div>
            <div>
              <h4 className="text-white font-display font-semibold text-base mb-1">
                Stage Visibility
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed font-body">
                Continuous milestone reporting at every transit checkpoint, not just pickup and delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-white font-display font-semibold text-base mb-1">
                Zero Hidden Markups
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed font-body">
                Direct carrier comparison rates delivered upfront with fully itemized port and clearance fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <Globe size={22} />
            </div>
            <div>
              <h4 className="text-white font-display font-semibold text-base mb-1">
                Single Point of Contact
              </h4>
              <p className="text-neutral-400 text-xs leading-relaxed font-body">
                One dedicated logistics coordinator managing your multimodal route from port to door.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-400 text-sm font-body">
            Need a custom multimodal routing configuration?
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono text-black font-display"
            style={{ background: BRAND_ORANGE }}
          >
            <span>Consult an Expert</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
