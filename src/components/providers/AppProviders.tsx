"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/types";
import type { ReactNode } from "react";
import { PortfolioEmbedBridge } from "./PortfolioEmbedBridge";

interface AppProvidersProps {
  children: ReactNode;
  /** Sync from portfolio parent via postMessage */
  portfolioLanguage?: Language;
  defaultLanguage?: Language;
}

export function AppProviders({
  children,
  portfolioLanguage,
  defaultLanguage,
}: AppProvidersProps) {
  return (
    <LanguageProvider
      portfolioLanguage={portfolioLanguage}
      defaultLanguage={defaultLanguage}
    >
      <PortfolioEmbedBridge />
      {children}
    </LanguageProvider>
  );
}
