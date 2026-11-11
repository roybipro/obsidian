---
type: moc
tags: [moc]
cssclasses: [nt-page]
---
# 🗣️ English Hub (IELTS 7.0 target)

Log daily minutes in each daily note (`english_minutes`) and write mistakes under "English mistakes to fix".

## Minutes per month
```dataviewjs
const g = {};
for (const p of dv.pages('"obsidian/Life Tracker/Daily"').where(p=>p.date)) { const m = p.date.toFormat('yyyy-MM'); g[m] = (g[m]||0) + (Number(p.english_minutes)||0); }
dv.table(['Month','Minutes','Hours'], Object.keys(g).sort().reverse().map(m=>[m, g[m], Math.round(g[m]/6)/10]));
```

## Mock test scores
| Date | Listening | Reading | Writing | Speaking | Overall |
|---|---|---|---|---|---|
| 2026-11-15 (diagnostic) |  |  |  |  |  |

## Weekly plan
- Mon: Listening Sections 3–4 · Tue: Writing Task 2 · Wed: Speaking Part 2 recording
- Thu: Academic reading (timed) · Fri: Writing Task 1 · Sat: Full section mock · Sun: Review mistakes

## Recurring mistakes
- 
