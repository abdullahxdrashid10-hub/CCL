/*
 * ═══════════════════════════════════════════════════════════════
 * NarrativeTimeline.jsx — About / Our Story Section
 * ═══════════════════════════════════════════════════════════════
 *
 * STATUS: Content placeholder — awaiting real founding story,
 * team details, and brand colors from client.
 *
 * ARCHITECTURE:
 * - SVG scroll-drawn line traced via GSAP ScrollTrigger
 * - Framer Motion entrance reveals for story blocks
 * - Magnetic mouse-tracking interaction on team cards
 * - All content blocks are clearly marked as placeholders
 *
 * TODO:
 * - [x] Replace placeholder story text with real founding narrative
 * - [x] Replace placeholder team members with real team data
 * - [ ] Add real stats once available
 * ═══════════════════════════════════════════════════════════════
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Users, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   BRAND COLORS — Extracted from the CCL logo.
   Primary:  Deep Royal Blue  #1A3580
   Accent:   Orange           #F5941E
   ═══════════════════════════════════════════════════════════════ */

const ACCENT_COLOR = '#F5941E';
const BRAND_BLUE = '#1A3580';
const BG_COLOR = '#030303';

/* ═══════════════════════════════════════════════════════════════
   STORY DATA — Authentic founding story + Leadership details
   ═══════════════════════════════════════════════════════════════ */

