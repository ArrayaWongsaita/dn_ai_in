const slides = [...document.querySelectorAll('.slide')];
const nav = document.querySelector('nav');
const dots = slides.map((s, i) => {
  const a = Object.assign(document.createElement('a'), { href: `#s${i + 1}`, ariaLabel: `สไลด์ ${i + 1}` });
  s.id = `s${i + 1}`;
  nav.append(a);
  return a;
});
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const count = (el) => {
  const to = parseFloat(el.dataset.countTo), d = +(el.dataset.decimals || 0);
  const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  if (reduce) return;
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / 900), e = 1 - (1 - p) ** 3;
    el.textContent = pre + (to * e).toFixed(d) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const i = slides.indexOf(e.target);
    dots.forEach((d, k) => d.toggleAttribute('aria-current', k === i));
    if (!e.target.classList.contains('seen')) {
      e.target.classList.add('seen');
      const n = e.target.querySelector('[data-count-to]');
      if (n) count(n);
    }
  });
}, { threshold: 0.6 });
slides.forEach((s) => io.observe(s));

addEventListener('keydown', (e) => {
  const cur = dots.findIndex((d) => d.hasAttribute('aria-current'));
  const go = (n) => slides[Math.max(0, Math.min(slides.length - 1, n))].scrollIntoView();
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(cur + 1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(cur - 1); }
});

// Theme toggle: follows the system until the viewer picks one.
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch {}
document.getElementById('theme').addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch {}
});
