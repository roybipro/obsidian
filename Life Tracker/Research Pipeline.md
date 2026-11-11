---
type: moc
tags: [moc]
---
# 🔬 Research Pipeline
```dataview
TABLE stage AS Stage, topics AS Topics, venue AS Venue, deadline AS Deadline, next_step AS "Next step"
FROM "obsidian/Life Tracker/Research"
SORT choice(stage="idea",1,choice(stage="literature-review",2,choice(stage="experimenting",3,choice(stage="writing",4,choice(stage="submitted",5,6))))) ASC
```
New project: create a note in `Research/` and copy the properties from an existing one.
