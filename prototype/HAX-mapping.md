# §5 — Bàn giao Prototype (Trương Văn Phong → Triệu Tuấn Minh)

> Dán nội dung dưới đây vào `spec.md` §5. Ảnh đã có sẵn trong `prototype/`. Trương Văn Phong không viết lại văn — chỉ cung cấp bằng chứng và mapping.

---

## 5.1. Link / file · công cụ · phần mock

- **File:** `prototype/index.html` — mở trực tiếp bằng trình duyệt, không cần server.
- **Công cụ:** HTML/CSS/JS thuần, tự chứa (không CDN, không framework).
- **Mock 100%:** tin nhắn, số tiền, tài khoản nhận, chuyên viên, thời gian chờ. **Không có lời gọi AI thật**, không có API key, không dùng dữ liệu của người thật.
- **Ảnh đánh số:** `prototype/screen-1.png`, `prototype/screen-2.png`.
- **Wireframe:** `prototype/assets/wireframe.png` (2 ca × 3 khung, vẽ trước khi code).

## 5.2. Bảng mapping ảnh đánh số

### Ảnh 1 — `screen-1.png` (bước cảnh báo, ca bị thao túng 15.000.000 ₫)

| Số | Thể hiện gì | Nguyên tắc HAX/PAIR | Mức tự chủ |
|---|---|---|---|
| (1) | Nhãn **“Trợ lý AI”** trên bong bóng + câu nêu căn cứ tạm giữ, hỏi lại người dùng có đang bị giục gấp không | **G1** — Làm rõ AI có thể làm gì; **G11** — Giải thích vì sao | — |
| (2) | Thẻ bằng chứng: số tiền, tài khoản nhận mới mở 2 ngày, nội dung “chuyển gấp cho công an”, tần suất 3 lệnh/10 phút; kèm câu “Tiền chưa rời ví” | **G11**, PAIR *Explainability* | `giu_giao_dich`: **Tự làm** |
| (3) | Thanh giữ tiền: “Đang giữ an toàn · 15.000.000 ₫”, thanh rủi ro đỏ, nút **Hoàn tác** ngay cạnh | **G10** — Thu hẹp phạm vi khi nghi ngờ; PAIR *Error recovery* | `giu_giao_dich`: **Tự làm, có hoàn tác** |

### Ảnh 2 — `screen-2.png` (bước từ chối nhả tiền + hộp duyệt)

| Số | Thể hiện gì | Nguyên tắc HAX/PAIR | Mức tự chủ |
|---|---|---|---|
| (4) | Nút **“Mở chặn để chuyển tiền”** vẫn tồn tại nhưng **không thực thi**: bấm vào chỉ mở hộp duyệt, có nhãn “Cần duyệt” | **G10** | `nha_giao_dich`: **Cần người duyệt** |
| (5) | Hộp duyệt: **ai duyệt** (chuyên viên rủi ro trực ca, cấp 2 nếu quá hạn) · **dựa trên gì** (3 dấu hiệu + xác thực 2 lớp) · **chờ bao lâu** (2–5 phút) · **quá hạn thì sao** (giữ tiền, chuyển cấp 2, gọi lại) · **đảo ngược** (không) | PAIR *Explainability + Error recovery* | `nha_giao_dich`: **Cần người duyệt** |
| (6) | Nút 1 chạm **“Kết nối tư vấn viên ngay”**, kèm tóm tắt ngữ cảnh soạn sẵn (số tiền · 3 dấu hiệu · 2 câu người dùng vừa nói) | **G9** — Hỗ trợ gỡ kẹt; **G1** | `chuyen_tu_van_vien`: **Tự làm** |

> Ghi chú khi thuyết minh: ở ảnh 2, nút (4) nằm phía sau lớp mờ, vẫn nhìn thấy — ý đồ là “quyền yêu cầu vẫn còn, nhưng quyền quyết định không thuộc về AI”.

---

## 5.3. Quyết định thiết kế (4 ý: đã cân nhắc · chọn · vì sao · loại gì)

**Câu hỏi:** hiển thị độ chắc/bằng chứng và điều khiển mức tự chủ thế nào?

