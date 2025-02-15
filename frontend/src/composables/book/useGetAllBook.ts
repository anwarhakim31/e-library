import { computed } from "vue";
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

const useGetBook = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.query;
  });

  const query = useQuery({
    queryKey: ["book", params],
    queryFn: async () => {
      const res = await instance.get("/book/all", { params: params.value });
      return res.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });

  return query;
};

export default useGetBook;
