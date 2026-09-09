import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden px-6 pb-12 pt-20 md:px-12"
      style={{
        background: '#020202',
        borderTop: `1px solid ${BRAND_ORANGE}15`,
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-32 w-3/4 -translate-x-1/2 opacity-20 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at top, ${BRAND_BLUE}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 border-b border-white/5 pb-16 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="flex h-11 items-center justify-center rounded-xl px-2.5"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(26, 53, 128, 0.3), rgba(245, 148, 30, 0.05))',
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
                <span className="font-display text-base font-semibold tracking-wide text-white">
                  Connect Continents
                </span>
                <span className="-mt-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  Logistics
                </span>
              </div>
            </div>

            <p className="mb-6 max-w-sm font-body text-sm leading-relaxed text-neutral-400">
              Connecting Continents, Delivering Trust. End-to-end ocean, air,
              customs, and inland freight forwarder engineered for speed and
              total transparency.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-neutral-400">
              <ShieldCheck size={13} className="text-amber-500" />
              <span>Registered Global Freight Forwarder</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
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
                    className="text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Freight Modes */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
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
                    className="group flex items-center justify-between text-neutral-400 transition-colors duration-200 hover:text-amber-400"
                  >
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Operational Readiness */}
          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Inquiries
            </h4>
            <p className="mb-4 text-xs leading-relaxed text-neutral-400">
              Direct all quotation inquiries and booking requests to our
              operations desk.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs font-semibold text-white transition-all duration-300 hover:border-amber-500/30 hover:bg-amber-500/10"
            >
              <span>Dispatch Desk</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-body text-xs text-neutral-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Connect Continents Logistics. All
            rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-600">
              Confidentiality & Compliance Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
