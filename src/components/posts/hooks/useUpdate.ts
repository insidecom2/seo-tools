import Http from "@/src/utils/http";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { SocialPost } from "./interface";

const useUpdateById = (id: number) => {
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const url = `${endpoint}/v1/posts/${id}`;
  const queryClient = useQueryClient();
  const mutationFn: MutationFunction<SocialPost> = async (data: SocialPost) => {
    const response = await Http.patch(url, data);
    return response.data;
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

export default useUpdateById;
