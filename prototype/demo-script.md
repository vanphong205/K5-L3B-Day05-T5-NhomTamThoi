# Kịch bản demo 2 phút — Trương Văn Phong (Prototype & Visual UX)

> Dùng cho phần **[00:30 – 02:30]** của demo nhóm 4 phút (`KeHoach.md` chặng 7).
> Mục tiêu: bấm trọn ca khó nhất, mỗi thao tác trỏ được về một nguyên tắc HAX/PAIR và một mức tự chủ.

---

## 0. Chuẩn bị trước phút 210 (5 phút)

- [ ] Tab 1: mở `prototype/index.html` bằng Chrome, cỡ chữ trình duyệt **125%**, đang ở **Ca 1**.
- [ ] Tab 2: `prototype/screen-1.png` · Tab 3: `prototype/screen-2.png` (phương án dự phòng).
- [ ] Tắt thông báo Windows, cắm chuột, ẩn thanh bookmark cho sạch màn hình.
- [ ] Bấm thử **một vòng 60 giây** đúng thứ tự ở mục 1 (đây là lần tập dượt bắt buộc).
- [ ] Ghi giờ tập dượt vào bảng ở mục 4.

**Đường dẫn bấm nhanh khi lỡ tay:**

| Trạng thái | URL |
|---|---|
| Ca 1, bước cảnh báo | `prototype/index.html` |
| Ca 1, bước từ chối nhả tiền | `prototype/index.html?s=scam&step=1` |
| Ca 4, đủ 3 mức tự chủ | `prototype/index.html?s=outscope` |

---

## 1. Lời thoại + thao tác (00:30 – 02:30)

Nói **chậm**, dừng 2 giây sau mỗi số. Không nói “ờ”, không bấm nút ngoài kịch bản.

| Thời gian | Nói | Bấm |
|---|---|---|
| 00:30 – 00:45 | “Em thao tác ca khó nhất: người dùng đang bị kẻ gian thao túng, yêu cầu mở chặn để chuyển 15 triệu.” | Không bấm. Chỉ tay vào khung điện thoại. |
| 00:45 – 01:05 | “**(1)** — AI ghi rõ ‘Trợ lý AI’ và nêu căn cứ giữ tiền: tài khoản nhận mới mở 2 ngày, bị giục gấp, nội dung ‘chuyển gấp cho công an’. Đây là **G1** và **G11**, PAIR *Explainability*. Tiền **chưa rời ví**.” | Chỉ vào nhãn “Trợ lý AI” → thẻ bằng chứng → thanh “Đang giữ an toàn”. |
| 01:05 – 01:35 | “**(2)** — Em bấm ‘Đây là giao dịch của tôi — mở chặn’. AI **không nhả tiền**, vì `nha_giao_dich` ở mức **Cần người duyệt** — dù FaceID hợp lệ. Đây là **G10**, thu hẹp phạm vi khi nghi ngờ.” | Bấm **“Đây là giao dịch của tôi — mở chặn”** → đọc câu từ chối → bấm **“Mở chặn để chuyển tiền”**. |
| 01:35 – 02:00 | “Hộp duyệt trả lời đủ 5 câu: **ai duyệt · dựa trên gì · chờ bao lâu · quá hạn thì sao · có đảo ngược không**. Quyền yêu cầu vẫn của khách, quyền quyết định không thuộc về AI.” | Chỉ lần lượt 5 dòng trong hộp duyệt. |
| 02:00 – 02:15 | “**(3)** — Một chạm là sang tư vấn viên, hồ sơ soạn sẵn nên khách **không phải kể lại** — **G9**. Đây là mức **Tự làm** của `chuyen_tu_van_vien`.” | Bấm **“Kết nối tư vấn viên ngay”** → chỉ thẻ “Tóm tắt ngữ cảnh”. |
| 02:15 – 02:30 | “Còn `giu_giao_dich` là **Tự làm có hoàn tác**: bấm Hoàn tác thì bỏ tạm giữ, nhưng tiền vẫn không rời ví. Và ca bình thường 200.000đ đi thẳng, không cảnh báo đỏ — thiết kế không làm phiền người dùng.” | Bấm **“Hoàn tác”** → chọn **Ca 3** → bấm “Xác nhận chuyển”. |

