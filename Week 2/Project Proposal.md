## **PROJECT PROPOSAL**

## **Problem Direction**
Year 3-4 Finance and Banking students at FTU who are preparing for credit or risk roles have theoretical knowledge of credit appraisal but no hands-on practice making a lend / no-lend call. Real lending mistakes cost real money, so beginners cannot learn by trial and error on the job, and no local practice tool exists (US tools are consumer credit-score apps, the closest simulation, Finsimco, is paid, English-only, and corporate-focused)

**What became clearer after Week 1**

- Target user is narrowed: year 3-4 FTU banking students with zero appraisal experience
- The difficulty is judgment, not arithmetic: there is no single correct answer, the officer must weigh trade-offs under a limited credit room (room tin dung).
- The build is de-scoped: KHCN (individual customer) track as the polished core; players interpret pre-computed metrics rather than compute them.

## **2\. Target User and User Task**

**Target user:** Year 3-4 Finance and Banking (and equivalent) students who have taken or are taking credit/banking coursework and are aiming for credit or risk roles, but have no real appraisal experience.

**User task:** Practice the core credit-officer decision - "For this applicant, should I lend, how much, and on what terms?" - by reading a dossier, spotting red flags, and converting that into a defensible lending decision under a limited credit room.

## **3\. Desired User Outcome**

## The learner becomes confident and competent enough to reason through a credit decision and defend it, closing the theory-to-judgment gap before an internship or job

This is the real-world goal. It is **not** the same as the product output. Conflating the two is a graded risk in this course.

## **4\. Product Statement**

The Credit Desk is a browser-based credit-appraisal simulation for year 3-4 Finance and Banking students. The player acts as a bank credit officer, reads applicant dossiers under a limited credit room, decides whether and how to lend, and receives consequence-based feedback that builds defensible credit judgment.

## **5\. Main Output**

## **Main output: the Decision-Consequence Card.**

After the player decides on a dossier, the game returns one screen containing:

1. **Consequence** - what happens as a result of this decision on this applicant (e.g. repaid on schedule, default under stress, over-exposure of the room).
2. **Classification against a defensible range** - the decision is placed inside a band of acceptable answers, not marked as a single right/wrong number.
3. **Explanation** - why the outcome occurred, mapped to the red flags the player should have caught and the five Cs (Character, Capacity, Capital, Collateral, Conditions).

**Supporting outputs (not the main output):** range score per case; end-of-round portfolio scorecard (decision accuracy, portfolio risk, room efficiency). Any coins / badges / leaderboard are optional cosmetic engagement only and carry no learning claim.

## **6\. Product Pattern**

**Scenario-decision simulation loop**, wrapped in a **room-allocation meta-loop**.

- Core loop (per dossier): read -> analyze via 5 Cs -> decide -> consequence + explanation -> next.
- Meta-loop (per round): a fixed credit room and several applicants force who-to-fund trade-offs, so a decent applicant may be rejected because the room is better spent elsewhere.

This is a scenario-decision loop, **not** a question-answer quiz. The meta-loop is the mechanism that keeps the product judgment-based rather than arithmetic

**7\. Feasibility and Open Questions**

**Feasibility**

- Route is realistic for 7 weeks: pre-computed metrics remove the need to build a financial-statement engine; static web on GitHub Pages matches the K62 format the team already knows.
- Fallback route protects the core output if risk materializes (see SOLUTION_STRUCTURE.md).
