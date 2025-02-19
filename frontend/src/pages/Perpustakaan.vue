<template>
  <section class="container py-14 w-full">
    <div class="relative w-full max-w-[400px] mx-auto">
      <input
        v-model="search"
        type="text"
        class="w-full block rounded-md placeholder:text-xs text-sm ring-0 focus-within:ring-0 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 px-2.5 py-2.5"
        :class="searchQuery ? 'pr-36' : 'pr-28'"
        placeholder="Cari Buku Yang Anda Inginkan"
      />
      <div
        class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2"
      >
        <button
          type="button"
          @click="handleClick"
          class="flex items-center gap-2 text-sm btn-primary rounded-full"
        >
          <Search class="text-white w-5 h-5" />
          Cari
        </button>
        <button v-if="searchQuery" @click="handleReset" type="button">
          <X class="w-5 h-5 text-gray-500 active:text-gray-400" />
        </button>
      </div>
    </div>

    <div class="mt-10 min-h-[calc(100vh-280px)]">
      <!-- Skeleton  -->
      <div
        v-if="isPending"
        class="grid grid-cols-4 sm:grid-cols-9 lg:grid-cols-12 gap-6"
      >
        <div
          v-for="(_, index) in Array.from({ length: 6 })"
          :key="index"
          class="relative col-span-2 sm:col-span-3 lg:col-span-2 h-full"
        >
          <div
            class="relative w-full aspect-[2/3] bg-gray-200 animate-pulse"
          ></div>
          <div class="py-2">
            <h3
              class="text-sm mt-2 line-clamp-2 text-transparent bg-gray-200 animate-pulse"
            >
              ssdsdsds
            </h3>
            <p class="text-xs bg-gray-200 animate-pulse mt-2 text-transparent">
              ssdsdsds
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="!isPending && data?.data?.book?.length === 0"
        class="flex items-center justify-center flex-col gap-2 mt-20"
      >
        <img src="/decoration/books.png" alt="notodfuns" class="w-24 h-24" />
        <p class="text-gray-700 text-sm">Buku Tidak Ditemukan</p>
      </div>
      <!-- buku -->
      <div
        v-if="!isPending && data?.data?.book?.length > 0"
        v-for="book in data?.data?.book"
        class="grid grid-cols-4 sm:grid-cols-9 lg:grid-cols-12 gap-6"
      >
        <RouterLink
          :to="`/buku/${book.id}`"
          class="relative col-span-2 sm:col-span-3 lg:col-span-2 h-full cursor-pointer group"
        >
          <figure class="aspect-video relative">
            <img
              :src="book.coverImage"
              :alt="book.title"
              class="w-full h-auto object-cover opacity-0 transition-opacity duration-300 min-h-[250px]"
              loading="lazy"
              @load="(e) => e.target?.classList?.remove('opacity-0')"
            />
          </figure>
          <div class="py-2">
            <h3 class="text-sm mt-2 line-clamp-2">{{ book.title }}</h3>
            <p class="text-xs text-gray-500">{{ book.author }}</p>
          </div>
          <div
            class="absolute bg-zinc-900/50 inset-0 flex-col opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 flex items-center justify-center"
          >
            <Eye class="w-5 h-5 text-white" />
            <span class="text-white text-xs">Lihat</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { Eye, Search, X } from "lucide-vue-next";
import { computed, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { instance } from "../utils/interceptor";

const router = useRouter();
const route = useRoute();
const search = ref(route.query.search || "");

const searchQuery = computed(() => route.query.search);

const { data, isPending } = useQuery({
  queryKey: ["books", searchQuery],
  queryFn: async () => {
    const res = await instance.get("/book/all", {
      params: { search: searchQuery.value },
    });

    return res.data;
  },
  staleTime: 0,
});

const handleClick = () => {
  router.replace({
    ...route.query,
    query: search.value ? { search: search.value } : {},
  });
};

const handleReset = () => {
  search.value = "";
  router.replace({ query: {} });
};
</script>

<style></style>
