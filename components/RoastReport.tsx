"use client";

import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { ROAST_LEVELS } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import { IssueCard } from "@/components/IssueCard";
import { FixedCode } from "@/components/FixedCode";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export const RoastReport: React.FC<RoastReportProps> = ({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}) => {
  const levelLabel =
    ROAST_LEVELS.find((r) => r.id === roastLevel)?.label || roastLevel;

  return (
    <div className="flex flex-col h-full bg-[#FAF7F0] rounded-[16px] border-[2.5px] border-[#141414] neo-shadow-md overflow-hidden">
      {/* Header bar */}
      <div className="bg-white px-4 py-2.5 border-b-[2px] border-[#141414] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] bg-[#EDB13E] text-[#141414] px-2 py-0.5 rounded border border-[#141414] font-bold uppercase tracking-wider">
            AUDIT // REPORT
          </span>
          <span className="font-bold text-[#141414] uppercase">
            ROAST REPORT
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#66625B]">
          <span className="w-2 h-2 rounded-full bg-[#4FA35A] animate-pulse"></span>
          <span>SPICE: {levelLabel.toUpperCase()}</span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto min-h-[360px] md:min-h-[460px]">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="space-y-6">
            {/* Rubber Stamp Score & Verdict Badge */}
            <div className="bg-white border-2 border-[#141414] rounded-xl p-4 neo-shadow-sm flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#66625B] uppercase tracking-wider">
                  OFFICIAL AUDIT VERDICT
                </span>
                <div className="font-extrabold text-sm md:text-base text-[#141414] mt-0.5">
                  "{result.scoreVerdict || "ATTENDANCE SHORT, CODE BHI SHORT"}"
                </div>
              </div>

              {/* Rubber stamp badge */}
              <div className="neo-stamp bg-[#EDB13E] border-2 border-[#141414] px-3 py-1.5 rounded-lg text-center flex-shrink-0">
                <div className="font-black text-xl md:text-2xl leading-none text-[#141414]">
                  {result.roastScore ?? 72}
                  <span className="text-xs font-mono">/100</span>
                </div>
                <div className="text-[9px] font-mono font-extrabold uppercase tracking-tighter text-[#141414]">
                  ROAST SCORE
                </div>
              </div>
            </div>

            {/* Section 1: The Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-[#66625B]">STYLE: {levelLabel}</span>
              </SectionHeader>
              <div className="bg-white border-2 border-[#141414] rounded-xl p-4 neo-shadow-sm relative">
                <span className="absolute -top-3 -left-1 text-4xl text-[#EDB13E] select-none font-serif opacity-40">
                  “
                </span>
                <p className="font-extrabold text-sm md:text-base text-[#141414] leading-relaxed relative z-10">
                  "{result.roast}"
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-bold text-[#D9503F]">
                  {result.issues.length}{" "}
                  {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="bg-white border-2 border-[#141414] rounded-xl p-4 text-center text-xs font-mono text-[#4FA35A] font-bold">
                  ✓ No issues found. Suspiciously clean code!
                </div>
              ) : (
                result.issues.map((issue, idx) => (
                  <IssueCard key={idx} index={idx + 1} issue={issue} />
                ))
              )}
            </div>

            {/* Section 3: The Fix */}
            {result.correctedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section */}
            {result.takeaway && (
              <div className="pt-2 border-t-2 border-[#141414]">
                <SectionHeader
                  number={result.correctedCode ? 4 : 3}
                  title="Takeaway"
                />
                <div className="bg-[#EFF2FB] border-2 border-[#141414] rounded-xl p-3.5 neo-shadow-xs text-xs md:text-sm text-[#141414] font-medium leading-relaxed">
                  💡 {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
