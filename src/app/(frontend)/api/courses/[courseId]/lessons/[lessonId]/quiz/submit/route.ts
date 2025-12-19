import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

interface QuizSubmission {
  answers: Array<{
    questionIndex: number;
    selectedOptionIndex: number;
  }>;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { courseId, lessonId } = await params;
    const payload = await getPayload({ config });

    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: QuizSubmission = await request.json();
    const lessonIdNum = parseInt(lessonId, 10);
    const courseIdNum = parseInt(courseId, 10);

    // Verify lesson is a quiz
    const lesson = await payload.findByID({
      collection: "lessons",
      id: lessonIdNum,
    });

    if (!lesson || lesson.type !== "quiz") {
      return NextResponse.json({ error: "Lesson is not a quiz" }, { status: 400 });
    }

    // Create quiz attempt (hooks will calculate score and generate certificate if applicable)
    const attempt = await payload.create({
      collection: "quiz-attempts",
      data: {
        user: user.id,
        lesson: lessonIdNum,
        answers: body.answers,
        scorePercent: 0, // Will be calculated by hook
        passed: false, // Will be calculated by hook
      },
    });

    // Check if certificate was generated
    let certificateUrl = null;
    if (attempt.passed && lesson.isFinalQuiz) {
      const certificate = await payload.find({
        collection: "certificates",
        where: {
          and: [{ user: { equals: user.id } }, { course: { equals: courseIdNum } }],
        },
        limit: 1,
      });

      if (certificate.docs.length > 0) {
        certificateUrl =
          certificate.docs[0].externalCertificateUrl || `/certificates/${certificate.docs[0].id}`;
      }
    }

    return NextResponse.json({
      success: true,
      score: attempt.scorePercent,
      passed: attempt.passed,
      certificateUrl,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
