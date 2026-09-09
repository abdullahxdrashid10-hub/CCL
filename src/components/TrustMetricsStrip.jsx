import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Ship, Globe, Activity, Layers } from 'lucide-react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

function OdometerCounter({ value, suffix = '', prefix = '', duration = 1.6 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView || typeof value !== 'number') return;

    setIsRolling(true);
    let start = 0;
    const end = value;
    const startTime = performance.now();

    const animateNumber = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Mechanical ease out quartic
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeProgress * (end - start) + start);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      } else {
        setDisplayValue(end);
        setIsRolling(false);
      }
    };

    const frameId = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value, duration]);

  if (typeof value !== 'number') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-black/60 border border-white/10 font-mono tracking-wider text-gradient-brand shadow-inner">
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-lg bg-black/70 border border-white/10 font-mono tracking-tighter text-gradient-brand shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] relative overflow-hidden"
    >
      {/* Mechanical odometer bevel highlight */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <span className="tabular-nums font-bold">
        {prefix}
        {String(displayValue).padStart(typeof value === 'number' && value >= 10 ? 2 : 1, '0')}
        {suffix}
      </span>
      {isRolling && (
        <span className="w-1 h-3 ml-1 rounded-full bg-amber-500/40 animate-pulse" />
      )}
    </span>
  );
}

const METRICS = [
  {
    id: 'modes',
    icon: Layers,
    badge: 'Scope',
    statValue: 6,
    statSuffix: '',
    statPrefix: '',
    title: 'Core Solutions',
    description: 'Ocean, Air, Inland, Warehousing, Customs & Cargo Insurance',
  },
  {
    id: 'corridors',
    icon: Globe,
    badge: 'Network',
    statValue: 4,
    statSuffix: ' Primary',
    statPrefix: '',
    title: 'Global Corridors',
    description: 'East Asia, Arabian Gulf, Europe & Trans-Pacific Trade Lanes',
  },
  {
    id: 'carriers',
    icon: Ship,
    badge: 'Routing',
    statValue: 'Tier-1',
    statSuffix: '',
    statPrefix: '',
    title: 'Direct Carrier Access',
    description: 'Direct vessel & airline cargo comparison with transparent rates',
  },
  {
    id: 'visibility',
    icon: Activity,
    badge: 'Tracking',
    statValue: 100,
    statSuffix: '%',
    statPrefix: '',
    title: 'Stage-Level Visibility',
    description: 'Checkpoint milestone reporting from pre-clearance to final door',
  },
];

export default function TrustMetricsStrip() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 -mt-8 relative z-20">
      <div
        className="rounded-3xl p-6 md:p-8 backdrop-blur-2xl border transition-all duration-500"
        style={{
          background: 'linear-gradient(180deg, rgba(14, 18, 28, 0.85) 0%, rgba(6, 8, 12, 0.95) 100%)',
          borderColor: 'rgba(245, 148, 30, 0.15)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(26, 53, 128, 0.2)',
        }}
      >
        {/* Top Manifest Header Strip */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/5 gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-medium uppercase tracking-wider">
              CCL Operations Framework
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-500 hidden sm:inline">End-to-End Freight Standard</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>UPFRONT PRICING</span>
            <span>•</span>
            <span>PRE-BORDER CLEARANCE</span>
            <span>•</span>
            <span className="text-amber-500 font-semibold">VERIFIED COMPLIANCE</span>
          </div>
        </div>

        {/* 4 Manifest Capability Cards with mechanical odometer counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.03] border border-transparent hover:border-white/5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_BLUE}35, ${BRAND_BLUE}10)`,
                      border: `1px solid ${BRAND_BLUE}50`,
                      color: BRAND_ORANGE,
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                    {item.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <OdometerCounter
                    value={item.statValue}
                    suffix={item.statSuffix}
                    prefix={item.statPrefix}
                  />
                  <h3 className="text-sm font-display font-semibold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-neutral-400 text-xs leading-relaxed font-body">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
