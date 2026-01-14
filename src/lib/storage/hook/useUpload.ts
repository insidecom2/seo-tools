import { httpStatus } from "@/src/enums/http";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { generateKeyStorage } from "../generateKey";
import { sendFileToStore } from "../storage";

export const useUpload = () => {
  const queryClient = useQueryClient();
  const mutationFn: MutationFunction<string> = async (file: File | null) => {
    const { token, bucket, url } = await generateKeyStorage();
    const resUpload = await sendFileToStore(file, token, bucket, url);
    if (resUpload.status === httpStatus.OK) {
      return url + "/" + resUpload.response.url;
    }
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts-lists"],
      });
    },
  });
};
