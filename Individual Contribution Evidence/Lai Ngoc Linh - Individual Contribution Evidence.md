**Lai Ngoc Linh \- INDIVIDUAL CONTRIBUTION EVIDENCE**

**Course:** Technology Applications in Banking and Finance (NHA408E) \- FTU 2026

**Project:** The Credit Desk 

**Member:** Lai Ngoc Linh

**Student ID:** 2412380025

**Main Role:** Credit Lead

1. **Role in the project**

In The Credit Desk project, a game that simulates retail (individual customer) credit appraisal, I was mainly responsible for the **Rulebook and appraisal logic**, together with the accompanying design documents that make that logic usable in the MVP: the MVP flow, Feature Map, Input Labels and Validation Plan, and Assumptions.

My work focused on turning how banks actually appraise a loan file into clear rules that the team can code and score: which formula, which threshold, in what order things are processed, what the player sees and what the player must calculate, and that every file has exactly one answer. I built the rules on the 5C framework (Capacity, Character, Capital, Collateral, Conditions) and built the MVP on 1C (Capacity – DTI).

I was also the point of contact with the retail credit appraisal specialist: I brought their feedback into the documents, decided what to keep or drop, and prepared the questions that needed their confirmation. Hà is responsible for writing the dossiers (sample files), and Minh handles implementation in the product, so my documents had to be clear enough for both of them to use without asking me again.

2. **Personal mark on the product**

My clearest personal mark is the appraisal rule set. It is the part that lets the game go beyond asking players to guess “approve or not”: it defines why a file should be approved, have its limit reduced, require more collateral, come with conditions, or be rejected.

There are three things I regard as my own mark:

- **Bringing the rulebook close to reality.** I tore down and rebuilt the original multi-layer rules (NDI, risk adjustment factors, burden) into a single indicator, DTI, following the suggestions of a retail credit appraisal specialist at a Vietnamese bank, and then kept cross-checking against real appraisal documents from banks.  
- **Every rule has a source or is named as an assumption.** In the rulebook and the Assumptions document, I separated clearly what has a source from what is only a design choice by the team, together with the risk of that choice.   
- **Designing the rules from the player’s point of view.** I set the rule that every file has one answer, that players find the numbers and calculate DTI themselves from the dossier, and that feedback appears only at the end of the round so that players can review files without the answers being revealed.  
3. **What I actually did**  
- Took the retail credit appraisal specialist’s input and used it as the foundation of the rulebook: use DTI only; real-world DTI is typically around 70% but can exceed 80%; age limits the loan term (for example, a real-estate loan has a maximum of 360 months and runs up to age 70, so a 60-year-old customer can only borrow for 120 months); risk signals lower the DTI level in two to three thresholds; and conclusions are only approve, reject and reduce limit.  
  Rewrote the whole Rulebook accordingly: kept only the definitions of income and existing debt obligations; removed NDI, base and adjusted repayment capacity, the risk factors (job stability, age and term, dependents) and burden; the remaining process is to collect income and obligations and then calculate DTI.  
- Standardized the formulas: term adjusted by age, a product parameter table (unsecured: 60 months, age 70, 18% per year; secured: 360 months, age 70, 11% per year), installments using the annuity formula instead of a straight division, and present value (PV) to convert the maximum installment into the maximum loan amount. Recalculated the sample files with these formulas.  
- Following the instructor’s feedback to drop the 30–40% discount on unverified income, I revised all documents (Rulebook, MVP, Assumptions, Input Labels, Feature Map), removed the concept of Adjusted Income and changed Adjusted DTI to DTI.  
- Reworked the player mechanics in the MVP: the dossier gives all the figures, including the estimated installment; the player identifies Income, Existing obligations and Installment in the file and then calculates DTI; for Reduce limit, the player calculates the Max installment, the system converts it into a loan amount using PV, and grading uses a ±5% tolerance. I also wrote the “How Assessment Works” tutorial, which teaches how to calculate the installment and how age affects the term.  
- Updated Input Labels, Assumptions and Feature Map for the Income Verification Warehouse mechanism that the team added to the MVP (stated income differs from verified income), including the requirement that about 30–40% of files have stated figures that differ from the verified figures so that players do not skip the checking step.  
- Designed the ability to review files and to show only one Summary Consequence Card at the end of the round: decisions are provisional until the round is submitted, the overview screen shows only what the player has entered, and no right or wrong is shown during review. I revised the MVP 1C, the full product and the Feature Map to match.  
- Built the 4C Rulebook based on how retail credit is actually appraised in Vietnam, covering Character, Capital, Collateral and Conditions.  
- Checked the realism of my own draft. I asked whether a tighter 60%/70% DTI set is reasonable for Vietnamese banks, and whether a failing CIC record should always be rejected immediately. I then looked for real-world documents to rebuild the 4C.  
- Checked the source of each statement: for the statement about personal capital in the rulebook, I rechecked the document and separated the part that is in the source (asset sales and relatives’ contributions are counted as other income) from the part that is the team’s own judgment.  
- Found and resolved a point of confusion: a collateral shortfall could be read as either Reduce limit or Require more collateral. I decided to keep only Require more collateral and to keep Reduce limit for DTI, then revised the Rulebook and MVP and added a line to Assumptions.  
- Wrote the full product: a 14-step flow, the data layer, a table of what the player sees and does not see, the tutorial, the decision input fields, review and round submission, and three examples with recalculated figures.  
4. **Files, features, data, logic, interface, documents or demo parts contributed** 

