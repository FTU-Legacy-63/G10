### **SOLUTION STRUCTURE**

## **1\. Solution Chain (User -> Input -> Process -> Output -> User Action)**

Built backwards from the output

1\. Solution Chain (User -> Input -> Process -> Output -> User Action)

User: Student acting as credit officer

Input: Dossier + remaining credit room + hidden red flags

Process: Interpret via 5 Cs -> classify decision vs defensible band -> simulate consequence -> explain

Output: Decision-Consequence Card: consequence + classification + explanation

User Action: Allocate remaining room to the next applicant, adjust reasoning

## **2\. Initial Required Information**

## **Per applicant (KHCN dossier)**

- Age, occupation and job type (stability), marital status, dependents, health.
- Income (WARNING: define precisely in W3 - see specification drift below), living expenses, existing obligations.
- Credit history (CIC), collateral (TSDB), requested amount and term.

**Pre-computed metrics the player interprets (player does not compute them)**

- DTI (debt-to-income), LTV (loan-to-value)).

**Per case (author-side, hidden from player)**

- Embedded red flags, and the defensible answer range for the decision.

**Per round**

- Total credit room (room tin dung), number of applicants.

## **3\. Core Process Type**

**Simulate + Classify + Explain**

- Simulate: the consequence of the player's decision on this dossier.
- Classify: is the decision inside the defensible band? Compare the player's choice against that band and across applicants under the room.
- Explain: why the outcome occurred, tied to red flags and the 5 Cs.

## **4\. MVP Flow (one complete small flow)**

1. Player opens a round: fixed credit room + a queue of KHCN dossiers.
2. Opens one dossier: sees pre-computed metrics + qualitative profile.
3. Analyzes via the 5 Cs, identifies red flags.
4. Makes a decision: **Approve / Reject / Reduce limit / Require more collateral (TSDB) / Add conditions**, optionally proposing a limit within a range.
5. Game returns the **Decision-Consequence Card**: consequence + classification vs defensible band + explanation.
6. State updates: room consumed, portfolio risk updated. The next dossier depends on the room left.
7. End of round: portfolio scorecard (decision accuracy, portfolio risk, room efficiency).

**5\. Target / Fallback / Out of Scope**

**Target scope (planned for W6-7)**

- KHCN track, 5 connected cases sharing one room and portfolio state.
- Full core loop: decision -> consequence -> explanation.
- Room-allocation meta-loop with range scoring.
- End-of-round portfolio scorecard.

**Fallback scope (smaller coherent route if risk materializes)**

- KHCN track, 3-4 connected cases.
- Simplified room meta-loop, kept (dropping it would remove the trade-off pressure that makes the product judgment-based).
- Core loop and the explanation panel are never dropped - the explanation is the learning output.

**Out of scope (this project stage)**

- Raw financial-statement computation by the player (metrics stay pre-computed).
- Multiplayer, avatar/shop/coins as anything beyond optional cosmetics, AI-generated feedback (authored explanations are used for defensibility).

## **6\. Initial Route Hypothesis**

1. Spreadsheet / notebook first to prove the range and classification logic fast (owner: Credit Lead).
2. Code-based static web for the interactive loop (owner: Tech Lead).
3. A logic file documents the defensible ranges so finance and code share one specification.

## **7\. Responsibility by Output**

| **Owner** | **Course role (output)** | **Visible Week 2 output**                                                                                            | **Consumer / dependency** |
| --------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Diep Anh  | Product / Output owner   | PROJECT_PROPOSAL & SOLUTION_PROPOSAL: main-output definition, desired-outcome vs output statement, product statement | UI, logic, report         |
| ---       | ---                      | ---                                                                                                                  | ---                       |
| Ha        | Input owner              | Dossier field schema + 2-3 sample case seeds with placeholder red flags                                              | Logic, UI, README         |
| ---       | ---                      | ---                                                                                                                  | ---                       |
| Linh      | Logic owner              | Process table + first-pass range/classification rule sketch (5 Cs -> decision band)                                  | Code, output, testing     |
| ---       | ---                      | ---                                                                                                                  | ---                       |
| Trang     | Interface owner          | Screen / flow sketch using the real Decision-Consequence Card (not placeholder text)                                 | User review, demo         |
| ---       | ---                      | ---                                                                                                                  | ---                       |
| Minh      | Tech / route owner       | Route hypothesis + repo scaffold + technical run-path feasibility note                                               | Whole team, checkpoint    |
| ---       | ---                      | ---                                                                                                                  | ---                       |