# Phân cảnh mô phỏng: Gương trong hầm

> Tệp này được tạo tự động từ `js/case.js` bằng lệnh `node tools/tao-phan-canh.js`. Muốn sửa khung tranh, sửa trong `js/case.js` (mục `panels`) rồi chạy lại lệnh.

Mỗi tài liệu có tab **Mô phỏng** gồm các khung tranh (phông nền + nhân vật + đồ vật + lời dẫn) và/hoặc nút mở **hoạt cảnh trên sơ đồ đoàn tàu** theo đúng lời khai đó.

Khung có nhãn *theo lời khai* (`fx: 'claim'`) là phiên bản người khai kể, chưa chắc đúng.

## Khung tranh theo tài liệu

### T01 · Báo cáo nhanh của trưởng tàu

- **r1** · 12:44 · nền `brake`: Tàu hãm khẩn cấp vì cảnh báo đá rơi. Hành lý đổ khắp khoang.
- **r2** · 12:45 · nền `k3`: Chị Mai phát hiện ông Minh nằm dưới sàn, sát chân bàn.
- **r3** · 12:47 · nền `corr9`: Trưởng tàu ghi nhận ban đầu: hành khách ngã khi tàu phanh.

### T02 · Danh sách hành khách liên quan

- Hoạt cảnh trên sơ đồ: phiên bản **Chỉ bằng chứng**, bắt đầu lúc 12:12

### T03 · Nhật ký chạy tàu qua đèo

- **st1** · 12:33 · nền `station`: Tàu đứng yên ở ga Hải Vân, chờ tàu hàng ngược chiều đi qua.
- Dải hành trình qua đèo (6 hầm, ga Hải Vân, điểm phanh)

### T04 · Giám định pháp y sơ bộ

- **fo1** · nền `diagram-head`: Vết chí mạng: hình cung tròn ~7 cm, sau đầu lệch trái. Vết trán: vệt thẳng, gần như không chảy máu.
- **fo2** · nền `diagram-berth`: Máu thấm nhiều ở gối giường 9, dưới sàn chỉ vài vệt nhỏ.

### T05 · Lời khai Lò Thị Mai

- **m1** · 12:31 · nền `k3up`: Tàu dừng hẳn, tiếng phanh hơi xì dài. Mai tỉnh giấc.
- **m2** · 12:34 · nền `door`: Một người mặc áo nhân viên kéo cửa khoang. Mùi trầm hương thoang thoảng.
- **m3** · 12:45 · nền `k3`: Tàu phanh. Mai tháo bịt mắt và thấy ông Minh dưới sàn.
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Mai**, bắt đầu lúc 12:33:30

### T06 · Lời khai Phan Gia Huy

- **h1** · 12:16 · nền `dining`: Huy mang laptop sang toa ăn, ngồi cùng Dung ở bàn 4.
- **h2** · 12:31 · nền `dining`: Tàu dừng. Dung nói đi vệ sinh.
- **h3** · 12:34 · nền `dining` · *theo lời khai*: "Chừng hai, ba phút sau chị quay lại." (theo lời Huy)
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Huy**, bắt đầu lúc 12:30

### T07 · Lời khai Lương Mỹ Dung

- **d1** · 12:05 · nền `dining`: Dung ngồi bàn 4 toa ăn, duyệt sơ đồ treo tranh.
- **d2** · 12:31 · nền `wc8` · *theo lời khai*: "Tôi đi WC đầu toa 8, ngay cạnh toa ăn." (theo lời Dung)
- **d3** · 12:34 · nền `dining` · *theo lời khai*: "Tôi về chỗ ngay, ngồi với Huy đến lúc tàu phanh."
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Dung**, bắt đầu lúc 12:30

### T08 · Lời khai Hà Quang Khoa

- **k1** · 12:20 · nền `k3`: Khoa rời khoang, ra chỗ nối toa gọi cho vợ.
- **k2** · 12:30 · nền `junction` · *theo lời khai*: "Tôi đứng ở chỗ nối toa ngắm biển, không về khoang." (theo lời Khoa)
- **k3p** · 12:46 · nền `corr9`: Nghe tiếng hét, Khoa chạy về khoang 3.
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Khoa**, bắt đầu lúc 12:38

### T09 · Lời khai Nguyễn Văn Cường

