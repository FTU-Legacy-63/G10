### **INPUT DICTIONARY**

Purpose: every state variable and player input the KHCN track needs, with one fixed meaning. Owner: Hà (Content & Data Lead), meanings validated by Linh (Credit Lead).

Convention rules (write these at the top of the file):

- Currency: VND, monthly unless stated.

**Group A - Applicant profile (dossier state, shown to player)**

- age. Meaning: applicant age in years. Format: integer. Source: team-authored dossier. Output affected: retirement-horizon red flag, term feasibility.
- occupation_type. Meaning: employment category, one of {salaried_stable, self_employed_variable, commission_freelance}. Format: enum. Source: team-authored. Output affected: income-stability red flag, risk adjustment on capacity.
- monthly_gross_income. Meaning: total monthly income before living expenses and debt, self-reported in dossier. Format: number VND/month. Source: team-authored. Output affected: DTI denominator, disposable-income calc.
- monthly_living_expenses. Meaning: recurring household spending. Format: number VND/month. Source: team-authored. Output affected: disposable-income calc.
- existing_monthly_debt. Meaning: current monthly obligations on existing loans. Format: number VND/month. Source: team-authored. Output affected: disposable-income calc, DTI numerator.
- dependents. Meaning: number of financially dependent persons. Format: integer. Source: team-authored. Output affected: dependents-to-income red flag.
- cic_status. Meaning: credit-history group and recent delinquency, one of {group1_clean, group2_recent_late, group3plus_adverse}. Format: enum. Source: team-authored (mirrors CIC concept). Output affected: character/history red flag, decision ceiling.
- marital_status. Meaning: contextual only. Mark CONTEXTUAL. Does not change the consequence. Keep only for narrative flavor or cut.
- health_status. Meaning: stated health risk flag. Keep only if a dossier actually uses it to change consequence; otherwise mark CONTEXTUAL. (Decision test applied: currently borderline decoration, justify or cut.)

**Group B - Loan request (dossier state)**

- requested_amount. Meaning: loan principal requested. Format: number VND. Source: team-authored. Output affected: repayment calc, LTV, room draw.
- requested_term. Meaning: repayment period in months. Format: integer. Source: team-authored. Output affected: repayment calc, retirement-horizon check.
- loan_purpose. Meaning: stated use, enum {consumption, business_expansion, asset_purchase}. Format: enum. Source: team-authored. Output affected: conditions logic, plausibility check.
- collateral_type / collateral_value. Meaning: asset offered and its pre-set appraised value. Format: enum + number VND. Source: team-authored (valuation given, not computed). Output affected: LTV, recovery in consequence.

**Group C - Room state (meta-loop)**

- room_total. Meaning: total credit room for the period. Format: number VND. Source: team-set per round. Output affected: room-efficiency score, allocation pressure.
- room_used. Meaning: cumulative approved amount in the round. Format: number VND. Source: system state. Output affected: remaining capacity, end-of-round efficiency.

**Group D - Derived variables (product computes, player interprets, never entered)**

- monthly_disposable_income = monthly_gross_income - monthly_living_expenses - existing_monthly_debt. Unit VND/month. This is the single capacity measure. Use this everywhere; never "income" only.
- dti = (existing_monthly_debt + new_loan_monthly_payment) / monthly_gross_income. Unit percent.
- ltv = requested_amount / collateral_value. Unit percent.
- affordability band = 40 - 45% \* monthly_disposable_income
- new_loan_monthly_payment = f(requested_amount, requested_term, annual_reducing_rate). Unit VND/month.

**Group E - Player input**

- **decision.** Meaning: player's call - either {reject}, or {approve} together with an {approved_amount} (equal to, or reduced from, the requested amount) and an optional {set_of_conditions}
- proposed_limit. Meaning: amount the player would grant. Format: number VND. Scored by range, not exact match.

### **SOURCE USE MAP**

- VN credit-officer job postings (Indeed, HUFLIT article, from Week 1). Supports: the PROBLEM claim only (real demand, skill is the explicit requirement, 2-year experience gate).
- Five Cs of credit (Character, Capacity, Capital, Collateral, Conditions). Supports: the red-flag taxonomy and proof that the dossier covers all judgment dimensions.
- Consumer-lending guardrails (income-multiple, DTI ceiling). Supports: the provisional scoring thresholds. Limitation: no cited VN regulatory source yet. Used as ASSUMPTION, not fact.
- Team-authored dossiers. Supports: the actual scenario content and embedded red flags. Simulated, not real customers.

### **ASSUMPTIONS**

1. **Capacity rule**. Assumption: repayment capacity is a multiple of monthly_disposable_income; grant is acceptable when new_loan_monthly_payment stays within a set share of disposable income. Disclosure: kept as a RANGE, shown in the explanation screen, locked only in W4.
2. **DTI ceiling**. Assumption: total DTI above a team-set band signals high burden. Reason: standard consumer guardrail. Risk: no cited VN regulatory basis yet, so presenting it as a rule is false authority.

DTI: **≤ 35%**

- Classification: Low / acceptable burden
- Treatment: No adjustment

DTI: **\> 35% – 43%**

- Classification: Moderate warning
- Treatment: Warning flag, no limit reduction

DTI: **\> 43% – 50%**

- Classification: High burden
- Treatment: −10% credit limit

DTI: **\> 50%**

- Classification: Very high burden
- Treatment: Reject

1. **Red-flag set**. Assumption: the flags are unstable income, high-risk occupation, near-retirement vs term, high dependents-to-income, adverse CIC. Reason: each maps to a Five-Cs dimension. Risk: subjectivity or bias, especially "high-risk occupation." Disclosure: each flag tied to its C and a written rationale; no protected-attribute proxies; "occupation risk" defined by income volatility, not job prestige.

