"use client";

import { Award, BadgeCheck, Shield, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BentoCard } from "./BentoCard";

const BADGES = [
  { icon: Shield, key: "cert1" as const, color: "text-emerald-600 bg-emerald-50" },
  { icon: Award, key: "cert2" as const, color: "text-blue-600 bg-blue-50" },
  { icon: BadgeCheck, key: "cert3" as const, color: "text-violet-600 bg-violet-50" },
  { icon: Star, key: "cert4" as const, color: "text-amber-600 bg-amber-50" },
];

export function Certifications() {
  const { translate } = useLanguage();

  return (
    <BentoCard className="relative overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-[#E8F0EA]">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">{translate("certTitle")}</h2>
        <p className="text-xs text-zinc-500">{translate("certSubtitle")}</p>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {BADGES.map(({ icon: Icon, key, color }) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/70 p-3 text-center shadow-sm transition-shadow hover:shadow-md"
          >
            <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-[11px] font-medium leading-tight text-zinc-700">
              {translate(key)}
            </p>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
