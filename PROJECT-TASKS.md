# Connect Continents Logistics (CCL) — Master Task & Audit Document

**Document Version:** 1.3  
**Current Date:** August 21, 2026  
**Local Dev Environment:** `http://localhost:5173/`  
**Core Stack:** React 19 (Vite), React Router v7 (`react-router-dom`), Tailwind CSS, Framer Motion, GSAP (ScrollTrigger), Lenis

---

## 1. Executive Summary & Website Audit

This document audits everything currently built and active on the website versus all items, pages, components, and assets that still need to be built or integrated.

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         MULTI-PAGE SITE STRUCTURE                        │
│                                                                          │
│                     ┌─── [ / ] (Home Page)                               │
│                     ├─── [ /services ] (Services Showcase)              │
│  [Layout / Nav] ────┼─── [ /about ] (Founding Story & Leadership)        ├─── [Footer]
│                     ├─── [ /portfolio ] (Trade Corridors Framework)      │
│                     └─── [ /contact ] (Fluid Quotation Matrix)           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. What Is Here (Built & Active)

### 🎨 Design System & Styling
- [x] **Brand Palette Active**:
  - Primary Brand Blue: `#1A3580` (headers, structure, logos, background glows)
  - Brand Orange: `#F5941E` (CTAs, route motifs, active highlights, glow borders)
  - Deep Obsidian Base: `#030303` (luxury dark cinematic background)
  - Zero `#00F0FF` cyan references remaining.
