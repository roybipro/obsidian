---
type: moc
tags: [moc]
---
# 🎓 Applications

## Universities (PhD / Masters abroad)
```dataview
TABLE program AS Program, country AS Country, status AS Status, deadline AS Deadline, professor AS Professor, funding AS Funding
FROM "obsidian/Life Tracker/Applications/Universities"
SORT deadline ASC
```

## Internships & jobs
```dataview
TABLE role AS Role, status AS Status, applied AS Applied, follow_up AS "Follow up", source AS Source
FROM "obsidian/Life Tracker/Applications/Internships"
SORT follow_up ASC
```

## Follow-ups due
```dataview
LIST follow_up FROM "obsidian/Life Tracker/Applications/Internships" WHERE follow_up AND follow_up <= date(today) AND status != "rejected" AND status != "offer"
```
