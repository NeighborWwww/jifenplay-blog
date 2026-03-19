<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="min-h-dvh bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
    <div class="pointer-events-none fixed inset-0 -z-10">
      <div
        class="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style="
          background: radial-gradient(
            circle at center,
            rgba(0, 122, 255, 0.22),
            rgba(0, 0, 0, 0)
          );
        "
      />
      <div class="noise" />
    </div>

    <NavBar />

    <main class="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 sm:px-10">
      <slot />
    </main>
  </div>
</template>

