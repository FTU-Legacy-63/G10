**Core User Flow (happy / alternative / error paths)**

**(Owner: Dang Thi Van Trang, Nguyen Duc Minh)**

| Start | Round begins. The system loads room\_total and the dossier queue. |
| :---- | :---- |

 

| Step | What happens | Player sees / hides |
| :---- | :---- | :---- |
| 1\. Dossier screen | Player reads profile, raw financials, loan request, and NDI/DTI/Burden as bare numbers. | Band, factors, tier, correct classification all hidden. |
| 2\. Decision branch | Player picks Approve, Reduce limit, or Reject. | No reveal yet. |
| 3\. Card reveals result | Decision-Consequence Card shows the player's choice against the hidden band, which gate or flag fired, and the factor breakdown. | Everything hidden in Step 1 is revealed here. |
| 4\. Next dossier | room\_used updates; loop to the next dossier. Empty queue routes to the scorecard. | — |

 

## **Paths**

| Path | Flow |
| :---- | :---- |
| Happy (direct decision) | Player picks Approve or Reject. No amount entry. Go straight to the Decision-Consequence Card. |
| Alternative (needs input) | Player picks: Reduce limit, enters a proposed amount, system validates. Valid entry → Card. Invalid entry → inline error, retry loop, no Card shown until the input is valid. |
| Error | Invalid entry (blank, non-numeric, at or below 0, above the requested amount, above remaining room) shows an inline validation message and keeps the player on the entry field. This is a player-input error, not a dossier-data error — no dossier in the Answer Key has NDI ≤ 0, so no data-driven Reject path exists at runtime. |

