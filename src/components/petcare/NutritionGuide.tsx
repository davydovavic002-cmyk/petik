"use client";

import { Utensils } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

const FOODS = [
  { emoji: "🥩", key: "nutritionProtein" as const },
  { emoji: "🥕", key: "nutritionVeg" as const },
  { emoji: "💧", key: "nutritionWater" as const },
];

export function NutritionGuide() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard className="relative overflow-hidden">
      <div className="absolute -left-4 top-0 text-6xl opacity-[0.06]">🍽</div>

      <header className="relative mb-3 flex items-center gap-2">
        <Utensils className="h-5 w-5 text-[#3D6B4F]" />
        <div>
          <h2 className="text-base font-semibold">{translate("nutritionTitle")}</h2>
          <p className="text-[10px] text-zinc-500">{translate("nutritionSubtitle")}</p>
        </div>
      </header>

      <div className="space-y-2">
        {FOODS.map(({ emoji, key }) => (
          <div
            key={key}
            className="flex items-start gap-3 rounded-xl border border-[#EDE8DF] bg-white/60 p-3 transition-shadow hover:shadow-sm"
          >
            <span className="text-xl">{emoji}</span>
            <p className="text-xs leading-relaxed text-zinc-600">{translate(key)}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToCell("vet-ai")}
        className="btn-secondary relative mt-3 w-full py-2 text-xs"
      >
        {translate("nutritionCta")}
      </button>
    </BentoCard>
  );
}
