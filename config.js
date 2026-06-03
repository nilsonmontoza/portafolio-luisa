/**
 * ============================================================
 *  CONTENIDO DEL PORTAFOLIO — Luisa María
 *  Edita este archivo para agregar o quitar videos y fotos.
 *  Para convertir video: ffmpeg -i video.MOV -vcodec h264 -acodec aac videos/categoria/video.mp4
 * ============================================================
 */

const CONFIG = {

  // ── CATEGORÍAS ────────────────────────────────────────────
  // Solo aparece el tab si hay al menos un video con esa categoría.
  categorias: {
    beauty:   '💄 Belleza',
    hair:     '💇‍♀️ Capilar',
    skincare: '✨ Skincare',
    life:     '🌿 Lifestyle',
  },

  // ── FOTOS ─────────────────────────────────────────────────
  // archivo: ruta de la imagen  |  caption: texto que aparece debajo
  fotos: [
    { archivo: "fotos/productos/desmaquillante.jpg", caption: "Desmaquillante" },
    { archivo: "fotos/productos/remington.jpg",      caption: "Remington" },
  ],

  // ── VIDEOS ────────────────────────────────────────────────
  // archivo: ruta local  |  url: link externo  |  thumb: imagen de preview (opcional)
  videos: [
    {
      titulo:   "Hair Style - Shark",
      categoria: "hair",
      etiqueta: "💇‍♀️ Capilar",
      archivo:  "videos/capilar/hair-style.mp4",
    },
    {
      titulo:   "Unboxing Shark",
      categoria: "hair",
      etiqueta: "🌿 Unboxing",
      archivo:  "videos/capilar/unboxing.mp4",
    },
    {
      titulo:   "Rutina noche Skincare",
      categoria: "skincare",
      etiqueta: "✨ Skincare",
      archivo:  "videos/skincare/skincare.mp4",
    },
    {
      titulo:   "Day in My Life · Carmen",
      categoria: "life",
      etiqueta: "🌿 Lifestyle",
      archivo:  "videos/lifestyle/carmen.mp4",
    },
    {
      titulo:   "Keratin Therapy",
      categoria: "hair",
      etiqueta: "💇‍♀️ Capilar",
      archivo:  "videos/capilar/remington.mp4",
    },
  ],

};
