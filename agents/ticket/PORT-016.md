# PORT-016 — Repair README, linting, and validation docs

- Status: Done
- Priority: P1
- Source: audit finding
- Depends on: none
- Owner: Julian Patterson
- Completed: 2026-07-24

## Acceptance criteria

- [x] `README.md` describes the current Next.js/static GitHub Pages project, setup, commands, and agent workflow.
- [ ] Linting is noninteractive and documented.
- [x] A `typecheck` script and deterministic docs/typecheck aggregate check are added.
- [ ] CI runs deterministic checks before build.
- [ ] The behavior of Google-font network dependency is documented or addressed by PORT-007.

## Validation record

- Owner-directed closure on 2026-07-24; the remaining lint, CI-check, and font-documentation criteria were explicitly waived and are not claimed as implemented.
- `npm run docs:check`: passed after queue synchronization on 2026-07-24.
- `git diff --check`: passed on 2026-07-24.

## Outcome

Closed at the owner's request. Existing README and deterministic docs/typecheck improvements remain; no additional linting or CI implementation was performed for this closure.

Changed paths for closure: `agents/TICKETS.md` and this ticket file.
