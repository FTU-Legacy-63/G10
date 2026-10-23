**Final Interface & Design**

1. **Scope and Authority**

**1.1 Current baseline**   
The reference experience is the current /integration/ build, including the restored approved illustrations, entry and dialogue fixes, and usability packages A and B. Earlier / and /concept/ routes remain separate development references. Their menus, fonts, camera timings and save namespaces do not define this interface.

| Status | Meaning |
| :---- | :---- |
| Current baseline | Behavior supported by the active implementation and latest implementation notes |
| Design requirement | Required behavior or quality target; its presence here is not release certification Provisional policy |
| Provisional policy | A named engineering treatment used by the playable while a financial or product policy remains unresolved |
| Future work | An identified gap; no claim that it has been implemented |

**1.2 Source precedence**  
Use direct user decisions first, followed by the latest approved corrections in PROJECT\_CONTEXT and IMPLEMENTATION\_NOTES. Interface (19) governs supplied UI updates over V3; V3 supplies compatible screen and restoration detail. The full-product rules, Extended Dossier Set (13), Scenario Flag Matrix (15), and one deduplicated Warehouse pool from (16)/(17) govern evidence and rule content. Integration notes and SOURCE\_ISSUES preserve unresolved conflicts. The immutable originals remain source evidence. This V4 is the consolidated interface specification, not permission to rewrite them. Archived five-case, three-choice, day-cycle and fixed 1.6bn assumptions are excluded. The active fixture has eight applications and five decisions. Matrix difficulty stars are author metadata and never learner scores.

**1.3 Product boundaries**  
There is no duration target, countdown, timeout, automatic submission, automatic day ending, speed score or inactivity penalty. A compatible save can resume the same shift on a later day. Animation durations and authored financial history windows are unrelated to gameplay expiry. 

Warehouse is a core evidence task. The worksheet, notes, board, record attachment, copies and CIC visit do not add completion gates or separate scoring. Structurally valid wrong decisions remain possible. Numerical scorecards, relationship meters, interview challenges, appointments and document-request gameplay are outside the current contract.

2. **Experience and Information principles**

**2.1 Work through recognizable objects**

The room provides orientation; the close-up provides readable work. Selecting the folder opens that folder, not a generic panel superimposed on a room. The terminal, notebook, loose paper, board, rulebook and ledger each retain their own silhouette, support and interior control treatment.

Remove redundant outer chrome while preserving the approved interiors. Room views contain borderless navigation triangles and contextual object labels, with temporary functional notices when needed. Do not add a permanent HUD, task rail, room caption, universal work toolbar or floating allocation dashboard. Framed tabs, fields, buttons, reading panes and the folder's three local actions remain.

### **2.2 Preserve authorship and learner agency**

Application prose, documentary statements and CIC material are read-only. Learners enter their own worksheet values, notes, evidence choice, decision and required input. No number is inserted from the reference key. Selecting, attaching or copying a record indicates a learner action; it does not certify identity, evidence validity or correctness.

All five decisions receive equal emphasis, and none is selected initially. Visual identity, clothing, expression, lighting, sound and object placement must not encode creditworthiness or the correct decision. Neutral process statuses describe actions and structural completeness only.

### **2.3 Separate evidence from assessment**

Before Submit, show authored raw evidence, public rules and the player's own working. Hide system-derived eligible-income and obligation totals, DTI, net collateral, LTV, reserve cover, ratings, correct decisions, answer tolerances and consequence branches. This boundary includes tooltips, accessible names, notifications, hidden DOM content and preloaded report content.

Raw documents can contain figures necessary for calculation. Hiding the reference aggregate does not mean erasing documentary amounts. Player-entered values can be displayed unchanged without correctness styling. A proposed principal calculated from the player's valid installment is permitted and must be labelled as the player's proposal.

### **2.4 Writing and terminology**

English is the current interface language. Preserve Vietnamese names and authored Vietnamese evidence with full diacritics. Do not claim a complete Vietnamese localization. Use short functional labels, clear units and direct instructions. No decorative quotes, opening taglines, slogans, inspirational mottos, rotating filler, lorem ipsum or invented financial copy belongs in the interface or artwork.

| Term | Meaning |
| ----- | ----- |
| Application or dossier | The authored borrower file; not an editable form |
| Stated income | Income declared by the applicant, without system verification |
| Verified eligible income | Supported income accepted by the project rules; the reference aggregate is hidden until the report |
| Existing obligations | Eligible active monthly loan payments and card minimums from CIC |
| Estimated monthly installment | Supplied payment estimate for the requested loan at adjusted tenor |
| Assessment source | The Warehouse record the player explicitly attaches |
| Copy | A player-collected representation of a record, with provenance and location |
| Required inputs complete | One decision and its structurally valid required input; no statement of correctness |
| Planned allocation | A provisional amount derived from the player's current choice; not an issued commitment |
| Submitted | Final persistence succeeded and assessment working is locked |

## **3 Spatial architecture and navigation**

### **3.1 Four rooms and their ownership**

| Room | Function | Physical objects | Screen family |
| ----- | ----- | ----- | ----- |
| R01 Client room | Explicit application receipt and brief service conversation | Current client and receipt folder on the small cabinet | S02 R01, S05, receipt state formerly associated with S04 |
| R02 Dossier desk | Assignment, source reading, worksheet and decisions | Pinned assignment, kraft folder, blue-gray notebook, shallow copy tray | S02 R02, S03, S04 copies, S06, S07, S10, S12 |
| R03 Records room | Income evidence and credit investigation | One beige CRT terminal with Warehouse and CIC services, collected-copy access | S02 R03, S08, S09 |
| R04 Review room | Comparison, public rules, round review and reports | Corkboard, green guide, clay ledger | S02 R04, S11, S13 to S17, S20 |

The room IDs describe ownership, not a mandatory visit order. The current room navigation cycles R01, R02, R03 and R04 using previous and next triangles. Left and Right keys perform the same operation only in a room view and outside text inputs. Do not describe this as free walking, continuous 3D rotation or four independently explorable directions inside every room.

S01 is a separate title foyer. It is not a fifth work room. S14, S18 and S19 are overlays; S16 is a section of the same final report. A screen ID does not require a new room or an independently generated background.

### **3.2 Opening and returning**

| Action | Result | Context retained |
| ----- | ----- | ----- |
| Open a room object | Focus its owning work surface | Applicant, source, record and relevant reader state |
| Back triangle | Return through the current session's opening path | Originating applicant, tab, record, copy, reading context and focus where available |
| Put down triangle | Return to the owning room | Draft working; focus returns to a meaningful object |
| Open an original from a copy or board | Open its actual source at the owning station | The board or copy remains available through contextual Back |
| Esc while working | Open the general menu | Underlying task is inactive while the dialog is open |
| Esc in a dialog | Close the top dialog or return to its parent | Restore the opener's focus |
| Continue from title | Enter the R02 overview | Existing saved working remains; do not rewrite saved navigation merely to enter |

