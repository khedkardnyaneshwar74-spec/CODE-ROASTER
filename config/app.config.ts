export const APP = {
  name: "Code Roaster",
  version: "v3",
  tagline: "Your code. Our problem now.",
  subtitle: "Desi debugging, powered by Gemini.",
  eventTag: "DevFest Nashik 2026",
  footerAttribution: "Made at GDG Nashik Pre-DevFest Workshop",
} as const;

export const AI = {
  model: "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Halka",
    sublabel: "Dry",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Tikha",
    sublabel: "Sharp",
    description: "Pointed and witty. Calls out every mistake directly.",
  },
  {
    id: "savage",
    label: "Zanzanit",
    sublabel: "Savage 🌶️",
    description: "Maximum burn. Brutally honest, but still technically accurate.",
  },
] as const;

export const PERSONAS = [
  { id: "hostel_bhau", name: "Hostel Bhau", emoji: "😎", desc: "Senior room partner who has seen it all" },
  { id: "standup", name: "Stand-up Roaster", emoji: "🎤", desc: "Open-mic comic finding punchlines in stack traces" },
  { id: "sharma_ji", name: "Sharma ji ka Beta", emoji: "🏆", desc: "Did 500 LeetCode hards before breakfast" },
  { id: "professor", name: "Strict Professor", emoji: "👓", desc: "Will cut 10 marks for indentation" },
  { id: "recruiter", name: "Campus Recruiter", emoji: "💼", desc: "Looking for 10 years experience in a 2-year-old framework" },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
  persona: "hostel_bhau",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += numbers  # Bug: adding the entire list instead of 'number'
    return total / len(numbers)

print(calculate_average([10, 20, 30, 40]))`,
} as const;
