import Link from "next/link";
import {projects} from "../lib/projects";

function Arrow(){return <span className="arrow">↗</span>}
function SocialIcon({ type }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }

  if (type === "facebook") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M14 20v-7h2.5l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5H17V4.1c-.6-.1-1.3-.1-2-.1-2.2 0-3.7 1.3-3.7 3.8V10H9v3h2.3v7H14Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L4 20l1.1-4.1A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8.5 8.2c.2-.4.4-.5.7-.5h.6c.2 0 .4.2.5.5l.7 1.7c.1.3.1.5-.1.7l-.6.6c.7 1.2 1.6 2.1 2.8 2.7l.6-.6c.2-.2.5-.2.7-.1l1.6.8c.3.1.4.4.3.7-.2.8-.9 1.4-1.7 1.4-1.5 0-3.5-1-4.9-2.4-1.4-1.4-2.4-3.4-2.4-4.9 0-.2.1-.4.2-.6Z" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5.5a1.5 1.5 0 0 0 0 3Z" />
        <path d="M5 10h3v10H5zM10 10h3v1.4c.7-1 1.8-1.7 3.5-1.7 3 0 3.5 2 3.5 4.5V20h-3v-5.1c0-1.2 0-2.8-1.8-2.8s-2.2 1.4-2.2 2.8V20h-3V10Z" />
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
        <rect x="2.5" y="5" width="19" height="14" rx="4" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "behance") {
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M4 6h5.2c2.7 0 4.1 1.2 4.1 3.2 0 1.2-.6 2.2-1.8 2.7 1.6.4 2.6 1.5 2.6 3.2 0 2.3-1.8 3.7-4.7 3.7H4V6Zm2.3 2v3h2.5c1.4 0 2-.5 2-1.5s-.6-1.5-2-1.5H6.3Zm0 5v3.6h2.8c1.5 0 2.3-.6 2.3-1.8 0-1.2-.8-1.8-2.3-1.8H6.3Z" />
        <path d="M16 9h4v1.2h-4V9Zm2 2c2.5 0 4 1.6 4 4v.6h-6c.1 1.4.8 2.2 2.1 2.2.9 0 1.5-.3 1.9-1l1.8.7c-.7 1.4-2 2.2-3.9 2.2-2.7 0-4.3-1.7-4.3-4.4S15.2 11 18 11Zm1.9 3c-.2-1.1-.8-1.6-1.9-1.6-1 0-1.7.6-1.9 1.6h3.8Z" />
      </svg>
    );
  }

  return null;
}
