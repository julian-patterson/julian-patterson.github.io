# Owner approval queue

Use this file for unresolved owner decisions only. Each question has a stable ID and status. Answers authorize ticket planning, not automatic website changes: source under `src/` remains authoritative until the linked ticket is implemented and the knowledge base is synchronized.

Reply by `RQ-###`. For “no change,” say **confirm current**. For changes, provide exact public wording, verified URLs where relevant, and publication limits. Do not include credentials, private customer data, or unapproved metrics.

<a id="rq-001"></a>
## RQ-001 — Current profile and status

- Status: Partially answered; deferred
- Affects: [PORT-001](ticket/PORT-001.md), [PORT-006](ticket/PORT-006.md), [PORT-020](ticket/PORT-020.md), [PORT-021](ticket/PORT-021.md), [PORT-022](ticket/PORT-022.md), [PORT-035](ticket/PORT-035.md)

### Owner response — 2026-07-22

- McGill remains ongoing; Julian plans to return to complete it.
- Hapag-Lloyd is in progress, with the supplied title “AI Hub Intern.”
- Prime Freight should remain unchanged for now.

### Owner response — 2026-09-07

- Remove the Hamburg relocation narrative from the site. Implemented by [PORT-039](ticket/PORT-039.md).
- Hapag-Lloyd is real completed experience and belongs in Experience: **AI Hub Intern**, **Hamburg, Germany**, **finished summer 2026**. Restored by [PORT-040](ticket/PORT-040.md); the dates/title/location question is closed.
- Prime Freight keeps its employer name but is described in domain-neutral terms.

### Still needed for Hapag-Lloyd

Confirm the exact end month and approve the published description. The current note generalizes the previously supplied work themes and claims no outcomes or metrics.
- AnyTime should remain current for now and be updated through PORT-011.
- Table the broader review until a dedicated agent conversation identifies missing learning/profile context.

### Still needed

Resolve the conflict between “still ongoing/returning to complete” and the supplied positioning draft’s “graduating Winter 2026.” Also confirm the current location wording — the site now says Montréal, QC with “open to relocating” — and any retained time-sensitive status copy.

<a id="rq-002"></a>
## RQ-002 — Audience, positioning, and freight

- Status: Partially answered
- Affects: [PORT-005](ticket/PORT-005.md), [PORT-006](ticket/PORT-006.md), [PORT-020](ticket/PORT-020.md), [PORT-021](ticket/PORT-021.md)

### Owner response — 2026-07-22

- Freight is **supporting expertise**.
- Positioning context: final-year McGill Software Engineering student with a Statistics minor; work at the intersection of logistics and software; current Hapag-Lloyd AI internship; prior Prime Freight internal-tool work; and CTO/founding-engineering responsibility for AnyTime’s multi-tenant sports-facility booking platform.

### Owner response — 2026-09-07

