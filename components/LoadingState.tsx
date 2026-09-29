import React, { useState, useEffect } from "react";

const LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai…",
  "Sharma ji ke bete ke code se comparison chal raha hai…",
  "Bhau, roast tayyar ho raha hai…",
  "Panchavati Express se bhi late hai tumhara code…",
  "Nashik misal jitna spicy critique cook ho raha hai…",
];

export const LoadingState: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[360px]">
      {/* Tilted square neo-brutalist loader */}
      <div className="w-16 h-16 rounded-xl border-3 border-[#141414] bg-[#EDB13E] flex items-center justify-center neo-shadow-md mb-5 transform rotate-6 animate-pulse">
        <span className="text-2xl animate-spin">🔥</span>
      </div>
      <h3 className="font-extrabold text-base md:text-lg uppercase text-[#141414] tracking-tight mb-2">
        ROASTING IN PROGRESS...
      </h3>
      <p className="font-mono text-xs md:text-sm text-[#141414] font-bold bg-[#EFF2FB] px-4 py-2 rounded-full border border-[#141414] neo-shadow-xs max-w-md transition-all">
        "{LOADING_MESSAGES[msgIndex]}"
      </p>
      <span className="font-mono text-[11px] text-[#66625B] mt-4">
        Powered by Google Gemini 3.5 Flash-Lite
      </span>
    </div>
  );
};
