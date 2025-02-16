<template>
  <div class="mb-4">
    <label :for="id" class="text-sm font-medium capitalize mb-2 block">
      {{ label }}
    </label>
    <div class="w-full">
      <select
        :id="id"
        v-model="fieldValue"
        autocomplete="off"
        class="block rounded-md w-full text-sm bg-gray-50 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 px-2.5 py-2.5"
      >
        <option value="" disabled>Pilih {{ label }}</option>
        <option v-for="item in data" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>

      <span v-if="errorMessage" class="text-xs text-red-500">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps({
  data: {
    type: Array as () => { id: string | number; name: string }[],
    default: () => [],
  },
  label: { type: String, required: true },
  id: { type: String, required: true },
});

const { value: fieldValue, errorMessage } = useField(() => props.id);
</script>
