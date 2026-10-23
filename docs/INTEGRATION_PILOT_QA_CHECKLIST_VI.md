# THE CREDIT DESK — QA checklist cho bản tích hợp thử

19/10/2026 · Đi kèm [Implementation plan](INTEGRATION_PILOT_IMPLEMENTATION_PLAN_VI.md).

**Đã chạy pilot ngày 19/10: 50/50 automated tests, build/source check đạt.** Xem [kết quả từng ID và giới hạn kiểm thử](INTEGRATION_PILOT_QA_RESULTS_VI.md). Bảng dưới là kịch bản yêu cầu; trạng thái thực tế nằm ở tài liệu kết quả, gồm các phép tự động và đại diện trong Chromium.

Khi thực hiện, ghi từng ID: Pass / Fail / Not run, build/checkpoint, browser/viewport/text-size, fixture, kết quả quan sát và đường dẫn bằng chứng. Không đánh Pass chỉ vì đã viết code hoặc có ảnh concept. Test phá trạng thái chỉ dùng origin QA dự kiến 5181; giữ nguyên origin 5173/5175 và tiến độ preview 5180.

## A. Cô lập, entry và bản lưu

| ID | Thao tác kiểm tra | Kết quả bắt buộc |
|---|---|---|
| A01 | Khởi động pilot với storage trống | Title đúng S01, chỉ Continue/New Game và gear; Continue disabled; không game save tự sinh |
| A02 | Ở Title trống, đổi text/reduced motion/sound rồi reload | Preferences giữ được; Continue vẫn disabled; không tạo attempt chỉ vì Settings |
| A03 | Nhấn New Game nhanh hai lần | Chỉ một attempt persist, một briefing; chưa tự mở hồ sơ; không hai canvas hoặc handler |
| A04 | Có draft fixture: mở Title và Continue | Giữ attemptId/seed/current/reached/raw input/tab/pin/copies/board; không chạy hành động tiếp hồ sơ |
| A05 | Có attempt đã tạo nhưng chưa nhận hồ sơ | Continue về ngữ cảnh tiếp nhận, opened UI bằng 0; không lộ tên trước hành động mở hồ sơ đầu |
| A06 | Draft đang sửa → Title → Continue → reload | Nội dung được giữ; tác vụ trở về family/nguồn phù hợp, reading offsets/tab còn; không nhân bản lịch sử Back |
| A07 | New Game trên save có sẵn: Cancel/Escape/click ngoài | Không đổi attempt, revision, raw save hoặc nhập liệu |
| A08 | Xác nhận thay lượt, cho lần ghi save thất bại | Giữ attempt cũ và cảnh hiện tại; có Retry/Export; không báo đã tạo mới |
| A09 | Restore JSON hỏng hoặc dataset/policy không khớp | Giữ raw nguyên vẹn; hiện recovery/export; không tự overwrite bằng `newRound()` |
| A10 | Save submitted → Continue; sau đó giả lập lỗi dựng report | Thành công thì report chỉ đọc; khi lỗi vẫn giữ submitted/khóa, có đường phục hồi/export, không chuyển thành draft |
| A11 | Sửa/lưu/restart pilot với fixture ở ba namespace trong storage giả | Hai khóa cũ giữ nguyên byte; không `localStorage.clear()` hoặc migrate ngầm |
| A12 | Mở hai tab đồng thời; thử tiếp/Submit/reset; đóng tab chủ rồi Retry; fixture ghi raw ngoài coordinator | Chỉ một tab có quyền chỉnh sửa; tab còn lại chưa chạy action ghi. Retry đọc save mới nhất; không phát lại action cũ. Ghi ngoài coordinator vẫn bị raw/revision guard phát hiện; không giả định localStorage có atomic compare-and-swap |

## B. Khay, folder và điều hướng

| ID | Thao tác kiểm tra | Kết quả bắt buộc |
|---|---|---|
| B01 | R02 mở khay khi chưa có copy | Mở intake S04 bình thường; không yêu cầu lấy bản sao ở Warehouse |
| B02 | Mở khay, Back, Put down nhiều lần | Không tự tăng reached/current, không đổi decision/pin/vị trí copy/board |
| B03 | Hồ sơ thiếu quyết định hoặc required payload | Resume hoạt động; Next chưa được phép và giải thích cấu trúc; worksheet trống không thành lỗi chặn |
| B04 | Tail hợp lệ: Next ở khay hoặc Save and continue ở folder | Mỗi hành động chỉ tiến một hồ sơ sau persist; mở khay sau đó không tiến thêm |
| B05 | Chặn storage khi tiếp hồ sơ, nhấp lại/Enter liên tiếp | Current/reached/attempt vẫn đúng; working còn; không nhảy cảnh giả hoặc double-advance |
| B06 | Review chọn hồ sơ cũ, sau đó mở khay | Khay nhận diện đúng tail `reached - 1`, Resume đúng hồ sơ tiếp nhận; không nhầm current cũ thành queue head; không lộ hồ sơ tương lai |
| B07 | Hồ sơ thứ tám hợp lệ → Continue | Đến Review, reached vẫn 8, không có hồ sơ thứ chín hoặc tự Submit |
| B08 | S06 ↔ S12 ↔ worksheet/source rồi Back | Cùng case và tab, raw input/note/worksheet còn; scroll và focus phục hồi; không di chuyển chứng cứ |
| B09 | Thử cả năm quyết định; đổi loại rồi quay lại/tải lại cùng loại | Chỉ payload loại trước bị xóa khi đổi; cùng loại giữ raw; covenant re-appraisal chỉ Secured; validation giữ engine hiện tại |
| B10 | Lấy copy ở R03, đặt bàn/board rồi xem intake | Intake và copy độc lập; attribution còn; full board vẫn yêu cầu thay nguồn có chủ đích |
| B11 | Menu/Help/Settings từ folder, source, terminal, board | Đi đúng owning object và quay về đúng nguồn; không tạo hồ sơ/room mới hoặc toolbar toàn tác vụ trên S06 |
| B12 | Quay lại Title khi có saveError/recovery | Không che cảnh báo hoặc lưu state phục hồi mặc định đè raw lỗi; Retry/Export đúng ngữ cảnh |

