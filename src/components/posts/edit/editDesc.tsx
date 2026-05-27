import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
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
      <h4 className="mb-4 text-lg font-semibold">Edit Description</h4>
      <div className="mb-3">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>
        <Input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>
        <TinyEditor value={content} onChange={setContent} />
        <Button
          variant="primary"
          className="mt-4"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
