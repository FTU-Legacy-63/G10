# **Doan Diep Anh \- INDIVIDUAL CONTRIBUTION EVIDENCE**

**Course:** Technology Applications in Banking and Finance (NHA408E) \- FTU 2026

**Project:** The Credit Desk 

**Member:** Doan Diep Anh

**Student ID:** 2412380005

**Main Role:** Product Lead/ Coordinator

1. ## **Executive Summary of Role and Responsibilities**

I was Product Lead and Coordinator of Group 10\. The role had two halves: I owned the documents that define what the product is and what it may claim, and I ran the weekly cycle that kept four other members' outputs pointing at the same product.

**What I owned as an author.** The problem statement and target user (W1), the Project Proposal and Solution Structure (W2), the Source Use Map (W3), the Project Logic Chain and its Adjusted rewrite (W4, revised W6), the Core Flow and the Test Table (W6), and the README that is the grader's entry point to the repository.

**What I owned as a coordinator.** Before each week I wrote a guideline file setting that week's scope, deliverable list and owner per file \- Week 3, 4, 5, 6 and 7\. Week 2 has no guideline because both Week 2 outputs were mine. After each week I read every member's file against the others and recorded the contradictions as named bugs with a named owner.

**What the role was accountable for.** That the five documents a grader opens in sequence say the same thing. That every threshold in the product is labelled Sourced or Assumption. And that the product's claim never drifts past Classification and Comparison into Recommendation \- the one claim this MVP has no evidence to support.

2. ## **Personal Mark on the Product**

Six decisions are mine. Each one is visible in the shipped product

- **The product teaches judgment, not arithmetic.** In Week 1 the team was designing a calculator the player would operate. I reframed the user task as "for this applicant, should I lend, how much, and on what terms" and made the installment a pre-computed figure the player reads rather than computes. Everything downstream follows from that: the output had to be a classification with reasoning, which meant the logic needed one disclosed gate rather than a hidden composite score.  
- **No composite suitability score.** I refused a weighted score in the Project Logic Chain and wrote the refusal down. A weighted score looks objective while hiding its weights, and it lets the player read a number instead of building the reasoning. One gate \- DTI \- with openly disclosed 70% and 80% lines is the weaker claim, and it is the one our evidence supports.  
- **The claim boundary: Classification and Comparison, never Recommendation.** I wrote this into the Proposal, the Solution Structure and the Logic Chain, and I removed the words "best", "recommended" and "you should lend" from the result screen. The product grades a decision against a designed band. It does not advise anyone about a real loan.  
- **The room meta-loop survived every de-scoping round.** A fixed credit room of 2,050,000,000 VND shared across five applicants is what forces a trade-off \- a decent applicant can be refused because the room is better spent elsewhere. When scope had to be cut, I cut the other four Cs and kept the room, because the room is the mechanism that makes the task a judgment.  
- **Capacity-only (1C) as the MVP, stated as a deliberate narrowing.** Four of the Five Cs are display-only. That is written in the Core Flow scope freeze with the reason and a revisit condition, not hidden as an omission.  
- **Feedback on the Summary Card, after submitting.** When decisions became revisable, per-dossier feedback would have made the game farmable: open a case, read the verdict, go back and change it. I removed the per-dossier cards and moved all feedback to one Summary Consequence Card after the round. The anti-exploit rule in the state model \- nothing visible before submit is derived from the answer key \- is the reason provisional decisions do not break the product.


3. ## **What I Actually Did, Week by Week**

Each week had two halves for me: one owned output, and one coordination act that unblocked the other four members.

