"use client";
import NavbarTop from "@/src/components/nav";
import { PostsListsComm } from "@/src/components/posts/lists/lists";
import Head from "next/head";

const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      <div>
        <NavbarTop />
        <PostsListsComm />
      </div>
    </>
  );
};

export default Posts;
