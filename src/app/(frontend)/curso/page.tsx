import { getPayload } from "payload";
import configPromise from "@payload-config";
import Link from "next/link";
import { Role, withAuth, type WithAuthUserProps } from "@/auth/guard";
import { CourseHeader } from "@/components/web/curso/course-header";
import { getCourseProgressForUser } from "@/utilities/getCourseProgress";
import type { Course } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type CursoDashboardPageProps = WithAuthUserProps;

async function CursoDashboardPage({ user }: CursoDashboardPageProps) {
  const payload = await getPayload({ config: configPromise });

  const coursesResult = await payload.find({
    collection: "courses",
    where: { isPublished: { equals: true } },
    sort: "createdAt",
    limit: 50,
    depth: 0,
    overrideAccess: false,
    user,
  });

  const courses = coursesResult.docs as Course[];

  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const progress = await getCourseProgressForUser(payload, course.id, user);
      return { course, progress };
    })
  );

  return (
    <>
      <CourseHeader courseTitle="Mi curso" />
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#111827]">
            Hola, {user.name ?? user.email ?? "Estudiante"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Aquí puedes ver tu progreso y continuar con el curso.
          </p>
        </section>

        {coursesWithProgress.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-[#e5e7eb] bg-white p-6 text-center">
            No hay cursos disponibles.
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {coursesWithProgress.map(({ course, progress }) => {
              const targetLessonId =
                progress.resumeLessonId ?? progress.firstLessonId;
              const hasStarted = progress.completedLessons > 0;
              const isComplete =
                progress.totalLessons > 0 &&
                progress.completedLessons >= progress.totalLessons;

              return (
                <li
                  key={course.id}
                  className="flex flex-col rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-[#111827]">
                    {course.title}
                  </h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm text-[#6b7280]">
                      <span>
                        {progress.completedLessons} de {progress.totalLessons}{" "}
                        lecciones
                      </span>
                      {progress.hasCertificate && (
                        <span className="rounded bg-[#d1fae5] px-2 py-0.5 text-xs font-medium text-[#065f46]">
                          Certificado
                        </span>
                      )}
                    </div>
                    <Progress value={progress.progressPercent} className="h-2" />
                  </div>
                  <div className="mt-4">
                    <Button asChild size="sm">
                      <Link
                        href={
                          targetLessonId
                            ? `/curso/${targetLessonId}`
                            : "#"
                        }
                        className={!targetLessonId ? "pointer-events-none" : ""}
                      >
                        {!targetLessonId
                          ? "Sin lecciones"
                          : isComplete
                            ? "Ver curso"
                            : hasStarted
                              ? "Continuar"
                              : "Abrir curso"}
                      </Link>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default withAuth<CursoDashboardPageProps>(Role.Student)(
  CursoDashboardPage
);
