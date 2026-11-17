'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const themeToggle = document.querySelector('.theme-toggle');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxClose = document.querySelector('.lightbox-close');

// Mobile navigation: open and close the menu accessibly.
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal content as it enters the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Show the back-to-top control after the user scrolls.
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Cycle through the light, dark, and warm colour themes.
const themes = ['light', 'dark', 'warm'];
let themeIndex = 0;
themeToggle.addEventListener('click', () => {
  themeIndex = (themeIndex + 1) % themes.length;
  if (themes[themeIndex] === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', themes[themeIndex]);
  }
  themeToggle.setAttribute('aria-label', `Current theme: ${themes[themeIndex]}. Switch colour theme`);
});

// Open image previews for the portfolio's illustrations.
document.querySelectorAll('.hero-image-wrap img, .timeline-visual img, .interest-card img, .family-card img, .hobby-card img').forEach((image) => {
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    lightboxClose.focus();
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
});

// Keep the footer year current automatically.
document.querySelector('#current-year').textContent = new Date().getFullYear();
