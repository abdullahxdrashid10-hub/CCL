# Connect Continents Logistics — Website Architecture & Requirements

**Role:** Lead architect doc — defines what gets built, how, and in what order.
**Status:** Draft v1 — open questions at the bottom need your answers before build starts.

---

## 1. Tech Stack (locked)

| Layer | Choice | Why |
|---|---|---|
| Framework | React (Vite) | Fast dev server, no unneeded server overhead for a marketing site |
| Styling | Tailwind CSS | Matches your ask, fast iteration, consistent design tokens |
| Animation — component/UI | **Framer Motion** | The industry-standard React animation library. Declarative, handles enter/exit, hover, drag, layout animation with minimal code. Best fit for card reveals, nav transitions, micro-interactions. |
| Animation — scroll choreography | **GSAP + ScrollTrigger** | Best-in-class for pinning sections, scrubbing animation to scroll position, and sequencing complex hero timelines. Framer Motion can do basic scroll reveals, but GSAP is the right tool once animations get choreographed (e.g. route-lines drawing in sync with scroll). |
| Smooth scroll feel | **Lenis** | Lightweight, pairs cleanly with GSAP ScrollTrigger, gives the site the "smooth momentum" feel that reads as premium/futuristic. |
| Icons | Lucide React | Clean, consistent, matches Tailwind-based projects well |
| Routing | React Router | Only if we go multi-page (see Q3 below) |
| Forms | Native form + a backend service (Formspree / Resend / EmailJS) | So the contact form actually delivers to your inbox, not just UI |

**Not recommending:** a 3D globe (React Three Fiber) for v1 — it's the "cool" option but adds real load-time and mobile-performance cost for a company site that needs to load fast and convert visitors, not impress developers. Flagging it as a possible **phase 2** enhancement once the core site is live and converting.

---

## 2. Design System

Sourced from your logo (deep royal blue + orange), not the navy/teal palette from the earlier prototype — that palette gets replaced to match your actual brand.

- **Primary (brand blue):** deep royal blue — dominant color, used for headers, nav, primary structure
- **Accent (brand orange):** used sparingly and deliberately — CTAs, hover states, the "route line" motif, key numbers/stats
- **Background:** light mode by default (matches the logo's white background) with a dark hero band or dark footer for contrast — full dark-mode-only site would clash with the logo's light background
- **Typography:** a bold geometric sans for headings (echoes the logo's thick lettering), a clean readable sans for body text
- **Motion principle:** animation should *always* tie back to the "connecting continents" concept — route lines drawing, points connecting, things arriving — not generic fade-ins for their own sake. Every animation should feel like it's reinforcing "things get where they're going," not just decorating the page.

---

## 3. Sitemap — Pages Included

| Page | Purpose | Priority |
|---|---|---|
| **Home** | Convert cold visitors — what you do, why you're credible, clear path to contact | Must-have (v1) |
| **Services** | Detail on Ocean / Air / Customs (or whatever your actual service lines are) | Must-have (v1) |
| **Portfolio / Case Studies** | Proof — real shipments, routes, problems solved | Must-have (v1) |
| **About** | Trust-building — who's behind the company, why a client should pick a newer forwarder over an established one | Recommended (v1) |
| **Contact / Get a Quote** | Lead capture | Must-have (v1) |
| Track Shipment | Client-facing shipment status lookup | Phase 2 — needs backend/data source, not needed to launch |
| Blog / Insights | SEO + authority building | Phase 2 — only worth it if you'll actually publish regularly |

**Recommendation:** launch as a single-page scrolling site (Home, Services, Portfolio, About, Contact all as sections on one page, like the prototype) rather than separate routed pages. For a new company, this is faster to build, faster to load, and pushes visitors toward the Contact section naturally instead of losing them across page loads. We can split into full routed pages later once there's enough content per section to justify it.

---

## 4. Page-by-Page Requirements

### Home
- Hero: headline + one-line value prop, animated route-line visual (signature brand motif), primary CTA ("Request a quote") + secondary CTA ("See shipments handled")
- Trust bar: quick stats/manifest-style tags (modes handled, coverage, status)
- Services preview: 3 cards linking to full Services section
- Portfolio preview: 1–2 case studies, "See all" link
- Footer CTA: final push to Contact

### Services
- One detailed block per service line (Ocean Freight, Air Freight, Customs & Documentation — confirm this list, see Q1)
- Each block: what's included, who it's for, how the process works
- Animated icon or route-motif per service tied to the section reveal

### Portfolio / Case Studies
- Waybill-style cards: origin → destination, cargo type, problem → action → result
- Filterable by mode (sea/air) once there are enough entries to justify a filter
- Real content pending your father's answers to the earlier question set

### About
- Founding story / why the company exists
- Who's behind it (you, your father, any team)
- Why a client should trust a newer forwarder — process rigor, responsiveness, personal attention are usually the honest answer here for a new company

### Contact
- Form: company name, route (origin → destination), cargo type, email/WhatsApp, message
- Form actually sends to a real inbox (see Q5)
- Direct WhatsApp/phone link as an alternative to the form — logistics clients often prefer this over email

---

## 5. Animation Strategy (site-wide)

- **Hero:** GSAP timeline — route lines draw in on load, pulse continuously after
- **Section reveals:** Framer Motion `whileInView` — fade + slight rise as sections scroll into view
- **Cards:** hover lift + accent-line glow on hover (Framer Motion `whileHover`)
- **Scroll feel:** Lenis smooth scroll site-wide
- **Restraint rule:** nothing animates purely for spectacle — every motion should be fast (under ~700ms), skippable, and respect `prefers-reduced-motion`

---

## 6. Open Questions

1. **Services list** — is it exactly Ocean Freight / Air Freight / Customs & Documentation & Warehousing, or are there other service lines (e.g. trucking, insurance, packing) to include?
2. **Single-page vs multi-page** — okay with launching as one scrolling page (faster, recommended) or do you want separate routed pages per section from the start?
3. **Palette switch** — confirm: replace the earlier navy/amber/teal prototype with blue/orange to match the logo?
4. **Portfolio content** — do we launch with the 2 placeholder case studies from the prototype (clearly marked as examples) while waiting on your father's answers, or hold the Portfolio section back until real data is in?
5. **Contact form delivery** — where should form submissions actually land (an email address, WhatsApp Business number, or both)?
6. **Language** — English only, or English + Urdu?
7. **Domain/hosting** — do you already have a domain and hosting picked, or is that still open?

Answer what you can — anything left open I'll make a reasonable call on and flag it clearly in the build.
