# Portfolio Website — Coding Agent Prompt

## julianpatterson.ca

---

## Project Overview

Build a single-page personal portfolio website for Julian Patterson — a Software Engineering & Statistics student at McGill University (graduating Winter 2026), CTO of AnyTime Technologies, and incoming AI & Analytics intern at Hapag-Lloyd in Hamburg. The site should feel like a premium, editorial data tool — not a generic developer portfolio. It must be beautiful, fast, and animated without being decorative for its own sake.

**Reference inspiration:** https://www.bettinasosa.com/about
**Reference GitHub (study the animation and component patterns):** https://github.com/bettinasosa/portfolio

The reference site is built with Next.js 14, GSAP for animations, TypeScript, and Tailwind CSS. Use the same stack. The key animation to replicate is the letter explosion/scatter effect on the hero name — each character physically flies apart and reassembles on page load. Study how Bettina implements this with GSAP SplitText or a custom character-splitting approach and implement the same mechanic.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (with ScrollTrigger plugin for scroll-based reveals)
- **Fonts:** Google Fonts — DM Serif Display (hero/display), DM Sans (body), DM Mono (code/data/dates)
- **Deployment:** Vercel
- **Single page:** Everything on `page.tsx` with smooth scroll anchoring. No sub-routes needed.

---

## Brand Identity

### Color Palette

```css
--bg-primary: #f7f5f0; /* warm off-white — page background */
--bg-surface: #edeae3; /* slightly darker surface — cards, sidebar */
--bg-accent-soft: #ebf2f7; /* very light navy tint — subtle highlights */

--text-primary: #1c1c1a; /* near-black — headings, body */
--text-secondary: #5a5855; /* muted warm gray — secondary text */
--text-tertiary: #9a9793; /* hints, labels, metadata */

--accent-navy: #1b3a5c; /* deep maritime navy — primary accent, links, highlights */
--accent-brass: #c17d3c; /* warm brass/amber — secondary accent, subtle details */

--border: rgba(28, 28, 26, 0.1); /* subtle warm border */
--border-strong: rgba(28, 28, 26, 0.2);
```

### Typography

```css
--font-display: "DM Serif Display", serif; /* hero name, section headings */
--font-body: "DM Sans", sans-serif; /* all body copy */
--font-mono: "DM Mono", monospace; /* dates, labels, code, metadata */
```

### Design Principles

- Warm off-white background — not clinical white, closer to aged paper
- Deep navy as the dominant accent — maritime, serious, global
- Monospace type for all data/date/metadata elements — operational precision
- Generous whitespace — resist the urge to fill space
- Animations should feel physical and intentional, never decorative
- No gradients, no colored backgrounds on sections (white/off-white only)
- Thin borders (1px max) — nothing heavy
- The overall feeling: a well-designed shipping manifest meets an editorial magazine

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

- Fixed to top, background: `--bg-primary` with a subtle bottom border
- Left: `jp.` in DM Mono, small, `--text-tertiary` — links to top
- Right: anchor links — `about`, `experience`, `projects`, `contact` — in DM Mono, 13px, `--text-secondary`
- On scroll, add a subtle shadow or increase border opacity
- Mobile: hamburger menu that reveals links as a full-screen overlay

---

### 2. Hero Section

**This is the most important section. Spend disproportionate effort here.**

Layout: Large, editorial. Full viewport height or close to it.

**Left column (main content):**

- Small eyebrow label in DM Mono, uppercase, `--text-tertiary`, letter-spaced:

  ```
  SOFTWARE ENGINEER · DATA SCIENTIST
  ```

- Hero name in DM Serif Display, very large (clamp between 64px and 96px):

  ```
  Julian
  Patterson.
  ```

  The period at the end should render in `--accent-navy`.

- Subheadline in DM Sans, 18–20px, `--text-secondary`, max-width ~520px:

  ```
  Building at the intersection of freight intelligence and machine learning.
  McGill University → Hapag-Lloyd Hamburg.
  ```

- Two tags/pills in DM Mono, small:
  - `Montréal, QC → Hamburg, DE` (with a live clock showing current Montreal time)
  - `Native EN · FR`

- Two CTA links styled as underlined text links (no buttons):
  - `View my work ↓` (smooth scrolls to projects)
  - `Get in touch ↓` (smooth scrolls to contact)

**Right column (decorative data element):**

- A subtle atmospheric element showing shipping lane coordinates in DM Mono as faint background text:
  ```
  YUL  →  HAM  →  SHA
  45.5°N  53.5°N  31.2°N
  73.6°W  10.0°E 121.5°E
  ```
  Very faint, `--text-tertiary` at 0.4 opacity, purely atmospheric.

**Hero Animation (CRITICAL):**

Implement the letter explosion animation from the reference site on "Julian Patterson":

- On page load, each letter of "Julian" and "Patterson" starts at a random scattered position (spread 200–400px from final position, random rotation ±45deg, random opacity 0)
- Each letter animates to its correct position with GSAP, staggered by 30–50ms per character
- Easing: `power3.out` or `expo.out` — should feel like the letters are being magnetically pulled into place
- Total animation duration: ~1.2–1.5 seconds
- After the name assembles, the subheadline and tags fade up with a 200ms delay, staggered

