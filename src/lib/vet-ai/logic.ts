import type { Language } from "@/lib/i18n/types";

export type SymptomType = "lethargy" | "itch" | "vomit" | "appetite" | "diet" | "default";

interface SymptomPattern {
  type: SymptomType;
  keywords: string[];
}

const SYMPTOM_PATTERNS: SymptomPattern[] = [
  {
    type: "lethargy",
    keywords: [
      "вял",
      "вялый",
      "вялая",
      "letharg",
      "tired",
      "weak",
      "inactive",
      "հանգիստ",
      "թուլ",
      "անգործուն",
    ],
  },
  {
    type: "itch",
    keywords: [
      "чеш",
      "чешется",
      "зуд",
      "itch",
      "scratch",
      "քոր",
      "քորում",
      "կեղև",
    ],
  },
  {
    type: "vomit",
    keywords: [
      "рвот",
      "тошнит",
      "vomit",
      "throw up",
      "փախելոց",
      "փախում",
      "ոգար",
    ],
  },
  {
    type: "appetite",
    keywords: [
      "не ест",
      "аппетит",
      "appetite",
      "not eating",
      "refuse food",
      "ապետիտ",
      "չի ուտում",
      "սնունդ",
    ],
  },
  {
    type: "diet",
    keywords: [
      "рацион",
      "питани",
      "корм",
      "diet",
      "food",
      "nutrition",
      "feed",
      "սնունդ",
      "սննդակարգ",
      "կեր",
    ],
  },
];

export function detectSymptom(message: string): SymptomType {
  const normalized = message.toLowerCase().trim();

  for (const pattern of SYMPTOM_PATTERNS) {
    if (pattern.keywords.some((keyword) => normalized.includes(keyword))) {
      return pattern.type;
    }
  }

  return "default";
}

export function buildVetAiResponse(
  symptom: SymptomType,
  translate: (key: string) => string,
): string {
  const sections: Record<SymptomType, string[]> = {
    lethargy: [
      "symptomLethargyTitle",
      "symptomLethargyRisk",
      "symptomLethargyAdvice",
    ],
    itch: ["symptomItchTitle", "symptomItchRisk", "symptomItchAdvice"],
    vomit: ["symptomVomitTitle", "symptomVomitRisk", "symptomVomitAdvice"],
    appetite: [
      "symptomAppetiteTitle",
      "symptomAppetiteRisk",
      "symptomAppetiteAdvice",
    ],
    diet: ["vetAiDietGreeting"],
    default: ["vetAiDefaultResponse"],
  };

  const keys = sections[symptom];
  const body = keys.map((key) => translate(key)).join("\n\n");

  if (symptom !== "default" && symptom !== "diet") {
    return `${body}\n\n${translate("vetAiBookHint")}`;
  }

  return body;
}

export const ANALYSIS_DELAY_MS = 1400;
