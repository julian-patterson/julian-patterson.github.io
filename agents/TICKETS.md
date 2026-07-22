# Portfolio backlog

Last updated: 2026-07-22

This is the only active backlog. The source code remains authoritative for the current website; tickets describe requested future changes. Follow the selection algorithm in `AGENTS.md` when asked to take the next ticket.

## Ordered backlog

| Order | ID | Priority | Status | Title | Depends on |
| ---: | --- | --- | --- | --- | --- |
| 1 | PORT-001 | P0 | Blocked | Review time-sensitive profile content | owner input |
| 2 | PORT-002 | P0 | Ready | Eliminate hydration errors | none |
| 3 | PORT-003 | P0 | Ready | Repair undefined border tokens | none |
| 4 | PORT-004 | P0 | Ready | Audit and simplify the section set | none |
| 5 | PORT-005 | P0 | Blocked | Define a general personal brand | PORT-004, owner choice |
| 6 | PORT-014 | P0 | Ready | Resolve static hosting versus GitHub activity | none |
| 7 | PORT-006 | P1 | Blocked | Centralize repeated site content | PORT-001, PORT-005 |
| 8 | PORT-007 | P1 | Blocked | Move to a sans-serif-first type system | ADR-004 acceptance |
| 9 | PORT-008 | P1 | Blocked | Complete responsive and mobile QA | PORT-004 |
| 10 | PORT-010 | P1 | Blocked | Refine skills using code-backed evidence | owner choices |
| 11 | PORT-011 | P1 | Blocked | Expand and update AnyTime content | owner content/URL |
| 12 | PORT-012 | P1 | Blocked | Update projects and replace placeholder links | owner content/URLs |
| 13 | PORT-016 | P1 | Ready | Repair README, linting, and validation docs | none |
| 14 | PORT-017 | P1 | Ready | Add reduced-motion and interaction accessibility | none |
| 15 | PORT-009 | P2 | Blocked | Define reverse-scroll disappearance behavior | owner clarification |
| 16 | PORT-013 | P2 | Blocked | Define Spotify/Strava integrations | owner privacy/architecture choice |
| 17 | PORT-018 | P2 | Ready | Standardize on npm | none |
| 18 | PORT-019 | P2 | Blocked | Clarify the separate AnyTime website update | owner scope/repository |
| 19 | PORT-015 | P1 | Done | Establish the agentic maintenance system | none |

## PORT-001 — Review time-sensitive profile content

- Status: Blocked
- Priority: P0
- Source: audit finding; current code in Hero/About/Experience/Journey/Now/Terminal/layout/footer
- Depends on: owner input
- Owner: unassigned
- Blocker: Julian must provide any desired replacement text or confirm no change

### Outcome

Apply Julian's requested updates, if any, to the canonical code and synchronize the knowledge base. Do not change content automatically based on today's date.

### Acceptance criteria

- [ ] Julian supplies or confirms location, McGill status, Hapag-Lloyd status/dates, Prime Freight status, AnyTime status, and the displayed `Now` update date.
- [ ] All duplicate code surfaces are updated consistently.
- [ ] `knowledge-base/PROFILE.md`, `CURRENT.md`, `EXPERIENCE.md`, and `EDUCATION.md` match the resulting code.
- [ ] Metadata, footer, countdown language, and journey labels are included in the search.

## PORT-002 — Eliminate hydration errors

- Status: Ready
- Priority: P0
- Source: 2026-07-22 browser review
- Depends on: none
- Owner: unassigned

### Context

The development site shows a React hydration error overlay. Browser logs identify text mismatches in inline responsive `<style>` content, beginning in `Experience.tsx`, and report that the entire root switches to client rendering.

### Acceptance criteria

- [ ] A clean page load produces no hydration mismatch or root client-render fallback.
- [ ] Responsive CSS behavior is preserved.
- [ ] Browser console is checked in development and a production build.
- [ ] Type checking passes and `SITE.md` records any structural CSS change.

