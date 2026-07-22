# PORT-013 — Assess a privacy-safe Strava integration

- Status: Ready
- Priority: P2
- Source: raw TODO "Add some interactive features (spotify, strava, etc)"
- Depends on: ADR-003 or the current static-export constraint
- Owner: unassigned
- Required approvals: none

## Owner direction

Do not add Spotify. Assess Strava only for the Marathon accountability section and table it if the available APIs cannot fit the existing static architecture without exposing tokens or private activity.

## Acceptance criteria

- [ ] Spotify is excluded from implementation scope.
- [ ] Strava API, authentication, cadence, static-hosting, and privacy constraints are documented before implementation.
- [ ] No access/refresh token or private activity data enters client/static output.
- [ ] If a safe approach exists, create or unblock the narrowly scoped PORT-032 implementation with exact public fields and fallback behavior.
- [ ] If no safe approach exists, record why the integration is tabled and do not retain misleading placeholder data.

## Validation record

Not run yet.
