"use client";

import { useMemo, useState } from "react";
import { projects as initialProjects } from "../../lib/projects";

const emptyForm = {
  title: "",
  behance: "",
  description: "Video editing · Motion design · Social content",
  youtube: "",
  instagram: "",
};

function cleanUrl(line) {
  // Markdown:
  // [https://youtube.com/xxx](https://youtube.com/xxx)
  const markdownMatch = line.match(
    /\]\((https?:\/\/[^)]+)\)/
  );

  if (markdownMatch) {
    return markdownMatch[1].trim();
  }

  // Normal URL
  const normalMatch = line.match(
    /https?:\/\/[^\s)\]]+/i
  );

  if (normalMatch) {
    return normalMatch[0].trim();
  }

  return null;
}

function parseMessage(text) {
  const lines = text
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);

  const project = {
    ...emptyForm,
    youtube: [],
    instagram: [],
  };

  let section = "";
  let waitingForProjectName = false;

  for (const line of lines) {
    /*
     * PROJECT NAME
     *
     * Supports:
     *
     * Project Name: Esndny
     *
     * OR:
     *
     * Project Name:
     * Esndny
     */

    const inlineName = line.match(
      /^Project Name:\s*(.+)$/i
    );

    if (inlineName) {
      project.title = inlineName[1].trim();
      waitingForProjectName = false;
      section = "";
      continue;
    }

    if (/^Project Name:?$/i.test(line)) {
      waitingForProjectName = true;
      section = "";
      continue;
    }

    if (waitingForProjectName) {
      project.title = line;
      waitingForProjectName = false;
      continue;
    }

    /*
     * BEHANCE / PROJECT URL
     *
     * OPTIONAL
     */

    if (/^Project URL:?$/i.test(line)) {
      section = "behance";
      continue;
    }

    /*
     * YOUTUBE
     */

    if (/^YouTube:?$/i.test(line)) {
      section = "youtube";
      continue;
    }

    /*
     * INSTAGRAM
     */

    if (/^Instagram Reels:?$/i.test(line)) {
      section = "instagram";
      continue;
    }

    /*
     * URL
     */

    const url = cleanUrl(line);

    if (!url) {
      continue;
    }

    /*
     * Behance
     */

    if (section === "behance") {
      project.behance = url;
      continue;
    }

    /*
     * YouTube
     */

    if (
      section === "youtube" &&
      !/PASTE_/i.test(url)
    ) {
      project.youtube.push(url);
      continue;
    }

    /*
     * Instagram
     */

    if (
      section === "instagram" &&
      !/PASTE_/i.test(url)
    ) {
      project.instagram.push(url);
      continue;
    }
  }

  return project;
}

function getYoutubeId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    /*
     * https://www.youtube.com/watch?v=ABC123
     */

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname === "/watch"
    ) {
      return parsed.searchParams.get("v");
    }

    /*
     * https://youtu.be/ABC123
     */

    if (
      parsed.hostname === "youtu.be"
    ) {
      return parsed.pathname
        .replace("/", "")
        .split("?")[0];
    }

    /*
     * https://www.youtube.com/embed/ABC123
     */

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.startsWith("/embed/")
    ) {
      return parsed.pathname
        .replace("/embed/", "")
        .split("?")[0];
    }

    /*
     * https://www.youtube.com/shorts/ABC123
     */

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.startsWith("/shorts/")
    ) {
      return parsed.pathname
        .replace("/shorts/", "")
        .split("?")[0];
    }

    return null;
  } catch {
    return null;
  }
}

