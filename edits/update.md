# Skills Section Redesign — Coding Agent Prompt

## Component: SkillsGraph.tsx

---

## Overview

Replace the existing skills section (filterable tag pills + proficiency percentage bars) with an
interactive force-directed skill graph. Every skill is a node. Nodes are connected by meaningful
relationships. Categories are visually clustered and color-coded. The graph is the entire skills
section — no other UI elements needed.

---

## Library

Use **D3.js** (`d3-force`) for the physics simulation and SVG rendering.
Install: `npm install d3` and `npm install --save-dev @types/d3`

Do NOT use react-force-graph, vis.js, or any other graph library. D3 directly gives the control
needed to match the site's visual language precisely.

---

## Brand Alignment

Stay strictly within the site's existing design system:

```
--bg-primary:    #F7F5F0   (warm off-white — graph background)
--text-primary:  #1C1C1A   (node labels)
--text-tertiary: #9A9793   (dimmed state labels)
--border:        rgba(28, 28, 26, 0.1)
--accent-navy:   #1B3A5C   (active/highlighted elements)
Font: DM Mono for all labels (matches rest of site)
```

Category accent colors (one per cluster, distinct but restrained):

```
Languages:      #1B3A5C   (navy — primary)
Data & ML:      #2D6A4F   (forest green)
Infrastructure: #5C4A1B   (warm brown)
Frontend:       #4A1B5C   (muted purple)
Domain:         #C17D3C   (brass — matches site accent)
```

---

## Graph Data

### Nodes

Define each node with: `id`, `label`, `category`, `weight` (controls node size, 1–3 scale)

```typescript
const nodes = [
  // Languages
  { id: "python", label: "Python", category: "languages", weight: 3 },
  { id: "typescript", label: "TypeScript", category: "languages", weight: 3 },
  { id: "javascript", label: "JavaScript", category: "languages", weight: 3 },
  { id: "sql", label: "SQL", category: "languages", weight: 2 },
  { id: "go", label: "Go", category: "languages", weight: 2 },
  { id: "rust", label: "Rust", category: "languages", weight: 1 },

  // Data & ML
  { id: "pytorch", label: "PyTorch", category: "ml", weight: 2 },
  { id: "pyg", label: "PyTorch Geometric", category: "ml", weight: 2 },
  { id: "sklearn", label: "scikit-learn", category: "ml", weight: 2 },
  { id: "pandas", label: "Pandas / NumPy", category: "ml", weight: 2 },
  { id: "nlp", label: "NLP", category: "ml", weight: 2 },
  { id: "gnn", label: "Graph Neural Nets", category: "ml", weight: 2 },
  { id: "ais", label: "AIS Data", category: "ml", weight: 1 },
  { id: "scfi", label: "SCFI Index", category: "ml", weight: 1 },

  // Infrastructure
  { id: "docker", label: "Docker", category: "infra", weight: 3 },
  { id: "aws", label: "AWS", category: "infra", weight: 2 },
  { id: "github", label: "GitHub Actions", category: "infra", weight: 2 },
  { id: "supabase", label: "Supabase", category: "infra", weight: 2 },
  { id: "linux", label: "Linux / Bash", category: "infra", weight: 2 },
  { id: "rest", label: "REST APIs", category: "infra", weight: 2 },

  // Frontend
  { id: "react", label: "React", category: "frontend", weight: 3 },
  { id: "nextjs", label: "Next.js", category: "frontend", weight: 3 },
  { id: "tailwind", label: "Tailwind CSS", category: "frontend", weight: 2 },
  { id: "gsap", label: "GSAP", category: "frontend", weight: 2 },
  { id: "reactnative", label: "React Native", category: "frontend", weight: 2 },

  // Domain
  { id: "freight", label: "Freight Forwarding", category: "domain", weight: 3 },
  {
    id: "contracts",
    label: "Carrier Contracts",
    category: "domain",
    weight: 2,
  },
  {
    id: "logistics",
    label: "Container Logistics",
    category: "domain",
    weight: 2,
  },
  { id: "payment", label: "Payment Processing", category: "domain", weight: 1 },
];
```

### Edges

Connect nodes where there is a genuine relationship — shared use, dependency, or conceptual overlap.
Edge strength (1 = weak/thematic, 2 = standard, 3 = strong/direct dependency):

