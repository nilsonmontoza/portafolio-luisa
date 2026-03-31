/**
 * ============================================================
 *  CONFIGURACIÓN DEL PORTAFOLIO - LUISA MARIA
 *  Edita este archivo para cambiar textos, fotos y videos
 * ============================================================
 */

const CONFIG = {

  // ── INFORMACIÓN PERSONAL ──────────────────────────────────
  perfil: {
    nombre: "Luisa Maria",
    apellido: "",
    rol: "UGC Creator · Community Manager",
    ciudad: "Medellín, Colombia",
    edad: "26 años",
    bio: "Creo contenido auténtico que conecta marcas con personas reales. Especializada en belleza, cuidado capilar y lifestyle — cada video cuenta una historia que genera confianza y conversión.",
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
    "Me llamo Luisa Maria, tengo 26 años y vivo en Medellín. Me apasiona crear contenido genuino que ayuda a las marcas a conectar con personas reales. No es solo hacer videos — es contar historias que generan confianza.",
    "Entrego contenido listo para usar en Instagram, TikTok y e-commerce, con guión, producción y edición incluidos. Trabajo con marcas de belleza, salud y lifestyle que valoran la autenticidad sobre la perfección fabricada.",
  ],

  // ── HABILIDADES ───────────────────────────────────────────
  habilidades: [
    { icono: "🎬", titulo: "Creación UGC",         desc: "Videos auténticos y persuasivos para marcas. Desde la idea hasta la edición final, enfocados en conversión." },
    { icono: "📲", titulo: "Community Manager",    desc: "Gestión de redes sociales, creación de calendarios de contenido y estrategia de engagement." },
    { icono: "💄", titulo: "Nicho Belleza",         desc: "Reseñas, tutoriales y demos de productos de maquillaje, skincare y cuidado personal." },
    { icono: "💇‍♀️", titulo: "Cuidado Capilar",   desc: "Rutinas, reseñas y contenido educativo sobre tratamientos y productos para el cabello." },
    { icono: "🌿", titulo: "Lifestyle & Vlogs",    desc: "Contenido de vida diaria, comida, bienestar y experiencias que conectan emocionalmente." },
    { icono: "📸", titulo: "Fotografía de Producto", desc: "Fotos detalle y posando con producto para uso en redes, e-commerce y campañas digitales." },
  ],

  // ── VIDEOS ────────────────────────────────────────────────
  // Pon tus videos en las carpetas: videos/belleza/ | videos/capilar/ | videos/lifestyle/
  // Para cada video puedes poner:
  //   - archivo: ruta al video local (ej: "videos/belleza/skincare.mp4")
  //   - url: link externo (TikTok, YouTube, Drive) — usa esto si no quieres subir el archivo
  //   - thumb: imagen de preview (ej: "fotos/productos/thumb-skincare.jpg") — opcional
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
      titulo: "Day in My Life · Medellín",
      categoria: "life",
      etiqueta: "🌿 Lifestyle",
      archivo: "videos/lifestyle/day-in-my-life.mp4",
      url: "",
      thumb: "",
    },
    {
      titulo: "Sales ",
      categoria: "life",
      etiqueta: "🌿 Lifestyle",
      //archivo: "videos/belleza/skincare-am.mp4",
      url: "https://www.tiktok.com/@alaioslingerie_/video/7610919351390063879?is_from_webapp=1&sender_device=pc", 
      thumb: "fotos/productos/sales.jpg",
    },
  ],

  // ── FOTOS DE PRODUCTOS ────────────────────────────────────
  // Pon tus fotos en: fotos/productos/
  // caption = texto que aparece al hacer hover
  fotos: [
    { archivo: "fotos/productos/foto-1.jpg", caption: "Posando con producto · Fullbody" },
    { archivo: "fotos/productos/foto-2.jpg", caption: "Detalle de producto · Flatlay" },
    { archivo: "fotos/productos/foto-3.jpg", caption: "Lifestyle · Capilar" },
    { archivo: "fotos/productos/foto-4.jpg", caption: "Aplicando producto · Beauty" },
    { archivo: "fotos/productos/foto-5.jpg", caption: "Overhead · Detalle producto" },
  ],

  // ── SERVICIOS ─────────────────────────────────────────────
  servicios: [
    { numero: "01", titulo: "Pack UGC Belleza",      desc: "2 videos auténticos para nicho beauty: skincare, maquillaje o fragrancias. Entrega en 5 días hábiles." },
    { numero: "02", titulo: "Pack Cuidado Capilar",  desc: "3 videos especializados en tratamientos, rutinas y reseñas de productos capilares." },
    { numero: "03", titulo: "Pack Lifestyle & Vlogs", desc: "3 videos de vida diaria, comida o bienestar que integran tu producto de forma natural." },
    { numero: "04", titulo: "Pack Completo UGC",     desc: "8 videos + fotos UGC (detalle y posando). Ideal para lanzamientos de producto o campañas completas." },
    { numero: "05", titulo: "Community Manager",     desc: "Gestión mensual de redes: estrategia, contenido, publicación, respuesta a comunidad y reportes." },
    { numero: "06", titulo: "Foto UGC",              desc: "Set de fotos profesionales: detalle de producto, flatlay y tomas posando para e-commerce y redes." },
  ],

};
