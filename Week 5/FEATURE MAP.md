**Feature Map (linked to the 1C MVP)**

**(Owner: Lai Ngoc Linh)**

**Core feature**

| Feature | What it does |
| :---- | :---- |
| Capacity engine | NDI, affordability ratio, Employment/Age/Dependents factors, complexity-tier Band, DTI/Burden gates, in fixed order (Rulebook §2-4). This is the single source of truth all other features depend on. |

**Supporting features**

| Feature | What it does |
| :---- | :---- |
| Decision-Consequence Card | Reveals classification, consequence, and explanation after the player decides — the only place the hidden Band/tier/factors surface (Rulebook §7, MVP §5-6). |
| Room \+ scorecard meta-loop | room\_total / room\_used track allocation across the round; end-of-round scorecard scores decision accuracy, portfolio risk, room efficiency. |
| "How Assessment Works" guide | Static, qualitative help screen with no numbers, reachable anytime via a "?" icon. Prevents the task from degrading into a lookup. |
| Reduce-limit amount validation | Numeric, greater than 0, not above the requested amount, not above remaining room. Owner: Minh. |
| Answer-range feedback | Compares the player's final amount (from Approve or Reduce limit) to the hidden accepted band and scores in-band vs out-of-band. Owner: Linh. |

**Removed / postponed features (with reason)**

| Feature | Reason removed / postponed | Revisit when |
| :---- | :---- | :---- |
| Character, Capital, Collateral, Conditions Cs | Deferred — the MVP is Capacity-only by design. CIC status and collateral are shown display-only, reserved for later Cs. | Gamification phase (Week 6-7) |
| "Require more collateral" and "Add conditions" decisions | Deferred — need Collateral C and Conditions C, which are not built. | After Collateral/Conditions logic exists |
| Batch preview of all dossiers in a round | Postponed — sequential one-at-a-time flow matches the Solution Structure and is far simpler to implement; batch preview would better simulate real prioritization trade-offs but risks the 7-week timeline. | Open question — revisit if time allows in Week 6-7 |
| marital\_status, health\_status | Marked CONTEXTUAL in the input dictionary; kept for narrative flavor only, never enter the formula. | Not planned — display-only by design |
| Real customer data | Out of scope; all dossiers are simulated for privacy and feasibility. | Not planned |

