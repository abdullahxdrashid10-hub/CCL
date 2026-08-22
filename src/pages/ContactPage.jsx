import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Mail, Clock, Globe } from 'lucide-react';
import FluidContactForm from '../components/FluidContactForm';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  return (
    <div className="py-12 md:py-16">
      {/* ── Header ── */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-8">
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
            Direct Quotation Desk
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight"
        >
          Request an <span className="text-gradient-brand">Upfront Rate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 text-base leading-relaxed font-body"
        >
          Complete our 3-step shipment matrix. Our operations desk will review route availability
          and provide an itemized quote with zero hidden surcharges.
        </motion.p>
      </div>

      {/* ── 3-Step Fluid Contact Form with pre-selection support ── */}
      <FluidContactForm initialService={initialService} />
    </div>
  );
}
