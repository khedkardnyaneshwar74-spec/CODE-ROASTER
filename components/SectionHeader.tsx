import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  children,
}) => {
  const padded = number < 10 ? `0${number}` : `${number}`;
  return (
    <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#141414]">
      <span className="font-mono text-xs md:text-sm font-extrabold uppercase tracking-wider text-[#141414]">
        {padded} // {title}
      </span>
      {children && <div className="text-xs font-mono">{children}</div>}
    </div>
  );
};
