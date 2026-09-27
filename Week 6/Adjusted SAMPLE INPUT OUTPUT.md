# **SAMPLE INPUT OUTPUT**

## **I. INPUT DICTIONARY**

Currency: VND, monthly unless stated.

### **Definitions**

| Term | Precise Definition |
| ----- | ----- |
| Income | The applicant's total monthly cash inflow from any source (e.g. salary, business/trading revenue net of operating costs, rental income, or other regular receipts). This raw figure is then adjusted for verification reliability before entering the DTI formula. |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| Loan type | Unsecured or secured. A classification label only, used to select which row of the Product Parameters table (tenor cap, maximum age, interest rate) applies — it does not enter the DTI formula itself and does not change the DTI decision bands. |
| Adjusted DTI | (Existing obligations \+ New loan monthly installment) ÷ Adjusted Income, where Adjusted Income \= Income × verification percentage. |

### **Group A – Applicant Profile (dossier state, shown to player)**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Age | Applicant age in years | Integer | Team-authored | Adjusted tenor (age-to-70 cap) |
| Occupation type | Internal authoring tag only: {salaried\_verified, cash\_based\_unverified}. | Enum (internal) | Team-authored | Income Verification percentage (100% or 30–40%) |
| Occupation (player-facing text) | Free-text description of job/business \+ tenure \+ how income is paid out, written narratively so the correct verification tier must be inferred | Text | Team-authored | Same as occupation type, but this is what the player actually sees |
| Income | Applicant's total monthly cash inflow | Number (VND/month) | Team-authored | Adjusted Income → Adjusted DTI denominator |
| Existing obligations (self declared) | What the applicant states on the dossier screen before any check | Number (VND/month) | Team-authored | Displayed to player only — not used in the answer-key calculation |
| Existing obligations (CIC verified) | Revealed only after the player taps "Check CIC." May equal the self-declared figure or be higher | Number (VND/month) | Team-authored | This is the figure actually used — Adjusted DTI numerator, Max approvable installment |
| Employment tenure | Time with current employer / time in current line of work | Number (years) | Team-authored | Qualitative signal only, folded into the occupation text — no separate numeric factor anymore |
| CIC status | Credit-history group | Enum | Team-authored (mirrors CIC concept) | Display-only |

### **Group B – Loan Request**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Requested  amount | Loan principal requested.  | Number (VND) | Team-authored | New loan monthly installment (PMT); compared against the Decision Bands via Adjusted DTI |
| Requested term | Repayment period in months | Integer | Team-authored | Adjusted tenor (subject to product cap and age cap) → PMT |
| Loan type | {unsecured, secured} | Enum | Team-authored | Product Parameters lookup: tenor cap, max age, interest rate |
| Loan purpose | Applicant’s purpose of applying for a loan | Enum | Team-authored | Display-only / contextual flavor; not used in any formula |
| Collateral | Descriptive text only (e.g. "None (unsecured)", "The house being purchased", "An existing rental unit") | Text | Team-authored | Display-only |

### 

### 

### **Group C – Room State**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Room (total) | Total credit room for the period | Number (VND) | Team-set per round | Room-efficiency score |
| Room (used) | Cumulative approved amount in round | Number (VND) | System state | Remaining capacity |

### **Group D – Derived Variables**

| Variable | Formula | Notes |
| ----- | ----- | ----- |
| Adjusted tenor | min(requested term, product tenor cap, (max age at maturity − age) × 12\) | Product tenor cap / max age come from the Loan Type's Product Parameters row: Unsecured \= 60mo / age 70; Secured \= 360mo / age 70 |
| New loan monthly installment (PMT) | requested amount × r ÷ \[1 − (1+r)⁻ⁿ\], where r \= product interest rate ÷ 12, n \= adjusted tenor | Standard amortization formula, not a straight-line approximation. Shown to the player as "Estimated Monthly Installment" — already pre-computed, no label revealing the verdict |
| Income verification | 100% (Verified) or 30–40% (Cash-based/unverified — this Rulebook defaults to 30% unless a case justifies otherwise) | Hidden from the player until Reduce limit is locked in, or until the Card is revealed on Approve/Reject |
| Adjusted income | income × income verification | Hidden alongside the tier above |
| adjusted\_dti | (existing obligations cic verified \+ new loan\_monthly\_installment) ÷ adjusted\_income | The single Capacity gate. Hidden until after the decision is locked in |
| decision\_band | ≤ 70% → Approve; 70–80% → Reduce limit; \> 80% → Reject | Replaces the old band-width (±10/20/30%) logic entirely — fixed, universal lines |
| max\_approvable\_installment (Reduce-limit path only) | 70% × adjusted\_income − existing\_obligations\_cic\_verified | The figure the player is asked to hand-calculate themselves (Group E) |
| max\_approvable\_loan (Reduce-limit path only) | max\_approvable\_installment × \[1 − (1+r)⁻ⁿ\] ÷ r | Present Value conversion; the system computes this, not the player |

