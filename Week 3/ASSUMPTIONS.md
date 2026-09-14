### **ASSUMPTIONS**

1. **Capacity rule**. Assumption: repayment capacity is a multiple of monthly\_disposable\_income; grant is acceptable when new\_loan\_monthly\_payment stays within a set share of disposable income. Disclosure: kept as a RANGE, shown in the explanation screen, locked only in W4.  
2. **DTI ceiling**. Assumption: total DTI above a team-set band signals high burden. Reason: standard consumer guardrail. Risk: no cited VN regulatory basis yet, so presenting it as a rule is false authority.   
   DTI: **≤ 35%**  
* Classification: Low / acceptable burden  
* Treatment: No adjustment  
  DTI: **\> 35% – 43%**  
* Classification: Moderate warning  
* Treatment: Warning flag, no limit reduction   
  DTI: **\> 43% – 50%**   
* Classification: High burden  
* Treatment: −10% credit limit  
  DTI: **\> 50%**  
* Classification: Very high burden  
* Treatment: Reject  
3. **Red-flag set**. Assumption: the flags are unstable income, high-risk occupation, near-retirement vs term, high dependents-to-income, adverse CIC. Reason: each maps to a Five-Cs dimension. Risk: subjectivity or bias, especially "high-risk occupation." Disclosure: each flag tied to its C and a written rationale; no protected-attribute proxies; "occupation risk" defined by income volatility, not job prestige.  
- **Unstable income**  
* Trigger Condition: Monthly income variation \> 30%  
* Adjustment Weight: −15% credit limit  
* Business Justification: Cash flow volatility increases delinquency risk  
- **High-risk occupation**  
* Trigger Condition: Seasonal / highly unstable employment  
* Adjustment Weight: −20% credit limit  
* Business Justification: Income is vulnerable to sudden loss (e.g., occupational hazards, seasonal unemployment)  
- **High dependents-to-income ratio**  
* Trigger Condition: ≥ 4 dependents  
* Adjustment Weight: −10% credit limit  
* Business Justification: Heavy fixed living expenses reduce effective debt repayment capacity  
- **Near retirement age**  
* Trigger Condition: Loan maturity within 5 years of expected retirement  
* Adjustment Weight: Shorten maximum loan tenure, or −15% credit limit  
* Business Justification: Risk of losing primary income source before full loan repayment  
- **High overall burden**  
* Trigger Condition: (Living cost \+ Existing obligations) / Income \> 50%  
* Adjustment Weight: Reject  
* Business Justification: Over half of income is committed to living costs and existing debt before evaluating new loans  
4. **Deterministic consequence**. Assumption: each dossier has one designed outcome, not a probabilistic default simulation.   
5. **Claim boundary**. Assumption: the game classifies and compares decisions (right-range vs wrong-range with reasons); it does not recommend real lending. Disclosure: framing text on the result screen.  
6. **Given collateral valuation.** Assumption: collateral\_value is pre-set; player interprets LTV, does not appraise. Reason: avoids building valuation logic. Risk: real valuation is complex. Disclosure: noted in dossier.  
7. **Simulated dossiers**. Assumption: all applicants are fictional. Reason: privacy and feasibility.   
8. **Income haircut rule.** Assumption: income flagged VARIABLE/unverifiable (freelance, KOL, commission, informal trade) is discounted 30% before computing NDI for affordability purposes. Reason: proxy for the added uncertainty of unverified income streams. Risk: the 30% figure is a team-chosen placeholder, not sourced from any specific VN lender's policy — presenting it as precise risks false authority. Disclosure: raw (non-haircut) NDI is retained alongside it for design reference; flagged as provisional pending W3/W4 review.   
9. **Minimum tenure rule.** Assumption: salaried income receives full verification weight only at ≥6 months tenure with the current employer; below that, income is treated as not fully verified regardless of the stated amount. Reason: proxy for income-continuity risk, independent of the income figure itself. Risk: no cited VN regulatory or bank-policy basis; the 6-month cutoff is a team judgment call, not a sourced standard.   
10. **CIC ceiling.** Assumption: CIC Group 3–5 status functions as a hard-reject trigger, independent of the affordability math outcome. Reason: standard consumer guardrail; teaches that red flags aren't purely an arithmetic problem. Risk: no cited VN regulatory basis for treating Group 3–5 as an absolute bar rather than a weighted factor — presenting it as a rule risks false authority.   
11. **Simplified installment formula.** Assumption: estimated monthly installment \= loan amount ÷ tenor, interest excluded entirely. Reason: keeps arithmetic invisible to the player (judgment, not arithmetic).

