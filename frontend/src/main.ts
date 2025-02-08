import { createApp } from "vue";
import "./index.css";

import router from "./router";
import App from "./App.vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { Toaster } from "vue-sonner";
import { createPinia } from "pinia";

const queryClient = new QueryClient();

createApp(App)
  .component("Toaster", Toaster)
  .use(createPinia())
  .use(VueQueryPlugin, { queryClient })
  .use(router)
  .mount("#app");
