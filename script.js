document.addEventListener('DOMContentLoaded', () => {
  // Año dinámico en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menú Hamburguesa Mobile
  const menuToggle = document.getElementById('menuToggle');
  const navRight = document.getElementById('navRight');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navRight) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navRight.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú mobile al hacer clic en un enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navRight.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Toggle de Tema (Claro / Oscuro)
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  // Lógica del Formulario de Contacto hacia WhatsApp
  const whatsappForm = document.getElementById('whatsappForm');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      const textMessage = `Hola Candela! Mi nombre/negocio es *${name}*. Estoy interesado en: *${service}*. Detalle: ${message}`;
      const encodedText = encodeURIComponent(textMessage);

      // Evento de seguimiento simple para analítica
      trackWhatsAppClick('form-submit');

      window.open(`https://wa.me/5492612644649?text=${encodedText}`, '_blank');
    });
  }

  // Tracking de clics en WhatsApp (Meta Pixel / Google Analytics)
  const waTriggers = document.querySelectorAll('.js-wa-trigger');
  waTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const location = e.currentTarget.getAttribute('data-location') || 'general';
      trackWhatsAppClick(location);
    });
  });

  function trackWhatsAppClick(location) {
    console.log(`[Tracking Event]: Clic en WhatsApp desde -> ${location}`);
    
    // Integración con Google Analytics (gtag.js) si está instalado
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', {
        'event_category': 'Contact',
        'event_label': location
      });
    }

    // Integración con Meta Pixel (fbq) si está instalado
    if (typeof fbq === 'function') {
      fbq('track', 'Contact', { content_name: location });
    }
  }
});