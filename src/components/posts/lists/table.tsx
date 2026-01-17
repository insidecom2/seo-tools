import { PaginationPosts } from "@/src/interface/pagination";
import { useModalStore } from "@/src/stores/modal";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaImage, FaLink, FaPencil, FaTrash, FaVideo } from "react-icons/fa6";
import ModalCommon from "../../common/modal";
import { EditDescription } from "../edit/editDesc";
import { SocialPost } from "../hooks/interface";
import { UploadPostFile } from "./uploadFile";

interface PostsListProps {
  posts?: SocialPost[];
  pagination?: PaginationPosts;
}

interface ModalState {
  id: number;
  contentDesc: string;
}

export const PostListTable = ({ posts, pagination }: PostsListProps) => {
  const [editContent, setEditContent] = useState<ModalState>({
    id: 0,
    contentDesc: "",
  });
  const [video, setVideo] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const { setShow } = useModalStore();

  useEffect(() => {
    if (video) {
      console.log("Selected video file:", video);
    }
  }, [video]);

  useEffect(() => {
    if (image) {
      console.log("Selected image file:", image);
    }
  }, [image]);

  const handleEditDescription = (postId: number, content: string) => {
    setEditContent((prev) => ({ ...prev, id: postId, contentDesc: content }));
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
                        <FaImage />
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
                      <FaVideo />
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
                      <FaLink />
                    </a>
                  </Link>
                </td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {row.imageLinkRaw && (
                      <div>
                        <Link href={row.imageLinkRaw} passHref legacyBehavior>
                          <a
                            href={row.imageLinkRaw}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary"
                          >
                            <FaImage />
                          </a>
                        </Link>
                      </div>
                    )}
                    <UploadPostFile
                      allowType="jpg,jpeg,png,webp"
                      id={row.id}
                      uploadType="image"
                    />
                  </div>
                </td>
                <td>
                  <div style={{ textAlign: "center" }}>
                    {row.videoLinkRaw && (
                      <div>
                        <Link href={row.videoLinkRaw} passHref legacyBehavior>
                          <a
                            href={row.videoLinkRaw}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary"
                          >
                            <FaVideo />
                          </a>
                        </Link>
                      </div>
                    )}

                    <UploadPostFile
                      allowType="mp4"
                      id={row.id}
                      uploadType="video"
                    />
                  </div>
                </td>
                <td>
                  {row.description}{" "}
                  <FaPencil
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleEditDescription(row.id, row.description)
                    }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ModalCommon
        title="Edit post"
        Compo={
          <EditDescription
            id={editContent.id}
            contentDesc={editContent.contentDesc}
          />
        }
      />
    </>
  );
};