**Câu chốt nếu còn 5 giây:** “Ba mức tự chủ nằm ngay trên giao diện: Tự làm có hoàn tác, Cần duyệt có hộp duyệt của người thật, Cấm thì không có nút.”

---

## 2. Nếu giám khảo hỏi về mức “Cấm” hoặc `khoa_vi`

Mở **Ca 4 — Ngoài thẩm quyền & khoá ví** (`?s=outscope`), chỉ 3 chỗ trong 10 giây:

1. **Cấm:** thẻ “Ngưỡng chặn rủi ro” — không có nút, chỉ có dòng “tính năng này không thể thực hiện qua chat”.
2. **Cần duyệt:** nút “Khoá vĩnh viễn — cần duyệt” mở hộp duyệt, không khoá ngay.
3. **Tự làm:** nút “Tạm khoá ví 24 giờ” → có ngay nút **Mở khoá** để hoàn tác.

Câu nói: “Cùng một tool `khoa_vi` nhưng hai mức khác nhau: tạm khoá thì AI tự làm vì hoàn tác được; khoá vĩnh viễn thì phải người duyệt vì không đảo ngược.”

---

## 3. Dự phòng khi prototype lỗi

- **Không sửa tại chỗ, không hoảng.** Chuyển ngay sang Tab 2/3 (ảnh đánh số) và nói: *“Đây là bản ghi lại luồng em vừa thao tác.”*
- Nếu bấm nhầm bước: bấm **“↺ Chạy lại kịch bản”** ở cột trái, không giải thích dài.
- Nếu trình duyệt mất focus: bấm vào giữa khung điện thoại một lần rồi tiếp tục.
- Ảnh là **phương án dự phòng chính thức**, không phải phương án xấu hổ.

---

## 4. Biên bản tập dượt (điền trước 23:00)

| Lần | Giờ | Người bấm | Kết quả | Lỗi ghi nhận | Đã sửa |
|---|---|---|---|---|---|
| 0 — tự động | __:__ | Chrome headless (CDP) | **30/30 kiểm tra pass**, 0 lỗi JS, 0 request mạng | — | — |
| 1 — bấm tay | __:__ | Trương Văn Phong | ☐ đạt / ☐ chưa | | |
| 2 — bấm tay trước lớp | __:__ | Trương Văn Phong | ☐ đạt / ☐ chưa | | |

**Cách chạy lại bài kiểm tra tự động:**

```powershell
node prototype/tests/verify.mjs
```

(Không cần mạng. Cần Chrome cài ở đường dẫn mặc định; nếu khác, sửa biến `CHROME` ở đầu file.)

---

## 5. Ba câu giám khảo hay hỏi — Trương Văn Phong trả lời ngắn

| Câu hỏi | Trả lời | Bằng chứng trên màn hình |
|---|---|---|
| “Sao không cho AI nhả tiền sau 10 giây chờ?” | “Tiền đi là không thu hồi; kẻ thao túng chỉ cần giục thêm 10 giây. Cost-of-error quá lớn nên `nha_giao_dich` ở mức Cần người duyệt.” | Hộp duyệt, dòng “Đảo ngược: Không”. |
| “Người thật đang gấp viện phí thì sao?” | “Có ca 2: đường ưu tiên ≤ 2 phút, không bắt chờ 24h, nhưng vẫn không bỏ bước người duyệt.” | Chọn Ca 2 → “Ưu tiên xác thực video trong 2 phút”. |
| “Nếu AI chẩn đoán sai là lừa đảo?” | “`giu_giao_dich` có Hoàn tác; hoàn tác không làm tiền rời ví, và luôn có đường chuyển người 1 chạm.” | Nút “Hoàn tác” trên thanh giữ tiền. |

**Ca lạ ngoài 3 câu trên:** Trương Văn Phong không tự trả lời — chuyển mắt sang Triệu Tuấn Minh (người giữ §2/§4), Trương Văn Phong chỉ bấm minh hoạ nếu ca đó rơi vào luồng có sẵn.
