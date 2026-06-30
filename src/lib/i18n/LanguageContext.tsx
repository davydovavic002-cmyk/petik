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
import { syncLanguageToUrl } from "@/lib/embed/url";
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
  /** Sync from portfolio parent via postMessage */
  portfolioLanguage?: Language;
  defaultLanguage?: Language;
}

export function LanguageProvider({
  children,
  portfolioLanguage,
  defaultLanguage,
}: LanguageProviderProps) {
  const [internalLanguage, setInternalLanguage] = useState<Language>(
    defaultLanguage ?? "ru",
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (defaultLanguage !== undefined) {
      setInternalLanguage(defaultLanguage);
    } else {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored) setInternalLanguage(stored);
    }
    setMounted(true);
  }, [defaultLanguage]);

  useEffect(() => {
    if (portfolioLanguage) {
      setInternalLanguage(portfolioLanguage);
    }
  }, [portfolioLanguage]);

  const language = internalLanguage;

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, internalLanguage);
    document.documentElement.lang = internalLanguage;
  }, [mounted, internalLanguage]);

  const setLanguage = useCallback((next: Language) => {
    setInternalLanguage(next);
    syncLanguageToUrl(next);
  }, []);

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
