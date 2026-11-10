/* =====================================================================
   HOẠT CẢNH TRÊN SƠ ĐỒ ĐOÀN TÀU
   Mỗi lời khai là một "phiên bản". Nhân vật di chuyển theo lời khai (vòng nét đứt).
   Bằng chứng người chơi đã có hiện thành vòng đặc có dấu ✓.
   Chỗ lời khai trái với bằng chứng: tô đỏ, nối bằng đường gạch đỏ.
   ===================================================================== */
'use strict';
const T0 = toSec(C.meta.span[0]), T1 = toSec(C.meta.span[1]);
const PL = C.places, COR_Y = 53, WALK = 17; /* px mỗi giây */
const TRANSIENT = { x: true };
const SIMK = { playing: false, raf: 0, last: 0, speed: 30, built: false, conflictCache: {} };
const VORDER = ['huy', 'dung', 'khoa', 'cuong', 'mai', 'evidence', 'truth'];
const WHO_NAME = { ao: 'Áo NV', x: '?' };
const nameOf = w => WHO_NAME[w] || (PEOPLE[w] ? PEOPLE[w].s : w);
const colorOf = w => w === 'ao' ? '#2b4a72' : w === 'x' ? '#33465f' : (PEOPLE[w] ? PEOPLE[w].color : '#999');

function doorOf(p) { const q = PL[p]; return q.corridor ? [q.x, q.y] : [q.x, COR_Y]; }
function polyAt(pts, f) {
  let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let need = L * f; for (let i = 1; i < pts.length; i++) { if (need <= seg[i - 1] || i === pts.length - 1) { const k = seg[i - 1] ? Math.min(1, need / seg[i - 1]) : 1; return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]; } need -= seg[i - 1]; }
  return pts[pts.length - 1];
}
function pathLen(pts) { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; }
function posOf(who, kf, t) {
  if (!kf || !kf.length) return null;
  const ts = kf.map(k => toSec(k[0]));
  if (t < ts[0]) return null;
  const last = kf.length - 1;
  if (t >= ts[last]) { if (TRANSIENT[who] && t > ts[last]) return null; const q = PL[kf[last][1]]; return { x: q.x, y: q.y, place: kf[last][1] }; }
  let i = 0; while (i < last && t >= ts[i + 1]) i++;
  const a = kf[i][1], b = kf[i + 1][1];
  if (a === b) { const q = PL[a]; return { x: q.x, y: q.y, place: a }; }
  const pts = [[PL[a].x, PL[a].y], doorOf(a), doorOf(b), [PL[b].x, PL[b].y]];
  const dur = Math.min(ts[i + 1] - ts[i], Math.max(4, pathLen(pts) / WALK)), dep = ts[i + 1] - dur;
  if (t < dep) { const q = PL[a]; return { x: q.x, y: q.y, place: a }; }
  const p = polyAt(pts, (t - dep) / dur); return { x: p[0], y: p[1], place: null, moving: true };
}
function activeFacts(t) { return C.facts.filter(f => S.ev[f.ev] && t >= toSec(f.t0) && t <= toSec(f.t1)); }
function conflictsAt(V, t) {
  const out = []; if (!V || V.facts || V.final) return out;
  activeFacts(t).forEach(f => {
    const kf = V.who[f.who]; if (!kf) return; const p = posOf(f.who, kf, t); if (!p || !p.place) return;
    if ((f.at && f.at !== p.place) || (f.not && f.not === p.place)) out.push({ f, who: f.who, claim: p });
  });
  return out;
}
function conflictRanges(vk) {
  const key = vk + ':' + evCount(); if (SIMK.conflictCache[key]) return SIMK.conflictCache[key];
  const V = C.tracks[vk], out = []; let cur = null;
  for (let t = T0; t <= T1; t += 5) { const has = conflictsAt(V, t).length > 0; if (has && !cur) cur = [t, t]; else if (has) cur[1] = t; else if (cur) { out.push(cur); cur = null; } }
  if (cur) out.push(cur); SIMK.conflictCache = { [key]: out }; return out;
}
function routeStatus(t) {
  const ti = R.tunnels.findIndex(x => t >= toSec(x[0]) && t <= toSec(x[1]));
  if (ti > -1) return { k: 'tun', t: 'Trong hầm số ' + (ti + 1) };
  if (t >= toSec(R.stop[0]) && t < toSec(R.stop[1])) return { k: 'stop', t: 'Dừng tránh ở ga Hải Vân' };
  if (t >= toSec(R.brake) && t < toSec(R.brakeEnd)) return { k: 'brake', t: 'Phanh khẩn cấp, tàu dừng' };
  return { k: 'run', t: 'Tàu đang chạy qua đèo' };
}
function chipSVG(who, x, y, cls, extra) {
  const col = colorOf(who), n = nameOf(who);
  let body;
  if (who === 'ao') body = `<path d="M0 -12 L-11 -6 L-13 11 L-4 12 L0 -2 L4 12 L13 11 L11 -6Z" fill="${col}" stroke="#d8d27a" stroke-width="1.2"/>`;
  else if (who === 'x') body = `<circle r="13" fill="${col}"/><text y="5" class="chip-i" style="fill:#fff">?</text>`;
  else body = `<circle r="13" fill="${col}"/><text y="5" class="chip-i">${n.replace('Ông ', '')[0]}</text>`;
  return `<g class="chip ${cls}" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><circle r="17" class="chip-ring"/>${body}${extra || ''}<text y="31" class="chip-n">${n}</text></g>`;
}
function spread(list) {
  const groups = {}; list.forEach(c => { const k = Math.round(c.x / 14) + ':' + Math.round(c.y / 14); (groups[k] = groups[k] || []).push(c); });
  Object.values(groups).forEach(g => { const n = g.length; g.forEach((c, i) => { c.x += (i - (n - 1) / 2) * 30; }); });
  return list;
}

