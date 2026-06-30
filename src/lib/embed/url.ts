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