| Contribution | What I did | Role in the product |
| :---- | :---- | :---- |
| Capacity Rulebook (DTI) | \- Rewrote the multi-layer model into a single DTI, following the retail credit appraisal specialist. \- Definitions of income and debt obligations; term adjusted by age; product parameter table; installment formula (PMT) and PV conversion; the 70% and 80% thresholds. \- Claim Boundary and Threshold Disclosure. | The single source of rules for calculating DTI and deciding Approve, Reduce limit or Reject for every file. |
| Removing Adjusted Income | \- Reviewed and removed the concept of Adjusted Income from the documents. \- Changed Adjusted DTI to DTI and revised formulas, tables and examples. | Income in the game is the actual figure, consistent with the instructor’s feedback; avoids contradictions between files. |
| Player mechanics in MVP 1C | \- The player finds the figures and calculates DTI. \- Reduce limit: the player calculates the Max installment, the system converts it into a loan amount using PV, ±5% tolerance. \- Tutorial: how to calculate the installment, age and term. | Players have to actually apply the rules rather than just read the result. |
| File review and Summary Consequence Card | \- Decisions are provisional; locked only when the round is submitted. \- Overview screen; review shows only the data the player entered. \- One Summary Card at the end of the round instead of a Card for each file. | Lets players reconsider without the answers being revealed; decisions carry meaning at the end of the round. |
| Rulebook 4C | Rebuilt on real-world practice: Character (CIC, number of credit inquiries, documents), loan plan check, three-condition collateral check, LTV, Reserve cover, Conditions. \- Each rule is marked Sourced or Assumption. | Expands the game from one C to all 5Cs and adds two decisions, Require more collateral and Add conditions. |
| Full product | \- Flow of steps, new data layer, display table, tutorial, input fields for each decision. | Bridge from the rulebook to the product: tells Minh which screens and flows to build. |
| Feature Map | \- Rewrote the core, the supporting features, and the removed or postponed features with reasons and when to revisit them. | Defines the scope of the product and what is not yet done, avoiding over-expansion. |
| Input Labels and Validation Plan | \- List of fields the player enters, validation rules and error messages. \- Checklist for dossier writers; requirement that stated income differs from verified income in some files; one answer per file; all 8 decisions covered in each round. | Ensures the data entering the game is correct and that the player’s input fields do not reveal the answer. |
| Assumptions | \- Rewrote for each version of the logic: each item has a Risk, Disclosure or Reason. \- Added items on real-world sources, warning signals leading to Add conditions, and a collateral shortfall having only one answer. | Makes assumptions and risks public so the team and evaluators understand the limits of the product. |
| Data checks | \- Recalculated PMT, PV, DTI, LTV and the maximum loan amount in every example, including the ±5% grading ranges. | Avoids wrong answers in the sample dossiers. |

