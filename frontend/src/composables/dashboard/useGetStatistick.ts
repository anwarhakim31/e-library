import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRoute } from "vue-router";
import { computed } from "vue";

const useGetStatistik = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.query;
  });

  return useQuery({
    queryKey: ["statistic", params],
    queryFn: async () => {
      const res = await instance.get("/dashboard", { params: params.value });
      return res.data;
    },
    staleTime: 0,
  });
};

export default useGetStatistik;
