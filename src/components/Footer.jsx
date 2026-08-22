import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-12 px-6 md:px-12 overflow-hidden"
      style={{
        background: '#020202',
        borderTop: `1px solid ${BRAND_ORANGE}15`,
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none blur-3xl opacity-20"
        style={{
          background: `radial-gradient(ellipse at top, ${BRAND_BLUE}, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-white/5">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-11 px-2.5 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.3), rgba(245, 148, 30, 0.05))',
                  border: '1px solid rgba(245, 148, 30, 0.2)',
                  boxShadow: '0 0 20px rgba(26, 53, 128, 0.25)',
                }}
              >
                <img
                  src="/ccl-mark.png"
                  alt="Connect Continents Logistics Logo"
                  className="h-8 w-auto object-contain drop-shadow-[0_0_12px_rgba(245,148,30,0.3)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-white text-base tracking-wide">
                  Connect Continents
                </span>
                <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase -mt-0.5">
                  Logistics
                </span>
              </div>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm mb-6 font-body">
              Connecting Continents, Delivering Trust. End-to-end ocean, air, customs,
              and inland freight forwarder engineered for speed and total transparency.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-mono text-neutral-400">
              <ShieldCheck size={13} className="text-amber-500" />
              <span>Registered Global Freight Forwarder</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/services' },
                { name: 'Our Story & Team', path: '/about' },
                { name: 'Portfolio & Shipments', path: '/portfolio' },
                { name: 'Request a Quote', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Freight Modes */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-semibold mb-4">
              Core Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Ocean Freight (FCL / LCL)', id: 'ocean-freight' },
                { name: 'Air Freight Cargo', id: 'air-freight' },
                { name: 'Customs & Compliance', id: 'customs-brokerage' },
                { name: 'Warehousing & Storage', id: 'warehousing' },
                { name: 'Land Transport', id: 'land-trucking' },
                { name: 'Cargo Insurance', id: 'cargo-insurance' },
              ].map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/services`}
                    className="text-neutral-400 hover:text-amber-400 transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Operational Readiness */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-semibold mb-4">
              Inquiries
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed mb-4">
              Direct all quotation inquiries and booking requests to our operations desk.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 transition-all duration-300 font-mono"
            >
              <span>Dispatch Desk</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-body">
          <p>© {new Date().getFullYear()} Connect Continents Logistics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-600">Confidentiality & Compliance Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
