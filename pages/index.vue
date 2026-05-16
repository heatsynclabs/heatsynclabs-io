<script setup lang="ts">
/**
 * HeatSync Labs home page. Shadows @commonpub/layer's pages/index.vue.
 *
 * TRADEOFF: this forks the home page composition, so layer updates to the
 * *home layout* won't flow in. It deliberately reuses the layer's
 * <ContentCard>, composables, and /api endpoints, so content, cards, and
 * data still track @commonpub/layer. Delete this file to fall back to the
 * stock layer home page.
 */
const siteName = useSiteName();
const cfg = useRuntimeConfig();
const tagline = (cfg.public.siteDescription as string)
  || 'A community hackerspace in Mesa, Arizona.';

const { user } = useAuth();
const features = useFeatures();

useSeoMeta({
  title: `${siteName} — build, document, share`,
  description: tagline,
});

// SSR (content is the point of the page + SEO). Reuses the layer API + card.
const { data: latest } = await useFetch<{ items: any[] }>('/api/content', {
  query: { status: 'published', sort: 'recent', limit: 8 },
});

// Non-blocking secondary data.
const { data: stats } = useLazyFetch<any>('/api/stats');
const { data: hubs } = useLazyFetch<{ items: any[] }>('/api/hubs', {
  query: { limit: 4 },
});

const hasLatest = computed(() => !!latest.value?.items?.length);
</script>

<template>
  <div class="hs-home">
    <!-- HERO -->
    <section class="hs-hero">
      <div class="hs-hero-text">
        <span class="hs-eyebrow"><span class="hs-dot" /> Open. Member run. Since 2009.</span>
        <h1 class="hs-title">Make things.<br />Document them.<br />Help the next person.</h1>
        <p class="hs-lede">
          {{ tagline }} This is where members post projects, build logs, and
          guides for what they are making on the bench.
        </p>
        <div class="hs-cta">
          <NuxtLink to="/create" class="cpub-btn cpub-btn-primary hs-btn">
            <i class="fa-solid fa-screwdriver-wrench" /> Start a project
          </NuxtLink>
          <NuxtLink to="/explore" class="cpub-btn hs-btn">
            <i class="fa-solid fa-compass" /> Explore the work
          </NuxtLink>
          <NuxtLink v-if="!user" to="/auth/register" class="hs-textlink">
            or join the space
          </NuxtLink>
        </div>
      </div>
      <div class="hs-hero-mark" aria-hidden="true">
        <img src="/brand/heatsync-mark.png" alt="" width="220" height="220" />
      </div>
    </section>

    <!-- STATS RIBBON -->
    <div v-if="stats" class="hs-stats">
      <span><strong>{{ stats.content?.total ?? 0 }}</strong> projects &amp; posts</span>
      <span class="hs-sep">/</span>
      <span><strong>{{ stats.users?.total ?? 0 }}</strong> members</span>
      <span class="hs-sep">/</span>
      <span><strong>{{ stats.hubs?.total ?? 0 }}</strong> groups</span>
    </div>

    <!-- LATEST -->
    <section class="hs-section">
      <div class="hs-section-head">
        <h2>Latest from the bench</h2>
        <NuxtLink to="/explore" class="hs-more">All work <i class="fa-solid fa-arrow-right" /></NuxtLink>
      </div>
      <div v-if="hasLatest" class="cpub-content-grid">
        <ContentCard v-for="item in latest!.items" :key="item.id" :item="item" />
      </div>
      <div v-else class="hs-empty">
        <p>Nothing posted yet. Be the first.</p>
        <NuxtLink to="/create" class="cpub-btn cpub-btn-primary hs-btn">
          <i class="fa-solid fa-plus" /> Post the first project
        </NuxtLink>
      </div>
    </section>

    <!-- GROUPS -->
    <section v-if="features.hubs && hubs?.items?.length" class="hs-section">
      <div class="hs-section-head">
        <h2>Groups &amp; spaces</h2>
        <NuxtLink to="/hubs" class="hs-more">All groups <i class="fa-solid fa-arrow-right" /></NuxtLink>
      </div>
      <div class="hs-hubs">
        <NuxtLink
          v-for="hub in hubs.items"
          :key="hub.id"
          :to="`/hubs/${hub.slug}`"
          class="hs-hub"
        >
          <span class="hs-hub-name">{{ hub.name }}</span>
          <span class="hs-hub-meta">{{ hub.memberCount ?? 0 }} members</span>
        </NuxtLink>
      </div>
    </section>

    <!-- CLOSING BAND -->
    <section class="hs-band">
      <div>
        <h2>Built something? Write it up.</h2>
        <p>Good documentation is how the space gets better. Share the build.</p>
      </div>
      <NuxtLink to="/create" class="cpub-btn cpub-btn-primary hs-btn">
        <i class="fa-solid fa-pen-nib" /> Start writing
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.hs-home {
  max-width: var(--content-wide-max-width, 75rem);
  margin: 0 auto;
  padding: var(--space-6, 1.5rem) var(--space-4, 1rem) var(--space-16, 4rem);
  display: flex;
  flex-direction: column;
  gap: var(--space-12, 3rem);
}