- **c1** · 12:31 · nền `staff`: Cường ngồi trong phòng nhân viên ghi sổ.
- **c2** · 12:35 · nền `corr9` · *theo lời khai*: "Áo đồng phục treo ở móc ngoài, như mọi khi." (theo lời Cường)
- **c3** · 12:45 · nền `k3`: Nghe tiếng hét, Cường chạy tới khoang 3.
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Cường**, bắt đầu lúc 12:33

### T11 · Lời khai nhân viên toa ăn

- **w1** · 12:35 · nền `dining`: Huy đeo tai nghe, gọi thêm hai cà phê sữa.
- **w2** · 12:38 · nền `dining`: Chị Hằng mang cà phê ra: bàn 4 chỉ có mình Huy. Tàu đang trong hầm dài.
- **w3** · 12:42 · nền `dining`: Dung quay lại, tóc mai ướt, tay không.
- Hoạt cảnh trên sơ đồ: phiên bản **Chỉ bằng chứng**, bắt đầu lúc 12:38

### T12 · Biên bản khám xét toa 8 – toa 9

- **s1** · 13:40 · nền `wc`: Thùng rác WC đầu toa 9: bình giữ nhiệt móp đáy và bìa sổ đỏ bị xé ruột.
- **s2** · 13:45 · nền `wc8`: WC đầu toa 8 treo biển hỏng từ 11:30.
- **s3** · 13:50 · nền `corr9`: Áo đồng phục của Cường trên móc hành lang đầu toa 9.

### T14 · Giám định bình giữ nhiệt

- **th1** · nền `evidence`: Đáy bình 7,1 cm đặt lên sơ đồ vết thương: khớp.
- **th2** · nền `evidence`: Nắp cốc của bình có vết son màu đỏ gạch.

### T15 · Thu giữ 4 bình giữ nhiệt Đèo Mây

- **tt1** · nền `evidence`: Ba bình nguyên vẹn đều có chủ. Bình của Dung không ở toa 8.

### T16 · Thư của nhà sưu tập Singapore

- **em1** · 07:58 · nền `print`: Bản in "Biển mây Hải Vân số 7" đánh số 37/30. Chữ ký không phải của ông Minh.

### T17 · Kiểm tra hành lý Lương Mỹ Dung

- **lg1** · nền `evidence`: Nước hoa trầm hương, son đỏ gạch, đồng hồ đeo tay phải.
- **lg2** · nền `evidence`: Dung ký biên bản bằng tay trái.

### T18 · Lời khai bổ sung của Khoa

- **kk1** · 12:40 · nền `k3`: Khoa quay về. Bố nằm quay mặt vào vách, đắp chăn kín. Mùi trầm vẫn còn.
- **kk2** · 12:41 · nền `k3`: Khoa lấy năm triệu trong ví ở túi áo khoác của bố.
- Hoạt cảnh trên sơ đồ: phiên bản **Chỉ bằng chứng**, bắt đầu lúc 12:40:30

### T19 · Lời khai bổ sung của Huy

- **hh1** · 12:31 · nền `dining`: Huy đeo tai nghe chỉnh ảnh, không nhìn đồng hồ.
- **hh2** · 12:31 · nền `dining`: Dung đứng dậy, cầm theo bình giữ nhiệt.
- **hh3** · 12:42 · nền `dining`: Lúc về Dung không cầm gì, bảo để quên ở WC.
- Hoạt cảnh trên sơ đồ: phiên bản **Chỉ bằng chứng**, bắt đầu lúc 12:31

### T20 · Lời khai bổ sung của Cường

- **cc1** · 12:30 · nền `staff`: Cường đóng cửa phòng nhân viên, gọi điện cho con gái suốt 8 phút.
- **cc2** · 12:46 · nền `corr9`: Áo bị treo lộn trái, tay áo ướt, mùi trầm.
- Hoạt cảnh trên sơ đồ: phiên bản **Chỉ bằng chứng**, bắt đầu lúc 12:33

### T21 · Lời khai bổ sung của Dung

- **dd1** · 12:33 · nền `corr9` · *theo lời khai*: "WC toa 8 hỏng nên tôi sang WC đầu toa 9. Tôi không vào khoang nào." (theo lời Dung)
- Hoạt cảnh trên sơ đồ: phiên bản **Theo lời Dung**, bắt đầu lúc 12:33

## Bức tranh tổng thể (Trọng điểm 3)

Người chơi xếp 6 khung theo đúng thứ tự. Khi xếp, khung hiện bản ẩn danh (`anon`), chưa lộ hung thủ. Ở màn kết thúc, khung hiện bản đầy đủ.

1. **12:29** · Trong hầm 3, ông Minh nhắn Dung: "Lên khoang 3 ngay." Không có sóng, tin chờ gửi.
   - Bản ẩn danh: Trong hầm 3, ông Minh nhắn tin gọi một người lên khoang 3. Không có sóng, tin chờ gửi.
2. **12:31** · Tàu dừng ở ga Hải Vân. Dung đọc tin, cầm bình giữ nhiệt rời bàn.
   - Bản ẩn danh: Tàu dừng ở ga Hải Vân. Người nhận tin cầm bình giữ nhiệt rời bàn ở toa ăn.
3. **12:33** · Ở đầu toa 9, Dung khoác áo đồng phục của anh Cường.
   - Bản ẩn danh: Ở đầu toa 9, người đó khoác chiếc áo đồng phục treo trên móc.
4. **12:35** · Trong khoang 3, Dung đánh ông Minh từ phía sau. Máy ảnh trên kính rung lệch.
   - Bản ẩn danh: Trong khoang 3, ông Minh bị đánh từ phía sau. Máy ảnh trên kính rung lệch.
5. **12:38** · Hầm 4: tấm kính thành gương, phản chiếu Dung đứng ở cửa, tay cầm cuốn sổ đỏ.
   - Bản ẩn danh: Hầm 4: tấm kính thành gương, phản chiếu người mặc áo nhân viên đứng ở cửa, tay cầm cuốn sổ đỏ.
6. **12:44** · Tàu phanh gấp. Thi thể lăn xuống sàn, quệt trán vào cạnh bàn. Trông như tai nạn.

## Hoạt cảnh trên sơ đồ

Sơ đồ gồm toa 7 (toa ăn), toa 8, toa 9. Mỗi phiên bản là danh sách mốc `[giờ, vị trí]` cho từng nhân vật. Giữa hai mốc khác vị trí, nhân vật đứng yên rồi đi bộ dọc hành lang tới vị trí mới, đến nơi đúng giờ của mốc sau.

### Theo lời Huy

- **huy**: 12:10 Khoang 3 · giường 9 → 12:14 Khoang 3 · cạnh cửa → 12:16 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa
- **dung**: 12:10 Toa 7 · bàn 4 → 12:31:20 Toa 7 · bàn 4 → 12:32 WC đầu toa 8 → 12:33:30 WC đầu toa 8 → 12:34 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa

### Theo lời Dung

- **dung**: 12:10 Toa 7 · bàn 4 → 12:31:20 Toa 7 · bàn 4 → 12:32 WC đầu toa 8 → 12:33:30 WC đầu toa 8 → 12:34 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa
- **huy**: 12:10 Khoang 3 · giường 9 → 12:14 Khoang 3 · cạnh cửa → 12:16 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa

### Theo lời Khoa

- **khoa**: 12:10 Khoang 3 · giường 10 → 12:20 Khoang 3 · giường 10 → 12:21 Chỗ nối toa 9 – 10 → 12:46 Chỗ nối toa 9 – 10 → 12:47 Khoang 3 · cạnh cửa

### Theo lời Cường

- **cuong**: 12:10 Phòng nhân viên toa 9 → 12:45 Phòng nhân viên toa 9 → 12:45:40 Khoang 3 · cạnh cửa
- **ao**: 12:10 Móc áo đầu toa 9 → 12:50 Móc áo đầu toa 9

### Theo lời Mai

- **mai**: 12:10 Khoang 3 · giường 11 (trên) → 12:50 Khoang 3 · giường 11 (trên)
- **x**: 12:33:40 Khoang 3 · cạnh cửa → 12:34:30 Khoang 3 · cạnh cửa

### Chỉ bằng chứng

Chỉ hiện những gì bằng chứng xác nhận (xem danh sách bên dưới).


### Sự thật

