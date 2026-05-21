/* =========================================================
   Componentes reutilizables (Navbar y Footer)
   Inyectados dinámicamente en cada página para mantener
   una única fuente de verdad sin frameworks.
   ========================================================= */

(function () {
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navLinks = [
    { href: 'index.html',     label: 'Inicio' },
    { href: 'productos.html', label: 'Productos' },
    { href: 'nosotros.html',  label: 'Nosotros' },
    { href: 'contacto.html',  label: 'Contacto' }
  ];

  const isActive = (href) => href === currentPage ? 'is-active' : '';

  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div>
            <div class="footer__brand"><i class="fa-solid fa-leaf"></i> Agro Cosinga</div>
            <p>Distribución profesional de fertilizantes, insecticidas, fungicidas y abonos en Satipo y la selva central del Perú.</p>
            <div class="footer__social">
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/51999999999" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>


          <div>
            <h4>Contacto</h4>
            <ul>
              <li><i class="fa-solid fa-location-dot"></i> Satipo, Junín - Perú</li>
              <li><i class="fa-brands fa-whatsapp"></i> +51 999 999 999</li>
              <li><i class="fa-solid fa-envelope"></i> contacto@agrocosinga.com</li>
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
    const navEl = document.getElementById('navbar-placeholder');
    const footEl = document.getElementById('footer-placeholder');
    if (navEl) navEl.innerHTML = navbarHTML;
    if (footEl) footEl.innerHTML = footerHTML;

    // Toggle menú mobile
    const navbar = document.getElementById('mainNavbar');
    const toggle = document.getElementById('navToggle');
    if (toggle && navbar) {
      toggle.addEventListener('click', () => navbar.classList.toggle('is-open'));
    }
  });
})();
