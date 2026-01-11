import Http from "@/src/utils/http";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SocialPost } from "./interface";

const useGetById = ({ id }: { id: number }) => {
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const url = `${endpoint}/v1/posts/${id}`;
  const queryFn: QueryFunction<SocialPost> = async () => {
    const response = await Http.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["posts-by-id", id],
    queryFn,
  });
};

export default useGetById;
