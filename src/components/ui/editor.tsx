"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Quote, Redo, Undo } from "lucide-react";

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 border-b bg-muted/50">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-muted ${editor.isActive("bold") ? "bg-muted shadow-sm" : ""}`}
                type="button"
            >
                <Bold className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-muted ${editor.isActive("italic") ? "bg-muted shadow-sm" : ""}`}
                type="button"
            >
                <Italic className="h-4 w-4" />
            </button>
            <div className="w-[1px] bg-border mx-1" />
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-muted ${editor.isActive("bulletList") ? "bg-muted shadow-sm" : ""}`}
                type="button"
            >
                <List className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-muted ${editor.isActive("orderedList") ? "bg-muted shadow-sm" : ""}`}
                type="button"
            >
                <ListOrdered className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-muted ${editor.isActive("blockquote") ? "bg-muted shadow-sm" : ""}`}
                type="button"
            >
                <Quote className="h-4 w-4" />
            </button>
            <div className="w-[1px] bg-border mx-1 ml-auto" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-2 rounded hover:bg-muted"
                type="button"
            >
                <Undo className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-2 rounded hover:bg-muted"
                type="button"
            >
                <Redo className="h-4 w-4" />
            </button>
        </div>
    );
};

export function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[300px] p-4",
            },
        },
    });

    return (
        <div className="w-full border rounded-md overflow-hidden bg-white">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
