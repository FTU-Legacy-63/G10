## **SAMPLE INPUT OUTPUT**

## **I. INPUT DICTIONARY**

### **Definitions**

| Term | Definition |
| ----- | ----- |
| Income | The applicant's total monthly cash inflow from any source (e.g. salary, business/trading revenue net of operating costs, rental income, or other regular receipts). |
| Existing obligations | Sum of monthly installment/interest payments on all currently active debts (loans, credit-card minimum payments, called guarantees). Excludes the new loan being evaluated. |
| Loan type | Unsecured or secured. A classification label only, used to select which row of the Product Parameters table (tenor cap, maximum age, interest rate) applies. |
| DTI | (Existing obligations \+ New loan monthly installment) ÷ Income. This is the single Capacity gate. |

### **Group A – Applicant Profile (dossier state, shown to player)**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Age | Applicant age in years | Integer | Team-authored | Adjusted tenor (age-to-70 cap) |
| Occupation | Free-text description of job/business \+ tenure \+ surrounding narrative detail | Text | Team-authored | Display-only / narrative context — not used in any formula |
| Income | Applicant's total monthly cash inflow. Often not a single stated number, the player may need to combine parts (e.g. base pay \+ averaged commission) or net turnover against costs to arrive at it | Number (VND/month) | Team-authored; income figures cross-checked against public salary-survey/salary-guide sites, a teacher pay-scale circular, a Social Insurance pension-calculation rule, and a furniture-industry margin article (1–2 sources per case).  | DTI denominator |
| Existing obligations (self declared) | What the applicant states on the dossier screen before any check. | Number (VND/month) | Team-authored | Displayed to player only — not used in the answer-key calculation |
| Existing obligations (CIC verified) | Revealed only after the player taps "Check CIC." May equal the self-declared figure or be higher | Number (VND/month) | Team-authored | This is the figure actually used in DTI numerator, Max approvable installment |
| Employment tenure | Time with current employer / time in current line of work | Number (years) | Team-authored | Display-only / narrative context, not used in any formula |
| CIC status | Credit-history group | Enum | Team-authored | Display-only; reserved for a future Character C |

**Group B – Loan Request**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Requested amount | Loan principal requested | Number (VND) | Team-authored | New loan monthly installment (PMT); compared against the Decision Bands via DTI |
| Requested term | Repayment period in months | Integer | Team-authored | Adjusted tenor (subject to product cap and age cap) → PMT |
| Loan type | {unsecured, secured} | Enum | Team-authored | Product Parameters lookup: tenor cap, max age, interest rate |
| Loan purpose | {house\_purchase, car\_purchase, business\_expansion} | Enum | Team-authored | Display-only / contextual flavor; not used in any formula |
| Collateral | Descriptive text only | Text | Team-authored | Display-only |

### **Group C – Room State**

| Variable | Meaning | Format | Source | Output Affected |
| ----- | ----- | ----- | ----- | ----- |
| Room (total) | Total credit room for the period | Number (VND) | Team-set per round | Room-efficiency score |
| Room (used) | Cumulative approved amount in round | Number (VND) | System state | Remaining capacity |

### **Group D – Derived Variables**

| Variable | Formula | Notes |
| ----- | ----- | ----- |
| Adjusted tenor | min(requested\_term, product tenor cap, (max age at maturity − age) × 12\) | Unsecured \= 60mo / age 70; Secured \= 360mo / age 70 |
| New loan monthly installment (PMT) | requested\_amount × r ÷ \[1 − (1+r)⁻ⁿ\], r \= product interest rate ÷ 12, n \= adjusted\_tenor | Shown to the player as "Estimated Monthly Installment" — pre-computed, no label revealing the verdict |
| DTI | (existing\_obligations\_cic\_verified \+ new\_loan\_monthly\_installment) ÷ income | The single Capacity gate. Income, existing\_obligations\_cic\_verified and the installment are all visible from the start; the player is expected to calculate this themselves to pick a category, and the system independently computes the same value for the Card |
| Decision band | ≤ 70% → Approve; 70–80% → Reduce limit; \> 80% → Reject | Fixed, universal lines |
| Max approvable installment (Reduce-limit path only) | 70% × income − existing\_obligations\_cic\_verified | The figure the player hand-calculates (Group E) |
| Max approvable loan (Reduce-limit path only) | max\_approvable\_installment × \[1 − (1+r)⁻ⁿ\] ÷ r | Present Value conversion; system-computed |

