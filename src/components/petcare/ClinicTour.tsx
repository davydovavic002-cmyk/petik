"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { TOUR_IMAGES, type TourRoomId } from "@/lib/pets/images";
import { BentoCard } from "./BentoCard";

const ROOMS: {
  id: TourRoomId;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}[] = [
  { id: "reception", titleKey: "tourReception", descKey: "tourReceptionDesc" },
  { id: "lab", titleKey: "tourLab", descKey: "tourLabDesc" },
  { id: "surgery", titleKey: "tourSurgery", descKey: "tourSurgeryDesc" },
];

export function ClinicTour() {
  const { translate } = useLanguage();
  const [active, setActive] = useState(0);
  const room = ROOMS[active];

  return (
    <BentoCard className="relative flex h-full flex-col overflow-hidden">
      <header className="mb-3">
        <h2 className="text-lg font-semibold">{translate("tourTitle")}</h2>
        <p className="text-xs text-zinc-500">{translate("tourSubtitle")}</p>
      </header>

      <div className="flex gap-2">
        {ROOMS.map((r, i) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActive(i)}
            className={
              active === i ? "btn-pill-active flex-1 py-2 text-xs" : "btn-pill-inactive flex-1 py-2 text-xs"
            }
          >
            {translate(r.titleKey)}
          </button>
        ))}
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={room.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="relative aspect-[16/10] min-h-[160px] w-full md:aspect-auto md:min-h-[200px] md:h-full"
          >
            <Image
              src={TOUR_IMAGES[room.id]}
              alt={translate(room.titleKey)}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-semibold text-white">{translate(room.titleKey)}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/85">
                {translate(room.descKey)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </BentoCard>
  );
}
