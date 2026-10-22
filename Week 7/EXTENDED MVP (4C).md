**The Credit Desk – 4C MVP (Character, Capital, Collateral, Conditions)**

**(Owner: Lai Ngoc Linh)**

# **1\.** 	**Why This MVP Adds the 4Cs**

The 1C MVP deferred each of the four Cs because the data was missing. In this MVP the data is authored into each simulated dossier, following what a bank checks in practice, so every C becomes a quantified or rule-based check instead of a display-only field.

| C | What the dossier now carries | What the player does with it |
| :---- | :---- | :---- |
| Character | Current CIC group; worst CIC group in the last 12 months; credit inquiries in the last month; document check (Consistent / Forgery signs) | Rates Character as Clear, Watch or Block |
| Capital | Liquid assets | Computes Reserve cover and rates Capital as Clear or Watch |
| Collateral (Secured loans only) | Collateral type, appraised value, senior claims outstanding, ownership status, transferability | Runs the acceptance test, then computes Net collateral value and LTV and compares with the Max LTV |
| Conditions | Whether the documents support the purpose and amount; industry outlook of the income source; macro environment banner for the round | Checks the purpose, then rates the operating environment as Normal or Adverse |

With all four Cs live, the two decisions deferred in the 1C MVP, Require more collateral and Add conditions, become available, so the player now chooses among all five decisions.

*Every value is simulated and written by the dossier author. The rules follow the 4C Rulebook; where that rulebook marks a rule as an Assumption (Max LTV, 3-month reserve, mapping of Watch signals to Add conditions), this MVP inherits it.*

# **2\.** 	**Full Flow: Input → Process → Output → User Action**

| Stage | What happens |
| :---- | :---- |
| 1\. Input | Player opens a KHCN dossier. The round banner shows the macro environment. The player locates the figures each C needs |
| 2\. Process – Installment | Loan Type → Product Parameters → Adjusted tenor → New loan monthly installment (PMT). The player receives the result as the Estimated Monthly Installment. |
| 3\. Process – Character | Player reads the current CIC group, worst group (12 months), credit inquiries and document check, and rates Character: Clear / Watch / Block. Block → the file is a Reject. |
| 4\. Process – Purpose | Player checks whether the documents support the purpose and the amount. If not → Reject. |
| 5\. Process – Collateral acceptance (Secured only) | Player checks ownership and transferability. If either fails → Reject. |
| 6\. Process – DTI | Player calculates DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income (verified) and places it in a band: Approve ≤ 70%, Reduce limit 70%–80%, Reject \> 80%. The system computes the same value for the Summary Consequence Card. |
| 7\. Process – LTV (Secured only) | Player computes Net collateral value and LTV on the amount from stage 6, and compares LTV with the Max LTV (70%). |
| 8\. Process – Capital and environment | Player computes Reserve cover and rates Capital: Clear / Watch. Player combines Industry outlook and Macro environment and rates Conditions: Normal / Adverse. |
| 9\. Classify (provisional) | Player chooses one of five decisions: Approve / Reduce limit / Require more collateral / Add conditions / Reject. If more than one trigger applies, the highest-order decision is the answer. The choice stays provisional until the round is submitted. |
| 10\. Decision input | Reduce limit, Require more collateral and Add conditions each ask for one more input. Approve and Reject need none. |
| 11\. Save and continue | The dossier is saved with the player’s worksheet, decision and decision input. No feedback is shown. Room used and portfolio state update from the player’s current decisions, and the next dossier opens. |
| 12\. Review | At any time the player can open the round overview and reopen any dossier already opened, to change the worksheet, the decision or the decision input. Dossiers not yet opened stay hidden. |
| 13\. Submit round | When every dossier has a decision, the player submits the round and confirms. All decisions lock. |
| 14\. Output | Summary Consequence Card for the whole round: the portfolio result plus, for each dossier, Classification, Consequence, Explanation and a per-C check, worded within the Claim Boundary. |

# **3\.** 	**Input Layer – What the Player Sees**

Carried over from the 1C MVP:

* Occupation, tenure → profile context (display-only; not used in any formula).  
* Monthly income → the denominator of DTI (use the verified income in the warehouse).  
* Existing debt obligations → part of the numerator of DTI, and part of the denominator of Reserve cover.  
* Age → Adjusted tenor (age-to-70 cap); already reflected in the Estimated Monthly Installment.  
* Loan Type → selects the Product Parameters row, and decides whether Collateral is tested.  
* Loan amount requested, Tenor → already converted into the Estimated Monthly Installment.  
* Loan purpose → context for the purpose check.

Added for the 4Cs:

