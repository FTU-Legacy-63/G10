**Calculations and Logic test (Owner: Lai Ngoc Linh)**

# **1\.**	**Definitions**

| Term | Precise definition |
| :---- | :---- |
| Income | Verified net monthly income after tax, based on payslip/bank statement. Bonus or irregular income is excluded unless it recurs for ≥ 6 consecutive months. For self-employed or business-owner applicants, this figure is the personal income remaining after business operating costs are deducted from business revenue \- i.e., what the applicant actually has available before their personal living expenses and debts are considered. |
| Living costs | Self-reported baseline monthly living expenses (housing, food, utilities, transport). Debt repayments are NOT included here – they belong to Existing obligations. |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| NDI | Net Disposable Income \= Income − Living costs − Existing obligations. |

# **2\.**	**Credit Limit Formula and Risk Adjustment Factors**

# **2.1.**   	**Base calculation – Decision: affordability-ratio method**

●       **NDI \= Income − Living costs − Existing obligations**

●       **Base monthly repayment capacity \= NDI × 40–45% (affordability ratio)**

●     **Adjusted monthly capacity \= Base Monthly Capacity × Employment factor × Age factor × Dependents factor**

●   	Secondary, derived figure: Implied total loan principal (secondary, derived figure): Implied principal ≈ Adjusted monthly capacity × Tenor (months)

## **2.2.**         **Risk adjustment factors**

### **\-**        **Employment stability factor**

| Tier | Condition | Factor | Justification |
| :---- | :---- | :---- | :---- |
| Stable | Salaried, ≥ 2 years tenure, permanent contract | ×1.00 | Steady income supports repayment throughout the loan term |
| Moderate risk | Variable income, short tenure, or commission-based | ×0.85 | Less certain income reduces repayment reliability |
| High risk | Seasonal / freelance / highly unstable employment | ×0.70 | Vulnerable to sudden loss (seasonal unemployment, gig risk) |

### **\-**        **Age / maturity factor**

| Tier | Condition | Factor | Justification |
| :---- | :---- | :---- | :---- |
| Safe | More than 5 years to **age 60** | ×1.00 | Long runway to keep earning and repaying |
| Near retirement | Loan maturity falls within 5 years of **age 60** | ×0.70 | Risk of losing primary income before the loan is fully repaid |

### **\-**        **Dependents factor**

| Tier | Condition | Factor | Justification |
| :---- | :---- | :---- | :---- |
| 0 –1 dependents | Low household burden | ×1.00 | Low relative burden on disposable income |
| 2–3 dependents | Moderate household burden | ×0.90 | Higher fixed spending reduces effective repayment capacity |
| ≥ 4 dependents | High household burden | ×0.80 | Heavy fixed living costs leave little room to absorb income shocks |

# **3\.**	**Bandwidth Logic**

Band width is set by how many risk signals are present, so simple profiles get a tight band and ambiguous profiles get a wide one

| Complexity tier | Trigger condition | Band width (± around point estimate) |
| :---- | :---- | :---- |
| Low | All factors \= ×1.00 and no warning/red flags | ± 10% |
| Medium | Exactly one factor \< 1.00, OR one warning-level flag (DTI/Burden warning zone) | ± 20% |
| High | Two or more factors \< 1.00, OR any conflicting signals (e.g. strong Capacity but Unstable income flag) | ± 30% |

Accepted range \= Adjusted point estimate × (1 − band width) to Adjusted point estimate × (1 \+ band width).

# **4\.**	**Decision Gates (DTI and Burden)**

·        DTI \= existing debt only/income

·        Burden \= (existing debt \+ living costs)/income

## **4.1.**         **DTI**

| DTI | Classification | Treatment |
| :---- | :---- | :---- |
| ≤ 35% | Low / acceptable | No adjustment |
| \> 35–43% | Moderate warning | Warning flag only – no numeric change |
| \> 43–50% | High burden | Band shifts down 10% (both ends) |
| \> 50% | Very high burden | Hard gate → Reject, overrides band entirely |

## **4.2.**         **Burden**

| Burden | Classification | Treatment |
| :---- | :---- | :---- |
| ≤ 40% | Normal | No adjustment |
| \> 40–50% | Warning | Warning flag only |
| \> 50% | Excessive | Hard gate → Reject, overrides band entirely |

## **4.3.**         **Order of operations**

●   	1\. Compute NDI, Base capacity, Adjusted point estimate, and Band (Sections 2–3).

●   	2\. Compute DTI and Burden.

●   	3\. If DTI \> 50% OR Burden \> 50% → Reject. This hard gate overrides the band entirely – stop here.

●   	4\. Else if DTI is 43–50% → shift the band down 10% (both ends).

●   	5\. Else if Income volatility red flag triggers → shift the band down 15%.

●   	6\. Warning-only flags (DTI 35–43%, Burden 40–50%) attach a caution note but do not change numbers.

●   	7\. Compare the requested installment/amount to the final band → Approve / Reduce limit / Reject.

\-\> Exceeding the threshold will reduce the bandwidth; within or below the threshold will be approved; and hard gates will be immediately rejected

# **5\.**    **Red Flag Table**