Session Back history is transient and is not restored after reload. Durable reader offsets and saved working are separate. Never promise that Continue reopens the exact screen: the latest approved entry deliberately lands at R02.

### **3.3 First application guidance**

On New Game and Continue of an unsubmitted attempt, a session-only arrow points to the pinned assignment until opened. It survives leaving R02 before reading it. Opening the assignment clears the cue; submitted entry shows no new-task cue.

The first application provides restrained static cues for receipt, folder, terminal and rulebook, plus one suggested next step in the folder. These use actual progress, not the hidden answer. Later applications and finalized files do not repeat first-case instructions. There is no separate practice case and no new investigation gate. Scroll cues appear only when unread content remains below the current viewport; they do not certify that a source was understood.

## **4 Complete player journey**

1. Launch at the title foyer. Choose New Game or Continue, or open Settings.  
2. Enter R02. Open the assignment if needed; read the role, eight-application scope, evidence process and untimed Submit boundary.  
3. Go to R01 and explicitly receive the available folder. The first receipt begins application 01; later receipts advance the frontier in authored order.  
4. Return to R02 and open the folder. Read the complete application and relevant source tabs.  
5. Use the R03 terminal to search Warehouse documents and explicitly open CIC. Attach a record, make a copy, compare sources or take notes as desired.  
6. Use the optional notebook and public green rulebook. These preserve the learner's own working without filling answers.  
7. Record one decision in the folder and complete that decision's required input. Save and meet the next client returns to R01 without receiving the next application automatically.  
8. Explicitly receive the next available application. Reached dossiers remain accessible through the ledger; unopened loan dossiers remain hidden.  
9. After application 08, Save and review opens the R04 ledger. Revisit any reached file and revise until ready.  
10. Choose Submit round, read the confirmation, then choose Confirm Submit. Only successful persistence locks the shift and reveals the report.  
11. Read the whole-round Summary and individual assessments in the same ledger. Continue later re-enters R02 read-only; the R04 ledger reopens the report.

Saving a decision does not increase the number received. Selecting an older application for review does not change which application can be received next. No step automatically submits the round, and no optional evidence activity changes the final readiness rule.

## **5 Screen by screen specification**

### **S01 Title and saved attempt entry**

**Purpose and composition.** Use the selected illustrated foyer and live game title. Continue and New Game share a clear left alignment; the hover or focus pointer sits outside that text axis. Settings is a small drawn gear at the lower right with a sufficiently large interactive area. Do not add a Guide line, slogan or competing menu panel.

**Actions and states.** Continue is available for a usable saved attempt. New Game creates and persists a new attempt before entering work. If an attempt already exists, show the replacement confirmation with Export progress, Cancel and Replace with new shift. Cancel preserves the attempt; a failed replacement leaves the prior attempt available. Corrupt or incompatible data uses recovery rather than silent overwrite. Submitted Continue preserves the lock.

**Motion and return.** Restrained window movement, a passing cat shadow and a tactile knocker support the selected composition. These add no clue or progression. Reduced motion disables nonessential movement. Closing title Settings restores title focus. Both New Game and Continue enter the R02 overview; opening the assignment is a separate action.

### **S02 Room overview family**

**Purpose and composition.** Show the approved R01 to R04 plates with their furniture, outlines, muted atmosphere and soft edge vignette. Provide previous and next room triangles. Contextual labels appear through hover or keyboard focus on the actual object. Keep invisible hit regions aligned to the illustrated silhouettes across aspect ratios.

**Actions and states.** R01 provides receipt and conversation; R02 assignment, folder, notebook and collected copies; R03 terminal and copies; R04 board, green book and ledger. Before first receipt, unavailable assessment objects direct the player to receipt without inventing a file. Submitted rooms retain read-only source access and report access.

**Interaction contract.** Keyboard activation reaches the same functions as pointer activation. A repeated folder opening succeeds when the folder is already marked open. Busy, stale and recovery guards still reject unavailable actions. Never require another state mutation merely to navigate to an already-open object.

### **S03 Assignment and shift instructions**

**Owner and entry.** The pinned assignment belongs to R02. Enter by selecting the letter; it is not forced as the first full-screen page after Continue.

**Content.** State the credit officer role, eight applications, declared versus documentary information, Warehouse and CIC investigation, optional notebook and board, five provisional decisions, ledger review and explicit confirmed Submit. State that the shift has no time limit. Explain that feedback arrives together after submission and working stays editable beforehand. Show no future identities, answer quotas or reference allocation portfolio.

**Actions and return.** Begin work points to R01 receipt without itself receiving a folder. Show me the rulebook locates the physical green book in R04. Back and Put down return to R02. Submitted reading is reference-only and cannot create a new assignment or unlock work. The macro input remains fixed for the round and appears consistently on dossiers; the current fixture uses Normal.

### **S04 Collected copies and application receipt**

**Current interpretation.** The old Incoming Tray or Next Dossier screen name is superseded. R02's shallow tray contains collected evidence copies only. It never dispenses future applications. Receipt is the explicit action on the folder beside the client in R01.

**Copy list.** Show each collected copy's record ID, source identity and location: Carried, On the desk or On the board. Provide Read copy and, while editable, Place on desk and Pin to board. The empty state explains how to make a copy at the terminal. Opening this list does not attach a record or infer an identity match.

**Receipt states.** Before receipt, expose only a generic available folder. After receipt, tell the player that it is at the desk. Once the frontier decision is structurally complete and saved, the next receipt becomes available. Duplicate activation must not receive twice. A failed save must not advance the frontier. Submitted attempts cannot receive another application. Returning from copy reading preserves the selected copy and relevant work context.

### **S05 Client conversation**

**Composition.** Use the approved R01 scene and a short line of direct text, without a dossier panel, dialogue box or frame around the text. Keep the person visible. The current implementation contains three neutral service acknowledgements and sample client art; a complete eight-person cast and substantive borrower interview system remain future work.

**Interaction.** Click, Enter or Space first reveals the current line and then advances. At narrow widths, split long text into sequential one-line beats without losing words. Every sentence change retains keyboard focus. Reduced motion shows text instantly. Completion returns to R01.

**Content boundary.** Reuse only authored service text or borrower evidence. Do not improvise income, debt, confession, document history or extra facts. No facial lie detector, persuasion score or required conversation branch is allowed. Interview topics, history replay and richer excerpts from conversations must not be presented as implemented features.

### **S06 Current dossier folder**

**Composition.** Preserve the approved kraft folder, framed source tabs, large scrollable reader and existing right action column: Open document, Your worksheet and Your decision. Retain the binding, tab identity and interior styling. Compact reflow must not become the rejected generic bare one-column redesign.

**Identity and process.** Keep full applicant name, ID, application number and fixed macro visible. Show CIC Opened or Not opened, the player's assessment source ID or Not attached, and decision input readiness. First-application guidance remains procedural. Do not label an attached record Verified or a completed input Correct.

