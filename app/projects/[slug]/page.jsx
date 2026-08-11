import {notFound} from "next/navigation";
import Link from "next/link";
import {getProject,projects} from "../../../lib/projects";
import {scrapeProject} from "../../../lib/scrape";

export const dynamic="force-dynamic";
export async function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}

export default async function ProjectPage({params}){
 const p=getProject(params.slug); if(!p) notFound();
 let media=[], live=true, error="";
 try{media=await scrapeProject(p.behance)}catch(e){live=false;error=e.message}
 const yt=media.filter(x=>x.type==="youtube"), ig=media.filter(x=>x.type==="instagram");
 return <main><section className="wrap project-head"><Link className="back" href="/">← Back to work</Link><div className="kicker">Project</div><h1>{p.title}</h1><p>{p.description}</p></section><section className="wrap section">
 {!live&&<div className="empty">The project media could not be read from Behance during this request. The page is still ready; deploy it on Vercel and the server-side importer will retry automatically.</div>}
 {live&&media.length===0&&<div className="empty">No public YouTube/Instagram media URLs were exposed by Behance for this project. This is a Behance-side embed limitation, not a missing page.</div>}
 {yt.length>0&&<><h2>Videos</h2><div className="media-grid">{yt.map((m,i)=><div className="media" key={m.id}><iframe src={"https://www.youtube.com/embed/"+m.id+"?rel=0"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/><div className="label">Video {i+1}</div></div>)}</div></>}
 {ig.length>0&&<><h2 style={{marginTop:55}}>Reels</h2><div className="media-grid">{ig.map((m,i)=><div className="media instagram" key={m.id}><iframe src={"https://www.instagram.com/"+(m.kind||"reel")+"/"+m.id+"/embed"} scrolling="no" allowTransparency allowFullScreen/><div className="label">Reel {i+1}</div></div>)}</div></>}
 </section></main>
}