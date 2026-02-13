"use client";

import { cn } from "@/utilities";
import { LessonMarkCompleteButton } from "./lesson-mark-complete-button";

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
  /** When false, do not render the button (e.g. card with only title + duration). Default true. */
  showMarkCompleteButton?: boolean;
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
  showMarkCompleteButton = true,
}: LessonInfoProps) {
  const showMarkComplete =
    showMarkCompleteButton &&
    !authDisabled &&
    (lessonType === "video" || lessonType === "text") &&
    !isCompleted;

  const button = showMarkComplete ? (
    <LessonMarkCompleteButton courseId={courseId} lessonId={lessonId} />
  ) : null;

  const showDuration = lessonType === "video" || durationSeconds != null;

  return (
    <div className={cn(
      "flex flex-wrap items-center justify-between gap-3",
      !hideTitle && "border-b border-border pb-4",
      hideTitle && (showDuration || showMarkComplete) && "pt-0"
    )}>
      <div>
        {!hideTitle && (
          <h2 className="font-display text-2xl font-semibold leading-tight text-foreground">
            {lessonTitle}
          </h2>
        )}
        {showDuration && (
          <p className={cn("text-sm text-muted-foreground", !hideTitle && "mt-0.5")}>
            Duración: {formatDuration(durationSeconds ?? undefined)}
          </p>
        )}
      </div>
      {button}
    </div>
  );
}
