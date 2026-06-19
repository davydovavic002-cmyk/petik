"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { GALLERY_PETS } from "@/lib/pets/images";
import { BentoCard } from "./BentoCard";

const EVENTS: TranslationKey[] = ["live1", "live2", "live3", "live4", "live5"];

export function LiveActivity() {
  const { translate } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % EVENTS.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <BentoCard variant="dark" className="relative overflow-hidden">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />

      <header className="mb-3 flex items-center gap-2">
        <Activity className="h-4 w-4 text-emerald-400" />
        <h2 className="text-base font-semibold">{translate("liveTitle")}</h2>
        <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          LIVE
        </span>
      </header>

      <div className="relative h-12 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute inset-0 text-sm leading-relaxed text-zinc-300"
          >
            {translate(EVENTS[index])}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex -space-x-2">
        {GALLERY_PETS.map((pet) => (
          <div
            key={pet.id}
            className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-zinc-800"
          >
            <Image src={pet.image} alt={pet.id} fill sizes="32px" className="object-cover" />
          </div>
        ))}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-zinc-800 bg-emerald-600 text-[10px] font-bold text-white">
          +9
        </div>
      </div>
    </BentoCard>
  );
}
