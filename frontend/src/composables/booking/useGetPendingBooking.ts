import { useQuery } from "@tanstack/vue-query";
import { instance } from "../../utils/interceptor";

const useGetPendingBooking = () => {
  return useQuery({
    queryKey: ["pendingbooking"],
    queryFn: async () => {
      const res = await instance.get("/booking/pending");
      return res.data;
    },
  });
};

export default useGetPendingBooking;
