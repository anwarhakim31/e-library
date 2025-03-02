import { useMutation } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

import ResponseError from "../../utils/response-error";

import type { UserType } from "../../types/model";
import { toast } from "vue-sonner";

const useEditProfile = () => {
  return useMutation({
    mutationFn: async (data: UserType) => {
      const res = await instance.patch("/user/profile", {
        name: data.name,
        email: data.email,
        photo: data.photo,
        gender: data.gender,
        password: data.password,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah profile");
    },
    onError: (error) => {
      ResponseError(error);
    },
  });
};

export default useEditProfile;
