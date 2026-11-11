---
type: guide
tags: [guide, dsa]
updated: 2026-11-11
---
# How to Use the DSA Roadmap

Back to [[DSA Roadmap Home]]

## Structure
- `10 Topics/`: one page per phase (topic). Patterns, a checklist, and its problems.
- `20 Problems/`: one page per problem. This is the tracking data; every number on Home comes from here.
- `30 Reviews/`: one weekly review per week.
- `40 Templates/`: Problem and Weekly Review templates.

## Status values
- `todo`: not attempted
- `attempted`: tried, but needed a hint or did not finish
- `solved`: you passed it on your own
- `mastered`: solved on your own, explained it out loud, and re-coded it from a blank file after a review

Be strict. A problem you solved only after reading the answer is `attempted`.

## Logging a solve
1. On the problem page set `status`, add 1 to `attempts`, set `solved` to today, and set `time_min`.
2. Add a row to the attempt log. Write any mistake under *Mistakes and lessons*.
3. Set `confidence` from 1 (shaky) to 5 (can teach it).
4. Set `next_review` to 3 days later.

## Spaced review
- After a clean re-solve, push `next_review` out: 3 → 7 → 14 → 30 days.
- If you fail a review, set `status` back to `attempted` and `next_review` to tomorrow.
- Home → *Due for review* lists everything due today.

## Each phase
1. Open the phase page and read the core patterns.
2. Work the problems top to bottom (sorted by `order`).
3. Tick the checklist only when it is true.
4. Move on when every checklist item is ticked, not when every problem is solved.

## Every Sunday
Copy `40 Templates/Weekly Review` into `30 Reviews` and name it `YYYY-Www` (for example `2026-W46`).

## Adding a problem
Copy `40 Templates/Problem Template` into `20 Problems`. Set `topic` (a slug such as `graphs`), `phase`, and `order`. The phase page picks it up automatically.

## Pace
There are 147 problems across 18 phases (Phase 0 is reading-based). At 8 new problems a week that is about 18 weeks. At 5 a week it is about 6 months, which is more realistic in your final semester. Pick the number you can keep, then protect it.

## Language and study hours
- Solutions are in C++ to match your DSA repo. Python is fine for practice.
- Keep logging hours in your daily note (`study_hours`), as in the AI-ML roadmap.
