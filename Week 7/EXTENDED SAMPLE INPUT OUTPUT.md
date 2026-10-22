## **SAMPLE INPUT OUTPUT**

## **I. INPUT DICTIONARY**

### **Definitions**

| Term | Definition |
| ----- | ----- |
| Income | The applicant's total monthly cash inflow from any source |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| Loan type | Unsecured or secured. A classification label only, used to select which row of the Product Parameters table (tenor cap, maximum age, interest rate) applies. Collateral is tested only when the loan is Secured. |
| DTI | (Existing obligations \+ New loan monthly installment) ÷ Income. This is the Capacity gate. |
| Liquid assets | Cash, savings and term deposits are usable within days. Excludes real estate, borrowed money and any asset pledged to this loan. |
| Reserve cover | Liquid assets ÷ (Existing obligations \+ New loan monthly installment), in months of debt service. |
| Net collateral value | Appraised value of the pledged real estate minus the outstanding balance of any senior claim on it (Secured loans only). |
| LTV | Loan amount being assessed ÷ Net collateral value (Secured loans only). |
| Covenant | A condition attached to an approved loan, checked after disbursement. |

### **Group A – Applicant Profile (dossier state, shown to player)**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Age | Applicant age in years | Integer | Team-authored | Adjusted tenor (age-to-70 cap) |
| Occupation | Free-text description of job/business \+ tenure \+ surrounding narrative detail | Text | Team-authored | Display-only / narrative context — not used in any formula |
| Income | Applicant's total monthly cash inflow. Often not a single stated number, the player may need to combine parts (e.g. base pay \+ averaged commission) or net turnover against costs to arrive at it | Number (VND/month) | Team-authored; income figures cross-checked against public salary-survey/salary-guide sites, a teacher pay-scale circular, a Social Insurance pension-calculation rule, and a furniture-industry margin article (1–2 sources per case). | DTI denominator |
| Existing obligations (self declared) | What the applicant states on the dossier screen before any check. | Number (VND/month) | Team-authored | Displayed to player only — not used in the answer-key calculation |
| Existing obligations (CIC verified) | Revealed only after the player taps "Check CIC." May equal the self-declared figure or be higher | Number (VND/month) | Team-authored | This is the figure actually used in DTI numerator, Max approvable installment and the Reserve cover denominator |
| Employment tenure | Time with current employer / time in current line of work | Number (years) | Team-authored | Display-only / narrative context, not used in any formula |
| Current CIC group | Debt group of the applicant's debts as reported today (1 to 5\) | Integer | Team-authored | Character rating (≥ 2 → Block) |
| Worst CIC group (12 months) | Highest debt group on the CIC report at any time in the last 12 months, including today | Integer | Team-authored | Character rating (current 1 and worst ≥ 2 → Watch) |
| Credit inquiries (last month) | Number of lenders that inquired about the applicant on the CIC in the last month | Integer | Team-authored | Character rating (≥ 3 → Watch) |
| Document check | Consistent / Forgery signs. A gap between Stated and Verified income is not forgery | Enum | Team-authored | Character rating (Forgery signs → Block) |
| Liquid assets | Cash, savings and term deposits usable within days, after the applicant's own contribution is taken out | Number (VND) | Team-authored (simulation assumption) | Reserve cover → Capital rating |
| Industry outlook | Bank's outlook for the sector of the applicant's main income source (Favorable / Neutral / Unfavorable), shown as a bank sector note | Enum | Team-authored (simulation assumption) | Conditions rating |

**Group B – Loan Request**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Requested amount | Loan principal requested | Number (VND) | Team-authored | New loan monthly installment (PMT); compared against the Decision Bands via DTI |
| Requested term | Repayment period in months | Integer | Team-authored | Adjusted tenor (subject to product cap and age cap) → PMT |
| Loan type | {unsecured, secured} | Enum | Team-authored | Product Parameters lookup: tenor cap, max age, interest rate; decides whether Collateral is tested |
| Loan purpose | {house\_purchase, car\_purchase, business\_expansion} | Enum | Team-authored | Context for the purpose check |
| Purpose verification | Whether the documents in the file support the purpose and the amount (Yes / No) | Enum | Team-authored | Purpose check (No → Reject) |
| Collateral | Collateral type (real estate), appraised value, senior claims outstanding, ownership status, transferability. Shown for Secured loans only; none for an Unsecured loan | Structured fields | Team-authored | Acceptance test, Net collateral value, LTV (Secured only) |

### **Group C – Room State**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Room (total) | Total credit room for the period | Number (VND) | Team-set per round | Room-efficiency score |
| Room (used) | Cumulative approved amount in round | Number (VND) | System state | Remaining capacity |
| Macro environment | Normal / Stressed, one banner for the whole round | Enum | Team-set per round | Conditions rating (Stressed → Adverse) |

