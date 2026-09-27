**The Credit Desk – 1C MVP (Capacity Only, DTI-Based)**

# **1\.** 	**Why This MVP Uses Only Capacity**

Of the 5 Cs, Capacity – now expressed as a single Adjusted DTI metric – is the only driver that is (a) present in every KHCN dossier, (b) fully quantified in the Rulebook, and (c) does not depend on data the team does not yet have.

●  	Character – deferred: needs CIC event-level history data the team has not sourced; currently a static “clean/not clean” display field only.  
●  	Capital – deferred: requires net-worth/asset data rarely available for individual applicants.  
●  	Collateral – deferred: Loan Type (Unsecured/Secured) only routes to a tenor/rate parameter row; no collateral valuation or LTV is used, so this is still not Collateral-C.  
●  	Conditions – deferred: requires macro/market context data not attached to individual dossiers.

Capacity alone – now a single, real, Sourced metric (DTI) rather than a multi-factor score – is enough to build one complete, defensible Input → Output loop.

# **2\.** 	**Full Flow: Input → Process → Output → User Action**

| Stage | What happens | Rulebook section |
| :---- | :---- | :---- |
| 1\. Input | Player opens a KHCN dossier: Income, Existing obligations, Occupation, Age, Loan Type (Unsecured/Secured), Requested amount, Tenor, Collateral and CIC (display-only). | Definitions |
| 2\. Process – Product lookup | Determine Loan Type and look up its tenor cap, maximum age, and interest rate from the Product Parameters table. | Product Parameters by Loan Type |
| 3\. Process – Tenor cap | Compute the Adjusted tenor (minimum of requested tenor, product cap, and age-to-70 cap). | Loan Term (Tenor) Adjustment by Age |
| 4\. Process – Installment | Compute the New loan monthly installment using the amortization (PMT) formula. | New Loan Monthly Installment |
| 5\. Process – Income | Apply the Income Verification percentage (100% Verified / 30–40% Cash-based) to get Adjusted Income. | Income Verification Adjustment |
| 6\. Process – DTI | Compute Adjusted DTI \= (Existing obligations \+ New installment) ÷ Adjusted Income. | Adjusted DTI |
| 7\. Classify | Compare Adjusted DTI to the 70% / 80% lines. | Decision Bands |
| 8\. Output | Decision-Consequence Card: Classification (Approve/Reduce/Reject), Consequence, Explanation – worded within the Claim Boundary. | Claim Boundary |
| 9\. User action | The player allocates remaining room to the next applicant; state (room, portfolio risk) updates. | Product Statement / Solution Structure |

# **3\.** 	**Input Layer – What the Player Sees**

●       Occupation, tenure → qualitative signal for how reliable the income looks  
●       Monthly income → Adjusted Income → Adjusted DTI  
●       Existing debt obligations → Adjusted DTI  
●       Age → Adjusted tenor (age-to-70 cap)  
●       Loan Type (Unsecured/Secured) → selects the Product Parameters row (tenor cap, max age, interest rate)  
●       Credit history / CIC (display-only) → reserved for the future Character C  
●       Collateral, Loan purpose (display-only) → context only; not used in any formula  
●       Loan amount requested, Tenor → New loan monthly installment (PMT), compared against the DTI bands

# **4\.** 	**Process Layer – Step by Step**

## **4.1. Step 1 – Loan Type → Product Parameters**

Unsecured: tenor cap 60 months, max age 70, rate 18%/year. Secured: tenor cap 360 months, max age 70, rate 11%/year. DTI approve/reject lines (70%/80%) are identical for both – Loan Type never changes the decision bands themselves, only the tenor cap and rate used to compute the installment.

## **4.2.  Step 2 – Adjusted Tenor**

Adjusted tenor \= minimum of the requested tenor, the product's maximum tenor, and (Maximum age at maturity − current age) × 12\.

## **4.3.  Step 3 – New Loan Monthly Installment**

Computed with the standard amortization (annuity) formula – not a straight-line approximation:

**New loan monthly installment \= P × r ÷ \[1 − (1+r)^−n\]**

where P \= Loan amount requested, r \= monthly interest rate (annual rate ÷ 12), n \= Adjusted tenor.

