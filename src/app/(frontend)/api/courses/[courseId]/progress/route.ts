import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await params;
    const payload = await getPayload({ config });

    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courseIdNum = parseInt(courseId, 10);

    // Get all modules for the course
    const modules = await payload.find({
      collection: "modules",
      where: { course: { equals: courseIdNum } },
      sort: "position",
      limit: 100,
    });

    const moduleIds = modules.docs.map((m) => m.id);

    if (moduleIds.length === 0) {
      return NextResponse.json({
        totalLessons: 0,
        completedLessons: 0,
        progressPercent: 0,
        lessonProgress: [],
        quizAttempts: [],
        hasCertificate: false,
        certificate: null,
      });
    }

    // Get all lessons for these modules
    const lessons = await payload.find({
      collection: "lessons",
      where: { module: { in: moduleIds } },
      sort: "position",
      limit: 500,
    });

    const lessonIds = lessons.docs.map((l) => l.id);

    if (lessonIds.length === 0) {
      return NextResponse.json({
        totalLessons: 0,
        completedLessons: 0,
        progressPercent: 0,
        lessonProgress: [],
        quizAttempts: [],
        hasCertificate: false,
        certificate: null,
      });
    }

    // Get user's progress for these lessons
    const progress = await payload.find({
      collection: "lesson-progress",
      where: {
        and: [{ user: { equals: user.id } }, { lesson: { in: lessonIds } }],
      },
      limit: 500,
    });

    // Get user's quiz attempts for quiz lessons
    const quizLessonIds = lessons.docs.filter((l) => l.type === "quiz").map((l) => l.id);

    let quizAttempts = { docs: [] as any[] };
    if (quizLessonIds.length > 0) {
      quizAttempts = await payload.find({
        collection: "quiz-attempts",
        where: {
          and: [{ user: { equals: user.id } }, { lesson: { in: quizLessonIds } }],
        },
        sort: "-createdAt",
        limit: 100,
      });
    }

    // Check for certificate
    const certificate = await payload.find({
      collection: "certificates",
      where: {
        and: [{ user: { equals: user.id } }, { course: { equals: courseIdNum } }],
      },
      limit: 1,
    });

    // Calculate overall progress
    const totalLessons = lessons.docs.length;
    const completedLessons = progress.docs.filter((p) => p.completed).length;
    const progressPercent =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return NextResponse.json({
      totalLessons,
      completedLessons,
      progressPercent,
      lessonProgress: progress.docs,
      quizAttempts: quizAttempts.docs,
      hasCertificate: certificate.docs.length > 0,
      certificate: certificate.docs[0] || null,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}
