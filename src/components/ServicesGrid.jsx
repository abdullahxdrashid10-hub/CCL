import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SERVICES from '../data/services';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

// Categorization helper for optional tab filtering
const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'freight', label: 'Freight Modes' },
  { id: 'customs-compliance', label: 'Customs & Insurance' },
  { id: 'logistics', label: 'Land & Storage' },
];

const SERVICE_CATEGORY_MAP = {
  'ocean-freight': 'freight',
  'air-freight': 'freight',
  'customs-brokerage': 'customs-compliance',
  'cargo-insurance': 'customs-compliance',
  warehousing: 'logistics',
  'land-trucking': 'logistics',
};

// Mode-specific capability tags based strictly on approved service scopes
const SERVICE_CAPABILITIES = {
  'ocean-freight': [
    'FCL & LCL Options',
    'Stage Visibility',
    'Route Optimization',
    'Port Drayage Coordination',
  ],
  'air-freight': [
    'Express Transit',
    'Carrier Rate Comparison',
    'Zero Unexplained Markups',
    'Urgent Cargo Handling',
  ],
  'customs-brokerage': [
    'Pre-Border Verification',
    'Classification & Clearance',
    'End-to-End Paperwork',
    'Audit Compliance',
  ],
  warehousing: [
    'Short & Long-Term Storage',
    'Transit Hubs',
    'Inventory Visibility',
    'Secure Handling',
  ],
  'land-trucking': [
    'Port-to-Door Delivery',
    'Unified Transit Chain',
    'Direct Carrier Coordination',
    'Regional Fleet Access',
  ],
  'cargo-insurance': [
    'Upfront Terms Review',
    'Booking-Time Protection',
    'Transparent Coverage',
    'Claims Guidance',
  ],
};

// Mode-specific operational specifications (specs) verified against CCL service matrix
const SERVICE_SPECS = {
  'ocean-freight': [
    { label: 'TRANSIT TIME', value: '14–28 Days Global' },
    { label: 'LOAD CAPACITY', value: 'FCL & LCL Consolidated' },
    { label: 'VISIBILITY', value: '24/7 AIS Satellite' },
    { label: 'CARRIER NETWORK', value: 'Direct Tier-1 Lines' },
  ],
  'air-freight': [
    { label: 'TRANSIT SPEED', value: '24–72 Hrs Priority' },
    { label: 'SCHEDULE TYPE', value: 'Next-Flight-Out (NFO)' },
    { label: 'MARKUP POLICY', value: '0% Hidden Markups' },
    { label: 'CARRIER ACCESS', value: 'Direct Global Airlines' },
  ],
  'customs-brokerage': [
    { label: 'CLEARANCE TIMING', value: 'Pre-Arrival Filing' },
    { label: 'DOCUMENTATION', value: '100% Digital EDI Manifest' },
    { label: 'AUDIT STATUS', value: 'HTS & Tariff Pre-Cleared' },
    { label: 'GATEWAY SCOPE', value: 'Major Sea & Air Hubs' },
  ],
  warehousing: [
    { label: 'STORAGE MODEL', value: 'Short & Long-Term' },
    { label: 'FACILITY CLASS', value: 'Bonded & Secure Hubs' },
    { label: 'INVENTORY SYNC', value: 'Real-Time WMS Portal' },
    { label: 'HANDLING SCOPE', value: 'Palletized & Cross-Dock' },
  ],
  'land-trucking': [
    { label: 'TRANSIT CORRIDOR', value: 'Port-to-Door Direct' },
    { label: 'FLEET CAPACITY', value: 'Dedicated FTL & LTL' },
    { label: 'TELEMETRY', value: 'Active GPS Route Sync' },
    { label: 'COORDINATION', value: 'Unified Transit Chain' },
  ],
  'cargo-insurance': [
    { label: 'POLICY TERMS', value: 'Upfront Plain Language' },
    { label: 'COVERAGE SCOPE', value: 'All-Risk Door-to-Door' },
    { label: 'BIND TIMELINE', value: 'Instant at Booking' },
    { label: 'CLAIMS SUPPORT', value: 'Dedicated In-House Advocate' },
  ],
};

