import type { Block } from "payload";

export const TestimonialsBlock: Block = {
  slug: "testimonials",
  labels: {
    singular: { en: "Testimonials Section", es: "Sección Testimonios" },
    plural: { en: "Testimonials Sections", es: "Secciones Testimonios" },
  },
  interfaceName: "TestimonialsBlock",
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
      name: "testimonials",
      type: "array",
      label: { en: "Testimonials", es: "Testimonios" },
      fields: [
        { name: "quote", type: "textarea", label: { en: "Quote", es: "Cita" } },
        {
          name: "authorName",
          type: "text",
          label: { en: "Author name", es: "Nombre del autor" },
        },
        {
          name: "authorRole",
          type: "text",
          label: { en: "Author role", es: "Rol del autor" },
        },
        {
          name: "video",
          type: "upload",
          relationTo: "media",
          label: { en: "Video", es: "Video" },
        },
        {
          name: "thumbnail",
          type: "upload",
          relationTo: "media",
          label: { en: "Thumbnail", es: "Miniatura" },
        },
      ],
      labels: {
        singular: { en: "Testimonial", es: "Testimonio" },
        plural: { en: "Testimonials", es: "Testimonios" },
      },
    },
  ],
};
