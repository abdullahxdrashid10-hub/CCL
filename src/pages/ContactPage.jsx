import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Mail, Clock, Globe } from 'lucide-react';
import FluidContactForm from '../components/FluidContactForm';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  return (
    <div className="relative overflow-hidden py-12 md:py-16">
      {/* Ambient Operations Command Center Background */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <img
          src="/images/dispatch-operations.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/80 to-[#030303]" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 mx-auto mb-8 max-w-3xl px-6 text-center">
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
            Direct Quotation Desk
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Request an <span className="text-gradient-brand">Upfront Rate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-base leading-relaxed text-neutral-400"
        >
          Complete our 3-step shipment matrix. Our operations desk will review
          route availability and provide an itemized quote with zero hidden
          surcharges.
        </motion.p>
      </div>

      {/* ── 3-Step Fluid Contact Form with pre-selection support ── */}
      <FluidContactForm initialService={initialService} />
    </div>
  );
}
