### **SAMPLE INPUT OUTPUT**

Dossier (simulated): applicant age 42, occupation\_type commission\_freelance (independent real estate broker, 9 years), monthly\_gross\_income 45m (documented range 25m–65m), monthly\_living\_expenses 15m, existing\_monthly\_debt 5m (car loan), dependents 2, cic\_status group2\_recent\_late, marital\_status Married, requested\_amount 400m, requested\_term 48 months, loan\_purpose business\_expansion (slowing sub-market), collateral apartment valued 800m.

Derived: monthly\_disposable\_income \= 45 \- 15 \- 5 \= 25m. new\_loan\_monthly\_payment at \~13 percent annual over 48m is \~10.7m. ltv \= 400 / 800 \= 50 percent. dti \= (5 \+ \~10.7) / 45 \= \~35 percent (34.95%). affordability\_band (40–45% of disposable) \= 10m to 11.25m.

5Cs Analysis:

* Capacity (Flagged): DTI (\~35%) passes, but income volatility (±44%) exceeds 30% trigger, forcing a 15% capacity ceiling adjustment (\~317m–357m).  
* Character (Flagged \- Soft): CIC Group 2 (1 late cycle) is a caution signal requiring monitoring, not a hard blocker.  
* Capital (Clean): Strong equity stake; no over-leverage issue.  
* Collateral (Clean): LTV 50% is safe and well within limits.  
* Conditions (Flagged): Expanding into a slowing sub-market compounds the income volatility risk.

The trap: DTI (\~35%) and LTV (50%) look clean, tempting a naive player to approve the full 400m. However, DTI uses gross average income and completely hides the severe income volatility (±44%) and sub-market risk.

Intended output:

* Correct decision: reduce\_limit to \~320m (within the adjusted capacity ceiling) \+ add\_conditions (restrict\_loan\_purpose, periodic\_review). Approve-full is wrong.  
* Answer range: proposed\_limit 317m to 357m scores in-band; \>357m to 400m penalized; full 400m triggers the trap.  
* Consequence card if approved full: borrower experiences cash flow strain during market slowdown, payment delays occur, CIC drops to Group 3+, and portfolio risk-adjusted score drops.

Explanation shown: DTI (34.95%) appears safe because average income hides severe cash flow fluctuations (±44%), making Capacity the binding C (-15% limit adjustment). Combined with Character (CIC Group 2\) and Conditions (slowing sub-market), a reduced limit (\~320m) with monitoring conditions is required despite clean Collateral (LTV 50%).  