### **Group D – Derived Variables**

| Variable | Formula | Notes |
| ----- | ----- | ----- |
| Adjusted tenor | min(requested\_term, product tenor cap, (max age at maturity − age) × 12\) | Unsecured \= 60mo / age 70; Secured \= 360mo / age 70 |
| New loan monthly installment (PMT) | requested\_amount × r ÷ \[1 − (1+r)⁻ⁿ\], r \= product interest rate ÷ 12, n \= adjusted\_tenor | Shown to the player as "Estimated Monthly Installment" — pre-computed, no label revealing the verdict |
| Character rating | Block: current group ≥ 2, or Forgery signs. Watch: current group 1 and worst group ≥ 2, or inquiries ≥ 3\. Clear: worst group 1, inquiries \< 3, documents Consistent | Block → Reject; Watch → Add conditions |
| Purpose result | Feasible / Not feasible, from Purpose verification | Not feasible → Reject |
| Collateral acceptance (Secured only) | Ownership Clear and Transferable → Accepted; otherwise Not accepted | Not accepted → Reject |
| DTI | (existing\_obligations\_cic\_verified \+ new\_loan\_monthly\_installment) ÷ income | The Capacity gate. Income, existing\_obligations\_cic\_verified and the installment are all visible from the start; the player is expected to calculate this themselves to pick a category, and the system independently computes the same value for the Card |
| Decision band | ≤ 70% → Approve zone; 70–80% → Reduce limit; \> 80% → Reject | Fixed, universal lines; risk signals never move them |
| Max approvable installment (Reduce-limit path only) | 70% × income − existing\_obligations\_cic\_verified | The figure the player hand-calculates (Group E) |
| Max approvable loan (Reduce-limit path only) | max\_approvable\_installment × \[1 − (1+r)⁻ⁿ\] ÷ r | Present Value conversion; system-computed. This is the amount assessed for LTV on a Reduce limit file |
| Net collateral value (Secured only) | appraised value − senior claims outstanding | N/A for Unsecured |
| LTV (Secured only) | loan amount assessed ÷ net collateral value | Max LTV 70%; above 70%, or net value ≤ 0 → Shortfall |
| Reserve cover | liquid\_assets ÷ (existing\_obligations\_cic\_verified \+ new\_loan\_monthly\_installment) | ≥ 3 months → Clear; \< 3 → Watch → Add conditions |
| Conditions rating | Adverse if Industry outlook Unfavorable or Macro Stressed; otherwise Normal | Adverse → Add conditions |
| Decision precedence | Reject \> Reduce limit \> Require more collateral \> Add conditions \> Approve | The highest-order trigger is the answer; lower-order signals are shown on the Card as secondary requirements |

### **Group E – Player Input**

| Variable | Meaning |
| ----- | ----- |
| Decision | approve / reduce\_limit / require\_more\_collateral / add\_conditions / reject, chosen after the player has rated the Cs on the worksheet, calculated DTI \= (existing\_obligations\_cic\_verified \+ installment) ÷ income themselves and compared it to the 70%/80% lines. The choice is provisional until the round is submitted |
| Player-entered max installment | Reduce-limit path only. The player's own hand calculation of max\_approvable\_installment. Must be positive and ≤ the original Estimated Monthly Installment |
| Player-entered additional collateral | Require-more-collateral path only. Additional collateral \= Loan amount ÷ Max LTV − Net collateral value. Must be positive and ≤ Loan amount ÷ Max LTV |
| Player-selected covenants | Add-conditions path only. At least one of: use of funds; collateral re-appraisal (Secured only); income and occupation update. Feedback only, not scored |

**Sequencing:**

1. **Approve / Reject:** the choice needs no further input. Nothing about correctness is shown until the round is submitted; the Decision-Consequence Card then reveals the system's own DTI, ratings and the correct classification for comparison against the player's choice.  
2. **Reduce limit:** the choice asks for one more input. No new field is revealed — income and existing\_obligations\_cic\_verified were already visible on the dossier screen. The player calculates player\_entered\_max\_installment by hand and enters it; the system converts it to a loan amount via Present Value; the Card then reveals the system's own DTI, the correct max\_approvable\_installment and max\_approvable\_loan, and grades the player's entry with a ±5% tolerance rather than an exact match. Any Watch or Adverse signal on the file is shown as a secondary requirement (covenants).  
3. **Require more collateral / Add conditions:** Require more collateral asks for the additional-collateral figure (graded within ±5%); Add conditions asks for a covenant selection (feedback only).

## **II. SOURCE USE MAP**

