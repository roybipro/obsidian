---
type: monthly-plan
month: {{date:YYYY-MM}}
run_target_km: 0
study_target_h: 0
sleep_target_h: 7
tags: [plan, monthly]
---
# 🗓️ {{date:MMMM YYYY}} plan

## 🎯 Goals
- [ ] 
- [ ] 
- [ ] 

## 📊 Targets & progress
```dataviewjs
const MODE = "monthly";
const p = dv.current();
const days = dv.pages('"obsidian/Life Tracker/Journal/Daily"').where(d => d.date);
const start = MODE === "weekly" ? dv.date(p.start) : dv.date(p.month + "-01");
const end = MODE === "weekly" ? start.plus({ days: 6 }) : start.endOf("month");
const inP = days.where(d => d.date >= start && d.date <= end).array();
const km = inP.reduce((s, d) => s + (Number(d.running_km) || 0), 0);
const st = inP.reduce((s, d) => s + (Number(d.study_hours) || 0), 0);
const sl = inP.map(d => Number(d.sleep_hours) || 0).filter(h => h > 0);
const slAvg = sl.length ? sl.reduce((a, b) => a + b, 0) / sl.length : 0;
const f1 = n => (Math.round(n * 10) / 10).toFixed(1);
const bar = (a, t) => { if (!(t > 0)) return "set a target above"; const r = Math.min(a / t, 1), n = Math.round(r * 10); return "█".repeat(n) + "░".repeat(10 - n) + " " + Math.round(a / t * 100) + "%"; };
dv.table(["Target", "Actual", "Goal", "Progress"], [
  ["🏃 Running (km)", f1(km), f1(Number(p.run_target_km) || 0), bar(km, Number(p.run_target_km))],
  ["📚 Study (h)", f1(st), f1(Number(p.study_target_h) || 0), bar(st, Number(p.study_target_h))],
  ["😴 Sleep avg (h/night)", sl.length ? f1(slAvg) : "—", f1(Number(p.sleep_target_h) || 7), sl.length ? bar(slAvg, Number(p.sleep_target_h) || 7) : "no nights logged"],
]);
const t = p.file.tasks.where(x => x.text.trim());
const total = t.length, done = t.where(x => x.completed).length;
dv.paragraph(`**Tasks done:** ${done}/${total}${total ? " (" + Math.round(done / total * 100) + "%)" : ""} · **Period:** ${start.toFormat("d LLL")} – ${end.toFormat("d LLL")} · ${dv.fileLink(MODE === "weekly" ? "obsidian/Life Tracker/Journal/📆 Weekly Review" : "obsidian/Life Tracker/Journal/🗓️ Monthly Review", false, "Review page")}`);
```

## 🎯 Plan
- [ ] 

## 📚 Topics & roadmap phase to finish
- 

## 🔁 End-of-month review
- Wins:
- Missed:
- Focus for next month:
