import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Ship, Plane, Truck, ArrowRight, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

const CORRIDORS = [
  {
    id: 'ocean-lane',
    icon: Ship,
    image: '/images/corridor-asia-mideast.jpg',
    mode: 'Ocean Freight Corridor',
    title: 'Asia ➔ Arabian Gulf & Europe',
    badge: 'Standard Trade Lane',
    description:
      'Full container (FCL) and consolidated (LCL) shipping lanes connecting East Asian manufacturing ports to Middle Eastern hubs and European gateways with scheduled departures and continuous milestone tracking.',
    capabilities: ['FCL / LCL Scheduled Service', 'Pre-Clearance Documentation', 'Port-to-Port & Port-to-Door'],
  },
  {
    id: 'air-lane',
    icon: Plane,
    image: '/images/corridor-transpacific.jpg',
    mode: 'Express Air Cargo',
    title: 'Global Air Cargo Routing',
    badge: 'Priority Trade Lane',
    description:
      'Expedited international air freight routing across major airline cargo networks for urgent shipments, with multi-carrier rate comparison and pre-screened customs documentation.',
    capabilities: ['Direct Carrier Bookings', 'Time-Sensitive Dispatch', 'Zero Opaque Markups'],
  },
  {
    id: 'inland-lane',
    icon: Truck,
    image: '/images/corridor-transatlantic.jpg',
    mode: 'Inland Transport',
    title: 'Port-to-Door Drayage & Trucking',
    badge: 'Regional Transit',
    description:
      'Integrated inland transport connecting marine terminals and air hubs directly to warehousing facilities and final receiver addresses as part of one unified shipment chain.',
    capabilities: ['Unified Bill of Lading', 'Direct Dispatch Control', 'Last-Mile Delivery'],
  },
];

export default function PortfolioPage() {
  return (
    <div className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* ── Page Header ── */}
      <div className="text-center max-w-3xl mx-auto mb-16">
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
            Operational Scope & Routes
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
        >
          Trade Corridors & <span className="text-gradient-brand">Capabilities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400 text-base md:text-lg leading-relaxed font-body"
        >
          An overview of the global trade lanes and multimodal freight networks served by Connect Continents Logistics.
        </motion.p>
      </div>

      {/* ── General Lane Capabilities Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {CORRIDORS.map((corridor, index) => {
          const Icon = corridor.icon;
          return (
            <motion.div
              key={corridor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-3xl p-6 sm:p-7 border border-white/5 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-amber-500/30 shadow-xl"
              style={{
                background: 'linear-gradient(180deg, rgba(16, 20, 30, 0.7) 0%, rgba(8, 10, 15, 0.85) 100%)',
              }}
            >
              <div>
                {/* Corridor Image Header */}
                {corridor.image && (
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-6 border border-white/10 bg-neutral-900">
                    <img
                      src={corridor.image}
                      alt={corridor.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-black/20 to-black/40" />

                    {/* Overlaid Badges */}
                    <div className="absolute top-3 left-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND_BLUE}90, ${BRAND_BLUE}40)`,
                          border: `1px solid ${BRAND_BLUE}`,
                          color: BRAND_ORANGE,
                        }}
                      >
                        <Icon size={20} strokeWidth={2} />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 px-2.5 py-1 rounded-md border border-white/15 bg-black/60 backdrop-blur-md">
                        {corridor.badge}
                      </span>
                    </div>
                  </div>
                )}

                {!corridor.image && (
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${BRAND_BLUE}40`,
                        border: `1px solid ${BRAND_BLUE}60`,
                        color: BRAND_ORANGE,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                      {corridor.badge}
                    </span>
                  </div>
                )}

                <span className="text-xs font-mono uppercase tracking-widest text-amber-500 block mb-1">
                  {corridor.mode}
                </span>

                <h3 className="text-lg font-display font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {corridor.title}
                </h3>

                <p className="text-neutral-400 text-xs leading-relaxed font-body mb-6">
                  {corridor.description}
                </p>

                <div className="pt-4 border-t border-white/5 space-y-2 mb-6">
                  {corridor.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 size={13} className="text-amber-500 shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-amber-500 hover:text-white transition-colors"
                >
                  <span>Inquire on Route</span>
                  <ArrowRight size={13} />
                </Link>
                <span className="text-[10px] font-mono text-neutral-600">Active Routing</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Custom Route Inquiry Notice with Panoramic Backdrop ── */}
      <div
        className="relative rounded-3xl p-8 md:p-10 border border-white/10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.25) 0%, rgba(3, 3, 3, 0.95) 100%)',
        }}
      >
        {/* Ambient Panoramic Freight Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            src="/images/cta-panoramic-freight.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: `${BRAND_ORANGE}15`,
              border: `1px solid ${BRAND_ORANGE}30`,
              color: BRAND_ORANGE,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="text-white text-base font-display font-semibold mb-1">
              Need Routing on a Different Trade Lane?
            </h4>
            <p className="text-neutral-400 text-xs md:text-sm font-body max-w-xl">
              We coordinate origin-to-destination routes worldwide. Submit your shipment origin and destination to receive carrier schedule options and an upfront quotation.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="relative z-10 shrink-0 px-7 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono text-black font-display shadow-lg hover:scale-105 transition-transform"
          style={{ background: BRAND_ORANGE }}
        >
          Request Custom Route
        </Link>
      </div>
    </div>
  );
}
