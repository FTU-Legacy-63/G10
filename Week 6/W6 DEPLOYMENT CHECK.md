# **Deployment Check (Owner: Nguyen Duc Minh)**

# **1\. Release scope and evidence standard**

The protected core flow is Opening → Instructions → Credit desk → dossier review → decision → Decision Card → five-case summary. The application accepts decisions and one Reduce-limit installment input, applies the approved DTI/PMT/PV logic, explains the outcome, and updates a shared 1,600,000,000 VND credit room. This is a static educational application: it has no required API, database, login, or production environment variable. Progress is saved only in the same browser's LocalStorage.

A successful local build is not a public deployment. Each release claim below distinguishes the current dist/ build, a previously recorded browser review, the older .vercel/output cache, and an as-yet-unverified public URL. Week 6 asks for the integrated flow, deployment link **or documented blocker**, sample input, tests, bug priorities, scope freeze, README, and individual ownership; this check covers deployment and points to the related evidence.

## **2\. Current technical checks**

| ID | Connection or release check | Expected result | Actual evidence from 30 September 2026 | Status |
| :---- | :---- | :---- | :---- | :---- |
| D01 | Test command | Domain and round tests complete without failure | npm test: **24 passed, 0 failed**. Includes the five golden cases, thresholds, PMT/PV, validation, room allocation, persistence, and reload. | **Pass** |
| D02 | Production build | Static output is generated from the current source | npm run build completed; vercel.json specifies npm run build and dist/. | **Pass** |
| D03 | Build dependency closure | Every relative JavaScript import in the release directory exists | dist/ contains 26 JavaScript files; all **75** checked relative imports resolve. | **Pass** |
| D04 | Local HTTP assets | Entry page, main module, application/domain/UI modules, and font load | Six representative routes on a local server returned HTTP **200**, including /, /src/app.js, /src/application/round.js, /src/domain/assessment.js, /src/ui/screens/opening.js, and the Geist font. | **Pass** |
| D05 | Fresh-build browser smoke | Main flow renders and a decision updates the result and room | Headless Chrome opened the built app, entered Instructions and the Desk, opened KHCN-01, approved it, and showed its Decision Card with 500,000,000 VND committed and 1,100,000,000 VND remaining. The decision path passed **three successive runs** using the project's server pointed at dist/, with no page errors or failed requests. | **Pass**, one-case route |
| D06 | Full interaction and responsive review | Five-case journey, error states, reload, keyboard, and mobile layouts work | The [implementation report](http://IMPLEMENTATION_REPORT_V3.md) and its browser record describe a prior five-case playthrough, responsive widths, and no page/console/network errors. Those browser steps were **not rerun** on 30 September. | **Recorded** |
| D07 | Source data and financial result | Five outcomes match the approved answer key | Automated golden-case checks pass. The canonical order is Approve, Reject, Reduce limit, Reduce limit, Reject. With Reduce entries of 6,000,000 and 13,500,000 VND/month, issued principal totals 1,524,720,808 VND and room remains 75,279,192 VND. | **Pass** in automated tests |
| D08 | Cached Vercel prebuilt output | A deployable artifact must contain the current modules and exclude internal materials | The older .vercel/output/static gives a blank app with missing-module/style/font **404s** when served locally. Its answer key, source PDF, and working notes are reachable with HTTP **200**. | **Blocked: do not deploy this cache** |
| D09 | Public or preview URL | Current release opens outside the developer laptop | No current public/preview URL or public-site smoke result is present in the workspace. | **Pending** |
| D10 | README release entry | A user can find the reviewed URL or an explicit blocker and fallback | [README](../README.md) explains local run/build and says deployment is separate; it does not yet contain a verified public URL or release commit. | **Pending** |
| D11 | Other-device access | Fresh browser on another device loads the current release | Not tested; a localhost address cannot satisfy this check. | **Pending** |
| D12 | Documented local fallback | The README's npm run dev route starts and allows a core decision | The project server started at http\://127.0.0.1:4173; Chrome reached KHCN-01's Card after Approve and showed 1,100,000,000 VND remaining, without failed requests. | **Pass**, same-device only |

The older cached artifact is **not** evidence that a faulty public deployment exists. It is evidence that reusing this local prebuilt output would produce a broken interface and expose non-runtime files. The current dist/ build is materially different: the required modules and font are present, its checked imports resolve, and its local browser smoke works.

An ad-hoc Python HTTP server intermittently reset a local asset connection during a later screenshot attempt. Repeating the built-app decision path three times with the project's own server pointed at dist/ produced no failed request or blank page. Treat the reset as an unclassified local transport observation, not a demonstrated product defect; the public preview must still receive its own network check.

## **3\. Integration audit**

| Technical boundary | Expected behavior | Observed or remaining proof | Status |
| :---- | :---- | :---- | :---- |
| User input → validation | Invalid, missing, non-finite, or out-of-range values are rejected before commitment | Covered by domain/state tests; the earlier full browser review includes invalid and wrong-but-valid entries. | **Pass** in tests; **Recorded** in browser |
| Validation → financial logic | Product rate, age/product term caps, income, CIC obligations, and DTI use one policy | Five golden cases and threshold/PMT/PV tests pass against the [answer key](http://CASE_ANSWER_KEY.md). | **Pass** |
| Logic → visible output | Decision Card explains classification, accepted answer, actual offer, and room impact | Earlier browser playthrough and current domain/state tests support this; the fresh smoke stops at the Desk. | **Recorded**; repeat on public URL |
| Data → product | All five sourced dossiers and their narratives appear in the current interface | The fresh built app shows KHCN-01 through KHCN-05 at the Desk; deeper source mapping is in the [specification](http://CANONICAL_GAME_SPEC.md). | **Pass** at Desk; source audit recorded |
| Repo → deploy | A clean, identifiable source revision produces a safe public build | Current worktree has modified and untracked source; no current release commit or public URL was verified. The old prebuilt cache fails. | **Pending / blocked for cache** |

The Test Table is reported by the project owner as an existing separate deliverable, but its location was not available in this workspace audit. Link its test IDs and actual tester/fixer/verifier fields to the reviewed release commit before submission. Do not substitute a generic “tested” claim for the expected-versus-actual table.

## **4\. Deployment and release checklist**

| Gate | Action and acceptance evidence | Owner | Current state |
| :---- | :---- | :---- | :---- |
| R1. Freeze the demo scope | Keep the five dossiers, current DTI rules, direct decisions, one-field Reduce exercise, Cards, and summary. Defer unrelated new features and record any cut. | Technical lead, with group confirmation | Proposed; decision not signed |
| R2. Capture the release source | Review modified/untracked files, commit the intended source/config/tests/docs, and record one release commit hash. Do not use an uncommitted working tree as the claimed GitHub release. | Technical lead | Pending |
| R3. Re-run checks on that commit | Run npm test and npm run build; record date, commit, pass count, and any failure/fix. | Assigned tester; verifier separate if possible | Current worktree passed; release-commit run pending |
| R4. Inspect the generated artifact | Confirm dist/ includes entry, modules, CSS, image, font/license; confirm source PDFs, answer key, reports, and working notes are **not** public artifacts. | Build/release owner | Current dist/ checked; repeat on frozen build |
| R5. Exclude the stale cache | Do **not** deploy the existing .vercel/output with a prebuilt-output workflow. Let the configured build create fresh output, then inspect the actual preview. | Build/release owner | Open release blocker |
| R6. Verify preview/public site | Record URL, deployment time/commit, HTTPS, console/network result, Instructions → Desk → dossier → Card → summary, reload, and one small-screen check. Repeat from a fresh browser/device. | Assigned tester and verifier | Pending |
| R7. Publish the handoff | Put the verified URL in README; if public access fails, state the exact blocker and local fallback. Add sample inputs, limitations, and links to Test Table, Bug Priorities, and contribution evidence. | Technical lead | Pending |
| R8. Sign off | Record who tested, who fixed each release issue, who verified the fix, and who approved the demo. | Group / technical lead | Pending |

dist/ is generated and Git-ignored; the repository should preserve the source and build configuration, not rely on an old generated folder. The .vercel/output directory is also ignored and must not be treated as the current release. No deploy, push, cache deletion, or README change was performed as part of this document audit.

## **5\. Public verification record to complete**

| Field | Record after deployment |
| :---- | :---- |
| Reviewed source commit | **Pending** |
| Deployment provider and environment | Vercel is configured; actual preview/production environment **pending** |
| Preview URL / production URL | **Pending** |
| Deployment timestamp and build identifier | **Pending** |
| HTTP/HTTPS and second-device result | **Pending** |
| Five-case demo result and remaining room | **Pending on public build**; local expected result is 75,279,192 VND remaining for the canonical inputs |
| Browser console/network and mobile result | **Pending on public build** |
| Tester, fixer, verifier, final approver | **Pending named attribution** |

## **6\. Fallback and known limits**

If public deployment remains blocked at the checkpoint, show the exact blocker in [Bug Priorities](http://BUG_PRIORITIES.md), run the reviewed source locally with Node.js 20+ using npm run dev, and open the printed local URL (default http\://127.0.0.1:4173). This local route passed a one-case decision during the audit; prepare the full five-case sample values and a short walkthrough. A locally generated build and the prior screenshots are supporting evidence, but screenshots in .impeccable/review/ are Git-ignored; copy only selected, reviewed evidence into a submission location before claiming it is in the repository. The fallback must be retested on the final source commit and is not equivalent to another-device public access.

This educational client stores progress in one browser and embeds the exercise data and answer logic in client assets. It has no shared progress, login, real-customer data, or protected exam answers. These are scope limits, not defects in the agreed static MVP.

**Checkpoint decision:** the current integrated build and local checks support a classroom **local fallback**. Public-demo sign-off remains **No-Go until R2, R5, R6, R7, and R8 have evidence**, or the group explicitly records a deployment blocker and presents the verified fallback. This is a release-evidence decision, not a claim that the current application flow fails.

## **7\. Evidence map**

| Evidence | Location and what it supports |
| :---- | :---- |
| Architecture and individual route | [Technical Route](../TECHNICAL_ROUTE_NGUYEN_DUC_MINH.md) |
| Approved rules and oracle | [Canonical specification](http://CANONICAL_GAME_SPEC.md), [answer key](http://CASE_ANSWER_KEY.md), [decision log](http://DECISION_LOG.md) |
| Application and integration | ../src/app.js, ../src/application/, ../src/domain/, ../src/data/, ../src/infrastructure/, ../src/ui/ |
| Build configuration | ../package.json, ../scripts/build.mjs, ../vercel.json |
| Automated checks | ../tests/domain.test.js, ../tests/round.test.js; 24/24 pass in this audit |
| Earlier browser QA | [Implementation report](http://IMPLEMENTATION_REPORT_V3.md); .impeccable/review/browser-report.json and screenshots are local but ignored by Git |
| Triage | [Bug Priorities](http://BUG_PRIORITIES.md); link the separate Test Table once its submission path is confirmed |

Week 6 reference: *Build, Integration and Testing Clinic*, especially pp. 4, 13–14, 21–25. The teacher's “deployment link or blocker” condition is satisfied only when the final URL is verified or the documented blocker and tested local fallback are presented with the repository.  
