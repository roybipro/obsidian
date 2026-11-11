---
type: dashboard
tags: [moc]
---
# 📅 Monthly Tracker

Fills in automatically from your daily notes. One row per month, no manual work.

## Month by month
```dataviewjs
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
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
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
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
const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const LABELS = {"english": "English 45m", "paper": "Read 1 paper", "leetcode": "LeetCode", "deep_study": "Deep study 90m", "exercise": "Exercise 30m", "sleep": "Sleep 7h+", "plan": "Plan tomorrow"};
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
