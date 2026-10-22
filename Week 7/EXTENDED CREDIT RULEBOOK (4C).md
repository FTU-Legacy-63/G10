**The Credit Desk – Credit Appraisal Rulebook**

**4C Extension: Character, Capital, Collateral, Conditions**

**(Owner: Lai Ngoc Linh)**

# **1\.**     **Framework**

| C | Theory | Game | Output |
| :---- | :---- | :---- | :---- |
| Character | Legal documents consistent; CIC history of the borrower (group 2 or worse in 12 months must be explained); 3 or more lenders inquiring in a month triggers a closer check | Current and worst CIC group, inquiries in the last month, document check | Clear / Watch / Block |
| Capital | No rule for an individual’s own capital.  | Reserve cover (liquid assets against monthly debt service), kept as an Assumption | Clear / Watch |
| Collateral | Three requirements: legally owned and undisputed, value can be determined, can be sold on the market | Acceptance test, then LTV on net collateral value (secured loans only) | Accepted / Not accepted; Clear / Shortfall / N/A |
| Conditions | Feasibility of the purpose and loan plan; operating environment; post-disbursement checks on use of funds and collateral | Purpose check, industry outlook and macro flag, covenants | Normal / Adverse / Block |

# **2\.**     **Definitions**

| Term | Definition |
| :---- | :---- |
| CIC debt group | The State Bank debt classification on the credit-bureau report: Group 1 \= current, Group 2 \= needs attention, Group 3 \= substandard, Group 4 \= doubtful, Group 5 \= potential loss. Groups 3 to 5 together are non-performing debt. |
| Current CIC group | The debt group of the applicant’s debts as reported at the time of application. |
| Worst CIC group (12 months) | The highest debt group on the CIC report at any time in the last 12 months, including today. |
| Credit inquiries | The number of lenders that inquired about the applicant on the CIC in the last month. |
| Document check | Consistent, or Forgery signs when the documents show signs of being falsified. Set by the dossier author. A gap between Stated and Verified income is a Warehouse matter, not forgery. |
| Liquid assets | Cash, savings and term deposits are usable within days. Excludes real estate, borrowed money and any asset pledged to this loan. |
| Reserve cover | Liquid assets ÷ (Existing obligations \+ New loan monthly installment), in months of debt service. |
| Net collateral value | Appraised value of the pledged real estate (pre-set in the dossier) minus the outstanding balance of any senior claim on it. |
| LTV | Loan amount being assessed ÷ Net collateral value. |
| Covenant | A condition attached to an approved loan, checked after disbursement. |

*Income, Existing obligations, Loan type, Adjusted tenor, New loan monthly installment, DTI and the Maximum approvable amount keep the definitions in the Capacity Rulebook.*

# **3\.**     **Character**

Inputs: Current CIC group, Worst CIC group (12 months), Credit inquiries (last month), Document check.

| Rating | Condition | Effect | Basis |
| :---- | :---- | :---- | :---- |
| Block | Current CIC group ≥ 2, or Document check \= Forgery signs | Reject | Overdue debt and forged files are rejection reasons |
| Watch | Current group 1 and worst group (12 months) ≥ 2; or credit inquiries ≥ 3 in the last month | Add conditions: the reason is recorded and the approver decides | A group 2 or worse history in 12 months is explained to the approving level; 3 or more inquiries in a month means a closer check for fraud and hidden debts |
| Clear | Worst group \= 1, inquiries \< 3, Document check Consistent | No effect | — |

# **4\.**     **Capital**

**Reserve cover (months) \= Liquid assets ÷ (Existing obligations \+ New loan monthly installment)**

| Rating | Condition | Effect | Basis |
| :---- | :---- | :---- | :---- |
| Clear | Reserve cover ≥ 3 months | No effect | — |
| Watch | Reserve cover \< 3 months | Add conditions | Assumption: a thin buffer leaves little room if income falls  |

*Example: liquid assets 60,000,000; existing obligations 3,000,000; new installment 3,500,000 → 60,000,000 ÷ 6,500,000 \= 9.2 months → Clear. With 10,000,000 the cover is 1.5 months → Watch.*

# **5\.**     **Collateral**

Collateral is tested only when Loan type \= Secured, and only real estate is modelled. For Unsecured loans nothing is tested.

## **5.1. Acceptance test**

Bank accepts a pledged asset only if it meets three requirements: it is legally owned by the person pledging it with no dispute; the bank can determine its value under the rules; and it can be sold on the market when needed. The dossier carries the appraised value, so the valuation requirement is met by its presence. The other two are checked through two author-set fields.

