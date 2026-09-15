# PORT-051 — Refine Hero and section interactions

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

Julian requested a tighter Hero action hierarchy, a visible way to restore the Skills Graph viewport, scroll-timed section-label scrambles, and a borderless theme switch. The Hero request names the `Final year, McGill University.` line as both a placement reference and content to delete; the coherent final state is to remove that Hero-only line and place the contact row directly beneath the remaining introduction. The same facts remain on their other approved site surfaces.

## Scope

- Remove the Hero's final-year line, Montréal clock/location pill, language pill, and `Get in touch` control.
- Put the GitHub, email, LinkedIn, and phone links directly beneath the remaining Hero introduction, followed by a full-width `View my work` button matching the four-link row width.
- Add a keyboard-accessible Skills Graph recenter control that resets the existing D3 zoom state and respects reduced motion without clearing a category filter.
- Make every section kicker use the existing accessible text scramble and trigger it on a real viewport-entry transition rather than its initial observer sample.
- Remove the visual border/background box from the navigation theme toggle while preserving its 44px target, accessible action label, and focus ring.
- Synchronize active ticket notes, the site map, profile/brand records, and durable UI decisions.

## Acceptance criteria

- [x] The Hero contains the stable name, one introduction, four direct contact links, and one `View my work` button in that order; removed Hero copy and controls are absent.
- [x] The four-link row and work button have the same rendered width, every control keeps at least a 44px target, and layouts do not overflow at supported widths.
- [x] A labelled graph control restores `.zoom-g` to the D3 identity transform by mouse and keyboard, preserves active filters, and skips transition animation for reduced motion.
- [x] Hero, About, Experience, Projects, Skills, Activity, and Contact kickers retain static accessible text and scramble only after a qualifying viewport-entry transition; reduced-motion users see stable text.
- [x] The theme toggle has no resting or hover border/background box, remains 44px square, and keeps visible keyboard focus and correct theme behavior.
- [x] Typecheck, lint, build, docs, diff, static-export, responsive, theme, interaction, accessibility, and browser-console checks pass.

## Validation record

- `npm run check`: passed (`docs:check` found 50 tickets, 21 active tickets during implementation, 19 decisions, and 7 page components; TypeScript passed).
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; the static export generated all six routes and `/` remained 79.8 kB / 167 kB first load.
- `git diff --check`: passed. The static export contains the new Hero work action, both previously approved repository URLs, and the labelled graph control; removed Hero strings are absent from `Hero.tsx`.
- Production-export browser checks in light and dark themes at exact widths of 320px, 375px, 768px, 1024px, and 1440px found four 44×44px Hero links, a 200px link row, a matching 200×44px work button, a 44px-high graph control above its SVG, a transparent borderless 44×44px theme toggle, correct content order, and no horizontal overflow.
- The recenter button remained enabled with `tabIndex=0` before graph initialization; focusing and pressing Space initialized the graph synchronously and returned `.zoom-g` to `translate(0,0) scale(1)`. Mouse and keyboard resets preserved the active Languages filter at 7 active / 30 muted nodes. Keyboard theme activation changed the resolved palette and retained a visible 2px focus outline with 3px offset.
- Scroll sampling observed `About` and `Skills` scramble through intermediate glyph states only as their kickers entered view. The DOM exposed seven stable `.sr-only` labels in page order and the initial Hero kicker stayed readable; source inspection confirmed the stable early return for reduced motion and the non-transitioning graph reset path.
- The browser console contained no warnings or errors.

## Outcome

The Hero now presents one concise action stack, the graph has a discoverable state-safe reset, all section kickers save their scramble for viewport entry, and the theme control is visually unboxed without losing accessibility treatment.

## Changed paths

- `src/components/Hero.tsx`
- `src/components/TextScramble.tsx`
- `src/components/SkillsGraph.tsx`
- `src/components/GitHubActivity.tsx`
- `src/app/globals.css`
- `agents/DECISIONS.md`
- `agents/SITE.md`
- `agents/knowledge-base/BRAND.md`
- `agents/knowledge-base/PROFILE.md`
- `agents/ticket/PORT-009.md`
- `agents/ticket/PORT-020.md`
- `agents/ticket/PORT-025.md`
- `agents/ticket/PORT-051.md`
- `agents/TICKETS.md`
