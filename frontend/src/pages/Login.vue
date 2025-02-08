<template>
  <form @submit.prevent="handleSubmit" class="w-full px-8 py-4">
    <h1 class="text-2xl font-bold mr-auto">Masuk Perpustakaan</h1>
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
      placeholder="*********"
      icon="password"
    />
    <button class="btn-primary w-full mt-6">Masuk</button>
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

const formData = reactive({
  email: "",
  password: "",
});

const handleSubmit = () => {
  console.log(formData);
};
</script>

<style></style>
