# PORT-052 — Add a metro divider and GraphQL skill

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

Julian approved the proposed one-off metro-line divider between About and Experience, adapted from the section-separator motion on Swiftly's careers page. He also approved GraphQL as a public skill and explicitly asked for it to relate to PostgreSQL in the Skills Graph.

## Scope

- Add one compact decorative SVG route divider between About and Experience using the current visual tokens and square geometry.
- Draw the route and reveal its stations once on viewport entry, with a stable static result for reduced motion, print, and failed JavaScript.
- Keep the divider theme-aware, noninteractive, absent from the accessibility tree, and simplified at compact widths without introducing a dependency.
- Add one equal-weight `GraphQL` node to the Infrastructure group and a direct relationship edge to `PostgreSQL`, preserving graph connectivity and accessible inventory output.
- Synchronize the skills knowledge base, site map, durable design decisions, and affected future-ticket notes.

## Acceptance criteria

- [x] Exactly one metro divider appears between About and Experience, with one angular route, three square stations, and one visually distinct interchange at supported desktop widths.
- [x] The route draws and its stations reveal once when entering view; it is fully visible without animation for reduced-motion, print, and no-JavaScript rendering.
- [x] Compact layouts use a simplified route that stays within the viewport; both themes use existing site tokens and the decorative SVG is `aria-hidden` and non-focusable.
- [x] The Skills Graph contains `GraphQL` as an equal-weight Infrastructure node with a direct edge to `PostgreSQL`; all nodes remain in one connected graph and the accessible description includes the new skill.
- [x] Typecheck, lint, build, docs, diff, static-export, responsive-source, accessibility-source, and graph-data checks pass.

## Validation record

- `npm run check`, `npm run lint`, `npm run build`, and `git diff --check`: passed.
- A graph-data validator found 38 unique equal-weight nodes, 58 valid edges, the exact 7 / 9 / 11 / 5 / 6 category split, one connected component, no orphan node, and one strength-3 GraphQL–PostgreSQL edge.
- Static-export inspection found one divider root, two responsive route paths, five authored station markers, the 38-skill SVG label, and GraphQL in the generated accessible description.
- Source inspection confirmed the single About-to-Experience mount, three-station desktop and two-station compact variants, existing light/dark tokens, once-only ScrollTrigger setup, authored no-JavaScript final state, reduced-motion bypass, print overrides, `aria-hidden`, and non-focusable SVGs.
- The local development route returned HTTP 200. Per the Sites build workflow, no browser screenshot or DOM-driven visual matrix was run because the owner did not request browser testing.
