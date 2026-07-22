# Current website map and review

Last synchronized from code and runtime: 2026-07-22

The source under `src/` is authoritative. This file is a navigational map and audit record, not a replacement for reading the relevant code.

## Stack and deployment

- Next.js 14.2.35, App Router, React 18, TypeScript strict mode
- Tailwind CSS 3 plus extensive inline styles
- GSAP/ScrollTrigger animation, D3 skills visualization, Carbon icons
- `next.config.mjs` sets `output: "export"` and `trailingSlash: true`
- `.github/workflows/nextjs.yml` builds with Node 20/npm and deploys `out/` to GitHub Pages
- `src/app/layout.tsx` uses Google-hosted DM Serif Display, DM Sans, and DM Mono through `next/font/google`

Commands currently defined in `package.json`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Observed validation on 2026-07-22:

- `npx tsc --noEmit`: passed (reported by both audit agents)
- `npm run lint`: opens Next.js's interactive ESLint setup because lint is not configured
- local browser: rendered after rebuilding a stale `.next` cache; a hydration error overlay remains
- production build: local audit could not complete because `next/font/google` required network/DNS access

## Page composition

`src/app/page.tsx` mounts 15 sections in this order:

| Order | Component | Anchor | Purpose/status in current code |
| --- | --- | --- | --- |
| 1 | `Hero` | top | Name, headline, location/time, CTAs, letter animation |
| 2 | `About` | `#about` | Bio and personal metadata |
| 3 | `Experience` | `#experience` | Work and education timeline |
| 4 | `Projects` | `#projects` | Featured research plus four project cards |
| 5 | `Stats` | `#stats` | Freight-work impact counters/charts |
| 6 | `SkillsGraph` | `#skills` | Interactive D3 skill graph |
| 7 | `FreightExplainer` | `#research` | Freight Network Intelligence explainer |
| 8 | `Journey` | `#journey` | Personal/education/work location timeline |
| 9 | `Now` | `#now` | Current location, work, learning, reading, training, countdown |
| 10 | `Reading` | `#reading` | Papers/books/services being read |
| 11 | `GitHubActivity` | `#activity` | Contribution heatmap fetched from `/api/github` |
| 12 | `FreightNetwork` | `#freight-network` | Animated shipping network visualization |
| 13 | `Marathon` | `#marathon` | Running stats/chart; source comments label data as placeholder |
| 14 | `Terminal` | `#terminal` | Interactive faux terminal with personal/project output |
| 15 | `Contact` | `#contact` | Email, LinkedIn, GitHub-labelled URL, footer |

`page.tsx` explicitly labels `FreightNetwork`, `Marathon`, and `Terminal` as template sections for evaluation. This is a code fact, not an instruction to remove them; ticket `PORT-004` handles the requested audit.

Navigation exposes only About, Experience, Projects, and Contact, with a mobile full-screen menu.

## Fact-bearing surfaces

When personal information changes, search all of these rather than updating only the obvious card:

| Information | Current consumers |
| --- | --- |
| Name, headline, domains | `layout.tsx`, `Hero.tsx`, `Contact.tsx` |
| Status, role, location, languages | `Hero.tsx`, `About.tsx`, `Journey.tsx`, `Now.tsx`, `Terminal.tsx`, `Contact.tsx`, `layout.tsx` |
| Work and education | `Experience.tsx`, `About.tsx`, `Journey.tsx`, `Stats.tsx`, `Terminal.tsx`, `layout.tsx` |
| Projects/research | `Projects.tsx`, `FreightExplainer.tsx`, `FreightNetwork.tsx`, `SkillsGraph.tsx`, `Reading.tsx`, `Now.tsx`, `Terminal.tsx` |
| Interests/activity | `About.tsx`, `Now.tsx`, `Reading.tsx`, `Marathon.tsx` |
| Public links | `Projects.tsx`, `Reading.tsx`, `Contact.tsx`, `layout.tsx` |
| Brand/typography | `layout.tsx`, `globals.css`, `Hero.tsx`, `page.tsx`, and most components |

Use `rg` for both the old value and likely variants before closing a content ticket.

## Verified review findings

These are observed code/runtime facts. Their remediation is tracked separately in `TICKETS.md`.

- At 1280px the page is roughly 11,023px tall; at 390px it is roughly 15,585px tall. There was no horizontal overflow at 390px in the browser review, but the page is unusually dense.
- The 390px hero fits, uses the hamburger navigation, and preserves both CTAs.
- The local development runtime displayed hydration mismatch errors originating at the inline responsive `<style>` content in `Experience.tsx`; React replaced the server HTML with client content.
- `var(--border)` is referenced across later components but `globals.css` defines only `--border-subtle` and `--border-strong`.
- All five project links in `Projects.tsx` use `href: "#"`.
- The GitHub-labelled link in `Contact.tsx` points to the portfolio URL.
- `GitHubActivity.tsx` fetches `/api/github`, while the deployment is a static export and the API route requires a server-side token.
- The page relies heavily on entrance animations and has no `prefers-reduced-motion` path.
- Some project-card interactions use clickable `div` elements; graph/network information is hover-oriented.
- `Marathon.tsx` contains placeholder values; `Terminal.tsx` contains simulated output/history. Both are accurate descriptions of what the current code implements.
- `package-lock.json` and `yarn.lock` both exist while CI uses npm.
- The existing `README.md` describes the old Hugo/PaperMod implementation.

## Historical material

- `redesign.md` and `edits/` are design history.
- `TODO` is the imported raw backlog and becomes a pointer after migration.
- Tool-specific instruction files are compatibility shims, not independent policy.
