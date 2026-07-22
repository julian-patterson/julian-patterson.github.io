# Portfolio agent system

This directory is the operating system for maintaining Julian Patterson's portfolio. It separates six things that were previously mixed together in component files and old prompts:

- **work ordering and current status** — [`TICKETS.md`](TICKETS.md)
- **one file per ticket** — [`ticket/`](ticket/)
- **owner approvals** — [`REVIEW-QUESTIONS.md`](REVIEW-QUESTIONS.md)
- **durable choices** — [`DECISIONS.md`](DECISIONS.md)
- **a human-editable mirror of website information** — [`knowledge-base/`](knowledge-base/README.md)
- **the current technical/content map** — [`SITE.md`](SITE.md)

## Owner workflow

Common requests can be short:

- "Take the next ticket." The agent follows the selection algorithm in `AGENTS.md`, opens the linked ticket file, and keeps its status synchronized with the index.
- "Review the open questions." Answer the prompts in `REVIEW-QUESTIONS.md`; agents then update the linked blocked tickets and any resulting decisions or content changes.
- "Update my current status from the knowledge base." Edit `knowledge-base/CURRENT.md`, then ask the agent to apply that requested change to every mapped website surface and re-sync the documentation.
- "I finished a new project." Add the facts and links to `knowledge-base/PROJECTS.md`; the agent should create or update a ticket before publishing them.
- "Record this decision." The agent appends a dated entry to `DECISIONS.md` and updates affected tickets.
- "Add this idea to the backlog." The agent adds a fully formed ticket rather than a loose checkbox.

The code is the current source of accuracy. Documentation should reproduce it faithfully, including content that a ticket proposes changing. Use `TBD` only for information that the code itself leaves unknown or as a clearly labeled proposed addition.

## Directory map

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Mandatory agent workflow and definition of done |
| `TICKETS.md` | Ordered active backlog, completed index, current status, dependencies, and next eligible work |
| `ticket/PORT-###.md` | One file per ticket containing scope, approvals, acceptance criteria, validation, and outcome |
| `REVIEW-QUESTIONS.md` | Single queue of unresolved owner approvals, linked from blocked tickets |
| `DECISIONS.md` | Append-only architecture, content, and brand decision log |
| `SITE.md` | Repository architecture, section inventory, fact-bearing surfaces, and known risks |
| `REFERENCES.md` | Design/research links from the original TODO |
| `knowledge-base/*.md` | Owner-editable facts and publication constraints |
| `templates/TICKET.md` | Template for adding a ticket |

## Canonicality

Production source under `src/` is authoritative for the current website. `agents/` is its operating index and must be updated whenever code changes. `TODO`, `CLAUDE.md`, `.cursorrules`, `.agents/AGENTS.md`, `.github/copilot-instructions.md`, `redesign.md`, and `edits/` are not active backlogs; compatibility files point here and historical files remain research context only.