| Source tab | Visible content | Boundary |
| ----- | ----- | ----- |
| Application | Complete authored narrative, profile and supporting evidence | Do not replace the original narrative with inferred summaries |
| Loan | Product, request, requested and adjusted tenor, annual rate, supplied installment | Neutral quantities and units; no derived recommendation |
| Income and obligations | Declared evidence excerpts | Clearly declared and not verified; no answer aggregate |
| Credit record | Contextual Check CIC access and opened status | Opens the R03 service; does not embed the hidden obligation total |
| Purpose | Authored use of funds and supporting or contradicting evidence | No injected Feasible or Not feasible verdict |
| Reserves | Authored liquid-asset evidence | No system reserve cover or rating |
| Collateral | Authored appraisal, senior claims, ownership and transferability | Secured only; no computed net, LTV or acceptance verdict |
| Environment | Main-income industry context and fixed macro | No system Conditions rating |

Preserve each tab's reading offset. Source facts are never edited. Your decision opens S12 within the folder family. Field-specific rule links open the actual green book with contextual Back. Save and meet next client, Save and continue or Save and review reflects the current progression context; none is a hidden Submit action.

### **S07 Original document and loose copy reader**

**Composition.** Use the selected cream loose-paper surface, retaining its outline and a small part of the owning support. Provide source name, applicant or record identity where applicable, read-only content and a readable scrolling region. Use page controls only for content that actually has authored pages.

**Actions.** Read the complete selected source; collect a selected excerpt or an available whole paragraph into personal notes with provenance; add an available source to comparison; inspect a copy; open the original; place a collected copy on desk or board. Excerpts preserve wording and source attribution. Personal commentary stays distinct from copied evidence.

**Return and failures.** Opening an original routes to the dossier or terminal that owns it. Back restores the caller's record, source or copy and reading context. Copying is not record attachment. Missing technical content produces Retry or a recoverable message, never a financial finding. After Submit, reading remains available but evidence placement, notes and assessment mutations are locked.

### **S08 Warehouse on the terminal**

**Composition.** Warehouse and CIC share one beige CRT in R03. The case strip shows the current application's name and ID, with public age and province as reference. This is an identity comparison aid, not an automatic query, record match or eligible-income total.

**Search.** Name is required. Age accepts the supported exact or range syntax; province is optional. Optional filters combine with AND. Exact diacritics and one-character-difference-per-word are explicit options. Search spans the shared 168-record directory, without a current-case or reached-case filter. Exact matches precede fuzzy matches; stable seeded tie ordering survives reload. Do not expose similarity percentages, relevance scores or main-record ranking cues.

**Results and record reading.** Rows show record ID, public profile and supplied headline; document prose opens separately in the same terminal. Never display Main, Noise, Trap, Differences, group tags, queue membership or associated future loan dossiers. A directory identity may overlap a future applicant; the directory must not disclose that association or preview their loan.

**Separate actions.** Attach record records this applicant's selected evidence; Detach record clears it. Make a copy creates a carried representation; Read copy and placement operate on that copy. Making a copy does not attach it. Detaching does not delete an existing copy. Display attachment status and copy location separately. Replacement of an attached record is a learner choice with no mismatch warning before Submit.

**States and return.** Distinguish idle, invalid query, search results, no results, record reading, already-collected copy, read-only and availability failure. A neutral no-results message suggests widening the query or removing an optional filter. No result or failed loading means neither zero income nor Reject. Preserve committed query, seed, selected record and reading position; Back to results restores focus to the selected row.

### **S09 Explicit CIC and other source ownership**

**Entry and composition.** CIC is the other service on the same terminal. Selecting its service page does not automatically reveal A2: the learner explicitly chooses Check CIC. Once opened, it can be reread without repeating a mandatory gate. The folder's Credit record link opens this same service.

**Evidence.** Preserve authored current group, worst group and event timing, last-month inquiries, document check and individual active payments and card minimums. Closed debts remain represented as authored evidence, not automatically included as active obligations. Keep the selected monthly obligation aggregate and automatic Character result hidden.

**Actions and restoration.** Read and optionally add the opened CIC source to comparison. Preserve applicant and reading offset; contextual Back can return to the folder tab or notebook. A submitted reader may open previously unvisited CIC for reference without changing the frozen visit state. Purpose and collateral documents remain in S06/S07 at R02; S09 does not invent new property or purpose-verification services.

### **S10 Personal notebook and worksheet**

**Composition.** Preserve the blue-gray notebook and distinct source-reading region. Worksheet and Notes are separate pages. The worksheet is optional and unscored; the notes are personal, unscored working. On wide layouts show a source beside the notebook; compact layouts reflow to readable regions without shrinking all text.

**Reference source.** Offer the current application, CIC already opened for this application, and its attached or collected Warehouse records. Never search for or infer the correct record through this picker. Detaching an uncollected record removes that reference; a collected copy remains available. Reference selection and book chapter are transient UI state, while saved working and reading offsets remain durable.

| Worksheet field | Control | Availability and units |
| ----- | ----- | ----- |
| Character rating | Blank, Clear, Watch, Block | All products |
| Purpose result | Blank, Feasible, Not feasible | All products |
| Acceptance result | Blank, Accepted, Not accepted | Secured only |
| DTI | Numeric text | Percent; 70 means 70 percent |
| Net collateral value | Numeric text | Secured only; VND |
| LTV | Numeric text | Secured only; percent |
| Collateral result | Blank, Clear, Shortfall | Secured only |
| Reserve cover | Numeric text | Months |
| Capital rating | Blank, Clear, Watch | All products |
| Conditions rating | Blank, Normal, Adverse | All products |

**Help and validation.** Public field explanations link to the relevant chapter of the green book. Back restores the reference, working and help opener. No reference number or rating is auto-filled. Blank fields are allowed. Nonempty malformed numeric text is preserved with a format message and can be corrected or cleared. The current provisional behavior does not add a Submit gate for malformed optional working; the report says Not comparable.

**Persistence.** Worksheet and notes survive decision changes, tool navigation and compatible reload. Unsecured collateral fields are absent and later report Not applicable. Never turn an unanswered optional field into zero or a scored failure. Post-submit fields and notes are read-only.

### **S11 Comparison board and personal notes**

**Composition.** Keep the approved corkboard with two source spaces, independent readers and a distinct personal-notes area. The board begins without answer-selected material. Only player-selected sources appear; no automated contradiction graph or investigation-complete meter is added.

**Actions.** Select available application, opened CIC or accessible record material; pin, unpin, replace, open original and collect attributed excerpts. If both spaces are occupied, ask which source to replace. Do not silently evict one. Provide pointer dragging, keyboard handle movement and explicit movement buttons. Clamp and save normalized positions; compact layouts stack source readers.

**Restoration.** Opening a source routes to its owning object and retains contextual Back. Copies and positions persist additively. Source replacement changes the board, not the authored source or an unrelated record attachment. Board placement and notes remain unscored and optional, and become read-only after submission.

