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

function ServiceCard({ service, index, isPreview }) {
  const Icon = service.icon;
  const capabilities = SERVICE_CAPABILITIES[service.id] || [];

  return (
    <motion.div
      /* NOTE: No `layout` prop here — it conflicts with CSS group-hover transitions */
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        borderColor: `${BRAND_ORANGE}40`,
        boxShadow: `0 0 35px ${BRAND_ORANGE}15, 0 10px 40px rgba(0,0,0,0.7)`,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(16, 20, 30, 0.75) 0%, rgba(8, 10, 15, 0.9) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
      }}
    >
      {/* Ambient background glow on hover */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: `${BRAND_ORANGE}25` }}
      />

      <div>
        {/* Service Image Header */}
        {service.image && (
          <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-neutral-900">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-black/20 to-black/40 pointer-events-none" />

            {/* Overlaid Icon Badge */}
            <div className="absolute top-3 left-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md shadow-lg transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_BLUE}90, ${BRAND_BLUE}40)`,
                  border: `1px solid ${BRAND_BLUE}`,
                  color: BRAND_ORANGE,
                }}
              >
                <Icon size={20} strokeWidth={2} />
              </div>
            </div>

            {/* Number Badge */}
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 px-2.5 py-1 rounded-md border border-white/15 bg-black/60 backdrop-blur-md">
                0{index + 1}
              </span>
            </div>
          </div>
        )}

        {/* Fallback: Icon Header if no image */}
        {!service.image && (
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${BRAND_BLUE}40, ${BRAND_BLUE}15)`,
                border: `1px solid ${BRAND_BLUE}60`,
                color: BRAND_ORANGE,
              }}
            >
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60">
              0{index + 1}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-display font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-amber-400">
          {service.title}
        </h3>

        {/* Description (Rendered verbatim from services.js) */}
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-body">
          {service.description}
        </p>

        {/* Capability Highlights */}
        {!isPreview && capabilities.length > 0 && (
          <div className="mb-6 pt-4 border-t border-white/5">
            <div className="text-[11px] uppercase tracking-wider font-mono text-neutral-500 mb-3">
              Operational Scope
            </div>
            <ul className="space-y-2">
              {capabilities.map((cap, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 size={13} className="text-amber-500 shrink-0" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
        <Link
          to={`/contact?service=${service.id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider font-mono transition-colors duration-300 text-amber-500 hover:text-white"
        >
          <span>Request Quote</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
        <span className="text-[11px] text-neutral-600 font-mono">Verified Lane</span>
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
