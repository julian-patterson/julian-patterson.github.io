# PORT-038 — Separate Next.js development and production caches

- Status: Done
- Priority: P0
- Source: owner-reported local development regression on 2026-07-24
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-07-24
- Completed: 2026-07-24

## Context

The development server returned 404s for its core webpack and App Router chunks, then failed with missing server chunks from `.next/server/webpack-runtime.js`. Development and production validation were writing different artifact generations into the same `.next` directory.

## Acceptance criteria

- [x] Development and production builds use separate ignored Next.js artifact directories.
- [x] The corrupted generated cache is removed and a clean development server serves the page and core chunk URLs successfully.
- [x] A production static export still completes successfully without interfering with the development cache.
- [x] Repository commands and architecture documentation explain the cache separation and recovery path.
- [x] Docs, type, build, browser-console, and diff checks pass.

## Validation record

- Stopped the full npm/Next process tree supervising the broken server, then `npm run clean` removed the legacy `.next/` cache and the isolated `.next-dev/` cache.
- Clean `npm run dev`: passed and reported `NEXT_DIST_DIR=.next-dev`; the development server became ready on port 3000.
- Exact regression URLs returned HTTP 200: `/`, `/_next/static/chunks/webpack.js?v=1784846085175`, `main-app.js` with the same query, `app/page.js`, and `app-pages-internals.js`.
- `npm run build` completed successfully through the standard `.next/` → `out/` static-export path while the development server remained active.
- Repeating all five HTTP checks after the production build returned HTTP 200; `.next-dev/server/app/page.js` remained the older development artifact while `.next/BUILD_ID` and `out/index.html` were refreshed by production.
- Development browser loaded all five current Next.js chunk scripts, reached `document.readyState === "complete"`, rendered 13 sections with `0px` overflow, and logged no warning/error.
- `npm run check`: passed (`docs:check` and TypeScript).
- `git diff --check`: passed.

## Outcome

Fixed the recurring development 404/missing-chunk failure by isolating `npm run dev` in `.next-dev/` while retaining Next.js's standard `.next/` → `out/` production pipeline. Added a deterministic `npm run clean` recovery command, documented the lifecycle, and recorded ADR-010.

Changed paths: `.gitignore`, `next.config.mjs`, `package.json`, `tsconfig.json`, `scripts/clean-next-artifacts.mjs`, `README.md`, `agents/DECISIONS.md`, `agents/SITE.md`, `agents/TICKETS.md`, and this ticket.
