/**
 * TC DIGITAL (tcdigital.cl) - Main Interactions & Filter Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initCopyEmail();
  initMobileMenu();
});

// Project Filtering
function initProjectFilters() {
  const tabs = document.querySelectorAll('.tab-btn');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 300ms ease';
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
  const toast = document.getElementById('toastNotice');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.dataset.email || 'contacto@tcdigital.cl';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copiado: ${email}`);
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
  toast.textContent = `📋 ${message}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 2800);
}

// Mobile Menu Toggle
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
        links.style.top = '72px';
        links.style.left = '0';
        links.style.right = '0';
        links.style.background = 'white';
        links.style.padding = '1.5rem';
        links.style.borderBottom = '1px solid var(--tc-border)';
        links.style.boxShadow = 'var(--shadow-lg)';
      }
    });
  }
}
