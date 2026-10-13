// Thin app: all pages/components/server routes come from @commonpub/layer.
// Update the whole platform by bumping @commonpub/layer in package.json.
// Override anything by shadowing the layer's files (e.g. components/SiteLogo.vue)
// or its CSS custom properties (theme/heatsync.css).
export default defineNuxtConfig({
  extends: ['@commonpub/layer'],
  devtools: { enabled: true },

  // Loaded AFTER the layer's theme CSS (Nuxt appends the app's css), and the
  // files are intentionally unlayered so they override @layer commonpub cleanly.
  // gantry.css is the instance theme (registered in commonpub.config.ts);
  // heatsync-ui.css is layout polish that reads tokens only. The previous
  // palette, theme/heatsync.css, is kept in the repo but no longer loaded: it
  // forced its orange onto every theme, which would fight Gantry.
  css: ['~/theme/heatsync-ui.css', '~/theme/gantry.css'],

  app: {
    head: {
      link: [
        // Favicon — the HeatSync mark (layer ships none).
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/brand/heatsync-mark.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },

        // Gantry typefaces: Archivo (display), Instrument Sans (body), IBM
        // Plex Mono (labels), JetBrains Mono (code), and Charis SIL for the
        // wordmark only.
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=JetBrains+Mono:wght@400;700&family=Charis+SIL:ital,wght@0,400;0,700;1,400;1,700&display=swap',
        },
      ],
    },
  },

  // Sane local defaults. In production these are overridden by the
  // NUXT_PUBLIC_* env vars set on the droplet (.env).
  runtimeConfig: {
    public: {
      siteUrl: 'https://heatsynclabs.io',
      domain: 'heatsynclabs.io',
      siteName: 'HeatSync Labs',
      siteDescription:
        'HeatSync Labs — a hackerspace and maker community in Mesa, Arizona',
    },
  },
});
