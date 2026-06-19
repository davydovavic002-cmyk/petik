"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { PET_IMAGES } from "@/lib/pets/images";
import { GlowOrb } from "./visual/Decorations";

const HERO_STATS = [
  { valueKey: "heroStatRatingValue" as const, key: "heroStatRating" as const, icon: Sparkles },
  { valueKey: "heroStatPatientsValue" as const, key: "heroStatPatients" as const, icon: Shield },
  { valueKey: "heroStatWaitValue" as const, key: "heroStatWait" as const, icon: Clock },
];

export function HeroSection() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <section className="relative mb-10 pb-4 pt-6 md:mb-14 md:pt-10">
      <GlowOrb className="-left-24 -top-24 h-[22rem] w-[22rem] md:-left-32 md:-top-32 md:h-[28rem] md:w-[28rem]" />
      <GlowOrb color="#F0A060" className="-right-20 top-8 h-56 w-56 md:-right-24 md:top-10 md:h-64 md:w-64" />

      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4E4D8] bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#3D6B4F] shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {translate("heroBadge")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 md:text-5xl lg:text-[3.5rem]"
          >
            {translate("heroTitle")}
            <span className="mt-1 block bg-gradient-to-r from-[#3D6B4F] to-[#6B9B7A] bg-clip-text text-transparent">
              {translate("heroTitleAccent")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-lg text-lg leading-relaxed text-zinc-600"
          >
            {translate("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToCell("vet-ai")}
              className="btn-primary px-6 py-3 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              {translate("heroCtaAi")}
            </button>
            <button
              type="button"
              onClick={() => scrollToCell("appointment")}
              className="btn-secondary px-6 py-3 text-sm"
            >
              {translate("heroCtaBook")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-10 grid grid-cols-3 gap-3"
          >
            {HERO_STATS.map(({ valueKey, key, icon: Icon }, i) => (
              <div
                key={key}
                className="rounded-2xl border border-[#EDE8DF]/80 bg-white/60 p-3 backdrop-blur-sm transition-shadow hover:shadow-md"
              >
                <Icon className="mb-1 h-4 w-4 text-[#6B9B7A]" />
                <p className="text-xl font-bold text-zinc-900">{translate(valueKey)}</p>
                <p className="text-[11px] leading-tight text-zinc-500">{translate(key)}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile hero image */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-[#EDE8DF] shadow-lg lg:hidden">
          <Image
            src={PET_IMAGES.hero}
            alt={translate("heroImageAlt")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3D6B4F]/30 to-transparent" />
        </div>

        {/* Desktop visual mosaic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-[#EDE8DF] shadow-[0_24px_64px_rgba(120,90,60,0.12)]">
            <Image
              src={PET_IMAGES.hero}
              alt={translate("heroImageAlt")}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D6B4F]/25 via-transparent to-transparent" />

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute left-4 top-4 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md"
            >
              <p className="text-xs text-zinc-500">{translate("heroFloatAi")}</p>
              <p className="font-semibold text-[#3D6B4F]">Vet-AI online</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 right-4 rounded-2xl border border-white/60 bg-zinc-900/90 px-4 py-3 text-white shadow-lg backdrop-blur-md"
            >
              <p className="text-xs text-zinc-400">{translate("heroFloatQueue")}</p>
              <p className="font-semibold text-emerald-300">{translate("clinicNoQueue")}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
