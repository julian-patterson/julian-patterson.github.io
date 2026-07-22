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

- Status: Proposed
- Date: 2026-07-22
- Decider: pending Julian
- Supersedes: shipping-manifest design brief in historical prompts

### Context

The raw TODO requests less shipping emphasis, removal of generic/generated-feeling sections, refined skills, and a sans-serif font. The current code still intentionally uses a serif display face and freight-led copy/visuals.

### Proposed decision

Use a general personal brand with sans-serif display/body type, retaining monospace only as a restrained metadata accent. Freight becomes supporting evidence rather than the site-wide identity.

### Consequences if accepted

- Tickets `PORT-004`, `PORT-005`, and `PORT-007` define the exact copy, section, and typography migration.
