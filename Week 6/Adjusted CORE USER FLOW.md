**Core User Flow (happy / alternative / error paths)**

**(Owner: Dang Thi Van Trang, Nguyen Duc Minh)**

| Start | Round begins. System loads `room_total` (1,600,000,000 VND) and the five‑dossier queue (KHCN‑01 to 05). |
| :---- | :---- |

 

| Step | What happens | Player sees / hides |
| :---- | :---- | :---- |
| 1\. Dossier screen | Player reads the narrative, identifies Income (netting turnover/costs where the applicant is self‑employed), notes self‑declared existing obligations and the Bank‑system‑note installment. Optional: Check CIC — reveals CIC‑verified obligations, does not lock. | Adjusted DTI, verification tier, Adjusted Income, CIC‑verified obligations, band, and classification all hidden. |
| 2\. Decision branch | Player computes DTI \= (Existing obligations \+ Estimated Monthly Installment) ÷ Income themselves and compares it to the 70%/80% lines. | System's own DTI still hidden. |
| 3\. Decision | Player taps Approve, Reduce limit, or Reject. The tap is immediately final for all three.  | — |
| 4a. Direct confirm (Approve/Reject) | No amount entry; goes straight to confirm & lock. | — |
| 4b. Amount entry (Reduce limit only) | Player computes and enters Max installment \= 70% × Income − Existing obligations, using figures already visible. No new field is revealed at this step. | — |
| 5\. Card reveals result | Decision‑Consequence Card shows the system's own DTI, the correct classification, and — for Reduce limit — how close the player's entered figure was. | Everything hidden in Step 1 is revealed here. |
| 6\. Next dossie | `room_used` updates; loop to the next dossier. Empty queue routes to the scorecard. | — |

 

## **Paths**

| Path | Flow |
| :---- | :---- |
| Happy (direct decision) | Player picks Approve or Reject. No amount entry. Tap is final, straight to confirm & lock, then the Card. |
| Alternative (needs input) | Player picks Reduce limit → enters a proposed Max installment (no reveal step) → system validates → Card. |
| Error | Invalid Reduce‑limit entry (blank, non‑numeric, at or below 0, above the original Estimated Monthly Installment) shows an inline validation message and keeps the player on the entry field. Player‑input error, not a dossier‑data error. |

