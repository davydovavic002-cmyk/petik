"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  isPortfolioEmbed,
  reportHeight,
  scheduleHeightReports,
} from "@/embed/portfolioEmbed";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PortfolioEmbedBridge() {
  const pathname = usePathname();
  const { language } = useLanguage();

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    scheduleHeightReports();

    const onLoad = () => scheduleHeightReports();
    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;
    scheduleHeightReports();
  }, [pathname, language]);

  useEffect(() => {
    if (!isPortfolioEmbed()) return;

    const sentinel = document.getElementById("embed-height-sentinel");
    const main = document.querySelector("main");

    const observer = new ResizeObserver(() => reportHeight());
    if (sentinel) observer.observe(sentinel);
    if (main) observer.observe(main);

    return () => observer.disconnect();
  }, []);

  return null;
}
