---
type: guide
tags: [guide]
updated: 2026-11-11
---
# How to Use the AI-ML Roadmap

Back to [[AI-ML Roadmap Home]] · Your [[🏠 Home]] · [[Learning Hub]]

## How it fits your vault
- Roadmap pages live in `AI-ML Roadmap/`. One full study page per topic, grouped by phase.
- Study hours come from your **existing daily notes** (`Life Tracker/Daily`, `study_hours`).
- To link a study day to topics, add a `topics` property to that day's daily note, e.g.
  `topics: ["[[Attention and Transformers]]"]`. Your Daily Note template already has it.
- Templates were added to `Life Tracker/Templates`: *Roadmap Weekly Review*, *Roadmap Paper*, *Roadmap Topic Page*.
- Where you already had a note on the same subject (e.g. [[PyTorch fundamentals]]), the
  roadmap page links to it under **My Life Tracker notes**.

## Every day
1. **Morning:** open [[AI-ML Roadmap Home]] → *In progress now* → open the topic page.
   Tick the ✅ key concepts and write in **My notes**.
2. **Evening:** in today's daily note set `study_hours` and `topics`.
   The topic page's **Study log** lists that day automatically.

## Updating a topic
Edit the properties at the top of the topic page:
- `status`: `not-started` → `in-progress` → `review` → `done`
- `started` / `completed`: dates (YYYY-MM-DD)
- `confidence`: 1 (shaky) to 5 (can teach it)

## Every Saturday
Create a note in `AI-ML Roadmap/40 Weekly Reviews` with the *Roadmap Weekly Review* template.

## Papers
`AI-ML Roadmap/20 Papers`: move `status` through `to-read` → `pass-1` → `pass-2` → `pass-3` → `summarized`.

## Graph colours (optional, 1 min)
Graph view → ⚙️ → **Groups** → New group for each, e.g. `tag:#phase/0` … `tag:#phase/6`,
`path:"obsidian/AI-ML Roadmap/20 Papers"`. To see only the roadmap, filter with
`path:"obsidian/AI-ML Roadmap"`.
