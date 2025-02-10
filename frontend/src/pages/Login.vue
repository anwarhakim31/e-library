<template>
  <form @submit.prevent="handleSubmit" class="w-full px-8 py-4">
    <h1 class="text-xl font-bold mr-auto">Masuk Perpustakaan</h1>
    <p class="text-gray-700 text-sm mt-1 mb-6">
      Silahkan masuk dengan akun anda
    </p>
    <AuthFormControl
      v-model="formData.email"
      type="email"
      id="email"
      placeholder="Email"
      icon="email"
    />
    <AuthFormControl
      v-model="formData.password"
      type="password"
      id="password"
      placeholder="Password"
      icon="password"
    />
    <button
      class="btn-primary w-full mt-6 text-sm py-2.5 px-4"
      :disabled="isPending"
    >
      {{ isPending ? "Loading..." : "Masuk" }}
    </button>
    <span class="text-center text-xs block mt-3 text-gray-700">
      Belum Punya Akun?
      <RouterLink to="/register" class="text-blue-700 hover:underline"
        >Daftar Sekarang</RouterLink
      >
    </span>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import AuthFormControl from "../components/fragments/AuthFormControl.vue";
import useLogin from "../composables/auth/useLogin";
const formData = reactive({
  email: "",
  password: "",
});

const { mutate, isPending } = useLogin();

const handleSubmit = () => {
  mutate(formData);
};
</script>

<style></style>
