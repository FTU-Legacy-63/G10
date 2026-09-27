# **DOSSIER SET FOR MVP**

1. ## **Quick Reference**

| Case ID | Name / Age | Difficulty | Loan Type | Purpose / Requested | Key Flag(s) | Correct Decision |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| KHCN-01 | Trần Phương Anh, 33 | Easy | Unsecured | Car — 500M / 60mo | None — income fully usable, CIC confirms self-declared, no tenor cap | **Approve** |
| KHCN-02 | Đỗ Văn Kiên, 41 | Easy | Secured | House — 1,000M / 180mo | None — income fully usable, CIC confirms self-declared; already over-committed regardless | **Reject** |
| KHCN-03 | Trịnh Thị Hạnh, 44 | Hard | Unsecured | Business — 280M / 72mo requested → 60mo capped | Income usable only in part \+ CIC reveals hidden debt (10M→15M) \+ product tenor cap | **Reduce limit** |
| KHCN-04 | Nguyễn Văn Thịnh, 63 | Hard | Secured | House (investment property) — 950M / 120mo requested → 84mo capped | Secured-loan parameters \+ age-to-70 tenor cap \+ CIC reveals hidden debt (11M→18M) | **Reduce limit** |
| KHCN-05 | Vũ Minh Tuấn, 39 | Hard | Unsecured | Car — 360M / 60mo | Income usable only in part \+ CIC reveals hidden debt (10M→16M) \+ naive-vs-correct DTI trap | **Reject**  |

## **Credit room:** 1,610,000,000 VND

2. ## **Dossier set**

## **KHCN-01 — Trần Phương Anh, 33**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Trần Phương Anh, 33 |
| Occupation | HR Manager, FDI electronics manufacturer, Bắc Ninh — permanent contract, 7 years with the company |
| Monthly income (self-reported) | 38,000,000 VND — her salary is paid through the company's monthly payroll run and lands in her account on the same date each cycle |
| Existing debt obligations (self-declared) | 10,000,000 VND/month (personal installment loan, taken out for a family medical expense two years ago) |
| Credit history (CIC group) — display-only | Group 1, clean |
| Loan Type | Unsecured |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 500,000,000 VND |
| Requested term | 60 months |
| Loan purpose (contextual) | Car purchase |
| Collateral (display-only) | None (unsecured, salary-based) |
| Estimated Monthly Installment | 12,696,700 VND/month |

### **A2. Revealed via "Check CIC"**

Existing debt obligations (CIC-verified): **10,000,000 VND/month** — matches the self-declared figure exactly. One active loan, on-time, nothing else on record.

### **B. Author-Side Calculation**

1. **Loan Type → Product Parameters:** Unsecured → tenor cap 60 months, max age 70, rate 18%/year → r \= 1.5%/month  
2. **Adjusted tenor** \= min(60, 60, (70−33)×12 \= 444\) \= **60 months**  
3. **New loan monthly installment (PMT)** \= 500,000,000 × 0.015 ÷ \[1 − (1.015)⁻⁶⁰\] \= 7,500,000 ÷ 0.590704 ≈ **12,696,700**  
4. **Income verification:** salary paid through payroll on a fixed schedule → **Verified, 100%**. Adjusted Income \= 38,000,000  
5. **Adjusted DTI** \= (10,000,000 \+ 12,696,700) ÷ 38,000,000 \= 22,696,700 ÷ 38,000,000 \= **59.7%**  
6. **Classification:** 59.7% ≤ 70% → **APPROVE**

### **C. Correct Decision: Approve**

### **D. Decision-Consequence Card**

With a stable, seven-year tenure and salary paid consistently through the company's payroll, Ngọc Anh's income can be counted in full. After adding her existing installment loan and the new vehicle payment, total monthly debt service comes to just under 60% of income — leaving a real buffer for unplanned expenses even with this loan in place. Reducing or rejecting this request would turn away a well-documented, comfortably affordable case for no defensible reason.

