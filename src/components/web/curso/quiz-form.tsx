"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities";

/** Client-safe option (isCorrect is never sent from the server). */
type QuizOption = {
  optionText: string;
  id?: string | null;
};

type QuizQuestion = {
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  options: QuizOption[];
  id?: string | null;
};

type QuizFormProps = {
  questions: QuizQuestion[];
  courseId: number;
  lessonId: number;
  passingScore: number;
  /** When true, submit is disabled and a message is shown (auth disabled / mock mode). */
  authDisabled?: boolean;
};

export function QuizForm({
  questions,
  courseId,
  lessonId,
  passingScore,
  authDisabled = false,
}: QuizFormProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
    certificateUrl?: string | null;
  } | null>(null);

  const allAnswered =
    questions.length > 0 &&
    questions.every((_, i) => {
      const v = selected[String(i)];
      return typeof v === "number" && v >= 0;
    });

  async function handleSubmit() {
    if (!allAnswered || authDisabled) return;
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch(
        `/api/courses/${courseId}/lessons/${lessonId}/quiz/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: Object.entries(selected).map(
              ([questionIndex, selectedOptionIndex]) => ({
                questionIndex: parseInt(questionIndex, 10),
                selectedOptionIndex,
              }),
            ),
          }),
        },
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          score: data.score ?? 0,
          passed: data.passed ?? false,
          certificateUrl: data.certificateUrl ?? null,
        });
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 text-[#374151]">
        No hay preguntas en este cuestionario.
      </div>
    );
  }

  if (result != null) {
    return (
      <div className="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-md">
        <h3 className="text-lg font-semibold text-[#111827]">Resultado</h3>
        <p className="mt-2 text-[#374151]">
          Puntuación: <strong>{result.score}%</strong>
          {result.score >= passingScore ? " — Aprobado" : " — No aprobado"}
        </p>
        {result.certificateUrl && (
          <a
            href={result.certificateUrl}
            className="mt-3 inline-block text-[#0f4ba3] underline hover:no-underline"
          >
            Ver certificado
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-md">
      <h3 className="text-lg font-semibold text-[#111827]">Cuestionario</h3>
      {questions.map((q, qIndex) => (
        <fieldset key={qIndex} className="space-y-2">
          <legend className="text-sm font-medium text-[#374151]">
            {qIndex + 1}. {q.questionText}
          </legend>
          <div className="flex flex-col gap-2">
            {q.options?.map((opt, optIndex) => (
              <label
                key={optIndex}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition",
                  selected[String(qIndex)] === optIndex
                    ? "border-[#0f4ba3] bg-[#0f4ba3]/5"
                    : "border-[#e5e7eb] hover:border-[#0f4ba3]/50",
                )}
              >
                <input
                  type="radio"
                  name={`q-${qIndex}`}
                  checked={selected[String(qIndex)] === optIndex}
                  onChange={() =>
                    setSelected((prev) => ({
                      ...prev,
                      [String(qIndex)]: optIndex,
                    }))
                  }
                  className="h-4 w-4 text-[#0f4ba3]"
                />
                <span className="text-[#111827]">{opt.optionText}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={!allAnswered || submitting || authDisabled}
        className="rounded-lg bg-[#0f4ba3] px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-[#0d4190]"
      >
        {submitting ? "Enviando…" : "Enviar respuestas"}
      </Button>
      {authDisabled && (
        <p className="text-sm text-[#6b7280]">
          Inicia sesión para guardar tus resultados del cuestionario.
        </p>
      )}
    </div>
  );
}
