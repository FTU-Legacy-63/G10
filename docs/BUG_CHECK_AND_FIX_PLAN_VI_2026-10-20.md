# THE CREDIT DESK — Bug check và kế hoạch sửa để duyệt

Ngày 20/10/2026 · Trạng thái: **ĐÃ ĐƯỢC DUYỆT VÀ TRIỂN KHAI**

Người dùng đã duyệt bằng “oke bắt đầu đi”. Bốn nhóm sửa A–D đã được kiểm tra trên bản mã độc lập ở5181 rồi tích hợp vào5180. Phần1–6 dưới đây giữ nội dung bug check/kế hoạch tại thời điểm trình duyệt; các câu “chưa sửa” trong đó là ghi chép lịch sử. Xem phần7 cho kết quả triển khai thực tế.

Tài liệu này kiểm tra bốn yêu cầu mới và một lỗi liên quan đến assignment. Lượt kiểm tra chỉ đọc mã, quan sát bản 5180 và tái hiện thao tác trên bản QA 5181. Không chỉnh mã chạy, CSS, ảnh, dữ liệu nghiệp vụ hoặc lượt chơi tại 5180.

## 1. Kết quả bug check

| Mã | Mức độ / loại | Hiện trạng đã kiểm tra | Nguyên nhân | Kết quả cần đạt |
|---|---|---|---|---|
| B01 | Ưu tiên cao · Luồng vào game | Bản 5180 đang ở R04. Continue có thể trở về phòng/vật đã lưu hoặc báo cáo R04. New Game hiện mở thẳng S03, không đưa vào R02 và chỉ giấy assignment. | `resumeScreen` khôi phục ngữ cảnh cũ; New Game đi trực tiếp tới briefing. Chưa có một bước vào R02 chung hoặc mũi tên dành cho assignment. | Vào không gian chơi từ title ở R02; người chơi chủ động bấm giấy assignment. |
| B02 | Ưu tiên cao · Điều hướng liên quan B01 | Đã tái hiện: từ R02 mở giấy assignment → Put down → R01. | Giấy nằm trong R02 nhưng briefing được khai báo thuộc R01. | Assignment thuộc R02; Back/Put down trở về R02. Chỉ thao tác chủ động gặp khách mới đi R01. |
| B03 | Ưu tiên vừa · Lỗi hình ảnh | Hai góc trên có vùng đen không đều và lộ dạng mảng phủ. Tại khung 1113×988, lớp che trái rộng khoảng 167 px, bên phải 301 px; cùng cao khoảng 72 px. | Hai mảng đen 15%/27% dùng để che chữ mẫu trong ảnh bị chồng lên vignette gốc. Có thêm một lớp vignette ở trên cả phần điều khiển. | Góc tối mềm, liên tục và cân đối; giữ chất ảnh đã duyệt, không làm tối chữ/nút và không lộ chữ mẫu ở mép ảnh. |
| B04 | Ưu tiên vừa · Lỗi hội thoại | Đã tái hiện viền 2 px, góc bo và bóng quanh dòng hội thoại, dù nền đang trong suốt. Khi hover/ấn, quy tắc nút còn có thể tô nền lại. | Hội thoại là một vùng bấm dùng thẻ button; style nút giấy được áp nhầm vào nó. | Chỉ hiện một dòng chữ nổi trước cảnh, không hộp/viền/bóng hộp; thao tác đọc tiếp vẫn hoạt động. |
| B05 | Ưu tiên vừa · Thay đổi hiệu ứng theo yêu cầu | Chưa có hiệu ứng flash/blink. Hiện có hòa ảnh khoảng 200 ms và tiến camera khoảng 180 ms khi mở một số vật ở R02. | Các đường chuyển màn dùng hiệu ứng khác nhau; chưa có một nhịp chuyển chung. | Một nhịp nháy ngắn rồi cắt sang cảnh mới, đồng bộ cả ảnh lẫn giao diện. |

