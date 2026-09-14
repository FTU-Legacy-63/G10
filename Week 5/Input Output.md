1. ##  **Input labels and validation plan**

In the core loop the player enters exactly one value: the reduced amount on the Reduce-limit path (`proposed_limit`). Everything else is dossier state, display-only. This keeps the difficulty on reading the case, not on data entry.

**Unit decision to lock (blocker R3).** The answer key in `Logic Specification.md` §6 is expressed as a monthly installment range, but `proposed_limit` in `INPUT_DICTIONARY` is described as the amount granted (principal). These are two different units. Recommendation: the player enters principal (what a credit officer actually grants), the system derives the monthly installment and scores it against the installment band. Whatever is chosen must be labeled on the field.

**Common confusion to pre-empt on the dossier screen:**

* Monthly vs annual: every figure is monthly per the `INPUT_DICTIONARY` convention; state "per month" on the labels.  
* VND vs million VND: put the unit next to every number.  
* Installment vs principal: label both distinctly so the player does not confuse them.  
* NDI vs gross income: show NDI as its own line so the player reasons off disposable income, not gross.

**Validation rules for the reduced amount:** required; numeric; greater than 0; not greater than `requested_amount` (cannot grant more than requested); not greater than remaining room (`room_total - room_used`). Each failure shows a specific message, for example "Enter an amount above 0", "Cannot grant more than the requested amount", "Exceeds remaining room for this round".

2. ##  **Output: the Decision-Consequence Card**

Structured with the slide's Result, Reason, Meaning, Action, Limit pattern:

* **Result:** the classification (Approve / Reduce / Reject) and whether the player's amount fell inside, above, or below the accepted band, or was hard-gated by DTI/Burden.  
* **Reason:** the numbers behind it \- NDI, adjusted monthly capacity, band, DTI, Burden, and which gate or red flag fired.  
* **Meaning:** what the decision does to the applicant and the portfolio (the consequence), for example "approving at full leaves no buffer for irregular expenses".  
* **Action:** player allocates remaining room to the next dossier; state updates.  
* **Limit:** this classification reflects Capacity only; Character, Capital, Collateral, and Conditions are out of MVP scope. Thresholds are team assumptions (see Threshold Disclosure in the Rulebook), not guaranteed industry standards.

**Claim boundary lock.** The card classifies and compares the request against a defensible band. It never says "best" or "you should lend". This is the recommendation-wording fix from Weeks 3-4, now enforced at the output layer (see revision item R4).