* **Current CIC group** (1 to 5), **worst CIC group in the last 12 months** (1 to 5), **credit inquiries in the last month** (number of lenders) → Character.  
* **Document check** (Consistent / Forgery signs) → Character. A gap between Stated and Verified income is not forgery; it only changes the DTI, as in the 1C MVP.  
* **Purpose verification** (documents support the purpose and amount: Yes / No) → Conditions.  
* **Liquid assets** → Capital.  
* **Collateral type** (Real estate), **appraised value**, **senior claims outstanding**, **ownership status** (Clear / Disputed), **transferability** (Transferable / Not transferable) → Collateral. Shown for Secured loans only.  
* **Industry outlook** of the income source (Favorable / Neutral / Unfavorable) → Conditions.  
* **Macro environment** (Normal / Stressed) → Conditions. Shown as a banner for the whole round.

  # **4\.** 	**Process Layer – Step by Step**

  ## **4.1. Steps 1–3 – Product Parameters, Adjusted Tenor, Installment**

Unchanged from the 1C MVP and run behind the scenes. Unsecured: tenor cap 60 months, max age 70, 18%/year. Secured: tenor cap 360 months, max age 70, 11%/year.

## **4.2. Step 4 – Character**

* **Block:** current CIC group ≥ 2 (debt currently overdue), or document check \= Forgery signs → Reject.  
* **Watch:** current group 1 and worst group in 12 months ≥ 2; or credit inquiries ≥ 3 in the last month → Add conditions.  
* **Clear:** worst group \= 1, inquiries \< 3, documents Consistent.

  ## **4.3. Step 5 – Purpose**

If the documents do not support the purpose or the amount, the purpose is not feasible → Reject.

## **4.4. Step 6 – Collateral acceptance (Secured only)**

The pledged real estate is accepted only if it is legally owned with no dispute and can be sold on the market. Disputed ownership or not transferable → Not accepted → Reject.

## **4.5. Step 7 – DTI**

DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income (verified). There is one set of bands.

| Band | Approve | Reduce limit | Reject |
| :---- | :---- | :---- | :---- |
| DTI | ≤ 70% | 70% \< DTI ≤ 80% | \> 80% |

Maximum approvable installment \= 70% × Income − Existing obligations; the Maximum approvable loan is its Present Value over the Adjusted tenor.

## **4.6. Step 8 – LTV (Secured only)**

* Net collateral value \= Appraised value − Senior claims outstanding.  
* LTV \= Loan amount being assessed ÷ Net collateral value. The amount assessed is the requested amount, or the Maximum approvable loan if the DTI result is Reduce limit.  
* Max LTV for real estate: 70%. LTV ≤ 70% → Clear. LTV \> 70%, or Net collateral value ≤ 0 → Shortfall.

  ## **4.7. Step 9 – Capital and Conditions**

* **Capital:** Reserve cover \= Liquid assets ÷ (Existing obligations \+ Estimated Monthly Installment). ≥ 3 months → Clear. \< 3 months → Watch → Add conditions.  
* **Conditions:** Industry outlook Unfavorable or Macro Stressed → Adverse → Add conditions. Otherwise Normal.

  ## **4.8. Step 10 – Decision precedence**

| Order | Decision | Trigger |
| :---- | :---- | :---- |
| 1 | Reject | Character \= Block, or purpose not feasible, or Collateral not accepted, or DTI \> 80% |
| 2 | Reduce limit | 70% \< DTI ≤ 80% |
| 3 | Require more collateral | Secured, DTI ≤ 70%, and Collateral \= Shortfall |
| 4 | Add conditions | DTI ≤ 70%, Collateral Clear or N/A, and any of: Character \= Watch, Capital \= Watch, Conditions \= Adverse |
| 5 | Approve | None of the above |

  # **5\.** 	**Output Layer – Summary Consequence Card**

No Card appears after an individual dossier. The only Card is one Summary Consequence Card, shown after the player submits the round. It must stay inside the Claim Boundary of the 4C Rulebook – a Classification, not a Recommendation. It is where everything hidden in Section 6 is revealed.

* **Portfolio result:** room used against room total, portfolio risk, and the scorecard measures (decision accuracy, portfolio risk, room efficiency), as defined in the scorecard design.  
* **Portfolio consequence:** what the combination of the player’s decisions did to room and portfolio risk (e.g. “two approvals on files whose correct answer was Reduce limit used room on loans above the 70% DTI ceiling”), not phrased as advice.  
* **Per dossier – Classification:** the correct decision next to the player’s final decision.  
* **Per dossier – Consequence:** what happens if the player’s decision is taken on this applicant (e.g. “lending here with 80% LTV leaves the lender with a thin cushion if the property must be sold”).  
* **Per dossier – Explanation:** the numbers behind the classification – DTI, Reserve cover, LTV and the ratings – mapped back to the relevant C, not phrased as financial advice.  
* **Per dossier – 4C check:** for each C, the player’s rating and numbers next to the correct ones, with any secondary requirement (for example extra collateral needed on top of a Reduce limit) and the conditions attached.

  # **6\.** 	**UI Visibility – What the Player Sees vs What Stays Hidden**

