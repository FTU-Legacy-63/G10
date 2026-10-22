# **Bug Priorities (Owners: Nguyen Duc Minh)**

# **1\. Severity and priority policy**

Severity describes impact; priority describes when the team must act. A risk is not called a live-site bug without evidence that the site is live. An issue can remain open even when a separate, safer route works.

| Level | Meaning in this project | Triage rule |
| :---- | :---- | :---- |
| **Critical** | Core flow cannot run, financial result is wrong, deploy artifact is broken, or unintended files are public | Block use of the affected release path; resolve or replace it before public demo |
| **Major** | Important path, explanation, valid input, deployment proof, or reproducible repository release is missing | Fix before final sign-off; use a documented fallback only if deployment remains blocked |
| **Minor** | Presentation or traceability issue with no demonstrated effect on the core result | Fix before submission when it affects evidence; otherwise document and defer |
| **P0** | Immediate release blocker | No public release using this route until verified closed |
| **P1** | Required for the Week 6 handoff or final demo | Assign owner and deadline before sign-off |
| **P2** | Evidence-quality or low-impact issue | Resolve after P0/P1, before final submission when feasible |

Status terms: **Open** means the action is outstanding; **Mitigated** means a safe route exists but the issue is not closed; **Closed** requires a named fixer, a fresh verification result, and the reviewed source/deployment identifier. “Pending evidence” is not the same as “failed product.”

## **2\. Prioritized register**

| ID | Type | Severity / priority | Status | Actual observation | Required next action |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **BUG-01** | Cached deployment artifact | **Critical / P0** for a prebuilt deployment | **Open; mitigated by fresh dist/ route** | Older .vercel/output/static renders a blank page with multiple 404s and serves non-runtime documents via HTTP 200\. No public deployment of this cache was established. | Never publish that cached output; build fresh from reviewed source, inspect artifact contents, then verify public preview. |
| **REL-02** | Deployment evidence gap | **Major / P1** | **Open** | No verified preview/production URL, second-device check, or README release link was found. | Deploy current source, record URL/commit, complete public browser smoke, then update README; otherwise record blocker and tested fallback. |
| **REL-03** | Repository reproducibility gap | **Major / P1** | **Open** | The current implementation spans modified and untracked files; the only visible commit predates this working version. | Review and commit intended source, tests, config, and docs; rerun checks on that exact commit. |
| **EVD-04** | QA evidence packaging | **Minor / P2** | **Open** | Earlier browser report/screenshots exist under Git-ignored .impeccable/review/; they will not automatically appear in GitHub. | Select and place reviewed evidence in an included submission path, or provide an accessible evidence link. |

This register intentionally does **not** invent failed test cases or claim all bugs have been fixed. The current audit produced **24/24 passing automated tests**, a successful build, a three-run local built-app route through one Decision Card, and **one reproducible artifact-specific failure**. The prior full browser review is documented but was not repeated against a public release.

## **3\. Reproduction and verification detail**

### BUG-01 — Cached prebuilt output is broken and overexposes files

| Field | Evidence or action |
| :---- | :---- |
| Where | Local .vercel/output/static cache; this is **not** the current dist/ build or a proven live site |
| Reproduction | Serve that cache on localhost, open / in Chrome, inspect network; request /docs/CASE\_ANSWER\_KEY.md, /references/source-pdfs/01-credit-appraisal-rulebook.pdf, and /work/logic-review/arithmetic.txt by path. |
| Expected | Current Opening screen renders with all imported modules, styles, and font; release output contains only intended runtime assets. |
| Actual | Browser title appears but no heading/buttons render. Current modules/styles/font return 404, including /src/application/round.js. The three sampled non-runtime files each return HTTP 200\. |
| Impact | A prebuilt deployment of this cache would break the demo and publish internal exercise/source material. The files are educational rather than real customer data; the exposure still violates the intended artifact boundary. |
| Likely cause | Cache contents do not match the current source/module graph. The exact generation history was not established. |
| Safe route | The freshly generated dist/ resolves all 75 checked relative imports; the first-case decision reached its Card in three browser runs without failed requests when served by the project's server. Do not reuse .vercel/output for the release. |
| Fix acceptance | Build from the reviewed commit using vercel.json; verify preview has no missing resources, runs the five-case flow, and returns 404 for non-runtime docs/PDFs/working notes. |
| Proposed owner | Technical lead / release owner; confirm the named member. |
| Reported by / fixed by / verified by | Repository audit on 30 September 2026 / **not fixed** / **not verified closed**. Record member names and deployment ID after resolution. |

### REL-02 — Public deployment has no verifiable handoff

| Field | Evidence or action |
| :---- | :---- |
| Where | Release documentation and public verification record |
| Expected | A preview or production URL opens the reviewed build; README names it; a tester records the exact deployment and public result. |
| Actual | The project documents a Vercel build target and local instructions, but no verified URL or another-device result was available in this audit. |
| Impact | The teacher can assess a local build, but cannot yet independently open the product from the repository. Week 6 permits a documented blocker and fallback, not an unqualified “deployed” claim. |
| Closure | Record URL, source commit, deployment time/build ID, fresh-browser/device result, main flow, assets, and console/network status; update README. If deployment is blocked, state the cause and verify the local fallback on the release commit. |
| Proposed owner | Technical lead / deployment owner; assign tester and independent verifier. |
| Reported by / fixed by / verified by | Repository audit on 30 September 2026 / **pending** / **pending**. |