```typescript
const edges = [
  // Language → framework dependencies
  { source: "python", target: "pytorch", strength: 3 },
  { source: "python", target: "pandas", strength: 3 },
  { source: "python", target: "sklearn", strength: 3 },
  { source: "python", target: "nlp", strength: 2 },
  { source: "python", target: "rest", strength: 2 },
  { source: "typescript", target: "react", strength: 3 },
  { source: "typescript", target: "nextjs", strength: 3 },
  { source: "javascript", target: "react", strength: 3 },
  { source: "javascript", target: "nextjs", strength: 2 },
  { source: "rust", target: "docker", strength: 1 },
  { source: "go", target: "rest", strength: 2 },
  { source: "sql", target: "supabase", strength: 3 },

  // ML internal connections
  { source: "pytorch", target: "pyg", strength: 3 },
  { source: "pytorch", target: "gnn", strength: 3 },
  { source: "pyg", target: "gnn", strength: 3 },
  { source: "pandas", target: "sklearn", strength: 2 },
  { source: "nlp", target: "gnn", strength: 2 },
  { source: "ais", target: "gnn", strength: 2 },
  { source: "scfi", target: "gnn", strength: 2 },
  { source: "ais", target: "freight", strength: 3 },
  { source: "scfi", target: "freight", strength: 3 },

  // Infrastructure connections
  { source: "docker", target: "aws", strength: 2 },
  { source: "docker", target: "github", strength: 2 },
  { source: "docker", target: "linux", strength: 2 },
  { source: "supabase", target: "react", strength: 2 },
  { source: "github", target: "nextjs", strength: 2 },
  { source: "aws", target: "python", strength: 1 },
  { source: "rest", target: "react", strength: 2 },

  // Frontend connections
  { source: "react", target: "nextjs", strength: 3 },
  { source: "react", target: "reactnative", strength: 3 },
  { source: "react", target: "tailwind", strength: 2 },
  { source: "nextjs", target: "tailwind", strength: 2 },
  { source: "nextjs", target: "gsap", strength: 2 },

  // Domain bridges (connects domain knowledge to technical stack)
  { source: "freight", target: "logistics", strength: 3 },
  { source: "freight", target: "contracts", strength: 3 },
  { source: "logistics", target: "python", strength: 1 },
  { source: "logistics", target: "sql", strength: 1 },
  { source: "contracts", target: "nlp", strength: 2 },
  { source: "payment", target: "supabase", strength: 2 },
  { source: "payment", target: "react", strength: 1 },
];
```

---

## Physics Simulation

Use `d3-force` with these parameters tuned for a clean clustered layout:

```typescript
const simulation = d3
  .forceSimulation(nodes)
  .force(
    "link",
    d3
      .forceLink(edges)
      .id((d) => d.id)
      .distance((d) => (d.strength === 3 ? 60 : d.strength === 2 ? 90 : 130))
      .strength((d) =>
        d.strength === 3 ? 0.8 : d.strength === 2 ? 0.4 : 0.15,
      ),
  )
  .force("charge", d3.forceManyBody().strength(-180))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force(
    "collision",
    d3.forceCollide().radius((d) => nodeRadius(d) + 20),
  )
  .force("cluster", clusterForce()); // custom — see below
```

**Custom cluster force** — pulls each node toward its category centroid:

```typescript
function clusterForce() {
  // Pre-define target centroids per category
  // Arrange clusters in a loose grid/circle around center
  // Languages: top-left, ML: top-right, Infra: bottom-right
  // Frontend: bottom-left, Domain: center
  const centroids = {
    languages: { x: width * 0.25, y: height * 0.28 },
    ml: { x: width * 0.72, y: height * 0.28 },
    infra: { x: width * 0.72, y: height * 0.72 },
    frontend: { x: width * 0.25, y: height * 0.72 },
    domain: { x: width * 0.5, y: height * 0.5 },
  };
  return function (alpha) {
    nodes.forEach((node) => {
      const c = centroids[node.category];
      node.vx += (c.x - node.x) * alpha * 0.08;
      node.vy += (c.y - node.y) * alpha * 0.08;
    });
  };
}
```

---

## Load Animation

On component mount:

1. All nodes start at the exact center of the SVG (`x: width/2, y: height/2`)
2. The D3 simulation runs normally from there — nodes physically spread outward and settle
3. Use `simulation.alphaDecay(0.02)` for a slow, satisfying settle (takes ~3–4 seconds)
4. Nodes and edges should be visible from frame 1 — no delay before they appear
5. Edge opacity starts at 0 and fades in over 800ms once the simulation alpha drops below 0.3
   (edges appearing mid-simulation looks cleaner than showing them during the chaotic initial spread)

