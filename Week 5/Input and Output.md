# **1\. Input Labels and Validation Plan**

The original R3 unit ambiguity is closed. The editable amount is approved principal in VND; the tenor is in months. The system derives estimated monthly installment as principal divided by tenor and compares that VND-per-month value with the hidden monthly band. Interest is excluded in MVP v1 and disclosed. Income, living expenses, obligations, NDI, and installments are monthly; loan principal and credit room are not monthly values.

* For approval or adjustment, principal must be numeric and greater than zero, at most the requested principal, and at most remaining room. Reject allocates zero.  
* Tenors must be allowed. Adjust terms must change principal, tenor, or both. Revalidate remaining room when the player confirms the case.  
* Show a specific inline error connected to the field and announced to assistive technology. Preserve the entered value and keyboard focus for correction.  
* The prototype currently enforces 5,000,000 VND increments and offers 12, 18, 24, 30, and 36 months. These particular increments and choices still need product-rule approval.

Use explicit labels such as Monthly income, Existing obligations per month, Approved principal in VND, Approved tenor in months, and Estimated installment per month. Define NDI, DTI, CIC, and VND on first use. Full amounts use a consistent VND unit; compact room summaries may use VND 180m when space is constrained.

# **2\. Output and Claim Boundary**

| Part | Decision Consequence Card requirement |
| :---- | :---- |
| **Result** | Show the player's committed choice, the system Capacity classification, and whether the action is defensible, too lenient, too conservative, or Capacity-safe but inefficient. |
| **Reason** | Reveal NDI, adjusted monthly capacity, final band, DTI, Burden, factor values, risk signals, and any hard gate. Name the binding reason before supporting detail. |
| **Meaning** | Describe an authored, deterministic consequence for the applicant and portfolio without claiming certain repayment or default. |
| **Action** | Show principal commitment and room before and after; return to the desk or proceed to the scorecard after all five cases are locked. |
| **Limit** | State that the classification uses Capacity-only team assumptions, not bank policy, financial advice, or professional accreditation. |

 

The output is for **classification, not recommendation**. It shouldn’t imply that a decision is the best real-world lending action. The consequences are **fictional and educational**. Current gaps: the result screen doesn’t show all factor values, the room-before figure, or a direct comparison between the committed installment and the band.

# **3\. Contribution** 

| Role in guide | Workstream and available evidence |
| :---- | :---- |
| **Diep Anh \- Product Lead** | User goal and feature keep or cut decisions appear in GAME\_SPEC and DECISION\_LOG; explicit sign-off is not present. |
| **Ha \- Content and Data Lead** | The latest five dossiers and corrected source calculations are in CASE\_ANSWER\_KEY and src/data.js. |
| **Linh \- Credit Lead** | Capacity assumptions, classification boundaries, and authored explanation content appear in CANONICAL\_GAME\_SPEC, CASE\_ANSWER\_KEY, and src/engine.js. |
| **Trang \- Design Lead** | Nine design concepts, UI\_UX\_BRIEF, SCREEN\_FLOW\_DESIGN, and English copy document the screen and flow workstream. |
| **Minh \- Tech Lead** | The static frontend, draft and confirmation logic, room state, Capacity engine wiring, and scorecard are in index.html and src/. |

