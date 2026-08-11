import { getProject } from "../../../../lib/projects";
import { scrapeProject } from "../../../../lib/scrape";

export async function GET(req, { params }) {
  const { slug } = await params;
  const p = getProject(slug);

  if (!p) return Response.json({ error: "Project not found" }, { status: 404 });

  try {
    const media = await scrapeProject(p.behance);
    return Response.json({ project: p, media, source: "live" });
  } catch (e) {
    return Response.json({
      project: p,
      media: [],
      source: "unavailable",
      error: e?.message || "Unable to read Behance"
    });
  }
}
