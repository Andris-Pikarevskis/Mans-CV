const menu = document.getElementById('nav-menu');
const menuToggle = document.getElementById('nav-toggle');

function setMenu(open) {
  if (!menu || !menuToggle) return;
  menu.classList.toggle('show-menu', open);
  menuToggle.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => {
  setMenu(!menu.classList.contains('show-menu'));
});
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

const themeToggle = document.getElementById('theme-button');
function applyTheme(dark) {
  document.body.classList.toggle('dark-theme', dark);
  themeToggle?.classList.toggle('bx-sun', dark);
  themeToggle?.classList.toggle('bx-moon', !dark);
  themeToggle?.setAttribute('aria-pressed', String(dark));
}
try {
  applyTheme(localStorage.getItem('selected-theme') === 'dark');
} catch {
  applyTheme(false);
}
themeToggle?.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-theme');
  applyTheme(dark);
  try { localStorage.setItem('selected-theme', dark ? 'dark' : 'light'); } catch {}
});

const sections = [...document.querySelectorAll('section[id]')];
const navLinks = [...document.querySelectorAll('.nav__link')];
const topLink = document.getElementById('scroll-top');
function updateNavigation() {
  const position = window.scrollY + 110;
  let currentId = 'home';
  for (const section of sections) {
    if (section.offsetTop <= position && navLinks.some(link => link.hash === '#' + section.id)) {
      currentId = section.id;
    }
  }
  for (const link of navLinks) {
    const active = link.hash === '#' + currentId;
    link.classList.toggle('active-link', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  topLink?.classList.toggle('show-scroll', window.scrollY >= 200);
}
window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) setMenu(false);
  updateNavigation();
});
updateNavigation();

// Downloads use a normal same-origin PDF link and work without JavaScript.
