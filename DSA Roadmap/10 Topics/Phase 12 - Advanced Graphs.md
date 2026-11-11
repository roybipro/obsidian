---
type: topic
phase_name: "DSA P12 · Advanced Graphs"
order: 112
phase: 12
topic: advanced-graphs
kind: topic
tags: [dsa, dsa/topic, phase/12]
updated: 2026-11-11
---
# Phase 12 - Advanced Graphs

**Goal:** Shortest paths, minimum spanning trees, and ordering with constraints.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 11 - Graphs]] · **Next:** [[Phase 13 - 1-D Dynamic Programming]]

## Core patterns
- Dijkstra with a min heap
- Bellman-Ford style relaxation for at most K edges
- Kruskal or Prim for minimum spanning tree
- Topological order for alien alphabets

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "advanced-graphs"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "advanced-graphs"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)
- cp-algorithms.com: shortest paths and MST

## My notes
### Key ideas


### Mistakes that keep repeating


