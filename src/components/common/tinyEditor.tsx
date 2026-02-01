"use client";

import { LoadingIcon } from "@/src/components/common/loading";
import dynamic from "next/dynamic";
import { useState } from "react";

const Editor: any = dynamic(
  () => import("@tinymce/tinymce-react").then((m: any) => m.Editor),
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
          newline_behavior: "linebreak", // TinyMCE v6+
          dialog_container: "body",
          forced_root_block: "p", // หรือเอาออกเลยก็ได้
          plugins: [
            "advlist",
            "lists",
            "image",
            "preview",
            "anchor",

            "insertdatetime ",
            "table",
            "code",
            "help",
            "wordcount",
            "autolink",
            "media",
            "link",
          ],
          toolbar:
            "undo redo | bold italic | \
       alignleft aligncenter alignright | \
       bullist numlist | removeformat |\
        link image media | code",
          media_live_embeds: true,
          media_alt_source: false,
        }}
      />
    </div>
  );
}
