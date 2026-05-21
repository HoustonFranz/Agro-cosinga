/* =========================================================
   main.js - inicialización general
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* Animaciones AOS */
  if (window.AOS) {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* Animación de contadores en hero stats */
  animateHeroStats();
});

/* ---------- Contadores animados ---------- */
function animateHeroStats() {
  const statItems = document.querySelectorAll('.hero__stats li strong');
  if (!statItems.length) return;

  // Extraemos el número objetivo de cada <strong>
  const targets = Array.from(statItems).map(el => {
    const raw = el.textContent.replace(/[^0-9]/g, '');
    return { el, target: parseInt(raw, 10), prefix: '+' };
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        targets.forEach(({ el, target, prefix }) => {
          countUp(el, target, prefix);
        });
        observer.disconnect(); // animar solo una vez
      }
    });
  }, { threshold: 0.6 });

  // Observar el primer stat como disparador
  observer.observe(statItems[0].closest('.hero__stats'));
}

function countUp(el, target, prefix = '', duration = 1800) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cúbico
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString('es-PE');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ---------- Formulario de contacto → WhatsApp ---------- */
function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nombre   = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const mensaje  = form.mensaje.value.trim();

  const text = encodeURIComponent(
    `Hola Agro Cosinga, soy ${nombre} (Tel: ${telefono}).\n\n${mensaje}`
  );
  window.open(`https://wa.me/51999999999?text=${text}`, '_blank');
  form.reset();
  return false;
}