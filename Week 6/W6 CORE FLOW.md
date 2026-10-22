**The Credit Desk \- Core Flow (Doan Diep Anh)**  
Scope: 1C MVP (Capacity only, DTI-based) · Status: core flow frozen

### **1\. The one core flow we protect**

> Open dossier → verify identity and income in the Warehouse → check CIC → compute DTI → record a provisional decision → review the round → submit → Summary Consequence Card → allocate remaining room.

Everything else in the product is either an input to this flow or a report on it. If a feature threatens this flow, it is postponed and the reason is recorded in §9.

***Why this flow and not another*** (Week 6, “Choose the Core Flow to Protect”):

| Question | Answer |
| :---- | :---- |
| Which user goal must work by final? | For this applicant, should I lend, how much, and on what terms \- decided under a shared credit room. |
| Which input is essential for that goal? | Verified income (Warehouse), CIC-verified existing obligations, and the pre-computed Estimated Monthly Installment. |
| Which logic produces the main output? | DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Verified income, classified against the 70% / 80% lines. |
| Which output proves the product value? | The Summary Consequence Card: correct classification vs the player’s choice, with the figures and the reasoning behind each. |
| What can be removed? | Per-dossier Cards, batch preview of unopened dossiers, the other four Cs, cosmetic gamification. All postponed (§9). |

### **2\. Minimum working product**

| Must include (in the build) | Can wait (postponed) |
| :---- | :---- |
| One clear user task: lend / how much | Extra dashboard pages |
| One input set: 5 authored dossiers \+ 105 Warehouse records \+ 5 CIC records | Animation and transitions |
| One financial logic path: Product Parameters → Adjusted tenor → PMT → DTI → bands | Multiple user segments (KHDN track) |
| One meaningful output: Summary Consequence Card \+ portfolio scorecard | Accounts, saving, leaderboard |
| Basic error handling: Reduce-limit input validation, division guard, no-record-pinned guard | Secondary recommendations of any kind |

### **3\. Step-by-step core flow**

Start. Round begins. The engine loads `room_total = 2,050,000,000 VND`, the five-dossier queue (KHCN-01 → KHCN-05, delivered one at a time in order), the 105-record Warehouse pool and the CIC table. `room_used = 0`.

| \# | Screen / action | What the player does | What the system does | Visible | Hidden |
| :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | Dossier | Reads the narrative. Separates the three figures that matter (income, obligations, installment) from deliberate context noise (household spending, hobbies, a spouse’s salary, one-off windfalls). | Renders the authored prose plus the Bank system note: *estimated monthly installment for this request: X VND* and *income figures above are as declared and have not been verified.* | Name, age, occupation, stated income, self-declared obligations, CIC group badge, loan type, rate, amount, tenor, purpose, collateral, Estimated Monthly Installment | DTI, verified income, CIC-verified obligations, correct classification |
| 2 | Warehouse lookup | Opens the Warehouse. Searches by name (required), age or ±range, and province — taken from the dossier, not from any hint. Compares candidate rows and taps Use this record on the one that is the applicant. | AND-filters the 105-record pool. Exact matches first, fuzzy second, order shuffled by `hash(session, record_id)`. Returns `record_id`, profile and headline only. Pins the chosen record to the case. | Documents of the pinned record: payroll files, leases, tax declarations, pension entries | `is_main`, `verified_income`, `group_id`, `noise_type`, `is_trap` |
| 3 | Read income from documents | Decides which lines in the pinned record count: recurring third-party-confirmed receipts into the applicant’s own account. Converts non-monthly receipts to monthly. Rejects one-offs, a spouse’s income, unlet property, unsigned contracts. | Nothing — this is pure player reasoning. The Warehouse never displays a totalled income figure. | — | The authored `verified_income` for grading |
| 4 | Check CIC | Taps Check CIC. Reads active loans; takes the card minimum payment only; excludes closed accounts. | Reveals the CIC-verified list. Purely informational, re-openable, never locks anything. | Active loans with monthly amounts, group, late-payment history | — |
| 5 | Compute DTI | Calculates `DTI = (Existing obligations + Estimated Monthly Installment) ÷ Verified income` by hand, and compares to 70% / 80%. | Computes the same value independently and stores it for the Card. Does not display it. | — | System DTI |
| 6 | Decision | Taps Approve, Reduce limit or Reject. Provisional — changeable until submit. | Stores `decision[case_id]`. Recalculates `room_used`. No feedback of any kind. | Own choice, room used / room total | Correctness |
| 7a | Approve / Reject | No further input. | Approve books the full requested amount against room. Reject books nothing. | — | — |
| 7b | Reduce limit | Calculates `Max installment = 70% × Verified income − Existing obligations` by hand and types it in. | Validates (§6). On pass, converts via Present Value: `Max loan = M × [1−(1+r)⁻ⁿ] ÷ r` using the same r and n already shown. Books that amount against room. | Converted loan amount, room used | The system’s own correct ceiling |
| 8 | Next dossier | Continues. | Opens KHCN-(n+1). Unopened dossiers stay hidden — no batch preview. | — | — |
| 9 | Round overview / review | May reopen any already-opened dossier and change the decision or the entered amount. | Rebuilds `room_used` from current decisions. Clears the Reduce-limit input if the decision changes away from Reduce. Shows no ticks, marks or hints. | Opened dossiers, current decision each, room used / total | Correctness |
| 10 | Submit round | Submits once all five have a decision (and a valid amount where Reduce). Confirms. | Enables submit only on completeness. Locks every decision, input and pinned Warehouse record. | Confirmation that changes are final | — |
| 11 | Summary Consequence Card | Reads. | Runs the engine across all five dossiers and reveals everything held back since step 1\. | Full reveal (§5) | — |

