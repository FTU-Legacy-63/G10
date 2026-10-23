> **Bản thị giác này đã bị người dùng từ chối vì lược giản quá mức.** Giữ tài liệu làm lịch sử; không coi các thay đổi về bề mặt giấy, bỏ khung/nút trong màn, split ledger hoặc report index là thiết kế đã duyệt. Phạm vi đang chạy giữ nội thất và UI trong từng màn như trước, chỉ sửa toolbar ngoài rìa và những điểm được yêu cầu rõ. Đọc README.md / PROJECT_CONTEXT.md cho trạng thái hiện tại.

# THE CREDIT DESK — QA bản sửa trải nghiệm khám phá

Ngày 19/10/2026. Kết quả này áp dụng `/integration/` sau phản hồi 13 điểm, thay cho hành vi incoming/menu đã ghi ở pilot P7. [Preview](http://127.0.0.1:5180/integration/) · [Quyết định thiết kế và provenance](../design/discovery-refinement-2026-10-19/README.md).

**Kết quả:** 55/55 automated tests đạt; source/content check, typecheck và production build đạt. Đã chơi thử vòng thực tám hồ sơ ở origin5181, đủ cả năm loại quyết định, tới Confirm Submit và báo cáo. Cảnh báo kích thước Phaser chunk >500 kB còn như trước; không sửa bằng cách giấu cảnh báo. Không triển khai công khai hoặc commit Git.

## Đối chiếu phản hồi

| # | Phản hồi | Thay đổi đã thực hiện / kiểm chứng |
|---|---|---|
| 1 | Incoming tray trùng folder | Bỏ intake tại R02. Khay là Collected copies: rỗng khi chưa lấy giấy, có bản sao/đặt bàn/ghim sau khi Take copy tại máy tính. Không mở hay tăng dossier từ khay. |
| 2 | Folder tràn chữ/nút | Vùng giấy riêng, header co giãn, tab hai hàng chia đều cho 7/8 tab, vùng đọc cuộn, action cuối. Đo 130% tại 1280×720, 1366×768, 1440×900, 1920×1080, 2560×1080, 390×844: không action/header/tab vượt vùng giấy và không document overflow ngang. |
| 3 | Title cần mũi tên hover | Pointer tam giác ngoài trục chữ, hover và keyboard focus; bỏ underline. Tại1440, h1 và hai action cùng x=192.953px. Pointer ẩn khỏi accessibility name. |
| 4 | Title tĩnh | Ánh sáng biến thiên, bóng mèo sau kính, vòng gõ cửa tương tác. Đã bấm vòng, quan sát ring/cat active; reduced motion cho animationName=none. Không có animation ảnh hưởng ca hoặc timeout. |
| 5 | Nút không có viền bao | Navigation là tam giác đơn, background trong suốt, border0px; hit area vẫn rộng. Action giấy dùng chữ/triangle; radio/input giữ hình thức cần để nhập liệu. Focus bàn phím vẫn có dấu nhận biết. |
| 6 | Bỏ tên/chú thích phòng | Không render cs-hud/cs-bottom/cs-object-hint trên tuyến mới; đo room chrome=0. Không còn room rail hoặc mô tả chân màn. |
| 7 | Bảng review bị che nâu | Xóa panel phủ kín bảng. Dùng cork gốc đã làm sạch; overlay room chỉ gồm giấy thực đã ghim. Computed overlay background trong suốt. Hai ID giấy đúng sau reload. |
| 8 | Menu làm mất khám phá | Chỉ Resume / Settings / How to play / Return to Title. Không có shortcut folder, worksheet, computer, board, report. Export và Full screen trong Settings. |
| 9 | Người mới không biết rulebook | Hướng dẫn đầu lượt ba bước và Show me the rulebook trong trợ giúp. Đã thử trước khi nhận hồ sơ: tới R04, dấu chỉ đúng sách xanh, focus=Read credit rulebook; sách có 9 chương public rule. |
| 10 | Cảnh chỉ hai mũi tên, Esc menu | Đã quan sát cả phòng bằng chuột/phím. Esc mở menu từ room/reader/input; ô tìm kiếm nhận ArrowLeft mà không đổi phòng. Khi đọc đồ vật có Back/Put down. Thông báo chỉ xuất hiện ngắn khi cần hướng dẫn/lỗi. |
| 11 | Hội thoại quá dài/nhiều hộp | Ba câu chào/trao folder, chữ chạy trực tiếp trên nhân vật. Click hiện hết/chuyển/kết thúc, reduced motion hiện ngay. Không có ô/topic grid hoặc toàn bộ dossier. Không tăng reached khi nói chuyện. |
| 12 | R01 đọc folder trùng R02 | R01 chỉ Talk/Receive. Mở folder R02 trước Receive đưa về R01 với chỉ dẫn. Lưu quyết định giữ reached cũ; Receive next tại R01 mới mở hồ sơ tiếp. Vòng thực đã thử tới08; worksheet/source vẫn ở owning station. |
| 13 | Đen/hụt trên dưới ở desktop | Cảnh/ảnh/Canvas bằng viewport ở1280×720,1366×768,1440×900,1920×1080,2560×1080. Không aspect frame/giới hạn1920/black letterbox; 11 plate mới bỏ vignette. Giữ đầy đủ tranh bằng co giãn hai trục; chưa có art riêng từng aspect. |

## Luồng và bảo vệ dữ liệu đã thử

| Phép kiểm | Quan sát |
|---|---|
| Vòng thực tám hồ sơ | 01 Reject;02 Approve;03 Reduce limit +1,000,000;04 Require more collateral +1,000,000;05 Add conditions +income update;06 Reject;07 Approve;08 Reject. Đây là lựa chọn QA cố ý khác đáp án, không phải gợi ý cho người chơi. |
| Frontier nhận hồ sơ | Save & meet next client sau02 giữ current1/reached2. Chặn write rồi Receive next: còn current1/reached2, có Retry/Export; phục hồi rồi nhận chỉ sang03. |
| Lưu từ folder | Chặn write sau khi nhập điều kiện05: còn current4/reached5/view dossier, quyết định chưa mất, chưa sang R01. Retry rồi tiếp được. |
| Nộp | Hồ sơ08 chỉ tới review; Submit có modal xác nhận. Chặn write tại Confirm: phase draft/view review/reached8, chưa có báo cáo. Retry + Confirm: phase submitted, báo cáo khóa. |
| Answer boundary | Trước Submit không reference/correctness cue. Sau Submit vẫn giữ hold04 và reserve-basis05. Bỏ trống worksheet/CIC/pin không tự tạo gate mới. Các public projection/financial tests đều đạt. |
| Copy / notes / board | WH-0005 Take copy → khay → desk → Save paragraph → board; ghim thêm application làm đầy hai chỗ; WH-0095 thay Source2 theo xác nhận chọn slot. Move source1 right; reload giữ hai nguồn, vị trí x10 và ghi chú có [WH-0005]. |
| Back / Continue | Warehouse → CIC → Back → reload → Continue trở lại Warehouse. Đã sửa cập nhật terminal page khi Back. Back session history không lưu vào schema. |
| Bàn phím / dialog | Menu inert nền; Settings focus vào radio đang chọn, Shift+Tab từ Close vòng về Back to work; Esc đóng. Rulebook locator chuyển focus tới chính đồ vật. |
| Title / settings | Hai action căn lề, gear góc, knock/cat; 100/130%, sound mute và reduced motion đã thao tác. Text130/motion setting còn sau reload. 115% có coverage parser/test của pilot; không tuyên bố thử mọi tổ hợp trong đợt này. |
| Regression tuyến cũ | Tại origin5181, valid QA fixtures: `/` mở được first dossier; `/concept/` mở folder và Your decision. Không lỗi console. Optional physical props giữ layout mặc định cũ. Không thử lại toàn bộ vòng cũ trong đợt này. |

## Môi trường, bằng chứng và giới hạn

Chromium trong Codex in-app browser qua cua_repl; kiểm UI bằng thao tác thật và DOM chỉ đọc. Browser plugin riêng không được cung cấp; không dùng Playwright terminal hoặc browser HTTP thay thế. Trong phiên có hai locator chạy quá sớm/trước layout và một tên heading dự đoán sai; đã đọc lại UI, nhắm đúng control và xác nhận kết quả. Đây không phải lỗi console/runtime. Console warning/error trên tab QA và hai route regression rỗng tại thời điểm kiểm cuối.

- [Ảnh bằng chứng](../design/discovery-refinement-2026-10-19/evidence/): title, folder100/130, conversation, review room, rulebook desktop/compact, menu, decision compact, ledger/report.
- [Đo folder](../design/discovery-refinement-2026-10-19/evidence/viewport-checks.json), [đo phòng](../design/discovery-refinement-2026-10-19/evidence/room-viewport-checks.json). Các measurement dùng viewport thực đo, không suy từ kích thước yêu cầu; đã chờ layout khi resize.
- [Tests](../design/discovery-refinement-2026-10-19/tests.tap), [build](../design/discovery-refinement-2026-10-19/build.log), [hash nguồn](../design/discovery-refinement-2026-10-19/protected-source-integrity.json).

Preview5180 chỉ được đọc trạng thái title; không nhấn New Game/Submit hay nhập quyết định tại đó. Save key/schema và writer-ownership cơ sở giữ nguyên. Origins5173/5175 không được mở để QA phá trạng thái. Domain, content, round, useGame, persistence, objectActions giữ hash; 19 input originals nguyên bytes. Không migrate save hoặc chốt chính sách tài chính.

Chưa thử Safari/Firefox, screen reader thật, gamepad, thiết bị yếu, chất lượng âm thanh qua nghe hoặc mọi tổ hợp aspect/text-size. Full screen button đã nối API theo thao tác người dùng; phép đo nêu trên chứng minh phủ viewport, không phải chứng nhận chế độ fullscreen của mọi trình duyệt. Cast hiện vẫn là sample, không phải tám bộ chân dung hoàn thiện. Không có lỗi chặn đã biết trong phạm vi đã thử; không coi đây là chứng nhận phát hành cuối.
