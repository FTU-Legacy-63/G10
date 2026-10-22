# **Scenario Flag Matrix (Owner: Nguyen Ngoc Minh Ha)**

## **1\. Naming convention**

Format: GROUP-DESCRIPTION, upper case, words joined by underscores.

| Group | Scope |
| ----- | ----- |
| INC | Income: stated vs verified, and what counts as income |
| DEBT | Existing obligations: declared vs CIC |
| GAME | Game mechanics (Reduce limit sub-flow, credit room) |

Tick legend:

* **★** \= decisive. Missing or misreading this flag flips the decision.  
* **●** \= present, but does not flip the decision.  
* Blank \= not present.

## **2\. Case profiles**

|  | KHCN-01 | KHCN-02 | KHCN-03 | KHCN-04 | KHCN-05 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Applicant | Trần Phương Anh, 35 | Đỗ Văn Kiên, 41 | Trịnh Thị Hạnh, 44 | Nguyễn Văn Thịnh, 66 | Vũ Minh Tuấn, 39 |
| Difficulty | Easy | Easy | Hard | Hard | Hard |
| Loan type | Secured | Secured | Unsecured | Secured | Secured |
| Request | 500M / 60 months | 700M / 180 months | 500M / 60 months | 450M / 120 months (adjusted to 48\) | 680M / 240 months |
| Correct DTI | 58.0% | 89.5% | 66.9% | 75.4% | 74.8% |
| Correct decision | Approve | Reject | Approve | Reduce limit | Reduce limit |
| Decision if a trap is fallen for | Still Approve | Approve | Reduce or Reject | Approve or Reject | Approve |

Credit room: 2,050,000,000 VND.

## **3\. Flag matrix**

| Flag | What it covers | 01 | 02 | 03 | 04 | 05 |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| INC-VERIFIED\_MISMATCH | Stated income differs from verified (Warehouse) income, higher or lower | ● |  | ★ | ★ | ★ |
| INC-NOT\_OWN\_INCOME | Figures that look like income but are not counted: spouse income, relatives' transfers, one-off receipts, deposits, amounts advertised but not yet received | ● | ★ | ● | ★ | ● |
| INC-MULTI\_SOURCE | Several income sources or several payroll lines/allowances that must be summed |  |  | ★ | ★ |  |
| INC-NON\_MONTHLY\_PAYMENT | A stable income that is not paid monthly; the player must convert it to a monthly amount |  |  |  | ★ |  |
| INC-VARIABLE\_INCOME | Unstable income that must not be counted: per-campaign payments, a tempting average, unsigned contracts, a receipt that ends before the Adjusted tenor |  |  |  | ★ | ★ |
| DEBT-UNDECLARED | Obligations declared too low or not declared at all, compared with CIC |  | ● | ● | ★ | ★ |
| DEBT-CIC\_READING | Reading CIC correctly: card minimum payment only, closed accounts not counted, Group 2 and late payments are display-only |  |  | ★ |  | ● |
| GAME-REDUCE\_FLOW | Case goes through the Reduce limit sub-flow (player enters Max installment) |  |  |  | ● | ● |
| GAME-ROOM\_LIMIT | Approving in full would exceed the credit room |  | ● |  | ● | ● |

## **4\. Flag density**

Counts the 8 main flags (INC, DEBT, TEN); the two GAME flags are excluded.

|  | 01 | 02 | 03 | 04 | 05 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| Total flags | 2 | 2 | 5 | 6 | 5 |
| Of which ★ | 0 | 1 | 3 | 6 | 3 |

Flag density follows difficulty: the two Easy cases have few flags and the three Hard cases have more.

## **5\. What triggers each flag, per case**

| Flag | 01 | 02 | 03 | 04 | 05 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| INC-VERIFIED\_MISMATCH | Stated 38M, verified 36M. DTI 54.9% vs 58.0%, both Approve. | Match (control case). | Stated 38M, verified 40.5M. Using stated gives 71.3% (Reduce). | Stated 47M, verified 32M. Using stated gives 51.3% (Approve). | Stated about 45M, verified 15M. Using stated gives 24.9% (Approve). |
| INC-NOT\_OWN\_INCOME | Husband's salary 41M (Warehouse only). | Wife's income about 7M. Adding it gives 65.9% (Approve). | Husband's salary, brother's 3M transfer, one-off 30M research payment. | Wife's stall income, tenant deposits, farmland sale, and 12M advertised for a vacant house with no tenant and nothing received. Counting the 12M gives 54.8% (Approve). | One-off 18M insurance claim. |
| INC-MULTI\_SOURCE |  |  | Two employers, six university payroll lines plus a 2M fixed allowance at the outside job. University pay only gives 88.8% (Reject). | Pension 8M plus a second stable receipt of 24M. |  |
| INC-NON\_MONTHLY\_PAYMENT |  |  |  | A stable receipt of 72M arrives every 3 months, so the monthly amount is 24M. Reading it as monthly gives 19.3% (Approve). |  |
| INC-VARIABLE\_INCOME |  |  |  | A receipt of 45M every 3 months (15M/month) ends in 9 months, before the 48-month Adjusted tenor, so it is not counted. Stability must be tested against 48 months, not the requested 120; testing against 120 would also drop the stable 24M and give Reject. | Advertising payments are per campaign, 7 of 12 months are empty, the average of about 27.9M is a decoy, three campaigns are unsigned. |
| DEBT-UNDECLARED |  | Car loan 4.5M in CIC vs 4.0M declared. Still Reject at 87.0%. | Credit card minimum payment 2.9M not declared. Missing it gives 59.7% (still Approve). | Personal loan 4.5M not declared. Missing it gives 61.3% (Approve). | Loan 2.8M vs about 2M declared, plus a 1.4M consumer-finance plan not declared. Using the declared 2M only gives 60.1% (Approve). |
| DEBT-CIC\_READING |  |  | Use the card minimum payment, not the balance or limit (otherwise Reject). Closed consumer loan 3.2M is not counted (otherwise Reduce). Group 2 and the late payment are display-only. |  | Closed credit card, Group 2 and a past late payment are not counted. |
| GAME-REDUCE\_FLOW |  |  |  | Max loan about 383.0M over 48 months. Wrong income gives a Max installment above the original installment, so validation blocks it. | Max loan about 610.4M over 240 months. Same validation block. |
| GAME-ROOM\_LIMIT |  | Approving exceeds the room. |  | Full 450M instead of 383M adds 67.0M, over the room. | Full 680M instead of 610M adds 69.6M, over the room. |

