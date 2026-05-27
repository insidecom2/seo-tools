"use client";
import { AlertComm } from "@/src/components/common/alert";
import { Badge } from "@/src/components/ui/badge";
import { usePostsFilterState } from "@/src/stores/post_filter";
import { useMemo } from "react";
import { FaList } from "react-icons/fa6";
import { LoadingIcon } from "../../common/loading";
import useGetLists from "../hooks/useGetLists";
import { PostsPagination } from "./pagination";
import { PostListTable } from "./table";

export const PostsListsComm = () => {
  const pagination = usePostsFilterState((s) => s.pagination);
  const { data, isLoading } = useGetLists({
    page: pagination.page,
    limit: pagination.limit,
  });

  const posts = useMemo(() => {
    return data?.posts || [];
  }, [data]);

  if (isLoading) return <LoadingIcon />;

  return (
    <div className="postsListMinimal">
      <div className="postsListContainer mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
        <div className="postsListHeader">
          <h1 className="postsListTitle">
            <FaList /> Posts
          </h1>
          <p className="postsListSubtitle">
            <a
              href="https://fdown.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge variant="info">Download Video</Badge>
            </a>{" "}
            {data?.pagination?.totalAll || 0} total posts
          </p>
        </div>

        <div className="postsListContent">
          <PostListTable posts={posts} pagination={data.pagination} />
        </div>

        <div className="postsListFooter">
          <PostsPagination pagination={data?.pagination} />
        </div>
      </div>

      <AlertComm />
    </div>
  );
};
