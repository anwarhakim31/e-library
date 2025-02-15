import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { toast } from "vue-sonner";
import ResponseError from "../../utils/response-error";
import { instance } from "../../utils/interceptor";

const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (selected: string[]) => {
      const res = await instance.delete(`/book/delete`, { data: selected });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus buku");
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useDeleteBook;
