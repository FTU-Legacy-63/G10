## Assignment entry cue · 21 October 2026

Implemented the user-approved visible R02 reminder: “Let’s take a look at your assignment first.” A small cream/ink arrow points at the assignment and moves vertically by 4 px on a 1.6-second cycle; Mali copy stays still and no box is added. The assignment cue overrides the hidden-label clipping explicitly; generic object pointers keep their existing styling. Settings or OS reduced motion disables the arrow animation. Existing hint lifecycle, room art, financial logic and saved attempts are unchanged.

70 tests and build pass. Isolated browser QA at5181 verified New Game/Continue, cue persistence while exploring, keyboard activation and dismissal after reading, 130% text, 1280×720/1366×768/1920×1080/390×844 layouts, and no cue on submitted Continue. No relevant console warnings/errors were observed. See [QA evidence](ASSIGNMENT_CUE_QA_2026-10-21.md). No user save on the public deployment or other local origins was modified during QA.

## Approved A+B usability improvements — 20 October 2026

User authorization: “oke vậy hãy sửa gói A và B trước đi”, following the novice playthrough review. Implementation was prepared independently under `/tmp/tcd-ab-2026-10-20/candidate`, served on5181, and only21 verified source/test files were copied into the active workspace after browser QA. Temporary Vite configuration and QA artifacts were not copied. Approved room/surface bytes, original inputs,13 protected domain/content/application/persistence files and save schema/keys are unchanged.

A: `enterFolder` distinguishes an already-open folder from an unsuccessful mutation; actual stale/recovery/busy rejection still prevents entry. Decision→Read dossier, room→reopened folder and submitted source revisits now work. Text-only dialogue focuses each new sentence and the route restores initial conversation focus after the blink. Numeric formatting/range errors use the unchanged validator but appear immediately in integration, with existing structural bounds and units. Settings labels distinguish Back to menu/title/work. Submit clears any remaining assignment cue.

B: the first case has optional in-world cues for receipt, folder, terminal and rulebook plus a short suggested next step on the folder. This derives from existing actual state; later cases and submitted cases do not repeat the first-case instructions. Application count, CIC-open/attachment state and “Required inputs complete” describe procedure, not correctness. Terminal uses public application age/province as reference, with separate attachment and copy-location status and concise help. Making a copy never attaches or confirms it.

`NotebookSource` reuses the current application, CIC already opened by the learner, and that applicant’s attached/collected Warehouse records. It does not search, verify income or infer identity. The notebook remains optional/unscored. Public field definitions and decision help link to a specific existing rulebook chapter; Back restores working, reference source and field-help focus. Notes/excerpt collection is existing functionality, now explained at the source. Saved reading offsets remain additive; reference selection/book chapter/history are transient UI state. Event-driven scroll cues appear only when content remains; compact folder actions precede the long reading region. Shared components retain older-route defaults unless the integration learning prop is supplied.

Validation:70/70 automated tests, typecheck, source-content check and production build pass. Six new regression tests cover repeat/no-op folder entry and real guards, optional first-case flow, immediate structural validation without changing financial rules, all public field explanations, attachment/copy wording and notebook source visibility. Chromium QA5181 covered New Game→assignment→receipt→research→notebook→decision→second receipt; repeated folder navigation; Enter across all dialogue lines; invalid amount→correction; selected reference/value/focus after rulebook Back; copy without attachment then explicit attachment; laptop1280×720/130% and compact390×844/130% action reachability; blocked-save remaining on the decision and successful retry; eight-case fixture review/confirmed Submit and disabled worksheet fields while submitted sources remain readable. `/` and `/concept/` loaded meaningful content without relevant console errors. IAB5180 Continue and opening the existing dossier passed with no relevant console errors; no main New Game/Submit/assessment edits occurred.