| Source | Supports |
| ----- | ----- |
| VN credit-officer job postings | PROBLEM claim only — the Five Cs of Credit as the general framework motivating this project |
| Credit Appraisal Rulebook | DTI formula, Loan Type → Product Parameters, age-based tenor cap, 70%/80% decision bands, Threshold Disclosure |
| 4C Extension Rulebook | Character, Capital, Collateral and Conditions rules; decision precedence; covenant menu; Claim Boundary. Rules marked Assumption (Max LTV 70%, 3-month reserve cover, Watch → Add conditions) are inherited as Assumptions |
| Finance-expert feedback (interview) | 70%/80% DTI decision bands; the age-to-70 tenor-cap mechanism, adapted from a real-estate-loan example the expert gave; Product Parameters (tenor cap, max age, interest rate) by Loan Type |
| Team-authored dossiers | Scenario content; the self-declared vs. CIC-verified existing-obligations mechanic; CIC group history, inquiries, liquid assets, purpose documents and sector outlook (simulation values written by the dossier author) |
| Public salary, pension and expenses references | Cross-checking the income figures used in the DTI calculation for dossiers |

## **III. SAMPLE INPUT / OUTPUT**

1. **Player-visible dossier**

> Trần Phương Anh is 35 years old, married, and lives in Bắc Ninh with her husband, an AI engineer, their four-year-old son, and her mother-in-law, who looks after the boy during the week. The boy attends a private bilingual kindergarten, the family takes one trip abroad each year, and Phương Anh describes the household as "comfortable but careful". Spending on groceries, utilities, kindergarten fees and petrol runs to about 22 million VND a month. The family apartment is registered in the joint names of Phương Anh and her husband.

> Phương Anh says she has worked for seven years at a Korean-owned electronics manufacturer in an industrial park in Bắc Ninh and is now its HR manager, on a permanent contract. She states her salary is 38 million VND a month. The company also gives her an annual health check-up and a team-building trip, which she says she values more than a bonus. *Bank sector note: Phương Anh's income comes from the electronics manufacturing sector, which the bank rates as having a favorable outlook; exports from Bắc Ninh grew by close to 40% in the first nine months of 2026\.*

> Two years ago she took a bank loan to fit out and furnish the apartment and says she has repaid 10 million VND a month ever since, without a missed payment. She says she has no other debts and no credit cards.

> She now wants to buy a mid-size SUV. The dealer's proforma invoice shows a price of 900 million VND, and she has already paid a 50 million deposit from her own account. She will put in 400 million VND of savings and asks the bank for 500,000,000 VND over 60 months as an unsecured personal loan. She does not want to pledge the apartment or any other asset, and no lien would be registered on the car. Besides the 400 million, she keeps 85 million VND in a savings account and a 50 million VND term deposit, both in her own name.

> *Branch note: the originals of her ID, labour contract and payslips match the copies in the file and each other.*

> *Bank system note — estimated monthly installment for this request: 12,696,714 VND.* *Bank system note — income figures above are as declared by the applicant and have not been verified.*

2. **Dossier summary**

| Field | Value |
| ----- | ----- |
| Case ID | KHCN-01 |
| Age | 35 |
| Occupation (player-facing) | HR manager at a Korean-owned electronics manufacturer in Bắc Ninh; seven years with the employer; permanent contract |
| Income (declared) | 38,000,000 VND/month |
| Income (verified in Warehouse) | 36,000,000 VND/month — employer payroll confirms this amount in each of the last 12 months, with no separate bonus or allowance |
| Existing obligations (self-declared) | 10,000,000 VND/month for the apartment fit-out/furnishing loan |
| CIC status | Current group 1; worst group in the last 12 months 1; two inquiries in the last month (this bank and another bank nine days ago); one older inquiry from a card issuer six weeks ago |
| Existing obligations (CIC-verified) | 10,000,000 VND/month; one active bank installment loan, on time, with no other debts on record |
| Loan type | Unsecured — no property or vehicle pledged |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 500,000,000 VND |
| Requested term | 60 months |
| Loan purpose | Purchase of a mid-size SUV |
| Vehicle price / own contribution | Proforma invoice: 900,000,000 VND; dossier states 400,000,000 VND own contribution and 500,000,000 VND requested from the bank |
| Collateral | None; no lien would be registered on the car |
| Liquid assets after own contribution | 85,000,000 VND savings account \+ 50,000,000 VND term deposit \= 135,000,000 VND |
| Household spending | Approximately 22,000,000 VND/month; not counted as debt obligations in DTI |
| Estimated Monthly Installment (shown to player) | 12,696,714 VND/month |

**Revealed via "Check CIC":** Current CIC group 1; worst group in the last 12 months 1; two credit inquiries in the last month; one active bank installment loan at 10,000,000 VND/month, paid on time. The card issuer's inquiry was six weeks ago, so it is outside the one-month inquiry window. No other debts are recorded.