The rest of the page content (below the hero) should be hidden initially and revealed via scroll-triggered GSAP animations (fade up + slight translateY) as the user scrolls down.

---

### 3. About Section

Anchor: `#about`

Layout: Two-column grid on desktop, single column on mobile.

**Left:** Section label in DM Mono uppercase + a short, direct bio paragraph.

Bio copy (use verbatim):

```
Software engineer with a statistics minor and an obsession with freight.
Two internships inside freight forwarding offices taught me where the real
data problems live. I'm drawn to the intersection of machine learning,
network science, and global logistics — building tools that make complex
systems legible.

Fluent in English and French. Currently in Montréal, moving to Hamburg
in May 2026 for an AI & Analytics role at Hapag-Lloyd.
```

**Right:** A small metadata card in DM Mono, styled like a data terminal or shipping manifest:

```
STATUS      Final year, McGill University
ROLE        CTO · AnyTime Technologies
NEXT        AI & Analytics Intern · Hapag-Lloyd
LOCATION    Montréal → Hamburg (May 2026)
LANGUAGES   English · French
INTERESTS   Marathon running · Freight intelligence · Home automation
```

Style with `--bg-surface` background, 1px `--border` border, monospace text, 13px font, labels in `--text-tertiary` and values in `--text-primary`.

---

### 4. Experience Section

Anchor: `#experience`

Layout: Timeline. Left column is narrow (year/date in DM Mono), right column is the content. A thin vertical line runs down the left edge of the right column, with a small dot at each entry.

**Entries (most recent first):**

**Entry 1 — Hapag-Lloyd**

```
Date:     May 2026
Role:     AI & Analytics Intern
Company:  Hapag-Lloyd
Location: Hamburg, Germany
Tags:     [Demand Forecasting] [NLP] [AWS] [Recommendation Systems]
Note:     Upcoming — joining one of the world's largest container shipping
          companies to work on ML-driven analytics and document automation.
```

**Entry 2 — Prime Freight Logistics**

```
Date:     2024 – Present
Role:     Software Developer
Company:  Prime Freight Logistics
Location: Montréal, QC
Tags:     [React] [Docker] [JavaScript] [Logistics]
Bullets:
- Engineered a pricing algorithm handling FAK/NAC contract structures
  across 40+ routes and 100+ clients
- Built automated Excel parsers processing 2,000+ container rates/month
  with 100% accuracy — increased rate coverage from 10% to 100%,
  eliminating 500+ minutes of manual data entry per rate sheet
- Architected a React PO management system handling 1,000+ records,
  cutting booking approval time by 50%
- Built a centralized orchestrator with error handling that reduced bug
  investigation time by 83% (30 min → 5 min)
```

**Entry 3 — AnyTime Technologies**

```
Date:     2024 – Present
Role:     CTO & Technical Lead
Company:  AnyTime Technologies
Location: Montréal, QC
Tags:     [React] [Supabase] [CI/CD] [Payment Processing]
Bullets:
- Founding technical lead for a sports facility booking platform
- Designed database schemas for court management, scheduling, and
  multi-location payment processing
- Implemented CI/CD pipelines via GitHub Actions for automated deployment
```

**Entry 4 — McGill University**

```
Date:     2023 – 2026
Type:     Education
Institution: McGill University
Degree:   B.Sc. Software Engineering, Minor in Statistics
Location: Montréal, QC
Note:     Relevant coursework: Applied Machine Learning, Data Structures,
          Probability & Statistics, Software Design, Discrete Mathematics
          Activities: McGill AI Society, McGill AI Alignment
```

**Animation:** Each timeline entry fades in and slides up slightly as it enters the viewport (ScrollTrigger).

---

### 5. Projects Section

Anchor: `#projects`

Layout: Featured project spans full width. Below it, 2-column grid.

**Featured Project Card (full width):**

```
Name:    Freight Network Intelligence
Status:  [Research · In Progress]
Desc:    Graph-based freight rate forecasting system. Models global
         shipping lanes as a network where news sentiment and geopolitical
         events propagate as dynamic edge features — predicting rate
         impacts on specific lanes before they materialize in market data.

         The core insight: a conflict in the Red Sea doesn't only affect
         Suez Canal routes. It propagates outward with diminishing effect
         across connected lanes. A graph structure captures this naturally
         in a way that isolated time-series models cannot.
Stack:   PyTorch Geometric · AIS Data · SCFI · NLP · Python
Links:   [GitHub ↗] (placeholder href="#")
```

Style: left border in `--accent-navy` (4px), `--bg-accent-soft` background tint. The `[Research · In Progress]` badge uses DM Mono, 11px, `--accent-navy` text on `--bg-accent-soft`.

**Standard Project Cards (2-column grid):**

