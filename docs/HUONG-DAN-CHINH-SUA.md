# Hướng dẫn: chơi, chỉnh sửa và đưa game lên web

Tài liệu này dành cho người làm game. Bạn không cần cài gì, mọi thứ đều làm được ngay trên trang GitHub.

---

## 1. Bật GitHub Pages (làm một lần)

GitHub Pages biến repo này thành một trang web miễn phí.

1. Mở repo trên GitHub, bấm **Settings** (thanh trên cùng của repo).
2. Ở cột trái, chọn **Pages**.
3. Ở mục *Build and deployment*:
   - **Source:** chọn **Deploy from a branch**
   - **Branch:** chọn **main**, thư mục **/ (root)**, rồi bấm **Save**
4. Đợi 1–2 phút rồi tải lại trang. GitHub sẽ hiện link dạng:
   `https://tuxedomonkey52.github.io/chuyen-tau-se1/`

Từ đó, mỗi lần bạn lưu (commit) thay đổi lên nhánh `main`, trang web tự cập nhật sau khoảng 1 phút.

> Tiến độ chơi được lưu trong trình duyệt của từng người chơi. Nếu bạn sửa nhiều vào nội dung vụ án, hãy đổi `saveKey` trong `js/case.js` (ví dụ thêm `-v2`) để người chơi cũ bắt đầu lại từ đầu, tránh lỗi tiến độ cũ không khớp.

---

## 2. Sửa chữ ngay trên GitHub

1. Mở tệp cần sửa, ví dụ `js/case.js`.
2. Bấm biểu tượng **bút chì** (Edit this file) ở góc phải.
3. Sửa nội dung, rồi bấm **Commit changes…** → **Commit changes**.

### Quy ước viết trong `js/case.js`

| Viết | Hiện ra |
|---|---|
| `**chữ đậm**` | **chữ đậm** |
| `*chữ nghiêng*` | *chữ nghiêng* |
| `[[T05]]` | nút bấm mở tài liệu T05 |
| `'12:31'` hoặc `'12:31:20'` | giờ (trong hoạt cảnh, máy ảnh) |

**Lưu ý khi sửa:** chữ nằm giữa hai dấu nháy đơn `'...'`. Nếu trong câu có dấu nháy đơn, hãy dùng dấu nháy kép “…” hoặc bỏ đi. Đừng xoá dấu phẩy `,` cuối dòng.

### Các mục trong `js/case.js`

| Mục | Dùng để |
|---|---|
| `meta` | Tên vụ án, đoạn giới thiệu, mã lưu tiến độ |
| `people` | Nhân vật: tên, vai trò, tóm tắt, màu trên sơ đồ |
| `evidence` | Danh sách vật chứng `[mã, nguồn, mô tả, tham chiếu]` |
| `docs` | Tài liệu: báo cáo, lời khai, biên bản. `b` là đợt mở (0 có sẵn, 1 sau trọng điểm 1, `'c'` mở bằng đối chất) |
| `claims` | Lời khai để đối chất ở Bảng điều tra, vật chứng bác bỏ (`ok`) và câu trả lời (`say`) |
| `points` | 3 trọng điểm: câu hỏi, đáp án, lời nhắc khi sai, 2 gợi ý |
| `panels` | Khung tranh mô phỏng |
| `places`, `tracks`, `facts` | Hoạt cảnh trên sơ đồ đoàn tàu |
| `phone` | Điện thoại nạn nhân: hình vẽ mở khoá, tin nhắn, ảnh |
| `scene` | Hiện trường: các biển số và mô tả |
| `solution`, `epilogue` | Lời giải và hậu truyện |

---

## 3. Thêm một khung tranh mô phỏng

Mỗi khung là một dòng trong mục `panels`:

```js
m2:{ bg:'door', t:'12:34', cap:'Một người mặc áo nhân viên kéo cửa khoang.', fig:[['shadow',200,250,1.05]], fx:'scent' },
```

