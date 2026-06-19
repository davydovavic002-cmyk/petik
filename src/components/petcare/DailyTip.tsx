"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";
import { PetIllustration } from "./visual/Decorations";

const TIPS: TranslationKey[] = ["tip1", "tip2", "tip3", "tip4"];

export function DailyTip() {
  const { translate } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % TIPS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <BentoCard variant="sage" className="relative overflow-hidden">
      <div className="absolute -right-4 -top-4 opacity-30">
        <PetIllustration type="cat" className="h-24 w-28" />
      </div>

      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold">{translate("tipTitle")}</h2>
            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
              {translate("tipLabel")}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm leading-relaxed text-zinc-700"
          >
            {translate(TIPS[index])}
          </motion.p>
        </AnimatePresence>

        <div className="mt-4 flex gap-1">
          {TIPS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${i === index ? "w-4 bg-[#3D6B4F]" : "w-1 bg-zinc-300 hover:bg-zinc-400"}`}
              aria-label={`Tip ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