### **Group E – Player Input**

| Variable | Meaning |
| ----- | ----- |
| Decision | approve / reduce\_limit / reject, chosen after the player calculates DTI \= (existing\_obligations\_cic\_verified \+ installment) ÷ income themselves and compares it to the 70%/80% lines. The tap is final the instant it's made |
| Player-entered max installment | Reduce-limit path only. The player's own hand calculation of max\_approvable\_installment. Must be positive and ≤ the original Estimated Monthly Installment |

**Sequencing:**

1. **Approve / Reject:** tapping the category is final and jumps straight to the Decision-Consequence Card, where the system's own DTI and the correct classification are revealed for comparison against the player's choice.  
2. **Reduce limit:** tapping the category locks it in. No new field is revealed at this point — income and existing\_obligations\_cic\_verified were already visible on the dossier screen. The player calculates player\_entered\_max\_installment by hand and enters it; the system converts it to a loan amount via Present Value; the Card then reveals the system's own DTI, the correct max\_approvable\_installment and max\_approvable\_loan, and grades the player's entry with a ±5% tolerance rather than an exact match.

## **II. SOURCE USE MAP**

| Source | Supports |
| ----- | ----- |
| VN credit-officer job postings | PROBLEM claim only — the Five Cs of Credit as the general framework motivating this project |
| Credit Appraisal Rulebook | DTI formula, Loan Type → Product Parameters, age-based tenor cap, 70%/80% decision bands, Threshold Disclosure |
| Finance-expert feedback (interview) | 70%/80% DTI decision bands; the age-to-70 tenor-cap mechanism, adapted from a real-estate-loan example the expert gave; Product Parameters (tenor cap, max age, interest rate) by Loan Type |
| Team-authored dossiers | Scenario content; the self-declared vs. CIC-verified existing-obligations mechanic |
| Public salary, pension and margin references (salary-survey sites, a teacher pay-scale circular, a Social Insurance pension rule, a furniture-industry margin article) | Cross-checking the income figures used in the DTI calculation for dossiers |

## **III. SAMPLE INPUT / OUTPUT**

1. **Player-visible dossier**

> Trịnh Thị Hạnh is 44 and lives in Hải Phòng with her husband, who repairs motorbikes and earns about 14 million VND a month, their two children, who attend a private school costing 4 million a month in total, plus about 2.5 million a month for extra classes, and her widowed mother. The mother's medicine and care cost about 3 million a month, which Hạnh's younger brother, who works in Japan, sends straight to Hạnh’s account every month. The family spends roughly 18 million a month on daily living and usually travels during the Tết holiday, at a cost of about 30 million.

> For seven years Hạnh has run a furniture shop on a main road in the city, selling sofas, beds, wardrobes and dining sets that she buys ready-made from workshops in Bắc Ninh and Hà Nội. It is well known locally. She keeps her own books, and an accountant she hires files the shop's tax returns every quarter, which she says match her records. Last year's average monthly turnover was about 270 million VND, ranging from roughly 190 million in the slow summer months to about 380 million in the weeks before Tết. Buying stock costs her around 180 million a month. The shop rent is 24 million, the three staff cost 8 million each, and electricity, delivery and advertising take about 12 million. Last year she also sold a plot of inherited land for 900 million VND and used the money to finish the family house.

> She now wants to lease the unit next door and add a second product line of mattresses and bedding. She asks for 280,000,000 VND over 72 months on the strength of the shop's record alone, with no property pledged: about 60 million for the fit-out, 170 million for a first order of stock and 50 million for the lease deposit. She expects sales to grow by about a third once the expansion is finished.

> *Bank system note — estimated monthly installment for this request: 7,110,200 VND.*

2. **Dossier summary**

