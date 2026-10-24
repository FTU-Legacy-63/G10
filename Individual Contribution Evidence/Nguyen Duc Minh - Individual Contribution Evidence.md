# **Nguyen Duc Minh — INDIVIDUAL CONTRIBUTION EVIDENCE**

**Course:** Technology Applications in Banking and Finance (NHA408E) — FTU 2026  
**Project:** The Credit Desk  
**Member:** Nguyen Duc Minh  
**Student ID:** 2412560029  
**Main Role:** Tech Lead

## 1\. Role in the project

As Tech Lead, I led the technical implementation of The Credit Desk, translating the group's product requirements, credit specifications, authored evidence and approved interface designs into a playable browser application. My responsibility covered technical architecture and implementation documentation, credit-engine implementation, runtime data integration, visual asset preparation, interactive interfaces, progress storage, technical verification, preview deployment and preparation of the GitHub source handover.

I worked from the product scope coordinated by Diep Anh, the appraisal rules developed by Linh, the dossiers and sample outputs prepared by Ha, and the interface requirements developed by Trang. I was responsible for defining how these contributions would be represented, connected and verified within the application. The financial rules, case narratives and supplied designs retained their respective authorship; my contribution was their technical interpretation, implementation and integration.

The resulting build supports an untimed eight-application round, five decision categories and a shared Warehouse containing 168 records. I implemented the connected workflow from application receipt and evidence investigation to saved working, decision revision, review and confirmed submission. I also documented source conflicts and their technical implications so that unresolved financial interpretations remained explicit throughout development.

## 2\. Personal mark on the product

**Establishing a maintainable technical architecture.** I separated presentation, application state, financial calculations, content and persistence into modules with defined responsibilities. This structure made calculation and state behavior independently testable and allowed interface revisions to proceed while preserving the underlying financial and save contracts. I consolidated the current module responsibilities, screen ownership and state contracts in the Design Layers & Architecture brief included in the handover.

**Converting approved designs into functional game interfaces.** I decomposed the supplied screens into illustrated backgrounds, document and monitor surfaces, live content regions, controls and interaction targets. I prepared and mapped the selected artwork to runtime screens, handled printed placeholders through targeted masking and live overlays, and aligned functional elements with the illustrated frames. I organized the presentation into four layers: the approved scene plate, atmosphere, live work interface and system overlays. This made the responsibilities of artwork, readable content, interaction and system state explicit within the playable office.

**Preserving the distinction between procedural validity and assessment correctness.** I implemented structural input checks, public evidence projections and a separate final-report flow. Players can receive guidance on missing or malformed required inputs while case-specific reference comparisons and authored consequences remain reserved for confirmed submission. This preserves the intended investigation and decision-making process.

**Maintaining continuity of the player's work.** I implemented versioned local persistence, raw-entry restoration, save-failure recovery and submission guards. The integration route also uses exclusive writer ownership where supported, together with stale-state checks, to control competing writes. These mechanisms support continuation of the same compatible attempt and prevent an unsuccessful final save from being presented as a completed submission.

**Connecting physical interactions to application state.** I implemented folder, terminal, notebook, board, rulebook and ledger interactions, including attributed copies and contextual return. Reading a record, attaching it to an application and carrying its copy remain distinct operations. This gives the office objects functional roles within the evidence workflow.

**Making delivery claims verifiable.** I connected implementation decisions to source references, automated checks and recorded browser QA. I documented the preview's verified behavior alongside remaining platform and financial-content boundaries, giving the group a technical basis for demonstration and further development.

## 3\. What I actually did

1. **Defined and documented the technical architecture.** I specified the presentation layers, room and work-surface ownership, application commands, domain responsibilities, content boundaries, state model and persistence contracts. I consolidated the implemented approach in the current Design Layers & Architecture brief and documented the technical implications of conflicting source versions.  
     
2. **Established the browser application and build structure.** I set up the Phaser, React, TypeScript and Vite implementation, organized its modules, locked dependencies and configured development, content-check, test and production-build commands. Phaser presents the illustrated environment; HTML/React provides readable documents, forms and reports.  
     
