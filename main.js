const nav = document.getElementById("nav");
const chips = document.getElementById("chips");
const sectionsEl = document.getElementById("sections");
const lightbox = document.getElementById("lightbox");
const lightboxMedia = lightbox.querySelector(".lightbox-media");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");

document.getElementById("year").textContent = new Date().getFullYear();

// Work out what kind of file each piece is from its extension
function kind(src) {
  const ext = src.split(".").pop().toLowerCase();
  if (["mp4", "mov", "webm", "m4v"].includes(ext)) return "video";
  if (ext === "pdf") return "pdf";
  return "image";
}

const BADGES = { video: "Video", pdf: "PDF" };

function placeholder(text) {
  const el = document.createElement("div");
  el.className = "placeholder";
  el.innerHTML = `<span class="ph-icon">▤</span><span>${text}</span>`;
  return el;
}

function media(item, { controls = false } = {}) {
  const type = kind(item.src);
  if (type === "pdf") {
    if (!controls) return placeholder("Storyboard PDF");
    const f = document.createElement("iframe");
    f.src = item.url;
    f.title = item.title;
    return f;
  }
  if (type === "video") {
    const v = document.createElement("video");
    // Tiles open on the thumb frame; the lightbox plays from the start.
    // iPhone/iPad Safari only paints a preview frame when a #t= time is given,
    // so tiles without a thumb still get a tiny one.
    v.src = controls ? item.url : `${item.url}#t=${item.thumb || 0.1}`;
    if (item.poster) v.poster = item.poster;
    v.muted = !controls;
    v.loop = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.controls = controls;
    if (controls) v.autoplay = true;
    return v;
  }
  const img = document.createElement("img");
  img.src = item.url;
  img.alt = item.title;
  img.loading = "lazy";
  return img;
}

function tile(item, i, items) {
  const el = document.createElement("figure");
  el.className = `tile ${item.fit === "contain" ? "contain" : ""}`;
  el.style.animationDelay = `${Math.min(i, 8) * 60}ms`;
  el.tabIndex = 0;

  const frame = document.createElement("div");
  frame.className = "frame";
  frame.appendChild(media(item));
  const badge = BADGES[kind(item.src)];
  if (badge) frame.insertAdjacentHTML("beforeend", `<span class="badge">${badge}</span>`);

  el.appendChild(frame);
  el.insertAdjacentHTML("beforeend", `
    <figcaption>
      <span class="title">${item.title}</span>
      ${item.meta ? `<span class="meta">${item.meta}</span>` : ""}
    </figcaption>`);

  // Video previews play on hover
  const video = frame.querySelector("video");
  if (video) {
    el.addEventListener("mouseenter", () => video.play());
    el.addEventListener("mouseleave", () => { video.pause(); video.currentTime = item.thumb || 0; });
  }

  const open = () => openLightbox(items, i);
  el.addEventListener("click", open);
  el.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });
  return el;
}

function render() {
  SECTIONS.forEach((section) => {
    nav.insertAdjacentHTML("beforeend", `<a href="#${section.id}">${section.title}</a>`);
    chips.insertAdjacentHTML("beforeend", `<a href="#${section.id}">${section.title}</a>`);

    const el = document.createElement("section");
    el.id = section.id;
    el.className = "work";
    el.innerHTML = `
      <div class="work-head">
        <h2>${section.title}</h2>
        <span class="count">${section.items.length} pieces</span>
      </div>
      <div class="gallery"></div>`;

    const gallery = el.querySelector(".gallery");
    section.items.forEach((item, i) => {
      // Folder names and files can have spaces, so encode the path for the browser
      item.url = encodeURI(`${section.folder}/${item.src}`);
      item.section = section.title;
      gallery.appendChild(tile(item, i, section.items));
    });
    sectionsEl.appendChild(el);
  });
  nav.insertAdjacentHTML("beforeend", `<a href="#about">About</a>`);
}

// The section being browsed in the lightbox, so the arrows can step through it
let current = { items: [], index: 0 };

function openLightbox(items, index) {
  current = { items, index };
  const item = items[index];
  lightbox.classList.toggle("single", items.length < 2);
  lightboxMedia.replaceChildren(media(item, { controls: true }));
  lightboxCaption.textContent = item.meta ? `${item.title} · ${item.meta}` : item.title;
  // Phones often can't show a PDF inside the page, so offer it full screen too
  if (kind(item.src) === "pdf") {
    lightboxCaption.insertAdjacentHTML("beforeend", ` · <a href="${item.url}" target="_blank" rel="noopener">Open PDF ↗</a>`);
  }
  if (!lightbox.open) lightbox.showModal();
  countView(item);
}

// Tell GoatCounter which piece was opened, so the dashboard lists views per piece.
// The counter script loads async and may be blocked, so skip quietly if it's missing.
function countView(item) {
  if (!window.goatcounter || !window.goatcounter.count) return;
  window.goatcounter.count({
    path: `${item.section}: ${item.title}`,
    title: `${item.title} (${item.section})`,
    event: true,
  });
}

// Step to the next or previous piece, wrapping around at either end
function step(by) {
  const { items, index } = current;
  if (items.length < 2) return;
  openLightbox(items, (index + by + items.length) % items.length);
}

lightbox.querySelector(".lightbox-arrow.prev").addEventListener("click", () => step(-1));
lightbox.querySelector(".lightbox-arrow.next").addEventListener("click", () => step(1));
lightbox.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

lightbox.addEventListener("close", () => lightboxMedia.replaceChildren());
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

// Discourage casual saving of artwork (right-click and drag)
document.addEventListener("contextmenu", (e) => {
  if (e.target.closest("img, video")) e.preventDefault();
});
document.addEventListener("dragstart", (e) => {
  if (e.target.closest("img, video")) e.preventDefault();
});

render();