Evidence and source checkpoints: `/tmp/tcd-ab-2026-10-20/`. QA used a separate Chrome5181 session because the IAB QA origin reported another writer; the existing IAB5180 attempt was preserved. The mechanical design scan flagged only an unchanged paper accent border in `integration.css`, retained under the approved art direction. Existing Phaser chunk-size warning remains. No Safari/Firefox, screen-reader or low-end performance certification, and no independent human novice study. Group C/practice-case/narrative expansion was not implemented.

The records below are historical; this A+B section governs the latest interaction and help behavior.

## Approved entry, corners, dialogue and blink fixes — 20 October 2026

The user approved the [bug-check plan](BUG_CHECK_AND_FIX_PLAN_VI_2026-10-20.md), including submitted Continue at R02 and the dark160ms blink. Implementation was developed in an independent candidate tree served on5181; only the12 verified source/test files were copied into the active workspace after QA. No temporary Vite configuration, fixtures or generated assets were copied.

`resumeScreen` now always presents R02. Entry does not dispatch navigation/receipt actions or overwrite saved view/direction. The assignment arrow is session-only, survives leaving R02 before reading, clears on opening, and is not shown for a submitted round. Assignment ownership and Put down are R02; submitted assignment is reference-only.

`SceneBlink` predecodes scene images, rejects repeated navigation while busy, commits art/content together under a60/20/80ms dark blink, restores visibility on cancellation/timeout and offers retry after preload failure. Save-dependent actions still gate transitions. Integration opts into cut backgrounds while `/concept/` keeps its existing default fade. Reduced motion combines the setting with the OS preference; tabs, forms, menu and dialogue beats do not blink. Text-only dialogue measures available width and splits long sentences into sequential one-line beats without removing words; click/Enter/Space reveal or advance. Top-edge shading is continuous, with no unequal rectangular corner patches, below controls; supplied art bytes/layouts are unchanged.

Validation:64/64 tests, typecheck, content integrity and candidate plus active production builds pass. All19 inputs and13 protected core files retain hashes. Chromium5181 checks covered draft/submitted/new entry, cue/Back, four rooms and work surfaces, desktop sizes1280×720/1440×900/1920×1080, compact390×844 at130% text, dialogue hover/keyboard, reduced-motion setting, eight-case review fixture through explicit Submit, failed New Game/Submit saves, image failure/retry and Canvas fallback. Slow-loader cancellation/races and latest reduced-motion retry are covered by injected unit tests. `/` and `/concept/` smoke checks passed. Actual5180 Continue enters R02 with cue and no relevant console errors; no user reset/Submit/data edit occurred. Evidence lives outside the repository at `/tmp/tcd-fix-2026-10-20/`.

Limits: OS preference subscription is implemented but OS settings were not forced during browser QA; no throttled-network timing certification, Safari/Firefox or release certification. The existing Phaser chunk-size warning remains. Earlier sections below record previous stages; their direct-S03 opening and saved-context entry rules are superseded here.

## Approved illustration restoration — 20 October 2026

The user rejected the later empty art and asked for the original Rusty Lake inspired atmosphere, a real starting assignment and finished interior controls. `approvedArt.ts` explicitly selects the original four room illustrations and individual S06/S08/S09/S10/S11/S12/S13/S15/S16 surfaces. Selected S03, S07-v3 and S17-v2 are copied byte-identically into `public/assets/integration-pilot/approved/`, with source/hash provenance and an integrity test. S01 keeps its prior live-lettering derivative of the approved door composition. The eleven later v2 clean regenerations and the `originalInterior` masked overlay are no longer used by this route. No image generation or original-art overwriting occurred.

`approved-style.css` restores edge vignette, ink frames, muted sage/paper states and clear hover/press/focus feedback. Real content replaces printed placeholders within each illustrated paper/CRT region; masks hide baked outer menu/save glyphs, never functioning controls. S13 register/allocation are aligned to the original binding. Folder layout retains framed tabs, a scrolling reading pane and the three existing right actions. Compact layouts reflow on paper with the same original art dimmed behind them. Outer navigation stays borderless triangles; no toolbar/room labels are reintroduced. The camera reset no longer briefly enlarges live text on entry to a close-up.

