# New Sections — Coding Agent Prompt

## julianpatterson.ca — Additive Sections

---

## Overview

Add five new sections to the existing portfolio. These slot into the page
in this order, between the existing Projects section and the Contact section:

```
[Projects]          ← existing
[How It Works]      ← NEW: Freight Intelligence Explainer
[Journey]           ← NEW: Journey Map
[Now]               ← NEW: Now Card
[Reading]           ← NEW: Reading List
[GitHub Activity]   ← NEW: Contribution Heatmap
[Contact]           ← existing
```

Each section is a standalone component. Do not modify any existing sections.
All components must match the site's existing design system exactly.

---

## Design System Reference

```css
--bg-primary:
  #f7f5f0 --bg-surface: #edeae3 --bg-accent: #ebf2f7 --text-primary: #1c1c1a
    --text-secondary: #5a5855 --text-tertiary: #9a9793 --accent-navy: #1b3a5c
    --accent-brass: #c17d3c --border: rgba(28, 28, 26, 0.1)
    --border-strong: rgba(28, 28, 26, 0.2) Fonts: DM Serif Display — section
    headings DM Sans — body copy DM Mono — all labels,
  dates, metadata, tags, badges;
```

All section labels follow the same pattern as the rest of the site:

```tsx
<p
  className="font-mono text-[11px] tracking-[0.1em] uppercase text-[--text-tertiary]
              border-b border-[--border] pb-3 mb-6"
>
  SECTION NAME
</p>
```

All sections use GSAP ScrollTrigger for entrance animations (fade up +
translateY 20px → 0), consistent with the rest of the page.

---

## Section 1 — Freight Intelligence Explainer

**Component:** `FreightExplainer.tsx`
**Anchor:** `#research`
**Position:** Immediately after Projects

### Purpose

Make the Freight Network Intelligence research legible to a non-technical
visitor — a professor, recruiter, or collaborator who lands on the page
without knowing what a GNN is. This section bridges the Projects card
and the research concept with a short interactive demonstration.

### Layout

Two columns on desktop, single column on mobile.

Left column: prose explanation + numbered steps
Right column: animated SVG network diagram

### Left Column Content

Section label: `HOW IT WORKS`

Heading (DM Serif Display, 32px):

```
The network knows first.
```

Body copy (DM Sans, 15px, --text-secondary, line-height 1.75):

```
A conflict near Suez doesn't only affect that route. The disruption
propagates through the shipping network — rerouting vessels, shifting
capacity, cascading into rate changes on lanes you wouldn't expect.

Standard time-series models treat each lane in isolation. A graph
structure captures the contagion.
```

Three numbered steps below the body copy. Each step has a small navy
circle number (DM Mono, 11px) and a short description (DM Sans, 13px):

```
① An event hits a node — a port or chokepoint — in the network
② The signal propagates to connected lanes with diminishing strength
③ The model surfaces rate impact before it appears in market indices
```

Stack tags below the steps in the same pill style as the project cards:
`PyTorch Geometric` `Graph Neural Networks` `AIS Data` `SCFI Index` `NLP`

### Right Column — Animated Network Diagram

SVG canvas, responsive, ~340px tall on desktop.

**Nodes** (ports + chokepoints):

```
YUL  — Montréal       position: top-left      state: active (navy fill)
HAM  — Hamburg        position: top-center    state: active (navy fill)
SHA  — Shanghai       position: top-right     state: default
SUEZ — Suez Canal     position: center        state: EVENT (brass fill, pulsing)
DXB  — Dubai          position: bottom-right  state: affected (brass outline)
SGP  — Singapore      position: far-right     state: mildly affected
NYC  — New York       position: bottom-left   state: mildly affected
LAX  — Los Angeles    position: left          state: default
```

**Edges** (shipping lanes):

```
YUL → HAM   (strong, navy, width 1.5)
HAM → SHA   (strong, navy, width 1.5)
SHA → SGP   (medium, gray)
SUEZ → HAM  (affected, brass, width 1.2)
SUEZ → DXB  (affected, brass, width 1.2)
SUEZ → SHA  (affected, brass, dashed)
DXB → SGP   (mildly affected)
NYC → HAM   (medium, gray)
LAX → SHA   (medium, gray)
YUL → NYC   (light, gray)
```

