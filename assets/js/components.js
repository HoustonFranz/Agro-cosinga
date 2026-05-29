/* =========================================================
   Componentes reutilizables (Navbar y Footer)
   Inyectados dinámicamente en cada página para mantener
   una única fuente de verdad sin frameworks.
   ========================================================= */

(function () {
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const isActive = (href) => href === currentPage ? 'is-active' : '';

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand"><i class="fa-solid fa-leaf"></i> Agro Cosinga</div>
            <p>Distribución profesional de fertilizantes, insecticidas, fungicidas y abonos en Satipo y la selva central del Perú.</p>
            <div class="footer__social">
              <a href="https://www.facebook.com/share/1GwCoLppv5/" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="https://wa.me/51921094973" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>


          <div>
            <h4>Contacto</h4>
            <ul>
              <li><i class="fa-solid fa-location-dot"></i> Satipo, Junín - Perú</li>
              <li><i class="fa-brands fa-whatsapp"></i> +51 921 094 973</li>
              <li><i class="fa-solid fa-envelope"></i> Agrocosingasoluciones@gmail.com</li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          © ${new Date().getFullYear()} Agro Cosinga · Todos los derechos reservados.
        </div>
      </div>
    </footer>
  `;

  document.addEventListener('DOMContentLoaded', () => {
    const footEl = document.getElementById('footer-placeholder');
    if (footEl) footEl.innerHTML = footerHTML;

  });
})();
