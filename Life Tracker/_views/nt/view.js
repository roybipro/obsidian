// Notion-style dashboard components for Dataview.
// Usage inside a ```dataviewjs block:
//   await dv.view("obsidian/Life Tracker/_views/nt", { kind: "stats" })
// Kinds: stats · cards · table · phases · habits · nav
// Styling lives in .obsidian/snippets/notion-style.css

const ROOT = "obsidian/Life Tracker";
const I = input || {};
const m = window.moment;

// ---------- styles: injected so the look never depends on Obsidian settings ----------
const NT_CSS = "/* ==========================================================================\n   Notion-style theme for Bipro's vault\n   Settings \u2192 Appearance \u2192 CSS snippets \u2192 \"notion-style\" (toggle on)\n   Global layer: typography, tables, tags, tasks, callouts, inputs.\n   Dashboard layer (pages with cssclasses: nt-page / nt-cover): cover,\n   stat tiles, pills, progress bars, cards, nav grid.\n   ========================================================================== */\n\n/* ---------- Palette (Notion's own colours) ---------- */\nbody {\n  --nt-font: ui-sans-serif, -apple-system, BlinkMacSystemFont, \"Segoe UI Variable Display\", \"Segoe UI\", Helvetica, \"Apple Color Emoji\", Arial, sans-serif;\n  --nt-radius: 6px;\n  --nt-radius-lg: 10px;\n}\n.theme-light {\n  --nt-bg: #ffffff;  --nt-bg-soft: #f7f6f3;  --nt-bg-hover: rgba(55,53,47,.06);\n  --nt-text: #37352f; --nt-muted: rgba(55,53,47,.65); --nt-faint: rgba(55,53,47,.45);\n  --nt-border: rgba(55,53,47,.12); --nt-shadow: rgba(15,15,15,.06) 0 0 0 1px, rgba(15,15,15,.06) 0 2px 6px;\n  --nt-gray-bg: #f1f1ef;   --nt-gray: #787774;\n  --nt-brown-bg: #f4eeee;  --nt-brown: #9f6b53;\n  --nt-orange-bg: #fbecdd; --nt-orange: #d9730d;\n  --nt-yellow-bg: #fbf3db; --nt-yellow: #cb912f;\n  --nt-green-bg: #edf3ec;  --nt-green: #448361;\n  --nt-blue-bg: #e7f3f8;   --nt-blue: #337ea9;\n  --nt-purple-bg: #f6f3f9; --nt-purple: #9065b0;\n  --nt-pink-bg: #faf1f5;   --nt-pink: #c14c8a;\n  --nt-red-bg: #fdebec;    --nt-red: #d44c47;\n}\n.theme-dark {\n  --nt-bg: #191919;  --nt-bg-soft: #202020;  --nt-bg-hover: rgba(255,255,255,.055);\n  --nt-text: rgba(255,255,255,.81); --nt-muted: rgba(255,255,255,.55); --nt-faint: rgba(255,255,255,.35);\n  --nt-border: rgba(255,255,255,.094); --nt-shadow: rgba(15,15,15,.2) 0 0 0 1px, rgba(15,15,15,.3) 0 2px 8px;\n  --nt-gray-bg: #2f2f2f;   --nt-gray: #9b9b9b;\n  --nt-brown-bg: #4a3228;  --nt-brown: #ba856f;\n  --nt-orange-bg: #5c3b23; --nt-orange: #c77d48;\n  --nt-yellow-bg: #564328; --nt-yellow: #ca9849;\n  --nt-green-bg: #243d30;  --nt-green: #529e72;\n  --nt-blue-bg: #143a4e;   --nt-blue: #5e87c9;\n  --nt-purple-bg: #3c2d49; --nt-purple: #9d68d3;\n  --nt-pink-bg: #4e2c3c;   --nt-pink: #d15796;\n  --nt-red-bg: #522e2a;    --nt-red: #df5452;\n  --background-primary: #191919;\n  --background-secondary: #202020;\n}\n\n/* ---------- Global typography ---------- */\nbody {\n  --font-text-theme: var(--nt-font);\n  --font-interface-theme: var(--nt-font);\n  --font-text-size: 16px;\n  --line-height-normal: 1.6;\n  --h1-size: 1.875em; --h2-size: 1.5em; --h3-size: 1.25em; --h4-size: 1.1em;\n  --h1-weight: 700; --h2-weight: 600; --h3-weight: 600; --h4-weight: 600;\n  --inline-title-size: 2.5em; --inline-title-weight: 700;\n  --link-decoration: none;\n  --link-external-decoration: none;\n}\n.markdown-rendered h1, .markdown-rendered h2, .markdown-rendered h3,\n.cm-header-1, .cm-header-2, .cm-header-3 { letter-spacing: -0.01em; }\n.markdown-rendered h2 { margin-top: 1.6em; padding-bottom: .25em; }\n.markdown-rendered h3 { margin-top: 1.3em; }\n.markdown-rendered hr { border-color: var(--nt-border); }\n\n/* Links look like Notion (underlined softly) */\n.markdown-rendered a.internal-link,\n.cm-hmd-internal-link .cm-underline {\n  color: inherit; text-decoration: underline; text-decoration-color: var(--nt-faint);\n  text-underline-offset: 3px; font-weight: 500;\n}\n.markdown-rendered a.internal-link:hover { text-decoration-color: currentColor; }\n\n/* ---------- Tables (incl. Dataview) ---------- */\n.markdown-rendered table, .table-view-table {\n  border-collapse: collapse; width: 100%; font-size: .92em;\n}\n.markdown-rendered th, .table-view-table th {\n  font-weight: 500; color: var(--nt-muted); text-align: left;\n  background: transparent !important; border: none !important;\n  border-bottom: 1px solid var(--nt-border) !important; padding: 6px 10px !important;\n}\n.markdown-rendered td, .table-view-table td {\n  border: none !important; border-bottom: 1px solid var(--nt-border) !important;\n  padding: 7px 10px !important; vertical-align: middle;\n}\n.markdown-rendered tr:hover td, .table-view-table tr:hover td { background: var(--nt-bg-hover); }\n.markdown-rendered tbody tr:nth-child(even) { background: transparent; }\n.dataview.table-view-table thead .dataview.small-text { display: none; } /* hide row counts */\n.table-view-table > thead > tr > th { font-size: .82em; text-transform: none; }\n\n/* ---------- Tags as Notion pills ---------- */\n.markdown-rendered a.tag, .cm-hashtag {\n  background: var(--nt-gray-bg); color: var(--nt-text); border: none;\n  border-radius: 4px; padding: 1px 7px; font-size: .82em; font-weight: 500; text-decoration: none;\n}\n.cm-hashtag-begin { border-radius: 4px 0 0 4px; padding-right: 0; }\n.cm-hashtag-end { border-radius: 0 4px 4px 0; padding-left: 0; }\n\n/* ---------- Tasks ---------- */\ninput[type=checkbox].task-list-item-checkbox {\n  width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid var(--nt-faint);\n}\ninput[type=checkbox].task-list-item-checkbox:checked { background-color: var(--nt-blue); border-color: var(--nt-blue); }\n.markdown-rendered .task-list-item.is-checked, .HyperMD-task-line[data-task=\"x\"] {\n  color: var(--nt-faint); text-decoration: line-through; text-decoration-color: var(--nt-faint);\n}\n.markdown-rendered ul.contains-task-list > li { padding: 2px 0; }\n/* Dataview inline fields like [due:: \u2026] become small date chips */\n.dataview.inline-field { font-size: .8em; }\n.dataview.inline-field-key { background: var(--nt-gray-bg); color: var(--nt-muted); border-radius: 4px 0 0 4px; padding: 1px 6px; }\n.dataview.inline-field-value { background: var(--nt-red-bg); color: var(--nt-red); border-radius: 0 4px 4px 0; padding: 1px 6px; font-family: var(--nt-font); }\n\n/* ---------- Callouts as soft Notion blocks ---------- */\n.callout {\n  --callout-padding: 14px 16px; border: none; border-radius: var(--nt-radius);\n  background: var(--nt-bg-soft) !important; mix-blend-mode: normal;\n}\n.callout-title { color: var(--nt-text); font-weight: 600; }\n.callout-icon { color: var(--callout-color, var(--nt-muted)); }\n\n/* Blockquotes: Notion style left bar */\n.markdown-rendered blockquote { border-left: 3px solid var(--nt-text); padding: 2px 14px; color: var(--nt-text); background: transparent; }\n\n/* ---------- Inputs & buttons (Command Center planner) ---------- */\n.markdown-rendered input[type=text] {\n  background: var(--nt-bg-soft) !important; border: 1px solid var(--nt-border) !important;\n  border-radius: var(--nt-radius) !important; padding: 7px 10px !important; color: var(--nt-text);\n  box-shadow: none !important; font-family: var(--nt-font);\n}\n.markdown-rendered input[type=text]:focus { border-color: var(--nt-blue) !important; box-shadow: 0 0 0 2px var(--nt-blue-bg) !important; }\n.markdown-rendered button {\n  background: var(--nt-bg-soft); color: var(--nt-text); border: 1px solid var(--nt-border);\n  border-radius: var(--nt-radius); box-shadow: none; font-weight: 500; cursor: pointer;\n}\n.markdown-rendered button:hover { background: var(--nt-bg-hover); }\n.markdown-rendered progress { height: 6px; border-radius: 3px; overflow: hidden; accent-color: var(--nt-blue); }\n\n/* ---------- Properties panel ---------- */\n.metadata-container { --metadata-label-text-color: var(--nt-muted); border-bottom: 1px solid var(--nt-border); padding-bottom: 8px; }\n.metadata-property:hover { background: var(--nt-bg-hover); border-radius: 4px; }\n\n/* ==========================================================================\n   Dashboard layer\n   ========================================================================== */\n.nt-page.markdown-preview-view, .nt-page .markdown-preview-view,\n.nt-page.markdown-source-view, .nt-page .markdown-source-view { --file-line-width: 1080px; }\n\n/* Cover banner (like a Notion page cover) */\n.nt-cover .markdown-preview-sizer::before,\n.nt-cover.markdown-source-view .cm-sizer::before {\n  content: \"\"; display: block; height: 170px; margin: 0 0 6px; border-radius: var(--nt-radius-lg);\n  background:\n    radial-gradient(circle at 15% 30%, rgba(255,255,255,.25), transparent 40%),\n    linear-gradient(120deg, #0f4c75 0%, #3282b8 35%, #6c5b7b 70%, #c06c84 100%);\n}\n.nt-cover .inline-title { margin-top: 4px; }\n\n/* Hide raw code if Dataview is still loading */\n.nt-page .block-language-dataviewjs:empty { min-height: 20px; }\n\n/* Section label (small gray caps above blocks) */\n.nt-label { font-size: .78em; color: var(--nt-muted); font-weight: 600; letter-spacing: .02em; margin: 2px 0 6px; }\n\n/* Stat tiles */\n.nt-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin: 6px 0 14px; }\n.nt-tile {\n  background: var(--nt-bg-soft); border: 1px solid var(--nt-border); border-radius: var(--nt-radius-lg);\n  padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; min-height: 86px;\n}\n.nt-tile .nt-tile-icon { font-size: 1.05em; }\n.nt-tile .nt-tile-value { font-size: 1.6em; font-weight: 700; line-height: 1.15; color: var(--nt-text); }\n.nt-tile .nt-tile-label { font-size: .8em; color: var(--nt-muted); }\n.nt-tile .nt-bar { margin-top: 6px; }\n\n/* Pills */\n.nt-pill {\n  display: inline-block; padding: 0 8px; border-radius: 4px; font-size: .82em; font-weight: 500;\n  line-height: 1.6; white-space: nowrap; background: var(--nt-gray-bg); color: var(--nt-text);\n}\n.nt-pill::before { content: \"\u25cf\"; font-size: .7em; margin-right: 5px; vertical-align: 1px; }\n.nt-gray   { background: var(--nt-gray-bg); }   .nt-gray::before   { color: var(--nt-gray); }\n.nt-brown  { background: var(--nt-brown-bg); }  .nt-brown::before  { color: var(--nt-brown); }\n.nt-orange { background: var(--nt-orange-bg); } .nt-orange::before { color: var(--nt-orange); }\n.nt-yellow { background: var(--nt-yellow-bg); } .nt-yellow::before { color: var(--nt-yellow); }\n.nt-green  { background: var(--nt-green-bg); }  .nt-green::before  { color: var(--nt-green); }\n.nt-blue   { background: var(--nt-blue-bg); }   .nt-blue::before   { color: var(--nt-blue); }\n.nt-purple { background: var(--nt-purple-bg); } .nt-purple::before { color: var(--nt-purple); }\n.nt-pink   { background: var(--nt-pink-bg); }   .nt-pink::before   { color: var(--nt-pink); }\n.nt-red    { background: var(--nt-red-bg); }    .nt-red::before    { color: var(--nt-red); }\n.nt-pill.nt-plain::before { content: none; }\n\n/* Progress bar */\n.nt-bar { display: inline-flex; align-items: center; gap: 8px; width: 100%; max-width: 220px; vertical-align: middle; }\n.nt-bar .nt-track { flex: 1; height: 6px; border-radius: 3px; background: var(--nt-gray-bg); overflow: hidden; min-width: 60px; }\n.nt-bar .nt-fill { display: block; height: 100%; border-radius: 3px; background: var(--nt-blue); }\n.nt-bar .nt-fill.nt-done { background: var(--nt-green); }\n.nt-bar .nt-pct { font-size: .78em; color: var(--nt-muted); min-width: 34px; text-align: right; }\n.nt-muted { color: var(--nt-muted); font-size: .88em; }\n\n/* Gallery cards */\n.nt-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; margin: 6px 0 16px; }\n.nt-card {\n  background: var(--nt-bg-soft); border: 1px solid var(--nt-border); border-radius: var(--nt-radius-lg);\n  padding: 0; overflow: hidden; display: flex; flex-direction: column; transition: background .12s, box-shadow .12s;\n}\n.nt-card:hover { background: var(--nt-bg-hover); box-shadow: var(--nt-shadow); }\n.nt-card .nt-card-top { height: 6px; background: var(--nt-blue); }\n.nt-card .nt-card-body { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 8px; }\n.nt-card .nt-card-title { font-weight: 600; line-height: 1.35; }\n.nt-card .nt-card-title a { text-decoration: none !important; color: var(--nt-text) !important; }\n.nt-card .nt-card-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }\n\n/* Navigation grid (Notion \"linked pages\") */\n.nt-nav { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 8px; margin: 6px 0 14px; }\n.nt-nav a.internal-link, .nt-nav .nt-nav-item {\n  display: flex; align-items: center; gap: 10px; padding: 10px 12px; text-decoration: none !important;\n  border: 1px solid var(--nt-border); border-radius: var(--nt-radius); background: var(--nt-bg-soft); color: var(--nt-text) !important;\n}\n.nt-nav a.internal-link:hover { background: var(--nt-bg-hover); }\n.nt-nav .nt-nav-icon { font-size: 1.25em; }\n.nt-nav .nt-nav-text { display: flex; flex-direction: column; line-height: 1.25; }\n.nt-nav .nt-nav-desc { font-size: .78em; color: var(--nt-muted); font-weight: 400; }\n\n/* Habit dots */\n.nt-dot { display: inline-block; width: 18px; height: 18px; border-radius: 5px; background: var(--nt-gray-bg); vertical-align: middle; }\n.nt-dot.on { background: var(--nt-green); }\n.nt-habits td, .nt-habits th { text-align: center !important; }\n.nt-habits td:first-child, .nt-habits th:first-child { text-align: left !important; }\n\n/* Two-column layout helper */\n.nt-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }\n@media (max-width: 800px) { .nt-cols { grid-template-columns: 1fr; } }\n";
(() => {
  let st = document.getElementById('nt-style');
  if (!st) { st = document.createElement('style'); st.id = 'nt-style'; document.head.appendChild(st); }
  if (st.textContent !== NT_CSS) st.textContent = NT_CSS;
})();

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

