# PORT-039 — Polish typography and prepare the Next.js portfolio release

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-14
- Depends on: none
- Required approvals: none for visual-system and release-safety work; current profile facts remain governed by RQ-001, RQ-006, and RQ-007
- Owner: Codex
- Started: 2026-09-14
- Completed: 2026-09-14

## Context

The owner wants to finalize the `remove-hugo-update` branch for publication, move toward a grotesque/monospaced typography system, add a restrained split-flap/text-scramble treatment, reuse strong experience detail from `main`, and incorporate appropriate parts of Carbon Design System.

The branch already uses Carbon icons and a 2x spacing scale, but still uses DM Serif Display/DM Sans/DM Mono. It also contains release-facing placeholder links and inaccurate deployment copy. Commercial fonts named as references must not be added without licensed font files.

## Scope

- Use the bundled Geist grotesque for display/body roles and Space Mono for metadata/code roles.
- Add an accessible, reduced-motion-safe text scramble for selected section labels.
- Refine shared Carbon-inspired focus, grid, border, and interaction tokens without adopting the full Carbon React library.
- Carry forward useful, already-public experience detail from `main` without changing unresolved dates, statuses, or titles.
- Remove or correct obvious release placeholders whose destinations are already verified from repository configuration.
- Record unresolved personal facts and content choices as release blockers rather than guessing.

## Acceptance criteria

- [x] Typography uses licensed/redistributable sources and preserves clear display, body, and mono roles.
- [x] Scramble text is readable in server markup, replays on viewport re-entry, and respects reduced motion.
- [x] Carbon-inspired interactions have visible focus and semantic link/control behavior.
- [x] No project link ships as `href="#"`; unavailable destinations render as non-links.
- [x] Stable experience detail reused from `main` does not change unresolved personal facts.
- [x] Relevant knowledge base, decisions, tickets, and `SITE.md` are synchronized.
- [x] Type, docs, build, diff, and targeted responsive/browser checks are recorded.

## Validation record

- `npm run check`: passed.
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; six static pages/routes generated.
- `git diff --check`: passed.
- Browser QA: 320, 375, 768, 1024, and 1440 CSS pixels had zero horizontal overflow, visible Hero content, and no browser warnings/errors.
- `npm audit --omit=dev`: reports 3 production dependency advisories (2 high, 1 critical) against the pinned Next.js 14 tree; GitHub Pages consumes only the static export, and a framework-major migration is out of scope.

## Outcome

Replaced the serif/DM typography with Geist and Space Mono; added accessible, replaying scramble labels; strengthened Carbon-inspired interaction tokens; generalized Hero/About copy; carried stable experience detail forward from `main`; removed stale relocation and speculative internship claims; converted placeholder project actions to honest non-links; corrected the GitHub and deployment labels; cleaned the Terminal summary; and configured deterministic linting.

Changed paths: `.eslintrc.json`, `package.json`, `package-lock.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/{About,Contact,Experience,FreightNetwork,Hero,Nav,Projects,Terminal,TextScramble}.tsx`, `agents/DECISIONS.md`, `agents/SITE.md`, `agents/TICKETS.md`, and relevant `agents/knowledge-base/*.md` files.
