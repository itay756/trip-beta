# מסע צפוני · Project Context

A Hebrew/RTL trip-planner web app (also an installable PWA) for planning a
**caravan/RV trip through the northeastern USA and French Canada (Québec)**.
All UI text is Hebrew; layout is right-to-left.

## Stack

- **Vite 5** + **React 18** + **TypeScript** (strict, `tsc -b` in the build)
- **Tailwind CSS 3** (custom `forest` green + `sand` palettes in `tailwind.config.js`)
- **react-leaflet / Leaflet** for the map (OpenStreetMap tiles)
- **vite-plugin-pwa** (Workbox) for the installable/offline PWA
- `base: './'` — the app is deployable from any sub-path / static host

## Running it (IMPORTANT: Node is not on PATH here)

Node was installed via winget (user-scope, portable) and is **not** on the global
PATH on this machine. For every shell invocation:

- Prepend the Node dir to PATH:
  `C:\Users\User\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.16.0-win-x64`
- Call **`npm.cmd`** (not `npm` — PowerShell blocks `npm.ps1`).
- To run vite/tsc directly: `node node_modules/vite/bin/vite.js` etc.

Scripts: `npm run dev` (dev server), `npm run build` (`tsc -b && vite build`),
`npm run preview` (serve `dist/`).

## Layout

```
index.html            RTL shell, PWA + iOS meta tags
src/
  main.tsx            React entry
  App.tsx             Root; view routing is LOCAL STATE (ViewId), not a router
  index.css           Tailwind layers, Leaflet RTL fixes, safe-area insets
  components/
    Nav.tsx           Top sticky nav (the 6 views)
    MapView.tsx       Leaflet map: route polyline, stop pins, camp/attraction markers
    DetailModal.tsx   Bottom-sheet/modal with photo gallery, reviews, actions
    Photo.tsx         <img> with graceful gradient-placeholder fallback on error
  pages/              MapPage, RoutesPage, ItineraryPage, CampgroundsPage,
                      AttractionsPage, TipsPage
  data/               attractions.ts, campgrounds.ts, regions.ts, routes.ts, tips.ts
  lib/                types.ts (all interfaces), ui.ts (colors/emoji/labels helpers)
public/               caravan.svg + generated PWA icons
```

Navigation is `useState<ViewId>` in `App.tsx` (no react-router). Selecting a
campground/attraction opens `DetailModal` via lifted state.

## Data conventions

- All content lives in `src/data/*.ts` as typed arrays (see `src/lib/types.ts`),
  bundled into the JS — so lists/itinerary/tips work fully offline.
- `Attraction` and `Campground` each have `photos: string[]`.
- Photos use the **`wiki()` helper** (defined in both `attractions.ts` and
  `campgrounds.ts`):
  `wiki(file) => https://commons.wikimedia.org/wiki/Special:FilePath/<enc>?width=900`
  — free-license Wikimedia Commons images. `Photo.tsx` shows a styled gradient
  placeholder if an image is missing or fails to load.
- Filenames come straight from the MediaWiki API's `original.source` (guaranteed
  to exist). To find a new one: query
  `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=<term>&gsrlimit=1&prop=pageimages&piprop=original&redirects=1`
  and take the last path segment of `original.source` (URL-decoded). The API
  rate-limits bursts (HTTP 429) — pace requests (~3s) and retry with backoff.
  One spot has no free Commons lead image: `at-tanglewood` (intentionally `[]`).

## PWA notes

- Config lives in `vite.config.ts` (`VitePWA({...})`), `registerType: 'autoUpdate'`.
- Manifest: RTL/Hebrew, `display: standalone`, portrait, theme `#2d6e37`.
- **Service worker is production-only** — `npm run dev` has no SW; test PWA
  features against a `build` + `preview` (over HTTPS or localhost).
- Runtime caches (Workbox): `osm-tiles` (map tiles), `wikimedia-photos`
  (location photos), `google-fonts-*`. Precache covers the app shell.
- Icons in `public/`: `pwa-192x192.png`, `pwa-512x512.png`,
  `maskable-512x512.png`, `apple-touch-icon.png` — rasterized from
  `public/caravan.svg`. To regenerate, rasterize the SVG (e.g. with `sharp`;
  the brand green is `#2d6e37`, maskable variant is full-bleed with the caravan
  scaled to ~80% to stay inside the safe zone).

## Conventions / gotchas

- Keep all user-facing strings Hebrew and RTL-correct.
- Leaflet needs `direction: ltr` on `.leaflet-container` (already in `index.css`);
  popups/tooltips are flipped back to RTL.
- Brand green is `forest-600` = `#2d6e37`.
- External resources (OSM tiles, Google Fonts, Wikimedia images) may be blocked
  in sandboxed preview environments — images then show the placeholder; this is
  an environment limitation, not a code bug.
