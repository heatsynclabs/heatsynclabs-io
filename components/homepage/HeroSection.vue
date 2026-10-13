<script setup lang="ts">
/**
 * Shadows @commonpub/layer's homepage/HeroSection.vue.
 *
 * The heatsynclabs.org hero (new-hsl, src/components/sections/HeroSection.astro)
 * on this instance: a caution ribbon with a plate, the Mesa location row, an
 * Archivo black headline with one amber phrase, mono uppercase buttons, and
 * the framed photo carousel of the space.
 *
 * The stock hero swaps itself for any active contest; this one is always the
 * brand hero, and contests show in their own homepage section. Delete this
 * file to restore stock behaviour.
 */
import type { HomepageSectionConfig } from '@commonpub/server';

// Match the layer's prop contract: the renderer binds a HomepageSectionConfig.
defineProps<{ config?: HomepageSectionConfig }>();
</script>

<template>
  <section class="hs-hero" aria-labelledby="hs-hero-title">
    <div class="hs-ribbon" role="presentation">
      <span class="hs-ribbon__plate">Open. Member run.</span>
    </div>

    <div class="hs-hero__wrap">
      <div class="hs-hero__content">
        <div class="hs-hero__meta">
          <a href="https://maps.app.goo.gl/Qh3wZuQuik4U7niE6" target="_blank" rel="noopener" class="hs-hero__location">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
            Mesa, AZ
          </a>
          <span class="hs-hero__est">// Est. 2009</span>
        </div>

        <h1 id="hs-hero-title" class="hs-hero__headline">
          Make things. <span class="hs-hero__accent">Share them.</span>
        </h1>

        <p class="hs-hero__body">
          This is where HeatSync Labs members post their projects, build logs and guides for
          whatever is on the bench. Arizona's original hackerspace, built on open source principles.
        </p>

        <a href="https://heatsynclabs.org/about" class="hs-hero__welcome" target="_blank" rel="noopener">
          Everyone is welcome
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        </a>

        <div class="hs-hero__actions">
          <NuxtLink to="/create" class="cpub-btn cpub-btn-primary hs-hero__btn">Start a project</NuxtLink>
          <NuxtLink to="/explore" class="cpub-btn hs-hero__btn">Explore the work</NuxtLink>
          <a href="https://heatsynclabs.org" class="cpub-btn hs-hero__btn" target="_blank" rel="noopener">Visit the lab</a>
        </div>
      </div>

      <div class="hs-hero__photos">
        <HsPhotoCarousel />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hs-hero { background: var(--bg); border-bottom: 2px solid var(--steel-hi); }

/* Tall caution ribbon with a plate (new-hsl CautionRibbon, labeled variant) */
.hs-ribbon {
  position: relative;
  height: 46px;
  background: repeating-linear-gradient(-45deg, var(--hazard) 0 24px, var(--tape-dark) 24px 48px);
  border-bottom: 2px solid var(--tape-dark);
}
.hs-ribbon__plate {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: var(--char);
  border: 2px solid var(--live);
  color: var(--green-text);
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 5px 16px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.hs-ribbon__plate::before { content: ''; width: 9px; height: 9px; background: var(--live); }

.hs-hero__wrap {
  max-width: 1180px;
  margin: 0 auto;
  padding: 60px 28px 56px;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: 48px;
}
.hs-hero__content { min-width: 0; }

.hs-hero__meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; flex-wrap: wrap; }
.hs-hero__location,
.hs-hero__est {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--smoke);
  text-decoration: none;
}
.hs-hero__location:hover { color: var(--accent-text); }
.hs-hero__location svg { width: 12px; height: 12px; }

.hs-hero__headline {
  font-family: var(--font-display);
  font-weight: 900;
  text-transform: none;
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1;
  letter-spacing: -0.025em;
  color: var(--text);
  margin: 0 0 22px;
}
.hs-hero__accent { color: var(--g-accent-display); }

.hs-hero__body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.65;
  color: var(--ash);
  max-width: 50ch;
  margin: 0 0 18px;
}

.hs-hero__welcome {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  color: var(--accent-text);
  border-bottom: 2px solid var(--hazard);
  padding-bottom: 2px;
  text-decoration: none;
}
.hs-hero__welcome svg { width: 16px; height: 16px; color: var(--rust); }

.hs-hero__actions { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; margin-top: 30px; }
.hs-hero__btn { min-height: 46px; padding: 12px 22px; }

.hs-hero__photos { min-width: 0; display: flex; justify-content: center; }

@media (max-width: 880px) {
  .hs-hero__wrap { grid-template-columns: 1fr; gap: 36px; padding: 36px 20px 44px; }
  .hs-hero__photos { order: -1; }
}
@media (max-width: 600px) {
  .hs-ribbon { height: 38px; }
  .hs-ribbon__plate { font-size: 10px; letter-spacing: 0.14em; padding: 4px 12px; }
  .hs-hero__wrap { padding: 28px 16px 36px; }
  .hs-hero__body { font-size: 16px; }
  .hs-hero__actions { gap: 10px; }
  .hs-hero__btn { flex: 1 1 100%; justify-content: center; }
}
@media (prefers-reduced-motion: no-preference) {
  .hs-hero__welcome svg { animation: hs-heart 4.2s linear infinite; }
}
@keyframes hs-heart {
  0%, 100% { color: var(--rust); }
  25% { color: var(--hazard-deep); }
  50% { color: var(--live); }
  75% { color: var(--info); }
}
</style>
