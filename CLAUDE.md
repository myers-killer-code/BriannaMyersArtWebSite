# Brianna Myers — Portfolio Site

Animation portfolio. Plain static site: no build step, no framework.
Live at **briannamyers.art** via GitHub Pages (`CNAME` on `origin/main`).

Personal and machine-specific notes go in `CLAUDE.local.md` (gitignored). Keep this file to project facts only.

## Files
- `index.html`: page shell. Header nav and section buttons are filled in by JS. Hero collage (3 tiles) and the About text and links are hand-written here.
- `gallery.js`: **all portfolio content**. `SECTIONS` array: one entry per menu item (`id`, `title`, `folder`, `items`).
  Item fields: `title`, `src` (file name inside the folder), optional `meta` (small note on the right), `fit: "contain"` (no cropping, for tall or very wide images), `thumb` (seconds into a video to use as its preview frame).
- `main.js`: renders sections, tiles and the lightbox. File type comes from the extension: video (mp4/mov/webm), pdf (opens in an iframe with an "Open PDF" link), otherwise image.
- `styles.css`: color tokens live on `:root`. The site is **always dark** (deep purple `#17121f`, lilac `#b49cff` → seafoam `#7fd8cb` gradient accent). There is no light mode on purpose. Fonts: Fraunces (headings, real italics loaded) + Inter.
- Media folders: `2D_Animation/`, `3D/`, `Motion_Graphics/`, `Character_Design/`, `Storyboards/`. `images/IMG_2905.jpeg` is the About portrait.
- `originals/`: full-size originals, **gitignored** (never goes to GitHub).
- `watermark.py`: older watermark script.

## Adding new artwork
1. Drop files into a section folder.
2. Copy originals to `originals/<Folder>/` first.
3. Shrink:
   - PNGs: `.claude/shrink-images.ps1 -Root <site>` (PowerShell + System.Drawing) writes 2400px q85 JPEGs from `originals/` into the section folders. Then delete the PNGs from the section folder and point `gallery.js` at the `.jpg` files.
   - Videos: ffmpeg with `-c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart` (and convert `.mov` → `.mp4`).
4. Add entries to `gallery.js`. If a video opens on a black frame, set `thumb`.
5. Check it in the preview.

## Preview
- `.claude/launch.json` serves the site on http://localhost:8000. `site-windows` uses `.claude/serve.ps1` (PowerShell server with range and PDF support); `site` uses Python.

## Git
- `git pull` before pushing; commits are sometimes made directly on GitHub.
- Keep files under GitHub's 50 MB warning; shrink media before committing.
