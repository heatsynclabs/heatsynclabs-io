<!-- Shadows @commonpub/layer's SiteLogo. Example of the override pattern:
     drop a file at the same path to replace just that piece of the layer. -->
<template>
  <span class="cpub-site-logo">
    <span class="cpub-logo-bracket">[</span>H<span class="cpub-logo-bracket">]</span>
    <span class="cpub-logo-name">HeatSync Labs</span>
  </span>
</template>

<style scoped>
.cpub-site-logo {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text);
  white-space: nowrap;
}
.cpub-logo-bracket { color: var(--accent); font-size: 15px; }
.cpub-logo-name { margin-left: 2px; }
</style>
