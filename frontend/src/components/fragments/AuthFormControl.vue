<template>
  <div class="relative group mt-4">
    <label
      v-if="icon"
      :for="id"
      class="absolute left-2 -translate-y-1/2 top-1/2 text-sm font-medium inline-block"
    >
      <Mail
        v-if="icon === 'email'"
        class="w-4 h-4 text-gray-700 group-focus-within:text-blue-700"
      />
      <KeyRound
        v-if="icon === 'password'"
        class="w-4 h-4 text-gray-700 group-focus-within:text-blue-700"
      />
      <User
        v-if="icon === 'name'"
        class="w-4 h-4 text-gray-700 group-focus-within:text-blue-700"
      />
    </label>
    <input
      :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      autocomplete="off"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="w-full pl-8 rounded-md placeholder:text-sm focus:outline-none text-sm focus:ring-blue-800 border border-gray-300 py-2 px-3"
      :class="{ 'pl-8': icon, 'pl-3': !icon }"
    />
    <button
      @click="showPassword = !showPassword"
      v-if="type === 'password'"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2"
    >
      <Eye
        v-if="!showPassword"
        class="w-4 h-4 text-gray-700 group-focus-within:text-blue-700"
      />
      <EyeOff
        v-else
        class="w-4 h-4 text-gray-700 group-focus-within:text-blue-700"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-vue-next";
import { ref } from "vue";

defineProps({
  modelValue: String,
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

const showPassword = ref(false);

defineEmits(["update:modelValue"]);
</script>

<style scoped></style>
