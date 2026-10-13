// Thin app: all pages/components/server routes come from @commonpub/layer.
// Update the whole platform by bumping @commonpub/layer in package.json.
// Override anything by shadowing the layer's files (e.g. components/SiteLogo.vue)
// or its CSS custom properties (theme/heatsync.css).
export default defineNuxtConfig({
  extends: ['@commonpub/layer'],
  devtools: { enabled: true },

  // Loaded AFTER the layer's theme CSS (Nuxt appends the app's css) and
  // unlayered, so it overrides @layer commonpub cleanly. theme/gantry.css is the
  // whole look (tokens, ribbons, type, components). The older theme/heatsync.css
  // and theme/heatsync-ui.css are kept in the repo for reference but not loaded.
  css: ['~/theme/gantry.css'],

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
