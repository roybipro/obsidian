---
type: moc
phase: 1
tags: [moc, phase/1]
updated: 2026-11-11
---
# Phase 1 - Data Toolkit

The Python data stack: get comfortable loading, cleaning and exploring real data.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 0 - Math]]
**Next phase:** [[Phase 2 - Classical ML]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 1
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 1
SORT order ASC
```

## All pages in this phase
- [[Jupyter, Colab, Environments and Git for ML]]
- [[NumPy - Broadcasting and Vectorization]]
- [[pandas - Cleaning, Joins and Groupby]]
- [[Matplotlib and Seaborn for EDA]]
- [[Project - Messy Dataset EDA]]