| Field | Value | Effect |
| :---- | :---- | :---- |
| Ownership status | Clear / Disputed or not owned by the pledgor | Disputed → Not accepted |
| Transferability | Transferable / Not transferable | Not transferable → Not accepted |

## **5.2. Net collateral value and LTV**

**Net collateral value \= Appraised value − Outstanding balance of senior claims**

**LTV \= Loan amount being assessed ÷ Net collateral value**

The appraised value is given in the dossier; the player does not appraise. The loan amount assessed is the requested amount, or the reduced amount if the DTI result is Reduce limit. The thesis gives no loan-to-value limit; each bank sets its own.

| Result | Condition | Effect |
| :---- | :---- | :---- |
| Not accepted | Acceptance test fails | Reject |
| Shortfall | LTV \> Max LTV (70%), or Net collateral value ≤ 0 | Decision becomes Require more collateral |
| Clear | Accepted and LTV ≤ Max LTV | No effect |
| N/A | Loan type \= Unsecured | Not tested |

**Additional collateral required \= Loan amount ÷ Max LTV − Net collateral value**

*The borrower can cure a Shortfall by pledging additional collateral of at least that amount, or by accepting a loan reduced to the Maximum loan by collateral.*

# **6\.**     **Conditions**

## **6.1. Purpose and plan check**

Bank requires documents that prove the stated purpose (purchase contract, deposit receipt, construction estimate) and checks that the amount fits the real need. The dossier author sets one field.

| Purpose check | Meaning | Effect |
| :---- | :---- | :---- |
| Feasible | Documents support the purpose and the amount is reasonable for it | No effect |
| Not feasible | Documents are missing or contradict the purpose, or the amount is out of proportion to the need | Reject |

## **6.2. Operating environment**

Inputs: Industry outlook of the applicant’s main income source (Favorable, Neutral or Unfavorable), pre-set in the dossier; and Macro environment (Normal or Stressed), set once per round.

| Rating | Condition | Effect |
| :---- | :---- | :---- |
| Normal | Industry outlook Favorable or Neutral, and Macro Normal | No effect |
| Adverse | Industry outlook Unfavorable, or Macro Stressed | Add conditions: covenants are attached. DTI bands unchanged |

## **6.3. Covenant menu**

The thesis requires checks after disbursement. They become the covenants:

•     **Use of funds:** the borrower provides documents showing the loan was used for the stated purpose.

•     **Collateral re-appraisal:** periodic re-appraisal of the pledged property (Secured loans only).

•     **Income and occupation update:** periodic update of the borrower’s occupation and income.

*Covenants never change the loan amount or the DTI.*

# **7\.**     **Combining the 4Cs with Capacity**

DTI is classified with the Capacity Rulebook bands: Approve up to 70%, Reduce limit between 70% and 80%, Reject above 80%. There is no second set of bands.

## **7.1. Decision precedence**

If more than one trigger applies, the highest row is the headline decision; any lower-row requirement is computed on the amount offered and shown on the Card as a secondary requirement.

| Order | Decision | Trigger | Offer |
| :---- | :---- | :---- | :---- |
| 1 | Reject | Character \= Block; or Collateral not accepted; or Purpose check \= Not feasible; or DTI \> 80% | None |
| 2 | Reduce limit | 70% \< DTI ≤ 80% | Maximum approvable loan amount (Capacity Rulebook) |
| 3 | Require more collateral | Secured, DTI ≤ 70%, and Collateral \= Shortfall | Requested amount, once the additional collateral is pledged  |
| 4 | Add conditions | DTI ≤ 70%, Collateral Clear or N/A, and any of: Character \= Watch; Capital \= Watch; Conditions \= Adverse | Requested amount with the reasons recorded and covenants from Section 8.3 |
| 5 | Approve | None of the above | Requested amount |

*When the headline is Reduce limit, Collateral is tested on the reduced amount, and covenants are attached if any Watch or Adverse signal exists.*

## **7.2. Order of operations**

1\. 	Run Capacity steps 1–3: Loan type and Product Parameters, Adjusted tenor, New loan monthly installment.

2\. 	Rate Character. Block → Reject and stop.

3\. 	Check Purpose. Not feasible → Reject and stop.

4\. 	If Secured, run the collateral acceptance test. Not accepted → Reject and stop.

5\. 	Compute DTI \= (Existing obligations \+ New installment) ÷ Income. Above 80% → Reject and stop. Between 70% and 80% → Reduce limit, with the Maximum approvable loan amount as the amount to assess next.

