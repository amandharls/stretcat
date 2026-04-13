import { translations } from './i18n.js';

const CONTACT_EMAIL = 'businesstrioada@gmail.com';
// TODO: substitua pelo link real da App Store / Play Store
const DOWNLOAD_URL = '#';
const PRIVACY_URL =
  'https://doc-hosting.flycricket.io/stretcat-privacy-policy/586a3a81-e9e2-48e5-87ec-2f3c6e7beefe/privacy';

const DEFAULT_LANG = 'pt';

function getInitialLang() {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'pt') return saved;
  return DEFAULT_LANG;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHtml(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function renderFeatures(items) {
  return items
    .map(
      (it) => `
      <article class="card">
        <div class="card__icon" aria-hidden="true">${escapeHtml(it.icon)}</div>
        <h3 class="card__title">${escapeHtml(it.title)}</h3>
        <p class="card__text">${escapeHtml(it.description)}</p>
      </article>
    `,
    )
    .join('');
}

function renderPlanFeatures(features) {
  return features.map((f) => `<li>${escapeHtml(f)}</li>`).join('');
}

function applyLang(lang) {
  const t = translations[lang];

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  localStorage.setItem('lang', lang);

  // Nav
  setText('nav-link-features', t.nav.links.features);
  setText('nav-link-plans', t.nav.links.plans);
  setText('nav-link-download', t.nav.links.download);
  setText('nav-cta', t.nav.links.cta);
  setText('lang-toggle', t.nav.langToggle);

  // Hero
  setText('hero-kicker', t.hero.kicker);
  setText('hero-tagline', t.hero.tagline);
  setText('hero-subtitle', t.hero.subtitle);
  setText('hero-description', t.hero.description);
  setText('hero-cta-download', t.hero.ctaDownload);
  setText('hero-cta-talk', t.hero.ctaTalk);
  const heroImg = document.getElementById('hero-image');
  if (heroImg) heroImg.alt = t.hero.imageAlt;

  // Features
  setText('features-title', t.features.title);
  setText('features-lead', t.features.lead);
  setHtml('features-grid', renderFeatures(t.features.items));
  setText('features-cta', t.features.cta);

  // Plans
  setText('plans-title', t.plans.title);
  setText('plans-lead', t.plans.lead);
  setText('plan-free-name', t.plans.free.name);
  setText('plan-free-price', t.plans.free.price);
  setHtml('plan-free-features', renderPlanFeatures(t.plans.free.features));
  setText('plan-free-cta', t.plans.free.cta);

  setText('plan-premium-name', t.plans.premium.name);
  setText('plan-premium-badge', t.plans.premium.badge);
  setText('plan-premium-price', t.plans.premium.price);
  setText('plan-premium-plus', t.plans.premium.plusLabel);
  setHtml('plan-premium-features', renderPlanFeatures(t.plans.premium.features));
  setText('plan-premium-cta', t.plans.premium.cta);

  // Contact
  setText('contact-title', t.contact.title);
  setText('contact-description', t.contact.description);
  setText('contact-cta', t.contact.ctaDownload);

  // Footer
  setText('footer-rights', t.footer.rights);
  setText('footer-contact', t.footer.contact);
  setText('footer-privacy', t.footer.privacy);

  // Fixed links
  const contactLinks = document.querySelectorAll('[data-contact-link]');
  contactLinks.forEach((a) => {
    a.setAttribute('href', `mailto:${CONTACT_EMAIL}`);
  });

  const downloadLinks = document.querySelectorAll('[data-download-link]');
  downloadLinks.forEach((a) => {
    a.setAttribute('href', DOWNLOAD_URL);
  });

  const privacyLink = document.getElementById('footer-privacy');
  if (privacyLink) privacyLink.setAttribute('href', PRIVACY_URL);
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();

  let lang = getInitialLang();
  applyLang(lang);

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = lang === 'en' ? 'pt' : 'en';
      applyLang(lang);
    });
  }
});

