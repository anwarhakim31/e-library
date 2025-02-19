<template>
  <section class="container my-10">
    <div v-if="isPending" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="col-span-1 px-24 lg:px-32">
        <div
          class="relative w-full aspect-[2/3] bg-gray-200 animate-pulse"
        ></div>
      </div>
      <div class="py-2 col-span-1">
        <h1
          class="text-xl text-transparent bg-gray-200 animate-pulse lg:text-3xl font-medium"
        >
          sadasdasdas
        </h1>
        <h3
          class="text-sm mt-2 line-clamp-2 text-transparent bg-gray-200 animate-pulse"
        >
          ssdsdsds
        </h3>
        <p class="text-xs bg-gray-200 animate-pulse mt-10 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-xs bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-xs bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <p class="text-xs bg-gray-200 animate-pulse mt-1 text-transparent">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, ab
        </p>
        <div class="mt-8">
          <div class="flex gap-2 items-center">
            <span
              class="w-[100px] inline-block text-sm bg-gray-200 animate-pulse text-transparent"
              >status</span
            >
            <p class="text-sm bg-gray-200 animate-pulse text-transparent">
              sdasdas
            </p>
          </div>

          <div class="flex gap-2 items-center mt-4">
            <span
              class="w-[100px] inline-block text-sm bg-gray-200 animate-pulse text-transparent"
              >status</span
            >
            <p class="text-sm bg-gray-200 animate-pulse text-transparent">
              sdasdas
            </p>
          </div>
        </div>
        <button
          class="bg-gray-200 text-transparent animate-pulse w-[200px] mt-16 rounded-full text-sm py-2.5"
        >
          Pinjam
        </button>
      </div>
    </div>
    <div v-if="!isPending" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <figure class="col-span-1 px-24 lg:px-32">
        <img
          :src="data?.data?.coverImage"
          :alt="data?.data?.title"
          class="w-full h-full shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        />
      </figure>
      <div class="col-span-1">
        <h1 class="text-xl lg:text-3xl font-medium">{{ data?.data?.title }}</h1>
        <h3 class="text-gray-700 mt-1">{{ data?.data?.author }}</h3>
        <p class="mt-10 whitespace-pre-line text-sm">
          {{ data?.data?.description }}
        </p>

        <div class="mt-8">
          <div class="flex gap-2 items-center">
            <span class="w-[100px] inline-block text-sm">ISBN</span>
            <p class="text-sm">
              {{ data?.data?.isbn }}
            </p>
          </div>

          <div class="flex gap-2 items-center mt-4">
            <span class="w-[100px] inline-block text-sm">Status</span>
            <p class="px-8 py-1.5 rounded-full text-xs text-white bg-green-500">
              {{ data?.data?.status === "available" ? "Tersedia" : "Dipinjam" }}
            </p>
          </div>
        </div>
        <button
          @click="handlePinjam"
          class="btn-primary w-[200px] mt-16 rounded-full text-sm py-2.5"
        >
          Pinjam
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import useGetOneBook from "../composables/book/useGetOneBook";
import { useAuthStore } from "../stores/auth";
const auth = useAuthStore();
const router = useRouter();

const { data, isPending } = useGetOneBook();

const handlePinjam = () => {
  if (!auth.user) {
    router.push("/login");
  } else {
    router.push("/buku/" + data.value?.data?.id + "/pinjam");
  }
};
</script>

<style></style>
