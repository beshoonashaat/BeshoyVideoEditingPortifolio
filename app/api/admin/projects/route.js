import { NextResponse } from "next/server";

const requiredEnv = ["ADMIN_PASSWORD", "GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"];

function auth(request, body) {
  const password = request.headers.get("x-admin-password") || body?.password;
  return password && password === process.env.ADMIN_PASSWORD;
}

function extractYoutubeId(url) {
  const match = String(url || "").match(
    /(?:v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return match?.[1] || "";
}

function extractInstagramId(url) {
  const match = String(url || "").match(
    /instagram\.com\/(?:reel|p)\/([^/?#]+)/i
  );
  return match?.[1] || "";
}

function cleanProject(project, index) {
  const slug = String(project.slug || project.title || `project-${Date.now()}`)
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const youtube = Array.isArray(project.youtube)
    ? project.youtube
        .map((video) => ({ ...video, id: extractYoutubeId(video.url) || video.id || "" }))
        .filter((video) => video.id)
    : [];

  const instagram = Array.isArray(project.instagram)
    ? project.instagram
        .map((post) => ({ ...post, id: extractInstagramId(post.url) || post.id || "" }))
        .filter((post) => post.id)
    : [];

  return {
    ...project,
    slug,
    number: String(index + 1).padStart(2, "0"),
    youtube,
    instagram,
  };
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
  const text = await response.text();
  let data = null;
  try { data = JSON.parse(text); } catch { data = { message: text }; }
  if (!response.ok) throw new Error(data?.message || `GitHub request failed (${response.status})`);
  return data;
}

async function upsertFile(path, content, message) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  let sha;
  try {
    const existing = await githubRequest(`/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`);
    sha = existing.sha;
  } catch (error) {
    if (!String(error.message).includes("Not Found")) throw error;
  }

  return githubRequest(`/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
}

async function youtubeTitle(url) {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return data.title || null;
  } catch {
    return null;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (!auth(request, body)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!requiredEnv.every((key) => process.env[key])) {
      return NextResponse.json({ error: "Admin storage is not configured. Add ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_OWNER and GITHUB_REPO in Vercel Environment Variables." }, { status: 500 });
    }

    let projects = Array.isArray(body.projects) ? body.projects.map((p, i) => cleanProject(p, i)) : [];

    for (const project of projects) {
      project.youtube = await Promise.all((project.youtube || []).map(async (video, i) => ({
        ...video,
        title: (await youtubeTitle(video.url)) || video.title || `${project.title} — Edit ${String(i + 1).padStart(2, "0")}`,
      })));
    }

    if (body.image?.base64 && body.image?.filename && body.image?.slug) {
      const safeExt = String(body.image.filename).split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const imagePath = `public/project-covers/${body.image.slug}.${safeExt}`;
      const imageBuffer = Buffer.from(body.image.base64.replace(/^data:[^;]+;base64,/, ""), "base64");
      await upsertFile(imagePath, imageBuffer, `Add cover for ${body.image.slug}`);
      const project = projects.find((p) => p.slug === body.image.slug);
      if (project) project.cover = `/${imagePath.replace(/^public\//, "")}`;
    }

    const json = JSON.stringify(projects, null, 2) + "\n";
    await upsertFile("data/projects.json", json, "Update portfolio projects");

    return NextResponse.json({ ok: true, projects, message: "Saved to GitHub. Vercel will redeploy automatically." });
  } catch (error) {
    return NextResponse.json({ error: error.message || "Failed to save projects" }, { status: 500 });
  }
}
