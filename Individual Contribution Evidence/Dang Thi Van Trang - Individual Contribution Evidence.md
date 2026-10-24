# **Dang Thi Van Trang \- INDIVIDUAL CONTRIBUTION EVIDENCE**

**Course:** Technology Applications in Banking and Finance (NHA408E) \- FTU 2026

**Project:** The Credit Desk 

**Member:** Dang Thi Van Trang

**Student ID:** 2413380047

**Main Role:** Design Lead

I owned the screens and the flow: what the player sees, in what order, what stays hidden until the end, and what the result screen is allowed to say. My footprint is the Core User Flow, the Interface and Design specification across three periods (Week 5, Adjusted Week 6, V4 Week 7), and the Warehouse noise records that the Warehouse screen searches.

## **1\. Executive Summary of Role and Responsibilities**

I was the Design Lead of Group 10\. The role had two halves: I turned the team's logic into screens a player can use, and I kept those screens from claiming more than the logic supports.

**What I owned as an author.** The working name and visual direction (W1), the first screen and flow sketch (W2), the Decision-Consequence result screen (W4), the Core User Flow and the Interface and Design specification (W5), their Adjusted rewrites after the Warehouse was added (W6), the Warehouse noise records (W6, extended in W7), and the consolidated Interface and Design V4 (W7).

**What I was accountable for.** That the specification Minh built from matches the specification Linh's rulebook and Ha's dossiers describe. That no screen shows anything derived from the answer key before Submit. And that no result text slides from Classification and Comparison into Recommendation.

## **2\. Personal Mark on the Product**

* **The result screen uses Result-Reason-Meaning-Action-Limit, not a verdict.** I built the Decision-Consequence Card on this five-part structure so the player reads why a classification came out, not only what it was. The structure survived every rewrite and now sits on the round-level Summary Consequence Card.  
* **A claim-boundary lock on all result text.** After the Week 4 checkpoint I removed "recommended" and "best" from my screen. The Card never says "best" or "you should lend." It states which side of a designed band the decision falls on.  
* **Nothing derived from the answer key is visible before Submit.** DTI, verified income, CIC-verified totals, net collateral, ratings and correct decisions stay hidden, including in tooltips, accessible names and hidden DOM. Player-entered values are shown unchanged with no correctness styling.  
* **One Summary Consequence Card for the round, not a Card per dossier.** Once decisions became revisable, per-dossier feedback would have let the player open a case, read the verdict and change the answer. I rewrote the flow and the interface so all feedback arrives after Submit.  
* **Work through objects, not panels.** In V4 the player works in four rooms (R01 client room, R02 dossier desk, R03 records room with the Warehouse and CIC terminal, R04 review room) with distinct objects: folder, notebook, terminal, board, rulebook, ledger. The Warehouse is a core evidence task with no extra completion gate.  
* **Warehouse noise records that teach identity checking.** Each main applicant has 20 noise records of five types, including at least two traps with the same key figures but a different identity, so a wrong pin changes the DTI and shows on the Card. Attaching a Warehouse record records which record the player chose as their assessment source. Making a copy creates a carried paper. Attaching does not move paper and copying does not attach.  
* **Restraint in the interface.** Room navigation uses borderless previous/next triangles and object labels that appear on hover or keyboard focus. There is no permanent HUD, task rail, universal toolbar or floating allocation dashboard, so attention stays on the reading surface. Motion is limited to one short dark blink when changing rooms or work surfaces, and reduced-motion users get direct cuts with the same final state. The product has no countdown, timeout or speed score; the player decides when they are ready to submit.

## **3\. What I Actually Did, Week by Week**

| Week | What I authored | What I connected or checked against other members' work |
| ----- | ----- | ----- |
| W1 \- Problem | Set the working name "The Credit Desk" and the first visual direction; first flow sketch | The visual direction became the base that the Week 5 screens were designed from |
| W4 \- Logic checkpoint | Designed the Result-Reason-Meaning-Action-Limit structure for the result screen. Removed "recommended" and "best" wording after the Week 4 checkpoint | Applied the claim boundary (Classification and Comparison, never Recommendation) to the result screen so it matched the Logic Chain |
| W5 \- Flow | CORE USER FLOW: happy, alternative and error paths for one round. INTERFACE AND DESIGN: Dossier Screen, Decision Bar (Approve / Reduce limit / Reject), Decision-Consequence Card, Assessment Guide, Scorecard concept | Checked input labels and screens against the Logic Chain and the Week 5 guideline before they were committed |
| W6 \- Build | ADJUSTED CORE USER FLOW: added the Warehouse step and Check CIC, provisional decisions, Submit and the Summary Card, with seven handled error cases. ADJUSTED INTERFACE: Warehouse screen (search fields, result rows, pin action, locked state), round overview and Submit, Summary Consequence Card, shared credit room of 2,050,000,000 VND. WAREHOUSE of MVP: 105 records (5 main \+ 20 noise per main) | Closed the consistency gaps assigned to me: provisional versus locked decisions, per-dossier Card versus one Summary Card, 1,600,000,000 versus 2,050,000,000 VND, and the Warehouse as a missing flow step (with Minh). Defined the Reduce-limit input rules (numeric, greater than 0, not above the original estimated installment, graded at plus or minus 5%) |
| W7 \- Final QA | INTERFACE AND DESIGN V4: four rooms and screens S01-S20, visibility matrix, allocation validation and error copy, art direction, accessibility, persistence and recovery, 22 acceptance scenarios (UX01-UX22). EXTENDED WAREHOUSE: three more main dossiers (Le Minh Quan, Dinh Quoc Bao, Pham Gia Hung) with 20 noise records each, for 168 records (8 main \+ 160 noise) | Reviewed the build against the specification and reported mismatches (planned test targets: Warehouse search, record pin, Reduce-limit validation, Summary Card). Kept (name, age, province) identities unique across all 168 records. Recorded the current room figure and archived the older ones |

- **Design:**  
* Visual system: flat hand-drawn 2D illustration with bold contours and muted fills; Amatic SC for titles and Mali for body text, evidence, amounts and errors; a role-based palette in which colour marks objects and states and never classifies borrowers or previews correctness.  
* Interaction states: resting, hover, pressed, selected, disabled and keyboard focus; 48-52 px primary targets; reading text about 20 px / 32 px line height on desktop; 100 / 115 / 130 percent text settings.  
* Accessibility and recovery: keyboard operation for rooms, tabs, readers, board and dialogs; reduced-motion behavior; local save and resume of an untimed shift; defined recovery states (failed save, failed Submit, Warehouse or CIC unavailable).  
- **Core User Flow**  
* Closed the consistency gaps assigned to me: provisional versus locked decisions, per-dossier Card versus one Summary Card, fixed credit room figures, and the Warehouse as a missing flow step (with Minh).  
* Defined the structural input rules for decisions: Reduce limit must be numeric, above 0 and not above the original installment; Require more collateral must be above 0 and within the public cap; Add conditions needs at least one covenant. These are never compared with the hidden answer, and post-Submit numeric comparison uses plus or minus 5%.  
* Wrote 22 acceptance scenarios (UX01-UX22) in V4 covering entry, receipt, Warehouse search, Submit, recovery, keyboard use and reduced motion.  
- **Warehouse**  
* Built the noise records the Warehouse search returns: 105 records (5 main \+ 20 noise per main) in W6; extended with three more main dossiers (Le Minh Quan, Dinh Quoc Bao, Pham Gia Hung), each with 20 noise records, for 168 records (8 main \+ 160 noise) in W7.  
* Authoring rules I applied: five noise types, at least two traps per main (same key figures, different identity), noise amounts differing from the main record by 12-38%, no internal contradictions, and agreement with the dossier on age, province and occupation.  
* Reviewed screens and the Card against the claim boundary (Classification and Comparison, never Recommendation).  
* Reviewed the build against the specification and reported mismatches (planned test targets: Warehouse search, record pin, Reduce-limit validation, Summary Card).

**4\. Files, Features, Data, Logic, Interface, Documents or Demo Parts**

| Output | Specific part | Related file |
| :---- | :---- | :---- |
| Interface foundation | Visual language, typography, palette, object continuity, interaction states, responsive and keyboard behavior | Final Interface and Design |
| Entry and onboarding | Title and saved-attempt entry, room overview, assignment and shift instructions, How to play | Final Interface and Design |
| Core work experience | Dossier folder, original document reader, notebook and worksheet, comparison board, decision in the folder | Final Interface and Design |
| Evidence systems | Warehouse on the terminal (search, results, record reading, attach / copy), CIC as a separate source | Final Interface and Design; Adjusted INTERFACE AND DESIGN.md |
| Pressure and shared resource | Credit room and allocation validation, ledger review, planned allocation | Final Interface and Design; Adjusted CORE USER FLOW.md |
| Flow specification | Happy, alternative and error paths | CORE USER FLOW.md; Adjusted CORE USER FLOW.md |
| Warehouse data | Noise records: 105 records (W6), 168 records (W7) | WAREHOUSE of MVP.md; EXTENDED WAREHOUSE.md |
| Integration and acceptance | Visibility matrix, persistence and recovery, acceptance scenarios, source and implementation map | Final Interface and Design |

**5\. Evidence of contribution**

