# Assignment entry cue — 21 October 2026

The user approved the proposed small R02 arrow and changed the reminder to “Let’s take a look at your assignment first.” Only `src/integration/DiscoveryApp.tsx` and `src/integration/interaction-fixes.css` change runtime behavior/presentation.

The existing description was a direct span inside `.cs-hotspot`, whose screen-reader label rule clipped it to 1×1 px. The visible cue now overrides that rule with a specific class. It retains the existing button name and `aria-describedby`, does not intercept pointer input and replaces rather than duplicates the assignment's generic triangle.

| Check | Result |
| --- | --- |
| New Game → R02 | Exact approved line and one arrow visible without hovering |
| Leave R02 before reading → return | Cue remains |
| Enter on assignment → Back | Instructions open; cue is absent on return |
| Return to title → Continue, unsubmitted | Cue appears again for the session |
| Reduced motion setting | Arrow animation computed as `none` |
| 130% text | Label remains readable and in viewport; narrow screens wrap naturally |
| 1280×720, 1366×768, 1920×1080, 390×844 | Cue stays in bounds and anchored above the assignment; arrow remains 32×38 CSS px |
| Complete disposable fixture → explicit confirmed Submit → reload/Continue | R02 loads with no new-assignment cue |
| Console | No relevant warnings/errors observed |
| Existing test suite | 70/70 pass |
| Production build | Passes; existing Phaser chunk-size warning remains |
| Protected source/art files | All 81 hashes recorded before editing remain unchanged; build content check also verifies original inputs |

Browser validation used the available Computer Use browser API against the disposable local origin `http://127.0.0.1:5181/integration/`. A separate Browser plugin/skill was not listed. The public Vercel tab and user local origins5180/5173/5175 were not used for destructive testing. No additional browser dependency was installed. OS reduced-motion handling has explicit CSS in addition to the existing hook, but only the in-game reduced-motion setting was manually exercised in this pass. Safari/Firefox were not manually tested.

Screenshots:

![R02 entry, 1280×720](../output/qa/assignment-cue-2026-10-21/r02-entry-1280x720.jpg)

![R02 entry, 390×844, text130%](../output/qa/assignment-cue-2026-10-21/r02-entry-390x844-130.jpg)

The deployable artifact contains `dist/` plus the existing static Vercel routes only. Workspace/input archives are excluded. See [deployment details](VERCEL_DEPLOYMENT.md) for the shared URL.
