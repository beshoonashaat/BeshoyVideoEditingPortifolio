import Link from "next/link";
import {projects} from "../lib/projects";
import BehanceImage from "./components/BehanceImage";

function Arrow(){return <span className="arrow">↗</span>}
function SocialIcon({type}){const paths={
phone:<><path d="M7 3.5c-.5 0-1 .3-1.2.8l-1 2.3c-.2.5-.1 1 .3 1.4l1.5 1.5c1.3 2.6 3.4 4.7 6 6l1.5 1.5c.4.4.9.5 1.4.3l2.3-1c.5-.2.8-.7.8-1.2v-1.8c0-.6-.4-1.1-1-1.2l-2.5-.4c-.5-.1-1 .1-1.3.5l-.7.9a11.2 11.2 0 0 1-3.1-3.1l.9-.7c.4-.3.6-.8.5-1.3L11 5.5c-.1-.6-.6-1-1.2-1H8Z"/></>,
whatsapp:<><path d="M18 9.6a7 7 0 0 1-10.4 6.1L4 17l1.4-3.5A7 7 0 1 1 18 9.6Z"/><path d="M8 7.5c.2-.3.4-.3.6-.3h.5c.2 0 .3.1.4.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c.6 1 1.3 1.7 2.3 2.2l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.3.6-.2.7-.8 1.2-1.5 1.2-1.2 0-2.9-.9-4.1-2.1C8.1 11.3 7.2 9.6 7.2 8.4c0-.3.3-.7.8-.9Z"/></>,
instagram:<><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.3" cy="6.8" r=".7" fill="currentColor" stroke="none"/></>,
facebook:<><path d="M14 20v-7h2.5l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5H17V4.1c-.6-.1-1.3-.1-2-.1-2.2 0-3.7 1.3-3.7 3.8V10H9v3h2.3v7H14Z" fill="currentColor" stroke="none"/></>,
linkedin:<><path d="M5 8.5A1.5 1.5 0 1 0 5 5.5a1.5 1.5 0 0 0 0 3Z" fill="currentColor" stroke="none"/><path d="M4 10h2v10H4zM8 10h2v1.5c.7-1 1.7-1.8 3.4-1.8 3.1 0 3.6 2 3.6 4.6V20h-2v-5c0-1.2 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H8V10Z" fill="currentColor" stroke="none"/></>}
return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>}
export default function Home(){
return <main>
<nav className="top"><div className="top-in"><Link href="/" className="logo">BESH<span>OY</span></Link><div className="nav-right"><span>ASSIUT · EGYPT</span><a href="#contact">CONTACT <Arrow/></a></div></div></nav>
<section className="hero"><div className="hero-in"><div className="hero-tag">BESHOY NASHAAT — VIDEO EDITOR</div>
<h1 className="name-hero">BESHOY<br/><span>NASHAAT</span></h1>
<div className="hero-role">VIDEO EDITOR · MOTION DESIGN · VISUAL STORYTELLING</div><div className="hero-bottom"><p>I edit stories for brands, podcasts and people — with rhythm, intention and a cinematic eye.</p><a href="#work" className="circle-link">SCROLL<br/><b>↓</b></a></div></div></section>
<section id="work" className="work"><div className="work-head"><div><span className="eyebrow">01 — SELECTED WORK</span><h2>Projects</h2></div><div className="work-note">05 CASE STUDIES<br/>VIDEO + SOCIAL</div></div>
<div className="project-list">{projects.map((p,i)=><Link className="project-row" href={`/projects/${p.slug}`} key={p.slug}>
<div className="row-no">{p.number}</div><div className="row-main"><div className="row-thumb">
  <BehanceImage
  behance={p.behance}
  fallback={p.youtube[0] ? `https://i.ytimg.com/vi/${p.youtube[0].id}/hqdefault.jpg` : undefined}
  alt={`${p.title} project cover`}
/>
  <span className="thumb-label">BEHANCE / SELECTED FRAME</span>
</div><div><h3>{p.title}</h3><p>{p.description}</p></div></div><div className="row-arrow"><Arrow/></div>
</Link>)}</div></section>
<section className="statement"><div className="statement-in"><span className="eyebrow">THE APPROACH</span><h2>Good editing isn't<br/><i>just cutting.</i><br/>It's <strong>feeling.</strong></h2></div></section>
<section id="contact" className="contact"><div className="contact-in"><div><span className="eyebrow">02 — CONTACT</span><h2>Let's make<br/><i>something.</i></h2></div><div className="contact-grid">
<a href="tel:+201014382124"><SocialIcon type="phone"/><b>Phone</b><span>+20 10 1438 2124</span><Arrow/></a>
<a href="https://wa.me/201014382124" target="_blank"><SocialIcon type="whatsapp"/><b>WhatsApp</b><span>Message me</span><Arrow/></a>
<a href="https://www.instagram.com/beshoonashaat10/" target="_blank"><SocialIcon type="instagram"/><b>Instagram</b><span>@beshoonashaat10</span><Arrow/></a>
<a href="https://www.facebook.com/beshoo4jesus" target="_blank"><SocialIcon type="facebook"/><b>Facebook</b><span>/beshoo4jesus</span><Arrow/></a>
<a href="https://www.linkedin.com/in/beshoy-nashaat-19640620b/" target="_blank"><SocialIcon type="linkedin"/><b>LinkedIn</b><span>Beshoy Nashaat</span><Arrow/></a>
</div></div></section>
<footer><span>BESH<span>OY</span> NASH AAT</span><span>© 2026</span><span>VIDEO EDITOR · MOTION DESIGN</span></footer>
</main>}