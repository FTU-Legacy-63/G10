# **Technical Route (Owner: Nguyen Duc Minh)**

## **1\. Technical Purpose and Source Authority**

The Technical Route explains how requirements, credit rules, evidence and learner actions become a working, verifiable application. This revision follows the supplied [Technical Route format (18)](../input-materials/2026-10-16_group10_technical-route-template/README.md), with twelve sections, short explanations and supporting tables.

The active product combines Capacity, Character, Capital, Collateral and Conditions. Its content is the eight-case Extended Dossier Set (13), matrix (15), and one shared Warehouse pool from (16)/(17): 168 records, comprising eight main records and 160 noise records. The two Warehouse tables are identical and must not be concatenated. The separate five-case dossier/matrix pair remains a baseline.

The [input index](../input-materials/README.md) preserves eighteen originals across five receipt bundles. Full-product rulebooks, MVP, input validation and assumptions govern financial behavior; the [Core User Flow](http://CORE_USER_FLOW.md) governs the learner workflow; [V3](http://INTERFACE_DESIGN_V3_EN.md) and [V8](http://IMPLEMENTATION_V8.md) guide the bank-office experience. Template (18) supplies format, not its archived 1C runtime rules.

The previous application is archived and the new runtime is not initialized. Proposed architecture must not be described as implemented, historical tests as fresh verification, or unresolved source interpretations as approved policy. Results are fictional classifications under project rules, not lending advice or repayment predictions.

## **2\. Updated Product Logic**

### 2.1 Project logic chain

> *Office and evidence → identify the applicant → qualify income and obligations → assess the five Cs → provisional decision and input → review → submit → explain the consequence.*

The learner locates relevant evidence and applies disclosed rules. The system supplies the scenario and estimated installment, preserves working, validates input structure and reveals its reference assessment only after whole-round submission.

| Stage | Learner/system activity | Technical responsibility |
| :---- | :---- | :---- |
| **Scenario** | Read narrative, loan request, installment and fixed macro banner | Present authored facts without derived verdicts |
| **Identity matching** | Search Warehouse, inspect documents and pin a record | Keep match correctness and main/noise metadata hidden |
| **Evidence qualification** | Identify eligible income and active monthly debts | Preserve component provenance and case-specific eligibility |
| **Five-C assessment** | Check Character, purpose, acceptance, DTI, coverage, reserves and environment | Run one ordered reference pipeline with explicit early stops |
| **Decision inputs** | Choose one category; enter its amount or covenants where required | Validate permitted shape/range without checking the answer |
| **Review and submission** | Revise reached cases, then confirm the complete round | Freeze one final snapshot; prevent partial or duplicate finalization |
| **Consequence** | Compare final choices and working with references | Show one Summary with explanations and secondary requirements |

### 2.2 Claim and learning boundaries

Thresholds and formulas are taught openly, but case-specific reference results stay hidden before submission. A low DTI alone does not establish Approve: the full precedence applies.

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| Tenor, PMT/PV, DTI, Reserve cover and LTV | Calculation | Result under authored inputs and project parameters |
| Five-C ratings and five decisions | Classification | Scenario classification; no moral judgment, economic forecast or universal banking claim |
| Case and portfolio consequences | Explanation | Deterministic consequences of final learner choices |
| Worksheet and covenant selection | Feedback only | Unscored; blanks are permitted in the worksheet |
| Matrix stars and difficulty | Authoring metadata | Neither live risk predicates nor learner points |
| Numerical scorecard / default probability | Not defined | No invented risk percentage, weighted total or placeholder zero |

Day cycles, Pending, callbacks, document-completeness quests, changing macro conditions, free-roaming 3D, spouse/guarantor underwriting, other collateral types and multiple pledged assets are outside the core round. Atmosphere and portraits add no hidden credit factors.

## **3\. System Architecture**

Create fresh modules around an independent credit domain. The proposed stack is HTML/CSS, JavaScript ES modules, Phaser office presentation, DOM work interfaces, Vite development/build and browser-local progress. Select and lock compatible dependency versions during bootstrap; archived versions are not assumed current.

| Technical layer | Planned location | Main responsibility | Design boundary |
| :---- | :---- | :---- | :---- |
| **Presentation** | src/game/, src/ui/, src/styles/ | Illustrated office, documents, fields and accessible controls | No credit formulas or reference-answer decisions |
| **Navigation/projections** | src/presentation/, application/projections | Views, source tabs, focus return and visible state | Exclude answer-derived fields before Submit |
| **Application state** | src/application/ | Queue, drafts, review, finalization and allocation | Explicit commands; scenes do not own financial state |
| **Credit engine** | src/domain/ | Terms, evidence, five-C rules, validation and comparisons | Pure functions independent of UI/storage |
| **Content and policy** | src/content/ | Cases, Warehouse, author references, consequences and provenance | Separate public evidence from internal mappings |
| **Persistence/build** | src/infrastructure/, scripts/ | Versioned saves, recovery, content checks and static output | Reconstruct derived values; publish required runtime assets only |

Public content and author references require separate contracts. Do not render the original Warehouse table wholesale: Classification and Differences expose answers. A static client can still be inspected technically; this separation controls the normal learner experience, not protected examination access.

| Data contract | Essential fields |
| :---- | :---- |
| **Round** | Dataset/content/policy versions, ordered case IDs, fixed macro, room policy and Warehouse version |
| **Public dossier/CIC/collateral** | Narrative, request, supplied EMI, credit/debt facts, purpose evidence, liquidity and secured-property facts |
| **Public Warehouse record** | Record ID, name, age, province, headline and documents |
| **Author reference** | Main-record mapping, reviewed income/debt components, assessment facts, expected trace and source references |
| **Learner draft** | Optional worksheet, category, active payload, pin, source access and personal notes |
| **Final snapshot** | Immutable final inputs, assessed trace, comparisons, chosen consequences and supported portfolio results |

Identify cases by dataset plus case ID, and records by pool version plus record ID. Preserve source narrative; never fill a visible purpose/acceptance verdict from the hidden key. Transcribe into staging data, validate joins/counts, reconcile financial evidence, review transformations and then version the approved content. Markdown originals remain unchanged and are not parsed in the learner browser.

Technical choices refer to [browser modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), [Phaser scenes](https://docs.phaser.io/phaser/concepts/scenes), [Vite builds](https://vite.dev/guide/build) and the [Node test runner](https://nodejs.org/api/test.html). These choices do not assert either reference game's technology stack.

## **4\. Implementation Status**

### 4.1 Current rebuild workspace

The clean workspace contains reference documents and inputs. The old source, dependencies, build outputs and deployment configuration remain archived; no old save or implementation contract is automatically imported.

| Available material | Current evidence |
| :---- | :---- |
| **Source inventory** | Eighteen byte-preserved originals in five receipt bundles |
| **Extended content** | Eight cases, all five headline categories and forty consequence branches |
| **Warehouse pool** | 168 unique IDs/identity triples; identical tables; all eight main identities match dossier pointers |
| **Design and flow** | V8, V3, rewritten Core User Flow and source reconciliation notes |
| **Arithmetic check** | Eight rounded PMTs, applicable DTI displays, two Reduce PV references and case-07 collateral figures independently checked |

### 4.2 Coverage against the current inputs

| Required area | Rebuild status |
| :---- | :---- |
| Five-C engine and source-linked evaluation | Specified; new implementation pending |
| Shared Warehouse search/pinning | Pool and interaction requirements received; search implementation pending |
| Income derivation | Main references supplied; tax/stability conflicts and structured noise-record incomes need review |
| Sequential cases, worksheet and five payload paths | Specified; UI/application integration pending |
| Review, room and single final Summary | Specified; general room policy still open |
| Save/reload and failure recovery | New schema proposed; implementation/testing pending |
| Office/art, browser QA, build and release | Planned; no fresh application evidence claimed |

### 4.3 Implementation evidence and status discipline

Received means preserved; specified means documented; proposed means awaiting review; implemented requires new code; verified requires fresh evidence against that revision. The numerical checks above use authored inputs and do not certify later tax interpretations, every consequence branch or a running application.

## **5\. Learner Flow**

### 5.1 Updated full-product flow

Process KHCN-01 through KHCN-08 sequentially. Review can reopen reached dossiers; future loan dossiers remain hidden. Warehouse directory access is treated separately from queue membership.

| Step | Screen/action | Purpose and state behavior |
| :---- | :---- | :---- |
| 1 | Office / briefing | Begin inside the bank office; disclose objective, fixed macro and end-round reveal |
| 2 | Read dossier | Show narrative, request, applied terms and supplied EMI; raw secured facts stay read-only |
| 3 | Search Warehouse | Compare identity, open documents and optionally pin a record; no correctness marker |
| 4 | Qualify income / Check CIC | Find counting income and active payments/card minimums; CIC is explicit and reopenable |
| 5 | Character / purpose / acceptance | Apply early checks; no automatic on-screen reference verdict |
| 6 | DTI / remaining Cs | Compute Capacity, secured coverage, Reserve cover and environment as applicable |
| 7 | Optional worksheet | Record learner working without auto-fill, grading or a completion gate |
| 8 | Decision / required input | Select one of five; validate only category-specific structure/range |
| 9 | Save and continue | Persist working; a complete decision/payload releases the next dossier |
| 10 | Review | Edit reached cases, sources, pins, worksheet and decisions; no answer hints |
| 11 | Submit / confirm | Require all eight decisions and valid required payloads; cancel remains editable |
| 12 | Summary | Lock the round and reveal final comparisons, explanations and consequences once |

Before submission, hide reference DTI, ratings, net/LTV/reserve, correct decisions, answer ranges, matrix flags and consequence text from visible UI, mounted hidden content, tooltips and accessibility labels. The learner's own working, neutral source facts, public rules and supported provisional allocation may be visible.

### 5.2 Decision inputs and error paths

| Decision | Required input | Structural validation |
| :---- | :---- | :---- |
| Approve / Reject | None | Exactly one category selected |
| Reduce limit | Proposed Max installment, VND/month | Finite number \>0 and \<= original displayed EMI; convert to proposed principal with PV |
| Require more collateral | Additional collateral, VND | Finite number \>0 and \<= loan amount /0.70; negative-net conflict remains explicit |
| Add conditions | Covenant selection | At least one permitted covenant |

Covenants are use-of-funds documents, periodic collateral re-appraisal (Secured only), and periodic occupation/income updates. Selection is feedback-only. Secondary requirements under Reduce/collateral headlines appear in the final report, without adding unsupported input gates.

The ten optional worksheet fields cover Character, purpose, secured acceptance, DTI, secured net/LTV/collateral result, Reserve cover, Capital and Conditions. Numeric fields allow blank or finite values \>=0 under the supplied validator. Blank means Not answered; Unsecured collateral means N/A. The policy for nonempty malformed optional text remains I11.

Changing a category clears its previous raw numeric/covenant payload; returning starts empty. Worksheet and notes remain. Navigation/reload under the same category preserves raw working. Five choices are proposed without hidden answer-based filtering; Unsecured eligibility of the collateral decision remains I09.

| Trigger | Response |
| :---- | :---- |
| Missing category / invalid required number | Exact input-plan error beside the field; retain raw working |
| Amount \<=0 / above its permitted cap | Positive-value or original-EMI/collateral-cap message; no answer comparison |
| No covenant / incomplete round | Required-selection/completeness message; Submit unavailable |
| Blank worksheet / no Warehouse pin / CIC not visited | No additional completion gate or penalty |
| Wrong but structurally valid answer or pin | Keep neutrally; explain only after submission |
| No search results | Neutral empty state; suggest broadening the query |
| Source/load/save failure | Preserve draft and offer recovery; never substitute zero inputs or a credit verdict |

Exact source error copy remains in the [Core User Flow](http://CORE_USER_FLOW.md). Numeric correctness uses inclusive \+/-5% only after Submit. Worksheet and covenant choices remain unscored.

### 5.3 Office and Warehouse access

Use four fixed illustrated views and three close-ups for desk, computer and board. Every work function has an object entry and a keyboard route. Documents suspend room controls; Back/Escape restores view/focus. Use real text, Vietnamese-capable fonts, full amounts, \>=44 px hit targets, reduced motion and a narrow reading mode.

Proposed Warehouse search follows WH-17: one shared pool; required name; optional age/range and province; AND filters; strict-diacritic and one-character-per-word fuzzy options. Exact matches rank first, with session/record hashing for stable ties. Store the session seed; finalize and test Unicode/token/range semantics before implementation.

Results expose record ID, profile and headline without document previews. Documents open separately; Use this record pins one choice until round submission. Hide main/noise/trap labels, Differences, case associations and eligible-income aggregates. Do not disclose future queue membership or unopened loan facts. This document-first/full-pool proposal replaces the older V3 S08 design for review, without silently resolving its source conflicts.

## **6\. Credit Engine**

### 6.1 Calculation and assessment order

One domain pipeline supplies both final explanations and reference comparisons. Use unrounded values for assessment, separate display rounding, finite-value guards and exact-boundary tests. Rates and thresholds below are project rules.

1. Select Unsecured: 18% annual, 60-month cap; or Secured: 11% annual, 360-month cap. Both mature by age 70\.  
2. Apply n \= min(requested months, product cap, (70 \- age) × 12\) and r \= annual rate /12.  
3. Compute factor \= \[1 \- (1+r)^(-n)\] /r, then PMT \= requested principal /factor. The player receives the installment.  
4. Rate Character, check purpose, and check secured acceptance. Any blocking result produces reference Reject and stops assessment.  
5. Compute DTI \= (active obligations \+ PMT) / verified monthly income. DTI \>80% rejects; 70% \< DTI \<=80% reduces; \<=70% continues.  
6. For Reduce, reference Mmax \= 0.70 × income \- obligations; reference loan is Mmax × factor. Player proposed loan uses their valid installment with the same factor.  
7. For Secured, assess net/LTV on requested or correctly reduced reference principal; then assess Capital and environment on an explicit approved basis.  
8. Apply headline precedence and preserve applicable lower-priority requirements.

| Check | Rule | Effect |
| :---- | :---- | :---- |
| **Character** | Current CIC \>=2 or Forgery signs: Block. Current 1 with worst-in-12-months \>=2, or inquiries \>=3: Watch. Otherwise Clear | Block rejects; Watch attaches covenants when no higher trigger |
| **Purpose** | Supporting documents contradict/fail to support purpose or amount | Not feasible rejects; genuine documents can still contradict the purpose |
| **Acceptance** | Secured ownership/consent/dispute and transferability; authored valuation required | Not accepted rejects before LTV; Unsecured is N/A |
| **Collateral** | Net \= appraisal \- senior claims; LTV \= assessed principal /net; maximum 70% | \>70% or net \<=0 is Shortfall; exactly 70% is Clear |
| **Capital** | Reserve cover \= eligible liquid assets /assessed monthly debt service | \<3 months Watch; exactly 3 or more Clear; post-Reduce basis remains open |
| **Conditions** | Main income industry Unfavorable OR fixed macro Stressed | Adverse attaches covenants; thresholds do not tighten |

Precedence is **Reject → Reduce limit → Require more collateral → Add conditions → Approve**. Collateral Shortfall binds after a \<=70% Capacity result; Watch/Adverse binds where collateral is Clear/N/A. Reduce and collateral headlines retain secondary requirements. A reference early stop changes the final trace, never learner-visible controls before Submit.

### 6.2 Income and obligation qualification

| Evidence type | Reference treatment |
| :---- | :---- |
| Applicant identity | Main-record evidence governs the correct answer; a pin records learner evidence use only |
| Stated income | Context; never the reference denominator by default |
| Recurring income | Approved borrower-owned pay/allowances/pension with component provenance |
| Rental income | Monthly conversion after eligibility/stability and reviewed tax treatment; registration alone is insufficient |
| Variable income | No automatic average-counting rule; Tuấn's authored unstable campaigns are excluded |
| Family income / one-offs / unsigned or vacant rent | Follow authored exclusions; no spouse/guarantor underwriting |
| Active CIC debts | Monthly payments and card minimums; exclude closed debts and the new request |
| Household costs / card balances or limits | Not substitute monthly obligations or hidden adjustment factors |
| Liquid assets | Exclude pledged/borrowed assets and real estate; securities eligibility remains a source issue |
| CIC history / main industry | Respect stated time windows and main-source outlook; no secondary-industry substitution |

Occupation/tenure is not a hidden multiplier; this does not remove an authored income-stream stability test. Missing/nonpositive verified income, invalid tenor or malformed reference facts are content errors, never fabricated Clear/Reject results or learner penalties.

### 6.3 Evaluation and result construction

Separate chosen category, input validity, reference correctness and player-derived offer. A grading tolerance does not clamp an offer to the reference maximum. Preserve raw numeric text; do not coerce blank to zero or silently strip invalid characters. Define grouping/decimal grammar and ledger rounding explicitly.

Additional collateral is assessed principal /0.70 \- net collateral; round the system reference upward to the nearest 1,000,000 VND before \+/-5% comparison. Show mathematical reference, rounded reference and learner entry separately. The alternative collateral-supported loan is 0.70 × net collateral. Do not divide by nonpositive net or silently clamp it.

| Extended case | DTI display | Authored headline and key requirement |
| :---- | :---- | :---- |
| KHCN-01 | 63.05% | Approve |
| KHCN-02 | 89.52% | Reject; downstream checks Not assessed |
| KHCN-03 | 66.91% | Add conditions; Character history Watch |
| KHCN-04 | 75.41% | Reduce: 9,900,000 monthly installment; approximately 383,045,000 principal; Capital covenants |
| KHCN-05 | 74.79% | Reduce: 6,300,000 monthly installment; approximately 610,354,000 principal; Character covenants |
| KHCN-06 | 67.99% | Approve; LTV exactly 70% |
| KHCN-07 | 48.11% | Require more collateral: 169,000,000; alternative loan 882,000,000; Watch/Adverse covenants |
| KHCN-08 | Not assessed | Reject at purpose; 38.73% is counterfactual only |

This author-side fixture is not a pre-submit screen. Independent high-precision arithmetic matches all eight rounded PMTs and applicable DTI displays. Reduce raw PVs are approximately 383,045,069.31 and 610,353,695.75; case-07 mathematical collateral addition is approximately 168,571,428.57. The authored rounded portfolio totals 4,533,399,000 VND. These checks use the existing income keys and do not resolve new tax/stability evidence.

Final reports distinguish Assessed, N/A, Not assessed and Content error. Blank learner fields are Not answered. Select the consequence branch for each final choice inside one Summary; never show per-case Cards during drafting. Omit undefined scorecard figures.

## **7\. State, Room, and Persistence**

### 7.1 State model

| State group | Required contents |
| :---- | :---- |
| Round | Attempt/session ID, content/policy/schema versions, fixed macro, opened prefix, phase and revision |
| Case draft | Worksheet, category, active payload, pin, source access and notes |
| Navigation | Office/work view, reached case, source tab/scroll, comparison and return focus |
| Derived projection | Structural readiness, player-entry PV and supported provisional allocation; no answer fields |
| Final snapshot | Immutable final working, assessed trace, comparisons, consequences and version identity |

Proposed phases are draft → confirming → submitting → submitted. Cancel returns to editable review. Confirm revalidates the current revision, freezes final inputs, evaluates and commits one complete snapshot before reveal. Failed durable saving preserves the editable draft; successful commitment followed by report-render failure remains locked and retryable. Duplicate confirmation, reload and repeated report opening cannot finalize/debit twice.

Local storage is not a multi-user database transaction. Define and test a single-writer/revision strategy with stale-tab recovery; do not claim atomicity from a read-then-write check. If explicitly offering memory-only play when storage is blocked, disclose its persistence limit and preserve the same lock/reveal semantics.

### 7.2 Planned versus committed room

The extended fixture proposes **4,590,000,000 VND** room. It replaces neither a general allocation policy nor the missing budget-gate decision. Compute room from current learner choices, not accumulated edits or the correct-answer portfolio.

| Draft choice | Proposed planned-allocation basis |
| :---- | :---- |
| Approve | Requested principal |
| Reduce limit | PV of the learner's valid installment under approved rounding |
| Require more collateral | Requested principal, conditional on collateral cure |
| Add conditions | Requested principal, conditional on covenants |
| Reject | Zero |
| Missing/invalid required input | Partial/incomplete allocation, not a complete zero offer |

This table is a review proposal. Conditional allocation, incomplete drafts, rounding and over-budget Submit behavior remain I02. Do not inherit the old 1.6bn cap or declare a new hard gate. A slightly above-principal PV caused by displayed-EMI rounding also needs the same explicit convention; no hidden clamp. Unsupported totals are omitted rather than fabricated.

### 7.3 Progress storage and restoration

Use a new proposed key, the-credit-desk:rebuild:v1, bound to workflow/content/policy versions. Preserve learner raw text, active payload, worksheet, notes, pins, CIC access, opened order, macro, session seed and safe navigation state. Store the final snapshot only after successful finalization; do not duplicate assets or the full Warehouse in each save.

Restore defensively: validate schema, enums, ranges, record/case IDs, opened prefix and version compatibility; reconstruct readiness/PV/allocation through the same modules. Do not trust saved totals or phase flags alone, resurrect cleared payloads, overwrite legacy V4/V3 saves, or reinterpret their case IDs. Corrupt/incompatible/stale saves need honest recovery or a separately chosen new attempt.

[localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is origin-specific and may be blocked; HTTP and HTTPS differ. Serve over HTTP(S), handle write failures and do not promise cross-device continuation.

## **8\. Source and Scope Reconciliation**

The older template's runtime descriptions are historical. The following decisions govern the rebuild or remain explicitly open; recommendations do not silently become approved credit policy.

| Topic | Current source position | Handling in this route |
| :---- | :---- | :---- |
| **Scope and cases** | Five-Cs/five choices; eight extended cases, separate five-case baseline | Use (13)/(15); do not reuse archived 1C defaults or merge by ID |
| **Warehouse count** | Both new tables have 168 rows; older prose says 105/five cases | Compile one pool; retain originals and count discrepancy |
| **Queue / payloads / reveal** | Sequential intake; old payload cleared; one final Summary | No any-order intake, cross-category retention or per-case feedback |
| **Room \- I02** | Proposed 4.59bn fixture; general allocation/gate/rounding missing | Record one policy before shipping complete room behavior; no inherited cap |
| **Negative net \- I03** | Shortfall rule conflicts with nonnegative worksheet and cure-input cap | Resolve both constraints before shipping affected cases; no silent clamp |
| **Capital basis \- I04/D05** | Original EMI versus reduced debt service | Preserve authored basis; agree a reusable rule before certification |
| **Early stop \- I05/D04/D06** | Cases 02/08 skip later checks; P-1/P-2 undefined | Use Not assessed; label counterfactuals; invent no external policy |
| **Income dataset \- W02** | Prose supplied; numeric per-record income column absent | Main references come from (13); review noise references rather than invent them |
| **Rental tax \- W03** | New Thịnh table adds 46.8M annual tax; old 32M key does not account for it | Resolve eligible-stream/tax treatment before authoritative case-04 release |
| **Eligibility \- W04/I06** | General averaging/registered-rent rules conflict with stability exclusions; securities definition differs | Keep explicit case evidence; approve general eligibility rules |
| **Search / aggregate \- W05/W06** | Shared-pool/hidden-total source conflicts with V3 opened-only/visible-total layout | Proposed full-pool directory without case association and document-first display |
| **Optional input / choice \- I09/I11** | Unsecured collateral-choice eligibility and invalid optional-text Submit policy unspecified | Proposed five choices; require correction or clearing of malformed text, never completion of blanks; record decisions first |
| **Scorecard \- I01** | Numerical formulas absent; working/covenants unscored | Show sourced comparisons/consequences; omit undefined scores |
| **Copy/provenance \- I07/I08/I12/I14** | Assumption labels, no-label wording, rounding and broken section references | Neutral units, project-rule claims, separate rounded reference and accurate citations |
| **Trap/metadata \- D07/D08** | Case-07 trap ignores remaining Watch/Adverse; baseline matrix count typo | Do not certify inconsistent text or use matrix flags as engine truth |

Detailed evidence remains in the [rule issues](../input-materials/2026-10-16_group10_full-product/SOURCE_ISSUES.md), [dossier notes](../input-materials/2026-10-16_group10_dossiers-matrices/INTEGRATION_NOTES.md) and [Warehouse notes](../input-materials/2026-10-16_group10_warehouse-dossiers/INTEGRATION_NOTES.md). Architecture/search prototypes can proceed; affected financial content, guards and allocation require recorded decisions before release. Visits/pins remain nongating and carry no separate penalty.

## **9\. Backend Direction**

The core is a static educational simulation without authentication, real customer data, live bank/CIC queries, telemetry or cross-device synchronization. Search uses authored local records. Browser-side answer references are technically inspectable.

| Architecture option | Technical approach | Intended use |
| :---- | :---- | :---- |
| **Static core** | Browser engine, versioned content and validated local saves | Individual practice and classroom demonstration |
| **Later server-backed option** | Content/attempt APIs, authentication, database and server-authoritative submission | Accounts, synchronized progress, teacher analytics or protected assessment |

Keep later services behind adapters. A server would own reference evaluation, version checks and idempotent submission; public directory evidence can remain downloadable. Backend implementation is outside this core, and 168-record search alone does not require a server.

## **10\. Quality Assurance**

Connect every requirement to its source, domain output, transition, visible projection and explanation. Golden values come from approved source interpretation or independent arithmetic, not copied engine output. Synthetic boundary fixtures are tests, not invented production applicants.

| Verification level | Main purpose |
| :---- | :---- |
| **Source/content** | Eighteen unchanged originals; eight complete cases; forty branches; one deduplicated 168-row pool; exact main joins and provenance |
| **Financial** | PMT/PV inverse, age cap, eligible income/debt, exact 70%/80% DTI, 70% LTV and 3-month boundaries; no broad threshold-changing epsilon |
| **Five-C rules** | Current/history/inquiry distinctions, purpose/acceptance rejection, precedence, secondary requirements and skipped checks |
| **Inputs/comparison** | Blank/zero/negative/malformed/nonfinite values, permitted caps, wrong-but-valid answers, upward collateral rounding and inclusive \+/-5% endpoints |
| **Warehouse** | Eight exact identity queries, diacritics/fuzzy/range/AND filters, seeded ranking, no previews/author markers, neutral wrong/no pins |
| **State/integration** | Sequential access, opened review, payload clearing, cancel/confirm, final snapshot and no duplicate commitments |
| **Persistence** | Raw-state save/reload, final-report replay, storage failures, corrupt/stale/incompatible saves and legacy protection |
| **Browser/accessibility** | Complete eight-case journey, keyboard/focus, typing isolation, long documents, narrow reading, reduced motion and asset failure |
| **Information boundary** | No answers before confirm in UI, hidden DOM, accessibility tree, previews, colors, portraits or audio |
| **Release** | Clean reproducible build, inspected preview, expected assets and evidence linked to revision/content/policy/schema IDs |

Test at 1920×1080, 1366×768, 1280×720 and a narrow reading layout. Tax/stability discrepancies and the case-07 trap need explicit disposition before semantic QA passes. The document's arithmetic checks and archive reports do not replace fresh application, browser or release evidence.

## **11\. Deployment Route**

Delivery follows concrete review outputs rather than a promised calendar. Preserve V8's concept → interaction → complete playthrough → QA sequence, while replacing its old case/day assumptions.

| Milestone | Main activity | Expected output / gate |
| :---- | :---- | :---- |
| **M0 \- Contract** | Confirm content/policy interpretations and stage schemas | Source map, decision register and approved evaluation inputs |
| **M1 \- Fresh skeleton** | Build/test setup, DOM work shell and office adapter | Room plan and three reviewable style frames; keyboard/Back behavior |
| **M2 \- Evidence/domain** | Integrate shared pool, case sources, search/pins and ordered engine | Source/count checks and a tested complete vertical slice |
| **M3 \- Full round** | All eight cases, worksheet/payloads, review, configured room and Summary | Five categories and forty branches integrated; relevant policy gates settled |
| **M4 \- Save and art** | New schema/recovery, approved office assets, paper interfaces and portraits | Reliable restoration, final locks and accessible responsive journey |
| **M5 \- Release candidate** | Fresh QA, production build and preview inspection | Reproducible candidate linked to source/content/policy versions |

Create fresh proposed commands: npm run dev, npm test, npm run validate:content, npm run build and npm run preview. They are planned interfaces, not existing scripts. Commit a lockfile and compatible Node runtime; verify actual APIs during bootstrap. Proposed static output is dist/, supported by [Vite](https://vite.dev/guide/build) and explicit [Vercel output configuration](https://vercel.com/docs/project-configuration).

| Release stage | Main activity | Expected output |
| :---- | :---- | :---- |
| Source preparation | Record reviewed code, content and policy decisions | Identifiable release candidate |
| Technical verification | Run relevant automated and real-browser checks | Fresh evidence against that candidate |
| Production build | Generate runtime, reviewed content and assets | Reproducible dist/ inspected locally |
| Preview | Inspect complete journey, assets/fonts and storage behavior | Reviewed preview URL and resolved issues |
| Production / handoff | Later authorized release of reviewed candidate | URL, versions, setup, known limits, recovery and rollback instructions |

Asset manifests cover four consistent office views, three close-ups, paper templates, eight-case portrait needs, icons, Vietnamese-capable fonts and audio. Keep financial text live, optimize images and measure performance on a prototype. Original Markdown, raw video, archive, design references and internal reports stay outside published assets. Excluding raw sources does not make static answers protected. No deployment occurs in this documentation task.

## **12\. Final Technical Direction**

| Component | Rebuild approach |
| :---- | :---- |
| Frontend | Illustrated four-view bank office plus native readable work interfaces |
| Credit engine | Independent ordered five-C assessment, structural validation and final comparison |
| Data | Eight extended dossiers, forty consequences and one shared 168-record Warehouse |
| Application state | Sequential intake, optional working, five provisional decisions, opened review and one final snapshot |
| Progress | New versioned local schema with compatibility checks and failure recovery |
| QA | Source, numerical, state, search, browser, accessibility and release evidence |
| Deployment | Fresh reproducible static build and reviewed preview; production remains a later action |

Completion is assessed against these criteria:

| Final criterion | Required outcome |
| :---- | :---- |
| Financial consistency | Approved evidence, formulas, precedence and secondary requirements agree; no concealed tax/basis conflicts |
| Evidence traceability | Every reference input and consequence maps to reviewed source content |
| Architectural separation | Presentation, application, domain, content and persistence have distinct responsibilities |
| State integrity | Raw work survives allowed navigation; category changes clear old payloads; submission locks once |
| Information control | No pre-submit answer leakage; clear Not answered/N/A/Not assessed states |
| Version integrity | No baseline collision, duplicate pool, silent old-save import or policy reinterpretation |
| Scope/claim integrity | Fictional classifications; no invented credit factors, score formulas or day mechanics |
| Reproducibility | New QA/build/preview evidence identifies the exact candidate and its versions |

The route is a review specification, not a claim of implemented or released functionality. Begin with reviewed content/policy and a fresh skeleton, prove one complete slice, then integrate the full round, reliable saves, approved art and release QA.

