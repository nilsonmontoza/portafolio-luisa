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
  // Solo necesitas el archivo. El caption sale del nombre del archivo.
  // caption es opcional si quieres un texto distinto al nombre.
  fotos: [
    { archivo: "fotos/productos/desmaquillante.jpg" },
    { archivo: "fotos/productos/remington.jpg" },
  ],

  // ── VIDEOS ────────────────────────────────────────────────
  // titulo y categoria son obligatorios. archivo o url (no ambos).
  // etiqueta es opcional — si se omite, usa el label de la categoría.
  videos: [
    {
      titulo:    "Hair Style - Shark",
      categoria: "hair",
      archivo:   "videos/capilar/hair-style.mp4",
    },
    {
      titulo:    "Unboxing Shark",
      categoria: "hair",
      etiqueta:  "🌿 Unboxing",
      archivo:   "videos/capilar/unboxing.mp4",
    },
    {
      titulo:    "Rutina noche Skincare",
      categoria: "skincare",
      archivo:   "videos/skincare/skincare.mp4",
    },
    {
      titulo:    "Day in My Life · Carmen",
      categoria: "life",
      archivo:   "videos/lifestyle/carmen.mp4",
    },
    {
      titulo:    "Keratin Therapy",
      categoria: "hair",
      archivo:   "videos/capilar/remington.mp4",
    },
    {
      titulo:    "Unboxing Atenea",
      categoria: "life",
      url:       "https://www.tiktok.com/@luisa_ln/video/7644387932513504532?_r=1&_t=ZS-97g3tnx8rRc",
      thumb:     "fotos/Atenea.jpeg"
    },
    {
      titulo:    "Unboxing Shein",
      categoria: "life",
      url:       "https://www.tiktok.com/@luisa_ln/video/7644735813510548757?_r=1&_t=ZS-97g3vqXO95g",
      thumb:     "fotos/Shein.jpeg"
    }
  ],

};
