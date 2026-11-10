/* =====================================================================
   HÌNH VẼ (SVG): chân dung, sơ đồ đoàn tàu, hiện trường, khung tranh,
   khung hình máy ảnh time-lapse, điện thoại.
   Tất cả là hình vẽ bằng mã, không dùng ảnh ngoài.
   ===================================================================== */
(function () {
'use strict';
const A = {};

/* ---------------- Chân dung ---------------- */
const PT = {
  minh:{bg:'#2f3a40',skin:'#d6a07a',shade:'#b8835e',brow:'#d9d6cf',bw:4,lip:'#8b5545',cloth:'#7d6d4f',
    collar:'<path d="M84 180 L100 196 L116 180 L114 190 L100 202 L86 190Z" fill="#9aa3a8"/><path d="M70 196 L86 186 L94 240 L66 240Z M130 196 L114 186 L106 240 L134 240Z" fill="#6a5b40"/><rect x="72" y="206" width="16" height="12" rx="2" fill="#5d4f37"/><rect x="112" y="206" width="16" height="12" rx="2" fill="#5d4f37"/>',
    hair:'<path d="M64 108 C62 92 66 80 74 74 C70 86 70 98 72 108Z M136 108 C138 92 134 80 126 74 C130 86 130 98 128 108Z" fill="#d9d6cf"/><path d="M76 72 C86 66 114 66 124 72 C112 70 88 70 76 72Z" fill="#cfcac0"/>',
    lines:'<g stroke="#b8835e" stroke-width="1.3" fill="none" opacity=".75" stroke-linecap="round"><path d="M86 88 Q100 85 114 88"/><path d="M88 129 Q85 138 90 146"/><path d="M112 129 Q115 138 110 146"/></g>',
    extra:'<path d="M78 128 Q100 168 122 128 Q118 150 100 156 Q82 150 78 128Z" fill="#cfcac0" opacity=".75"/><g fill="none" stroke="#2a2a2a" stroke-width="2.2"><circle cx="86" cy="114" r="10"/><circle cx="114" cy="114" r="10"/><path d="M96 113 L104 113 M76 112 L66 109 M124 112 L134 109"/></g>'},
  dung:{bg:'#3b2c2a',skin:'#ebc3a0',shade:'#d0a27f',brow:'#3a231c',lip:'#a33a2c',cloth:'#efe6d6',
    back:'<circle cx="100" cy="70" r="20" fill="#5a2a1e"/>',
    collar:'<path d="M78 180 Q100 206 122 180 L130 192 Q100 222 70 192Z" fill="#2f7f86"/><path d="M84 190 l6 6 M98 198 l4 5 M112 190 l-5 6" stroke="#e7c873" stroke-width="2"/><path d="M100 206 L92 236 L108 236Z" fill="#2a6f75"/>',
    hair:'<path d="M63 112 C60 78 78 64 100 64 C124 64 140 78 137 112 C133 92 124 82 104 80 C94 86 80 84 72 92 C67 98 64 104 63 112Z" fill="#5a2a1e"/><path d="M104 66 C116 68 128 76 132 90" stroke="#7a3a28" stroke-width="2" fill="none"/>',
    extra:'<circle cx="62" cy="131" r="3.2" fill="#f4efe6"/><circle cx="138" cy="131" r="3.2" fill="#f4efe6"/>'},
  dungjacket:{bg:'#3b2c2a',skin:'#ebc3a0',shade:'#d0a27f',brow:'#3a231c',lip:'#a33a2c',cloth:'#1f3350',
    back:'<circle cx="100" cy="70" r="20" fill="#5a2a1e"/>',
    collar:'<path d="M84 180 L100 200 L116 180 L112 192 L100 206 L88 192Z" fill="#2f7f86"/><rect x="22" y="214" width="156" height="9" fill="#d8d27a" opacity=".9"/><path d="M92 196 L96 232 M108 196 L104 232" stroke="#b33" stroke-width="2"/><rect x="88" y="226" width="24" height="14" rx="2" fill="#f4f2ea"/>',
    hair:'<path d="M63 112 C60 78 78 64 100 64 C124 64 140 78 137 112 C133 92 124 82 104 80 C94 86 80 84 72 92 C67 98 64 104 63 112Z" fill="#5a2a1e"/>',
    extra:'<circle cx="62" cy="131" r="3.2" fill="#f4efe6"/><circle cx="138" cy="131" r="3.2" fill="#f4efe6"/>'},
  huy:{bg:'#26303c',skin:'#e2b48f',shade:'#c4946f',brow:'#1c1714',lip:'#9a5444',cloth:'#22252a',smile:false,
    collar:'<path d="M82 180 Q100 194 118 180" stroke="#3a3e45" stroke-width="5" fill="none"/><path d="M66 176 Q100 214 134 176" stroke="#111" stroke-width="7" fill="none"/><rect x="58" y="168" width="14" height="20" rx="6" fill="#111"/><rect x="128" y="168" width="14" height="20" rx="6" fill="#111"/>',
    hair:'<path d="M60 112 C54 80 70 58 98 58 C130 56 146 78 140 110 C138 96 132 88 124 84 C120 92 110 86 104 80 C98 90 86 84 80 90 C72 92 64 100 60 112Z" fill="#17120f"/><path d="M80 62 q6 -6 12 0 q6 -6 12 0 q6 -6 12 0" stroke="#2c2420" stroke-width="3" fill="none"/>',
    extra:'<g fill="none" stroke="#333" stroke-width="1.6"><circle cx="86" cy="114" r="9.5"/><circle cx="114" cy="114" r="9.5"/><path d="M95.5 113 L104.5 113"/></g>'},
  khoa:{bg:'#3a302c',skin:'#d9a982',shade:'#bb8a64',brow:'#1e1814',lip:'#94503f',cloth:'#7a2f36',
    collar:'<path d="M80 180 L100 198 L92 210 L72 190Z M120 180 L100 198 L108 210 L128 190Z" fill="#8f3a42"/><path d="M100 198 V226" stroke="#5e2329" stroke-width="2"/><circle cx="100" cy="210" r="2" fill="#e9d9c9"/><circle cx="100" cy="221" r="2" fill="#e9d9c9"/>',
    hair:'<path d="M64 104 C62 76 78 62 100 62 C122 62 138 76 136 104 C132 92 126 84 116 80 C104 76 92 76 82 80 C74 84 68 92 64 104Z" fill="#1b1512"/><path d="M64 104 L64 118 L68 116 L68 100Z M136 104 L136 118 L132 116 L132 100Z" fill="#3b322c"/>',
    extra:'<g fill="#5a4436" opacity=".55">'+[...Array(26)].map((_,i)=>`<circle cx="${80+((i*37)%40)}" cy="${140+((i*17)%22)}" r=".9"/>`).join('')+'</g>'},
  cuong:{bg:'#232e36',skin:'#cf9b74',shade:'#b07d58',brow:'#2a231e',lip:'#86483a',cloth:'#1f3350',smile:true,
    collar:'<path d="M84 180 L100 200 L116 180 L112 192 L100 206 L88 192Z" fill="#a9c4e2"/><rect x="22" y="214" width="156" height="9" fill="#d8d27a" opacity=".9"/><circle cx="140" cy="200" r="7" fill="#d9b44a"/><path d="M137 200 h6 M140 197 v6" stroke="#7a5a10" stroke-width="1.5"/>',
    hair:'<path d="M64 104 C62 84 70 76 76 74 L124 74 C130 76 138 84 136 104 C132 96 126 92 118 90 L82 90 C74 92 68 96 64 104Z" fill="#2a231e"/>',
    extra:'<path d="M60 84 C62 58 82 50 100 50 C118 50 138 58 140 84Z" fill="#1d2e48"/><rect x="58" y="80" width="84" height="8" rx="3" fill="#162438"/><path d="M62 88 Q100 104 138 88 L132 94 Q100 108 68 94Z" fill="#0f1a2a"/><circle cx="100" cy="66" r="7" fill="#d9b44a"/><path d="M88 134 Q100 130 112 134 Q100 138 88 134Z" fill="#2a231e"/>'},
  mai:{bg:'#2f3529',skin:'#e6bc95',shade:'#c99d77',brow:'#1d1612',lip:'#b0566a',cloth:'#c99a3a',
    back:'<path d="M58 110 C56 70 76 60 100 60 C124 60 144 70 142 110 L148 220 L52 220Z" fill="#14100e"/>',
    collar:'<path d="M84 180 Q100 194 116 180 L118 186 Q100 200 82 186Z" fill="#f4f1ea"/><path d="M70 186 L90 186 L96 240 L64 240Z M130 186 L110 186 L104 240 L136 240Z" fill="#b48630"/>',
    hair:'<path d="M62 116 C58 78 76 62 100 62 C124 62 142 78 138 116 C134 94 120 80 100 80 C80 80 66 94 62 116Z" fill="#14100e"/><path d="M100 62 L100 80" stroke="#2a221e" stroke-width="1.5"/>',
    extra:'<circle cx="62" cy="132" r="2.4" fill="#cfd4da"/><circle cx="138" cy="132" r="2.4" fill="#cfd4da"/>'},
  hang:{bg:'#3a2f2a',skin:'#d9a982',shade:'#bb8a64',brow:'#2a201b',lip:'#9a4f4a',cloth:'#f2efe8',smile:true,
    back:'<circle cx="100" cy="66" r="14" fill="#1e1715"/>',
    collar:'<path d="M84 180 L100 196 L116 180" stroke="#cfcac0" stroke-width="3" fill="none"/><path d="M70 200 L130 200 L136 240 L64 240Z" fill="#8a2f2f"/>',
    hair:'<path d="M64 108 C62 78 78 66 100 66 C122 66 138 78 136 108 C132 90 120 82 100 82 C80 82 68 90 64 108Z" fill="#1e1715"/>'}
};
A.PT = PT;
function bust(id, mood) {
  mood = mood || 'calm'; const c = PT[id];
  const B = { calm:['M76 103 Q85 98 94 102','M106 102 Q115 98 124 103'], tense:['M76 102 Q85 99 94 96','M106 96 Q115 99 124 102'], angry:['M76 99 Q86 101 94 105','M106 105 Q114 101 124 99'] }[mood] || ['M76 103 Q85 98 94 102','M106 102 Q115 98 124 103'];
  const M = mood === 'tense' ? 'M89 142 Q94 139 100 142 Q106 145 111 141' : mood === 'angry' ? 'M90 143 Q100 139 110 143' : (c.smile ? 'M89 138 Q100 145 111 138' : 'M90 140 Q100 143 110 140');
  const ey = mood === 'tense' ? 3.2 : 2.6;
  return `${c.back||''}<path d="M14 240 C18 198 54 182 100 180 C146 182 182 198 186 240Z" fill="${c.cloth}"/><path d="M85 146 L85 184 Q100 194 115 184 L115 146Z" fill="${c.shade}"/>${c.collar||''}<ellipse cx="63" cy="118" rx="6" ry="10" fill="${c.skin}"/><ellipse cx="137" cy="118" rx="6" ry="10" fill="${c.skin}"/><ellipse cx="100" cy="112" rx="37" ry="45" fill="${c.skin}"/>${c.lines||''}${c.hair}<path d="${B[0]}" stroke="${c.brow}" stroke-width="${c.bw||3.2}" fill="none" stroke-linecap="round"/><path d="${B[1]}" stroke="${c.brow}" stroke-width="${c.bw||3.2}" fill="none" stroke-linecap="round"/><ellipse cx="86" cy="114" rx="3.3" ry="${ey}" fill="#1b1512"/><ellipse cx="114" cy="114" rx="3.3" ry="${ey}" fill="#1b1512"/><circle cx="87.2" cy="112.8" r=".9" fill="#fff"/><circle cx="115.2" cy="112.8" r=".9" fill="#fff"/><path d="M100 116 Q97 128 100 131 Q103 132 104 130" stroke="${c.shade}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="${M}" stroke="${c.lip}" stroke-width="3" fill="none" stroke-linecap="round"/>${c.extra||''}`;
}
A.bust = bust;
A.portrait = (id, mood) => {
  const c = PT[id]; let lines = ''; for (let y = 24; y < 240; y += 24) lines += `<line x1="0" y1="${y}" x2="200" y2="${y}"/>`;
  return `<svg class="pt" viewBox="0 0 200 240" aria-hidden="true"><rect width="200" height="240" fill="${c.bg}"/><g stroke="#fff" stroke-opacity=".06">${lines}</g>${bust(id, mood)}</svg>`;
};
A.altar = () => `<span class="altar">${A.portrait('minh')}</span>`;

/* ---------------- Tiện ích ---------------- */
const rnd = seed => { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = s * 16807 % 2147483647) / 2147483647; };
const fig = (id, x, y, s, mood) => `<g transform="translate(${x - 100 * s} ${y - 240 * s}) scale(${s})">${bust(id, mood)}</g>`;

/* ---------------- Đồ vật ---------------- */
const P = {
  thermos:(x,y,s,v)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-17" y="-60" width="34" height="76" rx="6" fill="#c9cfd4"/><rect x="-17" y="-60" width="10" height="76" rx="5" fill="#e9edf0" opacity=".7"/><rect x="-19" y="-74" width="38" height="16" rx="4" fill="#9aa3aa"/><text x="0" y="-18" font-size="7" text-anchor="middle" fill="#3a4148" font-family="Be Vietnam Pro,sans-serif" font-weight="700">ĐÈO MÂY</text>${v==='dent'?'<path d="M-17 6 Q-6 0 4 10 L4 16 L-17 16Z" fill="#8f979e"/><path d="M-17 6 Q-6 0 4 10" stroke="#5f666c" stroke-width="1.5" fill="none"/>':''}</g>`,
  cover:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(-8)"><rect x="-30" y="-40" width="60" height="80" rx="3" fill="#a42a24"/><rect x="-30" y="-40" width="8" height="80" fill="#7f1e1a"/><text x="4" y="0" font-size="11" text-anchor="middle" fill="#e8c983" font-family="Tinos,serif" font-weight="700">H.Q.M</text><path d="M-22 -40 l4 6 l-4 6 l4 6 l-4 6" stroke="#f3eee2" stroke-width="2" fill="none"/></g>`,
  bin:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-70 -50 L70 -50 L58 50 L-58 50Z" fill="#596168"/><rect x="-74" y="-58" width="148" height="10" rx="3" fill="#6c757c"/><path d="M-40 -40 l6 80 M0 -40 v80 M40 -40 l-6 80" stroke="#4a5157" stroke-width="2"/></g>`,
  jacket:(x,y,s,v)=>{const inside=v==='inside';const c=inside?'#56708f':'#1f3350';return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-58" r="5" fill="#9aa3aa"/><path d="M0 -54 L-30 -40 L-40 50 L-12 54 L0 -30 L12 54 L40 50 L30 -40Z" fill="${c}"/>${inside?'<path d="M-30 -10 L30 -10 M-34 20 L34 20" stroke="#8aa0b8" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M34 0 q8 10 0 22" stroke="#7ab0d8" stroke-width="3" fill="none"/>':'<rect x="-38" y="6" width="76" height="7" fill="#d8d27a"/><text x="-20" y="-14" font-size="8" fill="#d9b44a" font-family="Be Vietnam Pro,sans-serif" font-weight="700">ĐSVN</text>'}</g>`;},
  laptop:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-46 -2 L46 -2 L56 10 L-56 10Z" fill="#9aa3aa"/><rect x="-42" y="-50" width="84" height="48" rx="3" fill="#3c4248"/><rect x="-38" y="-46" width="76" height="40" fill="#7fa6c9"/><path d="M-38 -16 Q-10 -30 10 -20 T38 -24 V-6 H-38Z" fill="#e9eef2" opacity=".7"/></g>`,
  cups:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><g transform="translate(-22 0)"><path d="M-12 -18 L12 -18 L9 6 L-9 6Z" fill="#f4f1ea"/><ellipse cx="0" cy="-18" rx="12" ry="3" fill="#7a4a24"/></g><g transform="translate(22 0)"><path d="M-12 -18 L12 -18 L9 6 L-9 6Z" fill="#f4f1ea"/><ellipse cx="0" cy="-18" rx="12" ry="3" fill="#7a4a24"/></g></g>`,
  papers:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(-6)"><rect x="-40" y="-14" width="80" height="22" fill="#f4f1ea"/><path d="M-34 -8 h40 M-34 -2 h56 M-34 4 h30" stroke="#9aa3aa" stroke-width="1.5"/></g>`,
  phone:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-11" y="-20" width="22" height="40" rx="4" fill="#15181c"/><rect x="-9" y="-16" width="18" height="30" fill="#3a6fd8"/></g>`,
  logbook:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-50" y="-14" width="100" height="30" fill="#e9e2cc"/><path d="M0 -14 V16" stroke="#9a8f70"/><path d="M-44 -6 h38 M-44 0 h34 M-44 6 h38 M6 -6 h38 M6 0 h30" stroke="#5a6070" stroke-width="1.2"/></g>`,
  wallet:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-24" y="-16" width="48" height="32" rx="4" fill="#5a3a22"/><rect x="-18" y="-24" width="30" height="14" fill="#7fb07f"/><path d="M-24 -2 h48" stroke="#3e2816"/></g>`,
  perfume:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="-30" width="44" height="54" rx="6" fill="#4a2a1c" opacity=".9"/><rect x="-8" y="-44" width="16" height="14" fill="#c9a24a"/><text x="0" y="0" font-size="8" text-anchor="middle" fill="#e9d3a0" font-family="Tinos,serif">OUD</text><text x="0" y="11" font-size="6" text-anchor="middle" fill="#e9d3a0" font-family="Tinos,serif">Hương Trầm</text></g>`,
  lipstick:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s}) rotate(12)"><rect x="-9" y="-6" width="18" height="34" rx="2" fill="#2a2a2e"/><rect x="-7" y="-20" width="14" height="16" fill="#c9a24a"/><path d="M-6 -20 L6 -30 L6 -20Z" fill="#a33a2c"/></g>`,
  watch:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-9" y="-34" width="18" height="68" rx="4" fill="#c9a24a"/><circle r="15" fill="#f4f1ea" stroke="#c9a24a" stroke-width="4"/><path d="M0 0 V-9 M0 0 L7 3" stroke="#222" stroke-width="2"/><text x="0" y="48" font-size="9" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif">tay phải</text></g>`,
  cap:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-20" rx="26" ry="8" fill="#e9edf0"/><path d="M-26 -20 L-22 18 Q0 26 22 18 L26 -20" fill="#c9cfd4"/><path d="M-14 -24 Q-4 -30 8 -24" stroke="#a33a2c" stroke-width="4" fill="none" stroke-linecap="round" opacity=".85"/></g>`,
  woundcircle:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-50 40 C-60 -30 -20 -60 10 -56 C50 -50 64 -10 54 40Z" fill="#e9d6c4" stroke="#8a7a6a"/><circle cx="-6" cy="-14" r="18" fill="none" stroke="#b3322f" stroke-width="3" stroke-dasharray="5 3"/><circle cx="-6" cy="-14" r="18" fill="none" stroke="#3a6fd8" stroke-width="2" transform="translate(1 1)"/><text x="0" y="62" font-size="10" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif">vết thương ≈ 7 cm · đáy bình 7,1 cm</text></g>`,
  lefthand:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-120" y="-50" width="240" height="110" fill="#fbfbf7"/><path d="M-100 -20 h120 M-100 0 h150 M-100 20 h90" stroke="#c9ccc2"/><path d="M-60 40 q20 -24 40 -4 t40 -6 t30 0" stroke="#23408f" stroke-width="2.5" fill="none"/><path d="M60 20 L120 -30 L140 -10 L80 40Z" fill="#ebc3a0"/><path d="M60 22 L52 36" stroke="#222" stroke-width="3"/><text x="96" y="58" font-size="10" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif">tay trái</text></g>`,
  floorbody:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-110 6 Q-60 -18 40 -10 Q90 -6 110 6 L110 16 L-110 16Z" fill="#5d6a72"/><path d="M-110 6 Q-60 -18 40 -10" stroke="#4b565d" stroke-width="2" fill="none"/><ellipse cx="96" cy="2" rx="12" ry="7" fill="#2a2a2a"/><ellipse cx="80" cy="6" rx="12" ry="7" fill="#2a2a2a"/></g>`,
  berthbody:(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 20 Q-60 -26 0 -24 Q60 -22 80 20Z" fill="#8a9aa3"/><path d="M-60 -6 Q0 -30 60 -6" stroke="#6d7d86" stroke-width="2" fill="none"/><ellipse cx="-66" cy="4" rx="16" ry="12" fill="#d9d6cf"/></g>`,
  minhback:(x,y,s)=>`<g transform="translate(${x - 100*s} ${y - 240*s}) scale(${s})"><path d="M14 240 C18 198 54 182 100 180 C146 182 182 198 186 240Z" fill="#7d6d4f"/><ellipse cx="100" cy="114" rx="38" ry="46" fill="#cfcac0"/><path d="M70 120 C70 90 86 80 100 80 C114 80 130 90 130 120 C126 104 116 96 100 96 C84 96 74 104 70 120Z" fill="#b8b2a6"/></g>`
};
A.P = P;

/* ---------------- Phông nền khung tranh (400 x 250) ---------------- */
const SEA = (x,y,w,h,dark)=> dark
  ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#05070a"/><path d="M${x} ${y+h*.15} L${x+w*.4} ${y} L${x+w*.55} ${y}" stroke="#ffffff" stroke-opacity=".12" stroke-width="6"/>`
  : `<rect x="${x}" y="${y}" width="${w}" height="${h*.55}" fill="#9fb0b8"/><rect x="${x}" y="${y+h*.55}" width="${w}" height="${h*.45}" fill="#3e6a7a"/><path d="M${x} ${y+h*.55} q${w*.25} -${h*.18} ${w*.5} -${h*.06} t${w*.5} ${h*.02} V${y+h*.55}Z" fill="#6f8790"/><path d="M${x} ${y+h*.3} q${w*.3} -10 ${w*.6} 0 t${w*.4} 4" stroke="#e9eef0" stroke-opacity=".6" stroke-width="8" fill="none"/><g stroke="#cfe3ea" stroke-opacity=".35">${[...Array(9)].map((_,i)=>`<line x1="${x+10+i*w/9}" y1="${y+6+(i%3)*8}" x2="${x+4+i*w/9}" y2="${y+26+(i%3)*8}"/>`).join('')}</g>`;
const BG = {
  k3:(dark)=>`<rect width="400" height="250" fill="#2e3b42"/><rect y="0" width="400" height="22" fill="#232d33"/><rect x="0" y="22" width="92" height="44" fill="#4b5d66"/><rect x="308" y="22" width="92" height="44" fill="#4b5d66"/><rect x="0" y="62" width="92" height="6" fill="#384850"/><rect x="308" y="62" width="92" height="6" fill="#384850"/><rect x="104" y="34" width="192" height="116" rx="10" fill="#1d262b"/>${SEA(112,42,176,100,dark)}<rect x="96" y="30" width="22" height="124" fill="#2f5d7c"/><rect x="282" y="30" width="22" height="124" fill="#2f5d7c"/><rect x="236" y="62" width="22" height="15" rx="3" fill="#111"/><circle cx="247" cy="69" r="4" fill="#333"/><circle cx="254" cy="65" r="1.6" fill="#e33"/><rect x="128" y="150" width="144" height="12" fill="#6b4e36"/><rect x="194" y="162" width="12" height="88" fill="#4a3727"/><path d="M0 150 L104 150 L92 250 L0 250Z" fill="#596e78"/><path d="M0 150 L104 150 L100 160 L0 160Z" fill="#e9edf0"/><path d="M296 150 L400 150 L400 250 L308 250Z" fill="#596e78"/><path d="M296 150 L400 150 L400 160 L300 160Z" fill="#e9edf0"/><rect x="0" y="236" width="400" height="14" fill="#262c30"/>`,
  door:()=>`<rect width="400" height="250" fill="#2e3b42"/><rect x="110" y="16" width="180" height="234" fill="#1d262b"/><rect x="118" y="24" width="88" height="226" fill="#d8cfae"/><rect x="118" y="24" width="88" height="226" fill="url(#corrG)"/><rect x="206" y="24" width="84" height="226" fill="#5a4636"/><rect x="214" y="40" width="68" height="90" fill="#8fa3ad" opacity=".5"/><rect x="210" y="130" width="8" height="30" rx="3" fill="#c9cfd4"/><rect x="0" y="20" width="110" height="40" fill="#4b5d66"/><rect x="290" y="20" width="110" height="40" fill="#4b5d66"/>`,
  k3up:()=>`<rect width="400" height="250" fill="#1f282d"/><path d="M0 0 H400 V40 Q200 60 0 40Z" fill="#2c383f"/><rect x="0" y="180" width="400" height="70" fill="#596e78"/><rect x="0" y="176" width="400" height="10" fill="#e9edf0"/><rect x="300" y="70" width="80" height="70" rx="8" fill="#111a1f"/>${SEA(306,76,68,58,false)}<rect x="30" y="60" width="70" height="120" fill="#3a2e24"/><rect x="38" y="70" width="54" height="110" fill="#d8cfae" opacity=".25"/><g transform="translate(330 196)"><path d="M-30 0 Q0 -14 30 0 Q0 8 -30 0Z" fill="#222"/></g>`,
  corr9:()=>`<rect width="400" height="250" fill="#3a4a52"/><rect y="0" width="400" height="20" fill="#2c383f"/><rect x="200" y="34" width="190" height="70" rx="4" fill="#1d262b"/><rect x="206" y="40" width="178" height="58" fill="#6f8a6a"/><path d="M206 98 L240 60 L270 80 L310 46 L350 76 L384 58 V98Z" fill="#4f6b52"/><rect x="0" y="22" width="100" height="228" fill="#4b5560"/><rect x="10" y="40" width="80" height="20" fill="#e9e6da"/><text x="50" y="54" font-size="9" text-anchor="middle" fill="#222" font-family="Be Vietnam Pro,sans-serif" font-weight="700">PHÒNG NV</text><rect x="16" y="120" width="8" height="30" rx="3" fill="#c9cfd4"/><rect x="150" y="22" width="40" height="228" fill="#55606a"/><text x="170" y="46" font-size="10" text-anchor="middle" fill="#e9e6da" font-family="Be Vietnam Pro,sans-serif" font-weight="700">WC</text><rect x="0" y="236" width="400" height="14" fill="#262c30"/><path d="M190 236 L400 200" stroke="#1d2428" stroke-width="2"/>`,
  dining:(dark)=>`<rect width="400" height="250" fill="#3d3027"/><rect y="0" width="400" height="20" fill="#2e241d"/><rect x="40" y="30" width="320" height="110" rx="10" fill="#1d1712"/>${SEA(48,38,304,94,dark)}<rect x="0" y="176" width="400" height="74" fill="#efe6d6"/><rect x="0" y="176" width="400" height="8" fill="#d9cdb6"/><rect x="0" y="30" width="34" height="146" fill="#8a2f2f"/><rect x="366" y="30" width="34" height="146" fill="#8a2f2f"/><text x="200" y="16" font-size="9" text-anchor="middle" fill="#c9a77a" font-family="Be Vietnam Pro,sans-serif" letter-spacing="2">TOA HÀNG ĂN · BÀN 4</text>`,
  junction:()=>`<rect width="400" height="250" fill="#2a3035"/>${[0,1,2,3,4,5].map(i=>`<rect x="${i*10}" y="0" width="8" height="250" fill="#1d2226"/><rect x="${392-i*10}" y="0" width="8" height="250" fill="#1d2226"/>`).join('')}<rect x="120" y="30" width="160" height="110" rx="8" fill="#111a1f"/>${SEA(128,38,144,94,false)}<rect x="60" y="200" width="280" height="50" fill="#5a6168"/><path d="M60 214 H340 M60 228 H340" stroke="#4a5157"/>`,
  staff:()=>`<rect width="400" height="250" fill="#3c4650"/><rect x="250" y="30" width="120" height="80" rx="6" fill="#111a1f"/><rect x="256" y="36" width="108" height="68" fill="#6f8a6a"/><rect x="200" y="180" width="200" height="70" fill="#6b4e36"/><rect x="200" y="176" width="200" height="8" fill="#7d5c40"/><circle cx="60" cy="40" r="5" fill="#9aa3aa"/><path d="M40 44 Q60 34 80 44 L76 54 L44 54Z" fill="#1d2e48"/>`,
  wc:()=>`<rect width="400" height="250" fill="#8a9298"/><rect x="40" y="40" width="120" height="90" fill="#cfd8dc"/><rect x="44" y="44" width="112" height="82" fill="#a9b6bc"/><rect x="40" y="140" width="130" height="18" fill="#c9cfd4"/><ellipse cx="105" cy="149" rx="40" ry="6" fill="#9aa3aa"/><rect x="0" y="236" width="400" height="14" fill="#6a7278"/><rect x="300" y="20" width="90" height="230" fill="#6a7278"/>`,
  wc8:()=>`<rect width="400" height="250" fill="#3a4a52"/><rect x="120" y="20" width="160" height="230" fill="#55606a"/><rect x="140" y="40" width="120" height="24" fill="#e9e6da"/><text x="200" y="57" font-size="12" text-anchor="middle" fill="#222" font-family="Be Vietnam Pro,sans-serif" font-weight="700">WC · TOA 8</text><rect x="246" y="130" width="10" height="34" rx="3" fill="#c9cfd4"/><g transform="rotate(-4 200 120)"><rect x="132" y="90" width="136" height="60" fill="#f2c230"/><text x="200" y="114" font-size="15" text-anchor="middle" fill="#3a2c00" font-family="Be Vietnam Pro,sans-serif" font-weight="800">HỎNG</text><text x="200" y="132" font-size="8.5" text-anchor="middle" fill="#3a2c00" font-family="Be Vietnam Pro,sans-serif">XIN DÙNG WC TOA BÊN CẠNH</text></g><text x="200" y="236" font-size="9" text-anchor="middle" fill="#cfd8dc" font-family="IBM Plex Mono,monospace">biển treo từ 11:30</text>`,
  station:()=>`<rect width="400" height="250" fill="#b9c3c6"/><path d="M0 120 L60 70 L120 100 L200 50 L280 96 L340 66 L400 100 V160 H0Z" fill="#7d8c86"/><rect x="0" y="100" width="400" height="60" fill="#e7ecee" opacity=".55"/><rect x="230" y="96" width="110" height="60" fill="#e8c76a"/><path d="M222 98 L285 74 L348 98Z" fill="#8a3b2f"/><rect x="252" y="80" width="66" height="14" fill="#fbfbf7"/><text x="285" y="91" font-size="9" text-anchor="middle" fill="#222" font-family="Be Vietnam Pro,sans-serif" font-weight="700">GA HẢI VÂN</text><rect x="0" y="156" width="400" height="18" fill="#9aa3a6"/><path d="M0 190 H400 M0 204 H400" stroke="#5a5f62" stroke-width="3"/><g stroke="#6a5a4a" stroke-width="3">${[...Array(16)].map((_,i)=>`<line x1="${i*26}" y1="186" x2="${i*26+10}" y2="208"/>`).join('')}</g><rect x="0" y="210" width="400" height="40" fill="#5c6468"/>`,
  brake:()=>`<g transform="rotate(-7 200 125)"><rect x="-20" y="-20" width="440" height="290" fill="#2e3b42"/><rect x="104" y="34" width="192" height="116" rx="10" fill="#1d262b"/>${SEA(112,42,176,100,false)}<rect x="128" y="150" width="144" height="12" fill="#6b4e36"/><path d="M0 150 L104 150 L92 260 L0 260Z" fill="#596e78"/><path d="M296 150 L420 150 L420 260 L308 260Z" fill="#596e78"/></g><g stroke="#e9edf0" stroke-opacity=".55" stroke-width="3" stroke-linecap="round"><line x1="20" y1="40" x2="90" y2="40"/><line x1="10" y1="70" x2="70" y2="70"/><line x1="320" y1="200" x2="390" y2="200"/><line x1="300" y1="226" x2="380" y2="226"/></g><g transform="translate(70 100) rotate(-20)"><rect x="-24" y="-16" width="48" height="32" rx="4" fill="#8a3b2f"/></g><g transform="translate(320 120) rotate(25)"><rect x="-20" y="-14" width="40" height="28" rx="4" fill="#2f5d7c"/></g>`,
  phone:(d,sp)=>`<rect width="400" height="250" fill="#05070a"/><path d="M0 40 L160 0 M240 0 L400 50" stroke="#ffffff" stroke-opacity=".06" stroke-width="20"/><g transform="translate(200 128) rotate(-6)"><rect x="-70" y="-112" width="140" height="230" rx="18" fill="#111418"/><rect x="-62" y="-100" width="124" height="204" rx="10" fill="#e8edf3"/><rect x="-62" y="-100" width="124" height="26" rx="10" fill="#2a5bd7"/><text x="0" y="-82" font-size="9" text-anchor="middle" fill="#fff" font-family="Be Vietnam Pro,sans-serif" font-weight="700">${sp && sp.to ? sp.to : 'Dung · Đèo Mây'}</text><rect x="-50" y="-58" width="104" height="58" rx="10" fill="#2a5bd7"/><text x="-42" y="-40" font-size="8.5" fill="#fff" font-family="Be Vietnam Pro,sans-serif">Lên khoang 3 ngay.</text><text x="-42" y="-27" font-size="8.5" fill="#fff" font-family="Be Vietnam Pro,sans-serif">Tôi đã có đủ</text><text x="-42" y="-14" font-size="8.5" fill="#fff" font-family="Be Vietnam Pro,sans-serif">danh sách…</text><text x="54" y="12" font-size="8" text-anchor="end" fill="#b3322f" font-family="Be Vietnam Pro,sans-serif" font-weight="700">⟳ Đang chờ mạng</text><text x="0" y="60" font-size="8" text-anchor="middle" fill="#7a8591" font-family="Be Vietnam Pro,sans-serif">Không có kết nối</text></g><path d="M300 250 Q290 190 250 170 L270 150 Q320 180 340 250Z" fill="#d6a07a"/>`,
  'diagram-head':()=>`<rect width="400" height="250" fill="#fbfbf7"/><g transform="translate(110 125)"><ellipse rx="56" ry="68" fill="#efe6dc" stroke="#5f645a" stroke-width="2"/><path d="M-56 0 h-8 M56 0 h8" stroke="#5f645a" stroke-width="2"/><circle cx="-18" cy="-26" r="17" fill="none" stroke="#b3322f" stroke-width="3"/><text x="0" y="92" font-size="11" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif" font-weight="700">Phía sau</text><text x="-18" y="-50" font-size="9" text-anchor="middle" fill="#b3322f" font-family="Be Vietnam Pro,sans-serif">≈ 7 cm</text></g><g transform="translate(290 125)"><ellipse rx="56" ry="68" fill="#efe6dc" stroke="#5f645a" stroke-width="2"/><circle cx="-18" cy="0" r="4" fill="#3a3f45"/><circle cx="18" cy="0" r="4" fill="#3a3f45"/><path d="M-12 -40 L8 -36" stroke="#b3322f" stroke-width="3" stroke-linecap="round"/><text x="0" y="92" font-size="11" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif" font-weight="700">Phía trước</text><text x="34" y="-44" font-size="9" fill="#b3322f" font-family="Be Vietnam Pro,sans-serif">vệt trầy 4 cm</text></g>`,
  'diagram-berth':()=>`<rect width="400" height="250" fill="#fbfbf7"/><rect x="40" y="30" width="150" height="190" fill="#e9edf0" stroke="#5f645a" stroke-width="2"/><rect x="50" y="40" width="130" height="40" rx="8" fill="#fff" stroke="#9aa3aa"/><path d="M80 52 C100 44 130 50 140 64 C120 74 92 72 80 52Z" fill="#8f2a24" opacity=".75"/><text x="115" y="238" font-size="11" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif" font-weight="700">Gối giường 9: thấm nhiều</text><rect x="230" y="30" width="140" height="190" fill="#c9ccc2" stroke="#5f645a" stroke-width="2"/><circle cx="290" cy="120" r="2.5" fill="#8f2a24"/><circle cx="304" cy="132" r="2" fill="#8f2a24"/><circle cx="296" cy="140" r="1.6" fill="#8f2a24"/><text x="300" y="238" font-size="11" text-anchor="middle" fill="#3a3f45" font-family="Be Vietnam Pro,sans-serif" font-weight="700">Sàn: vài vệt nhỏ</text>`,
  evidence:()=>`<rect width="400" height="250" fill="#59636a"/><rect x="20" y="20" width="360" height="210" fill="#6c767d"/><g transform="translate(30 222)"><rect width="200" height="10" fill="#e9d98f"/><path d="${[...Array(40)].map((_,i)=>`M${i*5} 0V${i%5?3:6}`).join('')}" stroke="#333" stroke-width=".8"/></g>`,
  print:()=>`<rect width="400" height="250" fill="#ece8df"/><rect x="40" y="26" width="220" height="180" fill="#2b2b2b"/><rect x="52" y="38" width="196" height="132" fill="#c7d0d4"/><path d="M52 120 Q100 90 150 110 T248 100 V170 H52Z" fill="#7d8c86"/><path d="M52 92 q60 -14 120 0 t76 -4" stroke="#fff" stroke-width="10" stroke-opacity=".75" fill="none"/><text x="66" y="190" font-size="13" fill="#e9e6da" font-family="Tinos,serif" font-weight="700">37/30</text><path d="M170 190 q12 -14 22 0 t20 -4 t16 2" stroke="#e9e6da" stroke-width="2" fill="none"/><rect x="280" y="60" width="100" height="120" fill="#fbfbf7" stroke="#c9ccc2"/><text x="330" y="80" font-size="9" text-anchor="middle" fill="#5f645a" font-family="Be Vietnam Pro,sans-serif">Chữ ký thật</text><path d="M296 120 q10 -26 22 -4 q6 12 14 -10 q8 -14 20 6 l12 -8" stroke="#23408f" stroke-width="2.5" fill="none"/><text x="330" y="160" font-size="9" text-anchor="middle" fill="#b3322f" font-family="Be Vietnam Pro,sans-serif" font-weight="700">≠</text>`
};
const FX = {
  scent:`<g stroke="#d9c79a" stroke-opacity=".55" stroke-width="2.5" fill="none"><path d="M60 200 q10 -14 0 -28 t0 -28 t0 -28"/><path d="M340 210 q10 -14 0 -28 t0 -28"/><path d="M90 120 q8 -10 0 -20 t0 -20"/></g>`,
  tunnel:`<rect width="400" height="250" fill="#000" opacity=".38"/>`,
  jolt:`<g stroke="#ffffff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"><path d="M226 54 l-10 -10 M262 54 l10 -10 M244 46 v-14"/></g>`,
  mirror:`<rect width="400" height="250" fill="url(#glassG)"/>`,
  wet:`<g fill="#a9d4ea">${[[118,124],[126,136],[110,140],[132,118]].map(([x,y])=>`<path d="M${x} ${y} q3 6 0 9 q-3 -3 0 -9Z"/>`).join('')}</g>`,
  freight:`<g>${[0,1,2,3].map(i=>`<rect x="${-40+i*120}" y="120" width="112" height="70" fill="#7a4a2a"/><rect x="${-36+i*120}" y="126" width="104" height="40" fill="#6a3e22"/><circle cx="${-20+i*120}" cy="194" r="8" fill="#222"/><circle cx="${56+i*120}" cy="194" r="8" fill="#222"/>`).join('')}<g stroke="#fff" stroke-opacity=".5" stroke-width="3"><line x1="0" y1="110" x2="60" y2="110"/><line x1="200" y1="104" x2="250" y2="104"/></g></g>`,
  labels4:`<g font-size="10" text-anchor="middle" fill="#fbfbf7" font-family="Be Vietnam Pro,sans-serif" font-weight="700"><text x="70" y="196">Minh</text><text x="150" y="196">Khoa</text><text x="230" y="196">Huy</text><text x="320" y="196" fill="#f2c230">Dung?</text></g>`
};
A.panel = (spec) => {
  const dark = spec.bg === 'k3dark' || spec.fx === 'tunnel' && (spec.bg === 'k3' || spec.bg === 'dining');
  const bgk = spec.bg === 'k3dark' ? 'k3' : spec.bg;
  let s = `<defs><linearGradient id="corrG" x1="0" x2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".5"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient><linearGradient id="glassG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fd0ff" stop-opacity=".22"/><stop offset=".5" stop-color="#9fd0ff" stop-opacity="0"/><stop offset="1" stop-color="#9fd0ff" stop-opacity=".18"/></linearGradient></defs>`;
  s += (BG[bgk] || BG.k3)(dark, spec);
  if (spec.fx === 'freight') s += FX.freight;
  (spec.props || []).forEach(p => { const f = P[p[0]]; if (f) s += f(p[1], p[2], p[3] || 1, p[4]); });
  (spec.fig || []).forEach(f => {
    if (f[0] === 'shadow') { const x = f[1], y = f[2], k = f[3] || 1; s += `<g transform="translate(${x - 100*k} ${y - 240*k}) scale(${k})"><path d="M20 240 C24 196 56 178 100 176 C144 178 176 196 180 240Z" fill="#1f3350"/><rect x="26" y="212" width="148" height="9" fill="#d8d27a" opacity=".8"/><ellipse cx="100" cy="112" rx="37" ry="45" fill="#1a1a1e"/><circle cx="100" cy="70" r="20" fill="#141418"/></g>`; }
    else s += fig(f[0], f[1], f[2], f[3] || 1, f[4]);
  });
  if (spec.fx === 'mirror') s = `<g transform="translate(400 0) scale(-1 1)">${s}</g><rect width="400" height="250" fill="#000" opacity=".45"/>` + FX.mirror;
  else if (spec.fx && FX[spec.fx] && spec.fx !== 'freight') s += FX[spec.fx];
  if (spec.fx === 'jolt') s = `<g transform="rotate(-2.5 200 125)">${s}</g>`;
  return `<svg viewBox="0 0 400 250" class="pn-svg" aria-hidden="true">${s}</svg>`;
};

/* ---------------- Sơ đồ đoàn tàu (1180 x 200) ---------------- */
A.plan = (places) => {
  const car = (x, w, label) => `<g><rect x="${x}" y="30" width="${w}" height="140" rx="10" class="pl-car"/><text x="${x + w / 2}" y="22" class="pl-lab">${label}</text></g>`;
  let s = `<rect x="0" y="0" width="1180" height="200" class="pl-bg"/>`;
  s += car(20, 360, 'TOA 7 · TOA HÀNG ĂN') + car(400, 380, 'TOA 8 · GIƯỜNG NẰM') + car(800, 360, 'TOA 9 · KHOANG 4 GIƯỜNG');
  s += `<g class="pl-gap"><rect x="380" y="44" width="20" height="18"/><rect x="780" y="44" width="20" height="18"/><rect x="1160" y="44" width="16" height="18"/></g>`;
  s += `<rect x="24" y="40" width="352" height="26" class="pl-corr"/><rect x="404" y="40" width="372" height="26" class="pl-corr"/><rect x="804" y="40" width="352" height="26" class="pl-corr"/>`;
  s += `<rect x="28" y="70" width="58" height="92" class="pl-room"/><text x="57" y="120" class="pl-t">Quầy</text>`;
  for (let i = 0; i < 6; i++) { const x = 100 + i * 46; s += `<rect x="${x}" y="96" width="34" height="44" rx="4" class="pl-table${i === 3 ? ' hot' : ''}"/><text x="${x + 17}" y="122" class="pl-t">${i + 1}</text>`; }
  s += `<rect x="404" y="70" width="40" height="44" class="pl-room"/><text x="424" y="96" class="pl-t">WC</text>`;
  for (let i = 0; i < 6; i++) { const x = 448 + i * 50; s += `<rect x="${x}" y="70" width="50" height="96" class="pl-room${i === 1 ? ' soft' : ''}"/><text x="${x + 25}" y="160" class="pl-t">K${i + 1}</text>`; }
  s += `<rect x="750" y="70" width="26" height="44" class="pl-room"/><text x="763" y="96" class="pl-t">WC</text>`;
  s += `<rect x="804" y="70" width="40" height="44" class="pl-room"/><text x="824" y="96" class="pl-t">WC</text><rect x="804" y="118" width="40" height="48" class="pl-room"/><text x="824" y="146" class="pl-t">NV</text>`;
  s += `<g transform="translate(850 66)"><circle r="3.5" class="pl-hook"/><text y="-17" class="pl-t" style="font-size:9px">móc</text></g>`;
  for (let i = 0; i < 7; i++) { const x = 848 + i * 40; s += `<rect x="${x}" y="70" width="40" height="96" class="pl-room${i === 2 ? ' hot' : ''}"/><text x="${x + 20}" y="160" class="pl-t">K${i + 1}</text>`; }
  s += `<rect x="1130" y="70" width="26" height="44" class="pl-room"/><text x="1143" y="96" class="pl-t">WC</text>`;
  s += `<text x="1168" y="84" class="pl-t" style="font-size:9px" transform="rotate(90 1168 84)">nối toa</text>`;
  s += `<path d="M24 172 H1156" class="pl-win"/><text x="590" y="192" class="pl-sea">← cửa sổ khoang nhìn ra biển · tàu chạy về phía nam (sang trái) →</text><text x="590" y="12" class="pl-sea">phía núi · hành lang</text>`;
  return s;
};

/* ---------------- Dải hành trình qua đèo (1000 x 86) ---------------- */
A.routeX = (sec, R, toSec) => {
  const pts = [[toSec('12:10:05'), 40], [toSec('12:31:00'), 470], [toSec('12:37:00'), 470], [toSec('12:44:00'), 700], [toSec('12:47:30'), 700], [toSec('12:58:10'), 960]];
  if (sec <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (sec <= pts[i][0]) { const a = pts[i - 1], b = pts[i]; return a[1] + (b[1] - a[1]) * (sec - a[0]) / Math.max(1, b[0] - a[0]); }
  return 960;
};
A.route = (R, toSec, sec) => {
  const X = t => A.routeX(toSec(t), R, toSec);
  let s = `<rect width="1000" height="86" class="rt-bg"/><path d="M40 62 C200 62 300 26 470 22 C640 26 760 60 960 62" class="rt-line"/>`;
  R.tunnels.forEach((tt, i) => { const a = X(tt[0]), b = Math.max(a + 6, X(tt[1])); s += `<rect x="${a}" y="10" width="${b - a}" height="60" class="rt-tun"/><text x="${(a + b) / 2}" y="82" class="rt-t">H${i + 1}</text>`; });
  s += `<g transform="translate(470 22)"><rect x="-26" y="-14" width="52" height="12" rx="2" class="rt-st"/><text y="-5" class="rt-t" style="fill:var(--tea-ink)">Ga Hải Vân</text></g>`;
  s += `<text x="40" y="80" class="rt-t">Lăng Cô</text><text x="960" y="80" class="rt-t">Kim Liên</text>`;
  s += `<g transform="translate(700 42)"><path d="M-6 -6 L6 6 M6 -6 L-6 6" class="rt-brake"/><text y="-12" class="rt-t" style="fill:var(--seal-soft)">phanh 12:44</text></g>`;
  if (sec != null) { const x = A.routeX(sec, R, toSec); s += `<g transform="translate(${x} 0)" class="rt-train"><rect x="-16" y="38" width="32" height="12" rx="4"/><circle cx="-9" cy="52" r="2.5"/><circle cx="9" cy="52" r="2.5"/></g>`; }
  return s;
};

/* ---------------- Hiện trường khoang 3 (800 x 600, nhìn từ trên) ---------------- */
A.scene = (hs) => {
  const mk = h => `<g class="mk" data-hs="${h.id}" role="button" tabindex="0" aria-label="Biển số ${h.n}: ${h.t}"><circle class="pulse" cx="${h.x}" cy="${h.y}" r="22"/><circle class="hit" cx="${h.x}" cy="${h.y}" r="26"/><path class="tent" d="M${h.x - 15} ${h.y + 11} L${h.x} ${h.y - 15} L${h.x + 15} ${h.y + 11}Z"/><text x="${h.x}" y="${h.y + 7}">${h.n}</text></g>`;
  return `<svg class="scene" id="scene-svg" viewBox="0 0 800 600" role="group" aria-label="Ảnh hiện trường khoang 3 toa 9, nhìn từ trên xuống">
  <defs><pattern id="carpet" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#4a4f53"/><path d="M0 8 H16 M8 0 V16" stroke="#43484c"/></pattern><radialGradient id="lampglow"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".35"/><stop offset="1" stop-color="#ffe7a8" stop-opacity="0"/></radialGradient></defs>
  <rect width="800" height="600" fill="#20272b"/><rect x="0" y="0" width="800" height="60" fill="#3a4650"/><text x="400" y="36" class="sc-lbl">HÀNH LANG TOA 9</text>
  <rect x="40" y="60" width="720" height="500" fill="url(#carpet)"/><rect x="40" y="60" width="720" height="500" fill="none" stroke="#151a1d" stroke-width="12"/>
  <rect x="330" y="54" width="140" height="14" fill="#8a6a4a"/><text x="400" y="88" class="sc-lbl">cửa trượt</text>
  <rect x="60" y="120" width="250" height="400" rx="10" fill="#5d717b"/><rect x="72" y="132" width="226" height="376" rx="8" fill="#e9edf0"/><rect x="90" y="150" width="190" height="70" rx="14" fill="#fff" stroke="#c9cfd4"/><path d="M130 170 C170 154 230 164 250 188 C214 206 158 202 130 170Z" fill="#7f2a24" opacity=".7"/><path d="M72 230 C140 260 220 250 298 238 L298 400 L72 400Z" fill="#8a9aa3" opacity=".9"/>
  <text x="185" y="545" class="sc-lbl">giường 9 (dưới) · ông Minh</text>
  <rect x="490" y="120" width="250" height="400" rx="10" fill="#5d717b"/><rect x="502" y="132" width="226" height="376" rx="8" fill="#e9edf0"/><rect x="520" y="150" width="190" height="70" rx="14" fill="#fff" stroke="#c9cfd4"/><text x="615" y="545" class="sc-lbl">giường 10 (dưới) · Khoa</text>
  <rect x="486" y="116" width="258" height="150" rx="10" fill="none" stroke="#c9cfd4" stroke-dasharray="8 6" opacity=".7"/><text x="615" y="258" class="sc-lbl" style="opacity:.8">giường 11 (trên) · Mai</text>
  <rect x="56" y="116" width="258" height="150" rx="10" fill="none" stroke="#c9cfd4" stroke-dasharray="8 6" opacity=".5"/><text x="185" y="110" class="sc-lbl" style="opacity:.7">giường 12 (trên) · Huy</text>
  <rect x="140" y="560" width="520" height="40" fill="#3e6a7a"/><rect x="140" y="560" width="520" height="40" fill="none" stroke="#151a1d" stroke-width="6"/><text x="400" y="586" class="sc-lbl" style="fill:#e6f0f3">CỬA SỔ · BIỂN</text>
  <rect x="220" y="500" width="360" height="54" rx="4" fill="#6b4e36"/>
  <g transform="translate(300 520)"><rect x="-14" y="-14" width="28" height="28" rx="14" fill="#c9cfd4"/></g><g transform="translate(340 520)"><rect x="-14" y="-14" width="28" height="28" rx="14" fill="#c9cfd4"/></g>
  <rect x="200" y="510" width="34" height="8" rx="2" fill="#222" transform="rotate(-20 217 514)"/>
  <rect x="500" y="526" width="40" height="22" rx="4" fill="#111"/><circle cx="520" cy="537" r="7" fill="#333"/>
  <g transform="translate(400 420) rotate(8)"><path d="M-160 -20 C-100 -50 60 -46 150 -24 L160 20 C60 40 -100 40 -160 22Z" fill="none" stroke="#f2efe6" stroke-width="3" stroke-dasharray="10 7"/></g>
  <circle cx="465" cy="330" r="3" fill="#7f2a24"/><circle cx="478" cy="336" r="2" fill="#7f2a24"/>
  <rect x="140" y="300" width="14" height="60" fill="#151a1d"/><rect x="143" y="320" width="8" height="18" fill="#3a6fd8" opacity=".6"/>
  <g transform="translate(660 110)"><circle r="5" fill="#9aa3aa"/><path d="M0 4 L-26 20 L-30 90 L30 90 L26 20Z" fill="#7d6d4f"/></g>
  <g transform="translate(600 170)"><path d="M-26 0 Q0 -12 26 0 Q0 8 -26 0Z" fill="#222"/></g>
  <circle cx="400" cy="300" r="300" fill="url(#lampglow)"/>
  <g class="markers">${hs.map(mk).join('')}</g>
  </svg>`;
};

/* ---------------- Khay chọn hung khí (Trọng điểm 2) ---------------- */
A.tray = (opts, sel) => {
  const pos = { table:[70,'<rect x="40" y="70" width="60" height="18" fill="#6b4e36"/><rect x="40" y="70" width="60" height="5" fill="#8a6a4a"/>'], mount:[160,'<circle cx="160" cy="78" r="18" fill="#c9cfd4" opacity=".75"/><rect x="152" y="58" width="16" height="12" fill="#333"/>'], thermos:[250,'<rect x="238" y="50" width="24" height="52" rx="5" fill="#c9cfd4"/><rect x="236" y="42" width="28" height="12" rx="3" fill="#9aa3aa"/>'], bottle:[340,'<rect x="330" y="58" width="20" height="44" rx="3" fill="#a9d4c4" opacity=".8"/><rect x="335" y="46" width="10" height="14" fill="#a9d4c4"/>'], handle:[430,'<rect x="420" y="56" width="10" height="44" rx="4" fill="#c9cfd4"/><rect x="430" y="60" width="8" height="36" fill="#8a6a4a"/>'] };
  const it = o => { const p = pos[o[0]]; return `<g class="pk${sel === o[0] ? ' on' : ''}" data-pick="${o[0]}" role="radio" aria-checked="${sel === o[0]}" tabindex="0" aria-label="${o[1]}"><circle class="pk-ring" cx="${p[0]}" cy="76" r="38"/>${p[1]}<text x="${p[0]}" y="136" class="pk-t">${o[1]}</text></g>`; };
  return `<svg class="pick-svg" viewBox="0 0 500 150" role="radiogroup" aria-label="Các vật có thể là hung khí"><rect x="4" y="8" width="492" height="138" rx="10" fill="#59636a"/>${opts.map(it).join('')}</svg>`;
};

/* ---------------- Máy ảnh time-lapse (640 x 360) ---------------- */
function interiorTrue(scene) {
  // Khoang nhìn từ cửa sổ vào trong (chưa lật gương). Bên trái: giường 10 (dưới) và 11 (trên). Bên phải: giường 9 (dưới), 12 (trên).
  let s = `<rect width="640" height="360" fill="#2a343a"/><rect x="250" y="40" width="140" height="270" fill="#4a3a2c"/><rect x="262" y="52" width="116" height="250" fill="#d8cfae" opacity=".55"/>
  <path d="M0 210 L230 230 L230 300 L0 330Z" fill="#596e78"/><path d="M0 210 L230 230 L230 238 L0 220Z" fill="#e9edf0"/>
  <path d="M640 210 L410 230 L410 300 L640 330Z" fill="#596e78"/><path d="M640 210 L410 230 L410 238 L640 220Z" fill="#e9edf0"/>
  <path d="M0 60 L210 86 L210 110 L0 96Z" fill="#596e78"/><path d="M640 60 L430 86 L430 110 L640 96Z" fill="#596e78"/>
  <rect x="200" y="320" width="240" height="40" fill="#6b4e36"/>`;
  if (scene.mai !== false) s += `<path d="M10 70 Q100 40 200 84 L200 96 L10 86Z" fill="#8a9aa3"/>`;
  if (scene.hookJacket !== false) s += `<g transform="translate(232 120)"><path d="M0 0 L-16 10 L-20 70 L20 70 L16 10Z" fill="#7d6d4f"/></g>`;
  (scene.items || []).forEach(x => s += x);
  return s;
}
A.cam = { interiorTrue };
const SCN = {
  h1: () => interiorTrue({ items:[ `<g transform="translate(-40 -20) scale(1.25)">${bust('khoa','calm')}</g>`.replace('translate(-40 -20)','translate(30 40)'), `<g transform="translate(470 40) scale(1.9)">${bust('minh','calm')}</g>` ] }),
  h2: () => interiorTrue({ items:[ `<g transform="translate(430 90) scale(1.05)">${bust('minh','calm')}</g>`, `<rect x="440" y="300" width="60" height="16" fill="#e9e2cc" transform="rotate(-8 470 308)"/>` ] }),
  h3: () => interiorTrue({ items:[ `<g transform="translate(420 80) scale(1.1)">${bust('minh','tense')}</g>`, `<rect x="508" y="300" width="22" height="34" rx="4" fill="#111"/><rect x="510" y="303" width="18" height="26" fill="#3a6fd8"/>`, `<rect x="300" y="322" width="44" height="30" fill="#a42a24"/>` ] }),
  h4: () => interiorTrue({ items:[
      `<path d="M420 250 Q520 196 630 236 L630 300 L420 296Z" fill="#8a9aa3"/><ellipse cx="610" cy="236" rx="22" ry="14" fill="#d9d6cf"/>`,
      // người mặc áo nhân viên đứng ở cửa, nhìn ra cửa sổ: tay phải của người đó nằm bên TRÁI khung hình
      `<g transform="translate(320 300)">
        <path d="M-62 0 C-60 -70 -44 -110 0 -116 C44 -110 60 -70 62 0Z" fill="#1f3350"/><rect x="-60" y="-40" width="120" height="9" fill="#d8d27a"/>
        <text x="26" y="-82" font-size="11" fill="#d9b44a" font-family="Be Vietnam Pro,sans-serif" font-weight="800">ĐSVN</text>
        <path d="M-8 -112 L-14 -64 M8 -112 L14 -64" stroke="#b33" stroke-width="2.5"/>
        <g transform="translate(0 -60)"><rect x="-34" y="-12" width="68" height="26" rx="3" fill="#f4f2ea"/><text x="0" y="-1" font-size="9.5" text-anchor="middle" fill="#2f7f86" font-family="Be Vietnam Pro,sans-serif" font-weight="800">ĐÈO MÂY</text><text x="0" y="10" font-size="8" text-anchor="middle" fill="#2f7f86" font-family="Be Vietnam Pro,sans-serif" font-weight="700">GALLERY</text></g>
        <path d="M-58 -96 C-80 -60 -84 -30 -74 -6" stroke="#1f3350" stroke-width="22" fill="none" stroke-linecap="round"/>
        <rect x="-86" y="-24" width="26" height="9" rx="3" fill="#d9b44a"/><circle cx="-73" cy="-19.5" r="5" fill="#f4f1ea" stroke="#d9b44a" stroke-width="2"/>
        <rect x="-96" y="-12" width="36" height="46" rx="3" fill="#a42a24"/>
        <path d="M58 -96 C80 -60 84 -30 74 -6" stroke="#1f3350" stroke-width="22" fill="none" stroke-linecap="round"/>
        <rect x="62" y="-16" width="24" height="50" rx="5" fill="#c9cfd4"/>
        <ellipse cx="0" cy="-146" rx="30" ry="36" fill="#15181d"/><path d="M-30 -150 C-32 -184 -10 -192 0 -192 C14 -192 32 -184 30 -150 C26 -168 14 -174 0 -172 C-14 -174 -26 -166 -30 -150Z" fill="#101317"/><circle cx="0" cy="-190" r="14" fill="#101317"/>
        <path d="M-30 -150 C-31 -176 -14 -190 0 -191" stroke="#d8cfae" stroke-opacity=".55" stroke-width="2.5" fill="none"/><path d="M30 -150 C31 -176 14 -190 0 -191" stroke="#d8cfae" stroke-opacity=".35" stroke-width="2" fill="none"/>
      </g>`
    ] }),
  h5: () => interiorTrue({ hookJacket:false, items:[
      `<path d="M420 250 Q520 196 630 236 L630 300 L420 296Z" fill="#8a9aa3"/><ellipse cx="610" cy="236" rx="22" ry="14" fill="#d9d6cf"/>`,
      `<g transform="translate(232 120)"><path d="M0 0 L-16 10 L-20 70 L20 70 L16 10Z" fill="#7d6d4f"/></g>`,
      `<g transform="translate(120 70) scale(1.05)">${bust('khoa','tense')}</g>`,
      `<g transform="translate(250 196)"><rect x="-20" y="-12" width="40" height="26" rx="4" fill="#5a3a22"/><rect x="-14" y="-20" width="24" height="12" fill="#7fb07f"/></g>`
    ] })
};
function outside(sec, idx, R, toSec) {
  const d = sec * 9; // quãng đường giả lập
  const r = rnd(idx + 7);
  let s = `<rect width="640" height="360" fill="#aeb9bd"/>`;
  s += `<rect y="150" width="640" height="210" fill="#46707f"/>`;
  s += `<path d="M0 150 Q160 ${118 + 8 * Math.sin(d / 900)} 320 132 T640 ${126 + 6 * Math.cos(d / 700)} V150Z" fill="#788a8f"/>`;
  for (let i = 0; i < 4; i++) { const x = ((i * 260 - d * .15) % 1100 + 1100) % 1100 - 240; s += `<path d="M${x} ${96 + i * 14} q90 -16 180 0 t180 2" stroke="#f1f4f5" stroke-opacity=".7" stroke-width="${16 + i * 4}" fill="none" stroke-linecap="round"/>`; }
  for (let i = 0; i < 6; i++) { const x = ((i * 180 - d * 1.4) % 1080 + 1080) % 1080 - 200; s += `<path d="M${x} 360 L${x + 40} ${250 - (i % 3) * 30} L${x + 120} ${230 + (i % 2) * 40} L${x + 200} 360Z" fill="${i % 2 ? '#3f5a45' : '#4c6650'}"/>`; }
  s += `<g stroke="#e8f0f2" stroke-opacity=".35" stroke-width="1.5">`;
  for (let i = 0; i < 26; i++) { const x = r() * 640, y = r() * 360; s += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 3).toFixed(0)}" y2="${(y + 14).toFixed(0)}"/>`; }
  s += `</g>`;
  return s;
}
function stationView(sec, R, toSec) {
  let s = `<rect width="640" height="360" fill="#c3cbcd"/><path d="M0 150 L120 96 L230 132 L360 84 L480 128 L640 100 V210 H0Z" fill="#8a9893"/><rect y="140" width="640" height="70" fill="#eef2f3" opacity=".6"/><rect x="0" y="210" width="640" height="150" fill="#46707f"/><rect x="0" y="230" width="640" height="34" fill="#9aa3a6"/><path d="M0 286 H640 M0 304 H640" stroke="#4a4f52" stroke-width="4"/><rect x="560" y="120" width="10" height="110" fill="#333"/><circle cx="565" cy="128" r="7" fill="#c33"/>`;
  const f0 = toSec(R.freight[0]), f1 = toSec(R.freight[1]);
  if (sec >= f0 && sec <= f1) { const p = (sec - f0) / (f1 - f0), off = 700 - p * 2200; for (let i = 0; i < 12; i++) { const x = off + i * 130; if (x > -140 && x < 680) s += `<rect x="${x}" y="196" width="122" height="92" fill="#6f4426"/><rect x="${x + 6}" y="204" width="110" height="52" fill="#5e391f"/><circle cx="${x + 22}" cy="292" r="10" fill="#1b1b1b"/><circle cx="${x + 100}" cy="292" r="10" fill="#1b1b1b"/>`; } }
  return s;
}
A.camFrame = (sec, opt, R, toSec) => {
  // sec: giây kể từ 12:00:00. opt: {exp:0..100, flip:bool, zoom:bool}
  const c0 = toSec(R.camera[0]), c1 = toSec(R.camera[1]);
  sec = Math.max(c0, Math.min(c1, sec));
  const idx = Math.round((sec - c0) / 2);
  const tun = R.tunnels.findIndex(t => sec >= toSec(t[0]) - 2 && sec <= toSec(t[1]) + 2);
  const stop = sec >= toSec(R.stop[0]) && sec < toSec(R.stop[1]);
  const brake = toSec(R.brake), jolt = toSec(R.jolt);
  const exp = opt.exp;
  let base, refl = '', darkness = 0, info = { tunnel: -1, stop, jolt: false, last: false };
  if (sec >= c1) { // khung cuối: máy ảnh rơi, nhìn lên trần
    base = `<g transform="rotate(-22 320 180)"><rect x="-200" y="-200" width="1040" height="760" fill="#2a3036"/><rect x="180" y="90" width="300" height="60" rx="8" fill="#e8e3c8" opacity=".55"/><path d="M-100 260 L760 200" stroke="#151a1d" stroke-width="30"/></g><rect width="640" height="360" fill="#000" opacity=".25"/>`;
    info.last = true;
  } else if (stop) base = stationView(sec, R, toSec);
  else base = outside(sec, idx, R, toSec);
  if (tun > -1) {
    const t0 = toSec(R.tunnels[tun][0]), t1 = toSec(R.tunnels[tun][1]);
    darkness = sec < t0 ? (sec - (t0 - 2)) / 2 : sec > t1 ? 1 - (sec - t1) / 2 : 1; darkness = Math.max(0, Math.min(1, darkness));
    info.tunnel = tun;
    const key = ['h1', 'h2', 'h3', 'h4', 'h5', null][tun];
    if (key && darkness > .6) { const k = .02 + Math.pow(exp / 100, 1.6) * .75; refl = `<g opacity="${(k * darkness).toFixed(3)}" filter="url(#reflF)" transform="translate(640 0) scale(-1 1)">${SCN[key]()}</g>`; info.refl = key; }
  }
  let img = base;
  if (darkness > 0) img += `<rect width="640" height="360" fill="#020304" opacity="${darkness.toFixed(3)}"/>`;
  img += refl;
  if (darkness > .3) { const r2 = rnd(idx + 3); let g = ''; for (let i = 0; i < 18; i++) { const x = r2() * 640, y = r2() * 360, L = 20 + r2() * 60; g += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q-3 ${(L / 2).toFixed(0)} 2 ${L.toFixed(0)}"/>`; } img += `<g stroke="#bcd3e0" stroke-opacity="${(.12 * darkness).toFixed(3)}" stroke-width="2" fill="none" stroke-linecap="round">${g}</g>`; }
  let tf = '';
  if (sec >= jolt && sec <= jolt + 2) { tf = 'rotate(-3.2 320 180) translate(-10 6)'; info.jolt = true; }
  if (sec >= brake && sec < c1) { const k = (sec - brake) / (c1 - brake); tf = `rotate(${(-8 * k).toFixed(1)} 320 180) translate(${(-30 * k).toFixed(0)} ${(20 * k).toFixed(0)})`; }
  const bright = darkness > .6 ? 1 + exp / 220 : .55 + exp / 55;
  let vb = '0 0 640 360';
  if (opt.zoom) vb = '170 30 300 170';
  const flip = opt.flip ? 'translate(640 0) scale(-1 1)' : '';
  const svg = `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" style="filter:brightness(${bright.toFixed(2)}) contrast(${(1 + exp / 300).toFixed(2)})" aria-hidden="true"><defs><filter id="reflF" x="-5%" y="-5%" width="110%" height="110%"><feColorMatrix type="matrix" values="0.42 0.36 0.2 0 0.03  0.36 0.44 0.2 0 0.05  0.36 0.44 0.3 0 0.09  0 0 0 1 0"/><feGaussianBlur stdDeviation="0.9"/></filter></defs><g transform="${flip}"><g transform="${tf}">${img}</g></g>${info.jolt ? '<rect width="640" height="360" fill="#fff" opacity=".08"/>' : ''}</svg>`;
  info.idx = idx; info.sec = sec;
  return { svg, info };
};

/* ---------------- Điện thoại ---------------- */
A.wall = () => `<svg viewBox="0 0 300 600" preserveAspectRatio="xMidYMid slice"><rect width="300" height="600" fill="#3a4c58"/><rect y="300" width="300" height="300" fill="#2c4a58"/><path d="M0 330 L70 250 L130 300 L200 220 L300 290 V600 H0Z" fill="#243338"/><g stroke="#f1f4f5" stroke-opacity=".75" stroke-linecap="round" fill="none"><path d="M-20 300 q80 -26 160 0 t180 -6" stroke-width="22"/><path d="M-10 340 q90 -20 170 0 t160 6" stroke-width="16" stroke-opacity=".5"/></g></svg>`;
A.photo = (id) => id === 'pages'
  ? `<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#3a3530"/><g transform="rotate(-3 150 110)"><rect x="40" y="16" width="220" height="190" fill="#fbf7ea"/><rect x="40" y="16" width="14" height="190" fill="#a42a24"/>${[...Array(9)].map((_,i)=>`<text x="66" y="${44 + i * 18}" font-size="12" fill="#23408f" font-family="Patrick Hand,cursive">BM${String(7 + (i % 3)).padStart(2,'0')} · ${31 + i * 3}/30 · HK ${i % 2 ? 'SG' : 'HK'}</text>`).join('')}<text x="250" y="200" font-size="11" text-anchor="end" fill="#b3322f" font-family="Patrick Hand,cursive">tr. 1/3 · 60 bản</text></g></svg>`
  : `<svg viewBox="0 0 300 220"><rect width="300" height="220" fill="#ece8df"/><rect x="30" y="16" width="240" height="180" fill="#2b2b2b"/><rect x="42" y="28" width="216" height="130" fill="#c7d0d4"/><path d="M42 110 Q100 82 160 102 T258 94 V158 H42Z" fill="#7d8c86"/><path d="M42 84 q70 -14 130 0 t86 -4" stroke="#fff" stroke-width="10" stroke-opacity=".75" fill="none"/><text x="56" y="182" font-size="14" fill="#e9e6da" font-family="Tinos,serif" font-weight="700">37/30</text><path d="M180 182 q12 -14 22 0 t20 -4 t16 2" stroke="#e9e6da" stroke-width="2" fill="none"/></svg>`;

window.ART = A;
})();
