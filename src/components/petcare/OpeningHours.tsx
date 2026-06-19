"use client";

import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

const DAYS = ["hoursMon", "hoursSat", "hoursSun"] as const;

export function OpeningHours() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard variant="sage" className="h-full">
      <header className="mb-3 flex items-center gap-2">
        <Clock className="h-5 w-5 text-[#3D6B4F]" />
        <div>
          <h2 className="text-base font-semibold">{translate("hoursTitle")}</h2>
          <p className="text-[10px] text-zinc-500">{translate("hoursSubtitle")}</p>
        </div>
      </header>

      <ul className="space-y-2 text-sm">
        {DAYS.map((key) => (
          <li
            key={key}
            className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2"
          >
            <span className="text-zinc-600">{translate(key)}</span>
            <span className="font-medium text-zinc-900">{translate("hoursTime")}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => scrollToCell("contact")}
        className="btn-secondary mt-3 w-full py-2 text-xs"
      >
        <MapPin className="h-3.5 w-3.5" />
        {translate("hoursCta")}
      </button>
    </BentoCard>
  );
}
