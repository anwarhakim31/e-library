import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { toast } from "vue-sonner";
import ResponseError from "../../utils/response-error";
import { instance } from "../../utils/interceptor";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (selected: string[]) => {
      const res = await instance.delete(`/booking/delete`, { data: selected });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menghapus booking");
      queryClient.invalidateQueries({ queryKey: ["pendingbooking"] });
      queryClient.invalidateQueries({ queryKey: ["borrow"] });
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useDeleteBooking;
