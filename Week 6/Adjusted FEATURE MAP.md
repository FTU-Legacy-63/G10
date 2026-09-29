**Feature Map (linked to the 1C MVP) (Owner: Lai Ngoc Linh)**

**Core feature**

| Feature | What it does |
| :---- | :---- |
| Capacity engine | DTI pipeline, in fixed order: Loan Type → Product Parameters (tenor cap, max age, interest rate) → Adjusted tenor → New loan monthly installment (PMT/amortization) → DTI \= (Existing obligations \+ Installment) ÷ Income → 70%/80% decision bands. Income is used as stated, with no verification adjustment. This is the single source of truth all other features depend on. |

**Supporting features**

| Feature | What it does |
| :---- | :---- |
| Dossier reading \+ DTI calculation (player task) | All figures are already in the dossier, including the pre-computed Estimated Monthly Installment. The player finds Income, Existing obligations and the Estimated Monthly Installment (other fields are context only), calculates DTI, and chooses Approve / Reduce limit / Reject. |
| Decision-Consequence Card | Reveals classification, consequence, and explanation after the player decides – the only place the system’s own DTI and the correct classification surface, alongside the DTI the player calculated. |
| Reduce-limit amount input | After tapping Reduce limit, the player enters their own Max installment (70% × Income − Existing obligations) from figures already on screen; the system converts it to a loan amount via Present Value/ |
| Room \+ scorecard meta-loop | room\_total / room\_used track allocation across the round; end-of-round scorecard scores decision accuracy, portfolio risk, room efficiency. |
| “How Assessment Works” guide | Teaches the real 70%/80% DTI thresholds openly (Sourced, industry knowledge), how age caps the tenor (to age 70), and how the monthly installment is calculated (PMT) – but never reveals a case’s own DTI. Reachable anytime via a “?” icon. |
| Reduce-limit amount validation | Numeric, greater than 0, not above the original Estimated Monthly Installment; graded with a ±5% tolerance rather than an exact match. |
| Answer-range feedback | For Approve/Reject, compares the player’s classification to the true DTI band. For Reduce limit, compares the player’s entered Max installment to the system’s true ceiling within ±5% tolerance. |

**Removed / postponed features (with reason)**

| Feature | Reason removed / postponed | Revisit when |
| :---- | :---- | :---- |
| Character, Capital, Collateral, Conditions Cs | Deferred – the MVP is Capacity-only by design. CIC status and collateral are shown display-only, reserved for later Cs. | Gamification phase (Week 6-7) |
| “Require more collateral” and “Add conditions” decisions | Deferred – need Collateral C and Conditions C, which are not built. | After Collateral/Conditions logic exists |
| NDI, Burden, Band Width, red-flag gates, dependents, living costs, employment-stability adjustment | Removed – replaced by a single DTI metric with fixed 70%/80% bands, per finance-expert feedback. | Not planned |
| Income verification adjustment (Adjusted Income, Verified / Cash-based tier) | Removed – per instructor feedback, income is used as stated. This also removes the conditional reveal \+ anti-exploit lock on Reduce limit, since there is no hidden field left to reveal. | Not planned |
| Batch preview of all dossiers in a round | Postponed – sequential one-at-a-time flow matches the Solution Structure and is far simpler to implement; batch preview would better simulate real prioritization trade-offs but risks the 7-week timeline. | Open question – revisit if time allows in Week 6-7 |
| Real customer data | Out of scope; all dossiers are simulated for privacy and feasibility. | Not planned |

   
