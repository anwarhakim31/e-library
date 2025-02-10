<template>
  <button @click="handleLogout" :disabled="isPending">logout</button>
</template>

<script lang="ts" setup>
import useLogout from "../composables/auth/useLogout";
import { useAuthStore } from "../stores/auth";

const { isPending, mutate } = useLogout();
const { setUser } = useAuthStore();

const handleLogout = () => {
  setUser(null);
  mutate();
};
</script>

<style></style>
