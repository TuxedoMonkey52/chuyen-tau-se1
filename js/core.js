/* =====================================================================
   LÕI: tiện ích, dữ liệu dẫn xuất, trạng thái lưu trên máy, âm thanh,
   vân bề mặt, lớp phủ (overlay), thông báo.
   ===================================================================== */
'use strict';
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
const ic = (n, c) => `<svg class="lu${c ? ' ' + c : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LU[n] || ''}</svg>`;
const X_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';
const isPhone = () => window.matchMedia('(max-width:1023.98px)').matches;

/* ---------- Thời gian: giây tính từ 12:00:00 ---------- */
function toSec(t) { const p = String(t).split(':').map(Number); return (p[0] - 12) * 3600 + (p[1] || 0) * 60 + (p[2] || 0); }
const pad2 = n => String(n).padStart(2, '0');
function fmt(sec, withS) { sec = Math.round(sec); const h = 12 + Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60; return pad2(h) + ':' + pad2(m) + (withS ? ':' + pad2(s) : ''); }

/* ---------- Chữ: **đậm**, *nghiêng*, [[T05]] ---------- */
function md(t) {
  return String(t)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/\*(.+?)\*/g, '<i>$1</i>')
    .replace(/\[\[(T\d+)\]\]/g, (m, id) => `<button class="xref" data-doc="${id}">${id}</button>`);
}

/* ---------- Dữ liệu dẫn xuất từ CASE ---------- */
const C = window.CASE, A = window.ART;
const PEOPLE = C.people, DOCS = C.docs, POINTS = C.points, R = C.route;
const DOCM = {}; DOCS.forEach(d => DOCM[d.id] = d);
const EVM = {}; C.evidence.forEach(e => EVM[e[0]] = { id: e[0], src: e[1], t: e[2], ref: e[3] });
const CLM = {}; Object.keys(C.claims).forEach(p => C.claims[p].forEach(c => { c.p = p; CLM[c.id] = c; }));
const SRC_NAME = { scene: 'Hiện trường', doc: 'Tài liệu', cam: 'Máy ảnh', phone: 'Điện thoại', conf: 'Đối chất' };
const ICO = { scene: ic('search', 'ev-ico'), doc: ic('file-text', 'ev-ico'), cam: ic('camera', 'ev-ico'), phone: ic('smartphone', 'ev-ico'), conf: ic('messages-square', 'ev-ico') };
const KIND_LABEL = { report: 'Báo cáo', record: 'Biên bản', lab: 'Giám định', statement: 'Lời khai', data: 'Dữ liệu', mail: 'Thư', dev: 'Thiết bị' };
const N_PTS = POINTS.length;

/* ---------- Trạng thái (lưu trong trình duyệt của người chơi) ---------- */
const KEY = C.meta.saveKey;
const DEF = () => ({ started: false, solved: 0, wrong: POINTS.map(() => 0), hints: POINTS.map(() => 0), read: {}, ev: {}, conf: {}, confWrong: 0, unl: {},
  notes: '', view: 'docs', mview: 'docs', pick: {}, fb: {}, phoneOk: false, phoneTries: 0, sel: null, camT: 0, exp: 25,
  simV: 'huy', simT: 0, board: { pos: {}, pins: [], links: [] }, sound: true });
