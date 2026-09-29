"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label || language;

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const updateCursor = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart || 0;
    const textBefore = code.slice(0, pos);
    const lineIndex = textBefore.split("\n").length;
    const lastNewline = textBefore.lastIndexOf("\n");
    const colIndex = lastNewline === -1 ? pos + 1 : pos - lastNewline;
    setCursorPos({ line: lineIndex, col: colIndex });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
      setTimeout(updateCursor, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#171717] rounded-[16px] border-[2.5px] border-[#141414] neo-shadow-md overflow-hidden text-[#F7F3EA]">
      {/* Header bar */}
      <div className="bg-[#212121] px-4 py-2.5 border-b border-[#333333] flex items-center justify-between text-xs">
        {/* Left: Window dots & Tag */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] border border-black inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDB13E] border border-black inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4FA35A] border border-black inline-block"></span>
          </div>
          <span className="font-mono text-[10px] bg-white/10 text-[#EDB13E] px-2 py-0.5 rounded border border-white/20 font-bold uppercase tracking-wider">
            INPUT // SRC
          </span>
          <span className="font-mono text-neutral-300 font-bold hidden sm:inline">
            YOUR CODE
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[11px] font-mono font-bold text-[#EDB13E] hover:underline"
          >
            SAMPLE BUG
          </button>
          <span className="text-neutral-600">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[11px] font-mono font-bold text-neutral-400 hover:text-white"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="relative flex-1 flex overflow-hidden min-h-[360px] md:min-h-[460px]">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none bg-[#1c1c1c] text-neutral-500 font-mono text-xs py-3 px-3 text-right border-r border-[#333333] overflow-hidden flex flex-col leading-6 min-w-[44px]"
        >
          {Array.from({ length: lineCount }).map((_, index) => {
            const lineNum = index + 1;
            const isError = errorLine === lineNum;
            return (
              <span
                key={lineNum}
                className={`${
                  isError
                    ? "text-[#D9503F] font-bold bg-[#D9503F]/20 -mx-3 px-3 rounded-sm"
                    : ""
                }`}
              >
                {lineNum < 10 ? `0${lineNum}` : lineNum}
              </span>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onSelect={updateCursor}
          onClick={updateCursor}
          onKeyUp={updateCursor}
          onScroll={handleScroll}
          spellCheck={false}
          wrap="off"
          placeholder="// Paste your code here..."
          className="flex-1 bg-transparent text-[#F7F3EA] font-mono text-xs md:text-sm py-3 px-4 resize-none focus:outline-none overflow-auto leading-6 whitespace-pre"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="bg-[#1c1c1c] px-4 py-1.5 border-t border-[#333333] text-[11px] font-mono text-neutral-400 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col}
          </span>
          <span className="text-neutral-600">·</span>
          <span className="text-[#EDB13E]">{languageLabel}</span>
        </div>
        <div className="flex items-center gap-3 hidden sm:flex">
          <span>{code.length.toLocaleString()} chars</span>
          <span className="text-neutral-600">·</span>
          <span>UTF-8 · Tab: 4</span>
        </div>
      </div>
    </div>
  );
};
