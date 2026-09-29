import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, error: any): string {
  if (status === 400) {
    return "Invalid request sent to Gemini. Check your code or inputs.";
  }
  if (status === 403) {
    return "Invalid GEMINI_API_KEY. Please verify the API key in your .env.local file.";
  }
  if (status === 404) {
    return `Gemini model ${AI.model} not found or unsupported. Verify AI.model in config/app.config.ts.`;
  }
  if (status === 429) {
    return "Gemini API rate limit reached. Bhai, thoda ruk jaa, chai pee le! ☕";
  }
  if (status === 503) {
    return "Gemini servers are currently overloaded. Please retry in a few seconds.";
  }
  return error?.message || "An unexpected error occurred while communicating with Gemini.";
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Analyzing code, GEMINI_API_KEY prefix:", apiKey ? apiKey.slice(0, 8) + "..." : "MISSING");
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: any = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text?.trim();
      if (!text) {
        throw new Error("Empty response received from Gemini.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(text);
      } catch (parseErr) {
        throw new Error("Failed to parse Gemini response as JSON: " + text.slice(0, 200));
      }

      return {
        roast: parsed.roast ?? "Bhai, code dekh ke speechless ho gaya main! 😂",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway: parsed.takeaway ?? "Code likhna gym jaisa hai — roz karoge toh better hoga! 🚀",
        roastScore: typeof parsed.roastScore === "number" ? parsed.roastScore : 72,
        scoreVerdict: parsed.scoreVerdict ?? "ATTENDANCE SHORT, CODE BHI SHORT",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || err?.error?.code;

      if ((status === 503 || status === 429) && attempt < AI.maxAttempts) {
        const delay = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      const message = friendlyErrorMessage(status, err);
      throw new Error(message);
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
