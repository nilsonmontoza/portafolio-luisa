# 📁 Portafolio Luisa Maria — Guía de uso

## Estructura de carpetas

```
portafolio-luisa/
│
├── index.html          ← El portafolio (no tocar)
├── config.js           ← ✅ AQUÍ editas TODO: textos, fotos, videos
├── README.md           ← Esta guía
│
├── fotos/
│   ├── hero/           ← Tu foto principal del inicio
│   │   └── principal.jpg
│   ├── productos/      ← Fotos UGC de productos (foto-1.jpg ... foto-5.jpg)
│   │   ├── foto-1.jpg
│   │   ├── foto-2.jpg
│   │   ├── foto-3.jpg
│   │   ├── foto-4.jpg
│   │   └── foto-5.jpg
│   └── porque/         ← Foto para la sección "Sobre mí"
│       └── sobre-mi.jpg
│
└── videos/
    ├── belleza/        ← Videos de maquillaje, skincare
    ├── capilar/        ← Videos de cuidado del cabello
    └── lifestyle/      ← Videos de estilo de vida, comida, bienestar
```

---

## ✅ Cómo agregar fotos

1. Copia tus fotos en las carpetas correspondientes
2. Abre `config.js` y actualiza las rutas:

```js
// Foto principal (hero)
fotoHero: "fotos/hero/principal.jpg",

// Fotos de productos
fotos: [
  { archivo: "fotos/productos/foto-1.jpg", caption: "Mi descripción aquí" },
  // ...
],
```

> **Formatos recomendados:** JPG o WebP  
> **Tamaño recomendado:**  
> - Foto hero: mínimo 700×900 px  
> - Fotos productos: mínimo 600×600 px

---

## ✅ Cómo agregar videos

### Opción A — Video local (archivo en tu computador)
Pon el video en la carpeta correcta y descomenta la línea `archivo`:

```js
{
  titulo: "Review Skincare Rutina AM",
  categoria: "beauty",
  etiqueta: "💄 Belleza",
  archivo: "videos/belleza/skincare-am.mp4",  // ← descomentar esta línea
  url: "",
  thumb: "",
},
```

### Opción B — Link externo (TikTok, YouTube, Drive)
Si el video está en TikTok, Instagram o Google Drive, pega el link en `url`:

```js
{
  titulo: "Review Skincare Rutina AM",
  categoria: "beauty",
  etiqueta: "💄 Belleza",
  url: "https://www.tiktok.com/@tuusuario/video/123456",
  thumb: "fotos/productos/thumb-skincare.jpg",  // miniatura opcional
},
```

---

## ✅ Cómo cambiar textos

Abre `config.js` y edita la sección `perfil`:

```js
perfil: {
  nombre: "Luisa Maria",
  email: "tu@correo.com",
  instagram: "https://instagram.com/tuusuario",
  tiktok: "https://tiktok.com/@tuusuario",
  disponible: true,  // false = muestra "Ocupada"
  // ...
},
```

---

## 🚀 Cómo desplegarlo

### Opción 1 — GitHub Pages (gratis, recomendado)
1. Crea una cuenta en [github.com](https://github.com)
2. Crea un repositorio nuevo (ej: `portafolio-luisa`)
3. Sube todos los archivos y carpetas
4. Ve a Settings → Pages → Source: main → /root
5. Tu portafolio estará en: `https://tuusuario.github.io/portafolio-luisa`

### Opción 2 — Netlify (gratis, muy fácil)
1. Ve a [netlify.com](https://netlify.com) y crea cuenta
2. Arrastra la carpeta `portafolio-luisa/` completa al área de deploy
3. ¡Listo! Te da un link inmediato

### Opción 3 — Vercel (gratis)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta con GitHub o sube los archivos directamente

---

## ⚠️ Importante al desplegar

- Sube **TODAS** las carpetas y archivos juntos (index.html, config.js, fotos/, videos/)
- Los videos pesados (>50MB) es mejor subirlos a YouTube/Drive y usar el campo `url` en lugar de `archivo`
- Las rutas en `config.js` son **relativas** a la carpeta raíz, no uses rutas absolutas como `/Users/tu/Downloads/...`
