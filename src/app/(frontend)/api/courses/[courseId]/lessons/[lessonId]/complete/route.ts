import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const payload = await getPayload({ config });

    // Get authenticated user from Payload
    const headersList = await headers();
    const { user } = await payload.auth({ headers: headersList });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lessonIdNum = parseInt(lessonId, 10);

    // Check if progress already exists
    const existing = await payload.find({
      collection: "lesson-progress",
      where: {
        and: [{ user: { equals: user.id } }, { lesson: { equals: lessonIdNum } }],
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      // Update existing progress
      const progressDoc = existing.docs[0];
      const updated = await payload.update({
        collection: "lesson-progress",
        id: progressDoc.id,
        data: {
          completed: true,
          completedAt: new Date().toISOString(),
        },
      });
      return NextResponse.json({ success: true, progress: updated });
    }

    // Create new progress record
    const progress = await payload.create({
      collection: "lesson-progress",
      data: {
        user: user.id,
        lesson: lessonIdNum,
        completed: true,
        completedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json({ error: "Failed to complete lesson" }, { status: 500 });
  }
}
