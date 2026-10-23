# The Credit Desk - Game Design Document

**Version 1.1 · 17 October 2026 · Review draft · English**

**Approval update — 17 October 2026:** the user approved this GDD and instructed development to begin. The recommended browser-first Phaser/HTML direction is adopted for the rebuild. The G1 first playable is recorded in [implementation notes](../docs/IMPLEMENTATION_NOTES.md). The original proposal below remains dated design rationale; open financial policies are not silently resolved, and production graphics still follow the small-sample review gate.

This document combines the current rules, cases, Warehouse, user flow and updated Interface and Design (19). It proposes the game and engine for approval. No new game graphics, mockups, assets, engine project or runtime have been produced. Graphics work starts only after the user's approval of the GDD and engine direction.

## 1. Game concept and player promise

The Credit Desk is a single-player evidence-reading and credit-assessment game set inside a fictional Vietnamese bank office. The player is a credit officer: read an application, locate the correct verification record among lookalikes, distinguish usable evidence from narrative noise, apply disclosed rules and take responsibility for a final set of decisions.

The central pleasure is resolving an apparent contradiction through careful reading. A confident-looking applicant can have a purpose problem; a past late payment can be outside the relevant window; a salary can be understated; a plausible property value can conceal a senior claim. The game rewards understanding through a final explanation, rather than immediate right/wrong signals.

| Design pillar | Player experience | Design consequence |
|---|---|---|
| Evidence before judgment | Find what actually supports the application | Raw documents remain readable; identity selection and income eligibility are separate tasks |
| Rules the player can learn | Understand why a decision follows | Public thresholds, formulas and precedence; no hidden personality or employment multipliers |
| Provisional work, final accountability | Reconsider without exploiting feedback | Editable drafts and opened-case review; one whole-round reveal |
| A believable working place | Move between desk, terminal, notebook and ledger | One consistent office, with direct accessible routes to every task |
| Readability over decoration | Handle long prose and money values comfortably | Real text and native controls; artwork supports reading regions |

**Audience proposal:** students learning individual credit assessment, classroom demonstration users and players who enjoy deliberate evidence puzzles. No banking expertise is required beyond the onboarding guide; arithmetic is part of the task. This is an audience hypothesis to validate, not a proven market claim.

**Platform proposal:** desktop browser, mouse and keyboard, local progress, no account/backend. English UI with Vietnamese names follows the existing route; full Vietnamese localization is a separate copy/testing decision. Mobile, controller-first play and native Steam release are not promised in the first delivery.

**Shift duration — user-confirmed rule, 17 October 2026:** one shift is one eight-case round and has no time limit or target completion duration. Players may take as long as needed to read, search, calculate and review. There is no countdown, timeout, automatic submission/end of shift, speed score or penalty for slow reading or inactivity. Normal completion occurs only when the player explicitly confirms Submit after the existing completeness checks. Saved progress can be resumed in the same shift without a gameplay expiry deadline.

## 2. Scope, source authority and design status

The active inventory is **19 unchanged originals in six receipt bundles**. File suffixes identify copies, not universal precedence. A requirement supplied by a document is not proof that it has been implemented or that every source conflict is resolved.

| Source group | Use in the GDD |
|---|---|
| CAP, RULE-4C, MVP-4C, INPUT-4C, FEATURE-4C, ASSUME-4C | Financial definitions, five-C logic, structural inputs, feedback and scope |
| DOSSIER-8 (13) + MATRIX-8 (15) | Active eight-case facts, answer references, coverage and 40 authored consequences |
| WH-16 + WH-17 | One shared pool of 168 records, identity/document evidence and search/pinning requirements |
| UI-19 | Latest supplied interface/interaction direction, including room HUD, worksheet and final report |
| Core flow (11), Technical Route template (18), current derived flow/route | Format and workflow/architecture references; archived runtime statements do not replace current rules |
| V8, V3 and supplied Roottrees/Our Town references | Spatial interaction and visual intent; superseded UI details are reconciled against UI-19 |
| Five-case (12)/(14) and 1C inputs | Separate baselines for comparison; never merge with active cases by ID alone |

This GDD uses four labels: **Supplied** for source requirements, **Proposed** for choices awaiting review, **Open** for unresolved definitions, and **Checked** for a stated receipt/arithmetic inspection. The bank-office opening and approval-before-graphics sequence also come directly from the user.

**Core delivery:** one office; eight sequential dossiers; one Warehouse pool; Check CIC; source comparison and personal notes; optional worksheet; five decisions and their payloads; review; supported room display; local saves; one final Summary.

**Outside this delivery:** day cycles, Pending, callback quests, live bureau queries, real customer data, dynamically changing macro conditions, spouse/guarantor underwriting, additional collateral classes/multiple pledged assets, relationship/reputation scores, probabilistic defaults, numerical risk scoring, multiplayer and monetization systems. Narrative purpose contradictions are modeled; a general missing-document collection game is not.

The GDD is author-side. Correct decisions, internal case mapping and teaching traps in this document must not be copied into the pre-submit player experience.

## 3. Platform and game-engine decision

### 3.1 Recommended engine

**Proposed selection: Phaser 4 for the office, with a separate semantic HTML/CSS work interface.** Use the currently verified **v4.2.1** as the candidate for the later technical spike; lock the tested dependency version during implementation. The official release index lists that version on 9 July 2026. This recommendation assumes the browser-first platform above. [Official Phaser releases](https://phaser.io/download/phaser4)

The decisive requirement is readable, editable evidence work: long documents, Vietnamese names, search forms, optional numeric working, focus restoration and a structured report. The illustrated room needs fixed views and hotspots, rather than a large 3D simulation. Keeping credit rules and learner state outside the renderer also preserves straightforward automated testing. These are project-specific engineering judgments, not a claim that one engine is universally superior.

| Candidate | Fit and tradeoff | Decision |
|---|---|---|
| **Phaser + HTML/DOM** | Direct browser delivery; a separate native reading/form layer suits this source-heavy game. Requires deliberate scene/DOM focus and state coordination | Select for the proposed browser scope |
| **Godot** | Strong 2D scene/UI workflow and direct native desktop route. Native screen-reader support exists; web export has separate renderer/accessibility constraints | Preferred alternative if native PC/Steam is the primary target |
| **Unity** | Can deliver 2D, native and web games; adds editor/UI/build work beyond the current scope. Existing team expertise could change the tradeoff | Reserve for an established Unity team or broader roadmap |
| **Unreal** | Can implement a native game, but its major rendering/world features do not address the main evidence-reading and rule-correctness risks here | Do not select for this scope |

Phaser and Godot use MIT licensing with notice obligations. Unity and Unreal use their own commercial terms; adopting them would require checking the applicable license at that time. No purchase, subscription or engine installation is authorized by this document. [Phaser license](https://phaser.io/download/license), [Godot license](https://godotengine.org/license/), [Unity licensing](https://unity.com/products/pricing-updates), [Unreal licensing](https://www.unrealengine.com/license)

Godot's current desktop accessibility guidance includes AccessKit, while its platform capability list does not equate web text-to-speech with native screen-reader integration. Its web export requires its documented web rendering route, and current Godot 4 C# projects cannot export to web. Unity also specifies browser/WebAssembly/WebGL requirements for its web builds. These are compatibility facts to validate, not reasons to dismiss either engine categorically. [Godot UI guidance](https://docs.godotengine.org/en/stable/tutorials/ui/creating_applications.html), [Godot platform capabilities](https://docs.godotengine.org/en/stable/classes/class_displayserver.html#class-displayserver-constant-feature-accessibility-screen-reader), [Godot web export](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html), [Unity browser requirements](https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-browsercompatibility.html)

### 3.2 Rendering and distribution boundary

Use one office canvas and a separate application-owned HTML work layer. Do not place dense dossiers inside a scrolling game camera or assume canvas text provides a semantic reading interface. The selected Phaser source documents DOM/display-list constraints. [Phaser v4.2.1 DOMElement](https://github.com/phaserjs/phaser/blob/v4.2.1/src/gameobjects/domelement/DOMElement.js)

The verified Phaser tag includes WebGL and Canvas renderers. Its default WebGL path requests WebGL 1 and requires extensions; AUTO selection is not a guarantee of recovery from every initialization failure. Later testing must cover the actual dependency build, GPU/browser requirements, missing extensions, context loss and any intentionally supported Canvas/degraded mode. No renderer compatibility or performance result is claimed now. [Tagged renderer selection](https://github.com/phaserjs/phaser/blob/v4.2.1/src/core/CreateRenderer.js), [tagged WebGL renderer](https://github.com/phaserjs/phaser/blob/v4.2.1/src/renderer/webgl/WebGLRenderer.js)

Native desktop packaging for Phaser is additional work, rather than a native engine export. A later Electron/Steam path requires separate packaging, integration and distribution validation. If native PC is selected before development, reassess with Godot before producing engine-dependent assets. [Official Phaser desktop case study](https://www.phaser.io/news/2026/04/desktop-heroes-phaser-electron-steam)

### 3.3 Engine acceptance spike - after approval

Prove four placeholder views, desk/terminal task opening, keyboard/Menu access, long document reading at 130% text size, one 168-record search, raw-draft save/reload and one locked report. Check target browsers, actual renderer/failure paths and an independent numerical test. This spike starts after approval; it is not built in this documentation task.

## 4. Core loops, progression and completion

**Moment-to-moment loop:** inspect a source → compare identity or figures → note a hypothesis → consult a public rule → revise working.

**Case loop:** read dossier → Warehouse/Check CIC → assess → choose a provisional decision → complete its required input → Save and continue.

**Round loop:** process KHCN-01 through 08 → review reached cases → confirm submission → read the one Summary → reopen the read-only report or start a new attempt.

| State | What advances it | What does not advance or grade it |
|---|---|---|
| First case | New Game and round briefing | Looking around or opening Help |
| Next case | Current decision and required payload structurally complete; Save and continue | Correctness, pin identity, worksheet completion or a visit counter |
| Review | Reopen any reached case | Cannot reveal future loan dossiers or answers |
| Submit readiness | All eight reached; one decision each; valid required payloads | Blank worksheet, no pin and unvisited CIC do not block |
| Final report | Confirm a valid round and successfully commit its final snapshot | Cancel, duplicate activation or a failed commit produces no reveal |

Completion is a process state, not a perfect-score requirement. Wrong-but-valid work can finish the round and receive explanation. No game-over or life system is introduced. Elapsed time, inactivity and crossing a calendar day never advance cases, end a shift, submit work or affect assessment. Intermediate edits are not scored; only final choices are assessed.

Restart creates a fresh attempt and warns before replacing unsaved/current progress. The same authored dataset is not secretly randomized into new facts; replay may test understanding but is not proof of learning transfer. New scenarios/holdout learning studies would require separate authored material.

## 5. Office, controls and source context

The player starts at seated employee eye level inside a warm fictional bank office. Four perspectives share one floor plan, window direction, lighting logic and object placement. Looking around is optional for completing tasks.

| View/object | Function | Interaction contract |
|---|---|---|
| Front desk / folder / notebook | Dossier, decision and worksheet | Open a readable work view; keep current applicant context |
| Left shelf / rulebook | How Assessment Works | Generic rules/examples; never current-case answers |
| Right computer | Warehouse and source access | Shared directory plus separate Check CIC source |
| Rear board | Two-source comparison and personal notes | Learner-created working; no required connection puzzle |
| Ledger | Round overview and review | Reached cases and learner entries only |
| Menu / Help | Direct alternatives and settings | Every core function accessible without room navigation |

Mouse click or Enter/Space activates a focused object. Left/right controls change office direction; work inputs suspend room shortcuts. Back/Escape restores the previous view, customer, source and focus. No hover-only instruction, mandatory drag, pixel-hunting gate or walking obstacle is required.

UI-19 updates the older V3 placement: the office HUD may show **planned room used / room total**, with remaining/overage only under the configured policy. Show a generic opened/total count, not future portraits/names. Macro is fixed and visible on every dossier. No correctness, risk rating or score appears in the HUD.

## 6. Evidence-reading systems

### 6.1 Dossiers and Check CIC

All source content is authored and read-only. Tabs retain their reading positions; every case-bound screen retains customer identity. Proposed tabs follow UI-19: Profile, Loan, Declared income/obligations, Credit record, Purpose, Reserves, secured Collateral and Environment.

Loan shows type, rate, requested principal/tenor, applied tenor, purpose and the precomputed Estimated Monthly Installment as a neutral quantity with units. Declared amounts are clearly distinguished from documentary evidence. Profile/household detail can be noise; the system does not visually mark which sentence is decisive.

**Proposed CIC reconciliation:** the Credit record tab provides explicit Check CIC access to A2. On access, show raw current/worst groups, inquiry windows, active monthly payments/card minimums and authored history. Hide the system-qualified aggregate monthly obligation and Character rating until Summary. This resolves contradictory wording in UI-19; it does not hide the raw payment figures needed to solve the case. Visiting CIC has no separate gate or score; the facts remain essential to assessment.

**Proposed purpose reconciliation:** show supplied narrative, contracts and factual document observations. Do not turn a hidden B-key Feasible/Not feasible or acceptance result into a pre-submit badge. Genuine documents can still contradict the stated purpose. This distinction is central to case 08.

### 6.2 Warehouse search and pins

Use **one shared 168-record pool**, preserving both source originals. Each of G1-G8 has one main and twenty noise records; four noise records per group are labelled traps in author metadata. The player does not see those categories.

| Feature | Behavior |
|---|---|
| Query | Name required; optional exact age/range and province; supplied filters combine with AND |
| Matching | Strict diacritics option and source-described one-character-per-word fuzzy option; exact token/range semantics specified and tested later |
| Order | Exact matches before fuzzy matches; stable session/record hash within tie groups; save the seed |
| Result row | Record ID, name/age/province and headline; no document preview or main/trap marker |
| Record view | Supplied document prose and amounts; no automatically totaled eligible monthly income |
| Use this record | Pins one learner-selected record to the current case; replaceable until Submit |
| No/wrong pin | Does not block a decision or add a separate penalty; explained after submission |
| Empty/failure | Neutral query recovery or Retry; never zero income or a Reject |

**Proposed directory/privacy reconciliation:** all public records remain searchable. A directory person may later become a borrower, but results expose no case association, queue membership, future loan request or correct decision. Hiding every future directory identity would require a case filter and contradict shared-pool search; this tradeoff is a review decision.

**Proposed income reconciliation:** documentary components are visible; the internal eligible monthly total is hidden until Summary. The learner selects/counts income from evidence. The phrase “Warehouse income” does not authorize showing an answer aggregate. Missing structured per-noise-record income references still require review, even though document prose is supplied.

### 6.3 Comparison and notes

Choose two sources to compare; on narrow screens, switch between them without losing positions. Personal notes are separate from worksheet fields, can cite a source and persist with the draft. Pinning a source or writing a note confirms only a learner action. No text analysis marks notes as correct, demands a connection graph or converts a personal accusation into a system conclusion.

## 7. Five-C reference assessment

The reference engine uses the authored applicant/main record and true obligations, not the pinned lookalike or learner worksheet. A wrong pin changes the evidence the learner used; it does not rewrite reference truth or produce a separate identity score.

### 7.1 Products, units and calculation order

| Product | Annual rate | Maximum tenor | Maximum maturity age |
|---|---:|---:|---:|
| Unsecured | 18% | 60 months | 70 |
| Secured | 11% | 360 months | 70 |

Amounts are VND, monthly payments/income are VND per month, tenor is months and worksheet percentages use 70 for 70%. Internal ratios use 0.70. Rates/thresholds are supplied simulation parameters, not universal bank regulations.

1. Determine product, applied tenor `n = min(requested months, product cap, (70 - age) × 12)` and monthly rate `r = annual rate /12`.
2. Compute annuity factor `[1 - (1+r)^(-n)] /r` and requested EMI `P /factor`; supply the EMI to the player.
3. Evaluate Character; Block produces reference Reject and stops.
4. Evaluate purpose; Not feasible produces reference Reject and stops.
5. For Secured, evaluate ownership/valuation/transferability acceptance; failure rejects and stops.
6. Evaluate `DTI = (existing obligations + requested EMI) /verified income`; >80% rejects, >70% through 80% reduces, <=70% continues.
7. For Reduce, calculate reference installment `0.70 × income - obligations` and reference principal through PV. Assess secured coverage on requested or correctly reduced reference principal.
8. Evaluate Capital/environment on the explicitly approved basis, apply headline precedence and retain secondary requirements.

Age shortens the tenor and changes the installment; it never directly discounts principal. The player does not hand-compute an annuity. Invalid/nonpositive reference income or tenor is a content error, not a fictional Reject or a learner mistake.

### 7.2 Exact classifications

| Check | Predicate | Result |
|---|---|---|
| Character Block | Current CIC >=2 OR Forgery signs | Reject, regardless of income |
| Character Watch | No Block AND ((current group 1 AND worst-in-12-months >=2) OR last-month inquiries >=3) | Covenant requirement when no higher trigger |
| Character Clear | No Block/Watch predicate | No Character restriction |
| Purpose | Documents support stated purpose and amount | Feasible; contradiction/non-support is Not feasible and rejects |
| Acceptance | Secured property legally owned/consented, undisputed, transferable; supplied appraisal present | Accepted; failure rejects before coverage |
| Capacity | DTI <=70%; 70% < DTI <=80%; DTI >80% | Capacity zones; exactly 80% is Reduce |
| Collateral | Net = appraisal - senior claims; LTV = assessed principal /net | Accepted net >0 and LTV <=70% is Clear; >70% or net <=0 is Shortfall; Unsecured N/A |
| Capital | Eligible liquid assets /monthly debt service | <3 months Watch; exactly 3 or higher Clear |
| Conditions | Main income industry Unfavorable OR round macro Stressed | Adverse; otherwise Normal |

Use the main income industry's outlook, not an adverse secondary source. Exclude pledged assets, borrowed funds and real estate from liquid reserves under the supplied rules. Current and historical CIC are distinct; an event 14/15 months ago cannot become a 12-month Watch. Income mismatch alone is not forgery. Watch/Adverse never moves the DTI thresholds.

Secured collateral models **one real-estate asset only**. Cars, other collateral classes and several pledged assets per loan are outside this delivery; do not import the archived car-collateral baseline.

### 7.3 Headline precedence and secondary requirements

| Priority | Headline | When applicable |
|---|---|---|
| 1 | Reject | Any earlier Block/purpose/acceptance rejection, or DTI >80% |
| 2 | Reduce limit | 70% < DTI <=80%, without Reject |
| 3 | Require more collateral | Secured, DTI <=70%, acceptance passed and coverage Shortfall |
| 4 | Add conditions | DTI <=70%, coverage Clear/N/A, and Character Watch, Capital Watch or Conditions Adverse |
| 5 | Approve | No higher trigger |

One headline does not mean deleting other warnings. Under Reduce, collateral uses the correct reduced reference amount and applicable covenants remain secondary. Under Require more collateral, Watch/Adverse covenants remain secondary. Learner-entry PV can be explained separately as a consequence of that offered amount.

Early stop is an internal reference/report state. It must not automatically choose Reject, remove later sources or skip the learner forward before Submit. Report statuses distinguish Assessed, Not applicable, Not assessed after early Reject and Content error. A labelled educational counterfactual is separate from an executed check.

### 7.4 Evidence eligibility and numerical precision

Eligible income must belong to the borrower and follow reviewed source stability/tax rules. Stated income, spouse money, relative support, grants, claims, vacant rent, deposits and unsigned campaigns are not automatically countable. Quarterly amounts require monthly conversion. A 12-month average does not by itself establish eligibility: Tuấn's campaign income is explicitly excluded in the case key.

Existing obligations use active monthly payments and credit-card minimums; exclude closed debts, card limits/balances and the new request. Household bills, living costs and hobbies are narrative context, not hidden debt multipliers. Occupation/tenure is not a formula factor; this does not remove authored income-stream stability tests.

Retain unrounded calculation values for assessment; formatting is separate. Check exact thresholds and finite/safe values. Preserve raw learner text and define its number grammar. Do not change the classifier with a broad epsilon, turn blanks into zero, clamp negative collateral, or invent rounding to conceal source inconsistency. Capital-after-Reduce and rental-tax treatment remain open in Section 16.

## 8. Worksheet, decisions and payload validation

The worksheet is learner-owned, optional and unscored. It does not edit source facts or control the correct answer.

| Field | Input | Availability |
|---|---|---|
| Character | Clear / Watch / Block | Blank initially |
| Purpose | Feasible / Not feasible | Blank initially |
| Acceptance | Accepted / Not accepted | Secured only |
| DTI | Numeric percent | 70 means 70% |
| Net collateral | Numeric VND | Secured only |
| LTV | Numeric percent | Secured only |
| Collateral | Clear / Shortfall | Secured only |
| Reserve cover | Numeric months | Blank initially |
| Capital | Clear / Watch | Blank initially |
| Conditions | Normal / Adverse | Blank initially |

Numeric worksheet entries permit blank or a valid number >=0 under the supplied plan; negative-net conflict is not silently repaired. Blank becomes Not answered, while omitted Unsecured collateral is Not applicable. Nonempty invalid text offers correction or clearing. Proposed handling of that text at Submit remains a review decision; it cannot make completion of blank optional fields mandatory.

Five equally emphasized decision choices start unselected. Wrong-but-structurally-valid choices remain allowed. Changing category clears the old category's numeric text/covenants; Reduce → Approve → Reduce starts empty. Worksheet and notes survive. Navigating/reloading under the same category preserves its raw payload.

| Category | Required payload | Before-Submit rule |
|---|---|---|
| Approve | None | One selected category |
| Reduce limit | Proposed Max installment, VND/month | Finite number >0 and <= original displayed EMI |
| Require more collateral | Additional collateral, VND | Finite number >0 and <= loan amount /0.70 |
| Add conditions | At least one covenant | Permitted checkbox selection |
| Reject | None | One selected category |

For Reduce, convert the learner's installment into **Proposed loan amount** through PV using the same rate/tenor. Do not label it Correct maximum. For collateral, compare against the system cure rounded **up** to the nearest 1,000,000 VND after submission; never replace the learner's raw entry. Show the alternative `0.70 × net collateral` reference later.

Covenants are use-of-funds documents, periodic collateral re-appraisal (Secured only), and periodic occupation/income update. Suitability is explained but unscored. No covenant changes principal or DTI. Lower-priority requirements do not create additional mandatory learner payloads under another headline.

Exact validation copy includes Choose a decision to continue; Please enter a valid number; Installment must be greater than 0; the original-estimate cap message; Additional collateral must be greater than 0; the whole-loan collateral cap message; Select at least one condition; and Complete all dossiers before submitting. Full strings remain in UI-19 and the [Core User Flow](../docs/02_Core_User_Flow.pdf). Validation checks shape/range, never answer correctness.

## 9. Room, submission and final consequences

### 9.1 Planned allocation and round economy

Room is the shared lending-allocation constraint/context, not a currency spent on upgrades or a live score. The extended fixture proposes **4,590,000,000 VND**; its authored rounded correct portfolio uses **4,533,399,000 VND**. Neither number defines a complete general runtime policy.

| Current learner choice | Proposed planned-allocation basis |
|---|---|
| Approve | Requested principal |
| Reduce | PV of the learner's valid installment |
| Require more collateral | Requested principal, explicitly conditional on collateral cure |
| Add conditions | Requested principal, explicitly conditional on covenants |
| Reject | Zero |
| Missing/invalid required payload | Incomplete allocation, not a complete zero offer |

Recompute from current choices instead of accumulating every edit. HUD/ledger may show Room total, Room used (planned) and Remaining/Over by once the policy is configured. Unsupported totals are omitted. Conditional allocation, precision/rounding and over-budget behavior remain proposed. The source readiness rule does not supply a hard room gate; the recommended review option is a visible overage without a new Submit block unless a gate is expressly approved.

Whole-VND displayed-EMI rounding can produce a PV fractionally above requested principal at the input cap. A general rounding convention must settle this; no hidden correctness-based clamp or old 1.6bn gate is inherited.

### 9.2 Review and one final submission

The ledger shows reached case identity, learner category, structural readiness and supported allocation. Ready means complete input, not correct. Reopening revisits read-only evidence and edits learner state; it does not alter authored evidence.

Submit requires every case's category and valid required payload. It does not require a complete worksheet, correct pin, correct calculation, source-visit count or any minimum/maximum elapsed time. There is no automatic Submit. Confirmation is **“Submit round? Decisions cannot be changed after this.”**, with Keep editing / Submit round. Cancel returns to the same draft.

On confirm, revalidate the current revision, freeze the inputs, construct one final snapshot and commit before reveal. Lock decisions, payloads, worksheet, pins and notes consistently. Prevent double activation. Failed commitment exposes no partial result; a later report-render error keeps the committed round locked and retryable. Repeated report opening never debits room again.

### 9.3 Summary Consequence Card

One round report replaces immediate per-dossier Cards. Select each case's branch from the learner's final category; the 40 authored branches are content choices within that one report.

| Component | Player-facing result |
|---|---|
| Result | Correct versus final learner category; supported portfolio/room results |
| Reason | Applicable verified income/debt components, terms/EMI, system calculations, ratings, binding trigger, selected record and secondary requirements |
| Meaning | Authored simulated case/portfolio consequences; qualitative explanation without invented risk probability |
| Action | Read/expand details, reopen the finalized report or start a fresh attempt |
| Limit | Classification under supplied project rules; no lending recommendation or undefined scorecard |

Reduce compares entered monthly installment against its reference within inclusive +/-5%; collateral compares entered additional amount against the upward-rounded reference within +/-5%. Derived PV is shown without inventing a second independent numerical penalty. A wrong category remains wrong regardless of a coincidentally similar number. Worksheet/covenant comparisons are feedback only.

Keep Entered, Not answered, Not applicable, Not assessed, Within/outside tolerance and Content error distinct. Case 02/08 downstream checks cannot be fabricated as Clear. Explain no/wrong pins without an extra penalty. Do not infer a likely misreading as a proven mental process unless the player's working supports it.

## 10. Authored content, narrative and difficulty

The active set is one full round of eight borrowers. The role is consistent bank work, not a branching personal-life story. Preserve names, age/province anchors, requests and evidence; do not invent dialogue that changes financial truth or portrait signals that indicate creditworthiness.

| Case | Applicant / request | Authored headline | Primary teaching problem |
|---|---|---|---|
| 01 | Trần Phương Anh, 35; Unsecured 500M /60 months | Approve; DTI 63.05% | Own verified salary, family-income noise and inquiry window |
| 02 | Đỗ Văn Kiên, 41; Secured 700M /180 | Reject; DTI 89.52% | True active obligations and non-borrower spouse income; downstream stop |
| 03 | Trịnh Thị Hạnh, 44; Unsecured 500M /60 | Add conditions; DTI 66.91% | Multiple payroll lines, card minimum, current versus historical CIC |
| 04 | Nguyễn Văn Thịnh, 66; Secured 450M /requested 120, applied 48 | Reduce + Capital covenants | Age cap, quarterly rent/stability and 9.9M reference installment; tax conflict remains open |
| 05 | Vũ Minh Tuấn, 39; Secured 680M /240 | Reduce + Character covenants | Unstable campaigns, closed card and 6.3M reference installment |
| 06 | Lê Minh Quân, 38; Secured 1,540M /240 | Approve; DTI 67.99%, LTV 70% | Income components, reserve eligibility, old history and main-industry selection |
| 07 | Đinh Quốc Bảo, 41; Secured 1,000M /240 | Require more collateral + covenants | Senior claims, inquiry/industry warnings; rounded cure 169M |
| 08 | Phạm Gia Hưng, 36; Unsecured 450M /60 | Reject at purpose | Genuine documents and matching sums can support the wrong purpose |

This table is author-side and records authored targets, not final certification after new evidence conflicts. Case 04/05 reference principal is approximately 383,045,000 /610,354,000; case 07 alternative loan is 882,000,000. Existing independent arithmetic matches the eight rounded PMTs and these numeric references when using the existing authored inputs. It does not settle tax eligibility or all feedback prose.

The matrix has 19 main flags and five GAME flags. Its difficulty values `5, 4, 12, 12, 9, 14, 7, 6` measure authored density, not points or actual true-risk booleans. Do not reorder cases or generate live warnings from stars. Preserve the pedagogical variation in the authored order; evaluate whether delayed feedback creates fatigue during playtests.

Content inventory is eight A narratives, eight explicit A2 CIC sources, secured property sheets where applicable, eight main mappings, 160 noise records, internal B/C references and forty D branches. Main mapping is supplied in the [Warehouse integration notes](../input-materials/2026-10-16_group10_warehouse-dossiers/INTEGRATION_NOTES.md). No new case count or procedural borrower generator is introduced.

## 11. Interface, onboarding and accessibility

**User copy direction:** omit decorative quotes, inspirational mottos, slogans, opening taglines and rotating filler throughout UI, loading screens and environmental artwork. Use copy for actions, state, essential instructions and authored evidence. Borrower quotations that carry supplied case evidence remain intact. Functional rules such as the untimed shift belong in the guide/briefing rather than repeated decorative footers.

| Work state | Essential content/actions |
|---|---|
| Interior title / Continue | New Game, Continue, guide and settings; preserve submitted saves |
| Office / HUD | Four views, task objects, direct Menu routes, generic progress and configured planned room |
| Dossier/source | Customer identity, raw tabs, Warehouse/CIC, worksheet, comparison, decision and review |
| Warehouse | Query, rank-neutral results, document view and reversible pin |
| Worksheet/decision | Learner fields, five equal choices, active payload and structural errors |
| Review/confirmation | Reached cases, completeness, supported allocation, Keep editing / Submit |
| Summary | One report, expandable cases, comparisons, explanations and read-only revisit |

Onboarding introduces the office/direct shortcuts, declared-versus-verified evidence, input ownership, five-choice precedence and delayed reveal. Show generic examples, not an answer walkthrough of case 01. Help is always reachable and does not erase work. Public formulas explain EMI/PV without demanding a manual annuity calculation.

Define Stated income, Verified income, Existing obligations, Estimated Monthly Installment, Adjusted tenor, DTI, Net collateral value, LTV, Reserve cover, Provisional decision and Summary on first use. Wording says “This file is classified as…” and “Your decision produces…”, not “you should lend”.

UI-19 specifies Noto Sans for body/names/numbers and Patrick Hand for short journal titles; verify Vietnamese glyph coverage and use a readable fallback where needed. Target reading text is 20/32 px on wide desktop and 18/30 px compact, 55-68 characters per line, with enlargement to 130%. Reflow rather than shrink a whole paper image.

Use 8/12/16/24/32/48 px spacing, 48-52 px primary controls and at least 44 px secondary targets. Wide views may show source/worksheet together; narrow mode uses persistent tabs and retained positions. Financial units and full values stay visible. Never use color alone for readiness or post-submit comparison.

Keyboard covers all tasks. Focus is visible, contained in dialogs and restored on close. Native field labels/errors are associated correctly; room shortcuts cannot fire while typing. Reduced motion removes travel but preserves state changes. Proposed screen-reader support must be tested through the complete work path; engine selection alone does not guarantee it.

## 12. Visual and audio production brief - after approval

This section records supplied direction and future deliverables. It is not a new visual design, approved style frame or asset-production instruction to execute now.

Roottrees reference material informs in-room evidence inspection, computer research and task switching. The supplied Our Town images inform illustrated depth, ink contours, paper edges, expressive portraits and journal tabs. Create original bank-specific environments/forms; do not copy reference characters, exact compositions or a presumed source-game engine.

| Future asset group | Planned content | Review criterion |
|---|---|---|
| Office | Four perspectives with reusable layers and stable geometry/light | Reads as one room; useful object recognition |
| Close-ups | Desk, terminal and comparison board | Retains visual/contextual connection to office |
| Paper/interface frames | Folder, source, notebook, decision, ledger and report templates | Live text remains legible; texture avoids reading fields |
| Portraits | Eight borrower identities; optional staff only if authored | Distinct identity, no moral/risk cues or invented dialogue facts |
| Icons/fonts | Consistent symbols, licensed fonts and visible labels | Vietnamese support, accessibility and scale |
| Audio/motion | Ambient office layer, restrained task sounds and short transitions | No answer cues; mute/reduced-motion alternatives |

Warm used-office materials, brown outlines, cream paper and flat reading areas follow UI-19. Short view fades target 220-350 ms. Neutral Saved feedback acknowledges persistence; a final stamp occurs only after successful round lock. Do not play correctness-themed success/failure sounds during drafting.

Optional ambience/music should support concentration, have separate volume/mute controls and require no audio-only evidence. Full voice acting is outside core scope. Record source rights/licenses, export dimensions, anchor/hit regions and text-safe areas in the later asset manifest. Asset counts are planned compositions, not claimed files already produced.

After GDD/engine approval and the feasibility proof, the first graphics review should cover office, dossier/worksheet and Warehouse/decision/report style frames, then one borrower treatment. Scale to the full asset set only after these work with long text, enlargement and keyboard focus. This review order is a proposal; no graphics have been generated now.

## 13. Application state, persistence and content architecture

Keep presentation, application commands, pure financial rules, structured content and persistence independent. Phaser handles scene presentation; HTML handles reading/forms; neither defines a second credit engine. The existing [Technical Route](../docs/04_Technical_Route.pdf) remains the detailed implementation reference, with UI-19/GDD reconciliations applied explicitly.

| State | Stored or derived information |
|---|---|
| Versioned round | Attempt ID, dataset/content/policy/schema IDs, fixed macro, reached prefix, phase and revision |
| Learner case | Raw worksheet, decision, active payload, pin, source access and notes |
| Navigation | Current work/view, source/tab/scroll, compared sources and return focus |
| Draft projection | Derived readiness, player-entry PV and supported planned allocation; no answer key |
| Final snapshot | Frozen final inputs, assessed trace/comparisons, selected branches and supported portfolio results |

Use a new proposed save namespace, `the-credit-desk:rebuild:v1`. Bind it to exact content/policy versions. Preserve raw text under the same category, but never resurrect a deliberately cleared old payload. Do not reinterpret archived V4/V3 cases, overwrite legacy saves or migrate them silently.

No shift deadline, remaining-time counter or time-based expiry may govern progression, submission or assessment. Reloading, closing the game or returning on another day resumes the same untimed attempt from compatible saved progress; it does not consume time or automatically finish the round. Existing save-failure and recovery handling still applies.

Restore schema/enums/ranges, record/case IDs, reached order and content compatibility; reconstruct derived readiness/PV/room through the same modules. A saved phase or total is not trusted alone. Corrupt/incompatible saves offer recovery or a separately chosen new attempt. localStorage is origin-specific, may fail and does not provide cross-device saves. [Browser storage behavior](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

| Failure | Required behavior |
|---|---|
| Source/record not available | Retry and preserve work; do not invent evidence |
| Save write fails | Keep current text in memory, show unsaved status and offer recovery |
| Stale tab | Detect newer progress and avoid overwrite; follow a tested single-writer strategy |
| Submit write fails | Remain draft with no partial lock/reveal |
| Report render fails after commit | Stay locked; retry the same final snapshot |
| Bad reference data | Flag content error; no learner penalty or fabricated credit rating |
| Renderer/asset failure | Proposed direct HTML task route/degraded room; verify before promising support |

Static author data remains technically inspectable. A protected assessment, accounts, centralized analytics or synchronized progress needs a separate server design. No telemetry or live bank integration is added here. Future desktop packaging and Steam release are separate from the static-browser build.

The content pipeline preserves originals, transcribes reviewed records, validates source/provenance and counts, separates public evidence from author references, checks financial interpretations and versions the resulting package. Missing numeric noise-record references are not filled by guessing from prose. An asset/text change that affects eligibility or answers is a content-policy change, not a cosmetic edit.

## 14. Production process adapted from public industry practice

The following references are public descriptions, not access to proprietary publisher workflows. Their useful practices are adapted to this small project; milestone names and pass criteria below are ours.

| Official reference | Supported practice | Adaptation |
|---|---|---|
| Riot, Prototype: Building a Game's Substance, 18 June 2020 | Define audience, prove risky gameplay through representative prototypes and playtests before scaling | Test whether identity search, manual reasoning and delayed feedback are understandable and engaging before multiplying assets |
| Ubisoft, Creative Process | Maintain a project mandate; evaluate tools in preproduction; develop First Playable, Alpha, Beta and Master stages | Keep one reviewed GDD/decision log and explicit playable/content/polish gates |
| Valve, GDC 2009 playtesting presentation | Treat design assumptions as hypotheses; observational playtesting differs from bug testing | Separate experience/comprehension tests from numerical, state and content QA |
| Steamworks review documentation | Store presence and build have release-review requirements | Apply only if Steam distribution is later chosen; financial/learning validation remains the team's work |

Sources: [Riot prototype process](https://www.riotgames.com/en/r-and-d-office/prototype-building-a-games-substance), [Ubisoft creative process](https://www.ubisoft.com/en-us/company/how-we-make-games/creative-process), [Valve playtesting presentation](https://cdn.akamai.steamstatic.com/apps/valve/2009/GDC2009_ValvesApproachToPlaytesting.pdf), [Steamworks review process](https://partner.steamgames.com/doc/store/review_process). Checked 17 October 2026. Valve acts as a developer in the playtesting source and as a distribution-platform operator in Steamworks; platform review does not certify banking rules or education outcomes.

| Gate | Reviewable deliverable | Exit condition |
|---|---|---|
| **G0 - GDD/engine approval** | This GDD, engine comparison and approval decisions | User approves direction/platform/engine; graphics production remains paused until then |
| **G1 - Feasibility / first playable** | Disposable one-case prototype using placeholders, data checks and independent rules | Reading, search, provisional input, focus, persistence and final lock proven; renderer assumptions measured |
| **G2 - Representative slice** | Office-to-report journey with cases 01/03/05/07/08, all five learner choices and draft recovery | Each correct headline is exercised, including Reduce PV/reference comparison and secondary requirements; no answer leaks; approved visual sample validated |
| **G3 - Content complete / Alpha** | All eight cases, one 168-record pool, forty branches and full-round saves/report | Complete and resumable journey; financial content decisions resolved for affected cases |
| **G4 - Beta** | Polished candidate with playtest, accessibility, performance and regression evidence | Critical defects resolved; supported configurations verified; no unapproved mechanic/score added |
| **G5 - Release candidate / approval** | Versioned build, final audit, known limits and reviewed distribution package | User accepts candidate; platform requirements satisfied where applicable |

G2 deliberately covers multiple mechanisms without relying on unresolved case-04 tax treatment. Case 05 requires its relevant eligibility and reserve-basis interpretation to be reviewed; if that is not ready, use a separately reviewed synthetic Reduce fixture for the technical proof and mark the production-case reference as uncertified. It does not introduce a new production round or change the authored final order. Prototype fixtures remain separate from approved learner content.

After G0 approval, complete the G1 placeholder feasibility proof, then begin the graphics brief and small style sample. Approve that sample before G2 and full asset production; validate it inside the work interfaces before declaring the slice representative. A completed illustration is not proof of the core loop, and passing rule tests is not proof players enjoy the game.

**Workstream outputs:** design owns flow/wording and decision records; credit/content owns eligibility, facts and correct explanations; engineering owns contracts/state/builds; art/audio owns reviewed assets; QA/research owns evidence. These are proposed responsibilities, not a claim about individual contribution or a required AAA staffing model.

No fixed release date or invented production budget is promised. Estimate after platform, data reconciliation, feasibility and asset samples are known. Changes require recording the affected player behavior, source/policy version, scope/cost and acceptance test before updating the GDD. Preserve decisions and originals rather than overwriting history.

## 15. Playtesting, QA and completion evidence

### 15.1 Design questions

Proposed formative sessions begin with 5-8 representative novice users and a separate content-expert review. This sample is for discovering usability problems, not statistical proof of educational effectiveness. Observe before helping; record intervention and think-aloud effects separately.

| Hypothesis | Observation / measure | Proposed review target |
|---|---|---|
| The office supports work | Find dossier, Warehouse, CIC, review and Back without spatial assistance | Each core task completed through an accessible route; any blocker triggers revision |
| Identity matching is understandable | Search changes, examined records, pin changes and explanation of identity anchors | Users can distinguish matching identity from counting income |
| Manual reasoning is fair | Whether necessary figures can be located; which source gaps cause guessing | No failure caused by inaccessible/missing essential evidence |
| Delayed feedback is understood | When users expect grading and whether review is used | Users know drafts remain revisable and Summary arrives only after round confirmation |
| Reading load is sustainable | Reading fatigue, abandonment and use of breaks | Improve readability and break/resume support; no shift-duration target, timer or speed penalty |
| Summary teaches a rule | User explains one discrepancy using evidence after the report | Qualitative explanation, not unsupported learning-effect claims |

These are proposed evaluation questions/targets, not metrics already achieved. Broader effectiveness claims require an appropriate study beyond this usability sample. Do not score users for declining optional worksheet/notes.

### 15.2 Correctness and release QA

| Layer | Mandatory coverage |
|---|---|
| Receipt/content | Nineteen unchanged originals; correct dataset pair; eight case/main joins; one 168-record pool; forty mapped branches |
| Domain | Independent PMT/PV; exact 70%/80%, LTV 70% and reserve 3-month boundaries; current/history windows, main industry and senior claims |
| Rules | All five headlines, priority overrides, secondary requirements, early stops and no moral/personality factors |
| Inputs | Blank/zero/negative/malformed/nonfinite; raw grammar; allowed caps; wrong-but-valid submission; +/-5% endpoints and collateral round-up |
| Search | Unicode/diacritics, fuzzy/range/AND rules, rank/seed restoration, wrong/no pins and no author/queue metadata |
| State/save | Sequential access, reached review, clearing on category switch, same-category reload, stale/corrupt saves, cancel/confirm, idempotence and failed writes |
| Visibility | No reference aggregates/results/answer cues before Submit in visible or accessibility output |
| Browser/accessibility | Complete eight-case keyboard path, focus/typing isolation, text enlargement, long prose, reduced motion, narrow layouts and error recovery |
| Build/distribution | Fresh reproducible output, correct asset paths/fonts/licenses, reviewed candidate and explicit release action |

Test 1920×1080, 1366×768, 1280×720 and narrow reading reflow. The target desktop browser matrix is proposed as current stable Chrome/Edge, Firefox and Safari on agreed Windows/macOS machines; record exact versions/GPU at execution. An untested browser, touch layout, screen reader or renderer mode is not advertised as supported.

Proposed performance budgets are a stable 60-fps target for simple office motion on the agreed reference machine, responsive typing/scrolling and search feedback within 200 ms for the local pool. Measure and revise budgets after G1; report cold-load/network conditions separately. None is a measured guarantee today. Asset memory/bundle budgets are set from that prototype, not invented now.

Log evidence against code revision, content/policy/schema IDs, environment, scenario and result. Synthetic boundary fixtures do not become new fictional applicants. Historical app tests and document arithmetic checks do not verify a rebuilt runtime. Release blockers include data loss, wrong reference classification, early answer leakage, inability to complete a supported input path and unresolved financial evidence used by a shipped case.

## 16. Open decisions and material risks

The GDD can be reviewed in full while source discrepancies remain visible. A proposal is not adopted merely because it appears below. Complete descriptions remain in the source issue registers linked in Section 18.

| ID / topic | Proposed handling or decision needed | Required before |
|---|---|---|
| **D01 Platform/engine** | Approve browser + Phaser/HTML; choose Godot instead if native PC is primary | Engine-dependent prototype and graphics |
| **D02 UI visibility - U19-02/03/04** | Visible raw income/CIC components and purpose evidence; hidden system aggregates/derived verdicts | Core interface prototype |
| **D03 Shared directory - U19-05** | Full public pool, no future case association/loan preview; acknowledge directory identity tradeoff | Search prototype |
| **D04 Room - I02** | Review 4.59bn and conditional allocation; recommended no new over-budget Submit gate; define rounding | Complete room/report feature |
| **D05 Rental tax - W03** | Resolve case-04 eligible rental stream and annual tax allocation against its 32M key | Certifying affected case and final reference portfolio |
| **D06 Stability - W04/I06** | Reconcile general variable/rental/securities rules with authored exclusions | Approved evidence derivation and new content |
| **D07 Capital - I04/D05** | Define original versus reduced debt-service basis and final explanation | Certifying affected reserve comparisons |
| **D08 Negative net - I03** | Resolve worksheet range and collateral cure cap together; exclude new affected cases until settled | Any negative-net learner case |
| **D09 Invalid optional text - I11** | Recommended correction or clearing of malformed nonempty fields; blanks always allowed | Submit guard |
| **D10 Unsecured collateral choice - I09** | Proposed five equally available learner choices; secured-only controls/covenant remain limited | Decision interaction |
| **D11 Scorecard - I01** | Omit undefined aggregate accuracy/risk/efficiency scores; worksheet/covenants unscored | Any numerical scorecard promise |
| **D12 Copy/provenance - D07/I07/I08/I14** | Correct case-07 trap explanation with approval; use project-rule labels and accurate citations | Semantic content sign-off |

UI-19's 105/unavailable Warehouse statement is a factual stale item, corrected by verified 168-row receipts. Its repeated 1.9 heading and scored-for-comparison phrase are editorial issues; originals remain unchanged. Active-case early stops are supplied; undefined P-1/P-2 labels do not justify inventing policy. Matrix flags never replace rule facts.

| Production risk | Mitigation |
|---|---|
| Art scale-up before proof | G0 approval, G1 feasibility and small G2 visual sample before full asset production |
| Reading feels like a static exam | Meaningful source comparison, identity ambiguity and explanatory consequences; playtest the loop before adding features |
| No-feedback phase feels too long | Clear briefing, saved breaks and review; measure fatigue without silently adding per-case grading |
| Source conflict changes correct answers | Content/policy review and versioned golden fixtures; no quiet key edits |
| Engine/platform choice creates rework | Explicit browser assumption and early renderer/reading spike; revisit native engine before assets if needed |
| Hidden answer cues | Separate projections and pre-submit semantic/visual/audio inspection |
| Scope creep | Eight-case core mandate and recorded change impact; no automatic day/relationship/live-service roadmap |

## 17. Approval and acceptance contract

The first approval is concrete: the concept, eight-case core scope, browser/engine choice, evidence/visibility proposals and staged production route. It releases the next planned phase; it does not automatically settle every financial-source issue or authorize publication.

| Acceptance area | Required outcome |
|---|---|
| Player experience | Evidence-led bank work, optional spatial navigation and learnable disclosed rules |
| Scope/content | Eight active dossiers, five choices, one 168-record pool and forty final consequence branches |
| Financial accuracy | Approved inputs, ordered five-C assessment, correct thresholds/secondary requirements and honest unresolved limits |
| Learner agency | Optional unscored working, reversible pins/drafts, clear payload switching and reached-case review |
| Untimed shift | Unlimited reading/review; inactivity or a later-day resume cannot end or submit a shift or affect assessment; completion requires explicit confirmed Submit |
| Feedback boundary | One confirmed round report; no early derived answers or cues |
| Reliability | Compatible raw-state restoration, coherent final lock and no duplicate commitment |
| Usability | Long prose and VND values readable, keyboard/resize/reduced-motion paths tested |
| Production | Reviewable prototype/slice/alpha/beta evidence; asset scale and release follow explicit gates |

Use the separate Vietnamese review decisions (historical source, archived separately) to approve or amend the proposed direction. After approval, update the GDD decision record and technical route, run G1, then begin the agreed graphics brief/sample. Until then, the deliverable is documentation and source integration only.

## 18. Source trace and verification limits

| Reference | Location / responsibility |
|---|---|
| All original inputs | [Active index](../input-materials/README.md) and receipt manifests |
| New Interface and Design | [UI-19 original/register](../input-materials/2026-10-17_group10_interface-design/README.md); [U19 reconciliation](../input-materials/2026-10-17_group10_interface-design/INTEGRATION_NOTES.md) |
| Financial requirements | [Rules register](../input-materials/2026-10-16_group10_full-product/SOURCE_REGISTER.md); [I01-I14 issues](../input-materials/2026-10-16_group10_full-product/SOURCE_ISSUES.md) |
| Active case/feedback content | [Dossier/matrix register](../input-materials/2026-10-16_group10_dossiers-matrices/SOURCE_REGISTER.md); [case integration notes](../input-materials/2026-10-16_group10_dossiers-matrices/INTEGRATION_NOTES.md) |
| Shared record pool | [Warehouse receipt](../input-materials/2026-10-16_group10_warehouse-dossiers/README.md); [W01-W07 notes](../input-materials/2026-10-16_group10_warehouse-dossiers/INTEGRATION_NOTES.md) |
| Group workflow | [Core User Flow](../docs/02_Core_User_Flow.pdf) and flow qualifications (historical source, archived separately) |
| Technical baseline | [Technical Route](../docs/04_Technical_Route.pdf), rebuild baseline (historical source, archived separately) |
| Earlier spatial/visual references | V8 (historical source, archived separately), V3 (historical source, archived separately), user art/video originals (reference sources, archived separately) |

Public engine/production claims are linked beside the relevant statements in Sections 3 and 14. Comparative fit, project gates, budgets and playtest targets are our proposals, not official publisher requirements or measured results. The current check covers source integrity/structure and existing independent arithmetic, not a new playable build, completed financial reconciliation, market validation or produced graphics.
