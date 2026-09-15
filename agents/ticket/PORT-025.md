# PORT-025 — Update the Skills Graph section

- Status: Blocked
- Priority: P1
- Source: owner response to RQ-003 and RQ-005 on 2026-07-22
- Depends on: PORT-010
- Required approvals: none
- Owner: unassigned
- Blocker: PORT-010 must complete the remaining evidence and interaction-accessibility audit

## Owner direction

Keep Skills Graph, but update it. Fold the skill-emphasis decision into PORT-010 rather than creating an unsupported list here.

### Owner update — 2026-09-15

PORT-050 already implements the owner-approved inventory, five groupings, equal node weight, relationship-only edges, wrapped labels, a readable stable compact layout, explicit reduced-motion behavior, and all-node mobile rendering. This ticket remains blocked on PORT-010 and owns any broader node keyboard/touch/screen-reader and live-resize work that remains after that audit.

## Acceptance criteria

- [ ] The graph consumes the approved, evidence-backed skill set from PORT-010.
- [ ] Nodes, edges, labels, and weights have a clear meaning or are simplified.
- [ ] A readable noninteractive representation is available to keyboard, touch, and screen-reader users.
- [ ] Resize and reduced-motion behavior are verified.
- [ ] `knowledge-base/SKILLS.md` matches the resulting code.

## Validation record

Not run yet.