### **4\. The output: Summary Consequence Card**

One Card for the whole round, shown only after submit. No Card appears after an individual dossier.

Portfolio block

* `room_used` against `room_total` (2,050,000,000 VND); the authored correct allocation is 1,993,399,000 VND, leaving ≈ 56.6M — which also absorbs the ±5% tolerance on both Reduce cases (≈ 49.7M combined).  
* Portfolio risk and the three scorecard measures: decision accuracy, portfolio risk, room efficiency.  
* Portfolio consequence, phrased as what the combination of decisions did to room and risk — never as advice.

Per-dossier block (×5), in Result → Reason → Meaning → Limit shape:

* Result — correct classification vs the player’s choice.  
* Reason — verified income, CIC obligations, Estimated Monthly Installment, adjusted tenor, the system’s DTI next to the player’s, which Warehouse record the player pinned and whether it was the applicant, and for Reduce limit the correct Max installment and Max loan with the player’s entry graded against ±5%.  
* Meaning — the authored consequence for this applicant and for the portfolio.  
* Limit — Classification, not Recommendation. Thresholds disclosed as Sourced or Assumption. Character, Capital, Collateral and Conditions out of scope.

Grading rule for a wrong pin: grading always uses the main record’s income. Pinning a lookalike is therefore judged as a wrong DTI input, not as a separate penalty. The Card reports which record was used.

---

### **5\. Three paths**

| Path | Flow |
| :---- | :---- |
| Happy | Dossier → Warehouse search returns the main record on full identity → pin → Check CIC → DTI inside ≤70% or \>80% → Approve or Reject → next → … → submit → Card. No typed input anywhere. |
| Alternative | Same up to DTI, which lands in 70–80% → Reduce limit → player types Max installment → validation passes → system converts via PV → room updates → next. Also covered: the player returns during review and switches Approve → Reduce (input field opens, empty) or Reduce → Reject (input cleared). |
| Error | Six handled cases in §6.1. All are player-input or state errors, not dossier-data errors. |

#### **6.1 Error handling**

| Trigger | Behaviour | Severity if unhandled |
| :---- | :---- | :---- |
| Reduce-limit field blank or non-numeric | Inline: “Please enter a valid number.” Focus stays on the field. | Critical |
| Entry ≤ 0 | Inline: “Installment must be greater than 0.” | Critical |
| Entry \> original Estimated Monthly Installment | Inline: “Proposed installment cannot exceed the original estimate — Reduce limit can only lower it, never raise it.” | Critical |
| Submit attempted with a dossier undecided, or Reduce with no valid amount | Submit stays disabled; the overview marks which dossiers are incomplete. | Major |
| No Warehouse record pinned when the player decides | Decision is allowed (identity work is the player’s judgment, not a gate), but the Card reports “no record used” and grades against the main record’s income. | Major |
| `verified_income` missing or ≤ 0 on the main record | Division guard fires; the case is flagged in the bug log rather than rendering NaN or ∞. | Critical |
| Warehouse search returns zero rows | Empty-state message prompting a wider search (drop age, relax diacritics). No hint that the record does or does not exist. | Minor |

### **7\. Integration audit**

Week 6 asks whether the connections work, not whether the components exist. One row per connection, one owner each. Status is left as `?` until a connection has actually been run with a sample input — “unclear” counts as untested.

