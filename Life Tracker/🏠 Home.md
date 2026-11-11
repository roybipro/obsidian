---
type: dashboard
tags: [moc]
cssclasses: [wide-page]
---
# 🏠 Bipro's Life Tracker

**Mission:** a funded PhD abroad (Fall 2028 intake). Open today's note with the **calendar icon** in the left ribbon (or `Ctrl/Cmd+P` → "Open today's daily note").

## ✅ Today & overdue
```dataview
TASK
WHERE !completed AND due AND due <= date(today)
SORT due ASC
```

## 📆 Next 7 days
```dataview
TASK
WHERE !completed AND due AND due > date(today) AND due <= date(today) + dur(7 days)
SORT due ASC
GROUP BY file.link
```

## 🔥 Consistency
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const byDate = {};
for (const p of days) byDate[p.date.toFormat('yyyy-MM-dd')] = score(p);
// streak
let streak = 0, d = dv.date('today');
if (!(byDate[d.toFormat('yyyy-MM-dd')] >= 0.5)) d = d.minus({days:1});
while (byDate[d.toFormat('yyyy-MM-dd')] >= 0.5) { streak++; d = d.minus({days:1}); }
const last7 = [...Array(7).keys()].map(i => byDate[dv.date('today').minus({days:i}).toFormat('yyyy-MM-dd')] ?? 0);
const avg7 = Math.round(last7.reduce((a,b)=>a+b,0)/7*100);
dv.paragraph(`**🔥 Streak:** ${streak} day(s) at 50%+  ·  **Last 7 days:** ${avg7}%`);

// Heatmap: last 16 weeks, GitHub style
const wrap = dv.el('div', '', {attr:{style:'display:flex;gap:3px;overflow-x:auto;padding:6px 0'}});
const end = dv.date('today'); const start = end.minus({weeks:16}).startOf('week');
const color = s => s === undefined ? 'var(--background-modifier-border)' : s >= 0.8 ? '#216e39' : s >= 0.5 ? '#30a14e' : s > 0 ? '#9be9a8' : '#ebedf0';
for (let w = start; w <= end; w = w.plus({weeks:1})) {
  const col = wrap.createEl('div', {attr:{style:'display:flex;flex-direction:column;gap:3px'}});
  for (let i = 0; i < 7; i++) {
    const day = w.plus({days:i}); const k = day.toFormat('yyyy-MM-dd');
    const s = day > end ? undefined : byDate[k];
    col.createEl('div', {attr:{title:`${k}: ${s===undefined?'no note':Math.round(s*100)+'%'}`, style:`width:13px;height:13px;border-radius:3px;background:${day>end?'transparent':color(s)}`}});
  }
}
dv.paragraph('<small>⬜ no note · 🟩 light = some · green = 50%+ · dark = 80%+ (hover a square for the %)</small>');
```

## 📈 Last 30 days
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const map = {};
for (const p of days) map[p.date.toFormat('yyyy-MM-dd')] = score(p);
const box = dv.el('div', '', {attr:{style:'display:flex;align-items:flex-end;gap:3px;height:140px;border-bottom:1px solid var(--background-modifier-border);padding-top:10px'}});
for (let i = 29; i >= 0; i--) {
  const d = dv.date('today').minus({days:i}); const k = d.toFormat('yyyy-MM-dd'); const s = map[k] ?? 0;
  const bar = box.createEl('div', {attr:{title:`${d.toFormat('dd LLL')}: ${Math.round(s*100)}%`, style:`flex:1;min-width:6px;height:${Math.max(s*100,2)}%;background:${s>=0.8?'#216e39':s>=0.5?'#30a14e':s>0?'#9be9a8':'var(--background-modifier-border)'};border-radius:3px 3px 0 0`}});
}
dv.paragraph('<small>Daily habit score, oldest → today. Hover for values.</small>');
```

## 🧩 Habit hit-rate (this month)
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, 'asc');

const m = dv.date('today').toFormat('yyyy-MM');
const month = days.where(p => p.date.toFormat('yyyy-MM') === m);
const n = month.length || 1;
const rows = HABITS.map(h => { const c = month.where(p => p[h] === true).length; const pct = Math.round(c/n*100);
  return [LABELS[h], '█'.repeat(Math.round(pct/10)) + '░'.repeat(10-Math.round(pct/10)) + ' ' + pct + '%', `${c}/${month.length}`]; });
dv.table(['Habit','Hit-rate','Days'], rows);
```

## 🎯 Goals
```dataview
TABLE area AS Area, target AS Target, padright(padright("", round(progress/10), "█"), 10, "░") + " " + progress + "%" AS Progress, status AS Status
FROM "obsidian/Life Tracker/Goals"
SORT target ASC
```

## 🗂️ Navigate
- [[📅 Monthly Tracker]] · [[PhD Roadmap]] · [[Task Inbox]]
- [[Research Pipeline]] · [[Applications]] · [[Learning Hub]] · [[English Hub]]