**Phân biệt quan trọng:** chưa có bằng chứng New Game mới luôn nhảy vào R04. Đã xác nhận R04 có thể đến từ ngữ cảnh lưu hoặc đường mở báo cáo. Kế hoạch dưới đây thay quy tắc vào game cho nhất quán, thay vì chỉ ép sửa một trường hợp R04.

Không ghi nhận lỗi chạy trong console ở các thao tác đã kiểm tra. Điều đó không phủ nhận các lỗi hình ảnh/luồng trên.

## 2. Phương án hành vi đề xuất để duyệt

### A. Vào game ở R02 và hướng tới assignment

- **New Game:** tạo ca theo cơ chế lưu hiện có → hiện toàn cảnh R02 → mũi tên nhỏ chỉ đúng tờ giấy ghim trên tường. Không tự mở S03 và không tự nhận hồ sơ.
- **Continue ca chưa nhận hồ sơ hoặc đang làm:** cũng vào toàn cảnh R02. Giữ nguyên ca, hồ sơ hiện tại, số hồ sơ đã nhận, quyết định, ghi chú, bản sao, bảng ghim, bộ lọc và nội dung đang làm.
- Bước vào R02 dùng trạng thái hiển thị của phiên, chưa ghi đè `direction`/`view` đang lưu. Chỉ cập nhật ngữ cảnh khi người chơi chủ động chuyển phòng/mở vật; các nguồn và nội dung trước đó vẫn truy cập được qua đồ vật tương ứng.
- Mũi tên màu kem, nét đen, cùng phong cách với điều hướng; không thêm thanh hướng dẫn, nhãn phòng hay hộp tutorial. Dùng vị trí tương đối theo chính hotspot của giấy, không đặt cố định theo pixel.
- Mũi tên xuất hiện trong lần vào từ title, tắt khi mở assignment. Nếu rời R02 trước khi đọc rồi quay lại, mũi tên còn đó. Đóng menu hoặc Back thông thường không khởi động lại hướng dẫn. Trạng thái này chỉ thuộc phiên giao diện, không thêm schema lưu game.
- Bấm giấy mới mở S03 đã duyệt. Back/Put down trả lại R02. Nút chủ động gặp/quay lại khách hàng trong S03 vẫn dẫn tới R01.
- **Ca đã Submit:** đề xuất vẫn vào R02 để đúng quy tắc “vào game ở R02”, nhưng giữ toàn bộ ca ở chế độ chỉ đọc; không giao lại nhiệm vụ như ca mới. Báo cáo vẫn mở được từ cuốn sổ ở R04. Đây là thay đổi rõ ràng so với cách Continue hiện mở thẳng báo cáo và nằm trong phạm vi cần bạn duyệt.
- Ngoại lệ hướng dẫn cho ca đã Submit: không hiện mũi tên giao nhiệm vụ mới. Giấy assignment vẫn đọc lại được trên art S03, có trạng thái ca đã nộp và nút quay về R02; không có hành động bắt đầu/nhận thêm hồ sơ từ giấy này.

Việc thay phòng mở đầu chỉ thay cách trình bày lúc vào; không gọi thao tác nhận hồ sơ, tăng số hồ sơ hoặc tạo ca mới khi người chơi bấm Continue.

### B. Sửa góc tối, giữ nguyên bộ art

- Giữ ảnh phòng/screen đã duyệt, đồ vật, bảng ghim và màu nội thất hiện tại. Không tạo lại căn phòng, không dùng lại bộ nền v2 làm trống.
- Bỏ cách dùng hai mảng đen cố định khác kích thước để giả hiệu ứng góc tối. Dùng vignette mềm, thống nhất về đường cong và độ tối, dựa trên vignette sẵn có của ảnh.
- Tách việc che chữ mẫu raster ở mép ảnh khỏi hiệu ứng không khí. Vùng che phải bám đúng phần chữ thừa, hòa với mép tranh; không tạo vệt ngang hoặc góc vuông. Không chỉ xóa lớp che rồi để chữ Menu/Saved mẫu lộ trở lại.
- Lớp không khí nằm trong phần tranh, dưới chữ/nút thật và mũi tên. Kiểm tra riêng phòng, folder, máy tính, notebook, bảng và báo cáo vì vùng chữ mẫu khác nhau.
- So sánh một phòng trước, hoàn thiện cách xử lý rồi áp dụng có kiểm soát cho các screen liên quan. Không thay bố cục bên trong.

