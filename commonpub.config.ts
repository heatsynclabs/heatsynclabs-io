import { defineCommonPubConfig } from '@commonpub/config';

export default defineCommonPubConfig({
  instance: {
    name: 'HeatSync Labs',
    domain: 'heatsynclabs.io',
    description: 'HeatSync Labs — a hackerspace and maker community in Mesa, Arizona',
    contentTypes: ['project', 'article', 'blog', 'explainer'],
  },
  features: {
    content: true,
    social: true,
    hubs: true,
    docs: true,
    video: true,
    contests: true,
    events: true,
    learning: true,
    explainers: true,
    federation: false,
    admin: true,
  },
  auth: {
    emailPassword: true,
    magicLink: true,
    passkeys: false,
  },
  // Gantry, the HeatSync Labs design system (new-hsl), as a registered pair.
  // Light paper is the default, as on heatsynclabs.org; the Light/Dark toggle
  // resolves within the family. CSS: theme/gantry.css, which also renders
  // whatever theme id the instance resolves, so a DB-stored theme can't hide it.
  themes: [
    {
      id: 'gantry',
      name: 'Gantry',
      description: 'Paper and ink, caution-tape amber, sharp corners',
      family: 'gantry',
      isDark: false,
      pairId: 'gantry-dark',
    },
    {
      id: 'gantry-dark',
      name: 'Gantry Dark',
      description: 'Charcoal and steel with the caution-tape amber',
      family: 'gantry',
      isDark: true,
      pairId: 'gantry',
    },
  ],
  defaultTheme: 'gantry',
});
