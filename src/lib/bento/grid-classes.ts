import type { BentoCellLayout } from "./layout";

const COL_MD: Record<number, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
  5: "md:col-span-5",
  6: "md:col-span-6",
};

const COL_LG: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  9: "lg:col-span-9",
  10: "lg:col-span-10",
  11: "lg:col-span-11",
  12: "lg:col-span-12",
};

/** Mobile-only reorder; desktop keeps DOM flow for correct grid packing */
export function getMobileOrderClass(order: number): string {
  return `max-md:order-[${order}] md:order-none`;
}

export function getBentoCellClasses(cell: BentoCellLayout): string {
  return [
    "col-span-1",
    COL_MD[cell.colSpan.md] ?? "md:col-span-6",
    COL_LG[cell.colSpan.lg] ?? "lg:col-span-12",
    getMobileOrderClass(cell.mobileOrder),
    "flex h-full min-h-0 flex-col",
  ].join(" ");
}
