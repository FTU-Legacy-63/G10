# **I. INPUT DICTIONARY**

Currency: VND, monthly unless stated.

## **Definitions**

| Term | Precise Definition |
| ----- | ----- |
| Income | Verified net monthly income after tax, based on payslip/bank statement. Bonus or irregular income is excluded unless it recurs for ≥ 6 consecutive months. |
| Living costs | Self-reported baseline monthly living expenses (housing, food, utilities, transport). Debt repayments are NOT included here — they belong to Existing obligations. |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| NDI | Net Disposable Income \= Income − Living costs − Existing obligations. |

## **Group A – Applicant Profile (dossier state, shown to player)**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| age | Applicant age in years | Integer | Team-authored dossier | Age/maturity factor (near-retirement check) |
| occupation type | Employment category: {salaried stable, self employed variable, commission freelance} | Enum | Team-authored | Maps to **Employment stability factor** tier (Stable / Moderate risk / High risk) |
| income | Verified net monthly income after tax (see Key Definitions). Bonus/irregular income excluded unless recurring ≥6 months | Number (VND/month) | Team-authored, framed as "verified" | NDI, DTI, Burden denominator |
| living costs | Baseline monthly spending only (housing, food, utilities, transport) | Number (VND/month) | Team-authored | NDI, Burden numerator |
| existing obligations | Sum of installment/interest on all active debts (excludes the loan being evaluated) | Number (VND/month) | Team-authored | NDI, DTI numerator, Burden numerator |
| employment tenure | Time with current employer / time in current line of work | Number (years/months) | Team-authored | Employment stability factor tier (Stable requires ≥2 yrs \+ permanent contract) |
| dependents | Number of financially dependent persons | Integer | Team-authored | Dependents factor tier |
| cic status | Credit-history group: {group1 clean, group2 recent late, group3plus adverse} | Enum | Team-authored (mirrors CIC concept) | Character |
| marital status | Contextual only | — | — | Narrative flavor only, or cut |
| health status | Contextual unless a dossier ties it to a consequence | — | — | Cut unless justified |

## **Group B – Loan Request**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| requested amount | Loan principal requested | Number (VND) | Team-authored | Compared against Accepted Range, LTV |
| requested term (tenor) | Repayment period in months | Integer | Team-authored | Implied principal, requested installment |
| loan purpose | {consumption, business expansion, asset purchase} | Enum | Team-authored | Conditions logic, plausibility check |
| collateral type / value | Asset offered \+ pre-set appraised value | Enum \+ Number (VND) | Team-authored | LTV, recovery in consequence |

## **Group C – Room State (unchanged)**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| room total | Total credit room for the period | Number (VND) | Team-set per round | Room-efficiency score |
| room used | Cumulative approved amount in round | Number (VND) | System state | Remaining capacity |

## **Group D – Derived Variables**

| Variable | Formula | Notes |
| ----- | ----- | ----- |
| NDI | income − living costs − existing obligations | The single capacity measure |
| base monthly capacity | NDI × 40–45% (affordability ratio) | Was previously called "affordability band"; now just an intermediate step, not the final range |
| employment factor  | ×1.00 / ×0.85 / ×0.90 / ×0.70 by tier (see Risk Adjustment Factors) | Stable/Moderate/High risk |
| age factor | ×1.00 (safe) or ×0.70 (near retirement, \<5 yrs to age 60\) |  |
| dependents factor | ×1.00 / ×0.90 / ×0.80 by tier | 0–1 / 2–3 / ≥4 |
| adjusted monthly capacity | base monthly capacity (point estimate) × employment factor × age factor × dependents factor | Replaces the old flat "-X% credit limit" red-flag stacking |
| implied principal (secondary) | adjusted monthly capacity × tenor | Informational only, not the final gate |
| band width | ±10% / ±20% / ±30% by complexity tier | See Band Width Logic |
| accepted range | adjusted point estimate × (1 − band width) to × (1 \+ band width), then shifted per DTI/red-flag rules (see Decision Gates) | The actual approve/reduce/reject boundary |
| DTI | existing obligations ÷ income | **No longer includes the new loan's payment** — this is the biggest change from v1 |
| burden | (existing obligations \+ living costs) ÷ income | New, separate gate from DTI |
| LTV | requested amount ÷ collateral value | Unchanged |
| requested installment | requested amount ÷ requested term (interest excluded — Simplified Installment Formula) | Compared directly against the Accepted Range; no longer feeds DTI |