### C. Hội thoại chỉ còn chữ

- Loại hội thoại khỏi nhóm style nút giấy. Nền, viền và bóng hộp đều trong suốt ở trạng thái bình thường, rê chuột, nhấn và dùng bàn phím.
- Chỉ hiện một câu/nhịp chữ ngắn tại một thời điểm; bỏ ký hiệu tam giác phụ cạnh câu. Giữ Mali và tương phản chữ nhẹ phù hợp nền phòng.
- Desktop hiển thị một dòng. Khi khung hẹp hoặc chữ 130% không đủ chỗ, chia câu thành các nhịp ngắn nối tiếp, không cắt mất nội dung, không dùng dấu “…”, không ép chữ nhỏ hơn mức người chơi chọn.
- Bấm khi chữ đang chạy sẽ hiện hết nhịp hiện tại; bấm tiếp để đọc nhịp sau. Giữ kích hoạt bằng Enter/Space và mô tả đầy đủ cho công cụ hỗ trợ đọc màn hình. Focus chỉ tác động lên chữ, không dựng lại hộp.
- Giữ các câu giao tiếp ngắn đang có; không thêm dữ liệu tài chính, topic menu hoặc bảng thông tin hồ sơ vào cuộc nói chuyện.

### D. Một nhịp flash/blink khi đổi phòng hoặc screen

**Đề xuất nhịp hình ảnh:** nháy tối một lần, tổng khoảng **160 ms** — khép nhanh khoảng 60 ms, đổi cảnh khi tối khoảng 20 ms, mở lại khoảng 80 ms. Đây là thông số khởi điểm để kiểm tra cảm giác, chưa phải hiệu ứng đã triển khai.

- Áp dụng khi đổi phòng, mở/đặt xuống vật, Back giữa các screen, vào/rời game từ title và chuyển sang báo cáo sau Submit thành công.
- Thay zoom/hòa ảnh trong những lần chuyển này bằng một nhịp nháy chung. Ảnh, chữ và vùng bấm đổi cùng lúc; không để chữ màn mới nằm trên ảnh màn cũ.
- Không nháy khi đổi tab trong folder, tìm kiếm, gõ số, chọn quyết định, đọc câu thoại tiếp theo hoặc mở/đóng menu cài đặt.
- Nạp sẵn cảnh đích trước khi khép. Nếu nạp chậm, giữ cảnh hiện tại; nếu lỗi, quay lại trạng thái nhìn thấy được và giữ cơ chế thử lại hiện có. Không để màn hình đen chờ vô thời hạn.
- Trong một nhịp chuyển chỉ nhận một thao tác điều hướng; không cộng dồn hàng dài lần nhấn mũi tên, không nhận nhầm cú bấm cho màn kế tiếp.
- Khi bật Reduced motion hoặc hệ điều hành yêu cầu giảm chuyển động: cắt cảnh trực tiếp, không nháy/zoom; hội thoại hiện chữ ngay. Các chuyển động title đang có giữ nguyên theo tùy chọn giảm chuyển động.

## 3. Thứ tự triển khai sau khi được duyệt

