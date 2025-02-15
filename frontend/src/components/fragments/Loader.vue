<template>
  <Teleport to="body">
    <div
      v-if="isLoading"
      class="w-full h-full bg-white flex items-center justify-center flex-col fixed inset-0 z-[99999]"
    >
      <img src="/brand/class-smkn-1.png" alt="loading" />
      <p class="text-blue-600 mt-4 text-xs">Loading</p>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps({
  isLoading: Boolean,
});
</script>

<style></style>
