// 1. Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navLinks.addEventListener('click', () => navLinks.classList.remove('open'));

// 2. Typing effect in the hero
const roles = ['an Impactor at Psiog', 'a Home Cook', 'a Dancer', 'a Movie Lover', 'a Curious Learner'];
const typingEl = document.getElementById('typing');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
function typeLoop() {
  const word = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typingEl.textContent = word.slice(0, charIndex);
  let delay = deleting ? 50 : 100;
  if (!deleting && charIndex === word.length) { deleting = true; delay = 1400; }
  else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 400; }
  setTimeout(typeLoop, delay);
}
typeLoop();

// 3. "Show more" toggles
document.querySelectorAll('.toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const more = btn.previousElementSibling;
    const isOpen = more.classList.toggle('open');
    btn.textContent = isOpen ? 'Show less' : 'Show more';
  });
});

// 4. Scroll-triggered animations (IntersectionObserver)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 6. Highlight the nav link of the section on screen
const sections = document.querySelectorAll('header[id], section[id]');
const linkObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.5 });
sections.forEach((s) => linkObserver.observe(s));

// 7. Soft 3D tilt on interest cards (mouse only)
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = 'perspective(700px) rotateX(' + (-y * 8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-6px)';
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// 8. Lightbox for hobbies
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbTitle = document.getElementById('lb-title');
const lbText = document.getElementById('lb-text');
function openLightbox(card) {
  lbImg.src = card.dataset.img;
  lbImg.alt = card.dataset.title;
  lbTitle.textContent = card.dataset.title;
  lbText.textContent = card.dataset.text;
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }
document.querySelectorAll('.hobby').forEach((card) => {
  card.addEventListener('click', () => openLightbox(card));
  card.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(card); });
});
document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// 9. Scroll progress, back-to-top, footer year
const progress = document.getElementById('progress');
const topBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
  topBtn.classList.toggle('show', window.scrollY > 400);
});
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();

// 8. Theme button: cycles light, dark and warm. Colors live in theme.css
const themeButton = document.getElementById('theme-toggle');
const themeNames = ['light', 'dark', 'warm'];
let themeIndex = 0;
try {
  const saved = localStorage.getItem('theme');
  if (themeNames.includes(saved)) {
    themeIndex = themeNames.indexOf(saved);
  }
} catch (error) {
  themeIndex = 0;
}
function applyTheme() {
  const name = themeNames[themeIndex];
  if (name === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', name);
  }
  themeButton.setAttribute('aria-label', 'Theme: ' + name + '. Click to change theme');
  themeButton.setAttribute('title', 'Theme: ' + name);
}
applyTheme();
themeButton.addEventListener('click', () => {
  themeIndex = (themeIndex + 1) % themeNames.length;
  applyTheme();
  try {
    localStorage.setItem('theme', themeNames[themeIndex]);
  } catch (error) {
    // storage not available: the theme still changes for this visit
  }
});
