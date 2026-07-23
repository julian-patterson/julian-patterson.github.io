# PORT-028 — Remove the Now section

- Status: Done
- Priority: P1
- Source: owner response to RQ-003 on 2026-07-22
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-07-24
- Completed: 2026-07-24

## Owner direction

Remove Now rather than maintaining its time-sensitive countdown, reading, learning, and training snapshot.

## Acceptance criteria

- [x] `Now` is removed from page composition and unused imports/code are removed safely.
- [x] Navigation, anchors, metadata, and documentation no longer promise a Now section.
- [x] Facts duplicated elsewhere are reviewed under PORT-001; no private or stale copy is silently relocated.
- [x] `knowledge-base/CURRENT.md` accurately records that the section was removed once implementation lands.
- [x] Responsive, build, type, and docs checks pass.

## Validation record

- `rg -n 'components/Now|<Now|#now|now-grid' src`: no matches.
- `npm run check`: passed; docs validation reports 13 mounted page components and TypeScript passed.
- `npm run build`: passed; the static export completed successfully.
- `git diff --check`: passed.
- Production-export browser at 1280px: 13 sections, no `#now` or `#journey`, Freight Explainer flows directly into Reading, `0px` horizontal overflow, all retained navigation targets exist, and no browser warning/error was logged.
- Visual browser review confirmed Reading begins cleanly without a blank removed-section gap or orphaned divider.

## Outcome

Removed Now from page composition, deleted its countdown/state component and responsive CSS references, and synchronized the site map and current-status knowledge base. Retained status themes remain on existing approved surfaces. Now-only departure-countdown, April update label, German-level, and weekly-training claims were deliberately removed rather than silently relocated; their deleted values are labeled historical in `knowledge-base/CURRENT.md`.

Changed production paths: `src/app/page.tsx`, `src/app/globals.css`, and removal of `src/components/Now.tsx`. Synchronized documentation: `agents/AGENTS.md`, `agents/SITE.md`, `agents/TICKETS.md`, `agents/ticket/PORT-001.md`, `agents/knowledge-base/CURRENT.md`, `agents/knowledge-base/SKILLS.md`, and this ticket.
