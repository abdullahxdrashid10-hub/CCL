import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Globe,
} from 'lucide-react';
import ServicesGrid from '../components/ServicesGrid';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
      {/* ── Page Header ── */}
      <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
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
            Verified Service Scope
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          End-to-End{' '}
          <span className="text-gradient-brand">Freight Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          Explore our six core logistics offerings. Every shipment is managed
          with stage-level visibility, upfront pricing, and pre-cleared
          documentation.
        </motion.p>
      </div>

      {/* ── Full Interactive Services Grid ── */}
      <ServicesGrid showFilter={true} isPreview={false} />

      {/* ── CCL Service Guarantee Strip ── */}
      <div
        className="relative mt-24 overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl md:p-12"
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 53, 128, 0.25) 0%, rgba(3, 3, 3, 0.95) 100%)',
        }}
      >
        {/* Ambient Panoramic Freight Horizon Background */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <img
            src="/images/cta-panoramic-freight.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <Clock size={22} />
            </div>
            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                Stage Visibility
              </h4>
              <p className="font-body text-xs leading-relaxed text-neutral-400">
                Continuous milestone reporting at every transit checkpoint, not
                just pickup and delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                Zero Hidden Markups
              </h4>
              <p className="font-body text-xs leading-relaxed text-neutral-400">
                Direct carrier comparison rates delivered upfront with fully
                itemized port and clearance fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `${BRAND_ORANGE}15`,
                border: `1px solid ${BRAND_ORANGE}30`,
                color: BRAND_ORANGE,
              }}
            >
              <Globe size={22} />
            </div>
            <div>
              <h4 className="mb-1 font-display text-base font-semibold text-white">
                Single Point of Contact
              </h4>
              <p className="font-body text-xs leading-relaxed text-neutral-400">
                One dedicated logistics coordinator managing your multimodal
                route from port to door.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <span className="font-body text-sm text-neutral-400">
            Need a custom multimodal routing configuration?
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-display font-mono text-xs font-semibold uppercase tracking-wider text-black"
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
