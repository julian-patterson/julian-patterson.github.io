# Operating instructions for coding agents

These instructions apply to the whole repository through the root `AGENTS.md` entry point.

## Required reading

Before starting any ticket, read in this order:

1. `agents/TICKETS.md`
2. `agents/DECISIONS.md`
3. `agents/SITE.md`
4. `agents/knowledge-base/README.md`
5. Only the knowledge-base files and source files relevant to the selected ticket

Do not treat old prompts in `redesign.md`, `edits/`, or git history as current requirements.

## When asked to "take the next ticket"

1. Do not invent a new ticket if an eligible one exists.
2. Ignore `Done` and `Blocked` tickets.
3. If a ticket is already `In progress`, continue that ticket before starting another unless it is assigned to a different active agent.
4. Otherwise select the first `Ready` ticket in the backlog table, ordered by priority (`P0` before `P1`, then `P2`, then `P3`) and finally by table order.
5. Confirm its dependencies are `Done`. Change its status to `In progress`, add `Owner: <agent or human>` and `Started: YYYY-MM-DD` to its detail block, then implement it.
6. Work on one ticket only. If necessary work is out of scope, add a linked follow-up ticket.
7. If no ticket is eligible, report the exact blocker or owner question. Never resolve missing personal facts, URLs, brand choices, privacy consent, or credentials by guessing.

## Ticket lifecycle

Allowed states are `Ready`, `In progress`, `Blocked`, and `Done`.

- `Ready`: sufficiently specified, dependencies complete, can be implemented now.
- `In progress`: actively owned. Keep notes current enough for another agent to resume.
- `Blocked`: include a concrete blocker and the smallest owner decision/input needed.
- `Done`: acceptance criteria met, validation recorded, and related documentation synchronized.

When completing a ticket:

1. Check every acceptance criterion.
2. Run the validation appropriate to the change and record exact commands/results in the ticket.
3. Update `SITE.md` if architecture, routes, sections, integrations, commands, or deployment changed.
4. Update `knowledge-base/` if owner-approved facts changed.
5. Add or supersede a decision when a durable choice was made.
6. Mark the ticket `Done`, set `Completed: YYYY-MM-DD`, and add a short outcome plus changed paths.

## Authority order

Use this precedence when sources conflict:

1. the user's explicit instruction in the current request;
2. the current production code under `src/` and its runtime behavior;
3. accepted decisions in `agents/DECISIONS.md`;
4. the selected ticket's acceptance criteria;
5. documentation under `agents/`, which must be synchronized to the sources above;
6. historical prompts and git history.

An owner edit to `agents/knowledge-base/` is a requested website change, not an already-live fact. Apply it to code, then update the documentation to describe the resulting code. If an agent discovers ordinary code/documentation drift without an explicit change request, code wins and the documentation must be corrected.

## Content and knowledge rules

- The code is canonical. The knowledge base is an owner-editable, structured mirror that makes coordinated code updates easier.
- Never invent or silently "freshen" roles, dates, locations, metrics, project status, links, reading, training data, or integration data. Reproduce the code exactly until the user requests a change.
- Documentation may flag a risk or pending ticket, but it must not relabel current code content as inaccurate.
- Respect `Public`, `Private`, and `Needs approval` labels. Do not publish private or unapproved information.
- Every time-sensitive record needs `as_of` and ideally `review_after`.
- Before closing a content ticket, search the whole repository for the old and new facts. Personal data is duplicated across metadata, Hero, About, Experience, Projects, Journey, Now, Terminal, Contact, and other sections.
- Preserve confidentiality. Do not add employer/client details beyond approved claims.
- Do not put secrets or private API tokens in source, generated static assets, screenshots, tickets, or the knowledge base.

## Engineering rules

- Preserve the current Next.js 14 App Router, TypeScript, static export, and GitHub Pages path unless an accepted decision changes them.
- A static export cannot depend on a runtime Next.js API route. Integrations must use build-time public data, a deliberately chosen external service, or be omitted.
- Prefer shared content/data modules over repeating facts inside JSX, but do not perform unrelated refactors.
- Treat animations as enhancement: content must remain readable if JavaScript, GSAP, an integration, or `prefers-reduced-motion` disables motion.
- Support keyboard, touch, focus visibility, and semantic HTML. Hover-only and clickable-`div` interfaces are incomplete.
- Use the npm lockfile. Do not update both npm and Yarn dependency state.
- Never change personal copy merely to make a layout fit; create or use a content decision instead.

## Definition of done

Run the relevant subset locally; tickets that affect production UI should eventually satisfy all of these:

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run docs:check
```

Also verify:

- no new browser console or hydration errors;
- internal anchors and external links work, with no placeholder `href="#"` shipped as a project link;
- responsive behavior at 320, 375, 768, 1024, and 1440 CSS pixels;
- keyboard-only navigation, visible focus, touch interactions, and reduced motion;
- factual strings are synchronized across all mapped surfaces;
- static export and GitHub Pages compatibility;
- no secrets or unapproved personal data in the diff or generated output.

If a required check is unavailable because of environment/network constraints, record the exact limitation. Do not claim it passed.

## Maintaining this system

- New work goes in `TICKETS.md`, not `TODO` or prose comments.
- New durable choices are appended to `DECISIONS.md`; never rewrite history. Mark old decisions `Superseded` and link the replacement.
- New personal information supplied through a knowledge-base edit or prompt must be implemented in website code and then reflected in the best matching knowledge-base file.
- Changes to repository reality must be reflected in `SITE.md` in the same ticket.
- Keep this file short and operational. Put facts in the knowledge base, work in tickets, and explanations in `SITE.md` or decisions.
