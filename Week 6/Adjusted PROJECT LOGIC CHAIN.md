# PROJECT_LOGIC_CHAIN.md

**The Credit Desk - Project Logic Chain**
Owner: Doan Diep Anh
Scope: 1C MVP, Capacity only (DTI). Character, Capital, Collateral and Conditions are out of scope.

## 1. Inherited Chain: Problem -> Product -> User Task

- **Problem.** Year 3-4 FTU Finance and Banking students have credit-appraisal theory but no hands-on practice making a lend / no-lend call. No local, affordable practice tool exists.
- **Product.** The Credit Desk: a browser-based credit-appraisal simulation. The player acts as a bank credit officer, reads a KHCN dossier under a limited credit room, and decides whether and how much to lend.
- **User task.** For one applicant, locate the figures that drive repayment capacity, compute DTI, and classify the request as Approve, Reduce limit, or Reject.
- **Desired outcome (real-world goal, NOT the product output).** The learner can reason through and defend a capacity decision before an internship. The product output is the Decision-Consequence Card, not the learner's competence. Conflating the two is a graded risk.

## 2. Core Logic Chain (Input/State -> Reasoning -> Result -> Interpretation -> Limitation)

One path, fixed order. Every stage maps to a Rulebook section.

| Stage | What happens | Rulebook ref |
| :---- | :---- | :---- |
| Input / state | Read three driver figures: Income (denominator), Existing obligations = sum of CIC-revealed active-loan installments (part of numerator), Estimated Monthly Installment = pre-computed PMT (part of numerator). Context-only fields: occupation, age, loan type, CIC debt-group label, collateral, purpose. | Definitions; MVP S3 |
| Reasoning | (a) Loan Type -> Product Parameters (tenor cap, max age, rate). (b) Adjusted tenor = min(requested, product cap, (70 - age) x 12). (c) PMT = P x r / [1 - (1+r)^-n]. (d) DTI = (Existing obligations + PMT) / Income. (e) Compare DTI to the 70% and 80% lines. | Rulebook S2, S4 |
| Result | DTI value + band + decision. On Reduce limit: Max installment = 70% x Income - Existing obligations, converted to Max loan via Present Value. | Rulebook S3 |
| Interpretation | Decision-Consequence Card: Classification + Consequence + Explanation, mapped back to Capacity only. | Rulebook S5; MVP S5 |
| Limitation | Single-C (Capacity/DTI) model; thresholds team-defined; flat 18% rate is an MVP assumption; output is Classification, not Recommendation; only 3 of 5 decisions modeled. | Rulebook S5, S6; MVP S7-8 |

## 3. Logic-Type Audit (claim strength per output)

The core defense discipline: no output makes a stronger claim than its logic can support.

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| Estimated Monthly Installment | Calculation | A numeric result under the stated rate and adjusted tenor. Precise only given those assumptions. |
| DTI value | Calculation | A ratio under the stated income and obligation definitions. Not a risk score. |
| DTI band (<=70 / 70-80 / >80) | Classification | A category against team-defined thresholds. Sourced from finance-expert feedback; exact cut lines marked as Assumption. Not a guaranteed industry standard. |
| Decision (Approve / Reduce / Reject) | Classification, NOT Recommendation | States whether the request falls inside or outside the DTI lines. Must not use advisory wording such as "you should lend." |
| Max approvable loan (Reduce path) | Calculation (PV, inverse of PMT) | The amount that brings DTI to exactly 70%. A computed ceiling, not a recommended loan size. |
| Consequence / Explanation (Card) | Explanation | Interprets the classification against Capacity only. Not financial advice. |

## 4. Approved Expected Result - Predict Before Running (Golden case: KHCN-03, Trinh Thi Hanh, 44)

- **Sample input.** Furniture-shop owner. Monthly turnover 270M; costs: stock 180M, rent 24M, wages 24M (3 x 8M), other 12M. Requests 280M / 72mo, unsecured, no pledge. Bank system note installment: 7,110,200 VND. CIC on Check: two active loans, 10M + 5M per month.
- **Expected reasoning.**
  - Income = 270 - 180 - 24 - 24 - 12 = 30,000,000 (turnover is not income).
  - Existing obligations = 10,000,000 + 5,000,000 = 15,000,000 (second loan undeclared).
  - Unsecured -> r = 1.5%/mo; Adjusted tenor = min(72, 60, 312) = 60mo.
  - PMT = 280,000,000 x 0.015 / [1 - 1.015^-60] = 7,110,200.
  - DTI = (15,000,000 + 7,110,200) / 30,000,000 = 73.7%.
- **Expected result.** 73.7% is in the 70-80% band -> **Reduce limit**. Max installment = 0.70 x 30,000,000 - 15,000,000 = 6,000,000 -> Max loan = 6,000,000 x [1 - 1.015^-60] / 0.015 ≈ **236,282,000 VND** over 60 months.
- **Explanation.** Counted income is the 30M net of costs, not turnover. An undeclared second loan lifts obligations to 15M, pushing total debt service to ~74% of income. The defensible offer is ~236M, not the full 280M.
- **Claim audit.** This output is Classification (band + decision) plus supporting Calculation (DTI, PV limit). It is not a Recommendation. No claim beyond Capacity is made.

## 5. Claim Boundary (summary)

The product classifies and explains one Capacity dimension (DTI) for one applicant. It does not recommend a lending action, and it does not evaluate Character, Capital, Collateral or Conditions. Thresholds are disclosed as sourced ranges with the exact cut lines marked as assumptions.

## 6. Traceability (integration hook)

| Chain element | Defined in | Consumed by |
| :---- | :---- | :---- |
| Formulas, thresholds, order of operations | Rulebook S2-S4, S6 | MVP flow, dossier answer keys, build, test cases |
| Input visibility (visible vs hidden) | MVP S6 | UI (Design), test cases |
| Claim boundary wording | Rulebook S5; MVP S5 | Card copy (Design/Content), README |
| Golden expected result | Dossier set, KHCN-03 | Deployment demo, Week 6 test set |
