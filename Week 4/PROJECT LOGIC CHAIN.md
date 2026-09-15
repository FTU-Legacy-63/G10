# **PROJECT LOGIC CHAIN (Owner: Doan Diep Anh)**

# **1\. Project Statement**

The Credit Desk is a simulated personal credit appraisal game. Players act as credit officers, review fictional applicant dossiers, choose Approve, Reduce Limit, or Reject, and receive feedback explaining their decisions based on repayment capacity.

The MVP focuses on **Capacity**, using transparent calculations and rules to connect applicant information with an assessment result and an in-game consequence.

## **2\. Problem → User → Product → Learning Outcome**

| Component | Application to The Credit Desk |
| ----- | ----- |
| **Problem** | Learners need practice connecting income, living expenses, existing debt obligations, and income stability to a defensible credit decision. Looking only at high income or low existing debt can cause them to overlook repayment constraints. |
| **Proposed target users** | Banking and finance students are learning to read and assess personal credit applications. |
| **User task** | Review a dossier, identify factors affecting Capacity, choose whether to approve, reduce the limit, or reject, and explain the reasoning. |
| **Product** | A browser-based simulation with fictional dossiers, interactive decisions, and Decision-Consequence Cards. |
| **Expected learning outcome** | Players can explain why a requested loan fits or exceeds repayment capacity under the simulation’s rules and distinguish income, disposable income, and existing financial commitments. |

These learning outcomes are project objectives. Actual learning effectiveness must be evaluated through user participation and feedback.

## **3\. Project Logic Chain Following the Week 4 Framework**

**Input / State → Reasoning → Result → Interpretation → Limitation**

| Stage | Application to The Credit Desk |
| ----- | ----- |
| **Input / State** | A fictional dossier containing net income, living expenses, existing debt obligations, occupation, employment tenure, contract type, age, dependents, income variation, requested amount, and tenor. Game state includes the current dossier, remaining credit allocation, and decision history. |
| **Reasoning** | Calculate NDI, DTI, and Burden; determine base repayment capacity; apply adjustment factors; establish an assessment band; apply hard gates and band adjustments; compare the requested monthly installment with the result. |
| **Result** | Produce an in-game classification: Approve, Reduce Limit, or Reject. Compare this with the player’s choice and update the game state. |
| **Interpretation** | Explain which factors determined the result, which rules were triggered, and what consequence follows from the player’s decision in the scenario. |
| **Limitation** | The result reflects Capacity under the MVP’s assumptions. Dossiers are fictional, installment calculations exclude interest and fees, and the model does not assess all five Cs of credit. |

**Learning loop:**

Review dossier → Make a decision → Record the decision and update state → Review consequence and explanation → Continue to the next dossier.

## **4\. Input → Financial Logic → Output**

### **Variable Definitions**

* **I:** Verified net monthly income.  
* **L:** Monthly living expenses, excluding debt repayments.  
* **D:** Existing monthly debt obligations, excluding the proposed loan.  
* **P:** Requested loan principal.  
* **T:** Loan tenor in months.

| Input | Logic / Process | Output | Claim Boundary |
| ----- | ----- | ----- | ----- |
| I, L, D | NDI \= I − L − D | Income remaining after living expenses and existing debt payments | An arithmetic result based on the fictional inputs. |
| D, I | DTI \= D / I | Existing debt obligations as a share of income | Excludes the payment on the proposed loan. |
| D, L, I | Burden \= (D \+ L) / I | Income already committed to living expenses and existing debt | An indicator defined specifically for this project. |
| NDI | Base Capacity \= NDI × 42.5% | Base monthly repayment capacity | The 42.5% ratio is the midpoint of the team’s assumed 40–45% range. |
| Employment, age, dependents | Adjusted Capacity \= Base Capacity × Employment Factor × Age Factor × Dependents Factor | Adjusted monthly repayment capacity | The multipliers are simulation assumptions, not a validated credit model. |
| Risk factors and warning signals | Select Band Width: ±10%, ±20%, or ±30% | Initial assessment band | A rule-based range, not a statistical confidence interval. |
| DTI, Burden, income variation | Apply hard gates and adjustments in a fixed order | Final band or Reject classification | A classification within the MVP’s scope. |
| P, T | Simplified monthly installment \= P / T | Monthly amount used for comparison | Excludes interest, fees, and actual repayment schedules. |
| Player decision | Compare against the model result and record the choice | Feedback, scenario consequence, and updated game state | A designed learning consequence, not a default prediction. |