| Week | What I authored | What I did as coordinator |
| :---- | :---- | :---- |
| W1 \- Problem | Validated the problem and separated desired user outcome from product output; competitor and novelty scan (Finsimco is paid, English-only, corporate-focused; US tools are credit-score apps); seven-week journey map | Took the Checkpoint 1 diagnosis \- building feature-first before confirming the problem \- and turned it into a de-scope: narrowed the user to year 3-4 FTU banking students with no appraisal experience, and cut the financial-statement engine so players interpret pre-computed metrics |
| W2 \- Product | **Both** Week 2 outputs: PROJECT PROPOSAL (problem direction, target user and task, desired outcome, product statement, main output, product pattern, feasibility) and SOLUTION STRUCTURE (solution chain, required information, core process type Simulate \+ Classify \+ Explain, MVP flow, target / fallback / out-of-scope, responsibility-by-output table) | Wrote the responsibility-by-output table that assigned every member a *visible output* rather than a role title \- the structure every later week's ownership table inherits. No guideline file this week because I wrote both outputs myself |
| W3 \- Input | SOURCE USE MAP: each source mapped to the single claim it supports, with its limitation stated \- job postings support the problem claim only, the Five Cs support the red-flag taxonomy, consumer-lending guardrails are labelled ASSUMPTION because no VN regulatory source was cited | Wrote the Week 3 guideline: the four deliverables, the input dictionary field list, the assumption register with a disclosure line per item, and the instruction to mark marital\_status and health\_status CONTEXTUAL or cut them |
| W4 \- Logic | PROJECT LOGIC CHAIN: input/state to reasoning to result to interpretation to limitation; the input to financial-logic to output table with a claim boundary per variable; the classification rules | Wrote the Week 4 guideline, including the installment-convention resolution: our W3 assumption (amount divided by tenor) contradicted our own W3 sample (amortised 10.7m). I made the payment a given disclosed field, consistent with how collateral valuation was already treated, and deleted the contradiction |
| W5 \- Flow | Reviewed and approved Trang's feature map, core user flow, input labels and interface draft against the Logic Chain before they were committed | Wrote the Week 5 guideline: scope locked to Capacity-only with three decisions, the feature map as an approved contract per feature, the output in Result-Reason-Meaning-Action-Limit shape, and the five revision decisions R1-R4 plus room and weights |
| W6 \- Build | CORE FLOW (the one flow we protect, eleven steps, three paths, seven error cases, fourteen-row integration audit, state model, scope freeze) and TEST TABLE (T01-T08: normal, boundary at exactly 70.00% and 80.00%, invalid, financial consistency against the author key). Rewrote the Logic Chain as **Adjusted PROJECT LOGIC CHAIN** after the Warehouse was added | Wrote the Week 6 guideline and ran the consistency audit that found the ten live contradictions. Took two as my own bugs (B01 five-decision remnant in the Solution Structure, B02 stale README logic) and assigned the rest by owner. Took the freeze decision and wrote down what was postponed and why |
| W7 \- Final QA | Owner of the final wrapper set: README rewrite, CONTRIBUTION MAP, REVISION LOG, EVIDENCE INDEX, and the Proposal and Solution Structure updates to match the shipped product | Wrote the Week 7 guideline: the readiness scorecard against the five gates, the nine remaining consistency gaps with a decision and an owner each, the twenty-four-case test table with expected values pre-filled from the answer keys, the demo script on KHCN-04, and the day-by-day order \- spec settles first, data second, build third, wrappers last |

The ordering rule in the Week 7 plan is the one I would defend hardest: **nobody writes evidence against an unsettled spec.** My own files came last every week, because a document describing what shipped cannot be written before it ships.

## **4\. Files Contributed**

The third column is the test the course applies: a contribution counts when another part of the project uses it.

