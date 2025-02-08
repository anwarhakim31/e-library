import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { name: string; email: string; photo?: string },
  }),

  actions: {
    setUser(user: { name: string; email: string; photo?: string }) {
      this.user = user;
    },
  },
});
