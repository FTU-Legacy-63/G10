# **Technical Route (Owner: Nguyen Duc Minh)**

## **1\. Technical Purpose**

The purpose of the Technical Route is to transform the product requirements, credit rules, dossier data, and learner actions into a working and verifiable application. The application models Capacity through DTI: the learner reviews five fictional dossiers, selects Approve, Reduce limit, or Reject, and receives a traceable explanation of the decision and its credit-room impact.

The Technical Lead maintains consistency across the financial model, frontend, state, persistence, testing, and release. The technical specification follows PDF: Credit Appraisal Rulebook, PDF: 1C MVP, and PDF: Dossier Set. Financial assumptions and source interpretations are recorded in [the decision log](http://docs/DECISION_LOG.md) and [the canonical answer key](http://docs/CASE_ANSWER_KEY.md).

## **2\. System Architecture**

The implemented architecture separates the browser application into four technical layers. src/app.js connects browser events to application transitions and screen rendering; the financial engine remains independent of the interface and browser storage.

| Technical layer | Main responsibility | Design boundary |
| :---- | :---- | :---- |
| **User Interface** | Presents dossiers, captures decisions, and renders Cards and summary through src/ui/ | Uses projected data; does not duplicate financial formulas |
| **Application State** | Controls screens, case status, category locking, and room through src/application/ | Changes the round through defined transitions; finalization is idempotent |
| **Credit Rule Engine** | Calculates income, PMT/PV, DTI, classification, validation, and grading through src/domain/ | Pure functions independent of UI, navigation, and LocalStorage |
| **Data and Persistence** | Supplies policy and dossier facts through src/data/; restores saves through src/infrastructure/ | Validates saved data and reconstructs financial results using the defined policy |

This separation provides one calculation path for the dossier installment, decision evaluation, Result Card, room ledger, and restored round. Native JavaScript modules organize the application around clear technical responsibilities.

## **3\. Implementation Status**

### 3.1 Working application

The application is a static HTML, CSS, and JavaScript MVP. It implements the five supplied dossiers, a shared 1,600,000,000 VND credit room, immediate decisions, a single-input Reduce exercise, and a factual shift summary.

| Implemented area | Current evidence |
| :---- | :---- |
| Application entry | index.html and src/app.js |
| Interface and interaction flow | src/ui/screens/ and src/ui/components.js |
| Credit calculations and evaluation | src/domain/loan.js, income.js, assessment.js, validation.js, and evaluation.js |
| Five fictional dossiers | src/data/dossiers.js, dossier-narratives.js, policy.js, and provenance.js |
| Responsive visual implementation | src/styles/ and self-hosted Geist fonts in public/fonts/ |
| Local progress persistence | src/infrastructure/local-round-store.js and browser LocalStorage |
| Deployment configuration | package.json, scripts/build.mjs, and vercel.json |

The working flow includes Opening, Instructions, Credit desk, dossier review, Check CIC, direct Approve/Reject, locked Reduce input, Decision-Consequence Cards, and the final summary. Instructions remain accessible during play, and completed dossiers open as read-only Cards.

### 3.2 Implementation coverage

The application implements the DTI-based Capacity model defined in the three source PDFs. The modular implementation covers financial processing, learner interaction, state, and persistence. Release readiness also requires traceable commits, deployment verification, and complete handoff evidence.

| Implementation area | Status |
| :---- | :---- |
| Source alignment and technical specification | Documented in this route and docs/CANONICAL\_GAME\_SPEC.md; all 21 source pages reviewed |
| Five-dossier data integration | Implemented in src/data/; source conflicts recorded in provenance and the decision log |
| DTI and PMT/PV engine | Implemented with product-specific rates, term caps, and full-precision decision bands |
| Modular frontend application | Implemented with native JavaScript modules separating screens, transitions, and calculations |
| Round transitions and room ledger | Implemented with direct decisions, locked Reduce, and actual-principal allocation |
| Progress persistence | Implemented with saved-data validation, result reconstruction, and consistent round restoration |
| Automated verification | npm test passed: 24 tests successful, 0 failed |
| Production build and release | npm run build completed successfully; public URL and release commit remain unverified |

The canonical classifications are Approve, Reject, Reduce limit, Reduce limit, and Reject in the supplied case order. Detailed financial figures are maintained in [the canonical answer key](http://docs/CASE_ANSWER_KEY.md), and the engine derives results from the corresponding raw facts and policy.

## **4\. Frontend Application Flow**

The Rulebook defines calculations and classification, while the 1C MVP defines learner actions and answer visibility. The frontend implements these requirements as screens, controls, validation, and managed states.

### 4.1 Application screens and actions

| Stage | Screen or action | Purpose |
| :---- | :---- | :---- |
| 1 | Opening and Instructions | Introduce the role, five dossiers, credit room, DTI rules, and educational scope |
| 2 | Credit desk | Select dossiers in any order and view progress and remaining room |
| 3 | Dossier Review | Read source facts, requested/applied terms, rate, and estimated monthly installment |
| 4 | Check CIC | Reveal supplied active debts and history; monthly payments feed DTI, while history remains context |
| 5 | Select Decision Category | Finalize Approve/Reject directly or lock Reduce limit before its input appears |
| 6 | Reduction Exercise | Accept one monthly-installment input, validate it, and convert it to principal using PV |
| 7 | Decision-Consequence Card | Reveal the calculation, classification, explanation, grading, and actual room impact |
| 8 | Case Completion | Keep finalized results read-only and return to the desk for remaining dossiers |
| 9 | Shift Summary | Show category matches, Reduce grading, issued principal, and remaining room after five finalizations |

### 4.2 Relationship between Rulebook, User Flow, and frontend

| Source | Governing question | Frontend responsibility |
| :---- | :---- | :---- |
| **Rulebook** | How does the system calculate and classify a case? | Display the applicable terms, installment, and post-decision calculation audit |
| **User Flow / 1C MVP** | What actions does the learner perform, and when are answers revealed? | Implement direct decisions, the one-field Reduce exercise, and Card reveal |
| **Frontend Application Flow** | How are these requirements implemented in the application? | Enforce visibility, validation, locking, navigation, persistence, and feedback |

Raw financial evidence and the estimated installment are readable before commitment. Computed income totals for the calculation-heavy cases, DTI, the correct category, and maximum installment stay out of pre-decision projections. Check CIC is an evidence-reveal action, not an additional mandatory decision gate. The Card reveals the calculation after finalization; this is a learning-interface boundary, not server-side protection of answers.

### 4.3 Frontend development direction

| Technical choice | Purpose |
| :---- | :---- |
| **Native JavaScript modules** | Organize screens, application transitions, and financial logic into independent modules |
| **Reusable screen templates** | Keep Opening, Instructions, Desk, Dossier, Card, and Summary consistent through src/ui/ |
| **Explicit transition functions** | Control category locking, finalization, navigation, and room updates through src/application/ |
| **View projections** | Expose only the data permitted for the current stage |
| **Responsive CSS system** | Support desktop and mobile reading, keyboard focus, and field-linked validation feedback |

The frontend is English-language with Vietnamese applicant names preserved. Geist typography, charcoal/moss surfaces, aged-paper dossiers, and the pixel-office background follow the approved theme. Gameplay guidance lives in Instructions, which remains accessible during play.

## **5\. Credit Engine**

The Credit Engine converts raw dossier facts and product policy into reproducible financial results. It models Capacity only; occupation, household spending, CIC group/history, collateral value, and the other four Cs do not become additional scoring factors.

| Processing stage | Engine responsibility |
| :---- | :---- |
| Input preparation | Read sourced facts, loan type, and policy; derive each case's income recipe and true CIC monthly obligations |
| Financial calculation | Apply product/age term caps, calculate PMT and DTI, and derive the maximum installment at the 70% ceiling |
| Classification | Apply DTI bands: at most 70% Approve; above 70% through 80% Reduce limit; above 80% Reject |
| Decision evaluation | Compare the selected category; grade a valid Reduce installment against the canonical maximum with inclusive ±5% tolerance |
| Result creation | Convert valid Reduce input to principal using PV; return actual offer DTI, explanation, and room impact independently of grading |
| Auditability | Retain policy and source identifiers and reconstruct results through the same domain functions |

Unsecured loans use 18% annually and a 60-month product cap; secured loans use 11% and a 360-month cap. Both use maturity age 70\. The canonical maximum installment is 70% of case income less CIC monthly obligations. PMT and PV use the same applied term and exact annual-rate/12 conversion. Classification uses full precision; the displayed dossier installment and issued principal are floored to whole VND.

Income is case-specific, with no haircut or verification multiplier. Hạnh's 270 million VND turnover yields 30 million VND/month after the supplied operating costs. Tuấn's 9 million VND base salary plus 157 million VND commissions averaged across six months, including two zero-commission months, gives income of 35,166,666.67 VND/month and DTI of 85.71%. A valid but incorrect Reduce answer still commits; grading tolerance does not change the actual principal or resulting DTI.

## **6\. State and Persistence**

Each dossier has an explicit state that controls editable decisions, visible results, and allocation. Approve and Reject finalize directly. Reduce locks the category immediately and stays pending until a financially valid installment is submitted.

The principal states are Unopened, Reviewing, Reduce Pending, and Finalized. The separate CIC Checked flag records evidence visibility without creating a compulsory checkpoint. Instructions can be opened and closed without losing the selected dossier or pending input.

| State responsibility | Expected behavior |
| :---- | :---- |
| Selected case | Tracks the current dossier and permits any review order |
| CIC check | Reveals A2 and records the action without consuming room or changing the category |
| Decision lock | Prevents changing a pending Reduce category; finalized cases remain read-only |
| Final result | Records the decision, assessment, evaluation, and historical before/after room values |
| Credit-room ledger | Allocates actual issued principal exactly once; Reject and pending Reduce allocate nothing |
| Saved progress | Restores validated round data, screen, pending text, case status, and commitment order after reload |

LocalStorage records the round, selected screen, case states, entered text, and commitment order. Loading validates the schema, policy and dossier identifiers, and decisions, then reconstructs calculations and ledger history. Starting a new shift requires confirmation before overwriting saved progress. Persistence is limited to the same browser; unavailable storage produces a warning while allowing the active session to continue.

## **7\. Backend Direction**

The MVP operates without a network backend. It has no authentication, real customer data, cross-device synchronization, or teacher dashboard. Financial logic runs in the browser as a headless domain layer; source facts and author-side calculations remain inspectable in static client assets.

| Architecture option | Technical approach | Intended use |
| :---- | :---- | :---- |
| **MVP architecture** | Browser Credit Engine, bundled dossiers, and validated LocalStorage | Individual educational simulation and classroom demonstration |
| **Server-backed option (out of scope)** | API, central database, and server-authoritative evaluation | Accounts, synchronized progress, teacher analytics, and controlled answer access |

A server would be necessary for requirements such as accounts, cross-device progress, attempt history, centralized dossiers, or protected evaluation. These capabilities would require API adapters, authentication, a database, and server-side verification and are outside the defined MVP scope.

The selected architecture supports the complete Capacity exercise within the project scope. Its local-storage and answer-visibility limitations are documented as part of the handoff.

## **8\. Quality Assurance**

Quality assurance checks agreement between source requirements, the canonical answer key, domain calculations, state transitions, and visible results. Expected financial answers come from the approved case interpretation, not from copying the application's output into a test table.

| Verification level | Main purpose |
| :---- | :---- |
| **Domain verification** | Confirms five golden cases, PMT/PV, product/age caps, full-precision DTI bands, income reconciliation, and tolerance |
| **Integration verification** | Confirms category lock, answer projections, room allocation, idempotency, navigation, and validated restoration |
| **End-to-end verification** | Confirms the full five-case browser journey, errors, reload, responsive reading, and keyboard interaction |
| **Content verification** | Confirms source facts, financial calculations, explanations, claim boundaries, and consistency of documentation |

Automated verification records 24/24 passing tests and a successful production build. Browser checks are documented separately in [the browser verification record](http://.impeccable/review/browser-report.json). The Week 6 Test Table, Bug Priorities, and Deployment Check should reference the same reviewed source commit and actual tester/fixer/verifier. Browser artifacts are stored in Git-ignored .impeccable/review/, so selected evidence needs an included handoff location before repository submission.

## **9\. Deployment Route**

The local preview, test command, and static build are implemented. vercel.json invokes npm run build and publishes dist/. A successful local build is verified; it does not establish that a public deployment or final release commit has been reviewed.

| Release stage | Main activity | Expected output |
| :---- | :---- | :---- |
| Source preparation | Record the reviewed application source in the repository | Identifiable release commit; not verified in this route |
| Technical verification | Run domain/state tests and review browser and content evidence | Passing checks linked to the reviewed source commit |
| Production build | Run npm run build | Verified static dist/ containing runtime assets and fonts |
| Preview deployment | Publish and inspect a Vercel preview | Reviewed preview URL; pending public verification |
| Final deployment | Release the reviewed build and update README | Production URL linked to source, or a documented blocker and local fallback |

Vercel is the selected deployment platform. The build excludes source PDFs, reports, plans, and design concepts; only runtime files and required assets are published. Documentation and financial references remain in the repository.

The Deployment Check should record public checks, fallback steps, frozen demo scope, postponed work, and known limitations. A documented local run provides a fallback when public deployment is blocked.

## **10\. Final Technical Direction**

The application combines the following components.

| Component | Selected approach |
| :---- | :---- |
| Frontend | Static HTML/CSS and native JavaScript screen modules |
| Credit calculations | Pure JavaScript DTI, income, PMT/PV, validation, and evaluation functions |
| Application state | Explicit transitions, view projections, and idempotent finalization |
| Progress storage | LocalStorage with saved-data validation and result reconstruction |
| Quality assurance | Automated domain/state tests, browser evidence, and Week 6 test records |
| Deployment | Static dist/ build and Vercel configuration; public verification pending |

Completion will be assessed against the criteria below.

| Final criterion | Required outcome |
| :---- | :---- |
| Financial consistency | All five cases match the reconciled answer key and supplied DTI policy |
| Architectural separation | UI, state, domain logic, and persistence retain distinct responsibilities |
| State integrity | Locked categories cannot be changed and finalized principal cannot consume room twice |
| Saved-data integrity | Invalid or inconsistent saved progress is rejected before restoration |
| Information control | Correct category, DTI, and derived answers appear only at the permitted UI stage |
| Reproducibility | Results trace to raw facts, verified income calculations, exact product parameters, and policy/source identifiers |
| Deployment readiness | Build is reproducible; a reviewed URL or documented blocker/fallback is linked in README |

This route documents a working Capacity-only MVP, not a full lending system or financial recommendation. It presents the Technical Lead's responsibilities through a clear architecture, traceable financial processing, consistent learner interaction, and measurable verification and release criteria.  
