> Cập nhật19/10/2026: pilot này đã được thực hiện. Sau đó người dùng yêu cầu13 sửa đổi UX, đã triển khai theo [bản đối chiếu mới](DISCOVERY_REFINEMENT_QA_VI.md). R01 nhận hồ sơ, khayR02 là bản sao, menu gọn và cảnh phủ viewport thay thế các mô tả intake/menu/frame ban đầu bên dưới. Không yêu cầu duyệt lại concept hoặc thay chính sách tài chính.

# THE CREDIT DESK — Implementation plan cho bản tích hợp thử

Phiên bản 1.0 · 19/10/2026 · Trạng thái: **đã triển khai phạm vi pilot và kiểm chứng**. Xem [kết quả bàn giao](INTEGRATION_PILOT_QA_RESULTS_VI.md); các phần sau giữ nguyên kế hoạch đã duyệt để đối chiếu.

Mục tiêu là đưa đồ họa đã chọn vào một luồng chơi hoàn chỉnh, giữ cơ chế hồ sơ/lưu/nộp đang hoạt động. Chia thành các đợt nhỏ có đầu ra và điều kiện kiểm chứng để phát hiện lỗi sớm. Kế hoạch giảm rủi ro; không phải cam kết không thể có bug.

## 1. Kết quả cần bàn giao

Một tuyến thử riêng có thể đi qua:

**S01 → New Game / Continue → S03 khi bắt đầu mới → R02 → S04 → S06 ↔ S12 → lưu/tiếp hồ sơ → R02.**

Các phòng/công cụ còn lại vẫn mở được bằng luồng hiện có để hoàn thành tám hồ sơ, review và Submit. Khi Continue một lượt đã nộp, mở báo cáo hiện có ở chế độ chỉ đọc. Đợt này không cần dựng lại toàn bộ artwork của các công cụ đó.

| Nhóm | Phạm vi đợt thử |
|---|---|
| Đồ họa ưu tiên | S01, toàn cảnh R02, khay S04, giấy S03 và một family folder dùng cho S06/S12 |
| Hệ thống tối thiểu | Entry, Menu/Settings thật, xác nhận thay lượt, lưu/lỗi lưu, focus/Back/Put down |
| Tái sử dụng | Nguồn hồ sơ, năm quyết định và validation, worksheet, Warehouse/CIC, board, review/report và engine lưu hiện có |
| Chuyển sang đợt sau | Artwork mới của S05/S07–S11/S13–S17/S20, tám bộ nhân vật, animation hội thoại, âm thanh sản xuất và tối ưu phát hành |

Các tiện ích chưa thay artwork vẫn phải dùng được và giữ đúng phòng sở hữu. Hình nhân vật mẫu tiếp tục được ghi rõ; chưa gán hình đó thành chân dung thật của tám người vay.

## 2. Baseline và các giới hạn phải giữ

- Căn cứ: Interface (19) cho nội dung cập nhật; V3 cho chi tiết; Core User Flow/GDD 1.1 và các chỉ dẫn trực tiếp của người dùng.
- Bản `/concept/` đang dùng 15 ảnh nhận ban đầu. Bộ chọn mới có 23 concept, chưa phải tranh sạch; bản sửa S04-v2, S07-v3, S17-v2, S18-v3 và S01 cuối được ghi trong [manifest đã chọn](../design/concept-study/synchronization-2026-10-19/selected-screen-manifest.json).
- Baseline kiểm tra ghi nhận ngày 19/10: 43/43 test, typecheck/build đạt; 19 tài liệu gốc không đổi. Chạy lại baseline trước khi sửa code, không coi kết quả cũ là kiểm chứng bản tích hợp mới.
- Một lượt gồm tám hồ sơ, không giới hạn thời gian; không countdown, hết hạn, tự kết thúc hoặc tự Submit.
- Không sửa dữ kiện, đáp án, policy tài chính, phép tính hoặc cách chấm để khớp ảnh. Giữ hold hồ sơ 04 và cơ sở Reserve cover hồ sơ 05.
- Trước Submit chỉ có nguồn gốc và phần người chơi nhập; không lộ đáp án/phân loại nội bộ/tín hiệu đúng sai. Worksheet, pin và ghé CIC không thêm gate.
- Amatic SC cho title/tên phòng/tiêu đề hồ sơ; Mali cho mọi chữ và số còn lại. Không thêm Noto vào tuyến mới. Không slogan hoặc filler.
- Không sửa `old-project/`, không ghi đè ảnh nguồn, không đổi entry mặc định của các bản đang dùng.

