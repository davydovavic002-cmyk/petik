import type { Language } from "@/lib/i18n/types";

export function syncLanguageToUrl(language: Language): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  if (params.get("embed") !== "portfolio" && !params.has("lang")) return;

  params.set("lang", language);
  const query = params.toString();
  const next = query
    ? `${window.location.pathname}?${query}${window.location.hash}`
    : `${window.location.pathname}${window.location.hash}`;

  window.history.replaceState(null, "", next);
}

export function withEmbedParams(href: string): string {
  if (typeof window === "undefined") return href;

  const current = new URLSearchParams(window.location.search);
  if (current.get("embed") !== "portfolio") return href;

  const url = new URL(href, window.location.origin);
  url.searchParams.set("embed", "portfolio");

  const lang = current.get("lang");
  if (lang) url.searchParams.set("lang", lang);

  return `${url.pathname}${url.search}${url.hash}`;
}
