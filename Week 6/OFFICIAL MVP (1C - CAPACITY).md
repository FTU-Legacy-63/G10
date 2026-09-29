**The Credit Desk – 1C MVP (Capacity Only, DTI-Based)**

# **1\.** 	**Why This MVP Uses Only Capacity**

Of the 5 Cs, Capacity – now expressed as a single DTI metric – is the only driver that is (a) present in every KHCN dossier, (b) fully quantified in the Rulebook, and (c) does not depend on data the team does not yet have.

* Character – deferred: needs CIC event-level history data the team has not sourced; currently a static “clean/not clean” display field only.  
* Capital – deferred: requires net-worth/asset data rarely available for individual applicants.  
* Collateral – deferred: Loan Type (Unsecured/Secured) only routes to a tenor/rate parameter row; no collateral valuation or LTV is used, so this is still not Collateral-C.  
* Conditions – deferred: requires macro/market context data not attached to individual dossiers.

Capacity alone – now a single, real, Sourced metric (DTI) rather than a multi-factor score – is enough to build one complete, defensible Input → Output loop.

# **2\. 	Full Flow: Input → Process → Output → User Action**

| Stage | What happens | Rulebook section |
| :---- | :---- | :---- |
| 1\. Input | Player opens a KHCN dossier and identifies which of the given figures feed the DTI: Income, Existing obligations and the Estimated Monthly Installment. Occupation, Age, Loan Type, Requested amount, Tenor, Collateral and CIC are context or already reflected in the installment. | Definitions |
| 2\. Process – Product lookup | Determine Loan Type and look up its tenor cap, maximum age, and interest rate from the Product Parameters table. | Product Parameters by Loan Type |
| 3\. Process – Tenor cap | Compute the Adjusted tenor (minimum of requested tenor, product cap, and age-to-70 cap). | Loan Term (Tenor) Adjustment by Age |
| 4\. Process – Installment | Compute the New loan monthly installment using the amortization (PMT) formula. Stages 2–4 run behind the scenes; the player receives the result as the Estimated Monthly Installment. | New Loan Monthly Installment |
| 5\. Process – DTI | Player calculates DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income. The system computes the same value for comparison on the Card. | DTI |
| 6\. Classify | Player compares their DTI to the 70% / 80% lines and chooses Approve / Reduce limit / Reject. | Decision Bands |
| 7\. Output | Decision-Consequence Card: Classification (Approve/Reduce/Reject), Consequence, Explanation – worded within the Claim Boundary. | Claim Boundary |
| 8\. User action | The player allocates remaining room to the next applicant; state (room, portfolio risk) updates. | Product Statement / Solution Structure |

# **3\. 	Input Layer – What the Player Sees**

* Occupation, tenure → profile context (display-only; not used in any formula)  
*  Monthly income → the denominator of DTI  
*  Existing debt obligations → part of the numerator of DTI  
* Age → Adjusted tenor (age-to-70 cap); already reflected in the Estimated Monthly Installment  
* Loan Type (Unsecured/Secured) → selects the Product Parameters row (tenor cap, max age, interest rate)  
* Credit history / CIC (display-only) → reserved for the future Character C  
* Collateral, Loan purpose (display-only) → context only; not used in any formula  
* Loan amount requested, Tenor → already converted into the Estimated Monthly Installment (PMT), the other part of the numerator of DTI

  # **4\.** 	**Process Layer – Step by Step**

  ## **4.1. Step 1 – Loan Type → Product Parameters**

Unsecured: tenor cap 60 months, max age 70, rate 18%/year. Secured: tenor cap 360 months, max age 70, rate 11%/year. DTI approve/reject lines (70%/80%) are identical for both – Loan Type never changes the decision bands themselves, only the tenor cap and rate used to compute the installment.

## **4.2. Step 2 – Adjusted Tenor**

Adjusted tenor \= minimum of the requested tenor, the product's maximum tenor, and (Maximum age at maturity − current age) × 12\.

## **4.3. Step 3 – New Loan Monthly Installment**

Computed with the standard amortization (annuity) formula – not a straight-line approximation:

**New loan monthly installment \= P × r ÷ \[1 − (1+r)^−n\]**

where P \= Loan amount requested, r \= monthly interest rate (annual rate ÷ 12), n \= Adjusted tenor.

## **4.4. Step 4 – DTI**

**DTI \= (Existing obligations \+ New loan monthly installment) ÷ Income.**

