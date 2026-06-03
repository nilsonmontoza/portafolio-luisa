/* ============================================================
   MOTOR DEL PORTAFOLIO
   · Videos  → CONFIG  (config.js)
   · Fotos   → PHOTOS  (photos-manifest.js — generado por scripts/generate-manifest.js)
   ============================================================ */

// ── VIDEOS ────────────────────────────────────────────────────
const counts = { all: CONFIG.videos.length };
CONFIG.videos.forEach(v => { counts[v.categoria] = (counts[v.categoria] || 0) + 1; });

const tabEntries = [['all', 'Todos'], ...Object.entries(CONFIG.categorias).filter(([key]) => counts[key] > 0)];
document.getElementById('catTabs').innerHTML = tabEntries.map(([key, label], i) =>
  `<button class="cat-tab ${i === 0 ? 'active' : ''}" onclick="filterVideos('${key}',this)">${label} (${counts[key] || 0})</button>`
).join('');

const thumbPalette = ['video-thumb-beauty', 'video-thumb-hair', 'video-thumb-skincare', 'video-thumb-life'];
const catKeys = Object.keys(CONFIG.categorias);
function thumbClass(cat) {
  const idx = catKeys.indexOf(cat);
  return thumbPalette[idx % thumbPalette.length] || thumbPalette[0];
}

function buildVideoCard(v) {
  const hasThumb = v.thumb;
  if (v.archivo) {
    const bgStyle = hasThumb ? ` style="background-image:url('${hasThumb}');background-size:cover;background-position:center"` : '';
    return `<div class="video-card has-video ${thumbClass(v.categoria)}" data-cat="${v.categoria}" data-archivo="${v.archivo}"${bgStyle}>
      <video data-src="${v.archivo}" playsinline webkit-playsinline preload="none" muted></video>
      <div class="video-inner"><div class="video-play-btn">▶</div></div>
      <span class="video-cat-tag">${v.etiqueta}</span>
      <div class="video-label">${v.titulo}</div>
    </div>`;
  }
  const bgStyle   = hasThumb ? ` style="background-image:url('${hasThumb}');background-size:cover;background-position:center"` : '';
  const clickAttr = v.url ? ` onclick="window.open(this.dataset.url,'_blank')" data-url="${v.url}"` : '';
  return `<div class="video-card ${thumbClass(v.categoria)}" data-cat="${v.categoria}"${bgStyle}${clickAttr}>
    <div class="video-inner"><div class="video-play-btn">▶</div></div>
    <span class="video-cat-tag">${v.etiqueta}</span>
    <div class="video-label">${v.titulo}</div>
  </div>`;
}

const videoGrid = document.getElementById('videoGrid');
videoGrid.innerHTML = CONFIG.videos.map(buildVideoCard).join('');

videoGrid.addEventListener('click', e => {
  const card = e.target.closest('.video-card.has-video');
  if (!card) return;
  openVideoModal(card.dataset.archivo);
});

