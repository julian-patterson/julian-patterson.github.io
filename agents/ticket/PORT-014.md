# PORT-014 — Resolve static hosting versus GitHub activity

- Status: Ready
- Priority: P0
- Source: audit finding
- Depends on: none
- Owner: unassigned

## Context

`GitHubActivity.tsx` calls `/api/github`; the route requires a server token, but `output: "export"` and GitHub Pages provide no runtime Next server.

## Acceptance criteria

- [ ] Julian accepts/revises ADR-003 or the implementation remains within current static-export architecture.
- [ ] Production no longer depends on a nonexistent runtime API route.
- [ ] No GitHub token appears in browser/static output.
- [ ] Loading/error/empty states are intentional and accessible.
- [ ] Build/export and deployed-path behavior are verified; `SITE.md` is updated.

## Validation record

Not run yet.