S03 is the first screen for New Game and unstarted Continue, without implicitly receiving a dossier. It states the credit officer assignment, all eight applications, evidence sources, decision/review/confirmed Submit steps and no time limit. Started Continue resumes existing saved context; the pinned desk letter lets the player reread the assignment. The green physical rulebook opens S17 with nine public-guide sections and a practical Start here page. Existing financial content and unresolved source holds remain untouched.

Validation: 56 tests pass; production build/typecheck/content check pass. All 19 originals and 13 protected domain/content/application/persistence files retain hashes. In-app Chromium QA on5181 covers New Game, unstarted Continue, receipt, folder/document/worksheet/decision, 130% text at1280×720, rules/book pointer, board, an eight-dossier review fixture through explicit confirmed Submit and both report views, plus390×844 responsive checks. No relevant browser errors were recorded. QA screenshots/logs are outside the repository under `/tmp/credit-approved-style-qa/`. The existing Phaser chunk warning remains; Safari/Firefox and release certification were not tested in this correction. User attempts on5180/5173/5175 were not reset or submitted.

The sections below are historical. In particular, their clean-edge/blank-v2-art statements are superseded by the restoration above.

## Historical partial correction — 19 October 2026

The user clarified that only redundant outer toolbars should be removed. The previous discovery iteration went beyond that instruction by flattening controls and replacing work-surface layouts; its visual changes were rejected. Current `/integration/` inherits the existing concept.css interior styles again: framed tabs, document pane and original right-side actions; framed decision choices; notebook/monitor surfaces; former review/report and guide layouts. Room interiors use untouched original supplied illustrations with only the outer UI area excluded; the cleaned plates supply those edges. No artwork was regenerated or overwritten in this correction. Folder sizing/grid/word wrapping are targeted overflow repairs, not a new layout. There is no global button border/background reset.

Specifically requested functional corrections remain: R01 receives, R02 reads; tray contains copies; outer triangle navigation and Esc menu; title pointer/knocker/motion; short direct dialogue and optional rulebook pointer. Save schemas, financial/source data and the user's attempts remain unchanged. The old split-ledger/report-index and bare rulebook components are no longer mounted. Existing discovery notes/QA below are historical and do not authorize renewed interior redesign.

## Historical rejected discovery iteration — 19 October 2026

The latest user corrections supersede the pilot's intake/menu layout. `/integration/` now mounts `DiscoveryApp`, reusing the single existing `useGame` and unchanged financial/domain/content/persistence implementation. [Design decisions](../design/discovery-refinement-2026-10-19/README.md) and [13-point QA report](DISCOVERY_REFINEMENT_QA_VI.md) document actual behavior.

R01 owns explicit receipt, R02 the folder/decision/notebook and copy tray, R03 investigation, R04 board/rulebook/ledger. The next receipt derives from the latest reached dossier's structural readiness; saving that decision first returns to R01 without increasing reached. The eighth decision leads to review, never auto-submit. Room HUD/rail/captions are removed; Esc gives four general menu choices. Optional physical presentation props preserve prior route defaults. Contextual Back now also commits the terminal page, so a Back-to-Warehouse reload resumes Warehouse.

Title uses a hover/focus triangle and small brass gear, slow window light, a passing cat shadow and clickable knocker. Dialogue is three service acknowledgements as direct typewriter text. A three-step orientation and optional pointer-to-book route support beginners without exposing every tool. Eleven versioned clean plates replace baked controls/vignette; folder tabs/action regions and separate ledger pages avoid overflow/binding collisions. Art fills the viewport with two-axis scaling rather than cropping; HTML content reflows at compact widths. This is not a dedicated art set for every aspect ratio.

