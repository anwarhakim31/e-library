import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import ResponseError from "../../utils/response-error";

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      password: string;
    }) => {
      const res = await instance.post("/auth/register", data);

      return res;
    },
    onSuccess: () => {
      toast.success("Berhasil mendaftar di perpustakaan");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    },
    onError: (error) => {
      console.log(Error);
      ResponseError(error);
    },
  });
};

export default useRegister;
