import { ChangeEventHandler, useRef } from "react";
import { FaUpload } from "react-icons/fa6";

interface UploadIconProps {
  allowType?: string;
  setFile?: ChangeEventHandler<HTMLInputElement>;
}

export const UploadIcon = ({ allowType, setFile }: UploadIconProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={allowType ? `${allowType}/*` : "*/*"}
        style={{ display: "none" }}
        onChange={setFile}
      />
      <FaUpload style={{ cursor: "pointer" }} onClick={handleUploadFile} />
    </>
  );
};
