export const PORTFOLIO_HEIGHT_MESSAGE = "portfolio:content-height";

export const REPORT_HEIGHT_DELAYS = [0, 50, 150, 400, 900, 1800] as const;

export function isPortfolioEmbed(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-embed") === "portfolio";
}

export function measureContentHeight(): number {
  const sentinel = document.getElementById("embed-height-sentinel");
  if (sentinel) {
    const top = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(sentinel.getBoundingClientRect().bottom - top);
  }

  const footer = document.querySelector("footer");
  if (footer) {
    const top = document.documentElement.getBoundingClientRect().top;
    return Math.ceil(footer.getBoundingClientRect().bottom - top);
  }

  return Math.ceil(document.documentElement.scrollHeight);
}

export function reportHeight(): void {
  if (!isPortfolioEmbed()) return;

  const height = Math.max(measureContentHeight(), 1);
  window.parent.postMessage({ type: PORTFOLIO_HEIGHT_MESSAGE, height }, "*");
}

export function scheduleHeightReports(): void {
  for (const delay of REPORT_HEIGHT_DELAYS) {
    if (delay === 0) {
      reportHeight();
    } else {
      window.setTimeout(reportHeight, delay);
    }
  }
}
