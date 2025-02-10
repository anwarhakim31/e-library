import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

const ResponseError = (error: Error) => {
  const router = useRouter();
  if (
    error instanceof AxiosError &&
    error.response &&
    error.response.data &&
    error.response.data.code !== 401 &&
    error.response.data.message
  ) {
    return toast.error(error.response.data.message);
  } else {
    return router.push("/login");
  }
};

export default ResponseError;
