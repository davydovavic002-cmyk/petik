"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, RotateCcw, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import { BentoCard } from "./BentoCard";

const QUESTION_KEYS = ["healthQ1", "healthQ2", "healthQ3"] as const;

export function HealthChecklist() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([null, null, null]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (value: boolean) => {
    const next = [...answers];
    next[currentStep] = value;
    setAnswers(next);

    if (currentStep < QUESTION_KEYS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([null, null, null]);
    setIsComplete(false);
  };

  const allPositive = answers.every((a) => a === true);

  return (
    <BentoCard subtleHover>
      <header className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F0EA] text-[#3D6B4F]">
          <ClipboardCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{translate("healthTitle")}</h2>
          <p className="text-sm text-zinc-600">{translate("healthSubtitle")}</p>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!isComplete ? (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-1 flex-col justify-between"
          >
            <div>
              <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/80">
                <motion.div
                  className="h-full rounded-full bg-[#3D6B4F]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentStep + 1) / QUESTION_KEYS.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="mb-1 text-xs font-medium text-[#6B9B7A]">
                {translate("healthProgress", {
                  current: currentStep + 1,
                  total: QUESTION_KEYS.length,
                })}
              </p>
              <p className="text-sm leading-relaxed text-zinc-800">
                {translate(QUESTION_KEYS[currentStep])}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => handleAnswer(true)}
                className="btn-primary flex-1 py-2.5 text-sm"
              >
                {translate("healthYes")}
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(false)}
                className="btn-secondary flex-1 py-2.5 text-sm"
              >
                {translate("healthNo")}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-1 flex-col justify-between"
          >
            <div>
              <p className="mb-2 text-sm font-semibold text-[#3D6B4F]">
                {translate("healthResult")}
              </p>
              <p className="text-sm leading-relaxed text-zinc-700">
                {translate(allPositive ? "healthResultGood" : "healthResultWarning")}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              {!allPositive && (
                <button
                  type="button"
                  onClick={() => scrollToCell("vet-ai")}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 py-2.5 text-sm"
                >
                  {translate("healthAskAi")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleRestart}
                className="btn-ghost flex flex-1 items-center justify-center gap-2 bg-zinc-100 py-2.5 text-sm text-zinc-700 hover:bg-zinc-200"
              >
                <RotateCcw className="h-4 w-4" />
                {translate("healthRestart")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </BentoCard>
  );
}
