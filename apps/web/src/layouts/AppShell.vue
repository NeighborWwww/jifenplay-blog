<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="relative min-h-dvh text-[rgb(var(--fg))]">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-[rgb(var(--bg))]">
      <div
        class="flowBlob absolute -top-48 left-1/2 h-[620px] w-[980px] -translate-x-1/2 rounded-full blur-3xl"
      />
      <div class="flowBlob2 absolute top-24 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full blur-3xl" />
      <div class="noise" />
    </div>

    <NavBar />

    <main class="mx-auto w-full max-w-6xl px-6 pb-20 pt-12 sm:px-10">
      <slot />
    </main>
  </div>
</template>

