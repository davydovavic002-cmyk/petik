"use client";

import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import type { ReactNode } from "react";
import { PortfolioEmbedBridge } from "./PortfolioEmbedBridge";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LanguageProvider>
      <PortfolioEmbedBridge />
      {children}
    </LanguageProvider>
  );
}
