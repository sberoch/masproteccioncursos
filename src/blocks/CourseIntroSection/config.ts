import type { Block } from "payload";
import { defaultLexical } from "@/fields/defaultLexical";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const CourseIntroBlock: Block = {
  slug: "courseIntro",
  labels: {
    singular: {
      en: "Course Intro Section",
      es: "Sección Introducción al Curso",
    },
    plural: { en: "Course Intro Sections", es: "Secciones Introducción" },
  },
  interfaceName: "CourseIntroBlock",
  fields: [
    {
      name: "label",
      type: "text",
      label: { en: "Label", es: "Etiqueta" },
      admin: {
        description: {
          en: "Small label above title",
          es: "Etiqueta sobre el título",
        },
      },
    },
    {
      name: "title",
      type: "text",
      label: { en: "Title", es: "Título" },
    },
    {
      name: "storyParagraphs",
      type: "array",
      label: { en: "Story paragraphs", es: "Párrafos de la historia" },
      fields: [
        {
          name: "paragraph",
          type: "richText",
          label: { en: "Paragraph", es: "Párrafo" },
          editor: lexicalEditor({ features: () => [] }),
        },
      ],
      labels: {
        singular: { en: "Paragraph", es: "Párrafo" },
        plural: { en: "Paragraphs", es: "Párrafos" },
      },
    },
    {
      name: "videoThumbnail",
      type: "upload",
      relationTo: "media",
      label: { en: "Video thumbnail", es: "Miniatura del video" },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      label: { en: "Video file", es: "Archivo de video" },
      admin: {
        description: {
          en: "Upload .mp4 or leave empty to use video URL",
          es: "Sube .mp4 o deja vacío para usar URL",
        },
      },
    },
    {
      name: "videoUrl",
      type: "text",
      label: { en: "Video URL", es: "URL del video" },
      admin: {
        description: {
          en: "Use if video is hosted elsewhere",
          es: "Usar si el video está en otro sitio",
        },
        condition: (_, siblingData) => !siblingData?.video,
      },
    },
    {
      name: "description",
      type: "richText",
      label: { en: "Description", es: "Descripción" },
      editor: defaultLexical,
    },
  ],
};
