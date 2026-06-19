"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { GALLERY_PETS } from "@/lib/pets/images";
import { BentoCard } from "./BentoCard";
import { PawPattern } from "./visual/Decorations";

export function PetGallery() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <BentoCard variant="sage" className="relative overflow-hidden">
      <PawPattern />
      <header className="relative mb-4">
        <h2 className="text-lg font-semibold">{translate("galleryTitle")}</h2>
        <p className="text-sm text-zinc-600">{translate("gallerySubtitle")}</p>
      </header>

      <div className="relative grid grid-cols-2 gap-2">
        {GALLERY_PETS.map((pet, i) => (
          <motion.button
            key={pet.id}
            type="button"
            onClick={() => scrollToCell("appointment")}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ scale: 1.03, y: -2 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-md transition-shadow hover:shadow-xl"
          >
            <Image
              src={pet.image}
              alt={translate(pet.labelKey)}
              fill
              sizes="(max-width: 768px) 45vw, 200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/75 via-zinc-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <span className="text-sm font-semibold text-white drop-shadow-sm">
                {translate(pet.labelKey)}
              </span>
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 transition group-hover:ring-white/40" />
          </motion.button>
        ))}
      </div>
    </BentoCard>
  );
}
