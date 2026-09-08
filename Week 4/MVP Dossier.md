# **Dossier Set for MVP**

1. ## **Quick Reference**

| Case ID | Name / Age | Complexity Tier | Primary Capacity Trigger(s) | Gate Outcome | Correct Decision |
| ----- | ----- | ----- | ----- | ----- | ----- |
| KHCN-001 | Bùi Văn Long, 38 | Medium (±20%) | Dependents (×0.90) | Burden 90% → hard gate | **Reject** |
| KHCN-003 | Lê Văn Bình, 34 | Medium (±20%) | Employment only (commission, ×0.85) | No gate | **Reject** |
| KHCN-004 | Đặng Thị Lan, 57 | Medium (±20%) | Age only (near-retirement, ×0.70) | No gate | **Approve** |
| KHCN-005 | Phạm Văn Tâm, 45 | High (±30%) | Employment (×0.70) \+ Dependents (×0.80) \+ Unstable-income flag | Burden warning only (45%), red-flag shift −15% | **Approve \+ Reduce limit** |
| KHCN-006 | Nguyễn Thị Hồng, 56 | High (±30%) | Employment (×0.85) \+ Age (×0.70) | Burden warning only (42.9%), no shift | **Approve** |

2. **Dossier set**

# **KHCN-001 — Bùi Văn Long, 38**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Bùi Văn Long, 38 |
| Occupation | Maintenance technician, manufacturing company — permanent contract, 4 years tenure |
| Marital status | Married |
| Dependents | 2 |
| Monthly gross income | 15,000,000 VND (verified) |
| Monthly living expenses | 8,000,000 VND |
| Existing monthly debt obligations | 5,500,000 VND (2 active consumer loans, both on-time) |
| Credit history (CIC) — display-only | Group 1, clean |
| Requested amount | 100,000,000 VND |
| Requested term | 24 months |
| Loan purpose | Car repair, consumer spending |
| Collateral | Unsecured (salary-based) |
| NDI (bare number) | 1,500,000 |
| DTI (bare number) | 36.7% |
| Burden (bare number) | 90.0% |
| Estimated Monthly Installment | 4,167,000 VND/month (100,000,000 ÷ 24\) |

### **B. Author-Side Calculation**

1. ## **NDI** \= 15,000,000 − 8,000,000 − 5,500,000 \= **1,500,000**

2. ## **Base Monthly Capacity** \= 1,500,000 × 42.5% \= **637,500**

3. ## **Risk factors:**

   * ## Employment: permanent contract, 4-yr tenure → **Stable ×1.00**

   * ## Age: 38 now, term 24 mo → matures at 40, 20 years to age 60 (\>5 yrs) → **Safe ×1.00**

   * ## Dependents: 2 → 2–3 tier → **Moderate ×0.90**

4. ## **Adjusted Monthly Capacity** \= 637,500 × 1.00 × 1.00 × 0.90 \= **573,750**

5. ## **Complexity check**: exactly one factor \<1.00 (Dependents) → **Medium complexity, Band ±20%**

6. ## **Band** (pre-gate) \= 573,750 × 0.80 to 573,750 × 1.20 \= **459,000 – 688,500**

7. ## Gates:

   * ## DTI \= 5,500,000 / 15,000,000 \= 36.7% → Moderate warning zone (35–43%) — caution note only, no numeric change

   * ## Burden \= (8,000,000 \+ 5,500,000) / 15,000,000 \= 90.0% → **Excessive (\>50%) → hard gate**

8. ## Decision gate fires: Burden \> 50% → **REJECT**

### **C. Correct Decision: Reject**

### **D. Decision-Consequence Card (shown after decision)**

* ## Based on Capacity alone: this applicant's committed spending (living costs \+ existing debt obligations) already consumes 90% of his income, leaving essentially no disposable income to safely absorb a new obligation of this size.

* ## The requested installment (4,167,000/month) is roughly 6× his defensible affordability ceiling — but the Burden hard gate (90% \> 50%) overrides the Band comparison entirely, so the case is rejected on the gate alone, regardless of band width.

## **KHCN-002 — Lê Văn Bình, 34**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Lê Văn Bình, 34 |
| Occupation | Real-estate sales agent, established residential brokerage, TP.HCM — 3 years in role, commission-based income (recent 6-month average shown) |
| Marital status | Single |
| Dependents | 1 |
| Monthly gross income | 30,000,000 VND |
| Monthly living expenses | 9,000,000 VND |
| Existing monthly debt obligations | 3,000,000 VND (car loan installment) |
| Credit history (CIC) | Group 1, clean |
| Requested amount | 240,000,000 VND |
| Requested term | 24 months |
| Loan purpose | Asset purchase — car upgrade |
| Collateral | Unsecured (salary-based) |
| NDI (bare number) | 18,000,000 |
| DTI (bare number) | 10.0% |
| Burden (bare number) | 40.0% |
| Estimated Monthly Installment | 10,000,000 VND/month (240,000,000 ÷ 24\) |

### **B. Author-Side Calculation**

