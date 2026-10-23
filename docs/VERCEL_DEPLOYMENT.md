# Vercel — bản chơi thử 21/10/2026

- Link gửi người chơi: https://the-credit-desk-preview-2026-10-21.vercel.app/integration/
- Trang quản lý bản hiện tại: https://vercel.com/mngduc/the-credit-desk-preview-2026-10-21/5FPwYDrnaYMS317YgntWKnek4Mu7
- Deployment ID hiện tại: `dpl_5FPwYDrnaYMS317YgntWKnek4Mu7`.
- Vercel xác nhận `READY`; 70/70 tests và build local thành công trước khi tải lên.

Đã triển khai bản tích hợp hiện tại, gồm gói A+B. Địa chỉ gốc chuyển sang `/integration/`; tải lại đường dẫn này trả về entry của game. Cấu hình lưu tại [vercel-static.json](../deployment/vercel-static.json).

Bản cập nhật assignment ngày 21/10 đã được triển khai với `--target preview` và Vercel xác nhận `READY`. Deployment URL: https://the-credit-desk-preview-2026-10-21-kjrdslr6k-mngduc.vercel.app/integration/. Sau QA local, alias chia sẻ ở trên đã chuyển sang deployment này bằng `vercel alias set`; CLI xác nhận thành công. Link người chơi giữ nguyên. Xem [kiểm tra chỉ dẫn assignment](ASSIGNMENT_CUE_QA_2026-10-21.md).

Gói tải lên chỉ chứa output `dist/` và cấu hình static: 89 file, khoảng 59,4 MiB. Không tải lên workspace, tài liệu đầu vào, archive, biến môi trường hoặc lượt lưu của người dùng. Asset runtime và giấy phép font đi cùng bản build. Game lưu tiến độ trong trình duyệt; tiến độ ở localhost không tự chuyển sang địa chỉ Vercel.

CLI không dùng `--prod`. Vercel tự gán deployment đầu tiên của project mới này (`dpl_CPMKBEYHbBEzfofFN4cboU6LxF3Y`) thành `production` và tạo alias ở trên. Các bản cập nhật tiếp theo chỉ định `--target preview`; chỉ cập nhật alias chia sẻ khi muốn thay bản đang gửi người chơi. Bản assignment hiện tại đã cập nhật alias theo yêu cầu đã duyệt.

## Cập nhật bản preview

Từ thư mục workspace, kiểm tra và build lại trước:

```sh
npm test
npm run build
NO_UPDATE_NOTIFIER=1 vercel deploy dist --local-config "$PWD/deployment/vercel-static.json" --project the-credit-desk-preview-2026-10-21 --scope mngduc --target preview -y
```

Chỉ triển khai `dist`, không dùng toàn bộ workspace làm thư mục upload. Bản ngày 21/10 được stage riêng tại `/tmp/the-credit-desk-preview-2026-10-21` trước khi deploy; bản ghi hash nằm ở `/tmp/tcd-vercel-artifact-2026-10-21.json`.

Bản cập nhật assignment được stage ở `/tmp/tcd-assignment-preview-2026-10-21`; manifest/hash nằm tại `/tmp/tcd-assignment-cue-2026-10-21/artifact.json`. Gói static vẫn gồm 89 file; dữ liệu/ảnh runtime không đổi.
