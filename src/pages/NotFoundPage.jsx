import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, Globe, Shield, Send } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-[calc(100vh-10rem)] flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-20"
        style={{ background: BRAND_BLUE }}
      />
      <div
        className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-15"
        style={{ background: BRAND_ORANGE }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated Compass & Error Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.4), rgba(245, 148, 30, 0.1))',
            border: '1.5px solid rgba(245, 148, 30, 0.3)',
            boxShadow: '0 0 35px rgba(245, 148, 30, 0.2)',
          }}
        >
          <Compass size={44} className="text-amber-500 animate-spin" style={{ animationDuration: '20s' }} />
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-900 border border-amber-500/50 text-amber-400">
            404
          </span>
        </motion.div>

        {/* Waypoint ID Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4 text-xs font-mono text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>STATUS: UNCHARTED TRADE ROUTE</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
          Waypoint <span className="text-gradient-brand">Not Found</span>
        </h1>

        <p className="text-neutral-400 text-sm md:text-base font-body max-w-md mx-auto mb-10 leading-relaxed">
          The dispatch coordinates you requested do not exist in the active CCL cargo matrix. Re-route to an established corridor below.
        </p>

        {/* Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <MagneticButton strength={0.2}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm transition-all duration-300"
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-sm text-neutral-300 hover:text-white border border-white/10 bg-white/[0.03] transition-all duration-300"
            >
              <Send size={15} />
              <span>Contact Dispatch</span>
            </Link>
          </MagneticButton>
        </div>

        {/* Quick Corridor Links */}
        <div className="pt-8 border-t border-white/5">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-4">
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
                className="px-4 py-1.5 rounded-lg text-xs font-mono text-neutral-400 hover:text-amber-400 bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 transition-all duration-200"
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