3. **Implemented and verified the supplied credit logic.** I translated the group's formulas and assessment sequence into executable PMT/PV, DTI, collateral, reserve and decision-precedence functions. I implemented numeric parsing, category-specific structural validation and final numeric comparisons. My responsibility was the accuracy and consistency of the implementation against the Credit Lead's specifications.  
     
4. **Integrated the authored cases and Warehouse.** I prepared runtime representations of the eight extended dossiers, their consequence branches and the shared 168-record pool. I separated learner-visible evidence from author metadata, maintained source provenance and added source-integrity checks. I integrated the identical Warehouse supplements as one logical dataset and implemented name, age and province search.  
     
5. **Implemented the round lifecycle.** I built sequential intake, access to reached applications, optional worksheets and notes, five provisional decision paths, review, explicit confirmation and the final report. I implemented category-specific payload clearing and post-submit mutation guards while retaining relevant worksheet and note content.  
     
6. **Implemented persistence and recovery behavior.** I preserved raw entries, relevant source-reading state, carried copies and board placement across reloads. I handled failed writes, incompatible saves, stale state and submitted-report restoration. Finalization publishes the locked state only after successful persistence.  
     
7. **Prepared visual assets for runtime integration.** I analyzed the approved screen compositions, identified the artwork and functional regions required for each view, selected the appropriate asset versions and mapped them to runtime screens. I handled raster text and control placeholders with prepared image derivatives or targeted masks and live content surfaces. The implemented approach combines illustrated backgrounds, selected prepared assets and HTML interface layers while preserving the approved composition.  
     
8. **Implemented live interfaces and physical interactions.** I aligned document panes, tabs, buttons, fields and object hit regions with the illustrated surfaces and connected them to application actions. I implemented the folder, terminal, notebook, comparison board, guidebook and ledger interactions, including attributed copies and contextual Back. Subsequent refinements addressed repeated folder entry, dialogue focus, immediate structural input errors, source access and the assignment cue.  
     
9. **Conducted technical QA and regression correction.** I used automated checks and isolated Chromium playthroughs to verify calculations, state transitions, save behavior, visual integration and the complete eight-case journey. I investigated and corrected issues affecting navigation, interaction focus, compact layouts, enlarged text, reduced motion and recovery paths, with the relevant results recorded in the project documentation.  
     
10. **Delivered the playable preview.** I produced the static build, deployed the integrated preview on Vercel and documented setup, deployment, browser-local persistence and known limits. This provided a shareable demonstration of the group's combined work.  
      
11. **Prepared the GitHub source handover.** I organized the implementation source, authored runtime content, approved assets, test suite, build configuration and technical documentation into the 22 October handover package. I consolidated the current architecture and technical rendering constraints in its briefs, retaining the ownership of the group's financial content and visual direction. This supports inspection, local setup and continued development from the supplied source.

## 4\. Files, features, logic and demo parts contributed