55/55 tests and production/source/type checks pass. Chromium UI QA exercised an eight-case round, five decisions, receipt/save/Submit write faults, copies/excerpts/board replacement and restore, menus/rulebook/title,130% text,desktop/compact layout and prior-route smoke. See the report for exact cases, evidence and untested browsers/platforms. The engine chunk-size warning remains. Existing user saves at5180/5173/5175 were not reset or submitted. Source originals and domain/content/round/useGame/objectActions/persistence bytes remain unchanged. Current customer art remains a sample, not a complete eight-person cast.

The sections below record earlier stages; they do not restore the former tray intake or menu shortcuts.

## Integration pilot · 19 October 2026

Implemented the approved pilot at `/integration/` (user preview 5180, destructive QA5181). Five native clean plates replace title/R02/briefing/intake/folder; the latter is shared by source and decision surfaces. Earlier tools/art remain functional. Amatic SC/Mali, no slogans, no new financial logic. Existing `/` and `/concept/` defaults remain.

One mounted engine owns the pilot key. Web Locks acquires exclusive ownership before mounting it; a second tab is Retry/Export only, with raw/revision guard retained. Title Continue never advances a case. Preferences before an attempt use a separate key. New Game/first acceptance/Continue/Submit save before transition. Recoverable working stays in memory on ordinary save failure; no automatic overwrite of corrupt raw. Submitted report failure has Retry/Reload/Export without unlocking. Folder and parent no longer both navigate after Continue. Incoming intake uses the reached frontier independently from selected old cases/copies. Modal opener is captured before inert; Settings returns to Menu/title focus. Session history is not serialized.

R02 station anchors drive the room camera and hotspots; Back restores tab/source/focus. Distinct folder/notebook/monitor/board/ledger components and copy attribution continue to work. Background supports retry and native image fallback; a Canvas2D preflight avoids Phaser feature probes when no rendering context exists. Audio remains procedural neutral foley with mute and nonblocking failure.

50/50 tests, production build/typecheck/content integrity and Chromium pilot QA passed within the recorded scope. See [per-ID results and remaining art/platform limits](INTEGRATION_PILOT_QA_RESULTS_VI.md). Original financial/content/reducer/persistence contract bytes match the pre-pilot checkpoint, and all nineteen input hashes remain unchanged. No old user saves were opened or reset. `/qa/` fixtures/fault scripts are development-only on5181, absent from production entry and blocked on5180. A Phaser size warning remains. No deployment/commit.

# The Credit Desk — implementation notes

## Integration pilot plan, 19 October 2026

The user requested a plan before beginning the next integration trial. The [implementation plan](INTEGRATION_PILOT_IMPLEMENTATION_PLAN_VI.md) defines eight gated batches, an isolated `/integration/` route/save namespace, initial S01/R02/intake/folder scope, recovery/rollback contracts and [QA scenarios](INTEGRATION_PILOT_QA_CHECKLIST_VI.md). These are planned changes, not runtime features. The planning task did not generate clean plates, modify game code, run new integration QA or touch saved attempts. GDD/art authorization remains in place; no repeat concept approval is introduced.

## Artwork synchronization audit, 19 October 2026

There are now 23 selected concept images covering S01–S20 with four S02 room views. S04/S07/S17 were corrected against the existing room/object identities, S18 against the actual settings contract, and the user's final S01 was preserved. See the [selected versions and pre-integration audit](../design/concept-study/synchronization-2026-10-19/README.md). These additions are not runtime-integrated or clean production plates. The original 15 concept assets and all original input files remain unchanged.

The audit identifies actual migration gaps: the R02 tray currently opens collected copies rather than S04 intake; title/Continue and finalized-cover entries are absent; the concept menu/settings do not yet implement the new S18/S19 layouts and shortcuts; concept audio is not wired; customer art remains one labelled sample; and the new art still needs clean surfaces/layers, live text/control regions, physical focus-camera mapping and responsive/focus QA. Existing progress was not opened, reset or submitted during this audit. All 43 tests, source integrity, typecheck and build passed; the existing Phaser chunk-size warning remains. These checks cover the current code, not a claim that the new screens have been integrated and browser-tested.

