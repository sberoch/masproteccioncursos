import { LivePreviewListener } from "../../components/payload/live-preview";
import { LandingHeader } from "@/components/web/landing-header/landing-header";
import { LandingShell } from "@/components/web/landing-shell";
import { renderLandingBlocks } from "@/blocks/render-landing-blocks";
import { HeroSection } from "@/blocks/HeroSection/Component";
import { CourseIntroSection } from "@/blocks/CourseIntroSection/Component";
import { AboutInstructorSection } from "@/blocks/AboutInstructorSection/Component";
import { CourseModulesSection } from "@/blocks/CourseModulesSection/Component";
import { TestimonialsSection } from "@/blocks/TestimonialsSection/Component";
import { PricingSection } from "@/blocks/PricingSection/Component";
import { FAQSection } from "@/blocks/FAQSection/Component";
import { BlogSection } from "@/blocks/BlogSection/Component";
import { CTASection } from "@/blocks/CTASection/Component";
import type { Home } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { Fraunces, Outfit } from "next/font/google";
import { cn } from "@/utilities";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default async function Home() {
  const home = (await getCachedGlobal("home", 2)()) as Home | null;
  const blocks = home?.content?.blocks ?? undefined;

  return (
    <>
      <LivePreviewListener />
      <LandingHeader />
      <main
        className={cn(
          fraunces.variable,
          outfit.variable,
          "landing-page min-h-screen w-full overflow-x-hidden",
        )}
      >
        <LandingShell>{renderLandingBlocks(blocks)}</LandingShell>
      </main>
    </>
  );
}
