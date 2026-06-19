"use client";

import {
  CalendarPlus,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Receipt,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { QUICK_ACCESS, type QuickAccessCellId } from "@/lib/bento/layout";
import { CLINIC_PHONE_RAW } from "@/lib/clinic/contact";

const QUICK_ACCESS_ICONS: Record<QuickAccessCellId, typeof Phone> = {
  emergency: Phone,
  "vet-ai": MessageCircle,
  appointment: CalendarPlus,
  price: Receipt,
  "opening-hours": Clock,
  contact: MapPin,
};

export function QuickAccessStrip() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  return (
    <nav
      aria-label={translate("quickAccessLabel")}
      className="mb-6 -mx-1 overflow-x-auto pb-1 md:mb-8"
    >
      <div className="flex min-w-max gap-2 px-1">
        {QUICK_ACCESS.map(({ id, labelKey }) => {
          const Icon = QUICK_ACCESS_ICONS[id];
          const isEmergency = id === "emergency";

          if (isEmergency) {
            return (
              <a
                key={id}
                href={`tel:${CLINIC_PHONE_RAW}`}
                className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
              >
                <Icon className="h-4 w-4 shrink-0" />
                {translate(labelKey)}
              </a>
            );
          }

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollToCell(id)}
              className="inline-flex items-center gap-2 rounded-full border border-[#EDE8DF] bg-white/80 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm transition-colors hover:border-[#D4E4D8] hover:bg-white hover:text-[#3D6B4F]"
            >
              <Icon className="h-4 w-4 shrink-0 text-[#6B9B7A]" />
              {translate(labelKey)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
