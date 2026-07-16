"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BENTO_SECTIONS } from "@/lib/bento/layout";
import type { BentoSectionId } from "@/lib/bento/layout";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#6B9B7A] to-[#3D6B4F] transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}

export function SiteHeader() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const [activeSection, setActiveSection] = useState<BentoSectionId>("discover");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionEls = BENTO_SECTIONS.map((s) => ({
      id: s.id,
      el: document.getElementById(`section-${s.id}`),
    }));

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const offset = 120;
      let current: BentoSectionId = "discover";

      for (const { id, el } of sectionEls) {
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: BentoSectionId) => {
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 isolate transition-all duration-300",
        scrolled
          ? "border-b border-[#EDE8DF]/80 bg-[#F5F1EB]/85 shadow-[0_4px_24px_rgba(120,90,60,0.06)] backdrop-blur-xl"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-ghost shrink-0 rounded-xl px-1 py-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3D6B4F] text-white shadow-sm transition-shadow hover:shadow-md">
            <PawPrint className="h-4 w-4" />
          </div>
          <span className="hidden font-semibold tracking-tight text-zinc-900 sm:inline">
            {translate("brandName")}
          </span>
        </button>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto md:flex"
          aria-label="Main"
        >
          {BENTO_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={
                activeSection === section.id ? "btn-nav-active" : "btn-nav-inactive"
              }
            >
              {translate(section.labelKey)}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToCell("appointment")}
            className="btn-primary hidden px-4 py-2 text-sm sm:inline-flex"
          >
            {translate("navBookCta")}
          </button>
        </div>
      </div>
    </header>
  );
}
