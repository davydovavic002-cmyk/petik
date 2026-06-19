"use client";

import { Heart, Cpu, Home } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BentoCard } from "./BentoCard";

const PILLARS = [
  { icon: Heart, key: "why1" as const },
  { icon: Cpu, key: "why2" as const },
  { icon: Home, key: "why3" as const },
];

export function WhyChooseUs() {
  const { translate } = useLanguage();

  return (
    <BentoCard className="h-full" pattern>
      <header className="relative mb-3">
        <h2 className="text-base font-semibold">{translate("whyTitle")}</h2>
        <p className="text-[10px] text-zinc-500">{translate("whySubtitle")}</p>
      </header>

      <ul className="relative space-y-2">
        {PILLARS.map(({ icon: Icon, key }) => (
          <li
            key={key}
            className="flex items-start gap-2.5 rounded-xl bg-white/70 p-2.5 text-xs leading-relaxed text-zinc-700"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E8F0EA] text-[#3D6B4F]">
              <Icon className="h-3.5 w-3.5" />
            </div>
            {translate(key)}
          </li>
        ))}
      </ul>
    </BentoCard>
  );
}
