# Beshoy Nashaat Portfolio — Redesigned

This is a substantial visual redesign: editorial/magazine layout, large typography,
project rows with YouTube thumbnails, statement section, icon-based contact cards,
and redesigned project media pages.

No Behance scraping. No `cheerio`. Media IDs are stored locally in `lib/projects.js`.

Note: video titles are currently generated from project/link metadata because the
provided URLs do not contain the actual YouTube title. The YouTube thumbnail is
loaded from the video ID.


## Behance project covers
Project covers are stored locally in `public/project-covers`, supplied by the portfolio owner. The site no longer depends on Behance for project images.

## Admin dashboard

Open `/admin` to manage portfolio projects. The dashboard supports:
- Pasting the project message format with Project Name, Behance URL, YouTube links and Instagram links.
- Uploading a project cover image.
- Reordering projects with up/down controls.
- Saving the portfolio data back to GitHub so Vercel can redeploy automatically.

Set these Vercel Environment Variables before using the admin dashboard:
`ADMIN_PASSWORD`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_BRANCH`.

The GitHub token needs permission to write repository contents. Never put the token in client-side code.
