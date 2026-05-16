/**
 * CommonPub attribution -> real links (client-only, non-fork).
 *
 * Both "Powered by CommonPub" spots live inline in big layer files
 * (footer in layouts/default.vue, sidebar badge in pages/index.vue).
 * Forking either to change a couple nodes is overreach, so this patches
 * them after render:
 *
 *   1. footer tagline      -> "Powered by <a>CommonPub</a>"  (repo)
 *   2. footer GitHub icon  -> repo (was the org)
 *   3. sidebar .cpub-powered-badge -> wrapped in a link to the repo
 *
 * A MutationObserver (not just a mount hook) is used on purpose: the
 * earlier hook-only version didn't stick because the nodes hydrate /
 * re-render after the hook ran. The observer is idempotent (data flags)
 * and cheap (no-ops once everything is patched).
 */
const REPO = 'https://github.com/commonpub/commonpub';

function patch(): void {
  // 1. Footer tagline -> "Powered by CommonPub" (link)
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

  // 2. Footer GitHub icon -> repo
  document
    .querySelectorAll<HTMLAnchorElement>('.cpub-footer-social a[aria-label="GitHub"]')
    .forEach((el) => {
      if (el.getAttribute('href') !== REPO) el.setAttribute('href', REPO);
    });

  // 3. Sidebar "Powered by [C] CommonPub" badge -> make it a link
  document
    .querySelectorAll<HTMLElement>('.cpub-powered-badge')
    .forEach((badge) => {
      if (badge.dataset.hsCredit === '1') return;
      badge.dataset.hsCredit = '1';
      const inner = badge.innerHTML;
      const a = document.createElement('a');
      a.href = REPO;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'hs-cpub-badge-link';
      a.innerHTML = inner;
      badge.replaceChildren(a);
    });
}

export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return;
  patch();
  const obs = new MutationObserver(() => patch());
  const start = () => {
    patch();
    obs.observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start();
  else window.addEventListener('DOMContentLoaded', start, { once: true });
});
