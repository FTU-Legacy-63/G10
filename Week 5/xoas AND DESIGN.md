# **1\. Screen-by-Screen Design Detail**

## **1.1 Dossier Screen**

Content shown:

•    Applicant profile: name, age, occupation \+ tenure, dependents.

•    Raw financials: income, living expenses, existing debt.

•    Loan request: amount, tenor, collateral type.

•    NDI, DTI, Burden — shown as bare numbers only, with NO verdict attached.

**Fully hidden:** everything that represents a conclusion (band, tier, factors, correct classification) does not appear on this screen — only revealed after the Card.

## **1.2 Decision Bar**

•    Approve — grant at the requested amount.

•    Reduce limit — grant at a player-entered amount.

•    Reject — grant nothing.

## **1.3 Decision-Consequence Card**

Structured with the Result – Reason – Meaning – Action – Limit pattern:

| Component | Content shown |
| :---: | ----- |
| **Result** | The classification (Approve / Reduce / Reject) and whether the player's amount fell inside, above, or below the accepted band, or was hard-gated by DTI/Burden. |
| **Reason** | The numbers behind it: NDI, adjusted monthly capacity, band, DTI, Burden, and which gate or red flag fired. |
| **Meaning** | What the decision does to the applicant and the portfolio (the consequence). Example: approving at full leaves no buffer for irregular expenses. |
| **Action** | Player allocates remaining room to the next dossier; state updates. |
| **Limit** | This classification reflects Capacity only; Character, Capital, Collateral, and Conditions are out of MVP scope. Thresholds are team assumptions, not guaranteed industry standards. |

**Claim boundary lock:** *the Card only classifies and compares against a defensible band. It NEVER says "best" or "you should lend" — this is the recommendation-wording fix from Weeks 3-4, now enforced at the output layer.*

## **1.4 Assessment Guide**

A static, qualitative help screen with no numbers. Purpose: prevents the task from degrading into a lookup exercise. Reachable anytime via a "?" icon. 

**1.5 Scorecard**

Shown at the end of a round, combining three criteria: decision accuracy, portfolio risk, and room efficiency. 