Every figure needed for the assessment is already in the dossier. The player’s task is to find the right figures, apply the rules taught in the tutorial, work through a short worksheet, and choose a decision. The system’s own ratings and numbers appear only on the Summary Consequence Card at the end of the round, for comparison.

| Field | Visibility | Why |
| :---- | :---- | :---- |
| Name, age, occupation, tenure | Visible | Personal profile – context for the case |
| Monthly income, Existing debt obligations | Visible | Raw financial inputs the player reasons from |
| Verified income (Warehouse) | Visible via Warehouse | As in the 1C MVP: verified income is in the warehouse, not on the dossier screen |
| Loan Type, interest rate, tenor, loan amount, loan purpose | Visible | The request being evaluated |
| Estimated Monthly Installment | Visible – pre-computed, no label | Given as a bare number so the player never hand-computes an annuity |
| Current CIC group, worst CIC group (12 months), credit inquiries, document check | Visible | Raw facts for Character; the rating itself is the player’s job |
| Purpose verification | Visible | Raw fact for the purpose check |
| Liquid assets | Visible | Raw input for Capital |
| Collateral type, appraised value, senior claims, ownership status, transferability | Visible (Secured only) | Raw inputs for Collateral |
| Industry outlook; Macro environment banner | Visible | Raw inputs for Conditions; the banner is the same for every dossier in the round |
| Character, Capital, Conditions ratings; Reserve cover; acceptance result; Net collateral value; LTV; DTI | Not shown – the player works them out on the worksheet | These are the player’s task; the system’s values appear on the Summary Card |
| Round overview: dossiers opened, the player’s current decision on each, room used and room total | Visible | Built only from the player’s own entries, so it reveals nothing about the answers; it makes review possible |
| Correct decision, correct ratings, conditions attached | Hidden until the round is submitted | The answer key, revealed only on the Summary Consequence Card |

## **6.1. Design Principle: Teach the Real Rules, Let the Player Apply Them**

The thresholds (70%/80% DTI lines, 3-month reserve, 70% Max LTV, CIC groups) are taught openly on the “How Assessment Works” screen, because they are the rules a credit officer works with. Nothing about a particular dossier is hidden that the player needs; the difficulty is locating the right figures, choosing the right rule and doing short calculations (one division for Reserve cover, one subtraction and one division for LTV, one sum and one division for DTI).

Nothing about correctness is revealed until the round is submitted: not after a dossier, and not during review. Because there is no feedback to exploit, a decision is provisional and the player may revise it as often as they like; the lock moves from each decision to the submission of the round (Section 6.4). The worksheet is filled before the decision and locks together with the decisions, so the Summary Card compares the player’s final entries with the system’s. The worksheet holds the Character rating, the purpose result, the acceptance result and Collateral result (Secured only), Net collateral value, LTV, Reserve cover and Capital rating, the Conditions rating, and DTI. In this MVP the worksheet gives feedback only and does not change the decision score; how it feeds the scorecard is left to the scorecard design.

## **6.2. “How Assessment Works” (Tutorial / Help)**

*A dedicated screen, shown once during onboarding and reachable anytime via a “?” icon.*

> > > ## **6.2.1.**     **Carried over from the 1C MVP**

Age & Loan Term, How the Monthly Installment Is Calculated, and Verifying Income Before You Calculate are unchanged.

> > > ## **6.2.2.**     **Rating Character**

* A debt that is overdue right now (current CIC group 2 or worse), or documents that show signs of forgery → Block: the loan cannot be approved whatever the income.  
* A clean record today but a group 2 or worse in the last 12 months → Watch. A real bank records the reason and the approving level decides; here the file can be approved only with conditions.  
* Three or more lenders asking about the applicant in the last month → Watch: the bank checks closely for fraud and for debts not yet on the CIC.  
* Worst group 1, fewer than three inquiries, documents Consistent → Clear.

  ## **6.2.3.**     **Checking the Purpose and the Collateral**

Documents must support what the loan is for and how much is needed; if they do not, the file is rejected. For Secured loans the property must be legally owned by the person pledging it with no dispute, and it must be sellable on the market. Failing either is a Reject, whatever the LTV.

> > > ## **6.2.4.**     **Rating Capital**

Reserve cover \= Liquid assets ÷ (Existing obligations \+ Estimated Monthly Installment). Example: liquid assets 60,000,000 and monthly debt service of 3,000,000 \+ 3,500,000 \= 6,500,000 → 9.2 months. Three months or more is Clear; less than three is Watch. Do not count the pledged asset as liquid assets.

