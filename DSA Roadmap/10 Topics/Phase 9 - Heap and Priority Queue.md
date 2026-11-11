---
type: topic
phase_name: "DSA P9 · Heap and Priority Queue"
order: 109
phase: 9
topic: heap
kind: topic
tags: [dsa, dsa/topic, phase/9]
updated: 2026-11-11
---
# Phase 9 - Heap and Priority Queue

**Goal:** Keep the k best or the current min/max without sorting everything.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 8 - Tries]] · **Next:** [[Phase 10 - Backtracking]]

## Core patterns
- Size-k min heap for k largest
- Max heap for k closest or greedy extraction
- Two heaps for a running median
- Heap with (cost, node) pairs for scheduling

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "heap"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "heap"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)
- cppreference.com: priority_queue

## My notes
### Key ideas


### Mistakes that keep repeating