- **Unstable income**
- Trigger Condition: Monthly income variation > 30%
- Adjustment Weight: −15% credit limit
- Business Justification: Cash flow volatility increases delinquency risk
- **High-risk occupation**
- Trigger Condition: Seasonal / highly unstable employment
- Adjustment Weight: −20% credit limit
- Business Justification: Income is vulnerable to sudden loss (e.g., occupational hazards, seasonal unemployment)
- **High dependents-to-income ratio**
- Trigger Condition: ≥ 4 dependents
- Adjustment Weight: −10% credit limit
- Business Justification: Heavy fixed living expenses reduce effective debt repayment capacity
- **Near retirement age**
- Trigger Condition: Loan maturity within 5 years of expected retirement
- Adjustment Weight: Shorten maximum loan tenure, or −15% credit limit
- Business Justification: Risk of losing primary income source before full loan repayment
- **High overall burden**
- Trigger Condition: (Living cost + Existing obligations) / Income > 50%
- Adjustment Weight: Reject
- Business Justification: Over half of income is committed to living costs and existing debt before evaluating new loans

1. **Deterministic consequence**. Assumption: each dossier has one designed outcome, not a probabilistic default simulation.
2. **Claim boundary**. Assumption: the game classifies and compares decisions (right-range vs wrong-range with reasons); it does not recommend real lending. Disclosure: framing text on the result screen.
3. **Given collateral valuation.** Assumption: collateral_value is pre-set; player interprets LTV, does not appraise. Reason: avoids building valuation logic. Risk: real valuation is complex. Disclosure: noted in dossier.
4. **Simulated dossiers**. Assumption: all applicants are fictional. Reason: privacy and feasibility.
5. **Income haircut rule.** Assumption: income flagged VARIABLE/unverifiable (freelance, KOL, commission, informal trade) is discounted 30% before computing NDI for affordability purposes. Reason: proxy for the added uncertainty of unverified income streams. Risk: the 30% figure is a team-chosen placeholder, not sourced from any specific VN lender's policy — presenting it as precise risks false authority. Disclosure: raw (non-haircut) NDI is retained alongside it for design reference; flagged as provisional pending W3/W4 review.
6. **Minimum tenure rule.** Assumption: salaried income receives full verification weight only at ≥6 months tenure with the current employer; below that, income is treated as not fully verified regardless of the stated amount. Reason: proxy for income-continuity risk, independent of the income figure itself. Risk: no cited VN regulatory or bank-policy basis; the 6-month cutoff is a team judgment call, not a sourced standard.
7. **CIC ceiling.** Assumption: CIC Group 3–5 status functions as a hard-reject trigger, independent of the affordability math outcome. Reason: standard consumer guardrail; teaches that red flags aren't purely an arithmetic problem. Risk: no cited VN regulatory basis for treating Group 3–5 as an absolute bar rather than a weighted factor — presenting it as a rule risks false authority.
8. **Simplified installment formula.** Assumption: estimated monthly installment = loan amount ÷ tenor, interest excluded entirely. Reason: keeps arithmetic invisible to the player (judgment, not arithmetic).

###

### **SAMPLE INPUT OUTPUT**

Purpose: one KHCN dossier traced end to end, with embedded red flags and a defined answer range. This is your trap/error-path exemplar.

Dossier (simulated): applicant age 42, occupation_type commission_freelance (independent real estate broker, 9 years), monthly_gross_income 45m (documented range 25m–65m), monthly_living_expenses 15m, existing_monthly_debt 5m (car loan), dependents 2, cic_status group2_recent_late, marital_status Married, requested_amount 400m, requested_term 48 months, loan_purpose business_expansion (slowing sub-market), collateral apartment valued 800m.

Derived: monthly_disposable_income = 45 - 15 - 5 = 25m. new_loan_monthly_payment at ~13 percent annual over 48m is ~10.7m. ltv = 400 / 800 = 50 percent. dti = (5 + ~10.7) / 45 = ~35 percent (34.95%). affordability_band (40–45% of disposable) = 10m to 11.25m.

5Cs Analysis:

- Capacity (Flagged): DTI (~35%) passes, but income volatility (±44%) exceeds 30% trigger, forcing a 15% capacity ceiling adjustment (~317m–357m).
- Character (Flagged - Soft): CIC Group 2 (1 late cycle) is a caution signal requiring monitoring, not a hard blocker.
- Capital (Clean): Strong equity stake; no over-leverage issue.
- Collateral (Clean): LTV 50% is safe and well within limits.
- Conditions (Flagged): Expanding into a slowing sub-market compounds the income volatility risk.

The trap: DTI (~35%) and LTV (50%) look clean, tempting a naive player to approve the full 400m. However, DTI uses gross average income and completely hides the severe income volatility (±44%) and sub-market risk.

Intended output:

- Correct decision: reduce_limit to ~320m (within the adjusted capacity ceiling) + add_conditions (restrict_loan_purpose, periodic_review). Approve-full is wrong.
- Answer range: proposed_limit 317m to 357m scores in-band; >357m to 400m penalized; full 400m triggers the trap.
- Consequence card if approved full: borrower experiences cash flow strain during market slowdown, payment delays occur, CIC drops to Group 3+, and portfolio risk-adjusted score drops.

Explanation shown: DTI (34.95%) appears safe because average income hides severe cash flow fluctuations (±44%), making Capacity the binding C (-15% limit adjustment). Combined with Character (CIC Group 2) and Conditions (slowing sub-market), a reduced limit (~320m) with monitoring conditions is required despite clean Collateral (LTV 50%).