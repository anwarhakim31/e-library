<template>
  <header
    class="fixed z-50 top-0 left-0 bg-white w-full"
    :class="{ 'shadow-lg': isScrolled }"
  >
    <div class="flex items-center justify-between container py-4 md:py-0">
      <div class="flex items-center gap-2">
        <img src="/brand/eLibrary-letter-2.svg" alt="e-library" class="h-5" />
        <nav
          class="hidden md:flex items-start gap-2 md:static bg-white w-full transition-all duration-300 ease-in-out"
        >
          <button class="ml-auto block md:hidden" @click="isOpen = !isOpen">
            <X class="w-6 h-6 text-gray-500 active:text-gray-400" />
          </button>
          <RouterLink
            to="/"
            class="font-medium py-5 inline-block text-xs w-full md:w-fit"
            :class="{ 'text-blue-600': route.path === '/' }"
            >Beranda
          </RouterLink>
          <RouterLink
            to="/perpustakaan"
            class="font-medium py-5 inline-block text-xs w-full md:w-fit"
            :class="{ 'text-blue-600': route.path === '/perpustakaan' }"
            >Buku Perpustakaan
          </RouterLink>
          <RouterLink
            to="/e-book"
            class="font-medium py-5 inline-block text-xs w-full md:w-fit"
            :class="{ 'text-blue-600': route.path === '/e-book' }"
            >E-Book</RouterLink
          >
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <RouterLink v-if="user && !loading" to="/profile">
          <img
            v-if="user.photo"
            class="w-8 h-8 p-1 rounded-full ring-2"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bordered avatar"
          />
          <div
            v-else
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
        <button class="block md:hidden" @click="openModal">
          <AlignRight class="w-6 h-6" />
        </button>
      </div>
    </div>

    <NavMobile :isOpen="isModalOpen" @close="closeModal" />
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { ProfileName } from "../../utils/helpers";
import { AlignRight, X } from "lucide-vue-next";
import NavMobile from "./NavMobile.vue";
import Modal from "../ui/Modal.vue";

const route = useRoute();
const authStore = useAuthStore();
const { user, loading, setLoading } = storeToRefs(authStore);

const isScrolled = ref(false);
const isModalOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

const openModal = () => {
  isModalOpen.value = true;
  document.documentElement.style.overflow = "hidden";
};

const closeModal = () => {
  isModalOpen.value = false;
  document.documentElement.style.overflow = "auto";
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
