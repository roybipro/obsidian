---
type: topic
phase_name: "DSA P3 · Sliding Window"
order: 103
phase: 3
topic: sliding-window
kind: topic
tags: [dsa, dsa/topic, phase/3]
updated: 2026-11-11
---
# Phase 3 - Sliding Window

**Goal:** Maintain a window over a sequence instead of recomputing from scratch.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 2 - Two Pointers]] · **Next:** [[Phase 4 - Stack]]

## Core patterns
- Fixed-size window
- Variable window: expand right, shrink left when invalid
- Character counter to check validity
- Monotonic deque for window maximum

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "sliding-window"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "sliding-window"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)

## My notes
### Key ideas


### Mistakes that keep repeating


