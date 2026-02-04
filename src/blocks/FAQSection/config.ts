import type { Block } from "payload";

export const FAQBlock: Block = {
  slug: "faq",
  labels: {
    singular: { en: "FAQ Section", es: "Sección FAQ" },
    plural: { en: "FAQ Sections", es: "Secciones FAQ" },
  },
  interfaceName: "FAQBlock",
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
      name: "items",
      type: "array",
      label: { en: "FAQ items", es: "Preguntas frecuentes" },
      fields: [
        {
          name: "question",
          type: "text",
          label: { en: "Question", es: "Pregunta" },
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          label: { en: "Answer", es: "Respuesta" },
          required: true,
        },
      ],
      labels: {
        singular: { en: "FAQ item", es: "Item FAQ" },
        plural: { en: "FAQ items", es: "Items FAQ" },
      },
    },
  ],
};