## **KHCN-v2-02 — Đỗ Văn Kiên, 41**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Đỗ Văn Kiên, 41 |
| Occupation | Warehouse Supervisor, logistics company — permanent contract, 6 years with the company |
| Monthly income (self-reported) | 25,000,000 VND — his salary is paid through the company's monthly payroll run, crediting his account on the same date every month |
| Existing debt obligations (self-declared) | 13,000,000 VND/month (Car loan: 6,000,000 \+ Personal loan: 7,000,000) |
| Credit history (CIC group) — display-only | Group 1, clean |
| Loan Type | Secured |
| Applicable interest rate | 11% / year (0.917% / month) |
| Requested amount | 1,000,000,000 VND |
| Requested term | 180 months |
| Loan purpose (contextual) | House purchase |
| Collateral (display-only) | The house being purchased |
| Estimated Monthly Installment | 13,639,700 VND/month |

### **A2. Revealed via "Check CIC"**

Existing debt obligations (CIC-verified): **13,000,000 VND/month** — matches the self-declared figure exactly. Both loans on record, both on-time.

### **B. Author-Side Calculation**

1. **Loan Type → Product Parameters:** Secured → tenor cap 360 months, max age 70, rate 11%/year → r \= 0.9167%/month  
2. **Adjusted tenor** \= min(180, 360, (70−41)×12 \= 348\) \= **180 months**  
3. **New loan monthly installment (PMT)** \= 1,000,000,000 × 0.0091667 ÷ \[1 − (1.0091667)⁻¹⁸⁰\] \= 9,166,700 ÷ 0.806499 ≈ **11,366,100**  
4. **Income verification:** payroll, fixed schedule → **Verified, 100%**. Adjusted Income \= 25,000,000  
5. **Adjusted DTI** \= (13,000,000 \+ 11,366,100) ÷ 25,000,000 \= 24,366,100 ÷ 25,000,000 \= **97.5%**  
6. **Classification:** 97.5% \> 80% → **REJECT**

### **C. Correct Decision: Reject**

### **D. Decision-Consequence Card**

Despite a stable, long-tenured position with income paid consistently through payroll, Kiên's existing debt obligations alone already consume more than half of his monthly income. Adding the installment for this house purchase pushes total debt service to nearly 98% of what he earns in a month. This leaves virtually no disposable income to cover the new obligation, let alone his other monthly needs. Approving this loan would require him to draw on funds entirely outside his documented income just to stay current. In this case, his existing financial commitments alone are sufficient grounds for rejection, independent of the property's value.

## **KHCN-03 — Trịnh Thị Hạnh, 44**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Trịnh Thị Hạnh, 44 |
| Occupation | Owner, home-appliance retail shop, Hải Phòng — 7 years running the business, a well-known local shop with a small staff |
| Monthly income (self-reported) | 95,000,000 VND — most of her daily sales are settled in cash at the counter, and she keeps track of revenue in a personal notebook rather than through a dedicated business account |
| Existing debt obligations (self-declared) | 10,000,000 VND/month (supplier credit installment) |
| Credit history (CIC group) — display-only | Group 2 — one late payment \~5 months ago on the supplier credit line, since resolved and current |
| Loan Type | Unsecured |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 280,000,000 VND |
| Requested term | 72 months |
| Loan purpose (contextual) | Business expansion — additional shop floor space and a second product line |
| Collateral (display-only) | None (unsecured) |
| Estimated Monthly Installment | 7,110,200 VND/month |

### **A2. Revealed via "Check CIC"**

Existing debt obligations (CIC-verified): **15,000,000 VND/month** — the supplier credit line (10,000,000) is confirmed, **plus an undisclosed working-capital installment loan of 5,000,000 VND/month** from a licensed consumer finance company, taken out to restock inventory during a slow season and never mentioned.

### **B. Author-Side Calculation**

