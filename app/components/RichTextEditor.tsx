"use client";

import { useRef, useEffect, useState } from "react";
import {
  UndoIcon,
  RedoIcon,
  AlignLeftIcon,
  ChevronDownIcon,
} from "@/icons/icons";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

// Text style options
const TEXT_STYLES = [
  { label: "Normal text", tag: "p", style: {} },
  { label: "Heading 1", tag: "h1", style: {} },
  { label: "Heading 2", tag: "h2", style: {} },
  { label: "Heading 3", tag: "h3", style: {} },
];

const ALIGN_OPTIONS = [
  { label: "Left", command: "justifyLeft" },
  { label: "Center", command: "justifyCenter" },
  { label: "Right", command: "justifyRight" },
  { label: "Justify", command: "justifyFull" },
];

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your text here...",
  minHeight = "100px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [textStyleOpen, setTextStyleOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);
  const [activeStyle, setActiveStyle] = useState("Normal text");
  const [activeAlign, setActiveAlign] = useState("Left");

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const applyTextStyle = (style: (typeof TEXT_STYLES)[0]) => {
    exec("formatBlock", style.tag);
    setActiveStyle(style.label);
    setTextStyleOpen(false);
  };

  const applyAlign = (opt: (typeof ALIGN_OPTIONS)[0]) => {
    exec(opt.command);
    setActiveAlign(opt.label);
    setAlignOpen(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center gap-0.5 border-b border-gray-200 bg-[#f0f2f8] px-2 py-1.5">
        {/* Undo */}
        <button
          type="button"
          onClick={() => exec("undo")}
          title="Undo"
          className="flex items-center justify-center rounded p-1.5 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <UndoIcon />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => exec("redo")}
          title="Redo"
          className="flex items-center justify-center rounded p-1.5 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <RedoIcon />
        </button>

        {/* Divider */}
        <div className="mx-1.5 h-5 w-px bg-gray-300" />

        {/* Normal text dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setTextStyleOpen(!textStyleOpen);
              setAlignOpen(false);
            }}
            className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span>{activeStyle}</span>
            <ChevronDownIcon />
          </button>
          {textStyleOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[160px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {TEXT_STYLES.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => applyTextStyle(s)}
                  className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-1.5 h-5 w-px bg-gray-300" />

        {/* Align dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setAlignOpen(!alignOpen);
              setTextStyleOpen(false);
            }}
            title="Alignment"
            className="flex items-center gap-1 rounded p-1.5 text-gray-500 hover:bg-gray-200 transition-colors"
          >
            <AlignLeftIcon />
            <ChevronDownIcon />
          </button>
          {alignOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              {ALIGN_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => applyAlign(opt)}
                  className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="mx-1.5 h-5 w-px bg-gray-300" />

        {/* Bold */}
        <button
          type="button"
          onClick={() => exec("bold")}
          title="Bold"
          className="flex items-center justify-center rounded p-1.5 font-bold text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <span className="text-sm font-bold leading-none">B</span>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => exec("italic")}
          title="Italic"
          className="flex items-center justify-center rounded p-1.5 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <span className="text-sm italic font-semibold leading-none">I</span>
        </button>
      </div>

      {/* Editable content area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="prose prose-sm max-w-none overflow-auto bg-white px-4 py-3 text-sm text-gray-800 outline-none"
        style={{ minHeight }}
        data-placeholder={placeholder}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
