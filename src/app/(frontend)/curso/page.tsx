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
      <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground">
            Hola, {user.name ?? user.email ?? "Estudiante"}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Aquí puedes ver tu progreso y continuar con el curso.
          </p>
        </section>

        {coursesWithProgress.length === 0 ? (
          <p className="text-muted-foreground rounded-lg border border-border bg-card p-6 text-center">
            No hay cursos disponibles.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {coursesWithProgress.map(({ course, progress }: { course: Course; progress: CourseProgressResult }) => {
              const targetLessonId =
                progress.resumeLessonId ?? progress.firstLessonId;
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
                  className="flex w-full flex-col overflow-hidden rounded-xl bg-card"
                >
                  {thumbnailUrl && (
                    <div className="relative h-40 w-full shrink-0 bg-muted">
                      <Image
                        src={thumbnailUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1400px) 100vw, 1400px"
                      />
                    </div>
                  )}
                  <div className="flex flex-col p-6">
                    <h3 className="text-lg font-semibold text-foreground">
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
                        <span className="rounded bg-brand-muted px-2 py-0.5 text-xs font-medium text-brand">
                          Certificado
                        </span>
                      )}
                    </div>
                    <div className="mt-6 flex w-full justify-center">
                      <Button
                        asChild
                        size="lg"
                        className="w-full max-w-xl bg-brand text-brand-foreground hover:bg-brand-hover"
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
