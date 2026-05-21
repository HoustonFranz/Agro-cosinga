/* =========================================================
   Carga dinámica de productos desde data/products.json
   - En index.html: muestra solo destacados.
   - En productos.html: muestra todos con filtros por categoría.
   ========================================================= */

(function () {
  const WHATSAPP_NUMBER = '902345673';

  async function loadProducts() {
    try {
      const res = await fetch('/data/products.json');
      if (!res.ok) throw new Error('No se pudo cargar products.json');
      return await res.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  function productCard(p) {
    const msg = encodeURIComponent(`Hola Agro Cosinga, deseo más información sobre el producto: ${p.nombre}.`);
    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    const tag = p.tag ? `<span class="product-card__tag">${p.tag}</span>` : '';
    return `
      <article class="product-card" data-category="${p.categoria}" data-aos="fade-up">
        <div class="product-card__media">
          ${tag}
          <img src="${p.imagen}" alt="${p.nombre}" class="product-card__img" loading="lazy">
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${p.categoria}</span>
          <h3 class="product-card__title">${p.nombre}</h3>
          <p class="product-card__desc">${p.descripcion}</p>
          <a href="${link}" target="_blank" rel="noopener" class="product-card__cta">
            <i class="fa-brands fa-whatsapp"></i> Consultar por WhatsApp
          </a>
        </div>
      </article>
    `;
  }

  function render(grid, list) {
    grid.innerHTML = list.length
      ? list.map(productCard).join('')
      : `<p style="grid-column:1/-1;text-align:center;color:#5b6760;">No hay productos disponibles en esta categoría.</p>`;
    if (window.AOS) AOS.refresh();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const isHome = (location.pathname.split('/').pop() || 'index.html').toLowerCase() === 'index.html'
                || location.pathname === '/' || location.pathname.endsWith('/');

    const all = await loadProducts();
    const initial = isHome ? all.filter(p => p.destacado) : all;
    render(grid, initial);

    // Filtros (solo si existen en la página)
    const filters = document.querySelectorAll('.filter-btn');
    if (filters.length) {
      filters.forEach(btn => {
        btn.addEventListener('click', () => {
          filters.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          const cat = btn.dataset.filter;
          const filtered = cat === 'all' ? all : all.filter(p => p.categoria === cat);
          render(grid, filtered);
        });
      });
    }
  });
})();