| Contribution | What I did | Role in the product |
| :---- | :---- | :---- |
| **README.md** | Project overview, problem statement, team ownership table, weekly evidence links, checkpoint feedback and revision record | The grader's and any external reviewer's entry point. Every other evidence file is reached from here |
| **PROJECT PROPOSAL.md** (W2) | Problem direction, target user and user task, desired user outcome, product statement, main output, product pattern, feasibility and open questions | Defines what the product is and who it is for. The main-output definition is what every screen and every Card is built against |
| **SOLUTION STRUCTURE.md** (W2) | Solution chain (User to Input to Process to Output to User Action), initial required information, core process type (Simulate \+ Classify \+ Explain), MVP flow, target / fallback / out-of-scope split, responsibility-by-output table | The core flow and the claim boundary register live here. Linh's rulebook, Ha's dossier schema and Trang's screens all implement this chain |
| **SOURCE USE MAP.md** (W3) | Mapped every external source to the one claim it supports and stated its limitation | How the team tracks which claims are sourced and which are assumed. It is what keeps the 70% / 80% threshold disclosure honest instead of presented as regulation |
| **PROJECT LOGIC CHAIN.md** (W4) | End-to-end mapping of Input/State to Reasoning to Result to Interpretation to Limitation; the Input to Financial Logic to Output table with a claim boundary stated per variable; the proposed classification rules | The single shared specification the engine, the answer keys and the result screen were written against. It is also where the no-composite-score decision is recorded |
| **Adjusted PROJECT LOGIC CHAIN.md** (W4 output, revised in W6) | Rewrote the chain after the Warehouse verification step was added: verified income replaced stated income as the DTI denominator, identity error was added as a failure mode, the grading rule was fixed to the main record, and the threshold disclosure table was separated into Sourced and Assumption. Added six predicted misreadings with the DTI each produces | Proves the logic still matches the built product after the Week 6 rework. The misreading table is what lets the Summary Card explain wrong answers, not only the right one |
| **W6 CORE FLOW.md** | The one protected flow in eleven steps with visible and hidden state per step; the Summary Card contents; happy, alternative and error paths; seven handled error cases; a fourteen-row integration audit with an owner per connection; the state model and anti-exploit rule; the scope freeze with a reason and revisit condition per postponed item | The build specification for Week 6 and the thing the live demo follows. Duc Minh built against it, Van Trang laid out the Card from it, and the integration audit rows became the test targets |
| **W6 TEST TABLE.md** | Eight cases across the four required types: normal Approve / Reject / Reduce, boundary at exactly 70.00% and exactly 80.00%, invalid (income \= 0 division guard, negative obligation), and financial consistency of the engine against the author key on the hardest path \- secured, age-to-70 tenor cap, PV conversion | Expected values come from the approved rulebook, not from running the product. T04 and T05 are what forced the loose "70-80%" band wording to be stated as one convention and proved |
| **Week 3, 4, 5, 6 and 7 guideline files** | Set each week's scope, deliverable list, owner per file and done-when condition before the week started; recorded the resolutions (installment convention, R1-R4, the nine Week 7 consistency gaps) | The coordination record. Each member's weekly task list came from these, and the gap tables are what stopped four members writing against four different specs |
| **Review and sign-off on every member's output** | Read each file against the others each week, recorded contradictions as named bugs with a severity and an owner, and took the scope-freeze decision | This is the work that is not a file of its own. The named-bug register in the Week 6 and Week 7 guidelines is its evidence |

## **5\. File Evidence: Documents Created or Edited**

**Repository root**

* Readme The Credit Desk .md : [Readme The Credit Desk](?tab=t.thimg8rxprb2)  
* Week1.md :[Week 1](?tab=t.0)  
* Project proposal.md :[Project Proposal](?tab=t.l94y4k5dim2w)  
* Solution structure.md :[Solution Structure](?tab=t.r8ax4jkr4u3i)  
* Source use map.md : [Source use map](?tab=t.zbfeqoidhw1k)  
* Project logic chain.md :[Project Logic Chain](?tab=t.hya6c859gjxj)  
* W6 core flow.md :[W6 Core Flow](?tab=t.he2davd9x0jr)  
* W6 test table.md :[W6 Test Table](?tab=t.pbgo8r71k6i2)  
* Week 3 – guidelines: [Week 3 Guidelines](?tab=t.xc9u8cd1e8gw)  
* Week 4 – guidelines: [Week 4 Guidelines](?tab=t.39oqjbux7s65)  
* Week 5 – guidelines [Week 5 Guidelines](?tab=t.f12kioc793f0)  
* Week 6 – guidelines [Week 6 Guidelines](?tab=t.nt9gssj2hy9z)  
* Week 7 – guidelines [Week 7 Guidelines](?tab=t.k13k7pstpvxh)

**7\. What I Personally Learned**  
**A claim is a liability, not a feature.** I started wanting the product to recommend a lending decision, because that sounds more impressive. Writing the claim boundary register forced me to ask what evidence each claim would need \- criteria, sources, accountability \- and we had none of it for Recommendation. Narrowing to Classification and Comparison made the product weaker on paper and defensible in the room.

**A number that looks objective can hide more than it shows.** A composite suitability score would have been easy to build and would have let the player read a result instead of reasoning toward one. One disclosed gate with openly published thresholds teaches more and claims less.

**Specification drift is the real failure mode, not bugs.** Our worst week-six problems were not broken code. There were four documents saying four different things: five decisions in one file and three in another, 1.6 billion in one room figure and 2.05 billion in another, CIC-verified obligations in one formula and self-declared in another. Every one of them came from a file being updated without the files that depend on it.

**Writing the spec is not the same as holding the spec.** I learned to ask, before anyone writes anything: which file is the authority this week, and who settles a disagreement between two files. The Week 7 rule \- nobody writes evidence against an unsettled spec \- is the lesson stated as a procedure.

