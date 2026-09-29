import { Type, Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, brutal, comedic critique of the code in Hinglish with emojis.",
    },
    roastScore: {
      type: Type.INTEGER,
      description: "A roast score from 1 to 100.",
    },
    scoreVerdict: {
      type: Type.STRING,
      description: "Short uppercase verdict label like 'ATTENDANCE SHORT, CODE BHI SHORT'.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of identified issues and bugs in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level.",
          },
          title: {
            type: Type.STRING,
            description: "Short humorous title of the issue.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The faulty code snippet.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Humorous and technical explanation of what went wrong.",
          },
          expected: {
            type: Type.STRING,
            description: "How it should be written instead.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The fully corrected, complete program without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A short, memorable takeaway or motivational advice.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
