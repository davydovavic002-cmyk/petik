"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

const FAQ_KEYS: { q: TranslationKey; a: TranslationKey }[] = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
];

export function FaqCard() {
  const { translate } = useLanguage();
  const [open, setOpen] = useState(0);

  return (
    <BentoCard className="relative overflow-hidden">
      <header className="mb-4 flex items-start gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#3D6B4F]">
          <HelpCircle className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{translate("faqTitle")}</h2>
          <p className="text-xs text-zinc-500">{translate("faqSubtitle")}</p>
        </div>
      </header>

      <div className="space-y-2">
        {FAQ_KEYS.map((item, i) => (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-[#EDE8DF] bg-white/70"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              className="btn-ghost flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-zinc-800 hover:bg-white"
            >
              {translate(item.q)}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-[#EDE8DF] px-4 py-3 text-sm leading-relaxed text-zinc-600">
                    {translate(item.a)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}
