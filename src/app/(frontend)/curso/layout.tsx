import { CourseHeader } from "@/components/web/curso/course-header";
import React from "react";

export default function CursoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background">
      <CourseHeader courseTitle="" />
      {children}
    </div>
  );
}
