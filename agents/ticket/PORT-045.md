# PORT-045 — Merge the updated-font UI into the current portfolio

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-15
- Depends on: none
- Required approvals: none
- Owner: Codex
- Started: 2026-09-15
- Completed: 2026-09-15

## Context

The `remove-hugo-update` and `updated-font` branches each contain one commit after their shared Next.js baseline. The current branch has the authoritative content, work-history corrections, project set, and section removals. The sibling branch has a newer typography and interaction treatment, but it was created without first incorporating that content work and independently reused `PORT-039` and `ADR-011` for unrelated changes.

## Scope

- Record a real merge from `origin/updated-font` while resolving content, page composition, and documentation to `remove-hugo-update`.
- Use bundled Geist for display/body text and Space Mono for labels and metadata.
- Add the reduced-motion-aware text scramble to the incoming branch's selected section kickers.
- Carry over the incoming focus, selection, motion, heading, and top-anchor refinements.
- Keep the current Hero, About, Experience, Projects, Skills, Activity, and Contact content and keep removed sections deleted.
- Replace the two placeholder project actions with honest non-link states, retain the verified Stride URL, and point the GitHub-labelled contact action to Julian's public GitHub profile.
- Configure the lint tooling included in the incoming branch.
- Reconcile the colliding documentation under new ticket and decision IDs.

## Acceptance criteria

- [x] Git history records `updated-font` as merged into `remove-hugo-update`.
- [x] Current profile, experience, and project copy remains intact, and no removed section returns.
- [x] Geist, Space Mono, selected scramble labels, and Carbon-inspired interaction refinements are present.
- [x] Scramble text retains readable markup and respects reduced-motion preferences.
- [x] Placeholder project actions no longer behave as links.
- [x] Relevant decisions, review answers, site documentation, and knowledge-base records are synchronized.
- [x] Typecheck, lint, static build, documentation checks, diff checks, and targeted browser checks are recorded.

## Validation record

- `npm ci`: passed after network access was enabled; installed the lockfile's 458 packages.
- `npm run check` (`docs:check` + `tsc --noEmit`): passed.
- `npm run lint`: passed with no warnings or errors.
- `npm run build`: passed; six static pages/routes generated.
- `git diff --cached --check`: passed.
- Export/source scan: the seven mounted sections are Hero, About, Experience, Projects, SkillsGraph, GitHubActivity, and Contact; no removed component, stale AnyTime/relocation copy, OpenClaw card, Vercel footer, or project `href="#"` remains.
- Browser QA at 320, 375, 768, 1024, and 1440 CSS pixels: no horizontal overflow; the Hero remained visible; Geist and Space Mono reported loaded at every width; all seven section IDs remained mounted; both standard project cards were semantic non-links; and the console reported no warning or error.
- Accessibility DOM check: all five animated labels expose static screen-reader text while the scrambled visual text is hidden from assistive technology. Code inspection confirms reduced-motion users retain the static text without starting the interval.
- Visual QA: the completed Hero animation and CTA row rendered without wrapping at both 320px and 1440px.
- `npm audit --omit=dev`: reports three advisories in the pinned production tree (two high, one critical). The suggested complete fix upgrades to Next.js 16, a breaking architecture/dependency change outside this merge. The deployed target is a static export rather than a Next.js server runtime.

## Outcome

Merged the sibling branch's UI history while retaining the content-complete branch as source of truth. The result uses working Geist/Space Mono font faces, accessible scramble labels, visible focus and selection treatment, refined Hero/Contact hierarchy, a stable top anchor, honest pending project-link states, and deterministic linting. The merge also fixes two defects found during verification: the incoming font variables originally masked Next's generated font faces, and the incoming generic-span accessible names were not reliable.

Changed paths: `.eslintrc.json`, `package.json`, `package-lock.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/components/{About,Contact,Experience,Hero,Nav,Projects,TextScramble}.tsx`, `agents/{DECISIONS,REVIEW-QUESTIONS,SITE,TICKETS}.md`, `agents/knowledge-base/{BRAND,PROFILE,PROJECTS}.md`, and `agents/ticket/{PORT-034,PORT-045}.md`.