### **S12 Decision inside the folder**

**Composition.** Keep the approved decision sheet in the folder, current applicant identity, five equal radio choices and only the active choice's input. Nothing is preselected. Show Provisional until you submit the round and explain payload clearing when a decision changes.

| Decision | Required input | Structural completeness |
| ----- | ----- | ----- |
| Approve | None | One selected choice |
| Reduce limit | Max installment in VND per month | Valid positive number, no greater than the original supplied installment |
| Require more collateral | Additional collateral in VND | Valid positive number, no greater than original requested principal divided by 0.70 |
| Add conditions | Covenant checkboxes | At least one allowed covenant |
| Reject | None | One selected choice |

**Input assistance.** Show units and the existing public structural maximum near the active numeric field. Errors appear promptly once a nonblank amount is entered or the player attempts progression. These bounds are not the correct reference amount. For a valid Reduce entry, show Proposed loan amount using the same rate and adjusted tenor. Do not silently clamp to a displayed rounded cap or replace raw input.

**Covenants.** Provide documents showing use of funds, periodic collateral re-appraisal for Secured only, and periodic occupation and income update. At least one completes Add conditions; covenant selection is explained after Submit without a separate score. The current provisional interface keeps all five decisions selectable for Unsecured files; product eligibility of the collateral choice remains an open policy.

**Editing and progression.** Changing category clears the old amount and covenants. Reduce to Approve to Reduce returns an empty Reduce field. Worksheet and notes remain. Navigation or reload within the same active category preserves its payload. Save and meet next client persists before returning to R01; only explicit receipt advances the frontier. On application 08, Save and review opens the ledger without submitting.

### **S13 Ledger review and planned allocation**

**Composition.** Use the original clay ledger binding: reached-application register on the left, planned allocation and Submit on the right. Preserve the approved interior, including framed controls. Reflow for compact reading without inventing a new report index or unrelated review surface.

**Register.** Show reached applicants only, their IDs and names, current decisions, required-input status and planned allocation. Use Missing decision, Missing input and Required inputs complete. Review opens that reached folder. Describe unopened files only through a generic count. Reopening an older file does not move the receipt frontier.

**Allocation.** Show Planned so far, incomplete status where relevant, Round room and Remaining or Over by. The current playable uses 4,590,000,000 VND for this fixture and the provisional model in section 8\. No total is derived from the hidden correct portfolio. Conditional amounts are labelled conditional; room overage does not currently block Submit.

**Readiness.** Enable Submit only when all eight files are reached and have one decision with a valid required input, subject to save and ownership guards. Blank worksheet fields, no attachment, no copies, unvisited CIC, no board and incomplete reading do not block. Ready never means correct. The player may keep reviewing without time restriction.

### **S14 Submit confirmation**

**Entry and copy.** Open a short focused dialog over the ledger. State that confirming ends this untimed shift, makes the assessment working read-only and opens the assessments. Use Keep reviewing and Confirm Submit. Do not obscure the irreversible meaning behind a stamp animation or a generic Continue button.

**Sequence.** Recheck completeness and writer ownership; prepare the final candidate; persist it successfully; then publish the submitted state and reveal the report. Prevent repeated confirmation while busy. Keep reviewing returns to editable ledger review. Failed persistence preserves working, shows Retry save and reveals no result or success stamp.

**Recovery.** If the final lock was saved but report construction or loading fails, keep the attempt locked and provide report recovery. Do not reopen editing to recover a report. Cancelling a visual transition must not undo or duplicate a successful lock.

### **S15 Whole round Summary**

**Composition.** Reuse the same ledger after successful final persistence. Round summary and Dossier assessments are two views of one final report, not separate rounds or per-case feedback during play.

**Hierarchy.** Result shows final planned allocation, room and conditional exposure under the provisional model. Reason lists finalized player decisions beside available reference decisions and links to detail. Meaning comes from the selected authored consequence branch in each assessable case. Action allows reading detail, revisiting sources and exporting progress. Limit identifies project rules, assumptions and outstanding source holds. Do not invent portfolio-risk probabilities, weighted scores, stars, accuracy percentages or efficiency metrics.

**States.** Display Submitted and read-only. The current build provides seven reference comparisons and holds one file for source review. A source hold is not an incorrect answer. Retain the final report across compatible reload. A new attempt is created through the title replacement flow, after a clear replacement warning.

### **S16 Dossier assessment within Summary**

**Content.** Show the final player decision and raw entered amount, available reference headline, attached record and authored main record, relevant evidence totals, original installment, adjusted tenor, applicable calculations, secondary requirements and the selected authored consequence. Offer Previous dossier, a case selector and Next dossier. All eight identities may appear now because the complete round has been received and submitted.

**Comparison.** Place final player worksheet entries beside reference values without rewriting them. Distinguish Not answered, Not applicable, Not assessed, Not comparable and Held for source review. Numeric comparison tolerance is inclusive plus or minus 5 percent after submission only. For additional collateral, distinguish mathematical amount, upward-million-rounded reference and the learner's unchanged entry. Explain the alternative collateral-limited principal where supported.

**Holds and limits.** KHCN-04's income and rental-tax conflict withholds its reference classification and consequence comparison; the original evidence and player working remain readable. KHCN-05's numerical reserve cover is withheld while its denominator basis is unresolved. Early-Reject checks marked skipped are Not assessed, not zero or Clear. A different attached record is explained here without a separate attachment penalty.

### **S17 Green public rulebook**

**Composition.** Use the selected green guide on its R04 support, with nine framed chapter tabs and readable page content. Preserve the approved book identity. Do not replace it with an anonymous help modal or insert it into every folder tab.

**Chapters.** Start here; Your shift; Evidence and your working; Apply the rules in order; Decision precedence; Amounts and conditions; Loan terms; Review and Submit; Controls. Start here connects the physical workflow to the assessment task. The guide teaches project rules openly, with generic examples only, and never computes the current file's answer.

**Access and return.** The physical green book opens Start here. How to play can locate it with a room cue. Contextual field-help links open the relevant chapter directly and preserve Back to the originating task. There is no persistent question-mark button or global task-shortcut rail in the current room design. Chapter selection is transient; chapter reading offsets can be saved.

### **S18 Settings**

**Composition and controls.** A paper overlay retains the underlying context and provides Reading, Motion, Audio and Controls. Reading offers 100, 115 and 130 percent text sizes with a Vietnamese-name and numeric sample. Amatic SC is restricted to the short title sample; Mali is used for all other labels, controls and numbers. Motion offers Reduced motion; Audio offers Object sounds. Controls list Tab, Enter or Space, Escape and room-only Left or Right.

**Supported actions.** Full-screen toggle and Export progress may appear when available. Do not add a volume slider, separate music channel, WASD, remapping, language selector or text-speed control without a corresponding implementation contract. Only one control has focus; a selected radio does not imply that another button is also focused.

