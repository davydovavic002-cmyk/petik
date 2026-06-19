"use client";

import type { ReactNode } from "react";

interface PetIllustrationProps {
  type?: "dog" | "cat" | "both";
  className?: string;
}

export function PetIllustration({ type = "both", className = "" }: PetIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="100" cy="145" rx="72" ry="10" fill="#3D6B4F" fillOpacity="0.12" />
      {(type === "dog" || type === "both") && (
        <g>
          <ellipse cx="68" cy="98" rx="34" ry="28" fill="#E8C99B" />
          <circle cx="52" cy="72" r="22" fill="#E8C99B" />
          <ellipse cx="42" cy="82" rx="8" ry="14" fill="#D4A574" />
          <ellipse cx="78" cy="82" rx="8" ry="14" fill="#D4A574" />
          <circle cx="46" cy="68" r="3" fill="#3D2C1E" />
          <circle cx="58" cy="68" r="3" fill="#3D2C1E" />
          <ellipse cx="52" cy="76" rx="5" ry="4" fill="#3D2C1E" />
          <path d="M48 58 Q52 52 56 58" stroke="#D4A574" strokeWidth="2" fill="none" />
          <path d="M90 95 Q100 110 110 95" stroke="#D4A574" strokeWidth="8" strokeLinecap="round" />
        </g>
      )}
      {(type === "cat" || type === "both") && (
        <g>
          <ellipse cx="132" cy="100" rx="26" ry="22" fill="#F0A060" />
          <circle cx="132" cy="72" r="20" fill="#F0A060" />
          <path d="M118 58 L114 48 L122 54 Z" fill="#F0A060" />
          <path d="M146 58 L150 48 L142 54 Z" fill="#F0A060" />
          <circle cx="126" cy="70" r="2.5" fill="#3D2C1E" />
          <circle cx="138" cy="70" r="2.5" fill="#3D2C1E" />
          <path d="M128 76 L132 80 L136 76" stroke="#3D2C1E" strokeWidth="1.5" fill="none" />
          <path d="M155 88 Q165 75 170 90" stroke="#F0A060" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
      <circle cx="100" cy="40" r="16" fill="#6B9B7A" fillOpacity="0.2" />
      <path d="M100 28 L102 36 L110 36 L104 41 L106 49 L100 44 L94 49 L96 41 L90 36 L98 36 Z" fill="#6B9B7A" fillOpacity="0.5" />
    </svg>
  );
}

export function PawPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-3xl opacity-[0.07] ${className}`}
      aria-hidden
    >
      {[
        [12, 15, 18],
        [55, 8, 14],
        [78, 42, 16],
        [25, 65, 12],
        [88, 72, 20],
      ].map(([x, y, s], i) => (
        <svg
          key={i}
          style={{ left: `${x}%`, top: `${y}%`, width: s, height: s }}
          className="absolute text-[#3D6B4F]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <ellipse cx="12" cy="16" rx="5" ry="4" />
          <circle cx="7" cy="9" r="2.5" />
          <circle cx="12" cy="7" r="2.5" />
          <circle cx="17" cy="9" r="2.5" />
          <circle cx="9" cy="12" r="2" />
        </svg>
      ))}
    </div>
  );
}

export function GlowOrb({
  color = "#6B9B7A",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        background: `radial-gradient(circle at center, color-mix(in srgb, ${color} 20%, transparent) 0%, color-mix(in srgb, ${color} 8%, transparent) 42%, transparent 72%)`,
      }}
      aria-hidden
    />
  );
}

export function CardChip({
  children,
  variant = "sage",
}: {
  children: ReactNode;
  variant?: "sage" | "dark" | "warm";
}) {
  const styles = {
    sage: "bg-[#E8F0EA] text-[#3D6B4F]",
    dark: "bg-zinc-900/90 text-white",
    warm: "bg-amber-100 text-amber-800",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
