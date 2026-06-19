import type { ComponentType } from "react";
import type { TranslationKey } from "@/lib/i18n/translations";
import { AboutUs } from "@/components/petcare/AboutUs";
import { PriceList } from "@/components/petcare/PriceList";
import { VetAIChat } from "@/components/petcare/VetAIChat";
import { AppointmentForm } from "@/components/petcare/AppointmentForm";
import { Services } from "@/components/petcare/Services";
import { EmergencyContact } from "@/components/petcare/EmergencyContact";
import { ClinicStatus } from "@/components/petcare/ClinicStatus";
import { HealthChecklist } from "@/components/petcare/HealthChecklist";
import { TeamDoctors } from "@/components/petcare/TeamDoctors";
import { Reviews } from "@/components/petcare/Reviews";
import { ContactInfo } from "@/components/petcare/ContactInfo";
import { VaccinationWidget } from "@/components/petcare/VaccinationWidget";
import { NutritionGuide } from "@/components/petcare/NutritionGuide";
import { PetGallery } from "@/components/petcare/PetGallery";
import { FaqCard } from "@/components/petcare/FaqCard";
import { DailyTip } from "@/components/petcare/DailyTip";
import { Certifications } from "@/components/petcare/Certifications";
import { LiveActivity } from "@/components/petcare/LiveActivity";
import { LoyaltyProgram } from "@/components/petcare/LoyaltyProgram";
import { ClinicTour } from "@/components/petcare/ClinicTour";
import { InsuranceCard } from "@/components/petcare/InsuranceCard";
import { OpeningHours } from "@/components/petcare/OpeningHours";
import { WhyChooseUs } from "@/components/petcare/WhyChooseUs";
import { QuickContact } from "@/components/petcare/QuickContact";

export type BentoSectionId = "discover" | "care" | "book" | "clinic";

export type BentoCellId =
  | "about"
  | "price"
  | "emergency"
  | "vet-ai"
  | "appointment"
  | "services"
  | "vaccination"
  | "clinic-status"
  | "health"
  | "team"
  | "reviews"
  | "contact"
  | "gallery"
  | "certifications"
  | "daily-tip"
  | "faq"
  | "nutrition"
  | "loyalty"
  | "live-activity"
  | "insurance"
  | "clinic-tour"
  | "opening-hours"
  | "why-choose"
  | "quick-contact";

export interface BentoCellLayout {
  id: BentoCellId;
  section: BentoSectionId;
  mobileOrder: number;
  revealIndex: number;
  colSpan: { md: number; lg: number };
  component: ComponentType;
}

export const BENTO_SECTIONS: {
  id: BentoSectionId;
  labelKey: "navDiscover" | "navCare" | "navBook" | "navClinic";
  descKey:
    | "sectionDiscoverDesc"
    | "sectionCareDesc"
    | "sectionBookDesc"
    | "sectionClinicDesc";
}[] = [
  { id: "discover", labelKey: "navDiscover", descKey: "sectionDiscoverDesc" },
  { id: "care", labelKey: "navCare", descKey: "sectionCareDesc" },
  { id: "book", labelKey: "navBook", descKey: "sectionBookDesc" },
  { id: "clinic", labelKey: "navClinic", descKey: "sectionClinicDesc" },
];

/** Shortcuts below hero — ordered by typical user intent */
export const QUICK_ACCESS = [
  { id: "emergency", labelKey: "quickAccessEmergency" },
  { id: "vet-ai", labelKey: "quickAccessAi" },
  { id: "appointment", labelKey: "quickAccessBook" },
  { id: "price", labelKey: "quickAccessPrices" },
  { id: "opening-hours", labelKey: "quickAccessHours" },
  { id: "contact", labelKey: "quickAccessContact" },
] as const satisfies readonly { id: BentoCellId; labelKey: TranslationKey }[];

export type QuickAccessCellId = (typeof QUICK_ACCESS)[number]["id"];

/**
 * User-journey layout (every lg row = 12 cols):
 *
 * Discover — «можно ли доверять и прийти сейчас?»
 * Care     — «что с питомцем и куда обратиться?»
 * Book     — «записаться и узнать стоимость»
 * Clinic   — «увидеть клинику и связаться»
 */