## **Group E – Player Input**

| Variable | Meaning |
| ----- | ----- |
| decision | **reject**, or **approve** \+ approved amount \+ optional conditions |
| proposed limit | Amount player would grant. Scored against Accepted Range, not exact match |

# **II. ASSUMPTIONS**

1. **Capacity rule** — capacity \= NDI × 40–45%, adjusted by three multiplicative risk factors (Employment, Age, Dependents), then expanded into a range by Band Width, then shifted by DTI/red-flag gates. Disclosure: shown as a range on the explanation screen.  
2. **Band width logic** — see table above. Reason: simple profiles get a tight band, ambiguous profiles a wide one. Risk: the exact stacking math when both a DTI-shift and a red-flag-shift could apply is resolved via the else-if chain in Order of Operations (only one numeric shift applies at a time; warning-only flags never change numbers).  
3. **DTI ceiling** — see Decision Gates. Risk: no cited VN regulatory basis; DTI warning benchmark (43%) is sourced from CFPB, hard ceiling (50%) informed by Fannie Mae DU casefile maximum — the rest is team assumption.  
4. **Burden ceiling** — new, separate gate from DTI. Risk: no cited VN regulatory basis; MVP assumption.  
5. **Unstable income red flag** — trigger \>30% month-to-month variation → band shifts down 15%. Risk: subjective; "occupation risk" itself is defined by income volatility, not job prestige, to avoid bias.  
6. **Deterministic consequence** — each dossier has one designed outcome, not a probabilistic simulation.  
7. **Claim boundary** — see Claim Boundary table below.  
8. **Given collateral valuation** — collateral\_value is pre-set; player interprets LTV, does not appraise. Risk: real valuation is complex.  
9. **Simulated dossiers** — all applicants fictional. Reason: privacy and feasibility.  
10. **Income definition (replaces old 30% haircut rule)** — Income \= verified net income after tax; bonus/irregular income excluded unless recurring ≥6 consecutive months. Risk: for commission/freelance applicants, judgment is needed on whether variable earnings "recur" — flagged as a design judgment call, not a sourced standard.  
11. **Employment stability classification (replaces old 6-month minimum-tenure rule)** — Stable tier now requires ≥2 years tenure \+ permanent contract (not 6 months). Risk: no cited VN regulatory or bank-policy basis; team judgment call.  
12. **Simplified installment formula** — requested installment \= requested amount ÷ tenor, interest excluded. Used only to compare against the Accepted Range. Reason: keeps arithmetic invisible to the player.

# **III. SOURCE USE MAP**

| Source | Supports | Limitation |
| ----- | ----- | ----- |
| VN credit-officer job postings (Week 1\) | PROBLEM claim only | — |
| Five Cs of Credit | Red-flag taxonomy; proof dossier covers all judgment dimensions | — |
| Credit Appraisal Rulebook | Base calculation, risk factors, band width, decision gates, threshold disclosure | Internal team document |
| CFPB General QM threshold | DTI warning benchmark (43%) | Sourced |
| Fannie Mae DU casefile maximum | DTI hard ceiling (50%) informed by this | "Informed by," not a direct citation |
| Team-authored dossiers | Scenario content, embedded red flags | Simulated, not real customers |

# **IV. SAMPLE INPUT / OUTPUT**

### **Dossier**

| Field | Value |
| ----- | ----- |
| Age | 42 |
| Occupation | commission freelance — independent real estate broker, 9 years in the field |
| Income (verified, net) | 45m/month (documented range 25m–65m) |
| Living costs | 15m/month |
| Existing obligations | 5m/month (car loan) |
| Dependents | 2 |
| CIC status | group 2 |
| Requested amount | 400m |
| Requested term | 36 months |
| Loan purpose | business\_expansion (slowing sub-market) |
| Collateral | Apartment valued 800m |

### **Step-by-step calculation**