*Removed from this MVP entirely: NDI, Base monthly capacity, Employment factor, Age factor, Dependents factor, Adjusted monthly capacity, Implied principal, Band width, Accepted range, Burden, LTV, and the old straight-line "requested installment" (replaced by the real PMT above).*

### **Group E – Player Input**

| Variable | Meaning |
| ----- | ----- |
| decision | approve / reduce\_limit / reject. The tap is final the instant it's made — the UI never lets the player revisit it once a hidden field has been revealed (Anti-Exploit Locking Rule, MVP §6.3) |
| player\_entered\_max\_installment | Reduce-limit path only. The player's own hand calculation of max\_approvable\_installment, entered after locking in "Reduce limit." Must be positive and ≤ the original Estimated Monthly Installment |

**Sequencing (per MVP §6.3):**

1. **Approve / Reject:** tapping the category is final and jumps straight to the Decision-Consequence Card — Adjusted DTI, verification tier, and Adjusted Income are all revealed together.  
2. **Reduce limit:** tapping the category locks it in, then the system reveals adjusted\_income and the income\_verification tier (Adjusted DTI itself stays hidden a moment longer). The player computes max\_approvable\_installment by hand — one multiplication, one subtraction, no PMT math — and types it into player\_entered\_max\_installment. The system converts that entry into max\_approvable\_loan via Present Value. Only then does the Card reveal the real Adjusted DTI, the system's own correct figures, and how the player's entry compares — graded with a ±5% tolerance rather than an exact match.

---

## **II. SOURCE USE MAP**

| Source | Supports | Limitation |
| ----- | ----- | ----- |
| VN credit-officer job postings (Week 1\) | PROBLEM claim only — the Five Cs of Credit as the general framework motivating this project | This MVP's proof only implements Capacity (1C); Character, Capital, Collateral and Conditions remain explicitly deferred (MVP §1, §9) |
| Credit Appraisal Rulebook | Adjusted DTI formula, Income Verification tiers, Loan Type → Product Parameters, age-based tenor cap, 70%/80% decision bands, Threshold Disclosure | Internal team document |
| Finance-expert feedback (interview) | 70%/80% DTI decision bands; Income Verification % (100% / 30–40%); the age-to-70 tenor-cap mechanism, adapted from a real-estate-loan example the expert gave; Product Parameters (tenor cap, max age, interest rate) by Loan Type | Single-expert interview; the exact cut lines and the specific cash-based % actually used are marked Assumption in the Threshold Disclosure, not directly sourced |
| Team-authored dossiers | Scenario content; the self-declared vs. CIC-verified existing-obligations mechanic; income-reliability judgment calls written narratively rather than as exposed keywords | Simulated, not real customers |

*The previous CFPB General QM threshold (43%) and Fannie Mae DU casefile maximum (50%) rows are removed — the current Threshold Disclosure no longer cites either; the 70%/80% lines are now sourced to finance-expert feedback instead.*

---

## **IV. SAMPLE INPUT / OUTPUT**

Reused directly from the finalized dossier set (KHCN-03 — Trịnh Thị Hạnh), so every figure below matches that document exactly.

### **Dossier**

