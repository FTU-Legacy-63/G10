**Input Labels and Validation Plan (Owner: Lai Ngoc Linh)**

The player only ever types one thing at runtime: the proposed Max installment when choosing “Reduce limit”. Every other input field (Income, Existing obligations, Occupation/tenure, Age, Loan Type, Loan amount requested, Tenor, Credit history, Collateral, Loan purpose, Income Verification tier) is author-side, pre-written data – read-only on screen, never typed by the player.

**Runtime input: Reduce-limit proposed Max installment (VND/month)**

| Rule | Error message if violated |
| :---- | :---- |
| Must be a valid number | “Please enter a valid number” |
| Must be greater than 0 | “Installment must be greater than 0” |
| Must not exceed the original Estimated Monthly Installment shown for this dossier | “Proposed installment cannot exceed the original estimate – Reduce limit can only lower it, never raise it” |

*Once this value passes validation, the system – not the player – converts it into the Max approvable loan amount via the Present Value formula already shown for this dossier. Grading of the entered installment against the system’s own correct figure allows a ±5% tolerance, since the player is calculating this by hand.*

**Data-authoring checklist (for every new dossier, not a player input)**

| Field | Value range / format | Check before adding a case |
| :---- | :---- | :---- |
| Income (monthly, raw) | \> 0 VND | Verified, matches the Income definition |
| Existing obligations | ≥ 0 VND | Excludes the new loan being evaluated |
| Occupation / tenure (free text) | Descriptive, no fixed categories | Must carry enough signal (job type, tenure, payroll vs. cash) for the player to judge income reliability without the tier being stated outright |
| Age | 18–70 | Must leave enough months to age 70 for at least the minimum tenor of the chosen Loan Type |
| Loan Type | Exactly one of Unsecured / Secured | Selects Product Parameters: tenor cap, max age, interest rate |
| Loan amount requested | \> 0 VND |  |
| Tenor requested | 6–60 months (Unsecured) / 6–360 months (Secured) | Used with Loan Type and Age to derive the adjusted tenor and the Estimated Monthly Installment |
| Credit history (CIC) | Display-only | Not used in this MVP’s formula; reserved for future Character C |
| Collateral, Loan purpose | Display-only | Context only – no valuation or LTV exists in this MVP |

 