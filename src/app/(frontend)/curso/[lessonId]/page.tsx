import { notFound, redirect } from "next/navigation";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Role, withAuth, type WithAuthUserProps } from "@/auth/guard";
import { CourseSidebar } from "@/components/web/curso/course-sidebar";
import { LessonContent } from "@/components/web/curso/lesson-content";
import { LessonInfo } from "@/components/web/curso/lesson-info";
import { LessonMarkCompleteButton } from "@/components/web/curso/lesson-mark-complete-button";
import {
  canAccessLessonByProgress,
  getCourseProgressForUser,
} from "@/utilities/getCourseProgress";
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
    overrideAccess: true,
  });

  if (!lesson) notFound();

  const { courseId, moduleId } = getCourseIdAndModule(lesson);

  const progress = await getCourseProgressForUser(payload, courseId, user);
  if (!canAccessLessonByProgress(progress, moduleId)) {
    const target = progress.firstAllowedLessonId
      ? `/curso/${progress.firstAllowedLessonId}`
      : "/curso";
    redirect(target);
  }

  let _courseTitle = "";
  let passingScore = 70;
  const moduleRef = lesson.module as Module | number;
  if (typeof moduleRef === "object" && moduleRef?.course) {
    const course = moduleRef.course as Course;
    _courseTitle = course.title ?? "";
    passingScore = course.passingScore ?? 70;
  } else {
    const courseDoc = await payload.findByID({
      collection: "courses",
      id: courseId,
      depth: 0,
    });
    if (courseDoc) {
      _courseTitle = courseDoc.title;
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
    overrideAccess: true,
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

  const unlockedLessonIds = new Set<number>();
  for (let i = 0; i < sidebarModules.length; i++) {
    const allowed =
      i === 0 || (progress.modules[i - 1]?.completed === true);
    if (allowed) {
      for (const les of sidebarModules[i].lessons) {
        unlockedLessonIds.add(les.id);
      }
    }
  }

  const completedLessonIds = progress.completedLessonIds;
  const completedCount = progress.completedLessons;
  const isCompleted = completedLessonIds.has(lesson.id);

  const isTextOrQuiz = lesson.type === "text" || lesson.type === "quiz";

  const showMarkCompleteNextToTitle =
    lesson.type === "text" && !isCompleted;

  const hasLessonInfoContent =
    lesson.type === "video" ||
    lesson.durationSeconds != null;

  const lessonInfo = (opts: {
    hideTitle?: boolean;
    showMarkCompleteButton?: boolean;
  }) => (
    <LessonInfo
      lessonTitle={lesson.title}
      durationSeconds={lesson.durationSeconds}
      courseId={courseId}
      lessonId={lesson.id}
      lessonType={lesson.type}
      isCompleted={isCompleted}
      authDisabled={false}
      hideTitle={opts.hideTitle}
      showMarkCompleteButton={opts.showMarkCompleteButton}
    />
  );

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1400px]">
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6">
          <div className="space-y-5">
            {isTextOrQuiz ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h1 className="font-display text-3xl font-semibold leading-tight text-foreground">
                    {lesson.title}
                  </h1>
                  {showMarkCompleteNextToTitle && (
                    <LessonMarkCompleteButton
                      courseId={courseId}
                      lessonId={lesson.id}
                    />
                  )}
                </div>
                <LessonContent
                  lesson={sanitizeLessonForClient(lesson)}
                  courseId={courseId}
                  passingScore={passingScore}
                  authDisabled={false}
                />
                {hasLessonInfoContent && (
                  <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/80">
                    {lessonInfo({
                      hideTitle: false,
                      showMarkCompleteButton: false,
                    })}
                  </div>
                )}
              </>
            ) : (
              <>
                <LessonContent
                  lesson={sanitizeLessonForClient(lesson)}
                  courseId={courseId}
                  passingScore={passingScore}
                  authDisabled={false}
                />
                {hasLessonInfoContent && (
                  <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/80">
                    {lessonInfo({})}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        <CourseSidebar
          modules={sidebarModules}
          completedLessonIds={completedLessonIds}
          unlockedLessonIds={unlockedLessonIds}
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