const STORY_BLOCKS = [
  {
    id: 'problem',
    title: 'What We Saw',
    description:
      'Before Connect Continents Logistics existed, we were on the other side of the industry — inside it, watching how it actually operates day to day. What we saw wasn’t one bad habit. It was the whole pattern: shipments that went quiet for days with no update, timelines that slipped without warning, pricing that only became clear after the invoice landed, and customs paperwork handled as an afterthought instead of a discipline. None of that is inevitable. It’s just what happens when a forwarder treats a shipment as a transaction instead of a responsibility.',
    icon: Compass,
    isPlaceholder: false,
  },
  {
    id: 'solution',
    title: 'What We Built',
    description:
      'Connect Continents Logistics was built by two people who’d rather run it properly than run it the way it’s always been run — clear communication from booking to delivery, timelines you can actually plan around, pricing you see upfront, and documentation handled with the seriousness it deserves. We’re a new company. What we’re not new to is the industry — or the list of things worth fixing in it.',
    icon: Compass,
    isPlaceholder: false,
  },
  {
    id: 'team',
    title: 'The Team',
    description:
      'Connect Continents Logistics is led by two co-founders who bring hands-on expertise in global freight operations, customs compliance, and supply chain management.',
    icon: Users,
    isTeamNode: true,
    isPlaceholder: false,
    team: [
      {
        name: 'Abdul Rashid',
        role: 'CEO & Founder',
        initials: 'AR',
        overview:
          "Over 20 years in freight forwarding and logistics, most recently as a Branch Manager overseeing import/export operations, customs compliance, P&L, and vendor relationships. Spent 16 years at Xpress Aviation, rising from Customer Services Assistant to Sea Export Manager, managing LCL, FCL, and consolidated cargo across sea and air freight. Holds an MBA (Marketing) and a BBA from Eastern Mediterranean University. Brings two decades of hands-on operational and client-relationship experience to CCL's leadership.",
      },
      {
        name: 'Emir Khumair',
        role: 'COO & Founder',
        initials: 'EK',
        overview:
          'Brings hands-on senior leadership experience in freight and logistics operations, with a background managing day-to-day operations at the branch and management level. Co-founded CCL to bring the standards of communication, transparency, and reliability the industry too often lacks to clients directly.',
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC MOUSE HOOK
   Applies a subtle magnetic pull toward the cursor for an element.
   Uses hardware-accelerated transforms via GSAP.
   ═══════════════════════════════════════════════════════════════ */

function useMagneticMouse(strength = 0.3) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true,
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      force3D: true,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}

/* ═══════════════════════════════════════════════════════════════
   SVG SCROLL-DRAWN LINE
   GSAP ScrollTrigger scrubs strokeDashoffset to trace the path.
   ═══════════════════════════════════════════════════════════════ */

function ScrollDrawnLine({ containerRef }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef]);

  return (
    <svg
      className="absolute left-1/2 top-0 h-full -translate-x-1/2 pointer-events-none"
      style={{ width: '120px' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {/* Background static faint track */}
      <path
        d="M 50 0 C 30 25, 70 35, 50 50 C 30 65, 70 75, 50 100"
        stroke="rgba(245, 148, 30, 0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Dynamic scroll active path */}
      <path
        d="M 50 0 C 30 25, 70 35, 50 50 C 30 65, 70 75, 50 100"
        stroke={ACCENT_COLOR}
        strokeWidth="1.5"
        strokeLinecap="round"
        ref={pathRef}
        style={{
          filter: 'drop-shadow(0 0 4px rgba(245, 148, 30, 0.6))',
          willChange: 'stroke-dashoffset',
        }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TEAM MEMBER CARD — With magnetic mouse tracking & expandable bio
   ═══════════════════════════════════════════════════════════════ */

function TeamMemberCard({ member, index, isExpanded, onToggle }) {
  return (
    <div
      className="relative group cursor-pointer w-full text-left"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`Toggle overview for ${member.name}`}
    >
      <div
        className="relative flex flex-col p-6 rounded-2xl transition-all duration-200 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(16, 20, 30, 0.85) 0%, rgba(8, 10, 15, 0.95) 100%)',
          border: `1px solid ${isExpanded ? `${ACCENT_COLOR}60` : 'rgba(255, 255, 255, 0.08)'}`,
          boxShadow: isExpanded
            ? `0 0 30px ${ACCENT_COLOR}18, 0 10px 30px rgba(0,0,0,0.7)`
            : '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        {/* Card Header: Avatar + Identity + Chevron Toggle */}
        <div className="flex items-center gap-4 w-full">
          {/* Avatar */}
          <div
            className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300"
            style={{
              background: member.image
                ? 'transparent'
                : `linear-gradient(135deg, ${ACCENT_COLOR}20, ${BRAND_BLUE}30)`,
              border: `1.5px solid ${isExpanded ? ACCENT_COLOR : `${ACCENT_COLOR}40`}`,
              color: ACCENT_COLOR,
            }}
          >
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display font-bold text-base">{member.initials}</span>
            )}
          </div>

          <div className="flex-grow min-w-0">
            <h4 className="text-white font-display font-semibold text-base tracking-wide group-hover:text-amber-400 transition-colors duration-200">
              {member.name}
            </h4>
            <p
              className="text-[11px] uppercase tracking-[0.15em] mt-0.5 font-medium font-mono"
              style={{ color: ACCENT_COLOR }}
            >
              {member.role}
            </p>
          </div>

          {/* Morphing / Rotating Chevron Indicator */}
          <div
            className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300"
            style={{
              borderColor: isExpanded ? `${ACCENT_COLOR}60` : 'rgba(255, 255, 255, 0.1)',
              background: isExpanded ? `${ACCENT_COLOR}18` : 'rgba(255, 255, 255, 0.03)',
              color: isExpanded ? ACCENT_COLOR : '#888',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronDown size={15} />
          </div>
        </div>

        {/* Ultra-smooth GPU-accelerated CSS Grid Expandable Overview */}
        <div
          className="grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            gridTemplateRows: isExpanded ? '1fr' : '0fr',
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className="overflow-hidden">
            <div className="pt-4 mt-4 border-t border-white/10 text-neutral-300 text-xs leading-relaxed font-body">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500/80 block mb-1.5">
                Leadership Profile
              </span>
              <p>{member.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STORY BLOCK — Content block with entrance reveal
   ═══════════════════════════════════════════════════════════════ */

function StoryBlock({ block, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });
  const isEven = index % 2 === 0;
  const Icon = block.icon;
  const [expandedMember, setExpandedMember] = useState(null);

  const handleToggle = (name) => {
    setExpandedMember((prev) => (prev === name ? null : name));
  };

  return (
    <div ref={ref} className="relative py-16 md:py-24">
      <motion.div
        className={`max-w-2xl ${isEven ? 'mr-auto' : 'ml-auto'} px-6 md:px-0`}
        initial={{
          opacity: 0,
          x: isEven ? -60 : 60,
          filter: 'blur(8px)',
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, filter: 'blur(0px)' }
            : { opacity: 0, x: isEven ? -60 : 60, filter: 'blur(8px)' }
        }
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Icon + label */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_COLOR}18, transparent)`,
              border: `1px solid ${ACCENT_COLOR}25`,
            }}
          >
            <Icon size={18} color={ACCENT_COLOR} strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 leading-tight">
          {block.title}
        </h3>

        {/* Description — clearly marked if placeholder */}
        <p
          className={`leading-relaxed text-[15px] mb-6 ${
            block.isPlaceholder
              ? 'text-neutral-600 italic border-l-2 border-dashed pl-4'
              : 'text-neutral-400'
          }`}
          style={
            block.isPlaceholder
              ? { borderColor: `${ACCENT_COLOR}30` }
              : {}
          }
        >
          {block.description}
        </p>

        {/* Team grid — interactive expandable cards */}
        {block.isTeamNode && block.team && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-start">
            {block.team.map((member, i) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                index={i}
                isExpanded={expandedMember === member.name}
                onToggle={() => handleToggle(member.name)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════ */

function SectionHeader() {
  return (
    <motion.div
      className="text-center mb-16 md:mb-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
        style={{
          background: `${ACCENT_COLOR}08`,
          border: `1px solid ${ACCENT_COLOR}15`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT_COLOR }}
        />
        <span
          className="text-[11px] uppercase tracking-[0.2em] font-mono font-medium"
          style={{ color: ACCENT_COLOR }}
        >
          About Us
        </span>
      </motion.div>

      <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-[1.1]">
        Our Story
      </h2>

      <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
        {/* PLACEHOLDER: Replace with real company description once provided. */}
        The people and purpose behind Connect Continents Logistics.
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DECORATIVE GRID BACKGROUND
   ═══════════════════════════════════════════════════════════════ */

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${ACCENT_COLOR}04, transparent 70%)`,
        }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="about-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke={ACCENT_COLOR} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-grid)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — NarrativeTimeline (About Section)
   ═══════════════════════════════════════════════════════════════ */

export default function NarrativeTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger to account for dynamic DOM layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 200);
    return () => {
      clearTimeout(timer);
      // Kill any ScrollTrigger instances created within this section
      ScrollTrigger.getAll()
        .filter((st) => st.trigger && containerRef.current?.contains(st.trigger))
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: BG_COLOR }}
    >
      <GridBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader />

        <div className="relative">
          <ScrollDrawnLine containerRef={containerRef} />

          {STORY_BLOCKS.map((block, index) => (
            <StoryBlock key={block.id} block={block} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, ${BG_COLOR})`,
        }}
      />
    </section>
  );
}
