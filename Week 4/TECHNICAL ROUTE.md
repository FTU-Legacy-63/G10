# **TECHNICAL ROUTE (Owner: Nguyễn Đức Minh)**

## **1\. Technical Direction**

The Credit Desk will continue as a browser-based application built with **HTML, CSS, and Vanilla JavaScript**, using the existing MVP as its development foundation.

This approach fits the project’s core task: presenting fictional dossiers, processing player decisions, applying explicit Capacity rules, and displaying explainable results.

The revised route is: 

***Agreed rules and reviewed data → Assessment engine → Decision workflow → Feedback and saved progress → Verified deployment***

The application remains a ***Capacity-only*** learning simulation. Its outputs represent classifications under documented assumptions.

## **2\. Technology and Application Structure**

Technologies describe what the project uses. Application layers describe how responsibilities are organized.

| Application Layer | Responsibility | Technology |
| ----- | ----- | ----- |
| **Presentation** | Display dossiers, supporting evidence, decision controls, and feedback. | HTML, CSS, and JavaScript |
| **Assessment** | Calculate financial indicators, apply Capacity rules, and explain the classification. | JavaScript functions |
| **Game state** | Manage drafts, locked decisions, credit allocation, and round completion. | JavaScript |
| **Data and configuration** | Store fictional dossiers, rule parameters, and round settings. | JavaScript objects or JSON |
| **Persistence** | Save and restore compatible player progress. | Browser localStorage |

**Development tools:** ***Visual Studio Code*** for editing and browser developer tools for inspection.

**Version management and delivery: *GitHub*** for source history and GitHub Pages for the planned static deployment.

*These responsibilities should remain separate so that changing a dossier or threshold does not require rewriting the interface.*

## **3\. Establish a Consistent Data and Rule Foundation**

The existing prototype and the five newly supplied PDFs contain different datasets and rule interpretations. The first implementation step is to reconcile them into one versioned specification.

### **Required Decisions**

The shared specification must define:

* Net-income treatment and consistent VND units.  
* Employment, age, dependents, and complexity classifications.  
* The income-volatility measure.  
* The exact band-adjustment formula and priority.  
* The distinction between Reduce Limit and Reject.  
* The treatment of proposals below the band.  
* Whether players may change tenor.

For the initial validation round, using each dossier’s original tenor is proposed so that results can be compared directly with the reviewed examples. Tenor adjustment can be enabled in a separately configured round once its assessment behavior is specified.

### **Round Configuration**

Each round will define its selected dossiers, total credit allocation, permitted decisions, and applicable rule version.

The earlier five-case count and VND 180 million allocation must not automatically carry over to the new dataset. The selected allocation must support the intended learning task and be checked against the expected lending amounts.

Reviewed dossiers will be stored with the application. A SQL server is not required for gameplay. If retained for team data preparation, it will supply an exported, reviewed dataset.

## **4\. Build an Explainable Assessment Engine**

The assessment engine will accept a dossier and the applicable terms, then return a structured result.

**Processing sequence:**

1. *Validate required inputs.*  
2. *Calculate NDI, DTI, Burden, and the simplified installment.*  
3. *Determine adjustment factors and complexity.*  
4. *Calculate the initial Capacity band.*  
5. *Apply hard gates and the agreed adjustment priority.*  
6. *Assess the original request or proposed terms.*  
7. *Return the result and its calculation trace.*

The output will include the applied factors, band values, warnings, decisive rule, and specification version.

The interface will use these returned values directly when constructing the explanation. Financial figures should not be duplicated manually inside separate feedback text.

Calculations will retain precision until display. Amount-entry controls must permit valid reference amounts; an exact amount such as VND 405,756,000 must not be rejected solely because it is not a multiple of VND 5 million.

## **5\. Preserve a Controlled Decision Workflow**

The existing draft-and-lock interaction will be retained:

***Review dossier → Draft decision → Review terms → Confirm and lock → Reveal feedback → Return to desk***

Saving or reviewing a draft will not consume credit allocation.

**Once confirmed:**

* *The decision becomes read-only for the current round.*  
* *The approved principal is recorded once.*  
* *Remaining allocation is calculated from committed records.*  
* *The Decision-Consequence Card becomes available.*

***Remaining allocation \= Total allocation − Sum of committed approved principal***

The application must distinguish invalid entries from learning mistakes. Missing amounts or amounts exceeding available allocation are invalid. A permitted approval that exceeds the model’s Capacity limit can be recorded as a learning decision and explained afterward.

### **Feedback Structure**

The card will present:

* *Decision: what the player committed.*  
* *Assessment: how it compares with the Capacity rules.*  
* *Reason: the calculation and binding constraint.*  
* *Consequence: the reviewed fictional scenario.*  
* *Allocation: the effect on the round.*  
* *Limitation: what the result does and does not establish.*

Applicant assessment and portfolio allocation will receive separate explanations. A combined numerical score will remain optional until its criteria are agreed and checked for the selected round size.

## **6\. Save Progress and Handle Failures**

**localStorage** will hold drafts, locked decisions, the current stage, and the round, dataset, and rule versions.

Before restoring a session, the application will check that the saved records are valid and compatible. Incompatible progress will not be silently reassigned to revised dossiers.

The application will also:

* *Handle unavailable storage without stopping the current session.*  
* *Indicate when progress cannot be saved.*  
* *Request confirmation before replacing an existing round.*  
* *Prevent restored decisions from consuming allocation twice.*

This storage supports local continuity. It does not provide cross-device synchronization or an authoritative record of student grades.

## **7\. Verification, Deployment, and Completion**

### **Verification**

| Check | Required Evidence |
| ----- | ----- |
| **Numerical accuracy** | Application results match independently calculated reference cases. |
| **Rule behavior** | Threshold boundaries, competing adjustments, and hard gates follow the agreed specification. |
| **Decision controls** | Valid reference amounts and tenors can be submitted. |
| **Game state** | Drafts consume no allocation; each commitment is counted once. |
| **Progress recovery** | Compatible saves restore correctly; storage failures are handled. |
| **Feedback consistency** | Displayed values and explanations match the assessment output. |
| **Published operation** | The deployed application completes the same core flow as the local version. |

Reference cases will include Approve, Reduce Limit, and Reject after their definitions are reconciled. Passing these checks demonstrates implementation consistency; it does not validate the model for real lending.

### **Deployment and Support**

***GitHub Pages*** is the planned host for the static application. The published version will be checked for working data paths, readable screens, and a complete decision-and-feedback cycle.

A local web-server version will be maintained for demonstration if internet access or publication is unavailable. Essential assets should be available locally or have reliable fallbacks.

AI tools may assist development, but team members must understand the calculation and decision functions. Runtime classifications and explanations will follow reviewed rules and authored content.

### **Completion Criterion**

> *The revised MVP is ready to demonstrate when a player can complete a configured round, submit valid decisions, receive traceable Capacity feedback, observe correct allocation changes, and restore compatible progress.*

Completion requires the dataset, rules, controls, round settings, and explanations to agree.

