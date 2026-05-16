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
});
