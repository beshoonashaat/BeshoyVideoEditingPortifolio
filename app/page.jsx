import Link from "next/link";
import {projects} from "../lib/projects";

function Arrow(){return <span className="arrow">↗</span>}
function SocialIcon({type}){const paths={
phone:<><path d="M7 3.5c-.5 0-1 .3-1.2.8l-1 2.3c-.2.5-.1 1 .3 1.4l1.5 1.5c1.3 2.6 3.4 4.7 6 6l1.5 1.5c.4.4.9.5 1.4.3l2.3-1c.5-.2.8-.7.8-1.2v-1.8c0-.6-.4-1.1-1-1.2l-2.5-.4c-.5-.1-1 .1-1.3.5l-.7.9a11.2 11.2 0 0 1-3.1-3.1l.9-.7c.4-.3.6-.8.5-1.3L11 5.5c-.1-.6-.6-1-1.2-1H8Z"/></>,
whatsapp:<><path d="M18 9.6a7 7 0 0 1-10.4 6.1L4 17l1.4-3.5A7 7 0 1 1 18 9.6Z"/><path d="M8 7.5c.2-.3.4-.3.6-.3h.5c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.6 1 1.3 1.7 2.3 2.2l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.3.6-.2.7-.8 1.2-1.5 1.2-1.2 0-2.9-.9-4.1-2.1C8.1 11.3 7.2 9.6 7.2 8.4c0-.3.3-.7.8-.9Z"/></>,
instagram:<><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.3" cy="6.8" r=".7" fill="currentColor" stroke="none"/></>,
facebook:<><path d="M14 20v-7h2.5l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5H17V4.1c-.6-.1-1.3-.1-2-.1-2.2 0-3.7 1.3-3.7 3.8V10H9v3h2.3v7H14Z" fill="currentColor" stroke="none"/></>,
linkedin:<><path d="M5 8.5A1.5 1.5 0 1 0 5 5.5a1.5 1.5 0 0 0 0 3Z" fill="currentColor" stroke="none"/><path d="M4 10h2v10H4zM8 10h2v1.5c.7-1 1.7-1.8 3.4-1.8 3.1 0 3.6 2 3.6 4.6V20h-2v-5c0-1.2 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H8V10Z" fill="currentColor" stroke="none"/></>},
email:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
youtube:<><path d="M21 8.2a2.5 2.5 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 8.2 26 26 0 0 0 2.7 12 26 26 0 0 0 3 15.8a2.5 2.5 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8 26 26 0 0 0 .3-3.8 26 26 0 0 0-.3-3.8Z"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></>,
behance:<><path d="M4 6h5.2c2.5 0 4 1.2 4 3.1 0 1.2-.7 2.2-1.8 2.7 1.6.4 2.6 1.5 2.6 3.1 0 2.3-1.8 3.7-4.6 3.7H4V6Zm2.2 2v3h2.6c1.3 0 2-.5 2-1.5s-.7-1.5-2-1.5H6.2Zm0 5v3.5h2.9c1.4 0 2.2-.6 2.2-1.8s-.8-1.7-2.2-1.7H6.2Z" fill="currentColor" stroke="none"/><path d="M16 9h3.8v1.2H16zM18 11c2.5 0 4 1.6 4 4v.6h-6c.1 1.4.8 2.2 2.1 2.2.9 0 1.5-.3 1.9-1l1.8.7c-.7 1.4-2 2.2-3.9 2.2-2.7 0-4.3-1.7-4.3-4.4S15.2 11 18 11Zm1.9 3c-.2-1.1-.8-1.6-1.9-1.6-1 0-1.7.6-1.9 1.6h3.8Z" fill="currentColor" stroke="none"/></>
};
return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>}
export default function Home(){
return <main>
<nav className="top"><div className="top-in"><Link href="/" className="logo">BESHOY <span>NASHAAT</span></Link><div className="nav-right"><span>VIDEO EDITOR · ASSIUT, EGYPT</span><a href="#contact">CONTACT <Arrow/></a></div></div></nav>
<section className="intro-hero"><div className="intro-hero-in"><span className="eyebrow lime">BESHOY NASHAAT — VIDEO EDITOR</span><h1>BESHOY<br/><em>NASHAAT</em></h1><p>A creative <strong>Video Editor</strong> and a <strong>Data Science</strong> undergraduate. I specialize in crafting engaging visual stories, from long-form content to high-retention short reels. By combining creative storytelling with an analytical mindset, I edit videos that don't just look great—they perform.</p><div className="intro-meta"><span>VIDEO EDITOR</span><span>DATA SCIENCE</span><span>ASSIUT, EGYPT</span></div></div></section><section className="work-hero"><div className="work-hero-in"><div><span className="eyebrow lime">SELECTED WORK</span><h1>Projects I’m<br/><em>Proud Of.</em></h1></div><div className="hero-copy"><p>Turning ideas into powerful visuals.</p><div>Editing <b>•</b> Motion <b>•</b> Storytelling</div></div><a href="#work" className="all-work">VIEW ALL WORK <Arrow/></a></div></section>
<section id="work" className="work work-target"><div className="project-list">{projects.map((p)=><Link className="project-row" href={`/projects/${p.slug}`} key={p.slug}>
<div className="row-no">{p.number}</div><div className="row-main"><div className="row-thumb"><img src={p.cover} alt={`${p.title} project cover`} /></div><div className="row-copy"><h3>{p.title}</h3><p>{p.description}</p><div className="tags">{p.description.split(' · ').map((tag,i)=><span key={i}>{tag}</span>)}</div></div></div><div className="row-arrow"><Arrow/></div>
</Link>)}</div></section>
<section className="statement"><div className="statement-in"><span className="eyebrow">THE APPROACH</span><h2>Good editing isn't<br/><i>just cutting.</i><br/>It's <strong>feeling.</strong></h2></div></section>
<section id="contact" className="contact"><div className="contact-in"><div><span className="eyebrow">02 — CONTACT</span><h2>Let's make<br/><i>something.</i></h2></div><div className="contact-grid">
<a href="tel:+201014382124"><SocialIcon type="phone"/><b>Phone</b><span>+20 10 1438 2124</span><Arrow/></a>
<a href="https://www.facebook.com/beshoo4jesus" target="_blank" rel="noreferrer"><SocialIcon type="facebook"/><b>Facebook</b><span>/beshoo4jesus</span><Arrow/></a>
<a href="https://www.instagram.com/beshoonashaat10/" target="_blank" rel="noreferrer"><SocialIcon type="instagram"/><b>Instagram</b><span>@beshoonashaat10</span><Arrow/></a>
<a href="https://wa.me/201014382124" target="_blank" rel="noreferrer"><SocialIcon type="whatsapp"/><b>WhatsApp</b><span>Message me</span><Arrow/></a>
<a href="https://www.linkedin.com/in/beshoy-nashaat-19640620b/" target="_blank" rel="noreferrer"><SocialIcon type="linkedin"/><b>LinkedIn</b><span>Beshoy Nashaat</span><Arrow/></a>
<a href="mailto:beshoo.nashaat10@gmail.com"><SocialIcon type="email"/><b>Email</b><span>beshoo.nashaat10@gmail.com</span><Arrow/></a>
<a href="https://www.youtube.com/@beshoonashaat10" target="_blank" rel="noreferrer"><SocialIcon type="youtube"/><b>YouTube</b><span>@beshoonashaat10</span><Arrow/></a>
<a href="https://www.behance.net/beshoonashaat10" target="_blank" rel="noreferrer"><SocialIcon type="behance"/><b>Behance</b><span>beshoonashaat10</span><Arrow/></a>
</div></div></section>
<footer><span className="footer-name">BESHOY NASHAAT</span><span>© 2026 BESHOY NASHAAT. All rights reserved.</span><span>VIDEO EDITOR · MOTION DESIGN</span></footer>
</main>}