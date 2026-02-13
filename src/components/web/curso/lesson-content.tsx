import type { Lesson } from "@/payload-types";
import RichText from "@/components/web/rich-text";
import { YoutubePlayer } from "./youtube-player";
import { QuizForm } from "./quiz-form";

type LessonContentProps = {
  lesson: Lesson;
  courseId: number;
  passingScore: number;
  /** When true, quiz submit is disabled (auth disabled / mock mode). */
  authDisabled?: boolean;
};

export function LessonContent({
  lesson,
  courseId,
  passingScore,
  authDisabled = false,
}: LessonContentProps) {
  if (lesson.type === "video") {
    return (
      <YoutubePlayer youtubeUrl={lesson.youtubeUrl ?? undefined} />
    );
  }

  if (lesson.type === "text" && lesson.body) {
    return (
      <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/80">
        <RichText data={lesson.body} enableGutter={false} />
      </div>
    );
  }

  if (lesson.type === "quiz" && lesson.questions?.length) {
    return (
      <QuizForm
        questions={lesson.questions}
        courseId={courseId}
        lessonId={lesson.id}
        passingScore={passingScore}
        authDisabled={authDisabled}
      />
    );
  }

  if (lesson.type === "text") {
    return (
      <div className="rounded-2xl border border-border bg-card/90 p-6 text-foreground shadow-sm backdrop-blur supports-backdrop-filter:bg-card/80">
        No hay contenido para esta lección.
      </div>
    );
  }

  return null;
}
