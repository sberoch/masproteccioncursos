import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lg text-foreground">
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
  );
}
