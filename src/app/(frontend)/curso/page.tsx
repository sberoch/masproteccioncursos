import { getPayload } from "payload";
import configPromise from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import { Role, withAuth, type WithAuthUserProps } from "@/auth/guard";
import {
  getCourseProgressForUser,
  type CourseProgressResult,
} from "@/utilities/getCourseProgress";
import type { Course } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import RichText from "@/components/web/rich-text";

type CursoDashboardPageProps = WithAuthUserProps;

async function CursoDashboardPage({ user }: CursoDashboardPageProps) {
  const payload = await getPayload({ config: configPromise });

  const coursesResult = await payload.find({
    collection: "courses",
    where: { isPublished: { equals: true } },
    sort: "createdAt",
    limit: 50,
    depth: 1,
    overrideAccess: false,
    user,
  });

  const courses = coursesResult.docs as Course[];

  const coursesWithProgress = await Promise.all(
    courses.map(async (course: Course) => {
      const progress = await getCourseProgressForUser(payload, course.id, user);
      return { course, progress } as { course: Course; progress: CourseProgressResult };
    })
  );

  return (
    <>
      <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6">
        <section className="mb-10">
          <h2 className="font-display text-3xl font-semibold leading-tight text-foreground">
            Hola, {user.name ?? user.email ?? "Estudiante"}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            Aquí puedes ver tu progreso y continuar con el curso.
          </p>
        </section>

        {coursesWithProgress.length === 0 ? (
          <p className="text-muted-foreground rounded-2xl border border-border bg-card/90 p-8 text-center shadow-sm backdrop-blur supports-backdrop-filter:bg-card/80">
            No hay cursos disponibles.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {coursesWithProgress.map(({ course, progress }: { course: Course; progress: CourseProgressResult }) => {
              const targetLessonId =
                progress.firstAllowedLessonId ?? progress.firstLessonId;
              const hasStarted = progress.completedLessons > 0;
              const isComplete =
                progress.totalLessons > 0 &&
                progress.completedLessons >= progress.totalLessons;
              const thumbnail =
                course.thumbnail && typeof course.thumbnail === "object"
                  ? course.thumbnail
                  : null;
              const thumbnailUrl = thumbnail?.url
                ? getMediaUrl(thumbnail.url)
                : null;

              return (
                <li
                  key={course.id}
                  className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-md transition hover:-translate-y-1 hover:shadow-xl backdrop-blur supports-backdrop-filter:bg-card/80"
                >
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b bg-linear-to-r from-brand to-brand-hover opacity-60"
                    aria-hidden
                  />
                  {thumbnailUrl && (
                    <div className="relative h-44 w-full shrink-0 bg-muted">
                      <div
                        className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-transparent from-55% to-brand/25 opacity-70 transition group-hover:opacity-90"
                        aria-hidden
                      />
                      <Image
                        src={thumbnailUrl}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1400px) 100vw, 1400px"
                      />
                    </div>
                  )}
                  <div className="flex flex-col p-6">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">
                      {course.title}
                    </h3>
                    {course.description && (
                      <div className="mt-2 text-sm text-muted-foreground [&_.payload-richtext]:text-sm [&_.payload-richtext]:text-muted-foreground">
                        <RichText data={course.description} enableGutter={false} />
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {progress.completedLessons} de {progress.totalLessons}{" "}
                        lecciones
                      </span>
                      {progress.hasCertificate && (
                        <span className="rounded-full bg-brand-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                          Certificado
                        </span>
                      )}
                    </div>
                    <div className="mt-6 flex w-full justify-center">
                      <Button
                        asChild
                        variant="brand"
                        size="lg"
                        className="w-full max-w-xl"
                      >
                        <Link
                          href={
                            targetLessonId
                              ? `/curso/${targetLessonId}`
                              : "#"
                          }
                          className={
                            !targetLessonId ? "pointer-events-none" : ""
                          }
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
