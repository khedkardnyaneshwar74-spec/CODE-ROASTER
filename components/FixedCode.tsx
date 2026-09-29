"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "@/components/SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export const FixedCode: React.FC<FixedCodeProps> = ({
  sectionNumber,
  language,
  code,
  onApply,
}) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const extension =
    LANGUAGES.find((l) => l.id === language)?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-4 pt-4 border-t-2 border-[#141414]">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-[#4FA35A] uppercase">
          REDEMPTION ARC
        </span>
      </SectionHeader>

      <div className="bg-[#171717] rounded-xl border-2 border-[#141414] overflow-hidden neo-shadow-sm mb-3">
        {/* Code header bar */}
        <div className="bg-[#242424] px-4 py-2 border-b border-[#333333] flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">solution.{extension}</span>
          <span className="text-[#4FA35A] font-bold">READY TO APPLY</span>
        </div>

        {/* Code block */}
        <pre className="p-4 text-[#F7F3EA] font-mono text-xs md:text-sm overflow-x-auto leading-relaxed border-l-4 border-l-[#4FA35A]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className="bg-white hover:bg-[#141414] hover:text-white text-[#141414] border-2 border-[#141414] px-4 py-2 rounded-full font-mono text-xs font-bold neo-shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="bg-[#EDB13E] hover:bg-[#141414] hover:text-white text-[#141414] border-2 border-[#141414] px-4 py-2 rounded-full font-mono text-xs font-bold neo-shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
};
