# **Interface and Design (Owner: Dang Thi Van Trang)**

**1\. Screen‑by‑Screen Design Detail**

**1.1 Dossier Screen**  
 Content shown (author‑side, read‑only), presented as **prose, not a field/value table**:

* Profile paragraph: name, age, household/family context — much of this is deliberate noise (other people's income, hobbies, one‑off windfalls).  
* Income‑and‑work paragraph: salary stated directly, or — for self‑employed applicants — turnover and costs described narratively, requiring the player to net them into a monthly Income figure themselves.  
* Existing‑obligations paragraph: what the applicant self‑declares ("he says it is his only debt").  
* Credit history (CIC group) — a one‑line display‑only badge, no verdict attached.  
* Loan Type (Unsecured/Secured) and its applicable interest rate, requested amount, requested term, loan purpose, collateral — display‑only context.  
* **Bank system note**: a single pre‑computed line — "estimated monthly installment for this request: X VND" — visually set apart from the narrative so it isn't lost among the distractor detail.

Fully hidden until the Card: **DTI itself** (no longer shown as a bare number at all — finding the inputs and computing it is the player's task), CIC‑verified obligations, and the correct classification.

**1.2 Check CIC (new)**  
An on‑demand action available before any decision. Reveals the CIC‑verified list of active loans, which may exceed what the applicant self‑declared (the recurring "hidden loan" trap in every dossier: Anh's declared loan holds, but Kiên, Hạnh, Thịnh, and Tuấn's self‑declared figure is each below the CIC‑verified total). Purely informational — never locks the case, can be reopened any number of times, and is independent of which decision the player eventually picks.

**1.3 Decision Bar**

* **Approve** — grant at the requested amount and term.  
* **Reduce limit** — grant at a player‑entered amount/installment.  
* **Reject** — grant nothing.

Whichever category the player taps is **immediately final** — all three, not only Reduce limit. There is no hidden‑field reveal gated behind any of them, because everything the player needs (Income, and Existing obligations once Check CIC is used) is already available before deciding.

**1.4 Reduce‑Limit Amount Entry**  
Appears only after tapping Reduce limit. No new information is revealed at this step. The player computes Max installment \= 70% × Income − Existing obligations by hand — one multiplication, one subtraction — using figures already on screen, and types it in. Validation:

* Must be numeric and greater than 0\.  
* Must not exceed the original Estimated Monthly Installment.  
* Graded against the system's own correct figure with ±5% tolerance, not an exact match.

The system, not the player, converts the entered installment into a loan amount via Present Value

**1.5 Decision‑Consequence Card**  
 Same Result–Reason–Meaning–Action–Limit structure as Week 5, content updated:

| Component | Content shown |
| :---: | ----- |
| **Result** | Classification (Approve / Reduce limit / Reject) against the 70%/80% DTI lines, plus how the player's own decision compares to the system's. |
| **Reason** | Income (with the components the player had to add or net), Existing obligations (CIC‑verified), the Estimated Monthly Installment, the system's own DTI, and which band applied. |
| **Meaning** | Authored, deterministic consequence for the applicant and the portfolio — no claim about real repayment or default. |
| **Action** | Player allocates remaining room to the next dossier; state updates. |
| **Limit** | Classification, not Recommendation — states only which side of the 70%/80% lines the request falls on. Thresholds are disclosed as Sourced or Assumption, not bank policy. Character, Capital, Collateral, Conditions remain out of MVP scope. |

Claim‑boundary lock carried over unchanged: the Card never says "best" or "you should lend."

**1.6 "How Assessment Works" Guide**  
 Reachable anytime via the "?" icon. Teaches, openly (Sourced, real VN bank practice):

* How the age‑capped Adjusted tenor and the amortization (PMT) installment are derived — so the player understands where the Bank‑system‑note figure comes from, even though they never have to compute it themselves.  
* The exact player method: (1) find Income, Existing obligations, and the Estimated Monthly Installment among the surrounding context; (2) calculate **DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income**; (3) compare against the 70%/80% lines to choose Approve, Reduce limit, or Reject..

**1.7 Room and Scorecard**  
 Same HUD and end‑of‑round scorecard shape (Decision quality / Portfolio safety / Room efficiency) — total room is now **1,600,000,000 VND** across five KHCN dossiers. Scoring is now Answer‑range feedback against the system's true DTI band and true Max‑installment ceiling.

**2\. Terminology**  
 Define on first use: Income, Existing obligations (self‑declared vs. CIC‑verified), Estimated Monthly Installment, DTI, Adjusted tenor.

