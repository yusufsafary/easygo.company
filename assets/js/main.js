'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE DRAWER =====
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');

function openDrawer() {
  drawer.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// ===== TICKER =====
const tickerData = [
  { symbol: 'EUR/USD',    price: '1.08432',   change: '+0.12%', up: true  },
  { symbol: 'GBP/USD',    price: '1.27651',   change: '-0.08%', up: false },
  { symbol: 'USD/JPY',    price: '149.832',   change: '+0.21%', up: true  },
  { symbol: 'BTC/USD',    price: '67,241',    change: '+2.41%', up: true  },
  { symbol: 'ETH/USD',    price: '3,518.20',  change: '+1.87%', up: true  },
  { symbol: 'Gold XAU',   price: '2,341.50',  change: '+0.31%', up: true  },
  { symbol: 'Crude Oil',  price: '78.42',     change: '-0.65%', up: false },
  { symbol: 'S&P 500',    price: '5,248.30',  change: '+0.45%', up: true  },
  { symbol: 'NASDAQ',     price: '16,432.10', change: '+0.72%', up: true  },
  { symbol: 'EUR/GBP',    price: '0.85231',   change: '-0.05%', up: false },
  { symbol: 'USD/CAD',    price: '1.36412',   change: '+0.09%', up: true  },
  { symbol: 'Silver XAG', price: '27.83',     change: '+0.18%', up: true  },
];

(function buildTicker() {
  const track = document.getElementById('ticker');
  const items = [...tickerData, ...tickerData];
  track.innerHTML = items.map(item => `
    <span class="ticker-item">
      <span class="ticker-symbol">${item.symbol}</span>
      <span>${item.price}</span>
      <span class="${item.up ? 'ticker-up' : 'ticker-down'}">${item.change}</span>
    </span>
  `).join('');
})();

const tickerBar  = document.querySelector('.ticker-bar');
const tickerTrack = document.querySelector('.ticker-track');
tickerBar.addEventListener('mouseenter', () => { tickerTrack.style.animationPlayState = 'paused'; });
tickerBar.addEventListener('mouseleave', () => { tickerTrack.style.animationPlayState = 'running'; });

// ===== ANIMATE ON SCROLL =====
const visibleStyle = document.createElement('style');
visibleStyle.textContent = '.aos { opacity: 0; transform: translateY(22px); transition: opacity .5s ease, transform .5s ease; } .aos.visible { opacity: 1; transform: none; }';
document.head.appendChild(visibleStyle);

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.market-card, .platform-card, .why-card, .account-card, .trust-content, .trust-visual'
).forEach((el, i) => {
  el.classList.add('aos');
  el.style.transitionDelay = Math.min(i * 0.06, 0.36) + 's';
  aosObserver.observe(el);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MOBILE STICKY CTA =====
const mobileStickyCta = document.getElementById('mobileStickyCta');
const heroEl = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const threshold = (heroEl ? heroEl.offsetHeight : 600) * 0.6;
  mobileStickyCta.classList.toggle('visible', window.scrollY > threshold);
}, { passive: true });

// ===== ACTIVE NAV HIGHLIGHT =====
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  navAnchors.forEach(a => {
    const active = a.getAttribute('href') === `#${current}`;
    a.style.color      = active ? '#fff'  : '';
    a.style.fontWeight = active ? '700'   : '';
  });
}, { passive: true });
