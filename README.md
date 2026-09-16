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
npm run clean
npm run lint
npm run typecheck
npm run docs:check
npm run check
```

`npm run docs:check` validates the agent-system structure against the current code inventory. `npm run check` runs that guardrail plus TypeScript. `npm run lint` currently opens Next.js's interactive ESLint setup. The build uses `next/font/google`, so a first build may need network access for the DM font files.

Development artifacts live in `.next-dev/`; production keeps Next.js's standard `.next/` build directory and `out/` static export. Keeping the development cache separate prevents a production build from invalidating a running development server's webpack chunks. If either cache becomes stale, stop the server, run `npm run clean`, then restart `npm run dev`.

## Deployment

`next.config.mjs` exports the app to `out/`. A push to `main` triggers the GitHub Pages workflow, which installs with `npm ci`, builds, uploads `out/`, and deploys it.

GitHub activity data is generated as a sanitized static snapshot during the build. The `GitHubActivity` UI and snapshot route remain in source, but the section is not mounted under `PORT-054`.

## Agent workflow

Read [`AGENTS.md`](AGENTS.md) and [`agents/README.md`](agents/README.md). The production code under `src/` is the source of accuracy; the agent documentation mirrors it. [`agents/TICKETS.md`](agents/TICKETS.md) is the ordered work index and links to one detail file per ticket under [`agents/ticket/`](agents/ticket/).
