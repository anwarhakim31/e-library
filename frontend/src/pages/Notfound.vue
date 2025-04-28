<template>
  <section
    class="min-h-screen flex items-center justify-center flex-col container"
  >
    <h1 class="text-9xl font-bold text-blue-600">404</h1>
    <p class="text-base font-semibold mt-4">Halaman Tidak Ditemukan</p>
    <RouterLink to="/" class="btn-primary mt-4 text-sm">Kembali</RouterLink>
  </section>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<style></style>
