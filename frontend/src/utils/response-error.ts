import { AxiosError } from "axios";

import { toast } from "vue-sonner";

const ResponseError = (error: Error) => {
  if (
    error instanceof AxiosError &&
    error.response &&
    error.response.data &&
    error.response.data.code !== 401 &&
    error.response.data.message
  ) {
    return toast.error(error.response.data.message);
  } else {
    return (window.location.href = "/login");
  }
};

export default ResponseError;
