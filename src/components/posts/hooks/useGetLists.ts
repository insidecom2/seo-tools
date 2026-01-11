import { PaginationPosts } from "@/src/interface/pagination";
import Http from "@/src/utils/http";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { SocialPost } from "./interface";

interface PostsResponse {
  posts: SocialPost[];
  pagination: PaginationPosts;
}

const useGetLists = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const url = `${endpoint}/v1/posts?page=${page}&limit=${limit}`;
  const queryFn: QueryFunction<PostsResponse> = async () => {
    const response = await Http.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["posts-lists", page, limit],
    queryFn,
  });
};

export default useGetLists;
