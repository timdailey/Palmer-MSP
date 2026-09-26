# Palmer Motorsports Park — website

Rebuild of palmermotorsportspark.com, Direction B "Pit Wall". Static [Astro](https://astro.build) site, deployed to GitHub Pages.

**Current scope: homepage only.** The design brief and approved references live in [`docs/design/`](docs/design/). Inner pages (Programs, Schedule, event pages, policies) were started and are parked on the `wip-inner-pages` branch. Until they are merged, homepage links to inner pages will 404.

## Run it

Requires Node 22+.

```bash
npm install
npm run dev        # http://localhost:4321/Palmer-MSP/
npm run build      # outputs to dist/
npm run preview    # serve the built site
```

## Deploy (GitHub Pages)

1. In the repo on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes to `https://timdailey.github.io/Palmer-MSP/`.
3. The workflow also rebuilds daily at ~5 AM Eastern so the "On track now" bar and schedule preview stay current. (A small script also hides the status bar if it goes stale between builds.)

**Moving to the real domain:** set `SITE_URL=https://www.palmermotorsportspark.com` and `BASE_PATH=/` as env vars in the workflow's build step, and add the custom domain under Settings → Pages. All internal links go through `url()` in `src/lib/site.ts`, so nothing else changes.

## Edit content

No code needed for most edits — change the files in `src/content/` and push.

| What | Where |
| --- | --- |
| Programs (finder table, prices, levels) | `src/content/programs/*.md` — one file per program. `order` sets table order; `levels` controls the experience filter; `showInFinder: false` hides it from the table. |
| Events (status bar, schedule preview) | `src/content/events/*.md` — `start`/`end` as `YYYY-MM-DD`. If today falls between them, the event shows in the green "On track now" bar. The next 4 upcoming events appear on the homepage. Use `dateTBD: true` for unscheduled entries. |
| Membership types | `src/content/membership.yaml` |
| Policy / legal pages | `src/content/pages/*.md` |
| Address, phones, email, social, external login/cart/shop links | `src/lib/site.ts` |
| Colors, fonts, spacing | `src/styles/global.css` (`:root` tokens) |

**Never invent prices.** If a price isn't confirmed, keep `price: '[PRICE]'`. Placeholders render in gold mono so they're easy to spot.

## Placeholders to resolve before launch

**Prices (`[PRICE]`)** — only HPDE ($575/driver) is confirmed:
- `src/content/programs/arrive-and-drive.md`
- `src/content/programs/ride-along.md`
- `src/content/programs/open-lapping.md`
- `src/content/programs/ot-laps.md`
- `src/content/programs/test-tune-days.md`
- `src/content/programs/gift-vouchers.md`
- `src/content/membership.yaml` (all four types)
- `src/content/events/2026-mustangs-on-the-mountain.md`

**Dates / counts (`[DATE]`, `[N]`)**
- `src/content/events/hpde-tbd.md` — real HPDE dates and spots-left count
- `src/content/events/member-day-tbd.md` — real member-day dates

**TODOs**
- `src/components/TrackMap.astro` — replace the illustrative map with the official track map SVG
- `src/components/Header.astro` — replace the 203×95 PNG logo with a vector SVG (also `public/logo-on-*.png`, `public/og/default.png`)
- `src/lib/site.ts` — confirm login / cart / shop / booking URLs (currently point at the old site's homepage); office days (for `openingHours`); gate latitude/longitude (for JSON-LD `geo`)
- `src/content/events/2026-ner-pca.md` — organizer registration link
- `src/content/events/2026-mustangs-on-the-mountain.md` — registration URL
- `src/content/programs/*.md` — migrate full program descriptions from the current site
- `src/content/pages/requirements.md`, `cancellation-policy.md` — migrate verbatim from the current site (merge the HPDE and Lapping copies)
- `src/content/pages/privacy.md` — approved privacy policy (legal review)
- `src/content/pages/accessibility.md` — date of last accessibility review

Regenerate this list with:

```bash
grep -rn -E "TODO|\[PRICE\]|\[DATE\]|\[N\]" src
```

## Quality checks (homepage, production build)

- **Lighthouse:** mobile 99 performance / 100 accessibility / 100 best practices / 100 SEO; desktop 100 across the board.
- **axe-core** (WCAG 2.0–2.2 A/AA + best practices): 0 violations at 1440px and 390px.
- Works with JavaScript off: the menu stays open, filter chips are plain links that show all rows, and the track-direction toggle is hidden.

## Not yet built (from the brief)

Inner pages and their templates, `redirects.json` for old `.aspx` URLs, `llms.txt`, and the `Event`/`Product`/`FAQPage` JSON-LD that lives on those pages — see `wip-inner-pages`. Note that GitHub Pages can't serve real 301 redirects; those need the production host.