/* HERO */
.hs-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8, 2rem);
  background: var(--surface);
  border: var(--border-width-thick, 4px) solid var(--border);
  box-shadow: var(--shadow-xl);
  padding: clamp(1.5rem, 4vw, 3.25rem);
}
.hs-hero-text { min-width: 0; max-width: 38rem; }
.hs-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest, 0.12em);
  color: var(--text-dim);
  margin-bottom: var(--space-4);
}
.hs-dot {
  width: 8px; height: 8px; background: var(--accent);
  display: inline-block; flex: none;
}
.hs-title {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: clamp(2.25rem, 5.5vw, 3.75rem);
  line-height: 1.05;
  color: var(--text);
  letter-spacing: 0.5px;
  text-shadow: 3px 3px 0 var(--accent);
  margin-bottom: var(--space-5);
}
.hs-lede {
  font-size: var(--text-md);
  line-height: var(--leading-normal);
  color: var(--text-dim);
  margin-bottom: var(--space-6);
}
.hs-cta { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }
.hs-btn { box-shadow: var(--shadow-sm); }
.hs-btn:hover { transform: translate(-2px, -2px); box-shadow: var(--shadow-md); }
.hs-textlink {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-faint);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.hs-hero-mark { flex: none; }
.hs-hero-mark img {
  width: clamp(120px, 16vw, 220px);
  height: auto;
  display: block;
}
:global([data-theme="dark"]) .hs-hero-mark img,
:global([data-theme="agora-dark"]) .hs-hero-mark img,
:global([data-theme="generics"]) .hs-hero-mark img {
  filter:
    drop-shadow(0 2px 0 var(--hs-paper)) drop-shadow(0 -2px 0 var(--hs-paper))
    drop-shadow(2px 0 0 var(--hs-paper)) drop-shadow(-2px 0 0 var(--hs-paper));
}
@media (max-width: 760px) {
  .hs-hero { flex-direction: column-reverse; align-items: flex-start; }
  .hs-hero-mark img { width: 120px; }
}

/* STATS */
.hs-stats {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-top: calc(var(--space-12) * -0.6);
}
.hs-stats strong { color: var(--accent); }
.hs-sep { color: var(--border2); }

/* SECTIONS */
.hs-section { display: flex; flex-direction: column; gap: var(--space-5); }
.hs-section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  border-bottom: var(--border-width-default) solid var(--border);
  padding-bottom: var(--space-3);
}
.hs-section-head h2 {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: var(--text-2xl);
  color: var(--text);
  letter-spacing: 0.5px;
}
.hs-more {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  white-space: nowrap;
}
.hs-empty {
  border: var(--border-width-default) dashed var(--border2);
  padding: var(--space-12) var(--space-6);
  text-align: center;
  color: var(--text-dim);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

/* HUBS */
.hs-hubs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}
.hs-hub {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: var(--space-4);
  background: var(--surface);
  border: var(--border-width-default) solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-default), box-shadow var(--transition-default);
}
.hs-hub:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-md);
}
.hs-hub-name { font-weight: var(--font-weight-bold); color: var(--text); }
.hs-hub-meta {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

/* CLOSING BAND */
.hs-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
  background: var(--accent);
  color: var(--color-on-accent);
  border: var(--border-width-thick, 4px) solid var(--border);
  box-shadow: var(--shadow-lg);
  padding: clamp(1.25rem, 3vw, 2.25rem);
}
.hs-band h2 {
  font-family: var(--font-heading);
  font-weight: 400;
  font-size: var(--text-2xl);
  letter-spacing: 0.5px;
}
.hs-band p { font-size: var(--text-base); opacity: 0.85; margin-top: 4px; }
.hs-band .cpub-btn {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
}
</style>