## PORT-003 — Repair undefined border tokens

- Status: Ready
- Priority: P0
- Source: audit finding
- Depends on: none
- Owner: unassigned

### Context

Components use `var(--border)` while `globals.css` defines only `--border-subtle` and `--border-strong`, so those declarations do not resolve.

### Acceptance criteria

- [ ] Every production CSS variable reference resolves to a defined token or deliberate fallback.
- [ ] The chosen border-token mapping is applied consistently without unrelated redesign.
- [ ] Visual checks cover at least 375px, 768px, and 1440px.
- [ ] Type checking passes.

## PORT-004 — Audit and simplify the section set

- Status: Ready
- Priority: P0
- Source: raw TODO "Remove all AI slop or extra sections"
- Depends on: none
- Owner: unassigned

### Outcome

Produce a concrete keep/merge/remove proposal for all 15 sections, then implement only dispositions Julian approves. The current code remains accurate until changed.

### Acceptance criteria

- [ ] Every section in `SITE.md` receives a keep, merge, remove, or revise recommendation with a one-sentence rationale.
- [ ] Placeholder/simulated/template content is identified explicitly, including Marathon and Terminal.
- [ ] Repetition, page length, navigation coverage, and audience value are considered.
- [ ] Any implementation is backed by an accepted decision and updates `page.tsx`, navigation, metadata, documentation, and mobile behavior together.

## PORT-005 — Define a general personal brand

- Status: Blocked
- Priority: P0
- Source: raw TODO "Remove the shipping emphasis -> focus more on developing an generic brand"
- Depends on: PORT-004 and owner choice
- Owner: unassigned
- Blocker: primary audience, positioning, and role of freight are undecided

### Acceptance criteria

- [ ] Julian approves a primary audience and positioning sentence.
- [ ] Freight is classified as primary identity, supporting expertise, or omitted framing.
- [ ] Voice, desired sections, primary CTA, and canonical domain are decided.
- [ ] ADR-004 is accepted, revised, or rejected.
- [ ] A follow-up implementation updates every brand-bearing code and documentation surface.

## PORT-006 — Centralize repeated site content

- Status: Blocked
- Priority: P1
- Source: raw TODO "Think of system to keep information up to date"; audit finding
- Depends on: PORT-001 and PORT-005
- Owner: unassigned
- Blocker: the current facts and general brand must be decided before extracting a stable shared content model

### Outcome

Make code-level structured data the single implementation source for repeated facts, while keeping `agents/knowledge-base/` synchronized as its human-editable mirror.

### Acceptance criteria

- [ ] Shared typed data covers recurring profile, experience, education, project, and link facts where practical.
- [ ] Components and metadata consume shared data instead of independent copies.
- [ ] Time-sensitive records have explicit dates/labels rather than implicit automatic reinterpretation.
- [ ] A documented sync workflow preserves ADR-001: code remains authoritative.
- [ ] No visible copy changes unless separately approved.

## PORT-007 — Move to a sans-serif-first type system

- Status: Blocked
- Priority: P1
- Source: raw TODO "Keep sans serif font"
- Depends on: acceptance or revision of ADR-004
- Owner: unassigned
- Blocker: Julian must accept or revise the proposed typography direction in ADR-004

### Acceptance criteria

- [ ] Display and body typography follow the accepted sans-serif policy; monospace use is explicitly scoped.
- [ ] Existing local font assets are evaluated to reduce build-time network dependency.
- [ ] Hierarchy remains strong across desktop/mobile and long content.
- [ ] Layout shifts and production build behavior are checked.
- [ ] `BRAND.md`, layout metadata, `globals.css`, and relevant component styles match the code.

## PORT-008 — Complete responsive and mobile QA