let S = DEF();
function load() { try { const r = localStorage.getItem(KEY); if (r) { const o = JSON.parse(r); if (o && typeof o === 'object') return Object.assign(DEF(), o); } } catch (e) {} return null; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
const unlocked = d => d.b === 'c' ? !!S.unl[d.id] : d.b <= S.solved;
const openDocs = () => DOCS.filter(unlocked);
const evCount = () => Object.keys(S.ev).filter(k => EVM[k]).length;

let evQ = [], evTimer;
function collect(id) {
  if (!EVM[id] || S.ev[id]) return;
  S.ev[id] = Date.now(); evQ.push(id); save(); flyEv(id);
  const b = $('#bag-btn'); $('#bag-n').textContent = evCount(); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  clearTimeout(evTimer);
  evTimer = setTimeout(() => {
    const n = evQ.length; if (n) { SFX.pickup(); toast(n === 1 ? '+ Vật chứng: ' + EVM[evQ[0]].t : '+ ' + n + ' vật chứng mới', 'ev'); }
    evQ = []; renderPeople(); if (typeof renderSim === 'function') renderSim();
  }, 260);
}
function markRead(id) { if (!S.read[id]) { S.read[id] = true; save(); } const d = DOCM[id]; if (d && d.ev) d.ev.forEach(collect); }

/* ---------- Âm thanh: tạo trực tiếp bằng Web Audio, không dùng tệp ghi âm ---------- */
const SFX = (() => {
  let ctx = null, master = null, nb = null, bb = null, amb = null, clackT = null, hissN = null;
  function init() {
    if (ctx) return true; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    try {
      ctx = new AC(); master = ctx.createGain(); master.gain.value = .9; master.connect(ctx.destination);
      const len = ctx.sampleRate * 2; nb = ctx.createBuffer(1, len, ctx.sampleRate); const d = nb.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      const l2 = ctx.sampleRate * 4; bb = ctx.createBuffer(2, l2, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) { const e = bb.getChannelData(ch); let last = 0; for (let i = 0; i < l2; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; e[i] = last * 3.2 + w * .04; } }
      return true;
    } catch (err) { ctx = null; return false; }
  }
  const ready = () => !!(S.sound && ctx && ctx.state === 'running');
  const resume = () => { try { if (ctx && ctx.state === 'suspended') ctx.resume(); } catch (e) {} };
  function tone(f, dur, type, vol, when, slide) { const t = ctx.currentTime + (when || 0), o = ctx.createOscillator(), g = ctx.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .008); g.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .03); }
  function burst(dur, vol, ft, freq, q, when, att) { const t = ctx.currentTime + (when || 0), s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = nb; f.type = ft; f.frequency.value = freq; f.Q.value = q || .7; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + (att || .005)); g.gain.exponentialRampToValueAtTime(.0001, t + dur); s.connect(f); f.connect(g); g.connect(master); s.start(t, Math.random() * 1.5); s.stop(t + dur + .05); }
  function loop(buf, vol, ft, freq) { const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain(); s.buffer = buf; s.loop = true; f.type = ft; f.frequency.value = freq; g.gain.value = 0; s.connect(f); f.connect(g); g.connect(master); s.start(); g.gain.setTargetAtTime(vol, ctx.currentTime, .8); return { s, g, f }; }
  function stop(n) { if (!n) return; try { n.g.gain.setTargetAtTime(0, ctx.currentTime, .25); setTimeout(() => { try { n.s.stop(); } catch (e) {} }, 1400); } catch (e) {} }
  const clack = () => { if (!ready()) return; burst(.09, .16, 'lowpass', 240, .8); burst(.09, .12, 'lowpass', 300, .8, .13); };
  return { init, resume,
    click() { if (!ready()) return; burst(.035, .08, 'highpass', 3200); tone(1700, .03, 'sine', .025); },
    key() { if (!ready()) return; tone(1250, .05, 'sine', .05); },
    type() { if (!ready()) return; burst(.025, .05, 'highpass', 2600, .9); },
    paper() { if (!ready()) return; burst(.24, .12, 'bandpass', 2400, .6, 0, .035); burst(.16, .07, 'bandpass', 4300, .8, .09, .02); },
    pickup() { if (!ready()) return; tone(520, .09, 'triangle', .07); tone(780, .13, 'triangle', .06, .06); },
    stamp() { if (!ready()) return; tone(120, .28, 'sine', .55, 0, 42); burst(.13, .32, 'lowpass', 900); burst(.05, .14, 'highpass', 2600, .7, .01); },
    wrong() { if (!ready()) return; tone(190, .16, 'square', .05); tone(145, .24, 'square', .05, .12); },
    right() { if (!ready()) return; [660, 880, 1320].forEach((f, i) => tone(f, .55, 'sine', .11, i * .09)); },
    unlock() { if (!ready()) return; tone(990, .12, 'sine', .11); tone(1480, .22, 'sine', .09, .09); },
    shutter() { if (!ready()) return; burst(.03, .14, 'highpass', 2000); burst(.05, .1, 'bandpass', 900, 1, .05); },
    tunnel() { if (!ready()) return; burst(2.2, .38, 'lowpass', 180, .5, 0, .5); },
    horn() { if (!ready()) return; tone(311, 1.1, 'sawtooth', .05); tone(370, 1.1, 'sawtooth', .04); },
    ambient(on) {
      if (on) { if (!S.sound || !init()) return; resume(); if (!amb) { amb = loop(bb, .22, 'lowpass', 260); amb.r = loop(nb, .018, 'highpass', 4800); clackT = setInterval(clack, 1150); } }
      else if (amb) { stop(amb); stop(amb.r); amb = null; clearInterval(clackT); }
    },
    hiss(on) { if (on) { if (!ready()) return; if (!hissN) hissN = loop(nb, .03, 'bandpass', 3000); } else if (hissN) { stop(hissN); hissN = null; } }
  };
})();
function sndUI() {
  const on = !!S.sound, b = $('#snd-btn');
  if (b) { b.setAttribute('aria-pressed', String(on)); b.innerHTML = ic(on ? 'volume-2' : 'volume-x'); b.setAttribute('aria-label', on ? 'Tắt âm thanh' : 'Bật âm thanh'); }
  const p = $('#intro-snd'); if (p) { p.setAttribute('aria-pressed', String(on)); p.innerHTML = ic(on ? 'volume-2' : 'volume-x') + (on ? 'Âm thanh: Bật' : 'Âm thanh: Tắt'); }
}
function setSound(on) { S.sound = on; save(); if (on) { SFX.init(); SFX.resume(); SFX.ambient(true); setTimeout(() => SFX.click(), 60); } else { SFX.ambient(false); SFX.hiss(false); } sndUI(); }

