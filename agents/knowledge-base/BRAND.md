# Brand, audience, and voice

Last decision review: 2026-09-15

## Confirmed direction

- Implemented by PORT-039 on 2026-09-07: the shipping/freight identity is removed from production, not merely de-emphasized. Julian is not applying to freight-specific roles.
- Freight remains omitted as site-wide identity and framing. PORT-050 adds `Freight Forwarding & Container Logistics` only as one owner-approved domain capability in the Skills Graph; this narrow exception does not restore freight-led branding or relocation copy. See ADR-018's amendment to ADR-011.
- Logistics remains a stated general interest in About, separately from that skills-graph capability.
- The `Prime Freight Logistics` and `Hapag-Lloyd` employer names stay as factual employment records with domain-neutral role descriptions. What was removed is the *relocation narrative*, not the work history.
- Use bundled Geist for display/body text and Space Mono for labels and metadata, as implemented by PORT-045 and recorded in ADR-013.
- Render the Hero name as stable type with open tracking and intentional space between its two lines; do not animate its individual letters into place.
- Keep the compact GitHub, email, LinkedIn, and phone icon row directly beneath the Hero introduction, followed by one filled `View my work` button at the row's width; use square Carbon styling and accessible 44px targets throughout.
- Keep explicit repository actions on the two standard project cards and one compact `View more on GitHub` action beneath their grid; preserve the cards as semantic articles rather than making each whole card a link.
- Offer complete light and dark palettes, defaulting to the visitor's device preference until they explicitly choose a theme from the navigation control. Keep that 44px control borderless and transparent while preserving its visible keyboard focus ring.
- Use a restrained, reduced-motion-aware text scramble on all seven section kickers. Ignore the initial observer sample so off-screen labels animate on actual viewport entry; keep the accessible label and reduced-motion rendering static.
- Draw selectively from Carbon's icons, 2x spacing, square geometry, focus treatment, and motion principles without adopting the full component library.
- Remove generic/generated-feeling sections and copy.
- Preserve PORT-050's exact owner-approved 37-skill inventory and five category groupings without implying a proficiency ranking; continue the supporting-evidence audit in PORT-010.
- Keep the Skills Graph's labelled recenter action above the visualization and reset through its D3 zoom behavior without clearing an active category filter.
- Remaining PORT-020 through PORT-034 section work is unchanged except where PORT-039 already deleted the section.

## Decisions still needed

- Primary audience: recruiters, engineering leaders, founders/customers, research collaborators, or a blend?
- Final public positioning sentence: TBD
- Should personal interests such as running, reading, music, and home automation be present?
- Canonical domain and primary call to action: TBD

## Owner-supplied positioning context

Source status: Requested change/context, not final website copy.

- Final-year Software Engineering student with a Statistics minor at McGill; exact completion wording remains unresolved in RQ-001.
- Work at the intersection of logistics and software.
- Current Hapag-Lloyd AI internship, prior Prime Freight internal-tool work, and CTO/founding-engineering work on AnyTime's multi-tenant sports-facility booking platform.
- Refined on 2026-09-07: Hapag-Lloyd appears as completed experience in the Experience timeline only, never as an upcoming role or a relocation. Logistics is positioned as an interest rather than the work's defining intersection.

## Provisional voice rules

- Direct, specific, restrained, and human.
- Lead with shipped work, decisions, and outcomes.
- Avoid inflated adjectives, generic AI-era phrasing, faux-terminal jokes, and decorative data with no explanatory value.
- Do not describe planned work as completed work.
- Prefer short sentences and concrete nouns/verbs.
- Let metrics appear only when verified and contextualized.

## Visual rules

- Preserve the current grotesque display/body and restrained monospace metadata roles.
- Preserve generous whitespace and strong hierarchy.
- Interactions need a purpose and a non-animated/reduced-motion equivalent.
- Visual identity must not depend on maritime diagrams, coordinate motifs, or shipping-manifest styling unless the owner explicitly retains them.