- **minh**: 12:10 Khoang 3 · giường 9 → 12:50 Khoang 3 · giường 9
- **mai**: 12:10 Khoang 3 · giường 11 (trên) → 12:50 Khoang 3 · giường 11 (trên)
- **huy**: 12:10 Khoang 3 · giường 9 → 12:14 Khoang 3 · cạnh cửa → 12:16 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa
- **dung**: 12:10 Toa 7 · bàn 4 → 12:31:20 Toa 7 · bàn 4 → 12:33:10 Móc áo đầu toa 9 → 12:33:40 Khoang 3 · cạnh cửa → 12:34 Khoang 3 · giường 9 → 12:39:20 Khoang 3 · giường 9 → 12:39:40 Khoang 3 · cạnh cửa → 12:39:55 Móc áo đầu toa 9 → 12:40:05 WC đầu toa 9 → 12:41:20 WC đầu toa 9 → 12:42:30 Toa 7 · bàn 4 → 12:47 Toa 7 · bàn 4 → 12:49 Khoang 3 · cạnh cửa
- **ao**: 12:10 Móc áo đầu toa 9 → 12:33:10 Móc áo đầu toa 9 → 12:33:40 Khoang 3 · cạnh cửa → 12:34 Khoang 3 · giường 9 → 12:39:20 Khoang 3 · giường 9 → 12:39:40 Khoang 3 · cạnh cửa → 12:39:55 Móc áo đầu toa 9 → 12:50 Móc áo đầu toa 9
- **khoa**: 12:10 Khoang 3 · giường 10 → 12:20 Khoang 3 · giường 10 → 12:21 Chỗ nối toa 9 – 10 → 12:40 Chỗ nối toa 9 – 10 → 12:40:20 Khoang 3 · cạnh cửa → 12:41 Khoang 3 · cạnh cửa → 12:41:55 Khoang 3 · cạnh cửa → 12:42:30 Chỗ nối toa 9 – 10 → 12:46 Chỗ nối toa 9 – 10 → 12:47 Khoang 3 · cạnh cửa
- **cuong**: 12:10 Phòng nhân viên toa 9 → 12:45 Phòng nhân viên toa 9 → 12:45:40 Khoang 3 · cạnh cửa

## Sự thật đã kiểm chứng (hiện khi người chơi có vật chứng)

Khi lời khai đặt một người ở chỗ khác với bằng chứng, hoạt cảnh tô đỏ chỗ mâu thuẫn.

| Ai | Từ | Đến | Ở / Không thể ở | Cần vật chứng | Ghi chú |
|---|---|---|---|---|---|
| minh | 12:16:00 | 12:16:40 | Khoang 3 · giường 9 | `cam_h1` | Hầm 1: ông Minh ở cửa sổ |
| khoa | 12:16:00 | 12:16:40 | Khoang 3 · giường 10 | `cam_h1` | Hầm 1: Khoa ngồi giường 10 |
| minh | 12:22:30 | 12:23:40 | Khoang 3 · giường 9 | `cam_h2` | Hầm 2: ông Minh ngồi đọc |
| minh | 12:28:50 | 12:29:30 | Khoang 3 · giường 9 | `cam_h3` | Hầm 3: ông Minh còn nhắn tin |
| minh | 12:35:10 | 12:35:16 | Khoang 3 · giường 9 | `cam_jolt` | 12:35:12 khung hình rung khi tàu đứng yên |
| x | 12:38:20 | 12:39:30 | Khoang 3 · cạnh cửa | `cam_h4` | Hầm 4: người mặc áo nhân viên ở cửa khoang 3 |
| ao | 12:38:20 | 12:39:30 | Khoang 3 · cạnh cửa | `cam_h4` | Hầm 4: chiếc áo đồng phục đang ở khoang 3 |
| khoa | 12:41:10 | 12:41:50 | Khoang 3 · cạnh cửa | `cam_h5` | Hầm 5: Khoa ở móc áo trong khoang 3 |
| huy | 12:35:00 | 12:42:00 | Toa 7 · bàn 4 | `d_waiter` | Nhân viên toa ăn: Huy ngồi bàn 4 |
| dung | 12:35:00 | 12:42:20 | không ở Toa 7 · bàn 4 | `d_waiter` | Nhân viên toa ăn: 12:38 Dung không ở bàn 4 |
| dung | 12:31:00 | 12:37:00 | không ở WC đầu toa 8 | `d_wc8` | WC đầu toa 8 khoá, treo biển hỏng từ 11:30 |
| cuong | 12:30:00 | 12:38:00 | Phòng nhân viên toa 9 | `x_cuong_call` | Cường gọi điện trong phòng nhân viên |
| khoa | 12:40:20 | 12:41:55 | Khoang 3 · cạnh cửa | `x_khoa_1240` | Khoa tự nhận: 12:40 quay về khoang |
