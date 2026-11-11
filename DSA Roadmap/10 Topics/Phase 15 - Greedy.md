---
type: topic
phase_name: "DSA P15 · Greedy"
order: 115
phase: 15
topic: greedy
kind: topic
tags: [dsa, dsa/topic, phase/15]
updated: 2026-11-11
---
# Phase 15 - Greedy

**Goal:** Make the locally best choice and prove it cannot hurt the global answer.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 14 - 2-D Dynamic Programming]] · **Next:** [[Phase 16 - Intervals]]

## Core patterns
- Track the furthest reachable index (jump game)
- Reset a running sum when it goes negative (max subarray)
- Sort by the deadline or end time, then take greedily
- Track min and max bounds (valid parenthesis string)

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "greedy"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "greedy"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)

## My notes
### Key ideas


### Mistakes that keep repeating


