import { ChangeEventHandler, useRef } from "react";
import { FaUpload } from "react-icons/fa6";

interface UploadIconProps {
  allowType?: string;
  setFile?: ChangeEventHandler<HTMLInputElement>;
}

export const UploadIcon = ({ allowType, setFile }: UploadIconProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accept = allowType
    ? allowType
        .split(",")
        .map((type) => `.${type.trim()}`)
        .join(",")
    : "*/*";

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={setFile}
      />
      <FaUpload style={{ cursor: "pointer" }} onClick={handleUploadFile} />
    </>
  );
};