// ---------- consistency: streaks + 16-week heatmap (inline styles) ----------
else if (I.kind === "consistency") {
  const map = {}; for (const p of dailies()) map[p.date.toFormat("yyyy-MM-dd")] = score(p);
  const today = dv.date("today"); const key = d => d.toFormat("yyyy-MM-dd");
  // current streak (today counts if already 50%+, otherwise start from yesterday)
  let cur = 0, d = today;
  if (!((map[key(d)] ?? 0) >= .5)) d = d.minus({ days: 1 });
  while ((map[key(d)] ?? 0) >= .5) { cur++; d = d.minus({ days: 1 }); }
  // best streak ever
  let best = 0, run = 0;
  const keys = Object.keys(map).sort();
  if (keys.length) {
    for (let x = dv.date(keys[0]); x <= today; x = x.plus({ days: 1 })) { if ((map[key(x)] ?? 0) >= .5) { run++; best = Math.max(best, run); } else run = 0; }
  }
  const avg = (from, n) => { let s = 0; for (let i = 0; i < n; i++) s += map[key(from.minus({ days: i }))] ?? 0; return Math.round(s / n * 100); };
  const monthDays = today.day;
  const stats = [["🔥", `${cur}`, "Current streak (days)"], ["🏆", `${best}`, "Best streak"], ["📅", `${avg(today, 7)}%`, "Last 7 days"], ["🗓️", `${avg(today, monthDays)}%`, `This month (${monthDays} days)`]];
  const row = dv.el("div", "", { attr: { style: "display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:6px 0 12px" } });
  for (const [ic, v, l] of stats) {
    const t = row.createEl("div", { attr: { style: "background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:10px 14px" } });
    t.createEl("div", { text: ic, attr: { style: "font-size:1.05em" } });
    t.createEl("div", { text: v, attr: { style: "font-size:1.6em;font-weight:700;line-height:1.2" } });
    t.createEl("div", { text: l, attr: { style: "font-size:.8em;color:var(--text-muted)" } });
  }
  // heatmap
  const weeks = I.weeks || 16;
  const box = dv.el("div", "", { attr: { style: "display:flex;gap:4px;align-items:flex-start;overflow-x:auto;padding:4px 0" } });
  const days = box.createEl("div", { attr: { style: "display:flex;flex-direction:column;gap:3px;margin-right:4px;font-size:10px;color:var(--text-faint)" } });
  ["Mon", "", "Wed", "", "Fri", "", "Sun"].forEach(t => days.createEl("div", { text: t, attr: { style: "height:14px;line-height:14px" } }));
  const color = s => s === undefined ? "var(--background-modifier-border)" : s >= .8 ? "#216e39" : s >= .5 ? "#30a14e" : s > 0 ? "#9be9a8" : "var(--background-modifier-border)";
  const start = today.minus({ weeks: weeks - 1 }).startOf("week");
  for (let w = start; w <= today; w = w.plus({ weeks: 1 })) {
    const col = box.createEl("div", { attr: { style: "display:flex;flex-direction:column;gap:3px" } });
    for (let i = 0; i < 7; i++) {
      const day = w.plus({ days: i }); const s = map[key(day)];
      col.createEl("div", { attr: { title: `${day.toFormat("ccc d LLL")}: ${s === undefined ? "no note" : Math.round(s * 100) + "%"}`, style: `width:14px;height:14px;border-radius:3px;background:${day > today ? "transparent" : color(s)}` } });
    }
  }
  const lg = dv.el("div", "", { attr: { style: "display:flex;gap:6px;align-items:center;font-size:11px;color:var(--text-muted);margin-top:4px" } });
  lg.createEl("span", { text: "Less" });
  for (const c of ["var(--background-modifier-border)", "#9be9a8", "#30a14e", "#216e39"]) lg.createEl("span", { attr: { style: `display:inline-block;width:12px;height:12px;border-radius:3px;background:${c}` } });
  lg.createEl("span", { text: "More   ·   hover a square for the day's %" });
}

