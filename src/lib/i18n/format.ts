import type { Language } from "./types";

const LOCALE_MAP: Record<Language, string> = {
  ru: "ru-RU",
  en: "en-US",
  am: "hy-AM",
};

export function formatDate(date: Date, language: Language): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[language], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(date: Date, language: Language): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[language], {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatTime(time: string, language: Language): string {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat(LOCALE_MAP[language], {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}
