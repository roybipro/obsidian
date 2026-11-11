---
type: moc
tags: [moc]
cssclasses: [nt-page]
---
# 🎓 Applications

## Universities (PhD / Masters abroad)
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Applications/Universities"', type: "university", sort: "deadline", cols: [["University","file","link"],["Program","program","text"],["Country","country","pill"],["Status","status","pill"],["Deadline","deadline","date"],["Funding","funding","pill"]] })
```

## Internships & jobs
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Applications/Internships"', type: "internship", sort: "follow_up", cols: [["Company","file","link"],["Role","role","text"],["Kind","kind","pill"],["Status","status","pill"],["Applied","applied","date"],["Follow up","follow_up","date"]] })
```

## Follow-ups due
```dataview
LIST follow_up FROM "obsidian/Life Tracker/Applications/Internships" WHERE follow_up AND follow_up <= date(today) AND status != "rejected" AND status != "offer"
```
