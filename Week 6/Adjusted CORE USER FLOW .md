**Core User Flow (happy / alternative / error paths)**

**(Owner: Dang Thi Van Trang, Nguyen Duc Minh)**

| Start | Round begins. The system loads room\_total and the five‑dossier queue, now scored under the Adjusted‑DTI rulebook. |
| :---- | :---- |

 

| Step | What happens | Player sees / hides |
| :---- | :---- | :---- |
| 1\. Dossier screen | Player reads profile, loan request, self‑reported income/debt, CIC group (display‑only), Estimated Monthly Installment. Optional: **Check CIC** to reveal CIC‑verified obligations — does not lock. | Adjusted DTI, verification tier, Adjusted Income, CIC‑verified obligations, band, and classification all hidden. |
| 2\. Decision branch | The player picks Approve, Reduce limit, or Reject. | No reveal yet. |
| 3a. Direct confirm (Approve / Reject) | No amount entry; goes straight to review → confirm & lock.  | — |
| 3b. Lock‑then‑reveal (Reduce limit) | Selecting Reduce limit locks the case immediately, then reveals Adjusted Income and verification tier. | Adjusted Income \+ tier now visible; classification/band still hidden. |
| 4\. Amount entry (Reduce limit only) | Player enters a proposed installment/amount using the just‑revealed figures; system validates. | — |
| 5\. Card reveals result | Decision‑Consequence Card shows Adjusted DTI, band, CIC‑verified obligations, verification tier, and the binding reason. | Everything hidden in Step 1 is revealed here. |
| 6\. Next dossie | room\_used updates; loop to the next dossier. Empty queue routes to the scorecard. | — |

 

## **Paths**

| Path | Flow |
| :---- | :---- |
| Happy (direct decision) | Player picks Approve or Reject. No amount entry. Straight to confirm & lock, then the Card. |
| Alternative (needs input) | Player picks Reduce limit → immediate lock \+ reveal of Adjusted Income and verification tier → player enters a proposed amount → system validates → Card. This is irreversible: once locked and revealed, the player cannot revert to Approve or Reject (the anti‑exploit lock). |
| Error | Invalid Reduce‑limit entry (blank, non‑numeric, at or below 0, above the original Estimated Monthly Installment, above remaining room) shows an inline validation message and keeps the player on the entry field. Player‑input error, not a dossier‑data error. |

