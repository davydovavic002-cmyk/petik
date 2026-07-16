"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { t, type TranslationKey } from "./translations";
import type { Language } from "./types";

const LANGUAGE: Language = "en";

interface LanguageContextValue {
  language: Language;
  translate: (key: TranslationKey, params?: Record<string, string | number>) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  useEffect(() => {
    document.documentElement.lang = LANGUAGE;
  }, []);

  const translate = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>) =>
      t(LANGUAGE, key, params),
    [],
  );

  const value = useMemo(
    () => ({ language: LANGUAGE, translate, mounted: true }),
    [translate],
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
