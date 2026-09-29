import React from "react";
import { LANGUAGES, ROAST_LEVELS, PERSONAS } from "@/config/app.config";
import { LanguageId, RoastLevel, PersonaId } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  persona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export const RoastControls: React.FC<RoastControlsProps> = ({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  persona,
  onPersonaChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 w-full">
      {/* Left controls: Roast Level, Persona, Language */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Roast Level Segmented Control */}
        <div className="flex items-center bg-[#F8F4EC] p-1 rounded-full border-2 border-[#141414] neo-shadow-xs">
          <span className="text-[10px] font-mono font-bold text-[#66625B] px-2 uppercase hidden md:inline">
            Spiciness:
          </span>
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onRoastLevelChange(level.id)}
                title={level.description}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border-2 border-[#141414] neo-shadow-xs"
                    : "text-[#141414] hover:bg-black/5 border-2 border-transparent"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>

        {/* Persona Select */}
        <div className="relative">
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
            className="appearance-none bg-white hover:bg-[#F8F4EC] pl-3.5 pr-8 py-1.5 rounded-full border-2 border-[#141414] text-xs font-bold text-[#141414] neo-shadow-xs cursor-pointer focus:outline-none transition-all"
            title="Roast Persona"
          >
            {PERSONAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono">
            ▾
          </span>
        </div>

        {/* Language Select */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white hover:bg-[#F8F4EC] pl-3.5 pr-8 py-1.5 rounded-full border-2 border-[#141414] text-xs font-mono font-bold text-[#141414] neo-shadow-xs cursor-pointer focus:outline-none transition-all"
            title="Programming Language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-mono">
            ▾
          </span>
        </div>
      </div>

      {/* Right controls: Error Drawer Toggle & Roast CTA */}
      <div className="flex items-center gap-2.5 ml-auto">
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all flex items-center gap-1 ${
            errorDrawerOpen
              ? "bg-[#141414] text-white border-[#141414]"
              : "border-dashed border-[#141414] hover:bg-black/5 text-[#141414]"
          }`}
        >
          <span>{errorDrawerOpen ? "−" : "+"}</span>
          <span>ERROR MESSAGE</span>
        </button>

        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className="bg-[#EDB13E] hover:bg-[#fabc48] disabled:opacity-70 text-[#141414] border-[2.5px] border-[#141414] px-5 py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider neo-shadow-md hover:translate-x-0.5 hover:translate-y-0.5 hover:neo-shadow-xs active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isRoasting ? (
            <>
              <span className="animate-spin font-mono text-sm">⏳</span>
              <span>ANALYZING SINS...</span>
            </>
          ) : (
            <>
              <span>Roast Me / भाजून काढ</span>
              <span className="text-base leading-none">🔥</span>
              <span className="text-[10px] font-mono bg-[#141414] text-white px-1.5 py-0.5 rounded border border-[#141414] hidden sm:inline">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
