"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ITEMS = [
  "trustItem1",
  "trustItem2",
  "trustItem3",
  "trustItem4",
  "trustItem5",
] as const;

export function TrustMarquee() {
  const { translate } = useLanguage();
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#EDE8DF]/80 bg-white/50 py-3 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F5F1EB] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F5F1EB] to-transparent" />

      <motion.div
        className="flex w-max gap-8 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      >
        {doubled.map((key, i) => (
          <span
            key={`${key}-${i}`}
            className="flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B9B7A]" />
            {translate(key)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
