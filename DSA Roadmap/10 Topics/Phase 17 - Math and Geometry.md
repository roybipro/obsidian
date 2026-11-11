---
type: topic
phase_name: "DSA P17 · Math and Geometry"
order: 117
phase: 17
topic: math-geometry
kind: topic
tags: [dsa, dsa/topic, phase/17]
updated: 2026-11-11
---
# Phase 17 - Math and Geometry

**Goal:** Matrix tricks, number properties, and string arithmetic.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 16 - Intervals]] · **Next:** [[Phase 18 - Bit Manipulation]]

## Core patterns
- Rotate by transpose then reverse rows
- Layer-by-layer boundary walks (spiral matrix)
- Use the first row and column as markers
- Fast exponentiation for Pow(x, n)

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "math-geometry"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "math-geometry"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)

## My notes
### Key ideas


### Mistakes that keep repeating


