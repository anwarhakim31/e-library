import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../components/layouts/AuthLayout.vue";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import BaseLayout from "../components/layouts/BaseLayout.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import { useAuthStore } from "../stores/auth";
import Dashboard from "../pages/admin/Dashboard.vue";
import AdminLayout from "../components/layouts/AdminLayout.vue";
import Buku from "../pages/admin/book/Buku.vue";
import Pengguna from "../pages/admin/Pengguna.vue";
import TambahBuku from "../pages/admin/book/TambahBuku.vue";
import EditBuku from "../pages/admin/book/EditBuku.vue";

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
  //admin
  {
    path: "/admin/dashboard",
    name: "dashboard",
    meta: { layout: AdminLayout, title: "Admin", requiresAuth: true },
    component: Dashboard,
  },
  {
    path: "/admin/buku",
    name: "Buku",
    meta: { layout: AdminLayout, title: "Kelola Buku", requiresAuth: true },
    component: Buku,
  },
  {
    path: "/admin/pengguna",
    name: "Pengguna",
    meta: { layout: AdminLayout, title: "Kelola Pengguna", requiresAuth: true },
    component: Pengguna,
  },
  {
    path: "/admin/buku",
    name: "buku",
    meta: { layout: AdminLayout, title: "Kelola buku", requiresAuth: true },
    component: Buku,
  },
  {
    path: "/admin/buku/tambah",
    name: "tambahbuku",
    meta: { layout: AdminLayout, title: "Tambah buku", requiresAuth: true },
    component: TambahBuku,
  },
  {
    path: "/admin/buku/edit/:id",
    name: "editbuku",
    meta: { layout: AdminLayout, title: "Edit buku", requiresAuth: true },
    component: EditBuku,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
const authPage = ["/login", "/register"];

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    await authStore.fetchUser();
  }
  const isAuthenticated = authStore.isAuthenticated;
  const admin = authStore.admin;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login?callback=" + encodeURI(to.path));
  }

  if (authPage.includes(to.path) && isAuthenticated) {
    return next("/");
  }

  if (to.path.startsWith("/admin") && !admin) {
    return next("/login?callback=" + decodeURI(to.path));
  }

  document.title = `${to.meta.title} | E-Library`;

  next();
});

export default router;