## 3. Cách cô lập và quay lại bản ổn

| Tuyến | Origin dự kiến | Khóa lưu | Quy tắc |
|---|---|---|---|
| Bản trước | Giữ cổng 5173 | `the-credit-desk:rebuild:v1` | Không reset, nhập thử hoặc Submit |
| Bản concept hiện có | Giữ cổng 5175 | `the-credit-desk:concept-study:v1` | Giữ tiến độ và hành vi mặc định |
| Bản tích hợp thử | `http://127.0.0.1:5180/integration/` | `the-credit-desk:integration-pilot:v1` | Tiến độ riêng cho người dùng thử |
| QA phá trạng thái có chủ đích | `http://127.0.0.1:5181/integration/` | Cùng tên khóa nhưng khác origin | Chỉ fixtures/tiến độ QA; không thao tác storage của origin khác |

5180/5181 là cấu hình dự kiến; kiểm tra cổng rảnh khi triển khai. Nếu đổi cổng, cập nhật tài liệu và bằng chứng QA. Route khác nhau **không tự cô lập localStorage**; phải có cả origin và namespace riêng. Không tự sao chép bản lưu của người dùng vào tuyến mới.

Trước sửa code, tạo checkpoint có danh sách file/hash của mã đang chạy, manifest và cấu hình cần thiết. Workspace có thay đổi chưa commit: không dùng reset toàn repository hoặc tạo checkout từ HEAD rồi giả định chứa đủ bản hiện tại. Không gom archive, dependency, thư mục riêng tư hoặc bản lưu vào checkpoint.

Rollback bằng cách tắt route/profile thử và phục hồi đúng các file thuộc đợt vừa sửa từ checkpoint sau khi kiểm tra thay đổi mới của người dùng. Giữ asset phiên bản trước và namespace lưu riêng; không xóa tiến độ để chữa lỗi UI. Không triển khai công khai hoặc chuyển tuyến mặc định trong pilot.

## 4. Thiết kế thay đổi tối thiểu

### 4.1 Một engine, cấu hình trình bày riêng

Thêm profile thử vào `ConceptApp`, mặc định giữ hành vi `/concept/`. Wrapper `IntegrationApp` chọn save key, entry S01, asset registry và layout của pilot. Không sao chép nguyên ứng dụng thành hai engine hoặc viết lại reducer tài chính.

Title, Settings, Menu và xác nhận thay lượt là state trình bày; không thêm chúng vào `RoundState.view`, không tăng schema/dataset/policy chỉ để đổi đồ họa. State lớp phủ dùng một stack rõ ràng: Settings đóng về Menu hoặc Title đã mở nó; Escape chỉ xử lý lớp trên cùng.

Tách navigation khỏi asset mapping bằng registry chung cho profile: owning room/object, art revision, vùng đọc, vùng bấm, focus target, camera target và return target. Mỗi vật có một identity giữa toàn cảnh/cận cảnh. Màn hẹp dùng bố cục giấy cuộn thay vì ép nguyên desktop nhỏ lại.

### 4.2 Quyền sở hữu dữ liệu và thao tác lưu

`useGame` tiếp tục sở hữu một `RoundState` và namespace trong suốt vòng đời app. Lớp trình bày gọi action; không tự tính lại kết quả hoặc giữ một bản draft thứ hai. Không unmount/remount engine chỉ vì trở về Title hoặc mở Settings.

Phân biệt hai nút đều dễ bị gọi là Continue:

- **Continue ở S01:** đọc lại cùng attempt, không tăng `reached`, không chạy `start`, `continue` hoặc `restart`.
- **Save and continue trong hồ sơ / Open next ở khay:** validate cấu trúc, persist thành công rồi mới đổi hồ sơ. Chỉ có một nơi điều phối hoàn tất; không để cả `ConceptDossier` và `ConceptApp` cùng chạy hiệu ứng điều hướng sau một commit.

Giữ `caseId`/revision dự kiến và khóa thao tác đang xử lý để hai lần nhấp không tiến hai hồ sơ. Đổi screen/camera không được kích hoạt tiếp nhận hoặc cập nhật quyết định.

`restart` hiện trả `void`. Nếu cần báo thành công cho Title, bổ sung kết quả commit tương thích với caller cũ, hoặc quan sát attempt mới đã persist; không đóng xác nhận và hiện vòng mới ngay sau một lời gọi chưa biết có lưu được không.

### 4.3 Preferences ở Title

