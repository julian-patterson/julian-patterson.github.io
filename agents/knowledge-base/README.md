# Knowledge base

This is an owner-editable structured mirror of Julian's portfolio content. The current code under `src/` is the source of accuracy. If this directory and the code disagree, an agent updates these files to match the code unless Julian explicitly asks to apply a documentation edit to the website.

## Source labels

- **Canonical code** — the value currently implemented in production source; accurate for documentation purposes.
- **Requested change** — Julian edited or supplied a new value that still needs to be implemented in code.
- **Proposed** — an idea or ticket, not current website content.
- **Private** — context for maintenance only; never publish.
- **TBD** — the code or explicit request leaves the value unknown.

## Record fields

For facts that can expire, prefer this small schema:

```markdown
- value: ...
- publication: Public | Needs approval | Private
- source_status: Canonical code | Requested change | Proposed | TBD
- as_of: YYYY-MM-DD
- review_after: YYYY-MM-DD or event
- source: owner | URL | repository path
```

Mirror the wording and dates in code exactly. A ticket may propose reviewing them, but documentation does not silently reinterpret them.

## Update protocol

When Julian edits a knowledge-base fact and asks for a website update, the agent must:

1. treat the edited value as a requested change from Julian;
2. clarify only if publication status or intended wording is unsafe/ambiguous;
3. search all fact-bearing surfaces listed in `../SITE.md`;
4. update every relevant code instance, including metadata and footer copy;
5. re-read the resulting code and update this knowledge base to match it exactly;
6. run relevant validation and close or create a ticket.

Never automatically rewrite time-sensitive code based only on today's date. For example, a date passing does not authorize changing "incoming" to "current"; that requires an explicit request.

## Files

- [`PROFILE.md`](PROFILE.md) — identity, bios, contact, language, location
- [`CURRENT.md`](CURRENT.md) — deliberately time-sensitive status
- [`EXPERIENCE.md`](EXPERIENCE.md) — roles and approved impact claims
- [`EDUCATION.md`](EDUCATION.md) — degrees, coursework, activities
- [`PROJECTS.md`](PROJECTS.md) — projects, research, links, evidence
- [`SKILLS.md`](SKILLS.md) — skills backed by experience/projects
- [`INTERESTS.md`](INTERESTS.md) — running, reading, music, home automation
- [`BRAND.md`](BRAND.md) — audience, voice, positioning, visual constraints
