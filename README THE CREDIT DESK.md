**The Credit Desk**

**Link Demo game: [https\://the-credit-desk-preview-2026-10-21.vercel.app/integration/](https://the-credit-desk-preview-2026-10-21.vercel.app/integration/)**

*The Credit Desk is a browser-based credit-appraisal simulation in which the player acts as a bank credit officer, reads applicant dossiers under a limited credit room, and makes defensible lend / no-lend decisions with consequence-based feedback.*

**Course:** Technology Applications in Banking and Finance (NHA408E), FTU 2026	

**Team:** Group 10

 **1\. Team Members and Roles**

| Full name | Student ID | Main role | Output owned |
| :---- | :---- | :---- | :---- |
| Doan Diep Anh | 2412380005 | Product Lead | Game concept, core loop and scoring spec; decision matrix; scope definition; Proposal, Solution Structure, README. |
| Lai Ngoc Linh | 2412380025 | Credit Lead | Rulebook (limit formula, risk factors, DTI/Burden gates); Red Flag table; per-dossier answer key; threshold disclosure. |
| Nguyen Ngoc Minh Ha | 2413380016 | Scenario and Data Lead | Input dictionary (dossier field schema); dossier bank of authored cases; assumptions and sample-case documentation. |
| Nguyen Duc Minh | 2412560029 | Technical Lead | Core engine (state, scoring, data loader); end-to-end integration route; test table and bug log; GitHub Pages deployment. |
| Dang Thi Van Trang | 2413380047  | Design Lead | Screen set and UX flow; decision panel and room dashboard; Result-Reason-Meaning-Action-Limit result screen; visual identity. |

# **2\. Problem Statement**

Year 3-4 Finance and Banking students at FTU who are preparing for credit or risk roles have the theory of credit appraisal but no hands-on practice making a lend / no-lend call.

●      It is judgment, not arithmetic. There is no single correct answer; the officer must weigh trade-offs under a limited credit room.

●      The skill is experience-gated. Many Vietnamese postings require around two years at a credit institution, which students by definition do not have.

●      There is no safe practice environment. Real lending mistakes cost real money, so beginners cannot learn by trial and error on the job.

●      There is no suitable local tool. US tools are consumer credit-score apps; the closest simulation, Finsimco, is paid, English-only, and corporate-focused.

**Year 3-4 Finance and Banking students at FTU struggle to make defensible lending decisions (whether to lend, how much, and on what terms) because they have theory but limited experience applying credit judgment under a constrained credit room, and lack a suitable local practice tool.**

# **3\. Product Overview**

The Credit Desk is a scenario-decision simulation. The game does not tell the player the answer. The player reads a dossier, interprets pre-computed metrics, spots red flags, and commits to a decision. Only then does the game reveal the consequence and the defensible band the decision is judged against.

**Dossier  \-\>  Analyse (Capacity, red flags)  \-\>  Decide  \-\>  Consequence \+ Classification \+ Explanation  \-\>  Next applicant**

The core loop sits inside a room-allocation meta-loop: a fixed credit room is shared across several applicants, forcing who-to-fund trade-offs. This is what keeps the product judgment-based rather than a plug-and-chug formula.

# **4\. Problem Candidates**

In the problem-definition stage the team evaluated three directions against five filters: Specific, Relevant, Meaningful, Supportable, Feasible.

| Candidate | Target user | Task / decision | Evaluation |
| :---- | :---- | :---- | :---- |
| 1\. Credit Appraisal Game (The Credit Desk) | Year 3-4 Finance and Banking students aiming for credit/risk roles | Read a dossier, spot red flags, decide whether and how to lend under a limited room | SELECTED. Satisfies all five filters; strongest on judgment-based difficulty and novelty (no comparable Vietnamese-language tool). |

## **Selected Direction**

The Credit Desk focuses on how a credit officer thinks and decides, not on asking the player to compute a ratio or pick an investment. It closes the theory-to-judgment gap for the exact role students are training for.

# **5\. Selected Target Users**

The primary target user is:

**Year 3-4 Finance and Banking students who have taken credit/banking coursework and are preparing for internships or entry-level Credit Analyst, Relationship Manager, or Risk roles, but who have no real appraisal experience.**

The player is expected to already have basic finance knowledge (financial statements, financial ratios, DTI/LTV, the Five Cs) but little experience handling realistic client situations.

# **6\. User Task or Decision**

The core task the player practises is:

**For this applicant, should I lend, how much, and on what terms?**

The player is not given a diagnosis. Instead, the player must decide:

●      which fields in the dossier actually matter for repayment capacity;

●      which red flags are present and how serious they are;

●      whether the requested installment fits within a defensible affordability band; and

●      which of the three decisions to take: Approve, Reduce limit, or Reject.

 **7\. How to run it**

1\.    Open the product link above in any modern browser. Nothing needs to be installed, and the build has been opened on a second device and on a phone.

2\.    Read the "How Assessment Works" screen once. It teaches the 70% and 80% DTI lines, how the monthly installment is produced, how the age-to-70 tenor cap works, and why income has to be verified before it is counted.

3\.    Work the five dossiers in order, then submit the round to see the Summary Consequence Card.

To run it locally instead: clone the repository and open index.html in a browser. There is no build step and no server requirement. The five cases and the 105 warehouse records are loaded at runtime from data/dossiers.json and data/warehouse.json, so changing a figure in those files changes the product.

# **8\. What the player does — the core loop**

Nine steps, one branch, one loop. This is the flow the build, every specification document and the live demo all describe.

| \# | Step | What the player does |
| :---- | :---- | :---- |
| 1 | Open the dossier | Reads the applicant’s narrative: occupation, age, loan type, requested amount and tenor, stated income, self-declared debts, collateral and context. The estimated monthly installment is given as a bare number. |
| 2 | Check CIC | Reveals the credit bureau record: which debts are actually active, their real monthly payments, and anything the applicant did not declare. |
| 3 | Warehouse lookup | Searches the income-verification warehouse by name, age and province, and pins one record. Lookalike records exist, so identity matters. |
| 4 | Count the income | Decides which documented receipts qualify: recurring, third-party confirmed, paid into the applicant’s own account. Quarterly rent is converted to monthly; one-off payments, relatives’ transfers and unlet property are excluded. |
| 5 | Compute DTI | DTI \= (CIC-verified obligations \+ estimated monthly installment) ÷ verified income. |
| 6 | Classify | Compares the result to the 70% and 80% lines and chooses Approve, Reduce limit or Reject. The choice stays provisional. |
| 7 | Reduce-limit input (branch) | On the Reduce path only, enters a maximum installment: 70% × income − obligations. The system converts it to a loan amount by present value. |
| 8 | Save and continue (loop) | The decision is saved with no feedback. Room used updates, and the next dossier opens. Any dossier already opened can be reopened and revised. |
| 9 | Submit the round | When every dossier has a decision, the player submits and confirms. All decisions lock and the Summary Consequence Card opens. |

*Nothing about correctness is visible before submission — not after a dossier, and not during review. That is what makes revisable decisions safe: there is no feedback to farm.*

# **9\. The financial logic**

One quantified gate, disclosed openly: Capacity, expressed as DTI. The chain runs as follows.

| Step | Rule |
| :---- | :---- |
| 1\. Product parameters | Loan type selects a parameter row. Unsecured: tenor cap 60 months, 18% per year. Secured: tenor cap 360 months, 11% per year. Maximum age at maturity 70 for both. Loan type never moves the decision bands. |
| 2\. Adjusted tenor | n \= min(requested tenor, product cap, (70 − age) × 12). When the age cap binds, the tenor shortens and the installment rises. |
| 3\. Monthly installment | PMT \= P × r ÷ \[1 − (1 \+ r)⁻ⁿ\], where P is the requested amount and r is the annual rate ÷ 12\. Pre-computed and shown to the player, because the learning target is judgment, not annuity arithmetic. |
| 4\. Verified income | The DTI denominator is the income the warehouse records support, never the stated figure. Four of the five cases differ from the stated amount, one in the opposite direction, and one matches exactly, so neither "always different" nor "always the same" can be learned. |
| 5\. Obligations | The DTI numerator uses CIC-verified monthly payments on active debts only. Credit cards count at the minimum payment; closed accounts count for nothing; household living costs are not obligations. |
| 6\. DTI | DTI \= (obligations \+ installment) ÷ verified income. |
| 7\. Classification | DTI ≤ 70% → Approve.   70% \< DTI ≤ 80% → Reduce limit.   DTI \> 80% → Reject. |
| 8\. Reduce-limit conversion | Maximum installment \= 70% × income − obligations. The system converts it to a loan amount by present value: M × \[1 − (1 \+ r)⁻ⁿ\] ÷ r. Grading allows ±5% on the entered installment so reasonable rounding is not marked wrong. |

There is deliberately no composite suitability score. A weighted score would look objective while hiding its weights, and it would let the player read a number instead of building the reasoning. One disclosed gate with disclosed thresholds is the weaker claim, and it is the one the evidence supports.

## **Threshold disclosure**

Every threshold in the product is labelled either Sourced or Assumption. The distinction is stated in the product, not only in the documents.

| Threshold | Value | Status |
| :---- | :---- | :---- |
| DTI approve ceiling | 70% | Sourced — typical Vietnamese bank practice per finance-expert feedback |
| DTI reject floor | 80% | Sourced — same feedback |
| Maximum age at maturity | 70 | Sourced for the example, Assumption as applied — adapted from one real-estate-loan example and applied to both products |
| Maximum tenor | 60 months unsecured, 360 secured | Sourced — MVP parameter, consistent with the data-authoring checklist |
| Interest rate | 18% unsecured, 11% secured | Assumption — no case dossier records a real per-case rate |
| Installment formula (PMT) | P × r ÷ \[1 − (1+r)⁻ⁿ\] | Sourced — the formula lenders use to generate a repayment schedule |
| Reduce-limit conversion (PV) | M × \[1 − (1+r)⁻ⁿ\] ÷ r | Sourced — the mathematical inverse of PMT, so both directions stay consistent |
| Grading tolerance | ±5% on the entered installment | Assumption — chosen so reasonable rounding is not marked wrong |
| Income counting rules | Recurring / third-party confirmed / own account / registered tenant | Assumption, disclosed in-product on the "How Assessment Works" screen |

# **10\. The round: five dossiers, one credit room**

A fixed credit room of 2,050,000,000 VND is shared across five applicants. That is what forces the trade-off: a decent applicant can be refused because the room is better spent elsewhere. The room is the mechanism that makes the task a judgment rather than a calculation.

| Case | Applicant | Request | DTI | Correct decision | What it tests |
| :---- | :---- | :---- | :---- | :---- | :---- |
| KHCN-01 | Trần Phương Anh, 35 | 500M / 60mo, secured | 58.0% | Approve | Verified salary lower than stated; a spouse’s income is not the borrower’s |
| KHCN-02 | Đỗ Văn Kiên, 41 | 700M / 180mo, secured | 89.5% | Reject | CIC shows a larger car loan than declared; existing debt, not loan size, is the problem |
| KHCN-03 | Trịnh Thị Hạnh, 44 | 500M / 60mo, unsecured | 66.9% | Approve | Verified income higher than stated; card at minimum payment; closed loan; CIC Group 2 is a false alarm |
| KHCN-04 | Nguyễn Văn Thịnh, 66 | 450M / 120mo, secured | 75.4% | Reduce to ≈383M over 48mo | Age-to-70 tenor cap; quarterly rent; stable versus unstable leases; undeclared CIC loan |
| KHCN-05 | Vũ Minh Tuấn, 39 | 680M / 240mo, secured | 74.8% | Reduce to ≈610M over 240mo | A tempting monthly average of irregular income; two debts larger than declared |

A fully correct round uses 1,993,399,000 VND of the 2,050,000,000 room, leaving a buffer of about 56.6M — which is what covers the ±5% grading tolerance on both Reduce cases.

## **What the player sees and what stays hidden**

| Visible | Hidden until the round is submitted |
| :---- | :---- |
| Name, age, occupation, tenure, loan purpose and collateral (context only). Stated income and self-declared debts. Loan type, rate, tenor and requested amount. The estimated monthly installment, as a bare number. The CIC record, after Check CIC. The warehouse records, after a search. The round overview: dossiers opened, the player’s current decision on each, and room used. | The applicant’s DTI. The system’s own DTI for comparison. The correct classification. The system’s correct maximum installment and maximum loan amount on the Reduce path. Every per-case explanation. |

*The round overview is built only from the player’s own entries, so it reveals nothing about the answers. This is the anti-exploit rule in one line: nothing visible before submission is derived from the answer key.*

# **11\. Claim boundary**

**The product performs Classification and Comparison. It does not perform Recommendation, and no screen may say "best", "recommended" or "you should lend".**

| Output | What we claim | What we do not claim |
| :---- | :---- | :---- |
| Adjusted tenor, installment, DTI, maximum loan | A numeric result under stated parameters | That the rate or the age cap matches any specific bank’s live product |
| Band label (Approve / Reduce / Reject) | Which side of the 70% and 80% lines this request falls on, given the counted income and obligations | That this is a guaranteed industry standard, or that the applicant will or will not repay |
| Room usage across five dossiers | How the five decisions together consumed the shared room | That any one allocation is optimal |
| Consequence and explanation | What follows from this decision on this applicant, and which figures drove it | Advice of any kind |

# **8\. Where the evidence is**

The repository is organised so that a reader can reach any piece of evidence in one click from here or from docs/EVIDENCE\_INDEX.md.

| Path | What it holds |
| :---- | :---- |
| index.html, src/ | The build: engine, state, warehouse lookup, round submission, screens |
| data/dossiers.json | The five authored cases as data the engine loads |
| data/warehouse.json | 105 verification records with their hidden fields (case id, verified income, group id, noise type, trap flag) |
| docs/PROJECT\_PROPOSAL.md | Problem direction, target user and task, product statement, main output, feasibility |
| docs/SOLUTION\_STRUCTURE.md | Solution chain, required information, core process type, MVP flow, scope split, responsibility by output |
| docs/SOURCE\_USE\_MAP.md | Every external source mapped to the one claim it supports, with its limitation stated |
| docs/PROJECT\_LOGIC\_CHAIN.md | The adjusted logic chain: input to reasoning to result to interpretation to limitation, with a claim boundary per variable and the predicted misreadings |
| docs/CREDIT\_APPRAISAL\_RULEBOOK.md | The authoritative definitions, formulas, bands and threshold disclosure |
| docs/OFFICIAL\_MVP.md | The 1C MVP specification: full stage table, UI visibility, Reduce-limit sub-flow, review and submit |
| docs/DOSSIER\_SET.md | The five cases with author-side keys and every Consequence Card variant |
| docs/WAREHOUSE\_DOSSIERS.md | The 105 records and the verification pass on them |
| docs/CORE\_USER\_FLOW.md, docs/INTERFACE\_AND\_DESIGN.md | The nine-step flow, the screen set and the Summary Card layout |
| docs/FEATURE\_MAP.md, docs/INPUT\_LABELS\_AND\_VALIDATION.md | Every feature with an owner; every runtime input with its validation and error message |
| docs/TEST\_TABLE.md, docs/BUG\_LOG.md | Expected against actual for every test case; every failure with severity, owner and verifier |
| docs/ASSUMPTIONS.md, docs/LIMITATIONS.md | Each assumption with its reason and risk; the honest list of what this MVP does not do |
| docs/CONTRIBUTION\_MAP.md, docs/REVISION\_LOG.md, docs/EVIDENCE\_INDEX.md | Person to file to use; feedback to decision to revision to reason; one-page index of everything |
| demo/ | Screenshots and a short recording of the full five-dossier flow, usable if the live link fails |

# **9\. Testing evidence**

Twenty-four cases across six types. Every expected value was taken from the approved rulebook and the per-case answer keys before the product was run, not written down after watching what happened. Actual results, status, who fixed and who verified are recorded in docs/TEST\_TABLE.md.

| Type | Coverage |
| :---- | :---- |
| Normal | All five dossiers end to end with the correct record pinned: income, obligations, DTI and classification against the answer key |
| Boundary | DTI at exactly 70.00% and exactly 80.00%; the age-to-70 tenor cap biting at 48 months; both edges of the ±5% Reduce tolerance |
| Invalid | Blank, zero and negative installment entries; an entry above the original installment; a warehouse search with no name; a record with zero income (division guard); submission with a dossier still undecided |
| Financial consistency | Engine PMT against the rulebook formula for all five cases; engine DTI against all five answer keys; the present-value round trip on both Reduce cases; room used after a fully correct round |
| Warehouse | Exact-match search with strict diacritics returning one record; a lookalike pin moving the DTI and naming the wrong record on the Card; the warehouse read-only after submission |
| Deployment | The published link opened on a phone after the final commit, full flow completed, data files loaded |

*The test that proves the mechanic works is the lookalike pin. If pinning the wrong record does not move the DTI and does not show on the Card, the warehouse is decoration.*

# **10\. Revision record**

What changed after each checkpoint, and why. One row per checkpoint; the full version is in docs/REVISION\_LOG.md.

| Checkpoint | Feedback or problem | Revision made | Reason |
| :---- | :---- | :---- | :---- |
| CP1 | The team was building feature-first before confirming the problem was real and whose it was; target user and build scope were both too broad | Reframed Week 1 around validating the problem. Narrowed the user to year 3–4 FTU banking students with no appraisal experience. Cut the financial-statement engine so players interpret pre-computed metrics | Problem-first framing is what the course rewards, and a narrower user and scope make a seven-week build feasible |
| CP3 → CP4 | Two contradictory installment conventions in our own files: amount ÷ tenor in the assumptions, an amortised figure in the sample | Made the installment a given, disclosed field at a stated reducing-balance rate, consistent with how collateral valuation was already treated, and deleted the straight-line version everywhere | One specification cannot carry two conventions; the amortised figure is the one lenders actually use |
| CP4 | The result screen used the words "best" and "recommended" — wording that claims Recommendation | Removed that wording and wrote the claim boundary register into the Solution Structure and the Logic Chain | The MVP has no criteria, evidence or accountability to support a recommendation |
| CP5 → CP6 | Five decisions still listed in one file while every other file described three; the README still described Capacity as NDI plus affordability band plus DTI and Burden gates, which no longer existed | Both logged as named bugs with critical severity and fixed; the decision set is three everywhere and the logic chain is DTI-only | A reader who opens two files and reads two different answers marks the logic as unexplained |
| CP6 → CP7 | Income verification was added after the logic was already frozen: a 105-record warehouse, with stated income as a decoy in four of five cases | Rewrote the logic chain as the adjusted version: verified income replaced stated income as the DTI denominator, identity error was added as a failure mode, grading was fixed to the main record, and the threshold table was split into Sourced and Assumption | Believing a self-reported figure is the mistake the product exists to teach; the change is recorded in a before-and-after table rather than overwritten silently |
| CP6 → CP7 | Per-dossier Cards made provisional decisions farmable: open a case, read the verdict, go back and change it | Removed the per-dossier Cards. All feedback moved to one Summary Consequence Card after submission, with the anti-exploit rule written into the state model. Room figure settled at 2,050,000,000 VND across every file | Nothing visible before submission may be derived from the answer key |

# **12\. Open items before submission**

*Listed rather than hidden. Each has a named owner.*

•     The GitHub Pages link in the title block 

•     Confirm every docs/ path in section 8 against the final repository filenames, and replace each with a live link

•     The Actual, Status, Fixed by and Verified by columns in docs/TEST\_TABLE.md, filled by running the product rather than asserting it.

•     The integration audit in docs/CORE\_FLOW.md still has unfilled Actual cells. An unclear connection counts as untested, not as passing 

•     One footprint sheet per member — each member.

 

*Scope is frozen. After the day the core flow ran end to end, only critical bugs, clarity fixes, deployment problems and documentation gaps are touched.*