/* ---------- Vân bề mặt bằng simplex-noise (giấy phép MIT) ---------- */
function makeTextures() {
  if (typeof window.SimplexNoise !== 'function') return;
  try {
    const sn = new window.SimplexNoise('se1'), TAU = Math.PI * 2;
    const tile = (i, j, w, h, f) => { const a = i / w * TAU, b = j / h * TAU, rx = w / (TAU * f), ry = h / (TAU * f); return sn.noise4D(Math.cos(a) * rx, Math.sin(a) * rx, Math.cos(b) * ry, Math.sin(b) * ry); };
    const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'), im = x.createImageData(w, h), d = im.data; for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const k = (j * w + i) * 4, v = fn(i, j); d[k] = v[0]; d[k + 1] = v[1]; d[k + 2] = v[2]; d[k + 3] = v[3]; } x.putImageData(im, 0, 0); return 'url(' + c.toDataURL('image/png') + ')'; };
    const St = document.documentElement.style;
    St.setProperty('--tx-cork', mk(192, 192, (i, j) => { const n = tile(i, j, 192, 192, 7) * .55 + tile(i, j, 192, 192, 2.4) * .35 + tile(i, j, 192, 192, 32) * .25; let v = .55 + n * .45; if (((i * 7919 + j * 104729) % 97) < 3) v -= .3; v = Math.max(0, Math.min(1, v)); return [Math.round(126 + 82 * v), Math.round(86 + 60 * v), Math.round(50 + 38 * v), 255]; }));
    St.setProperty('--tx-felt', mk(160, 160, (i, j) => { const v = (tile(i, j, 160, 160, 3) * .6 + tile(i, j, 160, 160, 22) * .4) * .5 + .5; return [Math.round(12 + 7 * v), Math.round(18 + 8 * v), Math.round(23 + 9 * v), 255]; }));
    St.setProperty('--tx-paper', mk(200, 200, (i, j) => { const v = (tile(i, j, 200, 200, 1.6) * .6 + tile(i, j, 200, 200, 14) * .4) * .5 + .5; return [Math.round(244 + 8 * v), Math.round(244 + 8 * v), Math.round(237 + 8 * v), 255]; }));
    St.setProperty('--tx-grain', mk(128, 128, () => { const v = Math.random() * 255 | 0; return [v, v, v, 42]; }));
  } catch (e) {}
}

