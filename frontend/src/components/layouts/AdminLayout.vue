<template>
  <div class="relative flex min-h-screen items-center">
    <header
      class="bg-white shadow-sm fixed z-50 top-0 left-0 w-full py-4 pr-4 lg:pr-8 border-b flex items-center justify-between duration-300 transition-all ease-in-out"
      :class="isOpen ? 'pl-4 lg:pl-[8.5rem] ' : 'pl-4 lg:pl-64'"
    >
      <button
        @click="isOpen = !isOpen"
        id="toggle-sidebar"
        class="flex items-center justify-center shadow-sm w-8 h-8 rounded-full border"
      >
        <AlignCenter
          class="w-4 h-4 block lg:hidden stroke-[1.5] pointer-events-none"
        />
        <ChevronsRight
          v-if="isOpen"
          class="w-5 h-5 hidden lg:block stroke-[1.5] pointer-events-none"
        />
        <ChevronsLeft
          v-else
          class="w-5 h-5 hidden lg:block stroke-[1.5] pointer-events-none"
        />
      </button>

      <RouterLink
        v-if="user && !loading"
        to="/profile"
        class="ml-auto flex items-center gap-2"
      >
        <div>
          <p class="text-xs font-medium text-gray-700">Administrator</p>
          <p class="text-xs w-[80px] truncate text-gray-500">
            {{ user.name }}
          </p>
        </div>
        <img
          v-if="user.photo"
          class="w-8 h-8 p-1 rounded-full ring-2"
          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          alt="Bordered avatar"
        />
        <div
          v-else
          class="w-8 h-8 p-1 flex items-center justify-center rounded-full bg-blue-600"
        >
          <span class="text-sm uppercase text-white">
            {{ ProfileName(user?.name || "") }}
          </span>
        </div>
      </RouterLink>
    </header>
    <aside
      id="sidebar"
      class="fixed top-0 min-h-screen w-56 shadow-sm bg-white border-r z-50 py-5 px-4 lg:px-8 flex flex-col transition-all duration-300 ease-in-out"
      :class="isOpen ? 'left-0 lg:w-[6.25rem]' : ' left-[-100%]  lg:left-0'"
      @click.stop
    >
      <img
        src="/brand/eLibrary-letter-2.svg"
        alt="e-library"
        class="h-6"
        :class="{ 'lg:hidden': isOpen }"
      />
      <img
        src="/brand/class-smkn-1.png"
        alt="e-library"
        class="h-6 w-7 mx-auto hidden"
        :class="{ 'lg:block': isOpen }"
      />
      <ul class="mt-8 space-y-4">
        <li
          class="relative"
          v-for="item in sidebarItem"
          :key="item.id"
          @mouseenter="isHover = item.name"
          @mouseleave="isHover = ''"
        >
          <RouterLink
            :to="item.path"
            class="flex items-center text-sm gap-2 p-2 capitalize rounded-lg transition-all truncate duration-300 ease-in-out"
            :class="
              route.path.startsWith(item.path)
                ? 'bg-blue-600 text-white hover:bg-blue-600'
                : 'hover:bg-blue-100 '
            "
          >
            <component
              :is="item.icon"
              class="w-5 h-5 stroke-[1.5] flex-shrink-0"
            />
            {{ item.name }}
          </RouterLink>
          <div
            v-if="isOpen && isHover === item.name"
            class="hidden lg:block before:w-8 before:h-10 before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 w-28 before:bg-transparent absolute -right-36 top-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-lg text-sm"
          >
            <routerLink :to="item.path" class="w-28 p-2 block capitalize">
              {{ item.name }}
            </routerLink>
          </div>
        </li>
      </ul>
      <button
        class="lg:hidden absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border w-10 h-10 flex items-center justify-center"
        @click="isOpen = !isOpen"
      >
        <X class="text-gray-800 active:text-gray-400" />
      </button>
    </aside>
    <section
      class="w-full min-h-screen pt-24 pr-4 pb-10 lg:pr-8 transition-[width] duration-300 ease-in-out"
      :class="isOpen ? 'pl-4 lg:pl-[8.5rem] ' : 'pl-4 lg:pl-64'"
    >
      <RouterView />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from "vue-router";
import { ProfileName } from "../../utils/helpers";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";

import { sidebarItem } from "../../utils/constant";
import { AlignCenter, ChevronsLeft, ChevronsRight, X } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
const route = useRoute();
const isHover = ref("");
const isOpen = ref(false);

const closeSidebar = (event: MouseEvent) => {
  const sidebar = document.getElementById("sidebar");
  const button = document.getElementById("toggle-sidebar");
  if (
    window.innerWidth < 990 &&
    sidebar &&
    !sidebar.contains(event.target as Node) &&
    button &&
    !button.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeSidebar);
});

onUnmounted(() => {
  document.removeEventListener("click", closeSidebar);
});

const autHStore = useAuthStore();
const { user, loading } = storeToRefs(autHStore);
</script>

<style></style>
