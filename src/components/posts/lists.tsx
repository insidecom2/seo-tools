"use client";
import { Col, Container, Row } from "react-bootstrap";
import useGetLists from "./hooks/useGetLists";

export const PostsListsComm = () => {
  const { data, isLoading } = useGetLists({ page: 1, limit: 10 });
  //   console.log("data:", data, isLoading);
  return (
    <>
      <Container className="py-1 py-md-3  h-100">
        <Row className="row d-flex justify-content-center align-items-center h-100">
          <Col md={12}>
            <h2>Posts list</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
};
