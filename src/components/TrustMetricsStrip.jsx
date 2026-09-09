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
      <span className="text-gradient-brand inline-flex items-center rounded-lg border border-white/10 bg-black/60 px-2 py-0.5 font-mono tracking-wider shadow-inner">
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="text-gradient-brand relative inline-flex items-center gap-0.5 overflow-hidden rounded-lg border border-white/10 bg-black/70 px-2.5 py-0.5 font-mono tracking-tighter shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"
    >
      {/* Mechanical odometer bevel highlight */}
      <span className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <span className="font-bold tabular-nums">
        {prefix}
        {String(displayValue).padStart(
          typeof value === 'number' && value >= 10 ? 2 : 1,
          '0'
        )}
        {suffix}
      </span>
      {isRolling && (
        <span className="ml-1 h-3 w-1 animate-pulse rounded-full bg-amber-500/40" />
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
    description:
      'Direct vessel & airline cargo comparison with transparent rates',
  },
  {
    id: 'visibility',
    icon: Activity,
    badge: 'Tracking',
    statValue: 100,
    statSuffix: '%',
    statPrefix: '',
    title: 'Stage-Level Visibility',
    description:
      'Checkpoint milestone reporting from pre-clearance to final door',
  },
];

export default function TrustMetricsStrip() {
  return (
    <div className="relative z-20 mx-auto -mt-8 w-full max-w-7xl px-6 md:px-12">
      <div
        className="rounded-3xl border p-6 backdrop-blur-2xl transition-all duration-500 md:p-8"
        style={{
          background:
            'linear-gradient(180deg, rgba(14, 18, 28, 0.85) 0%, rgba(6, 8, 12, 0.95) 100%)',
          borderColor: 'rgba(245, 148, 30, 0.15)',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(26, 53, 128, 0.2)',
        }}
      >
        {/* Top Manifest Header Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-6 font-mono text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="font-medium uppercase tracking-wider text-white">
              CCL Operations Framework
            </span>
            <span className="hidden text-neutral-600 sm:inline">|</span>
            <span className="hidden text-neutral-500 sm:inline">
              End-to-End Freight Standard
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-neutral-500">
            <span>UPFRONT PRICING</span>
            <span>•</span>
            <span>PRE-BORDER CLEARANCE</span>
            <span>•</span>
            <span className="font-semibold text-amber-500">
              VERIFIED COMPLIANCE
            </span>
          </div>
        </div>

        {/* 4 Manifest Capability Cards with mechanical odometer counters */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/5 hover:bg-white/[0.03]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND_BLUE}35, ${BRAND_BLUE}10)`,
                      border: `1px solid ${BRAND_BLUE}50`,
                      color: BRAND_ORANGE,
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  <span className="rounded border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                    {item.badge}
                  </span>
                </div>

                <div className="mb-2 flex items-center gap-2">
                  <OdometerCounter
                    value={item.statValue}
                    suffix={item.statSuffix}
                    prefix={item.statPrefix}
                  />
                  <h3 className="font-display text-sm font-semibold text-white transition-colors group-hover:text-amber-400">
                    {item.title}
                  </h3>
                </div>

                <p className="font-body text-xs leading-relaxed text-neutral-400">
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
