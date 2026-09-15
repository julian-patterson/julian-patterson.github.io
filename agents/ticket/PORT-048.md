# PORT-048 — Add contact icon links to the Hero

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

The Hero currently offers section-navigation calls to action but no direct profile or contact destinations. Julian requested icon links for GitHub, email, LinkedIn, and his phone number. The first three destinations are already public in `Contact.tsx`; the phone value is consistent across the canonical résumé record and Julian explicitly requested its publication here.

## Scope

- Add a compact row of Carbon GitHub, email, LinkedIn, and phone icon links within the Hero.
- Reuse the exact public GitHub, email, and LinkedIn destinations already present in the Contact section.
- Publish the verified résumé phone value as a normalized `tel:` destination and mirror that approved contact fact into `knowledge-base/PROFILE.md`.
- Give every icon-only link an explicit accessible name, a 44px target, theme-aware interaction states, and correct external-link behavior.
- Preserve the current Hero name, copy, tags, calls to action, and animation behavior.

## Acceptance criteria

- [x] The Hero exposes exactly four contact links in this order: GitHub, email, LinkedIn, phone.
- [x] GitHub and LinkedIn use the existing verified HTTPS destinations and safe new-tab attributes; email and phone use correct `mailto:` and normalized `tel:` destinations without forcing a new tab.
- [x] Each icon-only link has an accurate accessible name, decorative SVG, visible focus, and a minimum 44px touch target.
- [x] The row fits without clipping or horizontal overflow from 320px through desktop widths in light and dark themes.
- [x] Existing Hero content, CTA behavior, static name treatment, and reduced-motion behavior remain intact.
- [x] Profile, decision, ticket, and site documentation is synchronized.
- [x] Typecheck, lint, build, diff checks, link inspection, and targeted browser checks pass.

## Validation record

- `npm run check`: passed (`docs:check` and TypeScript).
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed and generated all six static pages.
- `git diff --check`: passed.
- Static-export inspection found exactly four `.hero-contact-link` anchors with the expected HTTPS, `mailto:`, and `tel:` destinations. Only GitHub and LinkedIn have `target="_blank"`, both with `rel="noopener noreferrer"`.
- Production-export accessibility inspection exposed a labelled `Contact links` group and accurate names for all four icon-only anchors. The SVGs are decorative.
- Keyboard testing confirmed the logical GitHub → email → LinkedIn → phone order, 44px square targets, and the existing two-pixel focus ring with a three-pixel offset.
- Browser checks in light and dark themes at exact 320, 375, 768, 1024, and 1440px viewport widths found four 44px links, a single unbroken row, and `0px` horizontal overflow at every width. A normal production page emitted no console warnings or errors.
- The row is authored as visible content and shares one existing supporting-content reveal, so reduced-motion mode keeps it visible and introduces no per-icon entrance effect.

## Outcome

Added a four-item Carbon icon row beneath the Hero calls to action. GitHub and LinkedIn open their verified profiles in safe new tabs; email opens the visitor's mail client; phone uses the approved, normalized `tel:+15149291119` destination. The links are accessible, theme-aware, keyboard-visible, and responsive without altering the existing Hero content or name treatment.

Changed paths: `src/components/Hero.tsx`, `src/app/globals.css`, `agents/DECISIONS.md`, `agents/SITE.md`, `agents/TICKETS.md`, `agents/knowledge-base/{BRAND,PROFILE}.md`, and `agents/ticket/{PORT-020,PORT-034,PORT-048}.md`.