6\. 	If Secured, compute Net collateral value and LTV on the amount from step 5 and compare with the Max LTV.

7\. 	Rate Capital (Reserve cover) and the operating environment (Conditions).

8\. 	Apply the precedence table in 7.1 to name the decision and produce the Card.

## **7.3. Dossier design rule**

Each dossier has one designed answer. The author builds each case so that only one non-Approve trigger binds. The Card explains the headline decision and lists any secondary requirement.

# **8\.**     **Worked Checks**

| Check | Inputs and calculation | Result |
| :---- | :---- | :---- |
| Character Watch: history, not current | Income 18,000,000; existing obligations 500,000; unsecured 100,000,000 over 36 months at 18%/year → installment 3,615,240; DTI \= 22.9%. Current CIC group 1; worst group in 12 months 2 (one late payment 5 months ago, since cleared). | Add conditions: approve with the reason recorded and covenants. Not a Reject, and the DTI bands do not change |
| Character Block: overdue | Same file, but the debt is currently in CIC group 2\. | Reject |
| Character Watch: inquiries | Same file, CIC clean, but 3 lenders inquired in the last month. | Add conditions: closer check for hidden debts |
| Forgery | Same file, Document check \= Forgery signs. | Reject |
| Collateral not accepted | Secured loan with the pledged property under ownership dispute; DTI 30%. | Reject, whatever the LTV |
| Collateral Shortfall | Income 50,000,000; existing obligations 8,000,000; secured 2,000,000,000 over 240 months at 11%/year → installment 20,643,768; DTI \= 57.3%. Real estate accepted, appraised 2,500,000,000, no senior claim → LTV \= 80% \> 70%. | Require more collateral: additional collateral \= 2,000,000,000 ÷ 0.70 − 2,500,000,000 \= 357,142,857. Reduce limit is not the answer, because DTI is within 70%  |
| Capital Watch | Liquid assets 10,000,000; existing obligations 3,000,000; new installment 3,500,000 → reserve cover \= 1.5 months \< 3\. DTI within 70%. | Add conditions |
| Purpose not feasible | DTI 40%, but the purchase contract does not match the stated purpose. | Reject |
| Conditions Adverse | DTI within 70%, all other Cs Clear, Industry outlook Unfavorable. | Add conditions: approve with covenants |

# **9\.**     **Claim Boundary**

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| Character rating | Classification | Reflects the CIC record, inquiries and document check in the dossier only. Must not be worded as a judgment of the applicant’s worth as a person. |
| Reserve cover and Capital rating | Calculation \+ Classification | Describes the liquid buffer relative to monthly debt service. It is not a statement of net worth. |
| Acceptance test, LTV and Collateral result | Classification \+ Calculation | Based on the facts pre-set in the dossier. It is not a market appraisal and not a guarantee of recovery. |
| Purpose check and Conditions rating | Classification | Based on dossier-level fields and a round-level macro flag. It is not a forecast of the economy. |
| Approve / Reduce limit / Reject / Require more collateral / Add conditions | Classification, NOT Recommendation | States which side of the thresholds the file falls on. Must not use advisory language such as “you should lend”. |

# **10\.**  **Threshold Disclosure**

| Rule or threshold | Value | Source |
| :---- | :---- | :---- |
| Total monthly debt service ≤ income | 70% ceiling | Sourced |
| Reject floor above the ceiling | 80% | Sourced |
| CIC groups 1 to 5; groups 3–5 as non-performing debt | Scale | Sourced |
| Group 2 or worse in the last 12 months must be explained to the approver | 12 months | Sourced |
| 3 or more lenders inquiring in the last month → closer check | 3 inquiries, 1 month | Sourced |
| Forged documents → Reject | Reject | Sourced |
| Overdue debt → Reject | Current group ≥ 2 | Sourced |
| Watch signals lead to Add conditions | Add conditions | Assumption |
| Collateral acceptance: ownership, valuation, transferability | Three requirements | Sourced |
| Collateral not accepted → Reject | Reject | Sourced |
| Purpose or plan not feasible → Reject | Reject | Sourced |
| Covenant menu: use of funds, collateral re-appraisal, income update | Three covenants | Sourced |
| Conditions Adverse: industry outlook or macro | Add conditions | Sourced |
| Max LTV, real estate | 70% | Assumption |
| Senior claims deducted from collateral value | Net collateral value | Sourced |
| Reserve cover threshold | 3 months | Assumption |
| Decision order Reject \> Reduce limit \> Require more collateral \> Add conditions \> Approve | Fixed order | Assumption |

#  

