import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

import ResponseError from "../../utils/response-error";

const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (data: {
      date: Date[];
      bookId: string;
      note?: string;
    }) => {
      const res = await instance.post("/booking/create", data);

      return res.data;
    },

    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useCreateBooking;
