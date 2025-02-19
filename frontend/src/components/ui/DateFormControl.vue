<template>
  <div class="mb-4">
    <label :for="id" class="text-sm font-medium capitalize mb-2 block">{{ name }}</label>
    <div class="w-full">
      <VueDatePicker
        :id="id"
        v-model="fieldValue"
        range
        multi-calendars
        class="text-sm"
      />

      <span class="text-xs text-red-500">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { onMounted } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
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

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  fieldValue.value = [startDate, endDate];
});
</script>

<style></style>
