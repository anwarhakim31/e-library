<template>
  <div class="mb-4">
    <label :for="id" class="text-sm font-medium capitalize mb-2 block">{{
      name
    }}</label>
    <div class="w-full">
      <input
        :type="type"
        :id="id"
        :placeholder="placeholder"
        v-model="fieldValue"
        autocomplete="off"
        class="block rounded-md w-full placeholder:text-sm text-sm ring-0 focus-within:ring-0 bg-gray-50 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 px-2.5 py-2.5"
      />
      <span class="text-xs text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const { value: fieldValue, errorMessage } = useField(() => props.id);
</script>

<style></style>
