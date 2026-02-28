# Changelog

Changes on top of the upstream [sanity-io/sanity-template-nextjs-clean](https://github.com/sanity-io/sanity-template-nextjs-clean).

## 2026-02-28 — Embed Sanity Studio at /studio

Embedded the Sanity Studio directly into the Next.js frontend at `/studio`, eliminating the need to run the studio as a separate app on port 3333.

**What changed:**

- Added `frontend/sanity.config.ts` — studio config with `basePath: '/studio'`, imports schemas from `../studio/src/schemaTypes`
- Added `frontend/app/studio/[[...tool]]/page.tsx` — NextStudio catch-all route
- Moved blog pages into `app/(blog)/` route group so the studio gets a clean layout without Header/Footer
- Simplified `app/layout.tsx` to a minimal HTML shell (fonts + body only)
- Updated `studioUrl` default from `http://localhost:3333` to `/studio`
- Added studio deps to frontend: `@sanity/assist`, `@sanity/vision`, `@sanity/icons`, `sanity-plugin-asset-source-unsplash`, `styled-components`, `pluralize-esm`

**Why:** Previously the studio ran separately on `:3333` with no embedded studio in the frontend. The other two forks (next-embeds-sanity, cms-sanity) had embedded studio but older stacks and required significant manual rework to align schemas. This consolidates everything into one repo with the latest stack.

**Dev flow:** `npm run dev` still starts both frontend (`:3000`) and studio (`:3333`). The embedded studio at `/studio` works in both dev and production — useful for deployed editing at `yourdomain.com/studio`.

## 2026-02-28 — Upstream sync

Merged upstream/main: Next.js 16.1.5 security update, typegen migration to `sanity.cli.ts`, documentation updates.

## 2026-01-04 — Initial fork

Forked from [sanity-io/sanity-template-nextjs-clean](https://github.com/sanity-io/sanity-template-nextjs-clean). Deployed to Netlify at https://benhu.netlify.app/. Added e-commerce brand colors and mobile styling.
