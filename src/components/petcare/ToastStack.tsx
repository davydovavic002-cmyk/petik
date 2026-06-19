"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";
import { useBento } from "@/lib/bento/BentoContext";

export function ToastStack() {
  const { toasts, dismissToast } = useBento();

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-50 flex flex-col gap-2 md:bottom-6">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-[#EDE8DF] bg-white/95 p-4 shadow-[0_12px_40px_rgba(120,90,60,0.12)] backdrop-blur-md"
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#3D6B4F]" />
            ) : (
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#6B9B7A]" />
            )}
            <p className="flex-1 text-sm leading-relaxed text-zinc-700">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="btn-ghost rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
