# Art Style Bible

*Tech Lead brief · Current approved integration · 22 October 2026*

Original banking-office artwork with a flat, hand-drawn 2D treatment: bold black contours, muted vintage fills, restrained depth, soft dark edges and an eerie, quiet atmosphere. Rusty Lake screenshots informed the user-approved visual direction; reference-game screenshots are not included as project assets.

![Approved R02 desk scene](../public/assets/concept-study/s02-r02.png)

Raw approved R02 plate, 1672×941. Printed edge labels are legacy placeholders covered by the live integration masks. Keep them out of the playable room view; preserve the room and object positions.

## Non-negotiable visual properties

- Front-facing room views; furniture reads through clear silhouettes and shallow tabletops. Keep useful negative space and visible furniture legs.

- Continuous dark outlines, mostly flat color and only restrained simple shadows. Wall and paper texture stay subtle.

- Retain the approved dark vignette and softly rounded corners. Keep live text and controls readable inside each illustrated work surface.

- Avoid 3D rendering, realistic wood grain, glossy materials, dramatic lighting, deep perspective, bloom and depth of field.

## Palette and typography

*Continuity is governed by the approved images, then the UI role tokens.*

### Material palette anchors

| Material role | Anchor color |
| --- | --- |
| Ink | #191817 |
| Wall | #D3D1BD |
| Paper | #F1E8CD |
| Dusty green | #94A384 |
| Blue-gray | #879794 |
| Wood | #A77543 |
| Cork | #B59A62 |
| Clay | #A77665 |
| Guide | #59735E |
| Screen | #596C62 |

These anchors come from the original concept bible; they are material roles, not a claim that every raster pixel matches a hex code. Do not recolor an approved image to force an anchor.

| Live UI role | Current value / treatment |
| --- | --- |
| Main ink / frame | #27271E / #39372B |
| Paper / light paper | #E9DDC4 / #F1E6CF |
| Neutral selection | #C6CBB0; outline and selection semantics remain visible |
| Primary action | Sage gradient #89917B → #737E63 |
| Assignment cue | Cream #F6E8C8 with dark ink contour |

### Exactly two in-game font families

**Display sample:** THE CREDIT DESK

Amatic SC Regular / Bold: title and short display headings. Never use it for long evidence, money tables or number entry.

**Body sample:** Continue · Current dossier · Nguyễn · Trần · Đặng · ≤ ≥ ± %

Mali Regular / SemiBold / Bold: dialogue, buttons, descriptions, evidence, tables, names, numbers, inputs, statuses and errors. Retain Vietnamese diacritics.

- Do not add Noto Sans or Patrick Hand to the active integration design. They belong to older implementation references.

- Respect text-size options 100/115/130%. Reflow reading areas instead of shrinking long content until it fits.

- Color must not identify the correct record, borrower risk, an accepted calculation or the correct credit decision.

## Object and room identity

*A close-up is the same physical object, not an unrelated app panel.*

| Owner | Object family | Identity to preserve |
| --- | --- | --- |
| R01 | Client + receipt folder | One current client and the small receipt station. Current artwork is a generic visual sample, not a complete eight-person cast. |
| R02 | Application folder | Kraft / cream paper, broad tab and dark clip. The decision page belongs inside this folder. |
| R02 | Notebook + copy tray | Blue-gray notebook distinct from the clay ledger; the tray holds collected copies, not a second application reader. |
| R03 | Research terminal | One coherent CRT terminal family for Warehouse and CIC. Copies remain separate from an attached assessment source. |
| R04 | Comparison board | Wood/cork surface; actual source cards and placements are drawn from player actions. |
| R04 | Rulebook + ledger | Tabbed green rulebook; clay/brown ledger used for review and submitted reports. |
| S01 | Title vestibule | Dedicated door scene distinct from R01-R04; a title backdrop, not an extra task room. |

### Space and interface composition

- Room views retain only the two plain navigation triangles at the edges. No room-name captions, persistent tool rail or outer action dashboard.

- Keep the illustrated interior detail and framed tabs, fields and buttons inside each object. Minimal outer chrome does not mean blank rooms or unframed work surfaces.

- S01 has Continue and New Game, with left text edges aligned to the title. A small custom brass/ink settings gear sits in the corner.

- Dialogue is one unboxed line at a time. Customer expression, costume and lighting never encode honesty, creditworthiness or a hidden verdict.

## Motion and asset handoff

*Neutral feedback, preserved continuity and a clear art/data boundary.*

| Interaction | Presentation contract |
| --- | --- |
| Room / surface change | One dark blink: 60 ms closing, 20 ms covered, 80 ms opening. Preload/ready and error handling remain application responsibilities. |
| Assignment reminder | Small cream arrow, 32×38 CSS px in the existing UI; 4 px bob over a 1.6 s cycle. Mali line: “Let’s take a look at your assignment first.” |
| Title scene | Subtle window light, a passing cat silhouette and an interactive door knocker. Do not add a score, countdown or decorative slogan. |
| Reduced motion | Use direct scene cuts and a still assignment arrow. Preserve the same final functional state. |
| Work controls | Neutral hover, press and keyboard focus; no correctness flashes or risk-signalling colors. |

### Raster, live UI and file conventions

- The active integration uses 17 unique approved PNG plates. Other preserved public assets support earlier routes and checks; they do not replace the current approved art direction. Some plates contain sample writing or controls; treat these as layout, never financial data.

- Actual text, fields, evidence cards, source IDs, buttons and results are live HTML/CSS over the image. Do not bake new learner facts or new answers into art.

- The title ornaments, custom settings gear, navigation triangles and assignment arrow use existing inline/code-native shapes. Runtime motion remains code-driven; this full-source package does not add a separate exported SVG icon set.

- Keep fonts with their OFL notices under public/assets/ and preserve the existing provenance manifests and public/licenses/. PACKAGING_MANIFEST.json records packaged-file hashes. These records do not grant a new artwork license.

### Acceptance checklist

Check scene identity, relative object position, readable silhouette, outline consistency, edge atmosphere, text contrast, Vietnamese glyphs, keyboard focus and 130% text. Check source attribution and pre-submit visibility separately from art. No new image generation or visual redesign is part of this package.

## Implementation references

This brief consolidates the approved screen art direction and corrections through 21 October 2026. The packaged implementation is the reference for current placement and interaction behavior.

- [Approved scene map](../src/integration/approvedArt.ts)

- [Typography](../src/concept/fonts.css)

- [Interior controls and atmosphere](../src/integration/approved-style.css)

- [Interaction refinements](../src/integration/interaction-fixes.css)

- [Title scene](../src/integration/TitleScreen.tsx)

- [Current interface specification](../docs/03_Interface_and_Design_V4.pdf)
