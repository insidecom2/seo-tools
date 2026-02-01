import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import TinyEditor from "../../common/tinyEditor";
import useUpdateById from "../hooks/useUpdate";

export const EditDescription = ({
  id,
  contentDesc,
  titlePost,
}: {
  id: number;
  contentDesc: string;
  titlePost: string;
}) => {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const updatePost = useUpdateById(id);

  useEffect(() => {
    if (contentDesc) {
      setContent(contentDesc);
    }
    if (titlePost) {
      setTitle(titlePost);
    }
  }, [contentDesc, titlePost]);

  useEffect(() => {}, [titlePost]);
  const handleSubmit = async () => {
    try {
      await updatePost.mutateAsync({ description: content, title: title });
    } catch (error) {
      console.error("Error updating post description:", error);
    }
  };

  return (
    <div>
      <h4>Edit Description</h4>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <TinyEditor value={content} onChange={setContent} />
        <Button
          variant={"primary"}
          style={{ marginTop: 16 }}
          onClick={handleSubmit}
        >
          Save
        </Button>
      </Form.Group>
    </div>
  );
};
