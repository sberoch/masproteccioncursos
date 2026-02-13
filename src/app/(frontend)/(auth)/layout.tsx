import Image from "next/image";
import React from "react";
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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        fraunces.variable,
        outfit.variable,
        "auth-page relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-brand-muted via-background to-muted px-4 py-16",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute -top-1/2 -right-1/5 h-[160%] w-[85%] -skew-x-15 bg-linear-to-br from-brand to-brand-hover opacity-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_82%,color-mix(in_oklch,var(--brand)_12%,transparent)_0%,transparent_55%),radial-gradient(circle_at_82%_18%,color-mix(in_oklch,var(--brand)_10%,transparent)_0%,transparent_55%)]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="absolute -top-5 left-1/2 h-14 w-[92%] -translate-x-1/2 rounded-[28px] bg-brand/10 blur-2xl" />

        <div className="relative w-full rounded-3xl border border-border bg-card/95 p-8 text-foreground shadow-xl backdrop-blur supports-backdrop-filter:bg-card/80">
          <div
            className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b bg-linear-to-r from-brand to-brand-hover opacity-70"
            aria-hidden
          />
          <div className="flex flex-col items-center gap-4 pb-6">
            <div className="flex items-center gap-2 w-full justify-center">
              <span className="flex-1 border-t border-dashed border-border opacity-60" />
              <span className="text-muted-foreground text-xs">•••</span>
              <span className="flex-1 border-t border-dashed border-border opacity-60" />
            </div>
            <Image
              src="/logo-mili.jpeg"
              alt="Mas Protección"
              width={80}
              height={80}
              className="h-16 w-auto object-contain"
            />
            <div className="flex items-center gap-2 w-full justify-center">
              <span className="flex-1 border-t border-dashed border-border opacity-60" />
              <span className="text-muted-foreground text-xs">•••</span>
              <span className="flex-1 border-t border-dashed border-border opacity-60" />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
