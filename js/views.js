/* =====================================================================
   CÁC MÀN HÌNH: điều hướng, hồ sơ & trình đọc tài liệu (văn bản + mô phỏng),
   hiện trường, bảng điều tra & đối chất, túi vật chứng, trọng điểm.
   ===================================================================== */
'use strict';

/* ---------- Điều hướng ---------- */
const TABS = [['docs', 'Hồ sơ', 'folder-open'], ['scene', 'Hiện trường', 'search'], ['people', 'Nghi phạm', 'users'], ['sim', 'Hoạt cảnh', 'clapperboard'], ['points', 'Trọng điểm', 'train-front']];
function buildNav() {
  $('#bnav').innerHTML = TABS.map(([k, l, i]) => `<button data-go="${k}">${ic(i)}<span>${l}</span>${k === 'docs' ? '<span class="badge" id="badge-docs" hidden></span>' : ''}${k === 'points' ? '<span class="badge tea" id="badge-pts"></span>' : ''}</button>`).join('');
  $('#main-tabs').innerHTML = TABS.filter(t => t[0] !== 'points').map(([k, l, i]) => `<button data-m="${k}">${ic(i)}${k === 'people' ? 'Bảng điều tra' : k === 'sim' ? 'Hoạt cảnh trên sơ đồ' : l}</button>`).join('');
}
function renderNav() {
  document.body.dataset.view = S.view; document.body.dataset.mview = S.mview;
  $$('#bnav button').forEach(b => b.setAttribute('aria-current', String(b.dataset.go === S.view)));
  $$('#main-tabs button').forEach(b => b.setAttribute('aria-current', String(b.dataset.m === S.mview)));
}
function renderHeader() {
  $('#cups').innerHTML = POINTS.map((_, i) => `<span class="cup${i < S.solved ? ' on' : ''}"></span>`).join('');
  $('#bag-n').textContent = evCount();
  const bp = $('#badge-pts'); if (bp) bp.textContent = S.solved >= N_PTS ? '✓' : (S.solved + 1) + '/' + N_PTS;
}
function go(v) {
  const ch = v !== S.view; S.view = v; if (v !== 'points') S.mview = v; save(); renderNav(); if (ch) animView();
  requestAnimationFrame(drawStrings);
  if (isPhone()) window.scrollTo({ top: 0 });
  if (v === 'sim') renderSim();
}

/* ---------- Hồ sơ ---------- */
function renderDocs() {
  const open = openDocs(), unread = open.filter(d => !S.read[d.id]).length, locked = DOCS.length - open.length;
  $('#doc-count').innerHTML = `<span class="count">${open.length}</span> tài liệu đang mở · <span class="count">${locked}</span> còn khoá${unread ? ` · <span class="count">${unread}</span> chưa xem` : ''}`;
  const card = d => {
    const r = !!S.read[d.id], dev = !!d.dev;
    const meta = d.dev === 'phone' && S.phoneOk ? 'Đã mở khoá' : d.m;
    const sim = d.sim && (d.sim.panels || d.sim.track) ? `<span class="dc-sim">${ic('clapperboard')}Có mô phỏng</span>` : '';
    return `<button class="doc-card${dev ? ' dev' : ''}${r ? ' is-read' : ''}" data-doc="${d.id}" style="--k:var(--k-${d.k})"><span class="dc-code">${d.id}</span><span class="dc-kind">${KIND_LABEL[d.k]}</span><span class="dc-title">${d.t}</span><span class="dc-meta">${meta}</span>${dev ? ic(d.dev === 'phone' ? 'smartphone' : 'camera', 'dc-ico') : sim}${r ? '<span class="dc-flag read">✓ đã xem</span>' : (d.b !== 0 ? '<span class="dc-flag new">Mới</span>' : '')}</button>`;
  };
  let h = '';
  for (let b = 0; b < C.batches.length; b++) {
    const list = DOCS.filter(d => d.b === b);
    h += `<section class="batch"><div class="batch-h"><h2>${C.batches[b]}</h2><span>${list.length} tài liệu</span></div><div class="doc-grid">`;
    h += b <= S.solved ? list.map(card).join('') : `<div class="doc-lock">${ic('lock')}<span><b>${list.length} tài liệu niêm phong.</b> Mở khi phá Trọng điểm ${b}.</span></div>`;
    h += '</div></section>';
  }
  const cl = DOCS.filter(d => d.b === 'c');
  h += `<section class="batch"><div class="batch-h"><h2>Lời khai mở bằng đối chất</h2><span>${cl.filter(unlocked).length}/${cl.length} đã mở · đối chất ở Bảng điều tra</span></div><div class="doc-grid">${cl.map(d => unlocked(d) ? card(d) : `<div class="doc-ghost"><b>Lời khai bổ sung</b>Chưa mở. Bác bỏ đúng một lời khai bằng vật chứng.</div>`).join('')}</div></section>`;
  $('#batches').innerHTML = h;
  const bd = $('#badge-docs'); if (bd) { bd.hidden = !unread; bd.textContent = unread; }
}

