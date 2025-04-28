<template>
  <section>
    <h1 class="text-xl font-medium">Dashboard Perpus Digital</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
      <div class="col-span-1 gap-2 border rounded-md p-4 flex shadow-md">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-md bg-green-500"
        >
          <Users class="text-white" width="18" height="18" />
        </div>
        <div>
          <h3 class="text-sm font-medium">Total Pengguna</h3>
          <p class="text-lg">{{ data?.user || 0 }}</p>
        </div>
      </div>
      <div class="col-span-1 gap-2 border rounded-md p-4 flex shadow-md">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-md bg-orange-500"
        >
          <Book class="text-white" width="18" height="18" />
        </div>
        <div>
          <h3 class="text-sm font-medium">Total Buku</h3>
          <p class="text-lg">{{ data?.book || 0 }}</p>
        </div>
      </div>
      <div class="col-span-1 gap-2 border rounded-md p-4 flex shadow-md">
        <div
          class="flex items-center justify-center w-8 h-8 rounded-md bg-red-500"
        >
          <ArrowLeftRightIcon class="text-white" width="18" height="18" />
        </div>
        <div>
          <h3 class="text-sm font-medium">Total Peminjaman</h3>
          <p class="text-lg">{{ data?.booking || 0 }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-20 justify-center">
      <img
        src="/brand/logo.jpg"
        alt="class-smkn-1"
        class="h-full w-full max-w-[300px] max-h-[300px] object-cover"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowLeftRightIcon, Book, Users } from "lucide-vue-next";
import useGetStatistik from "../../composables/dashboard/useGetStatistick";

const { data } = useGetStatistik();
</script>

<style></style>
