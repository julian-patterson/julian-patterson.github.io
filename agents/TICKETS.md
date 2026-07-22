# Portfolio ticket index

Last updated: 2026-07-23

This is the authoritative work queue. Each ticket's scope, approvals, acceptance criteria, validation, and outcome live in its linked Markdown file under `agents/ticket/`. Source under `src/` remains authoritative for the current website; tickets describe requested future changes.

## What an agent can work on next

**Next eligible ticket:** [PORT-002 — Eliminate hydration errors](ticket/PORT-002.md)

After PORT-002, use the first `Ready` row in the ordered active backlog whose ticket dependencies are `Done`. Ignore `Blocked` and completed tickets. If an `In progress` ticket exists and is not owned by another active agent, continue it first.

Current ready sequence by priority and table order:

1. [PORT-002](ticket/PORT-002.md)
2. [PORT-003](ticket/PORT-003.md)
3. [PORT-014](ticket/PORT-014.md)
4. [PORT-016](ticket/PORT-016.md)
5. [PORT-017](ticket/PORT-017.md)
6. [PORT-027](ticket/PORT-027.md)
7. [PORT-028](ticket/PORT-028.md)
8. [PORT-035](ticket/PORT-035.md)
9. [PORT-009](ticket/PORT-009.md)
10. [PORT-013](ticket/PORT-013.md)
11. [PORT-018](ticket/PORT-018.md)

## Ordered active backlog

| Order | Ticket | Priority | Status | Depends on |
| ---: | --- | --- | --- | --- |
| 1 | [PORT-001 — Review time-sensitive profile content](ticket/PORT-001.md) | P0 | Blocked | PORT-035, owner input |
| 2 | [PORT-002 — Eliminate hydration errors](ticket/PORT-002.md) | P0 | Ready | none |
| 3 | [PORT-003 — Repair undefined border tokens](ticket/PORT-003.md) | P0 | Ready | none |
| 4 | [PORT-005 — Define a general personal brand](ticket/PORT-005.md) | P0 | Blocked | PORT-004 and owner choice |
| 5 | [PORT-014 — Resolve static hosting versus GitHub activity](ticket/PORT-014.md) | P0 | Ready | none |
| 6 | [PORT-006 — Centralize repeated site content](ticket/PORT-006.md) | P1 | Blocked | PORT-001 and PORT-005 |
| 7 | [PORT-008 — Complete responsive and mobile QA](ticket/PORT-008.md) | P1 | Blocked | PORT-020, PORT-021, PORT-022, PORT-023, PORT-024, PORT-025, PORT-026, PORT-027, PORT-028, PORT-029, PORT-030, PORT-031, PORT-032, PORT-033, PORT-034 |
| 8 | [PORT-010 — Refine skills using code-backed evidence](ticket/PORT-010.md) | P1 | Blocked | owner choices |
| 9 | [PORT-011 — Expand and update AnyTime content](ticket/PORT-011.md) | P1 | Blocked | owner content and URL |
| 10 | [PORT-012 — Update projects and replace placeholder links](ticket/PORT-012.md) | P1 | Blocked | owner content and URLs |
| 11 | [PORT-016 — Repair README, linting, and validation docs](ticket/PORT-016.md) | P1 | Ready | none |
| 12 | [PORT-017 — Add reduced-motion and interaction accessibility](ticket/PORT-017.md) | P1 | Ready | none |
| 13 | [PORT-020 — Refresh the Hero section](ticket/PORT-020.md) | P1 | Blocked | PORT-001, PORT-005 |
| 14 | [PORT-021 — Clean up the About section](ticket/PORT-021.md) | P1 | Blocked | PORT-001, PORT-005 |
| 15 | [PORT-022 — Update the Experience section](ticket/PORT-022.md) | P1 | Blocked | PORT-001, PORT-011 |
| 16 | [PORT-023 — Clean up the Projects section](ticket/PORT-023.md) | P1 | Blocked | PORT-011, PORT-012 |
| 17 | [PORT-025 — Update the Skills Graph section](ticket/PORT-025.md) | P1 | Blocked | PORT-010 |
| 18 | [PORT-026 — Update the Freight Explainer section](ticket/PORT-026.md) | P1 | Blocked | PORT-005, PORT-012 |
| 19 | [PORT-027 — Remove the Journey section](ticket/PORT-027.md) | P1 | Ready | none |
| 20 | [PORT-028 — Remove the Now section](ticket/PORT-028.md) | P1 | Ready | none |
| 21 | [PORT-030 — Retain and polish GitHub Activity](ticket/PORT-030.md) | P1 | Blocked | PORT-014 |
| 22 | [PORT-031 — Combine Freight Network with the freight explainer](ticket/PORT-031.md) | P1 | Blocked | PORT-026 |
| 23 | [PORT-034 — Retain and audit the Contact section](ticket/PORT-034.md) | P1 | Blocked | PORT-012 |
| 24 | [PORT-035 — Run a profile and learning discovery review](ticket/PORT-035.md) | P1 | Ready | none |
| 25 | [PORT-037 — Establish a shared website and résumé source of truth](ticket/PORT-037.md) | P1 | Blocked | PORT-006 |
| 26 | [PORT-009 — Replay entrance effects after scroll re-entry](ticket/PORT-009.md) | P2 | Ready | none |
| 27 | [PORT-013 — Assess a privacy-safe Strava integration](ticket/PORT-013.md) | P2 | Ready | ADR-003 or the current static-export constraint |
| 28 | [PORT-018 — Standardize on npm](ticket/PORT-018.md) | P2 | Ready | none |
| 29 | [PORT-024 — Decide the future of the Stats section](ticket/PORT-024.md) | P2 | Blocked | none |
| 30 | [PORT-029 — Reframe the Reading section](ticket/PORT-029.md) | P2 | Blocked | none |
| 31 | [PORT-032 — Make Marathon an accountable Strava-backed section](ticket/PORT-032.md) | P2 | Blocked | PORT-013 |
| 32 | [PORT-033 — Redesign or remove the Terminal section](ticket/PORT-033.md) | P2 | Blocked | PORT-001, PORT-005 |

## Completed tickets

| Ticket | Priority | Completed | Outcome |
| --- | --- | --- | --- |
| [PORT-004 — Audit and simplify the section set](ticket/PORT-004.md) | P0 | 2026-07-22 | Owner dispositions recorded; PORT-020–PORT-034 created |
| [PORT-007 — Confirm the current typography system](ticket/PORT-007.md) | P1 | 2026-07-22 | Current fonts retained; no site change |
| [PORT-015 — Establish the agentic maintenance system](ticket/PORT-015.md) | P1 | 2026-07-22 | Initial maintenance system established |
| [PORT-019 — Clarify the separate AnyTime website update](ticket/PORT-019.md) | P2 | 2026-07-22 | Closed as duplicate of PORT-011 |
| [PORT-036 — Migrate the backlog to per-ticket files](ticket/PORT-036.md) | P0 | 2026-07-22 | Standalone ticket files and synchronized work index established |

## Synchronization rule

When a ticket changes status, priority, title, or dependencies, update both this index and its ticket file in the same change. New work requires a new `agents/ticket/PORT-###.md` file and one index row; do not restore detail blocks to this file.
