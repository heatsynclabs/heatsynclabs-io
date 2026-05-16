// Thin app: all pages/components/server routes come from @commonpub/layer.
// Update the whole platform by bumping @commonpub/layer in package.json.
// Override anything by shadowing the layer's files (e.g. components/SiteLogo.vue)
// or its CSS custom properties (theme/heatsync.css).
export default defineNuxtConfig({
  extends: ['@commonpub/layer'],
  devtools: { enabled: true },

  // Loaded AFTER the layer's theme CSS (Nuxt appends the app's css), and the
  // file is intentionally unlayered so it overrides @layer commonpub cleanly.
  css: ['~/theme/heatsync.css'],

  app: {
    head: {
      link: [
        // Brand typefaces — Permanent Marker / Special Elite / VT323 /
        // Courier Prime. The design system forbids substitutes/system fonts.
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Permanent+Marker&family=Special+Elite&family=VT323&display=swap',
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
