# Current website map and review

Last synchronized from code and runtime: 2026-09-14

The source under `src/` is authoritative. This file is a navigational map and audit record, not a replacement for reading the relevant code.

## Stack and deployment

- Next.js 14.2.35, App Router, React 18, TypeScript strict mode
- Tailwind CSS 3 plus extensive inline styles
- GSAP/ScrollTrigger animation, D3 skills visualization, Carbon icons
- `next.config.mjs` sets `output: "export"`, `trailingSlash: true`, and an environment-selectable `distDir`
- `npm run dev` writes `.next-dev/`; `npm run build` keeps the standard `.next/` → `out/` path, preventing concurrent development and production artifacts from corrupting one another
- `.eslintrc.json` enables Next.js Core Web Vitals linting with matching ESLint 8 and `eslint-config-next` 14 packages in the npm dependency state
- `.github/workflows/nextjs.yml` builds with Node 20/npm and deploys `out/` to GitHub Pages
- The Pages build passes its repository-scoped automatic `GITHUB_TOKEN` only to the static build; no personal token is required or published
- `src/app/layout.tsx` uses the bundled Geist variable font for display/body text and Space Mono through `next/font/google` for labels and metadata
- The visual system selectively uses Carbon icons, a 2x spacing rhythm, square geometry, a Carbon-blue focus ring, and productive motion timing without importing the full Carbon React library

Commands currently defined in `package.json`:

```bash
npm run dev
npm run build
npm run start
npm run clean
npm run lint
npm run typecheck
npm run docs:check
npm run check
```

Observed validation on 2026-07-22:

- `npx tsc --noEmit`: passed (reported by both audit agents)
- `npm run lint`: passed without warnings or errors after PORT-039 configured Next.js Core Web Vitals linting
- local browser: rendered after rebuilding a stale `.next` cache; a hydration error overlay remains
- production build: local audit could not complete because `next/font/google` required network/DNS access

PORT-002 validation on 2026-07-23:

- Moved component media queries, hover rules, and keyframes out of rendered `<style>` elements and into scoped rules in `src/app/globals.css`.
- Development and production-export browser loads produced no hydration mismatch, root client-render fallback, console warning, or console error at 1280px and 390px.
- At 390px the responsive Hero, About, Experience, Projects, and navigation rules remained active and document width matched the viewport.
- `npm run build` completed successfully when the configured Google font fetch had network access.

PORT-014 validation on 2026-07-23:

- Replaced the runtime `/api/github` dependency with a force-static `/data/github-activity` route generated during `next build`.
- The generated payload contains only public contribution dates/counts, username, and generation time when GitHub is available; missing credentials or upstream failures produce an explicit unavailable payload without failing the site build.
- Loading, unavailable, zero-contribution, and fetch/schema-error states have intentional live-region messaging; the ready heatmap exposes a summary label.
- No credential markers or canary token appeared in `out/`; the static resource returned HTTP 200, while the removed `/api/github` path returned 404.
- Production-export browser checks at 375px and 1280px produced no console warnings/errors, and the 375px document matched the viewport width.

PORT-017 partial validation on 2026-07-24:

- Essential reveal targets are visible in the authored markup instead of depending on initial inline transparency; print and reduced-motion styles force stable visible content.
- Reduced-motion setup skips mandatory reveal animation while preserving the content's final state.
- The Experience rule and square markers share a dedicated grid axis. At the measured 601px mobile viewport, all four marker centers matched the rule center exactly, the rule stayed outside the content column, and horizontal overflow was `0px`.
- `npm run check`, `npm run build`, and `git diff --check` passed. The production export repeated the exact mobile marker/rule alignment with `0px` overflow and no browser warning/error; the owner later closed PORT-017 and waived its remaining semantic-control, keyboard/touch, and screen-reader-oriented work.

PORT-038 cache-recovery change on 2026-07-24:

- A reported development failure combined 404s for `webpack.js`, `main-app.js`, and `app/page.js` with missing `.next/server` chunks, showing that development and production artifact generations had been mixed.
- Development now uses `.next-dev/`, while production retains Next.js's standard `.next/` → `out/` pipeline; `npm run clean` removes both build caches before a clean restart.
- A production build completed while the isolated development server stayed live; the page and all four previously failing chunk paths returned HTTP 200 before and after that build, and the development browser logged no warning/error.

PORT-039 release-polish validation on 2026-09-14:

- `npm run check`, `npm run lint`, `npm run build`, and `git diff --check` passed. The first intentionally concurrent build/typecheck attempt exposed the known shared `.next/types` race; the required sequential rerun passed.
- Browser checks at 320, 375, 768, 1024, and 1440 CSS pixels showed no horizontal overflow and a visible Hero. The browser logged no warning or error.
- The text scramble retains readable server text, replays after viewport re-entry, and exits early when `prefers-reduced-motion` is active.
- `npm audit --omit=dev` reports two high-severity and one critical advisory in the pinned Next.js 14 production dependency tree. The deployed site is a static export with no Next.js server runtime, but a framework-major upgrade remains a separate decision.

## Page composition

`src/app/page.tsx` mounts 13 sections in this order:

| Order | Component | Anchor | Purpose/status in current code |
| --- | --- | --- | --- |
| 1 | `Hero` | top | Name, headline, location/time, CTAs, letter animation |
| 2 | `About` | `#about` | Bio and personal metadata |
| 3 | `Experience` | `#experience` | Work and education timeline |
| 4 | `Projects` | `#projects` | Featured research plus four project cards |
| 5 | `Stats` | `#stats` | Freight-work impact counters/charts |
| 6 | `SkillsGraph` | `#skills` | Interactive D3 skill graph |
| 7 | `FreightExplainer` | `#research` | Freight Network Intelligence explainer |
| 8 | `Reading` | `#reading` | Papers/books/services being read |
| 9 | `GitHubActivity` | `#activity` | Contribution heatmap backed by a sanitized build-time snapshot at `/data/github-activity` |
| 10 | `FreightNetwork` | `#freight-network` | Animated shipping network visualization |
| 11 | `Marathon` | `#marathon` | Running stats/chart; source comments label data as placeholder |
| 12 | `Terminal` | `#terminal` | Interactive faux terminal with personal/project output |
| 13 | `Contact` | `#contact` | Email, LinkedIn, GitHub-labelled URL, footer |

