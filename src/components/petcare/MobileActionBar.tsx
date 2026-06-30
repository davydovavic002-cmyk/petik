"use client";

import { CalendarPlus, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { CLINIC_PHONE_RAW } from "@/lib/clinic/contact";

export function MobileActionBar() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();

  const actions = [
    {
      id: "chat",
      icon: MessageCircle,
      label: translate("mobileActionChat"),
      onClick: () => scrollToCell("vet-ai"),
    },
    {
      id: "book",
      icon: CalendarPlus,
      label: translate("mobileActionBook"),
      onClick: () => scrollToCell("appointment"),
      primary: true as const,
    },
    {
      id: "call",
      icon: Phone,
      label: translate("mobileActionCall"),
      href: `tel:${CLINIC_PHONE_RAW}`,
    },
  ];

  return (
    <div className="mobile-action-bar fixed inset-x-4 bottom-4 z-40 md:hidden">
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#EDE8DF]/80 bg-white/90 p-2 shadow-[0_12px_40px_rgba(120,90,60,0.14)] backdrop-blur-xl">
        {actions.map(({ id, icon: Icon, label, onClick, href, primary }) => {
          const className = [
            "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium",
            primary ? "btn-primary shadow-sm" : "btn-ghost hover:bg-zinc-50",
          ].join(" ");

          if (href) {
            return (
              <a key={id} href={href} className={className}>
                <Icon className="h-4 w-4" />
                {label}
              </a>
            );
          }

          return (
            <button key={id} type="button" onClick={onClick} className={className}>
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
