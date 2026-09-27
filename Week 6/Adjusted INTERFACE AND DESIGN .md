# **Interface and Design (Owner: Dang Thi Van Trang)**

**1\. Screen‑by‑Screen Design Detail**

**1.1 Dossier Screen**  
 Content shown (author‑side, read‑only):

* Applicant profile: name, age, occupation, loan purpose (contextual).  
* Loan Type (Unsecured / Secured) and its applicable interest rate.  
* Requested amount, requested term (tenor), Estimated Monthly Installment.  
* Collateral — display‑only.  
* Monthly income — self‑reported.  
* Existing debt obligations — self‑declared.  
* Credit history (CIC group) — display‑only badge, no verdict attached.

Fully hidden until the Card: Income Verification tier, Adjusted Income, Adjusted tenor, CIC‑verified obligations, Adjusted DTI, the 70%/80% band, and the correct classification.

**1.2 Check CIC (new)**  
 An on‑demand action available on the Dossier Screen before any decision is locked. Reveals the **CIC‑verified existing debt obligations**, which may exceed the self‑declared figure (e.g. an undisclosed installment loan or revolving credit line). Purely informational: it never locks the case, can be reopened any number of times, and does not by itself change room or state. It plays the same "surface a hidden discrepancy before commitment" role that the Supporting Documents modal played in Week 5, but is scoped specifically to CIC‑verified debt rather than employment paperwork.

**1.3 Decision Bar**

* **Approve** — grant at the requested amount and term.  
* **Reduce limit** — grant at a player‑entered amount/installment.  
* **Reject** — grant nothing.

Behavior differs from Week 5: choosing **Reduce limit locks the case immediately**, before any amount is entered. The reveal (Adjusted Income \+ verification tier) happens at that lock, so the player computes their own ceiling rather than guessing — the anti‑exploit lock from the Feature Map. Approve and Reject stay direct: no amount entry, straight to review and confirm.

**1.4 Reduce‑Limit Amount Entry**  
 Appears only after the lock‑and‑reveal step above. The player enters a proposed installment or loan amount. Validation:

* Must be numeric and greater than 0\.  
* Must not exceed the original Estimated Monthly Installment.  
* Graded against the system's true ceiling with **±5% tolerance**, not an exact match.

**1.5 Decision‑Consequence Card**  
 Same Result–Reason–Meaning–Action–Limit structure as Week 5, content updated:

| Component | Content shown |
| :---: | ----- |
| **Result** | Classification (Approve / Reduce limit / Reject) against the hidden 70%/80% Adjusted‑DTI band. |
| **Reason** | Adjusted DTI, Income Verification tier and Adjusted Income, CIC‑verified obligations, Adjusted tenor, New loan monthly installment, and which band applied |
| **Meaning** | Authored, deterministic consequence for the applicant and the portfolio — no claim about real repayment or default |
| **Action** | Player allocates remaining room to the next dossier; state updates |
| **Limit** | Reflects Adjusted‑DTI logic only; Character, Capital, Collateral, Conditions are out of MVP scope. 70%/80% thresholds are disclosed as Sourced/Assumption, not bank policy. |

Claim‑boundary lock carried over unchanged: the Card never says "best" or "you should lend."

**1.6 "How Assessment Works" Guide**  
 Explains the real 70%/80% DTI decision thresholds and the general Income‑Verification / age‑capped‑tenor mechanism (disclosed as Sourced, industry knowledge) — but never reveals this case's own Adjusted DTI or Adjusted Income. Reachable anytime via the "?" icon, unchanged from Week 5\.

**1.7 Room and Scorecard**  
 Unchanged HUD and end‑of‑round scorecard structure (Decision quality / Portfolio safety / Room efficiency) — only the underlying correctness check changes, now scored via Answer‑range feedback against the true Adjusted‑DTI band and the true Max‑installment ceiling.

**2\. Terminology**  
 Define on first use: Adjusted DTI, Income Verification tier, Adjusted Income, Adjusted tenor, CIC‑verified obligations — same first‑use requirement as NDI/DTI/Burden in Week 5\.

