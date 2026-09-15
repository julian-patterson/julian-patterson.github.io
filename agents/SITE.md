# Current website map and review

Last synchronized from code and runtime: 2026-09-15 (PORT-052)

The source under `src/` is authoritative. This file is a navigational map and audit record, not a replacement for reading the relevant code.

## Stack and deployment

- Next.js 14.2.35, App Router, React 18, TypeScript strict mode
- Tailwind CSS 3 plus extensive inline styles
- GSAP/ScrollTrigger animation, D3 skills visualization, Carbon icons
- `next.config.mjs` sets `output: "export"`, `trailingSlash: true`, and an environment-selectable `distDir`
- `npm run dev` writes `.next-dev/`; `npm run build` keeps the standard `.next/` → `out/` path, preventing concurrent development and production artifacts from corrupting one another
- `.eslintrc.json` enables Next.js Core Web Vitals linting with matching ESLint 8 and `eslint-config-next` 14 packages in the npm dependency state
- `.github/workflows/nextjs.yml` builds with Node 20/npm and deploys `out/` to GitHub Pages
- The Pages build passes its repository-scoped automatic `GITHUB_TOKEN` only to the static build. **This token cannot answer the contribution-calendar query** the activity route makes, which is user-scoped data needing `read:user`; PORT-043 records the diagnosis and the owner steps. No personal token is currently configured, and none is published
- `src/app/layout.tsx` uses the bundled Geist variable font for display/body text and Space Mono through `next/font/google` for labels and metadata
- The visual system selectively uses Carbon icons, a 2x spacing rhythm, square geometry, a Carbon-blue focus ring, and productive motion timing without importing the full Carbon React library
- The visual token system supports light and dark palettes; device preference is the default and the navigation exposes a persisted explicit override

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

PORT-045 branch reconciliation on 2026-09-15:

- Merges `origin/updated-font` into `remove-hugo-update` while retaining the latter's current copy, seven-section composition, work history, project set, and removals.
- Applies Geist/Space Mono typography, selected accessible scramble labels, Carbon-inspired focus/selection/motion tokens, Hero and Contact heading refinements, and the `#top` navigation target.
- Standard project cards no longer open `#` in a new tab; they remain visible with non-interactive pending-link labels. The verified Stride link remains unchanged.
- Validation results are recorded in PORT-045.

PORT-046 Hero-name refinement on 2026-09-15:

- Replaces the randomized per-character name assembly with static `Julian Patterson.` text that is visible from first paint.
- Opens the tracking from `-0.055em` to `-0.025em` and adds a `0.08em` gap between the two name lines while retaining the responsive 52–96px scale and navy period.
- Deletes the unused `LetterExplosion` component and `.char` CSS. The selective section-kicker scramble and the supporting Hero content reveal remain.
- Production-export browser checks at exact 320px and 1440px widths found no horizontal overflow, no browser warnings/errors, and a stable accessible Hero heading.

PORT-047 color-theme support on 2026-09-15:

- Defines complete light and dark palettes in `globals.css`; first visits follow `prefers-color-scheme` without storing a preference.
- Adds one 44px moon/sun button to the navigation. An explicit light or dark choice is stored locally and a small head script restores it before first paint.
- Navigation surfaces, project borders, activity states and tooltip, selection/focus treatment, and the initialized D3 skills graph all resolve through live theme tokens. Print always uses the light palette and omits the toggle.
- Production-export checks covered both themes, saved and unsaved states, keyboard activation, mobile navigation, scrolled navigation, an initialized graph, and exact widths from 320px through 1440px with no horizontal overflow or normal-page browser warnings/errors.

PORT-048 Hero contact links on 2026-09-15:

- Adds one labelled row beneath the Hero calls to action with 44px Carbon icons for GitHub, email, LinkedIn, and phone, in that order.
- GitHub and LinkedIn reuse the Contact section's verified profiles and open in safe new tabs. Email reuses the public iCloud address; phone uses the owner-approved `tel:+15149291119` destination from the canonical résumé contact record.
- The row uses existing theme, hover, focus, supporting-content reveal, and reduced-motion behavior. Exact-width production checks from 320px through 1440px found no wrapping or horizontal overflow in either theme.

PORT-049 project repository links on 2026-09-15:

