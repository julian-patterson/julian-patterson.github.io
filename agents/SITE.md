# Current website map and review

Last synchronized from code and runtime: 2026-09-07 (PORT-044)

The source under `src/` is authoritative. This file is a navigational map and audit record, not a replacement for reading the relevant code.

## Stack and deployment

- Next.js 14.2.35, App Router, React 18, TypeScript strict mode
- Tailwind CSS 3 plus extensive inline styles
- GSAP/ScrollTrigger animation, D3 skills visualization, Carbon icons
- `next.config.mjs` sets `output: "export"`, `trailingSlash: true`, and an environment-selectable `distDir`
- `npm run dev` writes `.next-dev/`; `npm run build` keeps the standard `.next/` → `out/` path, preventing concurrent development and production artifacts from corrupting one another
- `.github/workflows/nextjs.yml` builds with Node 20/npm and deploys `out/` to GitHub Pages
- The Pages build passes its repository-scoped automatic `GITHUB_TOKEN` only to the static build. **This token cannot answer the contribution-calendar query** the activity route makes, which is user-scoped data needing `read:user`; PORT-043 records the diagnosis and the owner steps. No personal token is currently configured, and none is published
- `src/app/layout.tsx` uses Google-hosted DM Serif Display, DM Sans, and DM Mono through `next/font/google`

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
- `npm run lint`: opens Next.js's interactive ESLint setup because lint is not configured
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

## Page composition

`src/app/page.tsx` mounts 7 sections in this order:

| Order | Component | Anchor | Purpose/status in current code |
| --- | --- | --- | --- |
| 1 | `Hero` | top | Name, headline, location/time, CTAs, letter animation |
| 2 | `About` | `#about` | Bio and personal metadata |
| 3 | `Experience` | `#experience` | Work and education timeline; four entries ordered Hapag-Lloyd, Stride, Prime Freight, McGill |
| 4 | `Projects` | `#projects` | Featured Stride card plus two project cards in a two-column grid |
| 5 | `SkillsGraph` | `#skills` | Interactive D3 skill graph |
| 6 | `GitHubActivity` | `#activity` | Contribution heatmap backed by a sanitized build-time snapshot at `/data/github-activity`; currently renders the "unavailable" state — see PORT-043 |
| 7 | `Contact` | `#contact` | Email, LinkedIn, GitHub-labelled URL, footer |

PORT-024 removed `Stats` (`#stats`) along with its dedicated CSS. PORT-039 removed `FreightExplainer` (`#research`), `FreightNetwork` (`#freight-network`), and `Reading` (`#reading`) along with their dedicated CSS. `page.tsx` no longer carries the "template sections for evaluation" comment that previously grouped `FreightNetwork`, `Marathon`, and `Terminal`.

Navigation exposes only About, Experience, Projects, and Contact, with a mobile full-screen menu.

## Approved future section plan

ADR-007 records Julian's requested direction. This table describes planned work, not the current production page above.

| Current section | Approved direction | Ticket |
| --- | --- | --- |
| Hero | Keep; update outdated relocation/positioning copy and visual | `PORT-020` |
| About | Keep; audit and clean up information | `PORT-021` |
| Experience | Keep; update AnyTime details | `PORT-022` |
| Projects | Keep; clean up approved projects and links | `PORT-023` |
| Stats | Removed from production | `PORT-024` |
| Skills Graph | Keep; rebuild from the evidence-backed skills review | `PORT-025` |
| Freight Explainer | Removed from production | `PORT-039` |
| Journey | Removed from production | `PORT-027` |
| Now | Removed from production | `PORT-028` |
| Reading | Removed from production | `PORT-039` |
| GitHub Activity | Keep as an accountability feature after data-path repair | `PORT-030` |
| Freight Network | Removed from production | `PORT-039` |
| Marathon | Removed from production | `PORT-042` |
| Terminal | Removed from production | `PORT-042` |
| Contact | Keep; audit labels, destinations, and status copy | `PORT-034` |

## Planned shared résumé output

ADR-009 and PORT-037 define a future, not-yet-implemented capability: the typed content model from PORT-006 will feed both the portfolio and a semantic `/resume/` route plus a reproducibly generated LaTeX/PDF résumé. The HTML route and PDF will remain compatible with static GitHub Pages; the PDF viewer is an enhancement with a complete HTML fallback. No résumé route, source, generator, build command, or PDF asset exists yet.

## Fact-bearing surfaces

When personal information changes, search all of these rather than updating only the obvious card:

| Information | Current consumers |
| --- | --- |
| Name, headline, domains | `layout.tsx`, `Hero.tsx`, `Contact.tsx` |
| Status, role, location, languages | `Hero.tsx`, `About.tsx`, `Contact.tsx`, `layout.tsx` |
| Work and education | `Experience.tsx`, `About.tsx`, `layout.tsx`; upstream truth in the résumé record |
| Projects | `Projects.tsx`, `SkillsGraph.tsx` |
| Interests/activity | `About.tsx` |
| Public links | `Projects.tsx`, `Contact.tsx`, `layout.tsx` |
| Brand/typography | `layout.tsx`, `globals.css`, `Hero.tsx`, `page.tsx`, and most components |