- Status: Blocked
- Priority: P1
- Source: raw TODO "mobile layout"
- Depends on: PORT-004
- Owner: unassigned
- Blocker: the approved section set is needed so mobile work is not spent polishing sections slated for removal

### Acceptance criteria

- [ ] Test 320, 375, 768, 1024, and 1440 CSS-pixel widths plus orientation/resize behavior.
- [ ] No unintended horizontal overflow, clipping, illegible type, or inaccessible controls.
- [ ] D3, journey, GitHub activity, cards, terminal, and network views respond after resize, not only initial load.
- [ ] Mobile navigation supports keyboard, touch, focus management, Escape, and scroll locking.
- [ ] Browser/runtime findings and changed breakpoints are recorded in `SITE.md`.

## PORT-009 — Define reverse-scroll disappearance behavior

- Status: Blocked
- Priority: P2
- Source: raw TODO "Make content disappear after we scroll up the website"
- Depends on: owner clarification
- Owner: unassigned
- Blocker: desired trigger, direction, persistence, and reduced-motion behavior are ambiguous

### Acceptance criteria

- [ ] Julian approves a written interaction specification with examples.
- [ ] Essential content never becomes stranded or inaccessible.
- [ ] Reduced-motion behavior is non-animated and readable.
- [ ] GSAP cleanup, re-entry, fast scrolling, anchor navigation, and browser back/forward are tested.

## PORT-010 — Refine skills using code-backed evidence

- Status: Blocked
- Priority: P1
- Source: raw TODO "Refine skills"
- Depends on: owner choices
- Owner: unassigned

### Acceptance criteria

- [ ] Julian chooses the skills worth presenting and any proficiency model.
- [ ] Each displayed skill maps to code-backed experience/project evidence or an explicit owner request.
- [ ] The D3 graph's nodes/edges/weights are simplified or replaced intentionally.
- [ ] Touch, keyboard, screen-reader, and resize behavior are handled.
- [ ] `knowledge-base/SKILLS.md` exactly mirrors the resulting code.

## PORT-011 — Expand and update AnyTime content

- Status: Blocked
- Priority: P1
- Source: raw TODO "Add all anytime information"
- Depends on: owner content and URL
- Owner: unassigned

### Acceptance criteria

- [ ] Julian supplies product scope, role, dates/status, architecture, approved outcomes/metrics, links, screenshots, and publication constraints.
- [ ] Experience and project presentations complement rather than duplicate one another.
- [ ] The literal `#` link is replaced or the link control is removed.
- [ ] All code surfaces and `EXPERIENCE.md`/`PROJECTS.md` are synchronized.

## PORT-012 — Update projects and replace placeholder links

- Status: Blocked
- Priority: P1
- Source: raw TODO "Update Projects"
- Depends on: owner content and URLs
- Owner: unassigned

### Acceptance criteria

- [ ] Every displayed project has approved status, summary, contribution, evidence/outcome, stack, and public link policy.
- [ ] No project link uses `href="#"`; unavailable links render as non-links.
- [ ] Contact's GitHub-labelled URL and canonical portfolio domains are reviewed in the same link audit.
- [ ] Links are keyboard-accessible, checked, and use safe external-link behavior.
- [ ] `knowledge-base/PROJECTS.md` and `PROFILE.md` match the resulting code.

## PORT-013 — Define Spotify/Strava integrations

- Status: Blocked
- Priority: P2
- Source: raw TODO "Add some interactive features (spotify, strava, etc)"
- Depends on: owner privacy and architecture choice; ADR-003
- Owner: unassigned

### Acceptance criteria

- [ ] Julian chooses data source(s), fields, publication scope, cadence, and fallback behavior.
- [ ] Static-hosting constraints and token security are documented before implementation.
- [ ] No access/refresh token or private activity data enters client/static output.
- [ ] The interaction has loading, error, empty, stale, mobile, keyboard, and reduced-motion states.
- [ ] Placeholder Marathon data is replaced only by an explicitly approved source.

