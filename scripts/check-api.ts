import { analyzeCode } from "../lib/gemini";
import { SAMPLE } from "../config/app.config";

async function main() {
  console.log("Checking Gemini API with sample code...");
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("API check succeeded!");
    console.log("Roast:", result.roast);
    console.log("Issues found:", result.issues.length);
    console.log("Roast Score:", result.roastScore);
    console.log("Verdict:", result.scoreVerdict);
    process.exit(0);
  } catch (error: any) {
    console.error("API check failed:", error?.message || error);
    process.exit(1);
  }
}

main();
