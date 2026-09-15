# PORT-047 — Add device-aware dark mode

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

The portfolio currently publishes a single warm light palette. Julian asked for a dark mode, an icon control to change it, and device color-scheme preference to remain the default.

## Scope

- Add a complete dark palette through the existing CSS token system, including navigation, cards, borders, activity colors, tooltips, and the D3 skills graph.
- Default to `prefers-color-scheme` when no explicit visitor preference exists.
- Add one always-visible 44px Carbon moon/sun control in the navigation, immediately before the mobile menu button at narrow widths.
- Persist only an explicit light/dark choice in local storage and restore it before first paint without a hydration mismatch.
- Keep print output light and leave all site content, section composition, typography, and animation behavior unchanged.

## Acceptance criteria

- [x] A first visit follows the device light/dark setting without storing an override.
- [x] The navigation icon switches the resolved theme, exposes the correct accessible action label, and persists the explicit choice across reloads.
- [x] Light and dark themes cover all seven sections, including initialized SVG/chart states, mobile overlay, scrolled navigation, selection, and focus.
- [x] The control is keyboard-operable, has a visible focus state, and retains a 44px touch target at every width.
- [x] No opposite-theme first-paint flash or hydration/browser console warning is introduced.
- [x] Print remains light and static export/GitHub Pages compatibility is preserved.
- [x] Relevant brand, decision, ticket, and site documentation is synchronized.
- [x] Typecheck, lint, build, diff checks, and targeted browser checks pass.

## Validation record

- `npm run check`: passed (`docs:check` and TypeScript).
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed and exported all six static routes/pages.
- `git diff --check`: passed.
- Production-export browser checks covered fresh device-default dark mode, saved light and dark overrides, reload persistence, the mobile menu overlay, scrolled navigation, and a D3 graph already initialized before switching themes.
- Exact-width checks at 320, 375, 768, 1024, and 1440px found no horizontal overflow; the control remained 44px square and the navigation changed layouts at the intended breakpoint.
- Keyboard testing confirmed a visible two-pixel focus ring and Enter-key activation. Normal page loads produced no browser console warnings or errors.
- Export inspection confirmed the saved-preference bootstrap appears in the document head, no default theme attribute is baked into the HTML, and print CSS forces the light palette while hiding the toggle.

## Outcome

Added a device-aware light/dark token system and an always-visible Carbon moon/sun control. A first visit remains on the operating-system preference without creating storage; an explicit selection is restored before first paint and recolors the entire live page, including SVG and activity states. The implementation remains fully compatible with the static GitHub Pages export.
