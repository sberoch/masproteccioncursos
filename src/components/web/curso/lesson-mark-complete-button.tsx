"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities";

type LessonMarkCompleteButtonProps = {
  courseId: number;
  lessonId: number;
  className?: string;
};

export function LessonMarkCompleteButton({
  courseId,
  lessonId,
  className,
}: LessonMarkCompleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleMarkComplete() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/courses/${courseId}/lessons/${lessonId}/complete`,
        { method: "POST" },
      );
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleMarkComplete}
      disabled={loading}
      variant="brand"
      size="sm"
      className={cn("shadow-md hover:shadow-lg", className)}
    >
      {loading ? "Guardando…" : "Marcar como completado"}
    </Button>
  );
}
