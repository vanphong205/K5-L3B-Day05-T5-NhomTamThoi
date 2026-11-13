# K5-L3B-Day05-T5 · Nhóm Tạm Thời

**Track 5 — Ví điện tử:** Tích hợp AI vào Chat hỗ trợ khi giao dịch bị tạm chặn / có rủi ro.

---

## 1. Thành viên & phân công

| Thành viên | Vai trò | Việc đã làm | Sản phẩm bàn giao |
|---|---|---|---|
| **Trương Văn Phong** · `2A202604091` | Dev / UX Lead | Dựng repo, wireframe 2 ca, prototype tương tác 4 kịch bản (đủ 3 mức tự chủ), ảnh đánh số, kịch bản demo | `prototype/index.html`, `prototype/screen-1.png`, `prototype/screen-2.png`, `prototype/assets/wireframe.png`, `prototype/demo-script.md` |
| **Triệu Tuấn Minh** · `2A202604123` | Product / AI Spec Lead | `spec.md` §1–§7; bảng 10 kịch bản rủi ro; lập luận cost-of-error; thuyết minh demo | `spec.md`, `KeHoach.md` |

Kế hoạch chi tiết theo phút: `KeHoach.md` (cả nhóm).

---

## 2. Cấu trúc repo

```
.
├── README.md                     ← file này
├── KeHoach.md                    ← kế hoạch chung 240 phút
├── spec.md                       ← bài nộp chính (đầy đủ §1–§7)
├── DEBAI/                        ← đề bài & hướng dẫn gốc
└── prototype/
    ├── index.html                ← prototype tương tác, tự chứa, mở là chạy
    ├── demo-script.md            ← lời thoại + thao tác demo 2 phút của Trương Văn Phong (D5)
    ├── screen-1.png              ← ảnh đánh số (1)(2)(3): cảnh báo + bằng chứng + tạm giữ
    ├── screen-2.png              ← ảnh đánh số (4)(5)(6): chặn nhả tiền + hộp duyệt + chuyển người
    ├── HAX-mapping.md            ← bảng bàn giao để dán vào §5
    ├── tests/
    │   └── verify.mjs            ← 30 kiểm tra tự động qua Chrome DevTools Protocol
    └── assets/
        ├── wireframe.svg         ← wireframe 2 ca × 3 khung
        └── wireframe.png         ← bản PNG của wireframe
```

---

## 3. Chạy prototype

1. Mở trực tiếp `prototype/index.html` bằng Chrome/Edge (double-click).
2. Không cần server, không cần mạng, không có API key, không gọi AI thật.

**Tham số URL** (dùng khi chụp ảnh hoặc nhảy nhanh trạng thái):

| Tham số | Giá trị | Ý nghĩa |
|---|---|---|
| `s` | `scam` \| `hospital` \| `normal` \| `outscope` | chọn kịch bản |
| `step` | `0`–`3` | nhảy tới bước |
| `modal` | `approve` \| `lock` \| `recap` | mở hộp duyệt nhả tiền / duyệt khoá vĩnh viễn / hồ sơ đã gửi |
| `shot` | `1` | chế độ chụp: ẩn 2 cột, chỉ còn khung điện thoại |
| `marks` | `1,2,3` hoặc `4,5,6` | chỉ vẽ các số cần cho ảnh hiện tại |

Ví dụ:
- Ảnh 1: `index.html?shot=1&s=scam&step=0&marks=1,2,3`
- Ảnh 2: `index.html?shot=1&s=scam&step=1&modal=approve&marks=4,5,6`

---

## 4. Bốn kịch bản trong prototype

| # | Kịch bản | Số tiền | Điều chứng minh | HAX/PAIR |
|---|---|---|---|---|
| 1 | Bị thao túng tâm lý (giả danh công an) | 15.000.000 ₫ | AI **không nhả tiền** dù FaceID hợp lệ; chỉ mở hộp duyệt của người thật | G1, G9, G10, G11 |
| 2 | Kẹt viện phí lúc nửa đêm | 8.000.000 ₫ | Có đường ưu tiên ≤ 2 phút, không bắt chờ 24h, nhưng vẫn cần người duyệt | G1, G9 |
| 3 | Chuyển tiền bình thường | 200.000 ₫ | Không cảnh báo, không chờ — chứng minh thiết kế không làm phiền | — |
| 4 | Ngoài thẩm quyền & khoá ví | — | Đủ **3 mức tự chủ** trên cùng màn: tạm khoá ví (Tự làm, hoàn tác) · khoá vĩnh viễn (Cần duyệt) · hỏi ngưỡng chặn (Cấm, không có nút) | G1, G10, G11 |

---

## 5. Nguyên tắc an toàn đã cài trong prototype

- `nha_giao_dich` **không có** nút nhả tiền 1 chạm. Nút “Mở chặn để chuyển tiền” chỉ mở hộp duyệt nêu: ai duyệt · dựa trên gì · chờ bao lâu · quá hạn thì sao · có đảo ngược được không.
- `giu_giao_dich` ở mức **Tự làm** nhưng có **Hoàn tác**; hoàn tác cũng không làm tiền rời ví.
- Mọi bong bóng AI đều có nhãn **“Trợ lý AI”** (Luật 134/2025/QH15).
- `chuyen_tu_van_vien` 1 chạm, kèm tóm tắt ngữ cảnh soạn sẵn — không bắt người dùng kể lại.
- `khoa_vi` hiển thị **2 mức trên cùng một màn** (Ca 4): tạm khoá 24 giờ = Tự làm + nút Mở khoá; khoá vĩnh viễn = Cần duyệt, chỉ mở hộp duyệt.
- Mức **Cấm** có trên giao diện (Ca 4): không có nút, chỉ có dòng “tính năng này không thể thực hiện qua chat” (ví dụ: hỏi ngưỡng chặn rủi ro).
- Dữ liệu mock: STK che `**** 8888`, không OTP, không số thẻ, không tên người thật. Có dòng “Dữ liệu minh hoạ — không phải giao dịch thật”.

---

## 6. Kiểm thử đã chạy

- **30 kiểm tra tự động** qua Chrome DevTools Protocol — script: `prototype/tests/verify.mjs`.
- Phủ: 4 kịch bản, hộp duyệt, hoàn tác giữ tiền, mở khoá ví, chuyển tư vấn viên, ảnh đánh số, nhãn “Trợ lý AI”, nút chết, request mạng, lỗi console, tràn khung 390×844.
- Kết quả: **30/30 pass**, không có lỗi JS/console, không có request mạng.
- Đã kiểm tra ảnh hiển thị đúng trên nền trắng, không vỡ ảnh.

---

## 7. Trạng thái hoàn thành trước khi nộp

- [x] Điền họ tên và mã học viên đầy đủ vào bảng thành viên và `spec.md`.
- [x] Hoàn tất toàn diện `spec.md` (§1–§7) đầy đủ bằng chứng, lập luận 4 ý, ma trận cost-of-error và mapping HAX/PAIR.
- [x] Repo Public, tên `K5-L3B-Day05-T5-NhomTamThoi`.
- [x] Rà soát an toàn: không có API key / OTP thật trong repo.
- [x] Prototype hoàn thiện tương tác, không lỗi, ảnh chụp đánh số rõ ràng.
- [x] Sẵn sàng kịch bản demo 4 phút và phản xạ ca lạ theo `prototype/demo-script.md` và `spec.md` §7.
