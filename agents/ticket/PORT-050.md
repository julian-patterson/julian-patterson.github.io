# PORT-050 — Replace the skills graph inventory

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

Julian supplied an exact replacement inventory for all five Skills Graph categories. The current graph contains outdated or overly broad entries and uses node size in a way that can imply an unapproved proficiency hierarchy.

## Scope

- Replace the graph's Languages, Data & ML, Infrastructure, Frontend, and Domain nodes with the exact owner-supplied labels and categories.
- Remove obsolete nodes and reconnect the graph with relationships grounded in the supplied technologies and domains.
- Give every node equal visual weight so the graph does not imply a proficiency ranking Julian did not request.
- Keep every supplied skill visible at mobile and desktop widths while preserving existing graph interaction, theming, motion fallbacks, and section layout.
- Synchronize the skills knowledge base, owner approval queue, site map, and durable presentation decision.

## Acceptance criteria

- [x] The graph contains exactly the 37 owner-supplied skills in their supplied five categories, with no previous-only skill labels remaining.
- [x] Every node has equal visual weight and appears at all supported viewport widths.
- [x] Every node belongs to one connected graph through intentional technical or domain relationships.
- [x] Existing legend, hover, zoom/pan, theme, reduced-motion, and responsive behavior remains functional.
- [x] `knowledge-base/SKILLS.md`, `REVIEW-QUESTIONS.md`, `SITE.md`, and `DECISIONS.md` describe the resulting implementation.
- [x] Typecheck, lint, build, docs, diff, static-export, and targeted browser checks pass.

## Validation record

- `npm run check`, `npm run lint`, `npm run build`, and `git diff --check` passed.
- A source-data validator found exactly 37 unique IDs and labels, the exact owner list, category counts of 7 Languages / 9 Data & ML / 10 Infrastructure / 5 Frontend / 6 Domain, and one uniform weight of `2`.
- The same validator found 57 valid relationship edges, one connected component, and zero isolated nodes or invalid endpoints.
- Static-export inspection found the complete 37-label accessible description in `out/index.html`.
- Fresh production-export browser loads in light and dark themes at 320px, 375px, 768px, 1024px, and 1440px each rendered all 37 nodes with exact category counts, no clipped or overlapping text boxes, and no horizontal page overflow. The final compact-layout matrix measured a minimum label-line height of about 14px at 320px.
- Each legend category selected exactly its expected node count; keyboard Enter activation exposed `aria-pressed="true"` and the focused control had a visible 2px focus outline with 3px offset. The Languages filter retained its 7 active / 30 muted node state and 2 active / 55 muted edge state after node hover and leave. Live theme switching updated graph text, node, and edge colors after initialization.
- Browser console inspection found no warning or error. Reduced-motion emulation was unavailable in the browser harness; source inspection confirmed that the graph now reads `prefers-reduced-motion`, settles the desktop simulation synchronously, skips the D3 edge and reset transitions, and disables force-restarting node drag. The existing global reduced-motion rules also suppress CSS transitions.

## Outcome

Replaced the graph with Julian's exact 37-skill inventory, equalized node weight, rebuilt it as one connected relationship graph, kept every skill readable on mobile, wrapped and bounded long labels, preserved legend state across hover, added explicit reduced-motion behavior, enabled background panning, and exposed the full inventory through accessible text. RQ-005 is resolved; PORT-010 is now ready for the remaining evidence and interaction audit, while PORT-025 remains blocked on it.

Changed paths: `src/components/SkillsGraph.tsx`; `agents/REVIEW-QUESTIONS.md`; `agents/DECISIONS.md`; `agents/SITE.md`; `agents/TICKETS.md`; `agents/knowledge-base/README.md`; `agents/knowledge-base/SKILLS.md`; `agents/knowledge-base/BRAND.md`; `agents/knowledge-base/INTERESTS.md`; `agents/knowledge-base/PROJECTS.md`; `agents/ticket/PORT-010.md`; `agents/ticket/PORT-025.md`; `agents/ticket/PORT-050.md`.
