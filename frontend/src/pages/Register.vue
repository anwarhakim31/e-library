<template>
  <form @submit="onSubmit" class="w-full px-8 py-4">
    <h1 class="text-2xl font-bold mr-auto">Daftar Perpustakaan</h1>
    <p class="text-gray-700 text-sm mt-1 mb-6">
      Silahkan daftar dengan mengisi form dibawah
    </p>
    <AuthFormControl
      name="email"
      type="email"
      id="email"
      placeholder="Email"
      icon="email"
    />

    <AuthFormControl
      name="name"
      type="text"
      id="name"
      placeholder="Nama"
      icon="name"
    />
    <AuthFormControl
      name="password"
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
import { toTypedSchema } from "@vee-validate/zod";
import AuthFormControl from "../components/ui/AuthFormControl.vue";
import useRegister from "../composables/auth/useRegister";
import { z } from "zod";
import { useForm } from "vee-validate";

const schema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("Email tidak valid")
      .nonempty("Email tidak boleh kosong"),
    name: z
      .string()
      .nonempty("Nama tidak boleh kosong")
      .min(5, { message: "Minimal 5 karakter" }),
    password: z
      .string()
      .nonempty("Password tidak boleh kosong")
      .min(6, { message: "Minimal 6 karakter" }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    name: "",
    password: "",
  },
});

const { mutate, isPending } = useRegister();

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>

<style></style>