- Replaces the Transfer CLI and IoT LED Controller `Public link pending` labels with explicit repository actions using the exact owner-approved GitHub URLs.
- Adds one `View more on GitHub` action beneath the standard-card grid, linking to Julian's public GitHub profile. All three actions use descriptive accessible names, safe new-tab attributes, visible shared focus treatment, and 44px minimum heights.
- Production-export checks covered keyboard order, both themes, exact widths at 320px, 375px, 768px, 1024px, and 1440px, and the browser console; layouts had no horizontal overflow or normal-page warning/error.

PORT-050 Skills Graph inventory on 2026-09-15:

- Replaces the graph data with Julian's exact 37-skill inventory: 7 Languages, 9 Data & ML, 10 Infrastructure, 5 Frontend, and 6 Domain nodes.
- All nodes use equal visual weight; 57 intentional relationship edges form one connected graph and do not represent proficiency. Every node remains present on mobile.
- Long labels wrap at word boundaries. Desktop collision radii account for their width and tick positions are clamped inside the SVG; compact widths use stable category-aware rows in a container-width viewBox. A complete hidden text description exposes every category and label to assistive technology; legend buttons declare their pressed state.
- Fresh production-export checks in both themes at 320px, 375px, 768px, 1024px, and 1440px found all 37 unique nodes, exact category counts, no clipped or overlapping text boxes, no horizontal overflow, working keyboard legend filtering/focus, live theme-token updates, and no browser warning/error. The final narrow-layout matrix measured a minimum label-line height of about 14px at 320px; the active Languages filter remained at 7 active / 30 muted nodes after node hover and leave.
- Background drag-to-pan now matches the graph hint. With reduced motion requested, the desktop simulation settles synchronously, node dragging is disabled, and edges appear without a D3 transition.

PORT-051 Hero and interaction refinement on 2026-09-15:

- Simplifies the Hero to its static name, introduction, four-link contact row, and one `View my work` button. The Hero-only final-year sentence, Montréal/time and language pills, and `Get in touch` action are removed; the approved status, location, and language facts remain in About and Experience.
- Places the contact row directly after the introduction and gives the work button the row's exact 200px rendered width. All five controls retain 44px minimum targets.
- Adds a labelled `Recenter` toolbar control above the Skills Graph. Mouse, keyboard, and double-click resets use the same D3 zoom behavior, preserve active legend filters, and skip the reset transition for reduced motion.
- Applies the accessible section-kicker scramble to all seven sections and delays playback until a real viewport-entry transition after the observer's initial sample. Reduced-motion rendering remains static.
- Removes the theme toggle's resting and hover box while preserving its transparent 44px target, live action label, and visible keyboard focus ring.
- Production-export checks covered both themes at exact 320px, 375px, 768px, 1024px, and 1440px widths, Hero ordering and equal widths, graph reset by mouse and keyboard, selected-filter retention, scroll-entry scramble samples, accessible kicker text, theme switching/focus, horizontal overflow, and the browser console.

PORT-052 metro divider and GraphQL amendment on 2026-09-15:

- Adds one decorative `MetroDivider` between About and Experience and removes Experience's redundant straight top rule. The desktop graphic uses one navy angular route, three square stations, and a brass interchange; compact widths use a shorter two-station route.
- The route draws and stations reveal once on viewport entry. Its completed state is authored by default, reduced motion skips setup, and print forces the static final state, preserving no-JavaScript and non-animated rendering.
- The divider uses existing theme tokens, adds no section or anchor, is absent from the accessibility tree, and keeps both SVG variants non-focusable.
- Adds GraphQL as the eleventh equal-weight Infrastructure skill with a direct strong PostgreSQL edge. The current graph has 38 nodes and 58 edges in one connected component, split 7 / 9 / 11 / 5 / 6 across the five categories.
- Validation passed typecheck, lint, production build, agent-system docs, diff, graph-data, static-export, responsive-source, and accessibility-source checks; the local development route returned HTTP 200.

## Page composition

`src/app/page.tsx` mounts 7 sections in this order:

| Order | Component | Anchor | Purpose/status in current code |
| --- | --- | --- | --- |
| 1 | `Hero` | top | Static two-line name, headline, introduction, direct contact/profile icon links, and one project-navigation button |
| 2 | `About` | `#about` | Bio and personal metadata |
| 3 | `Experience` | `#experience` | Work and education timeline; four entries ordered Hapag-Lloyd, Stride, Prime Freight, McGill |
| 4 | `Projects` | `#projects` | Featured Stride card plus two repository-linked project cards in a two-column grid and a section-level GitHub browse action |
| 5 | `SkillsGraph` | `#skills` | Interactive D3 graph of 38 equal-weight skills in five owner-approved categories, with an accessible text description, keyboard legend filters, and an explicit recenter control |
| 6 | `GitHubActivity` | `#activity` | Contribution heatmap backed by a sanitized build-time snapshot at `/data/github-activity`; currently renders the "unavailable" state — see PORT-043 |
| 7 | `Contact` | `#contact` | Email, LinkedIn, GitHub-labelled URL, footer |

PORT-024 removed `Stats` (`#stats`) along with its dedicated CSS. PORT-039 removed `FreightExplainer` (`#research`), `FreightNetwork` (`#freight-network`), and `Reading` (`#reading`) along with their dedicated CSS. `page.tsx` no longer carries the "template sections for evaluation" comment that previously grouped `FreightNetwork`, `Marathon`, and `Terminal`.

Navigation exposes only About, Experience, Projects, and Contact, with a mobile full-screen menu.

`MetroDivider` is a decorative, non-section interstitial mounted between About and Experience; it does not change the seven-section count or navigation structure.

## Approved future section plan

ADR-007 records Julian's requested direction. This table describes planned work, not the current production page above.

| Current section | Approved direction | Ticket |
| --- | --- | --- |
| Hero | Keep; update outdated relocation/positioning copy and visual | `PORT-020` |
| About | Keep; audit and clean up information | `PORT-021` |
| Experience | Keep; update AnyTime details | `PORT-022` |
| Projects | Keep; clean up approved projects and links | `PORT-023` |
| Stats | Removed from production | `PORT-024` |
| Skills Graph | Exact inventory implemented by PORT-050; broader evidence and interaction audit remains | `PORT-010`, `PORT-025` |
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
| Status, role, location, languages | `About.tsx`, `Experience.tsx`, `Contact.tsx`, `layout.tsx` |
| Work and education | `Experience.tsx`, `About.tsx`, `layout.tsx`; upstream truth in the résumé record |
| Projects | `Projects.tsx` |
| Skills | `SkillsGraph.tsx`; supporting context in `Experience.tsx`, `Projects.tsx`, and `knowledge-base/SKILLS.md` |
| Interests/activity | `About.tsx` |
| Public links and contact details | `Hero.tsx`, `Projects.tsx`, `Contact.tsx`, `layout.tsx` |
| Brand/typography | `layout.tsx`, `globals.css`, `Hero.tsx`, `page.tsx`, and most components |

Use `rg` for both the old value and likely variants before closing a content ticket.

## Verified review findings

These are observed code/runtime facts. Their remediation is indexed in `TICKETS.md` and specified in the linked files under `agents/ticket/`.

