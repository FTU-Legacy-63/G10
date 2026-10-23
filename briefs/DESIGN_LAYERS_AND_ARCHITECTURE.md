# Design Layers & Architecture

*Tech Lead brief · Browser-first implementation · 22 October 2026*

The current playable uses Phaser 4.2.1 for illustrated scene presentation and React/TypeScript HTML for accessible reading, controls and application state. Vite produces a static browser build. The active experience is /integration/.

## Four presentation layers

| Layer (front to back) | Responsibility |
| --- | --- |
| 04  System overlays | Menu, settings, confirmation, blink, loading and recovery |
| 03  Live work interface | React/HTML: objects, text, fields, cards and navigation |
| 02  Atmosphere | Soft vignette / curved edge treatment; ignores pointer input |
| 01  Approved scene plate | Phaser Canvas image; DOM image fallback when unavailable |

The scene plate is presentation only. Financial content and actions belong to live controls; atmosphere never captures input. Modal ownership, inert states and focus restoration prevent actions leaking into the screen underneath.

## Separation of concerns

- Art identifies the physical object. Hotspots identify where to interact. Live reading/form components express what the player can do.

- Room and surface navigation are presentation state. Case decisions, notes, evidence copies and placements are round state.

- Keep folder, notebook, terminal, source paper, board, rulebook and ledger surfaces distinct. Avoid a universal work frame.

## Spatial and screen architecture

*Four work rooms; source pages and dialogs do not create more rooms.*

| Space | Physical responsibility | Screen / surface family |
| --- | --- | --- |
| S01 | Unique title vestibule | Continue, New Game and small Settings gear; separate from the four task rooms. |
| R01 | Reception | Receive the next application and speak briefly with the client. Receipt does not open the dossier reader here. |
| R02 | Desk | S03 assignment; S06 folder; S07 document/copy; S10 notebook; S12 decision. |
| R03 | Research | S08 Warehouse and S09 CIC on the research terminal; evidence attachment and copy collection are separate. |
| R04 | Review | S11 board, S17 rulebook, S13 review ledger, S15 report and S16 case detail. |
| Shared overlays | System state | Submit confirmation, Settings, Esc menu, save/recovery state. Drawn as live UI, not additional room PNGs. |

### Entry and contextual return

New Game and Continue enter R02. Unsubmitted attempts show the assignment reminder until the letter is opened. Leaving and returning before reading preserves it. Submitted Continue remains read-only without a new-task cue. The room arrow controls cycle through the four room views.

Back restores the prior source/work context; Put down returns to the owning room. Preserve applicant, source tab, selected record and reading context. Transient navigation history is not a saved feature.

### Anchor contract

Reference frame: 1672×941. R02 assignment hotspot: left 35.5%, top 34%, width 7%, height 16%; folder: 35.5%, 56%, 11%, 13%; notebook: 48.5%, 56%, 9%, 13%. These anchors come from the current implementation, rather than estimates from a screenshot.

The current stage fills the viewport; approved art and live layout scale together. Reflow close-up reading on narrow screens and keep controls inside safe bounds. Room labels and redundant outer toolbars remain absent.

## Application architecture

*Keep presentation, state transitions, validation and persistence explicit.*

| Responsibility | Current implementation boundary |
| --- | --- |
| Route + save ownership | main.tsx selects the integration experience. IntegrationApp.tsx and useSaveOwner provide one writer per pilot save namespace through Web Locks. |
| Experience coordination | DiscoveryApp.tsx owns title/room/surface state, dialogs, contextual return, receipt routing and source-specific work views. |
| Application state | useGame.ts coordinates commands, in-memory state, saving, stale detection, new attempts and confirmed final submission. round.ts and objectActions.ts define state transitions. |
| Domain rules | domain/types.ts defines contracts; finance.ts validates structural input, financial functions and report references; search.ts handles record search. |
| Content boundary | Public dossiers and Warehouse evidence remain separate from author-side report cards. Report content is imported for final snapshot construction; artwork text never supplies runtime facts. |
| Persistence | infrastructure/persistence.ts validates and serializes versioned browser-local saves. Saved report snapshots are not trusted; submitted reports are rebuilt from frozen working and the current versioned source contract. |
| Presentation services | ConceptBackground.tsx renders approved plates with a DOM fallback. sceneBlink.ts/useSceneBlink.ts coordinate loading and transitions. sound.ts creates procedural foley through Web Audio. |

### Command and rendering direction

User action → experience coordinator → application command → validated state transition → save attempt → live UI and scene update. Navigation and source selection do not certify evidence correctness. An attached record, carried copy and board placement are separate player choices.

This is the current division of responsibility, not a claim of a backend, API service or secure answer-delivery platform. The handover includes the implementation source, content, assets and build/test configuration alongside these three briefs.

## State, submission and quality

*Preserve the learner’s work and the pre-submit answer boundary.*

### Final submission sequence

| Step | Required behavior |
| --- | --- |
| 1 · Check completeness | All eight applications reached; one decision per application; each required decision-specific input structurally valid. Optional worksheet, pins and CIC visits add no submission gate. |
| 2 · Ask explicitly | Open the Submit confirmation. Cancel retains editable working. There is no timer, expiry or automatic submission. |
| 3 · Construct final report | Build a snapshot from the learner’s frozen draft and versioned source/reference contract. Existing unresolved financial-policy holds remain explicit. |
| 4 · Persist first | Only a successful final save publishes the locked submitted state and opens the assessment report. A failed write retains editable working and a recovery path. |
| 5 · Resume safely | On reload, validate the save and rebuild the submitted report. Do not silently overwrite corrupt or stale progress. |

### Durable vs transient state

Durable: attempt/version/revision, reached/current case, drafts and raw inputs, notes/worksheet, source choices, copies, board placement and supported settings. Transient: Back stack, open modal, current assignment cue and animation phase. Browser-local progress does not sync across devices or web origins.

### Technical acceptance

- Verify the active art map, actual PNG dimensions, font glyph coverage and byte-preserving asset handoff. Keep old blank plates and legacy fonts outside the active asset set.

- Exercise New Game/Continue, receipt → reading, evidence attach vs copy, contextual return, decision changes, save failure and confirmed Submit. Check keyboard access, compact layouts, 130% text and reduced motion.

- The recorded full-source package check passed 70 tests and the production build in an isolated copy. This brief-only update does not change the runtime or repeat those checks; its verification covers document links, package inventory and unchanged game/source hashes.

Security/assessment limit: pre-submit results are withheld by the UI, but static browser bundles remain inspectable. Financial source conflicts are not resolved by layout or artwork.

## Implementation references

This brief records the current integration through the approved 21 October 2026 corrections. The GDD retains its approved v1.1 design record; the implementation references below describe the later integrated behavior.

- [Game Design Document v1.1](GAME_DESIGN_DOCUMENT_V1_EN.md)

- [Art Style Bible](ART_STYLE_BIBLE.md)

- [Current interface specification](../docs/03_Interface_and_Design_V4.pdf)

- [Experience coordinator](../src/integration/DiscoveryApp.tsx)

- [Application commands](../src/application/useGame.ts)

- [Round transitions](../src/application/round.ts)

- [Object actions](../src/application/objectActions.ts)

- [Persistence](../src/infrastructure/persistence.ts)

- [Scene presentation](../src/concept/ConceptBackground.tsx)

- [Package verification record](../PACKAGING_REPORT.md)
