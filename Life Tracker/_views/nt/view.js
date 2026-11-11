// Notion-style dashboard components for Dataview.
// Usage inside a ```dataviewjs block:
//   await dv.view("obsidian/Life Tracker/_views/nt", { kind: "stats" })
// Kinds: stats · cards · table · phases · habits · nav
// Styling lives in .obsidian/snippets/notion-style.css

const ROOT = "obsidian/Life Tracker";
const I = input || {};
const m = window.moment;

// ---------- helpers ----------
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const COLORS = [
  [/^(done|mastered|solved|published|accepted|offer|complete|completed)$/i, "green"],
  [/^(on track|in-progress|in progress|learning|experimenting|writing|applied|contacted-professor|doing)$/i, "blue"],
  [/^(practiced|preparing-documents|interview|oa|oa \/ test|reviewing|review)$/i, "yellow"],
  [/^(submitted)$/i, "purple"],
  [/^(literature-review|literature review)$/i, "brown"],
  [/^(at risk|rejected|no response|blocked|overdue)$/i, "red"],
  [/^(high)$/i, "red"], [/^(medium)$/i, "yellow"], [/^(low|easy)$/i, "green"], [/^(hard)$/i, "red"],
];
const AREA = { "English": "blue", "English / IELTS": "blue", "Research": "orange", "PhD applications": "purple", "Learning": "green", "Internship": "yellow", "Habits": "pink", "Health": "red", "Personal": "gray" };
const colorFor = v => {
  const s = String(v ?? "").trim();
  if (AREA[s]) return AREA[s];
  for (const [re, c] of COLORS) if (re.test(s)) return c;
  return "gray";
};
const pretty = v => String(v ?? "").replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase());
const pill = (v, color) => {
  if (v === null || v === undefined || v === "") return "";
  const arr = Array.isArray(v) ? v : (v.values ? v.values : [v]);
  return arr.map(x => `<span class="nt-pill nt-${color || colorFor(x)}">${esc(pretty(x))}</span>`).join(" ");
};
const bar = (pct, label) => {
  const p = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
  return `<span class="nt-bar"><span class="nt-track"><span class="nt-fill ${p >= 100 ? "nt-done" : ""}" style="width:${p}%"></span></span><span class="nt-pct">${label ?? p + "%"}</span></span>`;
};
const fmtDate = d => {
  if (!d) return "";
  try { const x = d.toFormat ? d : dv.date(d); return x ? x.toFormat("d LLL yyyy") : String(d); } catch (e) { return String(d); }
};
const open = (path) => app.workspace.openLinkText(path, dv.current()?.file?.path ?? "", false);
function linkEl(parent, page, text, cls) {
  const a = parent.createEl("a", { text: text ?? page.file.name, cls: "internal-link" + (cls ? " " + cls : ""), attr: { "data-href": page.file.path, href: page.file.path } });
  a.addEventListener("click", e => { e.preventDefault(); open(page.file.path); });
  return a;
}
const html = (el, s) => { el.innerHTML = s; return el; };
const label = text => { if (text) dv.el("div", text, { cls: "nt-label" }); };

const HABITS = ["english", "paper", "leetcode", "deep_study", "exercise", "sleep", "plan"];
const HLABEL = { english: "English", paper: "Paper", leetcode: "LeetCode", deep_study: "Deep study", exercise: "Exercise", sleep: "Sleep", plan: "Plan" };
const score = p => HABITS.filter(h => p[h] === true).length / HABITS.length;
const dailies = () => dv.pages(`"${ROOT}/Daily"`).where(p => p.date);