| \# | Connection | Expected | Actual | Status | Owner |
| :---- | :---- | :---- | :---- | :---- | :---- |
| I-01 | Dossier data file → dossier screen | All five dossiers render prose \+ Bank system note with no missing fields | ? | ? | Minh Ha / Duc Minh |
| I-02 | Warehouse data file → search index | All 105 records load; no two share (name, age, province) | ? | ? | Minh Ha |
| I-03 | Search filters → result set | Full identity (name \+ age \+ province, strict diacritics) returns exactly the main record | ? | ? | Duc Minh |
| I-04 | “Use this record” → case state | Pinned `record_id` persists across screens and survives review | ? | ? | Duc Minh |
| I-05 | Pinned record → DTI engine | Engine reads income from the main record for grading, and reports the pinned record separately | ? | ? | Duc Minh / Ngoc Linh |
| I-06 | Check CIC → obligations display | CIC figures match the authored key for all five cases | ? | ? | Ngoc Linh |
| I-07 | Product Parameters → adjusted tenor | KHCN-04 caps at 48 months via age-to-70, not 120 | ? | ? | Ngoc Linh |
| I-08 | Adjusted tenor \+ rate → PMT | Engine PMT equals the Bank system note shown on screen, all five cases | ? | ? | Ngoc Linh |
| I-09 | DTI engine → decision bands | 58.0 / 89.5 / 66.9 / 75.4 / 74.8 map to Approve / Reject / Approve / Reduce / Reduce | ? | ? | Ngoc Linh |
| I-10 | Reduce input → PV conversion | 9,900,000 → ≈383,045,000 (n=48); 6,300,000 → ≈610,354,000 (n=240) | ? | ? | Duc Minh |
| I-11 | Decisions → room state | room\_used rebuilds from current decisions; revising frees room | ? | ? | Duc Minh |
| I-12 | Submit → lock | All decisions, inputs and pins become read-only; Warehouse stays readable | ? | ? | Duc Minh |
| I-13 | Engine → Summary Card | Card renders all five per-dossier blocks plus the portfolio block | ? | ? | Van Trang |
| I-14 | Repo → GitHub Pages | Public URL opens on a second device; data files included in the build | ? | ? | Duc Minh |

Known integration risks, from the Week 6 failure list: field-name drift between the dossier file and the Warehouse file (`income` vs `verified_income`); unit mismatch on quarterly rent (KHCN-04 stores 72,000,000 per quarter, the engine needs 24,000,000 per month); diacritics handling in the search filter (Vietnamese names must match under both strict and fuzzy modes); and the answer key existing in a document rather than in the data the engine reads.

---

### 8\. State model

| State | Scope | Set by | Read by |
| :---- | :---- | :---- | :---- |
| `room_total` \= 2,050,000,000 | Round | Config | HUD, scorecard |
| `room_used` | Round | Recomputed from all current decisions | HUD, overview, Card |
| `queue_position` | Round | Engine | Dossier router |
| `pinned_record_id[case]` | Case | Player | Card (reporting only) |
| `cic_opened[case]` | Case | Player | — (no effect on grading) |
| `decision[case]` | Case | Player, revisable | Room, submit gate, Card |
| `entered_max_installment[case]` | Case | Player, revisable, cleared on decision change | Validation, PV, Card |
| `locked` | Round | Submit | Everything |

Anti-exploit rule: nothing in the round overview, the HUD or the Warehouse is derived from the answer key. Everything visible before submit is built only from the player’s own entries. This is why decisions can stay provisional without making the game trivially solvable — there is no feedback to farm.

---

### 9\. Scope freeze

Frozen as of Week 6\. After the freeze, only critical bugs, major clarity issues, deployment problems, documentation gaps and test failures are fixed.

| Postponed | Why | Revisit |
| :---- | :---- | :---- |
| Character / Capital / Collateral / Conditions Cs | MVP is Capacity-only by design; CIC and collateral stay display-only | After final |
| “Require more collateral” and “Add conditions” decisions | Require the unbuilt Collateral and Conditions Cs | After those Cs exist |
| Batch preview of unopened dossiers | Sequential delivery is simpler and matches the Solution Structure; batch preview risks the timeline | Only if Week 7 time allows |
| Per-dossier Decision-Consequence Cards | Removed by design — feedback only on the Summary Card, so provisional decisions cannot be exploited | Not planned |
| Document preview in Warehouse search results | Would let players shortcut identity matching by scanning rather than matching | Not planned |
| Real customer data | Privacy and feasibility | Not planned |

Known limitations to state at final: no LTV or collateral valuation anywhere; the same maximum age (70) applied to both products; interest rates are an MVP assumption, not per-case real rates; consequences are authored and deterministic, not a probabilistic default simulation.

---

### 10\. Ownership

| Component | Built by | Tested by | Verified by |
| :---- | :---- | :---- | :---- |
| Core engine, state, data loader, deployment | Nguyen Duc Minh | Lai Ngoc Linh | Doan Diep Anh |
| DTI pipeline, Product Parameters, bands, thresholds | Lai Ngoc Linh | Nguyen Duc Minh | Doan Diep Anh |
| Dossier set, Warehouse records, answer keys | Nguyen Ngoc Minh Ha | Lai Ngoc Linh | Nguyen Duc Minh |
| Screens, Warehouse UI, Summary Card layout | Dang Thi Van Trang | Doan Diep Anh | Nguyen Duc Minh |
| Core-flow definition, scope freeze, README | Doan Diep Anh | — | Team |

