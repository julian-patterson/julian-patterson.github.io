# PORT-009 — Replay entrance effects after scroll re-entry

- Status: Ready
- Priority: P2
- Source: raw TODO "Make content disappear after we scroll up the website"
- Depends on: none
- Owner: unassigned
- Required approvals: none

## Owner direction

Content should appear while scrolling down. After it leaves the viewport by scrolling back up, it should be eligible to appear again when the user scrolls down into it rather than staying permanently revealed.

## Update — 2026-09-15

[PORT-051](PORT-051.md) implemented seven section-kicker scrambles that wait for a genuine viewport-entry transition and replay after leaving and re-entering their activation zone. After [PORT-054](PORT-054.md), six kickers are mounted and the retained GitHub Activity kicker is dormant. This ticket remains open for the broader GSAP content-reveal behavior, fast scrolling, anchor navigation, and browser-history cases.

## Acceptance criteria

- [ ] Entrance effects replay on genuine viewport re-entry without flicker or repeated triggers while the element remains visible.
- [ ] Essential content never becomes stranded or inaccessible.
- [ ] Reduced-motion behavior is non-animated and readable.
- [ ] GSAP cleanup, re-entry, fast scrolling, anchor navigation, and browser back/forward are tested.

## Validation record

Not run yet.
