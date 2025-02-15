import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { computed } from "vue";

const useGetOneBook = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.params;
  });

  const query = useQuery({
    queryKey: ["bookone", params],
    queryFn: async () => {
      const res = await instance.get("/book/" + params.value.id);

      return res.data;
    },
    staleTime: 0,
  });

  return query;
};

export default useGetOneBook;
