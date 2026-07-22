# PORT-002 — Eliminate hydration errors

- Status: Ready
- Priority: P0
- Source: 2026-07-22 browser review
- Depends on: none
- Owner: unassigned

## Context

The development site shows a React hydration error overlay. Browser logs identify text mismatches in inline responsive `<style>` content, beginning in `Experience.tsx`, and report that the entire root switches to client rendering.

## Acceptance criteria

- [ ] A clean page load produces no hydration mismatch or root client-render fallback.
- [ ] Responsive CSS behavior is preserved.
- [ ] Browser console is checked in development and a production build.
- [ ] Type checking passes and `SITE.md` records any structural CSS change.

## Validation record

Not run yet.
