# Palmer Motorsports Park — Website Rebuild, Direction B "Pit Wall"

Build a production-ready, responsive, accessible website for Palmer Motorsports Park (Palmer, MA), a private club road course (Whiskey Hill Raceway). This replaces the current ASP.NET site at palmermotorsportspark.com.

## Reference files (in this folder)
- `reference/homepage-desktop.html` — approved homepage design at 1440px. Treat as the visual spec (layout, spacing, colors, type, copy). It uses a design-tool format (`<x-dc>`, `<helmet>`, a `support.js` script): ignore those wrappers and extract the markup and inline styles.
- `reference/homepage-mobile.html` — the same page at 390px.
- `public/logo-on-dark.png`, `public/logo-on-light.png` — the logo wordmark (track graphic removed). Low-res (203×95); leave a TODO to swap in a vector SVG.

## Stack
- Astro (static output) + TypeScript. Plain CSS with custom properties (no CSS framework required); scoped component styles.
- Content in Astro content collections (Markdown/YAML) so non-developers can edit: `programs`, `events`, `pages`.
- No client JS except small, progressively enhanced islands (program filter, direction toggle, mobile menu). Everything must work with JS off.

## Design tokens
- Background `#0E1113`, panel `#171B1E`, line `#2A3035`, line-strong `#4A535A`
- Text `#F2F4F5`, text-secondary `#C9D0D5`, muted `#A7B0B7`
- Brand gold `#D9A441` (links, primary buttons with `#0E1113` text), gold hover `#E8BD69`; status green `#4ADE80`
- Display font: Montserrat Alternates 500/600/700/800 (matches the logo). Body: IBM Plex Sans 400/500/600. Data/numbers: IBM Plex Mono 500/600. Self-host via Fontsource; `font-display: swap`.
- Radius: 6px buttons, 10–12px panels. Spacing on an 8px scale. Max content width 1312px (64px gutters desktop, 16px mobile).

## Sitemap (one persistent top nav on every page — never swap menus per section)
- Home
- Programs: Driving School (HPDE), Arrive & Drive, Ride-Along, Open Lapping, OT Laps, Test/Tune Days, Gift Vouchers; one shared "Requirements & Car Prep" page and one shared "Cancellation Policy" page (currently duplicated under HPDE and Lapping)
- Schedule (full season calendar, filterable by type; each event has its own URL)
- Membership (types, privileges, terms, referral, member days list, test drive)
- Track (overview & specs, track map, videos/virtual lap, paddock & facilities, history, rules)
- Rentals & Corporate (private rental, corporate events, partners & sponsors, advertising)
- Visit (directions, arrival/gate info, food, fuel, camping/RV, lodging & area guide, contact, staff, careers)
- Utility: Log in, Cart, Shop (link out to existing store until migrated)

## Homepage sections (match the reference)
1. Header: logo, nav, Log in, Cart (icon button with accessible name incl. count), gold "Book track time" CTA.
2. Live status bar (`role="status"`): what's on track today, gate time, Buster's. Driven by the events collection (today's event), hidden if none.
3. Hero: "2.3 miles. 14 corners. 509 feet of climb." + intro + CTAs; track map panel with numbered corners and a Clockwise/Counter-clockwise toggle (`aria-pressed`). Use the official track map SVG when provided; placeholder until then.
4. Spec strip: Length 2.3 mi, Width 40 ft, Corners 14, Absolute elev. ~190 ft, Cumulative ~509 ft, Pit stalls 40.
5. "Find your session": experience filter chips + semantic `<table>` (Program / Who it's for / You drive / Price / link). Stacks to cards on mobile. Filter works without JS (links with query params / all rows shown).
6. Schedule preview (next 4 events from collection) + gold Membership panel.
7. Rent the track / Corporate events panels.
8. Footer: address, phones, email (real `mailto:`), gate info, social, © year, accessibility statement link, privacy.

## Known content (from current site — use verbatim facts, never invent)
- 58 West Ware Road, Palmer, MA; mail P.O. Box 465, Palmer, MA 01069
- (413) 967-3560; (888) 556-7085 toll free; info@palmermotorsportspark.com; office 8 AM–6 PM
- Private club facility, no public access. Gate opens 7 AM (afternoon for OT Laps). Waivers at gatehouse. Under 18 needs parent/guardian. Camping and leashed pets OK. Buster's breakfast & lunch; food trucks allowed. 93 & 100 Sunoco race fuel. RVs: 110v, no water/sewer.
- Track opened May 8, 2015. Road & Track named it one of the top 10 tracks to drive in North America.
- HPDE: $575 per driver, entries capped. All other prices unknown — use `[PRICE]` placeholders flagged in content, never fabricate.
- Events: NER PCA Sep 25–27; Mustangs on the Mountain, Sun Oct 18.
- Social: Facebook and Instagram "PalmerMotorsportsParkOfficial".

## Accessibility (WCAG 2.2 AA — non-negotiable)
- Skip link; landmarks (`header`, `nav`, `main`, `footer`); one `h1` per page; logical heading order.
- Text contrast ≥ 4.5:1 (verify gold on dark and dark on gold). Visible focus ring (2px gold outline + offset) on every interactive element.
- Touch targets ≥ 44×44px. Real `<button>`/`<a>` only. Icon-only controls get `aria-label`. Decorative SVGs `aria-hidden`.
- All images have meaningful `alt` (or empty for decorative). No letter-spaced words as fake type.
- Respect `prefers-reduced-motion`. Mobile menu: disclosure button with `aria-expanded`, focus management, Escape to close.
- Tables use `<th scope>`; calendar dates use `<time datetime>`.

## SEO / structured data
- Unique titles/descriptions; clean URLs (no `.aspx`, no query-string pages); 301 redirect map from old URLs (`TrackInfo.aspx`, `Drives.aspx?DivID=…`, `PMPClub1.aspx`, `Corporate.aspx`, `Contacts.aspx`, `Resources.aspx`) in `redirects.json`.
- JSON-LD: `SportsActivityLocation` (+ address, geo, phone, openingHours) site-wide; `Event` for each event; `Product`/`Offer` for programs with known prices; `BreadcrumbList`; `FAQPage` on Visit.
- sitemap.xml, robots.txt, llms.txt, Open Graph images.

## Deliverables
1. Scaffold the Astro project, tokens, base layout, header/footer, and the homepage matching the reference at 1440px and 390px.
2. Program, event, and membership collections with sample entries from the facts above.
3. Template pages for program detail, schedule (filterable), event detail, and Visit.
4. README with run/build/deploy instructions, how to edit content, and a list of every `[PRICE]`/`TODO` placeholder.
5. Run a Lighthouse/axe pass and fix issues; target 100 accessibility, 95+ performance.

Work in small commits. Ask before adding dependencies beyond Astro, Fontsource, and an accessibility linter.
