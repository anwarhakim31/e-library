<template>
  <main class="sf-mono">
    <Toaster position="top-center" />
    <component :is="layout">
      <router-view />
    </component>
  </main>
</template>

<script>
import { onMounted } from "vue";
import router from "./router";
import AuthLayout from "./components/layouts/AuthLayout.vue";
import BaseLayout from "./components/layouts/BaseLayout.vue";
import { Toaster } from "vue-sonner";
import { useGetAuth } from "./composables/auth/useGetAuth";

export default {
  components: { AuthLayout, BaseLayout },
  setup() {
    useGetAuth();

    onMounted(() => {
      router.beforeEach((to, from, next) => {
        document.title = `${to.meta.title} | E-Library`;
        next();
      });
    });
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "div";
    },
  },
};
</script>
