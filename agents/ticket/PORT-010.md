# PORT-010 — Refine skills using code-backed evidence

- Status: Ready
- Priority: P1
- Source: raw TODO "Refine skills"
- Depends on: none
- Owner: unassigned
- Required approvals: none

## Acceptance criteria

- [x] Julian chooses the skills worth presenting and any proficiency model.
- [x] Each displayed skill maps to code-backed experience/project evidence or an explicit owner request.
- [x] The D3 graph's nodes/edges/weights are simplified or replaced intentionally.
- [ ] Touch, keyboard, screen-reader, and resize behavior are handled.
- [x] `knowledge-base/SKILLS.md` exactly mirrors the resulting code.

## Owner direction

The skill-emphasis and proficiency-model decision should be made as part of this ticket's review, then consumed by the dedicated Skills Graph implementation ticket PORT-025.

### Owner update — 2026-09-15

Julian supplied the exact 37-skill inventory and five category groupings. PORT-050 implemented the inventory with equal node weight and relationship-only edge strength, resolving RQ-005. This ticket is now ready and retains the evidence review plus the broader touch, keyboard, screen-reader, and resize audit.

## Validation record

PORT-050 records validation for the implemented inventory, graph structure, readable compact layout, legend keyboard behavior, hover/filter restoration, themes, reduced-motion implementation, and fresh-load responsive matrix. The remaining evidence and interaction audit has not run.
