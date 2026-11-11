---
type: topic
phase_name: "DSA P2 · Two Pointers"
order: 102
phase: 2
topic: two-pointers
kind: topic
tags: [dsa, dsa/topic, phase/2]
updated: 2026-11-11
---
# Phase 2 - Two Pointers

**Goal:** Shrink the search space by moving two indices toward each other.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 1 - Arrays & Hashing]] · **Next:** [[Phase 3 - Sliding Window]]

## Core patterns
- Opposite ends on sorted input
- Slow and fast pointers moving the same direction
- Sort, then skip duplicates
- Compare the two pointers' values to decide which one moves

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "two-pointers"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "two-pointers"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)

## My notes
### Key ideas


### Mistakes that keep repeating


