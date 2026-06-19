"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

type PriceTab = "consult" | "diag" | "care";

const TABS: { id: PriceTab; labelKey: TranslationKey }[] = [
  { id: "consult", labelKey: "priceTabConsult" },
  { id: "diag", labelKey: "priceTabDiag" },
  { id: "care", labelKey: "priceTabCare" },
];

const PRICES: Record<PriceTab, { key: TranslationKey; amount: number }[]> = {
  consult: [
    { key: "priceConsultPrimary", amount: 150 },
    { key: "priceConsultRepeat", amount: 100 },
    { key: "priceConsultEmergency", amount: 250 },
  ],
  diag: [
    { key: "priceVaccination", amount: 80 },
    { key: "priceUltrasound", amount: 180 },
    { key: "priceBloodTest", amount: 120 },
  ],
  care: [
    { key: "priceGrooming", amount: 200 },
    { key: "priceDental", amount: 250 },
    { key: "priceVaccination", amount: 80 },
  ],
};

export function PriceList() {
  const { translate } = useLanguage();
  const { scrollToCell, showToast } = useBento();
  const [activeTab, setActiveTab] = useState<PriceTab>("consult");
  const [selectedKey, setSelectedKey] = useState<TranslationKey | null>(null);

  const formatPrice = (amount: number) =>
    `${amount} ${translate("priceCurrency")}`;

  const handleSelectService = (key: TranslationKey) => {
    setSelectedKey(key);
    showToast(`${translate(key)} — ${translate("priceBookCta")}`, "info");
  };

  const handleBook = () => {
    scrollToCell("appointment");
  };

  return (
    <BentoCard variant="sage" className="flex h-full flex-col">
      <header className="mb-4 flex items-start gap-2">
        <Tag className="mt-0.5 h-5 w-5 text-[#3D6B4F]" />
        <div>
          <h2 className="text-lg font-semibold">{translate("priceTitle")}</h2>
          <p className="text-sm text-zinc-600">{translate("priceSubtitle")}</p>
        </div>
      </header>

      <div className="mb-4 flex gap-1 rounded-2xl bg-white/60 p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "btn-tab-active" : "btn-tab-inactive"}
          >
            {translate(tab.labelKey)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-1 flex-col gap-2"
        >
          {PRICES[activeTab].map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => handleSelectService(item.key)}
                className={[
                  "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-left",
                  selectedKey === item.key
                    ? "btn-pill-active"
                    : "btn-pill-inactive",
                ].join(" ")}
              >
                <span>{translate(item.key)}</span>
                <span className="font-semibold">
                  {translate("priceFrom", { price: formatPrice(item.amount) })}
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <button type="button" onClick={handleBook} className="btn-dark mt-4 w-full py-2.5 text-sm">
        <CalendarPlus className="h-4 w-4" />
        {translate("priceBookCta")}
      </button>
    </BentoCard>
  );
}