> > > ## **6.2.5.**     **Rating Conditions**

Industry outlook Unfavorable, or a Stressed macro banner, makes the environment Adverse. Adverse means conditions will be attached to the loan; it does not change the DTI lines.

> > > ## **6.2.6.**     **Reading DTI**

Compute DTI and place it against the lines: up to 70% Approve zone, 70% to 80% Reduce limit zone, above 80% Reject. The lines are the same for every file; risk signals never move them.

> > > ## **6.2.7.**     **Collateral: Net Value, LTV and Max LTV**

Net collateral value \= Appraised value − Senior claims outstanding, because an earlier lender is paid first. LTV \= Loan amount ÷ Net collateral value. Compare with the Max LTV of 70% for real estate. A shortfall is fixed only by pledging more collateral; Reduce limit is for DTI alone and is never the answer to a collateral shortfall. Unsecured loans have no collateral test.

> > > ## **6.2.8.**     **Picking the Decision**

Go down the list in order and stop at the first that applies: Reject, Reduce limit, Require more collateral, Add conditions, Approve.

## **6.3. Decision Inputs**

Each decision input belongs to its decision. If the player changes the decision during review, the input of the previous decision is cleared.

> > > ## **6.3.1.**     **Reduce limit**

* **Step 1 – Player calculates and enters:** Max installment \= 70% × Income − Existing obligations, typed into the amount field.  
* **Step 2 – Validation:** a positive number, not above the original Estimated Monthly Installment.  
* **Step 3 – System converts:** the entered installment becomes a loan amount via Present Value, using the dossier’s r and n.  
* **Step 4 – Summary Card (after the round is submitted):** shows the system’s Max installment and Max loan beside the player’s final figures, graded within ±5%.

  ## **6.3.2.**     **Require more collateral**

* **Step 1 – Player calculates and enters:** Additional collateral \= Loan amount ÷ Max LTV − Net collateral value.  
* **Step 2 – Validation:** a positive number, not above Loan amount ÷ Max LTV.  
* **Step 3 – System rounds:** the system rounds its own figure up to the nearest 1,000,000 VND for comparison.  
* **Step 4 – Summary Card:** shows the system’s figure and the player’s final figure, graded within ±5%.

  ## **6.3.3.**     **Add conditions**

* **Step 1 – Player selects:** at least one condition from the menu: documents showing the loan was used for its purpose; periodic re-appraisal of the collateral (Secured only); periodic update of the borrower’s occupation and income.  
* **Step 2 – Summary Card:** shows the conditions the system attaches and the reason (a Watch signal or an Adverse environment). The choice is feedback only; it is not scored because the rulebook does not prescribe which condition fits which case.

*Because these inputs are hand calculations, grading allows a tolerance of about ±5% around the system’s figure so the player is not marked wrong for rounding.*

## **6.4. Review and Submit**

* **Round overview:** a list of the dossiers the player has opened, with the player’s current decision on each and the room used. It is built only from the player’s entries and shows no correctness.  
* **Review scope:** the player can reopen any dossier already opened and change the worksheet, the decision or the decision input. Dossiers not yet opened stay hidden until reached in order, so the one-at-a-time flow is unchanged and there is no preview of upcoming dossiers.  
* **During review:** no ticks, marks or hints of right or wrong. Input validation (Section 6.3) still applies, and checks only that an input is allowed, not that it is correct.  
* **Room:** room used is recalculated from the player’s current decisions, so revising a decision can free or use room.  
* **Submit:** enabled when every dossier has a decision and a complete decision input. A confirmation states that decisions cannot be changed afterwards. On confirmation all worksheets, decisions and decision inputs lock and the Summary Consequence Card opens.

  # **7\.** 	**Decision Set for This MVP (5 of 5 options)**

| Order | Decision | In 4C MVP? | Why |
| :---- | :---- | :---- | :---- |
| 1 | Reject | Yes | Character \= Block, purpose not feasible, collateral not accepted, or DTI \> 80%. |
| 2 | Reduce limit | Yes | DTI between 70% and 80%. Offer the amount that brings DTI back to 70%. |
| 3 | Require more collateral | Yes | Now live: Collateral C gives the LTV test for Secured loans. A shortfall is cured only by more collateral, never by Reduce limit.  |
| 4 | Add conditions | Yes | Now live: a Watch signal (Character, Capital) or an Adverse environment attaches conditions. |
| 5 | Approve | Yes | DTI ≤ 70% and no other trigger. |

Dossier design rule: each dossier has one designed answer. The author builds each case so that only one non-Approve trigger binds. If two triggers do bind, the highest-order one is the answer and the other is shown on the Summary Card as a secondary requirement.

