"use client";

import { useMemo, useState } from "react";
import { projects as initialProjects } from "../../lib/projects";

const emptyForm = { title: "", behance: "", description: "Video editing · Motion design · Social content", youtube: "", instagram: "" };

function parseMessage(text) {
  const lines = text.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const project = { ...emptyForm, youtube: [], instagram: [] };
  let section = "";
  for (const line of lines) {
    const match = line.match(/^Project Name:\s*(.*)$/i);
    if (match) { project.title = match[1]; }
    if (/^Project URL:?$/i.test(line)) { section = "behance"; }
    if (/^YouTube:?$/i.test(line)) { section = "youtube"; continue; }
    if (/^Instagram Reels:?$/i.test(line)) { section = "instagram"; continue; }
    const urlMatch = line.match(/https?:\/\/[^\s)\]]+/i);
    if (urlMatch) {
      const url = urlMatch[0];
      if (section === "behance") project.behance = url;
      if (section === "youtube" && !/PASTE_/i.test(url)) project.youtube.push(url);
      if (section === "instagram" && !/PASTE_/i.test(url)) project.instagram.push(url);
    }
  }
  return project;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState(initialProjects);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const parsed = useMemo(() => parseMessage(message), [message]);

  function addProject() {
    if (!parsed.title) return setNotice("اكتب Project Name الأول.");
    if (!parsed.behance) parsed.behance = `https://www.behance.net/gallery/238045891/Ashab-El-Sa3ada-`;
    const slug = parsed.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const youtube = parsed.youtube.map((url, i) => ({ id: crypto.randomUUID(), title: `${parsed.title} — Edit ${String(i + 1).padStart(2, "0")}`, url }));
    const instagram = parsed.instagram.map((url, i) => ({ id: crypto.randomUUID(), title: `${parsed.title} — Reel ${String(i + 1).padStart(2, "0")}`, url }));
    setProjects((prev) => {
      const next = prev.filter((item) => item.slug !== slug);
      return [...next, { slug, title: parsed.title, number: "", description: parsed.description, cover: "", behance: parsed.behance, youtube, instagram }];
    });
    setNotice(`تم تجهيز ${parsed.title}`);
  }

  function move(index, direction) {
    setProjects((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function save() {
    if (!password) return setNotice("اكتب باسورد الأدمن.");
    if (!projects.length) return setNotice("مفيش Projects للحفظ.");
    setLoading(true); setNotice("");
    try {
      const payload = { password, projects, image: image ? { ...image, slug: projects.at(-1)?.slug } : null };
      const res = await fetch("/api/admin/projects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setProjects(data.projects);
      setNotice("اتحفظت على GitHub. Vercel هيعمل Deploy تلقائي.");
    } catch (error) { setNotice(error.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <div className="admin-head"><div><span className="eyebrow lime">BESHOY NASHAAT — ADMIN</span><h1>Manage Projects.</h1><p>Add projects, upload covers, and reorder your portfolio.</p></div><a href="/">VIEW PORTFOLIO ↗</a></div>
        <section className="admin-card">
          <label>ADMIN PASSWORD<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /></label>
          <label>PROJECT MESSAGE<textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Project Name:\nSha2a 11\n\nProject URL:\nhttps://www.behance.net/...\n\nYouTube\nhttps://youtube.com/...\n\nInstagram Reels\nhttps://www.instagram.com/reel/...`} /></label>
          <label>PROJECT COVER<input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ? { filename: e.target.files[0].name, base64: null } : null)} /></label>
          {image?.filename && <p className="file-note">Selected: {image.filename} — اختر الصورة قبل الحفظ.</p>}
          <button className="primary" onClick={async () => {
            const file = document.querySelector('input[type="file"]')?.files?.[0];
            if (!file) return addProject();
            const reader = new FileReader();
            reader.onload = () => {
              const parsedProject = parseMessage(message);
              const slug = parsedProject.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              setImage({ filename: file.name, base64: reader.result, slug });
              addProject();
            };
            reader.readAsDataURL(file);
          }}>ADD PROJECT TO LIST</button>
        </section>
        <section className="admin-card"><div className="list-head"><h2>Projects order</h2><span>{projects.length} projects</span></div>
          {projects.length === 0 ? <p className="empty">Paste a project message above and add it to the list.</p> : projects.map((p, i) => <div className="admin-project" key={p.slug}><div><b>{String(i + 1).padStart(2, "0")} — {p.title}</b><small>{p.youtube.length} YouTube · {p.instagram.length} Instagram</small></div><div className="move"><button onClick={() => move(i, -1)} disabled={i === 0}>↑</button><button onClick={() => move(i, 1)} disabled={i === projects.length - 1}>↓</button></div></div>)}
          <button className="primary save" onClick={save} disabled={loading}>{loading ? "SAVING..." : "SAVE TO GITHUB"}</button>
          {notice && <p className="notice">{notice}</p>}
        </section>
      </div>
    </main>
  );
}
