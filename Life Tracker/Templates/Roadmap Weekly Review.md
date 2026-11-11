---
type: weekly
week_of: {{date:YYYY-MM-DD}}
target_hours: 20
total_hours:
rating:
on_track:
tags: [weekly]
---
# Week of {{date:D MMM YYYY}}

## Hours this week
```dataview
TABLE WITHOUT ID sum(rows.study_hours) AS "Total hours", length(rows) AS "Study days"
FROM "obsidian/Life Tracker/Daily" WHERE date >= this.week_of AND date < this.week_of + dur(7 days)
GROUP BY "week"
```

## ✅ Finished


## 🧱 Stuck on


## 🎯 One main goal for next week


## Notes
