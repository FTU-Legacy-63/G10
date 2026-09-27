**The Credit Desk – Credit Appraisal Rulebook**

# **1\.** 	**Definitions**

| Term | Precise definition |
| :---- | :---- |
| Income | The applicant's total monthly cash inflow from any source (e.g. salary, business/trading revenue net of operating costs, rental income, or other regular receipts). This raw figure is then adjusted for verification reliability before entering the DTI formula. |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| Loan type | Unsecured or secured. A classification label only, used to select which row of the Product Parameters table (tenor cap, maximum age, interest rate) applies – it does not enter the DTI formula itself and does not change the DTI decision bands |

# **2\.** 	**Adjusted DTI Formula**

# **2.1. Income Verification Adjustment**

Raw income is discounted before use, based on how reliably it can be verified.

| Tier | Condition | % of income counted | Justification |
| :---- | :---- | :---- | :---- |
| Verified | Confirmed via payslip, employer certification, or bank statement showing regular deposits | 100% | Documented, traceable income carries low risk of overstatement |
| Cash-based/ unverified | Income received in cash or otherwise not traceable through bank records (e.g. informal trading, unbanked business revenue) | 30–40% (this Rulebook uses 30% unless a case justifies otherwise) | Unverifiable income carries real risk of overstatement or sudden discontinuity, so banks conservatively discount it |

## **2.2. Existing Obligations**

Used as-is (Section 1). No adjustment factor is applied to this figure.

## **2.3. Loan Term (Tenor) Adjustment by Age**

Tenor is capped so the loan matures before the applicant reaches a maximum age for this product. This does not change the credit limit directly – it shortens the tenor used to compute the installment, which raises the installment and therefore the DTI.

**Adjusted tenor \= minimum of: the requested tenor, the product's maximum tenor, and (Maximum age at maturity − current age) × 12\.**

*Example from the finance-expert feedback: for a real-estate loan (product maximum tenor 360 months, maximum age at maturity 70), a 60-year-old applicant is capped at (70−60)×12 \= 120 months, regardless of the requested tenor. This Rulebook applies the same mechanism to whichever product the applicant's loan belongs to, using the maximum age, maximum tenor and interest rate from the Product Parameters table below.*

## **2.4. Product Parameters by Loan Type**

| Product type | Max tenor | Max age at maturity | Interest rate | DTI approve ceiling | DTI reject floor |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Unsecured | 60 months | 70 | 18%/ year | 70% | 80% |
| Secured | 360 months | 70 | 11%/ year | 70% | 80% |

## **2.5. New Loan Monthly Installment**

Computed with the standard loan amortization (annuity) formula, using the applicable monthly interest rate – not a straight-line approximation. This is the same formula real lenders use to generate a repayment schedule.

**New loan monthly installment \= P × r ÷ \[1 − (1+r)^−n\]**

where P \= Loan amount requested, r \= applicable monthly interest rate (annual rate ÷ 12), and n \= Adjusted tenor (months).

## **2.6. Adjusted DTI**

**Adjusted DTI \= (Existing obligations \+ New loan monthly installment) ÷ Adjusted Income**

where Adjusted Income \= Income × verification percentage.

# **3\.** 	**Decision Bands**

   
   
   
 

| Adjusted DTI | Decision | Meaning |
| :---- | :---- | :---- |
| ≤ 70% | Approve | The requested installment fits comfortably within the applicant's repayment capacity at this DTI level. |
| 70% – 80% | Reduce limit | The request pushes DTI into a higher-risk zone. Offer the maximum installment/amount that brings DTI back to exactly 70% instead of the full request. |
| \> 80% | Reject | Debt service at this level is considered unsustainable relative to income, even after verification and tenor adjustments. |

**Maximum approvable installment \= 70% × Adjusted Income − Existing obligations.**

**Maximum approvable loan amount \= the Present Value of that maximum installment, paid monthly over the Adjusted tenor, at the applicable interest rate:**

**Maximum approvable loan amount \= Maximum approvable installment × \[1 − (1+r)^−n\] ÷ r**

# **4\.** 	**Order of Operations**

1\. Determine the Loan Type (Unsecured / Secured) and look up its tenor cap, maximum age, and interest rate from the Product Parameters table.

2\. Determine the Adjusted tenor (age/product cap).

3\. Compute the New loan monthly installment using the Adjusted tenor and the interest rate – amortization formula.

4\. Determine Adjusted Income by applying the verification percentage to raw Income.

5\. Compute Adjusted DTI \= (Existing obligations \+ New installment) ÷ Adjusted Income.

6\. Classify: ≤ 70% → Approve. 70–80% → Reduce limit (offer the 70%-ceiling amount instead, converted to a loan amount via Present Value). \> 80% → Reject.

# **5\.** 	**Per-Dossier Answer Key**

   
   
   
   
   
 

| Case ID | Correct decision | Accepted ceiling (monthly installment) | Reasoning |
| :---- | :---- | :---- | :---- |
| KHCN-001 – Bùi Văn Long, 38 | Approve (borderline) | ≤ 5,000,000 VND/month → max loan ≈ 100,152,000 at 24 months | Income 15,000,000 (salaried, verified 100%). Existing obligations 5,500,000. Loan 100,000,000 / 24 months at 18%/year → real installment 4,992,410. Adjusted DTI \= (5,500,000+4,992,410)/15,000,000 \= 69.95% ≤ 70% → Approve, but only just. The 100,000,000 requested sits right under the 100,152,000 ceiling. |
| KHCN-002 – Lê Văn Bình, 34 | Approve | ≤ 18,000,000 VND/month → max loan ≈ 360,547,000 at 24 months | Income 30,000,000 (salaried \+ commission via payroll, verified 100%). Existing obligations 3,000,000. Loan 240,000,000 / 24 months at 18%/year → real installment 11,981,784. Adjusted DTI \= (3,000,000+11,981,784)/30,000,000 \= 49.9% ≤ 70% → Approve. |
| KHCN-003 – Đặng Thị Lan, 57 | Approve | ≤ 12,100,000 VND/month → max loan ≈ 334,694,000 at 36 months | Income 18,000,000 (salaried, verified 100%). Existing obligations 500,000. Loan 100,000,000 / 36 months at 18%/year → real installment 3,615,240. Age/tenor cap does not bind (loan matures at 60, within the 70-year cap). Adjusted DTI \= (500,000+3,615,240)/18,000,000 \= 22.9% ≤ 70% → Approve. |
| KHCN-004 – Phạm Văn Tâm, 45 | Reject | ≤ 2,200,000 VND/month → max loan ≈ 60,854,000 at 36 months (for reference) | Income 20,000,000 from seasonal/highly unstable trading – cash-based, unverified → counted at 30% \= 6,000,000. Existing obligations 2,000,000. Loan 95,000,000 / 36 months at 18%/year → real installment 3,434,478. Adjusted DTI \= (2,000,000+3,434,478)/6,000,000 \= 90.6% \> 80% → Reject. |
| KHCN-005 – Nguyễn Thị Hồng, 56 | Approve | ≤ 16,600,000 VND/month → max loan ≈ 459,167,000 at 36 months | Income 28,000,000 (commission-based via payroll, verified 100%). Existing obligations 3,000,000. Loan 108,000,000 / 36 months at 18%/year → real installment 3,904,459. Adjusted DTI \= (3,000,000+3,904,459)/28,000,000 \= 24.7% ≤ 70% → Approve. |

# **6\.** 	**Detailed Assessment Process – KHCN – Đặng Thị Lan, 57**

## **6.1. Player-Visible Dossier Screen**

