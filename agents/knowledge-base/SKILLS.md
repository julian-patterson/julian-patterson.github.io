# Skills

Last synchronized from code: 2026-09-15 (PORT-050)

The current D3 graph contains exactly 37 owner-approved skill nodes in five categories. Julian's 2026-09-15 request is the publication authority for these labels; inclusion, node placement, and graph relationships are not evidence of proficiency.

## Skill groups implemented in the site

- **Languages (7):** Python, TypeScript, JavaScript, SQL, HTML / CSS, Java, C
- **Data & ML (9):** PyTorch, Pandas / NumPy, NLP, Transformers, CNNs / Computer Vision, LSTM / GRU, Regression & Classification, Agentic AI, Model Context Protocol (MCP)
- **Infrastructure (10):** Docker, Google Cloud Platform, Cloud Run, Cloud Tasks, Terraform, GitHub Actions, Supabase, PostgreSQL, REST API Design, Node.js
- **Frontend (5):** React, React Native, Material UI, i18next / Localization, Figma / UI Design
- **Domain (6):** AI Governance & Risk Assessment, Freight Forwarding & Container Logistics, Booking & Scheduling Systems, Stripe Payment Integration, Technical Leadership & Mentoring, Data Applications

## Graph presentation model

- All 37 nodes use the same visual weight (`2`). The graph does not publish beginner/intermediate/expert levels or any other proficiency scale.
- The 57 edges express intentional technical or domain relationships. Edge strength means relationship closeness, never proficiency.
- All nodes render at every viewport width. Desktop uses a force layout with wrapped-label collision spacing and bounded positions; compact widths use a stable category-aware layout and a container-width viewBox so labels remain readable.
- The SVG's accessible description repeats the exact five category lists. Legend buttons remain keyboard-operable category filters, and a selected filter is restored after temporary neighbor highlighting on hover.
- Reduced-motion mode settles the desktop force simulation synchronously, reveals edges without a D3 transition, and disables force-restarting node drag.
- `Freight Forwarding & Container Logistics` is a narrow, owner-approved skills-graph exception to the general no-freight-framing decision. It is a domain capability, not a return to a freight-led identity or relocation story.

## Evidence and publication limits

- Source status: Canonical code, from Julian's explicit 2026-09-15 request.
- Publication: Public for the website Skills Graph.
- PORT-010 remains ready to attach project/experience evidence and review the remaining interaction behavior. Do not infer evidence, recency, years, or proficiency from this owner-approved display list.
- AWS Bedrock and Microsoft Copilot Studio were evaluated, not run in production; neither is a graph node.
- Multi-agent orchestration, prompt engineering, RAG, LLMaaS, and LLM guardrails came from Hapag-Lloyd research context and are not graph nodes.
- **Harness engineering is NOT claimable** — researched, never performed. Never add it.

## Evidence model

Before publishing a skill, attach at least one owner-verified evidence reference:

```markdown
- Skill: TypeScript
  category: Software engineering
  evidence: Stride; this portfolio
  last_used: YYYY-MM
  level: omit unless Julian explicitly chooses a scale
  publication: Public
  source_status: Canonical code
```

Do not infer expertise from a dependency in `package.json`, a generated prototype, or old copy.