| Bước | Công việc | Điều kiện chuyển bước |
|---|---|---|
| 0 | Chụp mốc hiện tại, lưu bản sao các file liên quan và danh sách hash. Chuẩn bị bản mã thử độc lập tại 5181. | Không dùng việc sửa trực tiếp trong thư mục đang phục vụ 5180 để thử hiệu ứng; tránh tự cập nhật bản bạn đang chơi trong lúc chỉnh dở. |
| 1 | Sửa đường vào R02, mũi tên assignment và chủ sở hữu/đường quay lại của S03. | New Game/Continue không tăng hồ sơ, không mất tiến độ; mở và đặt giấy xuống đúng phòng. |
| 2 | Sửa riêng style hội thoại và trạng thái tương tác của chữ. | Không có hộp trong mọi trạng thái; câu đọc đủ ở 100/115/130%. |
| 3 | Hoàn thiện lớp góc tối, kiểm tra từng loại art. | Không mảng vuông/vệt ngang, không lộ chữ mẫu, không đổi nội thất hoặc làm tối nút. |
| 4 | Nối nhịp chuyển chung cho mọi đường đổi cảnh; giữ bảo vệ lưu/nạp/lỗi hiện có. | Không chớp lặp, không ảnh/chữ lệch màn, không kẹt màn đen, giảm chuyển động hoạt động. |
| 5 | Chạy kiểm tra hồi quy, đối chiếu ảnh trước/sau. Áp dụng cả bộ đã đạt vào 5180 và kiểm tra lại. | Chỉ cập nhật bản chính sau khi bản thử đạt; nếu có sai lệch, khôi phục các file đã chụp mốc. |

Duyệt tài liệu này sẽ cho phép triển khai toàn bộ các bước trên. Hiện chưa bắt đầu bước sửa nào.

## 4. Tiêu chí nghiệm thu bắt buộc

| Nhóm | Các trường hợp phải kiểm tra sau sửa |
|---|---|
| Mở đầu | New Game; Continue chưa nhận hồ sơ; Continue từ R01/R03/R04 và mọi bề mặt làm việc; Continue ca đã Submit. Tất cả vào R02 theo phương án A; ca đã Submit không bị mở khóa. |
| Assignment | Mũi tên trỏ đúng giấy ở các tỷ lệ màn hình; đọc bằng chuột/bàn phím; biến mất đúng lúc; mở giấy và Back/Put down về R02; nút gặp khách đi R01 khi được bấm. |
| Góc tối | Bốn phòng, title và các screen giấy/máy tính/sách/bảng/report; không che chữ/nút; không lộ HUD mẫu; không làm xuất hiện dải đen do thay tỷ lệ màn hình. |
| Hội thoại | Một dòng mỗi nhịp, đủ nội dung; bình thường/hover/active/focus không có hộp; ba mức chữ; đọc hết, đọc tiếp và kết thúc không nhận nhầm hai lần. |
| Nhịp chuyển | Trái/phải, mở vật, Back, Put down, title vào/ra, Submit; nhấn nhanh và giữ phím; nạp chậm/nạp lỗi; fallback ảnh khi Canvas không dùng được. |
| Giảm chuyển động | Cài đặt trong game và lựa chọn hệ điều hành; không nháy/zoom, không bắt người chơi chờ chữ chạy. |
| Kích thước | 1280×720, 1440×900, 1920×1080 và một khung hẹp 390×844; chữ 100/115/130%; không tràn ngang hoặc cắt nội dung chức năng. |
| Lưu và nghiệp vụ | Đối chiếu attempt/case/reached/drafts/copies/board trước-sau; tiếp tục sau reload; kiểm tra lưu thất bại không chuyển bước nhầm; review/Submit vẫn cần xác nhận; dữ liệu/tài liệu gốc giữ hash. |
| Phạm vi route | Chỉ thay trải nghiệm /integration/. / và /concept/ không tự bị đổi hiệu ứng do dùng chung component nền. |

Phần này là **kế hoạch kiểm thử sau sửa**, không phải tuyên bố các trường hợp đã đạt.

## 5. Phạm vi mã dự kiến và phần giữ nguyên

Dự kiến chạm `src/integration/DiscoveryApp.tsx`, `profile.ts`, `Orientation.tsx`, `ConversationLine.tsx`, `discovery.css`, `approved-style.css`; bổ sung một phần điều phối chuyển cảnh nếu cần. Component `src/concept/ConceptBackground.tsx` chỉ thay theo tùy chọn riêng của integration, giữ mặc định cho route khác. Cập nhật các kiểm tra đường vào/assignment và thêm kiểm tra chuyển cảnh phù hợp.

Không thay domain tài chính, nội dung tám hồ sơ/168 bản ghi, quy tắc chấm, namespace/schema save, thứ tự xử lý tám hồ sơ, Submit có xác nhận, bộ ảnh gốc hoặc font. Không thêm toolbar, bản đồ, room label, phòng mới hay screen mới.

