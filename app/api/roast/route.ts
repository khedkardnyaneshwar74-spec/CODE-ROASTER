import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS, PERSONAS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, PersonaId, RoastRequest } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const rawCode = typeof body?.code === "string" ? body.code : "";
  const code = rawCode.trim();
  const errorMessage = typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validation
  if (!code) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallbacks for language and roastLevel
  const isKnownLang = LANGUAGES.some((l) => l.id === body?.language);
  const language: LanguageId = isKnownLang ? body.language : DEFAULTS.language;

  const isKnownLevel = ROAST_LEVELS.some((r) => r.id === body?.roastLevel);
  const roastLevel: RoastLevel = isKnownLevel ? body.roastLevel : DEFAULTS.roastLevel;

  const isKnownPersona = PERSONAS.some((p) => p.id === body?.persona);
  const persona: PersonaId = isKnownPersona ? body.persona : DEFAULTS.persona;

  const roastReq: RoastRequest = {
    code: rawCode,
    language,
    roastLevel,
    persona,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastReq);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error analyzing code in /api/roast:", error);
    if (error?.cause) console.error("Error cause:", error.cause);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze code." },
      { status: 500 }
    );
  }
}