`page.tsx` explicitly labels `FreightNetwork`, `Marathon`, and `Terminal` as template sections for evaluation. This is a code fact, not an instruction to remove them; ticket `PORT-004` handles the requested audit.

Navigation exposes only About, Experience, Projects, and Contact, with a mobile full-screen menu.

## Approved future section plan

ADR-007 records Julian's requested direction. This table describes planned work, not the current production page above.

| Current section | Approved direction | Ticket |
| --- | --- | --- |
| Hero | Keep; update outdated relocation/positioning copy and visual | `PORT-020` |
| About | Keep; audit and clean up information | `PORT-021` |
| Experience | Keep; update Hapag-Lloyd and later AnyTime details | `PORT-022` |
| Projects | Keep; clean up approved projects and links | `PORT-023` |
| Stats | Keep provisionally; decide removal versus approved evidence | `PORT-024` |
| Skills Graph | Keep; rebuild from the evidence-backed skills review | `PORT-025` |
| Freight Explainer | Keep; update and combine coherently with Freight Network | `PORT-026`, `PORT-031` |
| Journey | Removed from production | `PORT-027` |
| Now | Removed from production | `PORT-028` |
| Reading | Keep; replace stale current-reading framing after owner review | `PORT-029` |
| GitHub Activity | Keep as an accountability feature after data-path repair | `PORT-030` |
| Freight Network | Keep beside/within the freight explainer area | `PORT-031` |
| Marathon | Keep only with honest data and a safe/practical Strava path | `PORT-032` |
| Terminal | Provisional; redesign usefully or remove after owner decision | `PORT-033` |
| Contact | Keep; audit labels, destinations, and status copy | `PORT-034` |

## Planned shared résumé output

ADR-009 and PORT-037 define a future, not-yet-implemented capability: the typed content model from PORT-006 will feed both the portfolio and a semantic `/resume/` route plus a reproducibly generated LaTeX/PDF résumé. The HTML route and PDF will remain compatible with static GitHub Pages; the PDF viewer is an enhancement with a complete HTML fallback. No résumé route, source, generator, build command, or PDF asset exists yet.

## Fact-bearing surfaces

When personal information changes, search all of these rather than updating only the obvious card:

| Information | Current consumers |
| --- | --- |
| Name, headline, domains | `layout.tsx`, `Hero.tsx`, `Contact.tsx` |
| Status, role, location, languages | `Hero.tsx`, `About.tsx`, `Terminal.tsx`, `Contact.tsx`, `layout.tsx` |
| Work and education | `Experience.tsx`, `About.tsx`, `Stats.tsx`, `Terminal.tsx`, `layout.tsx` |
| Projects/research | `Projects.tsx`, `FreightExplainer.tsx`, `FreightNetwork.tsx`, `SkillsGraph.tsx`, `Reading.tsx`, `Terminal.tsx` |
| Interests/activity | `About.tsx`, `Reading.tsx`, `Marathon.tsx` |
| Public links | `Projects.tsx`, `Reading.tsx`, `Contact.tsx`, `layout.tsx` |
| Brand/typography | `layout.tsx`, `globals.css`, `Hero.tsx`, `page.tsx`, and most components |

Use `rg` for both the old value and likely variants before closing a content ticket.

## Verified review findings

These are observed code/runtime facts. Their remediation is indexed in `TICKETS.md` and specified in the linked files under `agents/ticket/`.

- The 390px hero fits, uses the hamburger navigation, and preserves both CTAs.
- PORT-002 resolved the hydration mismatch previously caused by HTML escaping differences inside rendered component `<style>` text. Component CSS now lives in the static global stylesheet with section-scoped selectors.
- Project cards no longer ship placeholder links; they render explicit pending-link labels until approved destinations are supplied.
- The GitHub-labelled link in `Contact.tsx` points to Julian's GitHub profile.
- PORT-014 moved GitHub activity to a build-generated static snapshot; the browser and GitHub Pages deployment no longer require a runtime API or token.
- PORT-017 supplies a reduced-motion and print fallback for essential reveal content; the owner closed the ticket and waived its remaining interaction-accessibility scope.
- PORT-027 removed the Journey section and its responsive animation rules. Its retained work, education, and location facts remain represented in About and Experience; Journey-only “Born and raised” and “first freight internship” wording was deliberately removed rather than silently relocated.
- PORT-028 removed the Now section, its countdown logic, and its responsive rule. Retained status themes remain represented elsewhere; Now-only date/countdown, German-level, and weekly-training claims were deliberately removed from production rather than relocated.
- Some project-card interactions use clickable `div` elements; graph/network information is hover-oriented.
- `Marathon.tsx` contains placeholder values; `Terminal.tsx` contains simulated output/history. Both are accurate descriptions of what the current code implements.
- PORT-039 replaced the stale and fabricated Terminal command output with a concise interactive summary of facts already represented elsewhere.
- `package-lock.json` and `yarn.lock` both exist while CI uses npm.

## Historical material

- `redesign.md` and `edits/` are design history.
- `TODO` is the imported raw backlog and becomes a pointer after migration.
- Tool-specific instruction files are compatibility shims, not independent policy.
