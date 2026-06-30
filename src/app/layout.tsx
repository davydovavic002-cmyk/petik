import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { PortfolioLanguageBridge } from "@/components/providers/PortfolioLanguageBridge";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PetCare AI — Ветеринарная клиника будущего",
  description:
    "Интерактивный интерфейс ветеринарной клиники с ИИ-ассистентом, онлайн-записью и мониторингом здоровья питомца.",
};

const portfolioEmbedScript = `(function(){var p=new URLSearchParams(location.search);if(p.get('embed')==='portfolio'){document.documentElement.setAttribute('data-embed','portfolio');}})();`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const isPortfolioEmbed = headersList.get("x-portfolio-embed") === "portfolio";

  return (
    <html
      lang="ru"
      {...(isPortfolioEmbed ? { "data-embed": "portfolio" } : {})}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: portfolioEmbedScript }} />
      </head>
      <body className="min-h-full font-sans">
        <Suspense fallback={null}>
          <PortfolioLanguageBridge>{children}</PortfolioLanguageBridge>
        </Suspense>
      </body>
    </html>
  );
}
