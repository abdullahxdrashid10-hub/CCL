import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Ship,
  Plane,
  Truck,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

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
    capabilities: [
      'FCL / LCL Scheduled Service',
      'Pre-Clearance Documentation',
      'Port-to-Port & Port-to-Door',
    ],
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
    capabilities: [
      'Direct Carrier Bookings',
      'Time-Sensitive Dispatch',
      'Zero Opaque Markups',
    ],
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
    capabilities: [
      'Unified Bill of Lading',
      'Direct Dispatch Control',
      'Last-Mile Delivery',
    ],
  },
];

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
      {/* ── Page Header ── */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
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
            Operational Scope & Routes
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Trade Corridors &{' '}
          <span className="text-gradient-brand">Capabilities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          An overview of the global trade lanes and multimodal freight networks
          served by Connect Continents Logistics.
        </motion.p>
      </div>

      {/* ── General Lane Capabilities Grid ── */}
      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {CORRIDORS.map((corridor, index) => {
          const Icon = corridor.icon;
          return (
            <motion.div
              key={corridor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-6 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.015] hover:border-amber-500/50 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.85),0_0_25px_rgba(245,148,30,0.22)] sm:p-7"
              style={{
                background:
                  'linear-gradient(180deg, #101625 0%, #070a12 100%)',
              }}
            >
              <div>
                {/* Corridor Image Header */}
                {corridor.image && (
                  <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 sm:h-48">
                    <img
                      src={corridor.image}
                      alt={corridor.title}
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-black/20 to-black/40" />

                    {/* Overlaid Badges */}
                    <div className="absolute left-3 top-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND_BLUE}90, ${BRAND_BLUE}40)`,
                          border: `1px solid ${BRAND_BLUE}`,
                          color: BRAND_ORANGE,
                        }}
                      >
                        <Icon size={20} strokeWidth={2} />
                      </div>
                    </div>

                    <div className="absolute right-3 top-3">
                      <span className="rounded-md border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-neutral-300 backdrop-blur-md">
                        {corridor.badge}
                      </span>
                    </div>
                  </div>
                )}

                {!corridor.image && (
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `${BRAND_BLUE}40`,
                        border: `1px solid ${BRAND_BLUE}60`,
                        color: BRAND_ORANGE,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span className="rounded-full border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-neutral-400">
                      {corridor.badge}
                    </span>
                  </div>
                )}

                <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-amber-500">
                  {corridor.mode}
                </span>

                <h3 className="mb-3 font-display text-lg font-semibold text-white transition-colors group-hover:text-amber-400">
                  {corridor.title}
                </h3>

                <p className="mb-6 font-body text-xs leading-relaxed text-neutral-400">
                  {corridor.description}
                </p>

                <div className="mb-6 space-y-2 border-t border-white/5 pt-4">
                  {corridor.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-neutral-300"
                    >
                      <CheckCircle2
                        size={13}
                        className="shrink-0 text-amber-500"
                      />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase text-amber-500 transition-colors hover:text-white"
                >
                  <span>Inquire on Route</span>
                  <ArrowRight size={13} />
                </Link>
                <span className="font-mono text-[10px] text-neutral-600">
                  Active Routing
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Custom Route Inquiry Notice with Panoramic Backdrop ── */}
      <div
        className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl md:flex-row md:p-10"
        style={{
          background:
            'linear-gradient(135deg, rgba(26, 53, 128, 0.25) 0%, rgba(3, 3, 3, 0.95) 100%)',
        }}
      >
        {/* Ambient Panoramic Freight Background */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <img
            src="/images/cta-panoramic-freight.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        </div>

        <div className="relative z-10 flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `${BRAND_ORANGE}15`,
              border: `1px solid ${BRAND_ORANGE}30`,
              color: BRAND_ORANGE,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="mb-1 font-display text-base font-semibold text-white">
              Need Routing on a Different Trade Lane?
            </h4>
            <p className="max-w-xl font-body text-xs text-neutral-400 md:text-sm">
              We coordinate origin-to-destination routes worldwide. Submit your
              shipment origin and destination to receive carrier schedule
              options and an upfront quotation.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="relative z-10 shrink-0 rounded-xl px-7 py-3.5 font-display font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-transform hover:scale-105"
          style={{ background: BRAND_ORANGE }}
        >
          Request Custom Route
        </Link>
      </div>
    </div>
  );
}