/* ---------- Dựng tài liệu giấy từ dữ liệu ---------- */
let stN = 0;
const stamp = t => { const id = 'stp' + (++stN); return `<svg class="stamp" viewBox="0 0 120 120" aria-hidden="true"><defs><path id="${id}" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs><circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="1.5"/><text font-size="10" font-weight="700" fill="currentColor"><textPath href="#${id}" textLength="276" lengthAdjust="spacing">${t} ★</textPath></text><path d="M60 41l5.6 11.4 12.6 1.8-9.1 8.9 2.1 12.5L60 69.7l-11.2 5.9 2.1-12.5-9.1-8.9 12.6-1.8z" fill="currentColor"/></svg>`; };
function letterhead(o) {
  o = o || {}; const a = C.meta.agency;
  return `<header class="lh"><div class="lh-l"><div>${o.o1 || a[0]}</div><div class="b ul">${o.o2 || a[1]}</div>${o.no ? `<div class="lh-no">Số: ${o.no}</div>` : ''}</div><div class="lh-r"><div class="b">CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="b ul">Độc lập – Tự do – Hạnh phúc</div><div class="i">${o.date || C.meta.city + ', ngày 21 tháng 11 năm 2025'}</div></div></header>`;
}
function block(b) {
  if (typeof b === 'string') return `<p>${md(b)}</p>`;
  if (b.qa) return `<div class="qa">${b.qa.map(([q, a]) => `<p class="q"><b>Hỏi:</b> ${md(q)}</p><p class="a"><b>Đáp:</b> ${md(a)}</p>`).join('')}</div>`;
  if (b.table) return `<div class="tbl-wrap"><table class="tbl"><thead><tr>${b.table.h.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${b.table.rows.map(r => `<tr>${r.map(c => `<td>${md(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  if (b.note) return `<p class="margin-note">${md(b.note)}</p>`;
  if (b.art) {
    let svg = '';
    if (b.art === 'plan') svg = `<div class="plan-wrap"><svg class="plan" viewBox="0 0 1180 200" role="img" aria-label="Sơ đồ toa 7 đến toa 9">${A.plan(C.places)}</svg></div>`;
    else if (b.art === 'route') svg = `<div class="plan-wrap"><svg class="route" viewBox="0 0 1000 86" role="img" aria-label="Đường sắt qua đèo Hải Vân">${A.route(R, toSec, null)}</svg></div>`;
    else if (b.art === 'head') svg = `<div class="fig-wrap">${A.panel({ bg: 'diagram-head' })}</div>`;
    return `<figure class="d-fig">${svg}<figcaption>${b.cap || ''}</figcaption></figure>`;
  }
  return '';
}
function docBody(d) {
  if (d.form === 'loi-khai') {
    const P = PEOPLE[d.who], name = d.name || (P && P.n) || '';
    const clip = A.PT[d.who] ? `<div class="clip-photo">${A.portrait(d.who)}</div>` : '';
    return `${letterhead()}<h3 class="d-title">BIÊN BẢN GHI LỜI KHAI</h3><p class="d-sub">Người khai: <b>${name}</b>, sinh năm ${d.born}</p>${clip}<p><i>Hồi ${d.at}, tại ${d.where}, Điều tra viên ${C.meta.investigator} tiến hành ghi lời khai.</i></p><p>Tôi khai như sau:</p>${d.body.map(block).join('')}${sign([{ role: 'NGƯỜI KHAI', name, scrawl: name.split(' ').pop(), left: d.who === 'dung' }, { role: 'ĐIỀU TRA VIÊN', name: C.meta.investigator, scrawl: 'Sơn' }])}`;
  }
  if (d.form === 'thu') {
    const m = d.mail;
    return `<div class="mail"><div class="mail-h"><div><b>Từ:</b> ${m.from}</div><div><b>Đến:</b> ${m.to}</div><div><b>Thời gian:</b> ${m.date}</div><div class="mail-s">${m.subject}</div></div><div class="mail-b">${d.body.map(block).join('')}</div><figure class="d-fig"><div class="fig-wrap">${A.panel({ bg: 'print' })}</div><figcaption>Ảnh đính kèm: bản in đánh số 37/30.</figcaption></figure></div>`;
  }
  return `${letterhead(d.head)}<h3 class="d-title">${d.title || d.t.toUpperCase()}</h3>${d.sub ? `<p class="d-sub">${d.sub}</p>` : ''}${d.body.map(block).join('')}${d.sign ? sign(d.sign) : ''}`;
}
function sign(cols) {
  return `<div class="sign${cols.length === 1 ? ' one' : ''}">${cols.map(c => `<div class="sg"><div class="b">${c.role}</div>${c.stamp ? stamp(c.stamp) : ''}<div class="sg-scrawl${c.left ? ' left' : ''}">${c.scrawl || '&nbsp;'}</div><div class="sg-name">${c.name}</div></div>`).join('')}</div>`;
}
function panelHTML(id, opts) {
  let p = C.panels[id]; if (!p) return '';
  opts = opts || {};
  if (opts.anon && p.anon) p = Object.assign({}, p, p.anon);
  return `<figure class="pn${opts.small ? ' sm' : ''}"${opts.attr || ''}>${A.panel(p)}${p.fx === 'claim' ? '<span class="pn-claim">theo lời khai</span>' : ''}<figcaption>${p.t ? `<time>${p.t}</time>` : ''}<span>${md(p.cap)}</span></figcaption></figure>`;
}
function simHTML(d) {
  const s = d.sim; if (!s) return '<p class="lead">Tài liệu này không có mô phỏng.</p>';
  let h = '';
  if (s.panels) h += `<div class="pn-grid">${s.panels.map(id => panelHTML(id)).join('')}</div>`;
  if (s.route) h += `<div class="sim-route"><svg class="route" viewBox="0 0 1000 86" aria-hidden="true">${A.route(R, toSec, toSec('12:33'))}</svg></div>`;
  if (s.track) { const T = C.tracks[s.track]; h += `<div class="sim-go"><p>Xem lại trên sơ đồ đoàn tàu: các nhân vật di chuyển theo ${T.facts ? 'những gì bằng chứng xác nhận' : 'đúng lời khai này'}, kèm đối chiếu với bằng chứng bạn đã có.</p><button class="btn btn-tea" data-simgo="${s.track}" data-simat="${s.at || C.meta.span[0]}">${ic('clapperboard')}Mở hoạt cảnh: ${T.label}</button></div>`; }
  return h;
}

/* ---------- Trình đọc tài liệu ---------- */
let curDoc = null, docTab = 'text';
function openDoc(id, tab) {
  const d = DOCM[id]; if (!d || !unlocked(d)) { toast('Tài liệu này chưa mở'); return; }
  if (d.dev === 'phone') { markRead(id); openPhone(); return; }
  if (d.dev === 'cam') { markRead(id); openCam(); return; }
  curDoc = id; docTab = tab || 'text'; markRead(id);
  const list = openDocs().filter(z => !z.dev), idx = list.indexOf(d);
  $('#vb-code').textContent = d.id; $('#vb-code').style.setProperty('--k', `var(--k-${d.k})`);
  $('#vb-name').textContent = d.t; $('#vb-pos').textContent = (idx + 1) + '/' + list.length;
  const hasSim = !!(d.sim && (d.sim.panels || d.sim.track || d.sim.route));
  $('#v-tabs').hidden = !hasSim;
  renderDocTab();
  ['#v-prev', '#v-prev2'].forEach(s => $(s).disabled = idx <= 0); ['#v-next', '#v-next2'].forEach(s => $(s).disabled = idx >= list.length - 1);
  $('#viewer-scroll').scrollTop = 0; openOv($('#viewer'), '[data-close]'); renderDocs(); docAnim($('#viewer-doc'));
}
function renderDocTab() {
  const d = DOCM[curDoc]; if (!d) return;
  $$('#v-tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.vt === docTab)));
  const art = $('#viewer-doc');
  if (docTab === 'sim') { art.className = 'sim-sheet'; art.innerHTML = `<p class="eyebrow">Mô phỏng · ${d.id}</p><h3 class="sim-h">${d.t}</h3>${simHTML(d)}`; }
  else { art.className = d.form === 'thu' ? 'mail-wrap' : 'paper'; art.innerHTML = docBody(d); }
}
function stepDoc(n) { const list = openDocs().filter(z => !z.dev); const i = list.findIndex(d => d.id === curDoc); const t = list[i + n]; if (t) openDoc(t.id, docTab); }

/* ---------- Hiện trường ---------- */
const HS = C.scene.hs, HSM = {}; HS.forEach(h => HSM[h.id] = h);
let VB = [0, 0, 800, 600], vbRAF = 0, torch = false;
function buildScene() {
  torch = false;
  $('#scene-box').innerHTML = A.scene(HS) + `<div class="scene-tools"><button id="sc-torch" aria-pressed="false">${ic('flashlight')}Đèn pin</button><button id="sc-zoomout" hidden>${ic('zoom-out')}Thu nhỏ</button></div><span class="scene-cap">${C.meta.code} · ${C.scene.photo}</span>`;
  VB = [0, 0, 800, 600];
}
function animVB(to) {
  const svg = $('#scene-svg'); if (!svg) return; const from = VB.slice(), t0 = performance.now(), D = RM ? 0 : 420; cancelAnimationFrame(vbRAF);
  const step = n => { const p = D ? Math.min(1, (n - t0) / D) : 1, e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; VB = from.map((v, i) => v + (to[i] - v) * e); svg.setAttribute('viewBox', VB.map(v => v.toFixed(1)).join(' ')); if (p < 1) vbRAF = requestAnimationFrame(step); };
  vbRAF = requestAnimationFrame(step);
}
function zoomTo(cx, cy, w) { w = w || 340; const h = w * .75; animVB([Math.max(0, Math.min(800 - w, cx - w / 2)), Math.max(0, Math.min(600 - h, cy - h / 2)), w, h]); const z = $('#sc-zoomout'); if (z) z.hidden = false; }
function zoomOut() { animVB([0, 0, 800, 600]); $('#sc-zoomout').hidden = true; }
function examine(id, noZoom) { const h = HSM[id]; if (!h) return; S.sel = id; save(); collect(id); if (!noZoom) zoomTo(h.x, h.y); renderScene(); }
function renderScene() {
  if (!$('#scene-svg')) buildScene();
  $$('#scene-svg .mk').forEach(m => { m.classList.toggle('found', !!S.ev[m.dataset.hs]); m.classList.toggle('sel', S.sel === m.dataset.hs); });
  $('#hs-list').innerHTML = HS.map(h => `<button class="hs-chip${S.ev[h.id] ? ' found' : ''}" data-hs="${h.id}" aria-current="${S.sel === h.id}"><i>${h.n}</i>${S.ev[h.id] ? h.t : 'Biển ' + h.n}</button>`).join('');
  const n = HS.filter(h => S.ev[h.id]).length, h = S.sel && HSM[S.sel];
  let act = '';
  if (h && h.act === 'cam') act = `<button class="btn btn-tea btn-sm" data-open="cam">${ic('camera')}Xem máy ảnh</button>`;
  if (h && h.act === 'phone') act = unlocked(DOCM.T13) ? `<button class="btn btn-tea btn-sm" data-open="phone">${ic('smartphone')}Mở điện thoại</button>` : `<span class="insp-lock">${ic('lock')}Chưa lấy ra được. Kỹ thuật viên sẽ tháo giường sau Trọng điểm 1.</span>`;
  $('#insp').innerHTML = h ? `<span class="num">BIỂN SỐ ${h.n}</span><h3>${h.t}</h3><p>${md(h.d)}</p><span class="got">✓ Đã cho vào túi vật chứng · đã khám ${n}/${HS.length}</span>${act ? `<div class="insp-acts">${act}</div>` : ''}`
    : `<span class="num">KHÁM XÉT</span><h3>Chọn một biển số</h3><p class="insp-empty">Khoang 3 đã được niêm phong. ${HS.length} điểm trên giường, sàn, bàn và cửa sổ được đánh dấu bằng biển số vàng. Đã khám ${n}/${HS.length}.</p><p class="insp-empty">Bật đèn pin để soi khoang trong bóng tối.</p>`;
}
function setTorch(on) {
  torch = on; const box = $('#scene-box'), svg = $('#scene-svg'); if (!svg) return; box.classList.toggle('torch', on);
  if (on && !$('#torch-dark')) {
    svg.insertAdjacentHTML('beforeend', `<defs><radialGradient id="torchg"><stop offset="0" stop-color="#000"/><stop offset=".55" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient><mask id="torchm" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="600"><rect width="800" height="600" fill="#fff"/><circle id="torch-c" cx="400" cy="300" r="130" fill="url(#torchg)"/></mask></defs><rect id="torch-dark" width="800" height="600" fill="#030506" fill-opacity=".95" mask="url(#torchm)"/><circle id="torch-warm" cx="400" cy="300" r="130" fill="url(#lampglow)" opacity=".6"/>`);
    torchAt(VB[0] + VB[2] / 2, VB[1] + VB[3] / 2);
  }
  if (!on) ['#torch-dark', '#torch-warm', '#torchm', '#torchg'].forEach(s => { const n = $(s); if (n) n.remove(); });
  const b = $('#sc-torch'); if (b) b.setAttribute('aria-pressed', String(on));
}
function torchAt(x, y) { const r = Math.max(60, VB[2] * .17); ['#torch-c', '#torch-warm'].forEach(s => { const c = $(s); if (c) { c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1)); c.setAttribute('r', r.toFixed(1)); } }); }
function torchMove(e) { if (!torch) return; const svg = $('#scene-svg'); if (!svg || !svg.getScreenCTM) return; const m = svg.getScreenCTM(); if (!m) return; const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; const p = pt.matrixTransform(m.inverse()); torchAt(p.x, p.y); }

/* ---------- Bảng điều tra (bảng bần, dây đỏ) ---------- */
function personStatus(p) { const cl = C.claims[p] || []; return { done: cl.filter(c => S.conf[c.id] === 'ok').length, total: cl.length }; }
const BD_DEF = { 'p:minh': [.5, .24], 'p:dung': [.15, .27], 'p:huy': [.85, .27], 'p:khoa': [.16, .74], 'p:cuong': [.84, .74], 'p:mai': [.5, .77] };
const BD_SLOTS = [[.3, .52], [.7, .52], [.5, .52], [.32, .12], [.68, .12], [.33, .93], [.67, .93], [.09, .52], [.91, .52], [.5, .93], [.3, .4], [.7, .4]];
const BD_SLOTS_TALL = [[.27, .45], [.73, .45], [.27, .6], [.73, .6], [.27, .94], [.73, .94], [.5, .52], [.16, .07], [.84, .07], [.5, .94], [.5, .4], [.5, .62]];
const ROT = id => { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997; return ((h % 9) - 4) * .9; };
function bdPos(id) { const p = S.board.pos[id]; if (p) return p; if (BD_DEF[id]) return BD_DEF[id]; const i = S.board.pins.indexOf(id.slice(2)), b = $('#board'), sl = b && b.clientHeight > b.clientWidth ? BD_SLOTS_TALL : BD_SLOTS; return sl[(i < 0 ? 0 : i) % sl.length]; }
let linkMode = false, linkSel = null;
function renderPeople() {
  const items = $('#bd-items'); if (!items) return;
  S.board.pins = S.board.pins.filter(id => S.ev[id] && EVM[id]);
  const at = id => { const p = bdPos(id); return `left:${(p[0] * 100).toFixed(2)}%;top:${(p[1] * 100).toFixed(2)}%;--r:${ROT(id)}deg`; };
  let h = `<div class="bd-item bd-pol" data-bd="p:minh" style="${at('p:minh')}" role="button" tabindex="0" aria-label="Nạn nhân ${PEOPLE.minh.n}, mở giám định pháp y">${A.altar()}<div class="bd-cap">Ông Minh</div></div>`;
  C.suspects.forEach(p => { const id = 'p:' + p, P = PEOPLE[p], st = personStatus(p); h += `<div class="bd-item bd-pol" data-bd="${id}" style="${at(id)}" role="button" tabindex="0" aria-label="${P.n}, mở hồ sơ và đối chất">${A.portrait(p, st.done ? 'tense' : 'calm')}<div class="bd-cap">${P.s}</div>${st.done ? `<span class="bd-stk">MÂU THUẪN${st.done > 1 ? ' ×' + st.done : ''}</span>` : ''}</div>`; });
  S.board.pins.forEach(eid => { const e = EVM[eid], id = 'e:' + eid; h += `<div class="bd-item bd-note n-${e.src}" data-bd="${id}" style="${at(id)}" role="button" tabindex="0" aria-label="Vật chứng: ${e.t}"><div class="src">${ICO[e.src]}${SRC_NAME[e.src]}</div>${e.t}</div>`; });
  if (!S.board.pins.length) h += `<div class="bd-empty">Ghim vật chứng lên đây để nối dây đỏ</div>`;
  items.innerHTML = h;
  const b = $('#board'); if (b) b.classList.toggle('linking', linkMode);
  const bl = $('#bd-link'); if (bl) bl.setAttribute('aria-pressed', String(linkMode));
  const hint = $('#bd-hint'); if (hint) hint.textContent = linkMode ? (linkSel ? 'Chọn manh mối thứ hai để nối.' : 'Chọn manh mối đầu tiên. Chạm vào một sợi dây để gỡ.') : '';
  if (linkSel) { const el = items.querySelector(`[data-bd="${CSS.escape(linkSel)}"]`); if (el) el.classList.add('sel'); }
  requestAnimationFrame(drawStrings);
}
function drawStrings() {
  const svg = $('#bd-strings'), board = $('#board'), items = $('#bd-items'); if (!svg || !board || !items || !board.offsetParent) return;
  const r = board.getBoundingClientRect(), W = board.clientWidth, H = board.clientHeight; if (!W) return;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const pin = id => { const el = items.querySelector(`[data-bd="${CSS.escape(id)}"]`); if (!el) return null; const e = el.getBoundingClientRect(); return [e.left - r.left - board.clientLeft + e.width / 2, e.top - r.top - board.clientTop + 9]; };
  const before = S.board.links.length; S.board.links = S.board.links.filter(([a, c]) => pin(a) && pin(c)); if (S.board.links.length !== before) save();
  let paths = '', pins = '';
  S.board.links.forEach(([a, c], i) => { const P1 = pin(a), P2 = pin(c), mx = (P1[0] + P2[0]) / 2, my = (P1[1] + P2[1]) / 2, d = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]); const p = `M${P1[0].toFixed(1)} ${P1[1].toFixed(1)} Q${mx.toFixed(1)} ${(my + d * .14).toFixed(1)} ${P2[0].toFixed(1)} ${P2[1].toFixed(1)}`; paths += `<path d="${p}"/><path class="hit" data-link="${i}" d="${p}"/>`; });
  $$('#bd-items .bd-item').forEach(el => { const p = pin(el.dataset.bd); if (p) pins += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5.5" class="bd-pin"/>`; });
  svg.innerHTML = `<defs><radialGradient id="pinG" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ff9a8f"/><stop offset=".5" stop-color="#d32f2f"/><stop offset="1" stop-color="#7f1010"/></radialGradient></defs>${paths}${pins}`;
}
function bdTap(id) {
  if (linkMode) {
    if (!linkSel) { linkSel = id; renderPeople(); return; }
    if (linkSel === id) { linkSel = null; renderPeople(); return; }
    const a = linkSel; linkSel = null;
    if (!S.board.links.some(([x, y]) => (x === a && y === id) || (x === id && y === a))) { S.board.links.push([a, id]); save(); SFX.pickup(); }
    renderPeople(); return;
  }
  if (id === 'p:minh') { openDoc('T04'); return; }
  if (id.startsWith('p:')) { openProfile(id.slice(2)); return; }
  openEvSource(id.slice(2));
}

