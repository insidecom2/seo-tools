import Http from "@/src/utils/http";
import { QueryFunction, useQuery } from "@tanstack/react-query";

const useGetLists = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const endpoint = process.env.NEXT_PUBLIC_API_OPT_SYNC_ENDPOINT;
  const url = `${endpoint}/v1/posts?page=${page}&limit=${limit}`;
  const queryFn: QueryFunction<unknown, string[]> = async () => {
    const response = await Http.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["posts-lists"],
    queryFn,
  });
};

export default useGetLists;
