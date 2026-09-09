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
  'warehousing': 'logistics',
  'land-trucking': 'logistics',
};

// Mode-specific capability tags based strictly on approved service scopes
const SERVICE_CAPABILITIES = {
  'ocean-freight': ['FCL & LCL Options', 'Stage Visibility', 'Route Optimization', 'Port Drayage Coordination'],
  'air-freight': ['Express Transit', 'Carrier Rate Comparison', 'Zero Unexplained Markups', 'Urgent Cargo Handling'],
  'customs-brokerage': ['Pre-Border Verification', 'Classification & Clearance', 'End-to-End Paperwork', 'Audit Compliance'],
  'warehousing': ['Short & Long-Term Storage', 'Transit Hubs', 'Inventory Visibility', 'Secure Handling'],
  'land-trucking': ['Port-to-Door Delivery', 'Unified Transit Chain', 'Direct Carrier Coordination', 'Regional Fleet Access'],
  'cargo-insurance': ['Upfront Terms Review', 'Booking-Time Protection', 'Transparent Coverage', 'Claims Guidance'],
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
  'warehousing': [
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

function ServiceCard({ service, index }) {
  const [showFullScope, setShowFullScope] = useState(false);
  const Icon = service.icon;
  const capabilities = SERVICE_CAPABILITIES[service.id] || [];
  const specs = SERVICE_SPECS[service.id] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <div
        className="service-card group relative h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden cursor-pointer"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 22, 36, 0.85) 0%, rgba(6, 8, 14, 0.95) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Dynamic ambient background glow flare on hover */}
        <div
          className="service-glow absolute -top-24 -right-24 w-56 h-56 rounded-full pointer-events-none opacity-0 scale-90 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(245, 148, 30, 0.4) 0%, rgba(26, 53, 128, 0.25) 70%, transparent 100%)' }}
        />

        {/* Subtle top border beam highlight */}
        <div
          className="absolute top-0 left-8 right-8 h-[1px] opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-amber-400 to-transparent transition-opacity duration-500"
        />

        <div>
          {/* Service Image Header */}
          {service.image && (
            <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-neutral-900 shadow-inner">
              <img
                src={service.image}
                alt={service.title}
                className="service-image w-full h-full object-cover object-center scale-100 brightness-95"
                loading="lazy"
              />
              {/* Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-black/30 to-black/40 pointer-events-none" />

              {/* Overlaid Icon Badge with hover tilt */}
              <div className="absolute top-3 left-3">
                <div
                  className="service-icon w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md shadow-xl border border-white/15"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND_BLUE}cc, ${BRAND_BLUE}66)`,
                    color: BRAND_ORANGE,
                  }}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </div>
              </div>

              {/* Number & Status Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-md border border-white/15 bg-black/60 backdrop-blur-md text-neutral-300 group-hover:text-amber-300 group-hover:border-amber-500/50 group-hover:bg-black/80 transition-all duration-300">
                  0{index + 1}
                </span>
              </div>

              {/* Hover Telemetry Overlay Pill on Image */}
              <div className="service-telemetry absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 opacity-0 translate-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                    Live Lane Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  Active Protocol
                </span>
              </div>
            </div>
          )}

          {/* Title */}
          <h3 className="service-title text-xl font-display font-semibold mb-3 text-white">
            {service.title}
          </h3>

          {/* Description (Verbatim approved text) */}
          <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-body">
            {service.description}
          </p>

          {/* ── ON-HOVER OPERATIONAL SPECS HUD ── */}
          <div className="mb-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="spec-pip w-2 h-2 rounded-full bg-neutral-600" />
                <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 font-semibold">
                  Operational Specs
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border text-neutral-500 border-white/5 bg-white/[0.02] group-hover:text-amber-400 group-hover:border-amber-500/40 group-hover:bg-amber-500/10 transition-all duration-300">
                Live Active
              </span>
            </div>

            {/* 2x2 High-Tech Specifications Tiles Matrix */}
            <div className="grid grid-cols-2 gap-2.5">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="spec-tile p-2.5 rounded-xl border border-white/5 bg-black/40 flex flex-col justify-center"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="spec-pip w-1 h-1 rounded-full bg-neutral-600" />
                    <span className="text-[9px] uppercase tracking-wider font-mono text-neutral-400 font-medium truncate">
                      {spec.label}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-semibold tracking-tight truncate text-neutral-300 group-hover:text-white transition-colors duration-300">
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
                className="w-full flex items-center justify-between py-1.5 px-2 text-[10px] font-mono uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors group/btn"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-amber-500 font-bold">{showFullScope ? '−' : '+'}</span>
                  <span>{showFullScope ? 'Hide Scope Verification' : 'Verified Scope Checklist'}</span>
                </span>
                <span className="text-[9px] text-neutral-600 group-hover/btn:text-neutral-400">
                  {capabilities.length} Points
                </span>
              </button>

              {/* Smooth Scope Expand */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  showFullScope ? 'max-h-52 opacity-100 mt-2' : 'max-h-0 opacity-0 group-hover:max-h-52 group-hover:opacity-100 group-hover:mt-2'
                }`}
              >
                <ul className="space-y-1.5 p-2 rounded-xl bg-black/40 border border-white/5">
                  {capabilities.map((cap, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-xs text-neutral-300 transition-transform duration-200 hover:translate-x-1"
                    >
                      <CheckCircle2 size={12} className="text-amber-400 shrink-0" />
                      <span className="text-[11px] font-body text-neutral-300">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer CTA */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
          <Link
            to={`/contact?service=${service.id}`}
            className="service-cta inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono text-amber-500 transition-all duration-300"
          >
            <span className="service-cta-text">Request Quote</span>
            <ArrowRight
              size={14}
              className="service-cta-arrow transition-transform duration-300"
            />
          </Link>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-emerald-400 group-hover:animate-pulse transition-colors" />
            Verified Lane
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid({ showFilter = true, limit = null, isPreview = false }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES.filter((service) => {
    if (activeCategory === 'all') return true;
    return SERVICE_CATEGORY_MAP[service.id] === activeCategory;
  }).slice(0, limit || SERVICES.length);

  return (
    <div className="w-full">
      {/* ── Optional Category Filter Tabs ── */}
      {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 font-body"
                style={{
                  color: isActive ? '#FFFFFF' : '#888888',
                  background: isActive ? `${BRAND_ORANGE}18` : 'rgba(255,255,255,0.03)',
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
