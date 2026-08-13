// Victory Mental Services — site interactions

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Provider photos: fall back to initials if a headshot is missing
document.querySelectorAll('.provider__avatar img').forEach((img) => {
  const markFallback = () => img.parentElement.classList.add('is-fallback');
  if (img.complete && img.naturalWidth === 0) markFallback();
  img.addEventListener('error', markFallback);
});

// Scroll reveal
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Pointer-tracked 3D tilt
// --------------------------------------------------------------------------
// Writes --rx/--ry (tilt) and --mx/--my (specular position) onto the hovered
// surface. The CSS that consumes them is itself gated on pointer:fine and
// prefers-reduced-motion, so this is belt-and-braces — but it also keeps us
// from attaching listeners on touch devices that would never use them.
const canTilt =
  !prefersReducedMotion &&
  window.matchMedia('(pointer: fine)').matches &&
  window.matchMedia('(min-width: 860px)').matches;

if (canTilt) {
  const MAX_TILT = 5; // degrees — past ~6 it stops reading as depth and starts reading as a gimmick
  let frame = null;

  document.querySelectorAll('.card, .pillar, .provider').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      if (frame) return; // coalesce to one write per frame
      frame = requestAnimationFrame(() => {
        frame = null;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', `${(px - 0.5) * 2 * MAX_TILT}deg`);
        el.style.setProperty('--rx', `${(0.5 - py) * 2 * MAX_TILT}deg`);
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
      });
    });

    el.addEventListener('pointerleave', () => {
      if (frame) { cancelAnimationFrame(frame); frame = null; }
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    });
  });
}
