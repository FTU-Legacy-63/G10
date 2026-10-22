**Input Labels and Validation Plan (Owner: Lai Ngoc Linh)**

At runtime the player types or selects only the following: worksheet entries, the decision on each dossier, and the decision input that goes with the decision (a Max installment, an Additional collateral amount, or a selection of conditions). Every dossier field (Income, Existing obligations, Occupation/tenure, Age, Loan Type, Loan amount requested, Tenor, CIC groups, Credit inquiries, Document check, Purpose verification, Liquid assets, Collateral details, Industry outlook, Loan purpose) is author-side, pre-written data – read-only on screen, never typed by the player. Nothing is marked right or wrong until the round is submitted.

**Runtime input 1: Worksheet entries (feedback only, not scored)**

*Worksheet fields may be left blank; a blank entry appears as “not answered” on the Summary Card. Collateral fields are shown for Secured loans only.*

| Field | Type | Rule and error message |
| :---- | :---- | :---- |
| Character rating | Select: Clear / Watch / Block | None |
| Purpose result | Select: Feasible / Not feasible | None |
| Acceptance result | Select: Accepted / Not accepted (Secured only) | None |
| DTI (%) | Number | Valid number ≥ 0, otherwise “Please enter a valid number” |
| Net collateral value (VND) | Number (Secured only) | Valid number ≥ 0, otherwise “Please enter a valid number” |
| LTV (%) | Number (Secured only) | Valid number ≥ 0, otherwise “Please enter a valid number” |
| Collateral result | Select: Clear / Shortfall (Secured only) | None |
| Reserve cover (months) | Number | Valid number ≥ 0, otherwise “Please enter a valid number” |
| Capital rating | Select: Clear / Watch | None |
| Conditions rating | Select: Normal / Adverse | None |

**Runtime input 2: Decision on each dossier**

| Rule | Error message if violated |
| :---- | :---- |
| Exactly one of Approve / Reduce limit / Require more collateral / Add conditions / Reject must be selected | “Choose a decision to continue” |
| The decision may be changed until the round is submitted; changing it clears the decision input of the previous decision | No error; the cleared input is shown as empty |

**Runtime input 3a: Reduce limit – proposed Max installment (VND/month)**

| Rule | Error message if violated |
| :---- | :---- |
| Must be a valid number | “Please enter a valid number” |
| Must be greater than 0 | “Installment must be greater than 0” |
| Must not exceed the original Estimated Monthly Installment shown for this dossier | “Proposed installment cannot exceed the original estimate – Reduce limit can only lower it, never raise it” |

*Once the value passes validation, the system – not the player – converts it into the Max approvable loan amount via the Present Value formula already shown for this dossier.*

**Runtime input 3b: Require more collateral – additional collateral (VND)**

| Rule | Error message if violated |
| :---- | :---- |
| Must be a valid number | “Please enter a valid number” |
| Must be greater than 0 | “Additional collateral must be greater than 0” |
| Must not exceed Loan amount ÷ Max LTV (70%) | “Additional collateral cannot exceed what the whole loan would require” |

*The system rounds its own figure up to the nearest 1,000,000 VND before comparing.*

**Runtime input 3c: Add conditions – selection of conditions**

| Rule | Error message if violated |
| :---- | :---- |
| At least one condition must be selected from the menu: documents showing the loan was used for its purpose; periodic re-appraisal of the collateral (shown for Secured loans only); periodic update of the borrower’s occupation and income | “Select at least one condition” |

**Runtime input 4: Submit round**

| Rule | Message |
| :---- | :---- |
| Enabled only when every dossier has a decision and, where the decision needs one, a complete decision input | “Complete all dossiers before submitting” |
| Confirmation before locking | “Submit round? Decisions cannot be changed after this.” |

*Grading of the numeric decision inputs against the system’s own correct figure allows a ±5% tolerance, since the player calculates them by hand. Validation checks only that an input is allowed, never that it is correct.*

**Data-authoring checklist (for every new dossier, not a player input)**

*This is the validation Linh and Ha run when writing a new case, so it never enters the game malformed. It is not player-facing.*

| Field | Value range / format | Check before adding a case |
| :---- | :---- | :---- |
| Stated income | \> 0 VND | Free to set independently of Verified income below |
| Verified income (Warehouse) | \> 0 VND | The number actually used in the DTI formula. Must be authored separately from Stated income – do not default it to match |
| Existing obligations | ≥ 0 VND | Excludes the new loan being evaluated |
| Occupation / tenure (free text) | Descriptive, no fixed categories | Profile context only; not used in any formula |
| Age | 18–70 | Must leave enough months to age 70 for at least the minimum tenor of the chosen Loan Type |
| Loan Type | Exactly one of Unsecured / Secured | Selects Product Parameters (tenor cap, max age, interest rate) and decides whether Collateral is tested |
| Loan amount requested | \> 0 VND | — |
| Tenor requested | 6–60 months (Unsecured) / 6–360 months (Secured) | Used with Loan Type and Age to derive the adjusted tenor and the Estimated Monthly Installment |
| Current CIC group | Integer 1–5 | Group ≥ 2 means a debt is overdue now → Block (Reject) |
| Worst CIC group (12 months) | Integer 1–5 | Must be ≥ the Current CIC group. Current 1 with worst ≥ 2 is a Watch (Add conditions) |
| Credit inquiries (last month) | Integer ≥ 0 | 3 or more is a Watch (Add conditions) |
| Document check | Exactly one of Consistent / Forgery signs | Forgery signs → Block (Reject). A gap between Stated and Verified income is not a document problem |
| Purpose verification | Yes / No | Yes \= documents support the purpose and the amount. No → Reject. The Loan purpose text must agree with this value |
| Liquid assets | ≥ 0 VND | Cash, deposits and quickly saleable securities only. Excludes real estate, borrowed money and any asset pledged to this loan |
| Collateral type | Real estate (Secured only) | Leave blank for Unsecured loans |
| Appraised value | \> 0 VND (Secured only) | Pre-set by the author; the player never appraises |
| Senior claims outstanding | ≥ 0 VND (Secured only) | Balance of any earlier lien on the same asset. Net collateral value \= Appraised value − Senior claims; if it is 0 or below, Collateral \= Shortfall |
| Ownership status | Clear / Disputed (Secured only) | Disputed → collateral Not accepted → Reject |
| Transferability | Transferable / Not transferable (Secured only) | Not transferable → collateral Not accepted → Reject |
| Industry outlook | Exactly one of Favorable / Neutral / Unfavorable | Outlook of the applicant’s main income source. Unfavorable makes the environment Adverse |
| Loan purpose | Free text | Context shown to the player; must be consistent with Purpose verification |
| Macro environment (round-level, not per dossier) | Normal / Stressed | Set once per round and identical on every dossier in that round. Stressed makes the environment Adverse |

 

**One-answer requirement:** each dossier must have one designed answer. Build each case so that only one non-Approve trigger binds, and compute the answer key in the 4C Rulebook order of operations.

**Mismatch requirement:** across the full case set, at least \~30–40% of dossiers must have Verified income ≠ Stated income (in either direction – overstated or understated). If every case has matching numbers, players will quickly learn the Warehouse check is unnecessary and stop doing it, making the mechanic decorative rather than functional.

**Coverage requirement:** across each round, every one of the five decisions should be the correct answer for at least one dossier, and at least one dossier should be a Reject for a reason other than DTI (Character, purpose, or collateral acceptance), so that every part of the 4C logic is tested.

