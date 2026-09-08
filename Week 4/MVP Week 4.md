**The Credit Desk – 1C MVP (Capacity Only)**

# **1\.**    **Why This MVP Uses Only Capacity**

Of the 5 Cs, Capacity is the only driver that is (a) present in every KHCN dossier, (b) already fully quantified in the Rulebook (NDI, affordability ratio, risk factors, band width), and (c) does not depend on data the team does not yet have.

* Character – deferred: needs CIC event-level history data the team has not sourced yet; currently reduced to a single "clean/not clean" flag with no quantified rule.  
* Capital – deferred: requires net-worth/asset data rarely available for individual applicants in the time available.  
* Collateral – deferred: requires an LTV/valuation engine, which is an added layer of complexity not needed to prove the core loop.  
* Conditions – deferred: requires macro/market context data that is not attached to individual dossiers.

Capacity alone is enough to build one complete, defensible Input → Output loop – which is the actual goal of an MVP.

# **2\.**    **Full Flow: Input → Process → Output → User Action**

| Stage | What happens |
| :---- | :---- |
| 1\. Input | The player opens a KHCN dossier: Income, Living costs, Existing obligations, Occupation/tenure, Age, Dependents, Credit history (CIC), Requested amount, Tenor. |
| 2\. Process – Capacity base | Compute NDI, then Base Monthly Capacity via the affordability ratio. |
| 3\. Process – Risk adjustment | Apply Employment, Age and Dependents factors to get the Adjusted Monthly Capacity (point estimate). |
| 4\. Process – Band | Determine complexity tier and widen/narrow the point estimate into a Band. |
| 5\. Process – Gates | Compute DTI and Burden; apply hard/soft gates in fixed order, which may shift or override the Band. |
| 6\. Process – Red flag | Check income-volatility red flag (only non-overlapping flag remaining). |
| 7\. Classify | Compare the Estimated Monthly Installment (from requested amount \+ tenor) to the final Band. |
| 8\. Output | Decision-Consequence Card: Classification (Approve/Reduce/Reject), Consequence, Explanation – worded within the Claim Boundary. |
| 9\. User action | Player allocates remaining room to the next applicant; state (room, portfolio risk) updates. |

# **3\.**    **Input Layer – What the Player Sees**

Fields marked (display-only) are shown to the player for context but do not enter the formula in this MVP.

* Occupation, tenure → Employment factor  
* Monthly income → NDI, DTI, Burden  
* Living expenses → NDI, Burden  
* Existing debt obligations → NDI, DTI, Burden  
* Number of dependents → Dependents factor  
* Age → Age factor  
* Credit history / CIC (display-only in this MVP) → reserved for the future Character C  
* Collateral (display-only in this MVP) → reserved for the future Collateral C  
* Loan amount requested, Tenor → derives Estimated Monthly Installment, compared against the Band

  # **4\.**	**Process Layer – Step by Step**

  ## **4.1.**         **Step 1 – Net Disposable Income**

* NDI \= Income − Living costs − Existing obligations
* Burden \= (Existing debts + Living cost) / Income

  ## **4.2.**         **Step 2 – Base Monthly Capacity**

* Base Monthly Capacity \= NDI × 40–45% (affordability ratio). For a single point estimate, this MVP uses the midpoint, 42.5%.

  ## **4.3.**         **Step 3 – Risk Adjustment Factors**

* Adjusted Monthly Capacity \= Base Monthly Capacity × Employment factor × Age factor × Dependents factor.

  ## **4.4.**         **Step 4 – Band**

The Adjusted Monthly Capacity is a point estimate. It is converted into a defensible range using the complexity-tier band width:

* Low complexity (all factors \= ×1.00, no warning flags) → ± 10%  
* Medium complexity (exactly one factor \< 1.00, or one warning-level flag) → ± 20%  
* High complexity (two or more factors \< 1.00, or conflicting signals) → ± 30%

**Band \= Adjusted Monthly Capacity × (1 − band width) to Adjusted Monthly Capacity × (1 \+ band width).**

> > > ## **4.5.**         **Step 5 – Decision Gates (DTI / Burden)**

Computed independently of the Band, then applied in fixed order:

1\. If DTI \> 50% OR Burden \> 50% → Reject. Hard gate, overrides the Band entirely – stop here.

2\. Else if DTI is 43–50% → shift the Band down 10% (both ends).

3\. Else if the Unstable-income red flag triggers (income variation \> 30%) → shift the Band down 15%.

4\. Warning-only flags (DTI 35–43%, Burden 40–50%) attach a caution note but do not change numbers.

5\. Compare the Estimated Monthly Installment to the final Band → Approve / Reduce limit / Reject.

# **5\.**    **Output Layer – Decision-Consequence Card**

The output must stay inside the Claim Boundary – a Classification, not a Recommendation. This is also the moment everything hidden in Section 6 (Band, tier, correct classification) gets revealed to the player.

* Classification: whether the requested installment falls inside, above, or below the Band (or was hard-gated by DTI/Burden).  
* Consequence: what happens if this decision is taken on this applicant (e.g. "approving at this level leaves no buffer for irregular expenses").  
* Explanation: the specific numbers behind the classification – NDI, Adjusted Monthly Capacity, Band, DTI, Burden, and which gate fired – mapped back to Capacity, not phrased as financial advice.

  # **6\.**    **UI Visibility – What the Player Sees vs What Stays Hidden**

The Solution Structure document specifies that the defensible answer range is "author-side, hidden from the player." This means the Band, the point estimate, and the internal risk-factor breakdown must NOT appear on the Dossier Screen – only on the Decision-Consequence Card, after the player has already committed to a decision. Showing the Band up front would turn the task into a lookup instead of a judgment call.

| Field | Visibility | Why |
| :---- | :---- | :---- |
| Name, age, city, occupation \+ tenure, marital status, dependents | Visible | Personal profile – player must read and judge qualitatively |
| Monthly income, Living expenses, Existing debt obligations | Visible | Raw financial inputs the player reasons from |
| Credit history (CIC group) | Visible (display-only) | Not yet used in the MVP formula; reserved for the future Character C |
| Loan amount requested, Tenor, Collateral type | Visible | The request being evaluated |
| NDI, DTI, Burden | Visible – as bare numbers, no label | Pre-computed metrics the player interprets (per Solution Structure), but shown without a verdict attached |
| Estimated Monthly Installment | Visible | Needed for the player to reason against NDI/DTI, without being told the answer |
| Adjusted Monthly Capacity (point estimate) | Hidden until after decision | This is the system's computed conclusion – revealing it before the decision gives away the answer |
| Employment / Age / Dependents factor values | Hidden until after decision | Internal scoring logic, not a raw input |
| Complexity tier (Low/Medium/High) | Hidden until after decision | Internal scoring logic |
| Affordability Band | Hidden until after decision | This is exactly the "defensible answer range" the Solution Structure defines as author-side / hidden from the player |
| Which red flag(s) triggered | Hidden until after decision | Player must notice the pattern in the raw data themselves, not be told the label |
| Correct classification (Approve/Reduce/Reject) | Hidden until after decision | The answer key – revealed only in the Decision-Consequence Card, compared to the player's own choice |

- Raw inputs and pre-computed ratios (NDI/DTI/Burden) are visible as bare numbers – they support reasoning. Anything that already represents a conclusion (Band, tier, correct classification) is hidden until the reveal.

  ## **6.1.**         **New Screen: "How Assessment Works" (Tutorial / Help)**

A dedicated screen – shown once during onboarding and reachable anytime via a "?" icon – that teaches the qualitative rules above in plain language, with no numbers attached. It is static across all cases (does not change per dossier), so it cannot be used to reverse-engineer any specific Band.

* Content: the four qualitative bullet points above, phrased as general lending principles (mirrors how a real credit officer is trained on the 5 Cs, without exposing an internal scoring table).  
* Explicitly excluded from this screen: any multiplier, percentage, or threshold value.  
* Example wording: "A stable, long-tenure job supports a higher lending capacity than seasonal or freelance work. Applicants closer to retirement carry more repayment risk over a long loan term. More dependents mean less real disposable income than the raw number suggests."

  ## **6.2.**         **Where Exact Weights Finally Appear**

