# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page portfolio for Luisa María, a UGC (User Generated Content) creator from Medellín. No build tools, no dependencies, no backend.

**Production**: https://luisamaria-ugc.github.io/portafolio/ (GitHub Pages, repo: `luisamaria-ugc/portafolio`)

## Development

Open `index.html` directly in a browser, or serve with any static HTTP server:

```
npx serve .
# or
python -m http.server 8080
```

There are no build, lint, or test commands.

**Git workflow**: commit locally freely, but always ask for confirmation before `git push`.

## Architecture

**Hybrid rendering**: Static content (hero, habilidades, servicios, sobre mí, contacto) lives directly in `index.html` as HTML — better for SEO. Dynamic content (videos, fotos) is driven by `config.js` loaded as a `<script>` tag.

### Files

| File | Responsibility |
|---|---|
| `index.html` | HTML skeleton + all static content hardcoded |
| `style.css` | All styles and CSS variables |
| `config.js` | `categorias` + `videos` + `fotos` — **único archivo a editar para contenido** |
| `main.js` | Renders videos and photos dynamically; handles all interactivity |
| `scripts/generate-manifest.js` | Script legacy — ya no se usa |

Load order at bottom of `<body>`: `config.js` → `main.js`.

## Media Assets

```
fotos/
  hero/        → hero portrait (referenced directly in index.html)
  porque/      → about-section portrait (referenced directly in index.html)
  productos/   → product photos (referenced in CONFIG.fotos)
videos/
  capilar/     → categoria: "hair"
  skincare/    → categoria: "skincare"
  lifestyle/   → categoria: "life"
  belleza/     → categoria: "beauty"
```

## Key Patterns

**Adding a video**: append an object to `CONFIG.videos` in `config.js`:
```js
{
  titulo:    "Nombre del video",
  categoria: "hair",           // must match a key in CONFIG.categorias
  archivo:   "videos/capilar/video.mp4",
  // etiqueta: "🌿 Unboxing",  // optional — overrides the category label on the card
  // thumb: "fotos/thumbs/video.jpg",  // optional static thumbnail
  // url: "https://...",               // use instead of archivo for external links
}
```

**Adding a category**: add a key/label to `CONFIG.categorias` in `config.js`. The tab appears automatically once a video uses that key.

**Adding a product photo**: drop the file in `fotos/productos/` and append to `CONFIG.fotos` in `config.js`:
```js
{ archivo: "fotos/productos/garnier.jpg" }
// caption is optional — derived from filename if omitted ("Garnier")
// { archivo: "fotos/productos/garnier.jpg", caption: "Garnier Agua Micelar" }
```

**Changing availability badge**: edit the `.badge-dot` / `.badge-text` in `index.html` directly (search for "Disponible").

**Changing contact info**: edit `#contacto` in `index.html` — email `href`, social links.

## Color System

All colors are CSS variables defined at `:root` in `style.css`:

| Variable | Value | Use |
|---|---|---|
| `--terracotta` | `#C4714A` | Primary accent |
| `--terracotta-light` | `#D9896A` | Hover states |
| `--espresso` | `#3B2314` | Body text |
| `--cream` | `#FDF6EE` | Page background |
| `--blush` | `#E8C4A8` | Soft accents |
| `--caramel` | `#B07848` | Secondary text |
| `--sage` | `#8A9E82` | Available badge |
| `--gold` | `#C9972A` | Highlights |
| `--sand` | `#E8D5BE` | Borders, placeholders |

## main.js Responsibilities

- **Videos**: builds tabs from `CONFIG.categorias`, renders grid, lazy-loads video metadata for poster capture, handles category filter with fade animation
- **Modal de video**: open/close, play/pause, mute, seek, progress bar, spinner while loading, swipe-down to close on mobile
- **Fotos**: renders grid from `CONFIG.fotos`, caption derived from filename if not set, lightbox, swipe-down to close
- **Scroll spy**: highlights active nav link via IntersectionObserver
- **Scroll reveal**: `.reveal` elements fade in as they enter the viewport
- **Hamburger menu**: mobile nav open/close
- **Scroll to top**: appears after 400px scroll

## Responsive

Single breakpoint: `@media (max-width: 900px)` in `style.css`.
