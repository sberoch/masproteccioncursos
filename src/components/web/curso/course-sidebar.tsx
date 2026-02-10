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

type ModuleItem = {
  id: number;
  title: string;
  position: number;
  lessons: LessonItem[];
};

type CourseSidebarProps = {
  modules: ModuleItem[];
  completedLessonIds: Set<number>;
  currentLessonId: number;
  /** When set, this module's accordion is open by default. */
  currentModuleId?: number;
  totalLessons: number;
  completedCount: number;
};

export function CourseSidebar({
  modules,
  completedLessonIds,
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
    <aside className="w-full shrink-0 border-l border-[#e5e7eb] bg-white lg:w-80">
      <div className="sticky top-14 flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden">
        <div className="border-b border-[#e5e7eb] px-4 py-3">
          <h2 className="text-sm font-semibold text-[#111827]">
            Contenido del curso
          </h2>
          <p className="mt-0.5 text-xs text-[#374151]">
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
                  <AccordionTrigger className="px-4 py-3 text-left font-medium text-[#111827] hover:no-underline">
                    <span className="flex flex-1 flex-col items-start gap-0.5 text-left">
                      <span className="text-base">{mod.title}</span>
                      <span className="text-xs font-normal text-[#374151]">
                        {completedInModule} / {mod.lessons.length} completed
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <ul className="space-y-0.5 px-2">
                      {mod.lessons.map((lesson) => {
                        const isActive = lesson.id === currentLessonId;
                        const isCompleted = completedLessonIds.has(lesson.id);
                        const href = `/curso/${lesson.id}`;
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
                        return (
                          <li key={lesson.id}>
                            <Link
                              href={href}
                              className={cn(
                                "flex items-center gap-2 rounded px-3 py-3 text-sm transition",
                                isActive
                                  ? "border-l-4 border-[#0f4ba3] bg-[#0f4ba3]/10 font-medium text-[#0f4ba3]"
                                  : "text-[#374151] hover:bg-[#f3f4f6]",
                              )}
                            >
                              <span className="flex shrink-0">
                                {isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-[#0f4ba3]" />
                                ) : (
                                  <Circle className="h-4 w-4 text-[#9ca3af]" />
                                )}
                              </span>
                              <Icon className="h-4 w-4 shrink-0 text-[#6b7280]" />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate">
                                  {lesson.title}
                                </span>
                                {durationLabel && (
                                  <span className="mt-0.5 block text-xs font-normal text-[#6b7280]">
                                    {durationLabel}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
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
