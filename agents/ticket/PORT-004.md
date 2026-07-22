# PORT-004 — Audit and simplify the section set

- Status: Done
- Priority: P0
- Source: raw TODO "Remove all AI slop or extra sections"
- Depends on: none
- Owner: Codex
- Completed: 2026-07-22

## Outcome

Julian supplied a disposition for all 15 sections in RQ-003. Implementation is split into PORT-020 through PORT-034 so each section has its own scope and validation record. The current code remains authoritative until those tickets land.

## Acceptance criteria

- [x] Every section in `SITE.md` received an owner-approved keep, revise, merge, or remove direction.
- [x] Placeholder/simulated/template content is identified explicitly, including Marathon and Terminal.
- [x] Each section has a dedicated implementation or decision ticket: PORT-020 through PORT-034.
- [x] ADR-007 records the approved section plan; implementation tickets require synchronized page, navigation, metadata, documentation, and mobile updates.

## Validation record

- `npm run docs:check` — passed on 2026-07-22 after the per-ticket migration.