function ServiceCard({ service, index, isPreview = false }) {
  const [showFullScope, setShowFullScope] = useState(false);
  const Icon = service.icon;
  const capabilities = SERVICE_CAPABILITIES[service.id] || [];
  const specs = SERVICE_SPECS[service.id] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <div
        className="service-card group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7"
        style={{
          background:
            'linear-gradient(180deg, rgba(16, 22, 36, 0.85) 0%, rgba(6, 8, 14, 0.95) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Dynamic ambient background glow flare on hover */}
        <div
          className="service-glow pointer-events-none absolute -right-24 -top-24 h-56 w-56 scale-90 rounded-full opacity-0 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(245, 148, 30, 0.4) 0%, rgba(26, 53, 128, 0.25) 70%, transparent 100%)',
          }}
        />

        {/* Subtle top border beam highlight */}
        <div className="absolute left-8 right-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div>
          {/* Service Image Header */}
          {service.image && (
            <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-inner sm:h-52">
              <img
                src={service.image}
                alt={service.title}
                className="service-image h-full w-full scale-100 object-cover object-center brightness-95"
                loading="lazy"
              />
              {/* Cinematic Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06080e] via-black/30 to-black/40" />

              {/* Overlaid Icon Badge with hover tilt */}
              <div className="absolute left-3 top-3">
                <div
                  className="service-icon flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 shadow-xl backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_BLUE}cc, ${BRAND_BLUE}66)`,
                    color: BRAND_ORANGE,
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
              </div>

              {/* Number & Status Badge */}
              <div className="absolute right-3 top-3 flex items-center gap-1.5">
                <span className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300 backdrop-blur-md transition-all duration-300 group-hover:border-amber-500/50 group-hover:bg-black/80 group-hover:text-amber-300">
                  0{index + 1}
                </span>
              </div>

              {/* Hover Telemetry Overlay Pill on Image */}
              <div className="service-telemetry pointer-events-none absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-between rounded-lg border border-white/10 bg-black/80 px-3 py-1.5 opacity-0 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-ping rounded-full bg-amber-400" />
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-400">
                    Live Lane Telemetry
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">
                  Active Protocol
                </span>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="service-title mb-3 font-display text-xl font-semibold text-white">
            {service.title}
          </h3>

          {/* Description (Verbatim approved text) */}
          <p className="mb-6 font-body text-sm leading-relaxed text-neutral-400">
            {service.description}
          </p>

          {/* ── ON-HOVER OPERATIONAL SPECS HUD ── */}
          <div className="mb-6 border-t border-white/10 pt-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="spec-pip h-2 w-2 rounded-full bg-neutral-600" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Operational Specs
                </span>
              </div>
              <span className="rounded border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] uppercase text-neutral-500 transition-all duration-300 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 group-hover:text-amber-400">
                Live Active
              </span>
            </div>

            {/* 2x2 High-Tech Specifications Tiles Matrix */}
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="spec-tile flex flex-col justify-center rounded-xl border border-white/5 bg-black/40 p-2.5"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="spec-pip h-1 w-1 rounded-full bg-neutral-600" />
                    <span className="truncate font-mono text-[9px] font-medium uppercase tracking-wider text-neutral-400">
                      {spec.label}
                    </span>
                  </div>
                  <div className="truncate font-mono text-xs font-semibold tracking-tight text-neutral-300 transition-colors duration-300 group-hover:text-white">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Capability Checklist with Toggle */}
            <div className="mt-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullScope(!showFullScope);
                }}
                className="group/btn flex w-full items-center justify-between px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400 transition-colors hover:text-amber-400"
              >
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-500">
                    {showFullScope ? '−' : '+'}
                  </span>
                  <span>
                    {showFullScope
                      ? 'Hide Scope Verification'
                      : 'Verified Scope Checklist'}
                  </span>
                </span>
                <span className="text-[9px] text-neutral-600 group-hover/btn:text-neutral-400">
                  {capabilities.length} Points
                </span>
              </button>

              {/* Smooth Scope Expand */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showFullScope
                    ? 'mt-2 max-h-52 opacity-100'
                    : 'max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-52 group-hover:opacity-100'
                }`}
              >
                <ul className="space-y-1.5 rounded-xl border border-white/5 bg-black/40 p-2">
                  {capabilities.map((cap, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-neutral-300 transition-transform duration-200 hover:translate-x-1"
                    >
                      <CheckCircle2
                        size={12}
                        className="shrink-0 text-amber-400"
                      />
                      <span className="font-body text-[11px] text-neutral-300">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <Link
            to={`/contact?service=${service.id}`}
            className="service-cta inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-500 transition-all duration-300"
          >
            <span className="service-cta-text">Request Quote</span>
            <ArrowRight
              size={14}
              className="service-cta-arrow transition-transform duration-300"
            />
          </Link>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-600 transition-colors group-hover:animate-pulse group-hover:bg-emerald-400" />
            Verified Lane
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({
  showFilter = true,
  limit = undefined,
  isPreview = false,
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    return SERVICE_CATEGORY_MAP[service.id] === activeCategory;
  }).slice(0, limit || SERVICES.length);

  return (
    <div className="w-full">
      {/* ── Optional Category Filter Tabs ── */}
      {showFilter && (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="rounded-xl px-5 py-2 font-body text-xs font-medium transition-all duration-300 md:text-sm"
                style={{
                  color: isActive ? '#FFFFFF' : '#888888',
                  background: isActive
                    ? `${BRAND_ORANGE}18`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isActive ? `${BRAND_ORANGE}50` : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive ? `0 0 20px ${BRAND_ORANGE}15` : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Services Grid ── */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="wait">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isPreview={isPreview}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
