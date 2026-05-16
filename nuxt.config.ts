// Thin app: all pages/components/server routes come from @commonpub/layer.
// Update the whole platform by bumping @commonpub/layer in package.json.
// Override anything by shadowing the layer's files (e.g. components/SiteLogo.vue).
export default defineNuxtConfig({
  extends: ['@commonpub/layer'],
  devtools: { enabled: true },

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
