/**
 * ============================================================
 *  CONFIGURACIÓN DEL PORTAFOLIO - LUISA MARIA
 *  Edita este archivo para cambiar textos, fotos y videos
 * ============================================================
 */

const CONFIG = {

  // ── INFORMACIÓN PERSONAL ──────────────────────────────────
  perfil: {
    nombre: "Luisa María",
    apellido: "",
    rol: "UGC Creator · Community Manager",
    ciudad: "Medellín, Colombia",
    edad: "26 años",
    bio: "Creo contenido real y auténtico que conecta con personas de verdad. Me enfoco en belleza, cuidado capilar y lifestyle, mostrando las marcas de forma natural en el día a día. Busco que cada video genere confianza y resultados.",
    disponible: true, // true = muestra badge "Disponible"
    email: "londonoluisa81@gmail.com",
    instagram: "https://instagram.com/luisa_ln",
    tiktok: "https://tiktok.com/@luisa_ln",
    año: "2026",
  },

  // ── FOTO PRINCIPAL (HERO) ─────────────────────────────────
  // Pon tu foto en: fotos/hero/
  // Ejemplo: fotos/hero/principal.jpeg
  fotoHero: "fotos/hero/principal.jpeg",

  // ── FOTO SECCIÓN "SOBRE MÍ" ───────────────────────────────
  // Pon tu foto en: fotos/porque/
  fotoPorque: "fotos/porque/sobre-mi.jpeg",

  // ── ESTADÍSTICAS ─────────────────────────────────────────
  stats: [
    { numero: "8+",  label: "Videos por pack" },
    { numero: "5d",  label: "Entrega promedio" },
    { numero: "6",   label: "Nichos de contenido" },
  ],

  // ── TEXTO SECCIÓN "SOBRE MÍ" ──────────────────────────────
  sobreMi: [
    "Me llamo Luisa María, tengo 26 años y vivo en Medellín. Me apasiona crear contenido que se siente real y cercano. Me gusta mostrar los productos de forma natural, como en el día a día, porque sé que así es como realmente conectan con las personas.",
    "Actualmente estoy enfocada en crear contenido para redes sociales y e-commerce, encargándome de todo el proceso: desde la idea hasta la edición final. Me interesa trabajar con marcas de belleza, cuidado capilar y lifestyle que valoren lo real sobre lo perfecto.",
  ],

  // ── HABILIDADES ───────────────────────────────────────────
  habilidades: [
    { icono: "🎬", titulo: "Creación UGC",         desc: "Contenido real y natural que conecta con las personas y genera confianza en la marca." },
    { icono: "📲", titulo: "Community Manager",    desc: "Manejo de redes de forma cercana y constante, creando contenido y conexión real con la audiencia." },
    { icono: "💄", titulo: "Nicho Belleza",         desc: "Reseñas, tutoriales y demos de productos de maquillaje, skincare y cuidado personal." },
    { icono: "💇‍♀️", titulo: "Cuidado Capilar",   desc: "Rutinas, reseñas y contenido sobre tratamientos y productos para el cabello." },
    { icono: "🌿", titulo: "Lifestyle & Vlogs",    desc: "Contenido de vida diaria, comida, bienestar mostrando experiencias reales de forma natural.." },
    { icono: "📸", titulo: "Fotografía de Producto", desc: "Fotos detalle y posando con producto para uso en redes, e-commerce y campañas digitales." },
  ],
  
  // ── VIDEOS ────────────────────────────────────────────────
  // Pon tus videos en las carpetas: videos/belleza/ | videos/capilar/ | videos/lifestyle/
  // Para cada video puedes poner:
  //   - archivo: ruta al video local (ej: "videos/belleza/skincare.mp4")
  //   - url: link externo (TikTok, YouTube, Drive) — usa esto si no quieres subir el archivo
  //   - thumb: imagen de preview (ej: "fotos/productos/thumb-skincare.jpg") — opcional
  // Para convertir video usa 
  // ffmpeg -i videos/skincare/skincare.MOV -vcodec h264 -acodec aac -strict -2 videos/skincare/skincare.mp4
  videos: [
    /*{
      titulo: "Review Skincare Rutina AM",
      categoria: "beauty",
      etiqueta: "💄 Belleza",
      // archivo: "videos/belleza/skincare-am.mp4",
      url: "",           // ← pega aquí el link de TikTok/YouTube/Drive si lo tienes
      thumb: "",         // ← ruta a imagen de miniatura (opcional)
    },*/
    {
      titulo: "Hair Style - Shark",
      categoria: "hair",
      etiqueta: "💇‍♀️ Capilar",
      archivo: "videos/capilar/hair-style.mp4",
      url: "",
      thumb: "",
    },
    {
      titulo: "Unboxing Shark ",
      categoria: "hair",
      etiqueta: "🌿 Unboxing",
      archivo: "videos/capilar/unboxing.mp4",
      url: "", 
      thumb: "",
    },
    {
      titulo: "Rutina noche Skincare",
      categoria: "skincare",
      etiqueta: "🌿 skincare",
      archivo: "videos/skincare/skincare.mp4",
      url: "", 
      thumb: "",
    },
    {
      titulo: "Day in My Life · Medellín",
      categoria: "life",
      etiqueta: "🌿 Lifestyle",
      archivo: "videos/lifestyle/day-in-my-life.mp4",
      url: "",
      thumb: "",
    }
  ],

  // ── FOTOS DE PRODUCTOS ────────────────────────────────────
  // Pon tus fotos en: fotos/productos/
  // caption = texto que aparece al hacer hover
  fotos: [
    { archivo: "fotos/productos/remington.jpg", caption: "REMINGTON" },
    { archivo: "fotos/productos/desmaquillante.jpeg", caption: "DESMAQUILLANTE BIFÁSICO" }
  ],

  // ── SERVICIOS ─────────────────────────────────────────────
  servicios: [
    { numero: "01", titulo: "Pack UGC Belleza",      desc: "2 videos auténticos para beauty: skincare, maquillaje o fragancias. Entrega en 5 días hábiles." },
    { numero: "02", titulo: "Pack Cuidado Capilar",  desc: "3 videos sobre rutinas, tratamientos y reseñas de productos capilares." },
    { numero: "03", titulo: "Pack Lifestyle & Vlogs", desc: "3 videos de vida diaria, comida o bienestar que integran tu producto de forma natural." },
    { numero: "04", titulo: "Pack Completo UGC",     desc: "8 videos + fotos UGC (detalle y posando). Ideal para lanzamientos o campañas." },
    { numero: "05", titulo: "Community Manager",     desc: "Gestión mensual de redes: estrategia, contenido, publicación, respuesta a comunidad y reportes." },
    { numero: "06", titulo: "Foto UGC",              desc: "Set de fotos profesionales: detalle de producto, flatlay y tomas posando para e-commerce y redes." },
  ],

};