1. **NDI** \= 30,000,000 − 9,000,000 − 3,000,000 \= **18,000,000**  
2. **Base Monthly Capacity** \= 18,000,000 × 42.5% \= **7,650,000**  
3. Risk factors:  
   * Employment: commission-based → **Moderate risk ×0.85**  
   * Age: 34, term 24 mo, safe → **×1.00**  
   * Dependents: 1 → **×1.00**  
4. **Adjusted Monthly Capacity** \= 7,650,000 × 0.85 \= **6,502,500**  
5. Complexity check: exactly one factor \<1.00 (Employment). DTI 10.0% (no flag). Burden 40.0% (boundary — ≤40% counts as Normal, no flag). → **Medium complexity, Band ±20%**  
6. **Band** \= 6,502,500 × 0.80 to 6,502,500 × 1.20 \= **5,202,000 – 7,803,000**  
7. Gates: DTI/Burden clean — no hard gate, no shift.  
8. Classification: Estimated installment **10,000,000** exceeds the Band's upper edge (7,803,000) by about **28.1%** — well beyond the round's 20% Reduce tolerance → **REJECT**

### **C. Correct Decision: Reject**

### **D. Decision-Consequence Card**

* Based on Capacity alone: even after accounting for this applicant's variable, commission-based income, the requested installment is well above what his adjusted capacity can defensibly support.  
* Approving at this level would leave no realistic buffer during a slow commission month.

## **KHCN-003 — Đặng Thị Lan, 57**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Đặng Thị Lan, 57 |
| Occupation | Logistics coordinator, freight-forwarding company, Hải Phòng — permanent contract, 10 years tenure |
| Marital status | Widowed |
| Dependents | 1 |
| Monthly gross income | 18,000,000 VND |
| Monthly living expenses | 6,500,000 VND |
| Existing monthly debt obligations | 500,000 VND (motorbike loan, nearly paid off) |
| Credit history (CIC) — display-only | Group 2 — one late payment 5 months ago, since resolved and current |
| Requested amount | 100,000,000 VND |
| Requested term | 36 months |
| Loan purpose | Consumption — daughter's wedding expenses |
| Collateral | Unsecured (salary-based) |
| NDI (bare number) | 11,000,000 |
| DTI (bare number) | 2.8% |
| Burden (bare number) | 38.9% |
| Estimated Monthly Installment | 2,778,000 VND/month (100,000,000 ÷ 36\) |

### **B. Author-Side Calculation**

1. **NDI** \= 18,000,000 − 6,500,000 − 500,000 \= **11,000,000**  
2. **Base Monthly Capacity** \= 11,000,000 × 42.5% \= **4,675,000**  
3. Risk factors:  
   * Employment: permanent, 10-yr tenure → **Stable ×1.00**  
   * Age: 57 now, term 36 mo → matures at 60, within 5 years of 60 → **Near-retirement ×0.70**  
   * Dependents: 1 → **×1.00**  
4. **Adjusted Monthly Capacity** \= 4,675,000 × 0.70 \= **3,272,500**  
5. Complexity check: exactly one factor \<1.00 (Age). DTI 2.8% (no flag). Burden 38.9% (≤40%, no flag). → **Medium complexity, Band ±20%**  
6. **Band** \= 3,272,500 × 0.80 to 3,272,500 × 1.20 \= **2,618,000 – 3,927,000**  
7. Gates: DTI/Burden both clean — no hard gate, no shift.  
8. Classification: Estimated installment **2,778,000** falls inside \[2,618,000 – 3,927,000\] → **APPROVE**

### **C. Correct Decision: Approve**

### **D. Decision-Consequence Card**

* Based on Capacity alone: even after the near-retirement adjustment on her repayment horizon, this applicant's disposable income supports the requested installment with a reasonable margin inside the Band.  
* Approving at this level does not appear to strain her monthly budget based on the figures reviewed.

## **KHCN-004 — Phạm Văn Tâm, 45**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Phạm Văn Tâm, 45 |
| Occupation | Seasonal produce wholesaler, An Giang (Mekong Delta) — self-employed, 8 years in trade; income tied to harvest cycles |
| Marital status | Married |
| Dependents | 4 |
| Monthly gross income | 20,000,000 VND (recent 6-month average; documented range ≈13,500,000–26,500,000, a \~32% swing) |
| Monthly living expenses | 7,000,000 VND |
| Existing monthly debt obligations | 2,000,000 VND (motorbike loan) |
| Credit history (CIC) — display-only | Group 2, one late payment 8 months ago, since resolved |
| Requested amount | 95,000,000 VND (first-phase purchase of a smaller refurbished cold-chain unit) |
| Requested term | 36 months |
| Loan purpose | Business expansion — cold-chain storage equipment |
| Collateral | Motorbike |
| NDI (bare number) | 11,000,000 |
| DTI (bare number) | 10.0% |
| Burden (bare number) | 45.0% |
| Estimated Monthly Installment | 2,638,888 VND/month (95,000,000 ÷ 36\) |

### **B. Author-Side Calculation**

