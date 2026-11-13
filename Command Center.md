---
type: dashboard
tags: [moc, home]
updated: 2026-11-11
cssclasses: [wide-page, nt-page, nt-cover]
---
graph a# 🎛️ Command Center

**Mission:** a funded PhD abroad (Fall 2028 intake). Everything you track, plan and study starts here.
Pin this tab, or set it as your homepage (Settings → Core plugins → Homepage).

```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "stats" })
```

## 📍 Today
```dataviewjs
// Each link creates the note from its template (or fills a blank one), then opens it.
const R = "obsidian/Life Tracker", m = window.moment;
const fill = s => s.replace(/\{\{date:([^}]+)\}\}/g, (_, f) => m().format(f)).replace(/\{\{date\}\}/g, m().format("YYYY-MM-DD")).replace(/\{\{title\}\}/g, "");
const LINKS = [
  { icon: "📝", label: "Today's note", path: `${R}/Daily/${m().format("YYYY/MM MMMM/YYYY-MM-DD")}.md`, tpl: `${R}/Templates/Daily Note.md` },
  { icon: "📅", label: "This week's plan", path: `${R}/Plans/Weekly/${m().format("GGGG-[W]WW")}.md`, tpl: `${R}/Templates/Weekly Plan.md` },
  { icon: "🗓️", label: "This month's plan", path: `${R}/Plans/Monthly/${m().format("YYYY-MM")}.md`, tpl: `${R}/Templates/Monthly Plan.md` },
];
async function openNote(l) {
  const t = app.vault.getAbstractFileByPath(l.tpl);
  const body = t ? fill(await app.vault.read(t)) : "";
  let f = app.vault.getAbstractFileByPath(l.path);
  if (!f) {
    const dir = l.path.split("/").slice(0, -1).join("/");
    { let acc = ""; for (const part of dir.split("/")) { acc = acc ? `${acc}/${part}` : part; if (!app.vault.getAbstractFileByPath(acc)) await app.vault.createFolder(acc); } }  // makes year + month folders
    f = await app.vault.create(l.path, body);
  } else if (!(await app.vault.read(f)).trim() && body) await app.vault.modify(f, body);
  await app.workspace.getLeaf(false).openFile(f);
}
const row = dv.el("p", "");
LINKS.forEach((l, i) => {
  if (i) row.appendText(" · ");
  row.appendText(l.icon + " ");
  const a = row.createEl("a", { text: l.label, href: "#", cls: "internal-link" });
  a.onclick = async e => { e.preventDefault(); try { await openNote(l); } catch (err) { new Notice("Could not open: " + err.message); } };
});
```

## 🗂️ Planner: add your to-dos here
> Type a task and press **Enter**. Today's list starts fresh every day, the weekly list every Monday, the monthly list on the 1st. Type a topic, paper or problem name to link it.

