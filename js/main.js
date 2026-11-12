/**
 * TC DIGITAL (tcdigital.cl) — Interactive Engine
 * Console Switcher, Card Spotlight, Scroll Reveal & Live Filters
 */

const CONSOLE_PROFILES = {
  retail: {
    metric1Val: '0.4s',
    metric1Lbl: 'Carga Inicial (Edge CDN)',
    metric2Val: '+38%',
    metric2Lbl: 'Conversión Mobile-First',
    code: '✔ Catálogo Transaccional + Click & Collect\n✔ Checkout optimizado con cálculo en vivo'
  },
  intranet: {
    metric1Val: '100%',
    metric1Lbl: 'Disponibilidad Operativa',
    metric2Val: '3x',
    metric2Lbl: 'Agilidad en Flujos Internos',
    code: '✔ Gestión de documentos y roles corporativos\n✔ Arquitectura ligera sin latencia de servidor'
  },
  saas: {
    metric1Val: 'Realtime',
    metric1Lbl: 'Sincronización de Datos',
    metric2Val: 'PostgreSQL',
    metric2Lbl: 'Seguridad RLS & Auth',
    code: '✔ APIs REST & WebSockets en tiempo real\n✔ Paneles analíticos con visualización clara'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initScrollReveal();
  initConsoleTabs();
  initCardSpotlights();
  initSystemFilters();
  initCopyEmail();
  initMobileMenu();
});

// Sticky navbar shadow on scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });
}

// Smooth Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

// Interactive Architecture Console Tabs in Hero
function initConsoleTabs() {
  const tabs = document.querySelectorAll('.console-tab');
  const m1Val = document.getElementById('consoleM1Val');
  const m1Lbl = document.getElementById('consoleM1Lbl');
  const m2Val = document.getElementById('consoleM2Val');
  const m2Lbl = document.getElementById('consoleM2Lbl');
  const codeBox = document.getElementById('consoleCode');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const data = CONSOLE_PROFILES[tab.dataset.profile];
      if (!data) return;

      if (m1Val) m1Val.textContent = data.metric1Val;
      if (m1Lbl) m1Lbl.textContent = data.metric1Lbl;
      if (m2Val) m2Val.textContent = data.metric2Val;
      if (m2Lbl) m2Lbl.textContent = data.metric2Lbl;
      if (codeBox) codeBox.innerText = data.code;
    });
  });
}

// Subtle Mouse Spotlight on System Cards
function initCardSpotlights() {
  const cards = document.querySelectorAll('.system-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Live Filter Pills for Systems
function initSystemFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.system-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const target = pill.dataset.filter;
      cards.forEach(card => {
        if (target === 'all' || card.dataset.category === target) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Copy Email Utility
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.dataset.email || 'contacto@tcdigital.cl';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Correo copiado: ${email}`);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = `✓ ${message}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2800);
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const links = document.getElementById('navLinks');

  if (btn && links) {
    btn.addEventListener('click', () => {
      const isVisible = links.style.display === 'flex';
      links.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        links.style.flexDirection = 'column';
        links.style.position = 'absolute';
        links.style.top = '76px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = '#FFFFFF';
        links.style.padding = '1.5rem';
        links.style.borderBottom = '1px solid var(--tc-border)';
        links.style.boxShadow = 'var(--shadow-md)';
      }
    });
  }
}
