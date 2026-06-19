"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CLINIC_PHONE_RAW } from "@/lib/clinic/contact";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

export function QuickContact() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard variant="dark" className="flex h-full flex-col justify-between">
      <div>
        <h2 className="text-base font-semibold">{translate("quickTitle")}</h2>
        <p className="mt-1 text-xs leading-relaxed text-zinc-400">
          {translate("quickDesc")}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <a href={`tel:${CLINIC_PHONE_RAW}`} className="btn-emerald w-full py-2.5 text-sm">
          <Phone className="h-4 w-4" />
          {translate("quickCall")}
        </a>
        <button
          type="button"
          onClick={() => scrollToCell("appointment")}
          className="btn-ghost w-full border border-white/10 py-2.5 text-sm text-zinc-200 hover:bg-white/10"
        >
          {translate("quickBook")}
        </button>
      </div>
    </BentoCard>
  );
}