| Contribution | My technical contribution | Result and value to the product |
| :---- | :---- | :---- |
| Technical architecture documentation | Documented the four presentation layers, room and surface ownership, module boundaries, command flow, state and persistence contracts in the current architecture brief. | Established a source-linked implementation reference for maintaining the integrated game. |
| Application architecture and build setup | Organized presentation, application, domain, content and infrastructure modules; configured commands and locked dependencies. | Provided a runnable and testable codebase with clear responsibility boundaries. |
| Credit-engine implementation | Implemented the supplied calculations, assessment order, early stops, structural validation and final comparisons. | Connected the group's credit specifications to executable decisions and report explanations. |
| Runtime content and Warehouse search | Transcribed and checked authored content, integrated one shared pool and implemented neutral record search and inspection. | Enabled evidence investigation while keeping author classifications and answer mappings outside the normal pre-submit interface. |
| Round state and finalization | Implemented sequential intake, reached-case review, provisional decisions, payload clearing, confirmation and locking. | Supported revision during the round and one explicit final submission. |
| Persistence and recovery | Implemented version checks, raw-state restoration, failed-save handling, stale-state checks and integration-route writer ownership. | Preserved compatible learner working and provided recovery when persistence could not complete. |
| Visual asset preparation and UI integration | Decomposed screen compositions, selected and mapped approved assets, handled printed placeholders and aligned live content and controls. | Converted the supplied visual designs into usable interfaces within the illustrated office. |
| Physical workspace interactions | Connected objects and work surfaces to application actions; implemented attributed copies, board placement and contextual return. | Supported a connected investigation workflow across the desk, terminal, notebook, board and reference materials. |
| Technical QA and regression fixes | Implemented automated checks, performed isolated browser QA and documented corrective changes. | Supplied verification evidence for the implemented workflow, interaction behavior and recovery paths. |
| Preview delivery | Built and deployed the static preview and documented operation, deployment and technical limits. | Enabled the group to demonstrate the integrated product through a shareable browser build. |
| GitHub source handover | Organized source, runtime data, approved assets, tests, build configuration and current technical briefs for delivery. | Provided the materials needed to inspect, run, verify and continue development of the application. |

## 5\. Evidence: documents, code and verification records

**Evidence basis:** The paths below are relative to the repository root, The-Credit-Desk/, inside the github-upload-2026-10-22 handover folder. Each referenced file or directory is present in that package. The current architecture brief is the primary documentation evidence for the implemented technical structure.