// ---------- stats: Notion-style KPI tiles ----------
if (I.kind === "stats") {
  label(I.title);
  const wrap = dv.el("div", "", { cls: "nt-tiles" });
  const tile = (icon, value, lbl, pct) => {
    const t = wrap.createEl("div", { cls: "nt-tile" });
    t.createEl("div", { text: icon, cls: "nt-tile-icon" });
    t.createEl("div", { text: value, cls: "nt-tile-value" });
    t.createEl("div", { text: lbl, cls: "nt-tile-label" });
    if (pct !== undefined) html(t.createEl("div"), bar(pct));
  };
  const days = dailies();
  const byDate = {}; for (const p of days) byDate[p.date.toFormat("yyyy-MM-dd")] = p;
  const todayKey = m().format("YYYY-MM-DD");
  const td = byDate[todayKey];
  const tt = td ? td.file.tasks.where(t => t.text.trim()) : [];
  const tDone = td ? tt.where(t => t.completed).length : 0;
  tile("✅", `${tDone}/${tt.length || 0}`, "Today's to-dos", tt.length ? tDone / tt.length * 100 : 0);
  tile("🌱", td ? `${Math.round(score(td) * 100)}%` : "–", "Today's habits", td ? score(td) * 100 : 0);
  let streak = 0, d = dv.date("today");
  if (!(byDate[d.toFormat("yyyy-MM-dd")] && score(byDate[d.toFormat("yyyy-MM-dd")]) >= .5)) d = d.minus({ days: 1 });
  while (byDate[d.toFormat("yyyy-MM-dd")] && score(byDate[d.toFormat("yyyy-MM-dd")]) >= .5) { streak++; d = d.minus({ days: 1 }); }
  tile("🔥", `${streak} day${streak === 1 ? "" : "s"}`, "Streak (50%+ habits)");
  const last7 = [...Array(7).keys()].map(i => { const p = byDate[dv.date("today").minus({ days: i }).toFormat("yyyy-MM-dd")]; return p ? score(p) : 0; });
  const avg7 = Math.round(last7.reduce((a, b) => a + b, 0) / 7 * 100);
  tile("📈", `${avg7}%`, "Habits · last 7 days", avg7);
  const dsa = dv.pages('"obsidian/DSA Roadmap/20 Problems"').where(p => p.type === "problem");
  if (dsa.length) { const s = dsa.where(p => ["solved", "mastered"].includes(p.status)).length; tile("🧩", `${s}/${dsa.length}`, "DSA problems solved", s / dsa.length * 100); }
  const ai = dv.pages('"obsidian/AI-ML Roadmap/10 Topics"').where(p => p.type === "topic");
  if (ai.length) { const s = ai.where(p => p.status === "done").length; tile("🤖", `${s}/${ai.length}`, "AI-ML topics done", s / ai.length * 100); }
  const goals = dv.pages(`"${ROOT}/Goals"`).where(p => p.type === "goal");
  if (goals.length) { const a = Math.round(goals.map(g => Number(g.progress) || 0).array().reduce((x, y) => x + y, 0) / goals.length); tile("🎯", `${a}%`, "Goals · average progress", a); }
  const due = dv.pages("").file.tasks.where(t => !t.completed && t.due && t.due <= dv.date("today")).length;
  tile("⏰", `${due}`, "Due today / overdue");
}

// ---------- cards: gallery view (goals by default) ----------
else if (I.kind === "cards") {
  label(I.title);
  let pages = dv.pages(I.source || `"${ROOT}/Goals"`);
  if (I.type) pages = pages.where(p => p.type === I.type);
  const sortBy = I.sort || "target";
  pages = pages.sort(p => p[sortBy] ?? "9999", "asc");
  const grid = dv.el("div", "", { cls: "nt-cards" });
  for (const p of pages) {
    const card = grid.createEl("div", { cls: "nt-card" });
    const st = p[I.statusField || "status"];
    card.createEl("div", { cls: "nt-card-top", attr: { style: `background: var(--nt-${colorFor(p[I.colorField || "area"] ?? st)})` } });
    const body = card.createEl("div", { cls: "nt-card-body" });
    const title = body.createEl("div", { cls: "nt-card-title" });
    linkEl(title, p, p.title || p.file.name.replace(/^Goal - /, ""));
    const meta = body.createEl("div", { cls: "nt-card-meta" });
    html(meta, [pill(p[I.colorField || "area"]), pill(st)].filter(Boolean).join(" "));
    if (p[I.dateField || "target"]) body.createEl("div", { text: "📅 " + fmtDate(p[I.dateField || "target"]), cls: "nt-muted" });
    if (I.progressField !== false) html(body.createEl("div"), bar(p[I.progressField || "progress"]));
    card.addEventListener("click", e => { if (e.target.tagName !== "A") open(p.file.path); });
    card.style.cursor = "pointer";
  }
  if (!pages.length) dv.paragraph("<span class='nt-muted'>Nothing here yet.</span>");
}

