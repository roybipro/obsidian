---
type: review
period: monthly
tags: [review]
---
# 🗓️ Monthly review

```dataviewjs
const MODE = "monthly";
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1);
const lineChart = (vals, labels, o) => {
  const W = 760, H = 230, L = 34, R = 14, T = 26, B = 26, n = vals.length;
  const x = i => n <= 1 ? (L + W - R) / 2 : L + i * (W - L - R) / (n - 1);
  const y = v => H - B - (Math.min(Math.max(v, 0), o.max) / o.max) * (H - T - B);
  const pts = vals.map((v, i) => [x(i), y(v)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  let g = "";
  for (let k = 0; k <= 4; k++) {
    const yy = T + k * (H - T - B) / 4;
    g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="rgba(125,211,252,.14)" stroke-dasharray="3 4"/>`;
    g += `<text x="${L - 6}" y="${yy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${(o.max * (1 - k / 4)).toFixed(o.max < 10 ? 1 : 0)}</text>`;
  }
  labels.forEach((lab, i) => { if (lab) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="#94a3b8">${lab}</text>`; });
  if (o.goal) g += `<line x1="${L}" x2="${W - R}" y1="${y(o.goal)}" y2="${y(o.goal)}" stroke="#fbbf24" stroke-dasharray="5 4" opacity=".75"/><text x="${W - R}" y="${y(o.goal) - 6}" text-anchor="end" font-size="10" fill="#fbbf24">${o.goal} ${o.unit} goal</text>`;
  const dots = pts.map((p, i) => vals[i] > 0 ? `<g><title>${labels[i] || ""}: ${fmt1(vals[i])} ${o.unit}</title><circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#e0f2fe"/><text x="${p[0]}" y="${p[1] - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="#e0f2fe">${fmt1(vals[i])}</text></g>` : "").join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">${g}<path d="${d}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px ${o.color})"/>${dots}</svg>`;
};
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "running", "sleep", "plan"];
const HLABEL = { english: "English", paper: "Paper", leetcode: "LeetCode", deep_study: "Deep study", exercise: "Exercise", running: "Running", sleep: "Sleep 7h+", plan: "Plan tomorrow" };
const days = dv.pages('"obsidian/Life Tracker/Journal/Daily"').where(p => p.date).sort(p => p.date, "asc");
const today = dv.date("today");
const start = MODE === "weekly" ? today.minus({ days: (today.weekday + 6) % 7 }) : today.startOf("month");
const end = MODE === "weekly" ? start.plus({ days: 6 }) : today.endOf("month");
const N = Math.round(end.diff(start, "days").days) + 1;
const elapsed = Math.max(1, Math.min(N, Math.round(today.diff(start, "days").days) + 1));
const fmtT = n => { const h = Math.floor(n / 60), m = Math.round(n % 60); return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`; };
const pace = (k, mn) => { if (!(k > 0 && mn > 0)) return "no pace yet"; const s = Math.round(mn / k * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} /km`; };
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = p;
const hc = Object.fromEntries(HABITS.map(h => [h, 0]));
const V = { km: [], sleep: [], study: [] }, labels = [], rows = [];
let km = 0, kmMin = 0, slSum = 0, slN = 0, stSum = 0, ticks = 0, tasks = 0;
for (let i = 0; i < N; i++) {
  const d = start.plus({ days: i }), p = byDay[d.toFormat("yyyy-MM-dd")];
  const kmV = p ? Number(p.running_km) || 0 : 0, minV = p ? Number(p.running_min) || 0 : 0;
  const slV = p ? Number(p.sleep_hours) || 0 : 0, stV = p ? Number(p.study_hours) || 0 : 0;
  const hT = p ? HABITS.filter(h => p[h] === true) : [];
  for (const h of hT) hc[h]++;
  ticks += hT.length;
  if (p) tasks += p.file.tasks.where(t => t.completed).length;
  km += kmV; kmMin += minV; stSum += stV; if (slV > 0) { slSum += slV; slN++; }
  V.km.push(kmV); V.sleep.push(slV); V.study.push(stV);
  labels.push(MODE === "weekly" ? d.toFormat("ccc dd") : String(i + 1));
  rows.push([d.toFormat("ccc dd LLL"), p ? `${hT.length}/${HABITS.length}` : "—", kmV ? fmt1(kmV) : "", slV ? fmt1(slV) : "", stV ? fmt1(stV) : "", p ? "✓" : ""]);
}
dv.header(3, `${MODE === "weekly" ? "Week " + today.toFormat("kkkk-'W'WW") + " · " : ""}${start.toFormat("d LLL")} – ${end.toFormat("d LLL yyyy")}`);
const plan = MODE === "weekly" ? `obsidian/Life Tracker/Journal/Plans/Weekly/${today.startOf("isoWeek").toFormat("yyyy")}/${today.startOf("isoWeek").toFormat("MM MMMM")}/${today.toFormat("kkkk-'W'WW")}` : `obsidian/Life Tracker/Journal/Plans/Monthly/${today.toFormat("yyyy")}/${today.toFormat("MM MMMM")}/${today.toFormat("yyyy-MM")}`;
dv.paragraph(`${dv.fileLink(plan, false, MODE === "weekly" ? "Weekly plan" : "Monthly plan")} · ${elapsed} of ${N} days elapsed`);
const cards = [
  ["Running", `${fmt1(km)} km`, `⏱ ${fmtT(kmMin)} · ⚡ ${pace(km, kmMin)}`, "#7dd3fc"],
  ["Sleep avg", slN ? `${fmt1(slSum / slN)} h` : "—", `${slN} night(s) logged`, "#a78bfa"],
  ["Study", `${fmt1(stSum)} h`, "total study time", "#86efac"],
  ["Habit hit-rate", `${Math.round(ticks / (HABITS.length * elapsed) * 100)}%`, `${ticks} ticks`, "#fbbf24"],
  ["Tasks done", `${tasks}`, "completed in daily notes", "#f472b6"],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, big, sub, c0] of cards) {
  const c = wrap.createEl("div", { attr: { style: `flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid ${c0}` } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: big, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: sub, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
dv.header(4, "🧩 Habits");
dv.table(["Habit", "Days ticked", "Hit-rate"], HABITS.map(h => [HLABEL[h], `${hc[h]}/${elapsed}`, `${Math.round(hc[h] / elapsed * 100)}%`]));
dv.header(4, "📈 Running (km per day)");
const h1 = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
h1.innerHTML = lineChart(V.km, labels, { max: Math.max(5, ...V.km) * 1.1, goal: 5, unit: "km", color: "#7dd3fc" });
dv.header(4, "😴 Sleep (hours per night)");
const h2 = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
h2.innerHTML = lineChart(V.sleep, labels, { max: Math.max(9, ...V.sleep) * 1.05, goal: 7, unit: "h", color: "#a78bfa" });
dv.header(4, "📚 Study (hours per day)");
const h3 = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
h3.innerHTML = lineChart(V.study, labels, { max: Math.max(4, ...V.study) * 1.1, unit: "h", color: "#86efac" });
dv.header(4, "🗓️ Day by day");
dv.table(["Day", "Habits", "Run km", "Sleep h", "Study h", "Note"], rows);
```

## 🏆 Wins
- 

## 🚧 Challenges
- 

## 🎯 Focus for next month
- 
