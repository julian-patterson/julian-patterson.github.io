# PORT-041 — Rebuild Experience from the canonical résumé record

- Status: Done
- Priority: P0
- Source: owner request on 2026-09-07 supplying `/home/julian/Development/resume/content/experience.md`
- Depends on: PORT-040
- Required approvals: none
- Owner: agent
- Started: 2026-09-07
- Completed: 2026-09-07

## Context

Julian supplied the canonical experience record maintained in his separate `resume` repository and asked to update the website from it, generalizing each entry "to just the skills I learnt rather than labeling exactly what I did".

That record is governed: it marks facts as verified, `CONFLICT`, or `UNVERIFIED`, and carries explicit `NOT CLAIMABLE`, `STATUS`, `SCOPE`, and `ATTRIBUTION` constraints. It also showed that several site facts had gone stale.

Stale facts the record corrected:

| Site said | Record says |
| --- | --- |
| AnyTime Technologies | Renamed to **Stride**; use Stride alone, no "formerly" |
| Stride/AnyTime `2024 – Present` | `May 2025 – present`; the 2024 date was simply wrong |
| `CTO & Technical Lead` | **Founder & Chief Technology Officer** |
| Prime Freight `2024 – Present` | `May 2024 – Mar 2026`; the record flags "2024 – Present" as **now false** |
| McGill `2023 – 2026` | `2023 – Dec 2026 (expected)`; a bare 2026 reads as lapsed |
| Activities include McGill AI Alignment | **No longer active**; must be removed |
| `Native EN · FR` | "Native" is **retired**; the resolved value is "Fluent" |

## Scope

Changes:

- Rewrites all four `Experience` entries at the skills/capability level and reorders them Hapag-Lloyd → Stride → Prime Freight → McGill, matching the record's stated ordering.
- Applies every stale-fact correction in the table above across `Experience.tsx`, `About.tsx`, `Hero.tsx`, `Projects.tsx`, and `layout.tsx`.
- Replaces the featured project's placeholder `href="#"` with `https://strideapp.ca`, which the record verifies as a live public site.
- Adds the skill nodes the record newly backs: `Agentic AI`, `MCP`, `AI Governance`, `Node.js`, `Google Cloud`, `Terraform`, `Stripe`, `Figma / UI Design`.

Constraints honoured from the record:

- **Hapag-Lloyd.** No claim that the governance framework was adopted, is policy, or governs anything; no claim the marketplace shipped, launched, or is in production, live, or serving employees; no adoption or usage figures. Wording stays inside what the reference letter supports rather than asserting sole design. No security-control implementation and no coding-agent benchmarking is claimed. The entry reads as enablement and governance, not as a hands-on software engineering role, per the record's FRAMING note.
- **Stride.** Uses the owner-approved "architected and built" register with "most of", never sole authorship — the Git audit shows 50 of 236 commits are other people's. No operating, usage, revenue, or facility count appears; the record permits "built", never "operating".
- **Prime Freight.** Kept domain-neutral per PORT-039. Infrastructure wording stays within the 2026-08-01 confirmations and does not sharpen into solo-authorship claims.
- **McGill.** The AI Society role is named without converting its planning estimates into delivered outcomes.

Deliberately unchanged:

- Metric values in `Stats.tsx`. Generalizing the Experience bullets moved the numbers out of the timeline; Stats still carries them, and every figure there remains supported by the record.
- `Freight Lens` was not added — it is a freight project and PORT-039 removed that framing.
- `Transfer CLI` and the portfolio site itself remain project cards even though the record retired both from the CV. That is a CV-scope decision; removing site sections was not requested.
- `primefreight.com` is not linked anywhere, per the record's explicit instruction not to present another person's frontend as Julian's.

## Open questions raised for the owner

- **Job title.** The site now shows Julian's chosen "AI Hub Intern". The record flags that his official title is "AI & Analytics Intern" and recommends "AI & Analytics Intern, AI Hub" as safer under reference check.
- **French proficiency.** The record's resolved value is "fluent", but on 2026-09-04 Julian described himself as conversational. The site says "Fluent EN · FR" and "English · French". Unresolved in the record; not resolved here.

## Acceptance criteria

- [x] Every stale fact in the table above is corrected on all surfaces that carry it.
- [x] Entries read as transferable skills rather than itemized accomplishments.
- [x] No claim contradicts a `NOT CLAIMABLE`, `STATUS`, `SCOPE`, or `ATTRIBUTION` constraint in the record.
- [x] `SITE.md` and the knowledge base match the resulting code.
- [x] Validation recorded, including what could not be verified.

## Validation record

Run on 2026-09-07:

- `npm run check` (`docs:check` + `tsc --noEmit`): passed.
- `npm run build`: passed; static export regenerated.
- Skills-graph data validated by script: 36 nodes, 57 edges, no edge referencing a missing node, no orphan nodes.
- Export scan: `AnyTime`, `2024 – Present`, `Technical Lead`, `Native EN`, `AI Alignment`, and `2023 – 2026` all return zero matches. `Stride`, `Chief Technology Officer`, `May 2025 – Present`, `May 2024 – Mar 2026`, `Dec 2026`, and `strideapp.ca` are all present.
- Rendered page text at 1440px confirms four timeline entries in the intended order with the intended copy.
- No browser console errors; only the pre-existing `next/font` preload warnings.
- **Not verified — environment limitation.** The skills graph could not be visually confirmed. `ScrollTrigger.create` never fires in the automation browser used here, so `initGraph` does not run. This is not specific to the graph: the untouched `Stats` counters are frozen at `0` with zero-width bars in the same session, which is the same gate. The graph's data integrity was verified statically instead, and the change is data-only. Confirm the graph in a real browser before deploying.

## Outcome

Experience now reflects the canonical record and reads as skills rather than a task list. Changed paths: `src/components/Experience.tsx`, `src/components/About.tsx`, `src/components/Hero.tsx`, `src/components/Projects.tsx`, `src/components/SkillsGraph.tsx`, `src/app/layout.tsx`.
