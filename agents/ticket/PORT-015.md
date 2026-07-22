# PORT-015 — Establish the agentic maintenance system

- Status: Done
- Priority: P1
- Source: owner request on 2026-07-22
- Depends on: none
- Owner: Codex with Luna and Terra audits
- Started: 2026-07-22
- Completed: 2026-07-22

## Acceptance criteria

- [x] Root discovery instructions and canonical `/agents/AGENTS.md` exist.
- [x] Raw TODOs and audit findings are migrated into ordered tickets.
- [x] Decision log, site map, references, and ticket template exist.
- [x] Knowledge-base files cover profile, current status, experience, education, projects, skills, interests, and brand.
- [x] ADR-001 records that code is authoritative and documentation mirrors it.
- [x] Legacy agent prompts are replaced by compatibility pointers.

## Outcome

The repository now supports deterministic "take the next ticket" handoff and requires agents to update tickets, decisions, site documentation, and the knowledge mirror as code evolves.

## Validation record

- The migrated agent system was revalidated by `npm run docs:check` on 2026-07-22.
