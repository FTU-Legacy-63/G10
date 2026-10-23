> Bản ghi pilot P7 trước phản hồi sửa UX. Hành vi khay intake, menu 11 shortcut và giới hạn khung hình trong bản này đã được thay thế. Xem [QA bản sửa 13 điểm](DISCOVERY_REFINEMENT_QA_VI.md) cho trạng thái đang chạy; giữ bảng cũ làm lịch sử kiểm chứng.

# THE CREDIT DESK — Kết quả pilot 19/10/2026

**Đã triển khai và kiểm chứng phạm vi pilot.** [Mở preview](http://127.0.0.1:5180/integration/) — save và preferences riêng. Preview đang ở Title trống, chưa tạo lượt cho người dùng. QA phá trạng thái chỉ ở 5181. Không thao tác các bản lưu ở origin 5173/5175.

50/50 automated tests đạt; typecheck, production build và content check đạt (19 originals, 8 dossiers, 168 records, 40 consequence branches). Phaser chunk >500 kB vẫn là cảnh báo build đã biết, chưa tối ưu phát hành.

Năm tranh sạch mới: title, room-r02, briefing, intake, folder; S06/S12 dùng cùng folder. Các công cụ/phòng khác dùng triển khai và art trước, vẫn đi trọn vòng. Chưa tích hợp artwork còn lại của bộ 23 concept, tám bộ nhân vật, animation hội thoại hoặc âm thanh sản xuất. Không migrate save, đổi default route, deploy hay sửa nguồn tài chính.

QA bằng Chromium của Codex in-app browser; 1920×1080, 1366×768, 1280×720, 390×844 và viewport mặc định 774×988; text100/115/130 và reduced motion theo các tổ hợp đại diện. Các hàng Pass ghi đúng phép đã quan sát/automated; không phải chứng nhận mọi tổ hợp. Safari, Firefox, screen-reader thực tế, gamepad và benchmark tải thấp/thiết bị yếu: **Not run**. C11 kiểm logic/mute/failure, chưa nghe để duyệt chất lượng. D06 là kiểm tự động, không chờ qua nhiều ngày thực tế.

Các lỗi đã phát hiện và sửa trong đợt: cảnh báo save nằm ngoài focus trap; focus opener bị mất khi bật inert; lỗi khởi tạo Phaser khi Canvas2D không có; lỗi raw JSON hiển thị kỹ thuật. Các phép liên quan đã chạy lại. Điều hướng cũng lưu owning room khi mở/trả đồ vật: đã thử R04 → intake → Title → Continue về đúng R02. Một lỗi Phaser do fault canvas trước bản sửa còn trong lịch sử console của tab cũ; fresh tab sau preflight không có lỗi, fallback dùng được.

| ID | Kết quả | Phép kiểm và quan sát | Bằng chứng |
|---|---|---|---|
| A01 | Pass | Title trống ở 5181 và preview 5180: hai action + gear, Continue disabled; QA raw=null. | title-preview-1366.png |
| A02 | Pass | Đổi 130%/reduced motion/mute ở Title, reload: giữ preferences, Continue vẫn disabled, chưa có game save. | CUA + tests preferences |
| A03 | Pass | Double click New Game: một briefing, 0/8 opened, một canvas ổn định. | CUA |
| A04 | Pass | Title Continue giữ attempt/seed/reached và working; board/copies/tab/notes/70.00 được kiểm tra qua restore và tests. Không gọi continue-case. | CUA + tests |
| A05 | Pass | Fixture unstarted: Continue đến intake, 0/8; không tên người vay, footer No active dossier. | CUA |
| A06 | Pass | Notebook note/70.00 → Title → reload → Continue: đúng notebook page, raw working còn; Back history mới. | CUA |
| A07 | Pass | Cancel, Escape và click backdrop đều về Title; attempt submitted cũ còn nguyên. | CUA |
| A08 | Pass | Chặn write rồi xác nhận New Game: còn attempt cũ, vẫn modal, có Retry/Export; Cancel + Retry giữ board/copies/worksheet. | CUA |
| A09 | Pass | JSON lỗi và dataset mismatch: Continue disabled, Export; Settings không ghi đè chuỗi raw hỏng. | CUA + restore tests |
| A10 | Pass | Chặn author-cards khi reload submitted: recovery/Retry report/Reload/Export; tắt fault + Reload dựng lại cùng report submitted. | CUA |
| A11 | Pass | Hai sentinel namespace cũ giữ nguyên bytes qua pilot edits/restart failure; automated isolation test cũng đạt. Sau đó riêng QA thay sentinel bằng valid fixtures để smoke. | protected-source-integrity.json + tests |
| A12 | Pass | Tab thứ hai chỉ Retry/Export, chưa mount engine; đóng tab chủ → Retry đọc save mới. External raw revision gây stale/Reload. StrictMode reload không treo lock. | CUA |
| B01 | Pass | R02 incoming tray mở intake dù chưa có copy; copies có đường riêng. | CUA |
| B02 | Pass | Back/Put down và 20 vòng mở đồ vật không tiếp nhận thêm hồ sơ hoặc sửa quyết định. | CUA |
| B03 | Pass | Thiếu decision/payload: Next disabled, helper cấu trúc; Resume vẫn dùng được. Worksheet trống không chặn. | CUA + validation tests |
| B04 | Pass | Save & continue double click chỉ sang case tiếp một lần; mở intake sau đó không tăng reached. | CUA |
| B05 | Pass | Chặn write tại Save & continue, nhấn liên tiếp: vẫn case cũ, raw 1,000,000 còn; Retry rồi tiếp chỉ mở một case. | CUA |
| B06 | Pass | Reached=4, review case01 → intake hiển thị case04/tail, Next disabled đến khi Resume tail; không nhầm current. | CUA + frontier test |
| B07 | Pass | Case08 Save & review double click → Review, 8/8, không tự Submit. | CUA |
| B08 | Pass | Income tab → document → Back: đúng tab, focus Open document; worksheet/note giữ sau reload; reading offsets có test restore. | CUA + persistence tests |
| B09 | Pass | Vòng thực dùng đủ năm decision; raw money/payload đúng; đổi Add conditions → Approve → Add conditions xóa covenant cũ; Secured/Unsecured và cùng loại có automated coverage. | CUA + tests |
| B10 | Pass | WH-0142 lấy copy → desk → board; paragraph vào notes có WH attribution. Thêm WH-0071 khi board đầy: chọn Replace Source 2; intake độc lập. | CUA + copy tests |
| B11 | Pass | Menu có 11 shortcut về owning object; Settings đóng về Menu rồi quay nguồn; source/folder/notebook/terminal/board/report đều mở được. | CUA |
| B12 | Pass | Return Title flush trước, write failure giữ work; corrupt recovery không Retry-save fallback. Error nằm trong modal khi có overlay. | CUA |
| C01 | Pass | 5 clean plates PNG 1672×941, hash khớp manifest; references/original assets giữ bytes; 19 input originals verified. | asset-manifest.v1.json + protected-source-integrity.json |
| C02 | Pass | R02 → đúng tray/folder/pinned briefing/notebook; focus camera cùng anchors với hotspot; Put down về owning room. | room-r02-1366.png + CUA |
| C03 | Pass | Computed title Amatic SC, text Mali; dấu Việt, số tiền và ≤/± trong Settings/source hiển thị; new route không dùng Noto. | compact-folder-390.png + CUA |
| C04 | Pass | Tại 1366: h1/Continue/New Game cùng x=183.5625; gear 48×48, triangle ở ngoài trục khi focus. | title-preview-1366.png + CUA DOM geometry |
| C05 | Pass | Settings focus vào radio checked; Shift+Tab từ Close về Back to work, Tab về Close; Escape trả Settings của Menu hoặc gear của Title; Back trả nút nguồn. | CUA; fixed focus before inert |
| C06 | Pass | ArrowLeft trong input không đổi room; room arrows chỉ ở room; modal inert và backdrop chặn tương tác nền; disabled intake không chạy. | CUA |
| C07 | Pass | 1920×1080,1366×768,1280×720,390×844; resize khi đang đọc, không document overflow ngang; compact có reader/form cuộn. | compact-folder-390.png + compact-decision-130.png + viewport evidence |
| C08 | Pass | 100/115/130% Settings, persistence, reduced motion; folder/decision 130% tại desktop và compact vẫn có action/reader. Các tổ hợp dùng đại diện, không toàn bộ cross-product. | compact-decision-130.png + CUA |
| C09 | Pass | 20 lần folder/intake/room A→B→A; một canvas cuối, không console errors. New/reload/StrictMode/close tab/reacquire đã thử. | room-r02-1366.png + CUA |
| C10 | Pass | 503 ảnh: Retry scene, HTML còn dùng được; retry thành công. Canvas2D denied: preflight bỏ Phaser, image fallback + HTML, fresh tab 0 console errors. | image-failure.png + canvas-fallback.png |
| C11 | Pass | Sound toggle/reload được kiểm tra UI; foley chỉ theo thao tác. Test muted không tạo AudioContext, denied constructor không throw/chặn work. Chưa đánh giá chất lượng âm thanh bằng nghe. | tests.tap |
| D01 | Pass | Vòng thực 8 hồ sơ: Reduce/Approve/Require collateral/Add conditions/Reject, worksheet/CIC/pin bỏ trống; vẫn Submit được. | CUA |
| D02 | Pass | Các lựa chọn sai nhưng đủ cấu trúc được giữ, không correctness cues/reference trước Submit; public projection test không chứa main/noise/answer metadata. | CUA + tests.tap |
| D03 | Pass | Cancel Submit giữ draft; tiếp tục sửa working; Confirm double click cuối vòng chỉ có một report locked. | CUA |
| D04 | Pass | Fault write cuối vòng đã chờ Retry save xuất hiện; report chưa mở. Cùng fixture tắt fault, Confirm lại: report chỉ xuất hiện sau persist. | submit-write-failure.png + CUA |
| D05 | Pass | Reload same submitted attempt; mở đủ 8 assessment qua picker; decision inputs disabled; holds04 và reserve05 còn. | submitted-case05.png + CUA |
| D06 | Pass (automated) | Test restore sau ngày khác + không auto-finalize của baseline đạt. Không dùng chờ nhiều ngày thực tế; không thêm timestamp/readiness expiry. | tests.tap — untimed attempt survives later-day restore |
| D07 | Pass | Trên 5181, valid older fixtures: / mở first dossier và continue đến02; /concept/ double continue cũng chỉ đến02; không console errors. Không mở/reset user origins5173/5175. | CUA |
| D08 | Pass | 50/50 tests; typecheck/build/source check đạt. Checkpoint P0 trước sửa và P7 sau sửa; financial/data/policy protected bytes không đổi. | tests.tap + build.log + protected-source-integrity.json |

Ảnh trong [evidence](../design/integration-pilot/qa/evidence/); [test log](../design/integration-pilot/qa/tests.tap), [build log](../design/integration-pilot/qa/build.log), [protected hashes](../design/integration-pilot/qa/protected-source-integrity.json). Bằng chứng CUA gồm quan sát UI, trạng thái fixture và log trong phiên làm việc; không lưu toàn bộ transcript vào repository. Ảnh QA có toolbar thử lỗi; preview 5180 không inject toolbar và không phục vụ `/qa/`.

Checkpoint trước sửa: `design/integration-pilot/checkpoints/P0-2026-10-19/`. Bản hoàn tất: `P7-2026-10-19/`. Rollback chỉ file thuộc pilot sau đối chiếu thay đổi người dùng; giữ namespace, không reset repository hoặc xóa save. Không còn lỗi chặn đã biết trong phạm vi đã thử.
