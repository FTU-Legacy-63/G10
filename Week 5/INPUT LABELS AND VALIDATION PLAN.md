**Input Labels and Validation Plan (Owner: Lai Ngoc Linh)**

The player only ever types one thing at runtime: the proposed amount when choosing: Reduce limit. Every other dossier field (Income, Living costs, Occupation, Age, Dependents, NDI, DTI, Burden, etc.) is author-side, pre-written data — read-only on screen, never typed by the player.

**Runtime input: Reduce-limit proposed amount**

| Rule | Error message if violated |
| :---- | :---- |
| Must be a valid number | "Please enter a valid number" |
| Must be greater than 0 | "Amount must be greater than 0" |
| Must not exceed the original requested amount | "Proposed amount cannot exceed the original request" |
| Must not exceed remaining room (room\_total \- room\_used) | "Proposed amount exceeds remaining room" |

**Data-authoring checklist (for every new dossier, not a player input)**  
This is the validation Linh and Ha run when writing a new case, so it never enters the game malformed. It is not player-facing.

| Field | Valid range / format | Check before adding a case |
| :---- | :---- | :---- |
| Income | \> 0 VND | Verified, matches the Income definition |
| Living costs | ≥ 0 VND | Excludes any debt repayment |
| Existing obligations | ≥ 0 VND | Excludes the new loan being evaluated; must yield NDI \> 0 |
| Occupation tier | Exactly one of: Stable / Moderate risk / High risk |  |
| Age | 18 – 65 | Used to compute distance to age 60 |
| Dependents | Integer, 0 – 10 | Maps to one of 3 tiers in §2.2 Dependents table |
| Loan amount requested | \> 0 VND |  |
| Tenor | 6 – 60 months | Used to derive Estimated Monthly Installment |

   
