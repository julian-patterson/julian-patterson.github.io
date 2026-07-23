# PORT-017 — Add reduced-motion and interaction accessibility

- Status: Done
- Priority: P1
- Source: audit finding
- Depends on: none
- Owner: Codex
- Started: 2026-07-24
- Completed: 2026-07-24

## Progress note — 2026-07-24

Owner-supplied print/PDF evidence showed that reveal targets authored with inline `opacity: 0` remained invisible outside the normal ScrollTrigger path. The immediate regression fix makes essential content visible by default and adds print/reduced-motion safeguards before the remaining interaction-accessibility criteria are addressed.

The same pass repaired the Experience timeline geometry reported in desktop and mobile screenshots: the rule and markers now occupy one shared grid column, while the mobile content occupies a separate column so the rule cannot cross the text.

## Acceptance criteria

- [x] `prefers-reduced-motion` produces readable, stable content without mandatory entrance effects.
- [x] Essential content remains visible if GSAP or integration data fails.
- [ ] Clickable cards use semantic controls/links and visible focus.
- [ ] Hover-only graph/network/tooltips have keyboard/touch equivalents or noninteractive fallbacks.
- [ ] Automated checks plus keyboard, screen-reader-oriented semantics, and reduced-motion manual checks are recorded.

## Validation record

- `npm run check`: passed on 2026-07-24.
- `npm run build`: passed on 2026-07-24; the static export completed successfully.
- `git diff --check`: passed on 2026-07-24.
- Development browser at 601px: all four Experience markers measured at exactly the rule center, document overflow was `0px`, and no warning/error was logged.
- Production-export browser at 601px: repeated the exact marker/line alignment with `0px` overflow and no warning/error.
- Visual mobile browser review confirmed the rule remains in its own gutter beside dates, headings, tags, and wrapped bullet text.
- Desktop coordinate audit confirmed that both the rule and every marker derive from the same timeline grid column; broader keyboard, touch, and screen-reader-oriented validation remains open.

## Outcome

Closed at the owner's request. The reduced-motion, print, essential-content visibility, and Experience timeline repairs remain implemented. The unchecked semantic-control, keyboard/touch, and screen-reader-oriented criteria were explicitly waived and are not claimed as implemented.

Changed production paths: `src/app/globals.css`, `src/lib/animations.ts`, and the reveal-bearing components under `src/components/`. Synchronized documentation: `agents/SITE.md`, `agents/TICKETS.md`, and this ticket file.
