# Skills

The current D3 graph contains hardcoded skill nodes, categories, and relationship weights. Those visual relationships are not evidence of proficiency.

Last synchronized from code: 2026-09-07

## Skill groups implemented in the site

- Software engineering: TypeScript/JavaScript, Node.js, React, Next.js, Docker, GitHub Actions
- Data and machine learning: Python, PyTorch/PyTorch Geometric, NLP, graph neural networks, time series, statistics
- Backend/data: Supabase, Stripe, APIs, database schema design, multi-tenant data isolation
- Cloud/infrastructure: Google Cloud, Terraform, AWS
- Systems/tools: Go, Rust, Raspberry Pi, SSH, Git
- Domain knowledge: logistics and operations, pricing and contracts, scheduling systems, payment processing
- Languages: English, French

## AI / agentic cluster — added by PORT-041

`Agentic AI`, `MCP`, and `AI Governance` nodes were added on 2026-09-07 from the résumé record, which calls this "a differentiating skill cluster". Also added: `Node.js`, `Google Cloud`, `Terraform`, `Stripe`, and `Figma / UI Design`.

Limits carried over from the record:

- AWS Bedrock and Microsoft Copilot Studio were **evaluated**, not run in production. They are not graph nodes for that reason.
- Multi-agent orchestration, prompt engineering, RAG, LLMaaS, and LLM guardrails come from research at Hapag-Lloyd. Do not imply production implementation; they are deliberately not graph nodes.
- **Harness engineering is NOT claimable** — researched, never performed. Never add it.
- Go is listed nowhere as a backed skill since Transfer CLI was retired from the CV; the graph still carries a `go` node from earlier code.

## PORT-039 note

The freight-specific `AIS Data` and `SCFI Index` nodes were removed on 2026-09-07 and replaced by a `Time Series` node. The `Freight Forwarding`, `Carrier Contracts`, and `Container Logistics` domain nodes became `Logistics & Ops`, `Pricing & Contracts`, and `Scheduling Systems`. `PyTorch Geometric` and `Graph Neural Nets` were retained as general ML skills.

## Evidence model

Before publishing a skill, attach at least one owner-verified evidence reference:

```markdown
- Skill: TypeScript
  category: Software engineering
  evidence: AnyTime Technologies; this portfolio
  last_used: YYYY-MM
  level: omit unless Julian explicitly chooses a scale
  publication: Public
  source_status: Canonical code
```

Do not infer expertise from a dependency in `package.json`, a generated prototype, or old copy.
