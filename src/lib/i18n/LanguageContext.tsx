"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { t, type TranslationKey } from "./translations";
import type { Language } from "./types";

const STORAGE_KEY = "petcare-language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: TranslationKey, params?: Record<string, string | number>) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  externalLanguage?: Language;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  externalLanguage,
  defaultLanguage = "ru",
}: LanguageProviderProps) {
  const [internalLanguage, setInternalLanguage] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!externalLanguage) {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored) setInternalLanguage(stored);
    }
    setMounted(true);
  }, [externalLanguage]);

  const language = externalLanguage ?? internalLanguage;

  useEffect(() => {
    if (!mounted || externalLanguage) return;
    localStorage.setItem(STORAGE_KEY, internalLanguage);
    document.documentElement.lang = language;
  }, [mounted, externalLanguage, internalLanguage, language]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (!externalLanguage) setInternalLanguage(next);
    },
    [externalLanguage],
  );

  const translate = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) =>
      t(language, key, params),
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, translate, mounted }),
    [language, setLanguage, translate, mounted],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
