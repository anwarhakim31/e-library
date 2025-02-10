<template>
  <header
    class="fixed z-50 top-0 left-0 bg-white w-full"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="flex items-center justify-between container">
      <div class="flex items-center gap-2">
        <img src="/brand/eLibrary-letter-2.svg" alt="e-library" class="h-5" />
        <nav class="inline-block space-x-2 ml-4">
          <RouterLink
            to="/"
            class="font-medium py-5 inline-block text-xs"
            :class="{ 'text-blue-600': route.path === '/' }"
            >Beranda
          </RouterLink>
          <RouterLink
            to="/perpustakaan"
            class="font-medium py-5 inline-block text-xs"
            :class="{ 'text-blue-600': route.path === '/perpustakaan' }"
            >Buku Perpustakaan
          </RouterLink>
          <RouterLink
            to="/e-book"
            class="font-medium py-5 inline-block text-xs"
            :class="{ 'text-blue-600': route.path === '/e-book' }"
            >E-Book</RouterLink
          >
        </nav>
      </div>
      <div class="flex items-center">
        <RouterLink v-if="user && !loading" to="/profile">
          <img
            v-if="user.photo"
            class="w-8 h-8 p-1 rounded-full ring-2"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bordered avatar"
          />
          <div
            v-el
            se
            class="w-8 h-8 p-1 flex items-center justify-center rounded-full bg-blue-500"
          >
            <span class="text-sm uppercase text-white">
              {{ ProfileName(user.name) }}
            </span>
          </div>
        </RouterLink>
        <RouterLink
          v-if="!user && !loading"
          to="/login"
          class="btn-primary text-xs"
        >
          Masuk
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, watch, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { ProfileName } from "../../utils/helpers";

const route = useRoute();
const authStore = useAuthStore();
const { user, loading, setLoading } = storeToRefs(authStore);

const isScrolled = ref(false);

watchEffect(() => {
  console.log(!user, loading.value);
});

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
