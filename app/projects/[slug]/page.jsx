import Link from "next/link";
import {notFound} from "next/navigation";
import {projects,getProject} from "../../../lib/projects";
export const dynamic="force-static";
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
function Arrow({back=false}){return <span className="arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d={back ? "M19 12H5M11 18l-6-6 6-6" : "M5 19L19 5M8 5H19V16"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
function getYoutubeId(v){
  if (v?.id && /^[A-Za-z0-9_-]{11}$/.test(v.id)) return v.id;
  const match = String(v?.url || "").match(/(?:v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
  return match?.[1] || "";
}
function getInstagramEmbed(v){
  if (v?.url) {
    const match = String(v.url).match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/i);
    if (match) return `https://www.instagram.com/${/\/reel\//i.test(v.url) ? "reel" : "p"}/${match[1]}/embed`;
  }
  return `https://www.instagram.com/reel/${v.id}/embed`;
}
function YT({v,i}){
  const id=getYoutubeId(v);
  if(!id) return null;
  return <article className="vcard"><div className="vframe"><iframe src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div><div className="vinfo"><small>{String(i+1).padStart(2,"0")} / YOUTUBE</small><h3>{v.title}</h3></div></article>
}
function IG({v,i}){return <article className="vcard igcard"><div className="igframe"><iframe src={getInstagramEmbed(v)} title={v.title} scrolling="no" allowTransparency allowFullScreen/></div><div className="vinfo"><small>{String(i+1).padStart(2,"0")} / INSTAGRAM</small><h3>{v.title}</h3></div></article>}
export default async function Page({params}){const {slug}=await params;const p=getProject(slug);if(!p)notFound();return <main><nav className="top"><div className="top-in"><Link href="/" className="logo">BESH<span>OY</span></Link><Link href="/#contact">CONTACT <Arrow /></Link></div></nav><header className="phead"><Link href="/" className="back"><Arrow back /> BACK TO WORK</Link><div className="pnum">{p.number}</div><span className="eyebrow">CASE STUDY</span><h1>{p.title}</h1><p>{p.description}</p></header>
<section className="behance-cover">
  <img src={p.cover} alt={`${p.title} project cover`} />
  <div><span>PROJECT COVER</span></div>
</section>
<section className="pmedia">{p.youtube.length>0&&<><div className="media-head"><span>YOUTUBE</span><b>{p.youtube.length} VIDEOS</b></div><div className="vgrid">{p.youtube.map((v,i)=><YT v={v} i={i} key={v.id}/>)}</div></>}{p.instagram.length>0&&<><div className="media-head second"><span>INSTAGRAM</span><b>{p.instagram.length} POSTS</b></div><div className="vgrid iggrid">{p.instagram.map((v,i)=><IG v={v} i={i} key={v.id}/>)}</div></>}</section><footer><Link href="/"><Arrow back /> ALL PROJECTS</Link><span>© 2026 BESHOY NASHAAT</span></footer></main>}
