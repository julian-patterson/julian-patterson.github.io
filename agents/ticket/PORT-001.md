# PORT-001 — Review time-sensitive profile content

- Status: Blocked
- Priority: P0
- Source: audit finding; current code in Hero/About/Experience/Terminal/layout/footer
- Depends on: PORT-035, owner input
- Owner: unassigned
- Blocker: the owner deferred the full profile audit; the conflicting McGill completion wording still requires reconciliation
- Required approvals: [RQ-001](../REVIEW-QUESTIONS.md#rq-001)

## Owner input received on 2026-07-22

- McGill is still ongoing and Julian plans to return to complete it; a separate positioning draft says “graduating Winter 2026,” so the exact public completion wording remains unresolved.
- Hapag-Lloyd is in progress; the supplied title is “AI Hub Intern.” Exact dates and publishable responsibilities remain unresolved.
- Prime Freight should remain as currently represented for now.
- AnyTime remains current for now and its next update belongs to PORT-011.
- Julian asked to table the broader profile/learning audit until a dedicated agent conversation identifies what is missing.

## Owner input received on 2026-09-07

- Remove every Hamburg and Hapag-Lloyd claim from the site. Implemented by [PORT-039](PORT-039.md), which also removed the relocation location wording; the site now says Montréal, QC and About adds "open to relocating."
- The remaining open item for this ticket is the McGill completion wording.

## Outcome

Apply Julian's requested updates, if any, to the canonical code and synchronize the knowledge base. Do not change content automatically based on today's date.

## Acceptance criteria

- [x] Location wording and the Hapag-Lloyd status question are resolved by PORT-039's removal.
- [ ] Julian resolves the McGill completion wording and any retained status language.
- [ ] All duplicate code surfaces are updated consistently.
- [ ] `knowledge-base/PROFILE.md`, `CURRENT.md`, `EXPERIENCE.md`, and `EDUCATION.md` match the resulting code.
- [ ] Metadata, footer, and other retained status labels are included in the search.

## Validation record

Not run yet.
