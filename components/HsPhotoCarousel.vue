<script setup lang="ts">
/**
 * Photo carousel from new-hsl (src/components/graphics/PhotoCarousel.vue),
 * the framed "feature object" of the heatsynclabs.org hero. Photos live in
 * /public/space-pics. The server renders the list in source order and the
 * client shuffles it after mount, so hydration never sees a different order.
 */
import { ref, onMounted, onUnmounted } from 'vue';

type Photo = { src: string; name: string };

const SPACE_PIC_FILES = [
  'Main Hall.webp',
  'Woodshop.webp',
  'Laser Cutters.webp',
  'Electronics.webp',
  '3D Printing Station.webp',
  'Machine Shop.webp',
  'Welding.webp',
  'Sewing Station.webp',
  'Music Station.webp',
  'Microcontrollers.webp',
  'Biohacking Lab.webp',
  'CRT Wall.webp',
  'Coffee and Books.webp',
  'Coworking.webp',
  'Dark Room Photography.webp',
  'Drill Press.webp',
  'Entrance.webp',
  'Front Window.webp',
  'Front window 2.webp',
  'Jewlery Station.webp',
  'Vinyl and Sublimation Station.webp',
  'Window Decor.webp',
  'All are welcome.webp',
];

const basePhotos: Photo[] = SPACE_PIC_FILES.map((f) => ({
  src: `/space-pics/${encodeURIComponent(f)}`,
  name: f.replace(/\.[^.]+$/, ''),
}));

const images = ref<Photo[]>(basePhotos);
const index = ref(0);
const paused = ref(false);

const ROTATE_MS = 5000;
let timer: number | null = null;
let touchX = 0;

const pad = (n: number): string => String(n).padStart(2, '0');

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function start(): void { timer = window.setInterval(() => { index.value = (index.value + 1) % images.value.length; }, ROTATE_MS); }
function stop(): void { if (timer) { window.clearInterval(timer); timer = null; } }
function restart(): void { stop(); if (!paused.value) start(); }
function goTo(i: number): void { index.value = (i + images.value.length) % images.value.length; restart(); }
function next(): void { goTo(index.value + 1); }
function prev(): void { goTo(index.value - 1); }
function pause(): void { paused.value = true; stop(); }
function resume(): void { paused.value = false; if (!timer) start(); }
function onTouchStart(e: TouchEvent): void { touchX = e.changedTouches[0]?.clientX ?? 0; }
function onTouchEnd(e: TouchEvent): void {
  const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX;
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
}

onMounted(() => {
  images.value = shuffle(basePhotos);
  // Respect reduced motion: no auto-advance; prev/next still work.
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
});
onUnmounted(stop);
</script>

<template>
  <div
    class="hs-carousel"
    :class="{ 'is-paused': paused }"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="hs-carousel__frame">
      <div class="hs-carousel__stage">
        <img
          v-for="(photo, i) in images"
          :key="photo.src"
          :src="photo.src"
          :alt="`HeatSync Labs: ${photo.name}`"
          class="hs-carousel__img"
          :class="{ 'is-active': i === index }"
          :loading="i === 0 ? 'eager' : 'lazy'"
          draggable="false"
        />
      </div>
      <div class="hs-carousel__progress"><div :key="index" class="hs-carousel__progress-fill" /></div>
      <div class="hs-carousel__bar">
        <span class="hs-carousel__eyebrow">{{ images[index]?.name }}</span>
        <span class="hs-carousel__count">{{ pad(index + 1) }} / {{ pad(images.length) }}</span>
      </div>
    </div>
    <button type="button" class="hs-carousel__btn hs-carousel__btn--prev" aria-label="Previous photo" @click="prev">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
    </button>
    <button type="button" class="hs-carousel__btn hs-carousel__btn--next" aria-label="Next photo" @click="next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
    </button>
  </div>
</template>

<style scoped>
.hs-carousel { position: relative; width: 100%; display: flex; justify-content: center; }
.hs-carousel__frame {
  position: relative;
  width: 100%;
  max-width: 560px;
  background: var(--grime);
  border: 2px solid var(--steel-hi);
  box-shadow: var(--g-shadow);
  padding: 10px;
}
.hs-carousel__stage {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--slab);
  border: 1px solid var(--steel);
}
.hs-carousel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.7s ease;
}
.hs-carousel__img.is-active { opacity: 1; }
.hs-carousel__progress { height: 4px; background: var(--steel); margin-top: 8px; }
.hs-carousel__progress-fill { height: 100%; width: 0; background: var(--hazard); animation: hs-carousel-progress 5s linear forwards; }
.hs-carousel.is-paused .hs-carousel__progress-fill { animation-play-state: paused; }
@keyframes hs-carousel-progress { from { width: 0; } to { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .hs-carousel__progress-fill { animation: none; width: 100%; } }
.hs-carousel__bar { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; font-family: var(--font-mono); }
.hs-carousel__eyebrow {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: var(--accent-text);
  text-transform: uppercase;
  min-width: 0;
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hs-carousel__count { flex: 0 0 auto; font-size: 11px; font-weight: 500; letter-spacing: 0.14em; color: var(--smoke); }
.hs-carousel__btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tape-dark);
  color: var(--on-dark);
  border: 1px solid rgba(236, 227, 211, 0.24);
  cursor: pointer;
  z-index: 2;
}
.hs-carousel__btn svg { width: 18px; height: 18px; }
.hs-carousel__btn:hover { color: var(--hazard); border-color: var(--hazard); }
.hs-carousel__btn--prev { left: 6px; }
.hs-carousel__btn--next { right: 6px; }
@media (max-width: 900px) { .hs-carousel__frame { max-width: 460px; } }
@media (max-width: 600px) { .hs-carousel__btn { width: 34px; height: 44px; } }
</style>
