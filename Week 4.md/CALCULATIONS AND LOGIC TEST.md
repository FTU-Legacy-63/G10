**The Credit Desk – Credit Appraisal Rulebook**

# **1\.**	**Definitions**

| Term | Precise definition |
| :---- | :---- |
| Income | Verified net monthly income after tax, based on payslip/bank statement. Bonus or irregular income is excluded unless it recurs for ≥ 6 consecutive months. |
| Living costs | Self-reported baseline monthly living expenses (housing, food, utilities, transport). Debt repayments are NOT included here – they belong to Existing obligations. |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| NDI | Net Disposable Income \= Income − Living costs − Existing obligations. |

# **2\.**	**Credit Limit Formula and Risk Adjustment Factors**

# **2.1.**   	**Base calculation – Decision: affordability-ratio method**

●       **NDI \= Income − Living costs − Existing obligations**

●       **Base monthly repayment capacity \= NDI × 40–45% (affordability ratio)**

●       **Adjusted monthly capacity \= Base Monthly Capacity × Employment factor × Age factor × Dependents factor**

●   	Secondary, derived figure: Implied total loan principal (secondary, derived figure): Implied principal ≈ Adjusted monthly capacity × Tenor (months)

## **2.2.**         **Risk adjustment factors**

### **\-**        **Employment stability factor**

| Tier | Condition | Factor | Justification |
| :---- | :---- | :---- | :---- |
| Stable | Salaried, ≥ 2 years tenure, permanent contract | ×1.00 | Steady income supports repayment throughout the loan term |
| Moderate risk | Variable income, short tenure, or commission-based | ×0.85 | Less certain income reduces repayment reliability |
| High risk | Seasonal / freelance / highly unstable employment | ×0.70 | Income vulnerable to sudden loss (seasonal unemployment, gig risk) |

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

# **5\.**    **Red Flag Table**

| Red Flag | Trigger condition | Adjustment | Business justification |
| :---- | :---- | :---- | :---- |
| Unstable income | Month-to-month income variation \> 30%, even if job type is nominally stable | Band shifts down 15% | Observed cash-flow volatility increases delinquency risk beyond what job-type alone captures |

# **6\.**	**Per-Dossier Answer Key**

| Case ID | Correct decision | Accepted range (monthly installment) | Reasoning |
| :---- | :---- | :---- | :---- |
| KHCN – 001 – Bùi Văn Long, 38 | Reject | 600,000 – 675,000 VND/month (≈ 14.4–16.2M principal at 24-month tenor) | NDI \= 1,500,000; DTI \= 36.7% (moderate warning, no numeric change); Burden \= 90% (excessive → hard gate Reject). Employment factor ×1.00 (stable, 4-yr tenure), Age factor ×1.00, Dependents factor ×0.90 (2 dependents) → Low-Medium complexity tier. Requested installment 4,167,000 is 6.2× the affordable ceiling – request rejected regardless of band width. |
| KHCN \- 002 \- Trần Thị Mai, 30 | Approve | 4,972,500 – 6,077,500 VND/month (≈119.3–145.9M principal at 24-month tenor)  | NDI \= 13,000,000; DTI \= 5.0% (low, no flag); Burden \= 35.0% (normal, no flag). Employment factor ×1.00 (stable, 5-yr tenure), Age factor ×1.00 (safe), Dependents factor ×1.00 (1 dependent) → Low complexity tier. Requested installment 5,000,000 falls inside the band – approved.  |
| KHCN-003 – Lê Văn Bình, 34 | Reject | 5,202,000 – 7,803,000 VND/month (≈124.8–187.3M principal at 24-month tenor)  | NDI \= 18,000,000; DTI \= 10.0% (low, no flag); Burden \= 40.0% (normal, no flag). Employment factor ×0.85 (commission-based), Age factor ×1.00, Dependents factor ×1.00 → Medium complexity tier. Requested installment 10,000,000 is above the affordable ceiling – rejected |
| KHCN-004 – Đặng Thị Lan, 57  | Approve | 2,618,000 – 3,927,000 VND/month (≈94.2–141.4M principal at 36-month tenor)  | NDI \= 11,000,000; DTI \= 2.8% (low, no flag); Burden \= 38.9% (normal, no flag). Employment factor ×1.00 (stable, 10-yr tenure), Age factor ×0.70 (near-retirement — loan matures at 60), Dependents factor ×1.00 → Medium complexity tier. Requested installment 2,778,000 falls inside the band – approved. CIC Group 2 (resolved late payment) is shown but out of scope for this Capacity-only decision.  |
| KHCN-005 – Phạm Văn Tâm, 45  | Approve \+ Reduce limit | 1,557,700 – 2,892,900 VND/month (≈56.1–104.1M principal at 36-month tenor) | NDI \= 11,000,000; DTI \= 10.0% (low, no shift); Burden \= 45.0% (warning only, no numeric change). Employment factor ×0.70 (seasonal/highly unstable trading), Age factor ×1.00, Dependents factor ×0.80 (4 dependents) → High complexity tier (±30%), reduce limit −15% by the Unstable-income red flag (\>30% month-to-month variation). Requested installment 2,638,888 is within the reduced band – reduce limit & approve.  |

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

 

 

