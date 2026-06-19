"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BENTO_SECTIONS, getCellsBySection } from "@/lib/bento/layout";
import type { BentoSectionId } from "@/lib/bento/layout";
import { BentoCell } from "./BentoCell";
import { HeroSection } from "./HeroSection";
import { TrustMarquee } from "./TrustMarquee";
import { QuickAccessStrip } from "./QuickAccessStrip";

function SectionHeader({
  sectionId,
  isFirst,
}: {
  sectionId: BentoSectionId;
  isFirst: boolean;
}) {
  const { translate } = useLanguage();
  const section = BENTO_SECTIONS.find((s) => s.id === sectionId)!;

  return (
    <div
      className={[
        "col-span-1 flex items-end justify-between gap-4 md:col-span-6 lg:col-span-12",
        isFirst ? "pt-0" : "mt-4 border-t border-[#EDE8DF]/70 pt-6 md:mt-5 md:pt-7",
      ].join(" ")}
    >
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B9B7A]">
          {translate("sectionLabel")}
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 md:text-2xl">
          {translate(section.labelKey)}
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
          {translate(section.descKey)}
        </p>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-[#D4E4D8] to-transparent md:ml-8 md:block" />
    </div>
  );
}

export function BentoGrid() {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6">
      <HeroSection />
      <TrustMarquee />
      <QuickAccessStrip />

      {/* Single continuous grid — no per-section gaps */}
      <div
        id="bento-grid"
        className="grid grid-cols-1 gap-3 md:grid-cols-6 md:gap-3 lg:grid-cols-12 lg:gap-3"
      >
        {BENTO_SECTIONS.map((section, index) => {
          const cells = getCellsBySection(section.id);

          return (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="contents scroll-mt-28"
            >
              <SectionHeader sectionId={section.id} isFirst={index === 0} />
              {cells.map((cell) => {
                const Component = cell.component;
                return (
                  <BentoCell key={cell.id} cell={cell}>
                    <Component />
                  </BentoCell>
                );
              })}
            </section>
          );
        })}
      </div>
    </div>
  );
}
