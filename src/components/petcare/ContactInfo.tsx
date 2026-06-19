"use client";

import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  CLINIC_EMAIL,
  CLINIC_MAPS_URL,
  CLINIC_PHONE_RAW,
} from "@/lib/clinic/contact";
import { BentoCard } from "./BentoCard";

export function ContactInfo() {
  const { translate } = useLanguage();

  const openMaps = () => window.open(CLINIC_MAPS_URL, "_blank", "noopener,noreferrer");

  const items = [
    {
      icon: MapPin,
      text: translate("contactAddress"),
      onClick: openMaps,
      label: translate("contactOpenMap"),
    },
    {
      icon: Clock,
      text: translate("contactHours"),
    },
    {
      icon: Phone,
      text: translate("contactPhone"),
      href: `tel:${CLINIC_PHONE_RAW}`,
      label: translate("emergencyCall"),
    },
    {
      icon: Mail,
      text: translate("contactEmail"),
      href: `mailto:${CLINIC_EMAIL}`,
      label: translate("contactEmail"),
    },
  ];

  return (
    <BentoCard variant="dark" className="flex h-full flex-col">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">{translate("contactTitle")}</h2>
        <p className="text-sm text-zinc-400">{translate("contactSubtitle")}</p>
      </header>

      <ul className="space-y-3">
        {items.map(({ icon: Icon, text, href, onClick, label }) => (
          <li key={text} className="flex items-start gap-3 text-sm">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {href ? (
              <a href={href} className="btn-link text-zinc-300">
                {text}
              </a>
            ) : onClick ? (
              <button type="button" onClick={onClick} className="btn-link text-left text-zinc-300">
                {text}
              </button>
            ) : (
              <span className="text-zinc-300">{text}</span>
            )}
            {(href || onClick) && label && (
              <span className="sr-only">{label}</span>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={openMaps}
        className="mt-4 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white/5 p-4 text-left transition-all duration-200 hover:bg-white/10 hover:shadow-inner"
      >
        <div className="flex min-h-[80px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-zinc-400 transition-colors group-hover:border-emerald-400/30">
          <MapPin className="mb-2 h-6 w-6 text-emerald-400" />
          <span className="font-medium text-zinc-300">{translate("contactOpenMap")}</span>
          <span className="mt-1 text-zinc-500">Warsaw, Poland</span>
        </div>
      </button>

      <a
        href={CLINIC_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-emerald mt-4 w-full py-2.5 text-sm"
      >
        <Navigation className="h-4 w-4" />
        {translate("contactRoute")}
      </a>
    </BentoCard>
  );
}
