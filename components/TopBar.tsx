import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export const TopBar: React.FC<TopBarProps> = ({ children }) => {
  return (
    <header className="sticky top-4 z-40 w-full px-4 mb-4">
      <nav className="bg-white rounded-full mx-auto max-w-6xl border-[2.5px] border-[#141414] neo-shadow-md flex flex-wrap justify-between items-center w-full px-4 md:px-6 py-2.5 gap-3">
        {/* Left: Official GDG Nashik Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
            <div className="relative h-8 md:h-9 w-28 md:w-32">
              <Image
                src="/GDG-Nashik_Logo.svg"
                alt="GDG Nashik"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[10px] font-mono bg-[#EDB13E] text-[#141414] px-2 py-0.5 rounded-full border border-[#141414] font-black uppercase tracking-wider hidden sm:inline-block">
              {APP.version}
            </span>
          </a>
        </div>

        {/* Center / Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {children}
        </div>

        {/* Right: Official DevFest '26 Logo Badge */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="https://devfest26.gdgnashik.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#F8F4EC] border-2 border-[#141414] px-2.5 py-1 rounded-full neo-shadow-xs hover:bg-[#EDB13E]/20 transition-all"
            title="DevFest Nashik 2026"
          >
            <div className="relative h-6 w-20">
              <Image
                src="/DevFest-26'_Logo.svg"
                alt="DevFest 26"
                fill
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </nav>
    </header>
  );
};
