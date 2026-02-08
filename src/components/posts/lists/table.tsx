import { syncStatus } from "@/src/enums/syncStatus";
import { PaginationPosts } from "@/src/interface/pagination";
import { useModalStore } from "@/src/stores/modal";
import { SyncStatus } from "@/src/types/syncStatus";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import {
  FaFacebook,
  FaImage,
  FaLink,
  FaPencil,
  FaRotate,
  FaTrash,
  FaVideo,
  FaWordpress,
} from "react-icons/fa6";
import ModalCommon from "../../common/modal";
import { EditDescription } from "../edit/editDesc";
import { SocialPost } from "../hooks/interface";
import Sync from "../sync/sync";
import { UploadPostFile } from "./uploadFile";

interface PostsListProps {
  posts?: SocialPost[];
  pagination?: PaginationPosts;
}
interface syncListProps {
  facebook: SyncStatus;
  website: SyncStatus;
  googleBusiness: SyncStatus;
  title: string;
  id: number;
}
interface ModalState {
  id: number;
  contentDesc: string;
  titlePost: string;
}

export const PostListTable = ({ posts, pagination }: PostsListProps) => {
  const [editContent, setEditContent] = useState<ModalState>({
    id: 0,
    contentDesc: "",
    titlePost: "",
  });
  const [modalType, setModalType] = useState<string>("");
  const [syncContent, setSyncContent] = useState<syncListProps>({
    facebook: "pending",
    website: "pending",
    googleBusiness: "pending",
    title: "",
    id: 0,
  });
  const { setShow } = useModalStore();

  const handleEditDescription = (
    postId: number,
    content: string,
    title: string,
  ) => {
    setModalType("editPost");
    setEditContent((prev) => ({
      ...prev,
      id: postId,
      contentDesc: content,
      titlePost: title,
    }));
    setShow();
  };

  const handlerSync = async ({
    facebook,
    website,
    googleBusiness,
    title,
    id,
  }: syncListProps) => {
    setModalType("syncPost");
    setSyncContent((prev) => ({
      ...prev,
      facebook: facebook,
      website: website,
      googleBusiness: googleBusiness,
      title: title,
      id: id,
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
                  <td className="pageCell">
                    {row.pageName}
                    <p>
                      {row.facebookStatus === syncStatus.COMPLETED &&
                        (row.permalinkUrl ? (
                          <Link href={row.permalinkUrl} passHref legacyBehavior>
                            <a
                              href={row.permalinkUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaFacebook color="green" />
                            </a>
                          </Link>
                        ) : (
                          <FaFacebook color="green" />
                        ))}{" "}
                      {row.webStatus === syncStatus.COMPLETED &&
                        (row.webLink ? (
                          <Link href={row.webLink} passHref legacyBehavior>
                            <a
                              href={row.webLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaWordpress color="green" />
                            </a>
                          </Link>
                        ) : (
                          <FaWordpress color="green" />
                        ))}
                    </p>
                  </td>
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
                      <span
                        className="d-inline-flex align-items-center ms-2"
                        role="group"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="editBtn me-1"
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
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="editBtn"
                          title="Edit Description"
                          onClick={() =>
                            handlerSync({
                              facebook: row.facebookStatus as SyncStatus,
                              website: row.webStatus as SyncStatus,
                              googleBusiness:
                                row.googleBusinessStatus as SyncStatus,
                              title: row.title,
                              id: row.id,
                            })
                          }
                        >
                          <FaRotate />
                        </Button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ModalCommon
        title={modalType == "editPost" ? "Edit post" : "Sync Post"}
        Compo={
          modalType == "editPost" ? (
            <EditDescription {...editContent} />
          ) : modalType == "syncPost" ? (
            <Sync {...syncContent} />
          ) : (
            <div></div>
          )
        }
      />
    </>
  );
};
