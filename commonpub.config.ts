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
  // Gantry, the HeatSync Labs design system (new-hsl), as a registered
  // light/dark pair. Dark is the default, as in Gantry itself; the Light/Dark
  // toggle resolves within the family. CSS: theme/gantry.css.
  themes: [
    {
      id: 'gantry',
      name: 'Gantry',
      description: 'Charcoal and steel, caution-tape amber, sharp corners',
      family: 'gantry',
      isDark: true,
      pairId: 'gantry-light',
    },
    {
      id: 'gantry-light',
      name: 'Gantry Light',
      description: 'Paper and ink with the caution-tape amber',
      family: 'gantry',
      isDark: false,
      pairId: 'gantry',
    },
  ],
  defaultTheme: 'gantry',
});
