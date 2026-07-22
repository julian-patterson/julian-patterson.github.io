# PORT-037 — Establish a shared website and résumé source of truth

- Status: Blocked
- Priority: P1
- Source: owner request on 2026-07-23
- Depends on: PORT-006
- Required approvals: [RQ-014](../REVIEW-QUESTIONS.md#rq-014)
- Owner: unassigned
- Started: —
- Completed: —
- Blocker: `PORT-006` must establish the canonical shared content model, and Julian must approve the résumé’s public content scope, format, and publication/download policy through RQ-014. No résumé facts, URLs, dates, metrics, or private details may be inferred.

## Context

The repository currently has no résumé/CV source, LaTeX template, PDF artifact, or résumé build command. The portfolio is a Next.js static export deployed to GitHub Pages, so a résumé viewer and PDF must be generated at build time and served as static assets; they cannot require a runtime API, credentials, upload service, or server-side rendering.

`PORT-006` is the prerequisite for a stable code-level source of repeated portfolio facts. This ticket extends that source for résumé-specific consumers rather than introducing a second, independently edited set of personal facts.

## Scope

- Extend the typed canonical content model established by `PORT-006` with a résumé-safe projection. Each eligible record must carry publication/channel and freshness metadata plus explicit `as_of` values where time-sensitive. `Needs approval` facts remain in tickets/review questions until approved, and actually private facts must not be stored in this public repository; metadata is a validation guard, not access control.
- Make both the website résumé route and the résumé generator consume that projection. The LaTeX layout may control presentation, but it must not become a separate source of factual copy.
- Add a maintained LaTeX template and a generator that serializes the approved data into a generated LaTeX input file with correct escaping. Keep generated intermediates and LaTeX build by-products out of source control.
- Add deterministic npm commands, for example `npm run resume:check` and `npm run resume:build`. The build script should validate the projection, render the generated input, and invoke a documented/pinned LaTeX environment (for example, a specified TeX Live release using `latexmk -lualatex -halt-on-error -interaction=nonstopmode`).
- Generate the released PDF into `public/` during the build pipeline so Next.js copies it to the static export. CI must build the PDF before `npm run build`, use the same documented TeX environment, and fail if the résumé validation or compilation fails. The generated PDF is a release artifact, never an independently edited source of facts.
- Add an export-safe, GitHub-Pages-compatible résumé route and navigation entry only where approved. It must offer an accessible view, an explicit PDF link, and a download action; an embedded PDF preview may be progressive enhancement only, with a meaningful fallback when browsers do not render PDFs.
- Render a readable HTML equivalent of the approved résumé content on the route, so essential information is not trapped in a PDF or iframe. Ensure semantic headings, keyboard operation, visible focus, announced link purpose/file type where useful, and a usable 320px through desktop layout.
- Prevent stale or divergent content by validating required metadata and public status, rejecting private/unapproved fields at generation time, and regenerating the PDF from the canonical projection in local and CI builds. Document how a factual update reaches the website and PDF in one change.
- Update the relevant `README.md`, `SITE.md`, workflow, knowledge-base mirror, ticket index, and decision log only as required by the implemented architecture and owner-approved facts.

## Proposed implementation

Treat these paths as a concrete starting design to confirm against PORT-006 rather than a second content system:

- `src/content/schema.ts`, `src/content/portfolio.ts`, and `src/content/selectors.ts` hold typed plain-text records, stable IDs, publication/channel flags, dates, links, and selectors for website/resume consumers.
- `src/app/resume/page.tsx` renders the primary semantic HTML résumé view from the approved selector. A same-origin `/resume.pdf` link provides open/download behavior; an embedded `<object>` preview is optional progressive enhancement, not the only viewer.
- `resume/template.tex` contains layout only. `scripts/generate-resume.ts` escapes approved plain text and emits `.generated/resume/resume.tex`; no content record may inject raw LaTeX.
- `scripts/compile-resume.mjs` invokes a pinned LuaLaTeX/TeX Live toolchain through a non-shell child process, for example `latexmk -lualatex -interaction=nonstopmode -halt-on-error -file-line-error`, verifies a nonempty PDF, and copies it to ignored `public/resume.pdf` for Next.js static export.
- Suggested commands are `content:check`, `resume:tex`, `resume:build`, and `resume:check`. `npm run build` should run the résumé build before `next build`, while local `/resume/` development must show an honest PDF-unavailable state when the compiler has not run.
- Commit the schema, canonical data, selectors, template, generator, pinned toolchain definition, and tests. Ignore generated TeX/PDF intermediates, `public/resume.pdf`, LaTeX auxiliary/log files, and output directories; CI regenerates them from a clean clone.
- Avoid Google Docs or other remote viewers. Do not add PDF.js unless Julian later requires a full in-page PDF interface that justifies its client/worker weight and accessibility cost.

## Non-goals

- Do not create, revise, or publish résumé facts before RQ-014 supplies them or explicitly authorizes use of existing canonical public facts.
- Do not add a runtime résumé editor, authentication, analytics, third-party document viewer, remote storage, or a new hosting platform.
- Do not expose personal contact details beyond approved publication scope, employer/client-confidential information, unapproved metrics, source documents, credentials, or LaTeX build secrets.
- Do not make the generated PDF the canonical data source or duplicate factual text between website components, the LaTeX template, and manually edited PDF files.

## Acceptance criteria

- [ ] `PORT-006` provides one typed, version-controlled canonical data model, and this ticket adds only a documented résumé projection/consumer path rather than a competing factual dataset.
- [ ] RQ-014 records the approved résumé audience, included sections and facts, format/design constraints, publication scope, URL/download policy, and any material that must remain private; implementation includes only that approved public content.
- [ ] The website route, HTML résumé view, and generated LaTeX input consume the same approved projection. The LaTeX template contains presentation structure rather than duplicate fact-bearing copy.
- [ ] A reproducible local build path validates data, generates LaTeX input, compiles a PDF with a documented/pinned TeX environment, and emits the static PDF artifact into `public/` without committing transient build files.
- [ ] CI uses the same build path before the Next.js export, fails on invalid data or LaTeX errors, and deploys a PDF whose content derives from the same revision as the website.
- [ ] The résumé route works in the GitHub Pages/static-export path and provides accessible view, open-PDF, and download paths. PDF preview failure leaves a complete HTML fallback and working link.
- [ ] The route is checked at 320, 375, 768, 1024, and 1440 CSS pixels; keyboard focus, touch targets, reduced-motion behavior, and no-JavaScript/static readability are verified.
- [ ] Stale-data safeguards validate `as_of`/publication metadata where applicable, reject non-public content, and document the one-change source-to-website-and-PDF update workflow.
- [ ] No placeholder facts, private data, tokens, runtime APIs, or unapproved URLs enter source, generated static output, CI logs, or the PDF.
- [ ] `README.md`, `SITE.md`, relevant knowledge-base files, `DECISIONS.md`, and `TICKETS.md` describe the completed implementation; any durable artifact, data-model, or PDF-publication decision is recorded.
- [ ] Validation is recorded with exact results for `npm run resume:check`, `npm run resume:build`, `npm run typecheck`, `npm run build`, `npm run docs:check`, relevant CI workflow checks, and static route/PDF link verification. Record any unavailable lint or TeX-environment check accurately rather than treating it as passed.

## Validation record

Not run yet.

## Outcome

Pending.
