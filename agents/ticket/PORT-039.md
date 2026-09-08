# PORT-039 — Remove freight and relocation content from the website

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-07 — remove all freight content and any information about moving to Hamburg, keep a stated interest in logistics, and remove the research components
- Depends on: none
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Context

The site positioned Julian as a freight specialist and announced a May 2026 relocation to Hamburg for a Hapag-Lloyd internship. Julian is no longer applying to freight-specific roles and asked for the identity, the relocation announcement, and the research sections to be removed. Freight and Hamburg copy was spread across `layout.tsx`, `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Stats.tsx`, `SkillsGraph.tsx`, `Terminal.tsx`, `Contact.tsx`, `globals.css`, and the dedicated `FreightExplainer`, `FreightNetwork`, and `Reading` components.

This ticket implements the direction already recorded in `knowledge-base/BRAND.md` and PORT-005 (freight as supporting expertise, not the site identity) at the owner's explicit instruction, without resolving the remaining PORT-005 brand questions.

## Scope

Changes:

- Removes `FreightExplainer`, `FreightNetwork`, and `Reading` components, their `page.tsx` mounts, and their dedicated CSS.
- Removes every Hamburg, Hapag-Lloyd, and relocation claim, including the upcoming-role Experience entry and the `YUL → HAM → SHA` hero coordinate motif.
- Rewrites freight-specific copy in metadata, Hero, About, Experience, Stats, Skills, Terminal, and Contact as domain-neutral engineering copy that keeps logistics as a stated interest.
- Promotes AnyTime Technologies to the featured Projects card and lays the three remaining cards out in a single row.

Deliberately unchanged:

- The `Prime Freight Logistics` employer name, which is a factual employment record; only its role description was made domain-neutral.
- Every verified metric value in Experience and Stats; only their labels changed.
- The placeholder `href="#"` project links, which remain PORT-012's scope.
- Marathon, GitHub Activity, and the Terminal section's structure.

## Acceptance criteria

- [x] No freight, shipping, Hamburg, or Hapag-Lloyd claim remains in `src/` or the static export, apart from the factual `Prime Freight Logistics` employer name.
- [x] The research-oriented sections (`FreightExplainer`, `FreightNetwork`) and the freight-dominated `Reading` section are removed with their CSS.
- [x] The site still states an interest in logistics.
- [x] `SITE.md` and the knowledge base match the resulting code.
- [x] Typecheck, static build, and responsive/console checks recorded below.

## Validation record

Run on 2026-09-07:

- `npm run clean && npx tsc --noEmit`: passed. (Before cleaning, `tsc` reported two stale `.next/types/app/api/github/route.ts` errors left over from the route PORT-014 removed; a clean cache resolved them.)
- `npm run build`: passed; static export regenerated with 3 static routes.
- `npm run docs:check`: passed.
- `npm run lint`: not run — it opens Next.js's interactive ESLint setup, which PORT-016 waived.
- `grep -oiE "freight|hamburg|hapag|suez|scfi|drewry|AIS Data|container" out/index.html`: only `Freight Logistics` remains, from the employer name.
- Static export served locally and inspected at 375, 768, 1024, and 1440 CSS pixels: no horizontal overflow at any width; the Projects grid is three columns at 1024/1440 and one column at 768/375; About, Stats, and Marathon grids collapse as before.
- Browser console: no errors and no hydration warnings; only the pre-existing `next/font` preload warnings. All network requests returned 200/304.
- Terminal sidebar labels remain unique after replacing the `ping hapag-lloyd.com` command with `less status.txt`.
- Not verified in this environment: the `LetterExplosion` hero tween does not settle in the automation browser (1 of 16 characters reach their final transform), which reproduces the pre-existing PORT-009 re-entry behavior and is unrelated to this ticket's changes.

## Outcome

Freight is no longer the site's identity and the relocation announcement is gone. Logistics survives as a stated interest in About and as the `Logistics & Ops` domain node in the skills graph.

Changed paths: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/Hero.tsx`, `src/components/About.tsx`, `src/components/Experience.tsx`, `src/components/Projects.tsx`, `src/components/Stats.tsx`, `src/components/SkillsGraph.tsx`, `src/components/Terminal.tsx`, `src/components/Contact.tsx`; deleted `src/components/FreightExplainer.tsx`, `src/components/FreightNetwork.tsx`, `src/components/Reading.tsx`.
