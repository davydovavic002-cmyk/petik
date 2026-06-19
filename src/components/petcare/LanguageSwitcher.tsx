"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LANGUAGE_LABELS } from "@/lib/i18n/translations";
import type { Language } from "@/lib/i18n/types";
import { Globe } from "lucide-react";

const LANGUAGES: Language[] = ["ru", "en", "am"];

export function LanguageSwitcher() {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-zinc-500" />
      <span className="sr-only">{translate("languageLabel")}</span>
      <div className="flex rounded-2xl bg-white/80 p-1 shadow-sm ring-1 ring-[#EDE8DF]">
        {LANGUAGES.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            className={language === lang ? "btn-lang-active" : "btn-lang-inactive"}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        ))}
      </div>
    </div>
  );
}
