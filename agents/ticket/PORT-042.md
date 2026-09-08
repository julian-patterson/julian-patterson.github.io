# PORT-042 — Remove the Marathon and Terminal sections

- Status: Done
- Priority: P1
- Source: owner request on 2026-09-07
- Depends on: none
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Context

Julian asked to remove the "I also run" section (`Marathon`, `#marathon`) and the "Ask the shell" section (`Terminal`, `#terminal`). Both were already provisional in the backlog: PORT-032 held Marathon pending a safe Strava integration, and PORT-033 held Terminal pending a useful interaction concept. Both components also carried acknowledged placeholder or simulated data, which `SITE.md` recorded as a standing accuracy risk.

## Scope

Changes:

- Deletes `src/components/Marathon.tsx` and `src/components/Terminal.tsx`.
- Removes their imports and mounts from `src/app/page.tsx`.
- Removes their dedicated CSS from `src/app/globals.css`: the `#terminal .term-body` grid, the `max-width: 600px` terminal block, and `#marathon .mara-grid` from two shared responsive rules.

Deliberately unchanged:

- The About card's `INTERESTS` row still reads "Marathon running · Logistics · Home automation". Julian asked to remove the section, not the interest.
- Navigation was already limited to About, Experience, Projects, and Contact, so no link needed updating.

## Acceptance criteria

- [x] Neither section appears in the page composition or the static export.
- [x] No dedicated CSS, import, or navigation target is left behind.
- [x] Placeholder Strava figures and simulated terminal output are gone from production.
- [x] `SITE.md`, the knowledge base, and the affected tickets are synchronized.

## Validation record

Run on 2026-09-07:

- `npx tsc --noEmit`: passed.
- `npm run build`: passed.
- `npm run docs:check`: passed.
- Export scan: sections are now `about`, `experience`, `projects`, `stats`, `skills`, `activity`, `contact`. Zero matches for "I also run", "Ask the shell", "Outside the terminal", "strava", "OUTSIDE", and "INTERACTIVE".
- `grep` for `marathon` and `terminal` in `src/app/globals.css`: no matches.

## Outcome

Seven sections remain. PORT-032 and PORT-033 are closed as superseded. Changed paths: `src/app/page.tsx`, `src/app/globals.css`; deleted `src/components/Marathon.tsx`, `src/components/Terminal.tsx`.