**Persistence and return.** Use Back to menu, Back to title or Back to work to match the real destination. Preserve working and focus. Preferences can be saved before an attempt exists; preference-save failure does not erase assessment data. Effective reduced motion is enabled when either the in-game setting or operating-system preference requests it.

### **S19 General menu and How to play**

**Menu.** Esc opens a short paper menu with Resume, Settings, How to play and Return to Title. Show received count or Submitted read-only and a neutral save status. This replaces older menus containing eleven task shortcuts. Do not claim every function is directly listed in this menu.

**How to play.** Explain receipt beside the client, folder reading and decisions at the desk, Warehouse and CIC at the computer, copies on desk or board, and ledger review beside the rulebook. Show me the rulebook closes the overlay, moves to R04 and points at the actual green book. No new financial evidence is introduced.

**Focus and saves.** Keep focus inside the active dialog and underlying controls inactive. Nested Settings or How to play returns to the menu; closing the menu restores its opener. Return to Title attempts to save first and does not silently discard unsaved working. The menu does not end a shift or reset the attempt.

### **S20 Finalized attempt access**

**Current role.** S20 is a saved-attempt lifecycle state, not a separately integrated archive screen. Submitted Continue enters R02; the clay ledger in R04 opens the same saved report. Source readers remain available read-only.

**Replacement and limits.** The current device stores one attempt per experience namespace, with export and explicit new-shift replacement. Do not imply a multi-round archive, cloud account, cross-device sync, selectable historical saves or automatic conversion of earlier 1C attempts. Starting a new shift warns that it replaces the saved attempt and offers export first. Failed creation must preserve the existing saved attempt.

## **6 Public assessment guide contract**

The guide and final explanation use supplied simulation rules. These are not universal lending standards. The interface teaches the method before submission while withholding the current application's system result.

| Check | Public rule and boundary |
| ----- | ----- |
| Product and tenor | Unsecured 18 percent annually, 60-month cap; Secured 11 percent annually, 360-month cap; maturity age 70\. Adjusted months are the minimum of requested months, product cap and remaining months to age 70\. |
| Installment and proposal | The application supplies the original installment. Public help explains annuity and present-value conversion using the same monthly rate and adjusted tenor. The live proposal uses the player's entered installment only. |
| Income | Use supported, eligible, stable income belonging to the borrower. Preserve documented components and stability evidence; do not silently resolve the rental-tax and variable-income source conflicts. |
| Obligations | Include active monthly loan payments and card minimums. Do not substitute card limits, closed debts or household living costs. |
| Character | Current CIC group 2 or above, or forgery signs, gives Block. Without Block, qualifying group-2-or-above history in the last 12 months or at least three inquiries in the last month gives Watch. Otherwise Clear. Income mismatch alone is not forgery. |
| Purpose | Supporting evidence must support stated use and amount. A supplied contradiction can lead to Not feasible and Reject. Do not invent a verification verdict in raw evidence. |
| Acceptance | For Secured files, use authored ownership or consent, transferability, dispute status and appraisal evidence. Unsupported acceptance gives Reject. Unsecured collateral is not applicable. |
| Capacity | Monthly obligations plus original installment divided by eligible monthly income. At or below 70 percent continues to other checks; above 70 through exactly 80 percent gives Reduce; above 80 percent gives Reject. |
| Collateral | Net value is appraisal less senior claims; LTV uses assessed principal and positive net value. At or below 70 percent is Clear when accepted; otherwise Shortfall. Reduced offers use the reduced assessed principal. Nonpositive-net policy remains open. |
| Capital | Eligible liquid assets divided by the applicable monthly debt service; at least three months gives Clear, otherwise Watch. The original-versus-reduced denominator conflict remains explicit. |
| Conditions | Unfavorable main-income industry or Stressed macro gives Adverse; otherwise Normal. Macro is fixed for the round. Watch and Adverse do not change DTI thresholds. |

Headline precedence is Reject, Reduce limit, Require more collateral, Add conditions, then Approve. Lower-priority requirements may remain secondary in the report. DTI at or below 70 percent alone does not establish Approve. The method cannot use matrix stars as live predicates.

The public Reduce method is 70 percent of eligible monthly income less existing monthly obligations. The additional-collateral method is assessed principal divided by 0.70 less net collateral. The source validator's original-principal cap remains unchanged; the negative-net inconsistency is not repaired by typography, a signed field or silently clamping net to zero.

## **7 Visibility and source provenance**

### **7.1 Information access matrix**

| Information | Before final Submit | After successful lock |
| ----- | ----- | ----- |
| Reached application A narrative and raw supporting facts | Read-only | Read-only |
| Unopened loan files and queue associations | Hidden | Complete round received; report can list all eight |
| Shared Warehouse public records | Searchable across 168 records; no case association | Read-only access remains |
| Individual documentary income figures | Readable in the actual source | Can support explanations |
| Authored eligible-income aggregate and selected obligation total | Hidden as system answers | Revealed where reference assessment is available |
| CIC A2 | Explicit Check CIC opens it | Readable without changing frozen working |
| System DTI, net, LTV, reserve cover and ratings | Hidden | Applicable values or explicit comparison state |
| Player worksheet, notes, attachment and copies | Editable without answer marks | Frozen and readable |
| Player decision and required input | Provisional; structural errors only | Final comparison with available reference |
| Player-derived PV and planned allocation | Neutral proposal under current policy | Final planned figures under that same policy |
| Correct categories, tolerance results, consequence branches | Hidden | Reveal selected final branches and comparisons only |
| Difficulty, trap and noise metadata | Author-only | Not repurposed as learner score or source evidence |

### **7.2 Provenance and evidence movement**

Each reader and copy identifies its actual source. Use authored IDs and dates only; do not fabricate a bank stamp, issue date, signature or document number to make the artwork look complete. An excerpt retains source identity and original wording. Player notes remain visibly separate.

Attachment is a per-application evidence choice. A copy has source identity and location. A board slot references a selected source. These operations must stay distinct: attach does not move paper; make copy does not attach; placing a copy does not change the source; opening an original does not unpin it. Copies collected for one applicant do not become a hidden answer shortcut for another.

Pre-submit protection includes visible text, DOM, accessibility labels and status messages. Report construction remains behind the Submit boundary. Because this is a static teaching application, bundled files are technically inspectable; the design does not claim secure-examination protection.

## **8 Allocation validation and comparison states**

### **8.1 Current provisional room treatment**

The active fixture uses 4,590,000,000 VND. This is the supplied extended fixture's proposed room, adopted for the playable. General allocation policy, rounding and budget-based blocking remain open. The ledger must communicate planned offers, not actual disbursement or a certified risk measure.

| Current player choice | Planned allocation |
| ----- | ----- |
| Approve | Requested principal |
| Reduce limit | Present value of the player's valid installment at the same rate and adjusted tenor |
| Require more collateral | Requested principal, conditional on collateral cure |
| Add conditions | Requested principal, conditional on covenants |
| Reject | Zero |
| Missing or structurally invalid required input | Incomplete; not a valid zero allocation |

