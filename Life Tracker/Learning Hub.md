---
type: moc
tags: [moc]
cssclasses: [nt-page]
---
# 📚 Learning Hub

Roadmaps: [[DSA Roadmap Home]] · [[AI-ML Roadmap Home]] · [[Command Center]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Learning"', type: "learning", sort: "status", cols: [["Topic","file","link"],["Area","area","area"],["Status","status","pill"],["Hours","hours","hours"],["Resource","resource","text"]] })
```
**Total hours by area**
```dataview
TABLE sum(rows.hours) AS Hours FROM "obsidian/Life Tracker/Learning" GROUP BY area
```
