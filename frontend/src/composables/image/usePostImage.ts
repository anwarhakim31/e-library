import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const usePostImage = (setProgress: (value: number) => void) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET!);
      const originalFileName = `library/${new Date().getTime()}/${
        file.name.split(".")[0]
      }`;

      console.log(originalFileName);
      formData.append("public_id", originalFileName);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const percentage = Math.floor((loaded * 100) / (total || 1));

            setProgress(percentage);
          },
        }
      );

      return res.data;
    },
  });
};

export default usePostImage;