Sum supported current allocations, and label a partial sum incomplete while any file is missing. Show Remaining or Over by without correctness colors. Current overage does not block submission. Do not inherit baseline 2.05bn, archived 1.6bn or the hidden reference portfolio's total.

### **8.2 Numeric entry and structural error copy**

Keep raw text while editing. The current numeric grammar accepts English grouping and decimals such as 1234567, 1,234,567 and 1234.50, subject to applicable bounds and finite safe-number parsing. Do not guess a locale or reinterpret a comma decimal silently. VND display can round to whole currency units; validation and calculation retain the existing precision.

| Condition | Functional message |
| ----- | ----- |
| No decision | Choose a decision to continue |
| Required number malformed | Please enter a valid number |
| Installment is zero | Installment must be greater than 0 |
| Installment exceeds original estimate | Proposed installment cannot exceed the original estimate; Reduce limit can only lower it, never raise it |
| Additional collateral is zero | Additional collateral must be greater than 0 |
| Additional collateral exceeds cap | Additional collateral cannot exceed what the whole loan would require |
| No covenant selected | Select at least one condition |
| Optional worksheet number malformed | Please enter a valid number or clear this optional field |
| Round incomplete | Complete all dossiers before submitting |

Negative or unsupported numeric syntax uses the existing invalid-number path; this document does not change the parser. Keep errors next to the relevant field with a programmatic relationship and a readable explanation. Never compare required inputs with the hidden key during editing.

### **8.3 Final comparison vocabulary**

| State | Meaning |
| ----- | ----- |
| Entered | Final player value, retained unchanged |
| Not answered | Optional field was blank |
| Not applicable | A check does not apply to this product |
| Not assessed | The authored evaluation stopped before this check |
| Not comparable | Player numeric text cannot be parsed under the current optional-input treatment |
| Held for source review | Reference calculation or classification is withheld because of a source conflict |
| Within or outside tolerance | Post-submit numeric comparison against an available positive reference using inclusive plus or minus 5 percent |
| Decision matches or differs | Post-submit category comparison, distinct from structural readiness |

For additional collateral, the reference amount is rounded upward to the next 1,000,000 VND for comparison. Show the mathematical value separately where supported, and preserve the player's raw entry. Do not display a missing, held or undefined reference as zero, failure or a successful match.

## **9 Art direction and interface system**

### **9.1 Approved visual language**

Use flat hand-drawn 2D illustrations with bold continuous enclosed black contours, muted vintage fills and sparse interior marks. Most objects use a uniform base and at most one simple darker shadow shape. The room faces a wall straight on with a shallow floor band; close-ups enlarge the same object and keep a small part of its support visible.

Keep the approved soft dark edge vignette and restrained atmosphere. It must not obscure text or live controls. The later empty or stripped-back regenerated plates and the rejected clean-edge mask are not the visual baseline. Do not remove furnishings, decorations, ink frames or paper treatments in the name of minimalism.

Avoid photorealistic materials, smooth volume shading, glossy reflections, deep perspective, cinematic lighting, bloom and giant foreground furniture. Rusty Lake screenshots inform the supplied flatness and contour direction; they supply no characters, financial evidence or exact reusable layout.

### **9.2 Object continuity**

| Object | Identity to preserve | Ownership |
| ----- | ----- | ----- |
| Folder | Kraft or cream cover, broad tab, dark clip and recognizable binding | R02 |
| Copy tray | Shallow horizontal tray; collected papers only | R02, with copy access at R03 |
| Notebook | Blue-gray cover and cream tabs, distinct from ledger | R02 |
| Terminal | Beige CRT casing, outlined bezel and narrow keyboard | R03 |
| Loose copy | Cream sheet with clip and live source attribution | Desk, carried state or board |
| Board | Brown frame and muted cork, learner-selected papers | R04 |
| Rulebook | Dark green cover and chapter tabs | R04 |
| Ledger | Clay cover and the same register/allocation binding before and after submission | R04 |

R02 retains its ochre desk, patterned cream wall, low tray, kraft folder, simple pen cup and notebook. Do not add an unrelated banker lamp or import another room's desk. R04 guide close-ups retain the narrow R04 support rather than borrowing R02 props. The title foyer remains distinct from all four task rooms.

### **9.3 Typography and color**

Use only Amatic SC and Mali in the game. Amatic SC serves the game title and short dossier or surface titles; Mali serves all body text, dialogue, source evidence, controls, tables, financial amounts, units, errors, notes and statuses. Room titles need not be printed as outer captions. Noto Sans and Patrick Hand belong to the earlier route and are not this design's typography.

Reading targets remain approximately 20 px with 32 px line height on wide desktop and 18 px with 30 px on compact layouts, enlarged by the 100, 115 and 130 percent settings. These are quality targets, not a claim every current secondary caption meets them. Keep line length comfortable, names intact and numeric columns aligned. Never shrink a financial paragraph simply to fit the artwork.

| Palette role | Reference color | Application |
| ----- | ----- | ----- |
| Ink | \#191817 | Contours and principal text |
| Wall cream | \#D3D1BD | Quiet environment background |
| Paper ivory | \#F1E8CD | Reading surfaces |
| Dusty green | \#94A384 | Furniture and muted selections |
| Blue-gray | \#879794 | Notebook identity |
| Wood ochre | \#A77543 | Desk and chair fills |
| Cork | \#B59A62 | Board material |
| Clay | \#A77665 | Ledger identity |
| Guide green | \#59735E | Rulebook cover |
| Terminal screen | \#596C62 | Terminal framing, with a readable content region |

These are role references, not authority to recolor approved artwork. Color differentiates objects and interaction states; it must not classify borrowers or preview correctness. Use text, radio marks, borders and focus outlines in addition to color.

### **9.4 Live controls and artwork**

Keep content and controls live in HTML. Existing approved screen images contain raster placeholders; the integration covers those placeholders inside the drawn surface without flattening the entire interior. Any future production cleanup must preserve the approved composition, support, outlines, palette and vignette. Image text and illustrative numbers are never runtime source data.

Buttons have clear resting, hover, pressed, selected, disabled and keyboard-focus states using ink outlines and paper or sage fills. Preserve framed tabs, recognizable text fields and checkbox/radio shapes. Aim for 48 to 52 px primary targets and at least 44 px secondary hit areas; existing smaller controls require a size audit before release. A small visual gear or triangle can have a larger transparent hit area.

## **10 Responsive reading and accessible interaction**

### **10.1 Layout behavior**

At desktop widths retain each approved surface's layout and hierarchy. At laptop or enlarged-text widths, prioritize identity, action reachability, source text and units. Compact folder actions precede the long reading region. Notebook sources, board papers and ledger regions can stack or switch to readable sections; they must not become three miniature columns.

