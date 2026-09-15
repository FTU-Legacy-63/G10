**The Credit Desk**

**The Credit Desk is a browser-based credit-appraisal simulation in which the player acts as a bank credit officer, reads applicant dossiers under a limited credit room, and makes defensible lend / no-lend decisions with consequence-based feedback.**

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

# **7\. Visible Contribution \- Week 1**

Week 1 output is one owned file per member, used as objective contribution evidence.

| Member | Week 1 contribution |
| :---- | :---- |
| Doan Diep Anh | Validated the problem and framed output vs desired outcome; competitor and novelty scan; 7-week journey map |
| Nguyen Ngoc Minh Ha | Audited candidate data sources and drafted the dossier field schema (no cases authored yet; case authoring in W3) |
| Lai Ngoc Linh | First-pass appraisal rules (income-multiple logic for individuals); draft only, locked in W4 |
| Nguyen Duc Minh | Initialised the repository, chose the stack, wrote the feasibility note and deployment target  |
| Dang Thi Van Trang | Set the working name 'The Credit Desk', a rough user-flow sketch, and the visual direction |

# **8\. Open Questions**

Issues the team flagged in Week 1 to verify and resolve later:

1\.   Is the scoring rule too formulaic to preserve real judgment? A limit that is roughly a multiple of net disposable income risks becoming plug-and-chug. How do we keep players weighing trade-offs rather than computing one right/wrong number?

2\.   Does the room-allocation meta-loop create genuine decision pressure? How many applications per round are both feasible in 7 weeks and enough to force real credit-rationing trade-offs?

3\.   Should the product cover individual (KHCN) and corporate (KHDN) clients, or narrow to one track?

4\.   How many decision points per case give enough depth without becoming too long?

5\.   What should the scoring system reward: decision accuracy, portfolio risk, room efficiency, or a mix?

# **9\. Checkpoint 1 Feedback and Revision**

| Item | Content |
| :---- | :---- |
| Feedback / diagnosis | The team was building the game feature-first before confirming the problem was real and whose it was. The target user and the build scope were too broad. |
| Decision | Change / Refine. Keep the credit-appraisal concept but reframe Week 1 around validating the problem, and de-scope the build. |
| Revision made | Shifted from solution-first to problem-first. Narrowed the target user to Year 3-4 FTU banking students with no appraisal experience. De-scoped from a full financial-statement build to a KHCN track where players interpret pre-computed metrics instead of computing them. |
| Reason | Problem-first framing is what the course rewards, and visible iteration is scored. A narrower user and scope make the 7-week build feasible and the claims defensible. |
| Remaining questions | Confirm the final dossier set and continue verifying the target user's problem (see Open Questions). |

# **10\. Weekly Development (Weeks 2-6)**

From Week 2 onward the team turned the chosen direction into a structured, testable product.

## **Deliverables**

●      **Project Proposal:** \[CONFIRM\] /docs/Prj\_Proposal.md

●      **Solution Structure:** \[CONFIRM\] /docs/SOLUTION\_STRUCTURE.md

●      **Credit Appraisal Rulebook (logic):** \[CONFIRM\] /docs/Logic\_Specification.md

●      **1C MVP specification (Week 4):** \[CONFIRM\] /docs/MVP\_Week\_4.md

●      **Feature Map:** \[CONFIRM\] /docs/FEATURE\_MAP.md

●      **Core User Flow:** \[CONFIRM\] /docs/CORE\_USER\_FLOW.md

●      **Interface and Design:** \[CONFIRM\] /docs/INTERFACE\_AND\_DESIGN.md

●      **Input Labels and Validation Plan:** \[CONFIRM\] /docs/INPUT\_LABELS\_AND\_VALIDATION\_PLAN.md

## **Core Product Direction**

The current MVP models one C of the Five Cs, Capacity, end to end. Capacity is the only driver present in every KHCN dossier and already fully quantified in the Rulebook, so it is enough to prove one complete, defensible input-to-output loop.

**Read dossier  \-\>  Capacity (NDI, affordability band, DTI/Burden gates)  \-\>  Decide  \-\>  Decision-Consequence Card  \-\>  Allocate room**

# **11\. Project Status**

**Current stage:** Week 5 \- Build, Integration and Testing Clinic.

**Selected concept:** The Credit Desk (Credit Appraisal Simulation, KHCN track).

**Product pattern:** Scenario-decision simulation loop with a room-allocation meta-loop.

**Current MVP:** 1C MVP (Capacity only), with three decisions: Approve, Reduce limit, Reject.

**Claim boundary:** The output performs Classification and Comparison, not Recommendation.