## **4.5. Step 5 – Classify**

*  DTI ≤ 70% → Approve.  
* 70% \< DTI ≤ 80% → Reduce limit. Maximum approvable installment \= 70% × Income − Existing obligations; convert to a loan amount via Present Value: Maximum approvable loan \= Maximum approvable installment × \[1−(1+r)^−n\] ÷ r.  
* DTI \> 80% → Reject.

  # **5\.** 	**Output Layer – Decision – Consequence Card**

The output must stay inside the Claim Boundary – a Classification, not a Recommendation. Whichever category the player taps is final and leads to the Card, where everything hidden in Section 6 (DTI, correct classification) is revealed. For Reduce limit, the player first enters one number (their own Max installment) before the Card appears; see Section 6.3.

* Classification: whether DTI falls ≤ 70%, in the 70–80% zone, or \> 80%.  
* Consequence: what happens if this decision is taken on this applicant (e.g. “approving here leaves almost no debt-service buffer”).  
* Explanation: the specific numbers behind the classification – Income, New installment, Existing obligations, the DTI the player calculated vs. the system's DTI – mapped back to Capacity, not phrased as financial advice.

  # **6\.** 	**UI Visibility – What the Player Sees vs What Stays Hidden**

Every figure needed to compute DTI is already in the dossier (income, existing obligations, the pre-computed installment); the player's task is to find those figures among the other fields, calculate DTI, and choose a category. The system's own DTI appears only on the Card, for comparison.

 

| Field | Visibility | Why |
| :---- | :---- | :---- |
| Name, age, occupation, tenure | Visible | Personal profile – context for the case |
| Monthly income, Existing debt obligations | Visible | Raw financial inputs the player reasons from |
| Loan Type (Unsecured / Secured) | Visible | Needed context; it only routes to a parameter row, so showing it reveals nothing about the verdict |
| Applicable interest rate, Tenor, Loan amount requested | Visible | The request being evaluated |
| Credit history (CIC) | Visible (display-only) | Not used in this MVP's formula; reserved for the future Character C |
| Collateral, Loan purpose | Visible (display-only) | Context only – no valuation or LTV is used anywhere in this MVP |
| Estimated Monthly Installment | Visible – pre-computed, no label | The real amortized (PMT) figure is given directly so the player never has to hand-compute an annuity formula; it is shown as a bare number, not yet compared to income |
| DTI | Not shown – the player calculates it | Finding the right figures and computing DTI is the player's task; the system's own DTI is revealed on the Card to compare against the player's result |
| Correct classification (Approve/Reduce/Reject) | Hidden until after decision | The answer key – revealed only in the Decision-Consequence Card, compared to the player's own choice |

## **6.1. Design Principle: Teach the Real Thresholds, Let the Player Compute the Number**

The 70%/80% DTI lines are fixed, universal, and Sourced from real Vietnamese bank practice (Rulebook, Threshold Disclosure) – they are industry knowledge, not a game secret, so this MVP teaches them openly on the “How Assessment Works” screen. The applicant's own DTI is not given, but everything needed to compute it is already in the dossier. The player's task is therefore to (1) locate the relevant figures among the data shown – Income, Existing obligations and the Estimated Monthly Installment – while treating Occupation, CIC, Collateral and Loan purpose as context only; (2) calculate DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income – one sum and one division, since the Estimated Monthly Installment is already given in the dossier (the “How Assessment Works” tutorial still teaches how that installment is calculated, so the player knows where it comes from, but the player is never asked to compute it); and (3) compare the result with the 70%/80% lines to choose Approve, Reduce limit or Reject.

## **6.2. “How Assessment Works” (Tutorial / Help)**

*A dedicated screen, shown once during onboarding and reachable anytime via a “?” icon.*

> > > ### **6.2.1.**	**Age & Loan Term**

* How to determine the adjusted tenor: The official loan tenor used to calculate the monthly installment will be the minimum of the following three factors:  
  ❖	The requested tenor specified by the customer.  
  ❖	The product tenor cap: maximum 60 months for unsecured loans and maximum 360 months for secured loans.  
  ❖	The number of months remaining until the borrower reaches the age of 70:  