The current build scales room artwork to fill the viewport without cropping and reflows HTML at compact widths. Non-native aspect ratios can distort the art. A dedicated aspect-ratio art strategy is future work, not a promise that every viewport has custom artwork. Source readers must remain usable at 130 percent and at 390 by 844, alongside 1280 by 720, 1366 by 768, 1440 by 900 and 1920 by 1080 review targets.

Do not hide decision controls below an unreachable clipped region. Keep scrolling local to meaningful readers, with clear cues when more content exists. Preserve reading positions per applicant, source and chapter. Vignette, masking and scene transitions sit below live controls and do not intercept input.

### **10.2 Keyboard and focus**

| Context | Required interaction |
| ----- | ----- |
| Room objects | Tab to labelled object; Enter or Space opens its function |
| Room navigation | Left and Right change room only outside editing and overlays |
| Folder tabs | Left, Right, Home and End move among source tabs; active state is programmatic |
| Readers | Keyboard scrolling and a visible focus target |
| Board | Drag plus keyboard handle movement and movement buttons |
| Conversation | Enter or Space reveals or advances with focus retained on each beat |
| Dialogs | Focus enters, stays inside, and returns to the opener; background is inactive |
| Contextual book links | Back restores the source and meaningful help opener |
| Submitted work | Reading and navigation remain operable; editing and placement actions are disabled and rejected by state logic |

Use semantic labels, legends, tab relationships, table headers, error descriptions and status announcements. No operation may require hover, color, sound, precise dragging or a portrait clue alone. Verify Vietnamese glyphs, punctuation, percentages, VND and long names in actual live fonts. Full screen-reader compatibility is a release validation task; semantic HTML alone is not certification.

## **11 Motion sound and system feedback**

### **11.1 Scene transitions**

The current integration uses one dark blink on room or work-surface changes: approximately 60 ms darkening, 20 ms hold and 80 ms reveal. Predecode the destination and commit art with its content. Guard repeated activation, cancellation and failed preload. Restore a usable visible scene after cancellation or timeout and provide Retry scene when needed.

Do not blink for source tabs, form edits, dialogue advancement or opening a menu. Do not retain the old 280 or 420 ms travel timings as the active default. Physical station continuity comes from matching object, support and close-up, not a mandatory animated zoom. Effective reduced motion uses direct cuts and instant dialogue text while preserving the same final state and functionality.

### **11.2 Sound**

Object sounds are neutral procedural paper, keyboard, wood or tack cues, triggered by user actions and controlled by one toggle. Failure or blocked audio must not stop gameplay. There is no approved separate volume or music control. These cues are development foley, not a completed recorded production soundtrack.

Before Submit, no success, failure, risk, identity-match or correctness sound is permitted. Saved feedback describes persistence only. A final submitted stamp may appear after successful lock, never after provisional saving or a failed write.

### **11.3 Status wording**

Keep statuses factual and local: Opened, Not opened, Assessment source, Copy carried, On the desk, Required inputs complete, Saved on this device and Submitted read-only. Avoid Verified match, Safe borrower, Investigation complete, Good decision or equivalent answer cues. Notices may explain where to go or what failed; they must not become decorative filler.

## **12 Persistence recovery and ownership**

### **12.1 Durable and transient state**

| Durable working | Transient presentation |
| ----- | ----- |
| Reached frontier and current applicant | Session Back history |
| Current decision and active payload | Open menu, dialog and captured opener |
| Worksheet raw entries and personal notes | Assignment and first-session book cues |
| Per-applicant attached record and opened CIC state | Current conversation beat |
| Committed query, search seed, selected record | Notebook reference selection and active book chapter |
| Collected copies, locations and board sources or positions | In-flight blink and scene-loading status |
| Saved source tabs and reading offsets | R02 landing presentation on title Continue |
| Reading, motion and object-sound preferences | Temporary notifications |
| Submitted lock and versioned final working | Temporary submitted-source viewing that does not change final evidence choices |

Compatible saves resume the same untimed shift. Existing additive defaults preserve older compatible working. Schema, content and policy compatibility remain explicit. Do not silently migrate archived 1C results or discard incompatible raw data. Current pilot saves are separate from earlier routes; this document does not change their keys or merge attempts.

### **12.2 Recovery states**

| Failure or state | Required behavior | Recovery |
| ----- | ----- | ----- |
| Ordinary save failure | Keep current working in memory; mark unsaved | Retry save or export progress |
| Save-dependent progression failure | Stay at current decision or receipt; do not advance | Correct storage issue and retry |
| Final Submit save failure | Remain editable; no answers revealed | Retry from review |
| Saved submitted attempt with report failure | Preserve lock | Retry report, reload or export |
| Newer save in another tab | Stop overwriting newer progress | Reload current save or export local working |
| Another active writer | Prevent competing assessment writes | Retry ownership or export |
| Corrupt or incompatible data | Preserve raw attempt; do not treat it as a new game | Export and explicit recovery or replacement flow |
| Warehouse or CIC unavailable | Show availability failure, not adverse evidence | Retry; retain query and draft |
| Scene image or rendering failure | Keep a usable task state and content | Retry scene or supported image fallback |
| Audio or full-screen unavailable | Keep all assessment tasks usable | Silent fallback or browser full-screen instructions |
| Optional malformed worksheet text | Keep raw entry; no new gate under current provisional treatment | Correct or clear; report Not comparable if retained |

Local storage is device- and origin-specific, with no account or cloud synchronization. The integration uses exclusive writer ownership plus stale/revision checks; release-level race and recovery behavior still require validation. Export progress exports saved working; it is not a claimed native PDF report or an implemented arbitrary import interface.

## **13 Source holds and implementation status**

### **13.1 Financial and content holds**

| Topic | Current treatment | Boundary before broader release |
| ----- | ----- | ----- |
| Room policy I02 | Fixture room and player-choice allocation are provisional; overage does not block | Define general conditional allocation, rounding and any future gate explicitly |
| Negative net collateral I03 | No zero clamp or invented LTV; source conflict retained | Resolve signed worksheet, nonpositive-net evaluation and collateral-input cap together |
| Capital after Reduce I04 | Case 05 reserve number held; current case-specific treatment retained | Approve one general original-versus-reduced debt-service basis |
| Case 04 and Warehouse W03 W04 | Evidence readable, reference grading and consequence held | Reconcile rental tax, stability and eligible income without silently changing keys |
| Early Reject I05 | Authored skipped checks are Not assessed | Keep educational counterfactuals distinct from executed checks |
| Scorecards I01 | No weighted, risk, efficiency, star or accuracy score | Define and approve formulas before exposing metrics |
| Unsecured collateral choice I09 | Five choices remain available; re-appraisal covenant stays Secured-only | Resolve product-choice eligibility without answer-derived filtering |
| Optional malformed working I11 | Preserved, nonblocking and later Not comparable | Finalize the product policy explicitly |
| Noise-record income W02 | Raw documents readable; no invented per-record eligible-income aggregate | Author and verify missing structured values if a future feature needs them |
| Purpose and acceptance presentation | Original public narrative stays intact | Never fill layouts with hidden author verdicts |
| Matrix and trap annotations | Author-only, with known label conflicts retained | No runtime predicate or learner-score derivation from stars |

