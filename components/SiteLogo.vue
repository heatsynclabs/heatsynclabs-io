<!-- Shadows @commonpub/layer's SiteLogo. The canonical HeatSync mark
     (inline from /public/brand) plus the Permanent Marker wordmark,
     mirroring the design system's mark lockup. -->
<template>
  <span class="cpub-site-logo">
    <img
      class="cpub-logo-mark"
      src="/brand/heatsync-mark.png"
      alt=""
      width="30"
      height="30"
      decoding="async"
    />
    <span class="cpub-logo-name">HeatSync Labs</span>
  </span>
</template>

<style scoped>
.cpub-site-logo {
  display: flex;
  align-items: center;
  gap: 9px;
  white-space: nowrap;
  text-decoration: none;
}

.cpub-logo-mark {
  width: 30px;
  height: 30px;
  display: block;
  object-fit: contain;
  flex: none;
}

/* Dark ink panel: the mark's black flames need separation from the
   background. A thin paper outline keeps the real artwork intact. */
:global([data-theme="dark"]) .cpub-logo-mark,
:global([data-theme="agora-dark"]) .cpub-logo-mark,
:global([data-theme="generics"]) .cpub-logo-mark {
  filter:
    drop-shadow(0 1px 0 var(--hs-paper))
    drop-shadow(0 -1px 0 var(--hs-paper))
    drop-shadow(1px 0 0 var(--hs-paper))
    drop-shadow(-1px 0 0 var(--hs-paper));
}

.cpub-logo-name {
  font-family: var(--font-heading, 'Permanent Marker', cursive);
  font-size: 18px;
  font-weight: 400;
  line-height: 1;
  color: var(--text);
  letter-spacing: 0.5px;
  /* Hard offset shadow — the HeatSync signature, scaled for nav size */
  text-shadow: 1.5px 1.5px 0 var(--accent);
}
</style>
