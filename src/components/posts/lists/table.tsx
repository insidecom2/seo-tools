import { PaginationPosts } from "@/src/interface/pagination";
import { useModalStore } from "@/src/stores/modal";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
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
  title: string;
}

export const PostListTable = ({ posts, pagination }: PostsListProps) => {
  const [editContent, setEditContent] = useState<ModalState>({
    id: 0,
    contentDesc: "",
    title: "",
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

  const handleEditDescription = (
    postId: number,
    content: string,
    title: string,
  ) => {
    setEditContent((prev) => ({
      ...prev,
      id: postId,
      contentDesc: content,
      title: title,
    }));
    setShow();
  };

  return (
    <>
      <div className="tableContainer">
        <Table striped bordered hover responsive className="customTable">
          <thead className="tableHead">
            <tr>
              <th className="indexCol">#</th>
              <th>Page</th>
              <th className="dateCol">DateTime</th>
              <th>Type</th>
              <th className="fbCol">FB Cover</th>
              <th className="fbCol">FB Video</th>
              <th className="linkCol">Link</th>
              <th className="mediaCol">Cover</th>
              <th className="mediaCol">Video</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {posts &&
              posts.map((row: SocialPost, index: number) => (
                <tr key={row.id} className="tableRow">
                  <td className="indexCell">
                    <div className="indexContent">
                      <Badge bg="secondary">
                        {pagination
                          ? (pagination.page - 1) * pagination.limit + index + 1
                          : index + 1}
                      </Badge>
                      <span className="deleteIcon" title="Delete">
                        <FaTrash />
                      </span>
                    </div>
                  </td>
                  <td className="pageCell">{row.pageName}</td>
                  <td className="dateCell">
                    <Badge bg="info">
                      {dayjs(row.createdTime).format("DD-MM-YYYY")}
                    </Badge>
                  </td>
                  <td>{row.mediaType}</td>
                  <td className="mediaCell">
                    {row.fullPicture ? (
                      <Link href={row.fullPicture} passHref legacyBehavior>
                        <a
                          href={row.fullPicture}
                          target="_blank"
                          rel="noreferrer"
                          className="mediaLink"
                        >
                          <FaImage />
                        </a>
                      </Link>
                    ) : (
                      <span className="noMedia">-</span>
                    )}
                  </td>
                  <td className="mediaCell">
                    {row.attachmentUrl ? (
                      <Link href={row.attachmentUrl} passHref legacyBehavior>
                        <a
                          href={row.attachmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mediaLink"
                        >
                          <FaVideo />
                        </a>
                      </Link>
                    ) : (
                      <span className="noMedia">-</span>
                    )}
                  </td>
                  <td className="mediaCell">
                    {row.permalinkUrl ? (
                      <Link href={row.permalinkUrl} passHref legacyBehavior>
                        <a
                          href={row.permalinkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mediaLink"
                        >
                          <FaLink />
                        </a>
                      </Link>
                    ) : (
                      <span className="noMedia">-</span>
                    )}
                  </td>
                  <td className="mediaCell">
                    <div className="mediaActions">
                      {row.imageLinkRaw && (
                        <Link href={row.imageLinkRaw} passHref legacyBehavior>
                          <a
                            href={row.imageLinkRaw}
                            target="_blank"
                            rel="noreferrer"
                            className="mediaLink"
                          >
                            <FaImage />
                          </a>
                        </Link>
                      )}
                      <UploadPostFile
                        allowType="jpg,jpeg,png,webp"
                        id={row.id}
                        uploadType="image"
                      />
                    </div>
                  </td>
                  <td className="mediaCell">
                    <div className="mediaActions">
                      {row.videoLinkRaw && (
                        <Link href={row.videoLinkRaw} passHref legacyBehavior>
                          <a
                            href={row.videoLinkRaw}
                            target="_blank"
                            rel="noreferrer"
                            className="mediaLink"
                          >
                            <FaVideo />
                          </a>
                        </Link>
                      )}
                      <UploadPostFile
                        allowType="mp4"
                        id={row.id}
                        uploadType="video"
                      />
                    </div>
                  </td>
                  <td className="descriptionCell">
                    <div className="descriptionContent">
                      <div className="titleText">{row.title}</div>
                      <div className="descriptionText">
                        {row.description?.substring(0, 50)}
                        {row.description && row.description.length > 50
                          ? "..."
                          : ""}
                      </div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="editBtn"
                        title="Edit Description"
                        onClick={() =>
                          handleEditDescription(
                            row.id,
                            row.description,
                            row.title,
                          )
                        }
                      >
                        <FaPencil />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ModalCommon
        title="Edit post"
        Compo={
          <EditDescription
            id={editContent.id}
            contentDesc={editContent.contentDesc}
            titlePost={editContent.title}
          />
        }
      />
    </>
  );
};
