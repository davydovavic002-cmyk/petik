"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/types";
import type { ReactNode } from "react";
import { PortfolioEmbedBridge } from "./PortfolioEmbedBridge";

interface AppProvidersProps {
  children: ReactNode;
  /** Pass language from portfolio site to keep i18n in sync */
  language?: Language;
}

export function AppProviders({ children, language }: AppProvidersProps) {
  return (
    <LanguageProvider externalLanguage={language}>
      <PortfolioEmbedBridge />
      {children}
    </LanguageProvider>
  );
}
