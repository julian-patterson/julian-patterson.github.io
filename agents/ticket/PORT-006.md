# PORT-006 — Centralize repeated site content

- Status: Blocked
- Priority: P1
- Source: raw TODO "Think of system to keep information up to date"; audit finding
- Depends on: PORT-001 and PORT-005
- Owner: unassigned
- Blocker: the current facts and general brand must be decided before extracting a stable shared content model
- Required approvals: [RQ-001](../REVIEW-QUESTIONS.md#rq-001), [RQ-002](../REVIEW-QUESTIONS.md#rq-002)

## Outcome

Make code-level structured data the single implementation source for repeated facts, while keeping `agents/knowledge-base/` synchronized as its human-editable mirror.

## Acceptance criteria

- [ ] Shared typed data covers recurring profile, experience, education, project, and link facts where practical.
- [ ] Components and metadata consume shared data instead of independent copies.
- [ ] Time-sensitive records have explicit dates/labels rather than implicit automatic reinterpretation.
- [ ] A documented sync workflow preserves ADR-001: code remains authoritative.
- [ ] No visible copy changes unless separately approved.

## Validation record

Not run yet.
