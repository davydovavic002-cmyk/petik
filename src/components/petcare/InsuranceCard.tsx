"use client";

import { CreditCard, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BentoCard } from "./BentoCard";

const PARTNERS = ["insPartner1", "insPartner2", "insPartner3"] as const;

export function InsuranceCard() {
  const { translate } = useLanguage();

  return (
    <BentoCard variant="sage" className="relative overflow-hidden">
      <header className="mb-3 flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-[#3D6B4F]" />
        <div>
          <h2 className="text-base font-semibold">{translate("insTitle")}</h2>
          <p className="text-[10px] text-zinc-500">{translate("insSubtitle")}</p>
        </div>
      </header>

      <div className="space-y-2">
        {PARTNERS.map((key) => (
          <div
            key={key}
            className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2.5 text-sm transition-shadow hover:shadow-md"
          >
            <Check className="h-4 w-4 shrink-0 text-[#3D6B4F]" />
            <span className="font-medium text-zinc-700">{translate(key)}</span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-500">{translate("insNote")}</p>
    </BentoCard>
  );
}