## Supplied-screen prototype — latest UI trial, 18 October 2026

The user's 15 generated screens now run at `/concept/`, with four separate rooms and live React controls over their supplied Phaser Canvas art. This route uses Amatic SC titles and Mali for all other text; the previous `/` entry and its stylesheet/fonts load separately. The user-supplied originals are byte-identical copies with hashes in `design/concept-study/asset-manifest.json`; image text and numbers never become financial evidence.

R01 owns optional applicant-source meetings; R02 owns the folder, original document, worksheet/notes and five decision choices; R03 owns the shared Warehouse/CIC computer and copy collection; R04 owns comparison, public rules, reached-dossier review and post-submit reports. Two occupied board spaces require explicit replacement. Direct originals route to their owning room; Back restores applicant, tab, selected record and inspected copy without moving physical evidence. Session Back history is not saved. Generic male artwork is labelled as a sample, while source excerpts retain their authored narrative and provenance rather than inventing borrower dialogue.

The prototype calls the existing rules/save engine with a separate `the-credit-desk:concept-study:v1` namespace. Its local preview and destructive QA use port 5175, leaving the user's 5173 origin and existing `the-credit-desk:rebuild:v1` attempt untouched. Continue remains save-before-navigation; Submit remains explicit, confirmed and save-before-report. New-shift UI resets only after the new attempt actually persists. Financial policies, all eight dossiers, the 168-record Warehouse and the source-review holds are unchanged.

Verified 43 automated tests, source integrity, typecheck and production build. Browser QA in Chromium IAB covered the complete eight-case round, validation, cancel/confirm Submit, locked/report recovery, source attribution, copy transfers, full-board replacement, contextual Back, keyboard tabs/room travel, 130% text, and desktop/mobile layouts. See the [concept study](../design/concept-study/README.md) for limits and images. The earlier sections below describe the implementation retained at `/`; their task menu, audio, camera timings and older art do not describe the separate concept trial.

18 October 2026 · Interaction revision following the user's report that the illustrated build felt like disconnected screens over backgrounds. Both Interface (19) and V3 remain active; (19) governs conflicts. Financial rules and all 19 input originals remain unchanged.

## Current physical workspace

The room now contains direct object hit regions rather than permanent floating task pills. Hover or keyboard focus reveals the object label. Opening a folder, notebook, terminal, board, ledger or rulebook moves the camera toward its owning station. Putting it down returns to that station and restores focus to a room object. Direction changes use a 280 ms crossfade; station focus uses a 420 ms eased crop/zoom. Explicit reduced motion and the OS preference remove these transitions. All four original office plates stay within frame bounds at narrow, desktop and ultrawide sizes.

Each object has a different live surface: a tabbed application folder, ring-bound assessment notebook, research monitor with bezel and stand, corkboard with paper cards, round ledger, and two-page rulebook. The universal workspace frame and left task rail have been replaced. A physical-object tray retracts on desktop and reveals on hover/focus; it stays visible on compact screens. Menu provides equivalent direct routes without requiring visual object discovery.

A working evidence loop is implemented: open a Warehouse record → Take a copy to the desk → inspect that attributed paper alongside the optional worksheet → Pin copy to board → arrange two source cards → Open original → return through the same work context. Internal Back restores the originating applicant, source tab, selected Warehouse record and carried copy. Direct room/tray/Menu travel starts a new context. The navigation history lasts for the current browser session; saved current readers, reading offsets, carried copy, notes and board positions survive reload.

