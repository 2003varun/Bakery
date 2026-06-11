/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

// Only show cursor elements once mouse enters the page
document.addEventListener('mouseenter', () => {
  cursor.classList.add('active');
  ring.classList.add('active');
});
document.addEventListener('mouseleave', () => {
  cursor.classList.remove('active');
  ring.classList.remove('active');
});

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  // Make active on first move too
  cursor.classList.add('active');
  ring.classList.add('active');
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '6px';
    cursor.style.height = '6px';
    ring.style.width    = '56px';
    ring.style.height   = '56px';
    ring.style.opacity  = '1';
    ring.style.borderColor = 'var(--brown)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '8px';
    cursor.style.height = '8px';
    ring.style.width    = '40px';
    ring.style.height   = '40px';
    ring.style.opacity  = '0.7';
    ring.style.borderColor = 'var(--gold)';
  });
});

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── MENU TAB FILTER ── */
const tabs = document.querySelectorAll('.menu-tab');

// Home page: filter item cards
const itemCards = document.querySelectorAll('.item-card[data-category]');

// Menu page: filter sections and individual items
const menuSections = document.querySelectorAll('.menu-section[data-section]');
const menuItems    = document.querySelectorAll('.menu-item[data-category]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    // Home page card grid
    itemCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });

    // Menu page — show/hide whole sections or individual items
    if (menuSections.length) {
      menuSections.forEach(section => {
        if (filter === 'all') {
          section.classList.remove('hidden');
          section.querySelectorAll('.menu-item').forEach(item => item.classList.remove('hidden'));
        } else {
          const match = section.dataset.section === filter;
          section.classList.toggle('hidden', !match);
        }
      });
    }
  });
});