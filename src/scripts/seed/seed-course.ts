import type { Lesson } from "@/payload-types";
import { Payload } from "payload";

const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=5ut80_MqwAw";
const COURSE_SLUG = "curso-de-ejemplo";

/** Minimal Lexical rich text (one paragraph) for text lessons. */
function lexicalParagraph(text: string): NonNullable<Lesson["body"]> {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text,
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export const seedCourse = async (payload: Payload) => {
  payload.logger.info(`— Seeding course, modules, and lessons...`);

  const existing = await payload.find({
    collection: "courses",
    where: { slug: { equals: COURSE_SLUG } },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    payload.logger.info(`— Course "${COURSE_SLUG}" already exists, skipping.`);
    return;
  }

  const course = await payload.create({
    collection: "courses",
    data: {
      title: "Curso de ejemplo",
      slug: COURSE_SLUG,
      passingScore: 70,
      isPublished: true,
    },
  });

  // —— Module 1 ——
  const module1 = await payload.create({
    collection: "modules",
    data: {
      title: "Introducción y conceptos básicos",
      course: course.id,
      position: 0,
    },
  });

  await payload.create({
    collection: "lessons",
    data: {
      title: "Bienvenida al curso",
      module: module1.id,
      type: "video",
      position: 0,
      youtubeUrl: YOUTUBE_VIDEO_URL,
      durationSeconds: 120,
    },
  });

  await payload.create({
    collection: "lessons",
    data: {
      title: "Objetivos y cómo aprovechar las lecciones",
      module: module1.id,
      type: "text",
      position: 1,
      body: lexicalParagraph(
        "En este curso verás teoría y práctica. Te recomendamos seguir el orden de los módulos y marcar cada lección como completada cuando termines. Si tienes dudas, puedes repetir los videos o releer el contenido las veces que necesites.",
      ),
      readingTime: 3,
    },
  });

  // —— Module 2 ——
  const module2 = await payload.create({
    collection: "modules",
    data: {
      title: "Primeros pasos prácticos",
      course: course.id,
      position: 1,
    },
  });

  await payload.create({
    collection: "lessons",
    data: {
      title: "Material necesario y preparación del entorno",
      module: module2.id,
      type: "text",
      position: 0,
      body: lexicalParagraph(
        "Antes de seguir, revisa que tengas a mano los materiales indicados en la introducción. Un espacio ordenado y sin interrupciones te ayudará a concentrarte y sacar el máximo provecho de las prácticas.",
      ),
      readingTime: 2,
    },
  });

  await payload.create({
    collection: "lessons",
    data: {
      title: "Ejemplo práctico paso a paso",
      module: module2.id,
      type: "video",
      position: 1,
      youtubeUrl: YOUTUBE_VIDEO_URL,
      durationSeconds: 180,
    },
  });

  payload.logger.info(`— Course, 2 modules, and 4 lessons created.`);
};
