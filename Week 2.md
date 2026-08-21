# **PROJECT STRUCTURE** 

# **Problem Direction** 

Year 3-4 Finance and Banking students at FTU who are preparing for credit or risk roles have theoretical knowledge of credit appraisal but no hands-on practice making a lend / no-lend call. Real lending mistakes cost real money, so beginners cannot learn by trial and error on the job, and no local practice tool exists (US tools are consumer credit-score apps; the closest simulation, Finsimco, is paid, English-only, and corporate-focused). 

# **What became clearer after Week 1** 

- Target user is narrowed: year 3-4 FTU banking students with zero appraisal experience 

- The difficulty is judgment, not arithmetic: there is no single correct answer, the officer must weigh trade-offs under a limited credit room (room tin dung). 

- The build is de-scoped: KHCN (individual customer) track as the polished core; players interpret pre-computed metrics rather than compute them. 

# **2. Target User and User Task** 

**Target user:** Year 3-4 Finance and Banking (and equivalent) students who have taken or are taking credit/banking coursework and are aiming for credit or risk roles, but have no real appraisal experience. 

**User task:** Practice the core credit-officer decision - "For this applicant, should I lend, how much, and on what terms?" - by reading a dossier, spotting red flags, and converting that into a defensible lending decision under a limited credit room. 

# **3. Desired User Outcome** 

The learner becomes confident and competent enough to reason through a credit decision and defend it, closing the theory-to-judgment gap before an internship or job. 

This is the real-world goal. It is **not** the same as the product output. Conflating the two is a graded risk in this course. 

# **4. Product Statement** 

The Credit Desk is a browser-based credit-appraisal simulation for year 3-4 Finance and Banking students. The player acts as a bank credit officer, reads applicant dossiers under a limited credit room, decides whether and how to lend, and receives consequence-based feedback that builds defensible credit judgment. 

# **5. Main Output (the single result that ends the core task)** 

**Main output: the Decision-Consequence Card.** 

After the player decides on a dossier, the game returns one screen containing: 

1. **Consequence** - what happens as a result of this decision on this applicant (e.g. repaid on schedule, default under stress, over-exposure of the room). 

2. **Classification against a defensible range** - the decision is placed inside a band of acceptable answers, not marked as a single right/wrong number. 

3. **Explanation** - why the outcome occurred, mapped to the red flags the player should have caught and the five Cs (Character, Capacity, Capital, Collateral, Conditions). 

**Supporting outputs (not the main output):** range score per case; end-of-round portfolio scorecard (decision accuracy, portfolio risk, room efficiency). Any coins / badges / leaderboard are optional cosmetic engagement only and carry no learning claim. 

# **6. Product Pattern** 

# **Scenario-decision simulation loop** , wrapped in a **room-allocation meta-loop** . 

- Core loop (per dossier): read -> analyze via 5 Cs -> decide -> consequence + explanation -> next. 

- Meta-loop (per round): a fixed credit room and several applicants force who-to-fund trade-offs, so a decent applicant may be rejected because the room is better spent elsewhere. 

This is a scenario-decision loop, **not** a question-answer quiz. The meta-loop is the mechanism that keeps the product judgment-based rather than arithmetic (see Section 7). 

# **7. Feasibility and Open Questions** 

# **Feasibility** 

- Route is realistic for 7 weeks: pre-computed metrics remove the need to build a financial-statement engine; static web on GitHub Pages matches the K62 format the team already knows. 

- Fallback route protects the core output if risk materializes (see SOLUTION_STRUCTURE.md). 

# **Open questions to resolve in Weeks 3-4** 

1. **Is the scoring rule too formulaic?** "Limit approximately a multiple of net disposable income, adjusted for risk" could collapse into plug-and-chug, which is the exact FinQuest correct/incorrect trap. Mitigation to validate in W4: range-based scoring, the room meta-loop forcing opportunity-cost trade-offs, and explanation as the graded learning artifact rather than the score. 

2. **Income definition drift (SmartLoan lesson, slide 15).** "Income" already appears as salary vs net income vs disposable income across our docs. Record the mismatch now; define meaning and source in W3 before any burden logic uses it. 

3. **Red-flag validity.** Flags such as high-risk occupation, near-retirement age, or high dependents-to-income ratio must be validated against real Vietnamese KHCN practice, not assumed, to avoid subjective or biased flags. Needs a credit-professional check or industry material in W3-W4. 

4. **How many applicants per round** force real trade-offs while staying feasible in 7 weeks (affects whether the meta-loop actually simulates credit rationing). 

# **SOLUTION STRUCTURE** 

