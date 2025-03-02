import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";
import { useRoute } from "vue-router";
import { computed } from "vue";

const useGetUserBooking = () => {
  const route = useRoute();

  const params = computed(() => {
    return route.query;
  });

  const query = useQuery({
    queryKey: ["userbooking", params],
    queryFn: async () => {
      const res = await instance.get("/booking/user", {
        params: params.value,
      });
      return res.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });

  return query;
};

export default useGetUserBooking;
