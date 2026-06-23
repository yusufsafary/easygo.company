'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== TICKER =====
const tickerData = [
  { symbol: 'EUR/USD', price: '1.08432', change: '+0.12%', up: true },
  { symbol: 'GBP/USD', price: '1.27651', change: '-0.08%', up: false },
  { symbol: 'USD/JPY', price: '149.832', change: '+0.21%', up: true },
  { symbol: 'BTC/USD', price: '67,241', change: '+2.41%', up: true },
  { symbol: 'ETH/USD', price: '3,518.20', change: '+1.87%', up: true },
  { symbol: 'Gold XAU', price: '2,341.50', change: '+0.31%', up: true },
  { symbol: 'Crude Oil', price: '78.42', change: '-0.65%', up: false },
  { symbol: 'S&P 500',  price: '5,248.30', change: '+0.45%', up: true },
  { symbol: 'NASDAQ',   price: '16,432.10', change: '+0.72%', up: true },
  { symbol: 'EUR/GBP',  price: '0.85231', change: '-0.05%', up: false },
  { symbol: 'USD/CAD',  price: '1.36412', change: '+0.09%', up: true },
  { symbol: 'Silver XAG', price: '27.83', change: '+0.18%', up: true },
];

function buildTicker() {
  const track = document.getElementById('ticker');
  const all = [...tickerData, ...tickerData]; // duplicate for seamless loop
  track.innerHTML = all.map(item => `
    <span class="ticker-item">
      <span class="ticker-symbol">${item.symbol}</span>
      <span>${item.price}</span>
      <span class="${item.up ? 'ticker-up' : 'ticker-down'}">${item.change}</span>
    </span>
  `).join('');
}
buildTicker();

// Pause on hover
const tickerBar = document.querySelector('.ticker-bar');
tickerBar.addEventListener('mouseenter', () => {
  document.querySelector('.ticker-track').style.animationPlayState = 'paused';
});
tickerBar.addEventListener('mouseleave', () => {
  document.querySelector('.ticker-track').style.animationPlayState = 'running';
});

// ===== ANIMATE ON SCROLL =====
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.market-card, .platform-card, .why-card, .account-card, .trust-content, .trust-visual').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

// Add visible class style
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ===== SMOOTH NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
}, { passive: true });
