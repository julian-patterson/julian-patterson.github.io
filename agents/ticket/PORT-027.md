# PORT-027 — Remove the Journey section

- Status: Done
- Priority: P1
- Source: owner response to RQ-003 on 2026-07-22
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-07-24
- Completed: 2026-07-24

## Owner direction

Remove Journey.

## Acceptance criteria

- [x] `Journey` is removed from page composition and unused imports/code are removed safely.
- [x] Navigation, anchors, section numbering, metadata, and fact-bearing documentation are updated where affected.
- [x] Any unique approved information is preserved in a retained section or deliberately removed.
- [x] Responsive, build, type, and docs checks pass.

## Validation record

- `rg -n 'Journey|#journey|journey-' src`: no matches.
- `npm run check`: passed; docs validation reports 14 mounted page components and TypeScript passed.
- `npm run build`: passed; the static export completed successfully.
- `git diff --check`: passed.
- Production-export browser at 1280px: 14 sections, no `#journey`, Freight Explainer flows directly into Now, `0px` horizontal overflow, all retained navigation targets exist, and no browser warning/error was logged.

## Outcome

Removed Journey from page composition, deleted its component and animation/responsive CSS, and synchronized the current site map and affected ticket references. Work, education, and location facts remain in retained sections. Journey-only birth-year/“Born and raised,” “first freight internship,” and combined 2025 snapshot wording were deliberately removed under the owner-approved section decision rather than silently relocated.

Changed production paths: `src/app/page.tsx`, `src/app/globals.css`, and removal of `src/components/Journey.tsx`. Synchronized documentation: `agents/AGENTS.md`, `agents/SITE.md`, `agents/TICKETS.md`, `agents/ticket/PORT-001.md`, `agents/ticket/PORT-022.md`, and this ticket.