function buildSim() {
  const vs = VORDER.map(k => { const V = C.tracks[k], lock = V.final && S.solved < N_PTS; return `<button class="sim-v${lock ? ' locked' : ''}" data-simv="${k}" aria-pressed="${S.simV === k}"${lock ? ' disabled' : ''}>${lock ? ic('lock') : ''}${V.label}</button>`; }).join('');
  $('#sim-vs').innerHTML = vs;
  if (!SIMK.built) {
    $('#sim-plan').innerHTML = `<g id="sim-base">${A.plan(PL)}</g><g id="sim-lines"></g><g id="sim-chips"></g>`;
    SIMK.built = true;
  }
}
function renderSim() {
  if (!$('#sim-plan')) return;
  buildSim();
  let V = C.tracks[S.simV]; if (!V || (V.final && S.solved < N_PTS)) { S.simV = 'huy'; V = C.tracks.huy; }
  const t = Math.max(T0, Math.min(T1, S.simT || T0));
  $('#sim-route').innerHTML = A.route(R, toSec, t);
  const st = routeStatus(t);
  $('#sim-clock').innerHTML = `<b>${fmt(t, true)}</b><span class="st-${st.k}">${st.t}</span>`;
  $('#sim-range').value = String(t);
  /* chips */
  const chips = [], facts = (V.final ? [] : activeFacts(t)), conf = conflictsAt(V, t);
  const badWho = {}; conf.forEach(c => badWho[c.who] = true);
  if (!V.who.minh) { const after = t >= toSec(R.jolt); chips.push({ who: 'minh', x: PL.k3a.x, y: PL.k3a.y, cls: 'c-victim' + (V.final && after ? ' down' : '') }); }
  Object.keys(V.who).forEach(w => { const p = posOf(w, V.who[w], t); if (p) chips.push({ who: w, x: p.x, y: p.y, cls: (V.final ? 'c-truth' : 'c-claim') + (badWho[w] ? ' c-bad' : '') + (w === 'minh' && t >= toSec(R.jolt) ? ' down' : '') }); });
  const factChips = [];
  facts.forEach(f => { if (f.at) factChips.push({ who: f.who, x: PL[f.at].x, y: PL[f.at].y + (V.who[f.who] ? 0 : 0), cls: 'c-fact', f }); });
  const all = spread(chips.concat(factChips));
  let lines = '';
  conf.forEach(c => {
    const a = all.find(z => z.who === c.who && z.cls.indexOf('c-claim') === 0), b = c.f.at ? all.find(z => z.f === c.f) : null;
    const nx = c.f.not ? PL[c.f.not] : null;
    if (a && b) lines += `<path d="M${a.x} ${a.y} L${b.x} ${b.y}" class="sim-bad"/>`;
    if (a && nx) lines += `<path d="M${a.x} ${a.y} L${nx.x} ${nx.y}" class="sim-bad"/>`;
  });
  facts.forEach(f => { if (f.not) { const q = PL[f.not]; lines += `<g class="sim-not" transform="translate(${q.x} ${q.y})"><circle r="16"/><path d="M-11 11 L11 -11"/></g>`; } });
  $('#sim-lines').innerHTML = lines;
  $('#sim-chips').innerHTML = all.map(c => chipSVG(c.who, c.x, c.y, c.cls, c.cls === 'c-fact' ? '<g class="chk" transform="translate(10 -10)"><circle r="6"/><path d="M-3 0 l2 2.5 l4 -4.5"/></g>' : '')).join('');
  /* thông tin */
  let info = '';
  if (V.facts) info += `<p class="sim-note">Phiên bản này chỉ hiện những gì bằng chứng bạn đã thu thập xác nhận. Thu thập thêm vật chứng để thấy thêm.</p>`;
  else if (V.final) info += `<p class="sim-note">Sự thật, dựng lại từ toàn bộ bằng chứng.</p>`;
  else info += `<p class="sim-note">${V.label} · <button class="xref" data-doc="${V.doc}">${V.doc}</button> Vòng nét đứt là vị trí người khai mô tả.</p>`;
  const rows = [];
  if (!V.facts) Object.keys(V.who).forEach(w => { const p = posOf(w, V.who[w], t); if (!p) return; rows.push(`<li class="${badWho[w] ? 'bad' : ''}"><i style="background:${colorOf(w)}"></i><b>${nameOf(w)}</b>${p.place ? PL[p.place].n : 'đang di chuyển'}</li>`); });
  facts.forEach(f => rows.push(`<li class="fact">${ic('check')}<span>${f.label}</span><button class="xref" data-evsrc="${f.ev}">${SRC_NAME[EVM[f.ev].src]}</button></li>`));
  conf.forEach(c => rows.push(`<li class="conf">${ic('triangle-alert')}<span><b>Mâu thuẫn:</b> lời khai đặt ${nameOf(c.who)} ở ${PL[c.claim.place].n}, nhưng ${c.f.label.charAt(0).toLowerCase() + c.f.label.slice(1)}.</span></li>`));
  info += rows.length ? `<ul class="sim-rows">${rows.join('')}</ul>` : `<p class="sim-note">Không có ai trên sơ đồ lúc này.</p>`;
  const camOk = t >= toSec(R.camera[0]) && t <= toSec(R.camera[1]);
  info += `<div class="sim-acts">${camOk ? `<button class="btn btn-ghost btn-sm" data-camat="${t}">${ic('camera')}Xem khung máy ảnh lúc ${fmt(t, true)}</button>` : ''}</div>`;
  $('#sim-info').innerHTML = info;
  /* vạch trên thanh tua */
  const pct = s => ((s - T0) / (T1 - T0) * 100).toFixed(2) + '%';
  let ticks = R.tunnels.map((x, i) => `<i class="tk-tun" style="left:${pct(toSec(x[0]))};width:calc(${pct(toSec(x[1]))} - ${pct(toSec(x[0]))} + 2px)" title="Hầm ${i + 1}"></i>`).join('');
  ticks += `<i class="tk-stop" style="left:${pct(toSec(R.stop[0]))};width:calc(${pct(toSec(R.stop[1]))} - ${pct(toSec(R.stop[0]))})"></i><i class="tk-brake" style="left:${pct(toSec(R.brake))}"></i>`;
  conflictRanges(S.simV).forEach(r => ticks += `<i class="tk-bad" style="left:${pct(r[0])};width:calc(${pct(r[1])} - ${pct(r[0])} + 3px)"></i>`);
  $('#sim-ticks').innerHTML = ticks;
  $('#sim-play').innerHTML = SIMK.playing ? ic('pause') + 'Dừng' : ic('play') + 'Phát';
  $('#sim-speed').textContent = '×' + SIMK.speed;
  $('#sim-nextbad').disabled = V.facts || V.final || !conflictRanges(S.simV).some(r => r[0] > t + 1);
}
function simSet(t) { S.simT = Math.max(T0, Math.min(T1, t)); renderSim(); }
function simFrame(n) {
  if (!SIMK.playing) return; const dt = Math.min(.1, (n - SIMK.last) / 1000); SIMK.last = n;
  S.simT = (S.simT || T0) + dt * SIMK.speed; if (S.simT >= T1) { S.simT = T1; SIMK.playing = false; save(); }
  renderSim(); if (SIMK.playing) SIMK.raf = requestAnimationFrame(simFrame);
}
function simPlay(on) { SIMK.playing = on; cancelAnimationFrame(SIMK.raf); if (on) { if ((S.simT || T0) >= T1 - 1) S.simT = T0; SIMK.last = performance.now(); SIMK.raf = requestAnimationFrame(simFrame); } else save(); renderSim(); }
function simGo(vk, at) {
  const V = C.tracks[vk]; if (!V || (V.final && S.solved < N_PTS)) return;
  S.simV = vk; S.simT = toSec(at || C.meta.span[0]); save(); closeAll(); go('sim'); simPlay(false);
  requestAnimationFrame(() => simScrollTo(S.simV));
}
function simScrollTo(vk) {
  const wrap = $('#sim-wrap'); if (!wrap || wrap.scrollWidth <= wrap.clientWidth) return;
  const V = C.tracks[vk]; const ws = Object.keys(V.who || {}); let x = PL.k3a.x;
  if (ws.length) { const p = posOf(ws[0], V.who[ws[0]], S.simT); if (p) x = p.x; }
  wrap.scrollLeft = x / 1180 * wrap.scrollWidth - wrap.clientWidth / 2;
}
