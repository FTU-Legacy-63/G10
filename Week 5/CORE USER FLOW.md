## **Core user flow**

## **1\. User goal** 

###After reading a simulated KHCN dossier, the player (a Year 3-4 Finance & Banking student) decides whether to approve at the requested amount, approve at a reduced amount, or reject a loan, under a limited credit room. The player then receives a Decision-Consequence Card showing whether the decision fell inside the defensible affordability band, plus the reasoning.

## **2\. Feature map (linked to the 1C MVP)**

### **Core features** 

* **Dossier screen.** Shows applicant profile (name, age, occupation \+ tenure, dependents), raw financials (income, living expenses, existing debt), the loan request (amount, tenor, collateral type), and the pre-computed metrics NDI, DTI, Burden as bare numbers with no verdict attached. Everything that represents a conclusion (band, tier, factors, correct classification) stays hidden. INPUT\_DICTIONARY and MVP Week 4.md 

* **Decision input.** Three actions: Approve (grant at requested amount), Reduce limit (grant at a player-entered amount), Reject (grant nothing).   
* **Capacity engine.** The approved Rulebook pipeline: NDI, base capacity at 42.5% midpoint, Employment/Age/Dependents factors, complexity band, then DTI/Burden gates in fixed order, then classification. Single source of truth: Logic Specification.md.  
* **Decision-Consequence Card.** The single main output. Reveals the classification, the consequence, the explanation, and the previously hidden band/tier/factor breakdown, worded as Classification not Recommendation.   
* **Room \+ scorecard meta-loop.** room\_total and room\_used track allocation across the round; the end-of-round scorecard scores decision accuracy, portfolio risk, and room efficiency. 

**Supporting features (help input, explanation or comparison; can be simplified)**

* **"How Assessment Works" guide.** Static, qualitative help screen with no numbers, reachable anytime via a "?" icon. Prevents the task degrading into a lookup  
* **Reduce-limit amount validation.** Numeric, greater than 0, not above the requested amount, not above remaining room. Owner: Minh.  
* **Answer-range feedback.** Compares the player's amount to the hidden accepted installment band and scores in-band vs out-of-band. Owner: Linh.

### **Removed or postponed features (with reason)**

* **Character, Capital, Collateral, Conditions Cs.** Deferred; the MVP is Capacity-only. CIC status and collateral are shown display-only, reserved for later Cs.  
* **"Require more collateral" and "Add conditions" decisions.** Deferred; they need Collateral C and Conditions C, which are not built. See revision item R1.  
* **marital\_status, health\_status.** Marked CONTEXTUAL in INPUT\_DICTIONARY; keep for narrative flavor only, do not let them enter the formula.  
* **Real customer data.** Out of scope; all dossiers are simulated (privacy and feasibility).

## **3\. Core user flow (happy / alternative / error paths)**

**Start.** Round begins. The system loads room\_total and the dossier queue.

* **Dossier screen.** The player reads profile, raw financials, loan request, and NDI/DTI/Burden as bare numbers. Band, factors, tier, and the correct classification are hidden. Assessment guide reachable anytime.  
* **Decision branch:**  
  * **Happy path (direct decision):** player picks Approve or Reject. No amount of entry. Go straight to the card.  
  * **Alternative path (needs input):** player picks Reduce limit, enters a proposed amount, system validates.  
  * **Error path:** invalid entry (blank, not numeric, at or below 0, above requested amount, above remaining room) shows an inline validation message and the player retries. No card is shown until the amount is valid.  
* **The card reveals the result.** Decision-Consequence Card shows the player's choice against the hidden band, which gate or flag fired, the factor breakdown, and the explanation.  
* **Next dossier.** room\_used updates; loop to the next dossier. Empty queue routes to the scorecard.

This flow is deliberately thin: one read, one decision, one reveal. It is what the Week 6 build can actually support end to end.

