import { renderLandingBlocks } from "@/blocks/render-landing-blocks";
import { LivePreviewListener } from "@/components/payload/live-preview";
import { LandingHeader } from "@/components/web/landing-header/landing-header";
import { LandingShell } from "@/components/web/landing-shell";
import type { Home } from "@/payload-types";
import { cn } from "@/utilities";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { Fraunces, Outfit } from "next/font/google";

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