- **Đã cân nhắc A — chỉ hiện nhãn mức tự chủ, ẩn nút nhả tiền.**
  Loại: người dùng đang gấp sẽ thấy bế tắc, không biết đi đường nào; đúng tình huống “khách thật đang gấp bị bỏ lơ”.
- **Đã cân nhắc B — cho AI tự nhả tiền sau cool-down 10 giây.**
  Loại: tiền đi là không thu hồi; kẻ thao túng chỉ cần giục thêm 10 giây là thắng. Cost-of-error quá lớn.
- **Đã cân nhắc C — ẩn toàn bộ giao dịch, bắt ra quầy.**
  Loại: ca viện phí nửa đêm không thể chờ; đồng thời làm mất khả năng tự phục vụ của app.
- **Chọn:** nút yêu cầu **luôn tồn tại** nhưng chỉ mở **hộp duyệt của người thật**; hộp duyệt trả lời đủ 5 câu (ai · dựa trên gì · bao lâu · quá hạn · đảo ngược); kèm nút chuyển tư vấn viên 1 chạm và hồ sơ soạn sẵn.
  Vì: giữ quyền **yêu cầu** của người dùng, nhưng không trao quyền **quyết định** cho AI; người đang bị ép vẫn có đường ra ngay.

**Cách hiện bằng chứng:** thẻ bằng chứng đặt ngay dưới câu cảnh báo, mỗi dòng là một dấu hiệu cụ thể (không viết “hệ thống thấy rủi ro” chung chung), kèm thanh rủi ro và câu “Tiền chưa rời ví”.

## 5.4. Lỗi nào sửa câu chữ không cứu được

- **Lỗi ngữ cảnh** (người dùng tự quét FaceID đúng nhưng bị ép buộc): không câu chữ nào cứu được nếu AI vẫn có quyền nhả tiền. Thiết kế cứu bằng cách **chặn quyền thực thi** — đưa `nha_giao_dich` sang mức Cần người duyệt, và không render bất kỳ nút nhả tiền trực tiếp nào.
- **Lỗi hệ thống** (AI chẩn đoán sai là lừa đảo): cứu bằng **hoàn tác** cho `giu_giao_dich` + đường chuyển người 1 chạm, để người thật gỡ trong ≤ 2 phút.

## 5.5. Điều prototype chưa làm (nói thật khi demo)

- Không có AI thật; toàn bộ hội thoại là kịch bản dựng sẵn.
- Chưa có backend duyệt hồ sơ; trạng thái “chuyên viên đã nhận” là mô phỏng.
- Chưa xử lý đa ngôn ngữ, chưa có accessibility đầy đủ (mới có aria-label cho hộp thoại).

## 5.6. Bằng chứng cho mức “Cấm” và `khoa_vi` (không nằm trong 2 ảnh)

Dùng khi Triệu Tuấn Minh viết §4 hoặc khi giám khảo hỏi “3 mức tự chủ nằm ở đâu trên giao diện?”.
Mở **Ca 4 — Ngoài thẩm quyền & khoá ví** trong `prototype/index.html` (`?s=outscope`), không cần chụp thêm ảnh:

| Mức | Chỗ trên màn hình | Điều chứng minh |
|---|---|---|
| **Cấm** | Thẻ “Ngưỡng chặn rủi ro” | Không có nút thực hiện, chỉ có dòng “tính năng này không thể thực hiện qua chat” — đúng quy ước UI ở §4 |
| **Cần người duyệt** | Nút “Khoá vĩnh viễn — cần duyệt” → hộp duyệt | AI không khoá ngay; hộp duyệt nêu ai duyệt · dựa trên gì · chờ bao lâu · quá hạn · không đảo ngược |
| **Tự làm có hoàn tác** | Nút “Tạm khoá ví 24 giờ” → nút “Mở khoá” | Cùng tool `khoa_vi`, mức tạm khoá do AI làm ngay nhưng hoàn tác được; số dư không đổi |

Câu chốt: *“`khoa_vi` không phải một mức duy nhất — tạm khoá là Tự làm vì đảo ngược được, khoá vĩnh viễn là Cần người duyệt vì không đảo ngược.”*
