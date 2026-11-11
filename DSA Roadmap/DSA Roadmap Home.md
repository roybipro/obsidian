---
type: dashboard
tags: [dsa, dashboard, moc]
updated: 2026-11-11
cssclasses: [nt-page]
---
# DSA Roadmap - Home

Back to [[Command Center]]

Start here. Problem pages hold the tracking data; this page only reads them.

**Phases:** [[Phase 0 - Foundations|0]] · [[Phase 1 - Arrays & Hashing|1]] · [[Phase 2 - Two Pointers|2]] · [[Phase 3 - Sliding Window|3]] · [[Phase 4 - Stack|4]] · [[Phase 5 - Binary Search|5]] · [[Phase 6 - Linked List|6]] · [[Phase 7 - Trees|7]] · [[Phase 8 - Tries|8]] · [[Phase 9 - Heap and Priority Queue|9]] · [[Phase 10 - Backtracking|10]] · [[Phase 11 - Graphs|11]] · [[Phase 12 - Advanced Graphs|12]] · [[Phase 13 - 1-D Dynamic Programming|13]] · [[Phase 14 - 2-D Dynamic Programming|14]] · [[Phase 15 - Greedy|15]] · [[Phase 16 - Intervals|16]] · [[Phase 17 - Math and Geometry|17]] · [[Phase 18 - Bit Manipulation|18]]

Guide: [[How to Use the DSA Roadmap]] · Weekly reviews go in `30 Reviews`.

## Overall progress
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "phases", roadmap: "dsa" })
```

## Due for review
```dataview
TABLE WITHOUT ID file.link AS "Problem", topic AS "Topic", difficulty AS "Level", next_review AS "Due"
FROM "obsidian/DSA Roadmap/20 Problems"
WHERE type = "problem" AND next_review AND next_review <= date(today) AND status != "todo"
SORT next_review ASC
```

## Next up
```dataview
TABLE WITHOUT ID file.link AS "Problem", topic AS "Topic", difficulty AS "Level"
FROM "obsidian/DSA Roadmap/20 Problems"
WHERE type = "problem" AND status = "todo"
SORT phase ASC, order ASC
LIMIT 10
```

## Needs work
```dataview
TABLE WITHOUT ID file.link AS "Problem", status AS "Status", confidence AS "Confidence", attempts AS "Attempts"
FROM "obsidian/DSA Roadmap/20 Problems"
WHERE type = "problem" AND ((confidence AND confidence <= 2) OR status = "attempted")
SORT confidence ASC
```

## Recently solved
```dataview
TABLE WITHOUT ID file.link AS "Problem", difficulty AS "Level", solved AS "Solved on"
FROM "obsidian/DSA Roadmap/20 Problems"
WHERE type = "problem" AND solved
SORT solved DESC
LIMIT 10
```

## By difficulty
```dataview
TABLE WITHOUT ID key AS "Difficulty", length(rows) AS "Total", length(filter(rows, (r) => r.status = "solved" OR r.status = "mastered")) AS "Solved"
FROM "obsidian/DSA Roadmap/20 Problems" WHERE type = "problem"
GROUP BY difficulty
```

## Weekly reviews
```dataview
LIST FROM "obsidian/DSA Roadmap/30 Reviews" WHERE file.name != ".keep" SORT file.name DESC
```
