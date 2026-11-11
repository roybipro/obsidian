---
type: topic
phase_name: "DSA P13 · 1-D Dynamic Programming"
order: 113
phase: 13
topic: dp-1d
kind: topic
tags: [dsa, dsa/topic, phase/13]
updated: 2026-11-11
---
# Phase 13 - 1-D Dynamic Programming

**Goal:** Define the state as one index and write the recurrence.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 12 - Advanced Graphs]] · **Next:** [[Phase 14 - 2-D Dynamic Programming]]

## Core patterns
- State = best answer ending at i
- Take or skip (house robber)
- Ways to reach i (climbing stairs, decode ways)
- Word break style: can prefix i be built?

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "dp-1d"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "dp-1d"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)
- Striver's A2Z sheet: dynamic programming section

## My notes
### Key ideas


### Mistakes that keep repeating