\- Core user flow: [https\://bit.ly/4srAgP2](https://bit.ly/4srAgP2)

\- Interface & Design: [https\://bit.ly/4dUyKPr](https://bit.ly/4dUyKPr)

\- Adjusted Core user flow: [https\://bit.ly/3UBQaK2](https://bit.ly/3UBQaK2)

\- Adjusted Interface & Design: [https\://bit.ly/4z5gCuI](https://bit.ly/4z5gCuI)

\- Warehouse: [https\://bit.ly/3TWgtKO](https://bit.ly/3TWgtKO)

\- Adjusted warehouse: [https\://bit.ly/4BgtxLT](https://bit.ly/4BgtxLT)

\- Final Interface & Design: [https\://bit.ly/4dOIj2m](https://bit.ly/4dOIj2m)

## **6\. How the Contribution Connects to the Final Product**

My contribution connects at two layers: the player's experience, and the integration of the product's parts. The Credit Desk is not only a rulebook, a dataset and an engine. It needs an interface clear enough to operate, restrained enough not to leak the answer, and realistic enough to feel like handling a credit file.

### **(1) Turning logic and data into something playable**

The rulebook, the dossiers and the Warehouse exist as documents and data. The interface turns them into actions: read the folder, search and attach a record, check CIC, calculate, decide, review, submit. The player always knows which source they have opened, what they have entered and when the round is complete.

### **(2) Making the case feel like real evidence**

Each source has its own object and surface. The Warehouse and CIC share one terminal; documents, notes and copies stay separate objects. Identity checking becomes a real task because the noise records include believable traps.

### **(3) Keeping the parts consistent**

The flow, the interface, the Warehouse data and the build depend on each other. When the room figure or the decision flow changed, my files were the first to be checked. Keeping the Core User Flow and the interface specification in agreement with the Core Flow let Minh build from one description.

### **(4) Making the end of the round worth reading**

The Summary Consequence Card gives the whole-round result: decision comparison, reasons, the system's DTI beside the player's, the pinned record and the credit room. It uses Result-Reason-Meaning-Action-Limit so the player sees why a classification came out, without any recommendation.

## **7\. What I Personally Learned**

### **(1) Design directs behavior, not only appearance**

I first saw design as layout, colour and type. In this project I learned that a design decision decides what the player can know and when. A tooltip, an accessible name or a status label can leak the answer as easily as a number.

### **(2) Realistic simulation means choosing what to simulate**

A credit file is complex, and putting everything on screen would overload a student. I learned to select what to reproduce: separate sources, noise in the evidence, a shared credit room, and a held-back assessment. The rest can stay simple.

### **(3) A specification has to be maintained**

My two files drifted most when the logic changed. I learned to ask, before editing any screen, which file is the authority and which other files have to change in the same sitting.

## **8\. Difficulties Encountered and How I Handled Them**

### **(1) Keeping the answer key off the screen**

Raw documents contain figures the player needs, but system totals must stay hidden. I separated authored evidence from derived values: documentary amounts stay visible, while eligible income, DTI, CIC totals and correct decisions appear only after Submit. Player-entered values are shown unchanged with no correctness styling.

### **(2) Revisable decisions versus feedback**

Per-dossier feedback and revisable decisions cannot coexist. I replaced the per-dossier Card with one Summary Consequence Card after Submit and wrote the flow so nothing visible before Submit is derived from the answer key.

### **(3) The Warehouse arrived after the screens were frozen**

It added a screen and changed which income the player reads. I added the Warehouse screen (search, results, record reading, attach, locked state) and rewrote the flow with Minh.

### **(4) Showing records without revealing which one is real**

Result rows show only record ID, public profile and headline. Main, Noise, Trap, differences and similarity scores are never shown, and documents open in a separate reading view. A "no results" state suggests widening the search and never implies zero income or a rejection.

### **(5) Making noise records fair**

Each record had to differ from the main record by 12-38%, contradict nothing, and still match the dossier on age, province and occupation. I checked each record against a list per main applicant. When I extended the pool I kept (name, age, province) identities unique across all 168 records.

## **9\. Advice for the Next Generation**

### **(1) Start from what the player needs to do, not from what the team wants to show**

Each screen should answer: what is the player doing here, what do they need to see, and what must stay hidden?

### **(2) Write what is hidden as carefully as what is shown**

List every place the answer could leak (labels, tooltips, notifications, hidden content, sounds) and check it before each release.

### **(3) Treat data as part of the design**

The Warehouse is only a test of judgment if the noise records are believable and the traps are fair. Design the dataset with the screen.

### **(4) Keep one authority for each screen and update dependents the same day**

Our design problems came from stale files, not from layout choices.

### **(5) Keep a backup demo**

Record or screenshot the full flow before the live link is the only thing you have.