| Field | Value |
| :---- | :---- |
| Name / Age | Đặng Thị Lan, 57 |
| Occupation | Logistics coordinator, freight-forwarding company, Hải Phòng – permanent contract, 10 years tenure |
| Monthly income | 18,000,000 VND (payroll, verified) |
| Existing monthly debt obligations | 500,000 VND (motorbike loan, nearly paid off) |
| Requested amount / term | 100,000,000 VND / 36 months |
| Applicable interest rate | 18% / year (1.5% / month) |
| Loan purpose | Consumption – daughter's wedding expenses |
| Collateral | Unsecured (salary-based) |
| Estimated Monthly Installment | 3,615,240 VND/month (amortized: 100,000,000 at 18%/year over 36 months) |

## **6.2. Author-Side Calculation**

1\. Adjusted tenor: requested 36 months; product cap 60 months; age cap (70−57)×12 \= 156 months → no cap binds → Adjusted tenor \= 36 months.

2\. Applicable interest rate for this product: 18% / year → monthly rate r \= 0.18 ÷ 12 \= 1.5%.

3\. New loan monthly installment (amortization formula) \= 100,000,000 × 0.015 ÷ \[1 − (1.015)^−36\] \= 3,615,240.

4\. Income verification: salaried, permanent contract, payroll-verified → 100% → Adjusted Income \= 18,000,000.

5\. Adjusted DTI \= (500,000 \+ 3,615,240) ÷ 18,000,000 \= 4,115,240 ÷ 18,000,000 \= 22.9%.

6\. Classification: 22.9% ≤ 70% → Approve, with a wide margin.

## **6.3. Correct Decision: Approve**

## **6.4. Decision \- Consequence Card**

\-        Based on Adjusted DTI alone: even after accounting for her age and the loan's term, this applicant's income comfortably covers the requested installment, well inside the 70% ceiling.  
\-        Approving at this level does not appear to strain her monthly debt-service capacity based on the figures reviewed.

# **7\.** 	**Claim Boundary**

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| Adjusted Income, Adjusted DTI | Calculation | A numeric result under stated assumptions (see Threshold Disclosure). Does not by itself imply approval or rejection. |
| DTI band label | Classification | A category based on team-defined thresholds (Sourced from finance-expert feedback, with the exact cut lines marked as Assumption). Must not be worded as a guaranteed industry standard. |
| Approve/ Reduce limit/ Reject | Classification, NOT Recommendation | States whether the request falls inside/outside the 70%/80% DTI lines. Must not use advisory language such as "you should borrow." |

# **8\.** 	**Threshold Disclosure**

| Threshold | Value | Source |
| :---- | :---- | :---- |
| Income – Verified | 100% counted | Sourced – standard bank practice per finance-expert feedback |
| Income – Cash-based / unverified | 30–40% range; this Rulebook uses 30% | Sourced (range) per finance-expert feedback; exact % used is Assumption |
| DTI approve ceiling | 70% | Sourced – typical VN bank practice per finance-expert feedback (real ceilings can reach \> 80% in exceptional cases) |
| DTI reject floor | 80% | Sourced per finance-expert feedback |
| Maximum age at loan maturity | 70 | Sourced – MVP, adapted from the expert's real-estate-loan example (70) for our unsecured consumption product |
| Maximum tenor | 60 months | Sourced – MVP, consistent with the existing data-authoring checklist |
| Applicable interest rate | 18% / year (1.5% / month), flat across all 5 cases | Assumption – MVP; no case dossier currently records a real per-case rate. |
| Installment formula | Standard loan amortization (PMT): P × r ÷ \[1−(1+r)^−n\] | Sourced – this is the formula real lenders use for a repayment schedule; supersedes the v3 straight-line approximation |
| Maximum approvable loan (Reduce-limit conversion) | Present Value (PV) of the ceiling installment: M × \[1−(1+r)^−n\] ÷ r | Sourced – mathematical inverse of the PMT formula above, so both directions stay consistent |

 

   