| Field | Value |
| ----- | ----- |
| Age | 44 |
| Occupation (player-facing) | Owner, home-appliance retail shop, Hải Phòng — 7 years running the business, a well-known local shop with a small staff |
| Income (self-reported) | 95,000,000 VND/month — most of her daily sales are settled in cash at the counter, and she keeps track of revenue in a personal notebook rather than through a dedicated business account |
| Existing obligations (self-declared) | 10,000,000 VND/month (supplier credit installment) |
| CIC status | Group 2 — one late payment \~5 months ago on the supplier credit line, since resolved and current |
| Loan type | Unsecured |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 280,000,000 VND |
| Requested term | 72 months |
| Loan purpose | Business expansion — additional shop floor space and a second product line |
| Collateral | None (unsecured) |
| Estimated Monthly Installment (shown to player) | 7,110,200 VND/month |

**Revealed via "Check CIC":** Existing obligations (CIC-verified) \= **15,000,000 VND/month** — the supplier credit line (10,000,000) is confirmed, plus an undisclosed working-capital installment loan of 5,000,000 VND/month, never mentioned.

### **Step-by-step calculation**

| Step | Calculation | Result |
| ----- | ----- | ----- |
| Loan Type → Product Parameters | Unsecured → tenor cap 60mo, max age 70, rate 18%/year | r \= 1.5%/mo |
| Adjusted tenor | min(requested 72, product cap 60, (70−44)×12 \= 312\) | 60 months — the requested 72 exceeds the unsecured cap, so it's capped down |
| New loan monthly installment (PMT) | 280,000,000 × 0.015 ÷ \[1 − (1.015)⁻⁶⁰\] | ≈ 7,110,200 |
| Income verification | No bank-traceable income history, only personal records → Cash-based/unverified | 30% → Adjusted Income \= 95,000,000 × 0.30 \= 28,500,000 |
| Adjusted DTI (using CIC-verified obligations) | (15,000,000 \+ 7,110,200) ÷ 28,500,000 | 77.6% |
| Classification | 70% \< 77.6% ≤ 80% | **REDUCE LIMIT** |
| Max approvable installment | 70% × 28,500,000 − 15,000,000 | 4,950,000 |
| Max approvable loan (PV, n=60, r=1.5%) | 4,950,000 × 0.590704 ÷ 0.015 | ≈ 194,932,000 VND |

**Hard gate check:** neither the 70% nor 80% line is a "hard gate" in the old sense — they're the entire decision band. There's no separate DTI/Burden pre-check anymore; Adjusted DTI alone decides.

### **The trap**

Using the numbers exactly as declared — self-declared obligations (10,000,000) and full face-value income (95,000,000), with no verification discount applied — gives (10,000,000 \+ 7,110,200) ÷ 95,000,000 \= **18.0%**, which looks like an easy Approve. This is the trap: nothing about her income is documented well enough to credit at face value, and CIC adds 5,000,000/month she didn't declare. Correctly applying both corrections brings Adjusted DTI to **77.6%** — Reduce limit, not Approve, and the defensible ceiling (≈194,932,000) is well below the 280,000,000 requested.

### **Reduce-limit sub-flow (Group E walkthrough)**

1. Player taps **Reduce limit**. This is now locked in — no switching to Approve or Reject afterward.  
2. System reveals: Adjusted Income \= 28,500,000; verification tier \= Cash-based/unverified, 30%. Adjusted DTI itself is still hidden.  
3. Player calculates max\_approvable\_installment by hand: 70% × 28,500,000 − 15,000,000 \= **4,950,000**, and enters this figure.  
4. System converts the entry to a loan amount via Present Value: 4,950,000 × 0.590704 ÷ 0.015 ≈ **194,932,000 VND**.  
5. Card reveals: real Adjusted DTI (77.6%), the system's own correct max\_approvable\_installment (4,950,000) and max\_approvable\_loan (≈194,932,000), and scores the player's entry against a ±5% tolerance band — here, 4,702,500 to 5,197,500.

### **Correct Decision: Reduce limit (down to ≈194,932,000 VND at the same 60-month term)**

### **Decision-Consequence Card**

Despite a strong-looking revenue figure, most of Hạnh's income has no bank-traceable record this Rulebook can credit at face value — only 30% of it counts toward capacity. Once her usable income is applied and her true obligations — including a working-capital loan she did not disclose — are factored in, total monthly debt service reaches roughly 78% of what she can actually be shown to earn. This leaves almost no room to absorb a slow month at the shop. Approving the loan as requested would extend more credit than her documented income can support; the defensible offer is a smaller loan at the same term, not the amount as requested.

