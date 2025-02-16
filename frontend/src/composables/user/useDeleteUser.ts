import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { toast } from "vue-sonner";
import ResponseError from "../../utils/response-error";
import { instance } from "../../utils/interceptor";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (selected: string[]) => {
      const res = await instance.delete(`/user/delete`, { data: selected });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus user");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useDeleteUser;