| Field | Value |
| ----- | ----- |
| Age | 44 |
| Occupation (player-facing) | Runs a furniture shop on a main road in Hải Phòng. Seven years in business, well known locally |
| Income | Average monthly turnover ≈ 270,000,000 VND (seasonal, ranging \~190M in slow summer months to \~380M before Tết). Stock costs ≈ 180,000,000/month. Rent 24,000,000; three staff at 8,000,000 each (24,000,000 in total); electricity, delivery and advertising ≈ 12,000,000 |
| Existing obligations (self-declared) | 10,000,000 VND/month (renovation loan) |
| CIC status | Group 2 — one late payment \~5 months ago, since regularized |
| Loan type | Unsecured — no property pledged |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 280,000,000 VND |
| Requested term | 72 months |
| Loan purpose | Business expansion — a second product line and a leased unit next door |
| Collateral | None |
| Estimated Monthly Installment (shown to player) | 7,110,200 VND/month |

**Revealed via "Check CIC":** Existing obligations (CIC-verified) \= **15,000,000 VND/month** — the renovation loan (10,000,000) is confirmed, plus an undisclosed working-capital loan of 5,000,000 VND/month, opened eight months ago.

3. ### **Step-by-step calculation**

| Step | Calculation | Result |
| ----- | ----- | ----- |
| Income | 270,000,000 turnover − 180,000,000 stock − 24,000,000 rent − 24,000,000 wages − 12,000,000 other costs | **30,000,000** — turnover itself is not income, and the seasonal swing averages out within this figure |
| Loan Type → Product Parameters | Unsecured → tenor cap 60mo, max age 70, rate 18%/year | r \= 1.5%/mo |
| Adjusted tenor | min(requested 72, product cap 60, (70−44)×12 \= 312\) | 60 months — the requested 72 exceeds the unsecured cap |
| New loan monthly installment (PMT) | 280,000,000 × 0.015 ÷ \[1 − (1.015)⁻⁶⁰\] | ≈ 7,110,200 |
| DTI (using CIC-verified obligations) | (15,000,000 \+ 7,110,200) ÷ 30,000,000 | **73.7%** |
| Classification | 70% \< 73.7% ≤ 80% | **REDUCE LIMIT** |
| Max approvable installment | 70% × 30,000,000 − 15,000,000 | 6,000,000 |
| Max approvable loan (PV, n=60, r=1.5%) | 6,000,000 × 0.590704 ÷ 0.015 | ≈ 236,282,000 VND |

### **The trap**

Two misreadings each produce a false Approve: using the 270,000,000 turnover as income instead of the 30,000,000 left after costs gives (15,000,000 \+ 7,110,200) ÷ 270,000,000 ≈ **8.2%**; using her self-declared 10,000,000 instead of the CIC-verified 15,000,000 gives (10,000,000 \+ 7,110,200) ÷ 30,000,000 ≈ **57.0%**. Only correctly netting the income *and* using the CIC figure gives the real answer: **73.7%**, Reduce limit.

4. ### **Reduce-limit walkthrough**

1\) Player locates income (30,000,000, computed from turnover and costs), existing obligations (CIC-verified: 15,000,000), and the given installment (7,110,200) — nothing further is revealed at this stage.

2\) Player calculates DTI \= (15,000,000 \+ 7,110,200) ÷ 30,000,000 \= 73.7%, lands in the 70–80% zone, and taps **Reduce limit** — locked in.

3\) Player calculates player\_entered\_max\_installment \= 70% × 30,000,000 − 15,000,000 \= **6,000,000**, and enters it. This is positive and ≤ the original 7,110,200, so it passes validation.

4\) System converts the entry via Present Value: 6,000,000 × 0.590704 ÷ 0.015 ≈ **236,282,000 VND**.

5\) Card reveals: the system's own DTI (73.7%), the correct max\_approvable\_installment (6,000,000) and max\_approvable\_loan (≈236,282,000), and grades the player's entry against a ±5% tolerance band — 5,700,000 to 6,300,000.

### **Correct Decision: Reduce limit (down to ≈236,282,000 VND at the same 60-month term)**

5. ### **Decision-Consequence Card**

Despite a well-established shop with 270 million VND in average monthly turnover, the income that counts for lending is the 30 million left after stock, rent, wages and other running costs. A second bank loan she did not mention brings her existing obligations to 15 million, and the new installment takes total debt service to nearly 74% of income. This leaves little room to absorb a slow sales month. Approving the full 280 million would extend more credit than her income can comfortably service, and it would rest on a debt she never declared. The defensible offer is a smaller loan of about 236 million over the same 60-month term.