- The Hero fits supported widths, uses the hamburger navigation on compact screens, and presents the four direct-contact links above one width-matched `View my work` button.
- PORT-002 resolved the hydration mismatch previously caused by HTML escaping differences inside rendered component `<style>` text. Component CSS now lives in the static global stylesheet with section-scoped selectors.
- The featured Stride card links to `https://strideapp.ca`; Transfer CLI links to `https://github.com/julian-patterson/transfer-cli`; IoT LED Controller links to `https://github.com/patterson-project/custom-led-controller`; and the section-level browse action links to Julian's GitHub profile. PORT-023 still owns the broader project-content cleanup.
- The GitHub-labelled link in `Contact.tsx` points to Julian's GitHub profile.
- PORT-014 moved GitHub activity to a build-generated static snapshot; the browser and GitHub Pages deployment no longer require a runtime API or token.
- PORT-017 supplies a reduced-motion and print fallback for essential reveal content; the owner closed the ticket and waived its remaining interaction-accessibility scope.
- PORT-027 removed the Journey section and its responsive animation rules. Its retained work, education, and location facts remain represented in About and Experience; Journey-only “Born and raised” and “first freight internship” wording was deliberately removed rather than silently relocated.
- PORT-028 removed the Now section, its countdown logic, and its responsive rule. Retained status themes remain represented elsewhere; Now-only date/countdown, German-level, and weekly-training claims were deliberately removed from production rather than relocated.
- PORT-041 rebuilt Experience from Julian's canonical résumé record at `/home/julian/Development/resume/content/experience.md`, which is now the upstream source of truth for employment facts. It corrected several stale claims: AnyTime Technologies is renamed **Stride**; Stride runs **May 2025 – present**, not 2024; the title is **Founder & Chief Technology Officer**; Prime Freight ended **March 2026** and its "2024 – Present" was false; McGill is **expected December 2026**; McGill AI Alignment is no longer active and was removed; and the former Hero language tag became "Fluent EN · FR" because the record retired "native". PORT-051 later removed that duplicate Hero tag; About retains the public language claim. Entries are written at the skills level rather than as itemized accomplishments, so the quantified Prime Freight metrics moved out of the timeline into `Stats`; PORT-024 has since removed `Stats`, so those figures are no longer published anywhere on the site and live only in the résumé record. The record carries binding `NOT CLAIMABLE` / `STATUS` / `ATTRIBUTION` limits — read `knowledge-base/EXPERIENCE.md` before editing any Experience copy.
- PORT-039 removed the freight identity at Julian's explicit request, and PORT-040 then restored one piece of it. What is gone: the relocation narrative — the `Montréal → Hamburg` location lines, the `YUL → HAM → SHA` hero coordinate motif, the `ping hapag-lloyd.com` terminal command, and all "incoming"/"upcoming" tense. What stands: `Prime Freight Logistics` and `Hapag-Lloyd` as factual employment records in Experience, both with domain-neutral role descriptions. Hapag-Lloyd reads "AI Hub Intern · Hamburg, Germany · May – Aug 2026" and appears in Experience only, not in the Hero, About, Terminal, or site metadata. Logistics remains a stated interest in About. PORT-050 adds `Freight Forwarding & Container Logistics` as a narrowly owner-approved graph capability without restoring freight-led identity; `Logistics & Ops` and `Time Series` are no longer graph nodes, while `AIS Data` and `SCFI Index` remain absent. Verified metric values in Experience and Stats were unchanged by PORT-039; only their labels were generalized. `Stats` was removed later the same day by PORT-024.
- Standard project cards remain semantic `article` elements with explicit repository anchors rather than whole-card link behavior. The skills graph exposes every node through a complete accessible description, keyboard legend filters, and a keyboard-operable viewport reset; neighbor highlighting and node dragging remain pointer-oriented pending PORT-010/PORT-025's broader interaction audit.
- PORT-052's current Skills Graph has 38 unique, equal-weight nodes across the amended owner-approved 7/9/11/5/6 category split. Its 58 valid edges form one connected component with no orphan node; GraphQL has the requested direct strong relationship to PostgreSQL.
- PORT-042 removed the Marathon and Terminal sections at Julian's request, together with their dedicated CSS. Their placeholder Strava figures and simulated terminal history are no longer in production. The About card still lists marathon running as an interest, which was deliberate.
- PORT-024 removed the `Stats` section (`Impact`, `#stats`) at Julian's request, resolving RQ-011 as **remove**. Its six counters and the before/after automation chart are gone, along with the `#stats` grid rules and the `@media (max-width: 480px)` block that held only Stats rules. The underlying Prime Freight figures were never withdrawn as facts — they remain in the résumé record and are simply unpublished.
- PORT-044 reduced the `Contact.tsx` footer to `© 2026 Julian Patterson` and removed the `OpenClaw` project card. The deleted footer line claimed "Deployed on Vercel", which contradicted ADR-005 and the actual GitHub Pages workflow. The Projects card grid is now `repeat(2, 1fr)` to match the two remaining cards.
- **The site is not deployed.** `main` is still on Hugo commits and `https://julian-patterson.github.io/` serves the old Hugo build; `/data/github-activity` returns 404 there. This entire Next.js codebase lives on the `remove-hugo-update` branch and the Pages workflow has never run against it.
- `package-lock.json` and `yarn.lock` both exist while CI uses npm.

## Historical material

- `redesign.md` and `edits/` are design history.
- `TODO` is the imported raw backlog and becomes a pointer after migration.
- Tool-specific instruction files are compatibility shims, not independent policy.
