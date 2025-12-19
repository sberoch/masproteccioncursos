import type { CollectionConfig, Field } from "payload";

import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isAdminOrSelfCreate } from "../access/isAdminOrSelfCreate";
import { calculateQuizScore } from "../hooks/calculateQuizScore";
import { generateCertificate } from "../hooks/generateCertificate";

// Embedded answers array
const answerFields: Field[] = [
  {
    name: "questionIndex",
    type: "number",
    required: true,
    label: {
      en: "Question Index",
      es: "Indice de pregunta",
    },
    admin: {
      description: {
        en: "Index of the question in the quiz (0-based)",
        es: "Indice de la pregunta en el cuestionario (base 0)",
      },
    },
  },
  {
    name: "selectedOptionIndex",
    type: "number",
    required: true,
    label: {
      en: "Selected Option Index",
      es: "Indice de opcion seleccionada",
    },
  },
  {
    name: "isCorrect",
    type: "checkbox",
    label: {
      en: "Was Correct",
      es: "Fue correcta",
    },
    admin: {
      readOnly: true,
    },
  },
];

export const QuizAttempts: CollectionConfig = {
  slug: "quiz-attempts",
  labels: {
    singular: {
      en: "Quiz Attempt",
      es: "Intento de cuestionario",
    },
    plural: {
      en: "Quiz Attempts",
      es: "Intentos de cuestionario",
    },
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["user", "lesson", "scorePercent", "passed", "createdAt"],
    group: {
      en: "Users & Progress",
      es: "Usuarios y Progreso",
    },
  },
  access: {
    read: isAdminOrSelf,
    create: isAdminOrSelfCreate,
    update: () => false, // Quiz attempts are immutable
    delete: () => false,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: {
        en: "User",
        es: "Usuario",
      },
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            if (operation === "create" && !value && req.user) {
              return req.user.id;
            }
            return value;
          },
        ],
      },
    },
    {
      name: "lesson",
      type: "relationship",
      relationTo: "lessons",
      required: true,
      label: {
        en: "Lesson (Quiz)",
        es: "Leccion (Cuestionario)",
      },
      index: true,
      filterOptions: {
        type: { equals: "quiz" },
      },
    },
    {
      name: "scorePercent",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      label: {
        en: "Score (%)",
        es: "Puntaje (%)",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "passed",
      type: "checkbox",
      label: {
        en: "Passed",
        es: "Aprobado",
      },
      admin: {
        readOnly: true,
      },
    },
    {
      name: "answers",
      type: "array",
      label: {
        en: "Answers",
        es: "Respuestas",
      },
      labels: {
        singular: {
          en: "Answer",
          es: "Respuesta",
        },
        plural: {
          en: "Answers",
          es: "Respuestas",
        },
      },
      fields: answerFields,
      admin: {
        readOnly: true,
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    beforeChange: [calculateQuizScore],
    afterChange: [generateCertificate],
  },
  timestamps: true,
};