```
Card 1:
Name:    AnyTime Technologies
Desc:    Full-stack sports facility booking platform. Multi-tenant
         architecture, court scheduling, and payment processing.
Stack:   React · Supabase · GitHub Actions · Docker
Links:   [Live ↗] (placeholder href="#")

Card 2:
Name:    OpenClaw
Desc:    Self-hosted Raspberry Pi personal assistant. Claude API +
         Telegram interface with Strava, calendar, and task management
         integrations. Privacy-first: no persistent sensitive data.
Stack:   Node.js · Claude API · Raspberry Pi · Telegram Bot API
Links:   [GitHub ↗] (placeholder href="#")

Card 3:
Name:    Transfer CLI
Desc:    Go CLI tool using Cobra, SSH, and Git for syncing and
         transferring repositories over Wi-Fi.
Stack:   Go · Cobra · SSH · Git
Links:   [GitHub ↗] (placeholder href="#")

Card 4:
Name:    IoT LED Controller
Desc:    Centralized home lighting control system with RGB color
         management, REST API, and Docker deployment on Raspberry Pi.
Stack:   Rust · Python · FastAPI · Docker
Links:   [GitHub ↗] (placeholder href="#")
```

**Animation:** Cards fade in staggered as they enter the viewport.

---

### 6. Contact Section

Anchor: `#contact`

Layout: Simple, left-aligned. No form needed.

**Content:**

```
Heading:  Let's talk.
Subtext:  Open to research collaborations, interesting problems in
          freight analytics, and conversations about ML applied to
          logistics. Reach out in English or French.

Links:
- julian.e.patterson@icloud.com
- LinkedIn ↗  (href: https://linkedin.com/in/julian-e-patterson)
- GitHub ↗    (href: https://julian-patterson.github.io)
```

Footer:

```
© 2026 Julian Patterson · Montréal → Hamburg
Built with Next.js · Deployed on Vercel
```

---

## Animation Summary

All animations use GSAP. Install: `npm install gsap`.

| Element                 | Animation                             | Trigger                       |
| ----------------------- | ------------------------------------- | ----------------------------- |
| Hero name letters       | Scatter → assemble (letter explosion) | Page load                     |
| Hero subheadline + tags | Fade up, stagger                      | After name assembles (+200ms) |
| Section headings        | Fade up + translateY(20px) → 0        | ScrollTrigger enter           |
| Timeline entries        | Fade up + stagger                     | ScrollTrigger enter           |
| Project cards           | Fade up + stagger                     | ScrollTrigger enter           |
| About section content   | Fade up                               | ScrollTrigger enter           |
| Nav links               | Underline expand on hover             | CSS transition                |
| Project cards           | translateY(-4px) on hover             | CSS transition                |

Letter explosion pseudocode:

```typescript
const chars = heroNameEl.querySelectorAll(".char"); // wrap each letter in a span
gsap.set(chars, {
  x: () => gsap.utils.random(-300, 300),
  y: () => gsap.utils.random(-200, 200),
  rotation: () => gsap.utils.random(-45, 45),
  opacity: 0,
});
gsap.to(chars, {
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 1,
  duration: 1.2,
  ease: "expo.out",
  stagger: 0.04,
  delay: 0.1,
});
```

---

## Responsive Behavior

- Mobile breakpoint: 768px
- Hero: single column, name scales to ~52px
- About: stacks vertically, metadata card goes below bio
- Experience: timeline collapses to single column
- Projects: single column
- Navigation: hamburger menu with full-screen overlay

---

## File Structure

```
src/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    Nav.tsx
    Hero.tsx
    About.tsx
    Experience.tsx
    Projects.tsx
    Contact.tsx
    LetterExplosion.tsx
  lib/
    animations.ts
```

---

## SEO & Metadata

```typescript
export const metadata = {
  title: "Julian Patterson — Software Engineer & Data Scientist",
  description:
    "McGill Software Engineering student, CTO of AnyTime Technologies, incoming AI & Analytics intern at Hapag-Lloyd Hamburg. Building at the intersection of freight intelligence and machine learning.",
  openGraph: {
    title: "Julian Patterson",
    description: "Software Engineer & Data Scientist — Montréal → Hamburg",
    url: "https://julianpatterson.ca",
  },
};
```

---

## Quality Bar — Non-Negotiable

1. The letter explosion animation must feel physically satisfying — not choppy, not instant. Test it.
2. Warm off-white `#F7F5F0` used consistently — no pure white surfaces anywhere.
3. DM Mono used for every date, label, metadata element, tag, and badge throughout.
4. All copy provided above appears verbatim — no placeholder lorem ipsum.
5. The featured project card (Freight Network Intelligence) must look meaningfully more prominent than the others.
6. Mobile fully responsive and tested at 375px width.
7. All external links open in a new tab (`target="_blank" rel="noopener noreferrer"`).
8. Only necessary dependencies: GSAP + Next.js. No UI component libraries.
9. The word "Montréal" always includes the accent. "Hapag-Lloyd" always hyphenated.
10. The period after "Patterson" in the hero always renders in `--accent-navy` (#1B3A5C).
