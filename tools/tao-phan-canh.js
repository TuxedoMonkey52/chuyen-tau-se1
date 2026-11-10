/* Tạo lại docs/PHAN-CANH.md từ js/case.js.  Chạy:  node tools/tao-phan-canh.js */
const fs = require('fs'), path = require('path');
global.window = {};
eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'case.js'), 'utf8'));
const C = window.CASE;
const strip = s => String(s).replace(/\*\*/g, '');
let o = `# Phân cảnh mô phỏng: ${C.meta.title.join(' ')}\n\n`;
o += `> Tệp này được tạo tự động từ \`js/case.js\` bằng lệnh \`node tools/tao-phan-canh.js\`. Muốn sửa khung tranh, sửa trong \`js/case.js\` (mục \`panels\`) rồi chạy lại lệnh.\n\n`;
o += `Mỗi tài liệu có tab **Mô phỏng** gồm các khung tranh (phông nền + nhân vật + đồ vật + lời dẫn) và/hoặc nút mở **hoạt cảnh trên sơ đồ đoàn tàu** theo đúng lời khai đó.\n\n`;
o += `Khung có nhãn *theo lời khai* (\`fx: 'claim'\`) là phiên bản người khai kể, chưa chắc đúng.\n\n## Khung tranh theo tài liệu\n\n`;
C.docs.forEach(d => {
  if (!d.sim) return;
  o += `### ${d.id} · ${d.t}\n\n`;
  (d.sim.panels || []).forEach(id => { const p = C.panels[id]; o += `- **${id}**${p.t ? ' · ' + p.t : ''} · nền \`${p.bg}\`${p.fx === 'claim' ? ' · *theo lời khai*' : ''}: ${strip(p.cap)}\n`; });
  if (d.sim.track) o += `- Hoạt cảnh trên sơ đồ: phiên bản **${C.tracks[d.sim.track].label}**, bắt đầu lúc ${d.sim.at}\n`;
  if (d.sim.route) o += `- Dải hành trình qua đèo (6 hầm, ga Hải Vân, điểm phanh)\n`;
  o += `\n`;
});
o += `## Bức tranh tổng thể (Trọng điểm 3)\n\nNgười chơi xếp 6 khung theo đúng thứ tự. Khi xếp, khung hiện bản ẩn danh (\`anon\`), chưa lộ hung thủ. Ở màn kết thúc, khung hiện bản đầy đủ.\n\n`;
C.points[C.points.length - 1].order.forEach((id, i) => { const p = C.panels[id]; o += `${i + 1}. **${p.t}** · ${strip(p.cap)}${p.anon ? `\n   - Bản ẩn danh: ${strip(p.anon.cap)}` : ''}\n`; });
o += `\n## Hoạt cảnh trên sơ đồ\n\nSơ đồ gồm toa 7 (toa ăn), toa 8, toa 9. Mỗi phiên bản là danh sách mốc \`[giờ, vị trí]\` cho từng nhân vật. Giữa hai mốc khác vị trí, nhân vật đứng yên rồi đi bộ dọc hành lang tới vị trí mới, đến nơi đúng giờ của mốc sau.\n\n`;
Object.keys(C.tracks).forEach(k => { const T = C.tracks[k]; o += `### ${T.label}\n\n`; if (T.facts) o += `Chỉ hiện những gì bằng chứng xác nhận (xem danh sách bên dưới).\n\n`; Object.keys(T.who).forEach(w => { o += `- **${w}**: ${T.who[w].map(x => `${x[0]} ${C.places[x[1]].n}`).join(' → ')}\n`; }); o += `\n`; });
o += `## Sự thật đã kiểm chứng (hiện khi người chơi có vật chứng)\n\nKhi lời khai đặt một người ở chỗ khác với bằng chứng, hoạt cảnh tô đỏ chỗ mâu thuẫn.\n\n| Ai | Từ | Đến | Ở / Không thể ở | Cần vật chứng | Ghi chú |\n|---|---|---|---|---|---|\n`;
C.facts.forEach(f => { o += `| ${f.who} | ${f.t0} | ${f.t1} | ${f.at ? C.places[f.at].n : 'không ở ' + C.places[f.not].n} | \`${f.ev}\` | ${f.label} |\n`; });
fs.writeFileSync(path.join(__dirname, '..', 'docs', 'PHAN-CANH.md'), o);
console.log('Đã ghi docs/PHAN-CANH.md');
