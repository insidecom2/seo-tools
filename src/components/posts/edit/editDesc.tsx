import { useModalStore } from "@/src/stores/modal";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { LoadingIcon } from "../../common/loading";
import TinyEditor from "../../common/tinyEditor";
import useGetById from "../hooks/useGetById";
import useUpdateById from "../hooks/useUpdate";

export const EditDescription = ({ id }: { id: number }) => {
  const { data, isLoading } = useGetById({ id });
  const [content, setContent] = useState<string>("");
  const updatePost = useUpdateById(id);
  const { setClose } = useModalStore();

  useEffect(() => {
    if (data) {
      setContent(data?.description);
    }
  }, [data]);

  useEffect(() => {
    console.log("Content updated:", content);
  }, [content]);

  const handleSubmit = async () => {
    try {
      await updatePost.mutateAsync({ description: content });
      setClose();
    } catch (error) {
      console.error("Error updating post description:", error);
    }
  };

  if (isLoading) return <LoadingIcon />;

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
