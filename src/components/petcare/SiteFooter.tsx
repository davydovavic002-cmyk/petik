"use client";

import { Shield, Award, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function SiteFooter() {
  const { translate } = useLanguage();
  const year = new Date().getFullYear();

  const badges = [
    { icon: Shield, text: translate("footerBadge1") },
    { icon: Award, text: translate("footerBadge2") },
    { icon: Heart, text: translate("footerBadge3") },
  ];

  return (
    <footer className="mx-auto max-w-7xl px-4 pb-28 pt-8 md:px-6 md:pb-12">
      <div className="rounded-3xl border border-[#EDE8DF] bg-[#FAF7F2]/80 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {badges.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#3D6B4F]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-zinc-600">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 border-t border-[#EDE8DF] pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {translate("brandName")}. {translate("footerRights")}
          </p>
          <p>{translate("footerMadeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
