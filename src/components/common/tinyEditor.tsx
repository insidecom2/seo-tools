"use client";

import dynamic from "next/dynamic";
import {useState} from "react";
import {LoadingIcon} from "@/src/components/common/loading";

const Editor = dynamic(
    () => import("@tinymce/tinymce-react").then((m) => m.Editor),
    {ssr: false}
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
        <div style={{position: "relative"}}>
            {loading && (
                <div className="editor-loading">
                    <LoadingIcon/>
                </div>
            )}
            <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY} // หรือใส่ string
                value={value}
                onEditorChange={onChange}
                onInit={() => setLoading(false)}
                init={{
                    height: 400,
                    menubar: false,
                    plugins: [
                        "advlist autolink lists link image charmap preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table code help wordcount",
                    ],
                    toolbar:
                        "undo redo | formatselect | bold italic backcolor | \
                         alignleft aligncenter alignright alignjustify | \
                         bullist numlist outdent indent | removeformat | help",
                }}
            />
        </div>
    );
}
