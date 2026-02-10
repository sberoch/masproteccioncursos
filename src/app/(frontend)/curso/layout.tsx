import React from "react";

export default function CursoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb]">
      {children}
    </div>
  );
}
