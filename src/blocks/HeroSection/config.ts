import type { Block } from "payload";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: { en: "Hero Section", es: "Sección Hero" },
    plural: { en: "Hero Sections", es: "Secciones Hero" },
  },
  interfaceName: "HeroBlock",
  fields: [
    {
      name: "badge",
      type: "text",
      label: { en: "Badge", es: "Etiqueta" },
      admin: {
        description: {
          en: "Small label above headline",
          es: "Etiqueta sobre el título",
        },
      },
    },
    {
      name: "headline",
      type: "text",
      label: { en: "Headline", es: "Título principal" },
    },
    {
      name: "headlineHighlight",
      type: "text",
      label: { en: "Headline highlight", es: "Palabra destacada en título" },
      admin: {
        description: {
          en: "Word or phrase to highlight (e.g. salvar vidas)",
          es: "Palabra o frase a destacar",
        },
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      label: { en: "Subtitle", es: "Subtítulo" },
    },
    {
      name: "primaryCtaLabel",
      type: "text",
      label: { en: "Primary button label", es: "Texto del botón principal" },
    },
    {
      name: "primaryCtaHref",
      type: "text",
      label: { en: "Primary button link", es: "Enlace del botón principal" },
      admin: {
        description: { en: "e.g. #inscripcion", es: "ej. #inscripcion" },
      },
    },
    {
      name: "secondaryCtaLabel",
      type: "text",
      label: { en: "Secondary button label", es: "Texto del botón secundario" },
    },
    {
      name: "secondaryCtaHref",
      type: "text",
      label: { en: "Secondary button link", es: "Enlace del botón secundario" },
    },
    {
      name: "stats",
      type: "array",
      label: { en: "Stats", es: "Estadísticas" },
      fields: [
        {
          name: "number",
          type: "text",
          label: { en: "Number", es: "Número" },
          required: true,
        },
        {
          name: "label",
          type: "text",
          label: { en: "Label", es: "Etiqueta" },
          required: true,
        },
      ],
      labels: {
        singular: { en: "Stat", es: "Estadística" },
        plural: { en: "Stats", es: "Estadísticas" },
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: { en: "Hero image", es: "Imagen principal" },
    },
    {
      name: "imageBadgeTitle",
      type: "text",
      label: { en: "Image badge title", es: "Título del badge en imagen" },
    },
    {
      name: "imageBadgeSubtitle",
      type: "text",
      label: {
        en: "Image badge subtitle",
        es: "Subtítulo del badge en imagen",
      },
    },
  ],
};
