# PORT-032 — Make Marathon an accountable Strava-backed section

- Status: Blocked
- Priority: P2
- Source: owner response to RQ-003 and RQ-009 on 2026-07-22
- Depends on: PORT-013
- Required approvals: none
- Owner: unassigned
- Blocker: PORT-013 must first determine whether a privacy-safe static Strava integration is practical

## Owner direction

Keep Marathon as an accountability feature if it can use Strava safely. Do not add Spotify. Table the integration if existing APIs and static hosting make it unsuitable.

## Acceptance criteria

- [ ] Placeholder values are never presented as live personal activity.
- [ ] If PORT-013 finds a safe approach, only approved public running fields are rendered.
- [ ] If no suitable approach exists, the ticket records a tabled outcome and removes or clearly labels placeholder behavior.
- [ ] Loading, stale, revoked, empty, mobile, keyboard, and reduced-motion states are covered.
- [ ] No access/refresh token or private activity enters source or static output.

## Validation record

Not run yet.
