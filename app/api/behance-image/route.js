import { NextResponse } from "next/server";

export async function GET(req) {
  const page = req.nextUrl.searchParams.get("url");
  if (!page || !page.startsWith("https://www.behance.net/gallery/")) {
    return new NextResponse("Bad request", { status: 400 });
  }
  try {
    const res = await fetch(page, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 }
    });
    const html = await res.text();
    const matches = [
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i),
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i),
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i),
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i),
    ];
    const image = matches.find(Boolean)?.[1];
    if (!image) return new NextResponse("Not found", { status: 404 });
    return NextResponse.redirect(image.replaceAll("&amp;", "&"), 302);
  } catch {
    return new NextResponse("Failed to fetch Behance", { status: 502 });
  }
}