function capturePoster(video) {
  const canvas = document.createElement('canvas');
  canvas.width  = video.videoWidth  || 320;
  canvas.height = video.videoHeight || 568;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
  video.preload = 'none';
  const card = video.closest('.video-card');
  if (card) {
    card.style.backgroundImage = `url('${dataUrl}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';
  }
}

function loadVideo(video) {
  if (video.src) return;
  video.src = video.dataset.src;
  video.preload = 'metadata';
  video.addEventListener('loadedmetadata', () => { video.currentTime = 1; }, { once: true });
  video.addEventListener('seeked', () => capturePoster(video), { once: true });
  video.addEventListener('loadeddata', () => { if (!video.poster) capturePoster(video); }, { once: true });
}

const videoLazyObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const video = entry.target.querySelector('video[data-src]');
    if (video) loadVideo(video);
    videoLazyObs.unobserve(entry.target);
  });
}, { rootMargin: '200px' });
document.querySelectorAll('.video-card.has-video').forEach(c => videoLazyObs.observe(c));

// ── MODAL VIDEO ───────────────────────────────────────────────
function openVideoModal(src) {
  const video = document.getElementById('modalVideo');
  const spinner = document.getElementById('modalSpinner');
  video.src = src;
  document.getElementById('videoModal').classList.add('open');
  spinner.classList.add('visible');
  video.addEventListener('canplay', () => spinner.classList.remove('visible'), { once: true });
  video.play().catch(() => {});
  document.body.style.overflow = 'hidden';
  history.pushState({ modal: 'video' }, '');
  document.getElementById('muteBtn').textContent = '🔊';
  document.getElementById('playPauseBtn').textContent = '⏸';
}

function closeVideoModal() {
  const video = document.getElementById('modalVideo');
  video.pause();
  video.src = '';
  document.getElementById('videoModal').classList.remove('open');
  document.getElementById('modalProgressFill').style.width = '0%';
  document.getElementById('modalSpinner').classList.remove('visible');
  document.body.style.overflow = '';
}

function toggleModalPlay() {
  const video = document.getElementById('modalVideo');
  const btn   = document.getElementById('playPauseBtn');
  if (video.paused) { video.play(); btn.textContent = '⏸'; }
  else { video.pause(); btn.textContent = '▶'; }
}

function toggleModalMute() {
  const video = document.getElementById('modalVideo');
  const btn   = document.getElementById('muteBtn');
  video.muted = !video.muted;
  btn.textContent = video.muted ? '🔇' : '🔊';
}

function seekModal(e) {
  const video = document.getElementById('modalVideo');
  const bar   = document.getElementById('modalProgress');
  const rect  = bar.getBoundingClientRect();
  const pct   = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  video.currentTime = pct * video.duration;
}

document.getElementById('modalVideo').addEventListener('timeupdate', () => {
  const video = document.getElementById('modalVideo');
  if (!video.duration) return;
  document.getElementById('modalProgressFill').style.width =
    (video.currentTime / video.duration * 100) + '%';
});

document.getElementById('modalVideo').addEventListener('ended', () => {
  document.getElementById('playPauseBtn').textContent = '▶';
});

document.getElementById('videoModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeVideoModal();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) document.getElementById('modalVideo').pause();
});

new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) closeVideoModal();
}, { threshold: 0.05 }).observe(document.getElementById('videos'));

function filterVideos(cat, btn) {
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.video-card').forEach(c => {
    const show = cat === 'all' || c.dataset.cat === cat;
    if (show) {
      c.style.display = '';
      requestAnimationFrame(() => c.classList.remove('hidden'));
    } else {
      c.classList.add('hidden');
      setTimeout(() => { if (c.classList.contains('hidden')) c.style.display = 'none'; }, 300);
    }
  });
}

// ── FOTOS ─────────────────────────────────────────────────────
const placeholderColors = ['ph-1', 'ph-2', 'ph-3', 'ph-4', 'ph-5'];

function photoPlaceholder(i) {
  return `<div class="photo-ph ${placeholderColors[i % 5]}"><span>foto-${i + 1}.jpg</span></div>`;
}

if (CONFIG.fotos?.length) {
  document.getElementById('photoGrid').innerHTML = CONFIG.fotos.map((f, i) => `
    <div class="photo-item"
        data-src="${f.archivo}"
        data-caption="${f.caption.replace(/"/g, '&quot;')}"
        onclick="openLightbox(this.dataset.src, this.dataset.caption)">
      <img src="${f.archivo}" alt="${f.caption}" loading="lazy"
           class="blur-up" onload="this.classList.add('loaded')"
           onerror="this.parentElement.innerHTML=photoPlaceholder(${i})">
      <div class="photo-overlay"><div class="photo-caption">${f.caption}</div></div>
    </div>`
  ).join('');
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function openLightbox(src, alt) {
  if (!src) return;
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxImg').alt = alt;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ modal: 'foto' }, '');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeVideoModal(); closeLightbox(); }
});

window.addEventListener('popstate', () => {
  closeVideoModal();
  closeLightbox();
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));
setTimeout(() => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(r => revealObs.observe(r));
}, 100);

// ── HAMBURGER ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── SCROLL TO TOP ──────────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── BLUR-UP: imágenes ya en caché ─────────────────────────────
document.querySelectorAll('img.blur-up').forEach(img => {
  if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
});

// ── SCROLL SPY ────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const spyObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
    if (link) link.classList.add('active');
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => spyObs.observe(s));

// ── SWIPE TO CLOSE ────────────────────────────────────────────
function addSwipeClose(el, closeFn) {
  let startY = 0;
  el.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  el.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - startY > 60) closeFn();
  }, { passive: true });
}
addSwipeClose(document.getElementById('videoModal'), closeVideoModal);
addSwipeClose(document.getElementById('lightbox'), closeLightbox);
