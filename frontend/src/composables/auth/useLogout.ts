import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter } from "vue-router";

import ResponseError from "../../utils/response-error";

const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await instance.post("/auth/logout");

      return res;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useLogout;