- Freight is **omitted** as identity and framing; Julian is not applying to freight-specific roles.
- Employment history is exempt: Hapag-Lloyd and Prime Freight remain as factual Experience entries with domain-neutral descriptions.
- Logistics stays only as a stated general interest.
- Recorded as [ADR-011](DECISIONS.md#adr-011) and implemented by [PORT-039](ticket/PORT-039.md).

### Still needed

Approve the primary audience, final positioning sentence, voice, primary call to action, and canonical portfolio domain. Reconcile the McGill completion wording through RQ-001 before publishing this context.

<a id="rq-003"></a>
## RQ-003 — Extra sections

- Status: Resolved
- Recorded by: [ADR-007](DECISIONS.md#adr-007)
- Parent ticket: [PORT-004](ticket/PORT-004.md)
- Implementation tickets: [PORT-020](ticket/PORT-020.md) through [PORT-034](ticket/PORT-034.md)

### Owner response — 2026-07-22

- Keep and revise: Hero, About, Experience, Projects, Stats, Skills Graph, Freight Explainer, Reading, GitHub Activity, Freight Network, Marathon, Terminal, Contact.
- Remove: Journey and Now.
- Combine Freight Network closely with Freight Explainer as one freight-focused area.
- Stats remains provisional pending an evidence/removal decision.
- Reading should avoid a stale “currently reading” feed; favorite reads is the leading option.
- Marathon should support accountability through Strava only if a safe, practical integration exists.
- Terminal remains provisional pending a useful interaction concept.

### Owner response — 2026-09-07

Freight Explainer, Freight Network, and Reading were removed instead of revised; see [ADR-011](DECISIONS.md#adr-011) and [PORT-039](ticket/PORT-039.md). The rest of the 2026-07-22 disposition stands.

<a id="rq-004"></a>
## RQ-004 — Typography policy

- Status: Resolved
- Recorded by: [ADR-013](DECISIONS.md#adr-013)
- Closed tickets: [PORT-007](ticket/PORT-007.md), [PORT-045](ticket/PORT-045.md)

### Owner response — 2026-07-22

Keep the current fonts and their current implementation.

### Owner response — 2026-09-15

Merge the `updated-font` UI work into the current content branch. PORT-045 applies its Geist display/body type, Space Mono metadata type, and selective text-scramble treatment; ADR-013 supersedes the older typography choice while leaving the site's content policy unchanged.

<a id="rq-005"></a>
## RQ-005 — Skills to emphasize

- Status: Open; decide during ticket
- Affects: [PORT-010](ticket/PORT-010.md), [PORT-025](ticket/PORT-025.md)

### Owner response — 2026-07-22

Make the skill-emphasis, evidence, grouping, and proficiency-model decision part of the Skills review ticket. PORT-025 should implement the resulting decision.

<a id="rq-006"></a>
## RQ-006 — Approved AnyTime content and URL

- Status: Open
- Affects: [PORT-011](ticket/PORT-011.md), [PORT-022](ticket/PORT-022.md), [PORT-023](ticket/PORT-023.md)

### Owner response — 2026-07-22

Keep all AnyTime content collection in PORT-011. The update must include Julian’s current role and responsibilities.

### Still needed

Provide public product scope, exact role and dates/status, responsibilities, architecture/key decisions, approved outcomes or metrics, verified URL(s), allowed screenshots, and publication constraints.

<a id="rq-007"></a>
## RQ-007 — Projects and public links

- Status: Open
- Affects: [PORT-012](ticket/PORT-012.md), [PORT-023](ticket/PORT-023.md), [PORT-034](ticket/PORT-034.md)

### Owner response — 2026-07-22

Keep the full project disposition, evidence, status, summary, contribution, stack, and public-link review in PORT-012.

<a id="rq-008"></a>
## RQ-008 — Reverse-scroll behavior

- Status: Resolved
- Implementation ticket: [PORT-009](ticket/PORT-009.md)

### Owner response — 2026-07-22

Content appears while scrolling down. If it leaves the viewport after the user scrolls back up, it should be eligible to appear again when scrolling down into it again.

<a id="rq-009"></a>
## RQ-009 — Spotify and Strava scope

- Status: Resolved for feasibility work
- Assessment ticket: [PORT-013](ticket/PORT-013.md)
- Conditional implementation: [PORT-032](ticket/PORT-032.md)

### Owner response — 2026-07-22

Do not add Spotify. Assess Strava in line with the Marathon ticket and table it if the available APIs do not make sense for the existing architecture. Never expose tokens or private activity.

<a id="rq-010"></a>
## RQ-010 — “Update AnyTime Website” scope

- Status: Resolved
- Closed duplicate: [PORT-019](ticket/PORT-019.md)
- Merged into: [PORT-011](ticket/PORT-011.md)

### Owner response — 2026-07-22

This means the AnyTime company presentation in this portfolio, not another repository. Update the portfolio presentation, including Julian’s role and responsibilities.

<a id="rq-011"></a>
## RQ-011 — Stats disposition and approved evidence

- Status: Resolved
- Affects: [PORT-024](ticket/PORT-024.md)

After PORT-024 inventories the current figures, choose **remove**, **retain approved current metrics**, or **replace with specified evidence**. For every retained metric, confirm its source, context, date, and publication approval.

### Owner response — 2026-09-07

**Remove.** Julian asked for the Impact section to be deleted, so no metric audit or approval is needed. [PORT-024](ticket/PORT-024.md) removed `Stats.tsx` and its CSS. The figures remain in the résumé record; they are simply no longer published on the site.

<a id="rq-012"></a>
## RQ-012 — Reading format and public list

- Status: Closed — no longer required
- Affects: [PORT-029](ticket/PORT-029.md)

[PORT-039](ticket/PORT-039.md) removed the Reading section on 2026-09-07, so no format decision is needed. If Julian later wants a reading list back, reopen this question: confirm whether it should be a stable **favorite reads** section or another format, and supply the public items, short labels/summaries, ordering, and verified links.

<a id="rq-013"></a>
## RQ-013 — Terminal disposition and concept

- Status: Open
- Affects: [PORT-033](ticket/PORT-033.md)

Choose **remove**, **retain with cleaned-up content**, or **redesign**. If redesigning, describe the useful interaction or visitor outcome; the implementation must not hide essential information inside simulated terminal output.

<a id="rq-014"></a>
## RQ-014 — Résumé content, format, and publication policy

- Status: Open
- Affects: [PORT-037](ticket/PORT-037.md)

Provide the current résumé source/file if one exists, then approve:

- primary audience and whether the repository produces one general résumé or named targeted variants;
- included sections, records, bullets, skills/projects, ordering, and the exact facts/links/contact fields allowed in a public résumé;
- Letter or A4, one or two pages, language(s), visual/font constraints, and desired PDF accessibility target;
- public `/resume/` navigation/CTA placement, PDF filename, open/download behavior, and whether each site deployment should publish the newest generated PDF automatically;
- whether the LaTeX template/source may remain public and whether release attachments are needed in addition to the website copy.

A PDF on public GitHub Pages is crawlable and cacheable; an unlisted route or `robots.txt` is not a privacy control. Do not approve facts or contact details here unless they may be public.
