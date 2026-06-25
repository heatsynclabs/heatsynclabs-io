<script setup lang="ts">
/**
 * Shadows @commonpub/layer's homepage/HeroSection.vue.
 *
 * The stock hero swaps itself for any active contest
 * (`v-if="contestsEnabled && activeContest"`), with no config flag to
 * turn that off. This override drops the contest branch entirely so
 * the hero is ALWAYS the brand hero; contests still show in their own
 * `contests` homepage section. Markup/styles are otherwise identical
 * to the layer's. Delete this file to restore stock behavior.
 */
import type { HomepageSectionConfig } from '@commonpub/server';

// Match the layer's prop contract: the renderer binds a HomepageSectionConfig
// (an interface — NOT assignable to Record<string, unknown>; vue ≥3.5.34's
// stricter template checking rejects the loose shape).
defineProps<{ config?: HomepageSectionConfig }>();

// Persisted so the dismiss sticks across HomepageSectionRenderer remounts
// (same useState key the layer uses).
const heroDismissed = useState('cpub:hero-dismissed', () => false);
function dismissHero(): void {
  heroDismissed.value = true;
}
</script>

<template>
  <section v-if="!heroDismissed" class="cpub-hero-banner">
    <div class="cpub-hero-grid-bg" />
    <div class="cpub-hero-gradient" />
    <button class="cpub-hero-dismiss" title="Dismiss" @click="dismissHero">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="cpub-hero-inner">
      <div class="cpub-hero-content">
        <div class="cpub-hero-eyebrow">
          <span class="cpub-hero-badge cpub-hero-badge-live"><span class="cpub-live-dot" /> Open. Member run.</span>
        </div>
        <h1 class="cpub-hero-title">Make things.<br><span>Share them.</span></h1>
        <p class="cpub-hero-excerpt">
          HeatSync Labs is a community hackerspace in Mesa, Arizona. This is
          where members post projects, build logs, and guides for what they
          are making on the bench.
        </p>
        <div class="cpub-hero-actions">
          <NuxtLink to="/create" class="cpub-btn cpub-btn-primary"><i class="fa-solid fa-screwdriver-wrench"></i> Start a project</NuxtLink>
          <NuxtLink to="/explore" class="cpub-btn"><i class="fa-solid fa-compass"></i> Explore the work</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cpub-hero-banner { position: relative; background: var(--surface); border-bottom: var(--border-width-default) solid var(--border); overflow: hidden; min-height: 200px; display: flex; align-items: stretch; }
.cpub-hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(var(--border2) 1px, transparent 1px), linear-gradient(90deg, var(--border2) 1px, transparent 1px); background-size: 32px 32px; opacity: 0.25; }
.cpub-hero-gradient { position: absolute; inset: 0; background: var(--surface2); opacity: 0.5; }
.cpub-hero-dismiss { position: absolute; top: 12px; right: 16px; background: transparent; border: none; color: var(--text-faint); font-size: 12px; cursor: pointer; padding: 4px; z-index: 2; }
.cpub-hero-dismiss:hover { color: var(--text-dim); }
.cpub-hero-inner { position: relative; z-index: 1; max-width: 1280px; margin: 0 auto; padding: 36px 32px; width: 100%; display: flex; align-items: center; gap: 48px; }
.cpub-hero-content { flex: 1; min-width: 0; }
.cpub-hero-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.cpub-hero-badge { font-size: 9px; font-family: var(--font-mono); letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 9px; background: var(--yellow-bg); border: var(--border-width-default) solid var(--yellow); color: var(--yellow-text); }
.cpub-hero-badge-live { background: var(--green-bg); border-color: var(--green); color: var(--green-text); display: flex; align-items: center; gap: 5px; }
.cpub-live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--green); animation: cpub-pulse 2s ease-in-out infinite; }
@keyframes cpub-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
.cpub-hero-title { font-size: 22px; font-weight: 700; line-height: 1.25; margin-bottom: 10px; }
.cpub-hero-title span { color: var(--accent); }
.cpub-hero-excerpt { font-size: 13px; color: var(--text-dim); line-height: 1.65; margin-bottom: 20px; max-width: 560px; }
.cpub-hero-actions { display: flex; flex-wrap: wrap; gap: 8px; }

@media (max-width: 640px) {
  .cpub-hero-inner { flex-direction: column; align-items: flex-start; gap: 20px; padding: 24px 16px; }
  .cpub-hero-title { font-size: 19px; }
  .cpub-hero-excerpt { font-size: 13px; }
  .cpub-hero-actions { width: 100%; }
  .cpub-hero-actions :deep(.cpub-btn) { flex: 1 1 140px; justify-content: center; }
}
</style>
