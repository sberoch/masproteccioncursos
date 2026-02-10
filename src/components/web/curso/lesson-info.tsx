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
  /** When true, do not render the title (e.g. when title is shown above content). */
  hideTitle?: boolean;
};

export function LessonInfo({
  lessonTitle,
  durationSeconds,
  courseId,
  lessonId,
  lessonType,
  isCompleted,
  authDisabled = false,
  hideTitle = false,
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

  const showDuration = lessonType === "video" || durationSeconds != null;

  return (
    <div className={cn(
      "flex flex-wrap items-center justify-between gap-3",
      !hideTitle && "border-b border-border pb-4",
      hideTitle && (showDuration || showMarkComplete) && "pt-0"
    )}>
      <div>
        {!hideTitle && (
          <h2 className="text-xl font-semibold text-foreground">{lessonTitle}</h2>
        )}
        {showDuration && (
          <p className={cn("text-sm text-muted-foreground", !hideTitle && "mt-0.5")}>
            Duración: {formatDuration(durationSeconds ?? undefined)}
          </p>
        )}
      </div>
      {showMarkComplete && (
        <Button
          onClick={handleMarkComplete}
          disabled={loading}
          className={cn(
            "rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground shadow-md transition hover:bg-brand-hover",
          )}
        >
          {loading ? "Guardando…" : "Marcar como completado"}
        </Button>
      )}
    </div>
  );
}
