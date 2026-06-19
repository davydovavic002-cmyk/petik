"use client";

import { Gift, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

export function LoyaltyProgram() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard className="relative overflow-hidden border-0 bg-gradient-to-br from-[#3D6B4F] via-[#4A7A5C] to-[#2F5540] text-white">
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-amber-400/20 blur-xl" />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <Gift className="h-5 w-5 text-amber-300" />
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            PetCare+
          </span>
        </div>

        <h2 className="text-xl font-bold">{translate("loyaltyTitle")}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          {translate("loyaltyDesc")}
        </p>

        <ul className="mt-4 space-y-2">
          {(["loyaltyPerk1", "loyaltyPerk2", "loyaltyPerk3"] as const).map((key) => (
            <li key={key} className="flex items-center gap-2 text-sm text-white/90">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-300" />
              {translate(key)}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => scrollToCell("appointment")}
          className="btn-emergency mt-5 w-full py-2.5 text-sm font-semibold"
        >
          {translate("loyaltyCta")}
        </button>
      </div>
    </BentoCard>
  );
}
