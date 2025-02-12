import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../components/layouts/AuthLayout.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import BaseLayout from "../components/layouts/BaseLayout.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import { useAuthStore } from "../stores/auth";
import Dashboard from "../pages/admin/dashboard.vue";
import AdminLayout from "../components/layouts/AdminLayout.vue";

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
    name: "register",
    meta: { layout: AuthLayout, title: "Daftar" },
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: BaseLayout, title: "Profil", requiresAuth: true },
    component: Profile,
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: BaseLayout, title: "Profil", requiresAuth: true },
    component: Profile,
  },
  {
    path: "/admin/dashboard",
    name: "dashboard",

    meta: { layout: AdminLayout, title: "Admin", requiresAuth: true },
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const authPage = ["/login", "/register"];

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  await authStore.fetchUser();
  const isAuthenticated = authStore.isAuthenticated;
  const admin = authStore.admin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login?callback=" + to.path);
  }

  if (authPage.includes(to.path) && isAuthenticated) {
    return next("/");
  }

  if (to.path.startsWith("/admin") && !admin) {
    return next("/");
  }

  document.title = `${to.meta.title} | E-Library`;

  next();
});

export default router;