```dataviewjs
const ROOT = "obsidian/Life Tracker";
const m = window.moment;
const PLANS = [
  { title: "📝 Today", sub: m().format("dddd, D MMMM"), path: `${ROOT}/Daily/${m().format("YYYY/MM MMMM/YYYY-MM-DD")}.md`,
    heading: "## ✅ Today's to-do", template: `${ROOT}/Templates/Daily Note.md`, ph: "Add a task for today…" },
  { title: "📅 This week", sub: `Week ${m().isoWeek()} · ${m().startOf("isoWeek").format("D MMM")} – ${m().endOf("isoWeek").format("D MMM")}`,
    path: `${ROOT}/Plans/Weekly/${m().format("GGGG-[W]WW")}.md`, heading: "## 🎯 Plan",
    template: `${ROOT}/Templates/Weekly Plan.md`, ph: "Add a goal for this week…" },
  { title: "🗓️ This month", sub: m().format("MMMM YYYY"), path: `${ROOT}/Plans/Monthly/${m().format("YYYY-MM")}.md`,
    heading: "## 🎯 Plan", template: `${ROOT}/Templates/Monthly Plan.md`, ph: "Add a goal for this month…" },
];
const roadmapPages = dv.pages('"obsidian/AI-ML Roadmap/10 Topics"').where(t => t.type === "topic").concat(dv.pages('"obsidian/DSA Roadmap/10 Topics"').where(t => t.type === "topic")).sort(t => t.order, "asc");
const ROADMAP = new Set(roadmapPages.map(t => t.file.name).array());
const TOPICS = roadmapPages.map(t => ({ name: t.file.name, where: (t.phase_name || "Roadmap").replace(/^Phase (\d) - /, "P$1 · ") })).array()
  .concat(dv.pages(`"${ROOT}/Learning"`).map(t => ({ name: t.file.name, where: "Learning" })).array())
  .concat(dv.pages('"obsidian/AI-ML Roadmap/20 Papers"').map(t => ({ name: t.file.name, where: "Paper" })).array())
  .concat(dv.pages('"obsidian/DSA Roadmap/20 Problems"').map(t => ({ name: t.file.name, where: "DSA problem" })).array());
const STOP = new Set("the and for with from into this that what how why are was were has have had not but you your our all any can will about over under then than per via its off out own one two read learn study do did done finish make watch write work".split(" "));
const norm = s => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ");
const match = (name, q) => { const n = norm(name); return norm(q).split(" ").filter(Boolean).every(w => n.includes(w)); };
const fill = s => s.replace(/\{\{date:([^}]+)\}\}/g, (_, f) => m().format(f))
                   .replace(/\{\{date\}\}/g, m().format("YYYY-MM-DD"))
                   .replace(/\{\{title\}\}/g, "");
async function ensure(p) {
  let f = app.vault.getAbstractFileByPath(p.path);
  if (f) {
    if (!(await app.vault.read(f)).trim()) {            // blank note (e.g. created without template)
      const t = app.vault.getAbstractFileByPath(p.template);
      if (t) await app.vault.modify(f, fill(await app.vault.read(t)));
    }
    return f;
  }
  const dir = p.path.split("/").slice(0, -1).join("/");
  { let acc = ""; for (const part of dir.split("/")) { acc = acc ? `${acc}/${part}` : part; if (!app.vault.getAbstractFileByPath(acc)) await app.vault.createFolder(acc); } }  // makes year + month folders
  const t = app.vault.getAbstractFileByPath(p.template);
  const body = t ? fill(await app.vault.read(t)) : `${p.heading}\n`;
  return await app.vault.create(p.path, body);
}
async function addTask(p, text) {
  const f = await ensure(p);
  await app.vault.process(f, s => {
    const lines = s.split("\n");
    let h = lines.findIndex(l => l.trim() === p.heading);
    if (h < 0) { lines.push("", p.heading); h = lines.length - 1; }
    let end = lines.length;
    for (let i = h + 1; i < lines.length; i++) if (/^#{1,6} /.test(lines[i]) || /^---\s*$/.test(lines[i])) { end = i; break; }
    const empty = lines.findIndex((l, i) => i > h && i < end && /^\s*- \[ \]\s*$/.test(l));
    if (empty >= 0) lines[empty] = `- [ ] ${text}`;
    else {
      let last = h;
      for (let i = h + 1; i < end; i++) if (/^\s*- \[.\]/.test(lines[i])) last = i;
      lines.splice(last + 1, 0, `- [ ] ${text}`);
    }
    return lines.join("\n");
  });
}
const barHtml = (done, total) => {
  const pct = total ? Math.round(done / total * 100) : 0;
  return `<progress value="${done}" max="${Math.max(total, 1)}" style="width:140px;vertical-align:middle"></progress> ${done}/${total} done (${pct}%)`;
};
async function linkTopics(p, v) {
  const linked = [...v.matchAll(/\[\[([^\]|#]+)/g)].map(x => x[1]).filter(n => ROADMAP.has(n));
  if (linked.length) {
    const f = app.vault.getAbstractFileByPath(p.path);
    await app.fileManager.processFrontMatter(f, fm => {
      const cur = Array.isArray(fm.topics) ? fm.topics : (fm.topics ? [fm.topics] : []);
      for (const n of linked) if (!cur.includes(`[[${n}]]`)) cur.push(`[[${n}]]`);
      fm.topics = cur;
    });
  }
  return linked;
}
// ---- weekly/monthly → today ----
const FROM_RE = /\s*\[from:: (week|month)\]/;
const strip = s => s.replace(FROM_RE, "").replace(/\s+$/, "");
const SRC = { week: PLANS[1], month: PLANS[2] };
// sync: a pulled task ticked today → tick the original in the week/month plan
async function syncBack() {
  const td = dv.page(PLANS[0].path.replace(/\.md$/, ""));
  if (!td) return;
  for (const t of td.file.tasks.where(t => t.completed && FROM_RE.test(t.text))) {
    const kind = t.text.match(FROM_RE)[1], base = strip(t.text);
    const f = app.vault.getAbstractFileByPath(SRC[kind].path);
    if (!f) continue;
    const s = await app.vault.read(f);
    const lines = s.split("\n");
    const i = lines.findIndex(l => /^\s*- \[ \]/.test(l) && strip(l.replace(/^\s*- \[ \]\s*/, "")) === base);
    if (i >= 0) { lines[i] = lines[i].replace("- [ ]", "- [x]"); await app.vault.modify(f, lines.join("\n")); }
  }
}
await syncBack();
function renderPull() {
  const td = dv.page(PLANS[0].path.replace(/\.md$/, ""));
  const already = new Set(td ? td.file.tasks.map(t => strip(t.text)).array() : []);
  const rows = [];
  for (const kind of ["week", "month"]) {
    const pg = dv.page(SRC[kind].path.replace(/\.md$/, ""));
    if (!pg) continue;
    for (const t of pg.file.tasks.where(t => !t.completed && t.text.trim())) {
      const base = strip(t.text);
      if (!already.has(base)) rows.push({ kind, base });
    }
  }
  if (!rows.length) return;
  dv.paragraph(`<small><b>📌 Pull from your plan</b> · click ➕ to do it today. Ticking it in Today also ticks it in the weekly/monthly plan.</small>`);
  const box = dv.el("div", "", { attr: { style: "display:flex;flex-direction:column;gap:3px;margin:0 0 8px" } });
  for (const r of rows) {
    const line = box.createEl("div", { attr: { style: "display:flex;align-items:center;gap:8px" } });
    const b = line.createEl("button", { text: "➕ Today", attr: { style: "padding:1px 8px;font-size:12px" } });
    line.createEl("span", { text: r.kind === "week" ? "📅" : "🗓️", attr: { title: r.kind === "week" ? "This week's plan" : "This month's plan" } });
    line.createEl("span", { text: r.base.replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, "$1").replace(/\[(\w+):: ([^\]]+)\]/g, "($1 $2)") });
    b.onclick = async () => {
      b.disabled = true;
      try { await addTask(PLANS[0], `${r.base} [from:: ${r.kind}]`); await linkTopics(PLANS[0], r.base); new Notice("Added to today ✓"); line.remove(); }
      catch (e) { new Notice("Could not add: " + e.message); b.disabled = false; }
    };
  }
}
for (const p of PLANS) {
  dv.header(3, `${p.title} <small style="font-weight:normal;opacity:.7">· ${p.sub}</small>`);
  const page = dv.page(p.path.replace(/\.md$/, ""));
  const tasks = page ? page.file.tasks.where(t => t.text.trim()) : [];
  const total = tasks.length, done = page ? tasks.where(t => t.completed).length : 0;
  if (page) {
    dv.paragraph(`${barHtml(done, total)} · ${dv.fileLink(p.path, false, "open note")}`);
    if (total) dv.taskList(tasks, false); else dv.paragraph("<small>Nothing planned yet.</small>");
  } else {
    dv.paragraph("<small>Nothing planned yet. Add the first task below and the note is created for you.</small>");
  }
  if (p === PLANS[0]) renderPull();
  const wrap = dv.el("div", "", { attr: { style: "position:relative;margin:4px 0 14px" } });
  const row = wrap.createEl("div", { attr: { style: "display:flex;gap:6px" } });
  const inp = row.createEl("input", { type: "text", attr: { placeholder: p.ph + "  (type a topic name to link it)", style: "flex:1;padding:4px 8px" } });
  const btn = row.createEl("button", { text: "Add" });
  const sug = wrap.createEl("div", { attr: { style: "display:none;position:absolute;left:0;right:60px;top:100%;z-index:50;margin-top:2px;background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:6px;box-shadow:0 4px 14px rgba(0,0,0,.35);max-height:240px;overflow-y:auto" } });
  let items = [], sel = 0, frag = null;
  const close = () => { sug.style.display = "none"; items = []; frag = null; };
  const fragment = () => {
    const v = inp.value.slice(0, inp.selectionStart ?? inp.value.length);
    const b = v.lastIndexOf("[[");
    if (b >= 0 && !v.slice(b).includes("]]")) return { start: b, q: v.slice(b + 2) };
    const mm = v.match(/(\S+(?: \S+){0,2})$/);           // last 1-3 words
    if (!mm) return null;
    // try longest trailing phrase that matches something
    const words = mm[1].split(" ");
    for (let k = words.length; k >= 1; k--) {
      const q = words.slice(-k).join(" ");
      if (q.includes("]]") || q.includes("[[")) continue;
      const sig = q.split(" ").filter(w => w.length >= 3 && !STOP.has(w.toLowerCase()));
      if (!sig.length || q.length < 3) continue;
      if (TOPICS.some(t => match(t.name, q))) return { start: v.length - q.length, q };
    }
    return null;
  };
  const render = () => {
    frag = fragment();
    if (!frag) return close();
    items = TOPICS.filter(t => match(t.name, frag.q)).slice(0, 8);
    if (!items.length) return close();
    sel = Math.min(sel, items.length - 1);
    sug.empty();
    items.forEach((t, i) => {
      const it = sug.createEl("div", { attr: { style: `padding:5px 10px;cursor:pointer;display:flex;justify-content:space-between;gap:10px;${i === sel ? "background:var(--background-modifier-hover)" : ""}` } });
      it.createEl("span", { text: t.name });
      it.createEl("small", { text: t.where, attr: { style: "opacity:.6;white-space:nowrap" } });
      it.addEventListener("mousedown", e => { e.preventDefault(); pick(i); });
    });
    sug.style.display = "block";
  };
  const pick = i => {
    const t = items[i]; if (!t || !frag) return;
    const pos = inp.selectionStart ?? inp.value.length;
    const before = inp.value.slice(0, frag.start), after = inp.value.slice(pos);
    inp.value = `${before}[[${t.name}]] ${after.replace(/^\]\]\s*/, "")}`;
    const c = before.length + t.name.length + 5;
    inp.setSelectionRange(c, c); inp.focus(); close();
  };
  const go = async () => {
    const v = inp.value.trim(); if (!v) return;
    btn.disabled = true;
    try {
      await addTask(p, v);
      const linked = await linkTopics(p, v);
      inp.value = ""; close();
      new Notice(linked.length ? `Added ✓ (linked: ${linked.join(", ")})` : "Added ✓");
    } catch (e) { new Notice("Could not add: " + e.message); }
    btn.disabled = false;
  };
  btn.onclick = go;
  inp.addEventListener("input", () => { sel = 0; render(); });
  inp.addEventListener("blur", () => setTimeout(close, 150));
  inp.addEventListener("keydown", e => {
    const open = sug.style.display === "block" && items.length;
    if (open && e.key === "ArrowDown") { e.preventDefault(); sel = (sel + 1) % items.length; render(); }
    else if (open && e.key === "ArrowUp") { e.preventDefault(); sel = (sel - 1 + items.length) % items.length; render(); }
    else if (open && (e.key === "Enter" || e.key === "Tab")) { e.preventDefault(); pick(sel); }
    else if (open && e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "Enter") { e.preventDefault(); go(); }
  });
}
// carry-over
const today = dv.date("today");
const old = dv.pages(`"${ROOT}/Daily"`)
  .where(p => p.date && p.date < today && p.date >= today.minus({ days: 14 }))
  .file.tasks.where(t => !t.completed && t.text.trim());
if (old.length) {
  dv.header(4, `↩️ Unfinished from the last 14 days (${old.length})`);
  dv.paragraph("<small>Tick them here when done, or re-add the important ones to today.</small>");
  dv.taskList(old, true);
}
```

