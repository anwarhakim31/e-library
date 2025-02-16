import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

import ResponseError from "../../utils/response-error";

import type { UserType } from "../../types/model";
import { toast } from "vue-sonner";

const usePutUser = () => {
  return useMutation({
    mutationFn: async (data: UserType) => {
      const res = await instance.put("/user/" + data.id, {
        name: data.name,
        email: data.email,
        photo: data.photo,
        gender: data.gender,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengedit user");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default usePutUser;
