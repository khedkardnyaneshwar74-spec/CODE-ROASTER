import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[360px]">
      <div className="w-16 h-16 rounded-xl border-3 border-[#141414] bg-[#D9503F] text-white flex items-center justify-center font-mono text-3xl font-black neo-shadow-md mb-4">
        !
      </div>
      <h3 className="font-extrabold text-base md:text-lg uppercase text-[#D9503F] tracking-tight mb-2">
        ROAST // INTERRUPTED
      </h3>
      <p className="text-xs md:text-sm text-[#141414] max-w-sm mb-4 leading-relaxed font-medium">
        {error || "Bhau, Gemini ne chai break le li. Something went wrong while generating the roast."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="bg-[#EDB13E] hover:bg-[#141414] hover:text-white text-[#141414] border-2 border-[#141414] px-5 py-2 rounded-full font-mono text-xs font-bold neo-shadow-xs transition-all active:translate-x-0.5 active:translate-y-0.5"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
};