- [x] **Smooth Scrolling**: Lenis momentum scrolling initialized and synchronized with GSAP `ScrollTrigger.update` and `gsap.ticker`, with instant scroll restoration to top on route change.
- [x] **Typography**: Google Fonts loaded (`Archivo` Expanded 600–800 headings/display for logistics manifest aesthetic, `Inter` body, `IBM Plex Mono` badges/IDs/data).
- [x] **Glassmorphism & Micro-animations**: Glass cards (`glass-card`), noise texture overlay, smooth hover transitions, and `prefers-reduced-motion` compliance.
- [x] **Magnetic Hover Physics**: Applied across founder profiles, service cards ([`ServicesGrid.jsx`](file:///c:/Users/assau/OneDrive/Desktop/TESTMOCK%201/src/components/ServicesGrid.jsx)), and primary CTA buttons ([`MagneticButton.jsx`](file:///c:/Users/assau/OneDrive/Desktop/TESTMOCK%201/src/components/MagneticButton.jsx)).
- [x] **Clean Native Pointer**: Restored standard OS cursor for clarity and natural browser interaction (custom circle tracker removed per preference).
- [x] **Branded Splash Screen**: Seamless animated trade-lane initialization sequence on first visit ([`SplashScreen.jsx`](file:///c:/Users/assau/OneDrive/Desktop/TESTMOCK%201/src/components/SplashScreen.jsx)).

---

### 🔀 Multi-Page Architecture & Route Transitions (`react-router-dom` + Framer Motion)
- [x] **Routing Setup (`src/App.jsx`)**:
  - `/` ➔ `HomePage.jsx` (Hero, services preview, story preview, conversion band)
  - `/services` ➔ `ServicesPage.jsx` (Filterable 6-service grid, guarantee strip, deep-links)
  - `/about` ➔ `AboutPage.jsx` (Verbatim founding story, leadership cards, GSAP SVG line)
  - `/portfolio` ➔ `PortfolioPage.jsx` (Trade corridor manifest framework)
  - `/contact` ➔ `ContactPage.jsx` (Fluid 3-step quotation matrix with pre-selected service)
- [x] **Global Layout Wrapper (`src/components/Layout.jsx`)**: Persistent sticky navbar, outlet container, and footer.
- [x] **Page Transition Animations (`Layout.jsx`)**: Wrapped routes in `<AnimatePresence mode="wait">` for a smooth 280ms fade-and-slide elevation transition on page changes.
- [x] **Scroll Restoration (`src/components/ScrollToTop.jsx`)**: Automatically resets viewport scroll on page transitions.

---

### 🖼️ Brand Assets & Logo Integration
- [x] **Official Logo Extraction & Alpha Matte Processing**:
  - Source artwork (`media_1787139067426.jpg`) processed to remove white background into antialiased transparent PNGs.
  - `/public/ccl-mark.png`: High-resolution transparent globe & swoop mark.
  - `/public/ccl-logo-dark.png` & `/public/ccl-logo.png`: Dark-theme optimized lockup with brightened cobalt letters and clean white subtitle text.
  - `/public/ccl-logo-transparent.png`: Exact verbatim transparent cutout.
- [x] **Placements**:
  - **Navbar**: Ambient glass glow badge with `/ccl-mark.png`.
  - **Hero Section**: Glowing brand mark capsule above headline.
  - **Footer**: Brand badge with `/ccl-mark.png`.
  - **Favicon**: Added `<link rel="icon" type="image/png" href="/ccl-mark.png" />` in `index.html`.

---

### 🖥️ Pages & UI Components Currently Live

#### 1. Header & Navigation (`src/components/Navbar.jsx`)
- [x] Fixed glassmorphism navbar with blur backdrop.
- [x] Real CCL transparent logo mark in glowing glass badge.
- [x] Animated active page indicator pill via Framer Motion `layoutId`.
- [x] Mobile responsive hamburger drawer.
- [x] Quick "Get Quote" header CTA.

#### 2. Services Showcase (`src/components/ServicesGrid.jsx` & `src/pages/ServicesPage.jsx`)
- [x] **100% Verbatim Data**: Rendered directly from `src/data/services.js` (Ocean Freight, Air Freight, Customs Brokerage, Warehousing, Land/Trucking, Cargo Insurance).
- [x] **Category Filter Tabs**: *All Services*, *Freight Modes*, *Customs & Insurance*, *Land & Storage*.
- [x] **Deep-Linking**: "Request Quote" button pre-populates the contact form via `/contact?service=<id>`.
- [x] **Service Guarantee Strip**: Milestone visibility, zero hidden markups, single point of contact.

#### 3. Home Page & Route Connective Motif (`src/pages/HomePage.jsx`)
- [x] Verified Tagline: *"Connecting Continents, Delivering Trust"*.
- [x] Brand logo badge and pulsing status pill (*"Global Freight Forwarding"*).
- [x] **Signature Animated Route Canvas (`HeroRouteCanvas.jsx`)**: Dynamic animated SVG great-circle curves connecting continental hubs in hero background.
- [x] **Connective Route Spine (`ConnectiveRouteSpine.jsx`)**: Thin glowing vertical route thread running down through the page with scroll-following progress and waypoint indicators.
- [x] **Manifest Trust & Metrics Strip (`TrustMetricsStrip.jsx`)**: 4-pillar capability stats with **scroll-triggered animated counters** (6 Core Solutions, 4 Global Corridors, Tier-1 Direct Carrier Access, 100% Stage-Level Visibility).
- [x] Top 3 Services preview strip linking to `/services`.
- [x] About / Narrative timeline integration.
- [x] High-conversion pre-footer CTA band.

#### 4. About / Leadership Section (`src/pages/AboutPage.jsx` & `src/components/NarrativeTimeline.jsx`)
- [x] **Real Founding Narrative**: *"What We Saw"* (industry pain points) & *"What We Built"* (CCL promise).
- [x] **Real Founder Profiles & Expandable Overviews (Verbatim Copy)**:
  - **Abdul Rashid** — CEO & Founder (20+ years, Xpress Aviation Sea Export Manager, EMU MBA/BBA).
  - **Emir Khumair** — COO & Founder (Senior leadership operations, branch management, client standard focus).
- [x] **Interactive Features**: Single-card accordion expansion via click/tap with smooth GPU-accelerated CSS grid transitions, rotating chevron indicator, full keyboard navigation (`role="button"`, `aria-expanded`), and branded monogram badges (`AR` / `EK` — zero founder photos per policy).

#### 5. Interactive Fluid Contact Matrix (`src/components/FluidContactForm.jsx` & `src/pages/ContactPage.jsx`)
- [x] **3-Step Validated Flow**:
  - Step 1: Personal info (Name, Company, Email, Phone).
  - Step 2: Route & shipment details (Origin, Destination, Service, Cargo Type) with URL param pre-selection.
  - Step 3: Message & live summary submission preview.
- [x] **Micro-interactions**: Floating bounce labels, orange focus glow, real-time validation shake, 3D card-flip submission morph.
- [x] **Safety & Transparency**: `info@ccl.com` marked strictly as an unconfigured placeholder. Explicit blocker warnings for `process.env.CONTACT_EMAIL`.

#### 6. Trade Corridors Framework (`src/pages/PortfolioPage.jsx`)
- [x] 100% general capability & operational trade corridor cards (Asia-Gulf-Europe ocean, Express air, Inland drayage) with zero implied fake past shipments.
- [x] Custom route quotation inquiry callout.

---

## 3. What Is NOT Here (Missing & To-Be-Built / Blockers)

### 🎨 Frontend Polish Sprint (Remaining Groups)
- [ ] **Group 2 — Interaction Consistency**:
  - Magnetic hover extension to service cards & primary CTAs.
  - Custom desktop-only glowing cursor (disabled on touch/mobile).
  - Branded first-load splash/reveal state.
- [ ] **Group 3 — Finishing Details**:
  - Custom branded 404 page.
  - Custom scrollbar styling (thin brand blue track / orange thumb).
  - Visible brand-orange keyboard focus outlines & tab-through verification across all 5 pages.

### 🔌 Backend, Integrations & Functionality
- [ ] **Form Submission Backend (Resend API) [BLOCKER]**:
  - `info@ccl.com` flagged as unconfigured placeholder; awaiting live inbox and domain verification.
  - Endpoint will connect to `process.env.CONTACT_EMAIL`.
- [ ] **WhatsApp Click-to-Chat**:
  - Direct WhatsApp CTA button / floating support badge (awaiting phone number).
- [ ] **Physical Address / Office Contact**:
  - Add registered office location & operational hours to footer.

### 📦 Pending Client Assets & Data
- [ ] **Real Shipment Stories (Case Studies)**: 1–2 real shipment stories (Origin ➔ Destination, cargo, problem solved) once provided by client.
- [ ] **Founder Headshot Photos**: Official portrait files for Abdul Rashid and Arsalan Tabraiz.
- [ ] **Custom OpenGraph & Social Preview Images**: Previews for WhatsApp/LinkedIn sharing.

---

## 4. Priority Roadmap & Action Plan

| Phase / Sprint | Task | Status / Blocker |
|---|---|---|
| **Phase 1** | Build the **Services Showcase Component & Page** using verbatim data | ✅ Completed |
| **Phase 2** | Install `react-router-dom` & split into **Separate Routed Pages** | ✅ Completed |
| **Brand Asset** | Extract **Official Transparent Logo & Dark Theme Assets** into Navbar, Hero, Footer, Favicon | ✅ Completed |
| **Phase 3** | Enhance **Hero with Route-Line Animation & Trust Bar** | ✅ Completed |
| **Polish Group 0** | **Typography Swap**: `Archivo` Expanded headings + `Inter` body + `IBM Plex Mono` data | ✅ Completed |
| **Polish Group 1** | **Cohesion**: Route transitions (`AnimatePresence`), animated counters, vertical route spine | ✅ Completed |
| **Polish Group 2** | **Interaction Consistency**: Magnetic hovers, custom desktop cursor, branded splash | ✅ Completed |
| **Polish Group 3** | **Finishing Details**: Custom 404, custom scrollbar, brand keyboard focus states | ✅ Completed |
| **Polish Group 4** | **Depth & Atmosphere**: Parallax depth, varied section entries, odometer styling, interactive nav hover, validation checks, drifting grain | ✅ Completed |
| **Phase 4** | Build **Portfolio / Case Studies Page Details** | 🟡 Awaiting 1–2 shipment examples |
| **Phase 5** | Add **Team Headshot Photos** | 🟡 Awaiting image files |
| **Phase 6** | Connect **Resend Backend & WhatsApp Button** | 🔴 BLOCKED: Awaiting live email & WhatsApp number |

---

*This document is maintained as the single source of truth for the Connect Continents Logistics web development roadmap.*
