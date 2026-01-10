"use client";
import { usePostsFilterState } from "@/src/stores/post_filter";
import { useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
    <>
      <Container className="py-1 py-md-3  h-100">
        <Row className="row d-flex justify-content-center align-items-center h-100">
          <Col md={12}>
            <h2>Posts list</h2>
          </Col>
          <Col md={12}>
            <PostListTable posts={posts} pagination={data.pagination} />
          </Col>
          <Col md={12} className="d-flex justify-content-end">
            <PostsPagination pagination={data?.pagination} />
          </Col>
        </Row>
      </Container>
    </>
  );
};
