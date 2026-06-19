"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, CalendarPlus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useBento } from "@/lib/bento/BentoContext";
import {
  ANALYSIS_DELAY_MS,
  buildVetAiResponse,
  detectSymptom,
} from "@/lib/vet-ai/logic";
import type { ChatMessage } from "@/lib/i18n/types";
import type { TranslationKey } from "@/lib/i18n/translations";
import { BentoCard } from "./BentoCard";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const QUICK_PROMPTS: TranslationKey[] = [
  "vetAiPromptLethargy",
  "vetAiPromptItch",
  "vetAiPromptDiet",
];

export function VetAIChat() {
  const { translate } = useLanguage();
  const { scrollToCell } = useBento();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showBookCta, setShowBookCta] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    setMessages([
      { id: createId(), role: "assistant", content: translate("vetAiGreeting") },
    ]);
  }, [translate]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isAnalyzing]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isAnalyzing) return;

      setMessages((prev) => [...prev, { id: createId(), role: "user", content: trimmed }]);
      setInput("");
      setIsAnalyzing(true);
      setShowBookCta(false);

      const symptom = detectSymptom(trimmed);
      const statusId = createId();

      setMessages((prev) => [
        ...prev,
        { id: statusId, role: "status", content: translate("vetAiAnalyzing") },
      ]);

      setTimeout(() => {
        const response = buildVetAiResponse(symptom, (key) =>
          translate(key as TranslationKey),
        );

        setMessages((prev) => [
          ...prev.filter((m) => m.id !== statusId),
          { id: createId(), role: "assistant", content: response },
        ]);
        setIsAnalyzing(false);
        if (symptom !== "default" && symptom !== "diet") {
          setShowBookCta(true);
        }
      }, ANALYSIS_DELAY_MS);
    },
    [isAnalyzing, translate],
  );

  return (
    <BentoCard className="flex h-full min-h-[360px] flex-col" subtleHover>
      <header className="mb-4 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4E4D8] text-[#3D6B4F]">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{translate("vetAiTitle")}</h2>
          <p className="text-sm text-zinc-600">{translate("vetAiSubtitle")}</p>
        </div>
        <Sparkles className="ml-auto h-4 w-4 text-[#6B9B7A]" />
      </header>

      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_PROMPTS.map((key) => (
          <button
            key={key}
            type="button"
            disabled={isAnalyzing}
            onClick={() => sendMessage(translate(key))}
            className="btn-chip disabled:opacity-50"
          >
            {translate(key)}
          </button>
        ))}
      </div>

      <div
        ref={scrollRef}
        className="mb-3 flex-1 space-y-3 overflow-y-auto rounded-2xl bg-white/60 p-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={[
                "max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                message.role === "user"
                  ? "ml-auto bg-zinc-900 text-white"
                  : message.role === "status"
                    ? "mx-auto bg-[#E8F0EA] text-[#3D6B4F] italic"
                    : "bg-white text-zinc-800 shadow-sm",
              ].join(" ")}
            >
              {message.role === "status" ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#6B9B7A]" />
                  {message.content}
                </span>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showBookCta && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            type="button"
            onClick={() => scrollToCell("appointment")}
            className="btn-secondary mb-3 w-full py-2.5 text-sm text-[#3D6B4F]"
          >
            <CalendarPlus className="h-4 w-4" />
            {translate("vetAiBookCta")}
          </motion.button>
        )}
      </AnimatePresence>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={translate("vetAiPlaceholder")}
          disabled={isAnalyzing}
          className="flex-1 rounded-2xl border border-[#EDE8DF] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#6B9B7A] focus:ring-2 focus:ring-[#6B9B7A]/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isAnalyzing}
          className="btn-icon shrink-0 disabled:opacity-50"
          aria-label={translate("vetAiSend")}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </BentoCard>
  );
}
