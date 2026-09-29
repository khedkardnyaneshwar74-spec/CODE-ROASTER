import React from "react";
import { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

export const IssueCard: React.FC<IssueCardProps> = ({ index, issue }) => {
  const paddedIndex = index < 10 ? `0${index}` : `${index}`;

  const severityBg =
    issue.severity === "FATAL BUG"
      ? "bg-[#D9503F] text-white"
      : issue.severity === "CODE SMELL"
      ? "bg-[#EDB13E] text-[#141414]"
      : "bg-[#4FA35A] text-white";

  return (
    <div className="bg-white border-2 border-[#141414] rounded-xl p-3.5 neo-shadow-sm mb-3">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs bg-[#141414] text-white px-2 py-0.5 rounded font-bold">
            #{paddedIndex}
          </span>
          <span className="font-mono text-xs font-bold text-[#141414]">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#141414] ${severityBg}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-xs text-[#66625B] font-semibold text-right">
          {issue.title}
        </span>
      </div>

      {/* Code snippet */}
      {issue.codeSnippet && (
        <pre className="bg-[#171717] text-[#F7F3EA] p-2.5 rounded-lg border border-[#141414] font-mono text-xs mb-2.5 overflow-x-auto border-l-4 border-l-[#D9503F]">
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1 text-xs">
        <div className="text-[#D9503F] font-medium leading-relaxed">
          <span className="font-bold mr-1.5">✕ Diagnosis:</span>
          {issue.diagnosis}
        </div>
        <div className="text-[#2e7d32] font-medium leading-relaxed">
          <span className="font-bold mr-1.5">✓ Expected:</span>
          {issue.expected}
        </div>
      </div>
    </div>
  );
};