The board accepts pointer drag, arrow keys on its handle, or four explicit movement buttons. Positions are normalized and clamped; compact layouts stack the same sources for reading. Two independent source readers, explicit replacement/unpin and per-case notes remain. Only reached applications, explicitly opened CIC and opened/pinned Warehouse records are offered. Excerpt collection copies selected source text or a complete paragraph into the existing unscored notes, with attribution. It never extracts an answer, computes income or confirms a correct match.

Neutral synthesized paper, keyboard, wood and tack sounds are triggered by user actions and can be muted through Object sounds. These are procedural development foley, not recorded production audio or correctness feedback. Source text, amount input and all five decision categories retain their original meaning. The fixed macro and applicant identity stay visible. At ≥1600 px, source and worksheet sit side by side; compact layouts switch between them and scroll through source and decision without overlap. All financial text remains live HTML with Vietnamese glyph support and reading sizes up to 130%.

This remains a 2D/2.5D illustrated development build: four separate views with controlled camera framing, not a continuous 3D room or a reproduction of Roottrees. Existing prop inconsistencies need environment art cleanup. The supplied trailer was inspected for affordances; its extracted frames are study-only and never shipped in the game. See [interaction study](../design/interaction-study-2026-10-18/README.md) and [source traceability](INTERFACE_TRACEABILITY.md).

## Adopted direction

Phaser 4.2.1 presents the office. React and semantic HTML/CSS present reading, forms and reports; Vite builds a static browser application. Dependencies are exact and locked in `package-lock.json`. This is newly written code; the archived application is not imported.

The current build uses four original illustrated plates, replacing the earlier G1 geometric blockouts. Canvas rendering remains selected for the office presentation. WebGL renderer/extension/context-loss behavior, performance on target machines and other browsers still require a later rendering spike. No WebGL or screen-reader compatibility claim is made from this build.

## Implemented journey

Start inside the office; read the briefing; reach eight dossiers sequentially; read application/loan/collateral sources; explicitly Check CIC; search one shared 168-record Warehouse; inspect/pin records; compare two sources; keep per-case notes and an optional worksheet; select five decision categories; enter their required amount/covenants; review reached dossiers; cancel or confirm one final Submit; revisit the locked report or begin a new attempt.

A shift is untimed. No timestamp, remaining time or expiry participates in progression, readiness, grading or save restoration. A compatible saved attempt resumes without a gameplay deadline.

## Source boundaries and temporary choices

| Topic | G1 treatment | Release boundary |
|---|---|---|
| Original material | 19 manifests checked by SHA-256; never changed. Public A sources and four Warehouse columns are transcribed offline; internal B/D cards stay separate | Runtime browser never parses or displays original author tables |
| Eight-case content | Extended (13), paired with full-product matrix (15); one deduplicated (17) pool | Five-case baseline is not imported |
| Case 04 tax/income conflict | Full public evidence remains readable, and a learner can complete the file. Its reference comparison and consequence are held for source review after Submit | Resolve tax allocation and eligible-income basis before grading/releasing this case |
| Capital after Reduce | Case 05 is Clear under both source-described bases; the numeric Reserve cover is withheld with an explicit source-review note | No general original-versus-reduced debt-service policy is invented |
| Planned room | Sum current learner allocations: original principal for Approve/conditional decisions, learner-entry PV for Reduce, zero for Reject. Partial allocation is labelled incomplete; no over-budget Submit gate | This adopts the GDD's engineering proposal for the first playable, not a newly certified financial room policy |
| Rounding | Full precision in calculations; display whole VND. No silent PV clamp at the displayed EMI cap | General room/reference rounding remains to be settled |
| Optional malformed working | Preserve raw text, show a format message, do not add a mandatory completion/Submit gate; report “Not comparable” | This is an explicit G1 provisional behavior for I11, not closure of the source issue |
| Unsecured collateral choice | Remains selectable as a wrong-but-structurally-valid choice. Re-appraisal covenant remains Secured-only | I09 remains an explicit product policy to finalize |
| Search semantics | Distinct query tokens match whole name tokens, without a case filter; optional exact age/range/province combine with AND. Optional one edit per token; exact before fuzzy, stable seeded hash ties | No prefix search or relevance score/answer cues. No noise-record eligible-income totals are invented |
| Feedback | No live grading. Seven reference headlines are computed from transcribed facts; 04 is held. Selected authored consequence branch appears only after successful final persistence | Matrix stars/density are never scores. Case-07 trap annotation is not copied into runtime facts |
| Assessment protection | Separate public projection and lazily loaded report content | Static files remain technically inspectable; this is not a secure examination system |

