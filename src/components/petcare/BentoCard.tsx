"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PawPattern } from "./visual/Decorations";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  variant?: "cream" | "sage" | "dark" | "emergency" | "lavender" | "warm";
  subtleHover?: boolean;
  pattern?: boolean;
}

const variantStyles: Record<NonNullable<BentoCardProps["variant"]>, string> = {
  cream: "bg-[#FAF7F2] text-zinc-900 border border-[#EDE8DF]",
  sage: "bg-[#E8F0EA] text-zinc-900 border border-[#D4E4D8]",
  dark: "bg-zinc-900 text-zinc-50 border border-zinc-800",
  emergency: "bg-[#C94C4C] text-white border border-[#B33E3E]",
  lavender: "bg-gradient-to-br from-violet-50 to-purple-50 text-zinc-900 border border-violet-100",
  warm: "bg-gradient-to-br from-amber-50 to-orange-50 text-zinc-900 border border-amber-100",
};

export function BentoCard({
  children,
  className = "",
  variant = "cream",
  subtleHover = false,
  pattern = false,
}: BentoCardProps) {
  return (
    <motion.article
      whileHover={subtleHover ? undefined : { scale: 1.008, y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={[
        "flex h-full flex-col rounded-3xl p-5",
        "shadow-[0_4px_20px_rgba(120,90,60,0.06)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_32px_rgba(120,90,60,0.1)]",
        "focus-within:ring-2 focus-within:ring-[#6B9B7A]/30 focus-within:ring-offset-2 focus-within:ring-offset-[#F5F1EB]",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {pattern && <PawPattern />}
      {children}
    </motion.article>
  );
}