## 6. Bằng chứng và giới hạn của lượt kiểm tra này

- Quan sát 5180 ở R04, khung 1113×988; chỉ đọc, không điều hướng hoặc sửa lượt chơi.
- Tái hiện trên 5181 ở 1280×720: Continue ca đã nộp mở báo cáo R04; hội thoại có viền; mở assignment tại R02 rồi đặt xuống về R01.
- Đọc mã xác nhận các đường New Game/Continue, hai lớp che góc, style nút áp vào hội thoại, fade 200 ms và camera 180 ms. Chưa sửa và chưa kiểm thử hiệu ứng flash mới.
- Ảnh lỗi: `/tmp/tcd-bug-check-2026-10-20/current-r04.png`, `/tmp/tcd-bug-check-2026-10-20/dialogue-box.png`.
- Bản đối chiếu hash mã trước kiểm tra: `/tmp/tcd-bug-check-2026-10-20/code-before.json`. Không chạy lại build/test chỉ để tạo kết quả đạt trong một lượt chưa sửa mã.

**Điểm duyệt:** đồng ý phương án A–D, gồm quy tắc Continue ca đã Submit ở R02 và nhịp nháy tối khoảng 160 ms. Sau khi bạn duyệt mới sửa trên bản thử độc lập.


## 7. Kết quả sau duyệt và triển khai

- **B01/B02:** New Game và Continue vào R02. Draft có mũi tên chỉ giấy; mở rồi Put down/Back về R02. Ca đã Submit vào R02 chỉ đọc, không giao lại nhiệm vụ; báo cáo vẫn ở sổ R04. Continue trên fixture giữ nguyên chuỗi dữ liệu đã lưu trước/sau bước vào game.
- **B03:** thay hai miếng che15%/27% bằng mép tối cong liên tục dưới điều khiển; giữ ảnh gốc và che chữ mẫu. Đã quan sát bốn phòng và các bề mặt chính.
- **B04:** một dòng chữ mỗi nhịp, không hộp khi hover/focus/ấn; chia nhịp khi khung hẹp. Ở390×844/chữ130%, đọc đủ ba câu hiện có qua năm nhịp, không tràn ngang.
- **B05:** một nhịp tối60/20/80ms, nạp ảnh trước khi khép, có thử lại/cancel và thời hạn chờ renderer. Đổi tab/menu/đọc câu tiếp không nháy; bật giảm chuyển động cắt trực tiếp.
- **Kiểm chứng:**64/64 tests đạt; build/typecheck/content check của candidate và bản chính đạt.19 input gốc,13 file core được bảo vệ và ảnh đã duyệt giữ hash. QA riêng kiểm tra New Game/Submit lưu thất bại, lỗi ảnh và Retry scene, fallback không Canvas, tám hồ sơ review/Submit qua fixture, cùng smoke tuyến `/` và `/concept/`.
- **Bản5180:** đã kiểm tra Continue thực tế vào R02 có mũi tên, không tràn ngang và không có lỗi console liên quan. Không reset, Submit hay sửa dữ liệu lượt chơi của người dùng.
- **Bằng chứng:** `/tmp/tcd-fix-2026-10-20/preview-5180-final.png`, `dialogue-complete.png`, `dialogue-mobile-130.png`, `room-r04.png`, `report-1440.png`; mã trước sửa và danh sách file áp dụng nằm cùng thư mục. Ghi chú chi tiết trong [Implementation notes](IMPLEMENTATION_NOTES.md).
- **Giới hạn:** đã kiểm tra trực tiếp cài đặt giảm chuyển động trong game; subscription theo hệ điều hành có triển khai nhưng chưa ép đổi OS trong QA. Loader chậm/cancel/nhấn lặp được kiểm tra bằng unit test, chưa chứng nhận thời gian mạng thật. Không tuyên bố đã thử Safari/Firefox hay toàn bộ tổ hợp tỷ lệ/chữ. Cảnh báo dung lượng Phaser có sẵn vẫn còn.
