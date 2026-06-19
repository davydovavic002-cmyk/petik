"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

const REVIEWS: { textKey: TranslationKey; authorKey: TranslationKey }[] = [
  { textKey: "review1Text", authorKey: "review1Author" },
  { textKey: "review2Text", authorKey: "review2Author" },
  { textKey: "review3Text", authorKey: "review3Author" },
];

export function Reviews() {
  const { translate } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <BentoCard variant="warm" className="flex h-full flex-col">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{translate("reviewsTitle")}</h2>
          <p className="text-xs text-zinc-500">{translate("reviewsSubtitle")}</p>
        </div>
        <div className="flex gap-0.5 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
      </header>

      <div className="relative flex flex-1 flex-col justify-between">
        <Quote className="h-8 w-8 text-[#D4E4D8]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm leading-relaxed text-zinc-700">
              {translate(REVIEWS[index].textKey)}
            </p>
            <p className="mt-3 text-sm font-medium text-[#3D6B4F]">
              — {translate(REVIEWS[index].authorKey)}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-1.5">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={[
                "btn-base h-1.5 rounded-full p-0 hover:-translate-y-0 hover:shadow-none",
                i === index ? "w-5 bg-[#3D6B4F]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400",
              ].join(" ")}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