Use `rg` for both the old value and likely variants before closing a content ticket.

## Verified review findings

These are observed code/runtime facts. Their remediation is indexed in `TICKETS.md` and specified in the linked files under `agents/ticket/`.

- The 390px hero fits, uses the hamburger navigation, and preserves both CTAs.
- PORT-002 resolved the hydration mismatch previously caused by HTML escaping differences inside rendered component `<style>` text. Component CSS now lives in the static global stylesheet with section-scoped selectors.
- Both remaining standard project links in `Projects.tsx` use `href: "#"`; the featured Stride card links to `https://strideapp.ca`. PORT-023 owns this cleanup.
- The GitHub-labelled link in `Contact.tsx` points to the portfolio URL.
- PORT-014 moved GitHub activity to a build-generated static snapshot; the browser and GitHub Pages deployment no longer require a runtime API or token.
- PORT-017 supplies a reduced-motion and print fallback for essential reveal content; the owner closed the ticket and waived its remaining interaction-accessibility scope.
- PORT-027 removed the Journey section and its responsive animation rules. Its retained work, education, and location facts remain represented in About and Experience; Journey-only “Born and raised” and “first freight internship” wording was deliberately removed rather than silently relocated.
- PORT-028 removed the Now section, its countdown logic, and its responsive rule. Retained status themes remain represented elsewhere; Now-only date/countdown, German-level, and weekly-training claims were deliberately removed from production rather than relocated.
- PORT-041 rebuilt Experience from Julian's canonical résumé record at `/home/julian/Development/resume/content/experience.md`, which is now the upstream source of truth for employment facts. It corrected several stale claims: AnyTime Technologies is renamed **Stride**; Stride runs **May 2025 – present**, not 2024; the title is **Founder & Chief Technology Officer**; Prime Freight ended **March 2026** and its "2024 – Present" was false; McGill is **expected December 2026**; McGill AI Alignment is no longer active and was removed; and the Hero's "Native EN · FR" became "Fluent EN · FR" because the record retired "native". Entries are written at the skills level rather than as itemized accomplishments, so the quantified Prime Freight metrics moved out of the timeline into `Stats`; PORT-024 has since removed `Stats`, so those figures are no longer published anywhere on the site and live only in the résumé record. The record carries binding `NOT CLAIMABLE` / `STATUS` / `ATTRIBUTION` limits — read `knowledge-base/EXPERIENCE.md` before editing any Experience copy.
- PORT-039 removed the freight identity at Julian's explicit request, and PORT-040 then restored one piece of it. What is gone: the relocation narrative — the `Montréal → Hamburg` location lines, the `YUL → HAM → SHA` hero coordinate motif, the `ping hapag-lloyd.com` terminal command, and all "incoming"/"upcoming" tense. What stands: `Prime Freight Logistics` and `Hapag-Lloyd` as factual employment records in Experience, both with domain-neutral role descriptions. Hapag-Lloyd reads "AI Hub Intern · Hamburg, Germany · May – Aug 2026" and appears in Experience only, not in the Hero, About, Terminal, or site metadata. Logistics survives as a stated interest in About and as the `Logistics & Ops` domain node in `SkillsGraph.tsx`. The freight-specific `AIS Data` and `SCFI Index` skill nodes were replaced by `Time Series`. Verified metric values in Experience and Stats were unchanged by that ticket; only their labels were generalized. `Stats` was removed later the same day by PORT-024.
- Some project-card interactions use clickable `div` elements; graph/network information is hover-oriented.
- PORT-042 removed the Marathon and Terminal sections at Julian's request, together with their dedicated CSS. Their placeholder Strava figures and simulated terminal history are no longer in production. The About card still lists marathon running as an interest, which was deliberate.
- PORT-024 removed the `Stats` section (`Impact`, `#stats`) at Julian's request, resolving RQ-011 as **remove**. Its six counters and the before/after automation chart are gone, along with the `#stats` grid rules and the `@media (max-width: 480px)` block that held only Stats rules. The underlying Prime Freight figures were never withdrawn as facts — they remain in the résumé record and are simply unpublished.
- PORT-044 reduced the `Contact.tsx` footer to `© 2026 Julian Patterson` and removed the `OpenClaw` project card. The deleted footer line claimed "Deployed on Vercel", which contradicted ADR-005 and the actual GitHub Pages workflow. The Projects card grid is now `repeat(2, 1fr)` to match the two remaining cards.
- **The site is not deployed.** `main` is still on Hugo commits and `https://julian-patterson.github.io/` serves the old Hugo build; `/data/github-activity` returns 404 there. This entire Next.js codebase lives on the `remove-hugo-update` branch and the Pages workflow has never run against it.
- `package-lock.json` and `yarn.lock` both exist while CI uses npm.

## Historical material

- `redesign.md` and `edits/` are design history.
- `TODO` is the imported raw backlog and becomes a pointer after migration.
- Tool-specific instruction files are compatibility shims, not independent policy.
