import { CourseHeader } from "@/components/web/curso/course-header";
import { cn } from "@/utilities";
import { Fraunces, Outfit } from "next/font/google";
import React from "react";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default function CursoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        fraunces.variable,
        outfit.variable,
        "curso-page relative min-h-screen w-full overflow-hidden bg-linear-to-br from-brand-muted via-background to-muted",
      )}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-1/2 -right-1/5 h-[160%] w-[85%] -skew-x-15 bg-linear-to-br from-brand to-brand-hover opacity-[0.08]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,color-mix(in_oklch,var(--brand)_10%,transparent)_0%,transparent_58%),radial-gradient(circle_at_82%_18%,color-mix(in_oklch,var(--brand)_8%,transparent)_0%,transparent_58%)]" />
      </div>

      <CourseHeader courseTitle="" />
      {children}
    </div>
  );
}