/* ---------- Hồ sơ nhân vật & đối chất kiểu tin nhắn ---------- */
let pfPerson = null, pfLog = [], pfBusy = false, pfMood = null;
function openProfile(p) { pfPerson = p; pfLog = [{ w: 'them', t: C.greet[p] }]; pfBusy = false; pfMood = null; renderProfile(); openOv($('#profile'), '.close-x'); SFX.paper(); }
function renderProfile(stampNow) {
  const p = pfPerson, P = PEOPLE[p], st = personStatus(p), mood = pfMood || (st.done ? 'tense' : 'calm');
  let h = `<button class="icon-btn close-x" data-close aria-label="Đóng">${X_ICON}</button>
  <div class="pf-top"><div class="pf-portrait">${A.portrait(p, mood)}${stampNow ? '<span class="stampx">MÂU THUẪN</span>' : ''}</div><div><h2 id="pf-name">${P.n}</h2><p class="r">${P.r}</p><p>${P.sum}</p><button class="xref" data-doc="${P.doc}">Biên bản lời khai ${P.doc}</button></div></div>`;
  h += `<div class="chat-box" id="pf-chat" aria-live="polite">${pfLog.map(m => m.w === 'them' ? `<div class="cm them">${md(m.t)}</div>` : m.w === 'me' ? `<div class="cm me"><small>Cán bộ đưa ra vật chứng</small><span class="evc">${ICO[EVM[m.ev].src]}${EVM[m.ev].t}</span></div>` : `<div class="cm sys ${m.k || ''}">${m.t}</div>`).join('')}${pfBusy ? '<div class="typing" aria-label="Đang trả lời"><i></i><i></i><i></i></div>' : ''}</div>`;
  h += `<div class="claims"><h3>Lời khai cần kiểm chứng</h3>${(C.claims[p] || []).map(c => { const ok = S.conf[c.id] === 'ok'; return `<div class="claim${ok ? ' done' : ''}"><q>${md(c.q)}</q>${ok ? `<div class="reply">${md(c.say)}</div>` : ''}<div class="claim-f"><span class="st">${ok ? '✕ Đã bác bỏ' : 'Chưa kiểm chứng'}</span>${ok && c.unlock ? `<button class="xref" data-doc="${c.unlock}">Lời khai mới ${c.unlock}</button>` : ''}${ok ? '' : `<button class="btn-confront" data-confront="${c.id}"${evCount() && !pfBusy ? '' : ' disabled'}>${ic('stamp')}Đưa vật chứng</button>`}</div></div>`; }).join('')}</div>`;
  if (!evCount()) h += `<p class="lead" style="margin-top:12px">Bạn chưa có vật chứng nào. Hãy đọc hồ sơ hoặc khám hiện trường trước.</p>`;
  $('#pf-sheet').innerHTML = h;
  const cb = $('#pf-chat'); if (cb) cb.scrollTop = cb.scrollHeight;
  if (stampNow && window.gsap && !RM) gsap.fromTo('#pf-sheet', { x: -12 }, { x: 0, duration: .6, ease: 'elastic.out(1,.3)', clearProps: 'transform' });
}
function resolveConfront(cid, evId) {
  const c = CLM[cid], e = EVM[evId]; if (!c || !e || pfBusy) return;
  pfLog.push({ w: 'me', ev: evId }); pfBusy = true; renderProfile();
  let n = 0; const tick = setInterval(() => { SFX.type(); if (++n > 5) clearInterval(tick); }, 130);
  setTimeout(() => {
    clearInterval(tick); pfBusy = false;
    if (c.ok && c.ok.includes(evId)) {
      S.conf[cid] = 'ok'; save(); pfMood = 'tense';
      pfLog.push({ w: 'them', t: c.say }); pfLog.push({ w: 'sys', k: 'ok', t: 'Mâu thuẫn với: ' + e.t + (c.unlock ? ' · Mở lời khai mới ' + c.unlock : '') });
      if (c.gain) collect(c.gain);
      if (c.unlock) { S.unl[c.unlock] = true; save(); toast('Mở lời khai mới: ' + DOCM[c.unlock].t); }
      renderProfile(true); SFX.stamp(); renderDocs(); renderPeople(); renderSim();
    } else if (c.fine && c.fine[evId]) { pfMood = 'calm'; pfLog.push({ w: 'them', t: c.fine[evId] }); pfLog.push({ w: 'sys', t: 'Không có mâu thuẫn với lời khai này.' }); renderProfile(); }
    else { S.confWrong++; save(); pfMood = 'angry'; pfLog.push({ w: 'them', t: C.rebut[c.p] }); pfLog.push({ w: 'sys', k: 'bad', t: '“' + e.t + '” chưa bác bỏ được lời khai này.' }); renderProfile(); SFX.wrong(); }
    const cb2 = $('#pf-chat'); if (cb2) cb2.scrollIntoView({ block: 'nearest', behavior: RM ? 'auto' : 'smooth' });
  }, RM ? 120 : 900);
}

