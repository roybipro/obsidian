---
type: topic
phase_name: "DSA P7 · Trees"
order: 107
phase: 7
topic: trees
kind: topic
tags: [dsa, dsa/topic, phase/7]
updated: 2026-11-11
---
# Phase 7 - Trees

**Goal:** Recursion on subtrees; pass information up or down.

Back to [[DSA Roadmap Home]] · [[How to Use the DSA Roadmap]]
**Previous:** [[Phase 6 - Linked List]] · **Next:** [[Phase 8 - Tries]]

## Core patterns
- DFS recursion: return a value from each subtree
- BFS with a queue for level order
- Pass bounds or state down the recursion
- BST: use the ordering property to prune

## Checklist before moving on
- [ ] I can name the pattern for each problem without looking
- [ ] I solved every problem below once without a reference
- [ ] I can state time and space for each solution
- [ ] I re-solved the hardest problem here after a week

## Progress
```dataview
TABLE WITHOUT ID length(rows) AS "Problems", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved", length(filter(rows, (r) => r.status = "mastered")) AS "Mastered"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "trees"
GROUP BY topic
```

## Problems
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", status AS "Status", attempts AS "Attempts", next_review AS "Next review"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem" AND topic = "trees"
SORT order ASC
```

## Resources
- NeetCode.io roadmap: video walkthroughs
- Striver's A2Z DSA sheet (takeUforward)
- Striver's A2Z sheet: trees section

## My notes
### Key ideas


### Mistakes that keep repeating


