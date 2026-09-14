### **INPUT DICTIONARY**

* Currency: VND, monthly unless stated.

**Group A \- Applicant profile (dossier state, shown to player)**

* age. Meaning: applicant age in years. Format: integer. Source: team-authored dossier. Output affected: retirement-horizon red flag, term feasibility.  
* occupation\_type. Meaning: employment category, one of {salaried\_stable, self\_employed\_variable, commission\_freelance}. Format: enum. Source: team-authored. Output affected: income-stability red flag, risk adjustment on capacity.  
* monthly\_gross\_income. Meaning: total monthly income before living expenses and debt, self-reported in dossier. Format: number VND/month. Source: team-authored. Output affected: DTI denominator, disposable-income calc.  
* monthly\_living\_expenses. Meaning: recurring household spending. Format: number VND/month. Source: team-authored. Output affected: disposable-income calc.  
* existing\_monthly\_debt. Meaning: current monthly obligations on existing loans. Format: number VND/month. Source: team-authored. Output affected: disposable-income calc, DTI numerator.  
* dependents. Meaning: number of financially dependent persons. Format: integer. Source: team-authored. Output affected: dependents-to-income red flag.  
* cic\_status. Meaning: credit-history group and recent delinquency, one of {group1\_clean, group2\_recent\_late, group3plus\_adverse}. Format: enum. Source: team-authored (mirrors CIC concept). Output affected: character/history red flag, decision ceiling.  
* marital\_status. Meaning: contextual only. Mark CONTEXTUAL. Does not change the consequence. Keep only for narrative flavor or cut.  
* health\_status. Meaning: stated health risk flag. Keep only if a dossier actually uses it to change consequence; otherwise mark CONTEXTUAL. (Decision test applied: currently borderline decoration, justify or cut.)

**Group B \- Loan request (dossier state)**

* requested\_amount. Meaning: loan principal requested. Format: number VND. Source: team-authored. Output affected: repayment calc, LTV, room draw.  
* requested\_term. Meaning: repayment period in months. Format: integer. Source: team-authored. Output affected: repayment calc, retirement-horizon check.  
* loan\_purpose. Meaning: stated use, enum {consumption, business\_expansion, asset\_purchase}. Format: enum. Source: team-authored. Output affected: conditions logic, plausibility check.  
* collateral\_type / collateral\_value. Meaning: asset offered and its pre-set appraised value. Format: enum \+ number VND. Source: team-authored (valuation given, not computed). Output affected: LTV, recovery in consequence.

**Group C \- Room state (meta-loop)**

* room\_total. Meaning: total credit room for the period. Format: number VND. Source: team-set per round. Output affected: room-efficiency score, allocation pressure.  
* room\_used. Meaning: cumulative approved amount in the round. Format: number VND. Source: system state. Output affected: remaining capacity, end-of-round efficiency.

**Group D \- Derived variables (product computes, player interprets, never entered)**

* monthly\_disposable\_income \= monthly\_gross\_income \- monthly\_living\_expenses \- existing\_monthly\_debt. Unit VND/month. This is the single capacity measure. Use this everywhere; never "income" only.  
* dti \= (existing\_monthly\_debt \+ new\_loan\_monthly\_payment) / monthly\_gross\_income. Unit percent.  
* ltv \= requested\_amount / collateral\_value. Unit percent.  
* affordability band \= 40 \- 45% \* monthly\_disposable\_income  
* new\_loan\_monthly\_payment \= f(requested\_amount, requested\_term, annual\_reducing\_rate). Unit VND/month.

**Group E \- Player input**

* **decision.** Meaning: player's call \- either {reject}, or {approve} together with an {approved\_amount} (equal to, or reduced from, the requested amount) and an optional {set\_of\_conditions}  
* proposed\_limit. Meaning: amount the player would grant. Format: number VND. Scored by range, not exact match.

