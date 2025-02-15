import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRouter } from "vue-router";

import ResponseError from "../../utils/response-error";

import type { BookType } from "../../types/model";
import { toast } from "vue-sonner";

const usePostBook = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: BookType) => {
      console.log(data);
      const res = await instance.post("/book/create", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan buku");
      router.push("/admin/buku");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default usePostBook;
