import type { Block } from "payload";

export const CTABlock: Block = {
  slug: "cta",
  labels: {
    singular: { en: "CTA Section", es: "Sección CTA" },
    plural: { en: "CTA Sections", es: "Secciones CTA" },
  },
  interfaceName: "CTABlock",
  fields: [
    {
      name: "heading",
      type: "text",
      label: { en: "Heading", es: "Título" },
    },
    {
      name: "text",
      type: "textarea",
      label: { en: "Text", es: "Texto" },
    },
    {
      name: "primaryLabel",
      type: "text",
      label: { en: "Primary button label", es: "Texto del botón principal" },
    },
    {
      name: "primaryHref",
      type: "text",
      label: { en: "Primary button link", es: "Enlace del botón principal" },
      admin: {
        description: {
          en: "e.g. mailto:contact@example.com",
          es: "ej. mailto:contacto@ejemplo.com",
        },
      },
    },
    {
      name: "secondaryLabel",
      type: "text",
      label: { en: "Secondary button label", es: "Texto del botón secundario" },
    },
    {
      name: "secondaryHref",
      type: "text",
      label: { en: "Secondary button link", es: "Enlace del botón secundario" },
    },
  ],
};
