import React from "react";
import Image from "next/image";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isRoasting }) => {
  return (
    <footer className="w-full bg-[#FAF7F0] border-t-2 border-[#141414] py-3 px-4 md:px-8 mt-auto">
      {/* Top Status Row */}
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between text-xs font-mono text-[#66625B] gap-2">
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#141414]">STATUS:</span>
          {isRoasting ? (
            <span className="text-[#EDB13E] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#EDB13E] animate-ping inline-block"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="text-[#4FA35A] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#4FA35A] inline-block"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline">ENGINE: GOOGLE GEMINI</span>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-4 w-7 inline-block opacity-80">
            <Image src="/GDG_Logo.svg" alt="GDG" fill className="object-contain" />
          </div>
          <span className="font-bold text-[#141414] uppercase tracking-wider">
            {APP.name} {APP.version} // LIVE
          </span>
        </div>
      </div>

      {/* Mandatory Workshop Attribution line */}
      <div className="max-w-6xl mx-auto text-center mt-2 pt-2 border-t border-black/10 text-[11px] font-mono text-[#66625B]">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
};