/* ---------- Lớp phủ ---------- */
const stack = []; let lastFocus = null;
function openOv(el, focusSel) {
  if (!stack.includes(el)) { if (!stack.length) lastFocus = document.activeElement; stack.push(el); } else { stack.splice(stack.indexOf(el), 1); stack.push(el); }
  stack.forEach((o, i) => o.style.zIndex = String(50 + i * 2)); el.hidden = false; document.documentElement.style.overflow = 'hidden';
  const f = focusSel && $(focusSel, el); if (f) setTimeout(() => { try { f.focus({ preventScroll: true }); } catch (e) {} }, 30);
}
function closeOv(el) {
  el.hidden = true; const i = stack.indexOf(el); if (i > -1) stack.splice(i, 1);
  if (el.id === 'camov') { camStop(); SFX.hiss(false); }
  if (!stack.length) { document.documentElement.style.overflow = ''; if (lastFocus && lastFocus.focus) { try { lastFocus.focus({ preventScroll: true }); } catch (e) {} } lastFocus = null; }
}
function closeAll() { while (stack.length) closeOv(stack[stack.length - 1]); }

let toastT;
function toast(msg, kind) { const t = $('#toast'); t.textContent = msg; t.className = 'toast show' + (kind ? ' ' + kind : ''); clearTimeout(toastT); toastT = setTimeout(() => t.className = 'toast', 2600); }

/* ---------- Chuyển động (GSAP, giấy phép miễn phí của GreenSock) ---------- */
function animView() {
  if (!window.gsap || RM) return;
  const id = isPhone() ? S.view : S.mview, el = $('#v-' + id); if (!el) return;
  gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .35, ease: 'power2.out', clearProps: 'transform,opacity' });
  const kids = el.querySelectorAll('.doc-card,.hs-chip,.tp-cur,.tp-done,.sim-v'); if (kids.length && kids.length < 80) gsap.fromTo(kids, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .3, stagger: .012, ease: 'power2.out', clearProps: 'transform,opacity' });
  const bi = el.querySelectorAll('.bd-item'); if (bi.length) gsap.fromTo(bi, { opacity: 0 }, { opacity: 1, duration: .35, stagger: .035, clearProps: 'opacity' });
}
function docAnim(art) {
  SFX.paper(); if (!window.gsap || RM) return;
  gsap.fromTo(art, { y: 36, rotate: -1.2, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: .45, ease: 'power3.out', clearProps: 'transform,opacity' });
  const st = art.querySelectorAll('.stamp'); if (st.length) gsap.from(st, { scale: 1.9, opacity: 0, duration: .35, delay: .4, ease: 'back.out(2)' });
}
let lastPt = null, flyN = 0;
document.addEventListener('pointerdown', e => { lastPt = [e.clientX, e.clientY]; }, true);
function flyEv(id) {
  if (!window.gsap || RM || flyN > 3 || stack.length) return; const bag = $('#bag-btn').getBoundingClientRect(); if (!bag.width) return; const e = EVM[id]; if (!e) return;
  const el = document.createElement('div'); el.className = 'fly'; el.innerHTML = ICO[e.src] + '<span>+1</span>'; document.body.appendChild(el);
  const sx = lastPt ? lastPt[0] : innerWidth / 2, sy = lastPt ? lastPt[1] : innerHeight / 2, d = (flyN++) * .09;
  gsap.set(el, { x: sx - 22, y: sy - 14, opacity: 0, scale: .8 });
  gsap.timeline({ delay: d, onComplete: () => { el.remove(); flyN = Math.max(0, flyN - 1); } }).to(el, { opacity: 1, scale: 1, y: sy - 46, duration: .22, ease: 'power2.out' }).to(el, { x: bag.left + bag.width / 2 - 22, y: bag.top + bag.height / 2 - 14, scale: .4, opacity: .25, duration: .55, ease: 'power2.in' });
}
