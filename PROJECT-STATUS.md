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
| **Services Showcase** | Full 6-service grid in `src/components/ServicesGrid.jsx` with high-contrast cinematic photography, hover zoom, mode tabs & quote deep-links | ✅ Live |
| **Hero Section** | Headline *"Connecting Continents with Precision Freight"*, interactive route canvas + subtle aerial mega-hub background | ✅ Live |
| **About: Founding Narrative** | Real client story: *"What We Saw"* & *"What We Built"* (No fake history) | ✅ Live |
| **About: Founder Profiles** | Abdul Rashid (CEO & Founder) & Emir Khumair (COO & Founder) with click/tap expandable verbatim overviews, rotating chevron, & monogram badges (Strictly zero founder photos) | ✅ Live |
| **About: Scroll Line** | Dynamic SVG scroll-drawing path via GSAP ScrollTrigger | ✅ Live |
| **Fluid Contact Form** | 3-step animated form, micro-bounce labels, validation checkmarks, 100% client-side static workflow | ✅ Live |
| **Portfolio Page** | Active trade corridor manifest framework (flagged awaiting real case study data) | ✅ Live |

---

## 2. Architecture & Content Notes

| Area | Feature | Description | Status |
|---|---|---|---|
| **Architecture** | **Zero Backend** | 100% Client-side static Jamstack site. No server, database, or external backend required. | ✅ Locked |
| **Assets** | **Service Visuals** | 6 custom high-contrast logistics photography assets in `/images/` mapped to services. | ✅ Live |
| **Assets** | **Hero Atmosphere** | Subtle aerial mega-hub night backdrop integrated behind dynamic canvas. | ✅ Live |
| **Assets** | **Leadership Photos** | Strictly zero personal photos used — sleek monogram shields (`AR` & `EK`). | ✅ Locked |

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
