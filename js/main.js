/* =====================================================================
   MỞ ĐẦU (mưa trên kính tàu, bóng phản chiếu khi vào hầm), KẾT THÚC,
   kéo thả trên bảng điều tra, sự kiện và khởi động.
   ===================================================================== */
'use strict';

/* ---------- Mở đầu ---------- */
const INTRO = { raf: 0, bg: null, drops: [], w: 0, h: 0, ctx: null, last: 0, next: 0, bound: false };
function introSeed() {
  const c = $('#intro-rain'); if (!c) return; const dpr = Math.min(2, window.devicePixelRatio || 1);
  INTRO.w = c.clientWidth || innerWidth; INTRO.h = c.clientHeight || innerHeight; c.width = Math.round(INTRO.w * dpr); c.height = Math.round(INTRO.h * dpr);
  const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); INTRO.ctx = ctx;
  const W = INTRO.w, H = INTRO.h, bg = document.createElement('canvas'); bg.width = c.width; bg.height = c.height; const b = bg.getContext('2d'); b.setTransform(dpr, 0, 0, dpr, 0, 0);
  const g = b.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2a3a42'); g.addColorStop(.55, '#1a262c'); g.addColorStop(1, '#0a1014'); b.fillStyle = g; b.fillRect(0, 0, W, H);
  b.fillStyle = 'rgba(200,215,220,.10)'; b.beginPath(); b.moveTo(0, H * .52); for (let x = 0; x <= W; x += 40) b.lineTo(x, H * .52 - 30 * Math.sin(x / 210) - 18 * Math.sin(x / 77)); b.lineTo(W, H); b.lineTo(0, H); b.fill();
  [[.7, .25, .3, '220,230,235', .18], [.9, .55, .2, '240,166,58', .16], [.2, .7, .18, '150,190,210', .12], [.55, .1, .12, '255,255,255', .1]].forEach(([x, y, r, c2, a]) => { const RR = r * Math.max(W, H); const rg = b.createRadialGradient(x * W, y * H, 0, x * W, y * H, RR); rg.addColorStop(0, `rgba(${c2},${a})`); rg.addColorStop(1, `rgba(${c2},0)`); b.fillStyle = rg; b.fillRect(0, 0, W, H); });
  const n = Math.round(W * H / 7000); for (let i = 0; i < n; i++) introDrop(b, Math.random() * W, Math.random() * H, Math.random() * 2 + .5);
  INTRO.bg = bg; INTRO.drops = Array.from({ length: Math.max(6, Math.round(n / 6)) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.6 + 2.2, v: 0, p: Math.random() * 2, tr: [] }));
}
function introDrop(ctx, x, y, r) { const g = ctx.createRadialGradient(x - r * .35, y - r * .4, r * .1, x, y, r); g.addColorStop(0, 'rgba(255,255,255,.5)'); g.addColorStop(.55, 'rgba(190,210,220,.1)'); g.addColorStop(1, 'rgba(255,255,255,.26)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
function introFrame(n) {
  if ($('#intro').hidden || !INTRO.ctx) { INTRO.raf = 0; return; }
  const ctx = INTRO.ctx, W = INTRO.w, H = INTRO.h, dt = Math.min(.05, (n - INTRO.last) / 1000 || 0); INTRO.last = n;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(INTRO.bg, 0, 0); const dpr = INTRO.bg.width / W; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.strokeStyle = 'rgba(200,222,230,.09)'; ctx.lineWidth = 1; ctx.beginPath();
  for (let i = 0; i < 70; i++) { const x = ((i * 137.5) - n * .5) % (W + 120) + W + 60, y = ((i * 91.7) + n * .7) % (H + 90) - 45; const xx = x % (W + 120) - 60; ctx.moveTo(xx, y); ctx.lineTo(xx - 14, y + 16); } ctx.stroke();
  for (const d of INTRO.drops) {
    if (d.p > 0) d.p -= dt; else { d.v = Math.min(170, d.v + dt * (110 + d.r * 30)); d.y += d.v * dt; d.x -= d.v * dt * .35; if (Math.random() < .008) { d.p = Math.random() * 1.4; d.v = 0; } d.tr.push([d.x, d.y]); if (d.tr.length > 28) d.tr.shift(); }
    if (d.tr.length > 1) { ctx.strokeStyle = 'rgba(210,228,236,.13)'; ctx.lineWidth = d.r * .75; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(d.tr[0][0], d.tr[0][1]); for (const p of d.tr) ctx.lineTo(p[0], p[1]); ctx.stroke(); }
    introDrop(ctx, d.x, d.y, d.r);
    if (d.y > H + 20 || d.x < -20) { d.x = Math.random() * W * 1.2; d.y = -10; d.v = 0; d.tr = []; d.p = Math.random(); }
  }
  if (!RM && n > INTRO.next) { introTunnel(); INTRO.next = n + 9000 + Math.random() * 6000; }
  INTRO.raf = requestAnimationFrame(introFrame);
}
function introTunnel() {
  const f = $('#intro-flash'), gh = $('#intro-ghost'); if (!f || !window.gsap) return;
  SFX.tunnel();
  gsap.timeline().to(f, { opacity: .9, duration: .45, ease: 'power2.in' }).to(gh, { opacity: .3, duration: .5 }, '<.2').to({}, { duration: 1 }).to(gh, { opacity: 0, duration: .35 }).to(f, { opacity: 0, duration: .6 }, '<.1');
}
function introStart() {
  introSeed(); if (!INTRO.bound) { INTRO.bound = true; window.addEventListener('resize', () => { if (!$('#intro').hidden) introSeed(); }); }
  INTRO.next = performance.now() + (RM ? 1e12 : 3500); INTRO.last = performance.now(); cancelAnimationFrame(INTRO.raf);
  if (RM) { if (INTRO.ctx) { INTRO.ctx.setTransform(1, 0, 0, 1, 0, 0); INTRO.ctx.drawImage(INTRO.bg, 0, 0); } return; }
  INTRO.raf = requestAnimationFrame(introFrame);
}
function introAnim() {
  if (!window.gsap || RM) return; const h = $('#intro-title');
  if (!h.dataset.split) { h.querySelectorAll('.ln').forEach(ln => { ln.innerHTML = Array.from(ln.textContent.normalize('NFC')).map(ch => ch === ' ' ? ' ' : `<span class="ch">${ch}</span>`).join(''); }); h.dataset.split = '1'; }
  gsap.fromTo('.intro-card', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power2.out', clearProps: 'transform' });
  gsap.fromTo('#intro-title .ch', { y: 60, opacity: 0, rotate: 10 }, { y: 0, opacity: 1, rotate: 0, duration: .85, ease: 'power3.out', stagger: .045, delay: .15 });
  gsap.fromTo('#intro-feat li', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .4, stagger: .07, delay: .65, clearProps: 'transform' });
}
const FEAT = [['camera', 'Tua máy ảnh, soi gương trong hầm'], ['smartphone', 'Mở khoá điện thoại bằng hình vẽ'], ['clapperboard', 'Lời khai có khung tranh mô phỏng'], ['train-front', 'Hoạt cảnh trên sơ đồ đoàn tàu'], ['messages-square', 'Đối chất bằng vật chứng'], ['shuffle', 'Ghép tranh dựng lại sự thật']];
function openIntro(help) {
  const box = $('#rules-box'), tg = $('#rules-toggle'); box.hidden = !help; tg.setAttribute('aria-expanded', String(!!help)); tg.textContent = help ? 'Ẩn cách chơi' : 'Xem cách chơi';
  $('#intro-go').textContent = S.started ? 'Quay lại bàn điều tra' : 'Bắt đầu điều tra';
  $('#intro-body').textContent = C.meta.intro;
  $('#intro-feat').innerHTML = FEAT.map(f => `<li>${ic(f[0])}${f[1]}</li>`).join('');
  sndUI(); openOv($('#intro'), '#intro-go'); introStart(); introAnim();
}

/* ---------- Kết thúc ---------- */
function rank() { const w = S.wrong.reduce((a, b) => a + b, 0) + S.hints.reduce((a, b) => a + b, 0); return w <= 1 ? 'Điều tra viên xuất sắc' : w <= 4 ? 'Điều tra viên vững vàng' : 'Điều tra viên kiên nhẫn'; }
let finTab = 'sol';
function setTab(k) {
  finTab = k; $$('.fin-tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === k)));
  let h = '';
  if (k === 'sol') h = `<div class="sol">${C.solution.map(p => `<p>${md(p)}</p>`).join('')}</div>`;
  if (k === 'pic') h = `<p class="lead" style="margin-bottom:12px">Sáu khoảnh khắc, ghép từ máy ảnh, điện thoại, lời khai và nhật ký chạy tàu.</p><div class="pn-grid fin">${POINTS[N_PTS - 1].order.map(id => panelHTML(id)).join('')}</div><div class="sim-go"><button class="btn btn-tea" data-simgo="truth" data-simat="12:28:30">${ic('clapperboard')}Xem hoạt cảnh sự thật trên sơ đồ</button></div>`;
  if (k === 'epi') h = `<div class="epi">${C.epilogue.map(p => `<p>${md(p)}</p>`).join('')}</div>`;
  $('#fin-body').innerHTML = h;
}
function openFinale() {
  const w = S.wrong.reduce((a, b) => a + b, 0), hn = S.hints.reduce((a, b) => a + b, 0), cf = Object.values(S.conf).filter(v => v === 'ok').length;
  $('#fin-stats').innerHTML = `<span><b>${evCount()}</b>/${C.evidence.length} vật chứng</span><span><b>${cf}</b>/${Object.keys(CLM).length} lời khai bị bác</span><span><b>${w}</b> lần chốt sai</span><span><b>${hn}</b> gợi ý</span>`;
  $('#fin-rank').textContent = rank();
  setTab('sol'); openOv($('#finale'), '[data-close]');
  if (window.gsap && !RM) gsap.fromTo('#fin-title', { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: .6, ease: 'back.out(2)', clearProps: 'transform' });
}

/* ---------- Kéo thả trên bảng điều tra ---------- */
let drag = null;
function bindBoard() {
  $('#bd-items').addEventListener('pointerdown', e => {
    const it = e.target.closest('.bd-item'); if (!it || (e.button && e.button !== 0)) return; const b = $('#board');
    drag = { el: it, id: it.dataset.bd, x0: e.clientX, y0: e.clientY, c0: bdPos(it.dataset.bd).slice(), bw: b.clientWidth, bh: b.clientHeight, moved: false, f: null };
    try { it.setPointerCapture(e.pointerId); } catch (err) {}
  });
  window.addEventListener('pointermove', e => {
    if (!drag) return; const dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.moved) { if (Math.hypot(dx, dy) < 6) return; drag.moved = true; drag.el.classList.add('drag'); SFX.pickup(); }
    const fx = Math.max(.06, Math.min(.94, drag.c0[0] + dx / drag.bw)), fy = Math.max(.07, Math.min(.93, drag.c0[1] + dy / drag.bh));
    drag.f = [fx, fy]; drag.el.style.left = (fx * 100) + '%'; drag.el.style.top = (fy * 100) + '%'; drawStrings();
  });
  window.addEventListener('pointerup', () => { if (!drag) return; const d = drag; drag = null; d.el.classList.remove('drag'); if (d.moved) { if (d.f) { S.board.pos[d.id] = d.f; save(); } return; } bdTap(d.id); });
  window.addEventListener('pointercancel', () => { if (drag) { drag.el.classList.remove('drag'); drag = null; } });
}

/* ---------- Vẽ lại tất cả ---------- */
function renderAll() { renderHeader(); renderDocs(); renderScene(); renderPeople(); renderSim(); renderPoints(); renderNav(); }

/* ---------- Sự kiện ---------- */
let armT = null;
function bindEvents() {
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.closest('button,[role="button"],[role="radio"]')) SFX.click();
    const cl = t.closest('[data-close]'); if (cl) { const ov = cl.closest('.ov'); if (ov) closeOv(ov); return; }
    const g = t.closest('[data-go]'); if (g) { go(g.dataset.go); return; }
    const mm = t.closest('[data-m]'); if (mm) { const ch = mm.dataset.m !== S.mview; S.mview = mm.dataset.m; S.view = S.mview; save(); renderNav(); if (S.mview === 'sim') renderSim(); if (ch) animView(); requestAnimationFrame(drawStrings); return; }
    const sg = t.closest('[data-simgo]'); if (sg) { simGo(sg.dataset.simgo, sg.dataset.simat); return; }
    const vt = t.closest('[data-vt]'); if (vt) { docTab = vt.dataset.vt; renderDocTab(); $('#viewer-scroll').scrollTop = 0; return; }
    const dc = t.closest('[data-doc]'); if (dc) { openDoc(dc.dataset.doc); return; }
    const op = t.closest('[data-open]'); if (op) { if (op.dataset.open === 'cam') openCam(); else openPhone(); return; }
    if (t.closest('#v-prev,#v-prev2')) { stepDoc(-1); return; }
    if (t.closest('#v-next,#v-next2')) { stepDoc(1); return; }
    const hs = t.closest('[data-hs]'); if (hs) { const id = hs.dataset.hs; if (S.sel === id && hs.closest('#scene-svg')) { const h = HSM[id]; zoomTo(h.x, h.y, 220); } else examine(id); return; }
    if (t.closest('#sc-torch')) { setTorch(!torch); if (torch) toast('Di ngón tay hoặc chuột để soi'); return; }
    if (t.closest('#sc-zoomout')) { zoomOut(); return; }
    /* bảng điều tra */
    if (t.closest('#bd-link')) { linkMode = !linkMode; linkSel = null; renderPeople(); return; }
    if (t.closest('#bd-pin')) { if (!evCount()) { toast('Chưa có vật chứng nào để ghim'); return; } openPicker('pin'); return; }
    if (t.closest('#bd-reset')) { S.board.pos = {}; save(); renderPeople(); return; }
    const lk = t.closest('[data-link]'); if (lk && linkMode) { S.board.links.splice(+lk.dataset.link, 1); save(); drawStrings(); return; }
    const cf = t.closest('[data-confront]'); if (cf) { openPicker('single', cf.dataset.confront); return; }
    const pe = t.closest('[data-pickev]'); if (pe && PK) {
      const id = pe.dataset.pickev;
      if (PK.mode === 'single') { closeOv($('#picker')); resolveConfront(PK.arg, id); return; }
      const i = PK.sel.indexOf(id); if (i > -1) PK.sel.splice(i, 1); else if (PK.sel.length < PK.max) PK.sel.push(id); else { toast('Chỉ chọn tối đa ' + PK.max + ' vật chứng'); return; }
      renderPicker(); return;
    }
    if (t.closest('#pk-done')) { S.board.pins = PK.sel.slice(); save(); closeOv($('#picker')); go('people'); renderPeople(); SFX.pickup(); return; }
    const es = t.closest('[data-evsrc]'); if (es) { const b = $('#bag'); if (!b.hidden) closeOv(b); openEvSource(es.dataset.evsrc); return; }
    if (t.closest('#bag-btn')) { renderBag(); openOv($('#bag'), '.close-x'); return; }
    if (t.closest('#notes-btn')) { openOv($('#notes-ov'), '#notes'); return; }
    if (t.closest('#help-btn')) { openIntro(true); return; }
    if (t.closest('#snd-btn') || t.closest('#intro-snd')) { setSound(!S.sound); return; }
    /* trọng điểm */
    const pk = t.closest('#tp-cur [data-pick]'); if (pk) { setPick(pk.dataset.pick); return; }
    const ac = t.closest('[data-acc]'); if (ac) { storyPick(s => s.s = ac.dataset.acc); return; }
    const po = t.closest('[data-pool]'); if (po) { storyPick(s => { if (s.order.length < 6) s.order.push(po.dataset.pool); }); return; }
    const sl = t.closest('[data-slot]'); if (sl) { storyPick(s => s.order.splice(+sl.dataset.slot, 1)); return; }
    const act = t.closest('[data-act]'); if (act) {
      const a = act.dataset.act;
      if (a === 'submit') submit();
      else if (a === 'hint') { const i = S.solved; if (S.hints[i] < 2) { S.hints[i]++; save(); renderPoints(); } }
      else if (a === 'finale') openFinale();
      else if (a === 'story-reset') storyPick(s => s.order = []);
      return;
    }
    if (t.closest('#sv-go')) { const i = S.solved - 1; closeOv($('#solved')); go('docs'); setTimeout(() => { const b = $$('#batches .batch')[i + 1]; if (b) b.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }, 90); return; }
    /* hoạt cảnh */
    const sv = t.closest('[data-simv]'); if (sv && !sv.disabled) { S.simV = sv.dataset.simv; save(); renderSim(); simScrollTo(S.simV); return; }
    if (t.closest('#sim-play')) { simPlay(!SIMK.playing); return; }
    if (t.closest('#sim-speed')) { SIMK.speed = SIMK.speed === 30 ? 60 : SIMK.speed === 60 ? 10 : 30; renderSim(); return; }
    if (t.closest('#sim-nextbad')) { const r = conflictRanges(S.simV).find(x => x[0] > (S.simT || T0) + 1); if (r) { simPlay(false); simSet(r[0] + 2); simScrollTo(S.simV); } return; }
    const car = t.closest('[data-car]'); if (car) { const w = $('#sim-wrap'); w.scrollTo({ left: (+car.dataset.car / 1180) * w.scrollWidth - w.clientWidth / 2, behavior: RM ? 'auto' : 'smooth' }); return; }
    const ca = t.closest('[data-camat]'); if (ca) { openCam(+ca.dataset.camat); return; }
    /* máy ảnh */
    if (t.closest('#cam-play')) { camPlay(!CAM.playing); return; }
    if (t.closest('#cam-prev')) { camPlay(false); camStep(-1); return; }
    if (t.closest('#cam-next')) { camPlay(false); camStep(1); return; }
    if (t.closest('#cam-tun')) { camNextTunnel(); return; }
    if (t.closest('#cam-flip')) { CAM.flip = !CAM.flip; camRender(); return; }
    if (t.closest('#cam-zoom')) { CAM.zoom = !CAM.zoom; camRender(); return; }
    const cj = t.closest('[data-camjump]'); if (cj) { camPlay(false); CAM.idx = Math.round((+cj.dataset.camjump - CAM0) / 2); camRender(); return; }
    /* điện thoại */
    if (t.closest('#ph-torch')) { PH.torch = !PH.torch; phRender(); return; }
    if (t.closest('#ph-clear')) { PH.path = []; PH.tap = false; PH.msg = ''; phRender(); return; }
    if (t.closest('#ph-ok')) { phCheck(); return; }
    const ph = t.closest('[data-ph]'); if (ph) { PH.screen = ph.dataset.ph; if (ph.dataset.arg) PH.arg = ph.dataset.arg; phRender(); return; }
    /* kết thúc */
    const tb = t.closest('[data-tab]'); if (tb) { setTab(tb.dataset.tab); return; }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && stack.length) { closeOv(stack[stack.length - 1]); return; }
    const top = stack[stack.length - 1];
    if (top && top.id === 'viewer' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { stepDoc(e.key === 'ArrowLeft' ? -1 : 1); return; }
    if (top && top.id === 'camov' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && e.target.type !== 'range') { camPlay(false); camStep(e.key === 'ArrowLeft' ? -1 : 1); return; }
    if (top && top.id === 'phone' && PH.screen === 'lock') {
      if (/^[1-9]$/.test(e.key)) { phAdd(+e.key); PH.tap = true; phRender(); return; }
      if (e.key === 'Enter') { phCheck(); return; }
      if (e.key === 'Backspace') { PH.path.pop(); phRender(); return; }
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && (e.target.classList.contains('mk') || e.target.classList.contains('pk'))) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('bd-item')) { e.preventDefault(); bdTap(e.target.dataset.bd); }
  });
  $('#cam-range').addEventListener('input', e => { camPlay(false); CAM.idx = +e.target.value; camRender(); });
  $('#cam-exp').addEventListener('input', e => { S.exp = +e.target.value; camRender(); });
  $('#sim-range').addEventListener('input', e => { if (SIMK.playing) simPlay(false); simSet(+e.target.value); });
  const notes = $('#notes'); let nT;
  notes.addEventListener('input', () => { clearTimeout(nT); nT = setTimeout(() => { S.notes = notes.value; save(); $('#notes-len').textContent = notes.value.length + ' ký tự'; }, 300); });
  $('#reset-btn').addEventListener('click', () => {
    const b = $('#reset-btn');
    if (!armT) { b.textContent = 'Bấm lần nữa để xoá hết'; b.classList.add('armed'); armT = setTimeout(() => { armT = null; b.textContent = 'Chơi lại từ đầu'; b.classList.remove('armed'); }, 3000); return; }
    clearTimeout(armT); armT = null; setTorch(false); linkMode = false; linkSel = null; simPlay(false); S = DEF(); save(); sndUI(); notes.value = ''; $('#notes-len').textContent = '';
    b.textContent = 'Chơi lại từ đầu'; b.classList.remove('armed'); $('#scene-box').innerHTML = ''; closeAll(); renderAll(); openIntro(false);
  });
  $('#intro-go').addEventListener('click', () => { if (!S.started) { S.started = true; save(); } closeOv($('#intro')); SFX.paper(); animView(); });
  $('#rules-toggle').addEventListener('click', () => { const box = $('#rules-box'), open = box.hidden; box.hidden = !open; $('#rules-toggle').setAttribute('aria-expanded', String(open)); $('#rules-toggle').textContent = open ? 'Ẩn cách chơi' : 'Xem cách chơi'; });
  $('#scene-box').addEventListener('pointermove', torchMove); $('#scene-box').addEventListener('pointerdown', torchMove);
  document.addEventListener('pointerdown', () => { if (S.sound) { SFX.init(); SFX.resume(); SFX.ambient(true); } }, { once: true, capture: true });
  let rsT; window.addEventListener('resize', () => { clearTimeout(rsT); rsT = setTimeout(drawStrings, 120); });
  bindBoard(); bindPhone();
}

/* ---------- Khởi động ---------- */
function headerIcons() {
  $('#bag-ico').innerHTML = ic('briefcase'); $('#notes-btn').innerHTML = ic('notebook-pen'); $('#help-btn').innerHTML = ic('circle-help');
  $$('[data-lu]').forEach(el => { if (!el.querySelector('svg')) el.insertAdjacentHTML('afterbegin', ic(el.dataset.lu)); });
}
function start() {
  const st = load(); if (st) S = st;
  if (!S.simT) S.simT = T0;
  setTimeout(makeTextures, 30); headerIcons(); sndUI(); buildNav(); bindEvents();
  $('#notes').value = S.notes || ''; $('#notes-len').textContent = S.notes ? S.notes.length + ' ký tự' : '';
  renderAll(); if (!S.started) openIntro(false);
}
start();
