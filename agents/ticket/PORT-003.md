# PORT-003 — Repair undefined border tokens

- Status: Ready
- Priority: P0
- Source: audit finding
- Depends on: none
- Owner: unassigned

## Context

Components use `var(--border)` while `globals.css` defines only `--border-subtle` and `--border-strong`, so those declarations do not resolve.

## Acceptance criteria

- [ ] Every production CSS variable reference resolves to a defined token or deliberate fallback.
- [ ] The chosen border-token mapping is applied consistently without unrelated redesign.
- [ ] Visual checks cover at least 375px, 768px, and 1440px.
- [ ] Type checking passes.

## Validation record

Not run yet.
