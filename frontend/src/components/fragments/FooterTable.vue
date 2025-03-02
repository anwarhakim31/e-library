<template>
  <div class="w-full flex justify-between items-center py-4">
    <p class="text-xs text-gray-700">
      Menampilkan {{ page > totalPage ? 0 : page }} -
      {{ Math.min(page * parseInt(limit as string), Number(total)) }} dari
      {{ total }} data
    </p>

    <select
      id="countries"
      v-model="setLimit"
      @change="handleChange"
      class="bg-gray-50 border w-fit border-gray-500 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
    </select>
    <div class="flex gap-2.5 items-center">
      <button
        @click="handleNext('prev')"
        :disabled="page === 1"
        class="bg-gray-50 border p-1.5 w-fit disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-500 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
      <p class="text-xs">{{ page }}</p>
      <button
        :disabled="page === totalPage || totalPage === 0"
        @click="handleNext('next')"
        class="bg-gray-50 border w-fit p-1.5 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed border-gray-500 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
      >
        <ChevronRight class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const limit = computed(() => route.query.limit || 10);

const setLimit = ref(limit.value || 10);

const handleChange = (e: Event) => {
  setLimit.value = (e.target as HTMLInputElement).value;

  router.replace({
    query: {
      ...route.query,
      limit: setLimit.value,
      page: route.query.pages || 1,
    },
  });
};

const handleNext = (pos: string) => {
  const post = pos === "prev" ? -1 : 1;
  const page =
    typeof route.query.page === "string" ? parseInt(route.query.page) : 1;

  router.push({
    query: {
      ...route.query,
      page: page + post,
    },
  });
};

defineProps({
  page: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },

  totalPage: {
    type: Number,
    default: 0,
  },
});
</script>

<style></style>