### **Proposed Classification Rules for a Consistent Implementation**

1. If **DTI \> 50% or Burden \> 50%**, classify the request as Reject. This overrides the assessment band.  
2. If no hard gate applies and the requested installment falls within the final band, classify it as Approve.  
3. If the installment exceeds the upper bound but the model still supports a smaller loan, classify it as Reduce Limit. The simplified principal ceiling equals the upper monthly installment bound multiplied by the tenor.  
4. An installment below the lower bound does not automatically indicate insufficient repayment capacity. The proposed treatment is to describe it as conservative lending; no score penalty should be applied without an explicit justification.

Rules 3–4 are proposed standardizations because the supplied documents do not fully agree on Reduce Limit, Reject, and below-band treatment.

## **5\. Expected Result — A Predictable Sample Case**

**Illustrative dossier: KHCN-002 — Lê Văn Bình, age 35**, from the ten-dossier set.

To match the Rulebook’s income definition, this example treats **VND 45 million as fictional net monthly income**. The source dossier’s “gross income” label must be corrected accordingly. If the figure represents actual gross income, the calculation must be revised.

### **Sample Inputs**

| Input | Value |
| ----- | ----- |
| Net monthly income | VND 45,000,000 |
| Monthly living expenses | VND 14,000,000 |
| Existing monthly debt obligations | VND 5,000,000 |
| Occupation | Real estate agent with commission-based income |
| Employment tenure | 3 years |
| Dependents | 1 |
| Requested loan amount | VND 700,000,000 |
| Tenor | 36 months |
| Income variation | Does not trigger the \>30% volatility flag under the dossier’s assumptions |

### **Expected Calculations**

| Step | Calculation | Expected Result |
| ----- | ----- | ----- |
| NDI | 45,000,000 − 14,000,000 − 5,000,000 | VND 26,000,000 |
| Base Capacity | 26,000,000 × 42.5% | VND 11,050,000/month |
| Adjusted Capacity | 11,050,000 × 0.85 × 1.00 × 1.00 | VND 9,392,500/month |
| Band ±20% | 9,392,500 × \[0.8; 1.2\] | VND 7,514,000–11,271,000/month |
| DTI | 5,000,000 / 45,000,000 | 11.11% |
| Burden | 19,000,000 / 45,000,000 | 42.22% |
| Requested installment | 700,000,000 / 36 | Approximately VND 19,444,444/month |
| Model principal ceiling | 11,271,000 × 36 | VND 405,756,000 |

**Expected classification: Reduce Limit.**

No hard gate applies. Burden falls within the warning zone but does not change the numerical band. The requested installment exceeds the upper bound of VND 11,271,000 per month. Under the model, the principal can therefore be reduced to a maximum of VND 405,756,000.

### **Sample Feedback to the Player**

> Under the game’s Capacity model, the requested VND 700 million loan exceeds this applicant’s assessment band. Low existing debt alone does not establish that the new loan fits repayment capacity. After adjustment for commission-based income, the monthly installment ceiling is VND 11.271 million, equivalent to VND 405.756 million over 36 months, excluding interest and fees.

### **Expected State Change**

If the player chooses to grant VND 405,756,000 and sufficient credit allocation remains:

* Used credit allocation increases by VND 405,756,000.  
* Remaining credit allocation decreases by the same amount.  
* The decision history records one decision.  
* Repeated confirmation must not deduct the amount a second time.

## **6\. Claim Boundary**

The MVP provides calculations, classifications, and explanations within a learning scenario. “Approve” means that the request satisfies the game’s Capacity rules.

Character, Capital, Collateral, and Conditions do not influence the MVP’s decision. CIC information and collateral may appear as contextual information, but they must not silently alter the classification.

Thresholds, adjustment factors, and assessment bands must be disclosed as simulation assumptions where applicable. Outputs must not be presented as repayment guarantees, actual bank approval decisions, or proof of professional competence.

