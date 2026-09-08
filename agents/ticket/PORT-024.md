# PORT-024 — Decide the future of the Stats section

- Status: Done
- Priority: P2
- Source: owner response to RQ-003 on 2026-07-22
- Depends on: none
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Owner direction

Keep Stats for now. The current job-related figures may be irrelevant now that the work is complete, so either remove the section or replace it with current, approved evidence.

**Resolved on 2026-09-07.** Julian asked for the Impact section to be removed. That answers [RQ-011](../REVIEW-QUESTIONS.md#rq-011) with **remove**, so the audit-and-retain path was not needed.

## Scope

Changes:

- Deletes `src/components/Stats.tsx`, the `Impact` section rendered at `#stats`.
- Removes its import and mount from `src/app/page.tsx`.
- Removes the `#stats .stats-grid` and `.counter-cell` responsive rules from `src/app/globals.css`, including the now-empty `@media (max-width: 480px)` block that held only Stats rules.

Preserved:

- Every Prime Freight metric in the résumé record. Removing the section removes them from the website only; nothing about their accuracy or approval status changed.
- The Experience entries the metrics supported. PORT-041 had already rewritten those at the skills level, so no Experience copy depended on this section.

## Acceptance criteria

- [x] Current metrics are mapped to their source, date, context, and publication approval. — Superseded: the owner chose removal before the audit was needed, so no metric is published and none requires approval.
- [x] Julian chooses remove, revise, or retain after reviewing the audit. — Chose **remove** on 2026-09-07.
- [x] If retained, no decorative or unverifiable counter remains. — Not applicable; the section is gone.
- [x] The resulting decision, code, and relevant knowledge-base records are synchronized.

## Validation record

Run on 2026-09-07:

- `npx tsc --noEmit`: passed.
- `npm run build`: passed; static export generated.
- `npm run docs:check`: passed.
- `npm run lint`: **not run — environment limitation.** `next lint` is unconfigured in this repository and opens an interactive ESLint setup prompt, so it cannot complete non-interactively. The lint and type pass inside `next build` did run and reported no errors. PORT-016 already records the waived lint/CI work.
- Export scan of `out/index.html`: section anchors are now `about`, `experience`, `projects`, `skills`, `activity`, `contact`. Zero matches for `>Impact<`.
- `grep -rni "stats" src/`: only match is an unrelated `{/* Stats Row */}` comment inside `GitHubActivity.tsx`, which describes that component's own contribution counters.
- `grep -n "stats\|counter-cell" src/app/globals.css`: no matches.

## Outcome

The Impact section is removed from production; seven components remain mounted. RQ-011 is resolved as **remove**. Changed paths: `src/app/page.tsx`, `src/app/globals.css`; deleted `src/components/Stats.tsx`.
