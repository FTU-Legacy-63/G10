# **ASSUMPTIONS (Owner: Nguyễn Ngọc Minh Hà)**

1. **Capacity rule** — capacity \= NDI × 40–45%, adjusted by three multiplicative risk factors (Employment, Age, Dependents), then expanded into a range by Band Width, then shifted by DTI/red-flag gates.   
   Disclosure: shown as a range on the explanation screen.  
2. **Band width logic** — see table above.   
- Reason: simple profiles get a tight band, ambiguous profiles a wide one.   
- Risk: the exact stacking math when both a DTI-shift and a red-flag-shift could apply is resolved via the else-if chain in Order of Operations (only one numeric shift applies at a time; warning-only flags never change numbers).  
3. **DTI ceiling** — see Decision Gates.   
- Risk: no cited VN regulatory basis; DTI warning benchmark (43%) is sourced from CFPB, hard ceiling (50%) informed by Fannie Mae DU casefile maximum — the rest is team assumption.  
4. **Burden ceiling** — new, separate gate from DTI.   
- Risk: no cited VN regulatory basis; MVP assumption.  
5. **Unstable income red flag** — trigger \>30% month-to-month variation → band shifts down 15%.   
- Risk: subjective; "occupation risk" itself is defined by income volatility, not job prestige, to avoid bias.  
6. **Deterministic consequence** — each dossier has one designed outcome, not a probabilistic simulation.  
7. **Given collateral valuation** — collateral\_value is pre-set; player interprets LTV, does not appraise.   
- Risk: real valuation is complex.  
8. **Simulated dossiers** — all applicants fictional.   
- Reason: privacy and feasibility.  
9. **Income definition (replaces old 30% haircut rule)** — Income \= verified net income after tax; bonus/irregular income excluded unless recurring ≥ 6 consecutive months. Risk: for commission/freelance applicants, judgment is needed on whether variable earnings "recur" — flagged as a design judgment call, not a sourced standard.  
10. **Employment stability classification (replaces old 6-month minimum-tenure rule)** — Stable tier now requires ≥2 years tenure \+ permanent contract (not 6 months). Risk: no cited VN regulatory or bank-policy basis; team judgment call.  
11. **Simplified installment formula** — requested installment \= requested amount ÷ tenor, interest excluded. Used only to compare against the Accepted Range. Reason: keeps arithmetic invisible to the player.

 

