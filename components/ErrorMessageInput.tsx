import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export const ErrorMessageInput: React.FC<ErrorMessageInputProps> = ({
  value,
  onChange,
  onClose,
}) => {
  return (
    <div className="w-full bg-[#EFF2FB] border-b-2 border-[#141414] p-3 md:p-4 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#141414] flex items-center gap-1.5">
          <span className="text-[#D9503F] text-sm">⚠</span>
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono font-bold text-[#66625B] hover:text-[#141414] px-2 py-0.5 rounded border border-[#141414] bg-white neo-shadow-xs"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list' or NullPointerException at line 14"
        className="w-full bg-white border-2 border-[#141414] rounded-xl p-2.5 font-mono text-xs text-[#141414] placeholder:text-[#66625B]/60 focus:outline-none focus:ring-2 focus:ring-[#EDB13E] resize-none"
      />
    </div>
  );
};
