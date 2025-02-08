<template>
  <header
    class="fixed z-50 top-0 left-0 bg-white w-full"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="flex items-center justify-between container">
      <div class="flex items-center gap-2">
        <img src="/brand/eLibrary-letter-2.svg" alt="e-library" />
        <nav class="inline-block space-x-2 ml-4">
          <RouterLink
            to="/"
            class="font-medium py-6 inline-block text-sm"
            :class="{ 'text-blue-600': route.path === '/' }"
            >Beranda
          </RouterLink>
          <RouterLink
            to="/perpustakaan"
            class="font-medium py-6 inline-block text-sm"
            :class="{ 'text-blue-600': route.path === '/perpustakaan' }"
            >Buku Perpustakaan
          </RouterLink>
          <RouterLink
            to="/e-book"
            class="font-medium py-6 inline-block text-sm"
            :class="{ 'text-blue-600': route.path === '/e-book' }"
            >E-Book</RouterLink
          >
        </nav>
      </div>
      <div class="flex items-center">
        <RouterLink to="/login" class="btn-primary text-sm"> Masuk </RouterLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
