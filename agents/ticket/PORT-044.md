# PORT-044 — Remove retired footer metadata and the OpenClaw project

- Status: Done
- Priority: P2
- Source: owner request on 2026-09-07
- Depends on: none
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Context

Alongside the Impact removal in PORT-024, Julian asked for two further deletions on 2026-09-07:

1. The footer's trailing metadata — `· Montréal, QC` on the copyright line and the whole `Built with Next.js · Deployed on Vercel` line.
2. The `OpenClaw` project card.

The build-stack line was also factually wrong: `next.config.mjs` sets `output: "export"` and `.github/workflows/nextjs.yml` deploys `out/` to GitHub Pages. Nothing deploys to Vercel. ADR-005 already recorded static export on GitHub Pages as the deployment path, so the footer contradicted an accepted decision.

## Scope

Changes:

- `src/components/Contact.tsx`: the footer paragraph is now `© 2026 Julian Patterson` alone. The `<br />` and the build-stack line are gone; the footer container, border, and type styles are untouched.
- `src/components/Projects.tsx`: removes the `OpenClaw` entry from the `projects` array.
- `src/components/Projects.tsx`: the standard card grid drops from `repeat(3, 1fr)` to `repeat(2, 1fr)` so the two remaining cards fill the row instead of leaving an empty third column. The `@media` rule that collapses `#projects .projects-grid` to one column is unchanged and still applies.

Preserved:

- Julian's location. It remains in Hero, About, Experience, and site metadata; only the footer instance was removed.
- The `OpenClaw` record in `knowledge-base/PROJECTS.md`, kept and marked as removed from production so the project can be restored if Julian wants it back with a real repository link.

## Acceptance criteria

- [x] The footer renders only the copyright line, with no location and no build-stack claim.
- [x] No Vercel reference remains anywhere in `src/` or the static export.
- [x] The OpenClaw card no longer renders, and no OpenClaw string appears in the export.
- [x] The remaining project cards lay out correctly at desktop and mobile widths.
- [x] `SITE.md` and the knowledge base are synchronized.

## Validation record

Run on 2026-09-07:

- `npx tsc --noEmit`: passed.
- `npm run build`: passed; static export generated.
- `npm run docs:check`: passed.
- `npm run lint`: **not run — environment limitation.** `next lint` is unconfigured and opens an interactive ESLint setup prompt, so it cannot complete non-interactively. The lint and type pass inside `next build` ran clean.
- Export scan of `out/`: zero matches for `openclaw`, `Deployed on Vercel`, and `Built with Next.js`. The footer string is exactly `© 2026 Julian Patterson`.
- `grep -rni "vercel" src/`: no matches.
- Responsive check against the served static export at `http://localhost:8899`, measuring `getComputedStyle` on `#projects .projects-grid`: 1440 -> `506px 506px`; 1024 -> `460.5px 460.5px`; 768 -> single column; 375 -> single column; 320 -> single column. `document.body.scrollWidth > innerWidth` was false at every width, so there is no horizontal overflow. The grid holds exactly 2 cards and the DOM has no `#stats`.
- Footer verified in the rendered DOM: the last `#contact` paragraph is exactly `© 2026 Julian Patterson`.
- **Screenshots not captured - environment limitation.** The automation pane returned blank images at every viewport even though the DOM measured correctly and the rendered page text read back in full. Separately, and as PORT-041 already recorded, `ScrollTrigger` never fires in this browser, so reveal-animated content sits at `opacity: 0` until forced. Verification here is DOM-level, not visual; confirm the Projects row visually before deploying.

## Outcome

The footer carries the copyright line only, and Projects shows the featured Stride card plus two standard cards. Changed paths: `src/components/Contact.tsx`, `src/components/Projects.tsx`.
