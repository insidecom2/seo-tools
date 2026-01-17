import { useUpload } from "@/src/lib/storage/hook/useUpload";
import { useAlertStore } from "@/src/stores/alert";
import { isCheckFileType } from "@/src/utils/file";
import { useEffect, useState } from "react";
import { LoadingIcon } from "../../common/loading";
import { UploadIcon } from "../../common/uploadIcon";
import useUpdateById from "../hooks/useUpdate";

interface UploadPostFileProps {
  allowType?: string;
  id: number;
  uploadType: "image" | "video";
}

export const UploadPostFile = ({
  allowType,
  id,
  uploadType,
}: UploadPostFileProps) => {
  const [file, setFile] = useState<File | null>(null);
  const updatePost = useUpdateById(id);
  const { setVariant, setMessage, setShow } = useAlertStore();
  const sendFileToStore = useUpload();

  useEffect(() => {
    if (file) {
      uploadToStorage(file, uploadType);
    }
  }, [file]);

  const uploadToStorage = async (file: File, uploadType: "image" | "video") => {
    // Implement your upload logic here
    const fileUploaded = await sendFileToStore.mutateAsync(file);
    if (fileUploaded) {
      updateImageURL(fileUploaded, uploadType);
    }
  };

  const updateImageURL = async (
    fileURL: string,
    uploadType: "image" | "video",
  ) => {
    if (uploadType === "image") {
      await updatePost.mutateAsync({ imageLinkRaw: fileURL });
    } else if (uploadType === "video") {
      await updatePost.mutateAsync({ videoLinkRaw: fileURL });
    }
    setVariant("success");
    setMessage("Successfully uploaded file and updated post.");
    setShow(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      const isValidType = isCheckFileType(selectedFile, allowType);

      if (allowType && !isValidType) {
        setVariant("danger");
        setMessage(`Only files of type ${allowType} are allowed.`);
        setShow(true);
        return;
      }
      setFile(selectedFile);
    }
  };

  if (sendFileToStore.isPending || updatePost.isPending) {
    return <LoadingIcon />;
  }

  return <UploadIcon setFile={handleFileChange} allowType={allowType} />;
};
