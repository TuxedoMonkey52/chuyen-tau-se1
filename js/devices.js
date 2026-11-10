/* =====================================================================
   THIẾT BỊ: máy ảnh time-lapse (soi gương trong hầm) và điện thoại nạn nhân
   (khoá bằng hình vẽ, soi đèn thấy vệt ngón tay).
   ===================================================================== */
'use strict';

/* ---------- Máy ảnh time-lapse ---------- */
const CAM0 = toSec(R.camera[0]), CAM1 = toSec(R.camera[1]), CAMN = Math.round((CAM1 - CAM0) / 2);
const CAM = { idx: 0, playing: false, raf: 0, acc: 0, last: 0, flip: false, zoom: false, prevTun: -1 };
function openCam(sec) {
  if (sec != null) CAM.idx = Math.max(0, Math.min(CAMN, Math.round((sec - CAM0) / 2)));
  else CAM.idx = S.camT || 0;
  CAM.flip = false; CAM.zoom = false;
  $('#cam-exp').value = String(S.exp); camTicks(); camRender(); openOv($('#camov'), '#cam-play'); SFX.shutter();
}
function camTicks() {
  const pct = s => ((s - CAM0) / (CAM1 - CAM0) * 100).toFixed(2) + '%';
  let h = R.tunnels.filter(x => toSec(x[0]) < CAM1).map((x, i) => `<i class="tk-tun" style="left:${pct(toSec(x[0]))};width:calc(${pct(Math.min(CAM1, toSec(x[1])))} - ${pct(toSec(x[0]))} + 2px)"></i><span class="tk-lab" style="left:${pct(toSec(x[0]))}">H${i + 1}</span>`).join('');
  h += `<i class="tk-stop" style="left:${pct(toSec(R.stop[0]))};width:calc(${pct(toSec(R.stop[1]))} - ${pct(toSec(R.stop[0]))})"></i><span class="tk-lab st" style="left:${pct(toSec(R.stop[0]))}">ga Hải Vân</span>`;
  $('#cam-ticks').innerHTML = h;
  $('#cam-range').max = String(CAMN);
}
function camRender() {
  const sec = CAM0 + CAM.idx * 2, out = A.camFrame(sec, { exp: S.exp, flip: CAM.flip, zoom: CAM.zoom }, R, toSec), info = out.info;
  $('#cam-img').innerHTML = out.svg;
  $('#cam-ts').textContent = '2025/11/21 ' + fmt(sec, true);
  $('#cam-fr').textContent = 'KHUNG ' + String(CAM.idx + 1).padStart(4, '0') + '/' + String(CAMN + 1).padStart(4, '0');
  $('#cam-time').textContent = fmt(sec, true);
  $('#cam-range').value = String(CAM.idx);
  $('#cam-expv').textContent = S.exp;
  $('#cam-flip').setAttribute('aria-pressed', String(CAM.flip)); $('#cam-zoom').setAttribute('aria-pressed', String(CAM.zoom));
  $('#cam-play').innerHTML = CAM.playing ? ic('pause') + 'Dừng' : ic('play') + 'Phát';
  $('#cam-screen').classList.toggle('flipped', CAM.flip);
  let tag = '';
  if (info.tunnel > -1) tag = 'HẦM SỐ ' + (info.tunnel + 1); else if (info.stop) tag = 'GA HẢI VÂN · TÀU ĐỨNG YÊN'; else if (info.last) tag = 'KHUNG CUỐI';
  $('#cam-tag').textContent = tag; $('#cam-tag').hidden = !tag;
  /* thu vật chứng */
  const bright = S.exp >= 55;
  if (info.refl && bright) { collect('cam_' + info.refl); if (info.refl === 'h4' && CAM.flip) collect('cam_h4_flip'); }
  if (info.jolt) collect('cam_jolt');
  if (info.last) collect('cam_fall');
  let hint = '';
  if (info.tunnel > -1 && !bright) hint = 'Khung trong hầm gần như đen. Kéo thanh Tăng sáng lên cao xem: tấm kính tối có thể đang phản chiếu thứ gì đó.';
  else if (info.refl === 'h4' && !CAM.flip) hint = 'Đây là ảnh phản chiếu trong kính nên trái phải bị ngược, chữ bị lật. Thử bấm Lật ảnh.';
  else if (info.refl === 'h4' && CAM.flip) hint = 'Đã lật đúng chiều: thẻ đeo ghi ĐÈO MÂY GALLERY, đồng hồ đeo ở cổ tay phải, tay cầm cuốn sổ đỏ.';
  else if (info.refl) hint = 'Kính trong hầm thành gương: bạn đang nhìn ngược vào trong khoang 3.';
  else if (info.jolt) hint = 'Khung hình rung lệch, trong khi tàu đang đứng yên ở ga!';
  else if (info.stop) hint = 'Tàu đang dừng tránh, đứng yên hoàn toàn.';
  else if (info.last) hint = 'Máy ảnh rơi khỏi kính khi tàu phanh. Đây là khung cuối.';
  $('#cam-hint').textContent = hint;
  if (CAM.playing && info.tunnel > -1 && CAM.prevTun !== info.tunnel) SFX.tunnel();
  CAM.prevTun = info.tunnel;
  SFX.hiss(info.tunnel > -1);
  const found = C.evidence.filter(e => e[1] === 'cam' && S.ev[e[0]]);
  $('#cam-log').innerHTML = `<h3>Khung đã ghi nhận · ${found.length}/${C.evidence.filter(e => e[1] === 'cam').length}</h3>` + (found.length ? `<ol>${found.map(e => `<li><button data-camjump="${toSec(e[3])}"><time>${e[3]}</time>${e[2]}</button></li>`).join('')}</ol>` : '<p class="none">Chưa ghi nhận khung nào. Tua qua các hầm và khoảng tàu dừng ở ga.</p>');
  S.camT = CAM.idx;
}
function camStep(n) { CAM.idx = Math.max(0, Math.min(CAMN, CAM.idx + n)); camRender(); }
function camFrame(n) {
  if (!CAM.playing) return; CAM.acc += Math.min(200, n - CAM.last); CAM.last = n;
  while (CAM.acc >= 83) { CAM.acc -= 83; CAM.idx++; }
  if (CAM.idx >= CAMN) { CAM.idx = CAMN; CAM.playing = false; }
  camRender(); if (CAM.playing) CAM.raf = requestAnimationFrame(camFrame);
}
function camPlay(on) { CAM.playing = on; cancelAnimationFrame(CAM.raf); if (on) { if (CAM.idx >= CAMN) CAM.idx = 0; CAM.last = performance.now(); CAM.acc = 0; CAM.raf = requestAnimationFrame(camFrame); } else save(); camRender(); }
function camStop() { CAM.playing = false; cancelAnimationFrame(CAM.raf); save(); }
function camNextTunnel() {
  const sec = CAM0 + CAM.idx * 2;
  const nx = R.tunnels.map(x => toSec(x[0])).find(s => s > sec + 2 && s < CAM1);
  if (nx == null) { toast('Không còn hầm nào trước khung cuối'); return; }
  camPlay(false); CAM.idx = Math.round((nx + 16 - CAM0) / 2); camRender();
}

