<template>
  <div
    class="relative h-[800px] md:aspect-video w-full max-h-[700px] overflow-hidden"
  >
    <div
      class="absolute bg-[url('/decoration/pexels-pixabay-159740.jpg')] inset-0 w-full h-full bg-cover bg-center"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"
    ></div>

    <div
      class="absolute inset-0 flex items-center justify-center md:justify-start container"
    >
      <div class="relative z-10 flex flex-col items-center md:items-start">
        <div class="inline-flex items-center gap-2">
          <BadgeCheck class="text-orange-500" />
          <h3 class="text-lg font-bold text-orange-500 uppercase">
            Tingkatkan Pengetahuanmu disini
          </h3>
        </div>
        <h1
          class="text-3xl md:text-6xl md:text-left text-center font-bold text-white max-w-[500px] leading-loose"
        >
          Selamat Datang Di Perpus Digital SMKN 1
        </h1>
        <div class="relative mt-4 w-fit">
          <input
            type="text"
            class="pl-10 pr-20 text-sm py-4 rounded-md bg-white w-[300px]"
            placeholder="Temukan Bacaanmu..."
            v-model="search"
          />
          <Search
            class="absolute w-5 h-5 left-4 top-1/2 text-gray-700 -translate-y-1/2"
            stroke-width="1.5"
          />
          <button
            @click="handleClick"
            class="btn-primary absolute right-2 top-1/2 -translate-y-1/2"
          >
            Cari
          </button>
        </div>
        <div class="flex gap-2 items-center mt-4">
          <div
            class="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center"
          >
            <Check color="white " class="w-4 h-4" />
          </div>
          <p class="text-sm text-white">Akses lebih dari 1000 buku</p>
        </div>
        <div class="flex gap-2 items-center mt-4">
          <div
            class="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center"
          >
            <Check color="white " class="w-4 h-4" />
          </div>
          <p class="text-sm text-white">Pinjam dan Baca secara online</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { BadgeCheck, Check, Search } from "lucide-vue-next";
import { useRouter } from "vue-router";
const router = useRouter();
const search = ref("");

const handleClick = () => {
  if (search.value) {
    router.push({ query: { search: search.value }, path: "/perpustakaan" });
  }
};
</script>

<style></style>