1. **Loan Type → Product Parameters:** Unsecured → tenor cap **60 months**, max age 70, rate 18%/year → r \= 1.5%/month  
2. **Adjusted tenor** \= min(requested **72**, product cap **60**, (70−44)×12 \= 312\) \= **60 months** — the requested 72 months exceeds the unsecured product cap, so it's capped down to 60; the installment shown already reflects that.  
3. **New loan monthly installment (PMT)** \= 280,000,000 × 0.015 ÷ \[1 − (1.015)⁻⁶⁰\] \= 4,200,000 ÷ 0.590704 ≈ **7,110,200**  
4. **Income verification:** no documented, bank-traceable income history — only her own handwritten records → **Cash-based / unverified, 30%**. Adjusted Income \= 95,000,000 × 0.30 \= **28,500,000**  
5. **Adjusted DTI (using CIC-verified obligations)** \= (15,000,000 \+ 7,110,200) ÷ 28,500,000 \= 22,110,200 ÷ 28,500,000 \= **77.6%**  
6. **Classification:** 70% \< 77.6% ≤ 80% → **REDUCE LIMIT**  
7. **Maximum approvable installment** \= 70% × 28,500,000 − 15,000,000 \= 19,950,000 − 15,000,000 \= **4,950,000**  
8. **Maximum approvable loan (PV, n \= 60, r \= 1.5%)** \= 4,950,000 × 0.590704 ÷ 0.015 ≈ **194,932,000 VND**

### **C. Correct Decision: Reduce limit (down to ≈194,932,000 VND at the same 60-month term)**

### **D. Decision-Consequence Card**

Despite a strong-looking revenue figure, most of Hạnh's income has no bank-traceable record that Rulebook can credit at face value — only 30% of it counts toward capacity. Once her usable income is applied and her true obligations — including a working-capital loan she did not disclose — are factored in, total monthly debt service reaches roughly 78% of what she can actually be shown to earn. This leaves almost no room to absorb a slow month at the shop. Approving the loan as requested would extend more credit than her documented income can support; the defensible offer is a smaller loan at the same term, not the amount as requested.

## **KHCN-04 — Nguyễn Văn Thịnh, 63**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Nguyễn Văn Thịnh, 63 |
| Occupation | Retired state-enterprise employee; now leases out two ground-floor commercial units on a busy street in Đà Nẵng |
| Monthly income (self-reported) | 48,000,000 VND — Vietnam Social Insurance deposits his monthly pension (12,000,000) on the same day each month, and his two tenants, each under a signed three-year lease, transfer their rent (18,000,000 each) into his account at the start of every month |
| Existing debt obligations (self-declared) | 11,000,000 VND/month (consumer loan for a prior property renovation) |
| Credit history (CIC group) — display-only | Group 1, clean |
| Loan Type | Secured |
| Applicable interest rate | 11% / year (0.917% / month) |
| Requested amount | 950,000,000 VND |
| Requested term | 120 months |
| Loan purpose (contextual) | House purchase — an additional small apartment/shophouse to add to his rental portfolio |
| Collateral (display-only) | One of his existing rental units, fully owned and unencumbered |
| Estimated Monthly Installment | 16,266,600 VND/month |

### **A2. Revealed via "Check CIC"**

Existing debt obligations (CIC-verified): **18,000,000 VND/month** — the renovation loan (11,000,000) is confirmed, **plus an undisclosed personal loan of 7,000,000 VND/month**.

### **B. Author-Side Calculation**

1. **Loan Type → Product Parameters:** Secured → tenor cap **360 months**, max age 70, rate 11%/year → r \= 0.9167%/month  
2. **Adjusted tenor** \= min(requested **120**, product cap 360, (70−63)×12 \= **84**) \= **84 months** — the age-to-70 cap is the binding constraint, well below both the requested term and the secured product's own ceiling.  
3. **New loan monthly installment (PMT)** \= 950,000,000 × 0.0091667 ÷ \[1 − (1.0091667)⁻⁸⁴\] \= 8,708,365 ÷ 0.535352 ≈ **16,266,600**  
4. **Income verification:** pension via Social Insurance \+ lease-based rent, both landing on a fixed schedule → **Verified, 100%**. Adjusted Income \= 48,000,000  
5. **Adjusted DTI (using CIC-verified obligations)** \= (18,000,000 \+ 16,266,600) ÷ 48,000,000 \= 34,266,600 ÷ 48,000,000 \= **71.4%**  
6. **Classification:** 70% \< 71.4% ≤ 80% → **REDUCE LIMIT**  
7. **Maximum approvable installment** \= 70% × 48,000,000 − 18,000,000 \= 33,600,000 − 18,000,000 \= **15,600,000**  
8. **Maximum approvable loan (PV, n \= 84, r \= 0.9167%)** \= 15,600,000 × 0.535352 ÷ 0.0091667 ≈ **911,071,000 VND**

