<template>
  <div class="fixed z-50 top-0 left-0">
    <header class="bg-white w-full p-8">
      <RouterLink to="/">
        <img src="/brand/eLibrary-letter-2.svg" alt="e-library"
      /></RouterLink>
    </header>
  </div>
  <div class="flex items-center h-screen">
    <div
      class="mx-auto w-full md:w-3/4 lg:w-2/5 h-full flex items-center justify-center flex-col"
    >
      <RouterView />
    </div>
    <div
      class="relative hidden lg:block lg:w-3/5 h-full bg-[url('/decoration/pexels-pixabay-159740.jpg')] bg-cover bg-center]"
    >
      <div class="absolute right-2 bottom-2 z-10 flex items-center gap-2">
        <img src="/brand/class-smkn-1.png" alt="e-library" class="" />
        <p class="text-sm text-white font-medium">Perpus Digital SMKN 1</p>
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
<style scoped lang=""></style>
