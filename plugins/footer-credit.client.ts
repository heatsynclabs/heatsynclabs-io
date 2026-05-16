/**
 * Footer attribution fix (client-only, non-fork).
 *
 * The footer lives inline in @commonpub/layer's layouts/default.vue.
 * Forking that whole layout to change two nodes would be overreach, so
 * this plugin patches just the attribution after hydration:
 *
 *   1. "Powered by <site>." -> real link: "Powered by CommonPub"
 *      pointing at the CommonPub source repo.
 *   2. The footer GitHub icon (-> github.com/commonpub org) retargeted
 *      to the actual repo.
 *
 * Idempotent and null-safe: if the layer restructures the footer the
 * selectors simply miss and nothing breaks.
 */
const REPO = 'https://github.com/commonpub/commonpub';

function patchFooter(): void {
  const tagline = document.querySelector<HTMLElement>('.cpub-footer-tagline');
  if (tagline && tagline.dataset.hsCredit !== '1') {
    tagline.dataset.hsCredit = '1';
    tagline.textContent = 'Powered by ';
    const a = document.createElement('a');
    a.href = REPO;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'CommonPub';
    a.className = 'hs-cpub-credit';
    tagline.appendChild(a);
  }

  document
    .querySelectorAll<HTMLAnchorElement>('.cpub-footer-social a[aria-label="GitHub"]')
    .forEach((el) => {
      if (el.getAttribute('href') !== REPO) el.setAttribute('href', REPO);
    });
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => requestAnimationFrame(patchFooter));
  // SPA navigations keep the persistent layout, but re-assert cheaply.
  nuxtApp.hook('page:finish', () => requestAnimationFrame(patchFooter));
});
