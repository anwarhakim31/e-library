import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useAuthStore } from "../../stores/auth";

export const useGetAuth = () => {
  const authStore = useAuthStore();

  console.log(document.cookie);

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await instance.get("/auth/current", {
        withCredentials: true,
      });

      authStore.setUser(res.data);
      return res.data;
    },
  });
};
