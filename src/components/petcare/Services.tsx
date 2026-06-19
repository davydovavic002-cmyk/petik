"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Smile, FlaskConical, Home, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

const SERVICES: {
  id: string;
  icon: typeof Scissors;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  {
    id: "surgery",
    icon: Scissors,
    titleKey: "serviceSurgery",
    descKey: "serviceSurgeryDesc",
  },
  {
    id: "dentistry",
    icon: Smile,
    titleKey: "serviceDentistry",
    descKey: "serviceDentistryDesc",
  },
  {
    id: "lab",
    icon: FlaskConical,
    titleKey: "serviceLab",
    descKey: "serviceLabDesc",
  },
  {
    id: "hotel",
    icon: Home,
    titleKey: "serviceHotel",
    descKey: "serviceHotelDesc",
  },
];

export function Services() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const [active, setActive] = useState(SERVICES[0].id);

  const selected = SERVICES.find((s) => s.id === active) ?? SERVICES[0];

  return (
    <BentoCard className="flex h-full flex-col">
      <header className="mb-3">
        <h2 className="text-lg font-semibold">{translate("servicesTitle")}</h2>
        <p className="text-xs text-zinc-500">{translate("servicesSubtitle")}</p>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {SERVICES.map(({ id, icon: Icon, titleKey }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={[
              "flex flex-col items-center gap-1 rounded-xl py-3 text-xs font-medium",
              active === id ? "btn-pill-active" : "btn-pill-inactive",
            ].join(" ")}
          >
            <Icon className="h-4 w-4" />
            {translate(titleKey)}
          </button>
        ))}
      </div>

      <motion.p
        key={selected.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600"
      >
        {translate(selected.descKey)}
      </motion.p>

      <button
        type="button"
        onClick={() => scrollToCell("appointment")}
        className="btn-primary mt-3 w-full py-2.5 text-sm"
      >
        <CalendarPlus className="h-4 w-4" />
        {translate("serviceBookCta")}
      </button>
    </BentoCard>
  );
}
