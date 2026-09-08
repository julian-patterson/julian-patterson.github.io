# PORT-040 — Restore Hapag-Lloyd as completed experience

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-07, immediately after PORT-039
- Depends on: PORT-039
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Context

PORT-039 deleted the Hapag-Lloyd entry along with the rest of the Hamburg content. Julian then clarified that the internship is experience he actually holds and asked for it back. The removal target was the relocation narrative ("moving to Hamburg in May 2026", "incoming", "T-minus 5 weeks"), not the employment record.

Three facts were unresolved and could not be inferred without guessing on a CV, so they were put to the owner directly:

- Status and dates. The site said "May 2026 · Upcoming"; `CURRENT.md` recorded "in progress" as of 2026-07-22. Owner answer: finished, summer 2026.
- Title. The site said "AI & Analytics Intern"; the owner supplied "AI Hub Intern" on 2026-07-22. Owner answer: AI Hub Intern.
- Location. Owner answer: show "Hamburg, Germany".

## Scope

Changes:

- Adds one `ExperienceEntry` at the top of `src/components/Experience.tsx`: `May – Aug 2026`, `AI Hub Intern`, `Hapag-Lloyd`, `Hamburg, Germany`, tags Demand Forecasting / NLP / AWS / Recommendation Systems, and a past-tense note.
- Synchronizes `knowledge-base/EXPERIENCE.md`, `CURRENT.md`, `BRAND.md`, `PROFILE.md`, `SITE.md`, and `REVIEW-QUESTIONS.md`.

Deliberately unchanged:

- The Hero, About, Terminal, and metadata surfaces stay employer-free and relocation-free. PORT-039's removals there are not reverted.
- No "incoming", "upcoming", "next", or countdown wording returns anywhere.
- The note describes the work area only. The previous copy — "joining one of the world's largest container shipping companies … ML-driven analytics and document automation" — described *planned* work; restating it as completed work would violate the content rule against publishing planned work as delivered, so the note generalizes the supplied themes and claims no outcomes or metrics.

## Acceptance criteria

- [x] Hapag-Lloyd appears in Experience as a completed role with the owner-confirmed title, dates, and location.
- [x] No relocation, future-tense, or countdown framing is reintroduced on any surface.
- [x] No work claim is published that was previously recorded only as planned scope.
- [x] `SITE.md` and the knowledge base match the resulting code.
- [x] Typecheck, docs check, static build, and an export scan are recorded below.

## Validation record

Run on 2026-09-07:

- `npm run check` (`docs:check` + `tsc --noEmit`): passed.
- `npm run build`: passed; static export regenerated.
- Export scan: `Hapag-Lloyd`, `AI Hub Intern`, and `Hamburg, Germany` appear once each, all inside the Experience timeline. No "incoming", "upcoming", "→ Hamburg", or `hapag-lloyd.com` string is present.
- The timeline renders four entries with Hapag-Lloyd first and carrying the brass first-entry marker.

## Outcome

Hapag-Lloyd is back as work history rather than as a destination. Changed paths: `src/components/Experience.tsx`.
