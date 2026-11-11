---
type: moc
tags: [moc]
cssclasses: [nt-page]
---
# 🔬 Research Pipeline

```dataviewjs
// ➕ New research project: type a name, pick a stage, press Enter or "Create".
const FOLDER = "obsidian/Life Tracker/Research";
const STAGES = ["idea", "literature-review", "experimenting", "writing", "submitted", "accepted", "published", "rejected"];
const card = dv.el("div", "", { attr: { style: "border:1px solid var(--background-modifier-border);background:var(--background-secondary);border-radius:10px;padding:14px 16px;margin:6px 0 16px" } });
card.createEl("div", { text: "➕ New research project", attr: { style: "font-weight:600;margin-bottom:8px" } });
const row = card.createEl("div", { attr: { style: "display:flex;flex-wrap:wrap;gap:8px;align-items:center" } });
const S = "padding:6px 10px;border-radius:6px;border:1px solid var(--background-modifier-border);background:var(--background-primary);color:var(--text-normal)";
const name = row.createEl("input", { type: "text", attr: { placeholder: "Project name, e.g. Bangla fake-news detection with LLMs", style: S + ";flex:2;min-width:240px" } });
const topics = row.createEl("input", { type: "text", attr: { placeholder: "Topics (optional): nlp, llms, rag", style: S + ";flex:1;min-width:160px" } });
const stage = row.createEl("select", { attr: { style: S } });
for (const s of STAGES) stage.createEl("option", { text: s.replace(/-/g, " "), value: s });
const btn = row.createEl("button", { text: "Create & open", attr: { style: "padding:6px 14px;border-radius:6px;font-weight:600;background:var(--interactive-accent);color:var(--text-on-accent);border:none;cursor:pointer" } });
card.createEl("div", { text: "Creates the note in Research/, opens it, and adds it to the table below.", attr: { style: "font-size:.8em;color:var(--text-muted);margin-top:6px" } });

const clean = s => s.replace(/[\\/:*?"<>|#^\[\]]/g, "").replace(/\s+/g, " ").trim();
const tag = s => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
async function create() {
  const title = clean(name.value);
  if (!title) { new Notice("Type a project name first"); name.focus(); return; }
  const path = `${FOLDER}/${title}.md`;
  const existing = app.vault.getAbstractFileByPath(path);
  if (existing) { new Notice("That project already exists, opening it"); await app.workspace.getLeaf("tab").openFile(existing); return; }
  const tps = topics.value.split(",").map(tag).filter(Boolean);
  const today = window.moment().format("YYYY-MM-DD");
  const body = `---
type: research
stage: ${stage.value}
topics: [${tps.join(", ")}]
venue: ""
supervisor: ""
deadline:
link: ""
next_step: ""
started: ${today}
tags: [research]
---
# ${title}

Stages: idea → literature-review → experimenting → writing → submitted → accepted → published (or rejected)

## 🎯 Research question

## 💡 Why it matters / gap

## 📚 Reading list
- [ ] 

## 🧪 Method & data

## 📝 Notes

## ✅ Tasks
- [ ] Define the research question [due:: ${window.moment().add(7, "days").format("YYYY-MM-DD")}]

## Linked tasks
\`\`\`dataview
TASK WHERE !completed AND contains(outlinks, this.file.link)
\`\`\`
`;
  btn.disabled = true;
  try {
    if (!app.vault.getAbstractFileByPath(FOLDER)) await app.vault.createFolder(FOLDER);
    const f = await app.vault.create(path, body);
    name.value = ""; topics.value = "";
    new Notice(`Created "${title}" ✓`);
    await app.workspace.getLeaf("tab").openFile(f);
  } catch (e) { new Notice("Could not create: " + e.message); }
  btn.disabled = false;
}
btn.onclick = create;
name.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); create(); } });
topics.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); create(); } });
```

## 📋 All projects
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Research"', type: "research", cols: [["Project","file","link"],["Stage","stage","pill"],["Topics","topics","pill"],["Venue","venue","text"],["Deadline","deadline","date"],["Next step","next_step","text"]] })
```

## 🗂️ By stage
```dataviewjs
const order = ["idea", "literature-review", "experimenting", "writing", "submitted", "accepted", "published", "rejected"];
const pages = dv.pages('"obsidian/Life Tracker/Research"').where(p => p.type === "research");
const board = dv.el("div", "", { attr: { style: "display:flex;gap:10px;overflow-x:auto;padding-bottom:6px" } });
for (const st of order) {
  const items = pages.where(p => (p.stage || "idea") === st);
  if (!items.length && ["rejected"].includes(st)) continue;
  const col = board.createEl("div", { attr: { style: "min-width:170px;flex:1;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:8px" } });
  col.createEl("div", { text: `${st.replace(/-/g, " ")} · ${items.length}`, attr: { style: "font-size:.8em;font-weight:600;color:var(--text-muted);text-transform:capitalize;margin-bottom:6px" } });
  for (const p of items) {
    const c = col.createEl("div", { text: p.file.name, attr: { style: "padding:6px 8px;margin-bottom:6px;border-radius:6px;background:var(--background-primary);border:1px solid var(--background-modifier-border);cursor:pointer;font-size:.88em" } });
    c.onclick = () => app.workspace.openLinkText(p.file.path, "", false);
  }
}
```
