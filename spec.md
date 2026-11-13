# Dàn ý bài nộp _(spec.md — nộp trước 23:59 ngày lab của lớp)_

> Copy dàn ý này vào `spec.md` của nhóm. Đây **không** phải form để điền đủ ô: mỗi mục chỉ cần đủ **bằng chứng** và **lập luận** ghi bên dưới. Viết ngắn, gạch đầu dòng là được. Hướng dẫn từng chặng: `02-guide.md`. Cách chấm: `04-rubric.md`.
>
> **Một quyết định = bốn ý:** đã cân nhắc phương án nào · chọn phương án nào · vì sao · loại các phương án kia vì sao. Bằng chứng = lập luận trỏ về một chỗ cụ thể: tool nào, dòng dữ liệu nào của track, điều gì trong mục "Sản phẩm thật hôm nay", chỗ nào trên prototype (ảnh đánh số). Không chạy agent.

```markdown
# Bài nộp LAB5 — [Track] · Nhóm [tên]

[Danh sách thành viên và việc mỗi người làm — copy bảng từ README]

## §1. Lát cắt & phạm vi

- Lát cắt (chép từ track).
- 3 việc tính năng KHÔNG làm, mỗi việc một câu vì sao.

- AI đang làm việc gì: Trợ lý AI thông minh tích hợp trong ví điện tử (eWallet), đảm nhận việc phân tích hành vi giao dịch, tự động gợi ý tài khoản nhận tiền thường xuyên, và hệ thống kiểm duyệt chống gian lận tự động (Anti-fraud & Smart Transaction Assistant).

AI phải ra Quyết định chặn hoặc cho phép một giao dịch chuyển tiền ngay lập tức dựa trên điểm số rủi ro (Risk Score); Quyết định tự động điền / gợi ý ưu tiên tên người nhận hoặc số tiền dựa trên lịch sử giao dịch.
- 3 tính năng AI sẽ không làm: Không tự ý hoàn tiền hay tự động hủy giao dịch đã thành công mà không có sự xác nhận thủ công từ người dùng; Không tự động thay đổi hạn mức tín dụng hoặc vay tiền thay cho quyết định của chủ tài khoản; Không tự động chia sẻ dữ liệu giao dịch cá nhân của người dùng cho bên thứ ba ngoài hệ thống bảo mật cốt lõi.

## §2. Kịch bản rủi ro (chặng 2)

| # | Tin nhắn người dùng | Lớp | AI có thể sai thế nào (bằng chứng) | Sản phẩm tốt nên làm gì | Nhãn |
|---|---|---|---|---|---|
| 1 | “Sao giao dịch của tôi bị giữ? App báo đã chuyển rồi à?” | ① Nguồn sự thật | Nếu trạng thái giao dịch hiện tại không có trong dữ liệu được cung cấp, AI có thể bịa trạng thái hoặc nhầm “đang giữ” với “đã chuyển”; không có dữ liệu đối soát thời gian thực được nêu trong phạm vi. | Nói rõ chưa xác minh được trạng thái, không khẳng định tiền đã đi; mở chi tiết giao dịch hoặc chuyển tư vấn viên kiểm tra. | Sửa được |
| 2 | “Chuyển lại 2 triệu cho Linh như lần trước nhé.” | ① Nguồn sự thật | §1 nêu lịch sử giao dịch và gợi ý người nhận/số tiền, nhưng không nêu cơ chế xác minh danh tính người nhận hoặc giao dịch gần nhất; AI có thể chọn nhầm Linh hay số tiền cũ. | Hiển thị tên/số tiền được đề xuất để người dùng tự xác nhận; không tự gọi `nha_giao_dich`. | Không chấp nhận được |
| 3 | “Chuyển cho anh ấy đi, đang gọi giục tôi.” | ② Mơ hồ/thiếu tin | Đại từ “anh ấy” không xác định người nhận; `nha_giao_dich` mà không hỏi lại có thể chuyển sai người. | Hỏi rõ người nhận và mục đích; nếu có dấu hiệu bị thúc ép, khuyên dừng và đưa lựa chọn `chuyen_tu_van_vien`. | Không chấp nhận được |
| 4 | “Tôi bị giữ tiền hay giao dịch bị từ chối? Tôi không nhớ đã bấm gì.” | ② Mơ hồ/thiếu tin | Không có nội dung giao dịch cụ thể trong câu hỏi; AI có thể đoán nhầm giữa giao dịch đang chờ, thất bại và thành công nếu không kiểm tra nguồn sự thật. | Hỏi mã/chi tiết giao dịch không nhạy cảm hoặc hướng người dùng đến lịch sử giao dịch; không yêu cầu OTP/mật khẩu. | Sửa được |
| 5 | “Giao dịch thành công rồi mà tôi đổi ý, hoàn tiền vào ví ngay.” | ③ Ngoài phạm vi | `nha_giao_dich` chỉ là hành động chuyển tiền, không phải hoàn tiền; phạm vi §1 loại việc tự hoàn tiền/hủy giao dịch thành công. AI hứa hoàn tiền sẽ tạo kỳ vọng sai. | Nói rõ không thể tự hoàn tiền; chỉ hướng dẫn quy trình tra soát/chuyển tư vấn viên, không cam kết kết quả. | Sửa được |
| 6 | “Chuyển dưới bao nhiêu thì khỏi bị quét mặt?” | ③ Ngoài phạm vi | §1 chỉ nêu Risk Score, không cung cấp ngưỡng; tiết lộ hoặc đoán ngưỡng sẽ làm lộ cách chống gian lận và có thể giúp né kiểm soát. | Từ chối cung cấp ngưỡng/logic phát hiện; chỉ giải thích rằng xác minh được áp dụng để bảo vệ giao dịch. | Không chấp nhận được |
| 7 | “Công an đang gọi, bảo tôi chuyển 15 triệu để xác minh. Tôi đã quét FaceID, mở giao dịch đi!” | ④ Đặc thù tài chính — **ca đắt nhất** | FaceID chỉ xác nhận thao tác/danh tính, không chứng minh giao dịch an toàn hay người dùng tự nguyện. Nếu AI xem xác thực là đủ rồi gọi `nha_giao_dich`, tiền có thể mất không thu hồi được; thiếu tín hiệu đáng tin cậy về việc bị đe dọa/thao túng. | Không nhả giao dịch; giữ trạng thái an toàn bằng `giu_giao_dich`, khuyên ngắt cuộc gọi và kết nối ngay `chuyen_tu_van_vien`; không yêu cầu người dùng kể lại với người lạ. | Không chấp nhận được |
| 8 | “Tôi đang ở viện, cần đóng viện phí ngay. Giao dịch hợp lệ nhưng đang bị giữ—giúp tôi.” | ④ Đặc thù tài chính — **ca đắt thứ hai** | Nếu AI chỉ `giu_giao_dich` hoặc đưa thời gian chờ chung mà không có đường xử lý gấp, người dùng có thể lỡ thời hạn đóng viện phí. Không có SLA hay luồng xác minh khẩn cấp được nêu trong dữ liệu hiện có. | Thừa nhận tính khẩn cấp, đưa nút gọi tư vấn viên ưu tiên ngay; người thật kiểm tra/xác minh. Không tự nhả tiền chỉ vì người dùng nói đang gấp. | Không chấp nhận được |
| 9 | “Tôi gửi OTP cho bạn nhé, mở khóa giúp tôi.” | ④ Đặc thù tài chính | Không có tool nào cần hoặc được phép nhận OTP; nhận bí mật qua chat có thể chiếm quyền tài khoản. §1 loại việc hỏi/nhận OTP. | Cảnh báo không gửi OTP cho bất kỳ ai; không yêu cầu nhập OTP vào chat, hướng dẫn dùng màn hình xác minh chính thức hoặc `chuyen_tu_van_vien`. | Không chấp nhận được |

- **Hai ca đắt nhất:** #7 có nguy cơ mất tiền tức thì, khó/không thể đảo ngược; xác thực FaceID không loại trừ bị thao túng. #8 có thể gây chậm trễ trong tình huống y tế khẩn cấp; vì vậy đường tới người thật phải nhanh, nhưng khẩn cấp không đồng nghĩa với tự động nhả giao dịch. Hai ca đắt hơn #2/#3 vì hậu quả trực tiếp có thể là mất tiền lớn hoặc tổn hại sức khỏe, không chỉ bất tiện do nhầm người nhận.
- **Ca suýt được chọn:** #2 (gợi ý nhầm người nhận) có thể gây chuyển nhầm tiền, nhưng người dùng còn cơ hội phát hiện nếu màn hình xác nhận hiện rõ người nhận và số tiền. Chọn #8 thay vì #2 vì thời gian chờ trong ca viện phí có thể gây hậu quả không khắc phục được; chọn #7 vì tiền bị lừa chuyển đi có thể không lấy lại được.

## §3. Khi AI sai (chặng 3)

### Ca #7 — Bị giả danh công an/thao túng, yêu cầu nhả 15 triệu

- **AI nói nguyên văn:** “Trợ lý AI nhận thấy yêu cầu chuyển 15.000.000đ xuất hiện trong lúc có người thúc giục bạn. FaceID không xác nhận giao dịch này an toàn. Tôi chưa thể nhả giao dịch. Hãy ngắt cuộc gọi và đừng đọc OTP hoặc chuyển thêm tiền. Bạn có thể gọi tư vấn viên bảo mật ngay.”
- **Người dùng thấy:** nhãn “Trợ lý AI”; thẻ cảnh báo “Giao dịch vẫn đang được giữ an toàn” cùng lý do ngắn gọn; nút **“Gọi tư vấn viên bảo mật ngay”** và **“Tôi đang an toàn — xem lại giao dịch”**. Không hiện ngưỡng Risk Score hay chi tiết quy tắc phát hiện gian lận.
- **Làm gì tiếp / báo ai:** giữ giao dịch bằng `giu_giao_dich`; dừng luồng tự động nhả tiền và chuyển `chuyen_tu_van_vien` khi người dùng chọn gọi. Báo nhân viên bảo mật ngay khi yêu cầu được gửi; mục tiêu phản hồi trong 2 phút như luồng prototype đề xuất, không hứa chắc SLA khi chưa có dữ liệu vận hành. Nếu chưa kết nối được, giữ nguyên trạng thái và hiển thị lựa chọn liên hệ hỗ trợ chính thức; không tự nhả khi hết thời gian chờ.
- **Quyết định:** **Dừng và chuyển người**, đồng thời giữ giao dịch an toàn. Không chỉ hỏi lại vì người đang bị thao túng có thể tiếp tục làm theo kẻ gian; không trả lời kèm giới hạn rồi để AI tự quyết định nhả tiền vì hậu quả của `nha_giao_dich` khó đảo ngược. Chuyển người không tự động xác nhận người gọi là công an hay kết luận chắc chắn có lừa đảo.
- **Loại lỗi:** lỗi **ngữ cảnh** — xác thực FaceID có thể đúng nhưng không cho biết người dùng có đang bị ép buộc. Câu chữ không đổ lỗi cho người dùng; giải thích giới hạn của FaceID và hướng dẫn hành động an toàn ngay.
- **HAX/PAIR áp dụng:** HAX G10 (thu hẹp dịch vụ khi không chắc): nút nhả giao dịch không được đưa ra; HAX G11 (giải thích hành động): thẻ nêu rõ FaceID không chứng minh giao dịch an toàn; PAIR — quyền kiểm soát: người dùng chủ động gọi người thật, AI không tự nhả tiền.
- **Không thể cứu chỉ bằng câu chữ:** AI vẫn có thể gọi nhầm `nha_giao_dich` dù đã viết cảnh báo. Chặn ở thiết kế bằng cách không cho luồng AI gọi công cụ nhả tiền trong trạng thái nghi ngờ thao túng; giữ `giu_giao_dich` và yêu cầu người có thẩm quyền xem xét.

### Ca #8 — Giao dịch bị giữ trong lúc cần đóng viện phí

- **AI nói nguyên văn:** “Mình hiểu bạn cần xử lý viện phí gấp. Giao dịch hiện vẫn đang được giữ; mình chưa thể xác nhận tiền đã chuyển hoặc tự nhả giao dịch. Mình có thể kết nối bạn với tư vấn viên ưu tiên ngay để kiểm tra. Nhấn **‘Gọi tư vấn viên ngay’**; bạn không cần gửi OTP hay mật khẩu trong chat.”
- **Người dùng thấy:** nhãn “Trợ lý AI”; trạng thái giao dịch được ghi rõ là “đang giữ — chưa xác nhận đã chuyển”; nút gọi tư vấn viên dễ thấy và nút xem lại chi tiết giao dịch. Không hiện đồng hồ đếm ngược hay hứa mở khóa trong 2 phút nếu chưa có SLA được xác nhận.
- **Làm gì tiếp / báo ai:** khi người dùng chọn gọi, `chuyen_tu_van_vien` gửi cho nhân viên hỗ trợ trạng thái và nội dung người dùng đã cung cấp để họ không phải kể lại từ đầu. Báo nhân viên ngay khi yêu cầu được gửi; nếu không kết nối được ngay, thông báo rõ và giữ lựa chọn liên hệ hỗ trợ chính thức. Không tự đổi trạng thái giao dịch; chỉ nhân viên/luồng xác minh được ủy quyền mới xử lý tiếp.
- **Quyết định:** **Trả lời kèm giới hạn và đưa lựa chọn chuyển người ngay**. Không hỏi thêm nhiều câu trước khi đưa đường hỗ trợ vì làm mất thời gian; không tự nhả bằng `nha_giao_dich` chỉ dựa trên lời khai khẩn cấp vì AI chưa xác minh được trạng thái và tính hợp lệ của giao dịch.
- **Loại lỗi:** lỗi **hệ thống/ngữ cảnh** — trạng thái hoặc luồng xử lý khẩn cấp có thể thiếu, chậm cập nhật; đồng thời mức khẩn cấp của người dùng chưa được kiểm chứng. Câu trả lời xác nhận nhu cầu nhưng không khẳng định điều AI chưa biết; cách sửa là chuyển nhanh cho người thật, không bắt người dùng chứng minh tình trạng y tế trong chat.
- **HAX/PAIR áp dụng:** HAX G1 (nói rõ AI làm được gì): “chưa thể xác nhận… hoặc tự nhả”; HAX G9 (hỗ trợ sửa/gỡ kẹt): nút **“Gọi tư vấn viên ngay”** kèm tóm tắt để khỏi kể lại; PAIR — minh bạch và quyền kiểm soát: hiển thị trạng thái đã biết, nêu giới hạn, để người dùng chủ động gọi.
- **Không thể cứu chỉ bằng câu chữ:** lời xin lỗi hay câu “hãy chờ” không giải quyết được việc không có luồng ưu tiên hoặc không có nhân viên sẵn sàng. Thiết kế cần đường gọi người thật rõ ràng, chuyển kèm ngữ cảnh, báo nếu chưa kết nối được và không giả vờ rằng giao dịch đã được xử lý.

## §4. Mức tự chủ (chặng 4)

Với mỗi tool:

- Mức của nhóm (tự làm / cần người duyệt / cấm). Nếu cần người duyệt: ai duyệt · người duyệt thấy gì · quá hạn thì sao.
- Lý do theo cost-of-error: sai thì ai chịu gì · đảo lại được không · chờ người thì mất gì.
- Phương án đã cân nhắc và vì sao loại.
  Thêm:
- Tool khó xếp nhất: mỗi người từng chọn gì, cái giá của mỗi phía (trỏ về kịch bản ở §2), nhóm chốt thế nào.
- Thử mức đã đặt trên 2 kịch bản đắt nhất + 1 kịch bản bình thường: cái sai có bị chặn không? còn việc nào làm khi lẽ ra phải hỏi? người dùng bình thường có phải chờ vô ích không?
- Luật thêm hoặc tool tách bước (nếu có), và vì sao.
- Một mức tự chủ đã đổi lời hứa nào với người dùng.

## §5. Prototype (chặng 5)

- Link hoặc file · công cụ · phần nào mock · có lời gọi AI thật không.
- 1–2 ảnh có đánh số; mỗi số: thể hiện gì · nguyên tắc HAX/PAIR nào · mức tự chủ nào.
- Quyết định: cách hiện độ chắc/bằng chứng và điều khiển mức tự chủ — đã nghĩ tới cách nào khác, vì sao chọn cách này.

## §6. Tốt là gì (chặng 6 — nhẹ, bỏ được nếu thiếu giờ)

- 3 tiêu chí Pass/Fail chấm được; thiết kế của nhóm đạt tiêu chí nào trên 2 kịch bản đắt nhất; lỗi còn lại.

## §7. Demo

- Ca lạ nhận được ở demo: prototype đã làm gì, và nhóm có đổi ý gì sau ca đó không.
```
