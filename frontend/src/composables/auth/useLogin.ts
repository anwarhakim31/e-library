import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter, useRoute } from "vue-router";

import ResponseError from "../../utils/response-error";
import { useAuthStore } from "../../stores/auth";

const useLogin = () => {
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await instance.post("/auth/login", data);

      authStore.setUser(res.data.data);
      return res;
    },
    onSuccess: () => {
      router.push(route.query.callback ? route.query.callback.toString() : "/");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useLogin;