| Evidence in the delivered repository | Contribution demonstrated |
| :---- | :---- |
| [briefs/DESIGN\_LAYERS\_AND\_ARCHITECTURE.md](http://briefs/DESIGN_LAYERS_AND_ARCHITECTURE.md) | Current architecture documentation: four presentation layers, room and surface ownership, module responsibilities, command flow, state, submission and persistence contracts. |
| [briefs/ART\_STYLE\_BIBLE.md](http://briefs/ART_STYLE_BIBLE.md) | Technical consolidation of the approved art direction: runtime typography, object identity, motion, raster/live-UI separation and asset handoff constraints. This supports implementation and integration of the supplied designs. |
| [package.json](http://package.json), [package-lock.json](http://package-lock.json), [tsconfig.json](http://tsconfig.json) and [vite.config.ts](http://vite.config.ts) | Project configuration, locked dependencies and executable development, verification and build commands. |
| [src/domain/finance.ts](http://src/domain/finance.ts) and [src/domain/search.ts](http://src/domain/search.ts) | Calculation, structural validation, reference-assessment and Warehouse-search implementation. |
| [scripts/import\_content.py](http://scripts/import_content.py) and [src/content/](http://src/content/) | Source-to-runtime transcription, public/author content separation, provenance and integrity checks for the supplied data. |
| [src/application/round.ts](http://src/application/round.ts) and [src/application/objectActions.ts](http://src/application/objectActions.ts) | Draft transitions, review readiness, finalization and durable physical-evidence state. |
| [src/infrastructure/persistence.ts](http://src/infrastructure/persistence.ts), [src/application/useGame.ts](http://src/application/useGame.ts) and [src/integration/useSaveOwner.ts](http://src/integration/useSaveOwner.ts) | Save validation, restoration, save-before-transition behavior, recovery and supported exclusive writer handling. |
| [src/integration/approvedArt.ts](http://src/integration/approvedArt.ts) and [public/assets/integration-pilot/approved/provenance.json](http://public/assets/integration-pilot/approved/provenance.json) | Mapping of approved artwork to runtime screens and provenance for selected asset copies. |
| [src/concept/ConceptBackground.tsx](http://src/concept/ConceptBackground.tsx), [src/integration/approved-style.css](http://src/integration/approved-style.css) and [src/concept/fonts.css](http://src/concept/fonts.css) | Scene presentation, image fallback, live-layer placement, targeted placeholder treatment, typography and responsive work-surface alignment. |
| [src/game/](http://src/game/), [src/integration/](http://src/integration/) and [src/ui/](http://src/ui/) | Functional office interactions and live folder, terminal, notebook, board, book and ledger interfaces. |
| [tests/](http://tests/), including [tests/integration-pilot.test.ts](http://tests/integration-pilot.test.ts) and [tests/learning-support.test.ts](http://tests/learning-support.test.ts) | Automated verification of calculations, workflow, search, saves, content and asset integrity, interaction behavior and usability regressions. |
| [docs/IMPLEMENTATION\_NOTES.md](http://docs/IMPLEMENTATION_NOTES.md) and [docs/INTERFACE\_TRACEABILITY.md](http://docs/INTERFACE_TRACEABILITY.md) | Implementation history and source-to-feature mapping. The dated entries identify the stage each record covers; the architecture brief and latest implementation entries describe the current integrated behavior. |
| [docs/ASSIGNMENT\_CUE\_QA\_2026-10-21.md](http://docs/ASSIGNMENT_CUE_QA_2026-10-21.md) | Recorded Chromium verification of the assignment cue, documented layouts, reduced motion, keyboard interaction and submitted-state behavior. |
| [docs/VERCEL\_DEPLOYMENT.md](http://docs/VERCEL_DEPLOYMENT.md) and [deployment/vercel-static.json](http://deployment/vercel-static.json) | Preview deployment record, static-hosting configuration, operational instructions and browser-local progress boundaries. |
| [PACKAGING\_MANIFEST.json](http://PACKAGING_MANIFEST.json) | Recorded packaging verification, source-copy mappings and the consolidation history of the current technical briefs. |

**Playable preview:** [The Credit Desk](https://the-credit-desk-preview-2026-10-21.vercel.app/integration/)

**Verification of this handover, 22 October 2026:** npm test passed 70/70 tests; npm run content:check verified 19 unchanged originals, eight public dossiers, one 168-record pool and 40 separately stored consequence branches; npm run typecheck passed. These commands were rerun from the supplied package root. The successful production build and Chromium playthroughs are supported by the existing records; this contribution review did not repeat a production build, browser playthrough or live-deployment check.

## 6\. How my contribution connects to the final product

My contribution provides the executable connection between the group's specifications and the player's experience. The authored dossiers become readable application sources and searchable evidence; the appraisal rules become calculation and assessment modules; the approved screen designs become live interfaces; and the product flow becomes controlled state transitions with persistence and recovery.

The visual integration illustrates this responsibility. For a dossier screen, I identified the paper reading area, tab and action regions, preserved the approved illustrated frame, replaced printed placeholders with live content, and connected the controls to the current application. I then checked alignment, scrolling, focus and compact-layout behavior. This allowed the design to function with actual case content and learner input.

The decision workflow demonstrates the same integration across multiple layers. When a player selects **Reduce limit**, the interface accepts a proposed maximum installment, structural validation checks its format and public bounds, and the PV function derives the proposed principal. The draft remains editable. Reference comparison and the authored consequence are shown after confirmed submission and successful final persistence.

Evidence handling also depends on these technical distinctions. Reading a Warehouse record, attaching it to an application and carrying a copy to the desk update different aspects of the player's working. I implemented those operations explicitly so that evidence collection does not automatically establish identity correctness.

Together, these contributions support a complete demonstration: a player can investigate the supplied cases, record and revise decisions, continue compatible saved progress, review reached applications and inspect the final report.

## 7\. What I personally learned

**System correctness requires verification across layers.** I developed a broader understanding of how financial calculations depend on content selection, state transitions and presentation. I learned to verify the complete path from the authored input to the visible result, including category changes, review and report restoration.

**Visual integration is a distinct engineering responsibility.** Working with illustrated screen concepts required me to identify which elements belonged to the artwork and which required live content or interaction. I learned to evaluate composition, reading regions, layer order, input alignment and responsive behavior together, preserving the visual design while making it operational.

**Technical leadership includes managing specification uncertainty.** The rental-tax and eligible-income conflict in case 04 demonstrated the importance of separating implementation decisions from financial-policy decisions. I documented the dependency and retained a source-review hold, preserving the evidence for resolution by the responsible content owner.

**Persistence and recovery must be designed as part of the workflow.** I strengthened my understanding of save-before-transition behavior, version compatibility, write ownership and failure recovery. These concerns directly affect whether a learner can continue an attempt or trust that a submission has been completed.

**Verification evidence must support a defined claim.** I learned to connect technical statements to the checks actually performed and to distinguish automated regression coverage, browser observations and release readiness. This made the project's technical reporting more precise and useful for handover. Reviewing the GitHub package also reinforced the need to reference the files actually delivered and to distinguish current architecture documentation from earlier planning records.

## 8\. Difficulties encountered and how I handled them

**Reconciling different source versions.** Earlier materials described five cases, three decisions and a different Warehouse count. I used the active source map and integration notes to identify the governing inputs, preserved the originals and integrated the extended content without merging incompatible versions by case ID alone.

**Preparing flattened visual concepts for interaction.** Supplied screen images contained illustrated frames, sample text and control placeholders within the same composition. I analyzed each screen's functional regions, mapped the selected artwork to its runtime role and used prepared derivatives, targeted masks and live HTML surfaces where appropriate. I aligned reading areas and controls with the artwork and checked their behavior at the documented layouts.

**Preserving the pre-submit assessment boundary.** Players needed procedural guidance and access to earlier evidence without receiving case-specific correctness feedback. I separated structural validation from reference comparison and kept the authored final consequences within the confirmed submission flow.

**Maintaining context across connected tools.** Movement between sources, notebook references, the guidebook and the board required consistent return behavior. I implemented contextual navigation and relevant reader-state restoration while keeping session navigation history separate from durable saved work.

**Handling failed saves and competing tabs.** I implemented failure recovery, version and revision checks, and supported exclusive writer handling in the integration route. I used a separate local origin for destructive QA so that recovery and submission scenarios could be exercised without overwriting the existing player attempt.

**Keeping handover evidence aligned with the delivered source.** The handover contains consolidated architecture and art-integration briefs alongside the implementation, tests and assets. I aligned the contribution evidence with that structure and identified the files supporting each technical responsibility. This makes the contribution reviewable against the delivered package.

**Applying visual and usability revisions without changing protected behavior.** I integrated approved artwork and interaction corrections while checking the integrity of financial inputs, content and save contracts. Relevant verification included repeated folder entry, dialogue focus, enlarged text, compact layouts, reduced motion and error recovery.

## 9\. Advice for the next generation

1. **Establish source authority before implementation.** Record the rulebook, case set, interface specification and policy version governing each feature.  
2. **Define clear module responsibilities.** Keep financial calculations, application state, content and presentation independently inspectable and testable.  
3. **Plan the design-to-runtime conversion.** Identify backgrounds, prepared assets, live reading regions, controls and interaction targets before integrating a screen.  
4. **Preserve the learning boundary.** Provide structural input guidance while reserving case-specific correctness feedback for the agreed assessment stage.  
5. **Deliver one complete journey early.** Connect receipt, investigation, working, decision, save, review and Submit before expanding the presentation.  
6. **Verify failure paths with disposable attempts.** Exercise blocked saves, repeated actions, reloads and stale tabs without putting a real player's progress at risk.  
7. **Use reviewed expected results.** Validate implementation behavior against the group's specifications and independently checked references.  
8. **Document contribution ownership and verification scope.** Identify supplied rules, authored data and designs, explain the technical work completed, and record remaining dependencies and release checks.  
9. **Verify the actual handover package.** Ensure that evidence paths resolve within the delivered repository and that reported checks identify the source version and verification scope.

**Note on tools:** I used AI-assisted tools for technical drafting, coding, checking and iteration. My responsibility as Tech Lead was to direct the implementation, evaluate outputs against the group's specifications, integrate the resulting changes and review the supporting technical evidence.  
