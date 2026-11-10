/* =====================================================================
   DỮ LIỆU VỤ ÁN: "Gương trong hầm" (tàu SE1, đèo Hải Vân)
   ---------------------------------------------------------------------
   File này chứa TOÀN BỘ chữ của vụ án: nhân vật, tài liệu, lời khai,
   khung tranh mô phỏng, hoạt cảnh trên sơ đồ, trọng điểm và lời giải.
   Có thể sửa trực tiếp trên GitHub (bấm biểu tượng bút chì).
   Quy ước trong đoạn văn:  **chữ đậm**   *chữ nghiêng*   [[T05]] = nút mở tài liệu T05
   Giờ viết dạng "12:31" hoặc "12:31:20".
   Xem hướng dẫn chi tiết trong docs/HUONG-DAN-CHINH-SUA.md
   ===================================================================== */
window.CASE = {

meta: {
  code: 'SE1-2111',
  title: ['Gương', 'trong hầm'],
  train: 'Tàu SE1 Hà Nội – Sài Gòn',
  place: 'Đèo Hải Vân · trưa 21/11/2025',
  saveKey: 'se1-guong-trong-ham-v1',
  intro: 'Trưa 21/11, tàu SE1 leo qua đèo Hải Vân trong mưa và mây. Đến 12 giờ 44, tàu phanh gấp vì cảnh báo đá rơi. Một phút sau, nhiếp ảnh gia Hà Quang Minh được phát hiện nằm dưới sàn khoang 3, toa 9. Trưởng tàu ghi: ngã khi tàu phanh. Nhưng chiếc máy ảnh ông gắn trên cửa sổ vẫn chụp suốt dọc đường đèo.',
  investigator: 'Thiếu tá Võ Thanh Sơn',
  agency: ['CÔNG AN THÀNH PHỐ ĐÀ NẴNG', 'CƠ QUAN CẢNH SÁT ĐIỀU TRA'],
  city: 'Đà Nẵng',
  span: ['12:10', '12:50']
},

/* ---------- Nhân vật ---------- */
victim: 'minh',
people: {
  minh:  { n: 'Hà Quang Minh',    s: 'Ông Minh', r: 'Nạn nhân · 64 tuổi · nhiếp ảnh gia', color: '#b8b2a6', doc: 'T04' },
  dung:  { n: 'Lương Mỹ Dung',    s: 'Dung',  r: 'Giám đốc Đèo Mây Gallery · 46 tuổi', color: '#d9806b', doc: 'T07',
           sum: 'Tổ chức triển lãm "Ba mươi năm qua đèo", độc quyền phát hành ảnh in giới hạn của ông Minh. Đặt vé riêng ở toa 8.' },
  huy:   { n: 'Phan Gia Huy',     s: 'Huy',   r: 'Trợ lý, học trò · 31 tuổi', color: '#7fa6e0', doc: 'T06',
           sum: 'Làm trợ lý cho ông Minh tám năm. Nằm giường 12, khoang 3. Ngồi toa ăn với Dung suốt đoạn đèo.' },
  khoa:  { n: 'Hà Quang Khoa',    s: 'Khoa',  r: 'Con trai nạn nhân · 36 tuổi', color: '#8cc49a', doc: 'T08',
           sum: 'Kinh doanh quán cà phê thua lỗ. Tối trước cãi nhau với bố vì chuyện tiền. Nằm giường 10.' },
  cuong: { n: 'Nguyễn Văn Cường', s: 'Cường', r: 'Nhân viên phục vụ toa 9 · 52 tuổi', color: '#e0c06a', doc: 'T09',
           sum: 'Hai mươi năm chạy tàu. Áo đồng phục treo ở móc ngoài phòng nhân viên đầu toa 9.' },
  mai:   { n: 'Lò Thị Mai',       s: 'Mai',   r: 'Hành khách · 27 tuổi · giáo viên', color: '#c79ad8', doc: 'T05',
           sum: 'Cô giáo ở Sơn La, không quen ai trong đoàn. Nằm giường 11, tầng trên. Người phát hiện nạn nhân.' }
},
/* Thứ tự hiển thị nghi phạm */
suspects: ['dung', 'huy', 'khoa', 'cuong', 'mai'],

/* ---------- Vật chứng ----------
   [mã, nguồn, mô tả ngắn, tham chiếu]
   nguồn: scene = hiện trường, doc = tài liệu, cam = máy ảnh, phone = điện thoại, conf = đối chất */
evidence: [
  ['sc_body','scene','Thi thể nằm dưới sàn, đầu sát chân bàn','sc_body'],
  ['sc_pillow','scene','Gối và chăn giường 9 thấm nhiều máu','sc_pillow'],
  ['sc_floor','scene','Sàn quanh thi thể gần như không có máu','sc_floor'],
  ['sc_table','scene','Cạnh bàn có vệt trầy, không có máu đọng','sc_table'],
  ['sc_camera','scene','Máy ảnh time-lapse rơi dưới gầm bàn','sc_camera'],
  ['sc_thermos2','scene','Hai bình giữ nhiệt Đèo Mây trên bàn, nguyên vẹn','sc_thermos2'],
  ['sc_wallet','scene','Ví ông Minh gần như hết tiền mặt','sc_wallet'],
  ['sc_phone','scene','Điện thoại ông Minh kẹt trong khe giường 9','sc_phone'],
  ['sc_door','scene','Cửa trượt khoang 3 không khoá','sc_door'],
  ['sc_mai','scene','Giường 11: bịt mắt và tai nghe của Mai','sc_mai'],
  ['sc_nonotebook','scene','Không thấy cuốn sổ tay bìa đỏ','sc_nonotebook'],

  ['d_report','doc','Trưởng tàu: nghi ngã khi tàu phanh 12:44','T01'],
  ['d_manifest','doc','Khoang 3 toa 9: Minh, Khoa, Mai, Huy','T02'],
  ['d_tunnels','doc','Nhật ký: giờ vào, ra 6 hầm','T03'],
  ['d_stop','doc','Tàu đứng yên ở ga Hải Vân 12:31 – 12:37','T03'],
  ['d_brake','doc','Phanh khẩn cấp lúc 12:44:00','T03'],
  ['d_wound','doc','Vết chí mạng: hình cung tròn ~7 cm, sau đầu bên trái','T04'],
  ['d_scrape','doc','Vết trán khớp cạnh bàn, gần như không chảy máu','T04'],
  ['d_blood','doc','Máu thấm gối giường 9, sàn rất ít','T04'],
  ['d_lefty','doc','Pháp y: hung thủ nhiều khả năng thuận tay trái','T04'],
  ['d_mai_jacket','doc','Mai: người mặc áo nhân viên vào khoang khi tàu dừng','T05'],
  ['d_mai_scent','doc','Mai: khoang có mùi trầm hương','T05'],
  ['d_mai_quarrel','doc','Mai: tối trước Minh và Khoa cãi nhau chuyện tiền','T05'],
  ['d_huy_alibi','doc','Huy: Dung chỉ vắng 2–3 phút','T06'],
  ['d_notebook','doc','Ông Minh luôn mang sổ tay bìa đỏ','T06'],
  ['d_pattern','doc','Mở khoá điện thoại: hình vẽ "dáng đèo, hai đỉnh núi"','T06'],
  ['d_camera','doc','Máy ảnh chụp 2 giây một khung qua kính cửa sổ','T06'],
  ['d_dung_alibi','doc','Dung: đi WC đầu toa 8 rồi về ngay','T07'],
  ['d_dung_thermos','doc','Dung: bình giữ nhiệt của tôi để quên ở toa 8','T07'],
  ['d_dung_nomsg','doc','Dung: trưa nay không nhận tin nào của ông Minh','T07'],
  ['d_gift','doc','Gallery tặng 4 bình giữ nhiệt giống hệt nhau','T07'],
  ['d_khoa_alibi','doc','Khoa: không quay lại khoang trước 12:46','T08'],
  ['d_khoa_debt','doc','Khoa cần tiền cứu quán cà phê','T08'],
  ['d_cuong_jacket','doc','Cường: áo đồng phục treo móc, không ai động vào','T09'],
  ['d_noticket','doc','Không có soát vé khi tàu dừng tránh','T09'],
  ['d_waiter','doc','Nhân viên toa ăn: 12:38 bàn 4 chỉ có Huy','T11'],
  ['d_wet','doc','Dung quay lại 12:42, tóc ướt, tay không','T11'],
  ['d_took_thermos','doc','Dung cầm bình giữ nhiệt khi rời bàn','T11'],
  ['d_wc8','doc','WC đầu toa 8 hỏng khoá từ 11:30','T11'],
  ['d_thermos_found','doc','Bình giữ nhiệt móp đáy trong thùng rác WC toa 9','T12'],
  ['d_cover','doc','Bìa sổ đỏ "H.Q.M" bị xé ruột, vứt cùng chỗ','T12'],
  ['d_phone_found','doc','Điện thoại nạn nhân đã lấy ra khỏi khe giường','T12'],
  ['d_thermos_match','doc','Đáy bình 7,1 cm khớp vết thương, có máu nạn nhân','T14'],
  ['d_lipstick','doc','Vết son đỏ gạch trên nắp cốc của bình','T14'],
  ['d_missing','doc','Bình của Dung không có ở toa 8','T15'],
  ['d_3730','doc','Bản in đánh số 37/30, vượt giới hạn 30 bản','T16'],
  ['d_fakesig','doc','Chữ ký trên bản 37/30 là chữ ký giả','T16'],
  ['d_oud','doc','Dung dùng nước hoa trầm hương','T17'],
  ['d_lip_match','doc','Son của Dung cùng màu vết son trên nắp bình','T17'],
  ['d_dung_lefty','doc','Dung thuận tay trái, đeo đồng hồ tay phải','T17'],
  ['d_heels','doc','Dung đi giày gót vuông','T17'],

  ['cam_h1','cam','Hầm 1: ông Minh ở cửa sổ, Khoa ngồi giường 10','12:16:20'],
  ['cam_h2','cam','Hầm 2: ông Minh ngồi đọc một mình','12:23:00'],
  ['cam_h3','cam','Hầm 3: 12:29 ông Minh còn cầm điện thoại nhắn tin','12:29:10'],
  ['cam_jolt','cam','12:35:12 tàu đang đứng yên mà khung hình rung lệch','12:35:12'],
  ['cam_h4','cam','Hầm 4: người mặc áo nhân viên ở cửa khoang, ông Minh nằm đắp chăn','12:38:50'],
  ['cam_h4_flip','cam','Hầm 4 (lật ảnh): đồng hồ tay phải, thẻ "Đèo Mây Gallery"','12:38:50'],
  ['cam_h5','cam','Hầm 5: Khoa ở móc áo cạnh cửa khoang','12:41:30'],
  ['cam_fall','cam','Khung cuối 12:44:06: máy ảnh rơi khi tàu phanh','12:44:06'],

  ['p_summon','phone','Tin gửi Dung 12:29: "Lên khoang 3 ngay", đã xem 12:31','dung'],
  ['p_lawyer','phone','Hẹn luật sư 15:00, giữ kỹ cuốn sổ đỏ','tam'],
  ['p_khoa_money','phone','Khoa xin bố 50 triệu, bị từ chối','khoa'],
  ['p_pages','phone','Ảnh chụp 3 trang sổ đỏ: 60 số seri in lậu','pages'],
  ['p_3730','phone','Ảnh bản in 37/30 nhà sưu tập gửi','print'],
  ['p_signal','phone','Nhật ký sóng: mất sóng đúng các lần vào hầm','signal'],

  ['x_khoa_1240','conf','12:40 ông Minh đã nằm bất động, đắp chăn kín','khoa'],
  ['x_scent2','conf','Khoa: 12:40 khoang 3 vẫn còn mùi trầm','khoa'],
  ['x_huy_thermos','conf','Huy: Dung đi cầm bình, lúc về tay không','huy'],
  ['x_huy_job','conf','Huy được Dung hứa việc ở gallery','huy'],
  ['x_jacket','conf','Áo đồng phục treo lộn trái, tay áo ướt, mùi trầm','cuong'],
  ['x_cuong_call','conf','Cường gọi điện trong phòng NV 12:30 – 12:38','cuong'],
  ['x_dung_t9','conf','Dung thừa nhận có mặt ở đầu toa 9 khi tàu dừng','dung'],
  ['x_mai_heels','conf','Mai: người áo nhân viên đi giày có gót, gõ cộp cộp','mai']
],

/* ---------- Tài liệu ----------
   b: đợt mở (0 = có sẵn, 1 = mở sau trọng điểm 1, 2 = sau trọng điểm 2, 'c' = mở bằng đối chất)
   k: loại (report, record, lab, statement, data, mail, dev)
   form: kiểu giấy (bao-cao, loi-khai, giam-dinh, bien-ban, nhat-ky, thu)
   body: các đoạn văn; {qa:[[hỏi, đáp]]}, {table:{h:[...], rows:[[...]]}}, {art:'mã hình', cap:'chú thích'}, {note:'ghi chú tay'}
   sim: bản mô phỏng: panels = các khung tranh; track = phiên bản hoạt cảnh trên sơ đồ; at = giờ bắt đầu
   ev: vật chứng thu được khi đọc */
batches: ['Hồ sơ ban đầu', 'Mở sau Trọng điểm 1', 'Mở sau Trọng điểm 2'],
docs: [
{ id:'T01', b:0, k:'report', form:'bao-cao', t:'Báo cáo nhanh của trưởng tàu', m:'Đoàn tàu SE1 · 21/11',
  head:{ o1:'TỔNG CÔNG TY ĐƯỜNG SẮT VIỆT NAM', o2:'ĐOÀN TÀU SE1 · TRƯỞNG TÀU', no:'17/BC-SE1', date:'Trên tàu SE1, ngày 21 tháng 11 năm 2025' },
  title:'BÁO CÁO NHANH', sub:'V/v hành khách tử vong tại khoang 3, toa 9',
  body:[
    'Hồi 12 giờ 44 phút, khi tàu đang xuống dốc phía nam đèo Hải Vân, lái tàu nhận cảnh báo đá rơi tại Km 768+300 và hãm khẩn cấp. Tàu dừng sau khoảng 200 m. Hành lý nhiều khoang bị xô đổ, không hành khách nào khác bị thương.',
    'Hồi 12 giờ 45 phút, hành khách Lò Thị Mai (giường 11, khoang 3, toa 9) kêu cứu. Nhân viên phục vụ toa 9 Nguyễn Văn Cường có mặt ngay sau đó, phát hiện hành khách **Hà Quang Minh** (64 tuổi, giường 9) nằm bất động dưới sàn, đầu sát chân bàn cửa sổ.',
    'Tôi có mặt lúc 12 giờ 47 phút. Nạn nhân không còn mạch. Trán có vết trầy khớp với cạnh bàn. **Nhận định ban đầu: hành khách ngã đập đầu vào cạnh bàn khi tàu hãm khẩn cấp.**',
    'Tôi đã cho niêm phong khoang 3, giữ nguyên hiện trường, yêu cầu hành khách toa 8 và toa 9 không rời tàu. Tàu chạy hạn chế tốc độ, đến ga Đà Nẵng lúc 13 giờ 25 phút, bàn giao cho Công an thành phố.'
  ],
  sign:[{ role:'TRƯỞNG TÀU', name:'Trần Đức Lâm', scrawl:'Lâm' }],
  ev:['d_report'], sim:{ panels:['r1','r2','r3'] } },

{ id:'T02', b:0, k:'data', form:'bien-ban', t:'Danh sách hành khách liên quan', m:'Toa 8 – toa 9',
  title:'DANH SÁCH HÀNH KHÁCH LIÊN QUAN', sub:'Toa 8 và toa 9, tàu SE1 ngày 21/11/2025',
  body:[
    { table:{ h:['Giường','Họ tên','Năm sinh','Ghi chú'], rows:[
      ['T9 · K3 · 9 (dưới)','Hà Quang Minh','1961','Nạn nhân. Nhiếp ảnh gia.'],
      ['T9 · K3 · 10 (dưới)','Hà Quang Khoa','1989','Con trai nạn nhân.'],
      ['T9 · K3 · 11 (trên)','Lò Thị Mai','1998','Không quen biết đoàn. Giáo viên, Sơn La.'],
      ['T9 · K3 · 12 (trên)','Phan Gia Huy','1994','Trợ lý của nạn nhân.'],
      ['T8 · K2 · 6','Lương Mỹ Dung','1979','Giám đốc Đèo Mây Gallery. Đặt vé riêng.'],
      ['Nhân viên','Nguyễn Văn Cường','1973','Phục vụ toa 9. Phòng nhân viên đầu toa 9.']
    ]}},
    'Đoàn của ông Minh đi Đà Nẵng dự khai mạc triển lãm "Ba mươi năm qua đèo" lúc 19 giờ tối 21/11 tại Đèo Mây Gallery. Nhiều năm nay ông Minh luôn đặt khoang 3 toa 9, vì khi tàu chạy về phía nam, cửa sổ khoang nhìn thẳng ra biển.',
    { art:'plan', cap:'Sơ đồ toa 7 – toa 9. Hành lang chạy dọc phía núi, cửa sổ các khoang nhìn ra biển. Toa ăn là toa 7.' }
  ],
  ev:['d_manifest'], sim:{ track:'evidence', at:'12:12' } },

{ id:'T03', b:0, k:'data', form:'nhat-ky', t:'Nhật ký chạy tàu qua đèo', m:'Lái tàu · thiết bị ghi tốc độ',
  head:{ o1:'TỔNG CÔNG TY ĐƯỜNG SẮT VIỆT NAM', o2:'ĐOÀN TÀU SE1 · LÁI TÀU', date:'Ngày 21 tháng 11 năm 2025' },
  title:'TRÍCH NHẬT KÝ CHẠY TÀU', sub:'Đoạn Lăng Cô – Đà Nẵng (giờ theo thiết bị ghi tốc độ)',
  body:[
    { table:{ h:['Giờ','Vị trí','Sự kiện'], rows:[
      ['12:10:05','Ga Lăng Cô','Thông qua, không dừng'],
      ['12:16:00 – 12:16:40','Hầm số 1',''],
      ['12:22:30 – 12:23:40','Hầm số 2',''],
      ['12:28:50 – 12:29:30','Hầm số 3',''],
      ['12:31:00','Ga Hải Vân','**Dừng tránh** tàu hàng H2 ngược chiều'],
      ['12:33:30 – 12:34:40','Ga Hải Vân','Tàu hàng H2 thông qua đường số 2'],
      ['12:37:00','Ga Hải Vân','Chạy lại'],
      ['12:38:20 – 12:39:30','Hầm số 4','Hầm dài nhất, 600 m'],
      ['12:41:10 – 12:41:50','Hầm số 5',''],
      ['12:44:00','Km 768+300','**Hãm khẩn cấp**: cảnh báo đá rơi. Dừng 12:44:20'],
      ['12:47:30','Km 768+100','Chạy lại, hạn chế 15 km/h'],
      ['12:49:00 – 12:49:30','Hầm số 6',''],
      ['12:58:10','Ga Kim Liên','Thông qua'],
      ['13:25:00','Ga Đà Nẵng','Đến']
    ]}},
    'Trong thời gian dừng tránh tại ga Hải Vân (12:31 – 12:37) đoàn tàu **đứng yên hoàn toàn**, cửa lên xuống đóng. Ga Hải Vân là ga kỹ thuật, không đón trả khách.',
    { art:'route', cap:'Đường sắt qua đèo Hải Vân: 6 hầm, ga kỹ thuật Hải Vân ở lưng chừng đèo.' }
  ],
  ev:['d_tunnels','d_stop','d_brake'], sim:{ panels:['st1'], route:true } },

{ id:'T04', b:0, k:'lab', form:'giam-dinh', t:'Giám định pháp y sơ bộ', m:'Kỹ thuật hình sự · 21/11',
  head:{ o1:'CÔNG AN THÀNH PHỐ ĐÀ NẴNG', o2:'PHÒNG KỸ THUẬT HÌNH SỰ', no:'412/GĐ-PY' },
  title:'KẾT LUẬN GIÁM ĐỊNH PHÁP Y SƠ BỘ', sub:'Tử thi: Hà Quang Minh, 64 tuổi',
  body:[
    '**1. Vết thương vùng đỉnh chẩm trái** (sau đầu, lệch trái): hình cung tròn, đường kính khoảng **7 cm**, lún xương sọ. Vật gây thương tích: vật tày, nặng, mặt tiếp xúc tròn. Đây là nguyên nhân tử vong.',
    '**2. Vết trầy vùng trán phải**: vệt thẳng dài 4 cm, khớp với cạnh bàn cửa sổ. Vết trầy **gần như không chảy máu**: hình thành khi tim đã ngừng hoặc sắp ngừng.',
    '**3. Phân bố máu**: máu thấm nhiều vào gối và chăn giường 9; sàn quanh thi thể chỉ có vài vệt nhỏ. Nạn nhân đã nằm trên giường một thời gian trước khi rơi xuống sàn.',
    '**4. Hướng lực**: cú đánh từ phía sau, chếch từ trái sang phải. Nếu hung thủ đứng sau lưng nạn nhân, nhiều khả năng người này **thuận tay trái**.',
    'Thời gian tử vong ước tính: từ 12 giờ 25 đến 12 giờ 50 ngày 21/11/2025.',
    { art:'head', cap:'Sơ đồ vị trí hai vết thương (nhìn từ phía sau và phía trước).' },
    'Kết luận: **không phải tai nạn do ngã**. Đề nghị điều tra theo hướng giết người.'
  ],
  sign:[{ role:'GIÁM ĐỊNH VIÊN', name:'BS. Lê Thị Ngọc Hân', scrawl:'Hân', stamp:'KỸ THUẬT HÌNH SỰ · ĐÀ NẴNG' }],
  ev:['d_wound','d_scrape','d_blood','d_lefty'], sim:{ panels:['fo1','fo2'] } },

{ id:'T05', b:0, k:'statement', form:'loi-khai', t:'Lời khai Lò Thị Mai', m:'Nhân chứng · giường 11', who:'mai', born:'1998', at:'13 giờ 50 phút ngày 21/11/2025', where:'toa 9 tàu SE1 dừng tại ga Đà Nẵng',
  body:[
    'Tôi lên tàu ở Hà Nội. Đoàn của ông Minh ở chung khoang, tôi không quen ai. Tối hôm trước tôi nghe ông Minh và anh Khoa cãi nhau chuyện tiền, chuyện "bộ phim gốc không bán".',
    'Qua Huế tôi đeo bịt mắt, đeo tai nghe ngủ ở giường 11. Đến lúc tàu dừng hẳn, có tiếng xì hơi dài, tôi tỉnh. Tôi hé bịt mắt thì thấy **một người mặc áo đồng phục nhân viên đường sắt** đứng ở cửa khoang, đang kéo cửa lại. Tôi tưởng soát vé nên nhắm mắt ngủ tiếp, vặn nhạc to hơn.',
    'Tôi nhớ **có mùi trầm hương, như mùi ở chùa**. Tôi thấy lạ vì tàu đang dừng giữa núi.',
    'Lúc tàu phanh, tôi suýt rơi khỏi giường. Tôi tháo bịt mắt thì thấy ông Minh nằm dưới sàn, sát chân bàn. Tôi hét lên. Anh nhân viên toa chạy tới ngay.',
    { qa:[
      ['Chị có nhìn thấy mặt người mặc áo nhân viên không?','Không. Tôi chỉ hé mắt một chút, khoang tối. Tôi thấy áo màu xanh đậm có sọc phản quang.'],
      ['Lúc đó ông Minh đang làm gì?','Tôi không để ý. Tôi nằm quay mặt vào vách.']
    ]}
  ],
  ev:['d_mai_jacket','d_mai_scent','d_mai_quarrel'], sim:{ panels:['m1','m2','m3'], track:'mai', at:'12:33:30' } },

{ id:'T06', b:0, k:'statement', form:'loi-khai', t:'Lời khai Phan Gia Huy', m:'Trợ lý · giường 12', who:'huy', born:'1994', at:'14 giờ 05 phút ngày 21/11/2025', where:'toa 9 tàu SE1 dừng tại ga Đà Nẵng',
  body:[
    'Tôi là trợ lý của thầy Minh tám năm. Năm nào thầy cũng đi SE1 qua đèo để chụp time-lapse. Qua Lăng Cô, thầy gắn máy ảnh lên kính cửa sổ bằng đế hút, **chụp 2 giây một khung**. Thầy dặn mọi người đừng chạm vào máy.',
    'Khoảng 12 giờ 14 tôi cầm laptop sang toa ăn, ngồi với chị Dung ở bàn 4 để chốt danh sách ảnh treo tối nay. Chị Dung ngồi đó từ trước.',
    'Lúc tàu dừng ở ga Hải Vân, chị Dung bảo đi vệ sinh. **Chị đi chừng hai, ba phút rồi quay lại.** Bọn tôi ngồi đến khi tàu phanh, có người chạy sang báo tin thì mới về.',
    'Thầy luôn mang theo **một cuốn sổ tay bìa đỏ**, ghi chép mọi thứ. Sáng nay thầy cứ ngồi đối chiếu gì đó trong sổ, không cho tôi xem.',
    { qa:[
      ['Điện thoại của ông Minh mở khoá thế nào?','Thầy dùng hình vẽ. Tôi từng thấy thầy vẽ, ngón tay đi lên rồi xuống như **dáng đèo, hai đỉnh núi**.'],
      ['Anh có thấy ai vào khoang 3 khi anh vắng mặt không?','Không. Tôi ở toa ăn suốt.']
    ]}
  ],
  ev:['d_huy_alibi','d_notebook','d_pattern','d_camera'], sim:{ panels:['h1','h2','h3'], track:'huy', at:'12:30' } },

{ id:'T07', b:0, k:'statement', form:'loi-khai', t:'Lời khai Lương Mỹ Dung', m:'Giám đốc gallery · toa 8', who:'dung', born:'1979', at:'14 giờ 20 phút ngày 21/11/2025', where:'toa 8 tàu SE1 dừng tại ga Đà Nẵng',
  body:[
    'Tôi là giám đốc Đèo Mây Gallery, đơn vị tổ chức triển lãm và phát hành ảnh in giới hạn của anh Minh. Tôi đặt vé riêng ở toa 8.',
    'Khoảng 12 giờ 05 tôi ra toa ăn, ngồi bàn 4 duyệt sơ đồ treo tranh. Huy sang ngồi cùng lúc 12 giờ 15.',
    'Lúc tàu dừng ở ga Hải Vân, tôi đi vệ sinh ở **WC đầu toa 8, ngay cạnh toa ăn**, rồi về chỗ ngay. Tôi ngồi với Huy đến lúc tàu phanh.',
    'Quan hệ giữa tôi và anh Minh rất tốt. Chúng tôi chuẩn bị triển lãm này một năm trời.',
    { qa:[
      ['Gallery có tặng đoàn bình giữ nhiệt không?','Có, bốn bình inox khắc logo Đèo Mây: anh Minh, anh Khoa, Huy và tôi mỗi người một chiếc. **Bình của tôi để quên ở khoang toa 8.**'],
      ['Trưa nay chị có nhận tin nhắn nào của ông Minh không?','**Không.** Điện thoại tôi để im lặng cả buổi.']
    ]}
  ],
  ev:['d_dung_alibi','d_dung_thermos','d_dung_nomsg','d_gift'], sim:{ panels:['d1','d2','d3'], track:'dung', at:'12:30' } },

{ id:'T08', b:0, k:'statement', form:'loi-khai', t:'Lời khai Hà Quang Khoa', m:'Con trai · giường 10', who:'khoa', born:'1989', at:'14 giờ 35 phút ngày 21/11/2025', where:'toa 9 tàu SE1 dừng tại ga Đà Nẵng',
  body:[
    'Bố tôi gắn máy ảnh xong thì ngồi nhìn ra biển. Khoảng 12 giờ 20 tôi ra chỗ nối toa 9 với toa 10 gọi cho vợ. Vào hầm thì rớt cuộc gọi, tôi gọi lại.',
    'Gọi xong tôi đứng đó ngắm biển. **Từ lúc ra chỗ nối toa, tôi không quay lại khoang cho tới khi nghe tiếng hét**, khoảng 12 giờ 46.',
    'Chuyện cãi nhau tối qua là chuyện nhà. Tôi muốn bố bán bộ phim gốc để cứu quán cà phê. Bố không đồng ý. Thế thôi.',
    { qa:[
      ['Anh có hút thuốc ở chỗ nối toa không?','(ngập ngừng) Tôi hút thuốc lá điện tử. Tôi biết là cấm.']
    ]}
  ],
  ev:['d_khoa_alibi','d_khoa_debt'], sim:{ panels:['k1','k2','k3p'], track:'khoa', at:'12:38' } },

{ id:'T09', b:0, k:'statement', form:'loi-khai', t:'Lời khai Nguyễn Văn Cường', m:'Nhân viên toa 9', who:'cuong', born:'1973', at:'14 giờ 50 phút ngày 21/11/2025', where:'phòng nhân viên toa 9 tàu SE1',
  body:[
    'Tôi phục vụ toa 9 hai mươi năm. Phòng nhân viên ở đầu toa 9, sát toa 8. Áo đồng phục khoác ngoài tôi treo ở **móc trên hành lang, ngoài cửa phòng nhân viên**, cạnh WC.',
    'Lúc tàu dừng tránh ở ga Hải Vân, tôi ngồi trong phòng ghi sổ. Tôi không thấy ai đi qua bất thường.',
    '**Áo của tôi treo trên móc, không ai động vào.** Đến 12 giờ 45 nghe tiếng hét, tôi chạy tới khoang 3.',
    { qa:[
      ['Ai được mặc áo đồng phục trên toa?','Chỉ nhân viên. Trưởng tàu, nhân viên soát vé đều mặc áo riêng của họ.'],
      ['Trong lúc tàu dừng có ai đi soát vé không?','**Không.** Dừng tránh ở ga kỹ thuật thì không soát vé.']
    ]}
  ],
  ev:['d_cuong_jacket','d_noticket'], sim:{ panels:['c1','c2','c3'], track:'cuong', at:'12:33' } },

{ id:'T10', b:0, k:'dev', dev:'cam', t:'Máy ảnh time-lapse của ông Minh', m:'964 khung · 12:12 – 12:44:06', ev:[] },

{ id:'T11', b:1, k:'statement', form:'loi-khai', t:'Lời khai nhân viên toa ăn', m:'Đỗ Thị Hằng · toa 7', who:'hang', name:'Đỗ Thị Hằng', born:'1985', at:'15 giờ 10 phút ngày 21/11/2025', where:'toa 7 (toa hàng ăn) tàu SE1',
  body:[
    'Bàn 4 có một chị quàng khăn lụa và một anh trẻ đeo tai nghe, mở laptop.',
    'Lúc tàu dừng ở ga Hải Vân, chị kia đứng dậy, **cầm theo một bình giữ nhiệt inox**, đi về phía toa 8.',
    '12 giờ 35 anh đeo tai nghe gọi thêm hai cà phê sữa, phiếu order còn đây. **12 giờ 38 tôi mang cà phê ra, bàn 4 chỉ có mình anh ấy.** Tôi nhớ vì đúng lúc tàu vào hầm dài, đèn toa ăn chập chờn.',
    'Chị kia quay lại khi tàu ra khỏi hầm được một lúc, khoảng 12 giờ 42. **Tóc mai chị ướt, tay không**, ngồi xuống uống cà phê nguội.',
    'WC đầu toa 8 hỏng khoá từ khoảng 11 giờ 30. Tôi đã treo biển "Hỏng – xin dùng WC toa bên cạnh".'
  ],
  ev:['d_waiter','d_wet','d_took_thermos','d_wc8'], sim:{ panels:['w1','w2','w3'], track:'evidence', at:'12:38' } },

{ id:'T12', b:1, k:'record', form:'bien-ban', t:'Biên bản khám xét toa 8 – toa 9', m:'Khám xét · 21/11',
  title:'BIÊN BẢN KHÁM XÉT', sub:'Toa 8 và toa 9, tàu SE1, từ 13 giờ 40 phút ngày 21/11/2025',
  body:[
    '**Thùng rác WC đầu toa 9**: một bình giữ nhiệt inox khắc logo "Đèo Mây Gallery", **đáy móp**, đã được rửa, còn ướt. Một **bìa sổ tay màu đỏ** khắc chữ "H.Q.M", ruột bị xé hết. Bồn cầu WC loại xả thẳng xuống đường ray.',
    '**Móc áo hành lang đầu toa 9**: áo khoác đồng phục ngành đường sắt màu xanh đậm, sọc phản quang, của anh Nguyễn Văn Cường.',
    '**WC đầu toa 8**: khoá hỏng, treo biển "Hỏng – xin dùng WC toa bên cạnh".',
    '**Khoang 3 toa 9**: hai bình giữ nhiệt Đèo Mây trên bàn, nguyên vẹn. Không tìm thấy sổ tay bìa đỏ. Điện thoại của nạn nhân kẹt sâu trong khe giường 9, đã tháo giường lấy ra lúc 14 giờ 20 phút. [[T13]]'
  ],
  sign:[{ role:'ĐIỀU TRA VIÊN', name:'Thiếu tá Võ Thanh Sơn', scrawl:'Sơn' },{ role:'NGƯỜI CHỨNG KIẾN', name:'Trần Đức Lâm (trưởng tàu)', scrawl:'Lâm' }],
  ev:['d_thermos_found','d_cover','d_phone_found'], sim:{ panels:['s1','s2','s3'] } },

{ id:'T13', b:1, k:'dev', dev:'phone', t:'Điện thoại ông Minh', m:'Khoá bằng hình vẽ', ev:['sc_phone'] },

{ id:'T14', b:1, k:'lab', form:'giam-dinh', t:'Giám định bình giữ nhiệt', m:'Kỹ thuật hình sự · 21/11',
  head:{ o1:'CÔNG AN THÀNH PHỐ ĐÀ NẴNG', o2:'PHÒNG KỸ THUẬT HÌNH SỰ', no:'413/GĐ-KT' },
  title:'KẾT LUẬN GIÁM ĐỊNH', sub:'Vật chứng: bình giữ nhiệt inox thu tại WC đầu toa 9',
  body:[
    'Bình inox dung tích 1 lít, nặng 640 g khi rỗng. Đáy tròn đường kính **7,1 cm**, móp lõm một bên.',
    'Đặt đáy bình lên ảnh chụp vết thương: **khớp hình dạng và kích thước** vết lún sọ của nạn nhân.',
    'Khe ren nối đáy còn **vết máu cùng nhóm máu nạn nhân**. Dấu vân tay trên thân bình đã bị rửa trôi.',
    'Mép nắp cốc (nắp dùng để rót uống) có **vết son môi màu đỏ gạch**.'
  ],
  sign:[{ role:'GIÁM ĐỊNH VIÊN', name:'KS. Trương Minh Đạt', scrawl:'Đạt', stamp:'KỸ THUẬT HÌNH SỰ · ĐÀ NẴNG' }],
  ev:['d_thermos_match','d_lipstick'], sim:{ panels:['th1','th2'] } },

{ id:'T15', b:2, k:'record', form:'bien-ban', t:'Thu giữ 4 bình giữ nhiệt Đèo Mây', m:'Đối chiếu quà tặng',
  title:'BIÊN BẢN THU GIỮ ĐỒ VẬT', sub:'Bình giữ nhiệt inox do Đèo Mây Gallery tặng đoàn',
  body:[
    { table:{ h:['Chủ sở hữu','Vị trí tìm thấy','Tình trạng'], rows:[
      ['Hà Quang Minh','Bàn khoang 3 toa 9','Nguyên vẹn, còn trà'],
      ['Hà Quang Khoa','Bàn khoang 3 toa 9','Nguyên vẹn, rỗng'],
      ['Phan Gia Huy','Bàn 4 toa ăn','Nguyên vẹn, còn cà phê'],
      ['Lương Mỹ Dung','Khai "để quên ở khoang 2 toa 8"','**Không tìm thấy**'],
      ['(chưa rõ)','Thùng rác WC đầu toa 9','Móp đáy, đã rửa']
    ]}},
    'Bốn bình do Đèo Mây Gallery đặt làm, giống hệt nhau. Ba bình còn nguyên vẹn đều có chủ. **Chiếc bình móp đáy là chiếc thứ tư.**'
  ],
  ev:['d_missing'], sim:{ panels:['tt1'] } },

{ id:'T16', b:2, k:'mail', form:'thu', t:'Thư của nhà sưu tập Singapore', m:'Email gửi ông Minh · 07:58',
  mail:{ from:'Daniel Tan (nhà sưu tập, Singapore)', to:'Hà Quang Minh', date:'07:58, 21/11/2025', subject:'Bản in số 37/30?' },
  body:[
    'Chào ông Minh,',
    'Tôi vừa mua qua một đại lý ở Hồng Kông bản in "Biển mây Hải Vân số 7", đánh số **37/30**, có chữ ký của ông. Theo giấy chứng nhận của Đèo Mây Gallery, tác phẩm này chỉ phát hành 30 bản.',
    'Tôi gửi kèm ảnh chụp. Mong ông xác minh giúp tôi đây có phải chữ ký của ông không.',
    'Trân trọng, Daniel Tan.',
    { note:'Chữ ký giả. Không phải tay tôi. M.', who:'minh' }
  ],
  ev:['d_3730','d_fakesig'], sim:{ panels:['em1'] } },

{ id:'T17', b:2, k:'record', form:'bien-ban', t:'Kiểm tra hành lý Lương Mỹ Dung', m:'Toa 8 · khoang 2',
  title:'BIÊN BẢN KIỂM TRA HÀNH LÝ', sub:'Người được kiểm tra: Lương Mỹ Dung, toa 8 khoang 2',
  body:[
    { table:{ h:['STT','Đồ vật','Ghi chú'], rows:[
      ['1','Nước hoa "Oud – Hương Trầm" 50 ml','Còn khoảng 2/3'],
      ['2','Son môi màu đỏ gạch','**Cùng tông màu** vết son trên nắp bình giữ nhiệt'],
      ['3','Khăn lụa','Đang quàng'],
      ['4','Đồng hồ đeo tay','**Đeo ở cổ tay phải**'],
      ['5','Giày gót vuông 5 cm','Đang đi'],
      ['6','Bình giữ nhiệt Đèo Mây','**Không có**']
    ]}},
    'Người được kiểm tra ký biên bản **bằng tay trái**.'
  ],
  sign:[{ role:'NGƯỜI ĐƯỢC KIỂM TRA', name:'Lương Mỹ Dung', scrawl:'Dung', left:true },{ role:'ĐIỀU TRA VIÊN', name:'Thiếu tá Võ Thanh Sơn', scrawl:'Sơn' }],
  ev:['d_oud','d_lip_match','d_dung_lefty','d_heels'], sim:{ panels:['lg1','lg2'] } },

{ id:'T18', b:'c', k:'statement', form:'loi-khai', t:'Lời khai bổ sung của Khoa', m:'Mở bằng đối chất', who:'khoa', born:'1989', at:'16 giờ 10 phút ngày 21/11/2025', where:'trụ sở Công an quận Hải Châu',
  body:[
    'Tôi xin khai lại. Khoảng 12 giờ 40, lúc tàu vừa ra khỏi hầm dài, tôi quay về khoang. Bố nằm trên giường 9, **quay mặt vào vách, đắp chăn kín đầu**. Tôi tưởng bố ngủ.',
    'Tôi lấy năm triệu trong ví, ở túi áo khoác bố treo cạnh cửa. Tôi định chiều nay xin lỗi rồi trả.',
    'Trong khoang có **mùi trầm**. Bố tôi ghét nước hoa. Đèn đỏ trên máy ảnh gắn kính vẫn nhấp nháy.',
    'Tôi không chạm vào bố. Nếu lúc đó tôi lật chăn ra…'
  ],
  ev:['x_khoa_1240','x_scent2'], sim:{ panels:['kk1','kk2'], track:'evidence', at:'12:40:30' } },

{ id:'T19', b:'c', k:'statement', form:'loi-khai', t:'Lời khai bổ sung của Huy', m:'Mở bằng đối chất', who:'huy', born:'1994', at:'16 giờ 25 phút ngày 21/11/2025', where:'trụ sở Công an quận Hải Châu',
  body:[
    'Tôi xin lỗi. Tôi đeo tai nghe chỉnh ảnh, không nhìn đồng hồ. Tôi chỉ nhớ chị Dung đứng dậy lúc tàu dừng, còn lúc chị về thì tàu đã qua hầm dài.',
    'Chị **cầm theo bình giữ nhiệt** khi đi. Lúc về chị không cầm gì, bảo là để quên ở WC.',
    'Chị Dung hứa tháng sau nhận tôi làm giám tuyển ở gallery. Tôi không muốn chị bị liên luỵ.'
  ],
  ev:['x_huy_thermos','x_huy_job'], sim:{ panels:['hh1','hh2','hh3'], track:'evidence', at:'12:31' } },

{ id:'T20', b:'c', k:'statement', form:'loi-khai', t:'Lời khai bổ sung của Cường', m:'Mở bằng đối chất', who:'cuong', born:'1973', at:'16 giờ 40 phút ngày 21/11/2025', where:'trụ sở Công an quận Hải Châu',
  body:[
    'Tôi xin khai lại. Từ 12 giờ 30 đến 12 giờ 38 tôi **đóng cửa phòng gọi điện cho con gái** (nhật ký cuộc gọi 8 phút 02 giây). Tôi không nhìn ra hành lang.',
    'Sau khi xảy ra chuyện, tôi lấy áo thì thấy **áo bị treo lộn trái, tay áo phải ướt, có mùi trầm** rất rõ. Tôi sợ bị kỷ luật vì để áo ngoài hành lang nên không dám khai.'
  ],
  ev:['x_jacket','x_cuong_call'], sim:{ panels:['cc1','cc2'], track:'evidence', at:'12:33' } },

{ id:'T21', b:'c', k:'statement', form:'loi-khai', t:'Lời khai bổ sung của Dung', m:'Mở bằng đối chất', who:'dung', born:'1979', at:'17 giờ 00 phút ngày 21/11/2025', where:'trụ sở Công an quận Hải Châu',
  body:[
    'WC đầu toa 8 hỏng nên tôi đi tiếp sang **WC đầu toa 9**. Có người dùng nên tôi phải chờ. Tôi không vào khoang nào cả.',
    'Bình giữ nhiệt? Tôi để quên trong WC toa 9. Tôi không biết vì sao nó lại móp.'
  ],
  ev:['x_dung_t9'], sim:{ panels:['dd1'], track:'dung', at:'12:33' } }
],

/* ---------- Đối chất (Bảng điều tra) ----------
   ok: vật chứng bác bỏ được lời khai; say: câu trả lời khi bị bác; unlock: tài liệu mở ra; gain: vật chứng nhận thêm
   fine: vật chứng liên quan nhưng không mâu thuẫn -> câu trả lời */
claims: {
  khoa: [
    { id:'khoa1', q:'Từ lúc ra chỗ nối toa, tôi không quay lại khoang cho tới khi nghe tiếng hét.',
      ok:['cam_h5'], say:'(cúi mặt) …Vâng. 12 giờ 40 tôi có quay về. Bố nằm đắp chăn, tôi tưởng bố ngủ. Tôi lấy tiền trong ví.', unlock:'T18',
      fine:{ d_mai_quarrel:'Cãi nhau thì có. Nhưng tôi không quay lại khoang.' } }
  ],
  huy: [
    { id:'huy1', q:'Chị Dung chỉ đi vệ sinh chừng hai, ba phút rồi quay lại.',
      ok:['d_waiter','d_wet'], say:'Tôi… đeo tai nghe, không nhìn giờ. Có lẽ chị đi lâu hơn thế nhiều.', unlock:'T19' }
  ],
  cuong: [
    { id:'cuong1', q:'Áo đồng phục của tôi treo trên móc, không ai động vào.',
      ok:['cam_h4','cam_h4_flip','d_mai_jacket'], say:'Tôi xin khai lại… Lúc tàu dừng tôi đóng cửa gọi điện cho con. Sau đó áo bị treo lộn trái.', unlock:'T20' }
  ],
  dung: [
    { id:'dung1', q:'Tôi đi WC đầu toa 8 rồi về chỗ ngay.',
      ok:['d_wc8','d_waiter','d_wet'], say:'(khựng lại) WC toa 8 hỏng… thì tôi sang toa 9. Phải chờ. Chỉ vậy thôi.', unlock:'T21' },
    { id:'dung2', q:'Trưa nay tôi không nhận tin nhắn nào của anh Minh.',
      ok:['p_summon'], say:'(im lặng rất lâu) …Tôi muốn gặp luật sư.' }
  ],
  mai: [
    { id:'mai1', q:'Người mặc áo nhân viên chắc là anh soát vé.',
      ok:['d_noticket','x_jacket','cam_h4_flip'], say:'Không phải soát vé ạ? Giờ nghĩ lại, tôi nghe **tiếng gót giày gõ cộp cộp** trên sàn. Giày nhân viên đâu có gót.', gain:'x_mai_heels' }
  ]
},
greet: {
  dung:'Tôi rất sốc. Tôi sẽ hợp tác hết sức với các anh.',
  huy:'Em vẫn không tin là thầy đi rồi…',
  khoa:'Bố tôi ngã thôi mà. Các anh còn muốn hỏi gì?',
  cuong:'Hai mươi năm chạy tàu, chưa bao giờ tôi gặp chuyện thế này.',
  mai:'Dạ, em biết gì em nói nấy ạ.'
},
rebut: {
  dung:'Cái đó thì chứng minh được gì? Tôi nói rồi, tôi ngồi ở toa ăn.',
  huy:'Em không hiểu cái đó liên quan gì ạ.',
  khoa:'Thì sao? Tôi đã nói tôi ở chỗ nối toa.',
  cuong:'Cái đó đâu nói gì về áo của tôi.',
  mai:'Em không rõ ạ. Em chỉ thấy cái áo thôi.'
},

/* ---------- Trọng điểm ---------- */
points: [
  { t:'Thời điểm', q:'Ông Minh bị tấn công trong khoảng thời gian nào?', type:'seg',
    o:[['a','12:12 – 12:31','Trước khi tàu dừng',3],['b','12:31 – 12:37','Tàu dừng ở ga Hải Vân',3],['c','12:37 – 12:44','Tàu chạy lại',3],['d','12:44','Lúc tàu phanh',2]],
    axis:['12:12','Pháp y: 12:25 – 12:50','12:44'],
    ans:'b',
    why:{
      a:'Ở hầm 3, lúc 12:29, ông Minh vẫn ngồi cầm điện thoại. Tin nhắn của ông đi lúc 12:29:34. Lúc đó ông còn sống.',
      c:'Ở hầm 4, lúc 12:38, ông đã nằm đắp chăn bất động. Việc xảy ra trước khi tàu chạy lại.',
      d:'Vết trán khớp cạnh bàn gần như không chảy máu, trong khi gối giường 9 thấm đầy máu. Ông đã nằm trên giường từ trước cú phanh.'
    },
    al:'12:31 – 12:37, lúc tàu dừng ở ga Hải Vân',
    c:'Hầm 3 (12:29) ông Minh còn ngồi nhắn tin. Lúc 12:35:12, khi tàu đứng yên ở ga Hải Vân, khung hình máy ảnh bị rung lệch: có va chạm mạnh vào bàn cửa sổ. Hầm 4 (12:38) ông đã nằm đắp chăn bất động. Cú phanh 12:44 chỉ làm thi thể lăn xuống sàn.',
    h:['Máy ảnh chụp 2 giây một khung. Có lúc nào tàu đang đứng yên mà khung hình lại rung không?','So ảnh phản chiếu ở hầm 3 và hầm 4. Khi xem khung trong hầm, nhớ kéo thanh Tăng sáng thật cao.'] },
  { t:'Hung khí', q:'Vật nào gây ra vết thương chí mạng ở sau đầu ông Minh?', type:'tray',
    o:[['table','Cạnh bàn'],['mount','Đế hút máy ảnh'],['thermos','Bình giữ nhiệt'],['bottle','Chai thuỷ tinh'],['handle','Tay nắm cửa']],
    ans:'thermos',
    why:{
      table:'Cạnh bàn chỉ để lại vết trầy thẳng ở trán, gần như không chảy máu. Vết chí mạng là hình cung tròn ở sau đầu.',
      mount:'Đế hút bằng nhựa, rất nhẹ, và vẫn dính trên kính cho tới cú phanh 12:44.',
      bottle:'Chai thuỷ tinh đáy vuông, không vỡ, không dính máu.',
      handle:'Tay nắm gắn chết vào cửa trượt, không thể cầm lên để đánh.'
    },
    al:'Bình giữ nhiệt inox Đèo Mây',
    c:'Vết thương hình cung tròn khoảng 7 cm, khớp đáy bình giữ nhiệt 7,1 cm. Chiếc bình móp đáy bị vứt trong thùng rác WC đầu toa 9, đã rửa nhưng còn máu nạn nhân trong khe ren. Nắp cốc dính son đỏ gạch.',
    h:['Pháp y mô tả vết thương chí mạng thế nào? Hình dạng, kích thước?','Khám xét WC đầu toa 9 tìm thấy gì? Giám định vật đó cho kết quả ra sao?'] },
  { t:'Dựng lại sự thật', q:'Ai đã giết ông Minh? Chọn hung thủ, rồi xếp 6 khung tranh đúng trình tự đã diễn ra.', type:'story',
    ans:'dung', order:['tp1','tp2','tp3','tp4','tp5','tp6'],
    why:{
      huy:'Huy ngồi ở toa ăn suốt: nhân viên toa ăn thấy anh ở bàn 4 lúc 12:38. Anh chỉ sai khi làm chứng cho Dung.',
      khoa:'Khoa có quay về lúc 12:40 để lấy tiền, nhưng ở hầm 5 cha anh đã nằm bất động. Người ở hầm 4 đeo đồng hồ tay phải và thẻ Đèo Mây Gallery.',
      cuong:'Áo của Cường bị người khác lấy. Anh gọi điện trong phòng nhân viên 12:30 – 12:38. Người ở hầm 4 đeo thẻ gallery.',
      mai:'Mai nằm ở giường tầng trên suốt. Chính cô là người thấy bóng người mặc áo nhân viên.'
    },
    al:'Lương Mỹ Dung',
    c:'Dung in lậu ảnh của ông Minh. Bị ông nhắn gọi lên khoang 3, cô mượn áo đồng phục của anh Cường, đánh ông bằng bình giữ nhiệt lúc tàu dừng ở ga Hải Vân, rồi lấy cuốn sổ ghi số seri. Tấm kính trong hầm 4 đã phản chiếu cô.',
    h:['Người ở hầm 4 đeo đồng hồ ở tay nào? Đeo thẻ gì? Hãy lật ảnh lại cho đúng chiều.','Xếp khung tranh theo giờ trên máy ảnh và nhật ký chạy tàu: tin nhắn, tàu dừng, chiếc áo, cú đánh, hầm 4, cú phanh.'] }
],

/* ---------- Khung tranh mô phỏng ----------
   bg: phông nền | t: giờ | cap: lời dẫn | fig: [nhân vật, x, y, cỡ, nét mặt] | props: [đồ vật, x, y, cỡ] | fx: hiệu ứng */
panels: {
  r1:{ bg:'brake', t:'12:44', cap:'Tàu hãm khẩn cấp vì cảnh báo đá rơi. Hành lý đổ khắp khoang.' },
  r2:{ bg:'k3', t:'12:45', cap:'Chị Mai phát hiện ông Minh nằm dưới sàn, sát chân bàn.', fig:[['mai',300,250,.9,'tense']], props:[['floorbody',150,226,1]] },
  r3:{ bg:'corr9', t:'12:47', cap:'Trưởng tàu ghi nhận ban đầu: hành khách ngã khi tàu phanh.', fig:[['cuong',210,250,.95,'tense']] },
  st1:{ bg:'station', t:'12:33', cap:'Tàu đứng yên ở ga Hải Vân, chờ tàu hàng ngược chiều đi qua.', fx:'freight' },
  fo1:{ bg:'diagram-head', t:'', cap:'Vết chí mạng: hình cung tròn ~7 cm, sau đầu lệch trái. Vết trán: vệt thẳng, gần như không chảy máu.' },
  fo2:{ bg:'diagram-berth', t:'', cap:'Máu thấm nhiều ở gối giường 9, dưới sàn chỉ vài vệt nhỏ.' },

  m1:{ bg:'k3up', t:'12:31', cap:'Tàu dừng hẳn, tiếng phanh hơi xì dài. Mai tỉnh giấc.', fig:[['mai',250,250,1,'calm']] },
  m2:{ bg:'door', t:'12:34', cap:'Một người mặc áo nhân viên kéo cửa khoang. Mùi trầm hương thoang thoảng.', fig:[['shadow',200,250,1.05]], fx:'scent' },
  m3:{ bg:'k3', t:'12:45', cap:'Tàu phanh. Mai tháo bịt mắt và thấy ông Minh dưới sàn.', fig:[['mai',300,250,.9,'tense']], props:[['floorbody',150,226,1]] },

  h1:{ bg:'dining', t:'12:16', cap:'Huy mang laptop sang toa ăn, ngồi cùng Dung ở bàn 4.', fig:[['dung',120,250,.85,'calm'],['huy',290,250,.85,'calm']], props:[['laptop',290,232,1]] },
  h2:{ bg:'dining', t:'12:31', cap:'Tàu dừng. Dung nói đi vệ sinh.', fig:[['dung',120,250,.85,'calm'],['huy',290,250,.85,'calm']], props:[['laptop',290,232,1]] },
  h3:{ bg:'dining', t:'12:34', cap:'"Chừng hai, ba phút sau chị quay lại." (theo lời Huy)', fig:[['dung',120,250,.85,'calm'],['huy',290,250,.85,'calm']], props:[['cups',200,236,1]], fx:'claim' },

  d1:{ bg:'dining', t:'12:05', cap:'Dung ngồi bàn 4 toa ăn, duyệt sơ đồ treo tranh.', fig:[['dung',180,250,.9,'calm']], props:[['papers',260,236,1]] },
  d2:{ bg:'wc8', t:'12:31', cap:'"Tôi đi WC đầu toa 8, ngay cạnh toa ăn." (theo lời Dung)', fx:'claim' },
  d3:{ bg:'dining', t:'12:34', cap:'"Tôi về chỗ ngay, ngồi với Huy đến lúc tàu phanh."', fig:[['dung',120,250,.85,'calm'],['huy',290,250,.85,'calm']], fx:'claim' },

  k1:{ bg:'k3', t:'12:20', cap:'Khoa rời khoang, ra chỗ nối toa gọi cho vợ.', fig:[['khoa',200,250,.95,'calm']], props:[['phone',260,190,1]] },
  k2:{ bg:'junction', t:'12:30', cap:'"Tôi đứng ở chỗ nối toa ngắm biển, không về khoang." (theo lời Khoa)', fig:[['khoa',220,250,.95,'calm']], fx:'claim' },
  k3p:{ bg:'corr9', t:'12:46', cap:'Nghe tiếng hét, Khoa chạy về khoang 3.', fig:[['khoa',200,250,.95,'tense']] },

  c1:{ bg:'staff', t:'12:31', cap:'Cường ngồi trong phòng nhân viên ghi sổ.', fig:[['cuong',150,250,.95,'calm']], props:[['logbook',290,214,1]] },
  c2:{ bg:'corr9', t:'12:35', cap:'"Áo đồng phục treo ở móc ngoài, như mọi khi." (theo lời Cường)', props:[['jacket',112,120,1]], fx:'claim' },
  c3:{ bg:'k3', t:'12:45', cap:'Nghe tiếng hét, Cường chạy tới khoang 3.', fig:[['cuong',280,250,.9,'tense']], props:[['floorbody',140,226,1]] },

  w1:{ bg:'dining', t:'12:35', cap:'Huy đeo tai nghe, gọi thêm hai cà phê sữa.', fig:[['huy',260,250,.9,'calm']], props:[['laptop',260,232,1]] },
  w2:{ bg:'dining', t:'12:38', cap:'Chị Hằng mang cà phê ra: bàn 4 chỉ có mình Huy. Tàu đang trong hầm dài.', fig:[['huy',260,250,.9,'calm'],['hang',90,250,.85,'calm']], props:[['cups',190,236,1]], fx:'tunnel' },
  w3:{ bg:'dining', t:'12:42', cap:'Dung quay lại, tóc mai ướt, tay không.', fig:[['dung',150,250,.9,'tense'],['huy',300,250,.8,'calm']], fx:'wet' },

  s1:{ bg:'wc', t:'13:40', cap:'Thùng rác WC đầu toa 9: bình giữ nhiệt móp đáy và bìa sổ đỏ bị xé ruột.', props:[['bin',200,200,1],['thermos',160,170,1.1,'dent'],['cover',250,180,1]] },
  s2:{ bg:'wc8', t:'13:45', cap:'WC đầu toa 8 treo biển hỏng từ 11:30.' },
  s3:{ bg:'corr9', t:'13:50', cap:'Áo đồng phục của Cường trên móc hành lang đầu toa 9.', props:[['jacket',112,120,1]] },

  th1:{ bg:'evidence', t:'', cap:'Đáy bình 7,1 cm đặt lên sơ đồ vết thương: khớp.', props:[['thermos',140,150,1.4,'dent'],['woundcircle',280,140,1]] },
  th2:{ bg:'evidence', t:'', cap:'Nắp cốc của bình có vết son màu đỏ gạch.', props:[['cap',200,150,1.6]] },
  tt1:{ bg:'evidence', t:'', cap:'Ba bình nguyên vẹn đều có chủ. Bình của Dung không ở toa 8.', props:[['thermos',70,160,1],['thermos',150,160,1],['thermos',230,160,1],['thermos',320,160,1,'dent']], fx:'labels4' },
  em1:{ bg:'print', t:'07:58', cap:'Bản in "Biển mây Hải Vân số 7" đánh số 37/30. Chữ ký không phải của ông Minh.' },
  lg1:{ bg:'evidence', t:'', cap:'Nước hoa trầm hương, son đỏ gạch, đồng hồ đeo tay phải.', props:[['perfume',110,160,1.2],['lipstick',200,170,1.2],['watch',290,160,1.2]] },
  lg2:{ bg:'evidence', t:'', cap:'Dung ký biên bản bằng tay trái.', props:[['lefthand',200,150,1]] },

  kk1:{ bg:'k3', t:'12:40', cap:'Khoa quay về. Bố nằm quay mặt vào vách, đắp chăn kín. Mùi trầm vẫn còn.', fig:[['khoa',300,250,.9,'calm']], props:[['berthbody',130,175,1]], fx:'scent' },
  kk2:{ bg:'k3', t:'12:41', cap:'Khoa lấy năm triệu trong ví ở túi áo khoác của bố.', fig:[['khoa',220,250,.95,'tense']], props:[['wallet',290,200,1]], fx:'tunnel' },
  hh1:{ bg:'dining', t:'12:31', cap:'Huy đeo tai nghe chỉnh ảnh, không nhìn đồng hồ.', fig:[['huy',220,250,.95,'calm']], props:[['laptop',220,232,1]] },
  hh2:{ bg:'dining', t:'12:31', cap:'Dung đứng dậy, cầm theo bình giữ nhiệt.', fig:[['dung',200,250,.95,'calm']], props:[['thermos',270,214,.9]] },
  hh3:{ bg:'dining', t:'12:42', cap:'Lúc về Dung không cầm gì, bảo để quên ở WC.', fig:[['dung',150,250,.9,'tense'],['huy',300,250,.8,'calm']] },
  cc1:{ bg:'staff', t:'12:30', cap:'Cường đóng cửa phòng nhân viên, gọi điện cho con gái suốt 8 phút.', fig:[['cuong',170,250,.95,'calm']], props:[['phone',230,180,1]] },
  cc2:{ bg:'corr9', t:'12:46', cap:'Áo bị treo lộn trái, tay áo ướt, mùi trầm.', props:[['jacket',112,120,1,'inside']], fx:'scent' },
  dd1:{ bg:'corr9', t:'12:33', cap:'"WC toa 8 hỏng nên tôi sang WC đầu toa 9. Tôi không vào khoang nào." (theo lời Dung)', fig:[['dung',260,250,.9,'calm']], fx:'claim' },

  /* tp1 – tp6: bức tranh sự thật. "anon" là bản ẩn danh dùng khi người chơi xếp tranh ở Trọng điểm 3 (chưa lộ hung thủ). */
  tp1:{ bg:'phone', t:'12:29', cap:'Trong hầm 3, ông Minh nhắn Dung: "Lên khoang 3 ngay." Không có sóng, tin chờ gửi.', fx:'tunnel',
        anon:{ to:'Người nhận: ••••', cap:'Trong hầm 3, ông Minh nhắn tin gọi một người lên khoang 3. Không có sóng, tin chờ gửi.' } },
  tp2:{ bg:'dining', t:'12:31', cap:'Tàu dừng ở ga Hải Vân. Dung đọc tin, cầm bình giữ nhiệt rời bàn.', fig:[['dung',200,250,.95,'tense']], props:[['thermos',272,214,.9]],
        anon:{ fig:[['shadow',200,250,.95]], cap:'Tàu dừng ở ga Hải Vân. Người nhận tin cầm bình giữ nhiệt rời bàn ở toa ăn.' } },
  tp3:{ bg:'corr9', t:'12:33', cap:'Ở đầu toa 9, Dung khoác áo đồng phục của anh Cường.', fig:[['dungjacket',220,250,.95,'tense']],
        anon:{ fig:[['shadow',220,250,.95]], cap:'Ở đầu toa 9, người đó khoác chiếc áo đồng phục treo trên móc.' } },
  tp4:{ bg:'k3', t:'12:35', cap:'Trong khoang 3, Dung đánh ông Minh từ phía sau. Máy ảnh trên kính rung lệch.', fig:[['dungjacket',250,250,.9,'angry']], props:[['minhback',130,250,.85]], fx:'jolt',
        anon:{ fig:[['shadow',250,250,.9]], cap:'Trong khoang 3, ông Minh bị đánh từ phía sau. Máy ảnh trên kính rung lệch.' } },
  tp5:{ bg:'k3dark', t:'12:38', cap:'Hầm 4: tấm kính thành gương, phản chiếu Dung đứng ở cửa, tay cầm cuốn sổ đỏ.', fig:[['dungjacket',220,250,.9,'calm']], props:[['berthbody',100,180,1]], fx:'mirror',
        anon:{ fig:[['shadow',220,250,.9]], cap:'Hầm 4: tấm kính thành gương, phản chiếu người mặc áo nhân viên đứng ở cửa, tay cầm cuốn sổ đỏ.' } },
  tp6:{ bg:'brake', t:'12:44', cap:'Tàu phanh gấp. Thi thể lăn xuống sàn, quệt trán vào cạnh bàn. Trông như tai nạn.' }
},

/* ---------- Sơ đồ đoàn tàu & hoạt cảnh ----------
   Toạ độ trên sơ đồ (khung 1180 x 200). Hành lang ở y = 53. */
places: {
  t7:     { x:262, y:118, n:'Toa 7 · bàn 4' },
  t8wc:   { x:424, y:92,  n:'WC đầu toa 8' },
  k8_2:   { x:523, y:122, n:'Toa 8 · khoang 2' },
  t9wc:   { x:823, y:92,  n:'WC đầu toa 9' },
  t9nv:   { x:823, y:146, n:'Phòng nhân viên toa 9' },
  t9moc:  { x:850, y:53,  n:'Móc áo đầu toa 9', corridor:true },
  k3a:    { x:938, y:140, n:'Khoang 3 · giường 9' },
  k3b:    { x:960, y:140, n:'Khoang 3 · giường 10' },
  k3up:   { x:949, y:96,  n:'Khoang 3 · giường 11 (trên)' },
  k3door: { x:949, y:74,  n:'Khoang 3 · cạnh cửa' },
  t9noi:  { x:1168,y:53,  n:'Chỗ nối toa 9 – 10', corridor:true },
  t9cor:  { x:1090,y:53,  n:'Hành lang toa 9', corridor:true }
},
route: {
  tunnels:[['12:16:00','12:16:40'],['12:22:30','12:23:40'],['12:28:50','12:29:30'],['12:38:20','12:39:30'],['12:41:10','12:41:50'],['12:49:00','12:49:30']],
  stop:['12:31:00','12:37:00'], freight:['12:33:30','12:34:40'], brake:'12:44:00', brakeEnd:'12:47:30',
  camera:['12:12:00','12:44:06'], jolt:'12:35:12',
  stations:[['12:10:05','Lăng Cô'],['12:31:00','Ga Hải Vân'],['12:58:10','Kim Liên']]
},
/* Phiên bản hoạt cảnh: mỗi lời khai là một phiên bản. who: nhân vật -> [[giờ, vị trí], ...]
   'ao' = chiếc áo đồng phục; 'x' = người không rõ mặc áo nhân viên */
tracks: {
  huy:   { label:'Theo lời Huy', doc:'T06', who:{
           huy:[['12:10','k3a'],['12:14','k3door'],['12:16','t7'],['12:47','t7'],['12:49','k3door']],
           dung:[['12:10','t7'],['12:31:20','t7'],['12:32','t8wc'],['12:33:30','t8wc'],['12:34','t7'],['12:47','t7'],['12:49','k3door']] } },
  dung:  { label:'Theo lời Dung', doc:'T07', who:{
           dung:[['12:10','t7'],['12:31:20','t7'],['12:32','t8wc'],['12:33:30','t8wc'],['12:34','t7'],['12:47','t7'],['12:49','k3door']],
           huy:[['12:10','k3a'],['12:14','k3door'],['12:16','t7'],['12:47','t7'],['12:49','k3door']] } },
  khoa:  { label:'Theo lời Khoa', doc:'T08', who:{
           khoa:[['12:10','k3b'],['12:20','k3b'],['12:21','t9noi'],['12:46','t9noi'],['12:47','k3door']] } },
  cuong: { label:'Theo lời Cường', doc:'T09', who:{
           cuong:[['12:10','t9nv'],['12:45','t9nv'],['12:45:40','k3door']],
           ao:[['12:10','t9moc'],['12:50','t9moc']] } },
  mai:   { label:'Theo lời Mai', doc:'T05', who:{
           mai:[['12:10','k3up'],['12:50','k3up']],
           x:[['12:33:40','k3door'],['12:34:30','k3door']] } },
  evidence: { label:'Chỉ bằng chứng', facts:true, who:{} },
  truth: { label:'Sự thật', final:true, who:{
           minh:[['12:10','k3a'],['12:50','k3a']],
           mai:[['12:10','k3up'],['12:50','k3up']],
           huy:[['12:10','k3a'],['12:14','k3door'],['12:16','t7'],['12:47','t7'],['12:49','k3door']],
           dung:[['12:10','t7'],['12:31:20','t7'],['12:33:10','t9moc'],['12:33:40','k3door'],['12:34','k3a'],['12:39:20','k3a'],['12:39:40','k3door'],['12:39:55','t9moc'],['12:40:05','t9wc'],['12:41:20','t9wc'],['12:42:30','t7'],['12:47','t7'],['12:49','k3door']],
           ao:[['12:10','t9moc'],['12:33:10','t9moc'],['12:33:40','k3door'],['12:34','k3a'],['12:39:20','k3a'],['12:39:40','k3door'],['12:39:55','t9moc'],['12:50','t9moc']],
           khoa:[['12:10','k3b'],['12:20','k3b'],['12:21','t9noi'],['12:40','t9noi'],['12:40:20','k3door'],['12:41','k3door'],['12:41:55','k3door'],['12:42:30','t9noi'],['12:46','t9noi'],['12:47','k3door']],
           cuong:[['12:10','t9nv'],['12:45','t9nv'],['12:45:40','k3door']] } }
},
/* Sự thật đã kiểm chứng (hiện khi người chơi đã có vật chứng ev). at = có mặt tại; not = KHÔNG thể ở */
facts: [
  { who:'minh', t0:'12:16:00', t1:'12:16:40', at:'k3a', ev:'cam_h1', label:'Hầm 1: ông Minh ở cửa sổ' },
  { who:'khoa', t0:'12:16:00', t1:'12:16:40', at:'k3b', ev:'cam_h1', label:'Hầm 1: Khoa ngồi giường 10' },
  { who:'minh', t0:'12:22:30', t1:'12:23:40', at:'k3a', ev:'cam_h2', label:'Hầm 2: ông Minh ngồi đọc' },
  { who:'minh', t0:'12:28:50', t1:'12:29:30', at:'k3a', ev:'cam_h3', label:'Hầm 3: ông Minh còn nhắn tin' },
  { who:'minh', t0:'12:35:10', t1:'12:35:16', at:'k3a', ev:'cam_jolt', label:'12:35:12 khung hình rung khi tàu đứng yên' },
  { who:'x',    t0:'12:38:20', t1:'12:39:30', at:'k3door', ev:'cam_h4', label:'Hầm 4: người mặc áo nhân viên ở cửa khoang 3' },
  { who:'ao',   t0:'12:38:20', t1:'12:39:30', at:'k3door', ev:'cam_h4', label:'Hầm 4: chiếc áo đồng phục đang ở khoang 3' },
  { who:'khoa', t0:'12:41:10', t1:'12:41:50', at:'k3door', ev:'cam_h5', label:'Hầm 5: Khoa ở móc áo trong khoang 3' },
  { who:'huy',  t0:'12:35:00', t1:'12:42:00', at:'t7', ev:'d_waiter', label:'Nhân viên toa ăn: Huy ngồi bàn 4' },
  { who:'dung', t0:'12:35:00', t1:'12:42:20', not:'t7', ev:'d_waiter', label:'Nhân viên toa ăn: 12:38 Dung không ở bàn 4' },
  { who:'dung', t0:'12:31:00', t1:'12:37:00', not:'t8wc', ev:'d_wc8', label:'WC đầu toa 8 khoá, treo biển hỏng từ 11:30' },
  { who:'cuong',t0:'12:30:00', t1:'12:38:00', at:'t9nv', ev:'x_cuong_call', label:'Cường gọi điện trong phòng nhân viên' },
  { who:'khoa', t0:'12:40:20', t1:'12:41:55', at:'k3door', ev:'x_khoa_1240', label:'Khoa tự nhận: 12:40 quay về khoang' }
],

/* ---------- Điện thoại nạn nhân ---------- */
phone: {
  pattern:[7,4,1,5,3,6,9],
  owner:'Hà Quang Minh',
  threads: {
    dung: { n:'Dung · Đèo Mây Gallery', av:'D', ev:['p_summon'], msgs:[
      ['d','Thứ Năm, 20/11'],
      ['them','Anh nghỉ sớm nhé, mai khai mạc 19 giờ. Em đã chuẩn bị 30 bản in đánh số cho tối mai.','21:40'],
      ['d','Thứ Sáu, 21/11'],
      ['me','Bên Singapore gửi tôi ảnh một bản in số 37/30, chữ ký giả chữ tôi. Chị giải thích đi.','08:15'],
      ['them','Chắc nhầm lẫn gì đó anh ạ, để em kiểm tra. Mình nói chuyện trực tiếp nhé, đừng làm ầm lên trước khai mạc.','08:16'],
      ['me','Lên khoang 3 ngay. Tôi đã có đủ danh sách. Chiều nay tôi đưa luật sư.','12:29', 'queue'],
      ['seen','Chờ mạng 12:29:10 · Đã gửi 12:29:34 · Đã xem 12:31:05']
    ]},
    tam: { n:'Luật sư Tâm', av:'T', ev:['p_lawyer'], msgs:[
      ['d','Thứ Sáu, 21/11'],
      ['me','Tôi đã đối chiếu xong: ít nhất 60 bản in ngoài giới hạn. Số seri tôi ghi hết trong sổ đỏ. 15 giờ chiều nay gặp anh ở Đà Nẵng.','11:20'],
      ['them','Anh giữ kỹ cuốn sổ. Đừng nói với ai trước khi gặp tôi.','11:22']
    ]},
    khoa: { n:'Khoa', av:'K', ev:['p_khoa_money'], msgs:[
      ['d','Thứ Năm, 20/11'],
      ['them','Bố cho con mượn 50 triệu, quán sắp đóng cửa rồi.','22:10'],
      ['me','Bố nói rồi, bộ phim gốc không bán. Tiền thì về nhà nói chuyện.','22:30']
    ]},
    huy: { n:'Huy', av:'H', ev:[], msgs:[
      ['d','Thứ Sáu, 21/11'],
      ['me','Huy nhớ sao lưu thẻ nhớ time-lapse tối nay nhé.','12:05'],
      ['them','Dạ thầy.','12:06']
    ]}
  },
  order:['dung','tam','khoa','huy'],
  photos:[
    { id:'pages', t:'11:18 · 3 ảnh', cap:'Ông Minh chụp lại 3 trang sổ bìa đỏ: danh sách 60 số seri in ngoài giới hạn.', ev:'p_pages' },
    { id:'print', t:'08:02 · ảnh nhận', cap:'Ảnh nhà sưu tập Singapore gửi: bản in số 37/30.', ev:'p_3730' }
  ]
},

/* ---------- Hiện trường: khoang 3 toa 9 (sơ đồ nhìn từ trên xuống) ---------- */
scene: {
  title:'Khoang 3, toa 9',
  photo:'Ảnh hiện trường · 13:35 · ga Đà Nẵng',
  hs:[
    { id:'sc_body', n:1, x:400, y:430, t:'Thi thể', d:'Ông Minh nằm nghiêng dưới sàn giữa hai giường, đầu sát chân bàn cửa sổ. Trán có vết trầy.' },
    { id:'sc_pillow', n:2, x:250, y:250, t:'Gối và chăn giường 9', d:'Gối và chăn giường 9 thấm rất nhiều máu, loang thành vệt lớn ở đầu giường.' },
    { id:'sc_floor', n:3, x:470, y:330, t:'Sàn khoang', d:'Quanh thi thể chỉ có vài vệt máu nhỏ. Thảm sàn khô.' },
    { id:'sc_table', n:4, x:400, y:520, t:'Cạnh bàn cửa sổ', d:'Cạnh bàn có vệt trầy dính sợi tóc, không có máu đọng.' },
    { id:'sc_camera', n:5, x:520, y:535, t:'Máy ảnh', d:'Máy ảnh mirrorless rơi dưới gầm bàn. Đế hút vẫn dính trên kính. Thẻ nhớ còn nguyên: 964 khung, từ 12:12:00 đến 12:44:06.', act:'cam' },
    { id:'sc_thermos2', n:6, x:300, y:520, t:'Hai bình giữ nhiệt', d:'Hai bình inox khắc logo Đèo Mây trên bàn: một bình còn trà (của ông Minh), một bình rỗng (của Khoa). Không móp.' },
    { id:'sc_wallet', n:7, x:640, y:110, t:'Áo khoác và ví', d:'Áo khoác ông Minh treo móc cạnh cửa. Ví còn thẻ, nhưng tiền mặt chỉ còn 200 nghìn đồng.' },
    { id:'sc_phone', n:8, x:150, y:330, t:'Khe giường 9', d:'Điện thoại của ông Minh rơi kẹt sâu trong khe giữa giường và vách. Phải tháo giường mới lấy ra được.', act:'phone' },
    { id:'sc_door', n:9, x:400, y:75, t:'Cửa khoang', d:'Cửa trượt khép, chốt trong không cài. Ai cũng có thể mở từ hành lang.' },
    { id:'sc_mai', n:10, x:600, y:200, t:'Giường 11 (tầng trên)', d:'Bịt mắt và tai nghe của Mai. Từ giường trên, nằm quay mặt vào vách thì không thấy cửa sổ.' },
    { id:'sc_nonotebook', n:11, x:210, y:470, t:'Mặt bàn', d:'Bút ký của ông Minh nằm trên bàn, nhưng không thấy cuốn sổ tay bìa đỏ mà Huy nói ông luôn mang theo.' }
  ]
},

/* ---------- Lời giải & hậu truyện ---------- */
solution: [
  'Hung thủ là **Lương Mỹ Dung**, giám đốc Đèo Mây Gallery. Cô đã in lậu khoảng 60 bản ảnh của ông Minh với chữ ký giả. Sáng 21/11, một nhà sưu tập gửi cho ông ảnh bản in đánh số 37/30, và ông ghi lại toàn bộ số seri giả vào cuốn sổ bìa đỏ.',
  '12:29, trong hầm 3, ông nhắn Dung lên khoang 3. Tin chờ mạng rồi đi lúc 12:29:34, Dung đọc lúc 12:31:05. Đúng lúc đó tàu dừng tránh ở ga Hải Vân. Dung cầm bình giữ nhiệt rời toa ăn, mượn áo đồng phục treo ngoài phòng nhân viên toa 9 để ai thấy cũng tưởng nhân viên soát vé.',
  '12:35:12, khi ông Minh quay ra cửa sổ, Dung đánh từ phía sau bằng đáy bình, bằng tay trái. Ông đổ vào bàn, làm máy ảnh rung. Cô đặt ông nằm quay vào vách, đắp chăn, lấy cuốn sổ, nhưng không tìm được điện thoại đã rơi vào khe giường.',
  'Cô không biết máy ảnh vẫn đang chụp. Ở hầm 4, tấm kính đen thành gương: nó phản chiếu một người mặc áo nhân viên, đeo đồng hồ tay phải và thẻ Đèo Mây Gallery. Cô xé sổ xả xuống đường ray, vứt bình và bìa sổ vào thùng rác WC, treo áo lộn trái rồi về toa ăn với mái tóc còn ướt.',
  'Cú phanh 12:44 làm thi thể lăn xuống sàn, quệt trán vào cạnh bàn. Mọi người tưởng đó là tai nạn.'
],
epilogue: [
  'Cuốn sổ đỏ đã trôi xuống đường ray đèo Hải Vân, nhưng lúc 11:18 ông Minh đã cẩn thận chụp lại từng trang. Luật sư Tâm dùng chính những tấm ảnh ấy để khởi kiện Đèo Mây Gallery.',
  'Khoa trả lại năm triệu cho mẹ, kèm một lá thư dài. Anh không bán bộ phim gốc.',
  'Triển lãm "Ba mươi năm qua đèo" khai mạc muộn ba tháng, do Huy làm giám tuyển. Ở cuối phòng trưng bày, Huy treo khung hình cuối cùng của cuộn time-lapse: trần khoang tàu nghiêng, lúc 12:44:06. Bên dưới chỉ có một dòng: "Thầy vẫn chụp đến khung cuối."'
]
};
