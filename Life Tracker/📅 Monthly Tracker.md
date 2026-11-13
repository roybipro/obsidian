---
type: dashboard
tags: [moc]
cssclasses: [nt-page]
---
# 📅 Monthly Tracker

Fills in automatically from your daily notes. One row per month, no manual work.

## Month by month
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "running", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "running": "Running", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const groups = {};
for (const p of days) { const m = p.date.toFormat('yyyy-MM'); (groups[m] ??= []).push(p); }
const bar = s => '●'.repeat(Math.round(s*10)) + '○'.repeat(10-Math.round(s*10)) + ' ' + Math.round(s*100) + '%';
const rows = Object.keys(groups).sort().reverse().map(m => {
  const g = groups[m]; const logged = g.filter(p => score(p) > 0);
  const avg = logged.length ? logged.reduce((a,p)=>a+score(p),0)/logged.length : 0;
  const great = g.filter(p => score(p) >= 0.8).length;
  const eng = g.reduce((a,p)=>a+(Number(p.english_minutes)||0),0);
  const hrs = g.reduce((a,p)=>a+(Number(p.study_hours)||0),0);
  const tasks = g.flatMap(p => p.file.tasks.array());
  const done = tasks.filter(t => t.completed && t.text.trim()).length, total = tasks.filter(t => t.text.trim()).length;
  return [dv.date(m + '-01').toFormat('LLLL yyyy'), bar(avg), `${logged.length}/${dv.date(m+'-01').daysInMonth}`, great, `${Math.round(eng/60*10)/10} h`, `${Math.round(hrs*10)/10} h`, `${done}/${total}`];
});
dv.table(['Month','Consistency','Days logged','80%+ days','English','Study','To-dos done'], rows);
```

## Habit breakdown per month
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "running", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "running": "Running", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const groups = {};
for (const p of days) { const m = p.date.toFormat('yyyy-MM'); (groups[m] ??= []).push(p); }
const months = Object.keys(groups).sort().reverse();
dv.table(['Habit', ...months.map(m => dv.date(m+'-01').toFormat('LLL yy'))],
  HABITS.map(h => [LABELS[h], ...months.map(m => { const g = groups[m]; return Math.round(g.filter(p=>p[h]===true).length/g.length*100) + '%'; })]));
```

## This month's days
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "running", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "running": "Running", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const m = dv.date('today').toFormat('yyyy-MM');
dv.table(['Day','Score','Mood','English (min)','Study (h)'],
  days.where(p => p.date.toFormat('yyyy-MM') === m).sort(p=>p.date,'desc').map(p => [p.file.link, Math.round(score(p)*100)+'%', p.mood ?? '', p.english_minutes ?? 0, p.study_hours ?? 0]));
```

## Monthly reflections
Write one at the end of each month below (what worked, what didn't, focus for next month).

### November 2026
- Focus: IELTS diagnostic, final semester, first Bangla NLP literature review
- Reflection: 

## 😴 Sleep
```dataviewjs
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
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const hrs = p => Number(p.sleep_hours) || 0;
const today = dv.date("today");
const avg = (a, b) => { const xs = days.where(p => p.date >= a && p.date <= b).array().map(hrs).filter(h => h > 0); return xs.length ? { v: xs.reduce((s, h) => s + h, 0) / xs.length, n: xs.length } : null; };
const fmtH = h => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return `${hh}h ${String(mm).padStart(2, "0")}m`; };
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const last = days.where(p => p.date <= today).array().filter(p => hrs(p) > 0).slice(-1)[0];
const aw = avg(weekStart, today), am = avg(monthStart, today);
const cards = [
  ["Last night", last ? fmtH(hrs(last)) : "—", last ? (hrs(last) >= 7 ? "✅ 7h+ goal met" : "below 7h goal") : "no entry yet"],
  ["Avg this week", aw ? fmtH(aw.v) : "—", aw ? `${aw.n} nights logged` : "no entries"],
  ["Avg this month", am ? fmtH(am.v) : "—", am ? `${am.n} nights logged` : "no entries"],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, big, sub] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #7dd3fc" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: big, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: sub, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = hrs(p);
dv.paragraph("<b>Last 30 nights</b> <small style=\"opacity:.6\">· hours slept</small>");
const N = 30, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = today.minus({ days: N - 1 - i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(i % 5 === 0 || i === N - 1 ? d.toFormat("dd LLL") : "");
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(9, ...vals) * 1.05, goal: 7, unit: "h", color: "#7dd3fc" });
dv.paragraph("<small>Enter <code>sleep_hours</code> in a day's Properties (for example <code>7.5</code>). Hover a point for its date.</small>");
```

## 📚 Study hours
```dataviewjs
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
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const hrs = p => Number(p.study_hours) || 0;
const today = dv.date("today");
const sum = (a, b) => days.where(p => p.date >= a && p.date <= b).array().reduce((s, p) => s + hrs(p), 0);
const logged = (a, b) => days.where(p => p.date >= a && p.date <= b).array().filter(p => hrs(p) > 0);
const f1 = n => (Math.round(n * 10) / 10).toFixed(1);
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const mLog = logged(monthStart, today);
const mAvg = mLog.length ? mLog.reduce((s, p) => s + hrs(p), 0) / mLog.length : 0;
const cards = [
  ["This week", `${f1(sum(weekStart, today))} h`, "total study time"],
  ["This month", `${f1(sum(monthStart, today))} h`, "total study time"],
  ["Avg per study day", `${f1(mAvg)} h`, `${mLog.length} day(s) logged this month`],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, big, sub] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #86efac" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: big, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: sub, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = hrs(p);
dv.paragraph("<b>This month</b> <small style=\"opacity:.6\">· hours studied per day</small>");
const N = today.daysInMonth, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = monthStart.plus({ days: i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(String(i + 1));
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(4, ...vals) * 1.1, unit: "h", color: "#86efac" });
dv.paragraph("<small>Enter <code>study_hours</code> in a day's Properties (for example <code>2.5</code>). Hover a point for its value.</small>");
```

## 🏃 Running
```dataviewjs
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
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const km = p => Number(p.running_km) || 0;
const mins = p => Number(p.running_min) || 0;
const today = dv.date("today");
const sum = (a, b, f) => days.where(p => p.date >= a && p.date <= b).array().reduce((s, p) => s + f(p), 0);
const fmtT = n => { const h = Math.floor(n / 60), m = Math.round(n % 60); return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`; };
const pace = (k, mn) => { if (!(k > 0 && mn > 0)) return "no pace yet"; const s = Math.round(mn / k * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} /km`; };
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const cards = [
  ["This week", sum(weekStart, today, km), sum(weekStart, today, mins)],
  ["This month", sum(monthStart, today, km), sum(monthStart, today, mins)],
  ["All time", days.array().reduce((s, p) => s + km(p), 0), days.array().reduce((s, p) => s + mins(p), 0)],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, k, mn] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #7dd3fc" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: `${(Math.round(k * 10) / 10).toFixed(1)} km`, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: `⏱ ${fmtT(mn)}  ·  ⚡ ${pace(k, mn)}`, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = km(p);
dv.paragraph("<b>This month</b> <small style=\"opacity:.6\">· km per day</small>");
const N = today.daysInMonth, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = monthStart.plus({ days: i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(String(i + 1));
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(5, ...vals) * 1.1, goal: 5, unit: "km", color: "#7dd3fc" });
dv.paragraph("<small>Enter <code>running_km</code> (distance) and <code>running_min</code> (time) in a day's Properties. Pace is calculated automatically.</small>");
```

