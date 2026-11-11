---
type: moc
phase: 6
tags: [moc, phase/6]
updated: 2026-11-11
---
# Phase 6 - Research and Career

Research skills, papers, and getting the job or PhD place.

[[AI-ML Roadmap Home]] · **Previous phase:** [[Phase 5 - MLOps]]

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Items",
  length(filter(rows, (r) => r.status = "done")) AS "Done",
  "<progress value='" + length(filter(rows, (r) => r.status = "done")) + "' max='" + length(rows) + "'></progress>" AS "Progress"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 6
GROUP BY phase
```

## Topics
```dataview
TABLE WITHOUT ID file.link AS "Topic", kind AS "Type", status AS "Status", confidence AS "Confidence", completed AS "Completed"
FROM "obsidian/AI-ML Roadmap/10 Topics" WHERE type = "topic" AND phase = 6
SORT order ASC
```

## All pages in this phase
- [[Reading Papers - Three-Pass Method]]
- [[Literature Review and Research Gaps]]
- [[Experimental Design]]
- [[Research Writing]]
- [[Project - Reproduce One Paper]]
- [[Stanford CS224W - Graph Neural Networks (Optional)]]
- [[AI for Healthcare (Optional)]]
- [[Milestone - Write and Submit a Paper]]
- [[Milestone - Job Prep]]
- [[Milestone - MS or PhD Applications]]
