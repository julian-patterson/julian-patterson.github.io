# Decision log

This log is append-only. Valid statuses are `Proposed`, `Accepted`, `Rejected`, and `Superseded`. Only accepted decisions are binding. When replacing a decision, add a new entry and mark the old one superseded with a link; do not erase its context.

## ADR-001 — Code is authoritative and documentation mirrors it

- Status: Accepted
- Date: 2026-07-22
- Decider: Julian Patterson
- Supersedes: none

### Context

The first draft of the agent system treated the knowledge base as canonical and questioned time-sensitive content based on the calendar. Julian clarified that the code is the true source of accuracy and the documentation must be updated as well.

### Decision

Current production source under `src/`, plus its runtime behavior, is authoritative for what the website currently says and does. Documentation under `agents/` is a structured, owner-editable mirror.

If documentation and code drift without an explicit change request, update documentation to match code. If Julian edits the knowledge base or supplies new information as a requested website change, apply the change to code first and then re-synchronize the documentation to the resulting code.

### Consequences

- Documentation must reproduce code faithfully, even when a backlog ticket proposes changing that code.
- Today's date alone never authorizes rewriting time-sensitive copy.
- Ticket proposals, audit warnings, and current facts must be visibly separated.
- A knowledge-base-only edit is not considered a completed website update.

## ADR-002 — Use `/agents` as the maintenance system

- Status: Accepted
- Date: 2026-07-22
- Decider: Julian Patterson
- Supersedes: duplicated legacy agent prompts

### Context

The repository had four identical, stale build prompts but no actionable backlog, decision history, structured personal information, or deterministic handoff process.

### Decision

Use `agents/AGENTS.md`, `agents/TICKETS.md`, `agents/DECISIONS.md`, `agents/SITE.md`, and `agents/knowledge-base/` for ongoing maintenance. Root and tool-specific instruction files are short compatibility pointers.

### Consequences

- "Take the next ticket" has a deterministic selection rule.
- Work, decisions, current code facts, and historical design prompts remain separate.
- Agents update this system in the same change that makes it stale.

## ADR-003 — Preserve current static GitHub Pages architecture by default

- Status: Proposed
- Date: 2026-07-22
- Decider: pending Julian
- Supersedes: none

### Context

`next.config.mjs` uses `output: "export"` and the workflow deploys `out/` to GitHub Pages, while old prompts mention Vercel and the GitHub activity component calls a runtime API route.

### Proposed decision

Keep GitHub Pages/static export unless Julian explicitly chooses another host. Make integrations compatible with static output.

### Consequences if accepted

- Runtime Next.js API routes cannot be production dependencies.
- Dynamic data must be fetched from an appropriate public client API, generated at build time without leaking secrets, delegated to an external service, or removed.

## ADR-004 — Move toward a general, sans-serif-first brand

- Status: Superseded
- Superseded by: ADR-008
- Date: 2026-07-22
- Decider: pending Julian
- Supersedes: shipping-manifest design brief in historical prompts

### Context

The raw TODO requests less shipping emphasis, removal of generic/generated-feeling sections, refined skills, and a sans-serif font. The current code still intentionally uses a serif display face and freight-led copy/visuals.

### Proposed decision

Use a general personal brand with sans-serif display/body type, retaining monospace only as a restrained metadata accent. Freight becomes supporting evidence rather than the site-wide identity.

### Consequences if accepted

- Tickets `PORT-004`, `PORT-005`, and `PORT-007` define the exact copy, section, and typography migration.

## ADR-005 — Use one owner approval queue

- Status: Accepted
- Date: 2026-07-22
- Decider: Julian Patterson
- Supersedes: scattered owner questions in ticket blockers

### Context

Several tickets are blocked by personal facts, brand choices, publication consent, URLs, interaction behavior, or repository scope. Keeping those inputs only in individual ticket prose makes it difficult for Julian to review them as one coherent set.

### Decision

Use `agents/REVIEW-QUESTIONS.md` as the single queue for unresolved owner approvals. Every blocked ticket links to all of its required `RQ-###` questions, while ticket state and implementation scope remain in `agents/TICKETS.md`.

### Consequences

