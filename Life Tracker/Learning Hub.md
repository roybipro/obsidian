---
type: moc
tags: [moc]
---
# 📚 Learning Hub
```dataview
TABLE area AS Area, status AS Status, hours AS Hours, resource AS Resource
FROM "obsidian/Life Tracker/Learning"
SORT status ASC
```
**Total hours by area**
```dataview
TABLE sum(rows.hours) AS Hours FROM "obsidian/Life Tracker/Learning" GROUP BY area
```