/* ---------- Điện thoại ---------- */
const PHD = C.phone;
const PH = { screen: 'lock', arg: null, path: [], drawing: false, tap: false, torch: false, msg: '', ptr: null };
const DOT = i => [60 + ((i - 1) % 3) * 80, 60 + Math.floor((i - 1) / 3) * 80];
function openPhone(ref) {
  PH.screen = S.phoneOk ? 'home' : 'lock'; PH.arg = null; PH.path = []; PH.msg = ''; PH.tap = false;
  if (S.phoneOk && ref) { if (PHD.threads[ref]) { PH.screen = 'thread'; PH.arg = ref; } else if (ref === 'signal') PH.screen = 'signal'; else if (PHD.photos.some(p => p.id === ref)) { PH.screen = 'photo'; PH.arg = ref; } }
  phRender(); openOv($('#phone'), '.ph-close');
}
function patSVG() { return `<svg class="ph-pat${PH.torch ? ' torch' : ''}" id="ph-pat" viewBox="0 0 240 240" role="group" aria-label="Ô vẽ hình mở khoá 3 x 3. Có thể gõ số 1 đến 9 rồi Enter.">${patInner()}</svg>`; }
function patRefresh() { const s = $('#ph-pat'); if (s) s.innerHTML = patInner(); const m = $('#ph-msg'); if (m) m.textContent = PH.msg || 'Vẽ hình để mở khoá'; }
function patInner() {
  const pts = PH.path.map(DOT);
  let s = `<rect width="240" height="240" fill="transparent"/>`;
  if (PH.torch) { const sm = PHD.pattern.map(DOT).map(p => p.join(' ')).join(' L'); s += `<path d="M${sm}" class="ph-smudge"/><path d="M${sm}" class="ph-smudge thin"/>`; }
  if (pts.length) { let d = 'M' + pts.map(p => p.join(' ')).join(' L'); if (PH.drawing && PH.ptr) d += ' L' + PH.ptr.join(' '); s += `<path d="${d}" class="ph-line"/>`; }
  for (let i = 1; i <= 9; i++) { const [x, y] = DOT(i), on = PH.path.includes(i); s += `<g class="ph-dot${on ? ' on' : ''}" data-dot="${i}"><circle cx="${x}" cy="${y}" r="26" class="hit"/><circle cx="${x}" cy="${y}" r="${on ? 10 : 7}" class="core"/></g>`; }
  return s;
}
function phBar(title, back) { return `<div class="ph-bar"><button data-ph="${back}" aria-label="Quay lại">‹</button><b>${title}</b><span></span></div>`; }
function phRender() {
  const st = `<div class="ph-status"><span>14:20</span><span>${S.phoneOk ? '4G ▂▄▆' : ''}</span></div>`;
  let h = '';
  if (PH.screen === 'lock') {
    h = `${st}<div class="ph-wall">${A.wall()}</div><div class="ph-lock${PH.torch ? ' dim' : ''}"><div class="ph-clock">12:44</div><div class="ph-date">Thứ Sáu, 21 tháng 11</div>
      <p class="ph-msg" id="ph-msg">${PH.msg || 'Vẽ hình để mở khoá'}</p>${patSVG()}
      <div class="ph-tools"><button class="pill" id="ph-torch" aria-pressed="${PH.torch}">${ic('flashlight')}Soi đèn</button>${PH.tap && PH.path.length ? `<button class="pill" id="ph-ok">${ic('check')}Mở khoá</button>` : ''}<button class="pill" id="ph-clear">${ic('x')}Xoá</button></div>
      ${S.phoneTries >= 2 ? `<p class="ph-hint">Huy nói ông Minh vẽ "như dáng đèo, hai đỉnh núi". Bật Soi đèn để thấy vệt dầu ngón tay trên màn hình.</p>` : ''}</div>`;
  } else if (PH.screen === 'home') {
    const app = (k, n, i) => `<button class="ph-app" data-ph="${k}"><i>${ic(i)}</i>${n}</button>`;
    h = `${st}<div class="ph-wall">${A.wall()}</div><div class="ph-home">${app('threads', 'Tin nhắn', 'message-circle')}${app('photos', 'Ảnh', 'image')}${app('signal', 'Nhật ký sóng', 'signal')}</div><p class="ph-hint" style="position:relative">Máy của ${PHD.owner}</p>`;
  } else if (PH.screen === 'threads') {
    h = `${st}${phBar('Tin nhắn', 'home')}<div class="ph-body">${PHD.order.map(k => { const t = PHD.threads[k], last = t.msgs.filter(m => m[0] === 'me' || m[0] === 'them').pop(); return `<button class="ph-row" data-ph="thread" data-arg="${k}"><span class="ph-av">${t.av}</span><span class="m"><b>${t.n}</b><span>${last[1].replace(/\*\*/g, '')}</span></span><span class="r">${last[2]}</span></button>`; }).join('')}</div>`;
  } else if (PH.screen === 'thread') {
    const t = PHD.threads[PH.arg]; (t.ev || []).forEach(collect);
    h = `${st}${phBar(t.n, 'threads')}<div class="ph-body ph-th">${t.msgs.map(m => {
      if (m[0] === 'd') return `<div class="ph-day">${m[1]}</div>`;
      if (m[0] === 'seen') return `<div class="ph-seen">${m[1]}</div>`;
      return `<div class="ph-b ${m[0]}${m[3] === 'queue' ? ' queue' : ''}">${md(m[1])}<time>${m[2]}</time></div>`;
    }).join('')}</div>`;
  } else if (PH.screen === 'photos') {
    h = `${st}${phBar('Ảnh', 'home')}<div class="ph-body"><div class="ph-grid">${PHD.photos.map(p => `<button data-ph="photo" data-arg="${p.id}">${A.photo(p.id)}<span>${p.t}</span></button>`).join('')}</div></div>`;
  } else if (PH.screen === 'photo') {
    const p = PHD.photos.find(x => x.id === PH.arg); collect(p.ev);
    h = `${st}${phBar('Ảnh', 'photos')}<div class="ph-body"><div class="ph-photo">${A.photo(p.id)}</div><p class="ph-cap"><b>${p.t}</b><br>${p.cap}</p></div>`;
  } else if (PH.screen === 'signal') {
    collect('p_signal');
    const W = 280, x = s => 10 + (s - T0) / (T1 - T0) * (W - 20);
    let bars = ''; for (let s = T0; s <= toSec('12:44:30'); s += 20) { const tun = R.tunnels.some(t => s >= toSec(t[0]) - 10 && s <= toSec(t[1]) + 10), stp = s >= toSec(R.stop[0]) && s < toSec(R.stop[1]); const lv = tun ? 0 : stp ? 2 : 3 + ((s / 20) % 2); bars += `<rect x="${x(s).toFixed(1)}" y="${(100 - lv * 18)}" width="4" height="${lv * 18}" class="${tun ? 'off' : ''}"/>`; }
    const ann = (t, txt, y) => `<g transform="translate(${x(toSec(t)).toFixed(1)} 0)"><line y1="${y + 4}" y2="104" class="ann"/><text y="${y}" class="ann-t">${txt}</text></g>`;
    h = `${st}${phBar('Nhật ký sóng', 'home')}<div class="ph-body"><p class="ph-cap">Cường độ sóng di động, trưa 21/11. Mỗi lần mất sóng trùng với một lần tàu vào hầm.</p><svg class="ph-sig" viewBox="0 0 ${W} 150">${bars}<line x1="10" y1="104" x2="${W - 10}" y2="104" class="ax"/>${ann('12:29:10', 'tin chờ gửi', 18)}${ann('12:29:34', 'đã gửi', 34)}${ann('12:31:05', 'đã xem', 50)}<text x="10" y="122" class="ann-t">12:10</text><text x="${W - 10}" y="122" class="ann-t" text-anchor="end">12:50</text><text x="${x(toSec('12:34'))}" y="138" class="ann-t" text-anchor="middle">dừng ở ga Hải Vân</text></svg>
      <div class="ph-cap">${R.tunnels.map((t, i) => `H${i + 1}: ${t[0].slice(0, 5)}`).join(' · ')}</div></div>`;
  }
  $('#ph-screen').innerHTML = h;
}
function phAdd(i) { if (!PH.path.includes(i)) { PH.path.push(i); SFX.key(); } }
function phDotAt(e) {
  const svg = $('#ph-pat'); if (!svg) return null; const r = svg.getBoundingClientRect(), k = 240 / r.width, px = (e.clientX - r.left) * k, py = (e.clientY - r.top) * k;
  PH.ptr = [px, py];
  for (let i = 1; i <= 9; i++) { const [x, y] = DOT(i); if (Math.hypot(px - x, py - y) < 28) return i; }
  return null;
}
function phCheck() {
  if (!PH.path.length) return;
  if (PH.path.join(',') === PHD.pattern.join(',')) {
    S.phoneOk = true; save(); SFX.unlock(); PH.screen = 'home'; PH.path = []; phRender(); renderDocs(); toast('Đã mở khoá điện thoại');
  } else {
    S.phoneTries++; save(); SFX.wrong(); PH.msg = 'Sai hình vẽ. Thử lại.'; PH.path = []; PH.tap = false; phRender();
    const m = $('#ph-pat'); if (m) { m.classList.remove('shake'); void m.getBoundingClientRect(); m.classList.add('shake'); }
  }
}
function bindPhone() {
  const scr = $('#ph-screen');
  scr.addEventListener('pointerdown', e => {
    if (PH.screen !== 'lock' || !e.target.closest('#ph-pat')) return;
    e.preventDefault(); const i = phDotAt(e);
    if (!(PH.tap && PH.path.length)) PH.path = [];
    PH.drawing = true; PH.startN = PH.path.length; PH.msg = ''; if (i) phAdd(i); patRefresh();
    try { $('#ph-pat').setPointerCapture(e.pointerId); } catch (err) {}
  });
  scr.addEventListener('pointermove', e => { if (!PH.drawing) return; const i = phDotAt(e); if (i) phAdd(i); patRefresh(); });
  window.addEventListener('pointerup', () => {
    if (!PH.drawing) return; PH.drawing = false; PH.ptr = null;
    const added = PH.path.length - PH.startN;
    if (added <= 1 && PH.path.length < PHD.pattern.length) { PH.tap = true; phRender(); }
    else { PH.tap = false; phCheck(); }
  });
}