| Thuộc tính | Ý nghĩa |
|---|---|
| `bg` | Phông nền: `k3` (trong khoang), `k3dark` (khoang lúc trong hầm), `k3up` (nhìn từ giường trên), `door` (cửa khoang), `corr9` (hành lang đầu toa 9), `dining` (toa ăn), `junction` (chỗ nối toa), `staff` (phòng nhân viên), `wc`, `wc8` (WC toa 8 treo biển hỏng), `station` (ga Hải Vân), `brake` (tàu phanh), `phone` (màn hình điện thoại), `evidence` (bàn vật chứng), `print` (bản in 37/30), `diagram-head`, `diagram-berth` |
| `t` | Giờ hiện trên khung |
| `cap` | Lời dẫn dưới khung |
| `fig` | Nhân vật: `[mã, x, y, cỡ, nét mặt]`. Mã: `minh`, `dung`, `dungjacket`, `huy`, `khoa`, `cuong`, `mai`, `hang`, `shadow` (người không rõ mặt). Nét mặt: `calm`, `tense`, `angry`. Khung rộng 400, cao 250, `x, y` là điểm giữa chân bức chân dung |
| `props` | Đồ vật: `[mã, x, y, cỡ]`. Mã: `thermos`, `cover`, `bin`, `jacket`, `laptop`, `cups`, `papers`, `phone`, `logbook`, `wallet`, `perfume`, `lipstick`, `watch`, `cap`, `woundcircle`, `lefthand`, `floorbody`, `berthbody`, `minhback` |
| `fx` | Hiệu ứng: `claim` (nhãn "theo lời khai"), `scent` (mùi hương), `tunnel` (tối), `jolt` (rung), `mirror` (phản chiếu trong kính), `wet` (tóc ướt), `freight` (tàu hàng) |

Sau đó thêm mã khung vào `sim.panels` của tài liệu muốn gắn, ví dụ `sim:{ panels:['m1','m2','m3'] }`.

Chạy `node tools/tao-phan-canh.js` để cập nhật `docs/PHAN-CANH.md` (không bắt buộc).

---

## 4. Thêm một phiên bản hoạt cảnh

Trong mục `tracks`, mỗi phiên bản liệt kê các mốc `[giờ, vị trí]` cho từng người:

```js
khoa: { label:'Theo lời Khoa', doc:'T08', who:{
  khoa:[['12:10','k3b'],['12:20','k3b'],['12:21','t9noi'],['12:46','t9noi'],['12:47','k3door']] } },
```

Vị trí lấy từ mục `places` (toạ độ trên sơ đồ rộng 1180, cao 200). Muốn hoạt cảnh tự phát hiện lời khai sai, thêm một dòng vào `facts`:

```js
{ who:'khoa', t0:'12:41:10', t1:'12:41:50', at:'k3door', ev:'cam_h5', label:'Hầm 5: Khoa ở móc áo trong khoang 3' },
```

Nghĩa là: khi người chơi đã có vật chứng `cam_h5`, trong khoảng giờ đó Khoa *phải* ở `k3door`. Nếu lời khai đặt Khoa ở chỗ khác, sơ đồ tô đỏ. Dùng `not:'t8wc'` thay cho `at` để nói một người *không thể* ở đâu đó.

---

## 5. Cấu trúc thư mục

```
index.html            khung trang
css/style.css         giao diện
js/case.js            TOÀN BỘ nội dung vụ án (sửa ở đây là chính)
js/art.js             hình vẽ bằng mã: chân dung, sơ đồ, khung tranh, khung hình máy ảnh
js/core.js            lõi: trạng thái, âm thanh, lớp phủ
js/views.js           hồ sơ, hiện trường, bảng điều tra, trọng điểm
js/sim.js             hoạt cảnh trên sơ đồ
js/devices.js         máy ảnh time-lapse, điện thoại
js/main.js            mở đầu, kết thúc, sự kiện
js/icons.js           biểu tượng Lucide
docs/KICH-BAN.md      kịch bản đầy đủ (LỘ ĐÁP ÁN)
docs/PHAN-CANH.md     phân cảnh mô phỏng (LỘ ĐÁP ÁN)
tools/tao-phan-canh.js  tạo lại PHAN-CANH.md từ case.js
```

## 6. Thư viện mở dùng trong game

| Thư viện | Dùng để | Giấy phép |
|---|---|---|
| [GSAP 3.12.5](https://github.com/greensock/GSAP) | Chuyển động | Miễn phí (GreenSock) |
| [simplex-noise 2.4.0](https://github.com/jwagner/simplex-noise.js) | Vân giấy, vân bần | MIT |
| [Lucide](https://github.com/lucide-icons/lucide) | Biểu tượng | ISC |
| [Google Fonts](https://fonts.google.com) | Phông chữ | OFL |

Âm thanh được tạo trực tiếp bằng Web Audio của trình duyệt, không dùng tệp ghi âm.
