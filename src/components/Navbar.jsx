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
  const [hoveredNav, setHoveredNav] = useState(null);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <nav
        className="mx-auto px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(3, 3, 3, 0.88)' : 'rgba(3, 3, 3, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${isScrolled ? `${BRAND_ORANGE}15` : `${BRAND_ORANGE}0A`}`,
        }}
      >
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="h-10 px-2 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(26, 53, 128, 0.3), rgba(245, 148, 30, 0.05))',
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
            <span className="font-display font-semibold text-white text-sm tracking-wide group-hover:text-amber-400 transition-colors duration-300">
              Connect Continents
            </span>
            <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase -mt-0.5">
              Logistics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Active Pill + Hover Following Indicator */}
        <LayoutGroup>
        <div
          className="hidden md:flex items-center gap-1 bg-neutral-950/80 px-3 py-1.5 rounded-full border border-white/5 relative"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => setHoveredNav(item.path)}
              className={({ isActive }) =>
                `relative px-4 py-2 text-xs font-medium transition-colors duration-300 rounded-full ${
                  isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
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
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
        </LayoutGroup>

        {/* Quick CTA Action with Magnetic physics */}
        <div className="hidden md:flex items-center gap-3">
          <MagneticButton strength={0.25}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono transition-all duration-300 text-amber-500 hover:text-[#030303] hover:shadow-[0_0_25px_rgba(245,148,30,0.4)]"
              style={{
                background: `linear-gradient(135deg, ${BRAND_ORANGE}25, ${BRAND_ORANGE}10)`,
                border: `1.5px solid ${BRAND_ORANGE}50`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = BRAND_ORANGE;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `linear-gradient(135deg, ${BRAND_ORANGE}25, ${BRAND_ORANGE}10)`;
              }}
            >
              <span>Get Quote</span>
              <ArrowUpRight size={14} />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-neutral-400 hover:text-white border border-white/10"
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
            className="md:hidden border-b border-white/10 px-6 py-6 overflow-hidden"
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
                    `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white font-semibold bg-amber-500/10 border border-amber-500/30'
                        : 'text-neutral-400 hover:text-white bg-white/[0.02]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                className="mt-2 text-center py-3 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono text-black font-display"
                style={{ background: BRAND_ORANGE }}
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