// ---------- hitrate: each habit this month vs last month (inline styles) ----------
else if (I.kind === "hitrate") {
  const all = dailies();
  const thisM = dv.date("today").toFormat("yyyy-MM"), lastM = dv.date("today").minus({ months: 1 }).toFormat("yyyy-MM");
  const inM = mm => all.where(p => p.date.toFormat("yyyy-MM") === mm);
  const cur = inM(thisM), prev = inM(lastM);
  const rate = (g, h) => g.length ? Math.round(g.where(p => p[h] === true).length / g.length * 100) : null;
  const wrap = dv.el("div", "", { attr: { style: "display:flex;flex-direction:column;gap:8px;margin:6px 0 12px;max-width:720px" } });
  const rows = HABITS.map(h => ({ h, r: rate(cur, h) ?? 0, p: rate(prev, h), n: cur.where(p => p[h] === true).length })).sort((a, b) => b.r - a.r);
  for (const { h, r, p, n } of rows) {
    const line = wrap.createEl("div", { attr: { style: "display:grid;grid-template-columns:110px 1fr 120px;gap:12px;align-items:center" } });
    line.createEl("div", { text: HLABEL[h], attr: { style: "font-weight:500" } });
    const track = line.createEl("div", { attr: { style: "height:10px;border-radius:5px;background:var(--background-modifier-border);overflow:hidden" } });
    track.createEl("div", { attr: { style: `height:100%;width:${r}%;border-radius:5px;background:${r >= 80 ? "#30a14e" : r >= 50 ? "#3282b8" : r > 0 ? "#d9730d" : "transparent"}` } });
    const delta = p === null ? "" : r > p ? ` ▲${r - p}` : r < p ? ` ▼${p - r}` : " =";
    const dc = p === null ? "" : r > p ? "#30a14e" : r < p ? "#d44c47" : "var(--text-muted)";
    const info = line.createEl("div", { attr: { style: "font-size:.85em;white-space:nowrap" } });
    info.createEl("span", { text: `${r}% · ${n}/${cur.length}d` });
    if (delta) info.createEl("span", { text: delta, attr: { style: `color:${dc};font-weight:600;margin-left:4px`, title: `Last month: ${p}%` } });
  }
  dv.el("div", `${dv.date("today").toFormat("LLLL")}: ${cur.length} day(s) logged. ▲/▼ = change vs last month.`, { attr: { style: "font-size:.8em;color:var(--text-muted)" } });
}