Trước khi có attempt, Reading/Motion/Audio lưu ở khóa riêng `the-credit-desk:integration-pilot:prefs:v1`. Đổi setting không tạo game save và không làm Continue sáng lên. Khi New Game được xác nhận, tạo attempt với preferences hợp lệ trong cùng commit đầu tiên.

Trong lượt đang mở, dùng `RoundState.settings` như hiện tại; nếu cập nhật preferences cho lượt sau thì game save vẫn là nguồn của setting trong lượt hiện tại. Lỗi lưu preferences không ghi đè hoặc xóa attempt. Continue bật dựa trên bản lưu attempt hợp lệ, không dựa trên sự tồn tại của khóa preferences hoặc `newRound()` trong bộ nhớ.

Object sounds chỉ bật/tắt đúng foley đang được nối. Có thể tái sử dụng `src/game/sound.ts` cho thao tác giấy/gỗ, mở audio sau tương tác người dùng; mute và lỗi audio không ảnh hưởng công việc. Không thêm volume, WASD hoặc remapping.

### 4.4 Một tab được quyền ghi trong pilot

So sánh revision rồi ghi localStorage như hiện tại vẫn có khe hở khi hai tab ghi đồng thời. Pilot bổ sung quyền ghi độc quyền theo **namespace**, giữ trong vòng đời instance, trước khi mount engine có thể chỉnh sửa. Dùng Web Locks với `ifAvailable`, không dùng `steal`; tab thứ hai hiện trạng thái lượt đang mở ở tab khác, Retry và Export, chưa mount bản chỉnh sửa thứ hai. Reload/unmount trả quyền; nhận quyền lại phải đọc save mới nhất trước khi cho thao tác. Không xếp hàng rồi tự tiếp tục một New Game/Submit cũ khi quyền được cấp muộn.

Giữ kiểm tra raw/revision hiện tại để phát hiện ghi ngoài coordinator. Kiểm tra khả dụng của API/secure context ngay trên origin QA; nếu thiếu thì thông báo tuyến thử chưa hỗ trợ chỉnh sửa tại môi trường đó, không âm thầm quay về hai tab cùng ghi hoặc tự đổi thiết lập bảo mật. Kiểm tra thêm StrictMode mount/cleanup, đóng tab, reload và quay lại trang để tránh giữ quyền treo hoặc callback cũ.

