import Link from "next/link";
import {notFound} from "next/navigation";
import {projects,getProject} from "../../../lib/projects";
export const dynamic="force-static";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
function YouTubeCard({v,i}){return <article className="video-card"><div className="video-frame"><iframe src={`https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><div className="video-meta"><span>{String(i+1).padStart(2,"0")} / YOUTUBE</span><h3>{v.title}</h3></div></article>}
function InstagramCard({v,i}){return <article className="video-card ig-card"><div className="ig-frame"><iframe src={`https://www.instagram.com/p/${v.id}/embed`} title={v.title} scrolling="no" allowTransparency allowFullScreen/></div><div className="video-meta"><span>{String(i+1).padStart(2,"0")} / INSTAGRAM</span><h3>{v.title}</h3></div></article>}
function getInstagramEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.replace(/\/+$/, "");

    // Instagram posts
    if (pathname.startsWith("/p/")) {
      return `https://www.instagram.com${pathname}/embed`;
    }

    // Instagram Reels
    if (pathname.startsWith("/reel/")) {
      return `https://www.instagram.com${pathname}/embed`;
    }

    // Instagram Reels (alternate plural route)
    if (pathname.startsWith("/reels/")) {
      return `https://www.instagram.com${pathname}/embed`;
    }

    return null;
  } catch {
    return null;
  }
}

function IG({ v, i }) {
  const embedUrl = getInstagramEmbedUrl(v.url);

  return (
    <article className="vcard igcard">
      <div className="igframe">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={v.title}
            scrolling="no"
            allowTransparency
            allowFullScreen
          />
        ) : (
          <a
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-fallback"
          >
            OPEN ON INSTAGRAM ↗
          </a>
        )}
      </div>

      <div className="vinfo">
        <small>
          {String(i + 1).padStart(2, "0")} / INSTAGRAM
        </small>
        <h3>{v.title}</h3>
      </div>
    </article>
  );
}

export default async function Page({params}){const {slug}=await params;const p=getProject(slug);if(!p)notFound();return <main>
<header className="nav wrap"><Link href="/" className="brand">BESH<span>OY</span></Link><Link href="/#contact" className="navlink">Contact <b>↗</b></Link></header>
<section className="project-hero wrap"><Link href="/" className="back">← All projects</Link><div className="eyebrow">PROJECT / {p.slug.replaceAll("-"," ").toUpperCase()}</div><h1>{p.title}</h1><p>{p.description}</p></section>
<section className="wrap media-section">{p.youtube.length>0&&<><div className="section-head"><div><span className="eyebrow">YOUTUBE</span><h2>Video work</h2></div><span className="project-count">{String(p.youtube.length).padStart(2,"0")} VIDEOS</span></div><div className="video-grid">{p.youtube.map((v,i)=><YouTubeCard v={v} i={i} key={v.id}/>)}</div></>}{p.instagram.length>0&&<><div className="section-head ig-head"><div><span className="eyebrow">INSTAGRAM</span><h2>Social cuts</h2></div><span className="project-count">{String(p.instagram.length).padStart(2,"0")} POSTS</span></div><div className="video-grid ig-grid">{p.instagram.map((v,i)=><InstagramCard v={v} i={i} key={v.id}/>)}</div></>}</section>
<footer className="wrap footer"><Link href="/">← Back to portfolio</Link><span>© 2026 Beshoy Nashaat</span></footer>
</main>}