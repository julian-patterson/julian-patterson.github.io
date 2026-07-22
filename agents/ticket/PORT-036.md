# PORT-036 — Migrate the backlog to per-ticket files

- Status: Done
- Priority: P0
- Source: owner request on 2026-07-22
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-07-22
- Completed: 2026-07-22

## Acceptance criteria

- [x] `agents/ticket/` exists with one Markdown file for every current and completed ticket.
- [x] `agents/TICKETS.md` is an ordered status/dependency index and explicitly identifies the next eligible ticket.
- [x] Owner responses from `REVIEW-QUESTIONS.md` are converted into actionable tickets, resolved decisions, or clearly retained open questions.
- [x] All 15 current page sections have dedicated PORT-020 through PORT-034 tickets.
- [x] Agent workflow, README, site map, knowledge base, decision log, template, and validation script describe the new system.
- [x] Automated validation checks ticket-file/index identity, title, priority, status, dependencies, next-ticket order, approval links, and required sections.

## Validation record

- `npm run docs:check` — passed on 2026-07-22.
- `npm run typecheck` — passed on 2026-07-22.

## Outcome

The monolithic backlog was replaced by a compact work index and standalone ticket files. The live website source was not changed.