/* ---------- Túi vật chứng & bộ chọn ---------- */
let PK = null;
function evGroups() {
  const order = ['scene', 'doc', 'cam', 'phone', 'conf'];
  const got = C.evidence.filter(e => S.ev[e[0]]).map(e => EVM[e[0]]);
  return order.map(s => ({ s, items: got.filter(e => e.src === s) })).filter(g => g.items.length);
}
function openPicker(mode, arg) { const pre = mode === 'pin' ? S.board.pins : []; PK = { mode, arg, sel: pre.slice(), max: mode === 'pin' ? 12 : 1 }; renderPicker(); openOv($('#picker'), '.close-x'); }
function renderPicker() {
  const T = { single: ['Đưa ra vật chứng', 'Lời khai: “' + (PK.arg && CLM[PK.arg] ? CLM[PK.arg].q.replace(/\*\*/g, '') : '') + '”'], pin: ['Ghim vật chứng lên bảng', 'Chọn tối đa 12 vật chứng để ghim và nối dây đỏ.'] }[PK.mode];
  const gs = evGroups();
  let h = `<button class="icon-btn close-x" data-close aria-label="Đóng">${X_ICON}</button><p class="eyebrow">Túi vật chứng</p><h2 id="pk-title" style="margin:4px 0 6px;font-size:21px;padding-right:40px">${T[0]}</h2><p class="lead">${T[1]}</p>`;
  h += gs.length ? gs.map(g => `<div class="ev-group"><h3>${SRC_NAME[g.s]} · ${g.items.length}</h3><div class="ev-list">${g.items.map(e => `<button class="ev-row" data-pickev="${e.id}" aria-pressed="${PK.sel.includes(e.id)}">${ICO[e.src]}<span>${e.t}</span></button>`).join('')}</div></div>`).join('') : '<p class="ev-empty">Chưa có vật chứng.</p>';
  if (PK.mode !== 'single') h += `<div class="pick-foot"><span>Đã chọn ${PK.sel.length}/${PK.max}</span><button class="btn btn-tea" id="pk-done">Xong</button></div>`;
  $('#pk-sheet').innerHTML = h;
}
function renderBag() {
  const gs = evGroups();
  $('#bag-sum').textContent = evCount() + ' / ' + C.evidence.length + ' vật chứng. Chạm vào một mục để mở lại nguồn của nó.';
  $('#bag-list').innerHTML = gs.length ? gs.map(g => `<div class="ev-group"><h3>${SRC_NAME[g.s]} · ${g.items.length}</h3><div class="ev-list">${g.items.map(e => `<button class="ev-row" data-evsrc="${e.id}">${ICO[e.src]}<span>${e.t}</span><span class="go">Mở →</span></button>`).join('')}</div></div>`).join('') : '<p class="ev-empty">Túi còn trống. Đọc hồ sơ, khám hiện trường, xem máy ảnh và điện thoại để thu thập vật chứng.</p>';
}
function openEvSource(id) {
  const e = EVM[id]; if (!e) return;
  if (e.src === 'scene') { closeAll(); go('scene'); examine(id); return; }
  if (e.src === 'doc') { openDoc(e.ref); return; }
  if (e.src === 'phone') { openPhone(e.ref); return; }
  if (e.src === 'cam') { openCam(toSec(e.ref)); return; }
  if (e.src === 'conf') { closeAll(); openProfile(e.ref); }
}

