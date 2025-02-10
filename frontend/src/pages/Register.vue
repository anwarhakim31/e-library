<template>
  <form @submit.prevent="handleSubmit" class="w-full px-8 py-4">
    <h1 class="text-2xl font-bold mr-auto">Daftar Perpustakaan</h1>
    <p class="text-gray-700 text-sm mt-1 mb-6">
      Silahkan daftar dengan mengisi form dibawah
    </p>
    <AuthFormControl
      v-model="formData.email"
      type="email"
      id="email"
      placeholder="Email"
      icon="email"
    />

    <AuthFormControl
      v-model="formData.name"
      type="text"
      id="name"
      placeholder="Nama"
      icon="name"
    />
    <AuthFormControl
      v-model="formData.password"
      type="password"
      id="password"
      placeholder="*********"
      icon="password"
    />
    <button
      class="btn-primary w-full mt-6 text-sm py-2.5 px-4"
      :disabled="isPending"
    >
      {{ isPending ? "Loading..." : "Daftar" }}
    </button>
    <span class="text-center text-xs block mt-3 text-gray-700">
      Sudah Punya Akun?
      <RouterLink to="/login" class="text-blue-700 hover:underline"
        >Masuk</RouterLink
      >
    </span>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import AuthFormControl from "../components/fragments/AuthFormControl.vue";
import useRegister from "../composables/auth/useRegister";

const formData = reactive({
  email: "",
  name: "",
  password: "",
});

const { mutate, isPending } = useRegister();

const handleSubmit = () => {
  mutate(formData);
};
</script>

<style></style>
