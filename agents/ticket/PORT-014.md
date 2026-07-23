# PORT-014 — Resolve static hosting versus GitHub activity

- Status: Done
- Priority: P0
- Source: audit finding
- Depends on: none
- Owner: Codex
- Started: 2026-07-23
- Completed: 2026-07-23
- Required approvals: none

## Context

`GitHubActivity.tsx` calls `/api/github`; the route requires a server token, but `output: "export"` and GitHub Pages provide no runtime Next server.

## Acceptance criteria

- [x] Julian accepts/revises ADR-003 or the implementation remains within current static-export architecture.
- [x] Production no longer depends on a nonexistent runtime API route.
- [x] No GitHub token appears in browser/static output.
- [x] Loading/error/empty states are intentional and accessible.
- [x] Build/export and deployed-path behavior are verified; `SITE.md` is updated.

## Validation record

- `npm run check` — passed (`npm run docs:check` and `npx tsc --noEmit`).
- `npm run build` without `GITHUB_TOKEN` — passed; `/data/github-activity` was exported as a static route containing an intentional unavailable payload.
- `GITHUB_TOKEN=PORT014_CANARY_DO_NOT_SHIP npm run build` — passed; the deliberately invalid canary produced the same safe fallback instead of failing the site.
- Static-output search for `PORT014_CANARY_DO_NOT_SHIP`, `Bearer`, and `GITHUB_TOKEN` — no matches; the export contains no credential material.
- Static-output inspection — `out/data/github-activity` exists and contains only `status` plus `generatedAt`; no `out/api/github` artifact exists.
- Local static server — `GET /data/github-activity` returned HTTP 200 and `GET /api/github` returned HTTP 404.
- Production-export browser at 375px and 1280px — the component requested the static resource, announced the intentional unavailable state with `role="status"` and `aria-live="polite"`, produced no console warnings/errors, and had no horizontal overflow at 375px.
- Source review and type checking confirmed distinct accessible loading, unavailable, fetch/schema error, and zero-contribution states.
- `git diff --check` — passed before ticket closure.

## Outcome

Preserved the static GitHub Pages architecture while replacing the nonexistent runtime API dependency with a force-static, build-generated, sanitized contribution snapshot. GitHub Actions supplies its repository-scoped automatic token only to the build step; the browser receives only public dates/counts or a safe unavailable payload. The obsolete `/api/github` route was removed.

Changed production paths: `.github/workflows/nextjs.yml`, `src/app/data/github-activity/route.ts`, `src/components/GitHubActivity.tsx`, and removal of `src/app/api/github/route.ts`. Synchronized documentation: `agents/SITE.md`, `agents/TICKETS.md`, `agents/ticket/PORT-030.md`, and this ticket.