- Owner questions can be reviewed and answered in one pass without duplicating backlog state.
- Indirectly blocked tickets link to the same underlying questions as their dependencies.
- Agents must not guess missing answers or begin blocked work until the linked approvals are resolved.

<a id="adr-006"></a>
## ADR-006 — Store each ticket in its own file

- Status: Accepted
- Date: 2026-07-22
- Decider: Julian Patterson
- Refines: ADR-002 and ADR-005

### Context

The original backlog combined ordering, status, dependencies, acceptance criteria, validation, and outcomes in one growing file. Julian asked for one Markdown file per ticket and for `TICKETS.md` to focus on current work and next-agent selection.

### Decision

Store ticket details in `agents/ticket/PORT-###.md`. Keep `agents/TICKETS.md` as the authoritative ordered index of ticket IDs, titles, priorities, statuses, dependencies, and the next eligible ticket. Status changes must update the ticket file and index together.

### Consequences

- Agents open the selected ticket file before beginning work.
- Every ticket file must be represented exactly once in the index, and every indexed ticket must have a file.
- Documentation validation checks file/index identity and status consistency.

<a id="adr-007"></a>
## ADR-007 — Adopt the owner-approved section plan

- Status: Accepted
- Date: 2026-07-22
- Decider: Julian Patterson
- Supersedes: the undecided section proposal in PORT-004

### Decision

- Remove Journey and Now.
- Keep and revise Hero, About, Experience, Projects, Stats, Skills Graph, Freight Explainer, Reading, GitHub Activity, Freight Network, Marathon, Terminal, and Contact.
- Treat Stats and Terminal as provisional pending their follow-up owner decisions.
- Reframe Reading away from an indefinitely stale “currently reading” feed, with favorite reads as the leading option.
- Present Freight Network and Freight Explainer as one coherent freight-focused area.
- Keep Marathon as an accountability feature only if a safe, practical Strava path exists; do not add Spotify.

### Consequences

PORT-020 through PORT-034 hold one implementation or decision scope per current section. The live page remains unchanged until those tickets are completed.

<a id="adr-008"></a>
## ADR-008 — Retain the current typography and supporting freight role