## C. Hình ảnh, focus và vòng đời scene

| ID | Thao tác kiểm tra | Kết quả bắt buộc |
|---|---|---|
| C01 | Xem asset native, clean plate, manifest và hash | Đúng bản chọn/1672×941, không HUD/chữ/control raster còn sót; ảnh nguồn và 19 originals không đổi |
| C02 | So toàn cảnh R02 với intake/folder khi focus/Put down | Cùng khay/folder/notebook/nét/màu; camera tiến tới đúng vật, không crop mất vùng thao tác |
| C03 | Đọc dữ liệu thật với dấu Việt, số dài, %, ≤, ± và VND | Amatic SC/Mali đúng vai trò; không mất glyph, đè số, fake lorem/filler hoặc reference lộ từ ảnh |
| C04 | S01 bằng chuột/Tab/Enter, đo trục chữ và gear | Chữ hai action cùng lề title; tam giác ở ngoài trục; gear nhỏ nhưng vùng bấm ≥44 px, focus rõ |
| C05 | Tab/Shift+Tab/Enter/Space/Escape; Settings từ Menu | Một focus, thứ tự rõ; trap trong lớp trên; Escape đóng một lớp; trả focus về phần tử còn tồn tại |
| C06 | Gõ trong input/textarea, dùng mũi tên, mở modal | Không chuyển phòng dưới input/modal; nền không nhận click xuyên; control disabled thật sự không chạy |
| C07 | Desktop 1280×720, 1366×768, 1920×1080; compact 390×844; resize đang đọc | Hotspot theo đúng ảnh; đọc/form không tràn ngang hoặc mất action; compact cuộn nội dung thật thay vì chữ li ti |
| C08 | Text 100/115/130% và reduced motion | Nội dung/action đầy đủ; nguồn/worksheet có đường truy cập; giảm chuyển động vẫn đến đúng trạng thái và focus |
| C09 | Chuyển nhanh A→B→A; mở/đóng 20 lần, StrictMode cleanup, reload/đóng tab và quay lại trang | Không plate cũ thắng loader mới, callback sau unmount, canvas/listener chồng hoặc quyền ghi treo; một canvas ổn định, không lỗi console |
| C10 | Chặn ảnh/đổi asset URL lỗi, mô phỏng canvas không khởi tạo | Có thông báo/Retry hoặc HTML fallback để tiếp tục việc; không màn đen, spinner vô hạn hoặc lỗi tài chính giả |
| C11 | Bật/tắt Object sounds, reload, thử audio bị chặn | Chỉ âm thanh trung tính do thao tác; mute đúng; không autoplay cản chơi, lỗi audio không làm mất nhập liệu |

## D. Regression toàn vòng và bàn giao

| ID | Thao tác kiểm tra | Kết quả bắt buộc |
|---|---|---|
| D01 | Chạy tám hồ sơ với cả năm loại lựa chọn, có worksheet trống/chưa ghé CIC/không pin | Chỉ quyết định và payload bắt buộc chặn Submit; thiếu điều tra tùy chọn không thành gate mới |
| D02 | Chọn sai nhưng đủ cấu trúc, đi qua UI mới | Không đáp án, risk color, match score, main/noise hoặc danh tính tương lai trước Submit |
| D03 | Review → Cancel Submit → sửa → Confirm; nhấn Confirm hai lần | Cancel giữ sửa được; chỉ một lock/report sau persist thành công |
| D04 | Chặn ghi cuối khi Submit, sau đó retry | Không report thành công giả; draft giữ sửa được; khi lưu thành công mới khóa/reveal |
| D05 | Reload sau Submit, mở từng case/source | Báo cáo cùng attempt, tất cả input khóa; source-review holds 04/05 còn nguyên |
| D06 | Restore fixture sau ngày khác, không thao tác một thời gian rồi tiếp tục | Cùng shift tiếp tục, không timeout/auto-submit/penalty; timestamp không tham gia readiness |
| D07 | Smoke các route cũ với fixture trên origin QA tách biệt | `/` và `/concept/` giữ default mapping/namespace và các hành vi không bị pilot ghi đè |
| D08 | Test/build/source check và rollback checkpoint | Test liên quan + regression đạt, build/typecheck đạt, 19 nguồn/ảnh gốc nguyên; tắt pilot không cần xóa save |

## Biểu mẫu ghi kết quả

| ID | Trạng thái | Build / fixture / browser / viewport | Kết quả quan sát | Bằng chứng / bug |
|---|---|---|---|---|
| — | Not run | — | — | — |

Mỗi dòng Fail phải có cách tái hiện và mức ảnh hưởng. Lỗi mất dữ liệu, sai lượt, reveal sớm, khóa sai, không đọc/bấm được, hồi quy route cũ hoặc thao tác chéo save đều chặn bàn giao. Giới hạn chưa thử như Safari/Firefox/screen reader cần ghi đúng là Not run; không dùng ảnh chụp làm bằng chứng cho một phép kiểm tra lưu chưa thực hiện.
