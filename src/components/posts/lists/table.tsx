import { PaginationPosts } from "@/src/interface/pagination";
import { useModalStore } from "@/src/stores/modal";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { Table } from "react-bootstrap";
import {
  FaImage,
  FaLink,
  FaPencil,
  FaTrash,
  FaUpload,
  FaVideo,
} from "react-icons/fa6";
import ModalCommon from "../../common/modal";
import { EditDescription } from "../edit/editDesc";
import { SocialPost } from "../hooks/interface";

interface PostsListProps {
  posts?: SocialPost[];
  pagination?: PaginationPosts;
}

export const PostListTable = ({ posts, pagination }: PostsListProps) => {
  const [id, setId] = useState<number>(0);
  const { setShow } = useModalStore();

  const handleEditDescription = (postId: number) => {
    setId(postId);
    setShow();
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ width: 20 }}>#</th>
            <th>Page</th>
            <th style={{ width: 140 }}>DateTime</th>
            <th>Type</th>
            <th>FB Cover</th>
            <th>FB Video</th>
            <th>Link</th>
            <th>Cover</th>
            <th>Video</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.map((row: SocialPost, index: number) => (
              <tr key={row.id}>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {pagination
                      ? (pagination.page - 1) * pagination.limit + index + 1
                      : index + 1}
                    <FaTrash style={{ cursor: "pointer", color: "red" }} />
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>{row.pageName}</td>
                <td style={{ textAlign: "center" }}>
                  {dayjs(row.createdTime).format("DD-MM-YYYY")}
                </td>
                <td>{row.mediaType}</td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    <Link href={row.fullPicture} passHref legacyBehavior>
                      <a
                        href={row.fullPicture}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary"
                      >
                        <FaImage size={24} />
                      </a>
                    </Link>
                  </div>
                </td>
                <td>
                  <Link href={row.attachmentUrl} passHref legacyBehavior>
                    <a
                      href={row.attachmentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      <FaVideo size={24} />
                    </a>
                  </Link>
                </td>
                <td>
                  <Link href={row.permalinkUrl} passHref legacyBehavior>
                    <a
                      href={row.permalinkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary"
                    >
                      <FaLink size={24} />
                    </a>
                  </Link>
                </td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {row.image_link_raw && (
                      <Link href={row.image_link_raw} passHref legacyBehavior>
                        <a
                          href={row.image_link_raw}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary"
                        >
                          <FaImage size={24} />
                        </a>
                      </Link>
                    )}
                    <FaUpload style={{ cursor: "pointer" }} />
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {row.video_link_raw && (
                      <Link href={row.video_link_raw} passHref legacyBehavior>
                        <a
                          href={row.video_link_raw}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary"
                        >
                          <FaVideo size={24} />
                        </a>
                      </Link>
                    )}
                    <FaUpload style={{ cursor: "pointer" }} />
                  </div>
                </td>
                <td>
                  {row.description}{" "}
                  <FaPencil
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditDescription(row.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalCommon title="Edit post" Compo={<EditDescription id={id} />} />
    </>
  );
};
