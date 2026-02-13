import type { Access, AccessArgs } from "payload";
import type { Lesson, Module, User } from "@/payload-types";
import { canAccessLessonByProgress, getCourseProgressForUser } from "@/utilities/getCourseProgress";

function getModuleIdAndCourseId(lesson: Lesson): { moduleId: number; courseId: number } | null {
  const moduleRef = lesson.module as number | Module | null;
  if (!moduleRef) return null;
  const moduleId = typeof moduleRef === "object" ? moduleRef.id : moduleRef;
  if (typeof moduleRef !== "object") return null;
  const courseRef = moduleRef.course;
  const courseId =
    typeof courseRef === "object" && courseRef != null ? (courseRef as { id: number }).id : (courseRef as number);
  return { moduleId, courseId };
}

/**
 * Read access for Lessons: allow if admin, or if the user has completed the previous module (module-gated).
 * When reading a single lesson (id or data set), checks progress; list requests are allowed for authenticated users (filtering is applied app-side).
 */
export const canReadLessonByProgress: Access<Lesson, User> = async (args) => {
  const { req, data, id } = args;
  const user = req.user;
  if (!user) return false;
  if (user.role === "admin") return true;

  let lesson: Lesson | null = null;
  if (data && typeof data === "object" && (data.module != null || data.id != null)) {
    const populated = data as Lesson;
    if (populated.module != null) {
      lesson = populated;
    }
  }
  if (!lesson && id != null) {
    const found = await req.payload.findByID({
      collection: "lessons",
      id: typeof id === "string" ? parseInt(id, 10) : id,
      depth: 2,
      overrideAccess: true,
    });
    lesson = found as Lesson | null;
  }
  if (!lesson) return true;

  const parsed = getModuleIdAndCourseId(lesson);
  if (!parsed) return false;

  const progress = await getCourseProgressForUser(req.payload, parsed.courseId, user);
  return canAccessLessonByProgress(progress, parsed.moduleId);
};