1. **NDI** \= 20,000,000 − 7,000,000 − 2,000,000 \= **11,000,000**  
2. **Base Monthly Capacity** \= 11,000,000 × 42.5% \= **4,675,000**  
3. Risk factors:  
   * Employment: seasonal, highly income-variable trading (\>30% documented month-to-month swing) → **High risk ×0.70**  
   * Age: 45, term 36 mo → matures at 48, safe → **×1.00**  
   * Dependents: 4 → **High burden ×0.80**  
4. **Adjusted Monthly Capacity** \= 4,675,000 × 0.70 × 0.80 \= **2,618,000**  
5. Complexity check: **two factors \<1.00** (Employment, Dependents) → **High complexity, Band ±30%** (pre-gate)  
6. **Band (pre-gate)** \= 2,618,000 × 0.70 to 2,618,000 × 1.30 \= **1,832,600 – 3,403,400**  
7. Gates (fixed order):  
   * DTI \= 2,000,000 / 20,000,000 \= **10.0%** → Low, does not trigger the 43–50% shift.  
   * Burden \= (7,000,000 \+ 2,000,000) / 20,000,000 \= **45.0%** → Warning zone (40–50%) — caution note only, no numeric change, not a hard gate.  
   * Unstable-income red flag: documented variation (\~32%) exceeds the 30% trigger → **REDUCE LIMIT (15%)**  
8. **Final Band** \= 1,832,600 × 0.85 to 3,403,400 × 0.85 \= **1,557,700 – 2,892,900**  
9. Classification: Estimated installment **2,638,888  VND** is within the reduced limit band **→ APPROVE \+ REDUCE LIMIT**

   ### **C. Correct Decision: Approve \+ Reduce limit**

### **D. Decision-Consequence Card**

* Based on Capacity alone: the raw disposable income (11,000,000/month) and headline ratios (DTI 10%, Burden 45%) look manageable on their own, but this applicant's income is both highly seasonal and supports four dependents — two separate risk adjustments that shrink his true repayment capacity well below the raw numbers.  
* On top of that, his documented income swings beyond the instability threshold, narrowing the safe range further.  
* Approving the full requested amount would leave him exposed during a slow season, once the two structural risk factors and the income-volatility adjustment are accounted for; a reduced limit keeps the installment inside a capacity range he can service through both good and weak months.

## **KHCN-005 — Nguyễn Thị Hồng, 56**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Nguyễn Thị Hồng, 56 |
| Occupation | Insurance sales agent, established life-insurance branch, Cần Thơ — 6 years in role, commission-based income (verified 6-month average, historically stable) |
| Marital status | Married |
| Dependents | 1 |
| Monthly gross income | 28,000,000 VND (verified 6-month average) |
| Monthly living expenses | 9,000,000 VND |
| Existing monthly debt obligations | 3,000,000 VND (personal loan installment, on-time) |
| Credit history (CIC) | Group 1, clean |
| Requested amount | 108,000,000 VND |
| Requested term | 36 months |
| Loan purpose | Consumption — home repair |
| Collateral | Unsecured (salary-based) |
| NDI (bare number) | 16,000,000 |
| DTI (bare number) | 10.7% |
| Burden (bare number) | 42.9% |
| Estimated Monthly Installment | 3,000,000 VND/month (108,000,000 ÷ 36\) |

### **B. Author-Side Calculation**

1. **NDI** \= 28,000,000 − 9,000,000 − 3,000,000 \= **16,000,000**  
2. **Base Monthly Capacity** \= 16,000,000 × 42.5% \= **6,800,000**  
3. **Risk factors:**  
   * Employment: commission-based insurance sales → **Moderate risk ×0.85**  
   * Age: 56 now, term 36 mo → matures at 59, within 5 years of 60 → **Near-retirement ×0.70**  
   * Dependents: 1 → 0–1 tier → **×1.00**  
4. **Adjusted Monthly Capacity** \= 6,800,000 × 0.85 × 0.70 × 1.00 \= **4,046,000**  
5. **Complexity check:** two factors \<1.00 (Employment, Age) → **High complexity, Band ±30%**  
6. **Band (pre-gate)** \= 4,046,000 × 0.70 to 4,046,000 × 1.30 \= **2,832,200 – 5,259,800**  
7. **Gates:**  
   * DTI \= 3,000,000 / 28,000,000 \= 10.7% → Low/acceptable, no flag  
   * Burden \= (9,000,000 \+ 3,000,000) / 28,000,000 \= 42.9% → Warning zone (40–50%) — caution note only, no numeric change  
   * Unstable-income red flag: not triggered (income documented as stable despite commission structure)  
8. **Final Band** \= 2,832,200 – 5,259,800 (unchanged)  
9. **Classification:** Estimated installment 3,000,000 falls inside \[2,832,200 – 5,259,800\] → **APPROVE**

### **C. Correct Decision: Approve**

### **D. Decision-Consequence Card (shown after decision)**

* Based on Capacity alone: despite two separate risk adjustments — commission-based income and an approaching retirement horizon within the loan term — this applicant's modest requested installment sits comfortably inside her adjusted capacity band.  
* Her Burden ratio (42.9%) sits in the warning zone, worth a caution note, but on its own it doesn't change this classification — no gate fired and no shift applies.

