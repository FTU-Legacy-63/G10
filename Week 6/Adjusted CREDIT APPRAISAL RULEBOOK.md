**The Credit Desk – Credit Appraisal Rulebook**

# **1\.** 	**Definitions**

| Term | Definition |
| :---- | :---- |
| Income | The applicant's total monthly cash inflow from any source (e.g. salary, business/trading revenue net of operating costs, rental income, or other regular receipts) |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| Loan type | Unsecured or secured. A classification label only, used to select which row of the Product Parameters table (tenor cap, maximum age, interest rate) applies |

# **2\.** 	**DTI Formula**

## **2.1. Existing Obligations**

Used as-is (Section 1). No adjustment factor is applied to this figure.

## **2.2. Loan Term (Tenor) Adjustment by Age**

Tenor is capped so the loan matures before the applicant reaches a maximum age for this product. This does not change the credit limit directly – it shortens the tenor used to compute the installment, which raises the installment and therefore the DTI.

**Adjusted tenor \= minimum of: the requested tenor, the product's maximum tenor, and (Maximum age at maturity − current age) × 12\.**

*Example: for a real-estate loan (product maximum tenor 360 months, maximum age at maturity 70), a 60-year-old applicant is capped at (70−60)×12 \= 120 months, regardless of the requested tenor. This Rulebook applies the same mechanism to whichever product the applicant's loan belongs to, using the maximum age, maximum tenor and interest rate from the Product Parameters table below.*

## **2.3. Product Parameters by Loan Type**

| Product type | Max tenor | Max age at maturity | Interest rate | DTI approve ceiling | DTI reject floor |
| :---- | :---- | :---- | :---- | :---- | :---- |
| Unsecured | 60 months | 70 | 18%/ year | 70% | 80% |
| Secured | 360 months | 70 | 11%/ year | 70% | 80% |

## **2.4. New Loan Monthly Installment**

Computed with the standard loan amortization (annuity) formula, using the applicable monthly interest rate. This is the same formula real lenders use to generate a repayment schedule.

**New loan monthly installment \= P × r ÷ \[1 − (1+r)^−n\]**

where P \= Loan amount requested, r \= applicable monthly interest rate (annual rate ÷ 12), and n \= Adjusted tenor (months).

## **2.5. DTI**

**DTI \= (Existing obligations \+ New loan monthly installment) ÷ Income**

# **3\.** 	**Decision Band**

| DTI | Decision | Meaning |
| :---- | :---- | :---- |
| ≤ 70% | Approve | The requested installment fits comfortably within the applicant's repayment capacity at this DTI level. |
| 70% – 80% | Reduce limit | The request pushes DTI into a higher-risk zone. Offer the maximum installment/amount that brings DTI back to exactly 70% instead of the full request. |
| \> 80% | Reject | Debt service at this level is considered unsustainable relative to income, even after the tenor adjustment. |

**Maximum approvable installment \= 70% × Income − Existing obligations.**

**Maximum approvable loan amount \= the Present Value of that maximum installment, paid monthly over the Adjusted tenor, at the applicable interest rate:**

**Maximum approvable loan amount \= Maximum approvable installment × \[1 − (1+r)^−n\] ÷ r**

# **4\.** 	**Order of Operations**

1\. Determine the Loan Type (Unsecured/Secured) and look up its tenor cap, maximum age, and interest rate from the Product Parameters table.

2\. Determine the Adjusted tenor (age/product cap).

3\. Compute the New loan monthly installment using the Adjusted tenor and the interest rate – amortization formula.

4\. Compute DTI \= (Existing obligations \+ New installment) ÷ Income.

5\. Classify: ≤ 70% → Approve. 70–80% → Reduce limit (offer the 70%-ceiling amount instead, converted to a loan amount via Present Value). \> 80% → Reject.

# **5\.** 	**Claim Boundary**

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| DTI band label | Classification | A category based on team-defined thresholds (Sourced from finance-expert feedback, with the exact cut lines marked as Assumption). Must not be worded as a guaranteed industry standard. |
| Approve/ Reduce limit/ Reject | Classification, NOT Recommendation | States whether the request falls inside/outside the 70%/80% DTI lines. Must not use advisory language such as "you should lend." |

# **6\.** 	**Threshold Disclosure**

| Threshold | Value | Source |
| :---- | :---- | :---- |
| DTI approve ceiling | 70% | Sourced – typical VN bank practice per finance-expert feedback (real ceilings can reach \> 80% in exceptional cases) |
| DTI reject floor | 80% | Sourced per finance-expert feedback |
| Maximum age at loan maturity | 70 | Sourced – MVP, adapted from the expert's real-estate-loan example (70) for our unsecured consumption product |
| Maximum tenor | 60 months | Sourced – MVP, consistent with the existing data-authoring checklist |
| Applicable interest rate | 18% / year (1.5% / month), flat across all 5 cases | Assumption – MVP; no case dossier currently records a real per-case rate. |
| Installment formula | Standard loan amortization (PMT): P × r ÷ \[1−(1+r)^−n\] | Sourced – this is the formula real lenders use for a repayment schedule; supersedes the v3 straight-line approximation |
| Maximum approvable loan (Reduce-limit conversion) | Present Value (PV) of the ceiling installment: M × \[1−(1+r)^−n\] ÷ r | Sourced – mathematical inverse of the PMT formula above, so both directions stay consistent |

 

   
   
