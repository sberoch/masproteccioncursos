import type { Block } from "payload";

export const AboutInstructorBlock: Block = {
  slug: "aboutInstructor",
  labels: {
    singular: {
      en: "About Instructor Section",
      es: "Sección Sobre la Instructora",
    },
    plural: {
      en: "About Instructor Sections",
      es: "Secciones Sobre la Instructora",
    },
  },
  interfaceName: "AboutInstructorBlock",
  fields: [
    {
      name: "label",
      type: "text",
      label: { en: "Label", es: "Etiqueta" },
    },
    {
      name: "title",
      type: "text",
      label: { en: "Title", es: "Título" },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: { en: "Instructor image", es: "Imagen de la instructora" },
    },
    {
      name: "bioParagraphs",
      type: "array",
      label: { en: "Bio paragraphs", es: "Párrafos de biografía" },
      fields: [
        {
          name: "paragraph",
          type: "textarea",
          label: { en: "Paragraph", es: "Párrafo" },
        },
      ],
      labels: {
        singular: { en: "Paragraph", es: "Párrafo" },
        plural: { en: "Paragraphs", es: "Párrafos" },
      },
    },
    {
      name: "credentials",
      type: "array",
      label: { en: "Credentials", es: "Credenciales" },
      fields: [
        {
          name: "title",
          type: "text",
          label: { en: "Title", es: "Título" },
          required: true,
        },
        {
          name: "description",
          type: "text",
          label: { en: "Description", es: "Descripción" },
        },
      ],
      labels: {
        singular: { en: "Credential", es: "Credencial" },
        plural: { en: "Credentials", es: "Credenciales" },
      },
    },
  ],
};
