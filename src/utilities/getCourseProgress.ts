import type { Payload } from "payload";
import type { User } from "@/payload-types";

export type ModuleProgressItem = {
  id: number;
  title: string;
  completed: boolean;
};

export type CourseProgressResult = {
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  completedLessonIds: Set<number>;
  hasCertificate: boolean;
  firstLessonId: number | null;
  resumeLessonId: number | null;
  /** Ordered modules with completion status for stepper UI */
  modules: ModuleProgressItem[];
};

/**
 * Get progress for a course and user. Used by the dashboard and can be used by the progress API.
 * Returns progress stats plus firstLessonId (first lesson in order) and resumeLessonId (first lesson not completed).
 */
export async function getCourseProgressForUser(
  payload: Payload,
  courseId: number,
  user: User,
): Promise<CourseProgressResult> {
  const modulesResult = await payload.find({
    collection: "modules",
    where: { course: { equals: courseId } },
    sort: "position",
    limit: 100,
    depth: 0,
  });

  const moduleIds = modulesResult.docs.map((m) => m.id);

  if (moduleIds.length === 0) {
    return {
      totalLessons: 0,
      completedLessons: 0,
      progressPercent: 0,
      completedLessonIds: new Set(),
      hasCertificate: false,
      firstLessonId: null,
      resumeLessonId: null,
      modules: [],
    };
  }

  const orderedModules = modulesResult.docs;

  const lessonsResult = await payload.find({
    collection: "lessons",
    where: { module: { in: moduleIds } },
    sort: "position",
    limit: 500,
    depth: 0,
  });

  const orderedLessonIds = lessonsResult.docs.map((l) => l.id);

  if (orderedLessonIds.length === 0) {
    return {
      totalLessons: 0,
      completedLessons: 0,
      progressPercent: 0,
      completedLessonIds: new Set(),
      hasCertificate: false,
      firstLessonId: null,
      resumeLessonId: null,
      modules: orderedModules.map((m) => ({
        id: m.id,
        title: m.title,
        completed: false,
      })),
    };
  }

  const progressResult = await payload.find({
    collection: "lesson-progress",
    where: {
      and: [
        { user: { equals: user.id } },
        { lesson: { in: orderedLessonIds } },
        { completed: { equals: true } },
      ],
    },
    limit: 500,
    depth: 0,
    overrideAccess: false,
    user,
  });

  const completedLessonIds = new Set(
    progressResult.docs.map((p) =>
      typeof p.lesson === "object" ? p.lesson.id : p.lesson,
    ),
  );

  const certificateResult = await payload.find({
    collection: "certificates",
    where: {
      and: [{ user: { equals: user.id } }, { course: { equals: courseId } }],
    },
    limit: 1,
    depth: 0,
    overrideAccess: false,
    user,
  });

  const totalLessons = orderedLessonIds.length;
  const completedLessons = completedLessonIds.size;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const firstLessonId = orderedLessonIds[0] ?? null;
  const resumeLessonId =
    orderedLessonIds.find((id) => !completedLessonIds.has(id)) ?? null;

  const lessonsByModule = new Map<number, number[]>();
  for (const lesson of lessonsResult.docs) {
    const moduleId =
      typeof lesson.module === "object" ? lesson.module.id : lesson.module;
    if (!lessonsByModule.has(moduleId)) {
      lessonsByModule.set(moduleId, []);
    }
    lessonsByModule.get(moduleId)!.push(lesson.id);
  }

  const modules: ModuleProgressItem[] = orderedModules.map((m) => {
    const lessonIdsInModule = lessonsByModule.get(m.id) ?? [];
    const completed =
      lessonIdsInModule.length > 0 &&
      lessonIdsInModule.every((id) => completedLessonIds.has(id));
    return {
      id: m.id,
      title: m.title,
      completed,
    };
  });

  return {
    totalLessons,
    completedLessons,
    progressPercent,
    completedLessonIds,
    hasCertificate: certificateResult.docs.length > 0,
    firstLessonId,
    resumeLessonId,
    modules,
  };
}
