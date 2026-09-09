import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import MagneticButton from './MagneticButton';

const BRAND_BLUE = '#1A3580';
const BRAND_ORANGE = '#F5941E';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(
    /** @type {string | null} */ (null)
  );
  const location = useLocation();

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (scrolled !== prevScrolled) {
        prevScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Smart seamless Get Quote navigation: smooth scrolls if already on /contact
  const handleGetQuoteClick = (e) => {
    setMobileMenuOpen(false);
    if (location.pathname === '/contact') {
      e.preventDefault();
      const formEl = document.getElementById('contact-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 350, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <nav
        className="mx-auto flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12"
        style={{
          background: isScrolled
            ? 'rgba(3, 3, 3, 0.88)'
            : 'rgba(3, 3, 3, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${isScrolled ? `${BRAND_ORANGE}15` : `${BRAND_ORANGE}0A`}`,
        }}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="group flex items-center gap-3">
          <div
            className="flex h-10 items-center justify-center rounded-xl px-2 transition-all duration-300 group-hover:scale-105"
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
              className="h-7 w-auto object-contain drop-shadow-[0_0_12px_rgba(245,148,30,0.3)]"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-amber-400">
              Connect Continents
            </span>
            <span className="-mt-0.5 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
              Logistics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Active Pill + Hover Following Indicator */}
        <LayoutGroup>
          <div
            className="relative hidden items-center gap-1 rounded-full border border-white/5 bg-neutral-950/80 px-3 py-1.5 md:flex"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredNav(item.path)}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                    isActive
                      ? 'font-semibold text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{item.label}</span>

                    {/* Active Page Capsule */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-indicator"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(135deg, ${BRAND_ORANGE}25, ${BRAND_BLUE}30)`,
                          border: `1px solid ${BRAND_ORANGE}40`,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Cursor-following hover glow underline */}
                    {hoveredNav === item.path && !isActive && (
                      <motion.div
                        layoutId="navbar-hover-underline"
                        className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${BRAND_ORANGE}, transparent)`,
                          boxShadow: `0 0 8px ${BRAND_ORANGE}`,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 450,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </LayoutGroup>

        {/* Quick CTA Action with Magnetic physics & Outperforming Kinetic Glow */}
        <div className="hidden items-center gap-3 md:flex">
          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              onClick={handleGetQuoteClick}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber-500 transition-all duration-300 hover:text-black hover:shadow-[0_0_30px_rgba(245,148,30,0.55)] active:scale-95"
              style={{
                background: `linear-gradient(135deg, ${BRAND_ORANGE}22, ${BRAND_ORANGE}0c)`,
                border: `1.5px solid ${BRAND_ORANGE}55`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BRAND_ORANGE;
                e.currentTarget.style.borderColor = BRAND_ORANGE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${BRAND_ORANGE}22, ${BRAND_ORANGE}0c)`;
                e.currentTarget.style.borderColor = `${BRAND_ORANGE}55`;
              }}
            >
              {/* Luminous light-sweep sheen on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              {/* Real-time active operations desk indicator dot */}
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-black transition-colors duration-200" />
              </span>

              <span className="relative z-10 transition-colors duration-200">
                Get Quote
              </span>

              {/* Kinetic Forward Arrow */}
              <ArrowUpRight
                size={14}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl border border-white/10 p-2 text-neutral-400 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-white/10 px-6 py-6 md:hidden"
            style={{
              background: 'rgba(3, 3, 3, 0.96)',
              backdropFilter: 'blur(30px)',
            }}
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'border border-amber-500/30 bg-amber-500/10 font-semibold text-white'
                        : 'bg-white/[0.02] text-neutral-400 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={handleGetQuoteClick}
                className="group relative mt-2 flex items-center justify-center gap-2.5 overflow-hidden rounded-xl py-3.5 text-center font-display font-mono text-xs font-semibold uppercase tracking-wider text-black shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,148,30,0.5)] active:scale-95"
                style={{ background: BRAND_ORANGE }}
              >
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black" />
                </span>
                <span>Request a Quote</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
