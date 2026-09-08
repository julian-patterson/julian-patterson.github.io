# Experience

Last synchronized from code: 2026-09-07 (PORT-041)

Every record below mirrors the canonical code. Owner questions are proposed backlog inputs and do not reduce the accuracy of the current documentation.

## Upstream source of truth

Since 2026-09-07 (PORT-041) the facts in this file derive from Julian's separately maintained canonical record at `/home/julian/Development/resume/content/experience.md`. That file is governed: it marks facts verified / `CONFLICT` / `UNVERIFIED` and carries explicit `NOT CLAIMABLE`, `STATUS`, `SCOPE`, and `ATTRIBUTION` limits. **Read it before changing any Experience copy**, and never publish a claim it forbids. `src/` remains authoritative for what the site currently says; the résumé record is authoritative for what is true.

## Hapag-Lloyd

- Role: AI Hub Intern (site) — **official title is "AI & Analytics Intern"**; see the open question below
- Dates: May – Aug 2026 (completed)
- Location: Hamburg, Germany
- Team/scope: AI Hub, Data Insights & AI department — Agentic AI governance and enablement
- Publication: Needs approval
- Source status: Canonical code, derived from the résumé record
- Website claims (skills-level, set by PORT-041):
  - AI enablement at enterprise scale — designing intake and risk-assessment processes for agentic AI, and assessing platforms against real use cases;
  - turning cross-functional working-group discussions into followable workflows, carried through security, data-protection, and architecture review;
  - working where requirements are still forming, and presenting a technical position to senior stakeholders;
  - tags Agentic AI, AI Governance, Risk Modelling, MCP, Facilitation.
- **Must never be claimed on the site** (from the résumé record): that the governance framework was adopted, is company policy, or governs anything today; that the internal AI marketplace shipped, launched, is in production, live, or serving employees; any adoption or usage figure; sole design of the governance framework unqualified; implementation of security controls; benchmarking of coding agents; or the role as hands-on software engineering.
- History: PORT-039 removed the entry on 2026-09-07; PORT-040 restored it the same day; PORT-041 rewrote it from the résumé record at skills level.
- Deliberately not restored: the relocation framing. The Hero's "McGill University → Hapag-Lloyd Hamburg" line, the "Montréal → Hamburg (May 2026)" About row, the `ping hapag-lloyd.com` terminal command, and the "incoming"/"upcoming" tense are gone and must stay gone. The entry appears only in Experience.
- Owner questions:
  - **Title.** The site shows Julian's chosen "AI Hub Intern". The résumé record flags that his official title is "AI & Analytics Intern" and recommends "AI & Analytics Intern, AI Hub" as safer under reference check. Unresolved.
  - Should site metadata mention the role, or stay employer-free as it is now?

## Prime Freight Logistics

- Role: Software Developer
- Dates: **May 2024 – Mar 2026** — full-time summers 2024 and 2025, part-time through the 2025–26 academic year. The former "2024 – Present" was false; corrected by PORT-041.
- Location: Montréal, QC
- Stack: Node.js, React, Google Cloud (Cloud Run, Cloud Tasks, Artifact Registry), Terraform, Docker, GitHub Actions
- Publication: Needs approval
- Source status: Canonical code, derived from the résumé record
- Website claims (skills-level, set by PORT-041):
  - backend and data engineering on internal tooling — pricing logic, document parsing, automated reporting pipelines;
  - serverless architecture on Google Cloud: a public API and an internal batch worker from one container image, decoupled by a task queue, infrastructure in Terraform;
  - parsers that adapt to inconsistent input, with logging and notifications that make failures findable.
- The quantified metrics (2,000+ records/month, 100% accuracy, 10% → 100% coverage, 500+ minutes, 83%, 50%, 1,000+ records) are **no longer published on the website**. PORT-041 moved them out of the Experience timeline into `Stats`, and PORT-024 then removed `Stats` on 2026-09-07 at Julian's request. All remain supported by the résumé record and may be republished if he asks; nothing about their accuracy or approval changed.
- PORT-039 note: the employer name is retained as a factual employment record with domain-neutral wording.
- **Do not** link `primefreight.com` as a portfolio piece — the résumé record is explicit that the visible portal frontend is not Julian's work.

## Stride

- **Renamed from "AnyTime Technologies" to Stride.** Use Stride alone, with no "formerly". Applied sitewide by PORT-041.
- Role: **Founder & Chief Technology Officer**
- Dates: **May 2025 – Present**. The former "2024 – Present" was wrong; the repository's first commit is May 2025. Tenure is ~16 months, not ~2 years — no surface may describe it as two years of work.
- Location: Montréal, QC
- Public site: `https://strideapp.ca` — verified live and publicly in open beta, with an EN/FR toggle. This replaced the placeholder `#` project link.
- Stack: React, React Native, TypeScript, Supabase (Auth, Row Level Security, Edge Functions, Storage), Stripe, Resend, GitHub Actions, Playwright
- Publication: Needs approval
- Source status: Canonical code, derived from the résumé record
- Website claims (skills-level, set by PORT-041):
  - architected and built **most of** a multi-tenant booking platform — web, React Native mobile, backend;
  - technical leadership: architecture and roadmap ownership, code review, mentoring a team of three developers;
  - multi-tenant data isolation, concurrency-safe scheduling, payments, and a CI/CD pipeline gated on end-to-end tests;
  - co-created the component library in Figma and implemented it.
- **Attribution limit.** A Git audit shows Julian authored 165 of 236 commits (~70% of all, ~77% of human). "Architected and built" and "most of" are supported; **sole authorship is not** — 50 human commits are other people's. Never write "end to end", "single-handedly", or "built the entire platform".
- **Status limit.** Stride is in open beta, onboarding facilities, with **none live yet**, and is pre-revenue. Claim features as **built**, never as **operating**. No usage, revenue, or customer figure may appear; the operator-console screenshots show demo data.
- Owner questions:
  - PORT-011's remaining scope: which product claims, customers, metrics, or partner names are public.

## Adding an experience

Include company, title, employment type, exact dates, location/remote status, concise responsibilities, outcome metrics with provenance, technologies only when materially used, public links, publication approval, and `as_of`.
