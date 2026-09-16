# PORT-054 — Suspend the GitHub contribution section without deleting it

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-16
- Depends on: PORT-014
- Required approvals: none
- Owner: Codex
- Started: 2026-09-16
- Completed: 2026-09-16

## Context

After reviewing the setup and traffic model for the GitHub contribution heatmap, Julian asked to comment the section out while retaining it for possible future use.

## Scope

- Comment out the `GitHubActivity` import and its single page mount.
- Preserve `GitHubActivity.tsx`, the force-static `/data/github-activity` route, workflow wiring, and styles unchanged.
- Close the now-superseded activation and polish work in PORT-030 and PORT-043.
- Synchronize the current page map, owner response, and durable decision record with the dormant state.

## Acceptance criteria

- [x] The rendered page contains no GitHub contribution section or `#activity` anchor.
- [x] The component, static data route, workflow wiring, and related styles remain available for restoration.
- [x] PORT-030 and PORT-043 are closed as superseded without deleting their historical context.
- [x] No unrelated visual, content, graph, or dependency behavior changes.
- [x] Typecheck, lint, production build, docs, diff, retained-source, and static-export checks pass.

## Validation record

- `npm run check` — passed agent-system documentation checks and TypeScript.
- `npm run lint` — passed with no ESLint warnings or errors.
- `npm run build` — passed; `/` and `/data/github-activity` were statically generated.
- `git diff --check` — passed.
- `git diff --exit-code -- src/components/GitHubActivity.tsx src/app/data/github-activity/route.ts .github/workflows/nextjs.yml src/app/globals.css` — passed; retained implementation files and styles are unchanged.
- Static export inspection — `out/index.html` contains six sections and no `id="activity"`, `activity-title`, or GitHub contribution heading; `out/data/github-activity` remains present.

## Outcome

Commented out only the `GitHubActivity` import and page mount. The contribution graph is absent from the rendered portfolio, while its component, static build-time data snapshot, workflow support, styles, and restoration history remain intact.
