import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Compass, ArrowLeft, Globe, Shield, Send } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-10rem)] items-center justify-center overflow-hidden px-6 py-20">
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full opacity-20 blur-[140px]"
        style={{ background: BRAND_BLUE }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/3 h-96 w-96 rounded-full opacity-15 blur-[140px]"
        style={{ background: BRAND_ORANGE }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Animated Compass & Error Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(26, 53, 128, 0.4), rgba(245, 148, 30, 0.1))',
            border: '1.5px solid rgba(245, 148, 30, 0.3)',
            boxShadow: '0 0 35px rgba(245, 148, 30, 0.2)',
          }}
        >
          <Compass
            size={44}
            className="animate-spin text-amber-500"
            style={{ animationDuration: '20s' }}
          />
          <span className="absolute -right-2 -top-2 rounded-full border border-amber-500/50 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-amber-400">
            404
          </span>
        </motion.div>

        {/* Waypoint ID Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          <span>STATUS: UNCHARTED TRADE ROUTE</span>
        </div>

        {/* Main Headline */}
        <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          Waypoint <span className="text-gradient-brand">Not Found</span>
        </h1>

        <p className="mx-auto mb-10 max-w-md font-body text-sm leading-relaxed text-neutral-400 md:text-base">
          The dispatch coordinates you requested do not exist in the active CCL
          cargo matrix. Re-route to an established corridor below.
        </p>

        {/* Action Button */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton strength={0.2}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3.5 font-display text-sm font-semibold transition-all duration-300"
              style={{
                background: BRAND_ORANGE,
                color: '#030303',
                boxShadow: `0 0 30px ${BRAND_ORANGE}35`,
              }}
            >
              <ArrowLeft size={16} />
              <span>Return to Dispatch Hub</span>
            </Link>
          </MagneticButton>

          <MagneticButton strength={0.15}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-8 py-3.5 font-display text-sm font-semibold text-neutral-300 transition-all duration-300 hover:text-white"
            >
              <Send size={15} />
              <span>Contact Dispatch</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Quick Corridor Links */}
        <div className="border-t border-white/5 pt-8">
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-neutral-500">
            Active Navigation Corridors
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { path: '/services', label: 'Services' },
              { path: '/about', label: 'About & Leadership' },
              { path: '/portfolio', label: 'Trade Lanes' },
              { path: '/contact', label: 'Request Rate' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="rounded-lg border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 font-mono text-xs text-neutral-400 transition-all duration-200 hover:border-amber-500/40 hover:text-amber-400"
              >
                {link.label} ↗
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
