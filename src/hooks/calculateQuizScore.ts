import type { CollectionBeforeChangeHook } from "payload";

interface QuizOption {
  optionText: string;
  isCorrect?: boolean;
}

interface QuizQuestion {
  questionText: string;
  questionType: "multiple_choice" | "true_false";
  options: QuizOption[];
}

interface QuizAnswer {
  questionIndex: number;
  selectedOptionIndex: number;
  isCorrect?: boolean;
}

interface Lesson {
  id: number;
  type: "video" | "text" | "quiz";
  module: number | { id: number; course: number | { id: number; passingScore: number } };
  questions?: QuizQuestion[];
}

interface Module {
  id: number;
  course: number | { id: number; passingScore: number };
}

interface Course {
  id: number;
  passingScore: number;
}

export const calculateQuizScore: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
  if (operation !== "create") return data;

  // Fetch the lesson with questions
  const lesson = (await req.payload.findByID({
    collection: "lessons",
    id: data.lesson as number,
    depth: 0,
  })) as Lesson;

  if (!lesson || lesson.type !== "quiz" || !lesson.questions) {
    throw new Error("Invalid quiz lesson");
  }

  const questions = lesson.questions;
  const answers = data.answers as QuizAnswer[];

  if (!answers || answers.length !== questions.length) {
    throw new Error("Must answer all questions");
  }

  // Calculate score
  let correctCount = 0;
  const gradedAnswers: QuizAnswer[] = answers.map((answer) => {
    const question = questions[answer.questionIndex];
    if (!question || !question.options) {
      return { ...answer, isCorrect: false };
    }

    const selectedOption = question.options[answer.selectedOptionIndex];
    const isCorrect = selectedOption?.isCorrect === true;

    if (isCorrect) correctCount++;

    return {
      ...answer,
      isCorrect,
    };
  });

  const scorePercent = Math.round((correctCount / questions.length) * 100);

  // Get course passing score via module
  const module = (await req.payload.findByID({
    collection: "modules",
    id: lesson.module as number,
    depth: 0,
  })) as Module;

  const course = (await req.payload.findByID({
    collection: "courses",
    id: module.course as number,
    depth: 0,
  })) as Course;

  const passed = scorePercent >= (course.passingScore || 70);

  return {
    ...data,
    answers: gradedAnswers,
    scorePercent,
    passed,
  };
};