ScrollTrigger integration: The simulation should only start when the skills section enters the
viewport. Use GSAP ScrollTrigger's `onEnter` callback to call `simulation.restart()`. This means
the animation plays when the user scrolls to it, not on page load.

---

## Interaction — Hover / Focus

On node hover:

```
Hovered node:       full opacity, stroke widens to 2px in category color, scale 1.15
Connected nodes:    full opacity, no scale change
Connected edges:    full opacity, stroke width 1.5px in category color of source node
All other nodes:    opacity 0.12
All other edges:    opacity 0.05
```

On mouse leave: all elements return to default state with a 200ms ease transition.

Cursor: `cursor: pointer` on all nodes.

No click behavior needed — hover is sufficient.

---

## Visual Specs

**Node sizing** (based on `weight` field):

```
weight 3 → radius 10px   (core/primary skills)
weight 2 → radius 7px    (standard skills)
weight 1 → radius 5px    (specialist/niche skills)
```

**Node appearance:**

- Fill: white (`#FFFFFF`)
- Stroke: category color at 60% opacity (default), 100% opacity (hover)
- Stroke width: 1.5px (default), 2.5px (hover)
- No drop shadow

**Edge appearance:**

- Stroke: `rgba(28, 28, 26, 0.12)` (default)
- Stroke width: 1px (default), 1.5px (active)
- No arrowheads — undirected graph

**Labels:**

- Font: DM Mono, 10px
- Color: `#5A5855` (default), `#1C1C1A` (hover active), `rgba(28,28,26,0.2)` (dimmed)
- Position: centered below node, 4px gap
- For weight-3 nodes, use 11px font size

**Category legend:**

- Small inline legend below the graph, horizontal, DM Mono 11px
- One colored dot + label per category
- Clicking a category label in the legend highlights all nodes in that category

---

## SVG Canvas

```
Desktop:  width 100%, height 520px
Mobile:   width 100%, height 380px (simplify: hide weight-1 nodes on mobile)
```

Make the SVG responsive using a viewBox that scales — do not use fixed pixel dimensions.
The graph should reflow correctly at all widths.

Enable pan and zoom using `d3.zoom()`:

- Scroll to zoom (scale range: 0.5x to 3x)
- Click and drag to pan
- Double-click resets to default view
- Show a small "scroll to zoom · drag to pan" hint in DM Mono 10px `--text-tertiary`
  in the bottom-right corner of the graph container, fading out after 3 seconds

---

## Section Wrapper

The graph replaces the entire existing skills section. The wrapper should match the rest of
the page's section style:

```tsx
<section id="skills" className="...">
  <p className="section-label">SKILLS</p> {/* DM Mono uppercase label */}
  <div className="graph-container">
    <SkillsGraph />
  </div>
</section>
```

No additional text, descriptions, or skill counts needed outside the graph itself.

---

## Component Interface

```typescript
// SkillsGraph.tsx — no props required, all data is self-contained
export default function SkillsGraph() { ... }
```

The component should:

- Handle its own D3 lifecycle with `useEffect` and `useRef`
- Clean up the simulation on unmount (`simulation.stop()`)
- Handle window resize with a debounced listener that restarts the simulation
- Be fully self-contained — no external data fetching

---

## Performance Notes

- Run the simulation with `requestAnimationFrame` via D3's built-in tick handler
- Stop the simulation after alpha drops below 0.001 (`simulation.on('end', ...)`) to avoid
  unnecessary computation on an idle graph
- Use SVG `<g>` elements with React keys for nodes and edges — do not re-render the entire
  SVG on every tick; mutate DOM positions directly via D3 refs for performance

---

## Quality Bar

1. The physics settle must feel satisfying — not instant, not jittery. Tune alphaDecay until it feels right.
2. The cluster layout must be legible — a visitor should be able to identify the 5 groups without reading the legend.
3. Hover interaction must be immediate (no perceptible lag) and the dimming must be dramatic enough to read clearly.
4. Labels must never overlap their parent node — always positioned below with consistent gap.
5. The graph must be fully usable on mobile — pinch to zoom, drag to pan.
6. Category colors must be visually distinct but not loud — they are accents, not backgrounds.
7. The Domain cluster (freight/logistics/contracts) should sit in the center, visually bridging the technical clusters, reinforcing that domain knowledge connects everything else.