## Save and submission behavior

The new namespace is `the-credit-desk:rebuild:v1`, bound to schema, content and policy versions. Preserve raw same-category text, notes, source tabs, search seed, pins, reading positions and text settings. Additive fields store the carried desk copy, normalized board positions and sound setting; absent fields in old saves restore safe defaults without discarding the attempt. Switching categories clears only the old category payload. Future-case working and incompatible saves are rejected with recovery/export/new-attempt choices.

Save failures preserve current in-memory working and show an unsaved warning; Continue and final submission require a successful write. The final candidate is never published into live state until persistence succeeds. Repeated confirmation is guarded. Reloading a submitted attempt reconstructs its report from frozen inputs and versioned source data, rather than trusting a stored derived result. After lock, working mutations are rejected in the application reducer as well as disabled in UI.

A newer save in another tab is detected through both the storage event and a check before writing. That tab is stopped from overwriting newer progress. Browser-local storage has no atomic cross-tab compare-and-swap: perfectly simultaneous writes remain a risk to address before release. Cross-device sync and backend services are outside this build.

## Interface and graphics boundary

UI (19) is primary; V3 provides supporting spatial, screen, source-reading and restoration details. Original application narrative is retained verbatim, with additional source tabs pointing to intact original paragraphs. No source facts, borrower dialogue, financial clues or consequences are invented to fill the room. Decorative quotes and slogans remain prohibited.

Borrower portraits/meetings, final environment continuity, recorded foley/music and broader release validation remain incomplete. Static bundled report data is technically inspectable: this is a teaching game, not a secure examination system. Canvas behavior is exercised here; WebGL, other browsers and screen readers are not certified.

## Verification, 18 October 2026

Eighteen automated tests pass: prior calculation, structural validation, untimed round, source protection, draft/lock/search and save checks, plus additive workspace-save migration, frame bounds and originating work contexts. The build verifies all 19 original hashes and succeeds; the known large Phaser bundle warning remains.

Browser QA uses a separate origin on port 5174. Observed 1280×720, 1366×768, 1920×1080 and 390×844 including 130% reading. Exercised room objects, distinct close-ups, copy-to-desk/board, original-source Back with applicant/tab/copy context, pointer drag and movement alternatives, saved board positions, attributed paragraph collection, reload restoration of raw worksheet/decision/copy/notes, and rulebook pages. A compact-layout source/decision overlap was found and fixed with intrinsic document sizing and a saved outer scroller.

Completed all eight dossiers with all five decision categories, optional blank/unvisited/unpinned files, category-payload clearing and a 4,813,802,689 VND plan above the provisional 4,590,000,000 VND room. Cancel/confirm Submit, final report reload and disabled final working remain correct. No app console errors were observed. Sound mute persistence was exercised; headphone/listening assessment was not performed. Browser selection-to-excerpt collection still needs dedicated selection QA; the keyboard/button paragraph path was verified.

The user's attempt on port 5173 must remain intact; never reset or submit it for QA. No public deployment, Git commit, cross-browser, screen-reader or performance certification is implied.

Final user-preview smoke check: port 5173 reloaded into the new monitor surface with the same case 01, 1/8 reached, blank Warehouse search and saved-status indicator. No reset, decision entry or submission was performed on that origin; no app console errors were observed. The room’s visible evidence-copy button was separately checked on port 5174 and opens the actual attributed desk paper.
