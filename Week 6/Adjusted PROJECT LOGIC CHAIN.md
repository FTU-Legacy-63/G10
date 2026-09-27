**PROJECT LOGIC CHAIN (Owner: Doan Diep Anh)**

**Framing chain (Problem to Product to User task)**

**Problem**: Year 3-4 FTU Finance and Banking students preparing for credit or risk roles have appraisal theory but no hands-on practice making a lend / no-lend call. Real mistakes cost real money, so they cannot learn by trial and error on the job, and no local, free, individual-credit practice tool exists.

**Product**: The Credit Desk, a browser-based simulation where the player acts as a bank credit officer, reads individual (KHCN) dossiers under a limited credit room, decides whether and how much to lend, and receives consequence-based feedback.

**User task**: For each applicant, judge income reliability and repayment capacity, then convert that judgment into a defensible decision (Approve / Reduce limit / Reject) under a fixed credit room.

Why the chain starts here: Every logic choice below exists to build repayment judgment, not arithmetic. The player interprets a pre-computed installment and judges income reliability; the system does the annuity math.

1. **Operating logic chain (one path: Input to Reasoning to Result to Interpretation to Limitation)**

**Input**: A KHCN dossier (income, occupation and tenure, existing obligations, age, loan type, requested amount, tenor, CIC and collateral as display-only) plus the remaining credit room.

**Reasoning**: The system reduces Capacity to a single metric, Adjusted DTI, computed in a fixed order (see Part 3). Loan type selects the product parameter row; age and product caps set the tenor; the amortization formula sets the installment; income verification discounts raw income; the two combine into Adjusted DTI.

**Result**: A classification against fixed lines \- Adjusted DTI at or below 70 percent is Approve, above 70 up to 80 percent is Reduce limit, above 80 percent is Reject. On the Reduce path the system also returns the maximum approvable loan.

**Interpretation (Consequence)**: The Decision-Consequence Card states what the chosen decision does to this applicant (for example, approving at the ceiling leaves almost no debt-service buffer), tied back to Capacity.

**Limitation (Claim boundary)**: The output is a Classification, not a Recommendation. It states only whether the request falls inside or outside the DTI lines under stated assumptions. It never says "you should borrow." Character, Capital, Collateral and Conditions are out of scope in this MVP.

2. **Reasoning in full** 

Step 1, Product parameters: From loan type, look up tenor cap, max age and rate. Unsecured: cap 60 months, rate 18 percent per year. Secured: cap 360 months, rate 11 percent per year. Max age at maturity 70 for both. Loan type never moves the 70/80 decision lines; it only feeds the installment.

Step 2, Adjusted tenor: minimum of requested tenor, product cap, and (70 minus current age) times 12 months.

Step 3, New loan monthly installment (PMT): P times r divided by \[1 minus (1+r) to the power minus n\], where P is the requested amount, r is the monthly rate (annual divided by 12), and n is the adjusted tenor. This is the real amortization schedule, not a straight-line approximation.

Step 4, Adjusted income: raw income times a verification percentage. Verified income (payslip, employer certification, or bank statements showing regular deposits) counts at 100 percent. Cash-based or unverifiable income counts at 30 percent (team uses 30 within a sourced 30-40 percent range).

Step 5, Adjusted DTI: (existing obligations plus new installment) divided by adjusted income. Existing obligations use the CIC-verified figure, which can exceed the self-declared figure.

Step 6, Classify: at or below 70 percent Approve; above 70 up to 80 percent Reduce limit; above 80 percent Reject. On Reduce, maximum approvable installment equals 70 percent times adjusted income minus existing obligations, converted to a loan amount by Present Value: installment times \[1 minus (1+r) to the power minus n\] divided by r.

3. **One expected result (predictable before running)** \- 

KHCN-03, Trịnh Thị Hạnh, 44

Inputs seen by player: unsecured, requested 280,000,000 VND over 72 months at 18 percent per year; self-reported income 95,000,000 (cash sales, notebook records, no business account); self-declared obligations 10,000,000; estimated installment shown 7,110,200.

Predicted reasoning: tenor caps to 60 months (72 exceeds the unsecured cap). Installment stays 7,110,200. Income is cash-based and unverifiable, so it counts at 30 percent \= 28,500,000. CIC reveals an undisclosed 5,000,000 working-capital loan, so true obligations are 15,000,000, not 10,000,000. Adjusted DTI \= (15,000,000 \+ 7,110,200) / 28,500,000 \= 77.6 percent.

Predicted result: 70 to 80 percent zone, so Reduce limit. Maximum installment \= 0.70 times 28,500,000 minus 15,000,000 \= 4,950,000. Converted by PV at 60 months, 1.5 percent monthly, the defensible offer is about 194,900,000 VND at the same term.

Why this case: it exercises every branch at once \- verification discount, CIC hidden debt, product tenor cap, and the Reduce-limit conversion \- so if the team can predict this, the chain is proven.

4. **Claim boundary by output**

Adjusted income and Adjusted DTI are Calculations: a number under stated assumptions, no verdict implied.

The DTI band label is Classification: a category from team-stated thresholds, not a guaranteed industry standard.

Approve / Reduce / Reject is Classification, not Recommendation: it states which side of the 70/80 lines the request falls on, with no advisory language.

5. **Threshold disclosure (sourced vs assumption)**

Sourced from finance-expert feedback and typical VN practice: 100 percent for verified income; the 30-40 percent range for unverified income; the 70 percent approve ceiling and 80 percent reject floor; max age 70; PMT and PV formulas.

Marked as team assumption: the exact 30 percent used inside the range; the flat 18 percent / 11 percent rates applied across all cases (no per-case rate is recorded); the 60-month unsecured cap as an MVP choice.

