import { createApp } from "vue";
import "./index.css";

import router from "./router/route";
import App from "./App.vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { Toaster } from "vue-sonner";
import { createPinia } from "pinia";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const queryClient = new QueryClient();

createApp(App)
  .use(createPinia())
  .component("Toaster", Toaster)
  .component("VueDatePicker", VueDatePicker)
  .use(VueQueryPlugin, { queryClient })
  .use(router)
  .mount("#app");
