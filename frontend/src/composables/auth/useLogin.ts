import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter, useRoute } from "vue-router";

import ResponseError from "../../utils/response-error";
import { useAuthStore } from "../../stores/auth";
import type { UserType } from "../../types/model";

const useLogin = () => {
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await instance.post("/auth/login", data);

      authStore.setUser(res.data.data);
      return res.data;
    },
    onSuccess: (value: { data: UserType }) => {
      router.push(
        route.query.callback
          ? decodeURIComponent(route.query.callback as string)
          : value.data.isAdmin
          ? "/admin/dashboard"
          : "/"
      );
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useLogin;
