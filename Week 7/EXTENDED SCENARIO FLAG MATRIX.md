# **Scenario Flag Matrix**

## **1\. Flag matrix**

★ \= decisive · ● \= present but does not change the decision · blank cell \= absent.

| Flag | Description | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Character** |  |  |  |  |  |  |  |  |  |
| **CHAR-CURRENT\_OVERDUE** | Current CIC group ≥ 2 \= Block. A past 'Group 2' label is not a currently overdue debt. |  |  | ★ |  | ★ |  |  |  |
| **CHAR-HISTORY\_12M** | Current group 1 but worst group in the last 12 months ≥ 2 \= Watch; an event older than 12 months \= Clear. |  |  | ★ |  | ● | ★ |  | ● |
| **CHAR-INQUIRY\_COUNT** | Number of lenders inquiring on the CIC in the last month: ≥ 3 \= Watch; \< 3 \= Clear. | ★ |  |  |  |  |  | ● | ● |
| **CHAR-DOC\_CHECK** | Signs of forgery \= Block. A gap between Stated and Verified income, or genuine documents, is not forgery. Written as narrative. |  |  |  | ★ |  |  |  | ● |
| **Condition** |  |  |  |  |  |  |  |  |  |
| **COND-PURPOSE\_DOCS** | Documents prove the purpose of the loan; documents that are missing or contradict the purpose \= Not feasible → Reject. Written as narrative. |  |  |  |  |  |  |  | ★ |
| **COND-PURPOSE\_AMOUNT** | Own capital \+ loan amount matches the cost shown in the documents (an arithmetic check; the matrix sets no "out of proportion" threshold). Near-miss: the amount matches but is not enough to conclude the purpose is feasible. |  | ● |  |  |  |  |  | ● |
| **COND-INDUSTRY\_OUTLOOK** | Outlook of the industry of the MAIN income source (not the secondary source); Unfavorable \= Adverse. The narrative states the outlook for each source. |  |  |  |  |  | ★ | ● |  |
| **Capacity** |  |  |  |  |  |  |  |  |  |
| **INC-VERIFIED\_MISMATCH** | Stated income differs from verified income (Warehouse), higher or lower. | ● |  | ★ | ★ | ★ | ★ | ● |  |
| **INC-NON\_COUNTING\_INCOME** | An item that looks like income but is not counted: income of a spouse or relative, one-off, deposit, advertised or unsigned, unstable (campaign-based; a lease that expires before the Adjusted tenor). | ● | ★ | ● | ★ | ★ |  |  |  |
| **INC-COMPOSITE\_INCOME** | Several sources or several salary/allowance lines that must be added up; amounts not paid monthly must be converted to a monthly figure. |  |  | ★ | ★ |  | ★ |  |  |
| **DEBT-UNDECLARED** | Declared debt obligations are lower than, or missing from, what the CIC shows. |  | ● | ● | ★ | ★ |  |  |  |
| **DEBT-CIC\_READING** | Read the right amount from the CIC: credit cards count only the minimum payment; closed accounts are not counted. |  |  | ★ |  |  |  |  |  |
| **CAPITAL-RESERVE\_COVER** | Reserve cover \= liquid assets ÷ (existing obligations \+ installment); \< 3 months \= Watch. |  |  |  | ● |  |  |  |  |
| **CAPITAL-LIQUID\_SCOPE** | Liquid assets include cash, savings and term deposits; they exclude real estate, borrowed money and assets pledged to this loan. Written as narrative. |  |  |  |  |  | ★ |  |  |
| **Collateral** |  |  |  |  |  |  |  |  |  |
| **COLL-ACCEPTANCE\_TEST** | The asset is legally owned by the pledgor, undisputed and transferable; otherwise \= Not accepted. Secured only. |  |  |  |  |  | ★ |  |  |
| **COLL-SENIOR\_CLAIMS** | Net collateral value \= appraised value − senior claims. Secured only. |  |  |  |  |  |  | ★ |  |
| **COLL-LTV\_SHORTFALL** | LTV on net value against the 70% Max LTV; use the appraised value, not the purchase price; exactly 70% is Clear. Secured only. |  |  |  |  |  | ★ | ★ |  |
| **COLL-LTV\_ASSESSED\_AMOUNT** | LTV is computed on the proposed amount (the reduced amount after Reduce limit), not the requested amount. Secured only. |  |  |  | ● |  |  |  |  |
| **COLL-NOT\_APPLICABLE** | Unsecured loan: no collateral test, even when the borrower owns assets. | ● |  |  |  |  |  |  |  |

**GAME flags (not counted in density)**

| Flag | Description | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **GAME-REDUCE\_FLOW** | Reduce limit flow: the player enters the Max installment. |  |  |  | ● | ● |  |  |  |
| **GAME-COLLATERAL\_FLOW** | Require more collateral flow: the player enters the additional collateral. |  |  |  |  |  |  | ● |  |
| **GAME-CONDITIONS\_FLOW** | Add conditions flow: the player selects covenants (for Unsecured loans there is no collateral re-appraisal option). |  |  | ● |  |  |  |  |  |
| **GAME-SECONDARY\_REQUIREMENT** | The headline decision comes with a secondary (lower-order) requirement shown on the Card. |  |  |  | ● | ● |  | ● |  |
| **GAME-ROOM\_LIMIT** | A wrong decision would exceed the credit room. |  | ● |  | ● | ● |  |  |  |

## **2\. Dossier design slots**