## **4.4. Step 4 – Income Verification**

Adjusted Income \= Income × verification percentage: 100% if Verified (payslip, employer certification, or bank statement showing regular deposits), 30–40% if Cash-based/unverified (informal trading, unbanked business revenue) – this Rulebook uses 30% unless a case justifies otherwise.

## **4.5.  Step 5 – Adjusted DTI**

**Adjusted DTI \= (Existing obligations \+ New loan monthly installment) ÷ Adjusted Income.**

## **4.6.  Step 6 – Classify**

●       Adjusted DTI ≤ 70% → Approve.  
●       70% \< Adjusted DTI ≤ 80% → Reduce limit. Maximum approvable installment \= 70% × Adjusted Income − Existing obligations; convert to a loan amount via Present Value: Maximum approvable loan \= Maximum approvable installment × \[1−(1+r)^−n\] ÷ r.  
●       Adjusted DTI \> 80% → Reject.

# **5\.** 	**Output Layer – Decision – Consequence Card**

The output must stay inside the Claim Boundary – a Classification, not a Recommendation. For Approve and Reject, tapping the category is final and jumps straight to the Card, where everything hidden in Section 6 (Adjusted DTI, verification tier, Adjusted Income, correct classification) is revealed together. For Reduce limit, the category tap is equally final and locked, but the Card is not shown immediately – Adjusted Income and the verification tier are revealed first so the player can work out their own Max installment before the Card (and the real Adjusted DTI) appears; see Section 6.3 for the exact sequence and the anti-exploit locking rule.

●  	Classification: whether Adjusted DTI falls ≤ 70%, in the 70–80% zone, or \> 80%.  
●  	Consequence: what happens if this decision is taken on this applicant (e.g. “approving here leaves almost no debt-service buffer”).  
●  	Explanation: the specific numbers behind the classification – Income, verification tier used, Adjusted Income, New installment, Existing obligations, Adjusted DTI – mapped back to Capacity, not phrased as financial advice.

# **6\.** 	**UI Visibility – What the Player Sees vs What Stays Hidden**

The player sees the raw building blocks (income, existing obligations, the pre-computed installment) and must judge income reliability themselves; the exact Adjusted DTI is confirmed only on reveal.

 

| Field | Visibility | Why |
| :---- | :---- | :---- |
| Name, age, occupation, tenure | Visible | Personal profile – player reads and judges qualitatively, especially for income reliability |
| Monthly income, Existing debt obligations | Visible | Raw financial inputs the player reasons from |
| Loan Type (Unsecured / Secured) | Visible | Needed context; it only routes to a parameter row, so showing it reveals nothing about the verdict |
| Applicable interest rate, Tenor, Loan amount requested | Visible | The request being evaluated |
| Credit history (CIC) | Visible (display-only) | Not used in this MVP's formula; reserved for the future Character C |
| Collateral, Loan purpose | Visible (display-only) | Context only – no valuation or LTV is used anywhere in this MVP |
| Estimated Monthly Installment | Visible – pre-computed, no label | The real amortized (PMT) figure is given directly so the player never has to hand-compute an annuity formula; it is shown as a bare number, not yet compared to income |
| Adjusted DTI | Hidden until after decision | This is the system's computed conclusion – showing it upfront would turn the decision into reading one number instead of judging the case |
| Income Verification tier assigned (Verified / Cash-based) and the exact % used | Hidden until Reduce limit is locked in (then revealed before the Card) | For Approve/Reject the player must judge income reliability from Occupation/tenure alone. For Reduce limit it is revealed after locking in, because the player needs it to compute their own Max installment (Section 6.3) – but only after the category can no longer be changed |
| Adjusted Income (post-verification) | Hidden until Reduce limit is locked in (then revealed before the Card) | A derived, case-specific number the player needs only on the Reduce-limit path, to compute their own Max installment by hand (Section 6.3) |
| Correct classification (Approve/Reduce/Reject) | Hidden until after decision | The answer key – revealed only in the Decision-Consequence Card, compared to the player's own choice |

## **6.1. Design Principle: Teach the Real Thresholds, Hide the Real Number**

