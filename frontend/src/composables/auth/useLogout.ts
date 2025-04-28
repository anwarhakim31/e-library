import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter } from "vue-router";

import ResponseError from "../../utils/response-error";
import { useAuthStore } from "../../stores/auth";

const useLogout = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const res = await instance.post("/auth/logout");

      return res;
    },
    onSuccess: () => {
      router.push("/login");
      authStore.setUser(null);
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useLogout;
