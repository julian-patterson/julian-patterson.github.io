# Julian Patterson portfolio

Source for Julian Patterson's single-page portfolio website.

## Current stack

- Next.js 14 App Router, React 18, and TypeScript
- Tailwind CSS plus component-level styles
- GSAP/ScrollTrigger, D3, and Carbon icons
- Static export deployed to GitHub Pages by `.github/workflows/nextjs.yml`

## Local development

Use Node.js 20 and npm, matching CI:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run docs:check
npm run check
```

`npm run docs:check` validates the agent-system structure against the current code inventory. `npm run check` runs that guardrail plus TypeScript. `npm run lint` currently opens Next.js's interactive ESLint setup; fixing that is tracked in `PORT-016`. The build uses `next/font/google`, so a first build may need network access for the DM font files.

## Deployment

`next.config.mjs` exports the app to `out/`. A push to `main` triggers the GitHub Pages workflow, which installs with `npm ci`, builds, uploads `out/`, and deploys it.

The current GitHub activity implementation calls a Next.js API route even though GitHub Pages is static. `PORT-014` tracks that architecture mismatch.

## Agent workflow

Read [`AGENTS.md`](AGENTS.md) and [`agents/README.md`](agents/README.md). The production code under `src/` is the source of accuracy; the agent documentation mirrors it. The ordered backlog is [`agents/TICKETS.md`](agents/TICKETS.md).