**Event animation (loops continuously):**

1. SUEZ node pulses — a soft ring expands outward from it (CSS keyframe,
   2s duration, repeating) in brass (#C17D3C), opacity 0.6 → 0
2. Brass edges (SUEZ → HAM, SUEZ → DXB) animate a traveling dot along
   their path every 3 seconds using SVG stroke-dashoffset animation
3. DXB and SGP nodes have a subtle brass outline that pulses at half the
   intensity of SUEZ — secondary propagation signal

**Legend** below the diagram, DM Mono 10px, --text-tertiary:

```
● navy = active lane   ● brass = event propagation   ○ gray = monitoring
```

**Important:** The animation must run on scroll entry, not on page load.
Use GSAP ScrollTrigger `onEnter` to start the loop. The diagram should
be static until visible.

---

## Section 2 — Journey Map

**Component:** `Journey.tsx`
**Anchor:** `#journey`
**Position:** After Freight Explainer

### Purpose

A horizontal timeline of Julian's physical and professional journey.
Communicates worldliness, progression, and momentum — particularly the
Montréal → Hamburg arc.

### Layout

Full-width horizontal timeline on desktop.
Vertical stacked timeline on mobile (same data, rotated layout).

### Section Label

`JOURNEY`

### Timeline Stops

Define stops as an array with: `year`, `city`, `country`, `description`,
`type` (personal | academic | professional | upcoming), `coordinates`
(lat/lng for optional tooltip).

```typescript
const stops = [
  {
    year: "2003",
    city: "Montréal",
    country: "CA",
    description: "Born and raised",
    type: "personal",
  },
  {
    year: "2023",
    city: "McGill University",
    country: "CA",
    description: "B.Sc. Software Engineering & Statistics",
    type: "academic",
  },
  {
    year: "2024",
    city: "Prime Freight",
    country: "CA",
    description: "Software Developer — first freight internship",
    type: "professional",
  },
  {
    year: "2025",
    city: "Montréal",
    country: "CA",
    description: "CTO, AnyTime Technologies. Final year at McGill.",
    type: "professional",
    current: true,
  },
  {
    year: "May 2026",
    city: "Hamburg",
    country: "DE",
    description: "AI & Analytics Intern — Hapag-Lloyd",
    type: "upcoming",
  },
];
```

### Visual Design

**Horizontal line:** 0.5px, --border-strong, running through the center
of all dot elements.

**Dots:**

- `personal`: 10px circle, gray outline, white fill
- `academic`: 10px circle, navy outline, white fill
- `professional`: 10px circle, navy fill (solid)
- `current`: 12px circle, navy fill + a subtle pulsing ring animation
- `upcoming`: 12px circle, brass dashed outline, white fill

**Stop labels** (below each dot, DM Mono):

- Year: 10px, --text-tertiary
- City: 14px, 500 weight, --text-primary
- Description: 11px, --text-secondary, max-width 100px, line-height 1.4

**Entrance animation:**
Stops reveal left to right on scroll entry, staggered by 120ms each.
The connecting line draws itself from left to right using SVG
stroke-dashoffset animation triggered by ScrollTrigger.

**The Hamburg stop** (upcoming) should feel visually distinct:

- Brass dashed border on the dot
- Year label in --accent-brass
- A small `→` before "Hamburg" in the city label
- Faint brass tint on the description text

**Mobile layout:**
Rotate to vertical — dots on left, content on right, line running
vertically. Same entrance animation but top-to-bottom stagger.

---

## Section 3 — Now Card

**Component:** `Now.tsx`
**Anchor:** `#now`
**Position:** After Journey

### Purpose

A single, compact card showing what Julian is currently doing, thinking
about, and working toward. Manually updated. Makes the site feel alive
rather than static. Signals to professors and collaborators that he is
actively engaged.

### Layout

Single card, full width, with an internal two-column grid on desktop.
The card uses --bg-surface background with a left border in --accent-navy
(4px solid), matching the featured project card style.

### Section Label

`NOW`

### Card Content

**Top of card:**

```
A small "last updated" timestamp in DM Mono 11px --text-tertiary:
"last updated · April 2026"
```

**Left column — Status items** (DM Mono labels + DM Sans values):

```
LOCATION     Montréal, QC — leaving for Hamburg in [X] weeks
WORKING ON   Freight Network Intelligence (GNN prototype)
             Final semester coursework at McGill
LEARNING     German (A2 → B1) · PyTorch Geometric
READING      [pulled from Reading List section — first item]
TRAINING     Marathon prep — [X] km/week base building
```

Each row: label in DM Mono 10px --text-tertiary, value in DM Sans 13px
--text-primary. Rows separated by a 0.5px --border-tertiary line.

**Right column — Countdown:**
A live JavaScript countdown to the Hamburg departure date (May 4, 2026
as a placeholder — make this a config variable at the top of the file).

Display format:

```
[DM Mono, centered]

47
days until Hamburg

[small progress bar showing days elapsed since Jan 1 2026 /
total days until May 4 2026]
```

The number updates in real time (recalculates on mount). The progress
bar is thin (3px), navy fill, gray track, full width of the column.

**Entrance animation:**
Card slides up from 30px with fade, triggered by ScrollTrigger.

---

## Section 4 — Reading List

**Component:** `Reading.tsx`
**Anchor:** `#reading`
**Position:** After Now Card

### Purpose

Books, papers, and links Julian is currently reading or has found
influential. Signals intellectual depth and research orientation.
Particularly useful for professors evaluating the portfolio.

### Layout

Section label + vertical list of reading items.

### Section Label + Heading

Label: `CURRENTLY READING`

No large heading needed — the list is the content.

### Reading Items Data

```typescript
const items = [
  {
    type: "paper",
    title: "Inductive Representation Learning on Large Graphs",
    author: "Hamilton et al. (GraphSAGE)",
    note: "Foundation paper for the GNN approach in Freight Network Intelligence.",
    ref: "arxiv:1706.02216",
    status: "reading now",
    link: "https://arxiv.org/abs/1706.02216",
  },
  {
    type: "paper",
    title: "Temporal Graph Networks for Deep Learning on Dynamic Graphs",
    author: "Rossi et al., 2020",
    note: "Extension of GNNs to time-evolving graphs — directly relevant to shipping lane dynamics.",
    ref: "arxiv:2006.10637",
    status: "queued",
    link: "https://arxiv.org/abs/2006.10637",
  },
  {
    type: "book",
    title: "The Box",
    author: "Marc Levinson",
    note: "History of the shipping container. Explains why the industry's data infrastructure is the way it is.",
    status: "in progress",
    link: null,
  },
  {
    type: "book",
    title: "The Signal and the Noise",
    author: "Nate Silver",
    note: "Forecasting methodology — thinking about uncertainty quantification for rate predictions.",
    status: "finished",
    link: null,
  },
  {
    type: "link",
    title: "Drewry Container Forecaster",
    author: "Drewry Maritime Research",
    note: "Industry benchmark for container rate forecasting methodology. Key competitive context for FreightLens.",
    ref: "drewry.co.uk",
    status: "reference",
    link: "https://www.drewry.co.uk",
  },
];
```

### Visual Design

Each item is a row with:

- Left: a small `type` badge in DM Mono (10px, uppercase)
  - `paper`: navy border + navy text
  - `book`: brass border + brass text
  - `link`: gray border + gray text
- Center: title (DM Sans 14px 500 --text-primary) + author (DM Mono 11px
  --text-tertiary) + note (DM Sans 13px --text-secondary)
- Right: status badge in DM Mono 10px
  - `reading now`: navy bg tint, navy text
  - `in progress`: brass bg tint, brass text
  - `queued` / `finished` / `reference`: gray, --text-tertiary

Rows separated by 0.5px --border-tertiary lines.
If `link` is not null, the title is an underlined link (opens new tab).

**Entrance animation:**
Rows stagger in (80ms apart) from bottom as section enters viewport.

---

## Section 5 — GitHub Activity Heatmap

**Component:** `GitHubActivity.tsx`
**Anchor:** `#activity`
**Position:** After Reading List, before Contact

### Purpose

A contribution heatmap pulled live from the GitHub API showing recent
commit activity. Signals consistent engineering practice. Styled to
match the site's warm palette rather than GitHub's default green.

### Data Fetching

Use the GitHub GraphQL API to fetch contribution data:

```typescript
const GITHUB_USERNAME = "julian-patterson"; // update to actual username

const query = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;
```

Fetch on component mount. Handle loading state (show skeleton) and error
state (show a graceful fallback message in DM Mono).

**Note:** GitHub GraphQL API requires authentication. Use a Next.js API
route (`/api/github`) to proxy the request server-side with a
`GITHUB_TOKEN` environment variable. Never expose the token client-side.
Document the required env var in a comment at the top of the API route.

### Visual Design

**Heatmap grid:**

- Each cell = one day
- Cell size: 10px × 10px, gap 2px, border-radius 2px
- 52 columns (weeks) × 7 rows (days)
- Responsive: on mobile, show last 26 weeks only

**Color scale** (warm navy palette, not GitHub green):

```
0 contributions:   #EDEAE3  (--bg-surface, matches page)
1–2 contributions: #B5C9D9  (light navy tint)
3–5 contributions: #7A9DB8  (medium navy)
6–9 contributions: #3D6F8F  (strong navy)
10+ contributions: #1B3A5C  (--accent-navy, full)
```

**Month labels** above the grid in DM Mono 10px --text-tertiary.
**Day labels** (Mon, Wed, Fri) on the left in DM Mono 9px --text-tertiary.

**Stats row** below the grid:

```
[total contributions this year] contributions in the last year
[longest streak] day streak  ·  [current streak] day current streak
```

All in DM Mono 11px --text-secondary.

**Tooltip on hover:**
Show a small tooltip above the hovered cell:

```
[date in DM Mono]
[N contributions]
```

Plain white card, 0.5px --border, no shadow, DM Mono 11px.
Position the tooltip above the cell, never clipped by viewport edges.

**Section label:** `ACTIVITY`
**No large heading** — the heatmap is self-explanatory.

**Entrance animation:**
Cells fade in in columns (left to right), staggered by 8ms per column,
triggered by ScrollTrigger. Total animation ~400ms.

---

## Navigation Updates

Add anchors for the new sections to the existing nav:

```tsx
// Add to the nav links array (right side of nav):
{ label: 'research', href: '#research' },
{ label: 'now',      href: '#now' },
```

Don't add all five — that overloads the nav. `research` and `now` are
the most likely to be direct-linked. The others are discoverable by scroll.

---

## Page Order Summary

Final page structure after all additions:

```
Navigation (fixed)
Hero
About
Experience
Projects
── How It Works (FreightExplainer)   #research
── Journey                           #journey
── Now                               #now
── Reading                           #reading
── GitHub Activity                   #activity
Contact
Footer
```

---

## File Structure

```
src/components/
  FreightExplainer.tsx
  Journey.tsx
  Now.tsx
  Reading.tsx
  GitHubActivity.tsx

src/app/api/
  github/
    route.ts          ← server-side GitHub API proxy

src/app/
  page.tsx            ← import and add all five components
```

---

## Environment Variables

Add to `.env.local`:

```
GITHUB_TOKEN=ghp_...   # Personal access token, read:user scope only
GITHUB_USERNAME=...    # Julian's actual GitHub username
HAMBURG_DEPARTURE=2026-05-04  # Used by Now component countdown
```

---

## Quality Bar

1. The freight explainer animation (pulsing SUEZ node, traveling dots on
   edges) must loop smoothly and feel purposeful — not distracting.
2. The journey timeline line must draw itself on scroll — static reveal
   is not acceptable for this section.
3. The Now countdown must be accurate to the day and update on mount.
4. The GitHub heatmap must handle the loading state gracefully — show a
   skeleton grid (same dimensions, cells in --bg-surface) while fetching.
5. Every new section must match the existing section label style exactly
   (DM Mono, 11px, uppercase, tracking, border-bottom).
6. No section should feel heavier or louder than the existing sections —
   the additions should feel native, not bolted on.
7. Mobile must be tested for all five sections. The heatmap in particular
   needs care — 52 columns at 10px each is 600px+ which overflows on mobile.
   Truncate to 26 weeks on screens under 768px.
8. The Reading List link items must open in a new tab with
   rel="noopener noreferrer".
