import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { instance } from "../../utils/interceptor";
import ResponseError from "../../utils/response-error";
import { toast } from "vue-sonner";

export const useChangeStatusBorrow = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data: { status: string; id: string }) => {
      const res = await instance.patch(`/borrow/status`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah status");
      query.invalidateQueries({ queryKey: ["borrow"] });
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};