| Step | Calculation | Result |
| ----- | ----- | ----- |
| NDI | 45 − 15 − 5 | 25m |
| Base monthly capacity (point) | 25m × 42.5% (midpoint of 40–45%) | 10.625m |
| Employment factor | Commission-based → judged Moderate risk (9-yr track record ≠ seasonal/highly unstable, so not High risk) | ×0.85 |
| Age factor | 42 y/o, 18 yrs to retirement (\>5) → Safe | ×1.00 |
| Dependents factor | 2 dependents → 2–3 tier | ×0.90 |
| Adjusted point estimate | 10.625m × 0.85 × 1.00 × 0.90 | **≈** 8.13m/month |
| Complexity tier | 2 factors \<1.00 (Employment, Dependents) → High | Band width ±30% |
| Pre-shift band | 8.13m × 0.70 – 8.13m × 1.30 | 5.69m – 10.57m |
| DTI | 5 / 45 | **11.1%** → Low, no numeric shift |
| Burden | (5+15) / 45 | **44.4%** → Warning zone (40–50%), caution note only |
| Red flag check | Income variation ±44% (25m–65m) \> 30% trigger | Band shifts down 15% |
| Final accepted range (installment) | 8.13m × (0.70−0.15) – 8.13m × (1.30−0.15) | **≈ 4.47m – 9.35m/month** |
| Implied principal range (36 months) | 4.47m × 36 – 9.35m × 36 | **≈ 161m – 337m** |
| LTV | 400 / 800 | 50% |
| Requested installment (simplified) | 400 / 36 | **≈ 11.11m/month** — above the ceiling |

Hard gates: DTI 11.1% and Burden 44.4% are both under 50% → **no automatic reject.**

### **Five Cs Analysis**

| C | Status | Note |
| ----- | ----- | ----- |
| **Capacity** | Flagged | Adjusted point estimate (\~8.13m) already discounted for commission-based income and 2 dependents; High-complexity band (±30%) then shifted down 15% for income volatility → ceiling of \~9.35m/month (\~337m principal). Requested 11.11m/month clearly exceeds it. |
| **Character** | Flagged – Soft | CIC Group 2 (1 late cycle) — qualitative gate outside the numeric Rulebook; requires monitoring, not a hard block. |
| **Capital** | Clean | 50% equity stake in the collateral; no over-leverage. |
| **Collateral** | Clean | LTV 50% — well within a safe range. |
| **Conditions** | Flagged | Loan purpose is business\_expansion into a *slowing* sub-market, compounding the already-flagged income volatility. |

**The trap:** DTI (11.1%) and LTV (50%) both look very safe under the new definitions — DTI no longer even includes the new loan's payment — tempting a naive player to approve the full 400m. But Capacity is the binding constraint: the Employment factor (commission-based, ×0.85) and Dependents factor (×0.90) shrink the point estimate, two sub-1.00 factors push the case into the High-complexity ±30% band, and the Unstable-income red flag (±44% variation) shifts that band down another 15% — capping the accepted principal at roughly 337m, well short of the 400m requested.

### **Intended Output**

* **Correct decision:** reduce limit to ≈ 337m at 36-month tenor (installment ≈ 9.35m/month, at the top of the accepted range) \+ add\_conditions (periodic review for income-volatility monitoring, restrict loan purpose given the slowing sub-market). Approve-full (400m) is wrong.  
* **Answer range:** proposed\_limit 161m–337m scores in-band; above 337m up to 400m is penalized; full 400m triggers the trap.  
* **Consequence card if approved full:** during the sub-market slowdown, the broker's commission income drops toward the low end of its documented range, the 11.11m/month installment strains cash flow, payment delays occur, CIC drops to Group 3+, and portfolio risk-adjusted score falls.

**Explanation shown:** DTI (11.1%) and LTV (50%) look safe because DTI now excludes the new loan and this applicant carries little existing debt. But Capacity is the binding C once the commission-based income (Employment ×0.85), two dependents (×0.90), and ±44% income volatility (High-complexity band ±30%, then −15% shift) are applied — the true ceiling is \~337m, not 400m. Combined with a soft Character flag (CIC Group 2\) and a Conditions flag (slowing sub-market), a reduced limit with monitoring conditions is required.