The 70%/80% DTI lines are fixed, universal, and Sourced from real Vietnamese bank practice (Rulebook, Threshold Disclosure) – they are industry knowledge, not a game secret, so this MVP teaches them openly on the “How Assessment Works” screen. But the applicant's own Adjusted DTI is a computed conclusion, so it is never shown – the player must judge where a case likely falls, the same way a real credit officer forms a view before running the numbers. To keep this a judgment task rather than a memory or reverse-engineering task, the game does not ask the player to compute a PMT amortization by hand – the Estimated Monthly Installment is already given. At most, the player might do one simple sum and one division on paper; everything past that is qualitative reasoning about income reliability, not arithmetic.

## **6.2. “How Assessment Works” (Tutorial / Help)**

*A dedicated screen, shown once during onboarding and reachable anytime via a “?” icon.*

> > > ### **6.2.1.**     **Judging Income Reliability**

●       Salaried positions with long tenure, payroll or bank-verified income → treat as fully reliable; no discount needed.  
●       Commission-based, short-tenure, or otherwise harder-to-verify income → treat with some caution – the number on paper may not repeat every month.  
●       Cash-based, informal, or unverifiable income (e.g. small trading, unbanked business revenue) → treated as materially less reliable than its face value suggests. This Rulebook's own working assumption is to count only 30–40% of such income when judging repayment capacity.

> > > ### **6.2.2.**     **Age & Loan Term**

●  	How to determine the adjusted tenor: The official loan tenor used to calculate the monthly installment will be the minimum of the following three factors:  
> > > ❖	The requested tenor specified by the customer.  
> > > ❖	The product tenor cap: maximum 60 months for unsecured loans and maximum 360 months for secured loans.  
> > > ❖	The number of months remaining until the borrower reaches the age of 70:  
●  	Impact on the Credit Decision:  
> > > ❖	Far from the age of 70: If the customer is relatively young (e.g., 38 years old), the number of months remaining until age 70 is (70 \- 38)\*12 \= 384 months, which is well beyond the requested tenor. Therefore, age does not constrain the loan tenor.  
> > > ❖	Approaching the age of 70: If the customer is older and the number of months remaining until age 70 is shorter than either the requested tenor or the product's maximum tenor, the actual loan tenor will be capped/reduced accordingly. This results in a higher monthly installment (PMT), which increases the DTI and may move the application into the Reduce Limit or Reject category.

> > > ### **6.2.3.**     **Reading the Result Against Real-World Lines**

Once you have a rough sense of where this case sits, real Vietnamese bank practice generally works within these lines:

●  	Roughly ≤ 70% – comfortably within capacity → Approve.  
●  	Roughly 70–80% – a higher-risk zone → Reduce limit, propose a smaller amount you'd be comfortable approving.  
●  	Roughly \> 80% – considered unsustainable → Reject.

## **6.3. Reduce Limit Sub-Flow and the Anti-Exploit Locking Rule**

Approve and Reject submit immediately and jump straight to the Decision-Consequence Card, where all fields hidden in Section 6 are revealed together. Reduce limit needs one extra system reveal and one player-entered number, so it follows a different, longer sequence.

●  	**Locking rule:** The category tap (Approve/Reduce limit/Reject) is the player’s final, submitted answer the instant it is made. The UI never lets the player go back and pick a different category once a hidden field has been revealed.  
●  	**Why it matters:** This matters most for Reduce limit: once tapped, the player cannot see Adjusted Income and the verification tier and then quietly switch to Approve or Reject. Without this lock, a player could tap Reduce limit purely to “read ahead” before answering – which would defeat the whole point of hiding these fields.  
Once Reduce limit is locked in, the flow continues as follows:

