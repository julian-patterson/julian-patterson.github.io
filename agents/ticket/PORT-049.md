# PORT-049 — Link the public project repositories

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

The Transfer CLI and IoT LED Controller cards currently end with non-interactive `Public link pending` text. Julian supplied and approved their public GitHub repository URLs and requested a generic `View more on GitHub` action beneath the project grid.

## Scope

- Replace both pending-link labels with accessible repository links using the exact owner-supplied URLs.
- Preserve the existing project names, descriptions, stacks, order, and card layout.
- Add one section-level `View more on GitHub` link beneath the standard project grid, targeting Julian's already-public GitHub profile.
- Use safe new-tab behavior, existing visual tokens, visible focus, and minimum 44px interactive heights.
- Synchronize the partial answer to the existing project-link approval queue without falsely resolving the broader project-content audit.

## Acceptance criteria

- [x] Transfer CLI links to `https://github.com/julian-patterson/transfer-cli`.
- [x] IoT LED Controller links to `https://github.com/patterson-project/custom-led-controller`.
- [x] Both card actions are real anchors with descriptive labels, safe new-tab attributes, visible focus, and at least 44px interactive height.
- [x] One `View more on GitHub` action appears beneath the standard grid and links to `https://github.com/julian-patterson` with the same safe and accessible behavior.
- [x] Existing project copy, stacks, ordering, featured Stride link, and responsive card composition remain unchanged.
- [x] Light/dark themes and 320–1440px layouts remain visually coherent without horizontal overflow.
- [x] Project, decision, ticket, approval-queue, and site documentation is synchronized.
- [x] Typecheck, lint, build, diff checks, link inspection, and targeted browser checks pass.

## Validation record

- `npm run check`, `npm run lint`, `npm run build`, and `git diff --check` passed.
- The production export contains the exact Transfer CLI, IoT LED Controller, and GitHub-profile destinations and no `Public link pending` text.
- Read-only URL inspection returned HTTP 200 for all three owner-approved GitHub destinations on 2026-09-15.
- Keyboard traversal reached Stride, Transfer CLI, IoT LED Controller, and `View more on GitHub` in document order; the three new anchors expose descriptive accessible names plus `target="_blank" rel="noopener noreferrer"`.
- Browser checks in both themes at exact 320px, 375px, 768px, 1024px, and 1440px widths found 44px action heights, the intended one-/two-column grid behavior, no horizontal overflow, and no normal-page console warning/error.

## Outcome

Published the two owner-approved repository links and one GitHub-profile browse action without changing project copy, names, stacks, order, featured Stride behavior, or responsive card composition. RQ-007 is partially answered; PORT-012 and PORT-023 remain blocked on their wider content and evidence review.
