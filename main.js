/* ═══════════════════════════════════════════════════
   main.js — Del Fogón Landing Page
   Estructura:
   1. Nav: efecto glass al hacer scroll
   2. Menú hamburguesa (móvil)
   3. Scroll reveal (animaciones al entrar al viewport)
   4. CTA: validación y feedback del formulario
   ═══════════════════════════════════════════════════ */

/* ——— 1. Nav scroll: agrega clase .scrolled al pasar 50px ——— */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ——— 2. Hamburguesa: abre/cierra menú lateral en móvil ——— */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

/* Cierra el menú al hacer click en cualquier link */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ——— 3. Scroll reveal: detecta elementos .reveal y los anima ——— */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // deja de observar una vez visible
    }
  });
}, {
  threshold: 0.12,        // se activa cuando 12% del elemento es visible
  rootMargin: '0px 0px -40px 0px' // margen inferior para activar un poco antes
});

revealElements.forEach(el => revealObserver.observe(el));

/* ——— 4. CTA: maneja envío del formulario de WhatsApp ——— */
function handleCTA() {
  const input = document.querySelector('.cta-form input');
  const phone = input.value.trim();

  /* Validación básica: campo vacío */
  if (!phone) {
    input.style.borderColor = '#e74c3c';
    input.placeholder = 'Ingresá tu número';
    setTimeout(() => {
      input.style.borderColor = 'rgba(255,255,255,0.3)';
      input.placeholder = 'Tu número de WhatsApp';
    }, 2000);
    return;
  }

  /* Feedback visual de éxito */
  const btn = document.querySelector('.cta-form button');
  btn.textContent = '¡Listo! Te contactamos pronto ✓';
  btn.style.background = 'var(--olive)';
  btn.style.color = 'white';
  input.value = '';

  /* Resetea el botón después de 3.5s */
  setTimeout(() => {
    btn.textContent = 'Quiero el catálogo';
    btn.style.background = 'white';
    btn.style.color = 'var(--terracotta)';
  }, 3500);
}

/* Enter en el input también envía */
document.querySelector('.cta-form input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleCTA();
});
