"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities";

function formatDuration(seconds: number | null | undefined): string {
  if (seconds == null || seconds < 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

type LessonInfoProps = {
  lessonTitle: string;
  durationSeconds?: number | null;
  courseId: number;
  lessonId: number;
  lessonType: "video" | "text" | "quiz";
  isCompleted?: boolean;
  /** When true, hide "Mark as Complete" (auth disabled / mock mode). */
  authDisabled?: boolean;
};

export function LessonInfo({
  lessonTitle,
  durationSeconds,
  courseId,
  lessonId,
  lessonType,
  isCompleted,
  authDisabled = false,
}: LessonInfoProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const showMarkComplete =
    !authDisabled &&
    (lessonType === "video" || lessonType === "text") &&
    !isCompleted;

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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e7eb] pb-4">
      <div>
        <h2 className="text-xl font-semibold text-[#111827]">{lessonTitle}</h2>
        {(lessonType === "video" || durationSeconds != null) && (
          <p className="mt-0.5 text-sm text-[#374151]">
            Duración: {formatDuration(durationSeconds ?? undefined)}
          </p>
        )}
      </div>
      {showMarkComplete && (
        <Button
          onClick={handleMarkComplete}
          disabled={loading}
          className={cn(
            "rounded-lg bg-[#0f4ba3] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-[#0d4190]",
          )}
        >
          {loading ? "Guardando…" : "Marcar como completado"}
        </Button>
      )}
    </div>
  );
}
