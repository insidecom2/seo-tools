import { PaginationPosts } from "@/src/interface/pagination";
import Http from "@/src/utils/http";
import { QueryFunction, useQuery } from "@tanstack/react-query";

export interface SocialPost {
  id: number;
  pageId: string;
  pageName: string;
  postId: string;
  permalinkUrl: string;
  mediaType: "photo" | "video" | "reel" | string;
  fullPicture: string;
  attachmentMedia: string;
  attachmentTargetId: string;
  attachmentUrl: string;
  description: string;
  createdTime: string; // ISO 8601 date string
  facebookStatus: "pending" | "completed" | "failed" | string;
  googleBusinessStatus: "pending" | "completed" | "failed" | string;
  tikTokStatus: "pending" | "completed" | "failed" | string;
  youtubeStatus: "pending" | "completed" | "failed" | string;
  webStatus: "pending" | "completed" | "failed" | string;
  image_link_raw: string;
  video_link_raw: string;
}
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