3. **Step-by-step calculation**

| Step | Calculation | Result |
| ----- | ----- | ----- |
| Income | Use the employer's verified payroll figure, not the applicant's stated 38,000,000 VND/month | **36,000,000 VND/month** |
| Loan Type → Product Parameters | Unsecured → tenor cap 60 months, max age 70, rate 18%/year | r \= 1.5% per month |
| Adjusted tenor | min(requested 60, product cap 60, (70 − 35\) × 12 \= 420\) | **60 months** |
| New loan monthly installment (PMT) | 500,000,000 × 0.015 ÷ $[1-(1.015{)}^{-60}]$ | **12,696,714 VND/month** |
| Existing obligations (CIC-verified) | One active bank installment loan | **10,000,000 VND/month** |
| DTI | (10,000,000 \+ 12,696,714) ÷ 36,000,000 | **63.05%** |
| Capacity classification | DTI ≤ 70% | **Pass — Approve zone** |
| Character | Current group 1; worst group 1; two inquiries within the last month; documents consistent | **Clear** |
| Purpose | Car invoice is 900,000,000 VND; author-side key treats 400,000,000 own contribution \+ 500,000,000 loan as matching the documented price | **Feasible** |
| Collateral | Unsecured request; no asset pledged | **Not applicable** |
| Capital / reserve cover | Liquid assets 135,000,000 ÷ (10,000,000 \+ 12,696,714) | **5.95 months — Clear** |
| Conditions | Electronics manufacturing sector rated favorable; macro environment Normal | **Normal** |
| Final decision | No decision trigger is activated | **APPROVE** |

4. **Decision walkthrough**  
1. Player reads the dossier and notes the estimated installment of **12,696,714 VND/month**.  
2. Player taps **Check CIC** and updates existing obligations to **10,000,000 VND/month**. The CIC also shows current group 1, worst group 1, two inquiries in the last month, and no other debts.  
3. Player uses verified income of **36,000,000 VND/month** from the Warehouse and calculates DTI: ((10,000,000 \+ 12,696,714) ÷ 36,000,000 \= 63.05%).  
4. Since DTI is at or below 70%, Capacity passes. Character is Clear, the purchase purpose is feasible, collateral is not applicable to an unsecured loan, Capital is Clear with 5.95 months of reserve cover, and Conditions are Normal.  
5. The player selects **Approve**. No additional conditions or collateral are required for this case.

### **Correct Decision: Approve — 500,000,000 VND over 60 months**

5. **Decision-Consequence Card**

**Correct figures:**

* **Income:** 36,000,000 VND/month, her verified salary from the employer's payroll file. She stated 38,000,000, so the verified figure is 2 million lower. Her husband's salary is not counted, because he is not a borrower on this loan.  
* **Existing obligations (CIC):** 10,000,000 VND/month for the bank installment loan, which matches what she declared.  
* **New loan:** The loan is unsecured, so the unsecured parameters apply (18% a year, up to 60 months). The requested 60 months fits within the cap, and her age does not shorten it. The installment is 12,696,714 VND/month.  
* **DTI:** **63.05%**, below the 70% line.  
* **Other Cs:** Character is Clear: only 2 inquiries fall inside the last month, one fewer than the 3 that would trigger a closer check, and her documents are consistent. Capital is Clear: liquid assets of 135,000,000 cover 5.95 months of debt service. Conditions are Normal: she works in the electronics manufacturing sector, which the bank rates as having a favorable outlook, and the macro environment is Normal.

**Consequence:** The 500,000,000 VND loan goes ahead as a plain approval, with no covenants attached. After paying her existing loan and the new installment, Phương Anh still has about 13 million VND a month (roughly 37% of her income) for the rest of her spending, and her liquid assets would cover close to six months of debt service if her income were ever interrupted.

**Explanation:** This is a clean Approve because every check comes back inside its line. Her income is a fixed monthly salary, confirmed by the employer's payroll file for twelve consecutive months, so it can be counted in full. The verified salary is 2 million lower than the one she stated, so the correct DTI is 63.05% rather than 59.7%. The decision is the same either way, but the figure is not, which is why income should always be checked against the Warehouse even when the verdict does not change.

The CIC record also needs careful reading. It shows two inquiries in the last month: this bank, and one other bank nine days ago for a car-loan quote. A third inquiry, from a card issuer, is six weeks old and falls outside the one-month window. Two inquiries are below the threshold, and the car-loan quote fits the purchase she is asking about, so there is nothing to investigate. If your DTI came out near 29%, you most likely added her husband's salary. He is not a borrower on this loan, so his income is not counted.

**Key takeaway:** Count only the verified income of the borrower, and count inquiries only inside the one-month window. A file in which no rule is triggered is a real answer too: the correct decision is then Approve.