// ---------- table: Notion-style database table with pills ----------
else if (I.kind === "table") {
  label(I.title);
  let pages = dv.pages(I.source);
  if (I.type) pages = pages.where(p => Array.isArray(I.type) ? I.type.includes(p.type) : p.type === I.type);
  if (I.sort) pages = pages.sort(p => p[I.sort] ?? (I.dir === "desc" ? "" : "zzzz"), I.dir || "asc");
  const cols = I.cols || [["Name", "file", "link"], ["Status", "status", "pill"]];
  const rows = pages.map(p => cols.map(([_, f, k]) => {
    const v = f === "file" ? p.file.link : p[f];
    if (k === "link") return p.file.link;
    if (k === "pill") return pill(v);
    if (k === "area") return pill(v);
    if (k === "progress") return bar(v);
    if (k === "date") return fmtDate(v);
    if (k === "hours") return v ? `${v} h` : "<span class='nt-muted'>–</span>";
    return v ?? "";
  }));
  if (rows.length) dv.table(cols.map(c => c[0]), rows);
  else dv.paragraph("<span class='nt-muted'>Nothing here yet.</span>");
}

// ---------- phases: roadmap progress by phase ----------
else if (I.kind === "phases") {
  label(I.title);
  const isDSA = I.roadmap === "dsa";
  const items = isDSA
    ? dv.pages('"obsidian/DSA Roadmap/20 Problems"').where(p => p.type === "problem")
    : dv.pages('"obsidian/AI-ML Roadmap/10 Topics"').where(p => p.type === "topic");
  const doneSet = isDSA ? ["solved", "mastered"] : ["done"];
  const phaseNames = {};
  const phasePages = isDSA ? dv.pages('"obsidian/DSA Roadmap/10 Topics"') : dv.pages('"obsidian/AI-ML Roadmap/00 Phases"');
  for (const pp of phasePages) { const mm = pp.file.name.match(/^Phase (\d+) - /); if (mm) phaseNames[mm[1]] = pp; }
  const groups = {};
  for (const it of items) { const k = String(it.phase ?? "?"); (groups[k] ??= []).push(it); }
  const keys = Object.keys(groups).sort((a, b) => Number(a) - Number(b));
  const rows = keys.map(k => {
    const g = groups[k]; const done = g.filter(x => doneSet.includes(x.status)).length;
    const doing = g.filter(x => x.status === "in-progress").length;
    const pp = phaseNames[k];
    const st = done === g.length ? "done" : (done || doing) ? "in-progress" : "not-started";
    return [pp ? pp.file.link : `Phase ${k}`, pill(st), bar(done / g.length * 100, `${done}/${g.length}`)];
  });
  dv.table(["Phase", "Status", "Progress"], rows);
}

// ---------- habits: last N days as coloured dots ----------
else if (I.kind === "habits") {
  label(I.title);
  const n = I.days || 7;
  const map = {}; for (const p of dailies()) map[p.date.toFormat("yyyy-MM-dd")] = p;
  const rows = [];
  for (let i = 0; i < n; i++) {
    const d = dv.date("today").minus({ days: i }); const p = map[d.toFormat("yyyy-MM-dd")];
    const cells = HABITS.map(h => `<span class="nt-dot ${p && p[h] === true ? "on" : ""}" title="${HLABEL[h]}"></span>`);
    rows.push([p ? p.file.link : `<span class="nt-muted">${d.toFormat("ccc d LLL")}</span>`, ...cells, p ? bar(score(p) * 100) : "<span class='nt-muted'>no note</span>"]);
  }
  const t = dv.el("div", "", { cls: "nt-habits" });
  dv.table(["Day", ...HABITS.map(h => HLABEL[h]), "Score"], rows);
  // move the table inside the wrapper for centered dot styling
  const last = dv.container.lastElementChild; if (last && last !== t) t.appendChild(last);
}

// ---------- nav: linked-page cards ----------
else if (I.kind === "nav") {
  label(I.title);
  const grid = dv.el("div", "", { cls: "nt-nav" });
  for (const it of I.items || []) {
    const p = dv.page(it.page);
    const a = grid.createEl("a", { cls: "internal-link", attr: { "data-href": it.page, href: it.page } });
    a.createEl("span", { text: it.icon || "📄", cls: "nt-nav-icon" });
    const tx = a.createEl("span", { cls: "nt-nav-text" });
    tx.createEl("span", { text: it.name || it.page });
    if (it.desc) tx.createEl("span", { text: it.desc, cls: "nt-nav-desc" });
    a.addEventListener("click", e => { e.preventDefault(); open(p ? p.file.path : it.page); });
  }
}
