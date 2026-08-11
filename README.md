# Beshoy Nashaat — Auto-import Portfolio

This is a Vercel-ready Next.js portfolio.

IMPORTANT:
The project pages do NOT send visitors to Behance.
They are local pages:
- /projects/ramez-khairallah
- /projects/dr-samuel-safwat
- /projects/ahlan-podcast
- /projects/ashab-el-sa3ada
- /projects/sha2a-11

Each project page server-fetches the corresponding public Behance project and extracts
public YouTube/Instagram embed URLs, then renders those media directly on the local
portfolio page.

Why this approach:
Behance's public HTML currently exposes media as "Project Embed Content" links.
For example, Ramez exposes one YouTube embed, Dr. Samuel exposes two YouTube embeds,
Ashab exposes seven YouTube + seven Instagram embeds, and Sha2a 11 exposes twelve
YouTube + six Instagram embeds. The actual media IDs are hidden from the normal
text rendering, so the app performs the extraction on the Vercel server instead of
inventing IDs.

Run locally:
npm install
npm run dev

Deploy:
Import the folder/repository into Vercel. Vercel will run npm run build.

If Behance changes its HTML/anti-bot behavior, update lib/scrape.js. No frontend
project links need to change.
