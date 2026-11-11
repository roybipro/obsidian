---
type: moc
phase: 5
tags: [moc, phase/5]
updated: 2026-11-11
---
# Phase 5 - MLOps

Ship what you build: serving, tracking, testing, monitoring.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 4 - NLP and LLMs]]
**Next phase:** [[Phase 6 - Research and Career]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 5
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 5
SORT order ASC
```

## All pages in this phase
- [[Serving Models with FastAPI and Docker]]
- [[Experiment Tracking and Data Versioning]]
- [[Testing and CI for ML]]
- [[Inference Optimization]]
- [[Model Monitoring and Data Drift]]
- [[Project - Deploy Your Phase 4 System]]
