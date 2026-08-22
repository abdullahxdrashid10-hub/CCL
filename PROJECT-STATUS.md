# CCL Website — Project Status & Progress Tracker

**Last updated:** 21 Aug 2026  
**Dev server:** http://localhost:5173/  
**Detailed Task Breakdown:** [PROJECT-TASKS.md](file:///C:/Users/assau/OneDrive/Desktop/TESTMOCK%201/PROJECT-TASKS.md)

---

## 1. What's Live & Working Right Now

| Component / Feature | Details | Status |
|---|---|---|
| **Tech Stack & Routing** | React 19 + Vite, `react-router-dom` (`/`, `/services`, `/about`, `/portfolio`, `/contact`) | ✅ Live |
| **Smooth Scroll** | Lenis smooth scroll + GSAP ScrollTrigger sync + route change scroll restoration | ✅ Live |
| **Brand Colors** | Deep Royal Blue (`#1A3580`), Orange (`#F5941E`), Obsidian (`#030303`) | ✅ Live |
| **Navigation & Layout** | Shared glassmorphism Navbar with active indicators + mobile drawer + Footer | ✅ Live |
| **Services Showcase** | Full 6-service grid in `src/components/ServicesGrid.jsx` rendering verbatim data from `src/data/services.js` with mode tabs & quote deep-links | ✅ Live |
| **Hero Section** | Confirmed headline *"Connecting Continents, Delivering Trust"*, CTAs, status indicator | ✅ Live |
| **About: Founding Narrative** | Real client story: *"What We Saw"* & *"What We Built"* (No fake history) | ✅ Live |
| **About: Founder Profiles** | Abdul Rashid (CEO & Founder) & Arsalan Tabraiz (COO & Founder) with click/tap expandable verbatim overviews, rotating chevron, & photo fallback | ✅ Live |
| **About: Scroll Line** | Dynamic SVG scroll-drawing path via GSAP ScrollTrigger | ✅ Live |
| **Fluid Contact Form** | 3-step animated form, micro-bounce labels, validation shake, deep-link service pre-selection | ✅ Live (Simulated) |
| **Portfolio Page** | Active trade corridor manifest framework (flagged awaiting real case study data) | ✅ Live |

---

## 2. What's NOT Here Yet (To-Be-Built / Blockers)

| Area | Missing Item | Description | Next Action |
|---|---|---|---|
| **Backend [BLOCKER]** | **Live Form Delivery** | `CONTACT_EMAIL` unset by default; `info@ccl.com` flagged as placeholder until real inbox/domain provided | Awaiting live inbox confirmation |
| **UI Components** | **Hero Animated Route Motif** | Dynamic SVG great-circle route-line animation with pulsing hub nodes across continents | ✅ Live |
| **UI Components** | **Trust Bar / Manifest Metrics** | Honest 4-pillar capability manifest (Modes, Corridors, Direct Carriers, Stage Visibility) | ✅ Live |
| **UI Components** | **Portfolio Corridors** | 100% general capability & trade lane scope (Asia-Gulf ocean, Express air, Inland drayage) | ✅ Live |
| **UI Components** | **Case Studies Details** | Real shipment stories from client (Origin ➔ Destination, cargo, problem solved) | Awaiting client examples |
| **Assets** | **Logo Integration** | Transparent high-res CCL logo mark (`/ccl-mark.png` & `/ccl-logo.png`) integrated into Navbar, Hero, Footer, and Favicon | ✅ Live |
| **Assets** | **Headshots** | Founder headshots for Abdul Rashid & Arsalan Tabraiz | Awaiting photo files |
| **Backend** | **WhatsApp Click-to-Chat** | Direct link to WhatsApp chat with pre-filled message | Awaiting phone number |
| **Footer** | **Physical Address** | Official registered office location & registration ID | Awaiting address details |

---

## 3. Completed Roadmap Items

1. ✅ **Phase 1: Build the Services Showcase Component & Page** (using verbatim data from `services.js`).
2. ✅ **Phase 2: Install `react-router-dom` & split into Separate Routed Pages** (`/`, `/services`, `/about`, `/portfolio`, `/contact`).
3. ✅ **Phase 3: Hero Route-Line Animation & Manifest Trust Metrics Strip**.
4. ✅ **Polish Group 1 (Cohesion)**: Route transitions (`AnimatePresence`), scroll-triggered animated stat counters, site-wide connective route spine.
5. ✅ **Polish Group 0 (Typography)**: `Archivo` Expanded + `Inter` + `IBM Plex Mono`.
6. ✅ **Polish Group 2 (Interaction Consistency)**: Magnetic hovers on service cards & CTAs, clean native OS pointer, branded first-load splash screen.
7. ✅ **Polish Group 3 (Finishing Details)**: Custom 404 page (`NotFoundPage.jsx`), custom brand-blue/orange scrollbar, universal brand-orange focus rings.
8. ✅ **Polish Group 4 (Depth & Atmosphere)**: Hero parallax scroll depth, mechanical odometer manifest numbers, animated nav-item hover underline, form validation checkmarks, drifting noise overlay.
