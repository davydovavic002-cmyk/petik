"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Cat, Dog, Bird, CheckCircle2, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { formatDate, formatTime } from "@/lib/i18n/format";
import type { PetType } from "@/lib/i18n/types";
import { BentoCard } from "./BentoCard";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "14:00", "16:30", "18:00"];

const PET_TYPES: { id: PetType; icon: typeof Cat; labelKey: "petCat" | "petDog" | "petExotic" }[] = [
  { id: "cat", icon: Cat, labelKey: "petCat" },
  { id: "dog", icon: Dog, labelKey: "petDog" },
  { id: "exotic", icon: Bird, labelKey: "petExotic" },
];

function getAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}

export function AppointmentForm() {
  const { language, translate } = useLanguage();
  const { showToast } = useBento();
  const dates = useMemo(() => getAvailableDates(), []);

  const [viewStep, setViewStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [petType, setPetType] = useState<PetType | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const completedStep = !selectedDate ? 0 : !selectedTime ? 1 : !petType ? 2 : 3;
  const hasSelection = selectedDate && selectedTime && petType;

  const handleBook = () => {
    if (!hasSelection) return;

    setIsSubmitting(true);
    setPulseKey((k) => k + 1);

    setTimeout(() => {
      const message = translate("appointmentSuccess", {
        date: formatDate(selectedDate, language),
        time: formatTime(selectedTime, language),
      });
      setSuccessMessage(message);
      showToast(message, "success");
      setIsSubmitting(false);
    }, 800);
  };

  const handlePrimaryAction = () => {
    if (viewStep < 3) {
      setViewStep((s) => s + 1);
      return;
    }
    handleBook();
  };

  const canProceed =
    (viewStep === 1 && selectedDate) ||
    (viewStep === 2 && selectedTime) ||
    (viewStep === 3 && petType);

  return (
    <BentoCard variant="sage" className="flex h-full min-h-[360px] flex-col" subtleHover>
      <header className="mb-4">
        <div className="mb-1 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#3D6B4F]" />
          <h2 className="text-lg font-semibold">{translate("appointmentTitle")}</h2>
        </div>
        <p className="text-sm text-zinc-600">{translate("appointmentSubtitle")}</p>
      </header>

      <div className="mb-5 flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => completedStep >= s - 1 && setViewStep(s)}
              className={[
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition",
                completedStep >= s
                  ? "bg-[#3D6B4F] text-white"
                  : viewStep === s
                    ? "bg-zinc-900 text-white ring-2 ring-[#6B9B7A]/40 ring-offset-2"
                    : "bg-white/80 text-zinc-400",
              ].join(" ")}
            >
              {completedStep >= s ? "✓" : s}
            </button>
            {s < 3 && (
              <div
                className={[
                  "h-0.5 flex-1 rounded-full transition",
                  completedStep >= s ? "bg-[#3D6B4F]" : "bg-white/80",
                ].join(" ")}
              />
            )}
          </div>
        ))}
      </div>

      <motion.div
        key={pulseKey}
        animate={pulseKey > 0 ? { scale: [1, 1.015, 1] } : {}}
        transition={{ duration: 0.45 }}
        className="flex flex-1 flex-col"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={viewStep}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {viewStep === 1 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {translate("appointmentDate")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dates.map((date) => (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => {
                        setSelectedDate(date);
                        setSuccessMessage(null);
                        setViewStep(2);
                      }}
                        className={
                          selectedDate?.toDateString() === date.toDateString()
                            ? "btn-pill-active"
                            : "btn-pill-inactive"
                        }
                    >
                      {formatDate(date, language).split(",")[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {viewStep === 2 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {translate("appointmentTime")}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        setSuccessMessage(null);
                        setViewStep(3);
                      }}
                      className={
                        selectedTime === time ? "btn-pill-active" : "btn-pill-inactive"
                      }
                    >
                      {formatTime(time, language)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {viewStep === 3 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {translate("appointmentPetType")}
                </p>
                <div className="flex gap-2">
                  {PET_TYPES.map(({ id, icon: Icon, labelKey }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setPetType(id);
                        setSuccessMessage(null);
                      }}
                      className={[
                        "flex flex-1 flex-col items-center gap-1 rounded-xl py-3 text-sm",
                        petType === id ? "btn-pill-active" : "btn-pill-inactive",
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                      {translate(labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {successMessage ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-start gap-2 rounded-2xl bg-white/90 p-3 text-sm text-[#2F5540]"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3D6B4F]" />
            <p>{successMessage}</p>
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            type="button"
            onClick={handlePrimaryAction}
            disabled={!canProceed || isSubmitting}
            whileTap={{ scale: 0.98 }}
            className="btn-dark mt-4 w-full py-3 text-sm disabled:opacity-50"
          >
            {viewStep < 3 ? (
              <>
                {translate("appointmentNext")}
                <ChevronRight className="h-4 w-4" />
              </>
            ) : isSubmitting ? (
              "…"
            ) : (
              translate("appointmentBook")
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </BentoCard>
  );
}