export const BENTO_LAYOUT: BentoCellLayout[] = [
  // Discover: status → trust → social proof
  {
    id: "emergency",
    section: "discover",
    mobileOrder: 1,
    revealIndex: 0,
    colSpan: { md: 6, lg: 4 },
    component: EmergencyContact,
  },
  {
    id: "clinic-status",
    section: "discover",
    mobileOrder: 2,
    revealIndex: 1,
    colSpan: { md: 6, lg: 4 },
    component: ClinicStatus,
  },
  {
    id: "opening-hours",
    section: "discover",
    mobileOrder: 3,
    revealIndex: 2,
    colSpan: { md: 6, lg: 4 },
    component: OpeningHours,
  },
  {
    id: "about",
    section: "discover",
    mobileOrder: 7,
    revealIndex: 3,
    colSpan: { md: 6, lg: 6 },
    component: AboutUs,
  },
  {
    id: "why-choose",
    section: "discover",
    mobileOrder: 8,
    revealIndex: 4,
    colSpan: { md: 6, lg: 6 },
    component: WhyChooseUs,
  },
  {
    id: "gallery",
    section: "discover",
    mobileOrder: 13,
    revealIndex: 5,
    colSpan: { md: 4, lg: 4 },
    component: PetGallery,
  },
  {
    id: "certifications",
    section: "discover",
    mobileOrder: 23,
    revealIndex: 6,
    colSpan: { md: 4, lg: 4 },
    component: Certifications,
  },
  {
    id: "team",
    section: "discover",
    mobileOrder: 14,
    revealIndex: 7,
    colSpan: { md: 4, lg: 4 },
    component: TeamDoctors,
  },
  {
    id: "reviews",
    section: "discover",
    mobileOrder: 18,
    revealIndex: 8,
    colSpan: { md: 6, lg: 12 },
    component: Reviews,
  },

  // Care: diagnose → prevent → stay informed
  {
    id: "vet-ai",
    section: "care",
    mobileOrder: 5,
    revealIndex: 9,
    colSpan: { md: 6, lg: 8 },
    component: VetAIChat,
  },
  {
    id: "health",
    section: "care",
    mobileOrder: 11,
    revealIndex: 10,
    colSpan: { md: 6, lg: 4 },
    component: HealthChecklist,
  },
  {
    id: "faq",
    section: "care",
    mobileOrder: 12,
    revealIndex: 11,
    colSpan: { md: 6, lg: 6 },
    component: FaqCard,
  },
  {
    id: "vaccination",
    section: "care",
    mobileOrder: 15,
    revealIndex: 12,
    colSpan: { md: 3, lg: 3 },
    component: VaccinationWidget,
  },
  {
    id: "nutrition",
    section: "care",
    mobileOrder: 16,
    revealIndex: 13,
    colSpan: { md: 3, lg: 3 },
    component: NutritionGuide,
  },
  {
    id: "live-activity",
    section: "care",
    mobileOrder: 20,
    revealIndex: 14,
    colSpan: { md: 6, lg: 6 },
    component: LiveActivity,
  },
  {
    id: "daily-tip",
    section: "care",
    mobileOrder: 19,
    revealIndex: 15,
    colSpan: { md: 6, lg: 6 },
    component: DailyTip,
  },

  // Book: act → compare → perks
  {
    id: "appointment",
    section: "book",
    mobileOrder: 4,
    revealIndex: 16,
    colSpan: { md: 6, lg: 8 },
    component: AppointmentForm,
  },
  {
    id: "quick-contact",
    section: "book",
    mobileOrder: 6,
    revealIndex: 17,
    colSpan: { md: 6, lg: 4 },
    component: QuickContact,
  },
  {
    id: "services",
    section: "book",
    mobileOrder: 9,
    revealIndex: 18,
    colSpan: { md: 4, lg: 4 },
    component: Services,
  },
  {
    id: "price",
    section: "book",
    mobileOrder: 10,
    revealIndex: 19,
    colSpan: { md: 4, lg: 4 },
    component: PriceList,
  },
  {
    id: "insurance",
    section: "book",
    mobileOrder: 17,
    revealIndex: 20,
    colSpan: { md: 4, lg: 4 },
    component: InsuranceCard,
  },
  {
    id: "loyalty",
    section: "book",
    mobileOrder: 21,
    revealIndex: 21,
    colSpan: { md: 6, lg: 12 },
    component: LoyaltyProgram,
  },

  // Clinic: see → reach
  {
    id: "clinic-tour",
    section: "clinic",
    mobileOrder: 22,
    revealIndex: 22,
    colSpan: { md: 6, lg: 6 },
    component: ClinicTour,
  },
  {
    id: "contact",
    section: "clinic",
    mobileOrder: 24,
    revealIndex: 23,
    colSpan: { md: 6, lg: 6 },
    component: ContactInfo,
  },
];

export function getCellsBySection(section: BentoSectionId) {
  return BENTO_LAYOUT.filter((cell) => cell.section === section);
}

export function getCellAnchorId(id: BentoCellId) {
  return `bento-${id}`;
}
