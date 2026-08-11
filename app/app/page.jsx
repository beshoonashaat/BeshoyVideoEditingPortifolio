import Link from "next/link";
import {projects} from "../lib/projects";

const socials=[
  {label:"Phone",sub:"+20 10 4382 124",href:"tel:+20104382124",icon:"phone"},
  {label:"WhatsApp",sub:"Message me",href:"https://wa.me/20104382124",icon:"whatsapp"},
  {label:"Instagram",sub:"@beshoonashaat10",href:"https://www.instagram.com/beshoonashaat10/",icon:"instagram"},
  {label:"Facebook",sub:"/beshoo4jesus",href:"https://www.facebook.com/beshoo4jesus",icon:"facebook"},
  {label:"LinkedIn",sub:"Beshoy Nashaat",href:"https://www.linkedin.com/in/beshoy-nashaat-19640620b/",icon:"linkedin"},
];
function Icon({name}){return <span className="icon">{name==="phone"?"☎":name==="whatsapp"?"◉":name==="instagram"?"◎":name==="facebook"?"f":"in"}</span>}
export default function Home(){
 return <main>
  <header className="nav wrap"><Link href="/" className="brand">BESH<span>OY</span></Link><a href="#contact" className="navlink">Contact <b>↗</b></a></header>
  <section className="hero wrap">
   <div className="eyebrow">VIDEO EDITOR · MOTION DESIGN · STORYTELLING</div>
   <h1>I make videos<br/><em>people feel.</em></h1>
   <p className="hero-copy">A selection of commercial, podcast and social work — edited with rhythm, clarity and a cinematic eye.</p>
   <a href="#work" className="scroll">↓ Explore selected work</a>
  </section>
  <section id="work" className="wrap work">
   <div className="section-head"><div><span className="eyebrow">SELECTED WORK</span><h2>Projects</h2></div><span className="project-count">{String(projects.length).padStart(2,"0")} PROJECTS</span></div>
   <div className="projects">{projects.map((p,i)=><Link href={`/projects/${p.slug}`} className="project-card" key={p.slug}>
    <div className="project-num">0{i+1}</div><div className="project-info"><h3>{p.title}</h3><p>{p.description}</p><span className="view">View project <b>↗</b></span></div>
   </Link>)}</div>
  </section>
  <section id="contact" className="wrap contact">
   <div className="eyebrow">GET IN TOUCH</div><h2>Let's make<br/><em>something good.</em></h2>
   <div className="contacts">{socials.map(s=><a className="contact-item" href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noreferrer" key={s.label}><Icon name={s.icon}/><span><strong>{s.label}</strong><small>{s.sub}</small></span><b className="arrow">↗</b></a>)}</div>
  </section>
  <footer className="wrap footer"><span>© 2026 Beshoy Nashaat</span><span>Video Editor / Creative</span></footer>
 </main>
}