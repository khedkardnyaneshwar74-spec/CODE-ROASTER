"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import {
  LanguageId,
  ReportState,
  RoastLevel,
  PersonaId,
  RoastResult,
} from "@/types/roast";
import { requestRoast } from "@/lib/api";
import { TopBar } from "@/components/TopBar";
import { RoastControls } from "@/components/RoastControls";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { CodeEditor } from "@/components/CodeEditor";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";

export const Workspace: React.FC = () => {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // Error line only when editor still holds exact roasted code
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim().length === 0) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");
    setRoastResult(null);

    try {
      const result = await requestRoast({
        code,
        language,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      setApiError(err?.message || "Failed to analyze code.");
      setReportState("error");
    }
  }, [code, language, roastLevel, persona, errorMessage, isRoasting]);

  const handleLoadSample = () => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  return (
    <div className="min-h-screen flex flex-col justify-between relative z-10 selection:bg-[#EDB13E] selection:text-[#141414]">
      {/* Background drafting dot pattern */}
      <div className="fixed inset-0 grid-bg-pattern opacity-[0.05] pointer-events-none z-0" />

      {/* Floating Navbar */}
      <TopBar>
        <span className="text-xs font-mono font-bold text-[#66625B] hidden md:inline">
          DEVFEAST NASHIK 2026
        </span>
      </TopBar>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pb-8 z-10">
        {/* Hero Section */}
        <div className="text-center flex flex-col items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#EDB13E] text-[#141414] border-2 border-[#141414] px-4 py-1 rounded-full font-mono text-xs md:text-sm font-extrabold tracking-wide neo-shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D9503F] animate-ping" />
            <span>CODE BOL RAHA HAI · मला वाचवा!</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl font-black text-[#141414] tracking-tight leading-tight flex items-center gap-2">
            Code Roaster
            <span className="text-2xl md:text-4xl animate-bounce">🔥</span>
          </h1>

          <p className="font-bold text-sm md:text-base text-[#141414] mt-1">
            Paste your code. Pick your roast. Get humbled. Get the fix.
          </p>

          <div className="flex items-center gap-2 text-[#66625B] font-mono text-xs mt-1.5">
            <span>Desi debugging, powered by Gemini</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4C80F0]" />
              <span className="w-2 h-2 rounded-full bg-[#D9503F]" />
              <span className="w-2 h-2 rounded-full bg-[#EDB13E]" />
              <span className="w-2 h-2 rounded-full bg-[#4FA35A]" />
            </div>
          </div>
        </div>

        {/* Main Tool Card */}
        <div className="bg-white rounded-[22px] border-[3px] border-[#141414] neo-shadow-lg overflow-hidden flex flex-col">
          {/* Top Control Bar */}
          <div className="p-3.5 md:p-4 border-b-2 border-[#141414] bg-white">
            <RoastControls
              roastLevel={roastLevel}
              onRoastLevelChange={setRoastLevel}
              language={language}
              onLanguageChange={setLanguage}
              persona={persona}
              onPersonaChange={setPersona}
              onRoast={handleRoast}
              isRoasting={isRoasting}
              errorDrawerOpen={errorDrawerOpen}
              onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
            />
          </div>

          {/* Optional Error Drawer */}
          {errorDrawerOpen && (
            <ErrorMessageInput
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Pane Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#141414] flex-1 p-3 md:p-4 bg-[#F8F4EC]/40">
            {/* Left: Code Editor (50% desktop) */}
            <div className="lg:col-span-6 flex flex-col p-1 md:p-2">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                errorLine={errorLine}
                onLoadSample={handleLoadSample}
              />
            </div>

            {/* Right: Roast Report (50% desktop) */}
            <div className="lg:col-span-6 flex flex-col p-1 md:p-2">
              <RoastReport
                state={reportState}
                roastLevel={roastLevel}
                language={language}
                result={roastResult}
                errorMsg={apiError}
                onRetry={handleRoast}
                onApplyFix={handleApplyFix}
              />
            </div>
          </div>
        </div>

        {/* Community & Pre-DevFest Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-[#141414] rounded-2xl p-4 neo-shadow-sm">
            <span className="font-mono text-[10px] bg-[#EDB13E] text-[#141414] px-2 py-0.5 rounded font-bold uppercase">
              HALL OF BURNS
            </span>
            <p className="font-bold text-xs text-[#141414] mt-2">
              "Your recursive function has more drama than a Star Pravah serial."
            </p>
            <span className="text-[11px] text-[#66625B] mt-1 block">
              — Anonymous React dev, Nashik
            </span>
          </div>

          <div className="bg-[#EFF2FB] border-2 border-[#141414] rounded-2xl p-4 neo-shadow-sm">
            <span className="font-mono text-[10px] bg-[#4C80F0] text-white px-2 py-0.5 rounded font-bold uppercase">
              LOCAL SPIRIT
            </span>
            <p className="font-bold text-xs text-[#141414] mt-2">
              Misal vs Memory Leaks: Which burns harder?
            </p>
            <span className="text-[11px] text-[#66625B] mt-1 block">
              Kasa Kay Nashik? #DevFestNashik
            </span>
          </div>

          <div className="bg-[#EDB13E] border-2 border-[#141414] rounded-2xl p-4 neo-shadow-sm flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] bg-[#141414] text-white px-2 py-0.5 rounded font-bold uppercase">
                DEVFEST 2026
              </span>
              <p className="font-bold text-xs text-[#141414] mt-1">
                Pre-DevFest Workshop Edition
              </p>
            </div>
            <div className="relative h-8 w-24">
              <Image
                src="/Pre-DevFest_Logo.svg"
                alt="Pre-DevFest"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Rangoli / Warli Geometric Strip */}
      <div className="w-full py-2 bg-white border-y-2 border-[#141414] flex items-center justify-center gap-3 select-none text-xs font-black tracking-widest text-[#141414]">
        <span>▲</span>
        <span>▼</span>
        <span className="text-[#4C80F0]">●</span>
        <span>▲</span>
        <span>▼</span>
        <span className="text-[#D9503F]">●</span>
        <span>▲</span>
        <span>▼</span>
        <span className="text-[#EDB13E]">●</span>
        <span className="font-mono text-[11px] font-extrabold uppercase px-2">
          CHALA, DEPLOY KARUYA!
        </span>
        <span className="text-[#4FA35A]">●</span>
        <span>▲</span>
        <span>▼</span>
        <span className="text-[#4C80F0]">●</span>
        <span>▲</span>
        <span>▼</span>
      </div>

      {/* Mandatory Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </div>
  );
};