## ⏰ Due in the next 7 days (and overdue)
```dataview
TASK
WHERE !completed AND due AND due <= date(today) + dur(7 days)
SORT due ASC
LIMIT 40
```

## 🔥 Consistency
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "consistency", weeks: 16 })
```

## 🧩 Habit hit-rate (this month)
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "hitrate" })
```

## 😴 Sleep
```dataviewjs
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1);
const lineChart = (vals, labels, o) => {
  const W = 760, H = 230, L = 34, R = 14, T = 26, B = 26, n = vals.length;
  const x = i => n <= 1 ? (L + W - R) / 2 : L + i * (W - L - R) / (n - 1);
  const y = v => H - B - (Math.min(Math.max(v, 0), o.max) / o.max) * (H - T - B);
  const pts = vals.map((v, i) => [x(i), y(v)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  let g = "";
  for (let k = 0; k <= 4; k++) {
    const yy = T + k * (H - T - B) / 4;
    g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="rgba(125,211,252,.14)" stroke-dasharray="3 4"/>`;
    g += `<text x="${L - 6}" y="${yy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${(o.max * (1 - k / 4)).toFixed(o.max < 10 ? 1 : 0)}</text>`;
  }
  labels.forEach((lab, i) => { if (lab) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="#94a3b8">${lab}</text>`; });
  if (o.goal) g += `<line x1="${L}" x2="${W - R}" y1="${y(o.goal)}" y2="${y(o.goal)}" stroke="#fbbf24" stroke-dasharray="5 4" opacity=".75"/><text x="${W - R}" y="${y(o.goal) - 6}" text-anchor="end" font-size="10" fill="#fbbf24">${o.goal} ${o.unit} goal</text>`;
  const dots = pts.map((p, i) => vals[i] > 0 ? `<g><title>${labels[i] || ""}: ${fmt1(vals[i])} ${o.unit}</title><circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#e0f2fe"/><text x="${p[0]}" y="${p[1] - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="#e0f2fe">${fmt1(vals[i])}</text></g>` : "").join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">${g}<path d="${d}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px ${o.color})"/>${dots}</svg>`;
};
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const hrs = p => Number(p.sleep_hours) || 0;
const today = dv.date("today");
const avg = (a, b) => { const xs = days.where(p => p.date >= a && p.date <= b).array().map(hrs).filter(h => h > 0); return xs.length ? { v: xs.reduce((s, h) => s + h, 0) / xs.length, n: xs.length } : null; };
const fmtH = h => { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return `${hh}h ${String(mm).padStart(2, "0")}m`; };
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const last = days.where(p => p.date <= today).array().filter(p => hrs(p) > 0).slice(-1)[0];
const aw = avg(weekStart, today), am = avg(monthStart, today);
const cards = [
  ["Last night", last ? fmtH(hrs(last)) : "—", last ? (hrs(last) >= 7 ? "✅ 7h+ goal met" : "below 7h goal") : "no entry yet"],
  ["Avg this week", aw ? fmtH(aw.v) : "—", aw ? `${aw.n} nights logged` : "no entries"],
  ["Avg this month", am ? fmtH(am.v) : "—", am ? `${am.n} nights logged` : "no entries"],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, big, sub] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #7dd3fc" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: big, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: sub, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = hrs(p);
dv.paragraph("<b>Last 30 nights</b> <small style=\"opacity:.6\">· hours slept</small>");
const N = 30, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = today.minus({ days: N - 1 - i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(i % 5 === 0 || i === N - 1 ? d.toFormat("dd LLL") : "");
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(9, ...vals) * 1.05, goal: 7, unit: "h", color: "#7dd3fc" });
dv.paragraph("<small>Enter <code>sleep_hours</code> in a day's Properties (for example <code>7.5</code>). Hover a point for its date.</small>");
```

## 📚 Study hours
```dataviewjs
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1);
const lineChart = (vals, labels, o) => {
  const W = 760, H = 230, L = 34, R = 14, T = 26, B = 26, n = vals.length;
  const x = i => n <= 1 ? (L + W - R) / 2 : L + i * (W - L - R) / (n - 1);
  const y = v => H - B - (Math.min(Math.max(v, 0), o.max) / o.max) * (H - T - B);
  const pts = vals.map((v, i) => [x(i), y(v)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  let g = "";
  for (let k = 0; k <= 4; k++) {
    const yy = T + k * (H - T - B) / 4;
    g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="rgba(125,211,252,.14)" stroke-dasharray="3 4"/>`;
    g += `<text x="${L - 6}" y="${yy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${(o.max * (1 - k / 4)).toFixed(o.max < 10 ? 1 : 0)}</text>`;
  }
  labels.forEach((lab, i) => { if (lab) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="#94a3b8">${lab}</text>`; });
  if (o.goal) g += `<line x1="${L}" x2="${W - R}" y1="${y(o.goal)}" y2="${y(o.goal)}" stroke="#fbbf24" stroke-dasharray="5 4" opacity=".75"/><text x="${W - R}" y="${y(o.goal) - 6}" text-anchor="end" font-size="10" fill="#fbbf24">${o.goal} ${o.unit} goal</text>`;
  const dots = pts.map((p, i) => vals[i] > 0 ? `<g><title>${labels[i] || ""}: ${fmt1(vals[i])} ${o.unit}</title><circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#e0f2fe"/><text x="${p[0]}" y="${p[1] - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="#e0f2fe">${fmt1(vals[i])}</text></g>` : "").join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">${g}<path d="${d}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px ${o.color})"/>${dots}</svg>`;
};
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const hrs = p => Number(p.study_hours) || 0;
const today = dv.date("today");
const sum = (a, b) => days.where(p => p.date >= a && p.date <= b).array().reduce((s, p) => s + hrs(p), 0);
const logged = (a, b) => days.where(p => p.date >= a && p.date <= b).array().filter(p => hrs(p) > 0);
const f1 = n => (Math.round(n * 10) / 10).toFixed(1);
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const mLog = logged(monthStart, today);
const mAvg = mLog.length ? mLog.reduce((s, p) => s + hrs(p), 0) / mLog.length : 0;
const cards = [
  ["This week", `${f1(sum(weekStart, today))} h`, "total study time"],
  ["This month", `${f1(sum(monthStart, today))} h`, "total study time"],
  ["Avg per study day", `${f1(mAvg)} h`, `${mLog.length} day(s) logged this month`],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, big, sub] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #86efac" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: big, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: sub, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = hrs(p);
dv.paragraph("<b>This month</b> <small style=\"opacity:.6\">· hours studied per day</small>");
const N = today.daysInMonth, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = monthStart.plus({ days: i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(String(i + 1));
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(4, ...vals) * 1.1, unit: "h", color: "#86efac" });
dv.paragraph("<small>Enter <code>study_hours</code> in a day's Properties (for example <code>2.5</code>). Hover a point for its value.</small>");
```

## 🏃 Running
```dataviewjs
const fmt1 = v => (Math.round(v * 10) / 10).toFixed(1);
const lineChart = (vals, labels, o) => {
  const W = 760, H = 230, L = 34, R = 14, T = 26, B = 26, n = vals.length;
  const x = i => n <= 1 ? (L + W - R) / 2 : L + i * (W - L - R) / (n - 1);
  const y = v => H - B - (Math.min(Math.max(v, 0), o.max) / o.max) * (H - T - B);
  const pts = vals.map((v, i) => [x(i), y(v)]);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  let g = "";
  for (let k = 0; k <= 4; k++) {
    const yy = T + k * (H - T - B) / 4;
    g += `<line x1="${L}" x2="${W - R}" y1="${yy}" y2="${yy}" stroke="rgba(125,211,252,.14)" stroke-dasharray="3 4"/>`;
    g += `<text x="${L - 6}" y="${yy + 4}" text-anchor="end" font-size="10" fill="#94a3b8">${(o.max * (1 - k / 4)).toFixed(o.max < 10 ? 1 : 0)}</text>`;
  }
  labels.forEach((lab, i) => { if (lab) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle" font-size="10" fill="#94a3b8">${lab}</text>`; });
  if (o.goal) g += `<line x1="${L}" x2="${W - R}" y1="${y(o.goal)}" y2="${y(o.goal)}" stroke="#fbbf24" stroke-dasharray="5 4" opacity=".75"/><text x="${W - R}" y="${y(o.goal) - 6}" text-anchor="end" font-size="10" fill="#fbbf24">${o.goal} ${o.unit} goal</text>`;
  const dots = pts.map((p, i) => vals[i] > 0 ? `<g><title>${labels[i] || ""}: ${fmt1(vals[i])} ${o.unit}</title><circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#e0f2fe"/><text x="${p[0]}" y="${p[1] - 9}" text-anchor="middle" font-size="10" font-weight="600" fill="#e0f2fe">${fmt1(vals[i])}</text></g>` : "").join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;overflow:visible">${g}<path d="${d}" fill="none" stroke="${o.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px ${o.color})"/>${dots}</svg>`;
};
const days = dv.pages('"obsidian/Life Tracker/Daily"').where(p => p.date).sort(p => p.date, "asc");
const km = p => Number(p.running_km) || 0;
const mins = p => Number(p.running_min) || 0;
const today = dv.date("today");
const sum = (a, b, f) => days.where(p => p.date >= a && p.date <= b).array().reduce((s, p) => s + f(p), 0);
const fmtT = n => { const h = Math.floor(n / 60), m = Math.round(n % 60); return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`; };
const pace = (k, mn) => { if (!(k > 0 && mn > 0)) return "no pace yet"; const s = Math.round(mn / k * 60); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")} /km`; };
const weekStart = today.minus({ days: (today.weekday + 6) % 7 });
const monthStart = today.startOf("month");
const cards = [
  ["This week", sum(weekStart, today, km), sum(weekStart, today, mins)],
  ["This month", sum(monthStart, today, km), sum(monthStart, today, mins)],
  ["All time", days.array().reduce((s, p) => s + km(p), 0), days.array().reduce((s, p) => s + mins(p), 0)],
];
const wrap = dv.el("div", "", { attr: { style: "display:flex;gap:10px;flex-wrap:wrap;margin:6px 0 16px" } });
for (const [label, k, mn] of cards) {
  const c = wrap.createEl("div", { attr: { style: "flex:1;min-width:150px;background:var(--background-secondary);border-radius:12px;padding:12px 14px;border-left:4px solid #7dd3fc" } });
  c.createEl("div", { text: label, attr: { style: "font-size:11px;opacity:.6;text-transform:uppercase;letter-spacing:.06em" } });
  c.createEl("div", { text: `${(Math.round(k * 10) / 10).toFixed(1)} km`, attr: { style: "font-size:24px;font-weight:700;margin-top:2px" } });
  c.createEl("div", { text: `⏱ ${fmtT(mn)}  ·  ⚡ ${pace(k, mn)}`, attr: { style: "font-size:12px;opacity:.75;margin-top:2px" } });
}
const byDay = {}; for (const p of days) byDay[p.date.toFormat("yyyy-MM-dd")] = km(p);
dv.paragraph("<b>This month</b> <small style=\"opacity:.6\">· km per day</small>");
const N = today.daysInMonth, vals = [], labels = [];
for (let i = 0; i < N; i++) {
  const d = monthStart.plus({ days: i });
  vals.push(byDay[d.toFormat("yyyy-MM-dd")] ?? 0);
  labels.push(String(i + 1));
}
const host = dv.el("div", "", { attr: { style: "margin:0 0 6px" } });
host.innerHTML = lineChart(vals, labels, { max: Math.max(5, ...vals) * 1.1, goal: 5, unit: "km", color: "#7dd3fc" });
dv.paragraph("<small>Enter <code>running_km</code> (distance) and <code>running_min</code> (time) in a day's Properties. Pace is calculated automatically.</small>");
```

## 📊 Improvement graph
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "trend", days: 60 })
```

## 📊 Habits, last 7 days
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "habits", days: 7 })
```
Full month view: [[📅 Monthly Tracker]]

## 🧭 Roadmaps
**DSA: problems by phase** · [[DSA Roadmap Home]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "phases", roadmap: "dsa" })
```

**AI-ML: topics by phase** · [[AI-ML Roadmap Home]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "phases", roadmap: "aiml" })
```

## 🎯 Goals
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "cards", type: "goal" })
```

## 📚 Learning
Hours and status for every learning item: [[Learning Hub]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Learning"', type: "learning", sort: "status", cols: [["Topic","file","link"],["Area","area","area"],["Status","status","pill"],["Hours","hours","hours"]] })
```

## 🎓 Applications and research
**Internships and universities** · [[Applications]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Applications"', type: ["internship","university"], cols: [["Item","file","link"],["Type","type","pill"],["Status","status","pill"],["Deadline","deadline","date"],["Follow up","follow_up","date"]] })
```

**Research pipeline** · [[Research Pipeline]]
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "table", source: '"obsidian/Life Tracker/Research"', type: "research", cols: [["Project","file","link"],["Stage","stage","pill"],["Topics","topics","pill"],["Venue","venue","text"],["Deadline","deadline","date"],["Next step","next_step","text"]] })
```

## 🗓️ Recent plans
**Weekly:**
```dataview
LIST FROM "obsidian/Life Tracker/Plans/Weekly" SORT file.name DESC LIMIT 6
```
**Monthly:**
```dataview
LIST FROM "obsidian/Life Tracker/Plans/Monthly" SORT file.name DESC LIMIT 6
```

## 🧭 Navigate
```dataviewjs
await dv.view("obsidian/Life Tracker/_views/nt", { kind: "nav", items: [
  { icon: "📅", page: "📅 Monthly Tracker", name: "Monthly Tracker", desc: "Consistency by month" },
  { icon: "🏠", page: "🏠 Home", name: "Life Tracker Home", desc: "Heatmap, streak, charts" },
  { icon: "📥", page: "Task Inbox", name: "Task Inbox", desc: "To-dos with due dates" },
  { icon: "🧩", page: "DSA Roadmap Home", name: "DSA Roadmap", desc: "Problems by phase" },
  { icon: "🤖", page: "AI-ML Roadmap Home", name: "AI-ML Roadmap", desc: "Topics by phase" },
  { icon: "🗺️", page: "PhD Roadmap", name: "PhD Roadmap", desc: "Timeline & checklist" },
  { icon: "🔬", page: "Research Pipeline", name: "Research", desc: "Papers & ideas" },
  { icon: "🎓", page: "Applications", name: "Applications", desc: "Universities & internships" },
  { icon: "📚", page: "Learning Hub", name: "Learning Hub", desc: "Topics & hours" },
  { icon: "🗣️", page: "English Hub", name: "English Hub", desc: "IELTS practice" },
  { icon: "❓", page: "README - Start Here", name: "Help", desc: "How to use" },
] })
```

- **Roadmaps:** [[DSA Roadmap Home]] · [[AI-ML Roadmap Home]] · [[How to Use the DSA Roadmap]]
- **Life tracker:** [[🏠 Home]] · [[📅 Monthly Tracker]] · [[Task Inbox]] · [[PhD Roadmap]] · [[Learning Hub]] · [[English Hub]] · [[Research Pipeline]] · [[Applications]]
- **Help:** [[README - Start Here]]
