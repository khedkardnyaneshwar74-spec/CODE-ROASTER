import React from "react";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 min-h-[360px]">
      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#141414] bg-white flex items-center justify-center font-mono text-2xl font-bold text-[#66625B] neo-shadow-sm mb-4">
        {"{?}"}
      </div>
      <h3 className="font-bold text-base md:text-lg uppercase text-[#141414] tracking-tight mb-1.5">
        Your code is suspiciously quiet
      </h3>
      <p className="text-xs md:text-sm text-[#66625B] max-w-sm mb-4 leading-relaxed">
        Paste your code on the left, pick your spice level, then click{" "}
        <strong className="text-[#141414]">"Roast Me"</strong> or press{" "}
        <kbd className="bg-white px-1.5 py-0.5 rounded border border-[#141414] font-mono text-xs">
          Ctrl+Enter
        </kbd>
        .
      </p>
      <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#EDB13E] bg-[#141414] px-3 py-1.5 rounded-full">
        <span>🌶️ Ready for the burn</span>
      </div>
    </div>
  );
};
