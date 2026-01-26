"use client";

import { LoadingIcon } from "@/src/components/common/loading";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((m) => m.Editor),
  { ssr: false },
);

export default function TinyEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (content: string) => void;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ position: "relative" }}>
      {loading && (
        <div className="editor-loading">
          <LoadingIcon />
        </div>
      )}
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
        value={value}
        onEditorChange={onChange}
        onInit={() => setLoading(false)}
        init={{
          height: 400,
          menubar: false,

          // 🔑 สำคัญ
          forced_root_block: false,
          force_br_newlines: true,
          force_p_newlines: false,
          newline_behavior: "linebreak", // TinyMCE v6+

          plugins: [
            "advlist autolink lists link image charmap preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table code help wordcount",
          ],
          toolbar:
            "undo redo | bold italic | \
       alignleft aligncenter alignright | \
       bullist numlist | removeformat",
        }}
      />
    </div>
  );
}
