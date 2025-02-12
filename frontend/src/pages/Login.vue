<template>
  <form @submit.prevent="onSubmit" class="w-full px-8 py-4">
    <h1 class="text-xl font-bold mr-auto">Masuk Perpustakaan</h1>
    <p class="text-gray-700 text-sm mt-1 mb-6">
      Silahkan masuk dengan akun anda
    </p>

    <AuthFormControl
      name="email"
      type="email"
      id="email"
      placeholder="Email"
      icon="email"
    />
    <AuthFormControl
      name="password"
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
      <RouterLink to="/register" class="text-blue-700 hover:underline">
        Daftar Sekarang
      </RouterLink>
    </span>
  </form>
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import AuthFormControl from "../components/fragments/AuthFormControl.vue";
import useLogin from "../composables/auth/useLogin";

const schema = toTypedSchema(
  z.object({
    email: z
      .string()
      .email("Email tidak valid")
      .nonempty("Email tidak boleh kosong"),
    password: z.string().nonempty("Password tidak boleh kosong"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
  },
});

const { mutate, isPending } = useLogin();

const onSubmit = handleSubmit((values) => {
  mutate(values);
});
</script>