/* ---------- Trọng điểm ---------- */
const POOL = ['tp4', 'tp1', 'tp6', 'tp3', 'tp5', 'tp2'];
function inputFor(p, i) {
  const sel = S.pick[i];
  if (p.type === 'seg') return `<div class="seg" role="radiogroup" aria-label="Khoảng thời gian">${p.o.map(o => `<button role="radio" data-pick="${o[0]}" aria-checked="${sel === o[0]}" style="flex:${o[3]}">${o[1]}<br>${o[2]}</button>`).join('')}</div><div class="seg-ax">${p.axis.map(a => `<span>${a}</span>`).join('')}</div>`;
  if (p.type === 'tray') return A.tray(p.o, sel);
  if (p.type === 'story') {
    const s = sel || {}, ord = s.order || [], pool = POOL.filter(x => !ord.includes(x));
    return `<p class="st-h">1. Chọn hung thủ</p><div class="acc-row" role="radiogroup" aria-label="Chọn hung thủ">${C.suspects.map(k => `<button class="acc-p" role="radio" data-acc="${k}" aria-checked="${s.s === k}">${A.portrait(k, s.s === k ? 'tense' : 'calm')}<span>${PEOPLE[k].s}</span></button>`).join('')}</div>
    <p class="st-h">2. Xếp khung tranh theo trình tự <button class="linkish" data-act="story-reset">${ic('undo-2')}Xếp lại</button></p>
    <div class="st-slots">${[0, 1, 2, 3, 4, 5].map(j => ord[j] ? `<button class="st-slot full" data-slot="${j}" aria-label="Khung ${j + 1}, chạm để gỡ"><b>${j + 1}</b>${panelHTML(ord[j], { small: true, anon: true })}</button>` : `<div class="st-slot"><b>${j + 1}</b><span>Trống</span></div>`).join('')}</div>
    ${pool.length ? `<p class="st-note">Chạm một khung bên dưới để đặt vào ô trống kế tiếp.</p><div class="st-pool">${pool.map(x => `<button class="st-card" data-pool="${x}">${panelHTML(x, { small: true, anon: true })}</button>`).join('')}</div>` : ''}`;
  }
  return '';
}
function hasPick(p, i) { const s = S.pick[i]; if (p.type === 'story') return !!(s && s.s && s.order && s.order.length === 6); return s != null && s !== ''; }
function renderPoints() {
  let h = '';
  if (S.solved >= N_PTS) h += `<div class="tp-final"><h3>Vụ án đã phá</h3><p>Tấm gương trong hầm số 4 đã nói thay ông Minh.</p><button class="btn" data-act="finale">Đọc lời giải & hậu truyện</button></div>`;
  POINTS.forEach((p, i) => {
    if (i < S.solved) {
      h += `<details class="tp-done"${i === S.solved - 1 && S.solved < N_PTS ? ' open' : ''}><summary><span class="tp-n">✓ ${i + 1}</span><span class="tp-t">${p.t}</span><span class="tp-a">${p.al}</span></summary><div class="tp-body"><p>${p.c}</p>${i < N_PTS - 1 ? `<div class="chips">Đã mở: ${DOCS.filter(d => d.b === i + 1).map(d => `<button class="chip" data-doc="${d.id}">${d.id} · ${d.t}</button>`).join('')}</div>` : ''}</div></details>`;
    } else if (i === S.solved) {
      const fb = S.fb[i], nh = S.hints[i];
      h += `<div class="tp-cur" id="tp-cur"><div class="tp-num">TRỌNG ĐIỂM ${i + 1}<small>${p.t}</small></div><p class="tp-q">${p.q}</p>${inputFor(p, i)}${fb ? `<div class="tp-fb" role="alert"><b>Chưa đúng.</b> ${fb}</div>` : ''}<div class="tp-actions"><button class="btn btn-tea" data-act="submit"${hasPick(p, i) ? '' : ' disabled'}>${p.type === 'story' ? 'Buộc tội' : 'Chốt đáp án'}</button>${nh < 2 ? `<button class="btn btn-ghost" data-act="hint">Gợi ý ${nh + 1}/2</button>` : ''}<span class="tp-stat">${S.wrong[i] ? 'Sai ' + S.wrong[i] + ' lần' : ''}</span></div>${nh ? `<div class="hints">${p.h.slice(0, nh).map((t, j) => `<div class="hint"><b>Gợi ý ${j + 1}.</b> ${t}</div>`).join('')}</div>` : ''}</div>`;
      h += `<div class="tip"><b>Mẹo:</b> ${i === 0 ? 'mở <b>T10 Máy ảnh</b> và kéo thanh Tăng sáng khi tàu vào hầm: tấm kính tối sẽ thành gương.' : 'ở <b>Hoạt cảnh</b>, chọn lời khai của từng người rồi tua: chỗ nào bằng chứng nói khác sẽ hiện màu đỏ.'}</div>`;
    } else h += `<div class="tp-lock">${ic('lock')}Trọng điểm ${i + 1} · mở sau trọng điểm ${i}</div>`;
  });
  $('#tp-list').innerHTML = h;
}
function setPick(v) { const i = S.solved; if (i >= N_PTS) return; S.pick[i] = v; S.fb[i] = null; save(); renderPoints(); const c = $('#tp-cur [data-pick="' + v + '"]'); if (c && c.focus) try { c.focus({ preventScroll: true }); } catch (e) {} }
function storyPick(fn) { const i = S.solved; const s = Object.assign({ s: null, order: [] }, S.pick[i] || {}); s.order = (s.order || []).slice(); fn(s); S.pick[i] = s; S.fb[i] = null; save(); renderPoints(); }
function submit() {
  const i = S.solved, p = POINTS[i], s = S.pick[i]; if (!p || !hasPick(p, i)) return;
  let ok, fb = '';
  if (p.type === 'story') {
    if (s.s !== p.ans) { ok = false; fb = p.why[s.s]; }
    else { const n = s.order.filter((x, j) => x === p.order[j]).length; ok = n === 6; if (!ok) fb = `Đúng người. Nhưng thứ tự mới khớp ${n}/6 khung. Đối chiếu giờ ghi trên từng khung với nhật ký chạy tàu.`; }
  } else { ok = s === p.ans; if (!ok) fb = p.why[s] || ''; }
  if (ok) {
    S.solved = i + 1; S.fb[i] = null; save(); renderAll();
    if (S.solved < N_PTS) showSolved(i);
    else { SFX.right(); setTimeout(() => SFX.stamp(), 350); toast('Vụ án đã phá'); setTimeout(openFinale, 650); }
  } else {
    S.wrong[i]++; S.fb[i] = fb; save(); renderPoints(); SFX.wrong();
    const c = $('#tp-cur'); if (c) { c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); }
  }
}
function showSolved(i) {
  const p = POINTS[i], docs = DOCS.filter(d => d.b === i + 1);
  $('#sv-eyebrow').textContent = 'Trọng điểm ' + (i + 1) + ' · ' + p.t; $('#sv-title').textContent = p.al; $('#sv-text').textContent = p.c;
  $('#sv-docs').innerHTML = docs.map(d => `<div class="sv-doc" style="--k:var(--k-${d.k})"><span>${d.id}</span>${d.t}</div>`).join('');
  $('#sv-go').textContent = 'Xem ' + docs.length + ' tài liệu mới';
  openOv($('#solved'), '#sv-go'); SFX.right();
  if (window.gsap && !RM) {
    gsap.fromTo('#sv-card', { scale: .92, opacity: 0 }, { scale: 1, opacity: 1, duration: .4, ease: 'power2.out', clearProps: 'transform' });
    gsap.fromTo('#sv-stamp', { scale: 3.2, opacity: 0, rotate: -30 }, { scale: 1, opacity: 1, rotate: -8, duration: .5, delay: .3, ease: 'back.out(2.4)' });
    setTimeout(() => SFX.stamp(), 620);
    gsap.fromTo('#sv-docs .sv-doc', { y: 46, opacity: 0, rotate: () => gsap.utils.random(-14, 14) }, { y: 0, opacity: 1, rotate: () => gsap.utils.random(-4, 4), duration: .55, delay: .75, stagger: .11, ease: 'back.out(1.7)' });
  } else SFX.stamp();
}
