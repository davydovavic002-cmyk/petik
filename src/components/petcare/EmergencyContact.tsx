"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CLINIC_PHONE_RAW } from "@/lib/clinic/contact";
import { BentoCard } from "./BentoCard";

export function EmergencyContact() {
  const { translate } = useLanguage();

  return (
    <BentoCard variant="emergency" className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
            24/7
          </span>
        </div>
        <h2 className="text-xl font-bold leading-tight">{translate("emergencyTitle")}</h2>
        <p className="mt-2 text-sm text-white/85">{translate("emergencySubtitle")}</p>
      </div>

      <a href={`tel:${CLINIC_PHONE_RAW}`} className="btn-emergency mt-4 w-full py-3 text-sm font-semibold">
        <Phone className="h-4 w-4" />
        {translate("emergencyCall")}
      </a>
    </BentoCard>
  );
}
