**MVP flow (Capacity only) - from Input to Output**

1. **Input**

- Income, living expenses, existing debt obligations, number of dependents, job type/employment stability, and requested loan amount

2. **Process – Calculate Net Disposable Income (NDI)**

- Net disposable income = Income − Living expenses − Existing obligations

3. **Process – Calculate DTI**

- DTI = existing obligations / income - used as a supporting warning signal
| DTI | Classification | Treatment |
|---|---|---|
| ≤35% | Low / acceptable burden | Không điều chỉnh |
| >35% – 43% | Moderate warning | Warning flag, không giảm limit |
| >43% – 50% | High burden | −10% credit limit |
| >50% | Very high burden | Reject |

4. **Process – Determine affordability band**

- Affordability band = 40 - 45% \* NDI

5. **Process - Monthly installment**

- Loan amount/loan tenor

6. **Classify**

- Compare the requested affordability band with the monthly installment

7. **Output - Decision -> Consequence card**

\- **Classification:** Requested loan is within/below/above the band

\- **Consequence:** Implication of approving the requested amount (safe/cash-flow stress)

\- **Explanation:** Explanation based purely on Capacity (income, expenses, existing obligations, and dependents)

- Because the MVP uses only **1C (Capacity)**, two of the five original decision options should **not** be included in the MVP yet, as they depend on other Cs:
- Approve: Keep
- Reject: Keep
- Reduce Limit: Keep
- Require More Collateral (Collateral): Not yet (need Collateral)
- Add Conditions: Not yet (need Conditions)

**Reasons for selecting:**

- **Character**: Requires credit history data (CIC) in the form of event sequences (e.g., non-performing loans, debt restructuring, etc.). The team currently does not have a sample data source, and converting this information into quantitative signals would require additional design time.
- **Capital**: Requires information on the borrower's net assets/equity contribution. This type of data is difficult to collect quickly for sample individual borrower profiles (case seeds, and Ha (Input Owner) has not yet had time to design these fields in the current schema.
- **Collateral**: Requires additional asset valuation logic and LTV calculation.
- **Conditions**: Requires market/macro-context data. This type of input falls outside the scope of an individual borrower profile, and the team has not yet identified a data source or a practical way to attach this information to each case within the short timeframe.
- **Why Capacity was selected as the starting point:** It is the only C for which the required inputs (**income and DTI**) are already available as pre-computed metrics, and the baseline formula had already been agreed upon by the team. Therefore, the team can build a complete **Input -> Output** flow immediately.
