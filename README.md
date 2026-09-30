# Maghanmal Jethanand Group: storefront prototype

A desktop showcase of a quote-led steel storefront and the founder story. Built to `MJ_Prototype_Build_Reference.md` v1.3. No backend, no prices. Everything runs offline.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173 in Chrome at 1440 x 900 or larger (minimum width 1280).

```bash
npm run build && npm run preview
```

## Presenting

Desktop and English only to move fast. Mobile and Arabic are committed for production.

- Press **P** to show the presenter bar. **Shift+R** resets the basket and returns to Home. Both keys are ignored while typing in a field.
- **Fill basket** adds one line each from SHS, Pipe EN 10255 and IPE. **Details** and **Received** fill the basket first, so they never open empty.
- **Sample marks** (off by default) tags every record that is still sample data. Leave it off in front of the client.
- WhatsApp buttons show what the message would say instead of leaving the app. To open real WhatsApp, set `LIVE_LINKS = true` and replace the sample number in `src/data/contact.ts`.

Suggested 5-minute path: Home hero, shape selector, SHS (add 2 rows), header search "50 NB", Pipe EN 10255 (add 1), search "IPE 200" (add 1), basket (set one grade), details, received, Our founder, Since 1942.

## Swap in photos

Drop a file into `src/assets/images/` named after the slot, for example `hero-yard.jpg`. JPG, WebP, PNG and AVIF all work. No code change. Reload the page to see it (restart `npm run dev` if it does not appear, and rebuild for `dist`).

Every empty slot shows its name, ratio and minimum size. The full list is in `src/data/slots.ts`:

| Slot | Where | Ratio | Min size |
| --- | --- | --- | --- |
| hero-yard | Home hero | 16:9 | 2400 w |
| industry-oilgas, -water, -construction, -peb, -machinery, -marine | Home industries | 3:2 | 1200 w |
| founder-portrait, founder-band | Founder hero, Home founder band | 3:4, 4:5 | 1800 h, 1200 w |
| founder-archive-1, -2, -3 | Founder page and Since 1942 (timeline-1, -2, -4 reuse them) | 3:2, 4:5, 7:5 | 1400 w |
| proof-mtc, proof-stencil, proof-bundle | Family pages | 4:5 crop | 900 w |
| cta-yard | CTA bands | 21:9 | 2400 w |
| timeline-1, -2, -4 | Since 1942 | 4:3 | 1000 w |

`founder-portrait.jpg` and `founder-band.jpg` are the family portrait (`MP-bw.jpg`). Photos not to use: the ruler image, Gulf News and magazine press photos.

## Swap in icons

Product drawings (17 families) are generated: `npm run icons` writes `src/assets/product-icons/` and `scripts/area-report.md`. Step and industry glyphs use lucide-react. To override any UI glyph, drop a single-colour SVG into `src/assets/icons/` named from the list below. Fill and stroke colours are replaced with `currentColor`, so the icon takes the text colour. Draw on a 48 px grid, 1.5 px stroke, sharp joins. A missing icon shows an outlined square with two letters.

- Quote steps: step-pick, step-quantity, step-deliver, step-reply
- Industries: ind-oilgas, ind-water, ind-construction, ind-peb, ind-machinery, ind-marine, ind-autobody, ind-hvac, ind-other

## Where things live

| Path | What |
| --- | --- |
| `src/styles/tokens.css` | Colours, type scale, heat gradient, motion. Tailwind v4 `@theme` |
| `src/copy/en.ts` | UI strings, ready for a translation file later |
| `src/data/` | Groups, families, rows, specs, standards, certificates, timeline, founder, contact |
| `src/data/weight.ts` | Theoretical weight: pcs, metres, tonnes, plate by area, panels and coils by piece |
| `src/data/search.ts` | Designation search. "IPE 200", "ipe200" and "SHS 100 × 100" all match |
| `src/state/` | Basket and demo state, kept in `sessionStorage` |

Records that are still sample data carry `sample: true`, so real data can replace them one file at a time.

## QA

```bash
npx playwright install chromium
npx playwright test
```

Screens every route at 1440 x 900, 1920 x 1080 and 1280 x 800 into `shots/`, fails on console errors, CDN requests, horizontal scroll or visible sample marks, and runs the search, add, notes-only continue, submit and presenter flow. Weight and search self-checks run as `console.assert` in dev.

## Before going live

- Replace sample rows, specs and the WhatsApp number (`sample: true` in `src/data/`).
- Confirm the ICV certificate number and dates, and the direct line for large orders.
- Confirm the steel start date before any timeline entry names one.
- Decide a minimum-order policy, if any.
- Recheck catalogue rows against geometry (the source has known errors, such as the 65 x 65 SHS rows). A script should flag any mass more than 3% from `0.0157 x t x (H + B - 2t)`.
- Clear photo rights for every image, and get counsel's view on ruler names, book text and tributes (Playbook 6.8).
- Trading entity for the footer (Compendium 1.2).
