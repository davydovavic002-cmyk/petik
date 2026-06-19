"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { BentoCellId } from "./layout";
import { getCellAnchorId } from "./layout";

interface Toast {
  id: string;
  message: string;
  type: "success" | "info";
}

interface BentoContextValue {
  highlightCell: BentoCellId | null;
  scrollToCell: (id: BentoCellId, options?: { highlight?: boolean }) => void;
  clearHighlight: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  dismissToast: (id: string) => void;
}

const BentoContext = createContext<BentoContextValue | null>(null);

export function BentoProvider({ children }: { children: ReactNode }) {
  const [highlightCell, setHighlightCell] = useState<BentoCellId | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const clearHighlight = useCallback(() => setHighlightCell(null), []);

  const scrollToCell = useCallback(
    (id: BentoCellId, options?: { highlight?: boolean }) => {
      const el = document.getElementById(getCellAnchorId(id));
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth", block: "center" });

      if (options?.highlight !== false) {
        setHighlightCell(id);
        window.setTimeout(() => setHighlightCell(null), 2200);
      }
    },
    [],
  );

  const showToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      highlightCell,
      scrollToCell,
      clearHighlight,
      toasts,
      showToast,
      dismissToast,
    }),
    [highlightCell, scrollToCell, clearHighlight, toasts, showToast, dismissToast],
  );

  return <BentoContext.Provider value={value}>{children}</BentoContext.Provider>;
}

export function useBento() {
  const ctx = useContext(BentoContext);
  if (!ctx) throw new Error("useBento must be used within BentoProvider");
  return ctx;
}
