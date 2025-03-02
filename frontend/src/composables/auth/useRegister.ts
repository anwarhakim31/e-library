import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter } from "vue-router";

import ResponseError from "../../utils/response-error";
import { useAuthStore } from "../../stores/auth";

const useRegister = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await instance.post("/auth/register", data);
      authStore.setUser(res.data.data);
      return res;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useRegister;
