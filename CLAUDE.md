# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page portfolio for Luisa María, a UGC (User Generated Content) creator from Medellín. No build tools, no dependencies, no backend.

## Development

Open `index.html` directly in a browser, or serve with any static HTTP server:

```
npx serve .
# or
python -m http.server 8080
```

There are no build, lint, or test commands.

## Architecture

**Configuration-driven rendering**: All editable content lives in `config.js` as a single `CONFIG` object. `main.js` reads this config and dynamically renders every section on load. To change text, photos, videos, or services — edit `config.js` only.

**Three-file structure**: `index.html` is the HTML skeleton, `style.css` holds all styles, and `main.js` is the rendering engine. `config.js` must be loaded before `main.js` (both as plain `<script>` tags at the bottom of `<body>`). The rendering engine populates nav, hero, skills, videos, photos, and services from `CONFIG`; it also handles video filtering by category, one-at-a-time video playback, lightbox for photos, scroll-reveal animations, hamburger menu, and scroll-to-top.

**Media assets**:
- `fotos/hero/` — hero portrait
- `fotos/porque/` — about-section portrait
- `fotos/productos/` — product photos (referenced in `CONFIG.photos`)
- `videos/capilar/`, `videos/lifestyle/`, `videos/skincare/` — local video files (referenced in `CONFIG.videos`)

## Color System

All colors are CSS variables defined at `:root` in `index.html`:

| Variable | Value | Use |
|---|---|---|
| `--terracotta` | `#C4714A` | Primary accent |
| `--espresso` | `#3B2314` | Body text |
| `--cream` | `#FDF6EE` | Page background |
| `--sage` | `#8A9E82` | Secondary accent |
| `--gold` | `#C9972A` | Highlights |

## Key Patterns

- **Adding a category**: add a key/label entry to `CONFIG.categorias` in `config.js` (e.g., `fitness: '🏋️ Fitness'`). The tab appears automatically once a video uses that key. No changes to `main.js` needed.
- **Adding a video**: append an object to `CONFIG.videos` in `config.js`. The `categoria` field must match a key defined in `CONFIG.categorias`.
- **Adding a product photo**: append to `CONFIG.photos` in `config.js` with `src` pointing to a file in `fotos/productos/`.
- **Availability badge**: set `CONFIG.personal.available` to `true` or `false` in `config.js`.
- **Responsive breakpoint**: a single `@media (max-width: 900px)` block handles all mobile layout changes.