function normalizeYoutubeUrl(url) {
  const id = getYoutubeId(url);

  if (!id) {
    return url;
  }

  return `https://www.youtube.com/watch?v=${id}`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [projects, setProjects] =
    useState(initialProjects);

  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const parsed = useMemo(
    () => parseMessage(message),
    [message]
  );

  function createSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function addProject() {
    /*
     * Behance is NOT required.
     * Only Project Name is required.
     */

    if (!parsed.title) {
      setNotice("اكتب Project Name الأول.");
      return false;
    }

    const slug = createSlug(parsed.title);

    /*
     * Normalize YouTube URLs
     */

    const youtube = parsed.youtube
      .map(normalizeYoutubeUrl)
      .filter(Boolean)
      .map((url, i) => ({
        id: crypto.randomUUID(),
        title: `${parsed.title} — Edit ${String(
          i + 1
        ).padStart(2, "0")}`,
        url,
      }));

    /*
     * Instagram
     */

    const instagram = parsed.instagram.map(
      (url, i) => ({
        id: crypto.randomUUID(),
        title: `${parsed.title} — Reel ${String(
          i + 1
        ).padStart(2, "0")}`,
        url,
      })
    );

    const newProject = {
      slug,
      title: parsed.title,
      number: "",
      description: parsed.description,
      cover: "",

      /*
       * Behance is optional.
       */

      behance: parsed.behance || "",

      youtube,
      instagram,
    };

    setProjects((prev) => {
      const next = prev.filter(
        (item) => item.slug !== slug
      );

      return [...next, newProject];
    });

    setNotice(
      `تم تجهيز ${parsed.title}`
    );

    return true;
  }

  function move(index, direction) {
    setProjects((prev) => {
      const next = [...prev];

      const target =
        index + direction;

      if (
        target < 0 ||
        target >= next.length
      ) {
        return prev;
      }

      [
        next[index],
        next[target],
      ] = [
        next[target],
        next[index],
      ];

      return next;
    });
  }

  async function save() {
    if (!password) {
      setNotice(
        "اكتب باسورد الأدمن."
      );
      return;
    }

    if (!projects.length) {
      setNotice(
        "مفيش Projects للحفظ."
      );
      return;
    }

    setLoading(true);
    setNotice("");

    try {
      const payload = {
        password,
        projects,
        image: image
          ? {
              ...image,
              slug:
                image.slug ||
                projects.at(-1)?.slug,
            }
          : null,
      };

      const res = await fetch(
        "/api/admin/projects",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "Save failed"
        );
      }

      setProjects(
        data.projects
      );

      setNotice(
        "اتحفظت على GitHub. Vercel هيعمل Deploy تلقائي."
      );

      setImage(null);
    } catch (error) {
      setNotice(
        error?.message ||
          "حصل خطأ أثناء الحفظ."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProject() {
    const file =
      document.querySelector(
        'input[type="file"]'
      )?.files?.[0];

    /*
     * No cover
     */

    if (!file) {
      addProject();
      return;
    }

    /*
     * With cover
     */

    const parsedProject =
      parseMessage(message);

    if (!parsedProject.title) {
      setNotice(
        "اكتب Project Name الأول."
      );
      return;
    }

    const slug =
      createSlug(
        parsedProject.title
      );

    const reader =
      new FileReader();

    reader.onload = () => {
      setImage({
        filename: file.name,
        base64: reader.result,
        slug,
      });

      addProject();
    };

    reader.onerror = () => {
      setNotice(
        "حصل خطأ في قراءة الصورة."
      );
    };

    reader.readAsDataURL(file);
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">

        {/* HEADER */}

        <div className="admin-head">
          <div>
            <span className="eyebrow lime">
              BESHOY NASHAAT — ADMIN
            </span>

            <h1>
              Manage Projects.
            </h1>

            <p>
              Add projects, upload covers,
              and reorder your portfolio.
            </p>
          </div>

          <a href="/">
            VIEW PORTFOLIO ↗
          </a>
        </div>

        {/* ADD PROJECT */}

        <section className="admin-card">

          <label>
            ADMIN PASSWORD

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
            />
          </label>

          <label>
            PROJECT MESSAGE

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder={`Project Name:
Esndny

Project URL: (Optional)
https://www.behance.net/...

YouTube
https://www.youtube.com/watch?v=...
https://youtu.be/...

Instagram Reels
https://www.instagram.com/reel/...`}
            />
          </label>

          <label>
            PROJECT COVER

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file =
                  e.target.files?.[0];

                setImage(
                  file
                    ? {
                        filename:
                          file.name,
                        base64: null,
                      }
                    : null
                );
              }}
            />
          </label>

          {image?.filename && (
            <p className="file-note">
              Selected:{" "}
              {image.filename}
              {" — "}
              اختر الصورة قبل الحفظ.
            </p>
          )}

          <button
            className="primary"
            onClick={
              handleAddProject
            }
          >
            ADD PROJECT TO LIST
          </button>

        </section>

        {/* PROJECTS LIST */}

        <section className="admin-card">

          <div className="list-head">
            <h2>
              Projects order
            </h2>

            <span>
              {projects.length} projects
            </span>
          </div>

          {projects.length === 0 ? (
            <p className="empty">
              Paste a project message
              above and add it to the
              list.
            </p>
          ) : (
            projects.map(
              (p, i) => (
                <div
                  className="admin-project"
                  key={p.slug}
                >

                  <div>
                    <b>
                      {String(i + 1).padStart(
                        2,
                        "0"
                      )}
                      {" — "}
                      {p.title}
                    </b>

                    <small>
                      {p.youtube?.length ||
                        0}{" "}
                      YouTube ·{" "}
                      {p.instagram
                        ?.length || 0}{" "}
                      Instagram
                      {p.behance
                        ? " · Behance"
                        : ""}
                    </small>
                  </div>

                  <div className="move">

                    <button
                      onClick={() =>
                        move(i, -1)
                      }
                      disabled={
                        i === 0
                      }
                    >
                      ↑
                    </button>

                    <button
                      onClick={() =>
                        move(i, 1)
                      }
                      disabled={
                        i ===
                        projects.length -
                          1
                      }
                    >
                      ↓
                    </button>

                  </div>

                </div>
              )
            )
          )}

          {/* SAVE */}

          <button
            className="primary save"
            onClick={save}
            disabled={loading}
          >
            {loading
              ? "SAVING..."
              : "SAVE TO GITHUB"}
          </button>

          {notice && (
            <p className="notice">
              {notice}
            </p>
          )}

        </section>

      </div>
    </main>
  );
}

