"use client";

import { Heart, Shield, Sparkles, MapPin, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

const STATS = [
  { value: "8+", key: "aboutStatYears" as const },
  { value: "12k+", key: "aboutStatPatients" as const },
  { value: "15", key: "aboutStatDoctors" as const },
];

const VALUES = ["aboutValue1", "aboutValue2", "aboutValue3"] as const;

export function AboutUs() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard className="flex h-full flex-col justify-between" pattern>
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#3D6B4F]">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{translate("aboutTitle")}</h2>
            <p className="text-xs text-zinc-500">{translate("aboutSubtitle")}</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{translate("aboutDescription")}</p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            className="rounded-2xl bg-white/70 px-3 py-3 text-center"
          >
            <p className="text-xl font-bold text-[#3D6B4F]">{stat.value}</p>
            <p className="text-xs text-zinc-500">{translate(stat.key)}</p>
          </div>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {VALUES.map((key) => (
          <li key={key} className="flex items-center gap-2 text-sm text-zinc-700">
            {key === "aboutValue2" ? (
              <Sparkles className="h-4 w-4 shrink-0 text-[#6B9B7A]" />
            ) : (
              <Shield className="h-4 w-4 shrink-0 text-[#6B9B7A]" />
            )}
            {translate(key)}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => scrollToCell("appointment")}
          className="btn-primary flex-1 py-2.5 text-sm"
        >
          <CalendarPlus className="h-4 w-4" />
          {translate("aboutCtaBook")}
        </button>
        <button
          type="button"
          onClick={() => scrollToCell("contact")}
          className="btn-secondary flex-1 py-2.5 text-sm"
        >
          <MapPin className="h-4 w-4" />
          {translate("aboutCtaContact")}
        </button>
      </div>
    </BentoCard>
  );
}
