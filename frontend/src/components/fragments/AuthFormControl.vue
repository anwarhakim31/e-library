<template>
  <div class="relative group mt-4">
    <label
      v-if="icon"
      :for="id"
      class="absolute left-2 -translate-y-1/2 top-1/2 text-sm font-medium inline-block"
    >
      <Mail v-if="icon === 'email'" class="w-4 h-4 text-gray-700" />
      <KeyRound v-if="icon === 'password'" class="w-4 h-4 text-gray-700" />
      <User v-if="icon === 'name'" class="w-4 h-4 text-gray-700" />
    </label>

    <input
      :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
      :id="id"
      :placeholder="placeholder"
      v-model="fieldValue"
      autocomplete="off"
      class="w-full pl-8 rounded-md placeholder:text-sm text-sm ring-0 focus-within:ring-0 hover:border-blue-600 focus:border-blue-600 focus:outline-2 focus:outline-blue-100 focus:outline-offset-0 border border-gray-300 py-2.5"
      :class="{ 'pl-8': icon, 'pl-3': !icon }"
    />

    <button
      @click="showPassword = !showPassword"
      v-if="type === 'password'"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2"
    >
      <Eye v-if="!showPassword" class="w-4 h-4 text-gray-700" />
      <EyeOff v-else class="w-4 h-4 text-gray-700" />
    </button>
  </div>
  <p v-if="errorMessage" class="text-red-500 text-xs mt-1">
    {{ errorMessage }}
  </p>
</template>

<script lang="ts" setup>
import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-vue-next";
import { ref } from "vue";
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
  icon: {
    type: String,
    default: null,
  },
});

const { value: fieldValue, errorMessage } = useField(() => props.name);

const showPassword = ref(false);
</script>

<style scoped></style>
