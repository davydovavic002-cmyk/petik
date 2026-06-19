"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { BentoCellLayout } from "@/lib/bento/layout";
import { getCellAnchorId } from "@/lib/bento/layout";
import { getBentoCellClasses } from "@/lib/bento/grid-classes";
import { useBento } from "@/lib/bento/BentoContext";

interface BentoCellProps {
  cell: BentoCellLayout;
  children: ReactNode;
}

export function BentoCell({ cell, children }: BentoCellProps) {
  const { highlightCell } = useBento();
  const isHighlighted = highlightCell === cell.id;

  return (
    <motion.div
      id={getCellAnchorId(cell.id)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.35,
        delay: (cell.revealIndex % 6) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={[
        getBentoCellClasses(cell),
        "relative scroll-mt-28",
        isHighlighted && "z-10",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isHighlighted && (
        <motion.div
          layoutId="bento-highlight"
          className="pointer-events-none absolute -inset-0.5 rounded-[1.75rem] ring-2 ring-[#6B9B7A] ring-offset-1 ring-offset-[#F0EBE3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <div className="flex h-full min-h-0 flex-1 flex-col">{children}</div>
    </motion.div>
  );
}
