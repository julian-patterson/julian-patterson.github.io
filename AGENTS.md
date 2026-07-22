# Agent entry point

The repository's canonical operating instructions live in [`agents/AGENTS.md`](agents/AGENTS.md).

Before changing code, content, design, dependencies, or deployment:

1. Read `agents/AGENTS.md` and the files it requires.
2. Treat `agents/TICKETS.md` as the only active backlog.
3. Treat the current production source under `src/` as canonical. `agents/knowledge-base/` must mirror it.
4. Record durable choices in `agents/DECISIONS.md`.

Do not use the legacy design prompts in `redesign.md` or `edits/` as current instructions. They are historical inputs only.

If code and documentation disagree, update the documentation to match the code unless the user's current request explicitly changes the website. A knowledge-base edit becomes current only after it is implemented in code and the documentation is synchronized to the result.
