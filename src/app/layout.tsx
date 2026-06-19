import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <Suspense fallback={null}>
          <PortfolioLanguageBridge>{children}</PortfolioLanguageBridge>
        </Suspense>
      </body>
    </html>
  );
}
