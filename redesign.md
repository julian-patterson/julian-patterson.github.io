# Portfolio Website — Coding Agent Prompt

## julianpatterson.ca

---

## Project Overview

Build a single-page personal portfolio website for Julian Patterson — a Software Engineering & Statistics student at McGill University (graduating Winter 2026), CTO of AnyTime Technologies, and incoming AI & Analytics intern at Hapag-Lloyd in Hamburg. The site should feel like a premium, editorial data tool crossed with a highly functional enterprise dashboard. It must be beautiful, fast, and animated without being decorative for its own sake.

**Reference inspiration (Aesthetic & Animation):** [https://www.bettinasosa.com/about](https://www.bettinasosa.com/about)
**Reference GitHub:** [https://github.com/bettinasosa/portfolio](https://github.com/bettinasosa/portfolio)
**Reference System (Structure & Data):** IBM Carbon Design System

The site is built with Next.js 14, GSAP for animations, TypeScript, and Tailwind CSS. The key animation to replicate is the letter explosion/scatter effect on the hero name. Crucially, the CSS and component structure must be built as a **strict design system** using design tokens, rather than hardcoded component styles.

---

## Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (configured strictly to act as our Design System token engine)
* **Animations:** GSAP (with ScrollTrigger plugin for scroll-based reveals)
* **Icons & Data Viz:** `@carbon/icons-react` for all UI icons. Recharts or D3 for data visualization, styled strictly with Carbon's data viz color palettes.
* **Fonts:** Google Fonts — DM Serif Display (hero/display), DM Sans (body), DM Mono (code/data/dates)
* **Deployment:** Vercel

---

## Design System Architecture (Carbon Inspired)

Instead of building isolated components, architect a foundational design system. Tailwind must be configured to respect these strict tokens.

### 1. The 2x Grid System

Adopt Carbon's 2x Grid. All spacing, padding, and margins must be multiples of `4px` or `8px`. Resist arbitrary spacing (e.g., no `15px` or `21px`).

* **Mini unit:** `4px`
* **Base unit:** `8px`
* Configure Tailwind `spacing` theme to enforce this scale explicitly.

### 2. Color Tokens

Retain the warm, editorial baseline, but introduce Carbon's systematic contrast and data-viz accents.

```css
/* Core Surfaces (The Editorial Base) */
--bg-primary: #f7f5f0; /* warm off-white */
--bg-surface: #edeae3; /* slightly darker surface */
--bg-accent-soft: #ebf2f7; 

/* Core Text */
--text-primary: #1c1c1a; 
--text-secondary: #5a5855; 
--text-tertiary: #9a9793; 

/* Accents & Data Viz (The Carbon Influence) */
--accent-navy: #1b3a5c; /* Primary interactive */
--accent-brass: #c17d3c; 
--carbon-chart-cyan: #005d5d; /* Carbon Data Viz 1 */
--carbon-chart-magenta: #9f1853; /* Carbon Data Viz 2 */

/* Borders */
--border-subtle: rgba(28, 28, 26, 0.1); 
--border-strong: rgba(28, 28, 26, 0.2);

```

### 3. Typography Rules

```css
--font-display: "DM Serif Display", serif; 
--font-body: "DM Sans", sans-serif; 
--font-mono: "DM Mono", monospace; 

```

* **Type Scale:** Implement a strict typographic scale. No arbitrary font sizes.
* **Data rules:** All dates, metadata, numbers, and tags *must* use `DM Mono` to reflect Carbon's functional precision.

### 4. Component Anatomy

* **Borders:** Thin (1px), using `--border-subtle`. No heavy drop shadows; use Carbon-style flat design with borders to delineate space.
* **Icons:** Use `@carbon/icons-react` exclusively. Render them at `16x16` or `20x20` for crisp, utilitarian precision.
* **Gradients:** None. Solid colors only.

---

## Page Structure

Single page, scrollable, with a fixed minimal top navigation bar that links to section anchors.

```
[Navigation]
[Hero]
[About]
[Experience]
[Projects]
[Contact]

```

---

## Section Specifications

### 1. Navigation (fixed, top)

* Fixed to top, background: `--bg-primary` with a subtle bottom border.
* Left: `jp.` in DM Mono, small, `--text-tertiary` — links to top.
* Right: anchor links — `about`, `experience`, `projects`, `contact` — in DM Mono, 13px, `--text-secondary`.
* On scroll, apply a `backdrop-blur` and a 1px `--border-subtle` bottom border (Carbon style).
* Mobile: Hamburger menu utilizing Carbon's `Menu` icon.

---

### 2. Hero Section

Layout: Large, editorial. Full viewport height.

**Left column (main content):**

* Small eyebrow label in DM Mono, uppercase, `--text-tertiary`, letter-spaced:
```
SOFTWARE ENGINEER · DATA SCIENTIST

```


* Hero name in DM Serif Display, clamp between 64px and 96px:
```
Julian
Patterson.

```


*(The period must render in `--accent-navy`)*
* Subheadline in DM Sans, 18–20px, `--text-secondary`, max-width ~520px:
```
Building at the intersection of freight intelligence and machine learning.
McGill University → Hapag-Lloyd Hamburg.

```


* Two tags styled as Carbon "Tags" (sharp corners, 1px border, DM Mono):
* `Montréal, QC → Hamburg, DE` (with a live clock showing current Montreal time)
* `Native EN · FR`


* CTA links styled as Carbon inline links (underline on hover, accompanied by a Carbon `ArrowRight` icon).

**Right column (decorative data element):**

* Atmospheric shipping lane coordinates in DM Mono:
```
YUL  →  HAM  →  SHA
45.5°N  53.5°N  31.2°N
73.6°W  10.0°E 121.5°E

```


Opacity at 0.4, purely atmospheric.

**Hero Animation (CRITICAL):**

* Replicate the letter explosion animation from the reference site.
* Each letter starts at a random scattered position and animates to its correct position (staggered by 30–50ms, `power3.out` easing). Total duration: ~1.2–1.5s.

---

### 3. About Section

Anchor: `#about`
Layout: Two-column grid on desktop.

**Left:** Section label in DM Mono + bio paragraph.

```
Software engineer with a statistics minor and an obsession with freight.
Two internships inside freight forwarding offices taught me where the real
data problems live. I'm drawn to the intersection of machine learning,
network science, and global logistics — building tools that make complex
systems legible.

Fluent in English and French. Currently in Montréal, moving to Hamburg
in May 2026 for an AI & Analytics role at Hapag-Lloyd.

```

**Right:** Metadata card structured like a Carbon Data Table / Manifest:

```
STATUS     Final year, McGill University
ROLE       CTO · AnyTime Technologies
NEXT       AI & Analytics Intern · Hapag-Lloyd
LOCATION   Montréal → Hamburg (May 2026)
LANGUAGES  English · French
INTERESTS  Marathon running · Freight intelligence · Home automation

```

Style with `--bg-surface`, sharp corners, 1px `--border-subtle`, 13px DM Mono.

---

### 4. Experience Section

Anchor: `#experience`
Layout: Timeline structured like a Carbon Progress Indicator. A thin vertical line runs down the left edge, with a sharp square node (not a circle) at each entry.

**Entries:**
*(Include Hapag-Lloyd, Prime Freight Logistics, AnyTime Technologies, and McGill University exactly as provided in the original text).*

* **Tags** within entries must use Carbon's Tag component anatomy.
* **Bullets** should use Carbon's `ArrowRight` icon at `12px` instead of standard HTML discs.

---

### 5. Projects Section

Anchor: `#projects`
Layout: Featured project spans full width. Below it, 2-column grid.

**Featured Project Card: Freight Network Intelligence**

* **Content:** (Use original text regarding graph-based forecasting and Red Sea conflict propagation).
* **Carbon Integration:** Beside the text, build a minimalist, abstract node-graph visualization representing the connected lanes. Use `--carbon-chart-cyan` and `--carbon-chart-magenta` for the nodes. It doesn't need to be fully functional, but it must look like a genuine Carbon Charts data visualization.
* **Style:** Left border in `--accent-navy` (4px). Include a `[Research · In Progress]` badge.

**Standard Project Cards (2-column grid):**

* *AnyTime Technologies*, *OpenClaw*, *Transfer CLI*, *IoT LED Controller*.
* Style these like Carbon UI Cards. Sharp corners, background `--bg-primary`, border `--border-subtle`. On hover, border transitions to `--text-primary` and a Carbon `ArrowUpRight` icon appears in the top right corner.

---

### 6. Contact Section

Anchor: `#contact`

```
Heading:  Let's talk.
Subtext:  Open to research collaborations, interesting problems in
          freight analytics, and conversations about ML applied to
          logistics. Reach out in English or French.

Links (accompanied by Carbon Icons):
- julian.e.patterson@icloud.com
- LinkedIn ↗  
- GitHub ↗    

```

---

## Animation Summary

* All animations use GSAP.
* Ensure animations respect Carbon's motion principles: productive, snappy, and intentional. Avoid slow, floaty animations (aside from the initial editorial letter scatter). Use `expo.out` or `power3.out`.

| Element | Animation | Trigger |
| --- | --- | --- |
| Hero name letters | Scatter → assemble (letter explosion) | Page load |
| UI Cards / Sections | Fade up + translateY(16px) → 0 | ScrollTrigger enter |

---

## Quality Bar — Non-Negotiable

1. **Carbon Rigor:** Tailwind must be configured to strictly enforce the 2x Grid (4px/8px increments). No arbitrary sizing.
2. **Icons:** `@carbon/icons-react` is mandatory.
3. **Typography:** DM Mono must be used for all data, tags, dates, and metadata to maintain the technical terminal feel.
4. All copy provided appears verbatim.
5. Mobile fully responsive and tested at 375px width.
6. The word "Montréal" always includes the accent. "Hapag-Lloyd" always hyphenated.

---

Before you take this prompt and start building your tokens, how strictly do you want to adhere to Carbon's 2x Grid system (which enforces a highly rigid, dashboard-like structure) versus keeping the slightly looser, free-flowing spacing of the editorial inspiration?