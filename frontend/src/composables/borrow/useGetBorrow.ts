import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRoute } from "vue-router";
import { computed } from "vue";

const useGetBorrow = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.query;
  });

  return useQuery({
    queryKey: ["borrow", params],
    queryFn: async () => {
      const res = await instance.get("/borrow", { params: params.value });
      return res.data;
    },
  });
};

export default useGetBorrow;