// ---------- trend: improvement graph (SVG, inline styles) ----------
else if (I.kind === "trend") {
  const map = {}; for (const p of dailies()) map[p.date.toFormat("yyyy-MM-dd")] = p;
  const today = dv.date("today");
  const first = Object.keys(map).sort()[0];
  const since = first ? Math.round(today.diff(dv.date(first), "days").days) + 1 : 1;
  const n = Math.min(I.days || 60, Math.max(14, since));
  const pts = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = today.minus({ days: i }); const p = map[d.toFormat("yyyy-MM-dd")];
    pts.push({ d, s: p ? score(p) * 100 : null, eng: p ? Number(p.english_minutes) || 0 : 0, hrs: p ? Number(p.study_hours) || 0 : 0 });
  }
  // 7-day rolling average (missing days count as 0)
  const roll = pts.map((_, i) => { const w = pts.slice(Math.max(0, i - 6), i + 1); return w.reduce((a, b) => a + (b.s ?? 0), 0) / w.length; });
  const W = 760, H = 230, L = 36, R = 12, T = 14, B = 28, iw = W - L - R, ih = H - T - B;
  const x = i => L + (n === 1 ? iw / 2 : i * iw / (n - 1)), y = v => T + ih - v / 100 * ih;
  let svg = `<svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:${W}px;display:block;font-family:inherit">`;
  for (const g of [0, 25, 50, 75, 100]) svg += `<line x1="${L}" x2="${W - R}" y1="${y(g)}" y2="${y(g)}" stroke="currentColor" stroke-opacity=".12"/><text x="${L - 6}" y="${y(g) + 4}" font-size="10" text-anchor="end" fill="currentColor" fill-opacity=".5">${g}%</text>`;
  const bw = Math.max(2, iw / n * .6);
  pts.forEach((p, i) => { if (p.s !== null) svg += `<rect x="${x(i) - bw / 2}" y="${y(p.s)}" width="${bw}" height="${Math.max(0, y(0) - y(p.s))}" rx="1.5" fill="#3282b8" fill-opacity=".35"><title>${p.d.toFormat("d LLL")}: ${Math.round(p.s)}%</title></rect>`; });
  svg += `<path d="${roll.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}" fill="none" stroke="#30a14e" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  const step = Math.ceil(n / 8);
  pts.forEach((p, i) => { if (i % step === 0 || i === n - 1) svg += `<text x="${x(i)}" y="${H - 8}" font-size="10" text-anchor="${i === n - 1 ? "end" : i === 0 ? "start" : "middle"}" fill="currentColor" fill-opacity=".5">${p.d.toFormat("d LLL")}</text>`; });
  svg += `</svg>`;
  const wk = (from) => { let s = 0; for (let i = 0; i < 7; i++) { const p = map[today.minus({ days: from + i }).toFormat("yyyy-MM-dd")]; s += p ? score(p) : 0; } return Math.round(s / 7 * 100); };
  const thisW = wk(0), lastW = wk(7), diff = thisW - lastW;
  const sum = (a, k, from, len) => a.slice(a.length - from - len, a.length - from).reduce((x, p) => x + p[k], 0);
  const engW = sum(pts, "eng", 0, 7), engP = sum(pts, "eng", 7, 7), hrsW = sum(pts, "hrs", 0, 7), hrsP = sum(pts, "hrs", 7, 7);
  const chip = (label, val, d, unit) => `<span style="display:inline-flex;gap:6px;align-items:baseline;padding:6px 12px;border-radius:8px;background:var(--background-secondary);border:1px solid var(--background-modifier-border)"><span style="font-size:.8em;color:var(--text-muted)">${label}</span><b>${val}${unit}</b><span style="font-size:.8em;font-weight:600;color:${d > 0 ? "#30a14e" : d < 0 ? "#d44c47" : "var(--text-muted)"}">${d > 0 ? "▲" + d : d < 0 ? "▼" + Math.abs(d) : "="}${unit}</span></span>`;
  const head = dv.el("div", "", { attr: { style: "display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 10px" } });
  head.innerHTML = chip("Habits this week", thisW, diff, "%") + chip("English this week", engW, engW - engP, " min") + chip("Study this week", Math.round(hrsW * 10) / 10, Math.round((hrsW - hrsP) * 10) / 10, " h");
  const box = dv.el("div", "", { attr: { style: "border:1px solid var(--background-modifier-border);border-radius:10px;padding:10px 12px;background:var(--background-secondary)" } });
  box.innerHTML = svg;
  dv.el("div", "", { attr: { style: "font-size:.8em;color:var(--text-muted);margin-top:6px" } }).innerHTML =
    `<span style="color:#3282b8">■</span> daily habit score &nbsp; <span style="color:#30a14e">━</span> 7-day average (your improvement line) &nbsp;·&nbsp; changes vs last week`;
}
