<template>
  <main class="sf-mono">
    <Toaster position="top-center" />
    <component :is="layout">
      <router-view />
    </component>
  </main>
</template>

<script>
import { onMounted, watchEffect } from "vue";
import router from "./router/route";
import AuthLayout from "./components/layouts/AuthLayout.vue";
import BaseLayout from "./components/layouts/BaseLayout.vue";
import { Toaster } from "vue-sonner";

export default {
  components: { AuthLayout, BaseLayout },
  setup() {},
  computed: {
    layout() {
      return this.$route.meta.layout || "div";
    },
  },
};
</script>