* Impact on the Credit Decision:  
  ❖	Far from the age of 70: If the customer is relatively young (e.g., 38 years old), the number of months remaining until age 70 is (70 \- 38)\*12 \= 384 months, which is well beyond the requested tenor. Therefore, age does not constrain the loan tenor.  
  ❖	Approaching the age of 70: If the customer is older and the number of months remaining until age 70 is shorter than either the requested tenor or the product's maximum tenor, the actual loan tenor will be capped/reduced accordingly. This results in a higher monthly installment (PMT), which increases the DTI and may move the application into the Reduce Limit or Reject category.

  ### **6.2.2.**	**How the Monthly Installment Is Calculated**

* What it is: the fixed amount the borrower pays every month so that the loan, including interest, is fully repaid by the end of the adjusted tenor. In the dossier it is already given to you as the Estimated Monthly Installment.  
* Formula: Installment \= P × r ÷ \[1 − (1+r)^−n\], where P \= loan amount requested, r \= monthly interest rate (annual rate ÷ 12), and n \= adjusted tenor in months.  
* Example: 100,000,000 VND at 18%/year over 36 months → r \= 18% ÷ 12 \= 1.5% per month, so installment \= 100,000,000 × 0.015 ÷ \[1 − (1.015)^−36\] ≈ 3,615,240 VND/month.  
* Why it is not simply amount ÷ tenor: interest is charged on the remaining balance each month, so the real installment is higher than a straight-line split of the principal.

  ### **6.2.3.**	**Reading the Result Against Real-World Lines**

Once you have calculated the DTI for this case, real Vietnamese bank practice generally works within these lines:

* Roughly ≤ 70% – comfortably within capacity → Approve.  
* Roughly 70–80% – a higher-risk zone → Reduce limit, propose a smaller amount you'd be comfortable approving.  
* Roughly \> 80% – considered unsustainable → Reject.

  ## **6.3. Reduce Limit Sub-Flow**

Approve and Reject submit immediately and jump straight to the Decision-Consequence Card. Reduce limit adds one player-entered number before the Card. No extra field is revealed on this path, because every number the player needs (Income, Existing obligations) is already visible.

After the player taps Reduce limit, the flow is as follows:

* **Step 1 – Player calculates and enters:** The player works out their own Max installment by hand – Max installment \= 70% × Income − Existing obligations – and types that number into the amount field. No PMT or annuity math is asked of the player here, only one multiplication and one subtraction.  
* **Step 2 – Input validation:** The entered value must be a positive number and cannot exceed the original Estimated Monthly Installment shown back in Section 3 – Reduce limit can only lower the requested amount, never raise it.  
* **Step 3 – System converts to a loan amount:** The system, not the player, converts the entered installment into a total loan amount via Present Value – Max approvable loan \= entered installment × \[1−(1+r)^−n\] ÷ r – using the same r and n already shown for this dossier. The player is never asked to compute this step by hand.  
* **Step 4 – Card reveal:** The Card reveals the real DTI, the system’s own correct Max installment and Max loan amount, and how the player’s entered figures compare against them.

Because the player’s Max installment is a hand calculation rather than a system output, grading allows a small tolerance around the system’s own correct figure (e.g. ±5%) instead of requiring an exact match, so the player is not marked wrong purely for reasonable rounding.

# **7\.** 	**Decision Set for This MVP (only 3 of 5 options)**

Because only Capacity (DTI) is modeled, only the three decisions it alone can justify are included.

| Decision | In 1C MVP? | Why |
| :---- | :---- | :---- |
| Approve | Yes | DTI ≤ 70%. |
| Reduce limit | Yes | DTI is 70–80%. Offer the installment/amount that brings DTI back to exactly 70%. |
| Reject | Yes | DTI \> 80%. |
| Require more collateral (TSDB) | Deferred | Loan Type only selects tenor/rate parameters – no collateral valuation or LTV is used, so this decision still requires the (unbuilt) Collateral C. |
| Add conditions | Deferred | Requires the Conditions C (macro/market context, monitoring clauses) – not part of this MVP. |

# **8\.** 	**Explicitly Out of Scope for This MVP**

* Character: No quantified scoring of CIC history beyond a static “Group 1, clean” display field.  
* Capital: No net-worth or asset-based adjustment.  
* Collateral: Loan Type (Unsecured/Secured) only selects a tenor/rate parameter row – no LTV calculation or asset valuation exists anywhere in this Rulebook. The “Require more collateral” decision remains unavailable.  
* Conditions: No macro/market adjustment; the “Add conditions” decision is unavailable.

   