●  	**Step 1 – Reveal:** Adjusted Income (post-verification) and the Income Verification tier used are revealed on screen – the exact Adjusted DTI still stays hidden.  
●  	**Step 2 – Player calculates and enters:** The player works out their own Max installment by hand – Max installment \= 70% × Adjusted Income − Existing obligations – and types that number into the amount field. No PMT or annuity math is asked of the player here, only one multiplication and one subtraction.  
●  	**Step 3 – Input validation:** The entered value must be a positive number and cannot exceed the original Estimated Monthly Installment shown back in Section 3 – Reduce limit can only lower the requested amount, never raise it.  
●  	**Step 4 – System converts to a loan amount:** The system, not the player, converts the entered installment into a total loan amount via Present Value – Max approvable loan \= entered installment × \[1−(1+r)^−n\] ÷ r – using the same r and n already shown for this dossier. The player is never asked to compute this step by hand.  
●  	**Step 5 – Card reveal:** The Card reveals the real Adjusted DTI, the system’s own correct Max installment and Max loan amount, and how the player’s entered figures compare against them.  
Because the player’s Max installment is a hand calculation rather than a system output, grading allows a small tolerance around the system’s own correct figure (e.g. ±5%) instead of requiring an exact match, so the player is not marked wrong purely for reasonable rounding.

# **7\.** 	**Decision Set for This MVP (only 3 of 5 options)**

Because only Capacity (Adjusted DTI) is modeled, only the three decisions it alone can justify are included.

| Decision | In 1C MVP? | Why |
| :---- | :---- | :---- |
| Approve | Yes | Adjusted DTI ≤ 70%. |
| Reduce limit | Yes | Adjusted DTI is 70–80%. Offer the installment/amount that brings DTI back to exactly 70%. |
| Reject | Yes | Adjusted DTI \> 80%. |
| Require more collateral (TSDB) | Deferred | Loan Type only selects tenor/rate parameters – no collateral valuation or LTV is used, so this decision still requires the (unbuilt) Collateral C. |
| Add conditions | Deferred | Requires the Conditions C (macro/market context, monitoring clauses) – not part of this MVP. |

# **8\.** 	**Worked Example – Bùi Văn Long, 38**

## **8.1. Dossier inputs**

| Field | Value |
| :---- | :---- |
| Occupation | Maintenance technician, manufacturing company, 4 years tenure |
| Monthly income | 15,000,000 VND (payroll, verified) |
| Existing debt obligations | 5,500,000 VND/month (2 active consumer loans, both on-time) |
| Age | 38 |
| Loan Type | Unsecured |
| Applicable interest rate | 18%/ year (1.5% / month) |
| Credit history (CIC) | Group 1, clean (display-only) |
| Loan amount requested | 100,000,000 VND |
| Tenor | 24 months |
| Collateral | Unsecured (salary-based) |

## **8.2. Step-by-step calculation**

| Step | Calculation | Formula | Result |
| :---- | :---- | :---- | :---- |
| 1 | Loan Type → Product Parameters | Unsecured → tenor cap 60mo, max age 70, rate 18%/year | r \= 1.5%/mo |
| 2 | Adjusted tenor | Min(24, 60, (70−38)×12=384) | 24 months |
| 3 | New loan monthly installment (PMT) | 100,000,000 × 0.015 ÷ \[1−(1.015)^−24\] | 4,992,410 |
| 4 | Income verification | Salaried, payroll-verified → 100% | Adj. Income 15,000,000 |
| 5 | Adjusted DTI | (5,500,000+4,992,410)/15,000,000 | 69.95% |
| 6 | Classification | 69.95% ≤ 70% | APPROVE (borderline) |

## **8.3. Explanation shown to the player (within claim boundary)**

"Based on Adjusted DTI alone: this applicant's income is fully verified (payroll), and after including the real amortized installment for this loan, total debt service reaches 69.95% of income – just inside the 70% line. There is very little margin here; a slightly larger request, a slightly higher rate, or a shorter tenor would push this into Reduce-limit territory. This classification reflects Capacity only – Character, Capital, Collateral and Conditions are not yet part of this MVP."

# **9\.** 	**Explicitly Out of Scope for This MVP**

●  	Character: No quantified scoring of CIC history beyond a static “Group 1, clean” display field.  
●  	Capital: No net-worth or asset-based adjustment.  
●  	Collateral: Loan Type (Unsecured/Secured) only selects a tenor/rate parameter row – no LTV calculation or asset valuation exists anywhere in this Rulebook. The “Require more collateral” decision remains unavailable.  
●  	Conditions: No macro/market adjustment; the “Add conditions” decision is unavailable.

   