5. **Evidence: documents created or edited**  
- Adjusted credit appraisal rulebook: [https\://me-l.co/7e32am6s](https://me-l.co/7e32am6s)   
- Extended credit rulebook: [https\://me-l.co/fh7kcepc](https://me-l.co/fh7kcepc)   
- Official MVP (1C \- Capacity):  [https\://me-l.co/heqrj7kf](https://me-l.co/heqrj7kf)   
- Extended MVP 4C: [https\://me-l.co/jyxc171d](https://me-l.co/jyxc171d)   
- Adjusted Feature Map: [https\://me-l.co/zmwti0lh](https://me-l.co/zmwti0lh)   
- Extended Feature Map: [https\://me-l.co/7eovd9br](https://me-l.co/7eovd9br)   
- Adjusted Input Labels and Validation: [https\://me-l.co/bjgmudc8](https://me-l.co/bjgmudc8)   
- Extended Input Labels and Validation: [https\://me-l.co/np72p3c1](https://me-l.co/np72p3c1)   
- Adjusted Assumptions: [https\://me-l.co/f94t8vt9](https://me-l.co/f94t8vt9)   
- Extended Assumptions: [https\://me-l.co/9zlblhpv](https://me-l.co/9zlblhpv)   
6. **How that contribution connects to the final product**

The Rulebook is the rule layer between the file content, the player’s choices and the end-of-round result. When a player reads a dossier, the system needs to know which decision is correct, why it is correct, and what the player must enter to show they understand. What I did answers those three questions.

- **Rulebook** decides the answer of the file: calculating the installment, calculating DTI, placing it in a threshold, and then applying the priority order among Reject, Reduce limit, Require more collateral, Add conditions and Approve.  
- **MVP and tutorial** decide what the player sees and what they must calculate, so that players genuinely apply the rules.  
- **Input Labels** ensure that dossiers written by the team are correctly formatted and that the player’s input fields are valid but do not reveal the answer.  
- **Feature Map and Assumptions** state what the product does, what it does not do, and which assumptions it relies on.

Without this rule layer, the game would just be a chain of choices with no basis for scoring. Thanks to the rulebook, each file has an answer that can be explained with figures and rules, and the Summary Card can tell the player at which step they went wrong: calculating DTI, recognizing a risk signal, or reading the collateral.

7. **What I personally learned**  
1) **Reality is simpler than the model I built myself, but the process is more complex than the formula**

I learned that real banks use a simple indicator such as DTI, rather than the many layers of factors I originally built. The hard part lies in the process: for example, a CIC record with a group 2 history is not rejected automatically; instead the officer has to record the reason for the approving level to decide. The game needs a fixed answer, so I had to turn that process into a clear rule.

2) **Every number needs a source, or must be named as an assumption**

When I set thresholds myself (for example the tighter 60% DTI set), I found it hard to explain why it should be that number. Separating Sourced from Assumption, together with Risk, makes the documents more honest and shows exactly where the specialist needs to be asked. 

3) **One small change ripples through many documents**

When I removed Adjusted Income or changed how decisions are locked, every file (Rulebook, MVP, Feature Map, Input Labels, Assumptions) had to be revised accordingly.

4) **A file should have only one answer**

A collateral shortfall can be read as either Reduce limit or Require more collateral, which shows that two choices that are both reasonable in practice still make the game hard to score. I learned that designing a game sometimes means dropping one option that is correct in real life so that the right answer is unique and easy to explain.

5) **When feedback is given determines what information is revealed**

When I wanted players to be able to review files, I realized that feedback right after each file would let them try an answer and then change it. So I moved the locking of decisions to the moment the round is submitted and gave feedback only at the end.

6) **Ask experts, but ask few questions and the right ones**

I need to ask retail credit appraisal specialists in order to get the most realistic perspective.

8. **Difficulties encountered and how I handled them**  
1) **The difficulty of bringing real banking practice into a simple game**

The specialist’s input (one indicator, lowering the level with risk, 2–3 thresholds) was quite short, while the team’s original model had many layers. I handled this by keeping only two definitions (income, debt obligations), removing the adjustment factors, and letting factors such as age act indirectly through the term (a shorter term makes the installment higher, and DTI higher).

2) **The difficulty of finding a basis for the 5C thresholds**

In practice, banks in Vietnam do not publish their retail credit appraisal procedures. This made building my rulebook difficult and meant I needed to contact retail credit appraisal specialists at banks in Vietnam directly.

3) **The difficulty of letting players review files without revealing the answers**

The original design locked the decision as soon as the player clicked. When adding the review feature, I had to change the whole locking and feedback logic: decisions are provisional, the overview screen shows only the data the player entered, validation only checks that an input is valid and does not say whether it is right or wrong, and there is a single Summary Card at the end. I also stated the trade-offs clearly: players learn nothing from an individual file until the end of the round, and revising an earlier decision changes how room is allocated for the person building the dossiers.

9. **Advice for next generation**  
1) **Ask the credit specialist early, and ask few questions but the right ones**

If you ask early, the team will avoid building and then discarding many layers of logic with no basis, as my team did. Bring a few specific questions that could change the answer of a file.

2) **Keep one source rulebook and cross-check after every edit**

The rulebook should be the only place where the rules are defined. The MVP, Feature Map, Input Labels and Assumptions files should only quote it. After every change, search for the old concept in all the files.

3) **Name assumptions and sources directly in the documents**

Marking each threshold as Sourced or Assumption helps readers know what can be trusted and what needs checking. It also helps the team avoid forgetting which numbers they set themselves.

4) **One answer per file**

When designing the set of decisions, check whether two decisions could both be reasonable for the same situation. If so, drop one or distinguish them clearly before writing the dossiers.

5) **Check with examples that have numbers**

Every rule should have at least one worked example calculated by hand. My team repeatedly found errors or confusing points only when recalculating a specific file.

6) **Think about when the decision is made**

When you let players decide affects whether they can try out answers. Choose that moment before building the interface.

7) **Keep the scope manageable**

4C can be expanded a great deal (many types of collateral, guarantors, macro conditions that change by round). My team deliberately put those parts on the postponed list in the Feature Map.

**Note on tools:** I used an AI tool to help draft the documents, recalculate the example figures and cross-check between files. The design decisions, the work with the retail credit appraisal specialist, the choice of sources and the finalization of each version were done by me.

   