### **C. Correct Decision: Reduce limit (down to ≈911,071,000 VND at the same 84-month term)**

### **D. Decision-Consequence Card**

Despite fully documented pension and rental income, Thịnh's age caps this loan's term at 84 months — seven years, not the ten he requested — which pushes the monthly installment higher than a longer term would allow. Combined with a private loan he did not mention, total monthly debt service reaches just over 71% of his income, placing him inside the risk zone rather than comfortably within it. Approving the full amount at the requested term ignores a limit he is not eligible for under this product. The defensible offer is a smaller loan at the shorter, permitted term, not the amount as requested.

## **KHCN-05 — Vũ Minh Tuấn, 39**

### **A. Player-Visible Dossier Screen**

| Field | Value |
| ----- | ----- |
| Name / Age | Vũ Minh Tuấn, 39 |
| Occupation | Independent real-estate sales broker, works across several agencies, TP.HCM — 5 years in the trade |
| Monthly income (self-reported) | 65,000,000 VND — 6-month average; commissions from each closed deal are paid out by whichever agency he partnered with for that deal, landing in whichever of his two personal accounts was linked to that transaction at the time |
| Existing debt obligations (self-declared) | 10,000,000 VND/month (personal loan, taken out to cover a previous business setup cost) |
| Credit history (CIC group) — display-only | Group 2 — one late payment \~4 months ago on the personal loan, since resolved and current |
| Loan Type | Unsecured |
| Applicable interest rate | 18% / year (1.5% / month) |
| Requested amount | 360,000,000 VND |
| Requested term | 60 months |
| Loan purpose (contextual) | Car purchase |
| Collateral (display-only) | None (unsecured) |
| Estimated Monthly Installment | 9,141,600 VND/month |

### **A2. Revealed via "Check CIC"**

Existing debt obligations (CIC-verified): **16,000,000 VND/month** — the personal loan (10,000,000) is confirmed, **plus an undisclosed installment of 6,000,000 VND/month** on a revolving credit line opened about a year ago.

### **B. Author-Side Calculation**

1. **Loan Type → Product Parameters:** Unsecured → tenor cap 60 months, max age 70, rate 18%/year → r \= 1.5%/month  
2. **Adjusted tenor** \= min(60, 60, (70−39)×12 \= 372\) \= **60 months**  
3. **New loan monthly installment (PMT)** \= 360,000,000 × 0.015 ÷ \[1 − (1.015)⁻⁶⁰\] \= 5,400,000 ÷ 0.590704 ≈ **9,141,600**  
4. **Income verification:** commission income with no consistent deposit pattern to any single account, and no third party confirming the figure → does not meet the bar for Verified → **Cash-based / unverified, 30%**. Adjusted Income \= 65,000,000 × 0.30 \= **19,500,000**  
5. **Adjusted DTI (using CIC-verified obligations)** \= (16,000,000 \+ 9,141,600) ÷ 19,500,000 \= 25,141,600 ÷ 19,500,000 \= **128.9%**  
6. **Classification:** 128.9% \> 80% → **REJECT**

### **C. Correct Decision: Reject**

### **D. Decision-Consequence Card**

Despite an income figure that looks comfortable on paper, Tuấn's commissions arrive unpredictably across different accounts, with no consistent pattern this Rulebook can credit at full value. Once his usable income is properly discounted and an undisclosed credit-line installment is added to his obligations, total monthly debt service reaches nearly 129% of what he can actually be shown to earn — well beyond his capacity regardless of how the loan is structured. Approving this request on the numbers as declared would mean lending against income that cannot be substantiated. His true financial position alone is sufficient grounds for rejection.