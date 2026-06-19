"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { BentoCard } from "./BentoCard";

interface ClinicMetrics {
  queueMinutes: number;
  patientsToday: number;
  isBusy: boolean;
}

function getDeterministicMetrics(): ClinicMetrics {
  const hour = new Date().getHours();
  const isPeak = hour >= 10 && hour <= 18;
  const queueMinutes = isPeak ? 12 : 3;
  const patientsToday = 18;

  return { queueMinutes, patientsToday, isBusy: queueMinutes > 15 };
}

function getRandomMetrics(): ClinicMetrics {
  const hour = new Date().getHours();
  const isPeak = hour >= 10 && hour <= 18;
  const queueMinutes = isPeak ? Math.floor(Math.random() * 25) : Math.floor(Math.random() * 8);
  const patientsToday = 12 + Math.floor(Math.random() * 18);

  return { queueMinutes, patientsToday, isBusy: queueMinutes > 15 };
}

export function ClinicStatus() {
  const { translate } = useLanguage();
  const [metrics, setMetrics] = useState<ClinicMetrics>(getDeterministicMetrics);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMetrics(getRandomMetrics());

    const interval = setInterval(() => {
      setMetrics(getRandomMetrics());
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard variant="dark">
      <header>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{translate("clinicStatusTitle")}</h2>
          <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-xs text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {translate("clinicStatusLive")}
          </span>
        </div>
      </header>

      <div className="mt-4 space-y-4">
        <motion.div
          key={metrics.isBusy ? "busy" : "free"}
          initial={mounted ? { opacity: 0.6 } : false}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"
        >
          <div
            className={[
              "flex h-10 w-10 items-center justify-center rounded-xl",
              metrics.isBusy
                ? "bg-amber-500/20 text-amber-300"
                : "bg-emerald-500/20 text-emerald-300",
            ].join(" ")}
          >
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">
              {translate(metrics.isBusy ? "clinicDoctorsBusy" : "clinicDoctorsFree")}
            </p>
            <p className="text-sm text-zinc-400">
              {metrics.queueMinutes === 0
                ? translate("clinicNoQueue")
                : translate("clinicQueue", { minutes: metrics.queueMinutes })}
            </p>
          </div>
        </motion.div>

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Users className="h-4 w-4" />
          {translate("clinicPatients", { count: metrics.patientsToday })}
        </div>
      </div>
    </BentoCard>
  );
}
