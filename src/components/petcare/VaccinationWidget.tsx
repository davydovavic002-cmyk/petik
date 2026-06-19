"use client";

import { Syringe, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

export function VaccinationWidget() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const daysLeft = 14;

  return (
    <BentoCard>
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#3D6B4F]">
            <Syringe className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold">{translate("vaccinationTitle")}</h2>
            <p className="text-xs text-zinc-500">{translate("vaccinationSubtitle")}</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-white/70 p-3">
          <p className="text-xs text-zinc-500">{translate("vaccinationNext")}</p>
          <p className="mt-1 font-semibold text-zinc-900">
            {translate("vaccinationPetName")} · {translate("priceVaccination")}
          </p>
          <p className="mt-1 text-sm text-[#3D6B4F]">
            {translate("vaccinationInDays", { days: daysLeft })}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollToCell("appointment")}
        className="btn-secondary mt-4 w-full py-2.5 text-sm text-[#3D6B4F]"
      >
        <CalendarPlus className="h-4 w-4" />
        {translate("vaccinationBook")}
      </button>
    </BentoCard>
  );
}
