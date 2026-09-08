# PORT-030 — Retain and polish GitHub Activity

- Status: Ready
- Priority: P1
- Source: owner response to RQ-003 on 2026-07-22
- Depends on: PORT-014
- Required approvals: none
- Owner: unassigned

## Owner direction

Keep GitHub Activity because its public visibility creates accountability.

## Acceptance criteria

- [ ] The section uses the safe, production-compatible data path established by PORT-014.
- [ ] Empty, unavailable, stale, and error states remain useful and honest.
- [ ] The visualization has a readable keyboard/screen-reader alternative and responsive behavior.
- [ ] No token or private GitHub data enters static/client output.
- [ ] `SITE.md` documents the final data source and fallback.

## Update — 2026-09-07

The data path this ticket polishes does not currently return data. [PORT-043](PORT-043.md) diagnoses why and lists the owner-only steps. Do not treat this ticket as ready to validate until PORT-043 lands.

## Validation record

Not run yet.