# **1. Solution Chain (User -> Input -> Process -> Output -> User Action)** 

Built backwards from the output 

1. Solution Chain (User -> Input -> Process -> Output -> User Action) 

User: Student acting as credit officer 

Input: Dossier + remaining credit room + hidden red flags 

Process: Interpret via 5 Cs -> classify decision vs defensible band -> simulate consequence -> explain 

Output: Decision-Consequence Card: consequence + classification + explanation 

User Action: Allocate remaining room to the next applicant, adjust reasoning 

# **2. Initial Required Information** 

# **Per applicant (KHCN dossier)** 

- Age, occupation and job type (stability), marital status, dependents, health. 

- Income (WARNING: define precisely in W3 - see specification drift below), living expenses, existing obligations. 

- Credit history (CIC), collateral (TSDB), requested amount and term. 

# **Pre-computed metrics the player interprets (player does not compute them)** 

- DTI (debt-to-income), LTV (loan-to-value), DSCR (debt service coverage ratio). 

# **Per case (author-side, hidden from player)** 

- Embedded red flags, and the defensible answer range for the decision. 

# **Per round** 

- Total credit room (room tin dung), number of applicants. 

# **3. Core Process Type** 

# **Simulate + Classify + Explain** 

- Simulate: the consequence of the player's decision on this dossier. 

- Classify: is the decision inside the defensible band? Compare the player's choice against that band and across applicants under the room. 

- Explain: why the outcome occurred, tied to red flags and the 5 Cs. 

# **4. MVP Flow (one complete small flow)** 

1. Player opens a round: fixed credit room + a queue of KHCN dossiers. 

2. Opens one dossier: sees pre-computed metrics + qualitative profile. 

3. Analyzes via the 5 Cs, identifies red flags. 

4. Makes a decision: **Approve / Reject / Reduce limit / Require more collateral (TSDB) / Add conditions** , optionally proposing a limit within a range. 

5. Game returns the **Decision-Consequence Card** : consequence + classification vs defensible band + explanation. 

6. State updates: room consumed, portfolio risk updated. The next dossier depends on the room left. 

7. End of round: portfolio scorecard (decision accuracy, portfolio risk, room efficiency). 

# **5. Target / Fallback / Out of Scope** 

# **Target scope (planned for W6-7)** 

- KHCN track, 6 connected cases sharing one room and portfolio state. 

- Full core loop: decision -> consequence -> explanation. 

- Room-allocation meta-loop with range scoring. 

- End-of-round portfolio scorecard. 

# **Fallback scope (smaller coherent route if risk materializes)** 

- KHCN track, 3-4 connected cases. 

- Simplified room meta-loop, kept (dropping it would remove the trade-off pressure that makes the product judgment-based). 

- Core loop and the explanation panel are never dropped - the explanation is the learning output. 

# **Out of scope (this project stage)** 

- KHDN (corporate) track build. Kept as a pitch differentiator and vision only; the corporate/CIBG appraisal process document is not imported into KHCN. 

- Raw financial-statement computation by the player (metrics stay pre-computed). 

- Multiplayer, avatar/shop/coins as anything beyond optional cosmetics, AI-generated feedback (authored explanations are used for defensibility). 

# **6. Initial Route Hypothesis** 

1. Spreadsheet / notebook first to prove the range and classification logic fast (owner: Credit Lead). 

2. Code-based static web for the interactive loop (owner: Tech Lead). 

3. A logic file documents the defensible ranges so finance and code share one specification. 

# **7. Responsibility by Output** 

|**Owner**|**Course role**<br>**(output)**|**Visible Week 2 output**|**Consumer /**<br>**dependency**|
|---|---|---|---|
|Diep|Product /|PROJECT_PROPOSAL &|UI, logic,|
|Anh|Output<br>owner|SOLUTION_PROPOSAL: main-output<br>definition, desired-outcome vs output statement,<br>product statement|report|
|Ha|Input owner|Dossier field schema + 2-3 sample case seeds<br>with placeholder red flags|Logic, UI,<br>README|
|Linh|Logic owner|Process table + first-pass range/classification rule<br>sketch (5 Cs -> decision band)|Code, output,<br>testing|
|Trang|Interface<br>owner|Screen / flow sketch using the real Decision-<br>Consequence Card (not placeholder text)|User review,<br>demo|
|Minh|Tech / route<br>owner|Route hypothesis + repo scaffold + technical run-<br>path feasibility note|Whole team,<br>checkpoint|
|Luong|Integration /<br>checkpoint<br>owner|scope decision (target/fallback/out), dependency<br>map, Week 1 -> Week 2 revision note|Whole team,<br>checkpoint|



