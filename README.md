# Agro Cosinga — Web Corporativa

Sitio web corporativo profesional para **Agro Cosinga** (Satipo, Junín — Perú), empresa dedicada a la comercialización de fertilizantes, insecticidas, fungicidas, abonos y productos agrícolas en general.

Desarrollado con **arquitectura frontend clásica**: HTML5, CSS3 y JavaScript Vanilla — sin frameworks (no React, Next.js ni Vue).

---

## 📁 Estructura del proyecto

```
project/
├── index.html              # Página principal (Home)
├── productos.html          # Catálogo con filtros
├── nosotros.html           # Información corporativa
├── contacto.html           # Formulario y datos de contacto
├── assets/
│   ├── css/
│   │   └── styles.css      # Hoja de estilos principal (CSS Variables, Grid, Flexbox)
│   ├── js/
│   │   ├── components.js   # Navbar + Footer reutilizables
│   │   ├── products.js     # Carga dinámica de productos desde JSON
│   │   └── main.js         # Inicialización (AOS, formulario)
│   ├── images/             # Imágenes reales (vacío — reemplazar placeholders)
│   └── icons/              # Iconos propios (opcional)
├── data/
│   └── products.json       # Catálogo de productos (fuente única)
├── components/             # Reservado para futuros parciales HTML
└── utils/                  # Reservado para helpers JS adicionales
```

### Propósito de cada carpeta

| Carpeta | Propósito |
|---|---|
| `assets/css/` | Estilos globales. Toda la identidad visual se define con **CSS Variables** en `:root`. |
| `assets/js/`  | Lógica modular separada por responsabilidad (componentes, productos, app). |
| `assets/images/` | Aquí van las imágenes reales que reemplazarán los placeholders. |
| `data/` | Fuente de datos (JSON). Permite escalar el catálogo sin tocar HTML. |
| `components/` | Reservado para agregar más parciales HTML (banners, testimonios, etc.). |
| `utils/` | Reservado para helpers (formatters, validators, etc.). |

---

## ⚙️ Carga dinámica de productos desde JSON

El catálogo vive en `data/products.json`. Cada producto tiene la siguiente estructura:

```json
{
  "id": 1,
  "nombre": "Fertilizante NPK 20-20-20",
  "categoria": "fertilizantes",
  "descripcion": "Fórmula balanceada...",
  "destacado": true,
  "tag": "Más vendido",
  "imagen_placeholder": "Insertar imagen fertilizante NPK"
}
```

El script `assets/js/products.js`:

1. Hace `fetch('data/products.json')` al cargar la página.
2. En `index.html` filtra y muestra solo los productos con `destacado: true`.
3. En `productos.html` los muestra todos y aplica filtros por **categoría** al hacer clic en los botones `.filter-btn`.
4. Cada card genera automáticamente un enlace a **WhatsApp** con un mensaje pre-formateado:
   ```
   Hola Agro Cosinga, deseo más información sobre el producto: <nombre>.
   ```

> Para añadir, editar o eliminar productos basta con modificar `data/products.json` — no se toca el HTML.

---

## 🧩 Componentes reutilizables (arquitectura clásica)

Sin frameworks, la reutilización se logra inyectando HTML desde JavaScript:

- En cada página colocamos:
  ```html
  <div id="navbar-placeholder"></div>
  <div id="footer-placeholder"></div>
  ```
- `assets/js/components.js` define el Navbar y el Footer como strings de HTML y los inyecta al `DOMContentLoaded`.
- Marca automáticamente como `.is-active` el enlace de la página actual.
- Maneja el toggle del menú móvil.

Para **modificar Navbar o Footer**: editar únicamente `assets/js/components.js`. El cambio se refleja en las 4 páginas.

---

## 🖼️ Cómo reemplazar los placeholders por imágenes reales

Cada sección visual contiene bloques como:

```html
<div class="image-placeholder">Insertar imagen fertilizantes</div>
```

Para reemplazarlos:

1. Coloca la imagen en `assets/images/` (por ejemplo `fertilizantes.jpg`).
2. Sustituye el div por:
   ```html
   <img src="assets/images/fertilizantes.jpg" alt="Fertilizantes Agro Cosinga" loading="lazy">
   ```
3. En el caso del **hero**, reemplaza el bloque dentro de `.hero__media` por una `<img>` con `object-fit: cover; width:100%; height:100%;`.

Para productos del JSON, sustituye `imagen_placeholder` por un nuevo campo `imagen: "assets/images/producto-x.jpg"` y ajusta `products.js` para renderizar `<img>` en lugar del placeholder.

---

## 🎨 Cómo modificar los estilos

Toda la identidad visual está centralizada en CSS Variables en `assets/css/styles.css`:

```css
:root {
  --color-primary: #2f6b34;   /* verde agrícola */
  --color-accent:  #f2b900;   /* amarillo agrícola */
  --color-earth:   #8a6a3b;   /* tonos tierra */
  --font-display:  'Plus Jakarta Sans', sans-serif;
  --font-body:     'Inter', sans-serif;
  --radius-md:     14px;
  ...
}
```

Cambiar un color o una fuente en `:root` actualiza **todo el sitio** automáticamente.

---

## 📈 Cómo escalar el proyecto

- **Más productos** → editar `data/products.json`.
- **Nueva sección reutilizable** → crearla como string en `components.js` o como parcial HTML en `components/` cargado con `fetch`.
- **Nuevas páginas** → crear un `.html` más y reutilizar los placeholders de Navbar/Footer.
- **Internacionalización** → mover los textos a un `data/i18n.json` y renderizarlos con un helper.
- **Performance** → todas las dependencias (AOS, Font Awesome) están en CDN y son ligeras; no requieren build step.

---

## 🔁 Diferencias frente a React / Next.js

| Aspecto | Arquitectura clásica (este proyecto) | React / Next.js |
|---|---|---|
| **Build** | No requiere. Se abre directamente en navegador. | Requiere Node, bundler (Vite/Webpack) y proceso de build. |
| **Componentes** | HTML inyectado por JS (strings) o parciales con `fetch`. | Componentes JSX con estado y props. |
| **Estado** | Variables en módulos JS. | `useState`, `useReducer`, stores. |
| **Routing** | Una página HTML por ruta (multi-page). | SPA con React Router o file-based en Next. |
| **SEO** | Excelente por defecto (HTML servido como está). | Requiere SSR/SSG (Next.js) para igualarlo. |
| **Carga inicial** | Mínima, solo HTML/CSS. | Bundle JS más grande. |
| **Curva de aprendizaje** | Muy baja. | Media-alta. |
| **Escalabilidad UI compleja** | Limitada (sin reactividad). | Alta. |
| **Hosting** | Cualquier hosting estático (incluso un FTP). | Vercel/Netlify o Node server. |

Esta arquitectura es **ideal** para una web corporativa estática con catálogo dinámico ligero — exactamente el caso de Agro Cosinga.

---

## 🚀 Cómo ejecutarlo localmente

Como `products.js` usa `fetch`, necesitas un servidor estático (no abrir con `file://`):

```bash
# Opción 1: con Python
python3 -m http.server 8080

# Opción 2: con Node
npx serve .
```

Luego abre [http://localhost:8080](http://localhost:8080).

---

## 📞 WhatsApp

El número configurado por defecto es `+51 999 999 999`.
Para cambiarlo, busca y reemplaza `51999999999` en:

- `assets/js/components.js`
- `assets/js/products.js`
- `assets/js/main.js`
- Los 4 archivos `.html`

---

© Agro Cosinga · Satipo, Junín — Perú
