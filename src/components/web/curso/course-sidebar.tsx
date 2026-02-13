"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  Circle,
  FileText,
  PlayCircle,
  HelpCircle,
  Lock,
} from "lucide-react";
import { cn } from "@/utilities";

function formatLessonDuration(
  durationSeconds: number | null | undefined,
  readingTimeMinutes: number | null | undefined,
  type: "video" | "text" | "quiz",
): string {
  if (durationSeconds != null && durationSeconds > 0) {
    const m = Math.ceil(durationSeconds / 60);
    return m <= 1 ? "1 min" : `${m} min`;
  }
  if (readingTimeMinutes != null && readingTimeMinutes > 0 && type === "text") {
    return readingTimeMinutes <= 1 ? "1 min" : `${readingTimeMinutes} min`;
  }
  return "";
}

type LessonItem = {
  id: number;
  title: string;
  position: number;
  durationSeconds?: number | null;
  readingTime?: number | null;
  type: "video" | "text" | "quiz";
};

type SidebarLessonRowProps = {
  lesson: LessonItem;
  isActive: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
};

function SidebarLessonRow({
  lesson,
  isActive,
  isCompleted,
  isUnlocked,
}: SidebarLessonRowProps) {
  const durationLabel = formatLessonDuration(
    lesson.durationSeconds,
    lesson.readingTime,
    lesson.type,
  );
  const Icon =
    lesson.type === "video"
      ? PlayCircle
      : lesson.type === "quiz"
        ? HelpCircle
        : FileText;

  const rowContent = (
    <>
      <span className="flex shrink-0">
        {!isUnlocked ? (
          <Lock className="h-4 w-4 text-muted-foreground" />
        ) : isCompleted ? (
          <CheckCircle2 className="h-4 w-4 text-brand" />
        ) : (
          <Circle className="h-4 w-4 text-muted-foreground" />
        )}
      </span>
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block truncate">{lesson.title}</span>
        {durationLabel && (
          <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
            {durationLabel}
          </span>
        )}
      </span>
      {isActive && isUnlocked && (
        <span
          className="ml-2 h-9 w-1 rounded-full bg-linear-to-b from-brand to-brand-hover opacity-80"
          aria-hidden
        />
      )}
    </>
  );

  if (isUnlocked) {
    return (
      <li>
        <Link
          href={`/curso/${lesson.id}`}
          className={cn(
            "group/lesson flex items-center gap-2 rounded-lg px-3 py-3 text-sm transition",
            isActive
              ? "bg-brand-muted font-medium text-foreground"
              : "text-foreground hover:bg-muted/80",
          )}
        >
          {rowContent}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <span
        title="Completa el módulo anterior"
        className="flex cursor-not-allowed items-center gap-2 rounded-lg px-3 py-3 text-sm text-muted-foreground"
        aria-disabled
      >
        {rowContent}
      </span>
    </li>
  );
}

type ModuleItem = {
  id: number;
  title: string;
  position: number;
  lessons: LessonItem[];
};

type CourseSidebarProps = {
  modules: ModuleItem[];
  completedLessonIds: Set<number>;
  /** Lesson ids the user is allowed to open (module-gated). Locked lessons render disabled. */
  unlockedLessonIds: Set<number>;
  currentLessonId: number;
  /** When set, this module's accordion is open by default. */
  currentModuleId?: number;
  totalLessons: number;
  completedCount: number;
};

export function CourseSidebar({
  modules,
  completedLessonIds,
  unlockedLessonIds,
  currentLessonId,
  currentModuleId,
  totalLessons,
  completedCount,
}: CourseSidebarProps) {
  const defaultOpen =
    modules.length > 0
      ? currentModuleId != null
        ? [String(currentModuleId)]
        : [String(modules[0].id)]
      : [];

  return (
    <aside className="w-full shrink-0 border-l border-border bg-card/80 backdrop-blur supports-backdrop-filter:bg-card/70 lg:w-80">
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
        <div className="border-b border-border px-4 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            Contenido del curso
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {completedCount} / {totalLessons} lecciones
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <Accordion
            type="multiple"
            defaultValue={defaultOpen}
            className="w-full"
          >
            {modules.map((mod) => {
              const completedInModule = mod.lessons.filter((l) =>
                completedLessonIds.has(l.id),
              ).length;
              return (
                <AccordionItem key={mod.id} value={String(mod.id)}>
                  <AccordionTrigger className="px-4 py-3 text-left font-medium text-foreground hover:no-underline">
                    <span className="flex flex-1 flex-col items-start gap-0.5 text-left">
                      <span className="text-base">{mod.title}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {completedInModule} / {mod.lessons.length} completed
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <ul className="space-y-0.5 px-2">
                      {mod.lessons.map((lesson) => (
                        <SidebarLessonRow
                          key={lesson.id}
                          lesson={lesson}
                          isActive={lesson.id === currentLessonId}
                          isCompleted={completedLessonIds.has(lesson.id)}
                          isUnlocked={unlockedLessonIds.has(lesson.id)}
                        />
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </aside>
  );
}
