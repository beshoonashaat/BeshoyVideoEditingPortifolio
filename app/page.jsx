"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "../lib/projects";

function Counter({ value, duration = 1400 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, value, duration]);

  return (
    <span ref={ref} className="stat-number">
      {count}
    </span>
  );
}

const totalVideos = projects.reduce((total, project) => {
  return (
    total +
    (project.youtube?.length || 0) +
    (project.instagram?.length || 0)
  );
}, 0);

function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 19L19 5M8 5H19V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function SocialIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M7.2 3.8h2.2c.6 0 1.1.4 1.2 1l.5 2.4c.1.5-.1.9-.5 1.2l-1.1.8a11.5 11.5 0 0 0 5.3 5.3l.8-1.1c.3-.4.8-.6 1.2-.5l2.4.5c.6.1 1 .6 1 1.2v2.2c0 .7-.5 1.2-1.2 1.2C11.9 18 6 12.1 6 5c0-.7.5-1.2 1.2-1.2Z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M14 20v-7h2.4l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5H17V4.1c-.6-.1-1.3-.1-2-.1-2.2 0-3.7 1.3-3.7 3.8V10H9v3h2.3v7H14Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r=".7" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
        <path d="M8.2 8.2c.2-.4.4-.5.7-.5h.5c.2 0 .4.2.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c.6 1 1.4 1.7 2.4 2.2l.7-.6c.2-.2.5-.2.7-.1l1.6.8c.3.1.4.4.3.7-.2.8-.9 1.3-1.7 1.3-1.3 0-3.1-1-4.4-2.3C8.1 11.9 7.2 10.1 7.2 8.9c0-.3.4-.6 1-.7Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <circle cx="5" cy="6.5" r="1.5" />
        <path d="M4 10h2v10H4zM8 10h2v1.5c.7-1 1.7-1.8 3.4-1.8 3.1 0 3.6 2 3.6 4.6V20h-2v-5c0-1.2 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H8V10Z" />
      </svg>
    );
  }

  if (type === "email") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg {...common}>
        <path d="M21 8.2a2.5 2.5 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.5 2.5 0 0 0 3 8.2 26 26 0 0 0 2.7 12c0 1.3.1 2.6.3 3.8a2.5 2.5 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8c.2-1.2.3-2.5.3-3.8s-.1-2.6-.3-3.8Z" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "behance") {
    return (
      <svg {...common}>
        <path d="M4 6h5.2c2.5 0 4 1.2 4 3.1 0 1.2-.7 2.2-1.8 2.7 1.6.4 2.6 1.5 2.6 3.1 0 2.3-1.8 3.6-4.6 3.6H4V6Z" />
        <path d="M6 8v2.8h2.8c1.4 0 2.4-.4 2.4-1.5S10.3 8 8.9 8H6Zm0 4.8v3.7h3c1.5 0 2.5-.6 2.5-1.9 0-1.2-1-1.8-2.5-1.8H6Z" fill="currentColor" stroke="none" />
        <path d="M16 8.2h4" />
        <path d="M15.2 14.1c.2 1.4 1 2.2 2.5 2.2 1 0 1.7-.4 2.1-1l1.3.8c-.7 1.3-2 2-3.7 2-2.7 0-4.4-1.8-4.4-4.6 0-2.8 1.7-4.7 4.2-4.7 2.4 0 4 1.8 4 4.5v.8h-6Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return null;
}

const contacts = [
  { type: "phone", label: "Phone", value: "+20 10 1438 2124", href: "tel:+201014382124" },
  { type: "facebook", label: "Facebook", value: "/beshoo4jesus", href: "https://www.facebook.com/beshoo4jesus" },
  { type: "instagram", label: "Instagram", value: "@beshoonashaat10", href: "https://www.instagram.com/beshoonashaat10/" },
  { type: "whatsapp", label: "WhatsApp", value: "Message me", href: "https://wa.me/201014382124" },
  { type: "linkedin", label: "LinkedIn", value: "Beshoy Nashaat", href: "https://www.linkedin.com/in/beshoy-nashaat-19640620b/" },
  { type: "email", label: "Email", value: "beshoo.nashaat10@gmail.com", href: "mailto:beshoo.nashaat10@gmail.com" },
  { type: "youtube", label: "YouTube", value: "@beshoonashaat10", href: "https://www.youtube.com/@beshoonashaat10" },
  { type: "behance", label: "Behance", value: "beshoonashaat10", href: "https://www.behance.net/beshoonashaat10" },
];



export default function Home() {
  return (
    <main>
      <nav className="top">
        <div className="top-in">
          <Link href="/" className="logo">BESHOY <span>NASHAAT</span></Link>
          <div className="nav-right">
            <span>VIDEO EDITOR · ASSIUT, EGYPT</span>
            <a href="#contact">CONTACT <Arrow /></a>
          </div>
        </div>
      </nav>

      <section className="work-hero">
        <div className="work-hero-in">
          <div>
            <span className="eyebrow lime">BESHОY NASHAAT — VIDEO EDITOR</span>
            <h1>Beshoy<br /><em>Nashaat.</em></h1>
            <p className="intro-bio">
              A creative Video Editor and a Data Science undergraduate. I specialize in crafting engaging visual stories, from long-form content to high-retention short reels. By combining creative storytelling with an analytical mindset, I edit videos that don't just look great—they perform
            </p>
          </div>
          <div className="hero-copy">
            <p>Turning ideas into powerful visuals.</p>
            <div>Editing <b>•</b> Motion <b>•</b> Storytelling</div>
          </div>
          <a href="#work" className="all-work">VIEW ALL WORK <Arrow /></a>
        </div>
      </section>

      <section className="stats">
  <div className="stats-in">

    <div className="stat">
      <span className="stat-number">{projects.length}</span>
      <span className="stat-label">PROJECTS</span>
    </div>

    <div className="stat-divider" />

    <div className="stat">
      <span className="stat-number">
        {projects.reduce(
          (total, project) =>
            total +
            (project.youtube?.length || 0) +
            (project.instagram?.length || 0),
          0
        )}
      </span>
    </div>



  </div>
</section>

<section className="stats">
  <div className="stats-in">

    <div className="stat">
      <Counter value={projects.length} />
      <span className="stat-label">PROJECTS</span>
    </div>

    <div className="stat-divider" />

    <div className="stat">
      <Counter value={totalVideos} />
      <span className="stat-label">VIDEOS</span>
    </div>

    <div className="stat-caption">
      <span className="eyebrow lime">THE NUMBERS</span>
      <p>
        A growing collection of edits, stories and visual work.
      </p>
    </div>

  </div>
</section>

      <section id="work" className="work work-target">
        <div className="section-heading">
          <span className="eyebrow">01 — SELECTED WORK</span>
          <h2>Projects</h2>
        </div>
        <div className="project-list">
          {projects.map((p) => (
            <Link className="project-row" href={`/projects/${p.slug}`} key={p.slug}>
              <div className="row-no">{p.number}</div>
              <div className="row-main">
                <div className="row-thumb">
                  <img src={p.cover} alt={`${p.title} project cover`} />
                </div>
                <div className="row-copy">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.description.split(" · ").map((tag, i) => <span key={`${p.slug}-${i}`}>{tag}</span>)}
                  </div>
                </div>
              </div>
              <div className="row-arrow"><Arrow /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="statement">
        <div className="statement-in">
          <span className="eyebrow">THE APPROACH</span>
          <h2>Good editing isn't<br /><i>just cutting.</i><br />It's <strong>feeling.</strong></h2>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-in">
          <div>
            <span className="eyebrow">02 — CONTACT</span>
            <h2>Let's make<br /><i>something.</i></h2>
          </div>
          <div className="contact-grid">
            {contacts.map((item) => (
              <a
                key={item.type}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <SocialIcon type={item.type} />
                <b>{item.label}</b>
                <span>{item.value}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <span className="footer-name">BESHOY NASHAAT</span>
        <span>© 2026 BESHOY NASHAAT. All rights reserved.</span>
        <span>VIDEO EDITOR · MOTION DESIGN</span>
      </footer>
    </main>
  );
}
