# PORT-043 — Make the GitHub activity heatmap render real data

- Status: Blocked
- Priority: P1
- Source: owner request on 2026-09-07 for directions on completing the GitHub section
- Depends on: owner token and deployment
- Required approvals: none
- Owner: Julian (token creation and deployment are owner-only actions)
- Blocker: the section needs a user-scoped GitHub token that only Julian can create, and the site is not deployed from `main` yet

## Context

`#activity` renders "GitHub activity is unavailable in this build." `src/app/data/github-activity/route.ts` returns `unavailableResponse` when `process.env.GITHUB_TOKEN` is absent, when the GraphQL request fails, or when the response carries `errors`. Two separate problems keep it in that state.

**1. The site has never been deployed.** `main` is still on Hugo commits (`098eb3b Update baseURL in config.yaml`). `https://julian-patterson.github.io/` serves the old Hugo site, and `/data/github-activity` returns 404 there. The entire Next.js rebuild lives on the `remove-hugo-update` branch. Until that branch reaches `main`, the workflow in `.github/workflows/nextjs.yml` never runs against this code and the heatmap cannot populate regardless of tokens.

**2. The workflow supplies a token that cannot answer the query.** The build currently receives `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` — the automatic Actions token, which is a repository-scoped installation token. The route queries `user(login:).contributionsCollection.contributionCalendar`, which is user-scoped data requiring `read:user`. The automatic token is expected to return a permissions error, which the route's `result.errors?.length` guard converts into `status: "unavailable"`.

`SITE.md` currently records that "no personal token is required or published". That claim was written from the workflow's configuration, not from an observed successful run, and problem 2 contradicts it. The note has been corrected.

## Owner steps

1. Merge `remove-hugo-update` into `main` so the Pages workflow builds this code.
2. Create a GitHub personal access token with **`read:user`** only — a fine-grained token with the read-only "Profile" permission, or a classic token with the `read:user` scope. No repository access is needed.
3. Add it as a repository secret. **It cannot be named `GITHUB_TOKEN`** — GitHub rejects secret names beginning with `GITHUB_`. Use `PORTFOLIO_GH_TOKEN`.
4. Change one line in `.github/workflows/nextjs.yml`:

   ```yaml
   - name: Build with Next.js
     run: npm run build
     env:
       GITHUB_TOKEN: ${{ secrets.PORTFOLIO_GH_TOKEN }}
   ```

5. Re-run the workflow and confirm `https://<site>/data/github-activity` returns `"status": "available"`.

Step 4 is safe to land before step 3: with the secret absent the value is empty, the route takes the same no-token path it takes today, and the section renders exactly as it does now.

## Verification command

To confirm the diagnosis before creating anything, run this with a `read:user` token and then with an Actions token — the first returns a calendar, the second is expected to return `errors`:

```bash
curl -s -H "Authorization: Bearer $TOKEN" -X POST -d '{"query":"query{user(login:\"julian-patterson\"){contributionsCollection{contributionCalendar{totalContributions}}}}"}' https://api.github.com/graphql
```

## Notes and constraints

- The snapshot is generated at build time, so the heatmap is only as fresh as the last deployment. It does not update between deploys. This is a deliberate consequence of the static-export constraint in ADR-003.
- The route already sanitizes its output to contribution dates and counts, the username, and a generation timestamp. No token or credential reaches `out/`. PORT-014 verified this and it must stay true.
- `GITHUB_USERNAME` defaults to `julian-patterson`, which matches the repository owner. No override is needed.
- The route only ever exposes **public** contribution counts. A `read:user` token does not make private contributions public, and the section must not be described as showing total activity.

## Acceptance criteria

- [ ] `main` builds this codebase through the Pages workflow.
- [ ] The build receives a `read:user`-scoped token under a non-`GITHUB_`-prefixed secret name.
- [ ] The deployed `/data/github-activity` returns `"status": "available"` with a populated calendar.
- [ ] The heatmap renders, and the loading, empty, unavailable, and error states still behave.
- [ ] No token or credential marker appears anywhere in `out/`.
- [ ] `SITE.md` records the observed result and the freshness limitation.

## Validation record

Not run yet. Diagnosis performed 2026-09-07: the live site was confirmed to be the old Hugo build, and `/data/github-activity` was confirmed to return 404 there. The token-permission cause is a reasoned diagnosis from the route's code path and GitHub's token model, **not an observed failure** — the workflow has never run against this code. Confirm with the curl command above before concluding.