### REL-03 — Working product is not yet tied to a release commit

| Field | Evidence or action |
| :---- | :---- |
| Where | Git repository and GitHub handoff |
| Expected | Source, tests, build config, and documentation for the demonstrated product are in one identifiable commit. |
| Actual | git status shows modified and untracked implementation files; the visible history contains only an initial deployment commit. A local successful build cannot prove the GitHub checkout will match it. |
| Impact | The connected product and individual contribution cannot be reproduced or attributed from repository evidence alone. |
| Closure | Review the working tree, commit the intended scope, record its hash, and rerun npm test, npm run build, and release smoke on that commit. Preserve unrelated or historical files deliberately. |
| Proposed owner | Technical lead, with each contributor confirming their own authored work. |
| Reported by / fixed by / verified by | Repository audit on 30 September 2026 / **pending** / **pending**. |

### EVD-04 — Earlier QA artifacts are not included in repository evidence

| Field | Evidence or action |
| :---- | :---- |
| Where | .impeccable/review/, which is excluded by .gitignore |
| Expected | A reader of the submitted repository can access the browser record and selected screenshots cited by the report. |
| Actual | The implementation report references local QA files, but ignored files are not part of an ordinary GitHub commit. |
| Impact | A valid test may be difficult for the teacher to verify; this does not demonstrate an application defect. |
| Closure | Include a curated evidence copy in the submission or link an accessible archive; retain dates, viewport labels, and the associated release commit. Do not claim the evidence is in GitHub until verified. |
| Proposed owner | QA evidence owner, coordinated by the technical lead. |
| Reported by / fixed by / verified by | Repository audit on 30 September 2026 / **pending** / **pending**. |

## **4\. Financial and integration issues already reconciled**

These are documented source/policy reconciliations in the **current implementation**, not newly opened bugs and not a fabricated historical ticket log. Their original reporter, fixer, and fix date are not established here. Reopen them only if a release-commit test or public result disagrees with the approved oracle.

| Topic | Current resolution | Regression evidence |
| :---- | :---- | :---- |
| Hạnh business turnover | The approved case uses 270 million VND monthly turnover and the stated operating costs, yielding 30 million VND monthly income; do not substitute an older 450 million figure. | Golden-case income/DTI checks and [answer key](http://CASE_ANSWER_KEY.md) |
| Tuấn paid commission | First paid commission is 53 million VND, not the stale 58 million value. Six-month commissions total 157 million VND; income is 35,166,666.67 VND/month and DTI is 85.71%. | Source-correction and six-month averaging tests |
| Secured monthly rate | Use the exact annual 11% divided by 12 in PMT/PV, rather than a truncated decimal that can shift boundary calculations. | Independent PMT/PV and boundary tests |
| Reduce-limit tolerance | Inclusive ±5% grades the installment answer; it does not alter the actual principal, resulting DTI, or room debit. | Upper/lower boundary, actual-allocation, room, and persistence tests |

## **5\. Verification, ownership, and freeze**

| Evidence level | Result | Remaining verification |
| :---- | :---- | :---- |
| Domain/state suite | **24 passed, 0 failed** on 30 September 2026 | Rerun against reviewed release commit and record test author/verifier. |
| Build and import graph | npm run build succeeds; 75 checked relative imports in dist/ resolve | Repeat after release freeze and inspect actual deploy artifact. |
| Fresh local browser | Built app: Opening → Instructions → Desk → KHCN-01 Approve → Card passed three times without page errors or failed requests; 1,100,000,000 VND remained. The documented npm run dev fallback also passed the one-case route. | Run the full canonical route and another-device check on the public preview. |
| Earlier full browser report | Five-case journey, invalid/wrong inputs, reload, responsive widths, and keyboard route reported as passing | Make evidence accessible in submission and revalidate against release commit if code changes. |
| Public site | No result available | Verify URL and another device; record actual versus expected. |

| Required Week 6 accountability | Current record | Completion rule |
| :---- | :---- | :---- |
| Component owner | Technical lead coordinates architecture and release; named owners for all components are not confirmed here. | Add names and commit/PR links for src/data, src/domain, src/application, src/ui, QA, and deployment. |
| Test author | Separate Test Table is reported by the project owner, but its file/path was not supplied in this workspace. | Link its test IDs, inputs, expected/actual results, and actual author names. |
| Bug reporter / assignee | Issues above are from this dated repository audit; proposed roles are not a formal assignment. | Confirm a named assignee and due date for each open ID. |
| Fixer / verifier | Not yet recorded for open issues. | Record distinct names where possible, fix commit/deployment ID, rerun outcome, and date before changing status to Closed. |

**Recommended freeze:** protect the five-case DTI core flow and stop feature expansion. Permit only critical/major fixes, deployment repair, testing, evidence packaging, and documentation. The group has not yet signed this scope decision. The current release decision is **No-Go for public-demo sign-off** because BUG-01 must be excluded from release and REL-02/REL-03 remain open; a documented and tested local fallback may still satisfy the Week 6 checkpoint route. See the [Deployment Check](http://DEPLOYMENT_CHECK.md) for the exact gates.

Week 6 reference: *Build, Integration and Testing Clinic*, especially pp. 4, 14, 18, 21–25. Its bug-log requirement includes what happened, where, reproduction, expected result, severity, reported by, assigned to, fixed by, and verified by; unknown people and release details above are deliberately left unclaimed.  
