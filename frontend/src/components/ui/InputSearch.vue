<template>
  <div class="relative w-full md:w-64">
    <input
      type="search"
      v-model="search"
      @input="handleSearch"
      :placeholder="placeholder"
      class="text-xs pl-12 placeholder:text-xs rounded-md py-2 w-full"
    />
    <Search
      class="absolute w-5 h-5 left-4 top-1/2 text-gray-500 -translate-y-1/2"
    />
  </div>
</template>

<script lang="ts" setup>
import { Search } from "lucide-vue-next";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const search = ref(route.query.search || "");

defineProps({
  placeholder: String,
});
let timeout: ReturnType<typeof setTimeout>;

const handleSearch = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    router.replace({
      query: search.value ? { search: search.value } : {},
    });
  }, 300);
};
</script>

<style></style>
