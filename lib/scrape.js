import * as cheerio from "cheerio";

function normalize(u) {
  if (!u) return null;
  try {
    const x = new URL(u);

    if (x.hostname.includes("youtube.com") || x.hostname === "youtu.be") {
      let id = x.searchParams.get("v");
      if (!id && x.pathname.startsWith("/embed/")) id = x.pathname.split("/")[2];
      if (!id && x.hostname === "youtu.be") id = x.pathname.slice(1).split("/")[0];
      return id ? { type: "youtube", id } : null;
    }

    if (x.hostname.includes("instagram.com")) {
      const m = x.pathname.match(/\/(reel|p|tv)\/([^/?#]+)/);
      return m ? { type: "instagram", id: m[2], kind: m[1] } : null;
    }
  } catch {}
  return null;
}

export async function scrapeProject(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; BeshoyPortfolio/1.0)",
      "Accept": "text/html,application/xhtml+xml"
    },
    cache: "no-store"
  });

  if (!res.ok) throw new Error("Behance returned " + res.status);

  const html = await res.text();
  const $ = cheerio.load(html);
  const found = [];

  const add = (item) => {
    if (item && !found.some(x => x.type === item.type && x.id === item.id)) {
      found.push(item);
    }
  };

  $("a[href], iframe[src], video[src]").each((_, el) => {
    add(normalize($(el).attr("href") || $(el).attr("src")));
  });

  // Behance may keep embed URLs inside JSON/script data.
  const patterns = [
    /https?:\\?\/\\?\/(?:www\.)?youtube(?:-nocookie)?\.com\\?\/(?:embed\\?\/|watch\?v=)([A-Za-z0-9_-]{6,})/g,
    /https?:\\?\/\\?\/(?:www\.)?youtu\.be\\?\/([A-Za-z0-9_-]{6,})/g,
    /https?:\\?\/\\?\/(?:www\.)?instagram\.com\\?\/(?:reel|p|tv)\\?\/([A-Za-z0-9_-]+)/g
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const type = re.source.includes("instagram") ? "instagram" : "youtube";
      add({ type, id: m[1], kind: type === "instagram" ? "reel" : undefined });
    }
  }

  return found;
}