Đây là lựa chọn kỹ thuật cho pilot, chưa được lập trình. Cơ chế lock cùng origin, giải phóng khi callback kết thúc và tùy chọn `ifAvailable` được đối chiếu với [đặc tả W3C Web Locks](https://www.w3.org/TR/web-locks/) và [tài liệu Web Locks của MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API). Khả dụng thực tế vẫn phải kiểm trên browser/origin thử.

## 5. Hợp đồng chuyển trạng thái

### Entry và bản lưu

| Trạng thái | Hành vi bắt buộc |
|---|---|
| Đang kiểm tra save | Chưa cho Continue/New Game chạy đua với restore; không tạo attempt mới hoặc gọi ghi storage |
| Không có save | Continue disabled; New Game tạo và lưu attempt một lần, sau đó mở briefing; chưa nhận hồ sơ chỉ vì xem briefing |
| Save draft hợp lệ | Continue giữ attempt, seed, reached/current, raw input, pin/copy/board và cài đặt; khôi phục tác vụ tương ứng |
| Save đã tạo nhưng chưa mở hồ sơ | Continue về R02/khay; vẫn 0 hồ sơ đã mở theo UI, không tự nhận hồ sơ đầu |
| Save submitted hợp lệ | Continue mở report hiện có, inputs vẫn khóa; chưa cần vẽ bìa S20 trong pilot |
| Hỏng/khác version | Giữ raw save, hiện recovery/export và lựa chọn tạo mới qua xác nhận; không thay bản hỏng bằng `newRound()` ngầm |
| Trở về Title | Nếu working chưa lưu, thử lưu hợp lệ trước; thất bại thì giữ tác vụ và Retry/Export. Không gọi `retrySave()` với state phục hồi mặc định khi `recovery` đang có |
| New Game thay lượt | Xác nhận rõ, có Cancel và Export; chỉ đổi attempt sau persist thành công. Cancel/Escape/click ngoài không thay save |

Dùng `state.view` cùng dossier tab, terminal page, notebook page, selected record và reading offsets để phục hồi family tác vụ. Save cũ không phân biệt mọi cận cảnh của concept: đưa về bề mặt gốc cùng family (ví dụ folder thay vì đoán trang quyết định), giữ dữ liệu và tab đã lưu. Không lưu session Back stack; không hứa phục hồi một vị trí chưa có trong hợp đồng save.

### Khay hồ sơ, folder và bản sao

| Tình huống | Quy tắc |
|---|---|
| Khay trước hồ sơ đầu | Giấy/folder đóng không lộ danh tính; Open first dossier là hành động nhận hồ sơ đầu có chủ đích |
| Hồ sơ hiện tại thiếu quyết định/payload | Resume khả dụng; Open next disabled và giải thích lỗi cấu trúc, không kết luận tài chính |
| Hồ sơ ở cuối hàng đã mở đủ cấu trúc | Open next gọi cùng một thao tác save-before-advance như folder; hồ sơ thứ tám dẫn Review, không tạo hồ sơ thứ chín |
| Save and continue đã mở hồ sơ kế | Mở khay sau đó chỉ thấy trạng thái hiện tại; không tiếp nhận thêm lần nữa vì hiệu ứng/camera |
| Đang xem một hồ sơ cũ từ Review | `current` không đồng nghĩa `reached - 1`. Khay xác định hồ sơ ở đầu tiếp nhận bằng `reached - 1`; Resume đưa về hồ sơ đó. Khi chưa về đúng hồ sơ tiếp nhận, Next không được chạy nhầm trên hồ sơ cũ; có nhãn hướng dẫn ngắn. Review vẫn mở lại mọi hồ sơ đã tới lượt |
| Khay nhận hồ sơ / bản sao | Hotspot khay R02 mở S04. Bản sao dùng đường riêng trên bàn và khay R03/Menu; xem khay không dời copy, đổi pin hoặc thay board |
| S06 ↔ S12 | Một folder, cùng ID/tab/nội dung; đổi trang không xóa raw input. Đổi loại quyết định chỉ xóa payload của loại trước theo engine hiện tại |

Back phục hồi ngữ cảnh đã chụp: hồ sơ, tab, record/copy, vị trí đọc và phần tử mở tác vụ. Put down về owning room/vật. Back không di chuyển chứng cứ. Nếu phần tử cũ không còn tồn tại, focus về tiêu đề bề mặt hoặc hotspot tương ứng; không focus vào DOM đã bị tháo.

## 6. Tài nguyên phải chuẩn bị

Giữ concept nguyên vẹn, xuất dẫn xuất vào `public/assets/integration-pilot/v1/`; ghi manifest sản xuất riêng dưới `design/integration-pilot/`. Đây là đường dẫn dự kiến, chưa có asset sạch trong kế hoạch này.

| Family | Chuẩn chọn | Sản phẩm pilot |
|---|---|---|
| Entry | S01 cuối của người dùng | Nền tiền sảnh sạch; title/Continue/New Game bằng UI thật; gear theo nét/màu game, vùng bấm tối thiểu 44 px |
| R02 | `s02-r02.png` | Toàn cảnh sạch HUD/chữ; khay thấp/folder/notebook đúng hình; vùng bản sao thay đổi riêng |
| Briefing | S03 | Giấy/vỏ vật thể sạch, nội dung và action thật; macro lấy nguồn hiện hành |
| Intake | S04-v2 | Cận cảnh khay ngang và giấy điều khiển sạch, không lộ tên hồ sơ tương lai |
| Folder | S06 và S12 | Một folder/surface sạch dùng chung; tab, quyết định và payload do HTML dựng |
| System overlays | Bố cục S18-v3/S19 | Giấy/lớp mờ hoặc CSS tương ứng, không full-screen screenshot có nút giả |

Mỗi asset phải có ID, source/hash/revision, kích thước native, alpha nếu là layer, pivot/bounds và vùng đọc/focus/hit/camera. Khung native giữ 1672×941; dùng transform thống nhất cho art và hotspot, không kéo giãn hai hệ tọa độ khác nhau. Không coi canvas ở độ phân giải khác là lý do làm mờ chữ HTML.

Kiểm tra trước đưa vào registry: đúng identity/nét/màu, không chữ/control/numbers/HUD raster còn sót; alpha không có nền đen hoặc viền lạ; không cắt mất vật; vùng chữ đủ chỗ ở 130%. Nếu asset không đạt, giữ asset/profile hiện có và sửa dẫn xuất, không che chữ lỗi bằng patch màu tạm rồi gọi hoàn tất.

## 7. Các đợt triển khai và điều kiện qua bước

Mọi hàng dưới đây đều **chưa bắt đầu**. Các gate là kiểm chứng kỹ thuật, không phải yêu cầu duyệt lại GDD/concept đã được cho phép.

| Đợt | Công việc và đầu ra | Chỉ chuyển tiếp khi |
|---|---|---|
| P0 — Khóa baseline | Checkpoint file/hash, chạy test/build/source check, fixture QA và registry concept được chọn | Baseline đạt; xác định rõ namespace/origin bảo vệ; không phát sinh thay đổi nguồn ngoài phạm vi |
| P1 — Chuẩn bị art | Xuất family sạch trong mục 6; manifest, anchors và ảnh đối chiếu | Tất cả asset dùng trong pilot qua kiểm tra native/alpha/text; font thật có đủ dấu/số/ký hiệu cần dùng |
| P2 — Dựng tuyến riêng | Wrapper/profile `/integration/`, namespace riêng, quyền ghi một tab, một engine/scene, asset registry và entry/overlay state | `/` và `/concept/` giữ hành vi mặc định; mount/unmount không sinh canvas/listener/quyền ghi treo; hai tab không cùng chỉnh sửa hoặc ghi chéo save |
| P3 — S01 và lưu | New Game/Continue/Settings/replace confirmation/recovery theo mục 5; nối foley tối thiểu để toggle audio hoạt động thật | Mọi trạng thái save được thử; preferences không tạo attempt; lỗi ghi không báo Saved hoặc thay lượt thành công giả; mute đúng và lỗi audio không chặn công việc |
| P4 — R02 và S04 | Đồ vật thật, hotspot/camera focus, khay tới lượt và đường bản sao riêng | Pointer/phím mở cùng chức năng; không auto-advance, không nhầm hồ sơ cũ/head, không di chuyển copy khi Back |
| P5 — Folder S06/S12 | Dữ liệu/forms thật trên cùng folder sạch; một handler cho commit và chuyển hồ sơ | Đủ năm quyết định, raw input và đổi payload đúng; rapid click không tiến hai lần; lỗi lưu giữ current/reached và working |
| P6 — Kết nối công cụ | Menu/Help/Settings về đúng context; các phòng cũ tiếp tục hoạt động; Foley toggle thật | Không có đường cụt; nested overlay chỉ nhận input ở lớp trên; source/worksheet/board/report hoạt động, chưa cần đổi art toàn bộ |
| P7 — Kiểm chứng và bàn giao | QA toàn vòng trên origin thử; ảnh desktop/compact, log lỗi, manifest thực dùng và notes | Không còn lỗi chặn; regression baseline đạt; có bằng chứng và danh sách giới hạn còn lại |

Nếu đợt nào chưa đạt, sửa tại đợt đó hoặc quay về checkpoint gần nhất. Không tiếp tục tích hợp thêm screen để che lỗi lưu/điều hướng đang có. Ghi kết quả gate bằng Pass/Fail/Not run và bằng chứng; số lượng test tăng không tự chứng minh đã qua gate.

Ánh xạ kiểm tra chính: P0 dùng baseline; P1 kiểm manifest/asset; P2 dùng A11/C09/C10/D07; P3 dùng A01–A10/A12/B12/C04/C05/C11; P4 dùng B01/B02/B06/B10/C02/C06–C08; P5 dùng B03–B05/B07–B09/D02; P6 dùng B11/C05/C10/D07; P7 chạy toàn bộ checklist và regression. Một ID xuất hiện lại khi thay đổi mới có thể ảnh hưởng tới nó; không chạy lặp không có lý do.

## 8. Bản đồ file dự kiến

| Vị trí | Thay đổi dự kiến |
|---|---|
| `src/main.tsx` | Thêm lazy route chính xác `/integration/`; giữ các entry khác |
| `src/integration/IntegrationApp.tsx` | Wrapper chọn profile/namespace; không chứa engine tài chính khác |
| `src/integration/profile.ts`, `assetRegistry.ts` | Cấu hình pilot, asset version/anchors/owning objects; không hardcode đáp án hoặc case facts |
| `src/integration/useSaveOwner.ts` | Quyền ghi theo namespace, feature detection và vòng đời acquire/release; không ghi đè tab khác |
| `src/integration/TitleScreen.tsx`, `IncomingTray.tsx` | Presentation entry/intake, actions đi qua application adapter |
| `src/integration/SettingsDialog.tsx`, `integration.css` | Settings/overlay, typography, responsive và focus |
| `src/concept/ConceptApp.tsx` | Nhận profile mặc định tương thích; điều phối entry, tray, navigation/commit một nơi |
| `src/concept/ConceptDossier.tsx` | Bỏ việc điều phối chuyển hồ sơ trùng; giữ tab/reader/working và callback rõ |
| `src/concept/ConceptBackground.tsx` | Camera/fade theo cùng tọa độ, preload và xử lý lỗi/race; giữ fallback và cleanup |
| `src/application/useGame.ts` | Chỉ mở rộng kết quả commit/entry-save nếu cần; giữ kiểm tra stale, save-before-advance và save-before-report |
| `src/game/sound.ts` | Tái sử dụng foley và mute, không sinh âm thanh báo đáp án |
| `tests/` và QA evidence | Thêm kiểm tra hợp đồng mới theo rủi ro; giữ các test tài chính và hash gốc |

Tên module có thể gộp khi triển khai để tránh chia nhỏ vô ích; trách nhiệm và gate không đổi. `src/domain/finance.ts`, dữ liệu `src/content/`, input originals và schema/policy version không thuộc phần sửa của pilot. Nếu diff chạm các phần đó, dừng để xác định nguyên nhân và đưa ra thay đổi tách biệt; không sửa lẫn với mỹ thuật.

## 9. Kiểm tra, lỗi chặn và bàn giao

Danh sách kịch bản thao tác ở [QA checklist](INTEGRATION_PILOT_QA_CHECKLIST_VI.md). Tập trung kiểm tra hành vi người chơi quan sát được và dữ liệu trước/sau; không viết test chỉ so tên class hoặc lặp lại chi tiết implementation.

- Sau mỗi đợt code có ảnh hưởng: chạy kiểm tra hẹp liên quan. Chạy bộ regression/build sau thay đổi entry, save hoặc navigation chung và trước bàn giao.
- Thử lỗi bằng fixture/storage adapter và request chặn asset trên **QA origin**; không làm hỏng bản lưu người dùng để chứng minh recovery.
- Mở/tắt màn nhiều lần, chuyển nhanh A→B→A, reload khi đang đọc/nhập/submit, double click, hai tab; kiểm tra không stale callback, không lỗi canvas/focus và không tăng reached sai.
- Desktop 1280×720, 1366×768, 1920×1080; compact 390×844 và resize giữa chừng; 100/115/130%, reduced motion. Tọa độ ảnh có thể dùng normalized anchor; nội dung đọc/form phải tự bố trí, không chỉ scale font theo ảnh.
- Chrome/Chromium là mức bắt buộc của pilot; ghi rõ Safari/Firefox/screen reader đã thử hay chưa. Không gọi pilot là đã chứng nhận phát hành đa trình duyệt.

**Lỗi chặn bàn giao:** mất/ghi đè tiến độ; New Game/Continue sai lượt; skip/reveal hồ sơ tương lai; double-advance/Submit; report mở trước lưu thành công; sửa được lượt đã nộp; nhập bị phím phòng cướp; modal không thoát được; che mất control/nội dung bắt buộc ở viewport mục tiêu; background lỗi khiến không tiếp tục công việc; hồi quy route cũ; thiếu/mất glyph dữ liệu thực.

**Có thể ghi nhận cho đợt sau:** polish animation, audio sản xuất, artwork các phòng chưa đổi và chân dung mẫu còn nhãn. Không dùng mức này để hạ lỗi có ảnh hưởng dữ liệu, đọc hay thao tác.

Bàn giao gồm URL thử/origin/namespace thực dùng, danh sách asset đã thay, checklist có kết quả và ảnh, kết quả test/build/source integrity, các giới hạn còn lại và checkpoint rollback. Chưa chuyển entry mặc định, migrate tiến độ hoặc triển khai công khai trong pilot.

## 10. Tài liệu đi kèm

- [Kiểm kê trước tích hợp](../design/concept-study/synchronization-2026-10-19/AUDIT_VI.md).
- [Bộ concept đã chọn](../design/concept-study/synchronization-2026-10-19/README.md).
- [Art Style Bible v1.5](../design/SCREEN_ART_STYLE_BIBLE_VI.md).
- [Kiến trúc phòng/screen](../design/SPACE_AND_SCREEN_ARCHITECTURE_VI.md).
- [Implementation notes hiện tại](IMPLEMENTATION_NOTES.md).
- [QA checklist cho pilot](INTEGRATION_PILOT_QA_CHECKLIST_VI.md).