## PORT-014 — Resolve static hosting versus GitHub activity

- Status: Ready
- Priority: P0
- Source: audit finding
- Depends on: none
- Owner: unassigned

### Context

`GitHubActivity.tsx` calls `/api/github`; the route requires a server token, but `output: "export"` and GitHub Pages provide no runtime Next server.

### Acceptance criteria

- [ ] Julian accepts/revises ADR-003 or the implementation remains within current static-export architecture.
- [ ] Production no longer depends on a nonexistent runtime API route.
- [ ] No GitHub token appears in browser/static output.
- [ ] Loading/error/empty states are intentional and accessible.
- [ ] Build/export and deployed-path behavior are verified; `SITE.md` is updated.

## PORT-015 — Establish the agentic maintenance system

- Status: Done
- Priority: P1
- Source: owner request on 2026-07-22
- Depends on: none
- Owner: Codex with Luna and Terra audits
- Started: 2026-07-22
- Completed: 2026-07-22

### Acceptance criteria

- [x] Root discovery instructions and canonical `/agents/AGENTS.md` exist.
- [x] Raw TODOs and audit findings are migrated into ordered tickets.
- [x] Decision log, site map, references, and ticket template exist.
- [x] Knowledge-base files cover profile, current status, experience, education, projects, skills, interests, and brand.
- [x] ADR-001 records that code is authoritative and documentation mirrors it.
- [x] Legacy agent prompts are replaced by compatibility pointers.

### Outcome

The repository now supports deterministic "take the next ticket" handoff and requires agents to update tickets, decisions, site documentation, and the knowledge mirror as code evolves.

## PORT-016 — Repair README, linting, and validation docs

- Status: Ready
- Priority: P1
- Source: audit finding
- Depends on: none
- Owner: unassigned

### Acceptance criteria

- [x] `README.md` describes the current Next.js/static GitHub Pages project, setup, commands, and agent workflow.
- [ ] Linting is noninteractive and documented.
- [x] A `typecheck` script and deterministic docs/typecheck aggregate check are added.
- [ ] CI runs deterministic checks before build.
- [ ] The behavior of Google-font network dependency is documented or addressed by PORT-007.

## PORT-017 — Add reduced-motion and interaction accessibility

- Status: Ready
- Priority: P1
- Source: audit finding
- Depends on: none
- Owner: unassigned

### Acceptance criteria

- [ ] `prefers-reduced-motion` produces readable, stable content without mandatory entrance effects.
- [ ] Essential content remains visible if GSAP or integration data fails.
- [ ] Clickable cards use semantic controls/links and visible focus.
- [ ] Hover-only graph/network/tooltips have keyboard/touch equivalents or noninteractive fallbacks.
- [ ] Automated checks plus keyboard, screen-reader-oriented semantics, and reduced-motion manual checks are recorded.

## PORT-018 — Standardize on npm

- Status: Ready
- Priority: P2
- Source: audit finding
- Depends on: none
- Owner: unassigned

### Acceptance criteria

- [ ] npm is documented as the package manager, matching CI and `package-lock.json`.
- [ ] The redundant Yarn lockfile is removed only after confirming it has no active workflow consumer.
- [ ] install/build instructions and compatibility docs are synchronized.
- [ ] `npm ci`, type checking, and production build are validated.

## PORT-019 — Clarify the separate AnyTime website update

- Status: Blocked
- Priority: P2
- Source: raw TODO "Update AnyTime Website"
- Depends on: owner scope/repository
- Owner: unassigned
- Blocker: it is unclear whether this means the AnyTime card in this portfolio or a separate website/repository

### Acceptance criteria

- [ ] Julian identifies the target repository/site and desired outcome.
- [ ] If it only means this portfolio, merge the scope into PORT-011 and mark this ticket done as duplicate.
- [ ] If external, do not modify another repository or deploy without explicit scope and authorization.
