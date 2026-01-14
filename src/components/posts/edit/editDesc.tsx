import { useModalStore } from "@/src/stores/modal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import TinyEditor from "../../common/tinyEditor";
import useUpdateById from "../hooks/useUpdate";
import {useAlertStore} from "@/src/stores/alert";

export const EditDescription = ({
  id,
  contentDesc,
}: {
  id: number;
  contentDesc: string;
}) => {
  const [content, setContent] = useState<string>("");
  const updatePost = useUpdateById(id);
  const { setClose } = useModalStore();
  const { setShow, setMessage} = useAlertStore();

  useEffect(() => {
    if (contentDesc) {
      setContent(contentDesc);
    }
  }, [contentDesc]);

  useEffect(() => {
    console.log("Content updated:", content);
  }, [content]);

  const handleSubmit = async () => {
    try {
      await updatePost.mutateAsync({ description: content });
      setMessage("Successfully updated content");
      setShow(true);
      setClose();
    } catch (error) {
      console.error("Error updating post description:", error);
    }
  };

  return (
    <div>
      <h4>Edit Description</h4>
      <TinyEditor value={content} onChange={setContent} />
      <Button
        variant={"primary"}
        style={{ marginTop: 16 }}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </div>
  );
};