Exact multipliers are revealed only inside the Decision-Consequence Card, as part of the Explanation for that specific case – after the player has already decided. This keeps the weight case-specific and post-hoc, rather than a lookup table the player can consult in advance.

# **7\.**    **Decision Set for This MVP (only 3 of 5 options)**

Because only Capacity is modeled, only the three decisions Capacity alone can justify are included. The other two require a C that is not yet built.

| Decision | In 1C MVP? | Why |
| :---- | :---- | :---- |
| Approve | Yes | Determined entirely by Capacity: installment falls inside the Band. |
| Reject | Yes | Determined entirely by Capacity: installment falls above the Band, or a hard gate (DTI/Burden \> 50%) fires. |
| Reduce limit | Yes | Determined entirely by Capacity: installment falls slightly outside the Band's upper edge, within a defined tolerance. |
| Require more collateral (TSDB) | Deferred | Requires the Collateral C (LTV, asset valuation) – not part of this MVP. |
| Add conditions | Deferred | Requires the Conditions C (macro/market context, monitoring clauses) – not part of this MVP. |

# **8\.**    **Worked Example – Bùi Văn Long, 38**

> > > ## **8.1.**         **Dossier inputs**

| Field | Value |
| :---- | :---- |
| Occupation | Maintenance technician, manufacturing company, 4 years tenure |
| Monthly income | 15,000,000 VND (verified) |
| Living expenses | 8,000,000 VND |
| Existing debt obligations | 5,500,000 VND/month (2 active consumer loans, both on-time) |
| Dependents | 2 |
| Age | 38 |
| Credit history (CIC) | Group 1, clean |
| Loan amount requested | 100,000,000 VND |
| Tenor | 24 months |
| Collateral | Unsecured (salary-based) |
| Estimated monthly installment | 4,167,000 VND/month (≈ Loan amount ÷ Tenor) |

> > > ## **8.2.**         **Step-by-step calculation**

| Step | Calculation | Formula | Result |
| :---- | :---- | :---- | :---- |
| 1 | Net Disposable Income | 15,000,000 − 8,000,000 − 5,500,000 | 1,500,000 |
| 2 | Base Monthly Capacity (midpoint of 40–45%) | 1,500,000 × 42.5% | 637,500 |
| 3a | Employment factor | Stable, 4-yr tenure → Stable tier | ×1.00 |
| 3b | Age factor | 38 yrs; 22 yrs to age 60 (\>5 yrs) → Safe tier | ×1.00 |
| 3c | Dependents factor | 2 dependents → Moderate tier | ×0.90 |
| 4 | Adjusted Monthly Capacity (point estimate) | 637,500 × 1.00 × 1.00 × 0.90 | 573,750 |
| 5 | Complexity tier | Exactly one factor \< 1.00 (Dependents) | Medium (±20%) |
| 6 | Band | 573,750 × (1 ± 20%) | 459,000 – 688,500 |
| 7 | DTI | 5,500,000 / 15,000,000 | 36.7% → Moderate warning, no numeric change |
| 8 | Burden | (8,000,000+5,500,000) / 15,000,000 | 90% → Excessive, hard gate |
| 9 | Decision gate | Burden \> 50% → Reject, overrides Band | REJECT |

- **Result: REJECT. The Burden hard gate (90% \> 50%) and overrides the Band, step 1 taking precedence over the softer Band comparison.**

  ## **8.3.**         **Explanation shown to the player (within claim boundary)**

- Based on Capacity alone: this applicant's committed spending (living costs \+ existing debt) already consumes 90% of income, leaving very little disposable income to absorb a new obligation of this size. The requested installment (4,167,000/month) is roughly 6× the applicant's affordability band even before this hard gate.  
- This classification reflects Capacity only – Character, Collateral and Conditions are not yet part of this MVP."

# **Explicitly Out of Scope for This MVP**

●       Character: no quantified scoring of CIC history beyond a static "Group 1, clean" display field.

●       Capital: no net-worth or asset-based adjustment.

●       Collateral: no LTV calculation; the "Require more collateral" decision is unavailable.

●       Conditions: no macro/market adjustment; the "Add conditions" decision is unavailable.

