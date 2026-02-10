import { notFound } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Role, withAuth, type WithAuthUserProps } from "@/auth/guard";
import { CourseHeader } from "@/components/web/curso/course-header";
import { CourseSidebar } from "@/components/web/curso/course-sidebar";
import { LessonContent } from "@/components/web/curso/lesson-content";
import { LessonInfo } from "@/components/web/curso/lesson-info";
import type { Course, Lesson, Module } from "@/payload-types";

type Params = { params: Promise<{ lessonId: string }> };
type CursoLessonPageProps = Params & WithAuthUserProps;

function getCourseIdAndModule(lesson: Lesson): {
  courseId: number;
  moduleId: number;
} {
  const moduleRef = lesson.module as number | Module;
  const moduleId = typeof moduleRef === "object" ? moduleRef.id : moduleRef;
  const courseRef = typeof moduleRef === "object" ? moduleRef.course : null;
  const courseId =
    typeof courseRef === "object" && courseRef != null
      ? (courseRef as Course).id
      : (courseRef as number);
  return { courseId, moduleId };
}

/** Strip isCorrect from quiz options so we never send it to the client. */
function sanitizeLessonForClient(lesson: Lesson): Lesson {
  if (lesson.type !== "quiz" || !lesson.questions?.length) return lesson;
  return {
    ...lesson,
    questions: lesson.questions.map((q) => ({
      ...q,
      options: (q.options ?? []).map(({ optionText, id }) => ({
        optionText,
        ...(id != null && { id }),
      })),
    })),
  };
}

async function CursoLessonPage({ params, user }: CursoLessonPageProps) {
  const { lessonId: lessonIdParam } = await params;
  const lessonId = parseInt(lessonIdParam, 10);
  if (Number.isNaN(lessonId)) notFound();

  const payload = await getPayload({ config: configPromise });

  const lesson = await payload.findByID({
    collection: "lessons",
    id: lessonId,
    depth: 2,
  });

  if (!lesson) notFound();

  const { courseId, moduleId } = getCourseIdAndModule(lesson);

  let courseTitle = "";
  let passingScore = 70;
  const moduleRef = lesson.module as Module | number;
  if (typeof moduleRef === "object" && moduleRef?.course) {
    const course = moduleRef.course as Course;
    courseTitle = course.title ?? "";
    passingScore = course.passingScore ?? 70;
  } else {
    const courseDoc = await payload.findByID({
      collection: "courses",
      id: courseId,
      depth: 0,
    });
    if (courseDoc) {
      courseTitle = courseDoc.title;
      passingScore = (courseDoc as Course).passingScore ?? 70;
    }
  }

  const modulesResult = await payload.find({
    collection: "modules",
    where: { course: { equals: courseId } },
    sort: "position",
    depth: 0,
  });

  const moduleIds = modulesResult.docs.map((m) => m.id);
  const lessonsResult = await payload.find({
    collection: "lessons",
    where: { module: { in: moduleIds } },
    sort: "position",
    depth: 0,
  });

  const lessonsByModule = new Map<number, Lesson[]>();
  for (const l of lessonsResult.docs) {
    const mid =
      typeof l.module === "object" ? (l.module as Module).id : l.module;
    if (!lessonsByModule.has(mid)) lessonsByModule.set(mid, []);
    lessonsByModule.get(mid)!.push(l);
  }

  const sidebarModules = modulesResult.docs
    .map((m) => ({
      id: m.id,
      title: m.title,
      position: m.position,
      lessons: (lessonsByModule.get(m.id) ?? []).map((l) => ({
        id: l.id,
        title: l.title,
        position: l.position,
        durationSeconds: l.durationSeconds ?? null,
        readingTime: l.readingTime ?? null,
        type: l.type,
      })),
    }))
    .sort((a, b) => a.position - b.position);

  const totalLessons = lessonsResult.docs.length;

  const progressResult = await payload.find({
    collection: "lesson-progress",
    where: {
      and: [
        { user: { equals: user.id } },
        { lesson: { in: lessonsResult.docs.map((l) => l.id) } },
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
  const completedCount = completedLessonIds.size;
  const isCompleted = completedLessonIds.has(lesson.id);

  return (
    <>
      <CourseHeader courseTitle={courseTitle} />
      <div className="mx-auto flex w-full max-w-[1400px]">
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <div className="space-y-4">
            <LessonContent
              lesson={sanitizeLessonForClient(lesson)}
              courseId={courseId}
              passingScore={passingScore}
              authDisabled={false}
            />
            <LessonInfo
              lessonTitle={lesson.title}
              durationSeconds={lesson.durationSeconds}
              courseId={courseId}
              lessonId={lesson.id}
              lessonType={lesson.type}
              isCompleted={isCompleted}
              authDisabled={false}
            />
          </div>
        </main>
        <CourseSidebar
          modules={sidebarModules}
          completedLessonIds={completedLessonIds}
          currentLessonId={lesson.id}
          currentModuleId={moduleId}
          totalLessons={totalLessons}
          completedCount={completedCount}
        />
      </div>
    </>
  );
}

export default withAuth<CursoLessonPageProps>(Role.Student)(CursoLessonPage);
