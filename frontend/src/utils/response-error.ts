import { AxiosError } from "axios";
import { toast } from "vue-sonner";

const ResponseError = (error: Error) => {
  if (
    error instanceof AxiosError &&
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {
    return toast.error(error.response.data.message);
  }
};

export default ResponseError;
