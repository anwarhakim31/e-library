import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

import ResponseError from "../../utils/response-error";
import { toast } from "vue-sonner";

const useConfirmBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await instance.patch("/booking/confirm/" + id);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengkonfirmasi booking");
      queryClient.invalidateQueries({ queryKey: ["pendingbooking"] });
    },

    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useConfirmBooking;