|  | KHCN-01 | KHCN-02 | KHCN-03 | KHCN-04 | KHCN-05 | KHCN-06 | KHCN-07 | KHCN-08 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| **Legacy anchor** | Phương Anh | Kiên | Hạnh | Thịnh | Tuấn | Quân | Bảo | Hưng |
| **Loan type** | Unsecured | Secured | Unsecured | Secured | Secured | Secured | Secured | Unsecured |
| **Headline decision** | Approve | Reject | Add conditions | Reduce limit | Reduce limit | Approve | Require more collateral | Reject |
| **Binding trigger (step)** | None | DTI \> 80% (step 5\) | Character Watch: history within 12 months (step 2\) | 70% \< DTI ≤ 80% (step 5\) | 70% \< DTI ≤ 80% (step 5\) | None | Collateral Shortfall (step 6\) | Purpose not feasible: documents contradict the purpose (step 3\) |
| **Secondary on Card** | – | – | – | Capital Watch → covenants | Character Watch (history) → covenants | – | Character Watch (inquiries) \+ Adverse industry → covenants | – |
| **Wrong decision the trap leads to** | Add conditions | Approve or Reduce | Approve, Reduce or Reject | Approve or Reject | Approve or Reject | Add conditions, Require more collateral, Reduce or Reject | Approve or Add conditions | Approve |
| **Number of main flags** | 4 | 3 | 7 | 7 | 5 | 7 | 5 | 5 |
| **Number of ★ flags** | 1 | 1 | 5 | 5 | 4 | 7 | 2 | 1 |
| **Score** | 5 | 4 | 12 | 12 | 9 | 14 | 7 | 6 |
| **Difficulty** | Easy | Easy | Hard | Hard | Medium | Hard | Medium | Medium |

## **3\. Order of operations: trace of each dossier**

"—" means the dossier has already stopped at an earlier step, so this step is not assessed. "N/A" means the step does not apply to an Unsecured loan.

| Step | KHCN-01 | KHCN-02 | KHCN-03 | KHCN-04 | KHCN-05 | KHCN-06 | KHCN-07 | KHCN-08 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| 2 Character | Clear | Clear | Watch (history) | Clear | Watch (history) | Clear | Watch (inquiries) | Clear |
| 3 Purpose | Feasible | Feasible | Feasible | Feasible | Feasible | Feasible | Feasible | Not feasible (documents) → Reject, STOP |
| 4 Acceptance (Secured) | N/A | Accepted | N/A | Accepted | Accepted | Accepted (jointly owned, both spouses consent) | Accepted | N/A |
| 5 DTI | ≤ 70% | \> 80% → Reject, STOP | ≤ 70%, near the line | 70–80% → Reduce | 70–80% → Reduce | ≤ 70%, near the line | ≤ 70% | — |
| 6 LTV (Secured) | N/A | — | N/A | Clear on the reduced amount | Clear on the reduced amount | Clear, exactly 70% | Shortfall (after deducting the senior claim) | N/A |
| 7 Capital / Conditions | Clear / Normal | — | Clear / Normal | Watch / Normal | Clear / Normal | Clear / Normal | Clear / Adverse | — |
| 8 Precedence → decision | Approve | Reject | Add conditions | Reduce \+ covenants | Reduce \+ covenants | Approve | Require more collateral \+ covenants | Reject |

**Which step each flag belongs to**

| Step | Flags |
| ----- | ----- |
| 2 | CHAR-CURRENT\_OVERDUE, CHAR-HISTORY\_12M, CHAR-INQUIRY\_COUNT, CHAR-DOC\_CHECK |
| 3 | COND-PURPOSE\_DOCS, COND-PURPOSE\_AMOUNT |
| 4 | COLL-ACCEPTANCE\_TEST (Secured) |
| 5 | INC-VERIFIED\_MISMATCH, INC-NON\_COUNTING\_INCOME, INC-COMPOSITE\_INCOME, DEBT-UNDECLARED, DEBT-CIC\_READING |
| 6 | COLL-SENIOR\_CLAIMS, COLL-LTV\_SHORTFALL, COLL-LTV\_ASSESSED\_AMOUNT (Secured) |
| 7 | CAPITAL-RESERVE\_COVER, CAPITAL-LIQUID\_SCOPE, COND-INDUSTRY\_OUTLOOK |
| 4, 6 | COLL-NOT\_APPLICABLE (Unsecured: steps 4 and 6 are skipped) |

## **4\. Density, difficulty and balance across the Cs**

Only the 19 main flags are counted; GAME flags are not. Difficulty thresholds: Easy when score ≤ 5, Medium when score ≤ 9, Hard above that.

|  | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | Total |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Capacity | 2 | 2 | 5 | 4 | 3 | 2 | 1 | 0 | 19 |
| Character | 1 | 0 | 2 | 1 | 2 | 1 | 1 | 3 | 11 |
| Capital | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 2 |
| Collateral | 1 | 0 | 0 | 1 | 0 | 2 | 2 | 0 | 6 |
| Conditions | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 2 | 5 |
| **Total main flags** | 4 | 3 | 7 | 7 | 5 | 7 | 5 | 5 | 43 |
| Of which ★ | 1 | 1 | 5 | 5 | 4 | 7 | 2 | 1 | 26 |
| Score (flags \+ ★) | 5 | 4 | 12 | 12 | 9 | 14 | 7 | 6 |  |
| **Difficulty** | **Easy** | **Easy** | **Hard** | **Hard** | **Medium** | **Hard** | **Medium** | **Medium** |  |

