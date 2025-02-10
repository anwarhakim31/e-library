import { defineStore } from "pinia";

import type { UserType } from "../types/model";
import { instance } from "../utils/interceptor";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | UserType,
    loading: true, // Default loading true
  }),

  actions: {
    async fetchUser() {
      try {
        const res = await instance.get("/auth/current", {
          withCredentials: true,
        });

        this.user = res.data.data || null;
      } catch (error) {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    setUser(user: UserType | null) {
      this.user = user;
      this.loading = false;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    admin: (state) => state.user?.isAdmin,
  },
});