### **13.2 Current implementation and remaining work**

The latest implementation record reports 70 passing automated tests, source integrity checks, type checks, builds and isolated Chromium QA. This is historical verification evidence, not a fresh test result produced by this documentation revision.

Implemented scope includes four approved rooms, physical task surfaces, explicit receipt, eight-case progression, shared Warehouse and CIC, separate attachment and copies, notebook references and contextual rule help, first-case guidance, five decisions, review, save recovery, confirmed Submit and a read-only report. The restored artwork and latest entry, dialogue, numeric feedback and Settings labels are the current baseline.

Remaining work includes a complete authored customer cast, richer approved borrower dialogue, final production asset cleanup that preserves the selected visuals, recorded audio if desired, an aspect-ratio strategy, control-size and text-size audits, cross-browser and assistive-technology QA, and performance testing on target devices. Package C or a separate practice case has not been implemented. These gaps do not authorize new facts, policies or an interior redesign.

## **14 Acceptance and handoff**

### **14.1 Acceptance scenarios**

| ID | Scenario | Expected result |
| ----- | ----- | ----- |
| UX01 | New Game, draft Continue and submitted Continue | All enter R02; no receipt or saved-navigation rewrite merely on entry; submitted has no assignment cue |
| UX02 | Assignment opened and put down | Read complete instructions; return R02; session cue clears |
| UX03 | First and next receipt, repeated activation | Receive once in R01; preserve authored sequence; save failure cannot advance |
| UX04 | Save frontier decision, inspect an older file, receive next | Frontier remains correct; next file is received explicitly in R01 |
| UX05 | Open folder, leave and reopen through multiple paths | Entry works even when already open; stale and recovery guards still work |
| UX06 | Search full directory with diacritics, age and province options | One 168-record pool; stable rank order; no hidden author columns or future queue associations |
| UX07 | Make copy, attach, detach and place independently | Separate source choice and physical location; no identity or correctness certification |
| UX08 | Notebook source and contextual field help | Only available references; no auto-fill; Back restores working and meaningful focus |
| UX09 | Fill two board spaces, add another source | Explicit slot replacement; no silent evidence loss; pointer and keyboard alternatives work |
| UX10 | Switch Reduce to another choice and back | Old payload cleared; worksheet and notes retained; same-category navigation preserves payload |
| UX11 | Wrong but valid decisions with blank optional work | Can progress and submit; no pre-submit assessment hint or optional gate |
| UX12 | Invalid numeric format, zero and above-cap amounts | Immediate structural messages with units; no comparison to reference answer |
| UX13 | Review with incomplete files and over-room complete choices | Missing inputs block; current room overage alone does not |
| UX14 | Cancel, confirm, double-activate and fail final save | Cancel keeps editing; one successful lock only; failure reveals no assessment |
| UX15 | Reload a submitted attempt and force report failure | Read-only lock remains; report recovery cannot restore editing |
| UX16 | Inspect source hold, skipped, blank and malformed states | Distinct labels; no missing reference shown as zero or an incorrect answer |
| UX17 | Keyboard-only room, dialogue, tabs, board and dialogs | All tasks reachable; focus stable and restored; room keys do not fire while typing |
| UX18 | 130 percent text at laptop and compact dimensions | Readable source and reachable controls; no clipping, overlap or binding collision |
| UX19 | In-game or operating-system reduced motion | Direct scene cuts and instant dialogue; all final states remain available |
| UX20 | Failed image, storage, audio and competing writer | Clear recoverable state; working preserved; no false financial finding |
| UX21 | Inspect title, room edges, source artwork and hidden labels | Approved visual identity; no slogans, sample finance used as evidence or leaked answers |
| UX22 | Replacement of an existing saved attempt | Explicit warning and export option; cancel or failed creation preserves prior saved attempt |

These scenarios are acceptance requirements. They are not all newly executed or certified by this revision. Any destructive testing must use an isolated origin and fixture; preserve the user's saved attempts on the active preview and earlier origins.

### **14.2 Source and implementation map**

| Subject | Current reference |
| ----- | ----- |
| Direct decisions and chronology | AGENTS.md; PROJECT\_CONTEXT.md; latest sections of docs/IMPLEMENTATION\_NOTES.md |
| Supplied interface and reconciliation | input-materials/2026-10-17\_group10\_interface-design/originals/\[Group 10\] PBL The Credit Desk (19).md; its INTEGRATION\_NOTES.md |
| Earlier screen detail | briefs/INTERFACE\_DESIGN\_V3\_EN.md; compatible S01 to S20 details only |
| Approved game flow and technical boundaries | briefs/GAME\_DESIGN\_DOCUMENT\_V1\_EN.md; briefs/CORE\_USER\_FLOW.md; CORE\_USER\_FLOW\_NOTES.md; TECHNICAL\_ROUTE\_NGUYEN\_DUC\_MINH.md |
| Public rules and unresolved definitions | input-materials/2026-10-16\_group10\_full-product/SOURCE\_REGISTER.md and SOURCE\_ISSUES.md |
| Extended content and source separation | Dossier and matrix bundle INTEGRATION\_NOTES.md; Warehouse bundle INTEGRATION\_NOTES.md |
| Selected visual identity | design/SCREEN\_ART\_STYLE\_BIBLE\_VI.md; concept-study/synchronization-2026-10-19; current approvedArt.ts selection |
| Room entry, receipt and contextual navigation | src/integration/DiscoveryApp.tsx; discoveryFlow.ts; profile.ts; folderEntry.ts |
| Folder, terminal and sources | src/concept/ConceptDossier.tsx; ConceptTerminal.tsx; ConceptPaper.tsx; src/ui/PaperCopy.tsx |
| Notebook and novice help | src/integration/NotebookSource.tsx; learningFlow.ts; src/ui/Worksheet.tsx; LearningHelp.tsx |
| Decision, review and final report | src/ui/DecisionPanel.tsx; ReviewView.tsx; SummaryView.tsx; src/concept/ConceptReport.tsx |
| Settings, book, transitions and art | src/integration/SettingsPanel.tsx; Rulebook.tsx; useSceneBlink.ts; approvedArt.ts; approved-style.css |

### **14.3 Revision decisions**

V4 replaces the old outer HUD and shortcut-heavy framing with the approved four-room object interface; relocates explicit receipt to R01 and defines the R02 tray as copies only; corrects title and Continue entry to R02; preserves the restored interiors and Amatic SC plus Mali typography; separates attachment, copy and board actions; includes A+B guidance, notebook references and immediate structural validation; and documents actual report holds, recovery and scope limits.

The supplied Interface (19) and original financial inputs remain byte-identical. V3 is retained as a historical reference with a pointer to this revision. New engineering work should use this consolidated interface together with the source registers and current implementation notes. Any future financial-policy change requires an explicit decision rather than an incidental UI edit.

