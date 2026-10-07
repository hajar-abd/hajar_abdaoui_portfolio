import { CONTENT } from './content.js';

const form = document.querySelector('.contact-form');
const fields = [...form.querySelectorAll('input:not([type="hidden"]), textarea')];
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.querySelector('[data-i18n="send"]');
const status = document.getElementById('form-status');
const formLanguage = document.getElementById('contact-language');
const languageButtons = [...document.querySelectorAll('[data-lang]')];
let language = 'fr';
let formState = 'idle';

function validateField(field) {
  field.setCustomValidity('');
  if (!field.value.trim()) field.setCustomValidity(CONTENT[language].required);
  else if (field.type === 'email' && field.validity.typeMismatch) {
    field.setCustomValidity(CONTENT[language].invalidEmail);
  }
}

function renderFormState() {
  const sending = formState === 'sending';
  submitButton.disabled = sending;
  fields.forEach(function (field) { field.disabled = sending; });
  form.setAttribute('aria-busy', String(sending));
  submitLabel.textContent = CONTENT[language][sending ? 'sending' : 'send'];
  status.dataset.state = formState;
  status.textContent = formState === 'idle' ? '' : CONTENT[language][formState];
}

function setLanguage(next, announce) {
  if (!Object.hasOwn(CONTENT, next)) return;
  language = next;
  document.documentElement.lang = next;
  document.querySelectorAll('[data-i18n]').forEach(function (node) {
    node.textContent = CONTENT[next][node.dataset.i18n];
  });
  document.querySelectorAll('[data-placeholder]').forEach(function (node) {
    node.placeholder = CONTENT[next][node.dataset.placeholder];
  });
  document.querySelectorAll('[data-label]').forEach(function (node) {
    node.setAttribute('aria-label', CONTENT[next][node.dataset.label]);
  });
  languageButtons.forEach(function (button) {
    button.setAttribute('aria-pressed', String(button.dataset.lang === next));
  });
  fields.forEach(function (field) { field.setCustomValidity(''); });
  formLanguage.value = next;
  document.title = CONTENT[next].pageTitle;
  document.querySelector('meta[name="description"]').content = CONTENT[next].description;
  document.querySelector('meta[property="og:title"]').content = CONTENT[next].pageTitle;
  document.querySelector('meta[property="og:description"]').content = CONTENT[next].description;
  renderFormState();
  if (announce) document.getElementById('language-announcement').textContent = CONTENT[next].languageChanged;
  try { localStorage.setItem('hajar-portfolio-language', next); } catch {}
}

languageButtons.forEach(function (button) {
  button.addEventListener('click', function () { setLanguage(button.dataset.lang, true); });
});
let savedLanguage;
try { savedLanguage = localStorage.getItem('hajar-portfolio-language'); } catch {}
setLanguage(savedLanguage === 'en' ? 'en' : 'fr', false);

// Keep the native POST/required fallback when JavaScript is unavailable.
form.noValidate = true;
fields.forEach(function (field) {
  field.addEventListener('input', function () {
    field.setCustomValidity('');
    if (formState !== 'idle' && formState !== 'sending') {
      formState = 'idle';
      renderFormState();
    }
  });
});
form.addEventListener('submit', async function (event) {
  event.preventDefault();
  if (formState === 'sending') return;
  fields.forEach(validateField);
  if (!form.reportValidity()) return;

  // Capture values before disabling the fields to prevent duplicate submissions.
  const data = new FormData(form);
  fields.forEach(function (field) { data.set(field.name, field.value.trim()); });
  const controller = new AbortController();
  const timeout = window.setTimeout(function () { controller.abort(); }, 20000);
  formState = 'sending';
  renderFormState();
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    if (!response.ok) throw new Error('Form submission rejected');
    formState = 'success';
    form.reset();
    formLanguage.value = language;
  } catch (error) {
    formState = error.name === 'AbortError' ? 'timeout' : 'error';
  } finally {
    window.clearTimeout(timeout);
    renderFormState();
  }
});
// Content remains visible when JavaScript or motion is disabled.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
function configureMotion() {
  if (revealObserver) revealObserver.disconnect();
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    document.documentElement.classList.remove('motion-ready');
    return;
  }
  revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.reveal').forEach(function (node) { revealObserver.observe(node); });
  document.documentElement.classList.add('motion-ready');
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);

const navLinks = [...document.querySelectorAll('.nav a')];
const sections = navLinks.map(function (link) { return document.querySelector(link.getAttribute('href')); });
let ticking = false;
function updateActiveSection() {
  const headerBottom = document.querySelector('.site-header').getBoundingClientRect().bottom;
  let active = '';
  sections.forEach(function (section) { if (section.getBoundingClientRect().top <= headerBottom + 140) active = section.id; });
  navLinks.forEach(function (link) {
    if (link.getAttribute('href') === '#' + active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  ticking = false;
}
window.addEventListener('scroll', function () {
  if (!ticking) { ticking = true; requestAnimationFrame(updateActiveSection); }
}, { passive: true });
updateActiveSection();
