---
type: moc
phase: 0
tags: [moc, phase/0]
updated: 2026-11-11
---
# Phase 0 - Math

Math foundations, learned alongside everything else. Come back here whenever a model needs it.

[[AI-ML Roadmap Home]] · 
**Next phase:** [[Phase 1 - Data Toolkit]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 0
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 0
SORT order ASC
```

## All pages in this phase
- [[Essence of Linear Algebra (3Blue1Brown)]]
- [[MIT 18.06 Linear Algebra (Strang)]]
- [[Probability and Statistics]]
- [[Calculus and Optimization]]
- [[Information Theory Basics]]
- [[Mathematics for Machine Learning (book)]]
- [[Checkpoint - Derive the Logistic Regression Gradient]]
