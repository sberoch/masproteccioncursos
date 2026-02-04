import type { Block } from "payload";

export const BlogBlock: Block = {
  slug: "blog",
  labels: {
    singular: { en: "Blog Section", es: "Sección Blog" },
    plural: { en: "Blog Sections", es: "Secciones Blog" },
  },
  interfaceName: "BlogBlock",
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
      name: "viewAllLabel",
      type: "text",
      label: { en: "View all label", es: "Texto Ver todo" },
    },
    {
      name: "viewAllHref",
      type: "text",
      label: { en: "View all link", es: "Enlace Ver todo" },
    },
    {
      name: "cards",
      type: "array",
      label: { en: "Blog cards", es: "Tarjetas del blog" },
      fields: [
        {
          name: "category",
          type: "text",
          label: { en: "Category", es: "Categoría" },
        },
        { name: "date", type: "text", label: { en: "Date", es: "Fecha" } },
        {
          name: "title",
          type: "text",
          label: { en: "Title", es: "Título" },
          required: true,
        },
        {
          name: "excerpt",
          type: "textarea",
          label: { en: "Excerpt", es: "Extracto" },
        },
        { name: "href", type: "text", label: { en: "Link", es: "Enlace" } },
      ],
      labels: {
        singular: { en: "Card", es: "Tarjeta" },
        plural: { en: "Cards", es: "Tarjetas" },
      },
    },
  ],
};
