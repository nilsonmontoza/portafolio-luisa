/* ============================================================
   MOTOR DEL PORTAFOLIO — lee CONFIG y construye la página
   ============================================================ */

// ── NAV ──────────────────────────────────────────────────────
document.getElementById('navLogo').textContent = CONFIG.perfil.nombre;

const socialHTML = `
  <a href="${CONFIG.perfil.instagram}" target="_blank" rel="noopener noreferrer" title="Instagram">IG</a>
  <a href="${CONFIG.perfil.tiktok}" target="_blank" rel="noopener noreferrer" title="TikTok">TK</a>`;
document.getElementById('navSocial').innerHTML = socialHTML;
document.getElementById('mobileMenuSocial').innerHTML = socialHTML;

// ── HERO ─────────────────────────────────────────────────────
document.getElementById('heroTag').textContent = CONFIG.perfil.rol;
document.getElementById('heroH1').innerHTML = `Hola, soy<br><em>${CONFIG.perfil.nombre}</em>`;
document.getElementById('heroSubtitle').textContent = `${CONFIG.perfil.ciudad} · ${CONFIG.perfil.edad}`;
document.getElementById('heroBio').textContent = CONFIG.perfil.bio;

const heroPhoto = document.getElementById('heroPhoto');
if (CONFIG.fotoHero) {
  heroPhoto.innerHTML = `<img src="${CONFIG.fotoHero}" alt="Foto de ${CONFIG.perfil.nombre}" loading="eager" onerror="this.parentElement.innerHTML=fotoPlaceholderHero()">`;
} else {
  heroPhoto.innerHTML = fotoPlaceholderHero();
}
function fotoPlaceholderHero() {
  return `<div class="photo-placeholder">
    <svg width="52" height="52" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,.7)" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,.7)" stroke-width="1.5" stroke-linecap="round"/></svg>
    <p>Tu foto aquí<br><small>fotos/hero/principal.jpg</small></p>
  </div>`;
}

document.getElementById('heroBadge').innerHTML = `
  <div class="badge-dot ${CONFIG.perfil.disponible ? '' : 'ocupada'}"></div>
  <div>
    <div class="badge-text">${CONFIG.perfil.disponible ? 'Disponible' : 'Ocupada'}</div>
    <div class="badge-sub">para colaboraciones</div>
  </div>`;

// ── HABILIDADES ───────────────────────────────────────────────
document.getElementById('skillsGrid').innerHTML = CONFIG.habilidades.map(s => `
  <div class="skill-card reveal">
    <div class="skill-icon">${s.icono}</div>
    <h3>${s.titulo}</h3>
    <p>${s.desc}</p>
  </div>`).join('');

// ── VIDEOS ────────────────────────────────────────────────────
const counts = { all: CONFIG.videos.length };
CONFIG.videos.forEach(v => { counts[v.categoria] = (counts[v.categoria] || 0) + 1; });

// Tabs dinámicos: leídos de CONFIG.categorias, solo se muestran los que tienen videos
const tabEntries = [['all', 'Todos'], ...Object.entries(CONFIG.categorias).filter(([key]) => counts[key] > 0)];
document.getElementById('catTabs').innerHTML = tabEntries.map(([key, label], i) =>
  `<button class="cat-tab ${i === 0 ? 'active' : ''}" onclick="filterVideos('${key}',this)">${label} (${counts[key] || 0})</button>`
).join('');

// Paleta de colores de thumb rotativa para categorías arbitrarias
const thumbPalette = ['video-thumb-beauty', 'video-thumb-hair', 'video-thumb-skincare', 'video-thumb-life'];
const catKeys = Object.keys(CONFIG.categorias);
function thumbClass(cat) {
  const idx = catKeys.indexOf(cat);
  return thumbPalette[idx % thumbPalette.length] || thumbPalette[0];
}