- Status: Superseded
- Superseded by: [ADR-011](#adr-011) on 2026-09-07, which removes freight from the site's identity entirely and restates the still-binding typography decision
- Date: 2026-07-22
- Decider: Julian Patterson
- Supersedes: ADR-004

### Decision

Retain the current DM Serif Display, DM Sans, and DM Mono implementation. Freight is supporting expertise rather than the portfolio's entire identity. The primary audience, final positioning sentence, voice, CTA, and canonical domain remain open in PORT-005.

### Consequences

- PORT-007 closes without a typography implementation change.
- Future section revisions preserve the existing type roles unless Julian makes another explicit decision.
- Freight work may remain prominent as evidence but should not crowd out broader software-engineering positioning.

<a id="adr-009"></a>
## ADR-009 — Generate the website and résumé from shared structured content

- Status: Accepted
- Date: 2026-07-23
- Decider: Julian Patterson
- Extends: ADR-001

### Context

Julian wants this repository to be the single source of truth for both the portfolio website and a generated LaTeX/PDF résumé, with a résumé view available from the static website.

### Decision

The implemented structured content under `src/` will supply both website and résumé consumers. The LaTeX template, semantic HTML résumé route, and generated PDF may select and format approved records, but none becomes an independently edited factual source. The PDF is a reproducible static build artifact and the knowledge base remains the human-editable mirror defined by ADR-001.

### Consequences

- PORT-006 establishes the shared typed content model; PORT-037 extends it with résumé selection, generation, validation, static publication, and viewer behavior.
- Only explicitly public, résumé-approved records may enter the generated HTML/PDF output.
- A clean local/CI build must be able to regenerate the résumé and website from the same repository revision without a runtime service.
- Generated PDF/TeX intermediates must not be treated as canonical or manually edited.

<a id="adr-010"></a>
## ADR-010 — Separate development and production Next.js artifacts

- Status: Accepted
- Date: 2026-07-24
- Decider: Julian Patterson
- Supersedes: shared use of the default `.next/` directory

### Context

Running production validation while a development server was active mixed incompatible manifests and chunks in `.next/`. The development server then returned 404s for core client chunks and failed to load server chunks referenced by its webpack runtime.

### Decision

Use `.next-dev/` for `npm run dev`, selected through `NEXT_DIST_DIR`. Keep production on Next.js's standard `.next/` build directory and `out/` static export so GitHub Pages behavior remains unchanged. Keep both build directories ignored and provide `npm run clean` to remove them.

### Consequences

- Production validation can run without overwriting a live development server's artifacts.
- A stale-cache recovery is deterministic: stop the server, run `npm run clean`, then restart development.
- GitHub Pages continues to deploy the static `out/` export and does not depend on either local artifact directory.

<a id="adr-011"></a>
## ADR-011 — Remove freight and relocation content from the public site

- Status: Accepted
- Date: 2026-09-07
- Decider: Julian Patterson
- Supersedes: ADR-008

### Context

ADR-008 kept freight as supporting expertise. On 2026-09-07 Julian said he is no longer applying to freight-specific jobs and asked for the freight content and every claim about moving to Hamburg to be removed, with the research sections deleted and a general interest in logistics retained.

### Decision

Freight is omitted framing, not supporting expertise. No shipping, freight, Hamburg, or Hapag-Lloyd claim appears in production copy. `Prime Freight Logistics` remains only as a factual employment record, described in domain-neutral terms. Logistics appears solely as a stated general interest.

The typography decision carried over from ADR-008 stands unchanged: retain the current DM Serif Display, DM Sans, and DM Mono implementation, and preserve the existing type roles in future section revisions.

### Consequences

- PORT-039 deleted `FreightExplainer`, `FreightNetwork`, and `Reading` with their dedicated CSS; PORT-026, PORT-029, and PORT-031 are closed as superseded.
- The upcoming-role Experience entry and the `YUL → HAM → SHA` hero coordinate motif are gone; the site names no future employer or destination.
- AnyTime Technologies is the featured project in place of the removed research project.
- Verified metrics are retained with domain-neutral labels; no metric value changed.
- The remaining PORT-005 brand questions — primary audience, final positioning sentence, CTA, and canonical domain — are still open.

### Amendment — 2026-09-07

Julian clarified the same day that the Hapag-Lloyd internship is experience he holds and asked for it back. This decision removes freight as **identity and framing**, not as **employment history**. Hapag-Lloyd and Prime Freight both remain as factual Experience entries with domain-neutral descriptions; PORT-040 republished Hapag-Lloyd as a completed May – Aug 2026 role. The relocation narrative — future-tense wording, countdowns, and `→ Hamburg` location lines — stays removed everywhere.

## ADR-012 — Unpublish the Impact metrics, footer build stack, and OpenClaw

- Status: Accepted
- Date: 2026-09-07
- Decider: Julian Patterson
- Supersedes: none

### Context

Three removals were requested on 2026-09-07. The `Stats` section ("Impact") had been provisional since PORT-004; RQ-011 asked Julian to choose remove, retain, or replace, and PORT-024 had been blocked on that answer. The `Contact.tsx` footer carried `· Montréal, QC` and `Built with Next.js · Deployed on Vercel`. The Projects grid carried an `OpenClaw` card whose repository link was the placeholder `#`.

### Decision

None of the three is published. The Impact counters and the before/after automation chart are removed rather than re-evidenced. The footer states the copyright line only — no location and no build-stack claim. OpenClaw is removed from the Projects grid.

### Consequences

- PORT-024 is closed as **remove** and RQ-011 is resolved; no metric audit or publication approval is needed.
- The quantified Prime Freight figures are no longer anywhere in production. They are still true and still supported by the résumé record, so this is an unpublishing decision, not a retraction. Republishing them requires a new owner request and a fresh approval pass.
- The footer no longer claims Vercel. That claim contradicted ADR-005 and the real GitHub Pages workflow, so removing it also corrects a factual error.
- Julian's location is unaffected; it remains in Hero, About, Experience, and site metadata.
- The Projects grid is `repeat(2, 1fr)` for its two remaining standard cards. Restoring a third card should restore `repeat(3, 1fr)`.
- The OpenClaw knowledge-base record is retained and labelled as unpublished, so the project can be restored without re-gathering its details.
