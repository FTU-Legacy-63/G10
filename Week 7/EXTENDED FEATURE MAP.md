**Feature Map (linked to the 4C MVP) (Owner: Lai Ngoc Linh)**

**Core features**

| Feature | What it does |
| :---- | :---- |
| Capacity engine | DTI pipeline, in fixed order: Loan Type → Product Parameters (tenor cap, max age, interest rate) → Adjusted tenor → New loan monthly installment (PMT/amortization) → DTI \= (Existing obligations \+ Installment) ÷ Income (verified) → one set of decision bands: Approve ≤ 70%, Reduce limit 70%–80%, Reject \> 80%. Income used in the formula is always verified income, never stated income. |
| 4C rules engine | Rates Character (current and worst CIC group, credit inquiries, document check), checks the purpose and the collateral acceptance (ownership, transferability), tests LTV against the 70% Max LTV for Secured loans, rates Capital (Reserve cover, 3-month level) and Conditions (industry outlook, macro banner), and applies the decision order Reject → Reduce limit → Require more collateral → Add conditions → Approve. Watch and Adverse signals lead to Add conditions; they never move the DTI lines. Together with the Capacity engine this is the single source of truth all other features depend on. |

**Supporting features**

| Feature | What it does |
| :---- | :---- |
| Dossier reading \+ 4C worksheet (player task) | All figures are already in the dossier, including the pre-computed Estimated Monthly Installment. The player finds the right figures, rates Character, Capital and Conditions, checks purpose and collateral acceptance, calculates DTI, Reserve cover and LTV on a worksheet, and chooses one of five decisions. The worksheet is feedback only and is not scored. |
| Income Verification Warehouse | A separate lookup screen holding each applicant’s true Verified income. The dossier may show Stated income (self-reported, unlabeled). The player must check the Warehouse for every case before computing DTI, since some cases have Stated income that does not match Verified income. |
| Macro environment banner | A round-level flag (Normal / Stressed) shown on every dossier in the round. Set once by the game designer; it is an input to the Conditions rating. |
| Decision inputs | Reduce limit: the player enters Max installment \= 70% × Income (verified) − Existing obligations, and the system converts it to a loan amount via Present Value. Require more collateral: the player enters Additional collateral \= Loan amount ÷ Max LTV − Net collateral value, and the system rounds its own figure up to the nearest 1,000,000 VND. Add conditions: the player selects at least one condition (documents showing use of funds; periodic collateral re-appraisal, Secured only; periodic occupation and income update). The choice is feedback only. |
| Round overview \+ review | A list of the dossiers the player has opened, with the current decision on each and the room used. The player can reopen any opened dossier to change the worksheet, the decision or the decision input. No correctness is shown during review; dossiers not yet opened stay hidden. |
| Submit round \+ lock | Enabled when every dossier has a decision and a complete decision input. A confirmation states that decisions cannot be changed afterwards; on confirmation everything locks and the Summary Consequence Card opens. |
| Summary Consequence Card | Shown once, at the end of the round, and never after an individual dossier. Shows the portfolio result and consequence, and for each dossier the classification, consequence, explanation and a per-C check. Only the final decision on each dossier is assessed. |
| Room \+ scorecard meta-loop | room\_total / room\_used track allocation across the round and are recalculated from the player’s current decisions during review; the end-of-round scorecard scores decision accuracy, portfolio risk, room efficiency (formulas to be defined in the scorecard design). |
| “How Assessment Works” guide | Teaches openly the real thresholds and rules (70%/80% DTI lines, CIC groups and what counts as a Watch or a Block, purpose and collateral acceptance, 3-month Reserve cover, 70% Max LTV, Adverse environment, decision order) and the mechanics (age caps the tenor to age 70, how the monthly installment is calculated, how to verify income in the Warehouse) – but never reveals a case’s own results. Reachable anytime via a “?” icon. |
| Decision-input validation | Reduce limit: numeric, greater than 0, not above the original Estimated Monthly Installment. Require more collateral: numeric, greater than 0, not above Loan amount ÷ Max LTV. Add conditions: at least one condition selected. Numeric inputs are graded with a ±5% tolerance rather than an exact match. |
| Answer-range feedback | On the Summary Card: compares the player’s final decision with the correct one; for Reduce limit and Require more collateral, compares the entered figure with the system’s within ±5%; shows worksheet entries beside the correct ratings and numbers. |

**Removed / postponed features (with reason)**

| Feature | Reason removed / postponed | Revisit when |
| :---- | :---- | :---- |
| Tightened DTI bands and any risk-based change to the DTI lines | Removed – the bank practice used applies a single DTI ceiling; risk signals lead to conditions instead. | Not planned |
| NDI, Burden, Band Width, red-flag gates, dependents, living costs, employment-stability adjustment | Removed – replaced by a single DTI metric, per finance-expert feedback. | Not planned |
| Per-dossier feedback during the round | Removed by design – feedback appears only on the Summary Consequence Card, which is what allows the player to review and revise decisions freely. | Not planned |
| Batch preview of all dossiers in a round | Postponed – sequential one-at-a-time flow matches the Solution Structure. Review covers dossiers already opened only; previewing unopened dossiers would better simulate prioritization trade-offs but risks the 7-week timeline. | Open question – revisit if time allows in Week 6-7 |
| Other collateral types, several assets per loan, insurance and revaluation of collateral | Postponed – only real estate, one asset per loan, to keep the Collateral rule simple. | After Gamification phase (Week 6-7) |
| Guarantor and spouse income, CIC of related persons, approval authority by loan size | Not modelled – one borrower per dossier; approval levels are outside the decision set. | Not planned |
| Event-level CIC history and fraud investigation | Out of scope – Character uses CIC groups, inquiry count and a document check only. | Not planned |
| Macro changes inside a round | Postponed – one macro flag per round, the same for every dossier. | After Gamification phase (Week 6-7) |
| Scoring of the worksheet and of the choice of conditions | Postponed – feedback only until the scorecard design defines how they count. | Scorecard design |
| Missing documents and other rejection reasons from bank practice | Not modelled – file completeness is not a decision in this game. | Not planned |
| Country, Currency, corporate ratios, credit ratings and spreads | Out of scope – the game lends to individuals in VND, so these CFA Chapter 6 concepts do not apply. | Not planned |
| Real customer data | Out of scope; all dossiers are simulated for privacy and feasibility. | Not planned |

   
