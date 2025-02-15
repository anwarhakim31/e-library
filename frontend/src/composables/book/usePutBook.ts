import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRoute, useRouter } from "vue-router";

import ResponseError from "../../utils/response-error";

import type { BookType } from "../../types/model";
import { toast } from "vue-sonner";
import { computed } from "vue";

const usePutBook = () => {
  const router = useRouter();
  const route = useRoute();

  const params = computed(() => {
    return route.params;
  });

  return useMutation({
    mutationFn: async (data: BookType) => {
      const res = await instance.put("/book/" + params.value.id, data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengedit buku");
      router.push("/admin/buku");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default usePutBook;
