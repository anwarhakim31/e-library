import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

const useGetAllUser = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.query;
  });

  const query = useQuery({
    queryKey: ["user", params],
    queryFn: async () => {
      const res = await instance.get("/user/all", { params: params.value });
      return res.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });

  return query;
};

export default useGetAllUser;
