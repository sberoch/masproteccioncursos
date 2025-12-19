import type { CollectionConfig, Field } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { authenticated } from "../access/authenticated";
import { isAdmin } from "../access/isAdmin";

// Quiz question options array field
const quizOptionFields: Field[] = [
  {
    name: "optionText",
    type: "text",
    required: true,
    label: {
      en: "Option Text",
      es: "Texto de la opcion",
    },
  },
  {
    name: "isCorrect",
    type: "checkbox",
    defaultValue: false,
    label: {
      en: "Correct Answer",
      es: "Respuesta correcta",
    },
  },
];

// Quiz questions array field
const quizQuestionFields: Field[] = [
  {
    name: "questionText",
    type: "textarea",
    required: true,
    label: {
      en: "Question",
      es: "Pregunta",
    },
  },
  {
    name: "questionType",
    type: "select",
    required: true,
    defaultValue: "multiple_choice",
    label: {
      en: "Question Type",
      es: "Tipo de pregunta",
    },
    options: [
      {
        label: {
          en: "Multiple Choice",
          es: "Opcion multiple",
        },
        value: "multiple_choice",
      },
      {
        label: {
          en: "True/False",
          es: "Verdadero/Falso",
        },
        value: "true_false",
      },
    ],
  },
  {
    name: "options",
    type: "array",
    required: true,
    minRows: 2,
    maxRows: 6,
    label: {
      en: "Options",
      es: "Opciones",
    },
    labels: {
      singular: {
        en: "Option",
        es: "Opcion",
      },
      plural: {
        en: "Options",
        es: "Opciones",
      },
    },
    fields: quizOptionFields,
    admin: {
      initCollapsed: false,
      components: {
        RowLabel:
          "@/components/payload/lessons/option-row-label#OptionRowLabel",
      },
    },
  },
];

export const Lessons: CollectionConfig = {
  slug: "lessons",
  labels: {
    singular: {
      en: "Lesson",
      es: "Leccion",
    },
    plural: {
      en: "Lessons",
      es: "Lecciones",
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "module", "type", "position", "isFinalQuiz"],
    group: {
      en: "Course Management",
      es: "Gestion de Cursos",
    },
  },
  access: {
    read: authenticated,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  defaultSort: "position",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: {
        en: "Title",
        es: "Titulo",
      },
    },
    {
      name: "module",
      type: "relationship",
      relationTo: "modules",
      required: true,
      label: {
        en: "Module",
        es: "Modulo",
      },
      admin: {
        position: "sidebar",
      },
      index: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          label: {
            en: "Lesson Type",
            es: "Tipo de leccion",
          },
          options: [
            {
              label: {
                en: "Video",
                es: "Video",
              },
              value: "video",
            },
            {
              label: {
                en: "Text",
                es: "Texto",
              },
              value: "text",
            },
            {
              label: {
                en: "Quiz",
                es: "Cuestionario",
              },
              value: "quiz",
            },
          ],
          admin: {
            width: "50%",
          },
        },
        {
          name: "position",
          type: "number",
          required: true,
          defaultValue: 0,
          label: {
            en: "Position",
            es: "Posicion",
          },
          admin: {
            width: "50%",
          },
          index: true,
        },
        {
          name: "isFinalQuiz",
          type: "checkbox",
          defaultValue: false,
          label: {
            en: "Is final quiz?",
            es: "Es examen final?",
          },
          admin: {
            condition: (data) => data?.type === "quiz",
            description: {
              en: "Passing this quiz issues a certificate",
              es: "Aprobar este examen emite un certificado",
            },
          },
        },
      ],
    },
    // VIDEO FIELDS - Conditional
    {
      name: "youtubeUrl",
      type: "text",
      label: {
        en: "YouTube URL",
        es: "URL de YouTube",
      },
      admin: {
        condition: (data) => data?.type === "video",
        description: {
          en: "Full YouTube video URL",
          es: "URL completa del video de YouTube",
        },
      },
    },
    {
      name: "durationSeconds",
      type: "number",
      min: 0,
      label: {
        en: "Duration (seconds)",
        es: "Duracion (segundos)",
      },
      admin: {
        condition: (data) => data?.type === "video",
        description: {
          en: "Video duration in seconds",
          es: "Duracion del video en segundos",
        },
      },
    },
    // TEXT FIELDS - Conditional
    {
      name: "body",
      type: "richText",
      label: {
        en: "Content",
        es: "Contenido",
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
      admin: {
        condition: (data) => data?.type === "text",
      },
    },
    // QUIZ FIELDS - Conditional (Embedded array)
    {
      name: "questions",
      type: "array",
      label: {
        en: "Questions",
        es: "Preguntas",
      },
      labels: {
        singular: {
          en: "Question",
          es: "Pregunta",
        },
        plural: {
          en: "Questions",
          es: "Preguntas",
        },
      },
      fields: quizQuestionFields,
      admin: {
        condition: (data) => data?.type === "quiz",
        initCollapsed: true,
        description: {
          en: "Add quiz questions with their options",
          es: "Agregar preguntas del cuestionario con sus opciones",
        },
      },
    },
  ],
  timestamps: true,
};
