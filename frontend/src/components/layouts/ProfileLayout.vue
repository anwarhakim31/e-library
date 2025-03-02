<template>
  <Header />
  <div class="py-20 container">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="flex gap-6">
        <figure
          class="w-28 h-28 rounded-full bg-blue-500 hover:bg-blue-500 overflow-hidden flex justify-center items-center"
        >
          <img
            v-if="authStore.user?.photo"
            class="w-8 h-8 p-1 rounded-full ring-2"
            :src="authStore.user?.photo"
            alt="Bordered avatar"
          />
          <figcaption
            v-else
            class="w-8 h-8 p-1 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-500"
          >
            <span class="text-2xl uppercase text-white">
              {{ ProfileName(authStore.user?.name || "") }}
            </span>
          </figcaption>
        </figure>
        <div>
          <h1 class="text-xl font-medium">{{ authStore.user?.name }}</h1>
          <span class="text-xs block mt-0 text-gray-500"
            >ID : {{ authStore.user?.id?.split("-")[0] }}</span
          >
          <p class="text-xs mt-4">
            <Mail class="mr-2 w-4 stroke-[1.5] h-4 inline-block" />
            {{ authStore.user?.email }}
          </p>
        </div>
      </div>
      <div
        class="flex gap-2 justify-center flex-col items-center lg:border-x px-4 h-full"
      >
        <h1 class="text-3xl font-medium text-blue-500">1</h1>
        <p class="text-xs">Buku Dipinjam</p>
      </div>
    </div>
    <div class="lg:flex mt-8 gap-8">
      <div class="w-full lg:w-[200px] flex-col flex gap-4">
        <RouterLink
          to="/profile/booking"
          class="text-xs w-full block p-2.5 rounded-md border text-gray-700 hover:bg-blue-100"
          :class="
            route.path === '/profile/history'
              ? 'bg-blue-500 hover:bg-blue-500 text-white'
              : ''
          "
        >
          Pesanan
        </RouterLink>
        <RouterLink
          to="/profile/setting"
          class="text-xs w-full block p-2.5 rounded-md border text-gray-700 hover:bg-blue-100"
          :class="
            route.path === '/profile/setting'
              ? 'bg-blue-500 hover:bg-blue-500 text-white'
              : ''
          "
        >
          Pengaturan
        </RouterLink>
        <button
          class="text-xs w-full block text-left p-2.5 rounded-md border text-gray-700 hover:bg-blue-100"
          @click="handleLogout"
        >
          Keluar
        </button>
      </div>
      <section class="flex-1">
        <router-view></router-view>
      </section>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";
import Footer from "../fragments/Footer.vue";
import Header from "../fragments/Header.vue";
import { ProfileName } from "../../utils/helpers";
import { Mail } from "lucide-vue-next";
import { useRoute } from "vue-router";
import useLogout from "../../composables/auth/useLogout";
const route = useRoute();

const authStore = useAuthStore();

const { isPending, mutate } = useLogout();

const handleLogout = () => {
  authStore.setUser(null);
  mutate();
};
</script>

<style></style>