function buildVideoCard(v) {
  const hasThumb = v.thumb;
  if (v.archivo) {
    return `<div class="video-card has-video ${thumbClass(v.categoria)}" data-cat="${v.categoria}" data-archivo="${v.archivo}">
      <video data-src="${v.archivo}" playsinline webkit-playsinline preload="none"${hasThumb ? ` poster="${hasThumb}"` : ''}></video>
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

// Captura el primer frame y lo usa como poster (thumbnail sin archivo separado)
function capturePoster(video) {
  const canvas = document.createElement('canvas');
  canvas.width  = video.videoWidth  || 320;
  canvas.height = video.videoHeight || 568;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  video.poster = canvas.toDataURL('image/jpeg', 0.75);
  video.preload = 'none';
  video.classList.add('ready');
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
  video.src = src;
  document.getElementById('videoModal').classList.add('open');
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
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
}

// ── FOTOS ─────────────────────────────────────────────────────
const placeholderColors = ['ph-1', 'ph-2', 'ph-3', 'ph-4', 'ph-5'];
document.getElementById('photoGrid').innerHTML = CONFIG.fotos.map((f, i) => {
  const content = f.archivo
    ? `<img src="${f.archivo}" alt="${f.caption}" loading="lazy" onerror="this.parentElement.innerHTML=photoPlaceholder(${i})">`
    : `<div class="photo-ph ${placeholderColors[i % 5]}">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M21 15l-5-5L5 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <span>fotos/productos/foto-${i + 1}.jpg</span>
      </div>`;
  return `<div class="photo-item"
      data-src="${f.archivo || ''}"
      data-caption="${f.caption.replace(/"/g, '&quot;')}"
      onclick="openLightbox(this.dataset.src, this.dataset.caption)">
    ${content}
    <div class="photo-overlay"><div class="photo-caption">${f.caption}</div></div>
  </div>`;
}).join('');

function photoPlaceholder(i) {
  return `<div class="photo-ph ${placeholderColors[i % 5]}"><span>foto-${i + 1}.jpg</span></div>`;
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

// ── SERVICIOS ─────────────────────────────────────────────────
document.getElementById('servicesGrid').innerHTML = CONFIG.servicios.map(s => `
  <div class="service-card reveal">
    <div class="service-number">${s.numero}</div>
    <h3>${s.titulo}</h3>
    <p>${s.desc}</p>
  </div>`).join('');

// ── SOBRE MÍ ─────────────────────────────────────────────────
const porquePh = document.getElementById('porquePh');
if (CONFIG.fotoPorque) {
  porquePh.innerHTML = `<img src="${CONFIG.fotoPorque}" alt="${CONFIG.perfil.nombre}" loading="lazy" onerror="this.innerHTML=porquePlaceholder()">`;
} else {
  porquePh.innerHTML = porquePlaceholder();
}
function porquePlaceholder() {
  return `<svg width="52" height="52" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,.7)" stroke-width="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,.7)" stroke-width="1.5" stroke-linecap="round"/></svg>
  <span style="color:rgba(255,255,255,.6);font-size:.8rem">fotos/porque/sobre-mi.jpg</span>`;
}

document.getElementById('porqueTexto').innerHTML = CONFIG.sobreMi.map(p =>
  `<p style="font-size:.93rem;line-height:1.8;color:var(--caramel);font-weight:300;margin-bottom:16px">${p}</p>`
).join('');

document.getElementById('statsRow').innerHTML = CONFIG.stats.map(s => `
  <div class="stat">
    <div class="stat-num">${s.numero}</div>
    <div class="stat-label">${s.label}</div>
  </div>`).join('');

// ── CONTACTO ─────────────────────────────────────────────────
document.getElementById('contactoH2').innerHTML = `¿Colaboramos<br><span style="color:rgba(255,255,255,.7);font-style:italic;font-family:'Playfair Display',serif">juntos?</span>`;
const emailEl = document.getElementById('contactoEmail');
emailEl.href = `mailto:${CONFIG.perfil.email}`;
emailEl.textContent = CONFIG.perfil.email;

document.getElementById('socialLinks').innerHTML = `
  <a href="${CONFIG.perfil.instagram}" target="_blank" rel="noopener noreferrer" class="social-link">📸 Instagram</a>
  <a href="${CONFIG.perfil.tiktok}" target="_blank" rel="noopener noreferrer" class="social-link">🎵 TikTok</a>`;

document.getElementById('footerEl').textContent =
  `© ${CONFIG.perfil.año} ${CONFIG.perfil.nombre} ${CONFIG.perfil.apellido} · UGC Creator · ${CONFIG.perfil.ciudad}`;

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
