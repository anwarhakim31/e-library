import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../components/layouts/AuthLayout.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import BaseLayout from "../components/layouts/BaseLayout.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: BaseLayout, title: "Beranda" },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: AuthLayout, title: "Masuk" },
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    meta: { layout: AuthLayout, title: "Daftar" },
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
