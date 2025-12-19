import type { CollectionAfterChangeHook } from "payload";

interface Lesson {
  id: number;
  type: "video" | "text" | "quiz";
  module: number;
  isFinalQuiz?: boolean;
}

interface Module {
  id: number;
  course: number;
}

interface QuizAttempt {
  id: number;
  user: number;
  lesson: number;
  passed: boolean;
}

export const generateCertificate: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  const attempt = doc as QuizAttempt;

  // Only run on create, when passed
  if (operation !== "create" || !attempt.passed) return doc;

  // Get lesson to check if it's a final quiz
  const lesson = (await req.payload.findByID({
    collection: "lessons",
    id: attempt.lesson,
    depth: 0,
  })) as Lesson;

  if (!lesson.isFinalQuiz) return doc;

  // Get course ID via module
  const module = (await req.payload.findByID({
    collection: "modules",
    id: lesson.module,
    depth: 0,
  })) as Module;

  const courseId = module.course;
  const userId = attempt.user;

  // Check if certificate already exists
  const existingCert = await req.payload.find({
    collection: "certificates",
    where: {
      and: [{ user: { equals: userId } }, { course: { equals: courseId } }],
    },
    limit: 1,
  });

  if (existingCert.docs.length > 0) {
    // Certificate already exists
    return doc;
  }

  // Create certificate (skip external service integration for now)
  try {
    await req.payload.create({
      collection: "certificates",
      data: {
        user: userId,
        course: courseId,
        quizAttempt: attempt.id,
        issuedAt: new Date().toISOString(),
        // externalCertificateId and externalCertificateUrl left empty for now
      },
      // Use overrideAccess to bypass the "system only" access control
      overrideAccess: true,
    });
  } catch (error) {
    // Log error but don't fail the quiz attempt
    console.error("Failed to create certificate:", error);
  }

  return doc;
};
