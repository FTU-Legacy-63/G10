**Feature Map (linked to the 1C MVP) (Owner: Lai Ngoc Linh)**

**Core feature**

| Feature | What it does |
| :---- | :---- |
| Capacity engine | Adjusted-DTI pipeline, in fixed order: Loan Type → Product Parameters (tenor cap, max age, interest rate) → Adjusted tenor → New loan monthly installment (PMT/amortization) → Income Verification adjustment → Adjusted DTI → 70%/80% decision bands. This is the single source of truth all other features depend on. |

**Supporting features**

| Feature | What it does |
| :---- | :---- |
| Decision-Consequence Card | Reveals classification, consequence, and explanation after the player decides – the only place Adjusted DTI, the verification tier, and Adjusted Income fully surface together. |
| Conditional reveal \+ anti-exploit lock (Reduce limit) | Selecting Reduce limit locks the decision immediately, then reveals Adjusted Income and the verification tier so the player can compute their own Max installment; the player can never revert to Approve/Reject after seeing them. |
| Room \+ scorecard meta-loop | room\_total / room\_used track allocation across the round; end-of-round scorecard scores decision accuracy, portfolio risk, room efficiency. |
| “How Assessment Works” guide | Teaches the real 70%/80% DTI thresholds openly (Sourced, industry knowledge) but never reveals this case's own Adjusted DTI or Adjusted Income, reachable anytime via a “?” icon. |
| Reduce-limit amount validation | Numeric, greater than 0, not above the original Estimated Monthly Installment; graded with a ±5% tolerance rather than an exact match. |
| Answer-range feedback | For Approve/Reject, compares the player's classification to the true Adjusted DTI band. For Reduce limit, compares the player's entered Max installment to the system's true ceiling within ±5% tolerance. |

**Removed / postponed features (with reason)**

| Feature | Reason removed / postponed | Revisit when |
| :---- | :---- | :---- |
| Character, Capital, Collateral, Conditions Cs | Deferred – the MVP is Capacity-only by design. CIC status and collateral are shown display-only, reserved for later Cs. | Gamification phase (Week 6-7) |
| “Require more collateral” and “Add conditions” decisions | Deferred – need Collateral C and Conditions C, which are not built. | After Collateral/Conditions logic exists |
| Batch preview of all dossiers in a round | Postponed – sequential one-at-a-time flow matches the Solution Structure and is far simpler to implement; batch preview would better simulate real prioritization trade-offs but risks the 7-week timeline. | Open question – revisit if time allows in Week 6-7 |
| marital\_status, health\_status | Marked CONTEXTUAL in the input dictionary; kept for narrative flavor only, never enter the formula. | Not planned – display-only by design |
| Real customer data | Out of scope; all dossiers are simulated for privacy and feasibility. | Not planned |

   
