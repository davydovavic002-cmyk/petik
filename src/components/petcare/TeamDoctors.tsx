"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

const DOCTORS: {
  id: string;
  nameKey: TranslationKey;
  roleKey: TranslationKey;
  color: string;
}[] = [
  { id: "1", nameKey: "teamDoctor1Name", roleKey: "teamDoctor1Role", color: "#D4E4D8" },
  { id: "2", nameKey: "teamDoctor2Name", roleKey: "teamDoctor2Role", color: "#E8E0F0" },
  { id: "3", nameKey: "teamDoctor3Name", roleKey: "teamDoctor3Role", color: "#F0E8D4" },
];

export function TeamDoctors() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const [active, setActive] = useState(0);

  return (
    <BentoCard variant="sage" className="flex h-full flex-col">
      <header className="mb-3 flex items-center gap-2">
        <Stethoscope className="h-5 w-5 text-[#3D6B4F]" />
        <div>
          <h2 className="text-lg font-semibold">{translate("teamTitle")}</h2>
          <p className="text-xs text-zinc-500">{translate("teamSubtitle")}</p>
        </div>
      </header>

      <div className="flex gap-2">
        {DOCTORS.map((doc, index) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => setActive(index)}
            className={[
              "btn-base flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
              active === index
                ? "ring-2 ring-[#3D6B4F] ring-offset-2 hover:-translate-y-0.5"
                : "opacity-80 hover:opacity-100 hover:ring-2 hover:ring-[#D4E4D8] hover:ring-offset-1",
            ].join(" ")}
            style={{ backgroundColor: doc.color }}
            aria-label={translate(doc.nameKey)}
          >
            {translate(doc.nameKey).charAt(0)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="mt-4 flex-1 rounded-2xl bg-white/70 p-4"
        >
          <p className="font-semibold text-zinc-900">
            {translate(DOCTORS[active].nameKey)}
          </p>
          <p className="mt-1 text-sm text-[#3D6B4F]">
            {translate(DOCTORS[active].roleKey)}
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={() => scrollToCell("appointment")}
        className="btn-primary mt-4 w-full py-2.5 text-sm"
      >
        <CalendarPlus className="h-4 w-4" />
        {translate("teamBookCta")}
      </button>
    </BentoCard>
  );
}