**De-scoping is a leadership act, not an admission.** Cutting four of the Five Cs, cutting per-dossier Cards, and cutting the corporate track each made the product smaller and the evidence stronger. What the course rewards is a small working thing that can be explained, and I needed most of the seven weeks to believe that.

**Finance vocabulary has to be defined once and enforced.** "Income" meant three different things across our files \- stated, verified and gross \- and each one produced a different DTI. The single-definition rule in the Logic Chain exists because of that.

## **8\. Difficulties Encountered and How I Handled Them**

**The logic contradicted itself and I had signed off on both halves.** Our Week 3 assumption file said installment \= amount divided by tenor; our Week 3 sample used an amortised figure. I had approved both. I resolved it by picking the convention that matched how we already treated collateral valuation \- a given, disclosed field \- and then deleting the losing version everywhere rather than leaving two conventions coexisting. The cost of catching it in Week 4 instead of Week 3 was one rewrite; catching it in Week 6 would have cost the demo.

**Ten contradictions surfaced at once in Week 6\.** Five people had each updated their own file without the files that depend on it. Rather than fix them in the order I found them, I wrote them up as a register with a severity, a named owner and a status, fixed the Critical ones first, and took two of them as my own. The register is also what became the contribution evidence \- a bug with a reporter, an assignee and a verifier is worth more than a bug quietly fixed.

**The Warehouse arrived after the logic was frozen.** A 105-record verification step was added in Week 6, which changed the DTI denominator from stated to verified income and invalidated parts of four finished files. I rewrote my Logic Chain and recorded the change in a visible before/after table rather than overwriting it silently, because the course scores visible iteration and because hiding it would have left the two versions irreconcilable for anyone reading the repo.

**My own deliverables depended on work I did not control.** The README, the evidence index and the contribution map all describe what shipped, so they cannot be written until it ships. I handled this by splitting my Week 7 work into what could start immediately \- the contribution map and revision log, built from the owner lines already in each file \- and what had to wait for the deployment link. Where something still could not be verified, I left it marked as a blocker with a named owner rather than claiming it was done.

## **9\. Advice for the Next Generation**

For whoever takes the Product Lead or Coordinator role on this course next year.

1\.     **Name one authority file per concept in Week 2 and never let a second one exist.** One definition of income, one room figure, one decision set, one installment convention. Write them where everyone looks, and when one changes, change every file that depends on it in the same sitting. Our ten Week 6 contradictions all came from skipping that second half.  
2\.     **Decide what you will not claim before you decide what you will build.** The claim boundary \- Classification and Comparison, never Recommendation \- constrained every screen, every message and every threshold afterwards. Teams that leave this until the end discover in Week 7 that their product promises something their evidence cannot support.  
3\.     **Keep a running consistency table from Week 2\.** One row per contradiction: what the conflict is, which decision wins, which files change, who owns it. Ten minutes a week would have saved us the Week 6 audit.  
4\.     **Write every contribution as a file someone else uses.** "Finance research" is not evidence. "The threshold table the engine and the answer keys both read" is. Set this up in the Week 2 responsibility-by-output table and the individual footprints write themselves in Week 7\.  
5\.     **De-scope earlier than feels comfortable.** Cut the second track, cut the extra Cs, cut the optional screens. A small flow that runs and can be explained beats a large one that half-works, and the slides say so outright. Write down what you cut and why \- the reason is graded, the cut is not a loss.  
6\.     **Label every threshold Sourced or Assumption the day you write it.** Retro-fitting disclosure is painful, and an undisclosed threshold presented as a rule is false authority \- the heaviest thing a finance product can get wrong.  
7\.     **Do not let the build wait on the spec, or the spec wait on the build.** Settle the contested rules first, freeze the data second, build third, write the wrapper documents last. Anything else means writing evidence twice.  
8\.     **Protect the demo case from Week 5\.** Pick the one case that exercises the most logic in a single pass, rehearse it, and say the expected numbers out loud before clicking. That is the single highest-value hour in the final week.  
9\.     **Your own work comes last, and that is correct.** The README, the evidence index and the contribution map describe what shipped. Starting them early means writing them twice. Start only the two that do not depend on anyone \- the contribution map and the revision log \- and keep them current from Week 2\.  
10\.  **Record the failures.** A test that failed and was fixed is stronger evidence than a test that was never run. Do not delete a bug once it is closed; the fix is the contribution.

