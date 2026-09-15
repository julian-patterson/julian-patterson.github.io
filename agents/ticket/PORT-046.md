# PORT-046 — Stabilize and space the Hero name

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

The Hero renders each character of Julian's name as an independently transformed span. On mount, `LetterExplosion.tsx` scatters those spans by up to 300 pixels horizontally and 200 pixels vertically before dropping them into place. Julian asked to remove that arrival effect and give the full name more breathing room.

## Scope

- Render `Julian Patterson.` as stable text from the first paint, without per-character wrappers or transforms.
- Open the name's tracking and add a modest gap between its two lines.
- Preserve the navy terminal period, responsive type scale, Hero copy, calls to action, and smaller section-kicker scramble.
- Remove the now-unused `LetterExplosion` component and its global `.char` styling.
- Keep the supporting Hero content's existing subtle reveal, independent of the name.

## Acceptance criteria

- [x] The full name is visible immediately and no character flies, falls, rotates, or fades into place.
- [x] The name has visibly more letter and line spacing while fitting at 320px and larger widths.
- [x] The Hero has a correct accessible heading name and respects reduced motion.
- [x] No dead `LetterExplosion` import, component, or `.char` rule remains.
- [x] Relevant brand, decision, ticket, and site documentation is synchronized.
- [x] Typecheck, lint, build, diff checks, and targeted browser checks pass.

## Validation record

Run on 2026-09-15:

- `npm run check`: passed (`docs:check` and TypeScript).
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; six static pages/routes generated.
- `git diff --check`: passed.
- Source/export scan: the Hero contains static `Julian` and `Patterson.` spans; no `LetterExplosion` component, import, `.char` element, or `.char` CSS rule remains in `src/`.
- Browser QA against the production export at exact 320px and 1440px iframe viewports: both widths had `0px` horizontal overflow, the heading's accessible name was `Julian Patterson.`, both CTA buttons stayed in a single 24px-high row, and browser logs contained no warning or error.
- Static-name DOM check at both widths: zero character wrappers, heading opacity `1`, transform `none`, and line transforms `none`. At 320px, the 52px `Patterson.` line measured 241.14px; at 1440px, the 96px line measured 445.19px.
- Visual QA at the narrow browser viewport confirmed the opened letter spacing, added line gap, static navy period, and intact supporting layout.

## Outcome

The Hero name now renders immediately as stable two-line text. Tracking moved from `-0.055em` to `-0.025em`, and a `0.08em` gap separates the two name lines. The per-character explosion component and styling are deleted, while the selected section-kicker scramble and subtle supporting-content reveal remain.

Changed paths: `src/components/Hero.tsx`, `src/components/LetterExplosion.tsx` (deleted), `src/app/globals.css`, `agents/DECISIONS.md`, `agents/SITE.md`, `agents/TICKETS.md`, `agents/knowledge-base/BRAND.md`, and `agents/ticket/{PORT-020,PORT-046}.md`.