| Red Flag | Trigger condition | Adjustment | Business justification |
| :---- | :---- | :---- | :---- |
| Unstable income | Month-to-month income variation \> 30%, even if job type is nominally stable | Band shifts down 15% | Observed cash-flow volatility increases delinquency risk beyond what job-type alone captures |

# **6\.**	**Per-Dossier Answer Key**

| Case ID | Correct decision | Accepted range (monthly installment) | Reasoning |
| :---- | :---- | :---- | :---- |
| KHCN – 001 – Bùi Văn Long, 38 | Reject | 600,000 – 675,000 VND/month (≈ 14.4–16.2M principal at 24-month tenor) | NDI \= 1,500,000; DTI \= 36.7% (moderate warning, no numeric change); Burden \= 90% (excessive → hard gate Reject). Employment factor ×1.00 (stable, 4-yr tenure), Age factor ×1.00, Dependents factor ×0.90 (2 dependents) → Low-Medium complexity tier. Requested installment 4,167,000 is 6.2× the affordable ceiling – request rejected regardless of band width. |
| KHCN-002 – Lê Văn Bình, 34 | Reject | 5,202,000 – 7,803,000 VND/month (≈124.8–187.3M principal at 24-month tenor)  | NDI \= 18,000,000; DTI \= 10.0% (low, no flag); Burden \= 40.0% (normal, no flag). Employment factor ×0.85 (commission-based), Age factor ×1.00, Dependents factor ×1.00 → Medium complexity tier. Requested installment 10,000,000 is above the affordable ceiling – rejected |
| KHCN-003 – Đặng Thị Lan, 57  | Approve | 2,618,000 – 3,927,000 VND/month (≈94.2–141.4M principal at 36-month tenor)  | NDI \= 11,000,000; DTI \= 2.8% (low, no flag); Burden \= 38.9% (normal, no flag). Employment factor ×1.00 (stable, 10-yr tenure), Age factor ×0.70 (near-retirement — loan matures at 60), Dependents factor ×1.00 → Medium complexity tier. Requested installment 2,778,000 falls inside the band – approved. CIC Group 2 (resolved late payment) is shown but out of scope for this Capacity-only decision.  |
| KHCN-004 – Phạm Văn Tâm, 45  | Approve | 1,557,700 – 2,892,900 VND/month (≈56.1–104.1M principal at 36-month tenor) | NDI \= 11,000,000; DTI \= 10.0% (low, no shift); Burden \= 45.0% (warning only, no numeric change). Employment factor ×0.70 (seasonal/highly unstable trading), Age factor ×1.00, Dependents factor ×0.80 (4 dependents) → High complexity tier (±30%), reduce limit −15% by the Unstable-income red flag (\>30% month-to-month variation). Requested installment 2,638,888 is within the reduced band – reduce limit & approve.  |
| KHCN-005 \- Nguyễn Thị Hồng, 56 | Approve | 2,832,200 – 5,259,800 VND/month (≈101.9-189.4M principal at 36-month tenor) | NDI \= 16,000,000; DTI \= 10.7% (low, no shift); Burden \= 42.9% (warning zone, no numeric change). Employment factor ×0.85 (commission-based), Age factor ×0.7 (near retirement), Dependents factor ×1.00 (1 dependent) → High complexity tier (±30%). Requested installment 3,000,000 is within the band – approve.  |

## **Detailed assessment process for a credit application:**

## **KHCN — Đặng Thị Lan, 57**

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

  # **7\.**    **Claim Boundary**

| Output | Logic type | Claim boundary |
| :---- | :---- | :---- |
| NDI, DTI, Burden values | Calculation | A numeric result under stated assumptions (see Threshold Disclosure) \-\> Does not by itself imply approval or rejection. |
| Adjusted limit band | Calculation \+ Classification | An estimated affordability range based on Capacity only. |
| DTI / Burden labels | Classification | A category based on team-defined thresholds (mostly Assumption, one Sourced). Must not be worded as a guaranteed industry standard. |
| Approve / Reduce / Reject | Classification, NOT Recommendation | States whether the request falls inside/outside the defensible band. |

  # **8\.**	**Threshold Disclosure**

| Threshold | Value | Source |
| :---- | :---- | :---- |
| Affordability ratio (monthly installment ceiling) | 40–45% of NDI | Assumption – MVP |
| DTI normal ceiling | 35% | Assumption |
| DTI warning benchmark | 43% | Sourced – CFPB historical General QM threshold |
| DTI hard ceiling | 50% | Assumption, informed by Fannie Mae's 50% DU casefile maximum |
| Burden warning point | 40% | Assumption |
| Burden hard ceiling | 50% | Assumption – MVP |
| Income volatility trigger | \> 30% month-to-month variation | Assumption – MVP |
| Employment factor – moderate risk | ×0.85 | Assumption |
| Employment factor – high risk | ×0.70 | Assumption |
| Age factor – near retirement | ×0.70 | Assumption |
| Retirement age | 60 (applicable to all genders) | Assumption – simplified for MVP; not modeled separately by gender |
| Dependents factor (2–3) | ×0.90 | Assumption |
| Dependents factor (≥4) | ×0.80 | Assumption |
| Unstable-income adjustment | Band −15% | Assumption |
| Band width – Low complexity | ±10% | Assumption – MVP |
| Band width – Medium complexity | ±20% | Assumption – MVP |
| Band width – High complexity | ±30% | Assumption – MVP |

 

