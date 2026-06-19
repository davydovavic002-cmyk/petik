import { BentoGrid } from "@/components/petcare/BentoGrid";
import { SiteHeader, ScrollProgress } from "@/components/petcare/SiteHeader";
import { SiteFooter } from "@/components/petcare/SiteFooter";
import { ToastStack } from "@/components/petcare/ToastStack";
import { MobileActionBar } from "@/components/petcare/MobileActionBar";
import { BentoProvider } from "@/lib/bento/BentoContext";

export default function Home() {
  return (
    <BentoProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-[#F0EBE3]">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_90%_at_8%_-5%,_rgba(107,155,122,0.07)_0%,_transparent_68%),radial-gradient(ellipse_100%_80%_at_88%_12%,_rgba(240,160,96,0.06)_0%,_transparent_65%)]" />
        <div className="pointer-events-none fixed inset-0 opacity-[0.025] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

        <ScrollProgress />
        <SiteHeader />
        <BentoGrid />
        <SiteFooter />
        <ToastStack />
        <MobileActionBar />
      </main>
    </BentoProvider>
  );
}
