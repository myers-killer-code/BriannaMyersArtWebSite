# Brianna Myers — Portfolio Site

Animation portfolio for Brianna Myers (Animation Production student, Ball State). Plain static site: no build step, no framework.
Live at **briannamyers.art** via GitHub Pages (`CNAME` on `origin/main`). Repo: `myers-killer-code/SampleDesignCode` (owned by her dad's account).

## Working with Brianna
- She is new to GitHub and code. Do the technical work for her; keep replies short, one step at a time, no walls of text.
- Explain git terms in plain words ("save" = commit, "send/upload" = push).
- Only commit or push when she asks. "Don't send it" = don't push.
- **Never put her email address on the site or in commits.** She removed it on purpose.
- She likes the current layout. When she asks for color or text changes, change only that.

## Files
- `index.html`: page shell. Header nav and section buttons are filled in by JS. Hero collage (3 tiles) and the About text and links are hand-written here.
- `gallery.js`: **all portfolio content**. `SECTIONS` array: one entry per menu item (`id`, `title`, `folder`, `items`).
  Item fields: `title`, `src` (file name inside the folder), optional `meta` (small note on the right), `fit: "contain"` (no cropping, for tall or very wide images), `thumb` (seconds into a video to use as its preview frame).
- `main.js`: renders sections, tiles and the lightbox. File type comes from the extension: video (mp4/mov/webm), pdf (opens in an iframe with an "Open PDF" link), otherwise image.
- `styles.css`: color tokens live on `:root`. The site is **always dark** (deep purple `#17121f`, lilac `#b49cff` → seafoam `#7fd8cb` gradient accent). There is no light mode on purpose. Fonts: Fraunces (headings, real italics loaded) + Inter.
- Media folders: `2D_Animation/`, `3D/`, `Motion_Graphics/`, `Character_Design/`, `Storyboards/`. `images/IMG_2905.jpeg` is her About portrait.
- `originals/`: full-size originals, **gitignored** (never goes to GitHub).
- `watermark.py`: dad's old watermark script (macOS font path; Python isn't installed on this PC).

## Adding new artwork
1. She drops files into a section folder.
2. Copy originals to `originals/<Folder>/` first.
3. Shrink:
   - PNGs: `.claude/shrink-images.ps1 -Root <site>` (PowerShell + System.Drawing) writes 2400px q85 JPEGs from `originals/` into the section folders. Then delete the PNGs from the section folder and point `gallery.js` at the `.jpg` files.
   - Videos: ffmpeg (winget `Gyan.FFmpeg`; not on PATH, it lives under `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg_*\...\bin\ffmpeg.exe`):
     `-c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart` (and convert `.mov` → `.mp4`).
4. Add entries to `gallery.js`. If a video opens on a black frame, set `thumb`.
5. Check it in the preview.

## Preview
- `.claude/launch.json` → config **`site-windows`** (`.claude/serve.ps1`, a PowerShell server with range and PDF support) on http://localhost:8000. The `site` config needs Python, which isn't installed.

## Git
- Git for Windows is installed but not on PATH in the PowerShell tool. Use `& "C:\Program Files\Git\cmd\git.exe"` there, or the Bash tool.
- Repo-local identity: `Brianna Myers <350055701+briermyers16@users.noreply.github.com>` (GitHub's private email).
- **Push from the user's Terminal panel** (`run_in_terminal`) so the GitHub sign-in can appear; the tool shell can't prompt.
- Before pushing: `git pull` first. Her dad sometimes commits on GitHub directly (for example the `CNAME`).
- Keep files under GitHub's 50 MB warning; shrink media before committing.
